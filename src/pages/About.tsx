import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Award, Clock } from "lucide-react";

const About = () => {
  const milestones = [
    {
      icon: Users,
      value: "300+",
      label: "Years Collective Experience",
      description: "Banking veterans with deep industry knowledge"
    },
    {
      icon: TrendingUp,
      value: "₹500+",
      label: "Crore Transactions",
      description: "Successfully processed loan amount"
    },
    {
      icon: Award,
      value: "250+",
      label: "Happy Customers",
      description: "DSA partners growing with us"
    },
    {
      icon: Clock,
      value: "10+",
      label: "Years in Business",
      description: "Decade of retail loan distribution excellence"
    }
  ];

  const values = [
    {
      title: "Expertise",
      description: "Deep banking industry knowledge with 300+ years of collective leadership experience driving innovation in DSA services."
    },
    {
      title: "Innovation",
      description: "AI-powered tools and automation solutions that streamline processes and enhance efficiency for our DSA partners."
    },
    {
      title: "Trust",
      description: "Built on transparency, reliability, and strong partnerships with leading banks and financial institutions."
    },
    {
      title: "Growth",
      description: "Focused on empowering our partners with tools and support needed to scale their DSA business successfully."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Discover our journey and what drives us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Founded by banking experts, we create cutting-edge DSA solutions 
              tailored for businesses of all sizes.
            </p>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">Professional Team Image</p>
            </div>
          </div>
          
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">95%</div>
              <p className="text-sm text-muted-foreground">Customer satisfaction rate, reflecting our dedication</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">15+</div>
              <p className="text-sm text-muted-foreground">Banking partnerships providing diverse solutions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">₹500Cr</div>
              <p className="text-sm text-muted-foreground">Platform has ensured secure and efficient financial</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">250+</div>
              <p className="text-sm text-muted-foreground">DSAs nationwide, providing them with financial solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Professional Portrait</p>
              </div>
            </div>
            
            {/* Content */}
            <div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8/5 from our partners</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                We are passionate about empowering DSAs and businesses to take control of their growth and achieve their financial goals.
              </h2>
              
              <p className="text-muted-foreground mb-8">
                We are dedicated to revolutionizing the way DSAs and businesses manage their loan distribution. 
                Our team is committed to providing intuitive and innovative solutions that empower our partners to achieve financial success.
              </p>
              
              <Link to="/contact">
                <Button variant="cta" size="lg">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;