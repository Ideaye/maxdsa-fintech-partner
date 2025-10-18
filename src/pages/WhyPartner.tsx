import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  Bot, 
  Network, 
  Zap, 
  Target, 
  Shield, 
  ArrowUp,
  CheckCircle
} from "lucide-react";
import handshakeIcon from "@/assets/icons/handshake-icon.png";

const WhyPartner = () => {
  const advantages = [
    {
      icon: Users,
      title: "Experienced Leadership",
      description: "300+ years of collective banking experience with deep industry knowledge and proven track record.",
      benefits: ["Veteran Leadership Team", "Industry Expertise", "Strategic Guidance"]
    },
    {
      icon: TrendingUp,
      title: "Proven Track Record",
      description: "₹500+ Crore in successful transactions with 250+ satisfied DSA partners across India.",
      benefits: ["Consistent Growth", "High Success Rate", "Trusted by Many"]
    },
    {
      icon: Bot,
      title: "AI-Powered Tools",
      description: "Advanced AI algorithms and automation tools that optimize your loan distribution process.",
      benefits: ["Smart Lead Scoring", "Automated Processing", "Real-time Analytics"]
    },
    {
      icon: Network,
      title: "Ecosystem Advantage",
      description: "Comprehensive partner network with 15+ leading banks and financial institutions.",
      benefits: ["Multiple Bank Partners", "Diverse Product Range", "Better Conversion Rates"]
    },
    {
      icon: Zap,
      title: "Efficiency & Speed",
      description: "Streamlined processes that reduce turnaround time and increase transaction success rates.",
      benefits: ["Faster Processing", "Quick Approvals", "Minimal Documentation"]
    },
    {
      icon: Target,
      title: "Market Reach",
      description: "Extensive market coverage and customer base expansion opportunities across India.",
      benefits: ["Pan-India Presence", "Customer Acquisition", "Market Expansion"]
    },
    {
      icon: Shield,
      title: "Transparency & Trust",
      description: "Complete transparency in operations with secure, reliable, and compliant processes.",
      benefits: ["Open Communication", "Secure Platform", "Regulatory Compliance"]
    },
    {
      icon: ArrowUp,
      title: "Growth Focused Approach",
      description: "Dedicated support and resources to help you scale your DSA business exponentially.",
      benefits: ["Business Development", "Training Programs", "Continuous Support"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "DSA Partner, Delhi",
      content: "MaxDSA's AI tools have transformed my business. My conversion rates increased by 40% in just 6 months.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "DSA Partner, Mumbai",
      content: "The support team is exceptional. They're always there to help, and the platform is incredibly user-friendly.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "DSA Partner, Ahmedabad",
      content: "Best decision for my DSA business. The multi-bank integration has opened up so many opportunities.",
      rating: 5
    }
  ];

  const comparisonFeatures = [
    { feature: "AI-Powered Tools", maxdsa: true, others: false },
    { feature: "300+ Years Experience", maxdsa: true, others: false },
    { feature: "15+ Bank Partners", maxdsa: true, others: false },
    { feature: "24/7 Support", maxdsa: true, others: true },
    { feature: "Quick Onboarding", maxdsa: true, others: false },
    { feature: "Real-time Analytics", maxdsa: true, others: false },
    { feature: "Automated Processing", maxdsa: true, others: false },
    { feature: "Training Programs", maxdsa: true, others: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-secondary/20 to-background py-20 overflow-hidden">
        {/* Floating portrait images */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top row */}
          <div className="absolute top-20 left-[5%] w-20 h-20 rounded-2xl bg-card shadow-elegant overflow-hidden rotate-3 animate-float">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="absolute top-32 left-[15%] w-24 h-24 rounded-2xl bg-card shadow-elegant overflow-hidden -rotate-2 animate-float" style={{animationDelay: '0.5s'}}>
            <div className="w-full h-full bg-gradient-to-br from-ai-accent/20 to-ai-accent/40 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-ai-accent" />
            </div>
          </div>
          <div className="absolute top-16 right-[15%] w-22 h-22 rounded-2xl bg-card shadow-elegant overflow-hidden rotate-2 animate-float" style={{animationDelay: '1s'}}>
            <div className="w-full h-full bg-gradient-to-br from-fintech-blue/20 to-fintech-blue/40 flex items-center justify-center">
              <Bot className="w-9 h-9 text-fintech-blue" />
            </div>
          </div>
          <div className="absolute top-28 right-[5%] w-20 h-20 rounded-2xl bg-card shadow-elegant overflow-hidden -rotate-1 animate-float" style={{animationDelay: '1.5s'}}>
            <div className="w-full h-full bg-gradient-to-br from-success/20 to-success/40 flex items-center justify-center">
              <Network className="w-8 h-8 text-success" />
            </div>
          </div>

          {/* Middle row */}
          <div className="absolute top-1/2 left-[8%] w-18 h-18 rounded-2xl bg-card shadow-elegant overflow-hidden rotate-1 animate-float" style={{animationDelay: '2s'}}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <Zap className="w-7 h-7 text-primary" />
            </div>
          </div>
          <div className="absolute top-1/2 right-[8%] w-18 h-18 rounded-2xl bg-card shadow-elegant overflow-hidden -rotate-2 animate-float" style={{animationDelay: '2.5s'}}>
            <div className="w-full h-full bg-gradient-to-br from-fintech-blue/20 to-fintech-blue/40 flex items-center justify-center">
              <Target className="w-7 h-7 text-fintech-blue" />
            </div>
          </div>

          {/* Bottom row */}
          <div className="absolute bottom-32 left-[12%] w-24 h-24 rounded-2xl bg-card shadow-elegant overflow-hidden rotate-2 animate-float" style={{animationDelay: '3s'}}>
            <div className="w-full h-full bg-gradient-to-br from-ai-accent/20 to-ai-accent/40 flex items-center justify-center">
              <Shield className="w-10 h-10 text-ai-accent" />
            </div>
          </div>
          <div className="absolute bottom-20 left-[25%] w-20 h-20 rounded-2xl bg-card shadow-elegant overflow-hidden -rotate-1 animate-float" style={{animationDelay: '3.5s'}}>
            <div className="w-full h-full bg-gradient-to-br from-success/20 to-success/40 flex items-center justify-center">
              <ArrowUp className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="absolute bottom-28 right-[20%] w-22 h-22 rounded-2xl bg-card shadow-elegant overflow-hidden rotate-1 animate-float" style={{animationDelay: '4s'}}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-primary" />
            </div>
          </div>
          <div className="absolute bottom-16 right-[8%] w-20 h-20 rounded-2xl bg-card shadow-elegant overflow-hidden -rotate-2 animate-float" style={{animationDelay: '4.5s'}}>
            <div className="w-full h-full bg-gradient-to-br from-fintech-blue/20 to-fintech-blue/40 flex items-center justify-center">
              <Users className="w-8 h-8 text-fintech-blue" />
            </div>
          </div>
        </div>

        {/* Central content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Partnership Testimonials
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6 animate-fade-in">
              Trusted by leaders <br />
              <span className="text-muted-foreground">from various industries</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up">
              Learn why professionals trust MaxDSA solutions to complete their customer journeys and scale their DSA business.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="card-elegant bg-card rounded-lg p-6 hover-lift">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <advantage.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{advantage.description}</p>
                <ul className="space-y-1">
                  {advantage.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-xs">
                      <CheckCircle className="h-3 w-3 text-ai-accent mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              MaxDSA vs Others
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how MaxDSA stands apart from other DSA service providers in the market.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-primary-dark text-white">
                <div className="p-4 font-semibold">Features</div>
                <div className="p-4 font-semibold text-center border-l border-gray-600">MaxDSA</div>
                <div className="p-4 font-semibold text-center border-l border-gray-600">Others</div>
              </div>
              {comparisonFeatures.map((item, index) => (
                <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className="p-4 font-medium">{item.feature}</div>
                  <div className="p-4 text-center border-l border-gray-200">
                    {item.maxdsa ? (
                      <CheckCircle className="h-5 w-5 text-success mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                  <div className="p-4 text-center border-l border-gray-200">
                    {item.others ? (
                      <CheckCircle className="h-5 w-5 text-success mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovative Offerings Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wide">
              Adding Value Further
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              Innovative Offerings and Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-primary text-white rounded-lg p-8 hover-lift">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Banking the Unbanked</h3>
              <p className="text-white/90 text-sm">
                Are you not having any Income Proofs? Is your Bank not ready to Fund you?
              </p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">CIBIL Issues Funding Support</h3>
              <p className="text-muted-foreground text-sm">
                Specialized solutions for customers with credit challenges
              </p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Corporate Dispute Management</h3>
              <p className="text-muted-foreground text-sm">
                Expert handling of complex corporate financial disputes
              </p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Vendor Support System</h3>
              <p className="text-muted-foreground text-sm">
                Comprehensive support for vendor financing and management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              What Our Partners Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from DSA partners who have transformed their business with MaxDSA.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elegant bg-card rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-primary to-fintech-blue rounded-3xl p-16 md:p-20 overflow-hidden">
            {/* Handshake Icon */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
              <img 
                src={handshakeIcon} 
                alt="Partnership handshake" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Ready to transform your<br />DSA business?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/partner-signup">Get started</Link>
                </Button>
                <Button asChild size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary">
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyPartner;