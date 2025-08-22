import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Box, Calculator, Download, FileText, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { ShapeSelector } from "@/components/ShapeSelector";
import { BatteryCalculator } from "@/components/BatteryCalculator";
import { BatteryShape } from "@/components/BatteryShape3D";

export default function OEMPortal() {
  const [batterySpecs, setBatterySpecs] = useState({
    shape: 'rectangular' as BatteryShape,
    length: "100",
    width: "50",
    height: "20",
    voltage: "3.7",
    capacity: "3000",
    chemistry: "Li-ion",
    quantity: "1000",
    application: "",
    customRequirements: ""
  });

  const [clientInfo, setClientInfo] = useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    projectDetails: ""
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [activeTab, setActiveTab] = useState("design");

  const calculateCost = () => {
    const volume = parseFloat(batterySpecs.length) * parseFloat(batterySpecs.width) * parseFloat(batterySpecs.height);
    const capacity = parseFloat(batterySpecs.capacity);
    const quantity = parseInt(batterySpecs.quantity);
    
    if (volume && capacity && quantity) {
      // Advanced cost calculation based on shape, chemistry, and volume
      const shapeMultipliers: Record<BatteryShape, number> = {
        'rectangular': 1.0,
        'cylindrical': 1.1,
        'square': 1.05,
        'circular': 1.2,
        'hexagonal': 1.3,
        'prismatic': 1.15,
        'pouch': 0.95
      };
      
      const chemistryMultipliers: Record<string, number> = {
        'Li-ion': 1.0,
        'LiFePO4': 1.2,
        'NiMH': 0.8,
        'Lead-acid': 0.4
      };
      
      const baseCost = (volume * 0.08) + (capacity * 0.12);
      const shapeCost = baseCost * shapeMultipliers[batterySpecs.shape];
      const chemistryCost = shapeCost * chemistryMultipliers[batterySpecs.chemistry];
      const quantityDiscount = quantity > 5000 ? 0.85 : quantity > 1000 ? 0.9 : 1.0;
      const total = chemistryCost * quantity * quantityDiscount + 2500; // Base setup cost
      
      setEstimatedCost(total);
      toast.success("Advanced cost estimate calculated!");
    } else {
      toast.error("Please fill in all required fields for calculation");
    }
  };

  const generateQuote = () => {
    if (!clientInfo.company || !clientInfo.email) {
      toast.error("Please provide company name and contact email");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Detailed quote generated and sent to " + clientInfo.email);
      setActiveTab("quote");
    }, 1500);
  };

  const downloadSpecSheet = () => {
    toast.success("Technical specification sheet downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" alt="Polygon Batteries" className="w-10 h-10" />
              <span className="text-xl font-bold text-foreground">Polygon Batteries</span>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            OEM Orders - Custom Battery Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional battery design and manufacturing for OEM partners. Configure custom specifications, 
            calculate real-time costs, and generate instant quotes with our advanced design tools.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Box className="w-4 h-4" />
                Design & Shape
              </TabsTrigger>
              <TabsTrigger value="specs" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Specifications
              </TabsTrigger>
              <TabsTrigger value="calculate" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Advanced Calculator
              </TabsTrigger>
              <TabsTrigger value="quote" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Generate Quote
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <ShapeSelector
                    selectedShape={batterySpecs.shape}
                    onShapeChange={(shape) => setBatterySpecs({...batterySpecs, shape})}
                    length={parseFloat(batterySpecs.length) || 0}
                    width={parseFloat(batterySpecs.width) || 0}
                    height={parseFloat(batterySpecs.height) || 0}
                  />
                </div>

                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">Quick Dimensions</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="length">Length (mm)</Label>
                        <Input
                          id="length"
                          type="number"
                          value={batterySpecs.length}
                          onChange={(e) => setBatterySpecs({...batterySpecs, length: e.target.value})}
                          placeholder="100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="width">Width (mm)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={batterySpecs.width}
                          onChange={(e) => setBatterySpecs({...batterySpecs, width: e.target.value})}
                          placeholder="50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (mm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={batterySpecs.height}
                          onChange={(e) => setBatterySpecs({...batterySpecs, height: e.target.value})}
                          placeholder="20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="application">Intended Application</Label>
                      <Select value={batterySpecs.application} onValueChange={(value) => setBatterySpecs({...batterySpecs, application: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select application type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automotive">Electric Vehicles</SelectItem>
                          <SelectItem value="consumer">Consumer Electronics</SelectItem>
                          <SelectItem value="industrial">Industrial Equipment</SelectItem>
                          <SelectItem value="medical">Medical Devices</SelectItem>
                          <SelectItem value="aerospace">Aerospace Applications</SelectItem>
                          <SelectItem value="marine">Marine Systems</SelectItem>
                          <SelectItem value="energy-storage">Grid Energy Storage</SelectItem>
                          <SelectItem value="other">Other/Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="customRequirements">Special Requirements</Label>
                      <Input
                        id="customRequirements"
                        value={batterySpecs.customRequirements}
                        onChange={(e) => setBatterySpecs({...batterySpecs, customRequirements: e.target.value})}
                        placeholder="e.g., IP67 rating, -40°C operation, military spec..."
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-8">
              <Card className="p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-primary" />
                  Detailed Battery Specifications
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="voltage">Nominal Voltage (V)</Label>
                        <Input
                          id="voltage"
                          type="number"
                          step="0.1"
                          value={batterySpecs.voltage}
                          onChange={(e) => setBatterySpecs({...batterySpecs, voltage: e.target.value})}
                          placeholder="3.7"
                        />
                      </div>
                      <div>
                        <Label htmlFor="capacity">Capacity (mAh)</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={batterySpecs.capacity}
                          onChange={(e) => setBatterySpecs({...batterySpecs, capacity: e.target.value})}
                          placeholder="3000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="chemistry">Battery Chemistry</Label>
                      <Select value={batterySpecs.chemistry} onValueChange={(value) => setBatterySpecs({...batterySpecs, chemistry: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select chemistry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Li-ion">Lithium-ion (Standard)</SelectItem>
                          <SelectItem value="LiFePO4">LiFePO4 (Long Life)</SelectItem>
                          <SelectItem value="NiMH">Nickel Metal Hydride</SelectItem>
                          <SelectItem value="Lead-acid">Lead Acid (Budget)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quantity">Production Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={batterySpecs.quantity}
                        onChange={(e) => setBatterySpecs({...batterySpecs, quantity: e.target.value})}
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6">
                      <h3 className="font-semibold mb-4">Current Configuration</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Shape:</span>
                          <span className="font-medium capitalize">{batterySpecs.shape}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dimensions:</span>
                          <span className="font-medium">{batterySpecs.length}×{batterySpecs.width}×{batterySpecs.height}mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Voltage:</span>
                          <span className="font-medium">{batterySpecs.voltage}V</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Capacity:</span>
                          <span className="font-medium">{batterySpecs.capacity}mAh</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chemistry:</span>
                          <span className="font-medium">{batterySpecs.chemistry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Energy:</span>
                          <span className="font-medium">{((parseFloat(batterySpecs.voltage || "0") * parseFloat(batterySpecs.capacity || "0")) / 1000).toFixed(1)}Wh</span>
                        </div>
                      </div>
                    </div>

                    <Button onClick={downloadSpecSheet} variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Spec Sheet
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="calculate" className="mt-8">
              <BatteryCalculator
                shape={batterySpecs.shape}
                length={parseFloat(batterySpecs.length) || 0}
                width={parseFloat(batterySpecs.width) || 0}
                height={parseFloat(batterySpecs.height) || 0}
                voltage={parseFloat(batterySpecs.voltage) || 0}
                capacity={parseFloat(batterySpecs.capacity) || 0}
                quantity={parseInt(batterySpecs.quantity) || 0}
                chemistry={batterySpecs.chemistry}
              />
              
              <Card className="p-6 mt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Quick Cost Estimate</h3>
                    <p className="text-sm text-muted-foreground">Get a basic production cost estimate</p>
                  </div>
                  <Button onClick={calculateCost} className="ml-4">
                    Calculate Basic Cost
                  </Button>
                </div>
                
                {estimatedCost > 0 && (
                  <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-primary">
                        Basic Estimate: ${estimatedCost.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Per unit: ${(estimatedCost / parseInt(batterySpecs.quantity || "1")).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="quote" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Client Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company Name *</Label>
                        <Input 
                          id="company" 
                          value={clientInfo.company}
                          onChange={(e) => setClientInfo({...clientInfo, company: e.target.value})}
                          placeholder="Your Company Name" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactName">Contact Person</Label>
                        <Input 
                          id="contactName" 
                          value={clientInfo.contactName}
                          onChange={(e) => setClientInfo({...clientInfo, contactName: e.target.value})}
                          placeholder="John Smith" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={clientInfo.email}
                          onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                          placeholder="contact@company.com" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={clientInfo.phone}
                          onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                          placeholder="+1 (555) 123-4567" 
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Company Address</Label>
                      <Input 
                        id="address" 
                        value={clientInfo.address}
                        onChange={(e) => setClientInfo({...clientInfo, address: e.target.value})}
                        placeholder="123 Business St, City, State 12345" 
                      />
                    </div>

                    <div>
                      <Label htmlFor="projectDetails">Project Details</Label>
                      <Input 
                        id="projectDetails" 
                        value={clientInfo.projectDetails}
                        onChange={(e) => setClientInfo({...clientInfo, projectDetails: e.target.value})}
                        placeholder="Brief description of your project requirements..." 
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Quote Summary</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6">
                      <h3 className="font-semibold mb-4">Order Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Battery Type:</span>
                          <span className="font-medium capitalize">{batterySpecs.shape} {batterySpecs.chemistry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dimensions:</span>
                          <span className="font-medium">{batterySpecs.length}×{batterySpecs.width}×{batterySpecs.height}mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Specifications:</span>
                          <span className="font-medium">{batterySpecs.voltage}V, {batterySpecs.capacity}mAh</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantity:</span>
                          <span className="font-medium">{batterySpecs.quantity} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Application:</span>
                          <span className="font-medium">{batterySpecs.application || "General Purpose"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="font-semibold mb-4 text-blue-900">Cost Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Battery Production:</span>
                          <span className="font-medium">${estimatedCost > 0 ? (estimatedCost - 2500).toFixed(2) : "0.00"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Engineering & Design:</span>
                          <span className="font-medium">$1,500.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tooling & Setup:</span>
                          <span className="font-medium">$1,000.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quality Assurance:</span>
                          <span className="font-medium">$500.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Certification & Testing:</span>
                          <span className="font-medium">$750.00</span>
                        </div>
                        <hr className="my-3 border-blue-300" />
                        <div className="flex justify-between text-lg font-semibold text-blue-900">
                          <span>Total Project Cost:</span>
                          <span>${estimatedCost > 0 ? (estimatedCost + 1250).toFixed(2) : "0.00"}</span>
                        </div>
                        <div className="flex justify-between text-sm text-blue-700">
                          <span>Cost per unit:</span>
                          <span>${estimatedCost > 0 ? ((estimatedCost + 1250) / parseInt(batterySpecs.quantity || "1")).toFixed(2) : "0.00"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button onClick={generateQuote} className="w-full" size="lg">
                        <Mail className="w-4 h-4 mr-2" />
                        Generate Professional Quote
                      </Button>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        <p>Quote valid for 30 days • Lead time: 4-6 weeks</p>
                        <p>Professional support included • Warranty: 2 years</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}