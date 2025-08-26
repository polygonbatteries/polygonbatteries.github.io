import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Download, Upload, Grid, RotateCcw, Save } from "lucide-react";
import Tesseract from 'tesseract.js';

interface Dimension {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  value: string;
  unit: string;
}

interface Point {
  x: number;
  y: number;
}

export const Battery2DDesigner = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [selectedTool, setSelectedTool] = useState<'draw' | 'dimension'>('draw');
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [snapToAngle, setSnapToAngle] = useState(true);
  const [scale, setScale] = useState(1);
  const [unit, setUnit] = useState<'mm' | 'in'>('mm');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [paths, setPaths] = useState<Point[][]>([]);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);

  const gridSize = snapToGrid ? 10 : 1;
  const angleSnap = 15; // degrees

  const snapToGridPoint = (x: number, y: number) => {
    if (!snapToGrid) return { x, y };
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  };

  const snapToAnglePoint = (x1: number, y1: number, x2: number, y2: number) => {
    if (!snapToAngle) return { x: x2, y: y2 };
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const snappedAngle = Math.round(angle / angleSnap) * angleSnap;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return {
      x: x1 + distance * Math.cos(snappedAngle * Math.PI / 180),
      y: y1 + distance * Math.sin(snappedAngle * Math.PI / 180)
    };
  };

  const convertUnit = (value: number, fromUnit: string, toUnit: string) => {
    if (fromUnit === toUnit) return value;
    if (fromUnit === 'in' && toUnit === 'mm') return value * 25.4;
    if (fromUnit === 'mm' && toUnit === 'in') return value / 25.4;
    return value;
  };

  const handleSVGClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / scale;
    const y = (event.clientY - rect.top) / scale;
    const snapped = snapToGridPoint(x, y);

    if (selectedTool === 'draw') {
      if (!isDrawing) {
        setIsDrawing(true);
        setCurrentPath([snapped]);
      } else {
        const lastPoint = currentPath[currentPath.length - 1];
        const angleSnapped = snapToAnglePoint(lastPoint.x, lastPoint.y, snapped.x, snapped.y);
        setCurrentPath(prev => [...prev, angleSnapped]);
      }
    } else if (selectedTool === 'dimension') {
      // Add dimension logic
      const newDimension: Dimension = {
        x1: snapped.x,
        y1: snapped.y,
        x2: snapped.x + 50,
        y2: snapped.y,
        value: "50.00",
        unit: unit
      };
      setDimensions(prev => [...prev, newDimension]);
    }
  };

  const finishPath = () => {
    if (currentPath.length > 2) {
      setPaths(prev => [...prev, currentPath]);
      setCurrentPath([]);
      setIsDrawing(false);
      toast.success("Shape completed!");
    }
  };

  const clearAll = () => {
    setPaths([]);
    setCurrentPath([]);
    setDimensions([]);
    setIsDrawing(false);
    toast.success("Canvas cleared!");
  };

  const exportSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'battery-design.svg';
    a.click();
    
    URL.revokeObjectURL(url);
    toast.success("SVG exported successfully!");
  };

  const exportJSON = () => {
    const data = {
      paths,
      dimensions,
      scale,
      unit,
      timestamp: new Date().toISOString(),
      quoteId: `Q-${Date.now()}`
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `battery-config-${data.quoteId}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    toast.success("Configuration exported!");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      setIsProcessingOCR(true);
      setOcrProgress(0);

      try {
        const { data: { text } } = await Tesseract.recognize(file, 'eng', {
          logger: m => {
            if (m.status === 'recognizing text') {
              setOcrProgress(Math.round(m.progress * 100));
            }
          }
        });

        // Extract numbers and units from OCR text
        const numberPattern = /(\d+(?:\.\d+)?)\s*(mm|in|cm)/gi;
        const matches = text.match(numberPattern);
        
        if (matches && matches.length > 0) {
          toast.success(`Found ${matches.length} measurements: ${matches.join(', ')}`);
          
          // Auto-populate dimensions
          const newDimensions: Dimension[] = [];
          matches.slice(0, 5).forEach((match, index) => {
            const [, value, foundUnit] = match.match(/(\d+(?:\.\d+)?)\s*(mm|in|cm)/i) || [];
            if (value && foundUnit) {
              const convertedValue = convertUnit(parseFloat(value), foundUnit.toLowerCase(), unit);
              newDimensions.push({
                x1: 50 + index * 100,
                y1: 50,
                x2: 50 + index * 100 + convertedValue,
                y2: 50,
                value: convertedValue.toFixed(2),
                unit: unit
              });
            }
          });
          
          setDimensions(prev => [...prev, ...newDimensions]);
        } else {
          toast.info("No measurements found in the image/document");
        }

      } catch (error) {
        console.error('OCR Error:', error);
        toast.error("Failed to process file. Please try again.");
      } finally {
        setIsProcessingOCR(false);
        setOcrProgress(0);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">2D Technical Drawing Tool</h3>
        
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              variant={selectedTool === 'draw' ? 'default' : 'outline'}
              onClick={() => setSelectedTool('draw')}
              size="sm"
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Draw Shape
            </Button>
            <Button
              variant={selectedTool === 'dimension' ? 'default' : 'outline'}
              onClick={() => setSelectedTool('dimension')}
              size="sm"
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Add Dimension
            </Button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Switch checked={snapToGrid} onCheckedChange={setSnapToGrid} />
              <Label className="text-sm text-slate-700">Snap to Grid</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={snapToAngle} onCheckedChange={setSnapToAngle} />
              <Label className="text-sm text-slate-700">Snap to 15°</Label>
            </div>
            <Select value={unit} onValueChange={(value: 'mm' | 'in') => setUnit(value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm">mm</SelectItem>
                <SelectItem value="in">in</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={finishPath} disabled={!isDrawing} size="sm" className="bg-brand-600 hover:bg-brand-700 text-white">
              Finish Shape
            </Button>
            <Button onClick={clearAll} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>

        {/* File Upload for OCR */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <Label htmlFor="file-upload" className="text-sm font-medium text-slate-900">
            Upload Image/PDF for OCR (Extract Dimensions)
          </Label>
          <div className="mt-2 flex items-center gap-4">
            <Input
              id="file-upload"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="flex-1"
            />
            {isProcessingOCR && (
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brand-600 h-2 rounded-full transition-all"
                    style={{ width: `${ocrProgress}%` }}
                  />
                </div>
                <span className="text-sm text-slate-700">{ocrProgress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* SVG Canvas */}
        <div className="border border-gray-200 rounded-lg bg-white overflow-auto">
          <svg
            ref={svgRef}
            width="800"
            height="600"
            viewBox="0 0 800 600"
            onClick={handleSVGClick}
            className="cursor-crosshair"
            style={{ transform: `scale(${scale})` }}
          >
            {/* Grid Pattern */}
            {snapToGrid && (
              <defs>
                <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                  <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
            )}
            {snapToGrid && <rect width="100%" height="100%" fill="url(#grid)" />}

            {/* Scale Indicator */}
            <g transform="translate(20, 20)">
              <line x1="0" y1="0" x2="100" y2="0" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="50" y="-5" textAnchor="middle" fontSize="12" fill="#374151" className="text-slate-700">
                {unit === 'mm' ? '100mm' : '3.94in'} (Scale: {scale}x)
              </text>
            </g>

            {/* Arrow markers for dimensions */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
              </marker>
            </defs>

            {/* Completed Paths */}
            {paths.map((path, pathIndex) => (
              <g key={pathIndex}>
                <polyline
                  points={path.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#0E4ECF"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Show vertices */}
                {path.map((point, pointIndex) => (
                  <circle
                    key={pointIndex}
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#0E4ECF"
                  />
                ))}
              </g>
            ))}

            {/* Current Path Being Drawn */}
            {currentPath.length > 0 && (
              <g>
                <polyline
                  points={currentPath.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#0E4ECF"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeDasharray="5,5"
                />
                {currentPath.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#0E4ECF"
                  />
                ))}
              </g>
            )}

            {/* Dimensions */}
            {dimensions.map((dim, index) => (
              <g key={index}>
                <line
                  x1={dim.x1}
                  y1={dim.y1}
                  x2={dim.x2}
                  y2={dim.y2}
                  stroke="#374151"
                  strokeWidth="1"
                  markerStart="url(#arrowhead)"
                  markerEnd="url(#arrowhead)"
                />
                <rect
                  x={(dim.x1 + dim.x2) / 2 - 25}
                  y={(dim.y1 + dim.y2) / 2 - 10}
                  width="50"
                  height="20"
                  fill="white"
                  stroke="#374151"
                  strokeWidth="1"
                  rx="2"
                />
                <text
                  x={(dim.x1 + dim.x2) / 2}
                  y={(dim.y1 + dim.y2) / 2 + 3}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#374151"
                  className="text-slate-700"
                >
                  {dim.value}{dim.unit}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center justify-between mt-4">
          <div className="flex gap-2 items-center">
            <Label className="text-slate-700">Scale:</Label>
            <Input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-slate-700">{scale}x</span>
          </div>

          <div className="flex gap-2">
            <Button onClick={exportSVG} size="sm" variant="outline">
              <Download className="w-4 h-4 mr-1" />
              Export SVG
            </Button>
            <Button onClick={exportJSON} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-1" />
              Export Config
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-slate-600">
          <p>Click to start drawing • Right-click or press Finish to complete shapes • Use OCR to extract dimensions from uploaded files</p>
        </div>
      </Card>
    </div>
  );
};