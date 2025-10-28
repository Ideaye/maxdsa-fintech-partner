import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import JSZip from "npm:jszip@3.10.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ExistingLoan {
  financier_name: string;
  loan_amount: string;
  emi_amount: string;
  tenor: string;
  loan_availed_date: string | null;
}

interface KiranaLoanRequest {
  customerName: string;
  email: string | null;
  contactNumber: string;
  advisorName: string | null;
  dateOfBirth: string | null;
  coApplicantName: string | null;
  coApplicantDob: string | null;
  coApplicantContact: string | null;
  retailShopName: string;
  retailShopAddress: string;
  natureOfRetailShop: string;
  natureOfShopOwnership: string;
  shopSize: string;
  dailyTurnoverRange: string;
  dailyWalkinsRange: string;
  residenceAddress: string | null;
  natureOfResidenceOwnership: string | null;
  geoLocation: string | null;
  panNumber: string | null;
  aadharNumber: string | null;
  udyamNumber: string | null;
  bankStatementUrl: string | null;
  itrDocumentsUrl: string | null;
  shopPhotoUrl: string | null;
  existingLoans: ExistingLoan[];
  loanType: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('🚀 Kirana loan notification function started');
  
  if (req.method === "OPTIONS") {
    console.log('⚠️ OPTIONS request received');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log('🔑 API Key status:', apiKey ? 'Present (length: ' + apiKey.length + ')' : 'MISSING');
    
    if (!apiKey) {
      console.error('❌ RESEND_API_KEY is not configured');
      throw new Error('Email service is not configured');
    }

    const applicationData: KiranaLoanRequest = await req.json();
    console.log('📧 Received Kirana loan notification request');
    console.log('📧 Customer Name:', applicationData.customerName);
    console.log('📧 Email provided:', applicationData.email ? 'Yes (' + applicationData.email + ')' : 'No');
    console.log('📧 Contact Number:', applicationData.contactNumber);
    console.log('📧 From address: partner@maxdsa.com');

    // Download documents and create ZIP
    let zipAttachment = null;
    const documentsToDownload: { url: string; name: string }[] = [];

    if (applicationData.bankStatementUrl) {
      documentsToDownload.push({ url: applicationData.bankStatementUrl, name: 'Bank_Statement.pdf' });
    }
    if (applicationData.itrDocumentsUrl) {
      documentsToDownload.push({ url: applicationData.itrDocumentsUrl, name: 'ITR_Documents.pdf' });
    }
    if (applicationData.shopPhotoUrl) {
      documentsToDownload.push({ url: applicationData.shopPhotoUrl, name: 'Shop_Photo.jpg' });
    }

    if (documentsToDownload.length > 0) {
      console.log(`📦 Downloading ${documentsToDownload.length} documents...`);
      const zip = new JSZip();

      for (const doc of documentsToDownload) {
        try {
          const { data, error } = await supabaseClient.storage
            .from('partner-documents')
            .download(doc.url);

          if (error) {
            console.error(`❌ Failed to download ${doc.name}:`, error);
            continue;
          }

          if (data) {
            const arrayBuffer = await data.arrayBuffer();
            zip.file(doc.name, arrayBuffer);
            console.log(`✅ Added ${doc.name} to ZIP`);
          }
        } catch (err) {
          console.error(`❌ Error processing ${doc.name}:`, err);
        }
      }

      const zipBuffer = await zip.generateAsync({ type: 'uint8array' });
      const base64Zip = btoa(String.fromCharCode(...zipBuffer));
      zipAttachment = {
        filename: `Kirana_Loan_${applicationData.customerName.replace(/\s+/g, '_')}_Documents.zip`,
        content: base64Zip,
        type: 'application/zip',
      };
      console.log('✅ ZIP file created successfully');
    }

    const emails = [];

    // Email to MaxDSA admin with attachments
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">New Kirana Store Loan Application</h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">Customer Details</h3>
          <p><strong>Name:</strong> ${applicationData.customerName}</p>
          ${applicationData.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${applicationData.dateOfBirth}</p>` : ''}
          <p><strong>Contact:</strong> ${applicationData.contactNumber}</p>
          ${applicationData.email ? `<p><strong>Email:</strong> ${applicationData.email}</p>` : ''}
          ${applicationData.advisorName ? `<p><strong>Advisor:</strong> ${applicationData.advisorName}</p>` : ''}
          
          ${applicationData.coApplicantName ? `
            <h3 style="color: #1e40af;">Co-Applicant Details</h3>
            <p><strong>Name:</strong> ${applicationData.coApplicantName}</p>
            ${applicationData.coApplicantDob ? `<p><strong>Date of Birth:</strong> ${applicationData.coApplicantDob}</p>` : ''}
            ${applicationData.coApplicantContact ? `<p><strong>Contact:</strong> ${applicationData.coApplicantContact}</p>` : ''}
          ` : ''}
          
          <h3 style="color: #1e40af;">Shop Details</h3>
          <p><strong>Shop Name:</strong> ${applicationData.retailShopName}</p>
          <p><strong>Address:</strong> ${applicationData.retailShopAddress}</p>
          <p><strong>Nature of Business:</strong> ${applicationData.natureOfRetailShop}</p>
          <p><strong>Ownership:</strong> ${applicationData.natureOfShopOwnership}</p>
          <p><strong>Shop Size:</strong> ${applicationData.shopSize}</p>
          <p><strong>Daily Turnover:</strong> ${applicationData.dailyTurnoverRange}</p>
          <p><strong>Daily Walk-ins:</strong> ${applicationData.dailyWalkinsRange}</p>
          
          ${applicationData.residenceAddress ? `
            <h3 style="color: #1e40af;">Residence Details</h3>
            <p><strong>Address:</strong> ${applicationData.residenceAddress}</p>
            ${applicationData.natureOfResidenceOwnership ? `<p><strong>Ownership:</strong> ${applicationData.natureOfResidenceOwnership}</p>` : ''}
          ` : ''}
          
          <h3 style="color: #1e40af;">Verification Details</h3>
          ${applicationData.panNumber ? `<p><strong>PAN Number:</strong> ${applicationData.panNumber}</p>` : ''}
          ${applicationData.aadharNumber ? `<p><strong>Aadhar Number:</strong> ${applicationData.aadharNumber}</p>` : ''}
          ${applicationData.udyamNumber ? `<p><strong>Udyam Number:</strong> ${applicationData.udyamNumber}</p>` : ''}
          ${applicationData.geoLocation ? `<p><strong>Location:</strong> ${applicationData.geoLocation}</p>` : ''}
          
          ${applicationData.existingLoans && applicationData.existingLoans.length > 0 ? `
            <h3 style="color: #1e40af;">Existing Loans</h3>
            ${applicationData.existingLoans.map((loan, index) => `
              <div style="margin-bottom: 15px; padding: 10px; background-color: white; border-radius: 4px;">
                <p style="margin: 5px 0;"><strong>Loan ${index + 1}:</strong></p>
                <p style="margin: 5px 0;"><strong>Financier:</strong> ${loan.financier_name}</p>
                <p style="margin: 5px 0;"><strong>Amount:</strong> ${loan.loan_amount}</p>
                <p style="margin: 5px 0;"><strong>EMI:</strong> ${loan.emi_amount}</p>
                <p style="margin: 5px 0;"><strong>Tenor:</strong> ${loan.tenor}</p>
                ${loan.loan_availed_date ? `<p style="margin: 5px 0;"><strong>Availed Date:</strong> ${loan.loan_availed_date}</p>` : ''}
              </div>
            `).join('')}
          ` : ''}
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          ${documentsToDownload.length > 0 ? 'All uploaded documents are attached as a ZIP file.' : 'No documents were uploaded with this application.'}
        </p>
        
        <p style="color: #6b7280; font-size: 14px;">
          Please review this application in your dashboard.
        </p>
      </div>
    `;

    const adminEmail: any = {
      from: "MaxDSA Loans <partner@maxdsa.com>",
      to: ["partners@maxdsa.com"],
      subject: `New Kirana Store Loan Application - ${applicationData.customerName}`,
      html: adminEmailHtml,
    };

    if (zipAttachment) {
      adminEmail.attachments = [zipAttachment];
    }

    emails.push(adminEmail);

    // Email to customer if email provided (no attachments)
    if (applicationData.email) {
      const customerEmail = {
        from: "MaxDSA Loans <partner@maxdsa.com>",
        to: [applicationData.email],
        subject: "Your Kirana Store Loan Application Received",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Thank You for Applying!</h2>
            
            <p>Dear ${applicationData.customerName},</p>
            
            <p>We have received your Kirana Store Loan application and our team will review it shortly.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Application Summary</h3>
              <p><strong>Shop Name:</strong> ${applicationData.retailShopName}</p>
              <p><strong>Contact Number:</strong> ${applicationData.contactNumber}</p>
            </div>
            
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Our team will review your application within 2-3 business days</li>
              <li>We'll contact you on ${applicationData.contactNumber} for any additional information</li>
              <li>Keep your documents ready for verification</li>
            </ul>
            
            <p>If you have any questions, please contact us at partners@maxdsa.com</p>
            
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>Team MaxDSA</strong>
            </p>
          </div>
        `,
      };
      emails.push(customerEmail);
    }

    // Send all emails
    console.log(`📤 Sending ${emails.length} email(s)...`);
    const emailPromises = emails.map(email => resend.emails.send(email));
    const results = await Promise.allSettled(emailPromises);

    let successCount = 0;
    let failureCount = 0;

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`✅ Email ${index + 1} sent successfully:`, result.value);
        successCount++;
      } else {
        console.error(`❌ Email ${index + 1} failed:`, result.reason);
        failureCount++;
      }
    });

    console.log(`📊 Email summary: ${successCount} sent, ${failureCount} failed`);

    if (failureCount > 0 && successCount === 0) {
      throw new Error('All emails failed to send');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailsSent: successCount,
        emailsFailed: failureCount 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("❌ Error in send-kirana-loan-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
