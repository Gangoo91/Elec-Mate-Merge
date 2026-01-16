import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule2Section6Intro } from '@/components/upskilling/smart-home/SmartHomeModule2Section6Intro';
import { SmartHomeModule2Section6LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule2Section6LearningOutcomes';
import { CompatibilityDefinitionSection } from '@/components/upskilling/smart-home/CompatibilityDefinitionSection';
import { CompatibilityMeaningQuickCheck } from '@/components/upskilling/smart-home/CompatibilityMeaningQuickCheck';
import { CompatibilityMappingSection } from '@/components/upskilling/smart-home/CompatibilityMappingSection';
import { BridgeDefinitionSection } from '@/components/upskilling/smart-home/BridgeDefinitionSection';
import { BridgeExampleQuickCheck } from '@/components/upskilling/smart-home/BridgeExampleQuickCheck';
import { CommonBridgesSection } from '@/components/upskilling/smart-home/CommonBridgesSection';
import { BridgeChallengesSection } from '@/components/upskilling/smart-home/BridgeChallengesSection';
import { BridgeLatencyQuickCheck } from '@/components/upskilling/smart-home/BridgeLatencyQuickCheck';
import { FutureTrendsBridgeSection } from '@/components/upskilling/smart-home/FutureTrendsBridgeSection';
import { FutureMatterQuickCheck } from '@/components/upskilling/smart-home/FutureMatterQuickCheck';
import { SmartHomeModule2Section6RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule2Section6RealWorld';
import { PracticalBridgeImplementationSection } from '@/components/upskilling/smart-home/PracticalBridgeImplementationSection';
import { SmartHomeModule2Section6FAQ } from '@/components/upskilling/smart-home/SmartHomeModule2Section6FAQ';
import { SmartHomeModule2Section6Quiz } from '@/components/upskilling/smart-home/SmartHomeModule2Section6Quiz';
import { SmartHomeModule2Section6Recap } from '@/components/upskilling/smart-home/SmartHomeModule2Section6Recap';

const SmartHomeModule2Section6 = () => {
  // SEO
  useEffect(() => {
    const title = 'Compatibility Mapping and Bridge Use | Smart Home Module 2 Section 6';
    document.title = title;
    const desc = 'Learn device compatibility mapping and bridge usage in smart homes. Understand protocol translation, integration challenges, and future interoperability trends.';
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
        <Link to="../smart-home-module-2">
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
            <GitBranch className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 2 - Section 6
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Compatibility Mapping and Bridge Use
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Device integration strategies and protocol translation techniques
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeModule2Section6Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule2Section6LearningOutcomes />

          {/* Compatibility Definition */}
          <CompatibilityDefinitionSection />

          {/* Quick Check: Compatibility Meaning */}
          <CompatibilityMeaningQuickCheck />

          {/* Compatibility Mapping */}
          <CompatibilityMappingSection />

          {/* Bridge Definition */}
          <BridgeDefinitionSection />

          {/* Quick Check: Bridge Example */}
          <BridgeExampleQuickCheck />

          {/* Common Bridges */}
          <CommonBridgesSection />

          {/* Bridge Challenges */}
          <BridgeChallengesSection />

          {/* Quick Check: Bridge Latency */}
          <BridgeLatencyQuickCheck />

          {/* Future Trends */}
          <FutureTrendsBridgeSection />

          {/* Quick Check: Future Matter */}
          <FutureMatterQuickCheck />

          {/* Real World Scenario */}
          <SmartHomeModule2Section6RealWorld />

          {/* Practical Implementation */}
          <PracticalBridgeImplementationSection />

          {/* FAQ */}
          <SmartHomeModule2Section6FAQ />

          {/* Section Recap */}
          <SmartHomeModule2Section6Recap />

          {/* Quiz */}
          <SmartHomeModule2Section6Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-2-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-transparent/80 hover:text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-3">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule2Section6;