import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ChevronLeft,
  ChevronRight
 } from "lucide-react";
// Updated imports for Huge Icons - cache refresh
import { 
  ArrowUpRight01Icon,
  UserIcon,
  StarIcon,
  ArrowRight01Icon,
  RoboticIcon,
  FlashIcon,
  CheckmarkCircle01Icon
} from "hugeicons-react";
import heroBackground from "@/assets/hero-background.jpg";
import ctaBackground from "@/assets/cta-background.png";

// Import bank logos - using the AI-generated ones from bank-logos folder
import hdfcLogo from "@/assets/bank-logos/hdfc-bank-logo.png";
import iciciLogo from "@/assets/bank-logos/icici-bank-logo.png";
import kotakLogo from "@/assets/bank-logos/kotak-mahindra-logo.png";
import rblLogo from "@/assets/bank-logos/rbl-bank-logo.png";
import bajajLogo from "@/assets/bank-logos/bajaj-finance-logo.png";
import idfcLogo from "@/assets/bank-logos/idfc-first-bank-logo.png";
import indusindLogo from "@/assets/bank-logos/indusind-bank-logo.png";
import yesLogo from "@/assets/bank-logos/yes-bank-logo.png";

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPartner, setCurrentPartner] = useState(0);

  const stats = [
    { value: "Manyears", label: "Collective Experience" },
    { value: "₹500+", label: "Crore Transactions" },
    { value: "250+", label: "Happy Customers" },
    { value: "15+", label: "Bank Partners" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "DSA Partner, Delhi",
      content: "MaxDSA's AI tools increased my conversion rates by 40% in just 6 months. The support team is exceptional!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Priya Sharma", 
      role: "DSA Partner, Mumbai",
      content: "Best decision for my DSA business. The platform is user-friendly and the multi-bank integration opened new opportunities.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Amit Patel",
      role: "DSA Partner, Ahmedabad", 
      content: "The automation tools have transformed how I operate. Processing time reduced by 60% with better accuracy.",
      rating: 5,
      image: "/api/placeholder/60/60"
    }
  ];

  const partnerBanks = [
    { name: "HDFC Bank", logo: hdfcLogo },
    { name: "ICICI Bank", logo: iciciLogo },
    { name: "Kotak Mahindra", logo: kotakLogo },
    { name: "RBL Bank", logo: rblLogo },
    { name: "Bajaj Finance", logo: bajajLogo },
    { name: "IDFC First", logo: idfcLogo },
    { name: "IndusInd Bank", logo: indusindLogo },
    { name: "Yes Bank", logo: yesLogo }
  ];

  const features = [
    {
      title: "AI-Powered Analytics",
      description: "Smart algorithms that optimize your loan distribution process"
    },
    {
      title: "Multi-Bank Integration", 
      description: "Seamless access to 15+ leading banks and financial institutions"
    },
    {
      title: "Instant Processing",
      description: "Get started in under 10 minutes with automated onboarding"
    },
    {
      title: "24/7 Support",
      description: "Dedicated relationship managers and technical assistance"
    }
  ];

  const onboardingSteps = [
    {
      step: "01",
      title: "Sign Up",
      description: "Complete registration in under 5 minutes"
    },
    {
      step: "02", 
      title: "Verification",
      description: "Instant KYC and document verification"
    },
    {
      step: "03",
      title: "Start Transacting",
      description: "Begin processing loans immediately"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 4) % partnerBanks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [partnerBanks.length]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ai-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          {/* Trust Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm">
              <StarIcon size={16} className="mr-2 text-white" />
              Trusted by Leading Banks & DSAs Across India
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Center Content */}
            <div className="text-white max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                India's First Assisted Corporate DSA
                <span className="block text-white">Disrupting the Lending Distribution Business</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                MaxDSA leverages manyears of banking expertise and AI-driven tools to accelerate your business growth, streamline loan distribution, and power outstanding results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/partner-signup">
                  <Button variant="cta" size="lg" className="group">
                    Partner With Us
                    <ArrowRight01Icon size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-white" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="hero" size="lg">
                    See Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold text-red-500 mb-2 tracking-wide uppercase">MISSION</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight tracking-tight">
              <span className="text-gray-500">Our focus is simple</span><br />
              <span className="text-black">Design to convert</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We promise to deliver beyond your expectations for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Partners Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-red-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600">15+ PARTNERS</span>
              </div>
              <p className="text-gray-700 text-sm">
                Through our custom-tailored funnel systems
              </p>
            </div>

            {/* Payout Guarantee Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-6xl font-bold text-black mb-2">100<span className="text-gray-400">%</span></div>
              <p className="text-gray-600 text-sm">Payout Guarantee</p>
              <p className="text-gray-500 text-xs mt-2">Guaranteed commission payout for all successful transactions</p>
            </div>

            {/* Revenue Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-5xl font-bold text-black mb-2">₹500<span className="text-gray-400">+</span></div>
              <p className="text-gray-600 text-sm mb-3">Crore Transactions</p>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500 uppercase">Available for Partners</span>
              </div>
            </div>

            {/* Projects Card - Spanning 2 columns */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-sm md:col-span-2 lg:col-span-2">
              <p className="text-white text-lg mb-6">
                We delivered 250+ successful partnerships across India, helping DSAs secure more clients and maximize their revenue potential.
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-5xl font-bold text-white mb-1">4.8<span className="text-gray-400 text-3xl">/5</span></div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={16} className="text-yellow-400 mr-0.5" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    TRUSTED BY<br />CLIENTS NATIONWIDE
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-4xl font-bold text-black mb-2">Manyears</div>
              <p className="text-gray-600 text-sm">Collective Experience</p>
              <p className="text-gray-500 text-xs mt-2">Combined expertise of our team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Banks Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
              Our Banking Partners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              As a DSA partner, it is important to have reliable banking partnerships for seamless loan processing and customer satisfaction.
            </p>
          </div>
          
          <div className="relative">
            <div className="flex animate-scroll-left">
              {/* First set of logos */}
              {partnerBanks.map((bank, index) => (
                <div key={`first-${index}`} className="flex items-center justify-center h-16 min-w-[150px] mx-8">
                  <img 
                    src={bank.logo} 
                    alt={bank.name}
                    className="max-h-12 max-w-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partnerBanks.map((bank, index) => (
                <div key={`second-${index}`} className="flex items-center justify-center h-16 min-w-[150px] mx-8">
                  <img 
                    src={bank.logo} 
                    alt={bank.name}
                    className="max-h-12 max-w-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="text-sm font-semibold text-gray-500 mb-4 tracking-wide uppercase border border-gray-300 rounded-full px-4 py-2 inline-block">
              SERVICES
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
                  Explore our comprehensive service offerings
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Focused on your unique needs, our team delivers solutions that blend deep industry knowledge and cutting-edge strategies to ensure lasting growth.
                </p>
                <Link to="/services">
                  <Button variant="cta" size="lg" className="group">
                    Get Started
                    <ArrowRight01Icon size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-white" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* AI-Powered Analytics - Large Card */}
                <div className="col-span-2 bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <RoboticIcon size={24} className="text-white" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-3">AI-Powered Analytics</h3>
                    <p className="text-blue-100">
                      Crafting strategic plans that align with your goals.
                    </p>
                  </div>
                </div>

                {/* Multi-Bank Integration */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <CheckmarkCircle01Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">Multi-Bank Integration</h3>
                  <p className="text-gray-600 text-sm">
                    Expert guidance to optimize your financial performance.
                  </p>
                </div>

                {/* Instant Processing */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <FlashIcon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">Instant Processing</h3>
                  <p className="text-gray-600 text-sm">
                    Innovative tech strategies to enhance operational efficiency.
                  </p>
                </div>

                {/* 24/7 Support */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <UserIcon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">
                    Identify, assess, and mitigate risks to protect your assets.
                  </p>
                </div>

                {/* Risk Management */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <ArrowUpRight01Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">Risk Management</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive risk assessment and mitigation strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
              Read reviews,<br />
              ride with confidence.
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-gray-400">/5</span>
              <StarIcon size={24} className="text-green-600 ml-1" />
              <span className="font-semibold text-green-600">Trustpilot</span>
            </div>
            <p className="text-gray-500">Based on 250+ reviews</p>
          </div>
          
          <div className="flex items-start gap-8 max-w-6xl mx-auto">
            {/* Left Side Quote */}
            <div className="hidden lg:flex flex-col items-start">
              <div className="text-8xl text-gray-300 font-serif leading-none mb-4">"</div>
              <h3 className="text-2xl font-bold text-black">
                What our<br />
                partners are<br />
                saying
              </h3>
              <div className="flex items-center mt-8">
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors mr-4"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} size={16} className="text-yellow-400 mr-0.5" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-black text-sm">{testimonial.name}</div>
                      <div className="text-gray-500 text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center items-center mt-8 lg:hidden">
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors mr-4"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-500 mx-4">
              {currentTestimonial + 1} of {testimonials.length}
            </span>
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section - Redesigned */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
              The DSA Partnership Process Is<br />
              Designed for Maximum Success
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our streamlined approach ensures quick onboarding and immediate results. 
              Payout Guaranteed, Seamless TDS & GST Processing, Dedicated Relationship Manager
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">01</div>
                <h3 className="text-xl font-semibold text-black mb-4">Quick Registration</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Complete your DSA registration with our streamlined digital process. Submit documents and get verified within minutes.
                </p>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">02</div>
                <h3 className="text-xl font-semibold text-black mb-4">Platform Integration</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect with our multi-bank platform and access AI-powered tools. Configure preferences for optimal performance.
                </p>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">03</div>
                <h3 className="text-xl font-semibold text-black mb-4">Start Earning</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Begin processing loan applications immediately with guaranteed payouts. Track progress and maximize conversions.
                </p>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <Link to="/partner-signup">
              <Button variant="cta" size="lg" className="group">
                Start Your DSA Journey
                <ArrowRight01Icon size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-white" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight tracking-tight">
              Frequently Ask Questions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6 mb-4">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How long does the DSA onboarding process take?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Our streamlined digital onboarding process typically takes 24-48 hours. Once you submit your documents, our verification team ensures quick processing so you can start earning commissions immediately.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6 mb-4">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What is the commission structure for DSA partners?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Commission rates vary by product type and loan amount, typically ranging from 0.5% to 2% of the sanctioned amount. We offer competitive payouts with transparent calculations and timely disbursements.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6 mb-4">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Which banks and financial institutions do you partner with?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  We work with 15+ leading banks including HDFC, ICICI, Kotak Mahindra, and other top NBFCs. This gives you access to diverse loan products and better approval rates for your clients.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6 mb-4">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Do you provide training and support for new DSAs?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Yes, we provide comprehensive training on loan products, sales techniques, and our AI-powered platform. You'll also have access to dedicated relationship managers and 24/7 technical support.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div 
            className="relative overflow-hidden rounded-3xl"
            style={{
              backgroundImage: `url(${ctaBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
              {/* Left Content */}
              <div className="text-white">
                <div className="mb-4">
                  <span className="text-sm font-medium text-white/80 tracking-wide uppercase">
                    GET IN TOUCH
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Ready to Transform Your<br />
                  <span className="italic text-white/90">DSA Business?</span>
                </h2>
                
                <p className="text-lg text-white/90 mb-8 max-w-xl leading-relaxed">
                  Connect with our team to discover how MaxDSA can accelerate your growth and maximize your revenue potential.
                </p>
                
                <Link to="/contact">
                  <Button className="bg-white hover:bg-gray-100 text-black px-8 py-6 rounded-full text-lg font-semibold group">
                    Contact Us
                    <ArrowRight01Icon size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Right Visual Space */}
              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
