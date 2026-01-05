
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, CheckCircle, Sparkles, Crown } from "lucide-react";
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
      <div className="p-3 border-t border-white/10">
        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/5 border border-green-500/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-green-500/20">
              <Crown className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-green-400">{subscriptionTier || 'Pro'}</p>
              <p className="text-[10px] text-green-400/70">Active subscription</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showUpgradeButton) {
    return null;
  }

  return (
    <div className="p-3 border-t border-white/10">
      <div className="p-3 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-amber-500/5 border border-elec-yellow/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-elec-yellow/20">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Upgrade to Pro</p>
            <p className="text-[10px] text-white/60">Unlock all features</p>
          </div>
        </div>
        <Button
          asChild
          className="w-full h-9 bg-gradient-to-r from-elec-yellow to-amber-500 hover:from-elec-yellow/90 hover:to-amber-500/90 text-elec-dark font-semibold rounded-lg shadow-lg shadow-elec-yellow/20"
        >
          <Link to="/subscriptions" className="flex items-center justify-center gap-1.5">
            <Star className="h-4 w-4" />
            <span className="text-sm">Upgrade</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SidebarFooter;
