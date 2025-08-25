import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, Calculator } from "lucide-react";
import { OrderData as QuoteData } from "../OrderWizard";

interface BackupDurationStepProps {
  quoteData: QuoteData;
  updateQuoteData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const presetDurations = [
  { value: '30min', label: '30 Minutes', description: 'Essential systems only', hours: 0.5 },
  { value: '1hr', label: '1 Hour', description: 'Basic home backup', hours: 1 },
  { value: '2hr', label: '2 Hours', description: 'Extended backup', hours: 2 },
  { value: '3hr', label: '3 Hours', description: 'Full home backup', hours: 3 },
];

export const BackupDurationStep = ({ quoteData, updateQuoteData, onNext, onPrev }: BackupDurationStepProps) => {
  const [selectedDuration, setSelectedDuration] = useState(quoteData.backupDuration);
  const [customHours, setCustomHours] = useState(quoteData.customDuration?.toString() || '');
  const [calculatedCost, setCalculatedCost] = useState(quoteData.calculatedCost);

  const calculateCost = (hours: number) => {
    // Market average costs (example calculations)
    const dailyKwh = quoteData.kwhUsage / 30; // Daily usage
    const backupKwh = (dailyKwh / 24) * hours; // Backup capacity needed
    
    // LiFePO4 battery cost per kWh (example: $400/kWh)
    const batteryAhNeeded = Math.ceil(backupKwh * 1000 / 12); // Assuming 12V system
    const batteryCost = batteryAhNeeded * 0.15; // $0.15 per Ah approximation
    
    // Base costs
    const laborCost = quoteData.installationType === 'business' ? 1200 : 800;
    const inverterCost = backupKwh > 5 ? 1500 : 800;
    const materialsCost = 400;
    
    const totalCost = batteryCost + laborCost + inverterCost + materialsCost;
    
    return {
      batteryAhNeeded,
      laborCost,
      inverterCost,
      materialsCost,
      totalCost: Math.round(totalCost),
    };
  };

  const handleDurationSelect = (duration: string, hours: number) => {
    setSelectedDuration(duration);
    const cost = calculateCost(hours);
    setCalculatedCost(cost);
    updateQuoteData({ 
      backupDuration: duration, 
      customDuration: hours,
      calculatedCost: cost 
    });
  };

  const handleCustomDurationChange = (value: string) => {
    setCustomHours(value);
    const hours = parseFloat(value);
    if (!isNaN(hours) && hours > 0) {
      setSelectedDuration('custom');
      const cost = calculateCost(hours);
      setCalculatedCost(cost);
      updateQuoteData({ 
        backupDuration: 'custom', 
        customDuration: hours,
        calculatedCost: cost 
      });
    }
  };

  const canProceed = selectedDuration && (selectedDuration !== 'custom' || (customHours && parseFloat(customHours) > 0));

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Select Backup Duration</h3>
          <p className="text-muted-foreground">
            How long do you need backup power during an outage?
          </p>
        </div>

        {/* Current Usage Info */}
        <Card className="p-4 bg-secondary/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Your Monthly Usage</p>
            <p className="text-xl font-bold text-foreground">{quoteData.kwhUsage} kWh</p>
            <p className="text-sm text-muted-foreground">
              ≈ {Math.round(quoteData.kwhUsage / 30 * 100) / 100} kWh per day
            </p>
          </div>
        </Card>

        {/* Preset Duration Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presetDurations.map((option) => (
            <Card
              key={option.value}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                selectedDuration === option.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleDurationSelect(option.value, option.hours)}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{option.label}</h4>
                  {selectedDuration === option.value && (
                    <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{option.description}</p>
                <div className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    ≈ {Math.round((quoteData.kwhUsage / 30 / 24) * option.hours * 100) / 100} kWh needed
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Custom Duration */}
        <div className="space-y-4">
          <Label className="text-foreground font-medium">Custom Duration (Hours)</Label>
          <div className="flex space-x-4">
            <Input
              type="number"
              placeholder="Enter hours"
              value={customHours}
              onChange={(e) => handleCustomDurationChange(e.target.value)}
              className="bg-background"
              min="0.5"
              step="0.5"
            />
            <Button
              variant={selectedDuration === 'custom' ? 'electric' : 'industrial'}
              onClick={() => {
                if (customHours && parseFloat(customHours) > 0) {
                  handleDurationSelect('custom', parseFloat(customHours));
                }
              }}
              disabled={!customHours || parseFloat(customHours) <= 0}
            >
              Calculate Custom
            </Button>
          </div>
        </div>

        {/* Cost Preview */}
        {calculatedCost.totalCost > 0 && (
          <Card className="p-6 bg-primary/10 border-primary/30">
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-foreground mb-2">Estimated Cost</h4>
                <p className="text-3xl font-bold text-primary">
                  ${calculatedCost.totalCost.toLocaleString()}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Battery ({calculatedCost.batteryAhNeeded || 0}Ah):</span>
                  <span className="font-medium text-foreground">
                    ${(calculatedCost.totalCost - calculatedCost.laborCost - calculatedCost.inverterCost - calculatedCost.materialsCost).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Labor:</span>
                  <span className="font-medium text-foreground">${calculatedCost.laborCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inverter:</span>
                  <span className="font-medium text-foreground">${calculatedCost.inverterCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Materials:</span>
                  <span className="font-medium text-foreground">${calculatedCost.materialsCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button onClick={onPrev} variant="industrial" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!canProceed}
            variant="electric"
            size="lg"
          >
            Next: Installation Address
          </Button>
        </div>
      </div>
    </Card>
  );
};