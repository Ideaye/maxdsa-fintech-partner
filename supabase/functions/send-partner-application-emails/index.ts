import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PartnerApplicationRequest {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  yearsInBusiness: string;
  partnershipType: string;
  monthlyLeadCapacity: string;
  regionsOfOperation: string;
  additionalInformation?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      fullName, 
      email, 
      phone, 
      businessName, 
      businessType, 
      yearsInBusiness, 
      partnershipType, 
      monthlyLeadCapacity, 
      regionsOfOperation, 
      additionalInformation 
    }: PartnerApplicationRequest = await req.json();

    console.log("Sending partner application emails for:", { fullName, email, businessName });

    // Send confirmation email to applicant
    const applicantEmail = await resend.emails.send({
      from: "MaxDSA Partnerships <partner@maxdsa.com>",
      to: [email],
      subject: "Thank You for Your Partnership Application",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Thank You, ${fullName}!</h1>
          <p>We have received your partnership application for <strong>${businessName}</strong>.</p>
          <p>Our team will review your application and get back to you within 2-3 business days.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Next Steps:</h3>
            <ul>
              <li>Our team will review your application</li>
              <li>We'll contact you to discuss partnership opportunities</li>
              <li>If approved, we'll guide you through the onboarding process</li>
            </ul>
          </div>
          <p>If you have any questions, feel free to reach out to us at partner@maxdsa.com</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            The MaxDSA Team
          </p>
        </div>
      `,
    });

    console.log("Applicant confirmation email sent:", applicantEmail);

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: "MaxDSA Partnerships <partner@maxdsa.com>",
      to: ["partner@maxdsa.com"],
      subject: `New Partnership Application: ${businessName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <div style="background-color: #2563eb; padding: 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Partnership Application</h1>
              </div>
              
              <!-- Content -->
              <div style="padding: 24px;">
                <!-- Personal Information Section -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td colspan="2" style="background-color: #f0f9ff; padding: 12px; border: 1px solid #e5e7eb; border-bottom: none;">
                      <h2 style="margin: 0; font-size: 18px; color: #1f2937;">Personal Information</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #ffffff; width: 40%; font-weight: bold; color: #374151;">
                      Name
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #ffffff; color: #1f2937;">
                      ${fullName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #f9fafb; font-weight: bold; color: #374151;">
                      Email
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #f9fafb; color: #1f2937;">
                      ${email}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #ffffff; font-weight: bold; color: #374151;">
                      Phone
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #ffffff; color: #1f2937;">
                      ${phone}
                    </td>
                  </tr>
                </table>

                <!-- Business Information Section -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td colspan="2" style="background-color: #f0f9ff; padding: 12px; border: 1px solid #e5e7eb; border-bottom: none;">
                      <h2 style="margin: 0; font-size: 18px; color: #1f2937;">Business Information</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #ffffff; width: 40%; font-weight: bold; color: #374151;">
                      Business Name
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #ffffff; color: #1f2937;">
                      ${businessName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #f9fafb; font-weight: bold; color: #374151;">
                      Business Type
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #f9fafb; color: #1f2937;">
                      ${businessType}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #ffffff; font-weight: bold; color: #374151;">
                      Years in Business
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #ffffff; color: #1f2937;">
                      ${yearsInBusiness}
                    </td>
                  </tr>
                </table>

                <!-- Partnership Details Section -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td colspan="2" style="background-color: #f0f9ff; padding: 12px; border: 1px solid #e5e7eb; border-bottom: none;">
                      <h2 style="margin: 0; font-size: 18px; color: #1f2937;">Partnership Details</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #ffffff; width: 40%; font-weight: bold; color: #374151;">
                      Partnership Type
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #ffffff; color: #1f2937;">
                      ${partnershipType}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #f9fafb; font-weight: bold; color: #374151;">
                      Monthly Lead Capacity
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #f9fafb; color: #1f2937;">
                      ${monthlyLeadCapacity}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #ffffff; font-weight: bold; color: #374151;">
                      Regions of Operation
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; border-left: none; background-color: #ffffff; color: #1f2937;">
                      ${regionsOfOperation}
                    </td>
                  </tr>
                </table>

                ${additionalInformation ? `
                <!-- Additional Information Section -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="background-color: #f0f9ff; padding: 12px; border: 1px solid #e5e7eb; border-bottom: none;">
                      <h2 style="margin: 0; font-size: 18px; color: #1f2937;">Additional Information</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; border-top: none; background-color: #ffffff; color: #1f2937; white-space: pre-wrap;">
                      ${additionalInformation}
                    </td>
                  </tr>
                </table>
                ` : ''}

                <!-- Footer -->
                <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    Login to your admin panel to view the full application details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin notification email sent:", adminEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        applicantEmailId: applicantEmail.data?.id,
        adminEmailId: adminEmail.data?.id 
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
    console.error("Error in send-partner-application-emails function:", error);
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
