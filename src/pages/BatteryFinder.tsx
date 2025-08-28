import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Search, Battery, Cpu } from "lucide-react";
import { toast } from "sonner";

export default function BatteryFinder() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate OCR and object recognition
    setTimeout(() => {
      setResults([
        {
          id: 1,
          model: "LP-2600-18650",
          type: "Laptop Battery",
          voltage: "11.1V",
          capacity: "2600mAh",
          price: 89.99,
          image: "/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png"
        },
        {
          id: 2,
          model: "LP-4400-18650",
          type: "Laptop Battery",
          voltage: "11.1V", 
          capacity: "4400mAh",
          price: 129.99,
          image: "/lovable-uploads/2b9c5406-8840-4d0d-8fb8-6fda079b815b.png"
        }
      ]);
      setIsAnalyzing(false);
      toast.success("Battery analysis complete! Found matching batteries.");
    }, 2000);
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
            Battery Finder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image of your battery or device and our AI will identify the exact model and find compatible replacements in our inventory.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Upload className="w-6 h-6 text-primary" />
              Upload Battery Image
            </h2>
            
            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img src={previewUrl} alt="Uploaded battery" className="max-w-full h-48 object-contain mx-auto rounded" />
                    <p className="text-sm text-muted-foreground">Image uploaded successfully</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Battery className="w-16 h-16 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium">Drop your battery image here</p>
                      <p className="text-sm text-muted-foreground">or click to browse files</p>
                    </div>
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block mt-4 cursor-pointer"
                >
                  <Button variant={previewUrl ? "outline" : "electric"}>
                    {previewUrl ? "Change Image" : "Choose File"}
                  </Button>
                </label>
              </div>

              <Button 
                onClick={analyzeImage} 
                disabled={!selectedImage || isAnalyzing}
                className="w-full"
                variant="electric"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Analyzing Image...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Find Matching Batteries
                  </div>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" />
              Matching Results
            </h2>
            
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((battery) => (
                  <div key={battery.id} className="border border-border rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={battery.image} alt={battery.model} className="w-16 h-16 object-contain" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{battery.model}</h3>
                        <p className="text-sm text-muted-foreground">{battery.type}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <span>{battery.voltage}</span>
                          <span>{battery.capacity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">${battery.price}</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Battery className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Upload an image to see matching batteries</p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}