
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { Brain } from "lucide-react";
import StressProgressBar from "@/components/mental-health/stress/StressProgressBar";
import ApprenticeStressors from "@/components/mental-health/stress/ApprenticeStressors";
import StressSignsCards from "@/components/mental-health/stress/StressSignsCards";
import QuickTips from "@/components/mental-health/stress/QuickTips";
import AdvancedTechniques from "@/components/mental-health/stress/AdvancedTechniques";
import SupportCallout from "@/components/mental-health/stress/SupportCallout";
import ResourcesSection from "@/components/mental-health/stress/ResourcesSection";

const StressManagement = () => {
  return (
    <MentalHealthPageLayout
      title="Managing Workplace Stress"
      description="Techniques and resources for handling stress on job sites and during training"
      icon={<Brain className="h-6 w-6 text-elec-yellow" />}
      color="yellow"
    >
      <div className="space-y-6">
        <StressProgressBar />
        <ApprenticeStressors />
        <StressSignsCards />
        <QuickTips />
        <AdvancedTechniques />
        <SupportCallout />
        <ResourcesSection />
      </div>
    </MentalHealthPageLayout>
  );
};

export default StressManagement;
