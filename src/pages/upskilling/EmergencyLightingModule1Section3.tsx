import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection3';
import { EmergencyLightingLearningOutcomesSection3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection3';
import { EmergencyLightingContent3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent3';
import { EmergencyLightingQuickCheckSection3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingQuickCheckSection3';
import { EmergencyLightingRealWorldSection3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection3';
import { EmergencyLightingFAQSection3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection3';
import { EmergencyLightingSummarySection3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummarySection3';
import { EmergencyLightingTypesQuiz } from '@/components/upskilling/emergency-lighting/EmergencyLightingTypesQuiz';

const EmergencyLightingModule1Section3 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-4 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <Link to="../emergency-lighting-module-1">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Button>
          </Link>
          <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30">
            Section 3
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-yellow-400 drop-shadow-md" />
              Types of Emergency Lighting Systems
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding different emergency lighting system configurations and their applications
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <EmergencyLightingIntroSection3 />
            <EmergencyLightingLearningOutcomesSection3 />
            <EmergencyLightingContent3 />
            <EmergencyLightingQuickCheckSection3 />
            <EmergencyLightingRealWorldSection3 />
            <EmergencyLightingFAQSection3 />
            <EmergencyLightingSummarySection3 />
            <EmergencyLightingTypesQuiz />
            
            <div className="flex justify-between pt-8">
              <Link to="../emergency-lighting-module-1-section-2">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Section
                </Button>
              </Link>
              <Link to="../emergency-lighting-module-1-section-4">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10">
                  Next Section
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule1Section3;