import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Box, Calculator, Download } from "lucide-react";
import { toast } from "sonner";

export default function OEMPortal() {
  const [batterySpecs, setBatterySpecs] = useState({
    length: "",
    width: "",
    height: "",
    voltage: "",
    capacity: "",
    chemistry: "LiFePO4",
    quantity: ""
  });

  const [estimatedCost, setEstimatedCost] = useState(0);

  const calculateCost = () => {
    const volume = parseFloat(batterySpecs.length) * parseFloat(batterySpecs.width) * parseFloat(batterySpecs.height);
    const capacity = parseFloat(batterySpecs.capacity);
    const quantity = parseInt(batterySpecs.quantity);
    
    if (volume && capacity && quantity) {
      // Simplified cost calculation
      const baseCost = (volume * 0.1) + (capacity * 0.05);
      const total = baseCost * quantity;
      setEstimatedCost(total);
      toast.success("Cost estimate updated!");
    }
  };

  const generateQuote = () => {
    toast.success("Quote generated and sent to your email!");
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
            OEM Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design custom battery solutions for your wholesale needs. Configure dimensions, specifications, and get instant quotes.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Box className="w-4 h-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="calculate" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calculate
              </TabsTrigger>
              <TabsTrigger value="quote" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Quote
              </TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-primary" />
                    Battery Specifications
                  </h2>
                  
                  <div className="space-y-6">
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="voltage">Voltage (V)</Label>
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
                          placeholder="2000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={batterySpecs.quantity}
                        onChange={(e) => setBatterySpecs({...batterySpecs, quantity: e.target.value})}
                        placeholder="1000"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">3D Preview</h2>
                  <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
                    <div className="text-center">
                      <Box className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">3D preview will appear here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Dimensions: {batterySpecs.length || "0"} × {batterySpecs.width || "0"} × {batterySpecs.height || "0"} mm
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="calculate" className="mt-8">
              <Card className="p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Cost Calculator</h2>
                
                <div className="space-y-6">
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Specifications Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Dimensions: {batterySpecs.length || "0"} × {batterySpecs.width || "0"} × {batterySpecs.height || "0"} mm</div>
                      <div>Voltage: {batterySpecs.voltage || "0"} V</div>
                      <div>Capacity: {batterySpecs.capacity || "0"} mAh</div>
                      <div>Quantity: {batterySpecs.quantity || "0"} units</div>
                    </div>
                  </div>

                  <Button onClick={calculateCost} className="w-full" variant="electric">
                    Calculate Estimated Cost
                  </Button>

                  {estimatedCost > 0 && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                      <p className="text-lg font-semibold text-primary">
                        Estimated Cost: ${estimatedCost.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Price per unit: ${(estimatedCost / parseInt(batterySpecs.quantity || "1")).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="quote" className="mt-8">
              <Card className="p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Generate Quote</h2>
                
                <div className="space-y-6">
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Quote Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Custom Battery Design</span>
                        <span>${estimatedCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engineering & Setup</span>
                        <span>$500.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tooling & Molds</span>
                        <span>$1,200.00</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total Estimate</span>
                        <span>${(estimatedCost + 1700).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Company Name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Contact Email</Label>
                      <Input id="email" type="email" placeholder="contact@company.com" />
                    </div>
                  </div>

                  <Button onClick={generateQuote} className="w-full" variant="electric">
                    Generate & Send Quote
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}