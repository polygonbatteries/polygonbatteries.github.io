import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Battery, Weight, Thermometer } from "lucide-react";
import { BatteryShape } from "./BatteryShape3D";

interface BatteryCalculatorProps {
  shape: BatteryShape;
  length: number;
  width: number;
  height: number;
  voltage: number;
  capacity: number;
  quantity: number;
  chemistry: string;
}

interface CalculationResults {
  totalEnergy: number;
  totalWeight: number;
  totalCost: number;
  costPerUnit: number;
  energyDensity: number;
  packingEfficiency: number;
  estimatedLifeCycles: number;
  operatingTemp: { min: number; max: number };
}

export const BatteryCalculator = ({
  shape,
  length,
  width,
  height,
  voltage,
  capacity,
  quantity,
  chemistry
}: BatteryCalculatorProps) => {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [customSpecs, setCustomSpecs] = useState({
    targetEnergy: "",
    maxWeight: "",
    budgetConstraint: "",
    temperatureRange: "standard"
  });

  const calculateSpecs = () => {
    if (!length || !width || !height || !voltage || !capacity || !quantity) {
      return;
    }

    // Volume calculations
    const volume = (length * width * height) / 1000; // cm³
    const totalVolume = volume * quantity;

    // Chemistry-based calculations
    const chemistryData: Record<string, {
      energyDensity: number; // Wh/L
      weightDensity: number; // g/cm³
      baseCost: number; // $/Wh
      cycles: number;
      tempRange: { min: number; max: number };
    }> = {
      'LiFePO4': { energyDensity: 220, weightDensity: 2.2, baseCost: 0.15, cycles: 3000, tempRange: { min: -20, max: 60 } },
      'Li-ion': { energyDensity: 400, weightDensity: 2.1, baseCost: 0.12, cycles: 1500, tempRange: { min: -10, max: 45 } },
      'NiMH': { energyDensity: 300, weightDensity: 4.2, baseCost: 0.08, cycles: 1000, tempRange: { min: -20, max: 60 } },
      'Lead-acid': { energyDensity: 40, weightDensity: 5.2, baseCost: 0.05, cycles: 500, tempRange: { min: -15, max: 50 } }
    };

    const chemData = chemistryData[chemistry] || chemistryData['Li-ion'];

    // Energy calculations
    const energyPerCell = (voltage * capacity) / 1000; // Wh
    const totalEnergy = energyPerCell * quantity;

    // Weight calculations
    const weightPerCell = volume * chemData.weightDensity; // grams
    const totalWeight = (weightPerCell * quantity) / 1000; // kg

    // Cost calculations (includes material, manufacturing, testing, certification)
    const materialCost = totalEnergy * chemData.baseCost;
    const manufacturingCost = quantity * 0.5; // $0.5 per cell manufacturing
    const toolingCost = quantity > 1000 ? 2000 : 500; // Tooling setup
    const certificationCost = 1000; // Safety certifications
    const totalCost = materialCost + manufacturingCost + toolingCost + certificationCost;

    // Shape-based packing efficiency
    const packingEfficiencies: Record<BatteryShape, number> = {
      'rectangular': 0.85,
      'square': 0.82,
      'cylindrical': 0.74,
      'hexagonal': 0.91,
      'prismatic': 0.88,
      'circular': 0.65,
      'pouch': 0.92
    };

    const packingEfficiency = packingEfficiencies[shape] || 0.8;
    const energyDensity = (totalEnergy / totalVolume) * packingEfficiency;

    setResults({
      totalEnergy,
      totalWeight,
      totalCost,
      costPerUnit: totalCost / quantity,
      energyDensity,
      packingEfficiency: packingEfficiency * 100,
      estimatedLifeCycles: chemData.cycles,
      operatingTemp: chemData.tempRange
    });
  };

  useEffect(() => {
    calculateSpecs();
  }, [shape, length, width, height, voltage, capacity, quantity, chemistry]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Advanced Battery Calculations
        </h3>

        {/* Custom Requirements Input */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="targetEnergy">Target Energy (Wh)</Label>
            <Input
              id="targetEnergy"
              type="number"
              value={customSpecs.targetEnergy}
              onChange={(e) => setCustomSpecs({...customSpecs, targetEnergy: e.target.value})}
              placeholder="1000"
            />
          </div>
          <div>
            <Label htmlFor="maxWeight">Max Weight (kg)</Label>
            <Input
              id="maxWeight"
              type="number"
              value={customSpecs.maxWeight}
              onChange={(e) => setCustomSpecs({...customSpecs, maxWeight: e.target.value})}
              placeholder="10"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Button onClick={calculateSpecs} className="flex-1">
            Recalculate Specifications
          </Button>
          <Button variant="outline" className="flex-1">
            Next: Complete Order →
          </Button>
        </div>

        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Energy Metrics */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Battery className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground">Energy Metrics</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Energy:</span>
                  <span className="font-semibold text-foreground">{results.totalEnergy.toFixed(1)} Wh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy Density:</span>
                  <span className="font-semibold text-foreground">{results.energyDensity.toFixed(1)} Wh/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Packing Efficiency:</span>
                  <span className="font-semibold text-foreground">{results.packingEfficiency.toFixed(1)}%</span>
                </div>
              </div>
            </Card>

            {/* Physical Properties */}
            <Card className="p-4 bg-secondary/50 border-secondary">
              <div className="flex items-center gap-2 mb-3">
                <Weight className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground">Physical Properties</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Weight:</span>
                  <span className="font-semibold text-foreground">{results.totalWeight.toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Life Cycles:</span>
                  <span className="font-semibold text-foreground">{results.estimatedLifeCycles.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operating Range:</span>
                  <span className="font-semibold text-foreground">{results.operatingTemp.min}°C to {results.operatingTemp.max}°C</span>
                </div>
              </div>
            </Card>

            {/* Cost Analysis */}
            <Card className="p-4 bg-accent/20 border-accent/40">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground">Cost Analysis</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span className="font-semibold text-foreground">${results.totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost Per Unit:</span>
                  <span className="font-semibold text-foreground">${results.costPerUnit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost Per Wh:</span>
                  <span className="font-semibold text-foreground">${(results.totalCost / results.totalEnergy).toFixed(3)}</span>
                </div>
              </div>
            </Card>

            {/* Performance Rating */}
            <Card className="p-4 bg-muted/30 border-muted">
              <div className="flex items-center gap-2 mb-3">
                <Thermometer className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-foreground">Performance Rating</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy Rating:</span>
                  <span className="font-semibold text-foreground">
                    {results.energyDensity > 300 ? 'Excellent' : 
                     results.energyDensity > 200 ? 'Good' : 
                     results.energyDensity > 100 ? 'Average' : 'Below Average'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost Efficiency:</span>
                  <span className="font-semibold text-foreground">
                    {results.costPerUnit < 5 ? 'Excellent' : 
                     results.costPerUnit < 15 ? 'Good' : 
                     results.costPerUnit < 30 ? 'Average' : 'Expensive'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall Grade:</span>
                  <span className="font-semibold text-primary">
                    {results.energyDensity > 250 && results.costPerUnit < 20 ? 'A+' :
                     results.energyDensity > 200 && results.costPerUnit < 25 ? 'A' :
                     results.energyDensity > 150 && results.costPerUnit < 35 ? 'B' : 'C'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};