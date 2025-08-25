import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { UtilityBillStep } from "./quote-steps/UtilityBillStep";
import { BackupDurationStep } from "./quote-steps/BackupDurationStep";
import { AddressStep } from "./quote-steps/AddressStep";
import { InvoiceStep } from "./quote-steps/InvoiceStep";
import { CheckoutStep } from "./quote-steps/CheckoutStep";

export interface OrderData {
  installationType: 'home' | 'business';
  kwhUsage: number;
  manualKwh?: number;
  backupDuration: string;
  customDuration?: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  calculatedCost: {
    batteryAhNeeded?: number;
    laborCost: number;
    inverterCost: number;
    materialsCost: number;
    totalCost: number;
  };
}

interface OrderWizardProps {
  installationType: 'home' | 'business';
}

const steps = [
  { id: 'utility', title: 'Utility Bill', description: 'Upload your electric bill' },
  { id: 'duration', title: 'Backup Duration', description: 'Select backup time needed' },
  { id: 'address', title: 'Installation Address', description: 'Where to install' },
  { id: 'invoice', title: 'Review Order', description: 'Review your order' },
  { id: 'checkout', title: 'Payment', description: 'Complete your order' },
];

export const OrderWizard = ({ installationType }: OrderWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderData, setOrderData] = useState<OrderData>({
    installationType,
    kwhUsage: 0,
    backupDuration: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    calculatedCost: {
      laborCost: 0,
      inverterCost: 0,
      materialsCost: 0,
      totalCost: 0,
    },
  });

  const updateOrderData = (data: Partial<OrderData>) => {
    setOrderData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <UtilityBillStep
            quoteData={orderData}
            updateQuoteData={updateOrderData}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <BackupDurationStep
            quoteData={orderData}
            updateQuoteData={updateOrderData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <AddressStep
            quoteData={orderData}
            updateQuoteData={updateOrderData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <InvoiceStep
            quoteData={orderData}
            updateQuoteData={updateOrderData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <CheckoutStep
            quoteData={orderData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="text-sm"
            >
              ← Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-electric rounded-full animate-electric-pulse"></div>
              <h1 className="text-2xl font-bold text-foreground">Polygon Batteries</h1>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            {installationType === 'home' ? 'Residential' : 'Commercial'} Installation Order
          </Badge>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {steps[currentStep].title}
              </h2>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>
          </div>
        </Card>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};