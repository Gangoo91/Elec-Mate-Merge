import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection3_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection3_1';
import { EmergencyLightingLearningOutcomesSection3_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection3_1';
import { EmergencyLightingTechnicalSection3_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection3_1';
import { EmergencyLightingPracticalSection3_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection3_1';
import { EmergencyLightingRealWorldSection3_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection3_1';
import { EmergencyLightingFAQSection3_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection3_1';
import { EmergencyLightingQuizSection3_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingQuizSection3_1';
import { EmergencyLightingSummary3_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary3_1';

const EmergencyLightingModule3Section1 = () => {
  useEffect(() => {
    document.title = 'Minimum Illumination Levels and Durations | Emergency Lighting Module 3 Section 1';
    const desc = 'Learn minimum lux levels for escape routes, anti-panic areas and high-risk tasks. Understand operating duration requirements and battery specifications for BS 5266 compliance.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

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
            Section 1
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-yellow-400 drop-shadow-md" />
              Minimum Illumination Levels and Durations
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Lux requirements and operating times for emergency lighting systems in accordance with BS 5266-1
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <EmergencyLightingIntroSection3_1 />
            <EmergencyLightingLearningOutcomesSection3_1 />
            <EmergencyLightingTechnicalSection3_1 />
            <EmergencyLightingPracticalSection3_1 />
            <EmergencyLightingRealWorldSection3_1 />
            <EmergencyLightingFAQSection3_1 />
            <EmergencyLightingSummary3_1 />
            <EmergencyLightingQuizSection3_1 />
          </div>

          <div className="flex justify-between mt-8">
            <Link to="../emergency-lighting-module-3">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Module 3 Overview
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-3-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule3Section1;