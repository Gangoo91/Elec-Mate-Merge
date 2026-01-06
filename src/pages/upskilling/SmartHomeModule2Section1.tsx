import { ArrowLeft, ArrowRight, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeModule2Section1Intro } from '@/components/upskilling/smart-home/SmartHomeModule2Section1Intro';
import { SmartHomeModule2Section1LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule2Section1LearningOutcomes';
import { WirelessProtocolBasicsSection } from '@/components/upskilling/smart-home/WirelessProtocolBasicsSection';
import { ProtocolImportanceSection } from '@/components/upskilling/smart-home/ProtocolImportanceSection';
import { CommonProtocolsSection } from '@/components/upskilling/smart-home/CommonProtocolsSection';
import { ProtocolComparisonSection } from '@/components/upskilling/smart-home/ProtocolComparisonSection';
import { ChoosingProtocolSection } from '@/components/upskilling/smart-home/ChoosingProtocolSection';
import { SmartHomeModule2Section1RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule2Section1RealWorld';
import { SmartHomeModule2Section1FAQ } from '@/components/upskilling/smart-home/SmartHomeModule2Section1FAQ';
import { SmartHomeModule2Section1Summary } from '@/components/upskilling/smart-home/SmartHomeModule2Section1Summary';
import { SmartHomeModule2Section1Quiz } from '@/components/upskilling/smart-home/SmartHomeModule2Section1Quiz';

const SmartHomeModule2Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Wireless Protocol Overview | Smart Home Module 2 Section 1';
    document.title = title;
    const desc = 'Learn about wireless communication protocols in smart homes. Understand Zigbee, Z-Wave, Wi-Fi, Bluetooth, Thread, and Matter protocols for device connectivity.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../smart-home-module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Radio className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 2 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Wireless Protocol Overview
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Communication Standards and Device Connectivity
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeModule2Section1Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule2Section1LearningOutcomes />

          {/* What is a Wireless Protocol */}
          <WirelessProtocolBasicsSection />

          {/* Why Protocols Matter */}
          <ProtocolImportanceSection />

          {/* Common Protocols */}
          <CommonProtocolsSection />

          {/* Protocol Comparisons */}
          <ProtocolComparisonSection />

          {/* Choosing the Right Protocol */}
          <ChoosingProtocolSection />

          {/* Real World Example */}
          <SmartHomeModule2Section1RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule2Section1FAQ />

          {/* Summary */}
          <SmartHomeModule2Section1Summary />

          {/* Quiz Section */}
          <SmartHomeModule2Section1Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-transparent/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 2
              </Button>
            </Link>
            <Link to="../smart-home-module-2-section-2">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600">
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

export default SmartHomeModule2Section1;