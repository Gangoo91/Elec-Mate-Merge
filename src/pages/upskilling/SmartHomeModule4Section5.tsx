import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Back Button */}
      <div className="px-8 pt-8">
        <Link to="../smart-home-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 pb-8 space-y-8 module-content">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium">
            Module 4 - Section 5
          </div>
          <h1 className="text-3xl font-bold text-white">
            HVAC Integration and Interlocks
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Learn how heating, ventilation, and air conditioning systems work together through smart integration and interlocks to maximise efficiency and comfort.
          </p>
        </div>

        {/* Content Sections */}
        <SmartHomeModule4Section5Intro />
        <SmartHomeModule4Section5LearningOutcomes />
        
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
        
        <SmartHomeModule4Section5RealWorld />
        <SmartHomeModule4Section5FAQ />
        <SmartHomeModule4Section5Quiz />
      </div>
    </div>
  );
};

export default SmartHomeModule4Section5;