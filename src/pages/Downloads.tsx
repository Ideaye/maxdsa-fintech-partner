import { Download, Home, CreditCard, Coins, Car, Briefcase, GraduationCap, Building2, Landmark, ShoppingCart, FileText, TrendingUp, Receipt, Cake, FileStack, Tractor, Package, BadgeDollarSign, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const Downloads = () => {
  const loanChecklists = [
    {
      id: "home-loan",
      title: "Home Loan Checklist",
      subtitle: "Complete documentation for home financing",
      icon: Home,
      items: [
        "Duly filled application form",
        "Passport-size photographs (applicant/co-applicant)",
        "ID proof (Aadhaar/Passport/Driver's License/Voter ID)",
        "Age proof (Birth certificate/Class 10 marksheet/Aadhaar)",
        "Address proof (Utility bill/Rent agreement)",
        "PAN card/Form 60",
        "Income proof (salary slips/Form 16/ITR)",
        "Bank statements (last 6 months)",
        "Property documents (title deed, sales agreement, NOC, approved map)",
        "Self-contribution proof",
        "Cheque for processing fee",
        "CIBIL report",
        "Additional: Partnership deed/MOA/AOA/Business registration for firms",
      ],
    },
    {
      id: "education-loan",
      title: "Education Loan Checklist",
      subtitle: "Essential documents for education financing",
      icon: GraduationCap,
      items: [
        "Application form (filled/signed)",
        "Passport-size photographs",
        "Applicant ID & Address proof (Aadhaar/Passport/Driver's License)",
        "Age proof (Birth certificate/School certificate)",
        "Admission proof from institution",
        "Fee structure and receipts",
        "Academic mark sheets",
        "Co-applicant/guarantor ID & income proof (salary slips/ITR)",
        "Collateral documents (if applicable)",
        "Last 6 months' bank statements",
      ],
    },
    {
      id: "vehicle-loan",
      title: "Vehicle Loan Checklist",
      subtitle: "Documentation for vehicle purchase financing",
      icon: Car,
      items: [
        "Application form (filled/signed)",
        "Passport-size photographs",
        "ID & address proof (Aadhaar/Passport/Driver's License)",
        "PAN card",
        "Income proof (salary slip/Form 16/ITR)",
        "Bank statement (last 6 months)",
        "Vehicle invoice/quotation",
        "Insurance copy (if existing)",
      ],
    },
    {
      id: "personal-loan",
      title: "Personal Loan Checklist",
      subtitle: "Quick documentation for personal financing",
      icon: CreditCard,
      items: [
        "Application form (filled/signed)",
        "Passport-size photographs",
        "PAN card",
        "ID proof (Aadhaar/Passport/Voter ID)",
        "Address proof",
        "Age proof",
        "Latest salary slips/Form 16/ITR",
        "Bank statement (last 3–6 months)",
        "Credit report/CIBIL score",
      ],
    },
    {
      id: "business-loan",
      title: "Business Loan / MSME / SME Loan Checklist",
      subtitle: "Comprehensive business financing requirements",
      icon: Briefcase,
      items: [
        "Application form (filled/signed)",
        "Passport-size photographs (applicant/guarantor)",
        "Applicant ID & address proof (Aadhaar/Passport/PAN)",
        "Business registration (Udyam/GSTIN/MOA/AOA)",
        "Business constitution documents (partnership deed/MOA/AOA)",
        "MSME/SSI certificate (if available)",
        "Latest audited financials (3 years) & provisional (if recent year not audited)",
        "IT returns of business/partners/directors (last 3 years)",
        "Net worth statement certified by CA",
        "Business profile/company background",
        "List of directors/shareholders/partners with KYC",
        "Projected financial statements/cash flow/revenue model",
        "Bank statements (last 6–12 months)",
        "Security/collateral documents (property papers/valuation/lease deed)",
        "Existing loan facility sanction letters",
      ],
    },
    {
      id: "gold-loan",
      title: "Gold Loan Checklist",
      subtitle: "Secure loans against gold assets",
      icon: Coins,
      items: [
        "Application form (signed)",
        "Photographs",
        "ID proof (Aadhaar/Passport)",
        "Address proof",
        "PAN card",
        "Gold asset/ornaments",
        "Valuation certificate (by lender/appraiser)",
        "Loan agreement",
      ],
    },
    {
      id: "consumer-durable-loan",
      title: "Consumer Durable Loan Checklist",
      subtitle: "Finance your appliance and electronics purchase",
      icon: ShoppingCart,
      items: [
        "Application form",
        "Passport-size photographs",
        "ID & address proof",
        "PAN card",
        "Latest salary slip/ITR",
        "Bank statement (last 3–6 months)",
        "Invoice/quotation for durable purchase",
      ],
    },
    {
      id: "loan-against-property",
      title: "Loan Against Property Checklist",
      subtitle: "Leverage your property for financing",
      icon: Building2,
      items: [
        "Application form",
        "ID proof",
        "PAN card",
        "Address proof",
        "Income proof (salary slip/IT return/business financials)",
        "Bank statement (last 6 months)",
        "Property title documents",
        "Valuation report",
      ],
    },
    {
      id: "microfinance-loan",
      title: "Microfinance Loan Checklist",
      subtitle: "Small-scale financing solutions",
      icon: Landmark,
      items: [
        "Group/individual application form",
        "Group/individual members KYC (Aadhaar/Voter ID)",
        "Income proof (if available)",
        "Utilisation certificate",
        "Loan agreement",
        "Meeting minutes record (group lending)",
      ],
    },
    {
      id: "invoice-factoring-loan",
      title: "Invoice/Factoring Loan Checklist",
      subtitle: "Working capital through invoice financing",
      icon: FileText,
      items: [
        "Loan application form",
        "Corporate KYC (business registration/GSTIN)",
        "Board resolution",
        "Invoice copies (factoring contracts)",
        "Financial statements",
        "Customer agreements",
        "Collateral/security details",
      ],
    },
    {
      id: "sme-working-capital-loan",
      title: "SME Loan/Working Capital Loan Checklist",
      subtitle: "Fund your business operations",
      icon: TrendingUp,
      items: [
        "Application form",
        "Business registration documents/Constitution certificate (partnership/Udyam/MOA/AOA)",
        "Audited/provisional financial statements",
        "Income tax returns",
        "GST returns",
        "Projected cash flows/business plan",
        "Bank account statements",
        "Details of existing borrowings",
      ],
    },
    {
      id: "credit-card-overdraft-loan",
      title: "Credit Card Loan/Overdraft Checklist",
      subtitle: "Quick access to credit facilities",
      icon: Receipt,
      items: [
        "Application form (filled/signed)",
        "PAN card",
        "Identity proof",
        "Address proof",
        "Income proof (salary slip/ITR)",
        "Bank statement (if required)",
        "Credit report/CIBIL score",
      ],
    },
    {
      id: "top-up-loan",
      title: "Top-Up Loan Checklist",
      subtitle: "Additional funding on existing loans",
      icon: BadgeDollarSign,
      items: [
        "Existing loan details (sanction letter, account statement)",
        "Income proof/upgraded KYC",
        "PAN card",
        "Address proof",
        "Application form",
      ],
    },
    {
      id: "home-renovation-loan",
      title: "Home Renovation Loan Checklist",
      subtitle: "Finance your home improvement projects",
      icon: Home,
      items: [
        "Property ownership/title documents",
        "Estimated cost certificate for renovation (contractor)",
        "Income proof",
        "KYC documents",
        "Bank account statement",
      ],
    },
    {
      id: "wedding-loan",
      title: "Wedding Loan Checklist",
      subtitle: "Make your special day memorable",
      icon: Cake,
      items: [
        "Application form",
        "ID proof",
        "PAN card",
        "Address proof",
        "Income proof",
        "Proof of event (invitation/vendor bills if required)",
      ],
    },
    {
      id: "debt-consolidation-loan",
      title: "Debt Consolidation Loan Checklist",
      subtitle: "Simplify multiple debts into one",
      icon: FileStack,
      items: [
        "Application form (filled/signed)",
        "PAN card",
        "ID & address proof",
        "Income proof",
        "Statements/closure letters of debts to be consolidated",
        "Updated credit report",
      ],
    },
    {
      id: "agri-tractor-loan",
      title: "Agri/Tractor Loan Checklist",
      subtitle: "Agricultural equipment financing",
      icon: Tractor,
      items: [
        "Application form",
        "Land ownership/title deed",
        "Applicant KYC",
        "Crop details/documentation",
        "Income/crop sales receipts",
        "Equipment/machinery invoice",
        "Bank statement",
      ],
    },
    {
      id: "leasing-equipment-financing",
      title: "Leasing/Equipment Financing Checklist",
      subtitle: "Acquire business equipment efficiently",
      icon: Package,
      items: [
        "Business registration/Udyam/MOA/AOA",
        "Lease agreement/pro-forma invoice",
        "Financials/ITR",
        "PAN card",
        "Bank statements",
        "Asset ownership/title documents",
      ],
    },
    {
      id: "housing-finance-nbfc",
      title: "Housing Finance (NBFC) Checklist",
      subtitle: "Alternative housing finance solutions",
      icon: Building2,
      items: [
        "Application form",
        "Title/building documents",
        "Builder NOC/documents",
        "Applicant KYC",
        "Income proof",
        "Down payment receipt",
        "Processing fee cheque",
      ],
    },
  ];

  const handleDownloadAll = () => {
    console.log("Downloading all checklists...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30" />
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Loan Document Checklists
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Download comprehensive checklists for all loan types. Stay organized and ensure a smooth, hassle-free application process.
          </p>
        </div>
      </section>

      {/* Checklists Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Complete Documentation</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Loan Type
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select any loan type below to view the complete checklist of required documents
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {loanChecklists.map((loan, index) => {
              const IconComponent = loan.icon;
              return (
                <AccordionItem
                  key={loan.id}
                  value={loan.id}
                  className="border rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                    <div className="flex items-center gap-4 w-full text-left">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                          {loan.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {loan.subtitle}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="bg-muted/50 rounded-xl p-6">
                      <p className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                        Required Documents:
                      </p>
                      <ul className="space-y-3">
                        {loan.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-sm">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <span className="flex-1 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* Download All Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
            <div className="relative z-10">
              <Download className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Download All Checklists
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Get instant access to all loan checklists in one comprehensive package. Perfect for keeping all documentation requirements at your fingertips.
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleDownloadAll}
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 h-auto text-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Complete Package
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help with Your Loan Application?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our expert team is ready to guide you through every step of the loan process. Get personalized assistance today.
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = '/contact'}
            className="px-8 py-6 h-auto text-lg"
          >
            Contact Us Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Downloads;
