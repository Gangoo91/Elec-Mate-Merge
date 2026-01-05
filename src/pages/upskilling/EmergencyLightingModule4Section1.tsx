import { ArrowLeft, ArrowRight, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection4_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection4_1';
import { EmergencyLightingLearningOutcomesSection4_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection4_1';
import { EmergencyLightingTechnicalSection4_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection4_1';
import { EmergencyLightingPracticalSection4_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection4_1';
import { EmergencyLightingRealWorldSection4_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection4_1';
import { EmergencyLightingFAQSection4_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection4_1';
import { EmergencyLightingSummary4_1 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary4_1';
import { CableInstallationQuiz } from '@/components/upskilling/emergency-lighting/CableInstallationQuiz';

const EmergencyLightingModule4Section1 = () => {
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
            <Cable className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Cable Types and Installation Requirements
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed"  aria-label="Section description">
            Understanding fire-resistant cabling, installation methods, and compliance with BS 5266-1 and BS 7671
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <EmergencyLightingIntroSection4_1 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection4_1 />

          {/* Technical Content */}
          <EmergencyLightingTechnicalSection4_1 />

          {/* Practical Guidance */}
          <EmergencyLightingPracticalSection4_1 />

          {/* Real-World Example */}
          <EmergencyLightingRealWorldSection4_1 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection4_1 />

          {/* Summary */}
          <EmergencyLightingSummary4_1 />

          {/* Quiz Section */}
          <CableInstallationQuiz />

          {/* Mobile Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
            <Link to="../emergency-lighting-module-4" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-card hover:text-yellow-400"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 4
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-4-section-2" className="flex-1">
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

export default EmergencyLightingModule4Section1;
