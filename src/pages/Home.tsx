import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Battery, Shield, Clock, Wrench, Menu, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ContactOrderModal } from "@/components/ContactOrderModal";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import heroImage from "@/assets/hero-battery-installation.jpg";
import residentialImage from "@/assets/residential-installation.jpg";
import commercialImage from "@/assets/commercial-installation.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'contact' | 'order'>('contact');

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    // Navigate to battery finder with the uploaded image
    navigate('/battery-finder');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/battery-finder?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: <Battery className="h-8 w-8 text-brand-600" />,
      title: "Instant Backup Power",
      description: "LiFePO4 batteries provide immediate, reliable backup power when you need it most.",
    },
    {
      icon: <Shield className="h-8 w-8 text-brand-600" />,
      title: "Professional Installation",
      description: "Certified electricians ensure safe, code-compliant installations every time.",
    },
    {
      icon: <Clock className="h-8 w-8 text-brand-600" />,
      title: "Flexible Duration",
      description: "Choose from 30 minutes to custom backup durations based on your needs.",
    },
    {
      icon: <Wrench className="h-8 w-8 text-brand-600" />,
      title: "Complete Solution",
      description: "Batteries, inverters, installation, and warranty - everything included.",
    },
  ];

  const openModal = (tab: 'contact' | 'order') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const galleryImages = [
    {
      src: "/lovable-uploads/dc90c0d6-f599-4c68-9469-d51774bac39b.png",
      alt: "Manufacturing cost analysis",
      title: "Production Line Investment",
      description: "Complete equipment production line for manufacturing batteries from scratch"
    },
    {
      src: "/lovable-uploads/32d400fa-cd79-4ae1-b5d8-959d4f987f74.png",
      alt: "Solar integration technology",
      title: "Solar Integration",
      description: "Advanced RF energy harvesting technology with solar integration"
    },
    {
      src: "/lovable-uploads/de3975bc-b162-4cee-8de2-2d2ba7c921ee.png",
      alt: "Custom battery outputs",
      title: "Custom Outputs",
      description: "Different sizes, shapes and capacity for specific OEM applications"
    },
    {
      src: "/lovable-uploads/abadfbd4-3928-44f6-bd51-ee541ad0293c.png",
      alt: "Production facility layout",
      title: "Production Layout",
      description: "Professional facility layout for lithium battery manufacturing division"
    },
    {
      src: "/lovable-uploads/b781b11d-608e-4f40-8b38-14537ad4523c.png",
      alt: "Automated production line",
      title: "Automated Production",
      description: "Automatic pouch cell production line with quality control"
    },
    {
      src: "/lovable-uploads/df3fbd9a-e73d-4417-8dad-6c93583b89b6.png",
      alt: "Production workflow",
      title: "Production Process",
      description: "Complete electrode preparation and assembly workflow"
    },
    {
      src: "/lovable-uploads/22debe8c-46de-4daa-bbf0-86d5400fff18.png",
      alt: "Formation and sealing process",
      title: "Formation & Sealing",
      description: "Advanced battery case formation and sealing processes"
    },
    {
      src: "/lovable-uploads/ffc7cfbc-938c-4ed0-9382-7f8f12645a2b.png",
      alt: "Cell assembly methods",
      title: "Cell Assembly",
      description: "Li-ion cell assembly using stacking and winding methods"
    },
    {
      src: "/lovable-uploads/945ee79d-d87e-436c-93f2-df5f7c70f13c.png",
      alt: "Electrode preparation",
      title: "Electrode Preparation",
      description: "Precision electrode sheet preparation and processing"
    },
    {
      src: "/lovable-uploads/ce4a6b7d-e18a-41a1-97cf-245a6bb13a8e.png",
      alt: "South Africa facility",
      title: "South Africa Plant",
      description: "Main manufacturing facility producing custom OEM batteries"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/60 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" 
                alt="Polygon Batteries" 
                className="h-10 w-auto object-contain" 
                width="40" 
                height="40"
                decoding="async"
              />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Polygon Batteries</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/#hero" className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 rounded">Home</a>
              <a href="/#order-options" className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 rounded">Services</a>
              <a href="/oem-portal" className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 rounded">OEM Tool</a>
              <a href="/#gallery" className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600 rounded">Gallery</a>
              <Button
                variant="ghost"
                onClick={() => openModal('contact')}
                className="text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-brand-600"
              >
                Contact
              </Button>
              <Button 
                onClick={() => openModal('order')}
                className="bg-brand-600 hover:bg-brand-700 text-white focus:ring-2 focus:ring-brand-600"
              >
                Order
              </Button>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden focus:ring-2 focus:ring-brand-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
              <a href="/#hero" className="block text-gray-600 hover:text-gray-900 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-brand-600 rounded">Home</a>
              <a href="/#order-options" className="block text-gray-600 hover:text-gray-900 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-brand-600 rounded">Services</a>
              <a href="/oem-portal" className="block text-gray-600 hover:text-gray-900 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-brand-600 rounded">OEM Tool</a>
              <a href="/#gallery" className="block text-gray-600 hover:text-gray-900 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-brand-600 rounded">Gallery</a>
              <Button
                variant="ghost"
                onClick={() => openModal('contact')}
                className="justify-start text-gray-600 hover:text-gray-900 w-full p-2 focus:ring-2 focus:ring-brand-600"
              >
                Contact
              </Button>
              <Button 
                onClick={() => openModal('order')}
                className="bg-brand-600 hover:bg-brand-700 text-white w-full mt-2 focus:ring-2 focus:ring-brand-600"
              >
                Order
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 text-center">
          {/* Logo above hero text */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" 
              alt="Polygon Batteries Logo" 
              className="max-w-80 h-auto mx-auto mb-4 object-contain"
              style={{ maxWidth: 'min(560px, 80vw)' }}
              width="560"
              height="560"
              decoding="async"
            />
          </div>
          
          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            onImageUpload={handleImageUpload}
            className="mb-12"
          />
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Order Any Battery, Any Size, Any Shape
            <span className="text-gray-800 block">Plus Installation</span>
            <span className="text-gray-900 block text-4xl md:text-5xl mt-2">Never Lose Power</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Professional battery backup installation services for homes and businesses. 
            LiFePO4 technology with certified electrician installation.
          </p>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => openModal('order')}
              size="lg" 
              className="bg-brand-600 text-white hover:bg-brand-700 text-lg px-8 py-4 h-auto focus:ring-2 focus:ring-brand-600"
            >
              Start an Order
            </Button>
            <Button 
              onClick={() => openModal('contact')}
              variant="outline" 
              size="lg" 
              className="border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white text-lg px-8 py-4 h-auto focus:ring-2 focus:ring-brand-600"
            >
              Contact Us
            </Button>
          </div>
          
        </div>
      </section>

      {/* Services and Order Options */}
      <section id="order-options" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional installation, premium components, and reliable service for your backup power needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => openModal('order')}>
              <img 
                src={residentialImage} 
                alt="Home backup system" 
                className="w-full h-32 object-cover rounded-lg mb-4"
                loading="lazy"
                decoding="async"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Home Backup</h4>
              <p className="text-gray-600 text-sm mb-4">Protect your family with reliable backup power systems.</p>
              <Button 
                onClick={(e) => { e.stopPropagation(); openModal('order'); }}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white"
              >
                Start Order
              </Button>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => openModal('order')}>
              <img 
                src={commercialImage} 
                alt="Business backup system" 
                className="w-full h-32 object-cover rounded-lg mb-4"
                loading="lazy"
                decoding="async"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Business Backup</h4>
              <p className="text-gray-600 text-sm mb-4">Keep your business running with commercial-grade power.</p>
              <Button 
                onClick={(e) => { e.stopPropagation(); openModal('order'); }}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white"
              >
                Start Order
              </Button>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate('/oem-portal')}>
              <img 
                src="/lovable-uploads/736a564e-d9c1-438d-a51a-b38598c2e7f1.png" 
                alt="OEM battery packs" 
                className="w-full h-32 object-contain rounded-lg mb-4 bg-gray-50 p-2"
                loading="lazy"
                decoding="async"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">OEM Packs</h4>
              <p className="text-gray-600 text-sm mb-4">Custom battery solutions for manufacturers and developers.</p>
              <Button 
                onClick={(e) => { e.stopPropagation(); navigate('/oem-portal'); }}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white"
              >
                Start Order
              </Button>
            </Card>

            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => openModal('order')}>
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <Wrench className="w-12 h-12 text-brand-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Accessories</h4>
              <p className="text-gray-600 text-sm mb-4">Inverters, chargers, and monitoring equipment.</p>
              <Button 
                onClick={(e) => { e.stopPropagation(); openModal('order'); }}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white"
              >
                Start Order
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Polygon Batteries?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional installation, premium components, and reliable service for your backup power needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-white border border-gray-200 hover:border-brand-600/50 hover:shadow-lg transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Production Line Tile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center bg-white border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Production Line</h3>
            <p className="text-gray-600 mb-6">
              Plan covers cell prep welding test and pack assembly. 
              Bill of equipment available on request.
            </p>
            <Button 
              onClick={() => openModal('contact')}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Request the List
            </Button>
          </Card>
        </div>
      </section>

      {/* Manufacturing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Manufacturing</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lithium polymer and lithium iron phosphate cells and packs are assembled.
              Welding testing and shipping are provided.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <GalleryLightbox 
        images={galleryImages}
        title="Manufacturing Gallery"
        description="Our complete battery production process from electrode preparation to final assembly"
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" 
                  alt="Polygon Batteries" 
                  className="w-8 h-8"
                  width="32"
                  height="32"
                />
                <h4 className="text-lg font-bold">Polygon Batteries</h4>
              </div>
              <p className="text-gray-300 mb-6">
                Professional backup power installation services for homes and businesses.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">info@polygonbatteries.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+27 (0) 21 555 0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Cape Town, South Africa</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/#order-options" className="hover:text-white transition-colors">Home Backup</a></li>
                <li><a href="/#order-options" className="hover:text-white transition-colors">Business Backup</a></li>
                <li><a href="/oem-portal" className="hover:text-white transition-colors">OEM Solutions</a></li>
                <li><a href="/#order-options" className="hover:text-white transition-colors">Installation</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/#gallery" className="hover:text-white transition-colors">Manufacturing</a></li>
                <li><button onClick={() => openModal('contact')} className="hover:text-white transition-colors text-left">Contact Us</button></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-300">
                <li><span className="text-sm">24/7 Emergency Service</span></li>
                <li><span className="text-sm">Technical Support</span></li>
                <li><span className="text-sm">Warranty Claims</span></li>
                <li><button onClick={() => openModal('contact')} className="hover:text-white transition-colors text-left text-sm">Get Help</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Polygon Batteries. All rights reserved. | Assembly in South Africa
            </p>
          </div>
        </div>
      </footer>

      {/* Contact/Order Modal */}
      <ContactOrderModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
      />
    </div>
  );
};

export default Home;