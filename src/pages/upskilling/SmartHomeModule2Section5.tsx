import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule2Section5Intro } from '@/components/upskilling/smart-home/SmartHomeModule2Section5Intro';
import { SmartHomeModule2Section5LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule2Section5LearningOutcomes';
import { HubDetailedOverviewSection } from '@/components/upskilling/smart-home/HubDetailedOverviewSection';
import { HubRoleQuickCheck } from '@/components/upskilling/smart-home/HubRoleQuickCheck';
import { HubBasedEcosystemsSection } from '@/components/upskilling/smart-home/HubBasedEcosystemsSection';
import { HublessEcosystemsSection } from '@/components/upskilling/smart-home/HublessEcosystemsSection';
import { HublessAdvantageQuickCheck } from '@/components/upskilling/smart-home/HublessAdvantageQuickCheck';
import { HybridApproachesSection } from '@/components/upskilling/smart-home/HybridApproachesSection';
import { ChoosingHubVsHublessSection } from '@/components/upskilling/smart-home/ChoosingHubVsHublessSection';
import { WiFiReliabilityQuickCheck } from '@/components/upskilling/smart-home/WiFiReliabilityQuickCheck';
import { FutureTrendsHubSection } from '@/components/upskilling/smart-home/FutureTrendsHubSection';
import { FutureStandardQuickCheck } from '@/components/upskilling/smart-home/FutureStandardQuickCheck';
import { SmartHomeModule2Section5RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule2Section5RealWorld';
import { PracticalImplementationSection } from '@/components/upskilling/smart-home/PracticalImplementationSection';
import { SmartHomeModule2Section5FAQ } from '@/components/upskilling/smart-home/SmartHomeModule2Section5FAQ';
import { SmartHomeModule2Section5Quiz } from '@/components/upskilling/smart-home/SmartHomeModule2Section5Quiz';
import { SmartHomeModule2Section5Recap } from '@/components/upskilling/smart-home/SmartHomeModule2Section5Recap';

const SmartHomeModule2Section5 = () => {
  // SEO
  useEffect(() => {
    const title = 'Hub vs Hubless Ecosystems | Smart Home Module 2 Section 5';
    document.title = title;
    const desc = 'Learn the differences between hub-based and hubless smart home ecosystems. Compare advantages, limitations, and best use cases for each approach.';
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
            <CircleDot className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 2 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Hub vs Hubless Ecosystems
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding centralised vs distributed smart home architectures
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeModule2Section5Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule2Section5LearningOutcomes />

          {/* Hub Definition & Overview */}
          <HubDetailedOverviewSection />

          {/* Quick Check: Hub Role */}
          <HubRoleQuickCheck />

          {/* Hub-Based Systems */}
          <HubBasedEcosystemsSection />

          {/* Hubless Systems */}
          <HublessEcosystemsSection />

          {/* Quick Check: Hubless Advantages */}
          <HublessAdvantageQuickCheck />

          {/* Hybrid Approaches */}
          <HybridApproachesSection />

          {/* Choosing Hub vs Hubless */}
          <ChoosingHubVsHublessSection />

          {/* Quick Check: Wi-Fi Reliability */}
          <WiFiReliabilityQuickCheck />

          {/* Future Trends */}
          <FutureTrendsHubSection />

          {/* Quick Check: Future Standards */}
          <FutureStandardQuickCheck />

          {/* Real World Scenario */}
          <SmartHomeModule2Section5RealWorld />

          {/* Practical Implementation */}
          <PracticalImplementationSection />

          {/* FAQ */}
          <SmartHomeModule2Section5FAQ />

          {/* Section Recap */}
          <SmartHomeModule2Section5Recap />

          {/* Quiz */}
          <SmartHomeModule2Section5Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-2-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-transparent/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-2">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600">
                Back to Module 2
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule2Section5;