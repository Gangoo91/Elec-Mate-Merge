import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection4';
import { EmergencyLightingLearningOutcomesSection4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection4';
import { EmergencyLightingContent4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent4';
import { EmergencyLightingQuickCheckSection4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingQuickCheckSection4';
import { EmergencyLightingRealWorldSection4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection4';
import { EmergencyLightingFAQSection4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection4';
import { EmergencyLightingSummarySection4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummarySection4';
import EmergencyLightingStandardsQuiz from '@/components/upskilling/emergency-lighting/EmergencyLightingStandardsQuiz';

const EmergencyLightingModule1Section4 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-4 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <Link to="../emergency-lighting-module-1">
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
              <BookOpen className="h-8 w-8 text-yellow-400 drop-shadow-md" />
              Overview of BS 5266 and Related Standards
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Comprehensive understanding of British Standards and regulations governing emergency lighting
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <EmergencyLightingIntroSection4 />
            <EmergencyLightingLearningOutcomesSection4 />
            <EmergencyLightingContent4 />
            <EmergencyLightingQuickCheckSection4 />
            <EmergencyLightingRealWorldSection4 />
            <EmergencyLightingFAQSection4 />
            <EmergencyLightingSummarySection4 />
            <EmergencyLightingStandardsQuiz />
            
            <div className="flex justify-between pt-8">
              <Link to="../emergency-lighting-module-1-section-3">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Section
                </Button>
              </Link>
              <Link to="../emergency-lighting-module-1">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10">
                  Complete Module
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

export default EmergencyLightingModule1Section4;