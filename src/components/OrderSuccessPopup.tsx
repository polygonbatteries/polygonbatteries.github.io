import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageCircle, Home, ArrowRight } from "lucide-react";
import { OrderData } from "./OrderWizard";
import { PostPurchaseChat } from "./PostPurchaseChat";

interface OrderSuccessPopupProps {
  orderData: OrderData;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessPopup = ({ orderData, isOpen, onClose }: OrderSuccessPopupProps) => {
  const [showChat, setShowChat] = useState(false);
  const [orderId] = useState(() => `PB-${Date.now().toString().slice(-6)}`);

  useEffect(() => {
    if (isOpen) {
      // Auto-open chat after 3 seconds
      const timer = setTimeout(() => {
        setShowChat(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpenChat = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  const handleGoHome = () => {
    onClose();
    window.location.href = '/';
  };

  return (
    <>
      <Dialog open={isOpen && !showChat} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Order Confirmed!</h3>
              <p className="text-muted-foreground">
                Thank you for choosing Polygon Batteries
              </p>
            </div>

            <Card className="p-4 bg-primary/10 border-primary/30 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span className="font-mono">#{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Installation Type:</span>
                  <Badge variant="outline">
                    {orderData.installationType === 'home' ? 'Residential' : 'Commercial'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Cost:</span>
                  <span className="font-bold text-primary">
                    ${orderData.calculatedCost.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">What's Next?</span>
              </div>
              <p className="text-sm text-blue-800">
                You'll be connected with a certified electrician to schedule your installation. 
                Your chat will open automatically in a few seconds.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleOpenChat} className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Open Chat
              </Button>
              <Button onClick={handleGoHome} variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              Confirmation email sent • Order will auto-open chat in 3 seconds
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PostPurchaseChat
        orderData={orderData}
        orderId={orderId}
        isOpen={showChat}
        onClose={handleCloseChat}
      />
    </>
  );
};