import { SmartQuoteBuilder } from "@/components/electrician/quote-builder/SmartQuoteBuilder";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SmartQuoteBuilderPage = () => {
  return (
    <div className="min-h-screen bg-elec-grey text-foreground">
      <div className="w-full mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Navigation */}
        <div className="flex justify-start">
          <Link to="/electrician/quote-builder">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Quote Builder
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <SmartQuoteBuilder />
      </div>
    </div>
  );
};

export default SmartQuoteBuilderPage;
