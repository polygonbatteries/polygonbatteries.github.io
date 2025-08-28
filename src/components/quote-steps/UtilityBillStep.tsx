import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Battery } from "lucide-react";
import { OrderData as QuoteData } from "../OrderWizard";

interface UtilityBillStepProps {
  quoteData: QuoteData;
  updateQuoteData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
}

export const UtilityBillStep = ({ quoteData, updateQuoteData, onNext }: UtilityBillStepProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedKwh, setExtractedKwh] = useState<number | null>(null);
  const [manualKwh, setManualKwh] = useState(quoteData.manualKwh || '');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsProcessing(true);
      
      // Simulate OCR processing (in real app, this would call an OCR service)
      setTimeout(() => {
        // Mock extracted kWh value
        const mockKwh = Math.floor(Math.random() * 1000) + 500;
        setExtractedKwh(mockKwh);
        updateQuoteData({ kwhUsage: mockKwh });
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handleManualKwhChange = (value: string) => {
    setManualKwh(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateQuoteData({ kwhUsage: numValue, manualKwh: numValue });
    }
  };

  const canProceed = quoteData.kwhUsage > 0;

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <Battery className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Upload Your Electric Utility Bill</h3>
          <p className="text-muted-foreground">
            We'll analyze your energy usage to recommend the right backup power solution.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <Label className="text-foreground font-medium">Upload Utility Bill (PDF, JPG, PNG)</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="utility-bill"
            />
            <label htmlFor="utility-bill" className="cursor-pointer">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-2">
                Click to upload your utility bill
              </p>
              <p className="text-sm text-muted-foreground">
                PDF, JPG, or PNG files accepted
              </p>
            </label>
          </div>

          {file && (
            <Card className="p-4 bg-secondary/50">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {isProcessing ? 'Analyzing...' : 'Ready to process'}
                  </p>
                </div>
                {isProcessing && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                )}
              </div>
            </Card>
          )}

          {extractedKwh && (
            <Card className="p-4 bg-primary/10 border-primary/30">
              <div className="flex items-center space-x-3">
                <Battery className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Extracted Usage: {extractedKwh} kWh
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Monthly energy consumption detected from your bill
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Manual Input Option */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="manual-kwh" className="text-foreground font-medium">
            Monthly kWh Usage (Optional)
          </Label>
          <Input
            id="manual-kwh"
            type="number"
            placeholder="Enter your monthly kWh usage"
            value={manualKwh}
            onChange={(e) => handleManualKwhChange(e.target.value)}
            className="bg-background"
          />
          <p className="text-sm text-muted-foreground">
            You can find this on your utility bill, usually listed as "kWh used this month"
          </p>
        </div>

        {/* Current Usage Display */}
        {quoteData.kwhUsage > 0 && (
          <Card className="p-4 bg-secondary/30">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current Usage for Calculation</p>
              <p className="text-2xl font-bold text-foreground">
                {quoteData.kwhUsage} kWh
              </p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
          </Card>
        )}

        {/* Next Button */}
        <div className="flex justify-end">
          <Button 
            onClick={onNext} 
            disabled={!canProceed}
            variant="electric"
            size="lg"
          >
            Next: Select Backup Duration
          </Button>
        </div>
      </div>
    </Card>
  );
};