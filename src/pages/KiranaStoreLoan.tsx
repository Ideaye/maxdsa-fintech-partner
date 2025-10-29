import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExistingLoan {
  financierName: string;
  loanAmount: string;
  emiAmount: string;
  tenor: string;
  loanAvailedDate: string;
}

const KiranaStoreLoan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    advisorName: "",
    customerName: "",
    dateOfBirth: "",
    contactNumber: "",
    coApplicantName: "",
    coApplicantDob: "",
    coApplicantContact: "",
    email: "",
    retailShopName: "",
    retailShopAddress: "",
    natureOfRetailShop: "",
    natureOfShopOwnership: "",
    shopSize: "",
    dailyTurnoverRange: "",
    dailyWalkinsRange: "",
    residenceAddress: "",
    natureOfResidenceOwnership: "",
    geoLocation: "",
    city: "",
    state: "",
    pincode: "",
    panNumber: "",
    aadharNumber: "",
    udyamNumber: "",
    bankStatementFile: null as File | null,
    itrDocumentsFile: null as File | null,
    shopPhotoFile: null as File | null,
    existingLoans: [] as ExistingLoan[],
  });

  const natureOfShopOptions = [
    "Grocery",
    "Pharmacy",
    "Hardware Store",
    "Shoe Mart",
    "Fruits & Vegetables",
    "Mobile Accessories",
    "Stationery Shops",
    "Cloth, Branded outlet/Boutique",
    "Spectacles",
    "Furniture",
    "Appliance Store",
    "Saloon/Fancy Store",
    "Sports",
    "Pet Store",
    "Bakery/Sweet Shop",
    "Tea Shop/Restaurant",
    "Others",
  ];

  const shopSizeOptions = [
    "Less than 250 Sq Feet",
    "250 Sq ft – 500 Sq Ft",
    "500 to 1000 Sq Ft",
    "1000 to 2000 Sq ft",
    "Above 2000 sq ft",
  ];

  const turnoverOptions = [
    "Below Rs 5000",
    "5000 to 10,000",
    "10 to 20K",
    "20 to 30K",
    "30 to 50K",
    "50 to 75K",
    "75 to 100K",
    "Above 100K",
  ];

  const walkinOptions = [
    "Less than 50",
    "50 to 100",
    "100 to 200",
    "200 to 500",
    "Above 500",
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  // Format date input as DD/MM/YYYY
  const formatDateInput = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  // Parse DD/MM/YYYY string to Date object
  const parseDateString = (dateStr: string): Date | null => {
    if (!dateStr || dateStr.length !== 10) return null;
    const [day, month, year] = dateStr.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isNaN(date.getTime())) return null;
    if (date.getDate() !== parseInt(day)) return null;
    if (date.getMonth() !== parseInt(month) - 1) return null;
    return date;
  };

  // Calculate age from date string
  const calculateAge = (dateStr: string): number | null => {
    const birthDate = parseDateString(dateStr);
    if (!birthDate) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const addExistingLoan = () => {
    setFormData({
      ...formData,
      existingLoans: [
        ...formData.existingLoans,
        {
          financierName: "",
          loanAmount: "",
          emiAmount: "",
          tenor: "",
          loanAvailedDate: "",
        },
      ],
    });
  };

  const removeExistingLoan = (index: number) => {
    const updatedLoans = formData.existingLoans.filter((_, i) => i !== index);
    setFormData({ ...formData, existingLoans: updatedLoans });
  };

  const updateExistingLoan = (index: number, field: keyof ExistingLoan, value: any) => {
    const updatedLoans = [...formData.existingLoans];
    updatedLoans[index] = { ...updatedLoans[index], [field]: value };
    setFormData({ ...formData, existingLoans: updatedLoans });
  };

  const sanitizeFilename = (filename: string): string => {
    const lastDotIndex = filename.lastIndexOf('.');
    const name = lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
    const extension = lastDotIndex > 0 ? filename.substring(lastDotIndex) : '';
    
    const sanitizedName = name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_-]/g, '_')
      .replace(/_+/g, '_');
    
    return sanitizedName + extension.toLowerCase();
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.customerName || !formData.dateOfBirth || !formData.contactNumber) {
          toast({
            title: "Missing Information",
            description: "Please fill in all mandatory customer details.",
            variant: "destructive",
          });
          return false;
        }
        if (formData.contactNumber.length !== 10) {
          toast({
            title: "Invalid Contact Number",
            description: "Contact number must be 10 digits.",
            variant: "destructive",
          });
          return false;
        }

        // Validate date format
        if (formData.dateOfBirth.length !== 10) {
          toast({
            title: "Invalid Date Format",
            description: "Please enter date of birth in DD/MM/YYYY format.",
            variant: "destructive",
          });
          return false;
        }

        // Validate date is valid
        const birthDate = parseDateString(formData.dateOfBirth);
        if (!birthDate) {
          toast({
            title: "Invalid Date",
            description: "Please enter a valid date of birth.",
            variant: "destructive",
          });
          return false;
        }

        // Validate age (must be 18+)
        const age = calculateAge(formData.dateOfBirth);
        if (age === null || age < 18) {
          toast({
            title: "Age Requirement",
            description: "Applicant must be at least 18 years old.",
            variant: "destructive",
          });
          return false;
        }

        // Validate co-applicant DOB if provided
        if (formData.coApplicantDob) {
          if (formData.coApplicantDob.length !== 10) {
            toast({
              title: "Invalid Co-Applicant Date",
              description: "Please enter co-applicant date in DD/MM/YYYY format.",
              variant: "destructive",
            });
            return false;
          }
          
          const coAppDate = parseDateString(formData.coApplicantDob);
          if (!coAppDate) {
            toast({
              title: "Invalid Co-Applicant Date",
              description: "Please enter a valid co-applicant date of birth.",
              variant: "destructive",
            });
            return false;
          }
          
          const coAppAge = calculateAge(formData.coApplicantDob);
          if (coAppAge === null || coAppAge < 18) {
            toast({
              title: "Co-Applicant Age Requirement",
              description: "Co-applicant must be at least 18 years old.",
              variant: "destructive",
            });
            return false;
          }
        }
        break;
      case 2:
        if (
          !formData.retailShopName ||
          !formData.retailShopAddress ||
          !formData.natureOfRetailShop ||
          !formData.natureOfShopOwnership ||
          !formData.shopSize ||
          !formData.dailyTurnoverRange ||
          !formData.dailyWalkinsRange
        ) {
          toast({
            title: "Missing Information",
            description: "Please fill in all mandatory shop details.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3:
        // State, City, Pincode are mandatory
        if (!formData.state || !formData.city || !formData.pincode) {
          toast({
            title: "Missing Information",
            description: "Please fill in State, City, and Pincode.",
            variant: "destructive",
          });
          return false;
        }
        
        // Pincode validation
        if (formData.pincode.length !== 6) {
          toast({
            title: "Invalid Pincode",
            description: "Pincode must be 6 digits.",
            variant: "destructive",
          });
          return false;
        }
        
        // Optional field validations - only if filled
        if (formData.panNumber && formData.panNumber.length !== 10) {
          toast({
            title: "Invalid PAN Number",
            description: "PAN number must be 10 characters.",
            variant: "destructive",
          });
          return false;
        }
        
        if (formData.aadharNumber && formData.aadharNumber.length !== 12) {
          toast({
            title: "Invalid Aadhar Number",
            description: "Aadhar number must be 12 digits.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Upload files to storage
      let bankStatementUrl = "";
      let itrDocumentsUrl = "";
      let shopPhotoUrl = "";

      const uploadPromises = [];

      if (formData.bankStatementFile) {
        const sanitizedBankName = sanitizeFilename(formData.bankStatementFile.name);
        const bankStatementPath = `kirana-loans/${Date.now()}_bank_statement_${sanitizedBankName}`;
        uploadPromises.push(
          supabase.storage
            .from("partner-documents")
            .upload(bankStatementPath, formData.bankStatementFile)
            .then(({ data, error }) => {
              if (error) throw error;
              bankStatementUrl = data.path;
            })
        );
      }

      if (formData.itrDocumentsFile) {
        const sanitizedItrName = sanitizeFilename(formData.itrDocumentsFile.name);
        const itrPath = `kirana-loans/${Date.now()}_itr_${sanitizedItrName}`;
        uploadPromises.push(
          supabase.storage
            .from("partner-documents")
            .upload(itrPath, formData.itrDocumentsFile)
            .then(({ data, error }) => {
              if (error) throw error;
              itrDocumentsUrl = data.path;
            })
        );
      }

      if (formData.shopPhotoFile) {
        const sanitizedShopPhotoName = sanitizeFilename(formData.shopPhotoFile.name);
        const shopPhotoPath = `kirana-loans/${Date.now()}_shop_photo_${sanitizedShopPhotoName}`;
        uploadPromises.push(
          supabase.storage
            .from("partner-documents")
            .upload(shopPhotoPath, formData.shopPhotoFile)
            .then(({ data, error }) => {
              if (error) throw error;
              shopPhotoUrl = data.path;
            })
        );
      }

      await Promise.all(uploadPromises);

      // Prepare existing loans data
      const existingLoansData = formData.existingLoans.map((loan) => ({
        financier_name: loan.financierName,
        loan_amount: loan.loanAmount,
        emi_amount: loan.emiAmount,
        tenor: loan.tenor,
        loan_availed_date: loan.loanAvailedDate || null,
      }));

      // Insert into database
      const { error: insertError } = await supabase.from("kirana_store_loans").insert({
        advisor_name: formData.advisorName || null,
        customer_name: formData.customerName,
        date_of_birth: formData.dateOfBirth ? parseDateString(formData.dateOfBirth)?.toISOString() : null,
        contact_number: formData.contactNumber,
        co_applicant_name: formData.coApplicantName || null,
        co_applicant_dob: formData.coApplicantDob ? parseDateString(formData.coApplicantDob)?.toISOString() : null,
        co_applicant_contact: formData.coApplicantContact || null,
        email: formData.email || null,
        retail_shop_name: formData.retailShopName,
        retail_shop_address: formData.retailShopAddress,
        nature_of_retail_shop: formData.natureOfRetailShop,
        nature_of_shop_ownership: formData.natureOfShopOwnership,
        shop_size: formData.shopSize,
        daily_turnover_range: formData.dailyTurnoverRange,
        daily_walkins_range: formData.dailyWalkinsRange,
        residence_address: formData.residenceAddress || null,
        nature_of_residence_ownership: formData.natureOfResidenceOwnership || null,
        geo_location: formData.geoLocation || null,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        pan_number: formData.panNumber || null,
        aadhar_number: formData.aadharNumber || null,
        udyam_number: formData.udyamNumber || null,
        bank_statement_url: bankStatementUrl || null,
        itr_documents_url: itrDocumentsUrl || null,
        shop_photo_url: shopPhotoUrl || null,
        existing_loans: existingLoansData,
      });

      if (insertError) throw insertError;

      console.log('✅ Database insert successful, sending email notification...');

      // Send email notification with full data
      try {
        const emailPayload = {
          customerName: formData.customerName,
          email: formData.email || null,
          contactNumber: formData.contactNumber,
          advisorName: formData.advisorName || null,
          dateOfBirth: formData.dateOfBirth || null,
          coApplicantName: formData.coApplicantName || null,
          coApplicantDob: formData.coApplicantDob || null,
          coApplicantContact: formData.coApplicantContact || null,
          retailShopName: formData.retailShopName,
          retailShopAddress: formData.retailShopAddress,
          natureOfRetailShop: formData.natureOfRetailShop,
          natureOfShopOwnership: formData.natureOfShopOwnership,
          shopSize: formData.shopSize,
          dailyTurnoverRange: formData.dailyTurnoverRange,
          dailyWalkinsRange: formData.dailyWalkinsRange,
          residenceAddress: formData.residenceAddress || null,
          natureOfResidenceOwnership: formData.natureOfResidenceOwnership || null,
          geoLocation: formData.geoLocation || null,
          state: formData.state,
          city: formData.city,
          pincode: formData.pincode,
          panNumber: formData.panNumber || null,
          aadharNumber: formData.aadharNumber || null,
          udyamNumber: formData.udyamNumber || null,
          bankStatementUrl: bankStatementUrl || null,
          itrDocumentsUrl: itrDocumentsUrl || null,
          shopPhotoUrl: shopPhotoUrl || null,
          existingLoans: existingLoansData,
          loanType: "Kirana Store Loan",
        };

        const { error: emailError } = await supabase.functions.invoke(
          'send-kirana-loan-notification',
          { body: emailPayload }
        );

        if (emailError) {
          console.error("❌ Email notification failed:", emailError);
          // Don't block success if email fails
        } else {
          console.log('✅ Email notification sent successfully');
        }
      } catch (emailErr) {
        console.error("Email error:", emailErr);
        // Continue even if email fails
      }

      toast({
        title: "Application Submitted!",
        description: "Your Kirana Store loan application has been submitted successfully. We will contact you soon.",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Kirana Store Loan Application</h1>
          <p className="text-center text-muted-foreground mb-8">
            Fill in the details below to apply for a Kirana Store loan
          </p>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold",
                    currentStep >= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step}
                </div>
                <span className="text-xs mt-2 hidden md:block">
                  {step === 1 && "Customer"}
                  {step === 2 && "Shop Details"}
                  {step === 3 && "Additional"}
                  {step === 4 && "Documents"}
                  {step === 5 && "Loans"}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Customer Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
                
                <div>
                  <Label htmlFor="advisorName">Advisor Name (Optional)</Label>
                  <Input
                    id="advisorName"
                    value={formData.advisorName}
                    onChange={(e) => setFormData({ ...formData, advisorName: e.target.value })}
                    placeholder="Enter advisor name for lead tracking"
                  />
                  <p className="text-xs text-muted-foreground mt-1">For internal tracking purposes</p>
                </div>

                <div>
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth * (DD/MM/YYYY)</Label>
                  <Input
                    id="dateOfBirth"
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      dateOfBirth: formatDateInput(e.target.value) 
                    })}
                    placeholder="DD/MM/YYYY (e.g., 15/08/1971)"
                    maxLength={10}
                    required
                  />
                  {formData.dateOfBirth && calculateAge(formData.dateOfBirth) !== null && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Age: {calculateAge(formData.dateOfBirth)} years
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    maxLength={10}
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value.replace(/\D/g, "") })}
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email ID (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <h3 className="text-lg font-semibold mt-8 mb-4">Co-Applicant Details (Optional)</h3>

                <div>
                  <Label htmlFor="coApplicantName">Co-Applicant Name</Label>
                  <Input
                    id="coApplicantName"
                    value={formData.coApplicantName}
                    onChange={(e) => setFormData({ ...formData, coApplicantName: e.target.value })}
                    placeholder="Enter co-applicant name"
                  />
                </div>

                <div>
                  <Label htmlFor="coApplicantDob">Co-Applicant Date of Birth (DD/MM/YYYY)</Label>
                  <Input
                    id="coApplicantDob"
                    type="text"
                    value={formData.coApplicantDob}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      coApplicantDob: formatDateInput(e.target.value) 
                    })}
                    placeholder="DD/MM/YYYY (e.g., 20/03/1975)"
                    maxLength={10}
                  />
                  {formData.coApplicantDob && calculateAge(formData.coApplicantDob) !== null && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Age: {calculateAge(formData.coApplicantDob)} years
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="coApplicantContact">Co-Applicant Contact Number</Label>
                  <Input
                    id="coApplicantContact"
                    type="tel"
                    maxLength={10}
                    value={formData.coApplicantContact}
                    onChange={(e) => setFormData({ ...formData, coApplicantContact: e.target.value.replace(/\D/g, "") })}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Shop Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Shop Details</h2>
                
                <div>
                  <Label htmlFor="retailShopName">Name of the Retail Shop *</Label>
                  <Input
                    id="retailShopName"
                    value={formData.retailShopName}
                    onChange={(e) => setFormData({ ...formData, retailShopName: e.target.value })}
                    placeholder="Enter shop name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="retailShopAddress">Address of the Retail Shop *</Label>
                  <Input
                    id="retailShopAddress"
                    value={formData.retailShopAddress}
                    onChange={(e) => setFormData({ ...formData, retailShopAddress: e.target.value })}
                    placeholder="Enter complete shop address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="natureOfRetailShop">Nature of Retail Shop *</Label>
                  <Select
                    value={formData.natureOfRetailShop}
                    onValueChange={(value) => setFormData({ ...formData, natureOfRetailShop: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shop type" />
                    </SelectTrigger>
                    <SelectContent>
                      {natureOfShopOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="natureOfShopOwnership">Nature of Shop *</Label>
                  <Select
                    value={formData.natureOfShopOwnership}
                    onValueChange={(value) => setFormData({ ...formData, natureOfShopOwnership: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owned">Owned</SelectItem>
                      <SelectItem value="Rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="shopSize">Size of the Shop *</Label>
                  <Select
                    value={formData.shopSize}
                    onValueChange={(value) => setFormData({ ...formData, shopSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shop size" />
                    </SelectTrigger>
                    <SelectContent>
                      {shopSizeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dailyTurnoverRange">Daily Turnover Range *</Label>
                  <Select
                    value={formData.dailyTurnoverRange}
                    onValueChange={(value) => setFormData({ ...formData, dailyTurnoverRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select turnover range" />
                    </SelectTrigger>
                    <SelectContent>
                      {turnoverOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dailyWalkinsRange">Daily Number of Walk-ins *</Label>
                  <Select
                    value={formData.dailyWalkinsRange}
                    onValueChange={(value) => setFormData({ ...formData, dailyWalkinsRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select walk-ins range" />
                    </SelectTrigger>
                    <SelectContent>
                      {walkinOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
                
                <div>
                  <Label htmlFor="residenceAddress">Address of the Residence (Optional)</Label>
                  <Input
                    id="residenceAddress"
                    value={formData.residenceAddress}
                    onChange={(e) => setFormData({ ...formData, residenceAddress: e.target.value })}
                    placeholder="Enter residence address"
                  />
                </div>

                <div>
                  <Label htmlFor="natureOfResidenceOwnership">Nature of Residence (Optional)</Label>
                  <Select
                    value={formData.natureOfResidenceOwnership}
                    onValueChange={(value) => setFormData({ ...formData, natureOfResidenceOwnership: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owned">Owned</SelectItem>
                      <SelectItem value="Rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="geoLocation">Geo Tagging of the Location (Optional)</Label>
                  <Input
                    id="geoLocation"
                    value={formData.geoLocation}
                    onChange={(e) => setFormData({ ...formData, geoLocation: e.target.value })}
                    placeholder="Enter GPS coordinates or location link"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter city name"
                  />
                </div>

                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                    placeholder="Enter 6-digit pincode"
                    maxLength={6}
                  />
                </div>

                <div>
                  <Label htmlFor="panNumber">PAN Number of the Applicant (Optional)</Label>
                  <Input
                    id="panNumber"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                    placeholder="Enter PAN number"
                    maxLength={10}
                  />
                </div>

                <div>
                  <Label htmlFor="aadharNumber">Aadhar Card Number (Optional)</Label>
                  <Input
                    id="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value.replace(/\D/g, "") })}
                    placeholder="Enter 12-digit Aadhar number"
                    maxLength={12}
                  />
                </div>

                <div>
                  <Label htmlFor="udyamNumber">Udyam Number (Optional)</Label>
                  <Input
                    id="udyamNumber"
                    value={formData.udyamNumber}
                    onChange={(e) => setFormData({ ...formData, udyamNumber: e.target.value })}
                    placeholder="Enter Udyam registration number"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Document Uploads */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Document Uploads (Optional)</h2>
                
                <div>
                  <Label htmlFor="bankStatement">Bank Statement</Label>
                  <Input
                    id="bankStatement"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({ ...formData, bankStatementFile: e.target.files?.[0] || null })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Upload last 6 months bank statement</p>
                </div>

                <div>
                  <Label htmlFor="itrDocuments">ITR Documents</Label>
                  <Input
                    id="itrDocuments"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({ ...formData, itrDocumentsFile: e.target.files?.[0] || null })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Upload ITR documents (last 2 years)</p>
                </div>

                <div>
                  <Label htmlFor="shopPhoto">Photo of the Retail Shop</Label>
                  <Input
                    id="shopPhoto"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => setFormData({ ...formData, shopPhotoFile: e.target.files?.[0] || null })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Upload a clear photo of your shop</p>
                </div>
              </div>
            )}

            {/* Step 5: Existing Loans */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Existing Mortgage Loans (Optional)</h2>
                  <Button type="button" onClick={addExistingLoan} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Loan
                  </Button>
                </div>

                {formData.existingLoans.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No existing loans added. Click "Add Loan" to add details.
                  </p>
                ) : (
                  formData.existingLoans.map((loan, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Loan {index + 1}</h3>
                        <Button
                          type="button"
                          onClick={() => removeExistingLoan(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div>
                        <Label>Financier Name</Label>
                        <Input
                          value={loan.financierName}
                          onChange={(e) => updateExistingLoan(index, "financierName", e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                          placeholder="Enter bank/financier name"
                        />
                      </div>

                      <div>
                        <Label>Loan Amount</Label>
                        <Input
                          value={loan.loanAmount}
                          onChange={(e) => updateExistingLoan(index, "loanAmount", e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                          placeholder="Enter loan amount"
                        />
                      </div>

                      <div>
                        <Label>EMI Amount</Label>
                        <Input
                          value={loan.emiAmount}
                          onChange={(e) => updateExistingLoan(index, "emiAmount", e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                          placeholder="Enter EMI amount"
                        />
                      </div>

                      <div>
                        <Label>Tenor</Label>
                        <Input
                          value={loan.tenor}
                          onChange={(e) => updateExistingLoan(index, "tenor", e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                          placeholder="Enter tenor (e.g., 24 months)"
                        />
                      </div>

                      <div>
                        <Label>Loan Availed Date (DD/MM/YYYY)</Label>
                        <Input
                          type="text"
                          value={loan.loanAvailedDate}
                          onChange={(e) => updateExistingLoan(index, "loanAvailedDate", formatDateInput(e.target.value))}
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                          placeholder="DD/MM/YYYY (e.g., 15/08/2020)"
                          maxLength={10}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button type="button" onClick={handlePrevious} variant="outline">
                  Previous
                </Button>
              )}
              {currentStep < 5 ? (
                <Button type="button" onClick={handleNext} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="ml-auto">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KiranaStoreLoan;