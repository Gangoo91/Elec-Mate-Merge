import { ArrowLeft, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule4Section5Intro } from '@/components/upskilling/smart-home/SmartHomeModule4Section5Intro';
import { SmartHomeModule4Section5LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule4Section5LearningOutcomes';
import { HVACIntegrationSection } from '@/components/upskilling/smart-home/HVACIntegrationSection';
import { HVACIntegrationQuickCheck } from '@/components/upskilling/smart-home/HVACIntegrationQuickCheck';
import { HVACInterlocksSection } from '@/components/upskilling/smart-home/HVACInterlocksSection';
import { InterlockExampleQuickCheck } from '@/components/upskilling/smart-home/InterlockExampleQuickCheck';
import { ImportanceOfInterlocksSection } from '@/components/upskilling/smart-home/ImportanceOfInterlocksSection';
import { HeatingCoolingConflictQuickCheck } from '@/components/upskilling/smart-home/HeatingCoolingConflictQuickCheck';
import { IntegrationStrategiesSection } from '@/components/upskilling/smart-home/IntegrationStrategiesSection';
import { SensorsAndControllersSection } from '@/components/upskilling/smart-home/SensorsAndControllersSection';
import { SmartPlatformQuickCheck } from '@/components/upskilling/smart-home/SmartPlatformQuickCheck';
import { BestPracticesSection } from '@/components/upskilling/smart-home/BestPracticesSection';
import { FutureTrendsSection } from '@/components/upskilling/smart-home/FutureTrendsSection';
import { SmartHomeModule4Section5RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule4Section5RealWorld';
import { SmartHomeModule4Section5FAQ } from '@/components/upskilling/smart-home/SmartHomeModule4Section5FAQ';
import { SmartHomeModule4Section5Quiz } from '@/components/upskilling/smart-home/SmartHomeModule4Section5Quiz';

const SmartHomeModule4Section5 = () => {
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
            <Wind className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            HVAC Integration and Interlocks
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Learn how heating, ventilation, and air conditioning systems work together through smart integration and interlocks to maximise efficiency and comfort
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule4Section5Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule4Section5LearningOutcomes />

          {/* Content Sections */}
          <HVACIntegrationSection />
          <HVACIntegrationQuickCheck />

          <HVACInterlocksSection />
          <InterlockExampleQuickCheck />

          <ImportanceOfInterlocksSection />
          <HeatingCoolingConflictQuickCheck />

          <IntegrationStrategiesSection />
          <SensorsAndControllersSection />
          <SmartPlatformQuickCheck />

          <BestPracticesSection />
          <FutureTrendsSection />

          {/* Real-World Scenario */}
          <SmartHomeModule4Section5RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule4Section5FAQ />

          {/* Quiz Section */}
          <SmartHomeModule4Section5Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule4Section5;