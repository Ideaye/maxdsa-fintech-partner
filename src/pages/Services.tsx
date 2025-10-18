import OffersBanner from "@/components/shared/OffersBanner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bot, Zap, Shield, TrendingUp, Users, Clock, ArrowRight } from "lucide-react";
import ctaBackground from "@/assets/cta-background.png";
import paperPlaneIcon from "@/assets/paper-plane-icon.png";

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: "AI-Driven Transaction Tools",
      description: "Advanced AI algorithms to optimize loan distribution and enhance transaction success rates with real-time analytics.",
      features: ["Smart Lead Scoring", "Automated Processing", "Predictive Analytics"]
    },
    {
      icon: Zap,
      title: "Seamless Process Automation",
      description: "End-to-end automation solutions that streamline your DSA operations and reduce manual intervention.",
      features: ["Workflow Automation", "Document Processing", "Status Tracking"]
    },
    {
      icon: Shield,
      title: "Strong Partner Support",
      description: "Comprehensive support ecosystem with dedicated relationship managers and 24/7 technical assistance.",
      features: ["Dedicated Support", "Training Programs", "Regular Updates"]
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Real-time dashboards and detailed reports to track your business growth and optimization opportunities.",
      features: ["Revenue Tracking", "Performance Metrics", "Growth Insights"]
    },
    {
      icon: Users,
      title: "Multi-Bank Integration",
      description: "Seamless integration with multiple banking partners for diverse product offerings and better customer reach.",
      features: ["15+ Bank Partners", "Unified Platform", "Single Dashboard"]
    },
    {
      icon: Clock,
      title: "Rapid Deployment",
      description: "Get started in under 10 minutes with our streamlined onboarding process and instant activation.",
      features: ["Quick Setup", "Instant Activation", "Zero Downtime"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <OffersBanner />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/15 overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
            <span className="text-sm font-medium text-primary">Comprehensive DSA Solutions</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Empowering DSAs,{" "}
            <span className="block">One Solution at a Time,</span>
            <span className="block">Every Day</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-slide-up">
            MaxDSA is created to meet the need for a fast, intuitive, and flexible platform
            that helps DSA partners achieve maximum productivity and growth.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/contact">
              <Button variant="hero" size="lg" className="px-8">
                Get Started Now
              </Button>
            </Link>
            <Link to="/why-partner">
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
            </Link>
          </div>
          
          {/* Statistics Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">250+</div>
                <div className="text-sm text-muted-foreground">Active DSA Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Banking Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">₹500Cr+</div>
                <div className="text-sm text-muted-foreground">Loans Processed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Platform Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                About Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Building Solutions,{" "}
                <span className="block">Expanding</span>
                <span className="block">Horizons</span>
              </h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                As we automated processes, built workflows, and expanded our community beyond what we imagined, 
                MaxDSA work os naturally came to life through that journey.
              </p>
              <p className="text-lg">
                On February 8th, 2021, MaxDSA marked a new chapter by establishing partnerships with leading banks. 
                Today, we keep growing as a multi-product DSA platform company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline Section */}
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                Our story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                From Concept to{" "}
                <span className="block">Global Impact</span>
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* Timeline Item 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-primary font-medium text-sm mb-1">2020 • December</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Idea And Initial Concept</h3>
                  <p className="text-muted-foreground">
                    MaxDSA was born as a simple concept to bridge gaps in DSA management and financial workflow coordination.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-primary font-medium text-sm mb-1">2021 • February</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Beta Launch</h3>
                  <p className="text-muted-foreground">
                    Launched our beta platform with core DSA functionalities and established partnerships with our first banking partners.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-primary font-medium text-sm mb-1">2022 • September</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Introducing Automation</h3>
                  <p className="text-muted-foreground">
                    Revolutionized DSA operations with AI-driven automation tools and streamlined loan processing workflows.
                  </p>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-primary font-medium text-sm mb-1">2023 • December</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Going Global</h3>
                  <p className="text-muted-foreground">
                    Expanded our platform nationally with 15+ banking partners and 250+ active DSA agents across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-elegant bg-card rounded-lg p-6 hover-lift">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mr-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">{service.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-ai-accent rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started with MaxDSA in three simple steps and transform your DSA business today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Verification",
                description: "Complete our streamlined registration process with instant verification and KYC approval."
              },
              {
                step: "02", 
                title: "Platform Integration",
                description: "Connect with our AI-powered platform and integrate with your preferred banking partners."
              },
              {
                step: "03",
                title: "Start Transacting",
                description: "Begin processing loans with our automated tools and dedicated support team backing you."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
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
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
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

export default Services;