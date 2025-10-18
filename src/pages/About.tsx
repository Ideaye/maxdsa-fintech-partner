import OffersBanner from "@/components/shared/OffersBanner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Award, Clock, Target, Lightbulb, Shield, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import teamPhoto from "@/assets/team-photo.jpg";
import partnershipImage from "@/assets/partnership-handshake.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import promoterPhoto from "@/assets/promoter-photo.jpg";
import padmanabhanPhoto from "@/assets/padmanabhan-photo.jpg";

const About = () => {
  const [currentPartner, setCurrentPartner] = useState(0);

  const partners = [
    {
      name: "Arun Kumar Manickam",
      image: promoterPhoto,
      content: [
        "Arun Kumar Manickam is a visionary banking leader and the driving force behind MaxDSA.com, a pioneering platform designed to create India's largest knowledge-sharing and networking ecosystem for professionals in banking, NBFC, and fintech sectors.",
        "With over 20 years of rich experience across premier financial institutions—including State Bank of India, IDBI Bank, ICICI Bank, and Cholamandalam DBS—Arun brings a unique blend of strategic insight and hands-on operational expertise to his initiatives.",
        "He holds a Master's degree in Management from the Bharathiar School of Management and Entrepreneur Development (BSMED), Coimbatore, and has further strengthened his leadership acumen through executive programs at the Indian Institute of Management, Ahmedabad (IIM-A).",
        "With more than 10 years' experience in retail loan distribution business, we have successfully acquired more than 250 Customers with about 500 Cr of Successful transactions."
      ]
    },
    {
      name: "R Padmanabhan (M.C.A)",
      titles: [
        "Managing Director - Yuva 2.0 School of Human Excellence",
        "C.E.O - International strategic consultants",
        "Director - Yuva Foundation"
      ],
      image: padmanabhanPhoto,
      content: [
        "R Padmanabhan is a distinguished social activist and educational entrepreneur with a deep commitment to empowering communities through education and social reform. His multifaceted career spans across educational leadership, strategic consultancy, and philanthropic endeavors.",
        "As the Managing Director of Yuva 2.0 School of Human Excellence, he has pioneered innovative approaches to holistic education that focus on developing well-rounded individuals equipped for the challenges of the modern world. His vision extends beyond traditional academics to encompass character development and life skills.",
        "Through his role as CEO of International Strategic Consultants, he provides strategic guidance to organizations seeking sustainable growth and social impact. His expertise in organizational development and community engagement has helped numerous institutions achieve their mission-driven goals.",
        "As Director of Yuva Foundation, he leads various initiatives focused on youth empowerment, education access, and community development. His work has touched countless lives, creating opportunities for underprivileged sections of society and fostering a culture of giving back to the community."
      ]
    }
  ];

  const nextPartner = () => {
    setCurrentPartner((prev) => (prev + 1) % partners.length);
  };

  const prevPartner = () => {
    setCurrentPartner((prev) => (prev - 1 + partners.length) % partners.length);
  };

  const milestones = [
    {
      icon: Users,
      value: "Many",
      label: "Years of Banking Excellence",
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
      description: "Deep banking industry knowledge with many years of collective leadership experience driving innovation in DSA services."
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
      <OffersBanner />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Discover our journey and what drives us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Founded by banking experts, we create cutting-edge DSA solutions 
              tailored for businesses of all sizes.
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="rounded-2xl h-[500px] overflow-hidden shadow-xl mb-12">
            <img 
              src={aboutHero} 
              alt="MaxDSA team discussing financial solutions in boardroom meeting" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
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
            <div className="rounded-2xl h-96 overflow-hidden bg-gray-900">
              <img 
                src={partnershipImage} 
                alt="Partnership and collaboration in digital banking" 
                className="w-full h-full object-cover"
              />
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

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">125</div>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">175</div>
              <p className="text-sm text-muted-foreground">Disbursements</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">12</div>
              <p className="text-sm text-muted-foreground">Financier Tieups</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">15</div>
              <p className="text-sm text-muted-foreground">Years of experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Profiles Slider Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Visionary Leadership
            </h2>
          </div>
          
          <div className="relative">
            <div key={currentPartner} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {partners[currentPartner].name}
                </h3>
                
                {partners[currentPartner].titles && (
                  <div className="mb-6 space-y-1">
                    {partners[currentPartner].titles.map((title, idx) => (
                      <p key={idx} className="text-sm font-medium text-primary">
                        {title}
                      </p>
                    ))}
                  </div>
                )}
                
                <div className="space-y-4 text-muted-foreground overflow-hidden">
                  {partners[currentPartner].content.map((paragraph, idx) => (
                    <p key={idx} className="line-clamp-6">
                      {idx === 0 && !partners[currentPartner].titles ? (
                        <>
                          <strong className="text-foreground">{partners[currentPartner].name.split(' (')[0]}</strong>
                          {paragraph.substring(partners[currentPartner].name.split(' (')[0].length)}
                        </>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative max-w-sm mx-auto lg:mx-0">
                  <img 
                    src={partners[currentPartner].image} 
                    alt={partners[currentPartner].name} 
                    className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[500px]"
                  />
                </div>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPartner}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {partners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPartner(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentPartner 
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to partner ${idx + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextPartner}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-white">
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
      <section className="py-20 bg-gray-50">
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

      {/* Testimonial */}
      <section className="py-20 bg-gray-50">
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