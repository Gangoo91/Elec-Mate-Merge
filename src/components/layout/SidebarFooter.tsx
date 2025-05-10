
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SidebarFooter = () => {
  const { isTrialActive, isSubscribed, profile, subscriptionTier } = useAuth();
  
  // For production, remove the "true ||" to restore conditional visibility
  const showUpgradeButton = (isTrialActive || !isSubscribed) && profile;
  
  if (!profile) {
    return null;
  }
  
  if (isSubscribed) {
    return (
      <div className="p-2 border-t border-green-500/20">
        <div className="flex items-center justify-center gap-1 text-xs text-green-500 bg-green-500/10 py-1 px-2 rounded-md">
          <CheckCircle className="h-3 w-3" />
          <span className="font-medium">{subscriptionTier || 'Active'} Subscription</span>
        </div>
      </div>
    );
  }
  
  if (!showUpgradeButton) {
    return null;
  }
  
  return (
    <div className="p-2 border-t border-elec-yellow/20">
      <Button 
        variant="outline"
        asChild
        className="w-full h-8 bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark font-medium border-elec-yellow/50 hover:border-elec-yellow"
      >
        <Link to="/subscriptions" className="flex items-center justify-center gap-1">
          <Star className="h-4 w-4" />
          <span className="text-xs font-medium">Upgrade</span>
        </Link>
      </Button>
    </div>
  );
};

export default SidebarFooter;
