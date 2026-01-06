import { ArrowLeft, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule4Section1Intro } from '@/components/upskilling/smart-home/SmartHomeModule4Section1Intro';
import { SmartHomeModule4Section1LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule4Section1LearningOutcomes';
import { WhatIsSmartThermostatSection } from '@/components/upskilling/smart-home/WhatIsSmartThermostatSection';
import { BenefitsOfSmartThermostatsSection } from '@/components/upskilling/smart-home/BenefitsOfSmartThermostatsSection';
import { ThermostatDifferenceQuickCheck } from '@/components/upskilling/smart-home/ThermostatDifferenceQuickCheck';
import { WhatIsRoomZoningSection } from '@/components/upskilling/smart-home/WhatIsRoomZoningSection';
import { RoomZoningBenefitQuickCheck } from '@/components/upskilling/smart-home/RoomZoningBenefitQuickCheck';
import { TypesOfRoomZoningSystemsSection } from '@/components/upskilling/smart-home/TypesOfRoomZoningSystemsSection';
import { UnderfloorZoningMethodQuickCheck } from '@/components/upskilling/smart-home/UnderfloorZoningMethodQuickCheck';
import { IntegrationAndControlFeaturesSection } from '@/components/upskilling/smart-home/IntegrationAndControlFeaturesSection';
import { ChallengesAndLimitationsSection } from '@/components/upskilling/smart-home/ChallengesAndLimitationsSection';
import { SmartTRVCostQuickCheck } from '@/components/upskilling/smart-home/SmartTRVCostQuickCheck';
import { FutureDevelopmentsSection } from '@/components/upskilling/smart-home/FutureDevelopmentsSection';
import { SmartHomeModule4Section1RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule4Section1RealWorld';
import { SmartHomeModule4Section1FAQ } from '@/components/upskilling/smart-home/SmartHomeModule4Section1FAQ';
import { SmartHomeModule4Section1Quiz } from '@/components/upskilling/smart-home/SmartHomeModule4Section1Quiz';

const SmartHomeModule4Section1 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../smart-home-module-4">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Thermometer className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Smart Thermostats and Room Zoning
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Installing and configuring smart heating controls for precise temperature management
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <SmartHomeModule4Section1Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule4Section1LearningOutcomes />

          {/* Content Sections */}
          <WhatIsSmartThermostatSection />
          <BenefitsOfSmartThermostatsSection />
          
          {/* Quick Check 1 */}
          <ThermostatDifferenceQuickCheck />
          
          <WhatIsRoomZoningSection />
          
          {/* Quick Check 2 */}
          <RoomZoningBenefitQuickCheck />
          
          <TypesOfRoomZoningSystemsSection />
          
          {/* Quick Check 3 */}
          <UnderfloorZoningMethodQuickCheck />
          
          <IntegrationAndControlFeaturesSection />
          <ChallengesAndLimitationsSection />
          
          {/* Quick Check 4 */}
          <SmartTRVCostQuickCheck />
          
          <FutureDevelopmentsSection />

          {/* Real-World Scenario */}
          <SmartHomeModule4Section1RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule4Section1FAQ />

          {/* Quiz Section */}
          <SmartHomeModule4Section1Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule4Section1;