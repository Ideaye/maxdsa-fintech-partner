import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PartnerApplicationRequest {
  fullName: string;
  email: string;
  phone: string;
  panNumber: string;
  aadharNumber: string;
  businessName: string;
  businessType: string;
  companyPanNumber: string;
  companyDocumentType: string;
  bankAccountNumber: string;
  bankIfscCode: string;
  bankName: string;
  bankBranch?: string;
  bankDocumentType: string;
  referenceName?: string;
  referencePhone?: string;
  referenceEmail?: string;
  passportPhotoUrl: string;
  companyDocumentUrl: string;
  gstRegistrationUrl: string;
  bankDocumentUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate API key is configured
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      throw new Error('Email service is not configured');
    }

    const {
      fullName, email, phone, panNumber, aadharNumber,
      businessName, businessType, companyPanNumber, companyDocumentType,
      bankAccountNumber, bankIfscCode, bankName, bankBranch, bankDocumentType,
      referenceName, referencePhone, referenceEmail,
      passportPhotoUrl, companyDocumentUrl, gstRegistrationUrl, bankDocumentUrl
    }: PartnerApplicationRequest = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate signed URLs for documents (valid for 7 days)
    const { data: passportPhotoSignedUrl } = await supabaseClient.storage
      .from('partner-documents')
      .createSignedUrl(passportPhotoUrl, 604800);

    const { data: companyDocSignedUrl } = await supabaseClient.storage
      .from('partner-documents')
      .createSignedUrl(companyDocumentUrl, 604800);

    const { data: gstSignedUrl } = await supabaseClient.storage
      .from('partner-documents')
      .createSignedUrl(gstRegistrationUrl, 604800);

    const { data: bankDocSignedUrl } = await supabaseClient.storage
      .from('partner-documents')
      .createSignedUrl(bankDocumentUrl, 604800);

    // Send confirmation email to applicant
    console.log('Sending confirmation email to:', email);
    const confirmationResult = await resend.emails.send({
      from: "MaxDSA <partner@maxdsa.com>",
      to: [email],
      subject: "Partner Application Received - MaxDSA",
      html: `<h1>Thank you, ${fullName}!</h1><p>We have received your partnership application and will review it within 2-3 business days.</p><p>Best regards,<br>The MaxDSA Team</p>`,
    });

    if (confirmationResult.error) {
      console.error('Error sending confirmation email:', confirmationResult.error);
      throw new Error(`Failed to send confirmation email: ${confirmationResult.error.message}`);
    }
    console.log('Confirmation email sent successfully:', confirmationResult.data);

    // Send notification email to admin with document links
    console.log('Sending admin notification email');
    const adminResult = await resend.emails.send({
      from: "MaxDSA <partner@maxdsa.com>",
      to: ["partner@maxdsa.com"],
      subject: `New Partner Application: ${businessName}`,
      html: `
        <h1>New Partner Application</h1>
        
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>PAN:</strong> ${panNumber}</p>
        <p><strong>Aadhar:</strong> ${aadharNumber}</p>
        
        <h3>Business Details</h3>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Type:</strong> ${businessType}</p>
        <p><strong>Company PAN:</strong> ${companyPanNumber}</p>
        <p><strong>Document Type:</strong> ${companyDocumentType}</p>
        
        <h3>Banking Details</h3>
        <p><strong>Account:</strong> ${bankAccountNumber}</p>
        <p><strong>IFSC:</strong> ${bankIfscCode}</p>
        <p><strong>Bank:</strong> ${bankName}</p>
        ${bankBranch ? `<p><strong>Branch:</strong> ${bankBranch}</p>` : ''}
        <p><strong>Document Type:</strong> ${bankDocumentType}</p>
        
        ${referenceName ? `<h3>Reference</h3><p><strong>Name:</strong> ${referenceName}</p>${referencePhone ? `<p><strong>Phone:</strong> ${referencePhone}</p>` : ''}${referenceEmail ? `<p><strong>Email:</strong> ${referenceEmail}</p>` : ''}` : ''}
        
        <h3>Document Downloads</h3>
        <p>Documents are available for 7 days:</p>
        <ul>
          <li><a href="${passportPhotoSignedUrl?.signedUrl}" target="_blank">📷 Download Passport Photo</a></li>
          <li><a href="${companyDocSignedUrl?.signedUrl}" target="_blank">📄 Download Company Document (${companyDocumentType})</a></li>
          <li><a href="${gstSignedUrl?.signedUrl}" target="_blank">📄 Download GST Registration</a></li>
          <li><a href="${bankDocSignedUrl?.signedUrl}" target="_blank">🏦 Download Bank Document (${bankDocumentType})</a></li>
        </ul>
        
        <p><em>Review the application and documents to proceed with onboarding.</em></p>
      `,
    });

    if (adminResult.error) {
      console.error('Error sending admin email:', adminResult.error);
      throw new Error(`Failed to send admin notification: ${adminResult.error.message}`);
    }
    console.log('Admin email sent successfully:', adminResult.data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
