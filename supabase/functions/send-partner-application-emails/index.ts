import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";
import { encode as base64Encode } from "https://deno.land/std@0.190.0/encoding/base64.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Simple text-based logo for email embedding
const MAXDSA_LOGO = "MaxDSA";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to convert Uint8Array to base64 (uses efficient Deno stdlib)
function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  return base64Encode(uint8Array);
}

interface PartnerApplicationRequest {
  partnerType: 'individual' | 'proprietorship' | 'partnership' | 'private_public_ltd' | 'trust_society' | 'kirana_stores';
  fullName: string;
  email: string;
  phone: string;
  correspondenceAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
  bankAccountNumber: string;
  bankIfscCode: string;
  bankName: string;
  bankBranch?: string;
  bankDocumentType: string;
  bankDocumentUrl?: string;
  referenceName?: string;
  referencePhone?: string;
  reference2Name?: string;
  reference2Phone?: string;
  additionalDocuments?: string[];
  
  // Individual specific
  aadharNumber?: string;
  businessName?: string;
  passportPhotoUrl?: string;
  panCardUrl?: string;
  aadharCardUrl?: string;
  
  // Proprietorship specific
  proprietorName?: string;
  firmName?: string;
  firmGstNumber?: string;
  firmPanNumber?: string;
  firmOfficeAddress?: string;
  
  // Partnership specific
  partnerDetails?: any[];
  
  // Private/Public Ltd specific
  companyName?: string;
  companyGstNumber?: string;
  companyPanNumber?: string;
  companyOfficeAddress?: string;
  companyDocumentType?: string;
  companyDocumentUrl?: string;
  directorDetails?: any[];
  
  // Trust/Society specific
  trustName?: string;
  trustGstNumber?: string;
  trustPanNumber?: string;
  trustOfficeAddress?: string;
  trusteeDetails?: any[];
  
  // Kirana Stores specific
  customerDob?: string;
  retailShopName?: string;
  retailShopAddress?: string;
  residenceAddress?: string;
  geoLocation?: string;
  natureOfRetailShop?: string;
  natureOfShopOwnership?: string;
  natureOfResidenceOwnership?: string;
  shopSize?: string;
  dailyTurnoverRange?: string;
  dailyWalkinsRange?: string;
  udyamNumber?: string;
  retailShopPhotoUrl?: string;
  bankStatementUrl?: string;
  itrDocumentsUrl?: string;
  coApplicantName?: string;
  coApplicantDob?: string;
  coApplicantContact?: string;
  existingLoans?: any[];
  
  // Common documents
  gstRegistrationUrl?: string;
}

async function generateExcelFile(applicationData: PartnerApplicationRequest, documentUrls: any) {
  const XLSX = await import('npm:xlsx@0.18.5');
  
  const workbook = XLSX.utils.book_new();
  
  // Sheet 1: Personal Information
  const personalData = [
    ['Field', 'Value'],
    ['Full Name', applicationData.fullName],
    ['Email Address', applicationData.email],
    ['Phone Number', applicationData.phone],
    ['Partner Type', applicationData.partnerType],
    ['Correspondence Address', applicationData.correspondenceAddress],
    ['City', applicationData.city],
    ['State', applicationData.state],
    ['Pincode', applicationData.pincode],
  ];
  
  if (applicationData.aadharNumber) {
    personalData.push(['Aadhar Number', applicationData.aadharNumber]);
  }
  
  const personalSheet = XLSX.utils.aoa_to_sheet(personalData);
  XLSX.utils.book_append_sheet(workbook, personalSheet, 'Personal Info');
  
  // Sheet 2: Business Details (dynamic based on partner type)
  const businessData: any[][] = [['Field', 'Value']];
  
  if (applicationData.partnerType === 'individual') {
    if (applicationData.businessName) businessData.push(['Business Name', applicationData.businessName]);
  } else if (applicationData.partnerType === 'proprietorship') {
    if (applicationData.proprietorName) businessData.push(['Proprietor Name', applicationData.proprietorName]);
    if (applicationData.firmName) businessData.push(['Firm Name', applicationData.firmName]);
    if (applicationData.firmGstNumber) businessData.push(['GST Number', applicationData.firmGstNumber]);
    if (applicationData.firmPanNumber) businessData.push(['PAN Number', applicationData.firmPanNumber]);
    if (applicationData.firmOfficeAddress) businessData.push(['Office Address', applicationData.firmOfficeAddress]);
  } else if (applicationData.partnerType === 'partnership') {
    if (applicationData.firmName) businessData.push(['Firm Name', applicationData.firmName]);
    if (applicationData.firmGstNumber) businessData.push(['GST Number', applicationData.firmGstNumber]);
    if (applicationData.firmPanNumber) businessData.push(['PAN Number', applicationData.firmPanNumber]);
    if (applicationData.firmOfficeAddress) businessData.push(['Office Address', applicationData.firmOfficeAddress]);
  } else if (applicationData.partnerType === 'private_public_ltd') {
    if (applicationData.companyName) businessData.push(['Company Name', applicationData.companyName]);
    if (applicationData.companyGstNumber) businessData.push(['GST Number', applicationData.companyGstNumber]);
    if (applicationData.companyPanNumber) businessData.push(['PAN Number', applicationData.companyPanNumber]);
    if (applicationData.companyOfficeAddress) businessData.push(['Office Address', applicationData.companyOfficeAddress]);
    if (applicationData.companyDocumentType) businessData.push(['Document Type', applicationData.companyDocumentType]);
  } else if (applicationData.partnerType === 'trust_society') {
    if (applicationData.trustName) businessData.push(['Trust/Society Name', applicationData.trustName]);
    if (applicationData.trustGstNumber) businessData.push(['GST Number', applicationData.trustGstNumber]);
    if (applicationData.trustPanNumber) businessData.push(['PAN Number', applicationData.trustPanNumber]);
    if (applicationData.trustOfficeAddress) businessData.push(['Office Address', applicationData.trustOfficeAddress]);
  } else if (applicationData.partnerType === 'kirana_stores') {
    if (applicationData.retailShopName) businessData.push(['Retail Shop Name', applicationData.retailShopName]);
    if (applicationData.retailShopAddress) businessData.push(['Shop Address', applicationData.retailShopAddress]);
    if (applicationData.residenceAddress) businessData.push(['Residence Address', applicationData.residenceAddress]);
    if (applicationData.natureOfRetailShop) businessData.push(['Nature of Shop', applicationData.natureOfRetailShop]);
    if (applicationData.natureOfShopOwnership) businessData.push(['Shop Ownership', applicationData.natureOfShopOwnership]);
    if (applicationData.natureOfResidenceOwnership) businessData.push(['Residence Ownership', applicationData.natureOfResidenceOwnership]);
    if (applicationData.shopSize) businessData.push(['Shop Size', applicationData.shopSize]);
    if (applicationData.dailyTurnoverRange) businessData.push(['Daily Turnover', applicationData.dailyTurnoverRange]);
    if (applicationData.dailyWalkinsRange) businessData.push(['Daily Walk-ins', applicationData.dailyWalkinsRange]);
    if (applicationData.udyamNumber) businessData.push(['Udyam Number', applicationData.udyamNumber]);
    if (applicationData.customerDob) businessData.push(['Date of Birth', applicationData.customerDob]);
    if (applicationData.coApplicantName) businessData.push(['Co-applicant Name', applicationData.coApplicantName]);
    if (applicationData.coApplicantDob) businessData.push(['Co-applicant DOB', applicationData.coApplicantDob]);
    if (applicationData.coApplicantContact) businessData.push(['Co-applicant Contact', applicationData.coApplicantContact]);
  }
  
  if (businessData.length > 1) {
    const businessSheet = XLSX.utils.aoa_to_sheet(businessData);
    XLSX.utils.book_append_sheet(workbook, businessSheet, 'Business Details');
  }
  
  // Add partner/director/trustee details sheets if applicable
  if (applicationData.partnerDetails && applicationData.partnerDetails.length > 0) {
    const partnerData: any[][] = [['Name', 'PAN', 'Aadhar', 'Address']];
    applicationData.partnerDetails.forEach((p: any) => {
      partnerData.push([p.name || '', p.pan || '', p.aadhar || '', p.address || '']);
    });
    const partnerSheet = XLSX.utils.aoa_to_sheet(partnerData);
    XLSX.utils.book_append_sheet(workbook, partnerSheet, 'Partner Details');
  }
  
  if (applicationData.directorDetails && applicationData.directorDetails.length > 0) {
    const directorData: any[][] = [['Name', 'PAN', 'Aadhar', 'Address']];
    applicationData.directorDetails.forEach((d: any) => {
      directorData.push([d.name || '', d.pan || '', d.aadhar || '', d.address || '']);
    });
    const directorSheet = XLSX.utils.aoa_to_sheet(directorData);
    XLSX.utils.book_append_sheet(workbook, directorSheet, 'Director Details');
  }
  
  if (applicationData.trusteeDetails && applicationData.trusteeDetails.length > 0) {
    const trusteeData: any[][] = [['Name', 'PAN', 'Aadhar', 'Address']];
    applicationData.trusteeDetails.forEach((t: any) => {
      trusteeData.push([t.name || '', t.pan || '', t.aadhar || '', t.address || '']);
    });
    const trusteeSheet = XLSX.utils.aoa_to_sheet(trusteeData);
    XLSX.utils.book_append_sheet(workbook, trusteeSheet, 'Trustee Details');
  }
  
  // Add existing loans sheet for Kirana Stores
  if (applicationData.existingLoans && applicationData.existingLoans.length > 0) {
    const loansData: any[][] = [['Financier Name', 'Loan Amount', 'EMI Amount', 'Tenor', 'Date Availed']];
    applicationData.existingLoans.forEach((loan: any) => {
      loansData.push([
        loan.financierName || '',
        loan.loanAmount || '',
        loan.emiAmount || '',
        loan.tenor || '',
        loan.loanAvailedDate || ''
      ]);
    });
    const loansSheet = XLSX.utils.aoa_to_sheet(loansData);
    XLSX.utils.book_append_sheet(workbook, loansSheet, 'Existing Loans');
  }
  
  // Sheet 3: Banking Information
  const bankingData = [
    ['Field', 'Value'],
    ['Bank Name', applicationData.bankName],
    ['Bank Branch', applicationData.bankBranch || 'N/A'],
    ['Account Number', applicationData.bankAccountNumber],
    ['IFSC Code', applicationData.bankIfscCode],
    ['Bank Document Type', applicationData.bankDocumentType],
  ];
  const bankingSheet = XLSX.utils.aoa_to_sheet(bankingData);
  XLSX.utils.book_append_sheet(workbook, bankingSheet, 'Banking Info');
  
  // Sheet 4: Reference Information
  const referenceData = [
    ['Field', 'Value'],
    ['Reference 1 Name', applicationData.referenceName || 'N/A'],
    ['Reference 1 Phone', applicationData.referencePhone || 'N/A'],
    ['Reference 1 Email', applicationData.referenceEmail || 'N/A'],
    ['Reference 2 Name', applicationData.reference2Name || 'N/A'],
    ['Reference 2 Phone', applicationData.reference2Phone || 'N/A'],
  ];
  const referenceSheet = XLSX.utils.aoa_to_sheet(referenceData);
  XLSX.utils.book_append_sheet(workbook, referenceSheet, 'References');
  
  // Sheet: Document Links (dynamic based on what's uploaded)
  const documentData: any[][] = [['Document Type', 'URL (Valid for 7 days)']];
  
  if (documentUrls.passportPhoto) documentData.push(['Passport Photo', documentUrls.passportPhoto]);
  if (documentUrls.panCard) documentData.push(['PAN Card', documentUrls.panCard]);
  if (documentUrls.aadharCard) documentData.push(['Aadhar Card', documentUrls.aadharCard]);
  if (documentUrls.companyDocument) documentData.push(['Company Document', documentUrls.companyDocument]);
  if (documentUrls.gstRegistration) documentData.push(['GST Registration', documentUrls.gstRegistration]);
  if (documentUrls.bankDocument) documentData.push(['Bank Document', documentUrls.bankDocument]);
  if (documentUrls.retailShopPhoto) documentData.push(['Retail Shop Photo', documentUrls.retailShopPhoto]);
  if (documentUrls.bankStatement) documentData.push(['Bank Statement', documentUrls.bankStatement]);
  if (documentUrls.itrDocuments) documentData.push(['ITR Documents', documentUrls.itrDocuments]);
  
  if (applicationData.additionalDocuments && applicationData.additionalDocuments.length > 0) {
    applicationData.additionalDocuments.forEach((doc, index) => {
      documentData.push([`Additional Document ${index + 1}`, documentUrls.additionalDocs?.[index] || doc]);
    });
  }
  
  if (documentData.length > 1) {
    const documentSheet = XLSX.utils.aoa_to_sheet(documentData);
    XLSX.utils.book_append_sheet(workbook, documentSheet, 'Document Links');
  }
  
  const excelBuffer = XLSX.write(workbook, { 
    type: 'buffer', 
    bookType: 'xlsx' 
  });
  
  return excelBuffer;
}

async function createDocumentZip(
  supabaseClient: any, 
  documentPaths: { path: string; category: string }[], 
  businessName: string
) {
  const JSZip = (await import('npm:jszip@3.10.1')).default;
  const zip = new JSZip();
  
  const personalFolder = zip.folder('Personal_Documents');
  const businessFolder = zip.folder('Business_Documents');
  const bankingFolder = zip.folder('Banking_Documents');
  const additionalFolder = zip.folder('Additional_Documents');
  
  for (const { path, category } of documentPaths) {
    try {
      const { data, error } = await supabaseClient.storage
        .from('partner-documents')
        .download(path);
      
      if (!error && data) {
        const fileName = path.split('/').pop() || 'document';
        
        if (category === 'personal') {
          personalFolder?.file(fileName, data);
        } else if (category === 'business') {
          businessFolder?.file(fileName, data);
        } else if (category === 'banking') {
          bankingFolder?.file(fileName, data);
        } else if (category === 'additional') {
          additionalFolder?.file(fileName, data);
        }
      } else {
        console.error(`Failed to download ${path}:`, error);
      }
    } catch (error) {
      console.error(`Error processing ${path}:`, error);
    }
  }
  
  const zipBuffer = await zip.generateAsync({ 
    type: 'uint8array',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });
  
  return zipBuffer;
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

    const applicationData: PartnerApplicationRequest = await req.json();

    console.log('Received application data for partner type:', applicationData.partnerType);

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Helper function to safely create signed URL
    const createSignedUrlSafely = async (path: string | undefined) => {
      if (!path) return null;
      try {
        const { data } = await supabaseClient.storage
          .from('partner-documents')
          .createSignedUrl(path, 604800);
        return data?.signedUrl || null;
      } catch (error) {
        console.error(`Failed to create signed URL for ${path}:`, error);
        return null;
      }
    };

    // Generate signed URLs for documents (only for uploaded docs)
    const passportPhotoSignedUrl = await createSignedUrlSafely(applicationData.passportPhotoUrl);
    const panCardSignedUrl = await createSignedUrlSafely(applicationData.panCardUrl);
    const aadharCardSignedUrl = await createSignedUrlSafely(applicationData.aadharCardUrl);
    const companyDocSignedUrl = await createSignedUrlSafely(applicationData.companyDocumentUrl);
    const gstSignedUrl = await createSignedUrlSafely(applicationData.gstRegistrationUrl);
    const bankDocSignedUrl = await createSignedUrlSafely(applicationData.bankDocumentUrl);

    // Generate signed URLs for additional documents if any
    const additionalDocSignedUrls: string[] = [];
    if (applicationData.additionalDocuments && applicationData.additionalDocuments.length > 0) {
      for (const docPath of applicationData.additionalDocuments) {
        const signedUrl = await createSignedUrlSafely(docPath);
        if (signedUrl) {
          additionalDocSignedUrls.push(signedUrl);
        }
      }
    }

    const documentUrls = {
      passportPhoto: passportPhotoSignedUrl,
      panCard: panCardSignedUrl,
      aadharCard: aadharCardSignedUrl,
      companyDocument: companyDocSignedUrl,
      gstRegistration: gstSignedUrl,
      bankDocument: bankDocSignedUrl,
      additionalDocs: additionalDocSignedUrls,
    };

    // Prepare document paths for zip creation (only include uploaded documents)
    const documentPaths: { path: string; category: string }[] = [];
    
    if (applicationData.passportPhotoUrl) documentPaths.push({ path: applicationData.passportPhotoUrl, category: 'personal' });
    if (applicationData.panCardUrl) documentPaths.push({ path: applicationData.panCardUrl, category: 'personal' });
    if (applicationData.aadharCardUrl) documentPaths.push({ path: applicationData.aadharCardUrl, category: 'personal' });
    if (applicationData.companyDocumentUrl) documentPaths.push({ path: applicationData.companyDocumentUrl, category: 'business' });
    if (applicationData.gstRegistrationUrl) documentPaths.push({ path: applicationData.gstRegistrationUrl, category: 'business' });
    if (applicationData.bankDocumentUrl) documentPaths.push({ path: applicationData.bankDocumentUrl, category: 'banking' });
    
    if (applicationData.additionalDocuments && applicationData.additionalDocuments.length > 0) {
      applicationData.additionalDocuments.forEach(doc => {
        documentPaths.push({ path: doc, category: 'additional' });
      });
    }

    // Generate Excel and Zip files
    let excelBuffer: any = null;
    let zipBuffer: any = null;
    
    try {
      console.log('Generating Excel file...');
      excelBuffer = await generateExcelFile(applicationData, documentUrls);
      console.log('Excel file generated successfully');
    } catch (error) {
      console.error('Failed to generate Excel file:', error);
    }

    try {
      console.log('Creating document zip...');
      const businessName = applicationData.businessName || 
                          applicationData.firmName || 
                          applicationData.companyName || 
                          applicationData.trustName || 
                          applicationData.fullName;
      zipBuffer = await createDocumentZip(supabaseClient, documentPaths, businessName);
      const zipSizeMB = zipBuffer.length / (1024 * 1024);
      console.log(`Zip file created successfully (${zipSizeMB.toFixed(2)} MB)`);
      
      // With 2MB per file limit, zip should stay under 15MB
      if (zipSizeMB >= 20) {
        console.warn(`Zip file too large (${zipSizeMB.toFixed(2)} MB), will not attach to email (limit: 20MB)`);
        zipBuffer = null;
      }
    } catch (error) {
      console.error('Failed to create zip file:', error);
    }

    // Send confirmation email to applicant
    console.log('Sending confirmation email to:', applicationData.email);
    const confirmationResult = await resend.emails.send({
      from: "MaxDSA <partner@maxdsa.com>",
      to: [applicationData.email],
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
              .header h1 { margin: 10px 0 5px 0; font-size: 28px; font-weight: 600; color: #ffffff; }
              .header p { margin: 5px 0 0 0; font-size: 16px; opacity: 0.95; color: #ffffff; }
              .content { padding: 30px 20px; }
              .intro { background-color: #eff6ff; border-left: 4px solid #1a56db; padding: 20px; margin-bottom: 30px; border-radius: 4px; }
              .intro p { margin: 8px 0; color: #374151; line-height: 1.6; }
              .section { margin-bottom: 25px; }
              .section-title { font-size: 16px; font-weight: 600; color: #1a56db; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; display: block; }
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
                <div style="margin-bottom: 15px;">
                  <h2 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0;">${MAXDSA_LOGO}</h2>
                </div>
                <div class="header-icon">🎉</div>
                <h1>Thank You, ${applicationData.fullName}!</h1>
                <p>Your partnership application has been successfully submitted</p>
              </div>
              
              <div class="content">
                <!-- Introduction Message -->
                <div class="intro">
                  <p><strong>Dear ${applicationData.fullName},</strong></p>
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
                      <td>${applicationData.fullName}</td>
                    </tr>
                    <tr>
                      <td>Email Address</td>
                      <td>${applicationData.email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>${applicationData.phone}</td>
                    </tr>
                    <tr>
                      <td>Partner Type</td>
                      <td>${applicationData.partnerType.replace(/_/g, ' ').toUpperCase()}</td>
                    </tr>
                    ${applicationData.aadharNumber ? `
                    <tr>
                      <td>Aadhar Number</td>
                      <td>${applicationData.aadharNumber.replace(/\d(?=\d{4})/g, 'X')}</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>

                <!-- Business Details (dynamic based on partner type) -->
                ${applicationData.businessName || applicationData.firmName || applicationData.companyName || applicationData.trustName ? `
                <div class="section">
                  <div class="section-title">🏢 Business Details</div>
                  <table class="info-table">
                    ${applicationData.businessName ? `<tr><td>Business Name</td><td>${applicationData.businessName}</td></tr>` : ''}
                    ${applicationData.firmName ? `<tr><td>Firm Name</td><td>${applicationData.firmName}</td></tr>` : ''}
                    ${applicationData.firmGstNumber ? `<tr><td>GST Number</td><td>${applicationData.firmGstNumber}</td></tr>` : ''}
                    ${applicationData.firmPanNumber ? `<tr><td>PAN Number</td><td>${applicationData.firmPanNumber}</td></tr>` : ''}
                    ${applicationData.companyName ? `<tr><td>Company Name</td><td>${applicationData.companyName}</td></tr>` : ''}
                    ${applicationData.companyGstNumber ? `<tr><td>GST Number</td><td>${applicationData.companyGstNumber}</td></tr>` : ''}
                    ${applicationData.companyPanNumber ? `<tr><td>PAN Number</td><td>${applicationData.companyPanNumber}</td></tr>` : ''}
                    ${applicationData.trustName ? `<tr><td>Trust/Society Name</td><td>${applicationData.trustName}</td></tr>` : ''}
                    ${applicationData.trustGstNumber ? `<tr><td>GST Number</td><td>${applicationData.trustGstNumber}</td></tr>` : ''}
                    ${applicationData.trustPanNumber ? `<tr><td>PAN Number</td><td>${applicationData.trustPanNumber}</td></tr>` : ''}
                    </tr>
                  </table>
                ` : ''}

                <!-- Banking Information -->
                <div class="section">
                  <div class="section-title">🏦 Banking Information</div>
                  <table class="info-table">
                    <tr>
                      <td>Bank Name</td>
                      <td>${applicationData.bankName}</td>
                    </tr>
                    ${applicationData.bankBranch ? `
                    <tr>
                      <td>Bank Branch</td>
                      <td>${applicationData.bankBranch}</td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td>Account Number</td>
                      <td>${applicationData.bankAccountNumber.replace(/\d(?=\d{4})/g, 'X')}</td>
                    </tr>
                    <tr>
                      <td>IFSC Code</td>
                      <td>${applicationData.bankIfscCode}</td>
                    </tr>
                  </table>
                </div>

                ${applicationData.referenceName ? `
                <!-- Reference Information -->
                <div class="section">
                  <div class="section-title">📞 Reference Information</div>
                  <table class="info-table">
                    ${applicationData.referenceName ? `<tr>
                      <td>Reference 1 Name</td>
                      <td>${applicationData.referenceName}</td>
                    </tr>` : ''}
                    ${applicationData.referencePhone ? `<tr>
                      <td>Reference 1 Phone</td>
                      <td>${applicationData.referencePhone}</td>
                    </tr>` : ''}
                    ${applicationData.reference2Name ? `<tr>
                      <td>Reference 2 Name</td>
                      <td>${applicationData.reference2Name}</td>
                    </tr>` : ''}
                    ${applicationData.reference2Phone ? `<tr>
                      <td>Reference 2 Phone</td>
                      <td>${applicationData.reference2Phone}</td>
                    </tr>` : ''}
                  </table>
                </div>
                ` : ''}

                <!-- Documents Submitted -->
                <div class="documents-list">
                  <div class="section-title">📄 Documents Submitted</div>
                  ${applicationData.passportPhotoUrl ? '<div class="document-item">Passport Photo</div>' : ''}
                  ${applicationData.panCardUrl ? '<div class="document-item">PAN Card</div>' : ''}
                  ${applicationData.aadharCardUrl ? '<div class="document-item">Aadhar Card</div>' : ''}
                  ${applicationData.companyDocumentUrl ? `<div class="document-item">Company Document${applicationData.companyDocumentType ? ` (${applicationData.companyDocumentType})` : ''}</div>` : ''}
                  ${applicationData.gstRegistrationUrl ? '<div class="document-item">GST Registration Certificate</div>' : ''}
                  ${applicationData.bankDocumentUrl ? `<div class="document-item">Bank Document${applicationData.bankDocumentType ? ` (${applicationData.bankDocumentType})` : ''}</div>` : ''}
                  ${applicationData.additionalDocuments && applicationData.additionalDocuments.length > 0 ? 
                    applicationData.additionalDocuments.map((_, i) => `<div class="document-item">Additional Document ${i + 1}</div>`).join('') : ''}
                </div>
              </div>

              <!-- Footer Section -->
              <div class="footer">
                <div class="logo-container">
                  <h3 style="color: #1a56db; font-size: 24px; font-weight: 700; margin: 0 0 10px 0;">${MAXDSA_LOGO}</h3>
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

    // Prepare attachments
    const attachments: any[] = [];
    
    const businessName = applicationData.businessName || 
                        applicationData.firmName || 
                        applicationData.companyName || 
                        applicationData.trustName || 
                        applicationData.fullName;
    
    if (excelBuffer) {
      console.log('Adding Excel file as attachment');
      attachments.push({
        filename: `${businessName.replace(/[^a-zA-Z0-9]/g, '_')}_Application_${Date.now()}.xlsx`,
        content: uint8ArrayToBase64(new Uint8Array(excelBuffer)),
      });
    }
    
    if (zipBuffer) {
      console.log('Adding Zip file as attachment');
      attachments.push({
        filename: `${businessName.replace(/[^a-zA-Z0-9]/g, '_')}_Documents_${Date.now()}.zip`,
        content: uint8ArrayToBase64(zipBuffer),
      });
    }

    // Send notification email to admin with document links and attachments
    console.log('Sending admin notification email with attachments');
    const adminResult = await resend.emails.send({
      from: "MaxDSA <partner@maxdsa.com>",
      to: ["partner@maxdsa.com"],
      subject: `New Partner Application: ${businessName}`,
      attachments: attachments.length > 0 ? attachments : undefined,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
              .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background: linear-gradient(135deg, #1a56db 0%, #1e40af 100%); color: #ffffff; padding: 30px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; font-weight: 600; color: #ffffff; }
              .content { padding: 20px; }
              .section { margin-bottom: 30px; }
              .section-title { font-size: 18px; font-weight: 600; color: #1a56db; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; display: block; }
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
                <div style="margin-bottom: 10px;">
                  <h2 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;">${MAXDSA_LOGO}</h2>
                </div>
                <h1>🎉 New Partner Application Received</h1>
              </div>
              
              <div class="content">
                <!-- Personal Information Section -->
                <div class="section">
                  <div class="section-title">👤 Personal Information</div>
                  <table class="info-table">
                    <tr>
                      <td>Full Name</td>
                      <td>${applicationData.fullName}</td>
                    </tr>
                    <tr>
                      <td>Email Address</td>
                      <td>${applicationData.email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>${applicationData.phone}</td>
                    </tr>
                    <tr>
                      <td>Partner Type</td>
                      <td>${applicationData.partnerType.replace(/_/g, ' ').toUpperCase()}</td>
                    </tr>
                    ${applicationData.aadharNumber ? `
                    <tr>
                      <td>Aadhar Number</td>
                      <td>${applicationData.aadharNumber}</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>

                <!-- Business Details Section (dynamic) -->
                ${applicationData.businessName || applicationData.firmName || applicationData.companyName || applicationData.trustName ? `
                <div class="section">
                  <div class="section-title">🏢 Business Details</div>
                  <table class="info-table">
                    ${applicationData.businessName ? `<tr><td>Business Name</td><td>${applicationData.businessName}</td></tr>` : ''}
                    ${applicationData.proprietorName ? `<tr><td>Proprietor Name</td><td>${applicationData.proprietorName}</td></tr>` : ''}
                    ${applicationData.firmName ? `<tr><td>Firm Name</td><td>${applicationData.firmName}</td></tr>` : ''}
                    ${applicationData.firmGstNumber ? `<tr><td>GST Number</td><td>${applicationData.firmGstNumber}</td></tr>` : ''}
                    ${applicationData.firmPanNumber ? `<tr><td>PAN Number</td><td>${applicationData.firmPanNumber}</td></tr>` : ''}
                    ${applicationData.companyName ? `<tr><td>Company Name</td><td>${applicationData.companyName}</td></tr>` : ''}
                    ${applicationData.companyGstNumber ? `<tr><td>GST Number</td><td>${applicationData.companyGstNumber}</td></tr>` : ''}
                    ${applicationData.companyPanNumber ? `<tr><td>PAN Number</td><td>${applicationData.companyPanNumber}</td></tr>` : ''}
                    ${applicationData.trustName ? `<tr><td>Trust/Society Name</td><td>${applicationData.trustName}</td></tr>` : ''}
                    ${applicationData.trustGstNumber ? `<tr><td>GST Number</td><td>${applicationData.trustGstNumber}</td></tr>` : ''}
                    ${applicationData.trustPanNumber ? `<tr><td>PAN Number</td><td>${applicationData.trustPanNumber}</td></tr>` : ''}
                    </tr>
                  </table>
                </div>

                ` : ''}

                <!-- Banking Details Section -->
                <div class="section">
                  <div class="section-title">🏦 Banking Details</div>
                  <table class="info-table">
                    <tr>
                      <td>Account Number</td>
                      <td>${applicationData.bankAccountNumber}</td>
                    </tr>
                    <tr>
                      <td>IFSC Code</td>
                      <td>${applicationData.bankIfscCode}</td>
                    </tr>
                    <tr>
                      <td>Bank Name</td>
                      <td>${applicationData.bankName}</td>
                    </tr>
                    ${applicationData.bankBranch ? `<tr>
                      <td>Branch</td>
                      <td>${applicationData.bankBranch}</td>
                    </tr>` : ''}
                    <tr>
                      <td>Bank Document Type</td>
                      <td>${applicationData.bankDocumentType}</td>
                    </tr>
                  </table>
                </div>

                ${applicationData.referenceName ? `
                <!-- Reference Section -->
                <div class="section">
                  <div class="section-title">📞 Reference Information</div>
                  <table class="info-table">
                    ${applicationData.referenceName ? `<tr><td>Reference 1 Name</td><td>${applicationData.referenceName}</td></tr>` : ''}
                    ${applicationData.referencePhone ? `<tr><td>Reference 1 Phone</td><td>${applicationData.referencePhone}</td></tr>` : ''}
                    ${applicationData.reference2Name ? `<tr><td>Reference 2 Name</td><td>${applicationData.reference2Name}</td></tr>` : ''}
                    ${applicationData.reference2Phone ? `<tr><td>Reference 2 Phone</td><td>${applicationData.reference2Phone}</td></tr>` : ''}
                  </table>
                </div>
                ` : ''}

                <!-- Attachments Notice -->
                <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #1a56db; margin-top: 0;">📎 Attachments Included</h3>
                  <p style="margin: 10px 0;">This email includes:</p>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>Excel file</strong> - Complete application data organized in sheets</li>
                    <li><strong>Zip file</strong> - All uploaded documents in organized folders</li>
                  </ul>
                  <p style="margin: 10px 0; color: #6b7280; font-size: 14px;">
                    Download the attachments for permanent access to all application data and documents.
                  </p>
                </div>

                <!-- Documents Section -->
                <div class="documents-section">
                  <div class="section-title">📄 Application Documents (Links)</div>
                  <p style="color: #6b7280; margin-bottom: 15px;">Document links are available for the next 7 days:</p>
                  ${passportPhotoSignedUrl ? `<a href="${passportPhotoSignedUrl}" target="_blank" class="document-link">📷 Passport Photo</a>` : ''}
                  ${panCardSignedUrl ? `<a href="${panCardSignedUrl}" target="_blank" class="document-link">📄 PAN Card</a>` : ''}
                  ${aadharCardSignedUrl ? `<a href="${aadharCardSignedUrl}" target="_blank" class="document-link">📄 Aadhar Card</a>` : ''}
                  ${companyDocSignedUrl ? `<a href="${companyDocSignedUrl}" target="_blank" class="document-link">📄 Company Document</a>` : ''}
                  ${gstSignedUrl ? `<a href="${gstSignedUrl}" target="_blank" class="document-link">📄 GST Registration</a>` : ''}
                  ${bankDocSignedUrl ? `<a href="${bankDocSignedUrl}" target="_blank" class="document-link">🏦 Bank Document</a>` : ''}
                  ${additionalDocSignedUrls.map((url, index) => 
                    `<a href="${url}" target="_blank" class="document-link">📄 Additional Doc ${index + 1}</a>`
                  ).join('\n                  ')}
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
