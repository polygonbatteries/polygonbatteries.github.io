import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  Battery, 
  BatteryCharging, 
  Scan, 
  QrCode, 
  Plus, 
  ArrowLeft,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface BatteryDevice {
  id: string;
  name: string;
  type: string;
  capacity: string;
  currentCharge: number;
  status: "healthy" | "warning" | "critical";
  lastSync: string;
  voltage: string;
  temperature: string;
  cycleCount: number;
}

const BatteryDashboard = () => {
  const navigate = useNavigate();
  const [batteryId, setBatteryId] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Example battery data
  const [batteries] = useState<BatteryDevice[]>([
    {
      id: "PB-2024-001",
      name: "Home Backup System",
      type: "LiFePO4",
      capacity: "10kWh",
      currentCharge: 85,
      status: "healthy",
      lastSync: "2 minutes ago",
      voltage: "48.2V",
      temperature: "25°C",
      cycleCount: 245
    },
    {
      id: "PB-2024-002", 
      name: "Garage Workshop",
      type: "LiFePO4",
      capacity: "5kWh",
      currentCharge: 62,
      status: "healthy",
      lastSync: "5 minutes ago",
      voltage: "24.1V",
      temperature: "28°C",
      cycleCount: 132
    },
    {
      id: "PB-2024-003",
      name: "Cabin Solar System",
      type: "LiFePO4", 
      capacity: "15kWh",
      currentCharge: 23,
      status: "warning",
      lastSync: "1 hour ago",
      voltage: "47.8V",
      temperature: "32°C",
      cycleCount: 89
    }
  ]);

  const handleManualAdd = () => {
    if (!batteryId.trim()) {
      toast.error("Please enter a battery ID");
      return;
    }
    
    toast.success(`Battery ${batteryId} added successfully!`);
    setBatteryId("");
  };

  const handleScan = (type: "barcode" | "qr") => {
    setIsScanning(true);
    toast.info(`${type === "barcode" ? "Barcode" : "QR Code"} scanner activated`);
    
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      toast.success(`Battery PB-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} detected and added!`);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" 
                  alt="Polygon Batteries" 
                  className="w-8 h-8" 
                />
                <h1 className="text-xl font-bold text-foreground">Polygon Batteries Cloud</h1>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              Live Monitoring
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="add-battery">Add Battery</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Batteries</p>
                    <p className="text-2xl font-bold">{batteries.length}</p>
                  </div>
                  <Battery className="h-8 w-8 text-primary" />
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Charge</p>
                    <p className="text-2xl font-bold">
                      {Math.round(batteries.reduce((acc, b) => acc + b.currentCharge, 0) / batteries.length)}%
                    </p>
                  </div>
                  <BatteryCharging className="h-8 w-8 text-primary" />
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Health Status</p>
                    <p className="text-2xl font-bold text-green-600">
                      {batteries.filter(b => b.status === "healthy").length}/{batteries.length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Batteries</h3>
              <div className="grid gap-4">
                {batteries.map((battery) => (
                  <Card key={battery.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{battery.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {battery.id}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(battery.status)}
                          <span className={`text-sm ${getStatusColor(battery.status)}`}>
                            {battery.status.charAt(0).toUpperCase() + battery.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">{battery.type}</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Charge Level</span>
                          <span>{battery.currentCharge}%</span>
                        </div>
                        <Progress value={battery.currentCharge} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Capacity</p>
                          <p className="font-medium">{battery.capacity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Voltage</p>
                          <p className="font-medium">{battery.voltage}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Temperature</p>
                          <p className="font-medium">{battery.temperature}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Cycles</p>
                          <p className="font-medium">{battery.cycleCount}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Last sync: {battery.lastSync}
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="add-battery" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Battery</h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 cursor-pointer hover:bg-accent transition-colors" onClick={() => handleScan("barcode")}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Scan className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium">Scan Barcode</h4>
                      <p className="text-sm text-muted-foreground">
                        Use your device camera to scan the battery barcode
                      </p>
                      {isScanning && (
                        <Badge variant="secondary" className="animate-pulse">
                          Scanning...
                        </Badge>
                      )}
                    </div>
                  </Card>
                  
                  <Card className="p-4 cursor-pointer hover:bg-accent transition-colors" onClick={() => handleScan("qr")}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <QrCode className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium">Scan QR Code</h4>
                      <p className="text-sm text-muted-foreground">
                        Scan the QR code on your battery for instant setup
                      </p>
                      {isScanning && (
                        <Badge variant="secondary" className="animate-pulse">
                          Scanning...
                        </Badge>
                      )}
                    </div>
                  </Card>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Card className="p-4">
                  <h4 className="font-medium mb-4">Manual Entry</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Battery ID / Serial Number</label>
                      <Input
                        placeholder="Enter battery identification number"
                        value={batteryId}
                        onChange={(e) => setBatteryId(e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Usually found on a label on your battery (e.g., PB-2024-XXX)
                      </p>
                    </div>
                    
                    <Button onClick={handleManualAdd} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Battery
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BatteryDashboard;