import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import maxdsaLogo from "@/assets/maxdsa-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoansMenuOpen, setIsLoansMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Why Partner With Us", href: "/why-partner" },
    { name: "Contact Us", href: "/contact" },
  ];

  const loanProducts = [
    { name: "Kirana Store Loans", href: "/loans/kirana-store" },
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
              {/* First 3 items: Home, Services, About Us */}
              {navigation.slice(0, 3).map((item) => (
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
              
              {/* Loans Dropdown Menu - positioned after About Us */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary bg-transparent">
                      Loans
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-48 p-2 bg-card">
                        {loanProducts.map((product) => (
                          <li key={product.name}>
                            <Link to={product.href}>
                              <NavigationMenuLink className="block px-4 py-2 text-sm hover:bg-secondary rounded-md transition-colors">
                                {product.name}
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Last 2 items: Why Partner With Us, Contact Us */}
              {navigation.slice(3).map((item) => (
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
              {/* First 3 items: Home, Services, About Us */}
              {navigation.slice(0, 3).map((item) => (
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
              
              {/* Mobile Loans Dropdown - positioned after About Us */}
              <div>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-colors duration-200"
                  onClick={() => setIsLoansMenuOpen(!isLoansMenuOpen)}
                >
                  Loans
                  <ChevronDown className={`h-4 w-4 transition-transform ${isLoansMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLoansMenuOpen && (
                  <div className="pl-4 space-y-1">
                    {loanProducts.map((product) => (
                      <Link
                        key={product.name}
                        to={product.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors duration-200"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsLoansMenuOpen(false);
                        }}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Last 2 items: Why Partner With Us, Contact Us */}
              {navigation.slice(3).map((item) => (
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