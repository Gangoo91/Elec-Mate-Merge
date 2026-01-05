import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { EmergencyLightingIntroSection2_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection2_6';
import { EmergencyLightingLearningOutcomesSection2_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection2_6';
import { EmergencyLightingContent2_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent2_6';
import { EmergencyLightingPracticalSection2_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection2_6';
import { EmergencyLightingRealWorldSection2_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection2_6';
import { EmergencyLightingFAQSection2_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection2_6';
import { EmergencyLightingSummary2_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary2_6';
import { EmergencySystemTestingQuiz } from '@/components/upskilling/emergency-lighting/EmergencySystemTestingQuiz';

const EmergencyLightingModule2Section6 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-4 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <Link to="../emergency-lighting-module-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Button>
          </Link>
          <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30">
            Section 6
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <ClipboardCheck className="h-8 w-8 text-yellow-400 drop-shadow-md" />
              System Testing and Record Keeping
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Testing schedules, maintenance requirements and compliance documentation for emergency lighting systems
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <EmergencyLightingIntroSection2_6 />
            <EmergencyLightingLearningOutcomesSection2_6 />
            <EmergencyLightingContent2_6 />
            <EmergencyLightingPracticalSection2_6 />
            <EmergencyLightingRealWorldSection2_6 />
            <EmergencyLightingFAQSection2_6 />
            <EmergencyLightingSummary2_6 />
            <EmergencySystemTestingQuiz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule2Section6;