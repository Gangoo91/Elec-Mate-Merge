
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SidebarFooter = () => {
  const { isTrialActive, isSubscribed, profile } = useAuth();
  
  // For testing/development - make button always visible
  // In production, uncomment the line below and remove the "true ||" to restore conditional visibility
  const showUpgradeButton = true || (isTrialActive || !isSubscribed) && profile;
  
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
