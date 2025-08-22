import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BatteryShape3D, BatteryShape } from "./BatteryShape3D";
import { Cylinder, Square, Circle, Hexagon, Box, Smartphone, Tablet } from "lucide-react";

interface ShapeSelectorProps {
  selectedShape: BatteryShape;
  onShapeChange: (shape: BatteryShape) => void;
  length: number;
  width: number;
  height: number;
}

const shapeOptions: Array<{
  value: BatteryShape;
  label: string;
  icon: React.ReactNode;
  description: string;
  commonUses: string[];
}> = [
  {
    value: 'cylindrical',
    label: '18650 Cylindrical',
    icon: <Cylinder className="w-4 h-4" />,
    description: 'Standard cylindrical battery format',
    commonUses: ['Laptops', 'Power tools', 'E-bikes', 'Tesla cars']
  },
  {
    value: 'rectangular',
    label: 'Rectangular Prismatic',
    icon: <Box className="w-4 h-4" />,
    description: 'Rectangular prismatic format',
    commonUses: ['Electric vehicles', 'Energy storage', 'UPS systems']
  },
  {
    value: 'square',
    label: 'Square Cell',
    icon: <Square className="w-4 h-4" />,
    description: 'Square form factor',
    commonUses: ['Grid storage', 'Industrial equipment', 'Marine applications']
  },
  {
    value: 'circular',
    label: 'Coin Cell',
    icon: <Circle className="w-4 h-4" />,
    description: 'Flat circular button cell',
    commonUses: ['Watches', 'Medical devices', 'IoT sensors', 'Key fobs']
  },
  {
    value: 'hexagonal',
    label: 'Hexagonal',
    icon: <Hexagon className="w-4 h-4" />,
    description: 'Six-sided battery design',
    commonUses: ['Specialized applications', 'Space-efficient packing']
  },
  {
    value: 'prismatic',
    label: 'Prismatic',
    icon: <Tablet className="w-4 h-4" />,
    description: 'Flat prismatic format',
    commonUses: ['Electric vehicles', 'Phones', 'Tablets', 'Drones']
  },
  {
    value: 'pouch',
    label: 'Pouch Cell',
    icon: <Smartphone className="w-4 h-4" />,
    description: 'Flexible pouch format',
    commonUses: ['Smartphones', 'Tablets', 'Wearables', 'RC vehicles']
  }
];

export const ShapeSelector = ({ selectedShape, onShapeChange, length, width, height }: ShapeSelectorProps) => {
  const [previewShape, setPreviewShape] = useState<BatteryShape | null>(null);
  
  const currentShape = previewShape || selectedShape;
  const selectedOption = shapeOptions.find(option => option.value === currentShape);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Battery Shape Type
        </label>
        <Select value={selectedShape} onValueChange={onShapeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select battery shape" />
          </SelectTrigger>
          <SelectContent>
            {shapeOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                onMouseEnter={() => setPreviewShape(option.value)}
                onMouseLeave={() => setPreviewShape(null)}
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 3D Preview */}
      <Card className="p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            {selectedOption?.icon}
            {selectedOption?.label} Preview
          </h3>
          <p className="text-sm text-gray-600 mt-1">{selectedOption?.description}</p>
        </div>
        
        <BatteryShape3D
          shape={currentShape}
          length={length || 50}
          width={width || 30}
          height={height || 15}
        />
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Common Applications:</p>
          <div className="flex flex-wrap gap-1">
            {selectedOption?.commonUses.map((use, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {use}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Shape Specifications */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Shape Specifications</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>Dimensions:</strong> {length || 0} × {width || 0} × {height || 0} mm</p>
          <p><strong>Volume:</strong> {((length || 0) * (width || 0) * (height || 0) / 1000).toFixed(2)} cm³</p>
          <p><strong>Form Factor:</strong> {selectedOption?.label}</p>
        </div>
      </Card>
    </div>
  );
};