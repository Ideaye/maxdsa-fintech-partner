import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageSquare, Users, Building2 } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@maxdsa.com", "support@maxdsa.com"],
      description: "Send us your queries anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9876543210", "+91 8765432109"],
      description: "Speak directly with our team"
    },
    {
      icon: Building2,
      title: "Company Details",
      details: ["CIN: U82990TZ2025PTC035993", "PAN: AATCM8615M", "TAN: CMBM12055B"],
      description: "Our official registration details"
    }
  ];

  const officeAddresses = [
    {
      name: "Coimbatore Office",
      address: "Old No 607, New Number 254, Dr RadhaKrishnan Road, Tata Bad, Coimbatore 641012"
    },
    {
      name: "UAE Office", 
      address: "License no 41620, BLV -1F-SF15420, Ajman Boulevard- A- Building, Ajman Free Zone, UAE"
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "General Inquiry",
      description: "Questions about our services or partnership opportunities",
      action: "Send Message"
    },
    {
      icon: Users,
      title: "Partnership Request",
      description: "Ready to become a MaxDSA partner? Let's discuss!",
      action: "Request Partnership"
    },
    {
      icon: Phone,
      title: "Technical Support", 
      description: "Need help with our platform or experiencing issues?",
      action: "Get Support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-section py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up">
            Ready to transform your DSA business? We're here to help you every step of the way. 
            Reach out to us and let's discuss how MaxDSA can accelerate your growth.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="card-elegant bg-card rounded-lg p-6 text-center hover-lift">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{info.title}</h3>
                <div className="space-y-1 mb-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-primary font-medium text-sm">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              How Can We Help You?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the type of support you need, and we'll connect you with the right team member.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div key={index} className="card-elegant bg-card rounded-lg p-6 text-center hover-lift">
                <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{option.title}</h3>
                <p className="text-muted-foreground mb-6">{option.description}</p>
                <Button variant="corporate" size="sm" className="w-full">
                  {option.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              Send Us a Message
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>
          
          <div className="card-elegant bg-card rounded-2xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your business name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Subject *
                </label>
                <select className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
                  <option value="">Select a subject</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="services">Services Information</option>
                  <option value="support">Technical Support</option>
                  <option value="general">General Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Message *
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  className="h-4 w-4 text-primary border-input rounded focus:ring-primary"
                />
                <label htmlFor="privacy" className="ml-2 text-sm text-muted-foreground">
                  I agree to the privacy policy and terms of service
                </label>
              </div>
              
              <div className="text-center">
                <Button variant="hero" size="lg" className="w-full md:w-auto px-12">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              Visit Our Offices
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of business district, our office is easily accessible and we welcome you to visit us for in-person consultations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Head Office */}
            <div className="card-elegant bg-card rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  Head Office
                </h3>
                <p className="text-sm text-primary font-medium">MaxDSA Business Services Pvt. Ltd.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-card-foreground">1st floor, Urban Vault</p>
                    <p className="text-muted-foreground">19, 18th Cross Rd, Sector 6</p>
                    <p className="text-muted-foreground">HSR Layout, Bengaluru, Karnataka 560102</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <p className="text-card-foreground">+91 9876543210</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <p className="text-card-foreground">info@maxdsa.com</p>
                </div>
              </div>
            </div>

            {/* Branch Offices */}
            <div className="card-elegant bg-card rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  Branch Offices
                </h3>
                <p className="text-sm text-muted-foreground">Our other office locations</p>
              </div>
              
              <div className="space-y-6">
                {officeAddresses.map((office, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-medium text-card-foreground">{office.name}</p>
                        <p className="text-muted-foreground">{office.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;