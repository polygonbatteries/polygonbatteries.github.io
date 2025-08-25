import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, ArrowLeft } from "lucide-react";
import { OrderData as QuoteData } from "../OrderWizard";

interface AddressStepProps {
  quoteData: QuoteData;
  updateQuoteData: (data: Partial<QuoteData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AddressStep = ({ quoteData, updateQuoteData, onNext, onPrev }: AddressStepProps) => {
  const [address, setAddress] = useState(quoteData.address);

  const handleAddressChange = (field: keyof typeof address, value: string) => {
    const newAddress = { ...address, [field]: value };
    setAddress(newAddress);
    updateQuoteData({ address: newAddress });
  };

  const canProceed = address.street && address.city && address.state && address.zipCode;

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Installation Address</h3>
          <p className="text-muted-foreground">
            Where would you like the backup power system installed?
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="street" className="text-foreground font-medium">Street Address</Label>
            <Input
              id="street"
              type="text"
              placeholder="123 Main Street"
              value={address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-foreground font-medium">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="Your City"
                value={address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                className="bg-background"
              />
            </div>
            <div>
              <Label htmlFor="state" className="text-foreground font-medium">State</Label>
              <Input
                id="state"
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="zipCode" className="text-foreground font-medium">ZIP Code</Label>
            <Input
              id="zipCode"
              type="text"
              placeholder="12345"
              value={address.zipCode}
              onChange={(e) => handleAddressChange('zipCode', e.target.value)}
              className="bg-background"
            />
          </div>
        </div>

        {canProceed && (
          <Card className="p-4 bg-secondary/30">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Installation Address:</h4>
              <p className="text-sm text-muted-foreground">
                {address.street}<br />
                {address.city}, {address.state} {address.zipCode}
              </p>
            </div>
          </Card>
        )}

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
            Next: Review Quote
          </Button>
        </div>
      </div>
    </Card>
  );
};