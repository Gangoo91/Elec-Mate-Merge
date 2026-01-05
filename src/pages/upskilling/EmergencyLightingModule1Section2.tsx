import { useEffect } from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection2';
import { EmergencyLightingLearningOutcomesSection2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection2';
import { EmergencyLightingContentSection2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingContentSection2';
import { EmergencyLightingQuickCheckSection2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingQuickCheckSection2';
import { EmergencyLightingRealWorldSection2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection2';
import { EmergencyLightingFAQSection2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection2';
import { EmergencyLightingSummarySection2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummarySection2';
import { EmergencyLightingQuizSection2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingQuizSection2';

const EmergencyLightingModule1Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Locations Where Emergency Lights are Required | Emergency Lighting Module 1 Section 2';
    document.title = title;
    const desc = 'Learn about mandatory locations for emergency lighting installation, BS5266 requirements, escape routes, and specific area classifications.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../emergency-lighting-module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 1 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Locations Where Emergency Lights are Required
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding mandatory installation locations and BS5266 requirements for emergency lighting
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <EmergencyLightingIntroSection2 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection2 />

          {/* Core Content */}
          <EmergencyLightingContentSection2 />

          {/* Quick Check */}
          <EmergencyLightingQuickCheckSection2 />

          {/* Real World Example */}
          <EmergencyLightingRealWorldSection2 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection2 />

          {/* Summary */}
          <EmergencyLightingSummarySection2 />

          {/* Quiz Section */}
          <EmergencyLightingQuizSection2 />

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule1Section2;