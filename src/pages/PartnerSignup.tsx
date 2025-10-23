import { useState } from "react";
import { Link } from "react-router-dom";
import OffersBanner from "@/components/shared/OffersBanner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight01Icon, ArrowLeft01Icon } from "hugeicons-react";
import { Upload, FileText, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PartnerSignup = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    aadharNumber: "",
    panCard: null as File | null,
    aadharCard: null as File | null,
    correspondenceAddress: "",
    city: "",
    state: "",
    pincode: "",
    passportPhoto: null as File | null,
    businessName: "",
    companyPanNumber: "",
    companyDocumentType: "",
    companyDocument: null as File | null,
    gstRegistration: null as File | null,
    additionalDocuments: [] as File[],
    bankAccountNumber: "",
    bankIfscCode: "",
    bankName: "",
    bankBranch: "",
    bankDocumentType: "",
    bankDocument: null as File | null,
    referenceName: "",
    referencePhone: "",
    reference2Name: "",
    reference2Phone: "",
    agreedToTerms: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validatePincode = (pincode: string) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validateIFSC = (ifsc: string) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifsc);
  };

  const validateFile = (file: File | null, fieldName: string) => {
    if (!file) {
      toast({
        title: "Error",
        description: `Please upload ${fieldName}`,
        variant: "destructive",
      });
      return false;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB limit to prevent large zip files
    if (file.size > maxSize) {
      toast({
        title: "Error",
        description: `${fieldName} must be less than 2MB. Please compress or reduce the file size.`,
        variant: "destructive",
      });
      return false;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: `${fieldName} must be JPG, PNG, or PDF`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File, path: string, fieldName: string): Promise<string | null> => {
    try {
      setUploadProgress(prev => ({ ...prev, [fieldName]: 0 }));

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('partner-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      setUploadProgress(prev => ({ ...prev, [fieldName]: 100 }));
      return filePath;
    } catch (error: any) {
      console.error(`Error uploading ${fieldName}:`, error);
      toast({
        title: "Upload Error",
        description: `Failed to upload ${fieldName}. Please try again.`,
        variant: "destructive",
      });
      return null;
    }
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone || !formData.aadharNumber || !formData.correspondenceAddress || !formData.city || !formData.state || !formData.pincode) {
          toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
          return false;
        }
        if (formData.aadharNumber.length !== 12) {
          toast({ title: "Error", description: "Please enter a valid 12-digit Aadhar number", variant: "destructive" });
          return false;
        }
        if (!validatePincode(formData.pincode)) {
          toast({ title: "Error", description: "Please enter a valid 6-digit pincode", variant: "destructive" });
          return false;
        }
        if (!validateFile(formData.panCard, "PAN card")) {
          return false;
        }
        if (!validateFile(formData.aadharCard, "Aadhar card")) {
          return false;
        }
        if (!validateFile(formData.passportPhoto, "passport photo")) {
          return false;
        }
        return true;
      
      case 2:
        if (!formData.businessName || !formData.companyPanNumber || !formData.companyDocumentType) {
          toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
          return false;
        }
        if (!validatePAN(formData.companyPanNumber)) {
          toast({ title: "Error", description: "Please enter a valid Company PAN number", variant: "destructive" });
          return false;
        }
        if (!validateFile(formData.companyDocument, "company document")) {
          return false;
        }
        return true;
      
      case 3:
        if (!formData.bankAccountNumber || !formData.bankIfscCode || !formData.bankName || !formData.bankDocumentType) {
          toast({ title: "Error", description: "Please fill in all required banking fields", variant: "destructive" });
          return false;
        }
        if (!validateIFSC(formData.bankIfscCode)) {
          toast({ title: "Error", description: "Please enter a valid IFSC code", variant: "destructive" });
          return false;
        }
        if (!validateFile(formData.gstRegistration, "GST registration")) {
          return false;
        }
        if (!validateFile(formData.bankDocument, "bank document")) {
          return false;
        }
        return true;

      case 4:
        if (!formData.referenceName || !formData.referencePhone || !formData.reference2Name || !formData.reference2Phone) {
          toast({ title: "Error", description: "Please provide both reference contacts", variant: "destructive" });
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step) && step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Upload all files in parallel for faster processing
      const baseUploads = [
        uploadFile(formData.panCard!, 'pan-cards', 'PAN card'),
        uploadFile(formData.aadharCard!, 'aadhar-cards', 'Aadhar card'),
        uploadFile(formData.passportPhoto!, 'passport-photos', 'passport photo'),
        uploadFile(formData.companyDocument!, 'company-documents', 'company document'),
        uploadFile(formData.gstRegistration!, 'gst-documents', 'GST registration'),
        uploadFile(formData.bankDocument!, 'bank-documents', 'bank document')
      ];

      // Upload additional documents
      const additionalUploads = formData.additionalDocuments.map((file, index) => 
        uploadFile(file, 'additional-documents', `additional document ${index + 1}`)
      );

      const uploadResults = await Promise.all([...baseUploads, ...additionalUploads]);

      const [panCardPath, aadharCardPath, passportPhotoPath, companyDocumentPath, gstRegistrationPath, bankDocumentPath, ...additionalDocPaths] = uploadResults;

      // Check if any upload failed
      if (!panCardPath || !aadharCardPath || !passportPhotoPath || !companyDocumentPath || !gstRegistrationPath || !bankDocumentPath) {
        setIsSubmitting(false);
        return;
      }

      // Insert into database
      const { error: dbError } = await supabase
        .from('partner_applications')
        .insert([{
          user_id: null, // Anonymous application submission
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          aadhar_number: formData.aadharNumber,
          pan_card_url: panCardPath,
          aadhar_card_url: aadharCardPath,
          correspondence_address: formData.correspondenceAddress,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          passport_photo_url: passportPhotoPath,
          business_name: formData.businessName,
          company_pan_number: formData.companyPanNumber,
          company_document_type: formData.companyDocumentType,
          company_document_url: companyDocumentPath,
          gst_registration_url: gstRegistrationPath,
          additional_documents: additionalDocPaths.filter(p => p !== null),
          bank_account_number: formData.bankAccountNumber,
          bank_ifsc_code: formData.bankIfscCode,
          bank_name: formData.bankName,
          bank_branch: formData.bankBranch || null,
          bank_document_type: formData.bankDocumentType,
          bank_document_url: bankDocumentPath,
          reference_name: formData.referenceName,
          reference_phone: formData.referencePhone,
          reference_2_name: formData.reference2Name,
          reference_2_phone: formData.reference2Phone,
          agreed_to_terms: formData.agreedToTerms,
        }]);

      if (dbError) {
        console.error("Database error:", dbError);
        toast({
          title: "Submission Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send notification emails
      const { error: emailError } = await supabase.functions.invoke(
        'send-partner-application-emails',
        {
          body: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            panNumber: formData.panCard?.name?.split('.')[0] || formData.companyPanNumber,
            aadharNumber: formData.aadharNumber,
            correspondenceAddress: formData.correspondenceAddress,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            businessName: formData.businessName,
            businessType: formData.companyDocumentType,
            companyPanNumber: formData.companyPanNumber,
            companyDocumentType: formData.companyDocumentType,
            bankAccountNumber: formData.bankAccountNumber,
            bankIfscCode: formData.bankIfscCode,
            bankName: formData.bankName,
            bankBranch: formData.bankBranch,
            bankDocumentType: formData.bankDocumentType,
            referenceName: formData.referenceName,
            referencePhone: formData.referencePhone,
            referenceEmail: '',
            reference2Name: formData.reference2Name,
            reference2Phone: formData.reference2Phone,
            panCardUrl: panCardPath,
            aadharCardUrl: aadharCardPath,
            passportPhotoUrl: passportPhotoPath,
            companyDocumentUrl: companyDocumentPath,
            gstRegistrationUrl: gstRegistrationPath,
            bankDocumentUrl: bankDocumentPath,
            additionalDocuments: additionalDocPaths.filter(p => p !== null),
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
      }

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll contact you within 2-3 business days.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const FileUploadInput = ({ 
    id, 
    accept, 
    onChange, 
    file, 
    label, 
    isImage = false 
  }: { 
    id: string; 
    accept: string; 
    onChange: (file: File | null) => void; 
    file: File | null; 
    label: string;
    isImage?: boolean;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} *</Label>
      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
        <input
          id={id}
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="hidden"
        />
        <label htmlFor={id} className="cursor-pointer block">
          {isImage ? (
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
          ) : (
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
          )}
          <p className="text-sm font-medium">
            {file ? file.name : `Click to upload ${label.toLowerCase()}`}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {isImage ? "JPG or PNG" : "PDF, JPG or PNG"}, max 5MB
          </p>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <OffersBanner />
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {isSubmitted ? (
            <div className="text-center py-16">
              <div className="bg-card border border-border rounded-lg p-12 shadow-lg">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Thank you for your interest in partnering with MaxDSA. Our team will review your application and get back to you within 2-3 business days.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" asChild>
                      <Link to="/">Return to Home</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner With MaxDSA</h1>
                <p className="text-muted-foreground text-lg">
                  Join our network and accelerate your business growth
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                        num <= step
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                      
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => updateFormData("fullName", e.target.value)}
                          placeholder="John Doe"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          placeholder="john@example.com"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                        <Input
                          id="aadharNumber"
                          value={formData.aadharNumber}
                          onChange={(e) => updateFormData("aadharNumber", e.target.value.replace(/\D/g, ''))}
                          placeholder="XXXX XXXX XXXX"
                          maxLength={12}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">12-digit Aadhar number</p>
                      </div>

                      <div>
                        <Label htmlFor="correspondenceAddress">Correspondence Address *</Label>
                        <Input
                          id="correspondenceAddress"
                          value={formData.correspondenceAddress}
                          onChange={(e) => updateFormData("correspondenceAddress", e.target.value)}
                          placeholder="Street Address, Area"
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => updateFormData("city", e.target.value)}
                            placeholder="Mumbai"
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => updateFormData("state", e.target.value)}
                            placeholder="Maharashtra"
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            value={formData.pincode}
                            onChange={(e) => updateFormData("pincode", e.target.value.replace(/\D/g, ''))}
                            placeholder="400001"
                            maxLength={6}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <FileUploadInput
                        id="panCard"
                        accept="application/pdf,image/jpeg,image/png"
                        onChange={(file) => updateFormData("panCard", file)}
                        file={formData.panCard}
                        label="PAN Card"
                      />

                      <FileUploadInput
                        id="aadharCard"
                        accept="application/pdf,image/jpeg,image/png"
                        onChange={(file) => updateFormData("aadharCard", file)}
                        file={formData.aadharCard}
                        label="Aadhar Card"
                      />

                      <FileUploadInput
                        id="passportPhoto"
                        accept="image/jpeg,image/png"
                        onChange={(file) => updateFormData("passportPhoto", file)}
                        file={formData.passportPhoto}
                        label="Passport Photo"
                        isImage={true}
                      />
                    </div>
                  )}

                  {/* Step 2: Business Information */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">Business Information</h2>
                      
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => updateFormData("businessName", e.target.value)}
                          placeholder="ABC Financial Services"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="companyPanNumber">Company PAN Number *</Label>
                        <Input
                          id="companyPanNumber"
                          value={formData.companyPanNumber}
                          onChange={(e) => updateFormData("companyPanNumber", e.target.value.toUpperCase())}
                          placeholder="ABCDE1234F"
                          maxLength={10}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Company Document Type *</Label>
                        <RadioGroup
                          value={formData.companyDocumentType}
                          onValueChange={(value) => updateFormData("companyDocumentType", value)}
                          className="mt-2 space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="partnership_deed" id="partnership_deed" />
                            <Label htmlFor="partnership_deed" className="font-normal cursor-pointer">
                              Partnership Deed
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moa" id="moa" />
                            <Label htmlFor="moa" className="font-normal cursor-pointer">
                              MOA (Memorandum of Association)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="aoa" id="aoa" />
                            <Label htmlFor="aoa" className="font-normal cursor-pointer">
                              AOA (Articles of Association)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <FileUploadInput
                        id="companyDocument"
                        accept="application/pdf,image/jpeg,image/png"
                        onChange={(file) => updateFormData("companyDocument", file)}
                        file={formData.companyDocument}
                        label="Company Document"
                      />

                      <div>
                        <Label htmlFor="additionalDocuments">Additional Documents (Optional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer mt-2">
                          <input
                            id="additionalDocuments"
                            type="file"
                            accept="application/pdf,image/jpeg,image/png"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              updateFormData("additionalDocuments", files);
                            }}
                            className="hidden"
                          />
                          <label htmlFor="additionalDocuments" className="cursor-pointer block">
                            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">
                              {formData.additionalDocuments.length > 0 
                                ? `${formData.additionalDocuments.length} file(s) selected` 
                                : 'Click to upload multiple documents'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PDF, JPG or PNG, max 5MB each
                            </p>
                          </label>
                        </div>
                        {formData.additionalDocuments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {formData.additionalDocuments.map((file, index) => (
                              <p key={index} className="text-xs text-muted-foreground">
                                {index + 1}. {file.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Banking & GST Details */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">Banking & GST Details</h2>
                      
                      <FileUploadInput
                        id="gstRegistration"
                        accept="application/pdf,image/jpeg,image/png"
                        onChange={(file) => updateFormData("gstRegistration", file)}
                        file={formData.gstRegistration}
                        label="GST Registration Copy"
                      />

                      <div>
                        <Label htmlFor="bankAccountNumber">Bank Account Number *</Label>
                        <Input
                          id="bankAccountNumber"
                          value={formData.bankAccountNumber}
                          onChange={(e) => updateFormData("bankAccountNumber", e.target.value)}
                          placeholder="1234567890"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bankIfscCode">Bank IFSC Code *</Label>
                        <Input
                          id="bankIfscCode"
                          value={formData.bankIfscCode}
                          onChange={(e) => updateFormData("bankIfscCode", e.target.value.toUpperCase())}
                          placeholder="SBIN0001234"
                          maxLength={11}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">11-character IFSC code</p>
                      </div>

                      <div>
                        <Label htmlFor="bankName">Bank Name *</Label>
                        <Input
                          id="bankName"
                          value={formData.bankName}
                          onChange={(e) => updateFormData("bankName", e.target.value)}
                          placeholder="State Bank of India"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="bankBranch">Bank Branch (Optional)</Label>
                        <Input
                          id="bankBranch"
                          value={formData.bankBranch}
                          onChange={(e) => updateFormData("bankBranch", e.target.value)}
                          placeholder="Mumbai Main Branch"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Bank Document Type *</Label>
                        <RadioGroup
                          value={formData.bankDocumentType}
                          onValueChange={(value) => updateFormData("bankDocumentType", value)}
                          className="mt-2 space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cheque" id="cheque" />
                            <Label htmlFor="cheque" className="font-normal cursor-pointer">
                              Cancelled Cheque Copy
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="statement" id="statement" />
                            <Label htmlFor="statement" className="font-normal cursor-pointer">
                              Bank Statement
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <FileUploadInput
                        id="bankDocument"
                        accept="application/pdf,image/jpeg,image/png"
                        onChange={(file) => updateFormData("bankDocument", file)}
                        file={formData.bankDocument}
                        label="Bank Document"
                      />
                    </div>
                  )}

                  {/* Step 4: Reference & Terms */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">Reference Details & Terms</h2>
                      
                      <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-sm">First Reference *</h3>
                        <div>
                          <Label htmlFor="referenceName">Reference Name *</Label>
                          <Input
                            id="referenceName"
                            value={formData.referenceName}
                            onChange={(e) => updateFormData("referenceName", e.target.value)}
                            placeholder="Reference person's name"
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="referencePhone">Reference Phone *</Label>
                          <Input
                            id="referencePhone"
                            type="tel"
                            value={formData.referencePhone}
                            onChange={(e) => updateFormData("referencePhone", e.target.value)}
                            placeholder="+91 98765 43210"
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-sm">Second Reference *</h3>
                        <div>
                          <Label htmlFor="reference2Name">Reference Name *</Label>
                          <Input
                            id="reference2Name"
                            value={formData.reference2Name}
                            onChange={(e) => updateFormData("reference2Name", e.target.value)}
                            placeholder="Reference person's name"
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="reference2Phone">Reference Phone *</Label>
                          <Input
                            id="reference2Phone"
                            type="tel"
                            value={formData.reference2Phone}
                            onChange={(e) => updateFormData("reference2Phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 pt-4">
                        <Checkbox
                          id="terms"
                          checked={formData.agreedToTerms}
                          onCheckedChange={(checked) => updateFormData("agreedToTerms", checked)}
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions and privacy policy *
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                      >
                        <ArrowLeft01Icon className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                    )}
                    
                    {step < 4 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className={step === 1 ? "ml-auto" : ""}
                      >
                        Next
                        <ArrowRight01Icon className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-auto"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerSignup;
