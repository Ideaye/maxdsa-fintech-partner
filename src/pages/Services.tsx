import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bot, Zap, Shield, TrendingUp, Users, Clock } from "lucide-react";

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
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-section py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6 animate-fade-in">
            Comprehensive DSA Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up">
            Empower your DSA business with our AI-driven tools, seamless automation, 
            and comprehensive support ecosystem designed for maximum efficiency and growth.
          </p>
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
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
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

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your DSA Business?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join 250+ successful DSA partners who trust MaxDSA for their business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="cta" size="lg">
                Get Started Now
              </Button>
            </Link>
            <Link to="/why-partner">
              <Button variant="outline-corporate" size="lg" className="border-white text-white hover:bg-white hover:text-primary-dark">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;