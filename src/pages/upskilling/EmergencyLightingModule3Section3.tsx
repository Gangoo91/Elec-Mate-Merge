import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection3_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection3_3';
import { EmergencyLightingLearningOutcomesSection3_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection3_3';
import { EmergencyLightingTechnicalSection3_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection3_3';
import { EmergencyLightingPracticalSection3_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection3_3';
import { EmergencyLightingRealWorldSection3_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection3_3';
import { EmergencyLightingFAQSection3_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection3_3';
import { EmergencyLightingSummary3_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary3_3';
import { MountingHeightsPhotometricQuiz } from '@/components/upskilling/emergency-lighting/MountingHeightsPhotometricQuiz';

const EmergencyLightingModule3Section3 = () => {
  useEffect(() => {
    document.title = 'Mounting Heights and Photometric Considerations | Emergency Lighting Module 3 Section 3';
    const desc = 'Master mounting heights, photometric data and light distribution for compliant emergency lighting installations. Learn spacing tables, polar diagrams and beam selection.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    // Canonical URL for SEO
    const canonicalHref = window.location.origin + '/emergency-lighting-module-3-section-3';
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
          <div className="flex items-center gap-3 mb-2">
            <Camera className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30 font-semibold">
              Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Mounting Heights and Photometric Considerations
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Light distribution, spacing tables and beam selection for compliant emergency lighting installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-4 sm:space-y-6">

          
          <EmergencyLightingIntroSection3_3 />
          <EmergencyLightingLearningOutcomesSection3_3 />
          <EmergencyLightingTechnicalSection3_3 />
          <EmergencyLightingPracticalSection3_3 />
          <EmergencyLightingRealWorldSection3_3 />
          <EmergencyLightingFAQSection3_3 />
          <EmergencyLightingSummary3_3 />
          <MountingHeightsPhotometricQuiz />

          <div className="flex justify-between mt-8">
            <Link to="../emergency-lighting-module-3-section-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-3-section-4">
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

export default EmergencyLightingModule3Section3;