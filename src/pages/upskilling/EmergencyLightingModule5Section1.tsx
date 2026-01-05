import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingModule5Section1Intro } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section1Intro';
import { EmergencyLightingModule5Section1LearningOutcomes } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section1LearningOutcomes';
import { EmergencyLightingModule5Section1Technical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section1Technical';
import { EmergencyLightingModule5Section1Practical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section1Practical';
import { EmergencyLightingModule5Section1RealWorld } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section1RealWorld';
import { EmergencyLightingModule5Section1Summary } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section1Summary';
import { EmergencyLightingModule5Section1FAQ } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section1FAQ';
import { EmergencyLightingModule5Section1Quiz } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section1Quiz';

const EmergencyLightingModule5Section1 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../emergency-lighting-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Search className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Initial Inspection and Verification
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed" aria-label="Section description">
            Systematic inspection procedures to ensure emergency lighting installations comply with BS 5266-1 and BS 7671 before commissioning
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <EmergencyLightingModule5Section1Intro />

          {/* Learning Outcomes */}
          <EmergencyLightingModule5Section1LearningOutcomes />

          {/* Technical Content */}
          <EmergencyLightingModule5Section1Technical />

          {/* Practical Guidance */}
          <EmergencyLightingModule5Section1Practical />

          {/* Real-World Example */}
          <EmergencyLightingModule5Section1RealWorld />

          {/* FAQ Section */}
          <EmergencyLightingModule5Section1FAQ />

          {/* Summary */}
          <EmergencyLightingModule5Section1Summary />

          {/* Quiz Section */}
          <EmergencyLightingModule5Section1Quiz />

          {/* Mobile Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
            <Link to="../emergency-lighting-module-5" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-card hover:text-yellow-400"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 5
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-5-section-2" className="flex-1">
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

export default EmergencyLightingModule5Section1;
