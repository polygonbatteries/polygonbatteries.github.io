import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  MessageCircle, 
  Send, 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  CheckCircle,
  XCircle,
  DollarSign,
  User,
  Wrench
} from "lucide-react";
import { OrderData } from "./OrderWizard";
import { useAuth } from "./AuthProvider";

interface Message {
  id: string;
  sender: 'customer' | 'electrician' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'scheduling' | 'status' | 'payment';
}

interface PostPurchaseChatProps {
  orderData: OrderData;
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

type OrderStatus = 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'accepted' | 'rated';

export const PostPurchaseChat = ({ orderData, orderId, isOpen, onClose }: PostPurchaseChatProps) => {
  const { user, loading } = useAuth();
  const [authRequired, setAuthRequired] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample electrician data (will be from database later)
  const electrician = {
    name: "Mike Thompson",
    rating: 4.8,
    completedJobs: 156,
    phone: "(555) 123-4567"
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        sender: 'system',
        content: `Welcome! Your order #${orderId} has been confirmed. You've been assigned electrician ${electrician.name}. Please schedule your installation below.`,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [orderId, electrician.name, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'customer',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate electrician response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'll get back to you shortly.",
        "I'll be available for installation. Let me know what works best for you.",
        "Perfect! I'll make sure everything is ready for the installation.",
        "Great question! I'll bring all necessary equipment and permits."
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'electrician',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, response]);
    }, 1000 + Math.random() * 2000);
  };

  const scheduleInstallation = () => {
    if (!selectedTimeSlot) return;

    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    setScheduledDate(nextWeek);
    setOrderStatus('scheduled');

    const scheduleMessage: Message = {
      id: Date.now().toString(),
      sender: 'system',
      content: `Installation scheduled for ${nextWeek.toLocaleDateString()} at ${selectedTimeSlot}. Your electrician will arrive within a 2-hour window.`,
      timestamp: new Date(),
      type: 'scheduling'
    };

    setMessages(prev => [...prev, scheduleMessage]);
  };

  const markCompleted = () => {
    setOrderStatus('completed');
    const completedMessage: Message = {
      id: Date.now().toString(),
      sender: 'electrician',
      content: "Installation has been completed! Please review the work and confirm if everything meets your expectations.",
      timestamp: new Date(),
      type: 'status'
    };
    setMessages(prev => [...prev, completedMessage]);
  };

  const acceptWork = () => {
    setOrderStatus('accepted');
    const acceptMessage: Message = {
      id: Date.now().toString(),
      sender: 'system',
      content: "Payment has been released to the electrician. Thank you for using Polygon Batteries!",
      timestamp: new Date(),
      type: 'payment'
    };
    setMessages(prev => [...prev, acceptMessage]);
  };

  const rejectWork = () => {
    setOrderStatus('scheduled');
    const rejectMessage: Message = {
      id: Date.now().toString(),
      sender: 'system',
      content: "Payment is on hold. Please discuss the issues with your electrician to schedule a fix.",
      timestamp: new Date(),
      type: 'status'
    };
    setMessages(prev => [...prev, rejectMessage]);
  };

  const submitRating = () => {
    setOrderStatus('rated');
    const ratingMessage: Message = {
      id: Date.now().toString(),
      sender: 'system',
      content: `Thank you for rating ${electrician.name} ${rating} stars! Your feedback helps improve our service.`,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, ratingMessage]);
  };

  const getStatusBadge = () => {
    const statusConfig = {
      pending: { variant: 'outline' as const, text: 'Pending', className: 'border-warning text-warning' },
      scheduled: { variant: 'outline' as const, text: 'Scheduled', className: 'border-primary text-primary' },
      'in-progress': { variant: 'outline' as const, text: 'In Progress', className: 'border-electric-cyan text-electric-cyan' },
      completed: { variant: 'outline' as const, text: 'Completed', className: 'border-success text-success' },
      accepted: { variant: 'default' as const, text: 'Accepted & Paid', className: 'bg-success text-white' },
      rated: { variant: 'default' as const, text: 'Rated', className: 'bg-primary text-primary-foreground' }
    };

    const config = statusConfig[orderStatus];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.text}
      </Badge>
    );
  };

  // Handle authentication requirement
  const handleClose = () => {
    if (!user) {
      setAuthRequired(true);
      return;
    }
    onClose();
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md h-40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!user || authRequired) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Sign In Required</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center space-y-4">
            <User className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">
              Please sign in to access your order chat and track your installation progress.
            </p>
            <p className="text-sm text-muted-foreground">
              This ensures your conversation is saved and secure.
            </p>
            <Button onClick={() => {
              setAuthRequired(false);
              onClose();
            }} className="w-full">
              Sign In to Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Order #{orderId} - Installation Chat
            </div>
            {getStatusBadge()}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 space-y-4">
          {/* Customer Address */}
          <Card className="p-4 bg-secondary/20">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">Installation Address:</span>
              <span>{orderData.address.street}, {orderData.address.city}, {orderData.address.state} {orderData.address.zipCode}</span>
            </div>
          </Card>

          {/* Electrician Info */}
          <Card className="p-4 bg-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-base">{electrician.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span>{electrician.rating} • {electrician.completedJobs} jobs completed</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">{electrician.phone}</Badge>
            </div>
          </Card>

          {/* Scheduling Section */}
          {orderStatus === 'pending' && (
            <Card className="p-4">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Installation
              </h4>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className="text-sm py-2"
                  >
                    {slot}
                  </Button>
                ))}
              </div>
              <Button 
                onClick={scheduleInstallation} 
                disabled={!selectedTimeSlot}
                className="w-full"
              >
                Schedule for Next Week
              </Button>
            </Card>
          )}

          {/* Scheduled Date Display */}
          {scheduledDate && orderStatus !== 'pending' && (
            <Card className="p-4 bg-primary/10 border-primary/20">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">Scheduled:</span>
                <span>{scheduledDate.toLocaleDateString()} at {selectedTimeSlot}</span>
              </div>
            </Card>
          )}

          {/* Messages Area */}
          <Card className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                    message.sender === 'customer'
                      ? 'bg-primary text-primary-foreground'
                      : message.sender === 'system'
                      ? 'bg-accent text-accent-foreground border'
                      : 'bg-card text-card-foreground border'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'customer' && <User className="h-3 w-3" />}
                    {message.sender === 'electrician' && <Wrench className="h-3 w-3" />}
                    <span className="text-xs font-medium capitalize">
                      {message.sender === 'system' ? 'System' : message.sender}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </Card>
        </div>

        <div className="p-6 pt-4 space-y-4 border-t bg-background">
          {/* Action Buttons */}
          {orderStatus === 'scheduled' && (
            <Button onClick={markCompleted} className="w-full" variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Installation as Completed (Electrician)
            </Button>
          )}

          {orderStatus === 'completed' && (
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={acceptWork} className="flex items-center gap-2" variant="default">
                <CheckCircle className="h-4 w-4" />
                Accept & Release Payment
              </Button>
              <Button onClick={rejectWork} variant="destructive" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Reject - Schedule Fix
              </Button>
            </div>
          )}

          {orderStatus === 'accepted' && (
            <Card className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Rate Your Experience
              </h4>
              <div className="flex gap-1 mb-3 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating ? 'fill-warning text-warning' : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Share your feedback (optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mb-3"
              />
              <Button onClick={submitRating} disabled={rating === 0} className="w-full">
                Submit Rating
              </Button>
            </Card>
          )}

          {/* Message Input */}
          {orderStatus !== 'rated' && (
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};