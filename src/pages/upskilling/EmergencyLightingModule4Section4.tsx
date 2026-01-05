import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingIntroSection4_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingIntroSection4_4';
import { EmergencyLightingLearningOutcomesSection4_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingLearningOutcomesSection4_4';
import { EmergencyLightingTechnicalSection4_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingTechnicalSection4_4';
import { EmergencyLightingPracticalSection4_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingPracticalSection4_4';
import { EmergencyLightingRealWorldSection4_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingRealWorldSection4_4';
import { EmergencyLightingFAQSection4_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingFAQSection4_4';
import { EmergencyLightingSummary4_4 } from '@/components/upskilling/emergency-lighting/EmergencyLightingSummary4_4';
import { CircuitSegregationQuiz } from '@/components/upskilling/emergency-lighting/CircuitSegregationQuiz';

const EmergencyLightingModule4Section4 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="w-full max-w-full px-4 sm:px-6 lg:px-8 pt-8 pb-8">
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
            <Shield className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-red-600/40 text-red-200 hover:bg-red-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Circuit Segregation and Fire Integrity
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Fire-resistant cable routing, BS 7671 compliance, and maintaining circuit integrity under fire conditions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <EmergencyLightingIntroSection4_4 />

          {/* Learning Outcomes */}
          <EmergencyLightingLearningOutcomesSection4_4 />

          {/* Technical Content */}
          <EmergencyLightingTechnicalSection4_4 />

          {/* Practical Guidance */}
          <EmergencyLightingPracticalSection4_4 />

          {/* Real-World Example */}
          <EmergencyLightingRealWorldSection4_4 />

          {/* FAQ Section */}
          <EmergencyLightingFAQSection4_4 />

          {/* Summary */}
          <EmergencyLightingSummary4_4 />

          {/* Quiz Section */}
          <CircuitSegregationQuiz />

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8">
            <Link to="../emergency-lighting-module-4-section-3" className="flex-1">
              <Button
                variant="outline"
                className="w-full bg-card text-white hover:bg-card/80 hover:text-yellow-400 border-gray-600"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Emergency Duration Testing
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-4-section-5">
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-400"
              >
                Next: Remote Testing and Monitoring
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule4Section4;
