import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Star,
  PlayCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import trendingUpIcon from "@/assets/icons/trending-up.png";
import usersIcon from "@/assets/icons/users.png";
import awardIcon from "@/assets/icons/award.png";
import checkCircleIcon from "@/assets/icons/check-circle.png";
import starIcon from "@/assets/icons/star.png";
import arrowRightIcon from "@/assets/icons/arrow-right.png";
import aiRobotIcon from "@/assets/icons/ai-robot.png";
import lightningIcon from "@/assets/icons/lightning.png";

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPartner, setCurrentPartner] = useState(0);

  const stats = [
    { icon: usersIcon, value: "300+", label: "Years Collective Experience" },
    { icon: trendingUpIcon, value: "₹500+", label: "Crore Transactions" },
    { icon: awardIcon, value: "250+", label: "Happy Customers" },
    { icon: checkCircleIcon, value: "15+", label: "Bank Partners" }
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
    "HDFC Bank", "ICICI Bank", "Kotak Mahindra", "RBL Bank", 
    "Bajaj Finance", "IDFC First", "IndusInd Bank", "Yes Bank"
  ];

  const features = [
    {
      title: "AI-Powered Analytics",
      description: "Smart algorithms that optimize your loan distribution process",
      icon: aiRobotIcon
    },
    {
      title: "Multi-Bank Integration", 
      description: "Seamless access to 15+ leading banks and financial institutions",
      icon: checkCircleIcon
    },
    {
      title: "Instant Processing",
      description: "Get started in under 10 minutes with automated onboarding",
      icon: lightningIcon
    },
    {
      title: "24/7 Support",
      description: "Dedicated relationship managers and technical assistance",
      icon: usersIcon
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
  }, []);

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
              <img src={starIcon} alt="Star" className="h-4 w-4 mr-2 filter brightness-0 invert" />
              Trusted by Leading Banks & DSAs Across India
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Center Content */}
            <div className="text-white max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Empowering DSAs with 
                <span className="block text-white">Next-Gen Financial Solutions</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                MaxDSA leverages 300+ years of banking expertise and AI-driven tools to accelerate your business growth, streamline loan distribution, and power outstanding results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="cta" size="lg" className="group">
                    Partner With Us
                    <img src={arrowRightIcon} alt="Arrow" className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform filter brightness-0 invert" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-primary-dark">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
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

            {/* ROI Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-6xl font-bold text-black mb-2">90<span className="text-gray-400">%</span></div>
              <p className="text-gray-600 text-sm">Return on investment (ROI)</p>
              <p className="text-gray-500 text-xs mt-2">Earn back on your investment within 30 days</p>
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
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={starIcon} alt="Star" className="h-4 w-4 mr-0.5" />
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
              <div className="text-5xl font-bold text-black mb-2">300<span className="text-gray-400">+</span></div>
              <p className="text-gray-600 text-sm">Years Collective Experience</p>
              <p className="text-gray-500 text-xs mt-2">Combined expertise of our team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Banks Carousel */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              Trusted Partner Banks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with India's leading banks and financial institutions to provide 
              you with the best loan products and highest conversion rates.
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out">
              {partnerBanks.slice(currentPartner, currentPartner + 4).map((bank, index) => (
                <div key={index} className="flex-1 px-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm text-center hover-lift">
                    <div className="text-lg font-semibold text-primary-dark">{bank}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              Why Choose MaxDSA?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the power of AI-driven automation combined with decades 
              of banking expertise to transform your DSA business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-elegant bg-card rounded-lg p-6 text-center hover-lift">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img src={feature.icon} alt={feature.title} className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Read reviews,<br />
              ride with confidence.
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-gray-400">/5</span>
              <img src={starIcon} alt="Star" className="h-6 w-6 ml-1" />
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
                      <img key={i} src={starIcon} alt="Star" className="h-4 w-4 mr-0.5" />
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

      {/* Onboarding Process */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              Get Started in Under 10 Minutes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined onboarding process gets you up and running quickly 
              with minimal paperwork and maximum efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  {index < onboardingSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform -translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your DSA Business?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join 250+ successful DSA partners who trust MaxDSA for their business growth. 
            Experience the power of AI-driven automation and expert support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="cta" size="lg">
                Get Started Now
              </Button>
            </Link>
            <Link to="/why-partner">
              <Button variant="outline-corporate" size="lg" className="border-white text-white hover:bg-white hover:text-primary-dark">
                Learn Why Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
