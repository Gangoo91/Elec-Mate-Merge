import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection6_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection6_2';
import { EmergencyLightingLearningOutcomesSection6_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection6_2';
import { EmergencyLightingTechnicalSection6_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection6_2';
import { EmergencyLightingPracticalSection6_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection6_2';
import { EmergencyLightingRealWorldSection6_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection6_2';
import { EmergencyLightingFAQSection6_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection6_2';
import { EmergencyLightingSummary6_2 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary6_2';
import { FireSafetyIntegrationQuiz } from '@/components/upskilling/emergency-lighting/FireSafetyIntegrationQuiz';

const EmergencyLightingModule6Section2 = () => {
  useEffect(() => {
    document.title = 'Integration with Fire Safety Regulations | Emergency Lighting Module 6 Section 2';
    const desc = 'Learn how emergency lighting integrates with UK fire safety legislation, fire risk assessments, and evacuation strategies. Understand responsibilities under the Regulatory Reform (Fire Safety) Order 2005.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    // Canonical URL for SEO
    const canonicalHref = window.location.origin + '/emergency-lighting-module-6-section-2';
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
        <Link to="../emergency-lighting-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Scale className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30 font-semibold text-sm px-3 py-1"
            >
              Module 6 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Integration with Fire Safety Regulations
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding how emergency lighting integrates with UK fire safety legislation and evacuation strategies
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <EmergencyLightingIntroSection6_2 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection6_2 />

          {/* Technical Section */}
          <EmergencyLightingTechnicalSection6_2 />

          {/* Practical Guidance */}
          <EmergencyLightingPracticalSection6_2 />

          {/* Real World Example */}
          <EmergencyLightingRealWorldSection6_2 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection6_2 />

          {/* Summary */}
          <EmergencyLightingSummary6_2 />

          {/* Quiz Section */}
          <FireSafetyIntegrationQuiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../emergency-lighting-module-6-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-6-section-3">
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

export default EmergencyLightingModule6Section2;
