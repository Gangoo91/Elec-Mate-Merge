import { useEffect } from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection2_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection2_2';
import { EmergencyLightingLearningOutcomesSection2_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection2_2';
import { EmergencyLightingContent2_2_Enhanced } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent2_2_Enhanced';
import { EmergencyLightingTechnicalSection2_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection2_2';
import { EmergencyLightingCaseStudies2_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingCaseStudies2_2';
import { EmergencyLightingRealWorldSection2_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection2_2';
import { EmergencyLightingFAQSection2_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection2_2';
import { EmergencyLightingSummary2_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary2_2';
import { EmergencyAntiPanicLightingQuiz } from '@/components/upskilling/emergency-lighting/EmergencyAntiPanicLightingQuiz';

const EmergencyLightingModule2Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Open Area (Anti-Panic) Lighting | Emergency Lighting Module 2 Section 2';
    document.title = title;
    const desc = 'Learn about open area (anti-panic) emergency lighting systems, BS 5266-1 requirements, illuminance levels, spacing calculations, and design principles for large open spaces.';
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
            <Eye className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 2 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Open Area (Anti-Panic) Lighting
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            General area lighting to prevent panic and provide safe movement in large open spaces
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <EmergencyLightingIntroSection2_2 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection2_2 />

          {/* Core Content */}
          <EmergencyLightingContent2_2_Enhanced />

          {/* Technical Specifications */}
          <EmergencyLightingTechnicalSection2_2 />

          {/* Detailed Case Studies */}
          <EmergencyLightingCaseStudies2_2 />

          {/* Real World Example */}
          <EmergencyLightingRealWorldSection2_2 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection2_2 />

          {/* Summary */}
          <EmergencyLightingSummary2_2 />

          {/* Quiz Section */}
          <EmergencyAntiPanicLightingQuiz />

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule2Section2;