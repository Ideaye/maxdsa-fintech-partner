import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OffersBanner from "@/components/shared/OffersBanner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { LoanCalculatorSection } from "@/components/LoanCalculatorSection";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ChevronLeft,
  ChevronRight,
  Eye,
  Handshake,
  TrendingUp
 } from "lucide-react";
import backgroundVideo from "@/assets/background-video.mp4";
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
import heroVideo from "@/assets/hero-video.mp4";
import ctaBackground from "@/assets/cta-background.png";
import paperPlaneIcon from "@/assets/paper-plane-icon.png";

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
    { value: "Many", label: "Years of Collective Experience" },
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
    },
    {
      name: "Neha Desai",
      role: "DSA Partner, Pune",
      content: "Outstanding platform with seamless bank integrations. My monthly earnings have doubled since joining MaxDSA!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Vikram Singh",
      role: "DSA Partner, Bangalore",
      content: "The dedicated relationship manager and 24/7 support have been game changers. Highly recommended!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Sunita Reddy",
      role: "DSA Partner, Hyderabad",
      content: "MaxDSA's training programs are top-notch. I went from beginner to processing ₹10 crore in loans within a year.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Karan Malhotra",
      role: "DSA Partner, Chandigarh",
      content: "The AI-powered lead scoring helps me focus on high-quality prospects. My conversion rate has skyrocketed!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Anjali Gupta",
      role: "DSA Partner, Jaipur",
      content: "Transparent commission structure and quick payouts. MaxDSA delivers on every promise they make.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Rahul Joshi",
      role: "DSA Partner, Indore",
      content: "Access to 15+ banks means I can offer the best rates to my clients. Customer satisfaction has never been higher!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Meera Iyer",
      role: "DSA Partner, Chennai",
      content: "The automated documentation process saves me hours every day. I can now handle 3x more clients effortlessly.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Arjun Nair",
      role: "DSA Partner, Kochi",
      content: "From onboarding to ongoing support, MaxDSA has exceeded my expectations at every step. True partners in success!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Pooja Mehta",
      role: "DSA Partner, Surat",
      content: "The real-time tracking dashboard is brilliant. I always know exactly where each application stands.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Deepak Verma",
      role: "DSA Partner, Lucknow",
      content: "MaxDSA's platform is so intuitive even my team members picked it up in days. Efficiency has improved drastically!",
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
      <OffersBanner />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        
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

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Video Background */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-white/20">
                {/* Our Vision */}
                <div className="text-white md:pr-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-white/90 leading-relaxed">
                    To be India's most trusted partner for MSME transformation, creating a thriving ecosystem where small and medium enterprises become globally competitive, technologically advanced, and sustainably profitable.
                  </p>
                </div>

                {/* Our Commitment */}
                <div className="text-white md:px-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Handshake className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
                  <p className="text-white/90 leading-relaxed">
                    We are committed to delivering personalised solutions that address the unique challenges faced by MSMEs, fostering innovation, building capabilities, and ensuring long-term business sustainability in an ever-evolving market.
                  </p>
                </div>

                {/* Our Impact */}
                <div className="text-white md:pl-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                  <p className="text-white/90 leading-relaxed">
                    Through strategic consulting, operational excellence, and digital transformation initiatives, we empower businesses to scale efficiently, compete globally, and contribute meaningfully to India's economic growth and development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold text-red-500 mb-2 tracking-wide uppercase">Our Impact</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">
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
              <div className="text-4xl font-bold text-black mb-2">Many</div>
              <p className="text-gray-600 text-sm">Years of Experience</p>
              <p className="text-gray-500 text-xs mt-2">Of combined banking and financial expertise across our leadership team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Banks Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
              Our Banking Partners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              As a DSA partner, it is important to have reliable banking partnerships for seamless loan processing and customer satisfaction.
            </p>
          </div>
          
          {/* Desktop: Single row scrolling */}
          <div className="relative hidden md:block">
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

          {/* Mobile: Two-row scrolling */}
          <div className="relative md:hidden space-y-4">
            {/* First row */}
            <div className="flex animate-scroll-left">
              {partnerBanks.slice(0, 4).map((bank, index) => (
                <div key={`mobile-row1-first-${index}`} className="flex items-center justify-center h-16 min-w-[140px] mx-4">
                  <img 
                    src={bank.logo} 
                    alt={bank.name}
                    className="max-h-14 max-w-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {partnerBanks.slice(0, 4).map((bank, index) => (
                <div key={`mobile-row1-second-${index}`} className="flex items-center justify-center h-16 min-w-[140px] mx-4">
                  <img 
                    src={bank.logo} 
                    alt={bank.name}
                    className="max-h-14 max-w-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Second row */}
            <div className="flex animate-scroll-left" style={{ animationDelay: '1.5s' }}>
              {partnerBanks.slice(4, 8).map((bank, index) => (
                <div key={`mobile-row2-first-${index}`} className="flex items-center justify-center h-16 min-w-[140px] mx-4">
                  <img 
                    src={bank.logo} 
                    alt={bank.name}
                    className="max-h-14 max-w-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {partnerBanks.slice(4, 8).map((bank, index) => (
                <div key={`mobile-row2-second-${index}`} className="flex items-center justify-center h-16 min-w-[140px] mx-4">
                  <img 
                    src={bank.logo} 
                    alt={bank.name}
                    className="max-h-14 max-w-full object-contain transition-all duration-300"
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
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
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

      {/* Loan Calculator Section */}
      <LoanCalculatorSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
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
            <div className="hidden lg:flex flex-col items-start flex-shrink-0">
              <div className="text-8xl text-gray-300 font-serif leading-none mb-4">"</div>
              <h3 className="text-2xl font-bold text-black">
                What our<br />
                partners are<br />
                saying
              </h3>
            </div>

            {/* Auto-scrolling Testimonials Container */}
            <div className="flex-1 relative">
              <div className="overflow-hidden">
                <div className="flex animate-scroll-left hover:pause-animation">
                  {/* First set of testimonials */}
                  {testimonials.map((testimonial, index) => (
                    <div key={`first-${index}`} className="flex-shrink-0 w-80 mx-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
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
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {testimonials.map((testimonial, index) => (
                    <div key={`second-${index}`} className="flex-shrink-0 w-80 mx-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight tracking-tight">
              Frequently Asked Questions
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

              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6 mb-4">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What types of loans can I distribute as a DSA partner?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  As a MaxDSA partner, you can distribute various loan products including home loans, personal loans, business loans, loan against property, car loans, and more. Our multi-bank network ensures you have access to diverse product portfolios.
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

              <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6 mb-4">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How does the AI-powered platform help my DSA business?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Our AI platform provides intelligent lead scoring, automated document verification, real-time application tracking, and predictive analytics. This helps you focus on high-quality leads, reduce processing time, and improve your conversion rates significantly.
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
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-relaxed">
                  Ready to Transform Your DSA Business?<br />
                  <span className="font-light text-white/90">Let's Connect</span>
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

              {/* Right Icon */}
              <div className="hidden lg:flex justify-center items-center">
                <img 
                  src={paperPlaneIcon} 
                  alt="Paper plane" 
                  className="w-80 h-80 object-contain opacity-90 animate-[slide-horizontal_3s_ease-in-out_infinite]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
