
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveStressAssessment from "@/components/mental-health/stress/InteractiveStressAssessment";
import BreathingExercise from "@/components/mental-health/stress/BreathingExercise";
import ApprenticeScenarios from "@/components/mental-health/stress/ApprenticeScenarios";
import StressSignsCards from "@/components/mental-health/stress/StressSignsCards";
import ApprenticeStressors from "@/components/mental-health/stress/ApprenticeStressors";
import QuickTips from "@/components/mental-health/stress/QuickTips";
import AdvancedTechniques from "@/components/mental-health/stress/AdvancedTechniques";
import ResourcesSection from "@/components/mental-health/stress/ResourcesSection";
import SupportCallout from "@/components/mental-health/stress/SupportCallout";

const StressManagement = () => {
  return (
    <MentalHealthPageLayout
      title="Managing Workplace Stress"
      description="Techniques for handling stress on job sites and during training"
      icon={<AlertTriangle className="h-6 w-6 text-orange-400" />}
      color="orange"
    >
      <div className="space-y-6">
        <InteractiveStressAssessment />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BreathingExercise />
          <ApprenticeScenarios />
        </div>

        <ApprenticeStressors />

        <StressSignsCards />

        <Card className="border-orange-500/20 bg-white/5">
          <CardHeader>
            <CardTitle className="text-orange-400">Stress Management Techniques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <QuickTips />
            <AdvancedTechniques />
          </CardContent>
        </Card>

        <ResourcesSection />

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow">When to Seek Additional Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-red-500/20 rounded-lg p-4 bg-red-500/5">
                <h4 className="font-semibold text-red-400 mb-2">Warning Signs</h4>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>• Persistent feelings of overwhelm</li>
                  <li>• Physical symptoms affecting work performance</li>
                  <li>• Difficulty sleeping for several nights</li>
                  <li>• Withdrawing from colleagues and friends</li>
                  <li>• Increased irritability or mood swings</li>
                </ul>
              </div>

              <div className="border border-blue-500/20 rounded-lg p-4 bg-blue-500/5">
                <h4 className="font-semibold text-blue-400 mb-2">Who to Contact</h4>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>• Your line manager or supervisor</li>
                  <li>• Training provider or college support team</li>
                  <li>• GP or occupational health service</li>
                  <li>• Employee assistance programme (if available)</li>
                  <li>• Mental health crisis services if urgent</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <SupportCallout />
      </div>
    </MentalHealthPageLayout>
  );
};

export default StressManagement;
