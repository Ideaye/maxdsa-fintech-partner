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

    // Generate signed URLs for documents (valid for 1 hour for security)
    // Admin needs to access documents within this timeframe
    const { data: passportPhotoSignedUrl } = await supabaseClient.storage
      .from('partner-documents')
      .createSignedUrl(passportPhotoUrl, 3600);

    const { data: companyDocSignedUrl } = await supabaseClient.storage
      .from('partner-documents')
      .createSignedUrl(companyDocumentUrl, 3600);

    const { data: gstSignedUrl } = await supabaseClient.storage
      .from('partner-documents')
      .createSignedUrl(gstRegistrationUrl, 3600);

    const { data: bankDocSignedUrl } = await supabaseClient.storage
      .from('partner-documents')
      .createSignedUrl(bankDocumentUrl, 3600);

    // Send confirmation email to applicant
    console.log('Sending confirmation email to:', email);
    const confirmationResult = await resend.emails.send({
      from: "MaxDSA <partner@maxdsa.com>",
      to: [email],
      subject: "Partner Application Received - MaxDSA",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; }
              .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background: linear-gradient(135deg, #1a56db 0%, #1e40af 100%); color: #ffffff; padding: 40px 20px; text-align: center; }
              .header-icon { font-size: 48px; margin-bottom: 10px; }
              .header h1 { margin: 10px 0 5px 0; font-size: 28px; font-weight: 600; }
              .header p { margin: 5px 0 0 0; font-size: 16px; opacity: 0.95; }
              .content { padding: 30px 20px; }
              .intro { background-color: #eff6ff; border-left: 4px solid #1a56db; padding: 20px; margin-bottom: 30px; border-radius: 4px; }
              .intro p { margin: 8px 0; color: #374151; line-height: 1.6; }
              .section { margin-bottom: 25px; }
              .section-title { font-size: 16px; font-weight: 600; color: #1a56db; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
              .info-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
              .info-table tr { border-bottom: 1px solid #e5e7eb; }
              .info-table tr:last-child { border-bottom: none; }
              .info-table td { padding: 10px 12px; font-size: 14px; }
              .info-table td:first-child { font-weight: 600; color: #374151; width: 45%; background-color: #f9fafb; }
              .info-table td:last-child { color: #6b7280; }
              .documents-list { background-color: #f9fafb; padding: 15px 20px; border-radius: 6px; margin-top: 20px; }
              .document-item { padding: 8px 0; color: #374151; font-size: 14px; }
              .document-item:before { content: '✓'; color: #10b981; font-weight: bold; margin-right: 8px; }
              .footer { background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb; }
              .logo-container { margin-bottom: 20px; }
              .logo-text { font-size: 24px; font-weight: 700; color: #1a56db; margin: 0; }
              .button-container { margin: 20px 0; }
              .button { display: inline-block; margin: 8px 5px; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; transition: all 0.3s; }
              .button-primary { background-color: #1a56db; color: #ffffff; }
              .button-primary:hover { background-color: #1e40af; }
              .button-secondary { background-color: #ffffff; color: #1a56db; border: 2px solid #1a56db; }
              .button-secondary:hover { background-color: #eff6ff; }
              .footer-text { color: #6b7280; font-size: 13px; margin: 10px 0; }
              .footer-contact { color: #9ca3af; font-size: 12px; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <!-- Header Section -->
              <div class="header">
                <img src="https://tqqwtctwknherkejrpss.supabase.co/storage/v1/object/public/website-assets/maxdsa-logo.png" alt="MaxDSA" style="height: 50px; margin-bottom: 15px;" />
                <div class="header-icon">🎉</div>
                <h1>Thank You, ${fullName}!</h1>
                <p>Your partnership application has been successfully submitted</p>
              </div>
              
              <div class="content">
                <!-- Introduction Message -->
                <div class="intro">
                  <p><strong>Dear ${fullName},</strong></p>
                  <p>We have received your partnership application and appreciate your interest in joining MaxDSA. Our team will carefully review your application and get back to you within <strong>2-3 business days</strong>.</p>
                  <p>In the meantime, you can review the information you submitted below.</p>
                </div>

                <!-- Application Summary -->
                <h2 style="font-size: 20px; color: #1f2937; margin-bottom: 20px;">Application Summary</h2>

                <!-- Personal Information -->
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
                      <td>${aadharNumber.replace(/\d(?=\d{4})/g, 'X')}</td>
                    </tr>
                  </table>
                </div>

                <!-- Business Details -->
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
                      <td>Document Type</td>
                      <td>${companyDocumentType}</td>
                    </tr>
                  </table>
                </div>

                <!-- Banking Details -->
                <div class="section">
                  <div class="section-title">🏦 Banking Details</div>
                  <table class="info-table">
                    <tr>
                      <td>Account Number</td>
                      <td>${bankAccountNumber.replace(/\d(?=\d{4})/g, 'X')}</td>
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
                  </table>
                </div>

                ${referenceName ? `
                <!-- Reference Information -->
                <div class="section">
                  <div class="section-title">📞 Reference Information</div>
                  <table class="info-table">
                    <tr>
                      <td>Reference Name</td>
                      <td>${referenceName}</td>
                    </tr>
                    ${referencePhone ? `<tr>
                      <td>Phone Number</td>
                      <td>${referencePhone}</td>
                    </tr>` : ''}
                    ${referenceEmail ? `<tr>
                      <td>Email Address</td>
                      <td>${referenceEmail}</td>
                    </tr>` : ''}
                  </table>
                </div>
                ` : ''}

                <!-- Documents Submitted -->
                <div class="documents-list">
                  <div class="section-title">📄 Documents Submitted</div>
                  <div class="document-item">Passport Size Photo</div>
                  <div class="document-item">Company Document (${companyDocumentType})</div>
                  <div class="document-item">GST Registration Certificate</div>
                  <div class="document-item">Bank Document (${bankDocumentType})</div>
                </div>
              </div>

              <!-- Footer Section -->
              <div class="footer">
                <div class="logo-container">
                  <img src="https://tqqwtctwknherkejrpss.supabase.co/storage/v1/object/public/website-assets/maxdsa-logo.png" alt="MaxDSA" style="height: 32px; margin-bottom: 10px;" />
                </div>
                
                <div class="button-container">
                  <a href="https://maxdsa.com" target="_blank" class="button button-primary">Visit Website</a>
                  <a href="mailto:partner@maxdsa.com" class="button button-secondary">Contact Us</a>
                </div>
                
                <p class="footer-text">We're excited about the possibility of partnering with you!</p>
                <p class="footer-text">If you have any questions, feel free to reach out to us anytime.</p>
                
                <div class="footer-contact">
                  <p style="margin: 5px 0;">📧 partner@maxdsa.com</p>
                  <p style="margin: 15px 0 5px 0;">© 2025 MaxDSA. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
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
                <img src="https://tqqwtctwknherkejrpss.supabase.co/storage/v1/object/public/website-assets/maxdsa-logo.png" alt="MaxDSA" style="height: 40px; margin-bottom: 10px;" />
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
