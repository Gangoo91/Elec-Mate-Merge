import { ArrowLeft, ArrowRight, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection4_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection4_3';
import { EmergencyLightingLearningOutcomesSection4_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection4_3';
import { EmergencyLightingTechnicalSection4_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection4_3';
import { EmergencyLightingPracticalSection4_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection4_3';
import { EmergencyLightingRealWorldSection4_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection4_3';
import { EmergencyLightingFAQSection4_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection4_3';
import { EmergencyLightingSummary4_3 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary4_3';
import { BatterySizingQuiz } from '@/components/upskilling/emergency-lighting/BatterySizingQuiz';

const EmergencyLightingModule4Section3 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../emergency-lighting-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Battery className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Battery Sizing and Autonomy Duration
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed" aria-label="Section description">
            Calculating capacity requirements, correction factors, and compliance with BS 5266-1 and BS EN 50171
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <EmergencyLightingIntroSection4_3 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection4_3 />

          {/* Technical Content */}
          <EmergencyLightingTechnicalSection4_3 />

          {/* Practical Guidance */}
          <EmergencyLightingPracticalSection4_3 />

          {/* Real-World Example */}
          <EmergencyLightingRealWorldSection4_3 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection4_3 />

          {/* Summary */}
          <EmergencyLightingSummary4_3 />

          {/* Quiz Section */}
          <BatterySizingQuiz />

          {/* Mobile Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
            <Link to="../emergency-lighting-module-4-section-2" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-card hover:text-yellow-400"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-4-section-4" className="flex-1">
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-600">
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

export default EmergencyLightingModule4Section3;
