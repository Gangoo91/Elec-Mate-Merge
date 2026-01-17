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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Scale className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 font-semibold text-sm px-3 py-1"
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
        <div className="space-y-4 sm:space-y-6">
          
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

          {/* Bottom Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="/study-centre/upskilling/emergency-lighting-module-6-section-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Section
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="/study-centre/upskilling/emergency-lighting-module-6-section-3">
                Next Section
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule6Section2;
