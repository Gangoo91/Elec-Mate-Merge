import { ArrowLeft, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule4Section3Intro } from '@/components/upskilling/smart-home/SmartHomeModule4Section3Intro';
import { SmartHomeModule4Section3LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule4Section3LearningOutcomes';
import { ImportanceOfEnvironmentalMonitoringSection } from '@/components/upskilling/smart-home/ImportanceOfEnvironmentalMonitoringSection';
import { HumiditySensorsSection } from '@/components/upskilling/smart-home/HumiditySensorsSection';
import { IdealHumidityRangeQuickCheck } from '@/components/upskilling/smart-home/IdealHumidityRangeQuickCheck';
import { CO2SensorsSection } from '@/components/upskilling/smart-home/CO2SensorsSection';
import { CO2ProductivityQuickCheck } from '@/components/upskilling/smart-home/CO2ProductivityQuickCheck';
import { AirQualitySensorsSection } from '@/components/upskilling/smart-home/AirQualitySensorsSection';
import { PollutantExampleQuickCheck } from '@/components/upskilling/smart-home/PollutantExampleQuickCheck';
import { IntegrationWithSmartHVACSection } from '@/components/upskilling/smart-home/IntegrationWithSmartHVACSection';
import { HVACSensorDataQuickCheck } from '@/components/upskilling/smart-home/HVACSensorDataQuickCheck';
import { BenefitsAndLimitationsEnvironmentalSection } from '@/components/upskilling/smart-home/BenefitsAndLimitationsEnvironmentalSection';
import { SmartHomeModule4Section3RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule4Section3RealWorld';
import { SmartHomeModule4Section3FAQ } from '@/components/upskilling/smart-home/SmartHomeModule4Section3FAQ';
import { SmartHomeModule4Section3Quiz } from '@/components/upskilling/smart-home/SmartHomeModule4Section3Quiz';

const SmartHomeModule4Section3 = () => {
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
            <Gauge className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Environmental Sensors (Humidity, CO₂, Air Quality)
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Monitoring and responding to environmental conditions for health, comfort, and efficiency
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <SmartHomeModule4Section3Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule4Section3LearningOutcomes />

          {/* Content Sections */}
          <ImportanceOfEnvironmentalMonitoringSection />
          <HumiditySensorsSection />
          
          {/* Quick Check 1 */}
          <IdealHumidityRangeQuickCheck />
          
          <CO2SensorsSection />
          
          {/* Quick Check 2 */}
          <CO2ProductivityQuickCheck />
          
          <AirQualitySensorsSection />
          
          {/* Quick Check 3 */}
          <PollutantExampleQuickCheck />
          
          <IntegrationWithSmartHVACSection />
          
          {/* Quick Check 4 */}
          <HVACSensorDataQuickCheck />
          
          <BenefitsAndLimitationsEnvironmentalSection />

          {/* Real-World Scenario */}
          <SmartHomeModule4Section3RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule4Section3FAQ />

          {/* Quiz Section */}
          <SmartHomeModule4Section3Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule4Section3;