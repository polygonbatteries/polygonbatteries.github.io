import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Upload, Search, ShoppingCart, MapPin, Clock, CheckCircle, User, Battery, Zap } from "lucide-react";
import { createWorker } from 'tesseract.js';
import { toast } from "sonner";
import { AuthModal } from "@/components/AuthModal";
import { useAuthState } from "@/hooks/useAuthState";

interface BatteryProduct {
  id: string;
  name: string;
  type: string;
  voltage: string;
  capacity: string;
  dimensions: string;
  price: number;
  inStock: number;
  warehouse: string;
  deliveryDays: number;
  image: string;
  compatibility: string[];
}

const BatteryFinder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState<BatteryProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuthState();

  // Sample battery inventory
  const batteryInventory: BatteryProduct[] = [
    {
      id: "aa-alkaline-001",
      name: "Energizer AA Alkaline",
      type: "AA Alkaline",
      voltage: "1.5V",
      capacity: "2850mAh",
      dimensions: "50.5×14.5mm",
      price: 2.99,
      inStock: 5000,
      warehouse: "USA - California",
      deliveryDays: 2,
      image: "/api/placeholder/150/100",
      compatibility: ["TV Remote", "Gaming Controller", "Flashlight", "Toys"]
    },
    {
      id: "macbook-pro-2019",
      name: "MacBook Pro 13\" A1708 Battery",
      type: "Laptop Battery",
      voltage: "11.4V",
      capacity: "54.5Wh",
      dimensions: "279×95×6.3mm",
      price: 129.99,
      inStock: 45,
      warehouse: "Germany - Berlin",
      deliveryDays: 3,
      image: "/api/placeholder/150/100",
      compatibility: ["MacBook Pro 13\" 2016-2017", "Model A1708"]
    },
    {
      id: "iphone-12-battery",
      name: "iPhone 12 Battery Replacement",
      type: "Phone Battery",
      voltage: "3.83V",
      capacity: "2815mAh",
      dimensions: "89×54×3.8mm",
      price: 79.99,
      inStock: 120,
      warehouse: "USA - Texas",
      deliveryDays: 1,
      image: "/api/placeholder/150/100",
      compatibility: ["iPhone 12", "Model A2172", "Model A2402"]
    },
    {
      id: "car-battery-12v",
      name: "AGM Car Battery 12V 75Ah",
      type: "Car Battery",
      voltage: "12V",
      capacity: "75Ah",
      dimensions: "278×175×190mm",
      price: 189.99,
      inStock: 25,
      warehouse: "South Africa - Cape Town",
      deliveryDays: 5,
      image: "/api/placeholder/150/100",
      compatibility: ["Honda Civic", "Toyota Corolla", "Ford Focus", "BMW 3 Series"]
    },
    {
      id: "airpods-pro-battery",
      name: "AirPods Pro Battery Kit",
      type: "Earbuds Battery",
      voltage: "3.7V",
      capacity: "43.24mAh",
      dimensions: "21×16×3.5mm",
      price: 49.99,
      inStock: 80,
      warehouse: "UK - London",
      deliveryDays: 4,
      image: "/api/placeholder/150/100",
      compatibility: ["AirPods Pro 1st Gen", "AirPods Pro 2nd Gen"]
    },
    {
      id: "drone-lipo-battery",
      name: "DJI Mavic Air 2 Battery",
      type: "Drone Battery",
      voltage: "11.55V",
      capacity: "3500mAh",
      dimensions: "153×67×31mm",
      price: 159.99,
      inStock: 35,
      warehouse: "China - Shenzhen",
      deliveryDays: 7,
      image: "/api/placeholder/150/100",
      compatibility: ["DJI Mavic Air 2", "DJI Air 2S"]
    }
  ];

  const batteryCategories = [
    { value: "all", label: "All Batteries" },
    { value: "household", label: "Household (AA, AAA, 9V)" },
    { value: "laptop", label: "Laptop Batteries" },
    { value: "phone", label: "Phone Batteries" },
    { value: "car", label: "Car Batteries" },
    { value: "drone", label: "Drone/RC Batteries" },
    { value: "tools", label: "Power Tool Batteries" },
    { value: "medical", label: "Medical Device Batteries" }
  ];

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    try {
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();
      
      // Extract potential battery specs from OCR text
      const specs = extractBatterySpecs(text);
      if (specs.length > 0) {
        setSearchQuery(specs.join(" "));
        toast.success(`Found specs: ${specs.join(", ")}`);
        performSearch(specs.join(" "));
      } else {
        toast.info("No battery specifications detected in image");
      }
    } catch (error) {
      toast.error("Failed to process image");
    } finally {
      setIsProcessing(false);
    }
  };

  const extractBatterySpecs = (text: string): string[] => {
    const specs: string[] = [];
    
    // Common battery patterns
    const patterns = [
      /\b(AA|AAA|C|D|9V|12V|3\.7V|1\.5V)\b/gi,
      /\b\d+mAh?\b/gi,
      /\b\d+Ah?\b/gi,
      /\b(Li-ion|LiPo|NiMH|Alkaline|AGM)\b/gi,
      /\b(iPhone|Samsung|MacBook|Dell|HP|Lenovo)\b/gi,
      /\bModel\s+[A-Z0-9]+\b/gi
    ];
    
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        specs.push(...matches);
      }
    });
    
    return [...new Set(specs)]; // Remove duplicates
  };

  const performSearch = (query: string) => {
    setIsSearching(true);
    const searchTerms = query.toLowerCase().split(' ');
    
    const results = batteryInventory.filter(battery => {
      const searchableText = [
        battery.name,
        battery.type,
        battery.voltage,
        battery.capacity,
        ...battery.compatibility
      ].join(' ').toLowerCase();
      
      return searchTerms.some(term => searchableText.includes(term));
    });
    
    setSearchResults(results);
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleAddToCart = (battery: BatteryProduct) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    toast.success(`${battery.name} added to cart!`);
  };

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    } else {
      setSearchResults(batteryInventory.slice(0, 6)); // Show sample products
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-slate-900 text-white border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png" 
                alt="Polygon Batteries" 
                className="h-10 w-auto object-contain brightness-0 invert" 
                width="40" 
                height="40"
                decoding="async"
              />
              <h1 className="text-xl md:text-2xl font-bold">Battery Finder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-white hover:text-slate-200"
              >
                ← Back to Home
              </Button>
              {user ? (
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{user.email}</span>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setAuthModalOpen(true)}
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                >
                  <User className="h-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="p-6 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Any Battery Worldwide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload a photo of your battery or search by model. We have inventory across multiple warehouses 
              with professional installation services available for all battery types.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by battery model, device, or specifications..."
                className="h-12 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {batteryCategories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-lg font-medium text-gray-900">Upload battery photo</span>
              <p className="text-gray-500 mt-2">
                Take a clear photo of your battery label or device for automatic identification
              </p>
            </Label>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            {uploadedFile && (
              <p className="mt-2 text-sm text-green-600">
                <CheckCircle className="inline w-4 h-4 mr-1" />
                {uploadedFile.name} uploaded
              </p>
            )}
            {isProcessing && (
              <p className="mt-2 text-sm text-blue-600">Processing image...</p>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium mb-2">Professional Installation Available:</p>
            <p>
              All batteries come with optional professional installation service. Our certified technicians 
              will install your laptop battery, car battery, or any other battery type at your location upon delivery.
            </p>
          </div>
        </Card>

        {/* Search Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Search Results (${searchResults.length})` : 'Popular Batteries'}
            </h3>
            {isSearching && <span className="text-gray-500">Searching...</span>}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((battery) => (
              <Card key={battery.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Battery Image</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">{battery.name}</h4>
                  <p className="text-sm text-gray-600">{battery.type}</p>
                  
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline">{battery.voltage}</Badge>
                    <Badge variant="outline">{battery.capacity}</Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{battery.warehouse}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{battery.deliveryDays} days delivery</span>
                    </div>
                    <div className="text-green-600 font-medium">
                      {battery.inStock} in stock
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${battery.price}
                    </span>
                    <Button
                      onClick={() => handleAddToCart(battery)}
                      size="sm"
                      className="bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p className="font-medium">Compatible with:</p>
                    <p>{battery.compatibility.slice(0, 2).join(", ")}
                      {battery.compatibility.length > 2 && ` +${battery.compatibility.length - 2} more`}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Installation Service Info */}
        <Card className="p-6 bg-slate-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Installation Service</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">What's Included:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Certified technician visit</li>
                <li>• Safe battery removal & installation</li>
                <li>• System testing & calibration</li>
                <li>• Proper disposal of old battery</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Supported Devices:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Laptops & computers</li>
                <li>• Smartphones & tablets</li>
                <li>• Cars & motorcycles</li>
                <li>• RC toys & drones</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Service Areas:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Worldwide delivery</li>
                <li>• Local installation teams</li>
                <li>• Same-day service available</li>
                <li>• Optional service (can opt-out)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default BatteryFinder;