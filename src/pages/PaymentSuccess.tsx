
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");
  const { checkSubscriptionStatus } = useAuth();

  // Update subscription status when payment completes
  useEffect(() => {
    // Give Stripe some time to process the payment before checking
    const timer = setTimeout(() => {
      checkSubscriptionStatus();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in">
      <Card className="border border-green-500/30 bg-elec-gray/70 p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-500/20 p-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for subscribing to {planId ? planId.split('-')[0] : 'ElecMate'}.
          Your account has been updated and you now have full access to all features.
        </p>
        
        <div className="space-y-4">
          <p className="font-medium">What happens next?</p>
          <ul className="text-sm text-muted-foreground space-y-2 mb-6">
            <li>Your subscription is now active</li>
            <li>You have full access to all premium content</li>
            <li>You can manage your subscription from your account settings</li>
          </ul>
        </div>
        
        <div className="space-x-4">
          <Button asChild>
            <Link to="/">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/subscriptions">Manage Subscription</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
