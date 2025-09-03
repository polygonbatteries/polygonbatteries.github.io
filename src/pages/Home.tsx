import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Battery, Shield, Clock, Wrench, Menu, BatteryCharging } from "lucide-react";
import { useState } from "react";
import { BatterySearchBar } from "@/components/BatterySearchBar";
import heroImage from "@/assets/hero-battery-installation.jpg";
import residentialImage from "@/assets/residential-installation.jpg";
import commercialImage from "@/assets/commercial-installation.jpg";
import dashboardImage from "@/assets/battery-cloud-dashboard.png";

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
      icon: <Battery className="h-8 w-8 text-primary" />,
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
              <img src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" alt="Polygon Batteries" className="w-48 h-auto" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Polygon Batteries</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#order-options" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <Button variant="outline" onClick={() => navigate('/battery-finder')}>
                Battery Finder
              </Button>
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
              <Button variant="outline" onClick={() => navigate('/battery-finder')} className="w-full">
                Battery Finder
              </Button>
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
              className="w-64 h-64 md:w-80 md:h-80 mx-auto mb-4"
            />
          </div>
          
          {/* Battery Finder Search Bar */}
          <BatterySearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            onImageUpload={handleImageUpload}
          />
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
          <div id="order-options" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-start mb-16 max-w-7xl mx-auto">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group h-full flex flex-col"
                  onClick={() => navigate('/order/home')}>
              <img 
                src={residentialImage} 
                alt="Residential Installation" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-foreground mb-4">Home Installation</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Protect your family and home with reliable backup power systems.
              </p>
              <Button variant="hero" size="lg" className="w-full group-hover:scale-105 transition-transform">
                Order Home Installation <Battery className="ml-2 h-5 w-5" />
              </Button>
            </Card>

            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group h-full flex flex-col"
                  onClick={() => navigate('/order/business')}>
              <img 
                src={commercialImage} 
                alt="Commercial Installation" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-foreground mb-4">Business Installation</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Keep your business running with commercial-grade backup power.
              </p>
              <Button variant="hero" size="lg" className="w-full group-hover:scale-105 transition-transform">
                Order Business Installation <Shield className="ml-2 h-5 w-5" />
              </Button>
            </Card>

            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group h-full flex flex-col"
                  onClick={() => navigate('/oem-portal')}>
              <img 
                src="/lovable-uploads/736a564e-d9c1-438d-a51a-b38598c2e7f1.png" 
                alt="Battery Collection" 
                className="w-full h-48 object-contain rounded-lg mb-6 bg-gradient-to-br from-primary/10 to-primary/20 p-4"
              />
              <h3 className="text-2xl font-bold text-foreground mb-4">OEM Orders</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Design custom batteries with our 3D tool for wholesale orders.
              </p>
              <Button variant="hero" size="lg" className="w-full group-hover:scale-105 transition-transform">
                Access Portal <Wrench className="ml-2 h-5 w-5" />
              </Button>
            </Card>

            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group h-full flex flex-col">
              <img 
                src="/lovable-uploads/cf318afd-38d2-4336-b796-5d6acdd72e15.png" 
                alt="Battery Cloud Monitoring" 
                className="w-full h-48 object-contain rounded-lg mb-6 bg-gradient-to-br from-blue-50 to-gray-50 p-2"
              />
              <h3 className="text-2xl font-bold text-foreground mb-4">Polygon Batteries Cloud</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Track every battery through BMS or QR codes. Monitor performance and get replacement alerts for all your devices.
              </p>
              <Button variant="hero" size="lg" className="w-full group-hover:scale-105 transition-transform">
                View Dashboard <BatteryCharging className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Polygon Batteries?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional installation, premium components, and reliable service for your backup power needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-white border-gray-200 hover:border-primary/50 transition-all duration-300 shadow-sm">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Manufacturing Excellence</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art lithium polymer battery production facilities and processes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/dc90c0d6-f599-4c68-9469-d51774bac39b.png" 
                alt="Lithium Polymer Line Machinery Cost" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Production Line Investment</h4>
              <p className="text-gray-600 text-sm">Complete equipment production line for manufacturing batteries from scratch</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/32d400fa-cd79-4ae1-b5d8-959d4f987f74.png" 
                alt="Solar and RF Integrated Batteries" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Solar Integration</h4>
              <p className="text-gray-600 text-sm">Advanced RF energy harvesting technology with solar integration</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/de3975bc-b162-4cee-8de2-2d2ba7c921ee.png" 
                alt="Production Outputs" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Custom Outputs</h4>
              <p className="text-gray-600 text-sm">Different sizes, shapes and capacity for specific OEM applications</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/abadfbd4-3928-44f6-bd51-ee541ad0293c.png" 
                alt="Mitsubishi Solutions Layout" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Production Layout</h4>
              <p className="text-gray-600 text-sm">Mitsubishi solutions for lithium battery manufacturing division</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/b781b11d-608e-4f40-8b38-14537ad4523c.png" 
                alt="Automatic Pouch Cell Production" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Automated Production</h4>
              <p className="text-gray-600 text-sm">Automatic pouch cell production line with quality control</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/df3fbd9a-e73d-4417-8dad-6c93583b89b6.png" 
                alt="Production Flow Diagram" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Production Process</h4>
              <p className="text-gray-600 text-sm">Complete electrode preparation and assembly workflow</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/22debe8c-46de-4daa-bbf0-86d5400fff18.png" 
                alt="Formation and Sealing" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Formation & Sealing</h4>
              <p className="text-gray-600 text-sm">Advanced battery case formation and sealing processes</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/ffc7cfbc-938c-4ed0-9382-7f8f12645a2b.png" 
                alt="Cell Assembly Process" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Cell Assembly</h4>
              <p className="text-gray-600 text-sm">Li-ion cell assembly using stacking and winding methods</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="/lovable-uploads/945ee79d-d87e-436c-93f2-df5f7c70f13c.png" 
                alt="Electrode Sheet Preparation" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Electrode Preparation</h4>
              <p className="text-gray-600 text-sm">Precision electrode sheet preparation and processing</p>
            </Card>
            
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <img 
                src="/lovable-uploads/ce4a6b7d-e18a-41a1-97cf-245a6bb13a8e.png" 
                alt="South Africa Manufacturing Plant" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">South Africa Plant</h4>
              <p className="text-gray-600 text-sm">Main manufacturing facility producing custom OEM batteries</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <footer id="contact" className="bg-card border-t border-border py-12">
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