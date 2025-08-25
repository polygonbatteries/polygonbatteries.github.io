import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { OrderData as QuoteData } from "../OrderWizard";

interface CheckoutStepProps {
  quoteData: QuoteData;
  onPrev: () => void;
}

export const CheckoutStep = ({ quoteData, onPrev }: CheckoutStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  if (isComplete) {
    return (
      <Card className="p-8 bg-card/80 backdrop-blur-sm text-center">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-foreground mb-4">Order Confirmed!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for choosing Polygon Batteries. We'll contact you within 24 hours to schedule your installation.
        </p>
        <Card className="p-4 bg-primary/10 border-primary/30 mb-6">
          <p className="font-semibold text-foreground">Order #PB-{Date.now().toString().slice(-6)}</p>
          <p className="text-sm text-muted-foreground">Confirmation email sent to your address</p>
        </Card>
        <Button variant="electric" size="lg" onClick={() => window.location.href = '/'}>
          Return to Home
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Secure Payment</h3>
          <p className="text-muted-foreground">
            Complete your backup power system order.
          </p>
        </div>

        {/* Order Summary */}
        <Card className="p-4 bg-secondary/30">
          <h4 className="font-semibold text-foreground mb-3">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{quoteData.installationType === 'home' ? 'Residential' : 'Commercial'} Installation:</span>
              <span className="font-medium text-foreground">${quoteData.calculatedCost.totalCost.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-2">
              <div className="flex justify-between font-bold">
                <span className="text-foreground">Total:</span>
                <span className="text-primary">${quoteData.calculatedCost.totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Form */}
        <div className="space-y-4">
          <div>
            <Label className="text-foreground font-medium">Payment Method</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Card 
                className={`p-3 cursor-pointer transition-all ${paymentMethod === 'credit' ? 'border-primary bg-primary/10' : 'border-border'}`}
                onClick={() => setPaymentMethod('credit')}
              >
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Credit Card</span>
                </div>
              </Card>
              <Card 
                className={`p-3 cursor-pointer transition-all ${paymentMethod === 'financing' ? 'border-primary bg-primary/10' : 'border-border'}`}
                onClick={() => setPaymentMethod('financing')}
              >
                <div className="flex items-center space-x-2">
                  <Badge className="bg-warning text-warning-foreground">0% APR</Badge>
                  <span className="text-sm font-medium text-foreground">Financing</span>
                </div>
              </Card>
            </div>
          </div>

          {paymentMethod === 'credit' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="text-foreground font-medium">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-foreground font-medium">Expiry Date</Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-foreground font-medium">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="bg-background"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="name" className="text-foreground font-medium">Cardholder Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="bg-background"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'financing' && (
            <Card className="p-4 bg-warning/10 border-warning/30">
              <h4 className="font-semibold text-foreground mb-2">0% APR Financing Available</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Qualify for 0% financing for 12 months on approved credit.
              </p>
              <Button variant="outline" size="sm">
                Apply for Financing
              </Button>
            </Card>
          )}
        </div>

        {/* Security Notice */}
        <Card className="p-3 bg-secondary/30">
          <div className="flex items-center space-x-2">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Your payment information is secure and encrypted
            </span>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button onClick={onPrev} variant="industrial" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            variant="electric"
            size="lg"
          >
            {isProcessing ? 'Processing...' : `Pay $${quoteData.calculatedCost.totalCost.toLocaleString()}`}
          </Button>
        </div>
      </div>
    </Card>
  );
};