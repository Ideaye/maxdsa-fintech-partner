import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      fullName, email, phone, panNumber, aadharNumber,
      businessName, businessType, companyPanNumber, companyDocumentType,
      bankAccountNumber, bankIfscCode, bankName, bankBranch, bankDocumentType,
      referenceName, referencePhone, referenceEmail
    }: PartnerApplicationRequest = await req.json();

    // Send confirmation email to applicant
    await resend.emails.send({
      from: "MaxDSA <onboarding@resend.dev>",
      to: [email],
      subject: "Partner Application Received - MaxDSA",
      html: `<h1>Thank you, ${fullName}!</h1><p>We have received your partnership application and will review it within 2-3 business days.</p><p>Best regards,<br>The MaxDSA Team</p>`,
    });

    // Send notification email to admin
    await resend.emails.send({
      from: "MaxDSA <onboarding@resend.dev>",
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
      `,
    });

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
