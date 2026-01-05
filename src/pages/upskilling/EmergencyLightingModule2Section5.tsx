import { ArrowLeft, Signpost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection2_5 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection2_5';
import { EmergencyLightingLearningOutcomesSection2_5 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection2_5';
import { EmergencyLightingContent2_5 } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent2_5';
import { EmergencyLightingPracticalSection2_5 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection2_5';
import { EmergencyLightingRealWorldSection2_5 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection2_5';
import { EmergencyLightingFAQSection2_5 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection2_5';
import { EmergencyLightingSummary2_5 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary2_5';
import { EmergencyExitSignsQuiz } from '@/components/upskilling/emergency-lighting/EmergencyExitSignsQuiz';

const EmergencyLightingModule2Section5 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-4 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <Link to="../emergency-lighting-module-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Button>
          </Link>
          <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30">
            Section 5
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <Signpost className="h-8 w-8 text-yellow-400 drop-shadow-md" />
              Emergency Exit Signs and Their Requirements
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Comprehensive guidance on emergency exit signage installation, compliance with BS 5266-1 and ISO 7010 standards
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <EmergencyLightingIntroSection2_5 />
            <EmergencyLightingLearningOutcomesSection2_5 />
            <EmergencyLightingContent2_5 />
            <EmergencyLightingPracticalSection2_5 />
            <EmergencyLightingRealWorldSection2_5 />
            <EmergencyLightingFAQSection2_5 />
            <EmergencyLightingSummary2_5 />
            <EmergencyExitSignsQuiz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule2Section5;