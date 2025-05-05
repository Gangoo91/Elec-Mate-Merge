
import React from "react";
import Subsection1_1 from "./content/Subsection1_1";
import Subsection1_2 from "./content/Subsection1_2";
import Subsection1_3 from "./content/Subsection1_3";
import Subsection2_1 from "./content/Subsection2_1";
import Subsection2_2 from "./content/Subsection2_2";
import Subsection2_3 from "./content/Subsection2_3";
import Subsection3_1 from "./content/Subsection3_1";
import Subsection3_2 from "./content/Subsection3_2";
import Subsection3_3 from "./content/Subsection3_3";
import Subsection4_1 from "./content/Subsection4_1";
import Subsection5_1 from "./content/Subsection5_1";
import Subsection6_1 from "./content/Subsection6_1";
import ElectricalSymbolsDisplay from "./ElectricalSymbolsDisplay";
import InteractiveLightDemo from "./InteractiveLightDemo";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

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
  const premiumSections = ["3.1", "3.2", "3.3", "4.1", "5.1", "6.1"];
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
  
  // Render the appropriate content based on subsection ID
  const renderContentBySubsectionId = () => {
    switch (subsectionId) {
      case "1.1":
        return (
          <>
            <Subsection1_1 
              subsectionId={subsectionId} 
              isCompleted={isCompleted} 
              markAsComplete={markAsComplete}
            />
          </>
        );
      case "1.2":
        return (
          <Subsection1_2 
            subsectionId={subsectionId}
            isCompleted={isCompleted}
            markAsComplete={markAsComplete}
          />
        );
      case "1.3":
        return (
          <Subsection1_3 
            subsectionId={subsectionId}
            isCompleted={isCompleted}
            markAsComplete={markAsComplete}
          />
        );
      case "2.1":
        return (
          <Subsection2_1 
            subsectionId={subsectionId}
            isCompleted={isCompleted}
            markAsComplete={markAsComplete}
          />
        );
      case "2.2":
        return (
          <>
            <Subsection2_2 
              subsectionId={subsectionId}
              isCompleted={isCompleted}
              markAsComplete={markAsComplete}
            />
            <ElectricalSymbolsDisplay subsectionId={subsectionId} />
          </>
        );
      case "2.3":
        return (
          <Subsection2_3 
            subsectionId={subsectionId}
            isCompleted={isCompleted}
            markAsComplete={markAsComplete}
          />
        );
      case "3.1":
        return (
          <Subsection3_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "3.2":
        return (
          <Subsection3_2
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "3.3":
        return (
          <Subsection3_3
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "4.1":
        return (
          <Subsection4_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "5.1":
        return (
          <Subsection5_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "6.1":
        return (
          <Subsection6_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      default:
        return <p>Content for subsection {subsectionId} is not yet available.</p>;
    }
  };

  return (
    <div className="space-y-8">
      {renderContentBySubsectionId()}
    </div>
  );
};

export default SubsectionLearningContent;
