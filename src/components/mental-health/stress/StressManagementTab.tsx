
import InteractiveStressAssessment from "./InteractiveStressAssessment";
import BreathingExercise from "./BreathingExercise";
import ApprenticeScenarios from "./ApprenticeScenarios";
import StressSignsCards from "./StressSignsCards";
import QuickTips from "./QuickTips";
import AdvancedTechniques from "./AdvancedTechniques";
import ResourcesSection from "./ResourcesSection";
import SupportCallout from "./SupportCallout";

const StressManagementTab = () => {
  return (
    <div className="space-y-6">
      <InteractiveStressAssessment />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BreathingExercise />
        <ApprenticeScenarios />
      </div>
      
      <StressSignsCards />
      
      <div className="space-y-6">
        <QuickTips />
        <AdvancedTechniques />
      </div>
      
      <ResourcesSection />
      
      <SupportCallout />
    </div>
  );
};

export default StressManagementTab;
