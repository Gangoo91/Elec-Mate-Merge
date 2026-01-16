import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule4Section2Intro } from '@/components/upskilling/smart-home/SmartHomeModule4Section2Intro';
import { SmartHomeModule4Section2LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule4Section2LearningOutcomes';
import { SmartRadiatorValvesSection } from '@/components/upskilling/smart-home/SmartRadiatorValvesSection';
import { BoilerIntegrationSection } from '@/components/upskilling/smart-home/BoilerIntegrationSection';
import { TRVFunctionQuickCheck } from '@/components/upskilling/smart-home/TRVFunctionQuickCheck';
import { HeatPumpIntegrationSection } from '@/components/upskilling/smart-home/HeatPumpIntegrationSection';
import { BoilerControlDifferenceQuickCheck } from '@/components/upskilling/smart-home/BoilerControlDifferenceQuickCheck';
import { CompatibilityIssuesSection } from '@/components/upskilling/smart-home/CompatibilityIssuesSection';
import { HeatPumpSwitchingQuickCheck } from '@/components/upskilling/smart-home/HeatPumpSwitchingQuickCheck';
import { BenefitsOfIntegrationSection } from '@/components/upskilling/smart-home/BenefitsOfIntegrationSection';
import { LimitationsAndChallengesSection } from '@/components/upskilling/smart-home/LimitationsAndChallengesSection';
import { ManufacturerCompatibilityQuickCheck } from '@/components/upskilling/smart-home/ManufacturerCompatibilityQuickCheck';
import { SmartHomeModule4Section2RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule4Section2RealWorld';
import { SmartHomeModule4Section2FAQ } from '@/components/upskilling/smart-home/SmartHomeModule4Section2FAQ';
import { SmartHomeModule4Section2Quiz } from '@/components/upskilling/smart-home/SmartHomeModule4Section2Quiz';

const SmartHomeModule4Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="../smart-home-module-4">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Radiator Valves, Boilers, and Heat Pumps
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Integrating smart controls with different heating system types for optimal efficiency
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <SmartHomeModule4Section2Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule4Section2LearningOutcomes />

          {/* Content Sections */}
          <SmartRadiatorValvesSection />
          
          {/* Quick Check 1 */}
          <TRVFunctionQuickCheck />
          
          <BoilerIntegrationSection />
          
          {/* Quick Check 2 */}
          <BoilerControlDifferenceQuickCheck />
          
          <HeatPumpIntegrationSection />
          
          {/* Quick Check 3 */}
          <HeatPumpSwitchingQuickCheck />
          
          <CompatibilityIssuesSection />
          
          {/* Quick Check 4 */}
          <ManufacturerCompatibilityQuickCheck />
          
          <BenefitsOfIntegrationSection />
          <LimitationsAndChallengesSection />

          {/* Real-World Scenario */}
          <SmartHomeModule4Section2RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule4Section2FAQ />

          {/* Quiz Section */}
          <SmartHomeModule4Section2Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule4Section2;