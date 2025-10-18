import { useState, useEffect, useRef } from "react";
import OffersBanner from "@/components/shared/OffersBanner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import handshakeIcon from "@/assets/icons/handshake-icon.png";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";
import "ol/ol.css";

const Contact = () => {
  const [selectedLocation, setSelectedLocation] = useState<{lng: number, lat: number}>({ lng: 77.6412, lat: 12.9141 });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

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
    if (!mapRef.current) return;

    // Initialize map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([selectedLocation.lng, selectedLocation.lat]),
        zoom: 13,
      }),
    });

    // Add markers for all offices
    const markers = officeAddresses.map(office => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([office.coordinates.lng, office.coordinates.lat])),
        name: office.name,
      });

      marker.setStyle(new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23e94560"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>',
          scale: 1,
        }),
      }));

      return marker;
    });

    const vectorSource = new VectorSource({
      features: markers,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);
    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.getView().animate({
        center: fromLonLat([selectedLocation.lng, selectedLocation.lat]),
        zoom: 13,
        duration: 1000,
      });
    }
  }, [selectedLocation]);

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
            <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
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