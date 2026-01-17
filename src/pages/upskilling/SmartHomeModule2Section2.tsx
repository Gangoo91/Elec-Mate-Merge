import { ArrowLeft, ArrowRight, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeModule2Section2Intro } from '@/components/upskilling/smart-home/SmartHomeModule2Section2Intro';
import { SmartHomeModule2Section2LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule2Section2LearningOutcomes';
import { MeshNetworkingBasicsSection } from '@/components/upskilling/smart-home/MeshNetworkingBasicsSection';
import { ZigbeeOverviewSection } from '@/components/upskilling/smart-home/ZigbeeOverviewSection';
import { ZWaveOverviewSection } from '@/components/upskilling/smart-home/ZWaveOverviewSection';
import { ZigbeeZWaveComparisonSection } from '@/components/upskilling/smart-home/ZigbeeZWaveComparisonSection';
import { CompatibilityConsiderationsSection } from '@/components/upskilling/smart-home/CompatibilityConsiderationsSection';
import { BestUseCasesSection } from '@/components/upskilling/smart-home/BestUseCasesSection';
import { SmartHomeModule2Section2RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule2Section2RealWorld';
import { SmartHomeModule2Section2FAQ } from '@/components/upskilling/smart-home/SmartHomeModule2Section2FAQ';
import { SmartHomeModule2Section2Summary } from '@/components/upskilling/smart-home/SmartHomeModule2Section2Summary';
import { SmartHomeModule2Section2Quiz } from '@/components/upskilling/smart-home/SmartHomeModule2Section2Quiz';

const SmartHomeModule2Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Zigbee vs Z-Wave Comparison | Smart Home Module 2 Section 2';
    document.title = title;
    const desc = 'Compare Zigbee and Z-Wave protocols. Learn about mesh networking, range, power consumption, and when to choose each protocol for smart home installations.';
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
        <Link to="/study-centre/upskilling/smart-home-module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Network className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 2 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Zigbee vs Z-Wave
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Range, Mesh Networking, and Power Consumption
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeModule2Section2Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule2Section2LearningOutcomes />

          {/* Mesh Networking Basics */}
          <MeshNetworkingBasicsSection />

          {/* Zigbee Overview */}
          <ZigbeeOverviewSection />

          {/* Z-Wave Overview */}
          <ZWaveOverviewSection />

          {/* Comparison Section */}
          <ZigbeeZWaveComparisonSection />

          {/* Compatibility Considerations */}
          <CompatibilityConsiderationsSection />

          {/* Best Use Cases */}
          <BestUseCasesSection />

          {/* Real World Example */}
          <SmartHomeModule2Section2RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule2Section2FAQ />

          {/* Summary */}
          <SmartHomeModule2Section2Summary />

          {/* Quiz Section */}
          <SmartHomeModule2Section2Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="/study-centre/upskilling/smart-home-module-2-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-transparent/80 hover:text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/smart-home-module-2-section-3">
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

export default SmartHomeModule2Section2;