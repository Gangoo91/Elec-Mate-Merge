import { ArrowLeft, ArrowRight, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeModule2Section4Intro } from '@/components/upskilling/smart-home/SmartHomeModule2Section4Intro';
import { SmartHomeModule2Section4LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule2Section4LearningOutcomes';
import { InterferenceOverviewSection } from '@/components/upskilling/smart-home/InterferenceOverviewSection';
import { ChannelsFrequenciesSection } from '@/components/upskilling/smart-home/ChannelsFrequenciesSection';
import { BandwidthSmartHomesSection } from '@/components/upskilling/smart-home/BandwidthSmartHomesSection';
import { InterferenceCausesSection } from '@/components/upskilling/smart-home/InterferenceCausesSection';
import { MitigationStrategiesSection } from '@/components/upskilling/smart-home/MitigationStrategiesSection';
import { FutureImprovementsSection } from '@/components/upskilling/smart-home/FutureImprovementsSection';
import { SmartHomeModule2Section4InlineChecks } from '@/components/upskilling/smart-home/SmartHomeModule2Section4InlineChecks';
import { SmartHomeModule2Section4RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule2Section4RealWorld';
import { SmartHomeModule2Section4FAQ } from '@/components/upskilling/smart-home/SmartHomeModule2Section4FAQ';
import { SmartHomeModule2Section4NewQuiz } from '@/components/upskilling/smart-home/SmartHomeModule2Section4NewQuiz';
import { PracticalTroubleshootingSection } from '@/components/upskilling/smart-home/PracticalTroubleshootingSection';
import { HandsOnConfigurationSection } from '@/components/upskilling/smart-home/HandsOnConfigurationSection';
import { InterferenceQuickCheck } from '@/components/upskilling/smart-home/InterferenceQuickCheck';
import { ChannelQuickCheck } from '@/components/upskilling/smart-home/ChannelQuickCheck';
import { BandwidthQuickCheck } from '@/components/upskilling/smart-home/BandwidthQuickCheck';

const SmartHomeModule2Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Interference, Channels & Bandwidth | Smart Home Module 2 Section 4';
    document.title = title;
    const desc = 'Learn about wireless interference, channel allocation, and bandwidth management in smart home networks. Understanding signal conflicts and mitigation strategies.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../smart-home-module-2">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Radio className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 2 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Interference, Channels, and Bandwidth
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Managing signal interference and channel allocation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeModule2Section4Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule2Section4LearningOutcomes />

          {/* Interference Overview */}
          <InterferenceOverviewSection />

          {/* Quick Check: Interference Basics */}
          <InterferenceQuickCheck />

          {/* Channels & Frequencies */}
          <ChannelsFrequenciesSection />

          {/* Quick Check: Wi-Fi Channels */}
          <ChannelQuickCheck />

          {/* Bandwidth */}
          <BandwidthSmartHomesSection />

          {/* Quick Check: Bandwidth Requirements */}
          <BandwidthQuickCheck />

          {/* Interference Causes */}
          <InterferenceCausesSection />

          {/* Mitigation Strategies */}
          <MitigationStrategiesSection />

          {/* Future Improvements */}
          <FutureImprovementsSection />

          {/* Real World */}
          <SmartHomeModule2Section4RealWorld />

          {/* Practical Troubleshooting */}
          <PracticalTroubleshootingSection />

          {/* Hands-On Configuration */}
          <HandsOnConfigurationSection />

          {/* FAQ */}
          <SmartHomeModule2Section4FAQ />

          {/* Quiz */}
          <SmartHomeModule2Section4NewQuiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-2-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-2-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default SmartHomeModule2Section4;