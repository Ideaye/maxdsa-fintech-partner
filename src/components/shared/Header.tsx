import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, X, Download } from "lucide-react";
import maxdsaLogo from "@/assets/maxdsa-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Why Partner With Us", href: "/why-partner" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src={maxdsaLogo} 
                alt="MaxDSA Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Downloads & Sign In Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/downloads">
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary hover:text-white">
                <Download className="h-5 w-5" />
              </Button>
            </Link>
            
            <a href="https://bridge.hyperfin.tech/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                Sign In
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 pt-4 space-y-3 border-t border-border">
                <Link to="/downloads" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-primary hover:text-white">
                    <Download className="h-5 w-5 mr-2" />
                    Downloads
                  </Button>
                </Link>
                
                <Separator className="my-2" />
                
                <a href="https://bridge.hyperfin.tech/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    Sign In
                  </Button>
                </a>

                <Link to="/partner-signup" onClick={() => setIsMenuOpen(false)} className="block pt-2">
                  <Button variant="corporate" size="sm" className="w-full">
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;