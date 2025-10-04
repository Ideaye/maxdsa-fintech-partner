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
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
              .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background-color: #1a56db; color: #ffffff; padding: 30px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
              .content { padding: 20px; }
              .section { margin-bottom: 30px; }
              .section-title { font-size: 18px; font-weight: 600; color: #1a56db; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
              .info-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
              .info-table tr { border-bottom: 1px solid #e5e7eb; }
              .info-table tr:last-child { border-bottom: none; }
              .info-table td { padding: 12px 10px; }
              .info-table td:first-child { font-weight: 600; color: #374151; width: 40%; background-color: #f9fafb; }
              .info-table td:last-child { color: #6b7280; }
              .documents-section { background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .document-link { display: inline-block; margin: 8px 10px 8px 0; padding: 12px 20px; background-color: #1a56db; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; }
              .document-link:hover { background-color: #1e40af; }
              .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 14px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>🎉 New Partner Application Received</h1>
              </div>
              
              <div class="content">
                <!-- Personal Information Section -->
                <div class="section">
                  <div class="section-title">👤 Personal Information</div>
                  <table class="info-table">
                    <tr>
                      <td>Full Name</td>
                      <td>${fullName}</td>
                    </tr>
                    <tr>
                      <td>Email Address</td>
                      <td>${email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>${phone}</td>
                    </tr>
                    <tr>
                      <td>PAN Number</td>
                      <td>${panNumber}</td>
                    </tr>
                    <tr>
                      <td>Aadhar Number</td>
                      <td>${aadharNumber}</td>
                    </tr>
                  </table>
                </div>

                <!-- Business Details Section -->
                <div class="section">
                  <div class="section-title">🏢 Business Details</div>
                  <table class="info-table">
                    <tr>
                      <td>Business Name</td>
                      <td>${businessName}</td>
                    </tr>
                    <tr>
                      <td>Business Type</td>
                      <td>${businessType}</td>
                    </tr>
                    <tr>
                      <td>Company PAN</td>
                      <td>${companyPanNumber}</td>
                    </tr>
                    <tr>
                      <td>Company Document Type</td>
                      <td>${companyDocumentType}</td>
                    </tr>
                  </table>
                </div>

                <!-- Banking Details Section -->
                <div class="section">
                  <div class="section-title">🏦 Banking Details</div>
                  <table class="info-table">
                    <tr>
                      <td>Account Number</td>
                      <td>${bankAccountNumber}</td>
                    </tr>
                    <tr>
                      <td>IFSC Code</td>
                      <td>${bankIfscCode}</td>
                    </tr>
                    <tr>
                      <td>Bank Name</td>
                      <td>${bankName}</td>
                    </tr>
                    ${bankBranch ? `<tr>
                      <td>Branch</td>
                      <td>${bankBranch}</td>
                    </tr>` : ''}
                    <tr>
                      <td>Bank Document Type</td>
                      <td>${bankDocumentType}</td>
                    </tr>
                  </table>
                </div>

                ${referenceName ? `
                <!-- Reference Section -->
                <div class="section">
                  <div class="section-title">📞 Reference Information</div>
                  <table class="info-table">
                    <tr>
                      <td>Reference Name</td>
                      <td>${referenceName}</td>
                    </tr>
                    ${referencePhone ? `<tr>
                      <td>Reference Phone</td>
                      <td>${referencePhone}</td>
                    </tr>` : ''}
                    ${referenceEmail ? `<tr>
                      <td>Reference Email</td>
                      <td>${referenceEmail}</td>
                    </tr>` : ''}
                  </table>
                </div>
                ` : ''}

                <!-- Documents Section -->
                <div class="documents-section">
                  <div class="section-title">📄 Application Documents</div>
                  <p style="color: #6b7280; margin-bottom: 15px;">All documents are available for download for the next 7 days:</p>
                  <a href="${passportPhotoSignedUrl?.signedUrl}" target="_blank" class="document-link">📷 Passport Photo</a>
                  <a href="${companyDocSignedUrl?.signedUrl}" target="_blank" class="document-link">📄 Company Document</a>
                  <a href="${gstSignedUrl?.signedUrl}" target="_blank" class="document-link">📄 GST Registration</a>
                  <a href="${bankDocSignedUrl?.signedUrl}" target="_blank" class="document-link">🏦 Bank Document</a>
                </div>
              </div>

              <div class="footer">
                <p style="margin: 5px 0;">Please review the application and proceed with onboarding.</p>
                <p style="margin: 5px 0; font-weight: 600; color: #1a56db;">MaxDSA Partner Team</p>
              </div>
            </div>
          </body>
        </html>
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
