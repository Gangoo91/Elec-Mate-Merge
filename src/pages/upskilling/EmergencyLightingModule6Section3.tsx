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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/emergency-lighting-module-6')}
          className="mb-6 border-yellow-400 text-white hover:bg-yellow-400 hover:text-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Module 6
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Section 3: Emergency Lighting in Risk Assessments
          </h1>
          <p className="text-xl text-white mb-4">
            Understanding how fire risk assessments drive emergency lighting design decisions
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium border border-yellow-400/30">
              Module 6
            </span>
            <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium border border-blue-600/30">
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

        <div className="flex justify-between mt-12">
          <Button 
            variant="outline" 
            onClick={() => navigate('/emergency-lighting-module-6-section-2')}
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Section
          </Button>
          
          <Button 
            onClick={() => navigate('/emergency-lighting-module-6-section-4')}
            className="bg-yellow-400 text-black hover:bg-yellow-600"
          >
            Next Section
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule6Section3;
