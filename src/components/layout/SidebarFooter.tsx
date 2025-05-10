
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeDollarSign, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SidebarFooter = () => {
  const { isTrialActive, isSubscribed, profile } = useAuth();
  
  // Only show the upgrade button for users who are:
  // 1. In their trial period OR
  // 2. Not subscribed AND not in development mode
  const showUpgradeButton = (isTrialActive || !isSubscribed) && profile;
  
  if (!showUpgradeButton) {
    return null;
  }
  
  return (
    <div className="p-2">
      <Button 
        variant="outline"
        asChild
        className="w-full h-8 bg-[#FEF7CD] hover:bg-[#FEF7CD]/80 text-[#F97316] border-[#F97316]/20 hover:border-[#F97316]"
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
