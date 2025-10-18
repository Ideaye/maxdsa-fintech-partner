import { useState, useEffect, useRef } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageSquare, Users, Building2 } from "lucide-react";
import handshakeIcon from "@/assets/icons/handshake-icon.png";
import growthIcon from "@/assets/growth-icon.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Contact = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{lng: number, lat: number}>({ lng: 77.6412, lat: 12.9141 }); // Default to Bengaluru
  const markers = useRef<mapboxgl.Marker[]>([]);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["partner@maxdsa.com"],
      description: "Send us your queries anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9042385395"],
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
      name: "Head Office - Bengaluru",
      address: "1st floor, Urban Vault, 19, 18th Cross Rd, Sector 6, HSR Layout, Bengaluru, Karnataka 560102",
      coordinates: { lng: 77.6412, lat: 12.9141 }
    },
    {
      name: "Coimbatore Office",
      address: "Old No 607, New Number 254, Dr RadhaKrishnan Road, Tata Bad, Coimbatore 641012",
      coordinates: { lng: 76.9558, lat: 11.0168 }
    },
    {
      name: "UAE Office", 
      address: "License no 41620, BLV -1F-SF15420, Ajman Boulevard- A- Building, Ajman Free Zone, UAE",
      coordinates: { lng: 55.5136, lat: 25.4052 }
    }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1haS1kZXYiLCJhIjoiY200MWttZjgzMDhiYjJscHRyaDVqNjRueiJ9.RD8RHJHzlLPFmxexKDQRpA';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [selectedLocation.lng, selectedLocation.lat],
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for all locations
    officeAddresses.forEach((office) => {
      const marker = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([office.coordinates.lng, office.coordinates.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3 class="font-semibold">${office.name}</h3><p class="text-sm">${office.address}</p>`))
        .addTo(map.current!);
      markers.current.push(marker);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.flyTo({
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 12,
        duration: 2000
      });
    }
  }, [selectedLocation]);

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

      {/* Get In Touch Section */}
      <section className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div>
              <div className="mb-8">
                <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">Contact Us</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Get In Touch
                </h2>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Name</label>
                  <Input 
                    placeholder="Your Name..." 
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Email</label>
                  <Input 
                    type="email"
                    placeholder="example@youremail.com" 
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Subject</label>
                  <Input 
                    placeholder="Hei..." 
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Type here..." 
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-gray-900 hover:bg-gray-100 font-medium"
                >
                  Send Now
                </Button>
              </form>
            </div>

            {/* Right Column - Contact Info and Map */}
            <div className="space-y-8">
              <p className="text-gray-400 leading-relaxed">
                In tempus mauris turpis, at ultricies dui eleifend a. Quisque et quam vel nunc consectetur pharetra euismod ac elit. Morbi nisl turpis, ullamcorper id purus eu, rhoncus consequat velit.
              </p>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-white font-medium mb-1">Phone Number</p>
                  <p className="text-gray-400 text-sm">+9762 4022 567</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-white font-medium mb-1">Email Address</p>
                  <p className="text-gray-400 text-sm">Example@Email.Com</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-white font-medium mb-1">Whatsapp</p>
                  <p className="text-gray-400 text-sm">082 245 7250</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-white font-medium mb-1">Our Office</p>
                  <p className="text-gray-400 text-sm">2448 Oak Ridge Omaha, QA 45065</p>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden h-[300px]">
                <div ref={mapContainer} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-primary to-fintech-blue rounded-3xl p-20 overflow-hidden">
            {/* Growth Icon */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
              <img 
                src={growthIcon} 
                alt="Business growth" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain"
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to become a <br />MaxDSA Partner?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl">
                Join our network of successful DSA partners <br />and unlock new opportunities for growth. <br />Let's build a profitable partnership together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/partner-signup">Apply for Partnership</Link>
                </Button>
                <Button asChild size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary">
                  <Link to="/why-partner">Learn More</Link>
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

export default Contact;