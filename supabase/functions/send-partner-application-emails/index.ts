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
  businessName: string;
  partnershipType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, businessName, partnershipType }: PartnerApplicationRequest = await req.json();

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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">New Partnership Application</h1>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Application Details:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Partnership Type:</strong> ${partnershipType}</p>
          </div>
          <p>Login to your admin panel to view the full application details.</p>
        </div>
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
