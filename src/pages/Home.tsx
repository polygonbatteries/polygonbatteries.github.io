import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Zap, Shield, Clock, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-battery-installation.jpg";
import residentialImage from "@/assets/residential-installation.jpg";
import commercialImage from "@/assets/commercial-installation.jpg";

const Home = () => {
  const navigate = useNavigate();

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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" alt="Polygon Batteries" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-foreground">Polygon Batteries</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="/battery-finder" className="text-muted-foreground hover:text-foreground transition-colors">Battery Finder</a>
              <a href="/oem-portal" className="text-muted-foreground hover:text-foreground transition-colors">OEM Portal</a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>
          </div>
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
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
            Professional Backup Power Solutions
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Never Lose Power
            <span className="text-primary block">When It Matters Most</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Professional battery backup installation services for homes and businesses. 
            LiFePO4 technology with certified electrician installation.
          </p>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group max-w-sm"
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

            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group max-w-sm"
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