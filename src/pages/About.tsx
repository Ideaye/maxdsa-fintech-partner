import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Award, Clock, Target, Lightbulb, Shield, Rocket } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";

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
              
              <Link to="/partner-signup">
                <Button variant="cta" size="lg">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <Badge variant="secondary" className="mb-4">OUR VALUES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Our Approach to DSA Excellence
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Strategic Focus</h3>
                    <p className="text-muted-foreground">
                      Targeted approach to maximize loan conversions and partner success
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Innovation First</h3>
                    <p className="text-muted-foreground">
                      AI-powered solutions that streamline processes and boost efficiency
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Trust & Security</h3>
                    <p className="text-muted-foreground">
                      Secure platform with transparent processes and reliable support
                    </p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="mt-8">
                Learn More About Our Process
              </Button>
            </div>
            
            {/* Right Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl">
                <Badge variant="outline" className="mb-3 text-xs">GETTING RESULTS EFFORTLESSLY</Badge>
                <h3 className="font-bold text-foreground mb-2">Bold Moves, Big Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Strategic decisions that drive measurable growth for our DSA partners
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl">
                <Badge variant="outline" className="mb-3 text-xs">HOW WE WORK WITH STAKEHOLDERS</Badge>
                <h3 className="font-bold text-foreground mb-2">Honesty is the Best Policy</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent communication and ethical practices in every partnership
                </p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-xl">
                <Badge variant="outline" className="mb-3 text-xs">COLLABORATION IS KEY</Badge>
                <h3 className="font-bold text-foreground mb-2">Building Strong Partnerships</h3>
                <p className="text-sm text-muted-foreground">
                  Working together to achieve mutual success and sustainable growth
                </p>
              </div>
              
              <div className="bg-secondary/20 p-6 rounded-xl">
                <Badge variant="outline" className="mb-3 text-xs">OUR PHILOSOPHY</Badge>
                <h3 className="font-bold text-foreground mb-2">Building Trust, Not Pitching</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on long-term relationships over short-term transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Empowering DSA Success Through Digital Innovation: Our Mission at MaxDSA
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <p className="text-muted-foreground mb-4">
                At MaxDSA, we believe in empowering Direct Selling Agents with cutting-edge technology 
                and comprehensive support systems. Our platform bridges the gap between traditional 
                banking and modern digital solutions.
              </p>
              <p className="text-muted-foreground">
                We understand the challenges faced by DSAs in today's competitive market. That's why 
                we've developed AI-powered tools that simplify loan processing, enhance customer 
                relationships, and maximize conversion rates.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-4">
                Our team brings together decades of banking expertise with innovative technology solutions. 
                We're committed to providing not just a platform, but a partnership that grows with your business.
              </p>
              <p className="text-muted-foreground">
                Every feature we build, every process we streamline, and every partnership we forge 
                is designed with one goal in mind: your success as a DSA partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <Badge variant="secondary" className="mb-4">OUR TEAM</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Team of Experts
              </h2>
              <p className="text-muted-foreground mb-8">
                Want to shape the future of DSA services? Our experienced team combines deep banking 
                knowledge with innovative technology to deliver exceptional results for our partners.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Banking Industry Veterans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Technology Innovation Leaders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Customer Success Specialists</span>
                </div>
              </div>
              
              <Button variant="cta">
                Join Our Team
              </Button>
            </div>
            
            {/* Right Content - Team Photo */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <img 
                  src={teamPhoto} 
                  alt="MaxDSA Leadership Team" 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <div className="text-center">
                  <h3 className="font-bold text-foreground mb-2">Leadership Team</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    300+ years of combined banking and fintech experience
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">MaxDSA Partners</h3>
          </div>
          
          <blockquote className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            "We couldn't be happier with the DSA platform and support provided by MaxDSA."
          </blockquote>
          
          <p className="text-muted-foreground">
            Our partners consistently report increased conversion rates, streamlined processes, 
            and enhanced customer satisfaction through our comprehensive DSA solutions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;