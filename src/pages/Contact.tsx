import { useState, useEffect, useRef } from "react";
import OffersBanner from "@/components/shared/OffersBanner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageSquare, Users, Building2 } from "lucide-react";
import handshakeIcon from "@/assets/icons/handshake-icon.png";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Contact = () => {
  const [selectedLocation, setSelectedLocation] = useState<{lng: number, lat: number}>({ lng: 77.6412, lat: 12.9141 }); // Default to Bengaluru
  const mapRef = useRef<L.Map | null>(null);

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
    if (mapRef.current) {
      mapRef.current.flyTo([selectedLocation.lat, selectedLocation.lng], 12, {
        duration: 2
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
      <OffersBanner />
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

      {/* Office Locations Section with Map */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              Visit Our Offices
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Located in key business districts, our offices are easily accessible. Click on any location to view it on the map.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Interactive Location Cards */}
            {officeAddresses.map((office, index) => (
              <div 
                key={index}
                onClick={() => setSelectedLocation(office.coordinates)}
                className="card-elegant bg-card rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{office.name}</h3>
                    <p className="text-muted-foreground mb-3">{office.address}</p>
                    {index === 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 text-primary mr-2" />
                          <p className="text-card-foreground">+91 9042385395</p>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 text-primary mr-2" />
                          <p className="text-card-foreground">partner@maxdsa.com</p>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-primary mt-3 font-medium">Click to view on map →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Container */}
          <div className="card-elegant bg-card rounded-2xl overflow-hidden">
            <MapContainer center={[selectedLocation.lat, selectedLocation.lng]} zoom={12} className="w-full h-[500px]" ref={mapRef}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {officeAddresses.map((office, index) => (
                <Marker key={index} position={[office.coordinates.lat, office.coordinates.lng]}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{office.name}</h3>
                      <p className="text-sm">{office.address}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Partnership CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-primary to-fintech-blue rounded-3xl p-20 overflow-hidden">
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