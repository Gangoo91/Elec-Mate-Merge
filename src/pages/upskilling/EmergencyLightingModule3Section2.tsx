import { ArrowLeft, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection3_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection3_2';
import { EmergencyLightingLearningOutcomesSection3_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection3_2';
import { EmergencyLightingTechnicalSection3_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection3_2';
import { EmergencyLightingPracticalSection3_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection3_2';
import { EmergencyLightingRealWorldSection3_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection3_2';
import { EmergencyLightingFAQSection3_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection3_2';
import { EmergencyLightingSummary3_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary3_2';
import { EscapeRouteCoverageQuiz } from '@/components/upskilling/emergency-lighting/EscapeRouteCoverageQuiz';

const EmergencyLightingModule3Section2 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-4 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <Link to="../emergency-lighting-module-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Button>
          </Link>
          <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30">
            Section 2
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <Route className="h-8 w-8 text-yellow-400 drop-shadow-md" />
              Escape Route and Coverage Rules
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Coverage principles, placement rules, and integration requirements for compliant escape route lighting systems
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <EmergencyLightingIntroSection3_2 />
            <EmergencyLightingLearningOutcomesSection3_2 />
            <EmergencyLightingTechnicalSection3_2 />
            <EmergencyLightingPracticalSection3_2 />
            <EmergencyLightingRealWorldSection3_2 />
            <EmergencyLightingFAQSection3_2 />
            <EmergencyLightingSummary3_2 />
            <EscapeRouteCoverageQuiz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule3Section2;