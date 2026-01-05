import { useEffect } from 'react';
import { ArrowLeft, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntro } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntro';
import { EmergencyLightingLearningOutcomes } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomes';
import { EmergencyLightingContent } from '@/components/upskilling/emergency-lighting/EmergencyLightingContent';
import { EmergencyLightingQuickCheck } from '@/components/upskilling/emergency-lighting/EmergencyLightingQuickCheck';
import { EmergencyLightingRealWorld } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorld';
import { EmergencyLightingFAQ } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQ';
import { EmergencyLightingSummary } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary';
import { EmergencyLightingQuiz } from '@/components/upskilling/emergency-lighting/EmergencyLightingQuiz';

const EmergencyLightingModule1Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Purpose and Legal Framework | Emergency Lighting Module 1 Section 1';
    document.title = title;
    const desc = 'Learn about emergency lighting legal requirements, Regulatory Reform (Fire Safety) Order 2005, Building Regulations, and BS 5266-1 compliance.';
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
            <Scale className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 1 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Purpose and Legal Framework
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding the legal requirements and regulatory framework for emergency lighting systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <EmergencyLightingIntro />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomes />

          {/* Core Content */}
          <EmergencyLightingContent />

          {/* Quick Check */}
          <EmergencyLightingQuickCheck />

          {/* Real World Example */}
          <EmergencyLightingRealWorld />

          {/* FAQ Section */}
          <EmergencyLightingFAQ />

          {/* Summary */}
          <EmergencyLightingSummary />

          {/* Quiz Section */}
          <EmergencyLightingQuiz />

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule1Section1;