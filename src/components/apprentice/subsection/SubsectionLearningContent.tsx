
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import SubsectionRenderer from "./SubsectionRenderer";

type SubsectionLearningContentProps = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const SubsectionLearningContent = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionLearningContentProps) => {
  const { isSubscribed, isTrialActive, isDevelopmentMode } = useAuth();
  
  // Check if content should be locked (not subscribed, trial expired, and not in dev mode)
  const isContentLocked = !isSubscribed && !isTrialActive && !isDevelopmentMode;
  
  // Premium sections that require subscription after trial
  const premiumSections = ["3.1", "3.2", "3.3", "4.1", "4.2", "4.3", "5.2", "5.3", "6.2", "6.3", "7.2", "7.3", "8.1", "8.2", "8.3", "9.1", "9.2", "9.3", "10.1", "10.2", "10.3"];
  const isPremiumContent = premiumSections.includes(subsectionId);
  
  // If content is locked and this is premium content, show subscription prompt
  if (isContentLocked && isPremiumContent) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-elec-yellow/20 bg-elec-dark/50 rounded-lg space-y-6 text-center">
        <Lock size={48} className="text-elec-yellow/60" />
        <h3 className="text-xl font-semibold text-elec-yellow">Premium Content</h3>
        <p className="text-elec-light/80 max-w-md">
          This advanced electrical training content is available with a subscription.
          Upgrade to continue your learning and access all premium materials.
        </p>
        <Button asChild className="mt-2">
          <Link to="/subscriptions">Subscribe Now</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <SubsectionRenderer 
        subsectionId={subsectionId}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    </div>
  );
};

export default SubsectionLearningContent;
