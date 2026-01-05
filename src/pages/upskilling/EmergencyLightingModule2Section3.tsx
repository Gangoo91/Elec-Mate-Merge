import { useEffect } from 'react';
import { ArrowLeft, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection2_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection2_3';
import { EmergencyLightingLearningOutcomesSection2_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection2_3';
import { EmergencyLightingContent2_3_Enhanced } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent2_3_Enhanced';
import { EmergencyLightingTechnicalSection2_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection2_3';
import { EmergencyLightingCaseStudies2_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingCaseStudies2_3';
import { EmergencyLightingRealWorldSection2_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection2_3';
import { EmergencyLightingFAQSection2_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection2_3';
import { EmergencyLightingSummary2_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary2_3';
import { EmergencyHighRiskLightingQuiz } from '@/components/upskilling/emergency-lighting/EmergencyHighRiskLightingQuiz';

const EmergencyLightingModule2Section3 = () => {
  useEffect(() => {
    document.title = 'High-Risk Task Area Lighting | Emergency Lighting Module 2 Section 3';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about high-risk task area emergency lighting requirements, including 15 lux minimum standards, risk assessment, and installation procedures for dangerous work environments.');
    }
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
            <Target className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-red-600/40 text-red-300 hover:bg-red-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 2 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-white to-red-200 bg-clip-text text-transparent">
            High-Risk Task Area Lighting
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Emergency lighting for dangerous work environments requiring safe shutdown procedures and enhanced illumination levels
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <EmergencyLightingIntroSection2_3 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection2_3 />

          {/* Core Content */}
          <EmergencyLightingContent2_3_Enhanced />

          {/* Technical Specifications */}
          <EmergencyLightingTechnicalSection2_3 />

          {/* Case Studies */}
          <EmergencyLightingCaseStudies2_3 />

          {/* Real-World Example */}
          <EmergencyLightingRealWorldSection2_3 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection2_3 />

          {/* Summary */}
          <EmergencyLightingSummary2_3 />

          {/* Quiz Section */}
          <EmergencyHighRiskLightingQuiz />

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule2Section3;