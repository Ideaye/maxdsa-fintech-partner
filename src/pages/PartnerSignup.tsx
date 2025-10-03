import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight01Icon, ArrowLeft01Icon } from "hugeicons-react";
import { useToast } from "@/hooks/use-toast";

const PartnerSignup = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    
    // Step 2: Business Information
    businessName: "",
    businessType: "",
    yearsInBusiness: "",
    
    // Step 3: Partnership Details
    partnershipType: "",
    monthlyLeadCapacity: "",
    regionsOfOperation: "",
    
    // Step 4: Additional Information
    additionalInfo: "",
    agreedToTerms: false
  });

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    // Here we'll later integrate with the edge function
    console.log("Form submitted:", formData);
    
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {isSubmitted ? (
            /* Success Message */
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
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Partner With MaxDSA</h1>
                <p className="text-muted-foreground text-lg">
                  Join our network and accelerate your business growth
                </p>
              </div>

              {/* Progress Indicator */}
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

              {/* Form Card */}
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
                          required
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
                          required
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
                          required
                          className="mt-2"
                        />
                      </div>
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
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Business Type *</Label>
                        <RadioGroup
                          value={formData.businessType}
                          onValueChange={(value) => updateFormData("businessType", value)}
                          className="mt-2 space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dsa" id="dsa" />
                            <Label htmlFor="dsa" className="font-normal cursor-pointer">
                              Direct Selling Agent (DSA)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="connector" id="connector" />
                            <Label htmlFor="connector" className="font-normal cursor-pointer">
                              Connector
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="financial-advisor" id="financial-advisor" />
                            <Label htmlFor="financial-advisor" className="font-normal cursor-pointer">
                              Financial Advisor
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                        <Input
                          id="yearsInBusiness"
                          type="number"
                          value={formData.yearsInBusiness}
                          onChange={(e) => updateFormData("yearsInBusiness", e.target.value)}
                          placeholder="5"
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Partnership Details */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">Partnership Details</h2>
                      
                      <div>
                        <Label>Preferred Partnership Type *</Label>
                        <RadioGroup
                          value={formData.partnershipType}
                          onValueChange={(value) => updateFormData("partnershipType", value)}
                          className="mt-2 space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="exclusive" id="exclusive" />
                            <Label htmlFor="exclusive" className="font-normal cursor-pointer">
                              Exclusive Partnership
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="non-exclusive" id="non-exclusive" />
                            <Label htmlFor="non-exclusive" className="font-normal cursor-pointer">
                              Non-Exclusive Partnership
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="monthlyLeadCapacity">Monthly Lead Capacity *</Label>
                        <Input
                          id="monthlyLeadCapacity"
                          type="number"
                          value={formData.monthlyLeadCapacity}
                          onChange={(e) => updateFormData("monthlyLeadCapacity", e.target.value)}
                          placeholder="50"
                          required
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="regionsOfOperation">Regions of Operation *</Label>
                        <Textarea
                          id="regionsOfOperation"
                          value={formData.regionsOfOperation}
                          onChange={(e) => updateFormData("regionsOfOperation", e.target.value)}
                          placeholder="Mumbai, Delhi, Bangalore"
                          required
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Additional Information */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
                      
                      <div>
                        <Label htmlFor="additionalInfo">
                          Tell us more about your business and why you want to partner with MaxDSA
                        </Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                          placeholder="Share your experience, goals, and expectations..."
                          className="mt-2"
                          rows={5}
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreedToTerms}
                          onCheckedChange={(checked) => 
                            updateFormData("agreedToTerms", checked as boolean)
                          }
                        />
                        <Label htmlFor="terms" className="font-normal cursor-pointer leading-relaxed">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            terms and conditions
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            privacy policy
                          </Link>
                        </Label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={step === 1}
                      className="gap-2"
                    >
                      <ArrowLeft01Icon size={16} />
                      Previous
                    </Button>

                    {step < 4 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="gap-2"
                      >
                        Next
                        <ArrowRight01Icon size={16} />
                      </Button>
                    ) : (
                      <Button type="submit" variant="cta" className="gap-2">
                        Submit Application
                        <ArrowRight01Icon size={16} />
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              {/* Help Text */}
              <div className="text-center mt-8 text-muted-foreground">
                <p>
                  Need help?{" "}
                  <Link to="/contact" className="text-primary hover:underline">
                    Contact us
                  </Link>
                </p>
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
