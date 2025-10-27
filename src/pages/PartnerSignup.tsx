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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight01Icon, ArrowLeft01Icon } from "hugeicons-react";
import { Upload, FileText, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type PartnerType = "" | "individual" | "proprietorship" | "partnership" | "private_public_ltd" | "trust_society";

interface PartnerDetails {
  name: string;
  panNumber: string;
  aadharNumber: string;
  panCard: File | null;
  aadharCard: File | null;
}

const PartnerSignup = () => {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Partner Type
    partnerType: "" as PartnerType,
    
    // Common fields
    fullName: "",
    phone: "",
    email: "",
    correspondenceAddress: "",
    city: "",
    state: "",
    pincode: "",
    dateOfBirth: "",
    
    // Individual fields
    panNumber: "",
    aadharNumber: "",
    panCard: null as File | null,
    aadharCard: null as File | null,
    passportPhoto: null as File | null,
    
    // Proprietorship fields
    proprietorName: "",
    proprietorPanNumber: "",
    firmName: "",
    firmGstNumber: "",
    
    // Partnership fields
    firmPanNumber: "",
    firmOfficeAddress: "",
    partnerDetails: [] as PartnerDetails[],
    partnershipDeed: null as File | null,
    firmPanCard: null as File | null,
    
    // Private/Public Ltd fields
    companyName: "",
    companyGstNumber: "",
    companyPanNumber: "",
    companyOfficeAddress: "",
    directorDetails: [] as PartnerDetails[],
    moaDocument: null as File | null,
    aoaDocument: null as File | null,
    coiDocument: null as File | null,
    companyPanCard: null as File | null,
    
    // Trust/Society fields
    trustName: "",
    trustGstNumber: "",
    trustPanNumber: "",
    trustOfficeAddress: "",
    trusteeDetails: [] as PartnerDetails[],
    trustDeed: null as File | null,
    trustPanCard: null as File | null,
    
    // Optional documents
    gstRegistration: null as File | null,
    udyamCertificate: null as File | null,
    additionalDocuments: [] as File[],
    
    // Banking fields
    bankAccountNumber: "",
    bankIfscCode: "",
    bankName: "",
    bankBranch: "",
    bankAccountType: "",
    bankDocumentType: "",
    bankDocument: null as File | null,
    
    // References
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

  const validateFile = (file: File | null, fieldName: string, optional: boolean = false) => {
    if (!file && optional) return true;
    
    if (!file) {
      toast({
        title: "Error",
        description: `Please upload ${fieldName}`,
        variant: "destructive",
      });
      return false;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB limit
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
    const { partnerType } = formData;
    
    switch (currentStep) {
      case 0:
        if (!partnerType) {
          toast({ title: "Error", description: "Please select a partner type", variant: "destructive" });
          return false;
        }
        return true;
      
      case 1:
        // Common validation
        if (!formData.fullName || !formData.email || !formData.phone || !formData.correspondenceAddress || !formData.city || !formData.state || !formData.pincode) {
          toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
          return false;
        }
        if (!validatePincode(formData.pincode)) {
          toast({ title: "Error", description: "Please enter a valid 6-digit pincode", variant: "destructive" });
          return false;
        }

        // Type-specific validation
        if (partnerType === "individual") {
          if (!formData.panNumber) {
            toast({ title: "Error", description: "Please enter PAN card number", variant: "destructive" });
            return false;
          }
          if (!validatePAN(formData.panNumber)) {
            toast({ title: "Error", description: "Please enter a valid PAN card number", variant: "destructive" });
            return false;
          }
          if (!formData.aadharNumber || formData.aadharNumber.length !== 12) {
            toast({ title: "Error", description: "Please enter a valid 12-digit Aadhar number", variant: "destructive" });
            return false;
          }
          if (!formData.dateOfBirth) {
            toast({ title: "Error", description: "Please enter your date of birth", variant: "destructive" });
            return false;
          }
          if (!validateFile(formData.panCard, "PAN card") || !validateFile(formData.aadharCard, "Aadhar card") || !validateFile(formData.passportPhoto, "passport photo")) {
            return false;
          }
        } else if (partnerType === "proprietorship") {
          if (!formData.firmName || !formData.proprietorName || !formData.proprietorPanNumber || !formData.aadharNumber) {
            toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
            return false;
          }
          if (!validatePAN(formData.proprietorPanNumber)) {
            toast({ title: "Error", description: "Please enter a valid Proprietor PAN number", variant: "destructive" });
            return false;
          }
          if (formData.aadharNumber.length !== 12) {
            toast({ title: "Error", description: "Please enter a valid 12-digit Aadhar number", variant: "destructive" });
            return false;
          }
        } else if (partnerType === "partnership") {
          if (!formData.firmName || !formData.firmPanNumber || !formData.firmOfficeAddress) {
            toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
            return false;
          }
          if (!validatePAN(formData.firmPanNumber)) {
            toast({ title: "Error", description: "Please enter a valid Firm PAN number", variant: "destructive" });
            return false;
          }
          if (formData.partnerDetails.length < 2) {
            toast({ title: "Error", description: "Please add at least 2 partners", variant: "destructive" });
            return false;
          }
        } else if (partnerType === "private_public_ltd") {
          if (!formData.companyName || !formData.companyOfficeAddress) {
            toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
            return false;
          }
          if (formData.directorDetails.length < 1) {
            toast({ title: "Error", description: "Please add at least 1 director", variant: "destructive" });
            return false;
          }
        } else if (partnerType === "trust_society") {
          if (!formData.trustName || !formData.trustPanNumber || !formData.trustOfficeAddress) {
            toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
            return false;
          }
          if (!validatePAN(formData.trustPanNumber)) {
            toast({ title: "Error", description: "Please enter a valid Trust PAN number", variant: "destructive" });
            return false;
          }
          if (formData.trusteeDetails.length < 1) {
            toast({ title: "Error", description: "Please add at least 1 trustee", variant: "destructive" });
            return false;
          }
        }
        return true;
      
      case 2:
        // Document validation based on partner type
        if (partnerType === "individual") {
          // Individual doesn't need business documents, only personal + banking
          // Optional: GST and additional documents
          return true;
        } else if (partnerType === "proprietorship") {
          if (!validateFile(formData.panCard, "PAN card") || !validateFile(formData.aadharCard, "Aadhar card")) {
            return false;
          }
        } else if (partnerType === "partnership") {
          if (!validateFile(formData.partnershipDeed, "Partnership Deed") || !validateFile(formData.firmPanCard, "Firm PAN Card")) {
            return false;
          }
          // Validate each partner's documents
          for (let i = 0; i < formData.partnerDetails.length; i++) {
            const partner = formData.partnerDetails[i];
            if (!validateFile(partner.panCard, `Partner ${i + 1} PAN card`) || !validateFile(partner.aadharCard, `Partner ${i + 1} Aadhar card`)) {
              return false;
            }
          }
        } else if (partnerType === "private_public_ltd") {
          if (!validateFile(formData.moaDocument, "MOA") || !validateFile(formData.aoaDocument, "AOA") || !validateFile(formData.coiDocument, "COI") || !validateFile(formData.companyPanCard, "Company PAN Card")) {
            return false;
          }
          // Validate each director's documents
          for (let i = 0; i < formData.directorDetails.length; i++) {
            const director = formData.directorDetails[i];
            if (!validateFile(director.panCard, `Director ${i + 1} PAN card`) || !validateFile(director.aadharCard, `Director ${i + 1} Aadhar card`)) {
              return false;
            }
          }
        } else if (partnerType === "trust_society") {
          if (!validateFile(formData.trustDeed, "Trust Deed") || !validateFile(formData.trustPanCard, "Trust PAN Card")) {
            return false;
          }
          // Validate each trustee's documents
          for (let i = 0; i < formData.trusteeDetails.length; i++) {
            const trustee = formData.trusteeDetails[i];
            if (!validateFile(trustee.panCard, `Trustee ${i + 1} PAN card`) || !validateFile(trustee.aadharCard, `Trustee ${i + 1} Aadhar card`)) {
              return false;
            }
          }
        }
        return true;
      
      case 3:
        if (!formData.bankAccountNumber || !formData.bankIfscCode || !formData.bankName || !formData.bankAccountType || !formData.bankDocumentType) {
          toast({ title: "Error", description: "Please fill in all required banking fields", variant: "destructive" });
          return false;
        }
        if (!validateIFSC(formData.bankIfscCode)) {
          toast({ title: "Error", description: "Please enter a valid IFSC code", variant: "destructive" });
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
        if (!formData.agreedToTerms) {
          toast({ title: "Error", description: "Please agree to the terms and conditions", variant: "destructive" });
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
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const { partnerType } = formData;
      
      // Upload files based on partner type
      let uploadPromises: Promise<string | null>[] = [];
      
      if (partnerType === "individual") {
        uploadPromises = [
          uploadFile(formData.panCard!, 'pan-cards', 'PAN card'),
          uploadFile(formData.aadharCard!, 'aadhar-cards', 'Aadhar card'),
          uploadFile(formData.passportPhoto!, 'passport-photos', 'passport photo'),
          formData.gstRegistration ? uploadFile(formData.gstRegistration, 'gst-documents', 'GST registration') : Promise.resolve(null),
        ];
      } else if (partnerType === "proprietorship") {
        uploadPromises = [
          uploadFile(formData.panCard!, 'pan-cards', 'PAN card'),
          uploadFile(formData.aadharCard!, 'aadhar-cards', 'Aadhar card'),
          formData.gstRegistration ? uploadFile(formData.gstRegistration, 'gst-documents', 'GST registration') : Promise.resolve(null),
        ];
      } else if (partnerType === "partnership") {
        uploadPromises = [
          uploadFile(formData.partnershipDeed!, 'partnership-deeds', 'Partnership Deed'),
          uploadFile(formData.firmPanCard!, 'firm-pan-cards', 'Firm PAN Card'),
          formData.gstRegistration ? uploadFile(formData.gstRegistration, 'gst-documents', 'GST registration') : Promise.resolve(null),
          formData.udyamCertificate ? uploadFile(formData.udyamCertificate, 'udyam-certificates', 'Udyam Certificate') : Promise.resolve(null),
        ];
        // Upload partner documents
        for (const partner of formData.partnerDetails) {
          if (partner.panCard) uploadPromises.push(uploadFile(partner.panCard, 'partner-pan-cards', 'Partner PAN card'));
          if (partner.aadharCard) uploadPromises.push(uploadFile(partner.aadharCard, 'partner-aadhar-cards', 'Partner Aadhar card'));
        }
      } else if (partnerType === "private_public_ltd") {
        uploadPromises = [
          uploadFile(formData.moaDocument!, 'moa-documents', 'MOA'),
          uploadFile(formData.aoaDocument!, 'aoa-documents', 'AOA'),
          uploadFile(formData.coiDocument!, 'coi-documents', 'COI'),
          uploadFile(formData.companyPanCard!, 'company-pan-cards', 'Company PAN Card'),
          formData.gstRegistration ? uploadFile(formData.gstRegistration, 'gst-documents', 'GST registration') : Promise.resolve(null),
          formData.udyamCertificate ? uploadFile(formData.udyamCertificate, 'udyam-certificates', 'Udyam Certificate') : Promise.resolve(null),
        ];
        // Upload director documents
        for (const director of formData.directorDetails) {
          if (director.panCard) uploadPromises.push(uploadFile(director.panCard, 'director-pan-cards', 'Director PAN card'));
          if (director.aadharCard) uploadPromises.push(uploadFile(director.aadharCard, 'director-aadhar-cards', 'Director Aadhar card'));
        }
      } else if (partnerType === "trust_society") {
        uploadPromises = [
          uploadFile(formData.trustDeed!, 'trust-deeds', 'Trust Deed'),
          uploadFile(formData.trustPanCard!, 'trust-pan-cards', 'Trust PAN Card'),
          formData.gstRegistration ? uploadFile(formData.gstRegistration, 'gst-documents', 'GST registration') : Promise.resolve(null),
          formData.udyamCertificate ? uploadFile(formData.udyamCertificate, 'udyam-certificates', 'Udyam Certificate') : Promise.resolve(null),
        ];
        // Upload trustee documents
        for (const trustee of formData.trusteeDetails) {
          if (trustee.panCard) uploadPromises.push(uploadFile(trustee.panCard, 'trustee-pan-cards', 'Trustee PAN card'));
          if (trustee.aadharCard) uploadPromises.push(uploadFile(trustee.aadharCard, 'trustee-aadhar-cards', 'Trustee Aadhar card'));
        }
      }

      // Add bank document
      uploadPromises.push(uploadFile(formData.bankDocument!, 'bank-documents', 'bank document'));

      // Upload additional documents
      const additionalUploads = formData.additionalDocuments.map((file, index) => 
        uploadFile(file, 'additional-documents', `additional document ${index + 1}`)
      );

      const uploadResults = await Promise.all([...uploadPromises, ...additionalUploads]);
      
      // Extract upload paths - bank doc is always after primary docs
      const primaryDocs = uploadResults.slice(0, uploadPromises.length - 1);
      const bankDocPath = uploadResults[uploadPromises.length - 1];
      const additionalDocPaths = uploadResults.slice(uploadPromises.length);
      
      // Prepare data based on partner type
      let insertData: any = {
        user_id: null,
        partner_type: partnerType,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        correspondence_address: formData.correspondenceAddress,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        date_of_birth: formData.dateOfBirth || null,
        bank_account_number: formData.bankAccountNumber,
        bank_ifsc_code: formData.bankIfscCode,
        bank_name: formData.bankName,
        bank_branch: formData.bankBranch || null,
        bank_account_type: formData.bankAccountType,
        bank_document_type: formData.bankDocumentType,
        bank_document_url: bankDocPath,
        reference_name: formData.referenceName,
        reference_phone: formData.referencePhone,
        reference_2_name: formData.reference2Name,
        reference_2_phone: formData.reference2Phone,
        agreed_to_terms: formData.agreedToTerms,
        additional_documents: additionalDocPaths.filter(p => p !== null),
      };
      
      // Add partner-type-specific fields
      if (partnerType === "individual") {
        insertData = {
          ...insertData,
          pan_number: formData.panNumber,
          aadhar_number: formData.aadharNumber,
          pan_card_url: primaryDocs[0] || "",
          aadhar_card_url: primaryDocs[1] || "",
          passport_photo_url: primaryDocs[2],
          gst_registration_url: primaryDocs[3],
        };
      } else if (partnerType === "proprietorship") {
        insertData = {
          ...insertData,
          proprietor_name: formData.proprietorName,
          proprietor_pan_number: formData.proprietorPanNumber,
          firm_name: formData.firmName,
          firm_gst_number: formData.firmGstNumber,
          aadhar_number: formData.aadharNumber,
          pan_card_url: primaryDocs[0] || "",
          aadhar_card_url: primaryDocs[1] || "",
          gst_registration_url: primaryDocs[2],
        };
      } else if (partnerType === "partnership") {
        insertData = {
          ...insertData,
          firm_name: formData.firmName,
          firm_pan_number: formData.firmPanNumber,
          firm_office_address: formData.firmOfficeAddress,
          partner_details: formData.partnerDetails,
          pan_card_url: primaryDocs[1] || "",
          gst_registration_url: primaryDocs[2],
          company_document_url: primaryDocs[0], // Partnership deed
          company_document_type: "partnership_deed",
        };
      } else if (partnerType === "private_public_ltd") {
        insertData = {
          ...insertData,
          company_name: formData.companyName,
          company_gst_number: formData.companyGstNumber,
          company_office_address: formData.companyOfficeAddress,
          company_pan_number: formData.companyPanNumber,
          director_details: formData.directorDetails,
          pan_card_url: primaryDocs[3] || "",
          gst_registration_url: primaryDocs[4],
          company_document_url: primaryDocs[0], // MOA
          company_document_type: "moa",
        };
      } else if (partnerType === "trust_society") {
        insertData = {
          ...insertData,
          trust_name: formData.trustName,
          trust_gst_number: formData.trustGstNumber,
          trust_pan_number: formData.trustPanNumber,
          trust_office_address: formData.trustOfficeAddress,
          trustee_details: formData.trusteeDetails,
          pan_card_url: primaryDocs[1] || "",
          gst_registration_url: primaryDocs[2],
          company_document_url: primaryDocs[0], // Trust deed
          company_document_type: "trust_deed",
        };
      }

      // Insert into database
      const { error: dbError } = await supabase
        .from('partner_applications')
        .insert([insertData]);

      if (dbError) {
        console.error("Database error:", dbError);
        console.error("Full error details:", JSON.stringify(dbError, null, 2));
        toast({
          title: "Submission Error",
          description: `Database error: ${dbError.message || "Please try again"}`,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send email notification using edge function with complete data
      console.log('Invoking send-partner-application-emails function...');
      const emailPayload: any = {
        partnerType: formData.partnerType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        correspondenceAddress: formData.correspondenceAddress,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        bankAccountNumber: formData.bankAccountNumber,
        bankIfscCode: formData.bankIfscCode,
        bankName: formData.bankName,
        bankBranch: formData.bankBranch,
        bankDocumentType: formData.bankDocumentType,
        bankDocumentUrl: bankDocPath,
        referenceName: formData.referenceName,
        referencePhone: formData.referencePhone,
        reference2Name: formData.reference2Name,
        reference2Phone: formData.reference2Phone,
        additionalDocuments: additionalDocPaths,
        ...insertData, // Include all partner-type-specific fields
      };

      const { error: emailError } = await supabase.functions.invoke(
        'send-partner-application-emails',
        { body: emailPayload }
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
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Error details:", errorMessage);
      toast({
        title: "Submission Error",
        description: `Error: ${errorMessage}`,
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
    isImage = false,
    optional = false
  }: { 
    id: string; 
    accept: string; 
    onChange: (file: File | null) => void; 
    file: File | null; 
    label: string;
    isImage?: boolean;
    optional?: boolean;
  }) => {
    const handleFileChange = (selectedFile: File | null) => {
      if (!selectedFile) {
        onChange(null);
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (selectedFile.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `${label} must be less than 2MB. Please compress or reduce the file size before uploading.`,
          variant: "destructive",
        });
        const input = document.getElementById(id) as HTMLInputElement;
        if (input) input.value = '';
        onChange(null);
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid File Type",
          description: `${label} must be JPG, PNG, or PDF`,
          variant: "destructive",
        });
        const input = document.getElementById(id) as HTMLInputElement;
        if (input) input.value = '';
        onChange(null);
        return;
      }

      onChange(selectedFile);
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label} {optional ? "(Optional)" : "*"}</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <input
            id={id}
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
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
              {isImage ? "JPG or PNG" : "PDF, JPG or PNG"}, max 2MB
            </p>
          </label>
        </div>
      </div>
    );
  };

  const addPartnerDetail = () => {
    setFormData(prev => ({
      ...prev,
      partnerDetails: [...prev.partnerDetails, { name: "", panNumber: "", aadharNumber: "", panCard: null, aadharCard: null }]
    }));
  };

  const removePartnerDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      partnerDetails: prev.partnerDetails.filter((_, i) => i !== index)
    }));
  };

  const updatePartnerDetail = (index: number, field: keyof PartnerDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      partnerDetails: prev.partnerDetails.map((partner, i) => 
        i === index ? { ...partner, [field]: value } : partner
      )
    }));
  };

  const addDirectorDetail = () => {
    setFormData(prev => ({
      ...prev,
      directorDetails: [...prev.directorDetails, { name: "", panNumber: "", aadharNumber: "", panCard: null, aadharCard: null }]
    }));
  };

  const removeDirectorDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      directorDetails: prev.directorDetails.filter((_, i) => i !== index)
    }));
  };

  const updateDirectorDetail = (index: number, field: keyof PartnerDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      directorDetails: prev.directorDetails.map((director, i) => 
        i === index ? { ...director, [field]: value } : director
      )
    }));
  };

  const addTrusteeDetail = () => {
    setFormData(prev => ({
      ...prev,
      trusteeDetails: [...prev.trusteeDetails, { name: "", panNumber: "", aadharNumber: "", panCard: null, aadharCard: null }]
    }));
  };

  const removeTrusteeDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      trusteeDetails: prev.trusteeDetails.filter((_, i) => i !== index)
    }));
  };

  const updateTrusteeDetail = (index: number, field: keyof PartnerDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      trusteeDetails: prev.trusteeDetails.map((trustee, i) => 
        i === index ? { ...trustee, [field]: value } : trustee
      )
    }));
  };

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
                  {[0, 1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                        num <= step
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {num === 0 ? "Type" : num}
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
                  {/* Step 0: Partner Type Selection */}
                  {step === 0 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">Select Partner Type</h2>
                      <p className="text-muted-foreground mb-6">
                        Choose the type of channel partner that best describes your business structure
                      </p>
                      
                      <div>
                        <Label htmlFor="partnerType">Partner Type *</Label>
                        <Select
                          value={formData.partnerType}
                          onValueChange={(value: PartnerType) => updateFormData("partnerType", value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select partner type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="proprietorship">Proprietorship</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="private_public_ltd">Private / Public Ltd</SelectItem>
                            <SelectItem value="trust_society">Trust / Society</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.partnerType && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">About {formData.partnerType === "individual" ? "Individual" : formData.partnerType === "proprietorship" ? "Proprietorship" : formData.partnerType === "partnership" ? "Partnership" : formData.partnerType === "private_public_ltd" ? "Private / Public Ltd" : "Trust / Society"}:</h3>
                          <p className="text-sm text-muted-foreground">
                            {formData.partnerType === "individual" && "For individual professionals looking to partner with MaxDSA"}
                            {formData.partnerType === "proprietorship" && "For sole proprietorship businesses owned and managed by a single individual"}
                            {formData.partnerType === "partnership" && "For businesses owned by two or more partners sharing profits and responsibilities"}
                            {formData.partnerType === "private_public_ltd" && "For registered companies with limited liability"}
                            {formData.partnerType === "trust_society" && "For registered trusts or societies"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 1: Personal/Entity Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">
                        {formData.partnerType === "individual" ? "Personal Information" : 
                         formData.partnerType === "proprietorship" ? "Proprietorship Information" :
                         formData.partnerType === "partnership" ? "Partnership Information" :
                         formData.partnerType === "private_public_ltd" ? "Company Information" :
                         "Trust/Society Information"}
                      </h2>
                      
                      {/* Common fields */}
                      <div>
                        <Label htmlFor="fullName">
                          {formData.partnerType === "individual" ? "Full Name" : 
                           formData.partnerType === "proprietorship" ? "Contact Person Name" : "Authorized Signatory Name"} *
                        </Label>
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

                      {/* Type-specific fields for Step 1 */}
                      {formData.partnerType === "individual" && (
                        <>
                          <div>
                            <Label htmlFor="panNumber">PAN Card Number *</Label>
                            <Input
                              id="panNumber"
                              value={formData.panNumber}
                              onChange={(e) => updateFormData("panNumber", e.target.value.toUpperCase())}
                              placeholder="ABCDE1234F"
                              maxLength={10}
                              className="mt-2"
                            />
                            <p className="text-xs text-muted-foreground mt-1">10-character PAN number</p>
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
                            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                              className="mt-2"
                            />
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
                        </>
                      )}

                      {formData.partnerType === "proprietorship" && (
                        <>
                          <div>
                            <Label htmlFor="firmName">Name of the Firm *</Label>
                            <Input
                              id="firmName"
                              value={formData.firmName}
                              onChange={(e) => updateFormData("firmName", e.target.value)}
                              placeholder="ABC Enterprises"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="proprietorName">Proprietor Name *</Label>
                            <Input
                              id="proprietorName"
                              value={formData.proprietorName}
                              onChange={(e) => updateFormData("proprietorName", e.target.value)}
                              placeholder="John Doe"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="proprietorPanNumber">Proprietor PAN Number *</Label>
                            <Input
                              id="proprietorPanNumber"
                              value={formData.proprietorPanNumber}
                              onChange={(e) => updateFormData("proprietorPanNumber", e.target.value.toUpperCase())}
                              placeholder="ABCDE1234F"
                              maxLength={10}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="firmGstNumber">GST Number (Optional)</Label>
                            <Input
                              id="firmGstNumber"
                              value={formData.firmGstNumber}
                              onChange={(e) => updateFormData("firmGstNumber", e.target.value.toUpperCase())}
                              placeholder="22AAAAA0000A1Z5"
                              maxLength={15}
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
                          </div>
                        </>
                      )}

                      {formData.partnerType === "partnership" && (
                        <>
                          <div>
                            <Label htmlFor="firmName">Name of the Firm *</Label>
                            <Input
                              id="firmName"
                              value={formData.firmName}
                              onChange={(e) => updateFormData("firmName", e.target.value)}
                              placeholder="ABC Partners"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="firmGstNumber">Firm's GST Number (Optional)</Label>
                            <Input
                              id="firmGstNumber"
                              value={formData.firmGstNumber}
                              onChange={(e) => updateFormData("firmGstNumber", e.target.value.toUpperCase())}
                              placeholder="22AAAAA0000A1Z5"
                              maxLength={15}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="firmPanNumber">Firm's PAN Number *</Label>
                            <Input
                              id="firmPanNumber"
                              value={formData.firmPanNumber}
                              onChange={(e) => updateFormData("firmPanNumber", e.target.value.toUpperCase())}
                              placeholder="ABCDE1234F"
                              maxLength={10}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="firmOfficeAddress">Firm's Office Address *</Label>
                            <Input
                              id="firmOfficeAddress"
                              value={formData.firmOfficeAddress}
                              onChange={(e) => updateFormData("firmOfficeAddress", e.target.value)}
                              placeholder="Office address"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <Label>Partner Details *</Label>
                              <Button type="button" size="sm" onClick={addPartnerDetail}>
                                <Plus className="h-4 w-4 mr-1" /> Add Partner
                              </Button>
                            </div>
                            {formData.partnerDetails.map((partner, index) => (
                              <div key={index} className="bg-muted/30 p-4 rounded-lg mb-3 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-sm">Partner {index + 1}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removePartnerDetail(index)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                                <Input
                                  placeholder="Partner Name"
                                  value={partner.name}
                                  onChange={(e) => updatePartnerDetail(index, "name", e.target.value)}
                                />
                                <Input
                                  placeholder="PAN Number"
                                  value={partner.panNumber}
                                  onChange={(e) => updatePartnerDetail(index, "panNumber", e.target.value.toUpperCase())}
                                  maxLength={10}
                                />
                                <Input
                                  placeholder="Aadhar Number"
                                  value={partner.aadharNumber}
                                  onChange={(e) => updatePartnerDetail(index, "aadharNumber", e.target.value.replace(/\D/g, ''))}
                                  maxLength={12}
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {formData.partnerType === "private_public_ltd" && (
                        <>
                          <div>
                            <Label htmlFor="companyName">Name of the Company *</Label>
                            <Input
                              id="companyName"
                              value={formData.companyName}
                              onChange={(e) => updateFormData("companyName", e.target.value)}
                              placeholder="ABC Corporation Ltd"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="companyGstNumber">Company's GST Number (Optional)</Label>
                            <Input
                              id="companyGstNumber"
                              value={formData.companyGstNumber}
                              onChange={(e) => updateFormData("companyGstNumber", e.target.value.toUpperCase())}
                              placeholder="22AAAAA0000A1Z5"
                              maxLength={15}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="companyOfficeAddress">Company's Office Address *</Label>
                            <Input
                              id="companyOfficeAddress"
                              value={formData.companyOfficeAddress}
                              onChange={(e) => updateFormData("companyOfficeAddress", e.target.value)}
                              placeholder="Office address"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <Label>Director Details *</Label>
                              <Button type="button" size="sm" onClick={addDirectorDetail}>
                                <Plus className="h-4 w-4 mr-1" /> Add Director
                              </Button>
                            </div>
                            {formData.directorDetails.map((director, index) => (
                              <div key={index} className="bg-muted/30 p-4 rounded-lg mb-3 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-sm">Director {index + 1}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeDirectorDetail(index)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                                <Input
                                  placeholder="Director Name"
                                  value={director.name}
                                  onChange={(e) => updateDirectorDetail(index, "name", e.target.value)}
                                />
                                <Input
                                  placeholder="PAN Number"
                                  value={director.panNumber}
                                  onChange={(e) => updateDirectorDetail(index, "panNumber", e.target.value.toUpperCase())}
                                  maxLength={10}
                                />
                                <Input
                                  placeholder="Aadhar Number"
                                  value={director.aadharNumber}
                                  onChange={(e) => updateDirectorDetail(index, "aadharNumber", e.target.value.replace(/\D/g, ''))}
                                  maxLength={12}
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {formData.partnerType === "trust_society" && (
                        <>
                          <div>
                            <Label htmlFor="trustName">Name of the Trust *</Label>
                            <Input
                              id="trustName"
                              value={formData.trustName}
                              onChange={(e) => updateFormData("trustName", e.target.value)}
                              placeholder="ABC Trust"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="trustGstNumber">Trust GST Number (Optional)</Label>
                            <Input
                              id="trustGstNumber"
                              value={formData.trustGstNumber}
                              onChange={(e) => updateFormData("trustGstNumber", e.target.value.toUpperCase())}
                              placeholder="22AAAAA0000A1Z5"
                              maxLength={15}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="trustPanNumber">Trust PAN Number *</Label>
                            <Input
                              id="trustPanNumber"
                              value={formData.trustPanNumber}
                              onChange={(e) => updateFormData("trustPanNumber", e.target.value.toUpperCase())}
                              placeholder="ABCDE1234F"
                              maxLength={10}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label htmlFor="trustOfficeAddress">Trust Office Address *</Label>
                            <Input
                              id="trustOfficeAddress"
                              value={formData.trustOfficeAddress}
                              onChange={(e) => updateFormData("trustOfficeAddress", e.target.value)}
                              placeholder="Office address"
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <Label>Trustee Details *</Label>
                              <Button type="button" size="sm" onClick={addTrusteeDetail}>
                                <Plus className="h-4 w-4 mr-1" /> Add Trustee
                              </Button>
                            </div>
                            {formData.trusteeDetails.map((trustee, index) => (
                              <div key={index} className="bg-muted/30 p-4 rounded-lg mb-3 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-sm">Trustee {index + 1}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTrusteeDetail(index)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                                <Input
                                  placeholder="Trustee Name"
                                  value={trustee.name}
                                  onChange={(e) => updateTrusteeDetail(index, "name", e.target.value)}
                                />
                                <Input
                                  placeholder="PAN Number"
                                  value={trustee.panNumber}
                                  onChange={(e) => updateTrusteeDetail(index, "panNumber", e.target.value.toUpperCase())}
                                  maxLength={10}
                                />
                                <Input
                                  placeholder="Aadhar Number"
                                  value={trustee.aadharNumber}
                                  onChange={(e) => updateTrusteeDetail(index, "aadharNumber", e.target.value.replace(/\D/g, ''))}
                                  maxLength={12}
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Common address fields */}
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
                    </div>
                  )}

                  {/* Step 2: Documents */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">
                        {formData.partnerType === "individual" ? "Optional Documents" :
                         formData.partnerType === "proprietorship" ? "Proprietorship Documents" :
                         formData.partnerType === "partnership" ? "Partnership Documents" :
                         formData.partnerType === "private_public_ltd" ? "Company Documents" :
                         "Trust Documents"}
                      </h2>

                      {formData.partnerType === "individual" && (
                        <>
                          <p className="text-sm text-muted-foreground mb-4">
                            Optional documents you can provide (GST Certificate, additional business documents, etc.)
                          </p>
                          
                          <FileUploadInput
                            id="gstRegistration"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("gstRegistration", file)}
                            file={formData.gstRegistration}
                            label="GST Certificate Upload"
                            optional={true}
                          />
                        </>
                      )}

                      {formData.partnerType === "proprietorship" && (
                        <>
                          <FileUploadInput
                            id="panCard"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("panCard", file)}
                            file={formData.panCard}
                            label="Pan Card Doc"
                          />

                          <FileUploadInput
                            id="aadharCard"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("aadharCard", file)}
                            file={formData.aadharCard}
                            label="Aadhar Card Doc"
                          />

                          <FileUploadInput
                            id="gstRegistration"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("gstRegistration", file)}
                            file={formData.gstRegistration}
                            label="GST Certificate Upload"
                            optional={true}
                          />
                        </>
                      )}

                      {formData.partnerType === "partnership" && (
                        <>
                          <FileUploadInput
                            id="partnershipDeed"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("partnershipDeed", file)}
                            file={formData.partnershipDeed}
                            label="Partnership Deed Upload"
                          />

                          <FileUploadInput
                            id="firmPanCard"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("firmPanCard", file)}
                            file={formData.firmPanCard}
                            label="Pan Card Copy Upload"
                          />

                          <FileUploadInput
                            id="gstRegistration"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("gstRegistration", file)}
                            file={formData.gstRegistration}
                            label="Firm's GST Upload"
                            optional={true}
                          />

                          <FileUploadInput
                            id="udyamCertificate"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("udyamCertificate", file)}
                            file={formData.udyamCertificate}
                            label="Udyam Certificate Upload"
                            optional={true}
                          />
                        </>
                      )}

                      {formData.partnerType === "private_public_ltd" && (
                        <>
                          <FileUploadInput
                            id="moaDocument"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("moaDocument", file)}
                            file={formData.moaDocument}
                            label="MOA Upload"
                          />

                          <FileUploadInput
                            id="aoaDocument"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("aoaDocument", file)}
                            file={formData.aoaDocument}
                            label="AOA Upload"
                          />

                          <FileUploadInput
                            id="coiDocument"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("coiDocument", file)}
                            file={formData.coiDocument}
                            label="COI Upload"
                          />

                          <FileUploadInput
                            id="companyPanCard"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("companyPanCard", file)}
                            file={formData.companyPanCard}
                            label="Company Pan Card Copy Upload"
                          />

                          <FileUploadInput
                            id="gstRegistration"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("gstRegistration", file)}
                            file={formData.gstRegistration}
                            label="GST Upload"
                            optional={true}
                          />

                          <FileUploadInput
                            id="udyamCertificate"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("udyamCertificate", file)}
                            file={formData.udyamCertificate}
                            label="Udyam Certificate Upload"
                            optional={true}
                          />
                        </>
                      )}

                      {formData.partnerType === "trust_society" && (
                        <>
                          <FileUploadInput
                            id="trustDeed"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("trustDeed", file)}
                            file={formData.trustDeed}
                            label="Trust Deed Upload"
                          />

                          <FileUploadInput
                            id="trustPanCard"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("trustPanCard", file)}
                            file={formData.trustPanCard}
                            label="Trust Pan Card Upload"
                          />

                          <FileUploadInput
                            id="gstRegistration"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("gstRegistration", file)}
                            file={formData.gstRegistration}
                            label="GST Upload"
                            optional={true}
                          />

                          <FileUploadInput
                            id="udyamCertificate"
                            accept="application/pdf,image/jpeg,image/png"
                            onChange={(file) => updateFormData("udyamCertificate", file)}
                            file={formData.udyamCertificate}
                            label="Udyam Certificate Upload"
                            optional={true}
                          />
                        </>
                      )}

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
                              PDF, JPG or PNG, max 2MB each
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

                  {/* Step 3: Banking Details */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">Banking Details</h2>
                      
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
                        <Label htmlFor="bankAccountType">Bank Account Type *</Label>
                        <Select
                          value={formData.bankAccountType}
                          onValueChange={(value) => updateFormData("bankAccountType", value)}
                        >
                          <SelectTrigger className="mt-2 bg-background">
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectItem value="savings">Savings Account</SelectItem>
                            <SelectItem value="current">Current Account</SelectItem>
                            <SelectItem value="cash_credit">Cash Credit Account</SelectItem>
                          </SelectContent>
                        </Select>
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
                    {step > 0 && (
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
                        className={step === 0 ? "ml-auto" : ""}
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