import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmergencyLightingIntroSection6_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection6_3';
import { EmergencyLightingLearningOutcomesSection6_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection6_3';
import { EmergencyLightingTechnicalSection6_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection6_3';
import { EmergencyLightingPracticalSection6_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection6_3';
import { EmergencyLightingRealWorldSection6_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection6_3';
import { EmergencyLightingFAQSection6_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection6_3';
import { EmergencyLightingSummary6_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary6_3';
import { RiskAssessmentQuiz } from '@/components/upskilling/emergency-lighting/RiskAssessmentQuiz';

const EmergencyLightingModule6Section3 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            onClick={() => navigate('../emergency-lighting-module-6')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Module 6
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Section 3: Emergency Lighting in Risk Assessments
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-4">
            Understanding how fire risk assessments drive emergency lighting design decisions
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-elec-yellow/10 text-elec-yellow rounded-full text-sm font-medium border border-elec-yellow/30">
              Module 6
            </span>
            <span className="px-3 py-1 bg-elec-yellow/20 text-elec-yellow rounded-full text-sm font-medium border border-elec-yellow/30">
              30 minutes
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <EmergencyLightingIntroSection6_3 />
          <EmergencyLightingLearningOutcomesSection6_3 />
          <EmergencyLightingTechnicalSection6_3 />
          <EmergencyLightingPracticalSection6_3 />
          <EmergencyLightingRealWorldSection6_3 />
          <EmergencyLightingFAQSection6_3 />
          <EmergencyLightingSummary6_3 />
          <RiskAssessmentQuiz />
        </div>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            onClick={() => navigate('../emergency-lighting-module-6-section-2')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Section
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            onClick={() => navigate('../emergency-lighting-module-6-section-4')}
          >
            Next Section
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EmergencyLightingModule6Section3;
