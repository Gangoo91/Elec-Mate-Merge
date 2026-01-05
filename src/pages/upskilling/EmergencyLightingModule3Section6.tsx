import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection3_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection3_6';
import { EmergencyLightingLearningOutcomesSection3_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection3_6';
import { EmergencyLightingTechnicalSection3_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection3_6';
import { EmergencyLightingPracticalSection3_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection3_6';
import { EmergencyLightingRealWorldSection3_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection3_6';
import { EmergencyLightingFAQSection3_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection3_6';
import { EmergencyLightingSummary3_6 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary3_6';
import { SoftwareCalculationQuiz } from '@/components/upskilling/emergency-lighting/SoftwareCalculationQuiz';
import { EmergencyLightingCalculator } from '@/components/upskilling/emergency-lighting/EmergencyLightingCalculator';

const EmergencyLightingModule3Section6 = () => {
  useEffect(() => {
    document.title = 'Software and Calculation Tools | Emergency Lighting Module 3 Section 6';
    const desc = 'Master emergency lighting design software including DIALux, Relux and calculation tools. Learn lux plotting, compliance verification and professional design workflows for BS 5266-1.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    // Canonical URL for SEO
    const canonicalHref = window.location.origin + '/emergency-lighting-module-3-section-6';
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
            <Calculator className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30 font-semibold text-sm px-3 py-1"
            >
              Module 3 - Section 6
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Software and Calculation Tools
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Modern design tools for professional emergency lighting calculations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Introduction */}
          <EmergencyLightingIntroSection3_6 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection3_6 />

          {/* Technical Section */}
          <EmergencyLightingTechnicalSection3_6 />

          {/* Emergency Lighting Calculator */}
          <EmergencyLightingCalculator />

          {/* Practical Guidance */}
          <EmergencyLightingPracticalSection3_6 />

          {/* Real World Example */}
          <EmergencyLightingRealWorldSection3_6 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection3_6 />

          {/* Summary */}
          <EmergencyLightingSummary3_6 />

          {/* Quiz Section */}
          <SoftwareCalculationQuiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../emergency-lighting-module-3-section-5">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule3Section6;