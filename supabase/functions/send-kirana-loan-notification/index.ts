import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface KiranaLoanRequest {
  customerName: string;
  email: string | null;
  contactNumber: string;
  advisorName: string | null;
  retailShopName: string;
  retailShopAddress: string;
  loanType: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      throw new Error('Email service is not configured');
    }

    const applicationData: KiranaLoanRequest = await req.json();
    console.log('Received Kirana loan notification request for:', applicationData.customerName);

    const emails = [];

    // Email to MaxDSA admin
    const adminEmail = {
      from: "MaxDSA Loans <partner@maxdsa.com>",
      to: ["partners@maxdsa.com"],
      subject: `New Kirana Store Loan Application - ${applicationData.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Kirana Store Loan Application</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${applicationData.customerName}</p>
            <p><strong>Contact:</strong> ${applicationData.contactNumber}</p>
            ${applicationData.email ? `<p><strong>Email:</strong> ${applicationData.email}</p>` : ''}
            ${applicationData.advisorName ? `<p><strong>Advisor:</strong> ${applicationData.advisorName}</p>` : ''}
            
            <h3>Shop Details</h3>
            <p><strong>Shop Name:</strong> ${applicationData.retailShopName}</p>
            <p><strong>Address:</strong> ${applicationData.retailShopAddress}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            Please review this application in your dashboard.
          </p>
        </div>
      `,
    };

    emails.push(adminEmail);

    // Email to customer if email provided
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

    console.log(`Email summary: ${successCount} sent, ${failureCount} failed`);

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
    console.error("Error in send-kirana-loan-notification:", error);
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
