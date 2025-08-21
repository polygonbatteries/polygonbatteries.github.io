import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BatterySearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const batteryExamples = [
  "LiFePO4 12V 100Ah - In Stock",
  "Laptop Battery Dell Inspiron - Available", 
  "Car Battery 12V 75Ah - In Stock",
  "Tesla Model S Battery Pack - Custom Order",
  "iPhone 14 Battery - In Stock",
  "Solar Panel Battery 24V - Available",
  "UPS Battery 12V 9Ah - In Stock",
  "Electric Bike Battery 48V - Available"
];

export const BatterySearchBar = ({ searchQuery, setSearchQuery, onSearch, onImageUpload }: BatterySearchBarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredExamples, setFilteredExamples] = useState(batteryExamples);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Filter examples based on input
    const filtered = batteryExamples.filter(example => 
      example.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredExamples(filtered);
  };

  const handleExampleClick = (example: string) => {
    const batteryName = example.split(" - ")[0];
    setSearchQuery(batteryName);
    setShowDropdown(false);
  };

  return (
    <div className="mb-8 max-w-3xl mx-auto">
      <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 shadow-card">
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search for batteries (e.g., laptop battery, car battery, LiFePO4)..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="w-full pl-12 pr-4 py-4 text-lg bg-background/90 border-2 border-primary/30 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/70" />
              
              {/* Dropdown */}
              {showDropdown && filteredExamples.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-primary/20 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                  {filteredExamples.slice(0, 6).map((example, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-primary/5 cursor-pointer border-b border-border/50 last:border-b-0 transition-colors"
                      onClick={() => handleExampleClick(example)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{example.split(" - ")[0]}</span>
                        <span className="text-xs text-primary font-semibold">{example.split(" - ")[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={onSearch} 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl shadow-lg hover:shadow-electric transition-all duration-300"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
              <label htmlFor="image-upload" className="cursor-pointer">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary/40 hover:bg-primary/10 px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300" 
                  asChild
                >
                  <span>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload
                  </span>
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Search by name or upload an image to find matching batteries
          </p>
        </div>
      </div>
    </div>
  );
};