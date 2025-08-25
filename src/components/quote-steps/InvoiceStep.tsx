import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, Zap, MapPin, Clock } from "lucide-react";
import { OrderData as QuoteData } from "../OrderWizard";

interface InvoiceStepProps {
  quoteData: QuoteData;
  updateQuoteData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const InvoiceStep = ({ quoteData, onNext, onPrev }: InvoiceStepProps) => {
  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Review Your Quote</h3>
          <p className="text-muted-foreground">
            Please review all details before proceeding to payment.
          </p>
        </div>

        {/* Installation Type */}
        <Card className="p-4 bg-secondary/30">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-semibold text-foreground">Installation Type</h4>
              <p className="text-muted-foreground">
                {quoteData.installationType === 'home' ? 'Residential' : 'Commercial'} Backup Power System
              </p>
            </div>
            <Badge className="ml-auto bg-primary/20 text-primary border-primary/30">
              {quoteData.installationType === 'home' ? 'Residential' : 'Commercial'}
            </Badge>
          </div>
        </Card>

        {/* Energy Usage */}
        <Card className="p-4 bg-secondary/30">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-semibold text-foreground">Energy Usage</h4>
              <p className="text-muted-foreground">
                {quoteData.kwhUsage} kWh per month
              </p>
            </div>
          </div>
        </Card>

        {/* Backup Duration */}
        <Card className="p-4 bg-secondary/30">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-semibold text-foreground">Backup Duration</h4>
              <p className="text-muted-foreground">
                {quoteData.backupDuration === 'custom' 
                  ? `${quoteData.customDuration} hours` 
                  : quoteData.backupDuration}
              </p>
            </div>
          </div>
        </Card>

        {/* Installation Address */}
        <Card className="p-4 bg-secondary/30">
          <div className="flex items-center space-x-3">
            <MapPin className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-semibold text-foreground">Installation Address</h4>
              <p className="text-muted-foreground">
                {quoteData.address.street}<br />
                {quoteData.address.city}, {quoteData.address.state} {quoteData.address.zipCode}
              </p>
            </div>
          </div>
        </Card>

        {/* Cost Breakdown */}
        <Card className="p-6 bg-primary/10 border-primary/30">
          <h4 className="text-lg font-semibold text-foreground mb-4">Cost Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Battery System:</span>
              <span className="font-medium text-foreground">
                ${(quoteData.calculatedCost.totalCost - quoteData.calculatedCost.laborCost - quoteData.calculatedCost.inverterCost - quoteData.calculatedCost.materialsCost).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Inverter System:</span>
              <span className="font-medium text-foreground">
                ${quoteData.calculatedCost.inverterCost.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Professional Installation:</span>
              <span className="font-medium text-foreground">
                ${quoteData.calculatedCost.laborCost.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Materials & Components:</span>
              <span className="font-medium text-foreground">
                ${quoteData.calculatedCost.materialsCost.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total:</span>
                <span className="text-primary">
                  ${quoteData.calculatedCost.totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Terms */}
        <Card className="p-4 bg-secondary/30">
          <h4 className="font-semibold text-foreground mb-2">Included in Your Installation:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Professional design and engineering</li>
            <li>• All required permits and inspections</li>
            <li>• LiFePO4 battery system with 10-year warranty</li>
            <li>• Pure sine wave inverter system</li>
            <li>• Professional electrician installation</li>
            <li>• System commissioning and testing</li>
            <li>• 2-year installation warranty</li>
            <li>• Free system maintenance guide</li>
          </ul>
        </Card>

        <div className="flex justify-between">
          <Button onClick={onPrev} variant="industrial" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button 
            onClick={onNext} 
            variant="electric"
            size="lg"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </Card>
  );
};