import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, Mail, Phone, MapPin, Building, User, FileText } from "lucide-react";
import { toast } from "sonner";

interface ContactOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'contact' | 'order';
}

export function ContactOrderModal({ isOpen, onClose, defaultTab = 'contact' }: ContactOrderModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    file: null as File | null
  });
  
  const [orderForm, setOrderForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    orderType: "",
    message: "",
    file: null as File | null
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Simulate API call to form service (Formspree/Getform)
      const formData = new FormData();
      formData.append('name', contactForm.name);
      formData.append('company', contactForm.company);
      formData.append('email', contactForm.email);
      formData.append('phone', contactForm.phone);
      formData.append('message', contactForm.message);
      if (contactForm.file) {
        formData.append('file', contactForm.file);
      }

      // Simulate successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setContactForm({ name: "", company: "", email: "", phone: "", message: "", file: null });
      // Keep modal open with success message
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderForm.name || !orderForm.email || !orderForm.orderType) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', orderForm.name);
      formData.append('company', orderForm.company);
      formData.append('email', orderForm.email);
      formData.append('phone', orderForm.phone);
      formData.append('address', orderForm.address);
      formData.append('orderType', orderForm.orderType);
      formData.append('message', orderForm.message);
      if (orderForm.file) {
        formData.append('file', orderForm.file);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Order request submitted! We'll contact you within 24 hours to schedule.");
      setOrderForm({ name: "", company: "", email: "", phone: "", address: "", orderType: "", message: "", file: null });
    } catch (error) {
      toast.error("Failed to submit order. Please try again.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, formType: 'contact' | 'order') => {
    const file = e.target.files?.[0];
    if (file) {
      if (formType === 'contact') {
        setContactForm({ ...contactForm, file });
      } else {
        setOrderForm({ ...orderForm, file });
      }
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Contact & Orders</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'contact' | 'order')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Us
            </TabsTrigger>
            <TabsTrigger value="order" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Place Order
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="mt-6">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name">Name *</Label>
                  <Input
                    id="contact-name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-company">Company</Label>
                  <Input
                    id="contact-company"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can we help you?"
                  required
                  className="min-h-24"
                />
              </div>

              <div>
                <Label htmlFor="contact-file">File Upload</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="contact-file"
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'contact')}
                    accept="image/*,.pdf,.doc,.docx"
                    className="h-12"
                  />
                  {contactForm.file && (
                    <span className="text-sm text-muted-foreground">
                      {contactForm.file.name}
                    </span>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="order" className="mt-6">
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="order-name">Name *</Label>
                  <Input
                    id="order-name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="order-company">Company</Label>
                  <Input
                    id="order-company"
                    value={orderForm.company}
                    onChange={(e) => setOrderForm({ ...orderForm, company: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="order-email">Email *</Label>
                  <Input
                    id="order-email"
                    type="email"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="order-phone">Phone</Label>
                  <Input
                    id="order-phone"
                    type="tel"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="order-address">Installation Address</Label>
                <Input
                  id="order-address"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  placeholder="Full installation address"
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="order-type">Order Type *</Label>
                <Select value={orderForm.orderType} onValueChange={(value) => setOrderForm({ ...orderForm, orderType: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home-backup">Home Backup Installation</SelectItem>
                    <SelectItem value="business-backup">Business Backup Installation</SelectItem>
                    <SelectItem value="oem-packs">OEM Battery Packs</SelectItem>
                    <SelectItem value="accessories">Accessories & Parts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="order-message">Additional Details</Label>
                <Textarea
                  id="order-message"
                  value={orderForm.message}
                  onChange={(e) => setOrderForm({ ...orderForm, message: e.target.value })}
                  placeholder="Backup duration requirements, specific needs, etc."
                  className="min-h-24"
                />
              </div>

              <div>
                <Label htmlFor="order-file">File Upload</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="order-file"
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'order')}
                    accept="image/*,.pdf,.doc,.docx"
                    className="h-12"
                  />
                  {orderForm.file && (
                    <span className="text-sm text-muted-foreground">
                      {orderForm.file.name}
                    </span>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Submit Order Request
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
