import { useParams } from "react-router-dom";
import { OrderWizard } from "@/components/OrderWizard";

const OrderPage = () => {
  const { type } = useParams<{ type: string }>();
  
  if (!type || (type !== 'home' && type !== 'business')) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Invalid order type</p>
      </div>
    );
  }

  const installationType = type as 'home' | 'business';
  
  return <OrderWizard installationType={installationType} />;
};

export default OrderPage;