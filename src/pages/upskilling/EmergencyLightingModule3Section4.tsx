import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection3_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection3_4';
import { EmergencyLightingLearningOutcomesSection3_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection3_4';
import { EmergencyLightingTechnicalSection3_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection3_4';
import { EmergencyLightingPracticalSection3_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection3_4';
import { EmergencyLightingRealWorldSection3_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection3_4';
import { EmergencyLightingFAQSection3_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection3_4';
import { EmergencyLightingSummary3_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary3_4';
import { RiskBasedDesignQuiz } from '@/components/upskilling/emergency-lighting/RiskBasedDesignQuiz';

const EmergencyLightingModule3Section4 = () => {
  useEffect(() => {
    document.title = 'Risk-Based Design Adjustments | Emergency Lighting Module 3 Section 4';
    const desc = 'Learn risk-based emergency lighting design for different building types, occupant needs and specific hazards. Adjust lux levels, durations and placement for safety.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    // Canonical URL for SEO
    const canonicalHref = window.location.origin + '/emergency-lighting-module-3-section-4';
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalHref;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../emergency-lighting-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30 font-semibold text-sm px-3 py-1"
            >
              Module 3 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Risk-Based Design Adjustments
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Adapting emergency lighting for specific risks and occupants
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">

          
          {/* Introduction */}
          <EmergencyLightingIntroSection3_4 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection3_4 />

          {/* Technical Section */}
          <EmergencyLightingTechnicalSection3_4 />

          {/* Practical Guidance */}
          <EmergencyLightingPracticalSection3_4 />

          {/* Real World Example */}
          <EmergencyLightingRealWorldSection3_4 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection3_4 />

          {/* Summary */}
          <EmergencyLightingSummary3_4 />

          {/* Quiz Section */}
          <RiskBasedDesignQuiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../emergency-lighting-module-3-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-3-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule3Section4;