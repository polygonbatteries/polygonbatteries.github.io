import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" alt="Polygon Batteries" className="w-48 h-auto" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Contact Us</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to power your home or business with reliable backup batteries? 
              Contact our team for a free consultation and quote.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Email</h4>
                    <p className="text-muted-foreground">info@polygonbatteries.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                    <p className="text-muted-foreground">1-800-POLYGON</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Emergency Service</h4>
                    <p className="text-muted-foreground">24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Service Areas</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Residential Installation</li>
                  <li>• Commercial Installation</li>
                  <li>• System Design & Consultation</li>
                  <li>• Maintenance & Support</li>
                  <li>• Emergency Repairs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">Response Time</h3>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 24 hours. 
                  For emergency services, we provide immediate response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;