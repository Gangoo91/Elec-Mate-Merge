
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Target } from "lucide-react";

const BusinessCustomersHeader = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Customer Acquisition for Electricians</h1>
      </div>
      
      <Alert className="border-elec-yellow/20 bg-elec-yellow/5">
        <AlertTitle className="flex items-center gap-2">
          <Target className="h-4 w-4" /> Strategic Approach
        </AlertTitle>
        <AlertDescription>
          Building a solid customer base requires both strategy and consistency. This comprehensive guide offers proven methods for UK electrical contractors to attract, convert and retain valuable customers.
        </AlertDescription>
      </Alert>
    </>
  );
};

export default BusinessCustomersHeader;
