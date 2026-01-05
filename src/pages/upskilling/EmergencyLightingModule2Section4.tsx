import { ArrowLeft, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection2_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection2_4';
import { EmergencyLightingLearningOutcomesSection2_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection2_4';
import { EmergencyLightingContent2_4_Enhanced } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent2_4_Enhanced';
import { EmergencyLightingTechnicalSection2_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection2_4';
import { EmergencyLightingCaseStudies2_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingCaseStudies2_4';
import { EmergencyLightingRealWorldSection2_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection2_4';
import { EmergencyLightingFAQSection2_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection2_4';
import { EmergencyLightingSummary2_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary2_4';
import { EmergencyEscapeRouteLightingQuiz } from '@/components/upskilling/emergency-lighting/EmergencyEscapeRouteLightingQuiz';

const EmergencyLightingModule2Section4 = () => {
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
            Section 4
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <Route className="h-8 w-8 text-yellow-400 drop-shadow-md" />
              Escape Route Lighting
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Essential guidance for designing and installing escape route lighting systems that ensure safe evacuation during emergencies
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <EmergencyLightingIntroSection2_4 />
            <EmergencyLightingLearningOutcomesSection2_4 />
            <EmergencyLightingContent2_4_Enhanced />
            <EmergencyLightingTechnicalSection2_4 />
            <EmergencyLightingCaseStudies2_4 />
            <EmergencyLightingRealWorldSection2_4 />
            <EmergencyLightingFAQSection2_4 />
            <EmergencyLightingSummary2_4 />
            <EmergencyEscapeRouteLightingQuiz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule2Section4;