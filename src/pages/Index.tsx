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

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPartner, setCurrentPartner] = useState(0);

  const stats = [
    { icon: Users, value: "300+", label: "Years Collective Experience" },
    { icon: TrendingUp, value: "₹500+", label: "Crore Transactions" },
    { icon: Award, value: "250+", label: "Happy Customers" },
    { icon: CheckCircle, value: "15+", label: "Bank Partners" }
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
      icon: "🤖"
    },
    {
      title: "Multi-Bank Integration", 
      description: "Seamless access to 15+ leading banks and financial institutions",
      icon: "🏦"
    },
    {
      title: "Instant Processing",
      description: "Get started in under 10 minutes with automated onboarding",
      icon: "⚡"
    },
    {
      title: "24/7 Support",
      description: "Dedicated relationship managers and technical assistance",
      icon: "🛟"
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
              <Star className="h-4 w-4 text-yellow-400 mr-2 fill-current" />
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
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

          {/* Partner Logos */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <p className="text-white/70 text-sm">Trusted by leading financial institutions</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 opacity-60">
              {partnerBanks.slice(0, 6).map((bank, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex items-center justify-center">
                  <div className="w-20 h-12 bg-white/80 rounded flex items-center justify-center">
                    <div className="text-gray-800 text-xs font-semibold text-center">{bank}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary-dark mb-2 animate-counter">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
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
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 gradient-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              What Our Partners Say
            </h2>
            <p className="text-muted-foreground">
              Real stories from DSA partners who have transformed their business with MaxDSA.
            </p>
          </div>
          
          <div className="relative">
            <div className="card-elegant bg-card rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-card-foreground mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="font-semibold text-card-foreground">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
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
