import { useParams } from "react-router-dom";
import { QuoteWizard } from "@/components/QuoteWizard";

const QuotePage = () => {
  const { type } = useParams<{ type: 'home' | 'business' }>();
  
  if (!type || (type !== 'home' && type !== 'business')) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Invalid Quote Type</h1>
          <p className="text-muted-foreground">Please select either home or business installation.</p>
        </div>
      </div>
    );
  }

  return <QuoteWizard installationType={type} />;
};

export default QuotePage;