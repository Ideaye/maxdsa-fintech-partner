import { Download, Home, CreditCard, Coins, Car, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import * as LucideIcons from "lucide-react";

const Downloads = () => {
  const loanTypes = [
    {
      title: "Home Loan",
      keywords: ["Property Documents", "Income Proof", "Identity Verification"],
      icon: "Home",
    },
    {
      title: "Personal Loan",
      keywords: ["Income Statements", "Bank Details", "Credit Score"],
      icon: "CreditCard",
    },
    {
      title: "Gold Loan",
      keywords: ["Gold Valuation", "Ownership Proof", "Identity Documents"],
      icon: "Coins",
    },
    {
      title: "Vehicle Loan",
      keywords: ["Vehicle Details", "Insurance Papers", "Income Proof"],
      icon: "Car",
    },
    {
      title: "Business Loan",
      keywords: ["Business License", "Financial Statements", "Tax Returns"],
      icon: "Briefcase",
    },
    {
      title: "Education Loan",
      keywords: ["Admission Letter", "Fee Structure", "Co-applicant Details"],
      icon: "GraduationCap",
    },
  ];

  const testimonials = [
    // English
    {
      text: "MaxDSA made my home loan process incredibly smooth. The checklist helped me organize all documents perfectly!",
      name: "Rajesh Kumar",
      role: "Business Owner",
      language: "English",
    },
    {
      text: "Professional service and quick disbursement. Highly recommend MaxDSA for any loan requirements.",
      name: "Priya Sharma",
      role: "Software Engineer",
      language: "English",
    },
    {
      text: "Got my vehicle loan approved within 48 hours. The team was very supportive throughout the process.",
      name: "Amit Patel",
      role: "Freelance Creative",
      language: "English",
    },
    {
      text: "The gold loan process was hassle-free. Fair valuation and instant approval made it very convenient.",
      name: "Sarah Thompson",
      role: "Small Business Owner",
      language: "English",
    },
    // Hindi
    {
      text: "MaxDSA की सेवा बहुत अच्छी है। लोन प्रोसेस बहुत तेज और आसान था।",
      name: "विक्रम सिंह",
      role: "व्यापारी",
      language: "Hindi",
    },
    {
      text: "दस्तावेज़ चेकलिस्ट से सब कुछ व्यवस्थित हो गया। बहुत मददगार टीम है।",
      name: "मीना देवी",
      role: "गृहिणी",
      language: "Hindi",
    },
    {
      text: "होम लोन के लिए बेस्ट सर्विस। पूरी प्रक्रिया पारदर्शी थी।",
      name: "अरुण कुमार",
      role: "इंजीनियर",
      language: "Hindi",
    },
    // Telugu
    {
      text: "చాలా మంచి సర్వీస్. లోన్ ప్రాసెస్ చాలా సులభంగా జరిగింది.",
      name: "వెంకట రావు",
      role: "వ్యాపారి",
      language: "Telugu",
    },
    {
      text: "MaxDSA టీం చాలా సహాయకారిగా ఉంది. డాక్యుమెంట్స్ అన్నీ క్లియర్ గా చెప్పారు.",
      name: "లక్ష్మి దేవి",
      role: "టీచర్",
      language: "Telugu",
    },
    {
      text: "గోల్డ్ లోన్ కోసం చాలా మంచి వాల్యుయేషన్ ఇచ్చారు. త్వరగా అప్రూవల్ వచ్చింది.",
      name: "రమేష్ బాబు",
      role: "రైతు",
      language: "Telugu",
    },
    // Gujarati
    {
      text: "MaxDSA ની સેવા ખૂબ જ સારી છે. લોન પ્રક્રિયા ખૂબ જ સરળ હતી.",
      name: "મહેશ શાહ",
      role: "વેપારી",
      language: "Gujarati",
    },
    {
      text: "ડોક્યુમેન્ટ ચેકલિસ્ટ ખૂબ જ ઉપયોગી હતી. ટીમ ખૂબ સહાયક છે.",
      name: "નીતા પટેલ",
      role: "શિક્ષિકા",
      language: "Gujarati",
    },
    {
      text: "ઘર લોન માટે શ્રેષ્ઠ સેવા. ઝડપી અને પારદર્શક પ્રક્રિયા.",
      name: "જયેશ દેસાઈ",
      role: "એન્જિનિયર",
      language: "Gujarati",
    },
    // Tamil
    {
      text: "மிகவும் நல்ல சேவை. கடன் செயல்முறை மிகவும் எளிதாக இருந்தது.",
      name: "முருகன்",
      role: "வணிகர்",
      language: "Tamil",
    },
    {
      text: "MaxDSA குழு மிகவும் உதவியாக இருந்தது. ஆவணங்கள் அனைத்தும் தெளிவாக விளக்கப்பட்டன.",
      name: "லட்சுமி",
      role: "ஆசிரியர்",
      language: "Tamil",
    },
    {
      text: "வீட்டுக் கடனுக்கு சிறந்த சேவை. விரைவான ஒப்புதல் கிடைத்தது.",
      name: "ராஜேஷ்",
      role: "பொறியாளர்",
      language: "Tamil",
    },
  ];

  const handleDownload = (loanType: string) => {
    // Placeholder for download functionality
    console.log(`Downloading checklist for ${loanType}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Download Loan Checklists
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Get organized with our comprehensive loan document checklists. Download the relevant checklist for your loan type and ensure a smooth application process.
          </p>
        </div>
      </section>

      {/* Loan Cards Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanTypes.map((loan, index) => {
              const IconComponent = LucideIcons[loan.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300" />
                  <CardContent className="relative p-6 flex flex-col h-full min-h-[200px]">
                    <IconComponent className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-4">{loan.title}</h3>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        {loan.keywords.join(" • ")}
                      </p>
                    </div>
                    <div className="flex justify-end items-center gap-2 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(loan.title)}
                        className="hover:bg-primary/10 flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-sm">Download</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help with Your Loan Application?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Our expert team is ready to guide you through every step of the loan process. Get personalized assistance today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us Now
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-muted/20 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Experiences That Speak Volumes
            </h2>
          </div>
          
          {/* First Row - Auto Scroll Left to Right */}
          <div className="relative mb-6 overflow-hidden">
            <div className="flex gap-6 animate-scroll-left">
              {[...testimonials.slice(0, 8), ...testimonials.slice(0, 8)].map((testimonial, index) => (
                <Card key={index} className="min-w-[300px] flex-shrink-0">
                  <CardContent className="p-6 flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Second Row - Auto Scroll Right to Left */}
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll-right">
              {[...testimonials.slice(8, 16), ...testimonials.slice(8, 16)].map((testimonial, index) => (
                <Card key={index} className="min-w-[300px] flex-shrink-0">
                  <CardContent className="p-6 flex flex-col h-full">
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Downloads;
