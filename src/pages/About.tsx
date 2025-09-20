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
      <section className="gradient-section py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6 animate-fade-in">
                Pioneering DSA Excellence Since 2014
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
                Founded by banking veterans with over 300 years of collective experience, 
                MaxDSA Business Services has been at the forefront of retail loan distribution 
                innovation, driving growth and success for DSA partners across India.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Partner With Us
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="gradient-primary rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg opacity-90">
                  To redefine DSA excellence through AI-powered innovation, 
                  expertise, and unwavering commitment to our partners' success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              Our Journey in Numbers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milestones that reflect our commitment to excellence and the trust our partners place in us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center card-elegant bg-card rounded-lg p-6">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <milestone.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary-dark mb-2 animate-counter">
                  {milestone.value}
                </div>
                <div className="text-lg font-semibold text-card-foreground mb-2">
                  {milestone.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MaxDSA Business Services was born from a vision to transform the DSA landscape 
                  in India. Founded in 2014 by a team of banking veterans with over 300 years 
                  of collective experience, we recognized the need for a more efficient, 
                  technology-driven approach to loan distribution.
                </p>
                <p>
                  Starting as a small team with big dreams, we've grown into a trusted partner 
                  for over 250 DSA businesses across the country. Our journey from inception 
                  to crossing the ₹500+ Crore transaction milestone is a testament to our 
                  commitment to innovation and excellence.
                </p>
                <p>
                  Today, we continue to lead the industry with AI-powered tools, seamless 
                  automation, and a comprehensive support ecosystem that empowers our partners 
                  to achieve unprecedented growth and success.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold text-primary-dark mb-2">2014</h3>
                <p className="text-muted-foreground">Founded by banking veterans with a vision to revolutionize DSA services</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold text-primary-dark mb-2">2018</h3>
                <p className="text-muted-foreground">Launched AI-powered automation tools and reached 100+ partner milestone</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-xl font-semibold text-primary-dark mb-2">2024</h3>
                <p className="text-muted-foreground">Crossed ₹500+ Crore transactions with 250+ successful DSA partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and define our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-elegant bg-card rounded-lg p-6 hover-lift">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Be Part of Our Success Story?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join the MaxDSA family and experience the difference that expertise, 
            innovation, and dedicated support can make for your DSA business.
          </p>
          <Link to="/contact">
            <Button variant="cta" size="lg">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;