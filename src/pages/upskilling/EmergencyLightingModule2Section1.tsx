import { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection2_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection2_1';
import { EmergencyLightingLearningOutcomesSection2_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection2_1';
import { EmergencyLightingContent2_1_Enhanced } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent2_1_Enhanced';
import { EmergencyLightingQuickCheck2_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingQuickCheck2_1';
import { EmergencyLightingRealWorld2_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorld2_1';
import { EmergencyLightingFAQSection2_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection2_1';
import { EmergencyLightingSummary2_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary2_1';
import { EmergencyEscapeLightingQuiz } from '@/components/upskilling/emergency-lighting/EmergencyEscapeLightingQuiz';

const EmergencyLightingModule2Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Emergency Escape Lighting | Emergency Lighting Module 2 Section 1';
    document.title = title;
    const desc = 'Learn about emergency escape lighting systems, BS 5266-1 requirements, illuminance levels, spacing calculations, and exit route lighting design principles.';
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
        <Link to="../emergency-lighting-module-2">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 2 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Emergency Escape Lighting
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Exit route and escape path lighting requirements for safe evacuation during emergencies
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <EmergencyLightingIntroSection2_1 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection2_1 />

          {/* Core Content */}
          <EmergencyLightingContent2_1_Enhanced />

          {/* Quick Check */}
          <EmergencyLightingQuickCheck2_1 />

          {/* Real World Example */}
          <EmergencyLightingRealWorld2_1 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection2_1 />

          {/* Summary */}
          <EmergencyLightingSummary2_1 />

          {/* Quiz Section */}
          <EmergencyEscapeLightingQuiz />

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule2Section1;