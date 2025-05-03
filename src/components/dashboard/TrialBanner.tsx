
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';

const TrialBanner = () => {
  const { isTrialActive, trialEndsAt, isSubscribed, isDevelopmentMode } = useAuth();
  
  // Calculate days remaining in trial
  const getDaysRemaining = () => {
    if (!trialEndsAt) return 0;
    
    const now = new Date();
    const diffTime = trialEndsAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };
  
  // If user is subscribed or in dev mode, don't show trial banner
  if (isSubscribed || isDevelopmentMode) {
    return null;
  }
  
  const daysRemaining = getDaysRemaining();
  
  return (
    <Card className={`border-${isTrialActive ? 'elec-yellow' : 'red-500'}/20 bg-elec-gray mb-6`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">{isTrialActive ? 'Free Trial Mode' : 'Trial Expired'}</h3>
            <p className="text-sm text-muted-foreground">
              {isTrialActive 
                ? `You're currently accessing Elec-Mate in trial mode. ${daysRemaining} days remaining.`
                : 'Your free trial has ended. Please subscribe to continue using Elec-Mate.'}
            </p>
          </div>
          <Button asChild>
            <Link to="/subscriptions">
              {isTrialActive ? 'Upgrade Now' : 'Subscribe Now'}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrialBanner;
