import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Zap, Shield, Clock, Wrench, Search, Upload, Menu } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-battery-installation.jpg";
import residentialImage from "@/assets/residential-installation.jpg";
import commercialImage from "@/assets/commercial-installation.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Navigate to battery finder with the uploaded image
      navigate('/battery-finder');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/battery-finder?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Backup Power",
      description: "LiFePO4 batteries provide immediate, reliable backup power when you need it most.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Professional Installation",
      description: "Certified electricians ensure safe, code-compliant installations every time.",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Flexible Duration",
      description: "Choose from 30 minutes to custom backup durations based on your needs.",
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: "Complete Solution",
      description: "Batteries, inverters, installation, and warranty - everything included.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" alt="Polygon Batteries" className="w-12 h-12" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Polygon Batteries</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <a href="#services" className="block text-muted-foreground hover:text-foreground transition-colors py-2">Services</a>
              <a href="#contact" className="block text-muted-foreground hover:text-foreground transition-colors py-2">Contact</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 text-center">
          {/* Logo above hero text */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" 
              alt="Polygon Batteries" 
              className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4"
            />
          </div>
          
          {/* Battery Finder Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 border border-primary/30">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search for batteries (e.g., laptop battery, car battery)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 bg-background/80"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button variant="outline" className="border-primary/50 hover:bg-primary/10" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </span>
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Search by name or upload an image to find matching batteries
              </p>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Order Any Battery, Any Size, Any Shape
            <span className="text-primary block">Plus Installation</span>
            <span className="text-foreground block text-4xl md:text-5xl mt-2">Never Lose Power</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Professional battery backup installation services for homes and businesses. 
            LiFePO4 technology with certified electrician installation.
          </p>
          
          {/* Main CTA Buttons */}
          <div className="grid md:grid-cols-3 gap-6 justify-center items-start mb-16 max-w-6xl mx-auto">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate('/quote/home')}>
              <img 
                src={residentialImage} 
                alt="Residential Installation" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-foreground mb-4">Home Installation</h3>
              <p className="text-muted-foreground mb-6">
                Protect your family and home with reliable backup power systems.
              </p>
              <Button variant="hero" size="lg" className="w-full group-hover:scale-105 transition-transform">
                Get Home Quote <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Card>

            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate('/quote/business')}>
              <img 
                src={commercialImage} 
                alt="Commercial Installation" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-foreground mb-4">Business Installation</h3>
              <p className="text-muted-foreground mb-6">
                Keep your business running with commercial-grade backup power.
              </p>
              <Button variant="hero" size="lg" className="w-full group-hover:scale-105 transition-transform">
                Get Business Quote <Shield className="ml-2 h-5 w-5" />
              </Button>
            </Card>

            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate('/oem-portal')}>
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Wrench className="h-16 w-16 text-primary mx-auto mb-2" />
                  <p className="text-primary font-semibold">3D Design Tool</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">OEM Portal</h3>
              <p className="text-muted-foreground mb-6">
                Design custom batteries with our 3D tool for wholesale orders.
              </p>
              <Button variant="hero" size="lg" className="w-full group-hover:scale-105 transition-transform">
                Access Portal <Wrench className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose Polygon Batteries?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional installation, premium components, and reliable service for your backup power needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" alt="Polygon Batteries" className="w-6 h-6" />
                <h4 className="text-lg font-bold text-foreground">Polygon Batteries</h4>
              </div>
              <p className="text-muted-foreground">
                Professional backup power installation services for homes and businesses.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Services</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>Residential Installation</li>
                <li>Commercial Installation</li>
                <li>System Design</li>
                <li>Maintenance</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Contact</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>info@polygonbatteries.com</li>
                <li>1-800-POLYGON</li>
                <li>24/7 Emergency Service</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;