import { ArrowLeft, ArrowRight, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeSection3Intro } from '@/components/upskilling/smart-home/SmartHomeSection3Intro';
import { SmartHomeSection3LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeSection3LearningOutcomes';
import { SensorsSection } from '@/components/upskilling/smart-home/SensorsSection';
import { ActuatorsSection } from '@/components/upskilling/smart-home/ActuatorsSection';
import { ControllersSection } from '@/components/upskilling/smart-home/ControllersSection';
import { CommunicationFlowSection } from '@/components/upskilling/smart-home/CommunicationFlowSection';
import { IntegrationChallengesSection } from '@/components/upskilling/smart-home/IntegrationChallengesSection';
import { FutureTrendsSection } from '@/components/upskilling/smart-home/FutureTrendsSection';
import { SmartHomeSection3RealWorld } from '@/components/upskilling/smart-home/SmartHomeSection3RealWorld';
import { SmartHomeSection3FAQ } from '@/components/upskilling/smart-home/SmartHomeSection3FAQ';
import { SmartHomeSection3Summary } from '@/components/upskilling/smart-home/SmartHomeSection3Summary';
import { SmartHomeSection3Quiz } from '@/components/upskilling/smart-home/SmartHomeSection3Quiz';

const SmartHomeModule1Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Core Components | Smart Home Module 1 Section 3';
    document.title = title;
    const desc = 'Learn about smart home core components: sensors, actuators, and controllers. Understand how these devices work together to create intelligent automation systems.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="../smart-home-module-1">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Cpu className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 1 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Core Components
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Sensors, Actuators, and Controllers in Smart Home Systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeSection3Intro />

          {/* Learning Outcomes */}
          <SmartHomeSection3LearningOutcomes />

          {/* Sensors Section with Interactive Check */}
          <SensorsSection />

          {/* Actuators Section with Interactive Check */}
          <ActuatorsSection />

          {/* Controllers Section with Interactive Check */}
          <ControllersSection />

          {/* Communication Flow Section with Interactive Check */}
          <CommunicationFlowSection />

          {/* Integration Challenges Section with Interactive Check */}
          <IntegrationChallengesSection />

          {/* Future Trends Section with Interactive Check */}
          <FutureTrendsSection />

          {/* Real World Example */}
          <SmartHomeSection3RealWorld />

          {/* FAQ Section */}
          <SmartHomeSection3FAQ />

          {/* Summary */}
          <SmartHomeSection3Summary />

          {/* Quiz Section */}
          <SmartHomeSection3Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-1-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-transparent/80 hover:text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-1-section-4">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
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

export default SmartHomeModule1Section3;