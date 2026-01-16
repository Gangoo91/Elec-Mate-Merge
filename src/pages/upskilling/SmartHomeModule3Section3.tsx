import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule3Section3Intro } from '@/components/upskilling/smart-home/SmartHomeModule3Section3Intro';
import { SmartHomeModule3Section3LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule3Section3LearningOutcomes';
import { DimmingInSmartLightingSection } from '@/components/upskilling/smart-home/DimmingInSmartLightingSection';
import { RGBWStandsForQuickCheck } from '@/components/upskilling/smart-home/RGBWStandsForQuickCheck';
import { RGBWSection } from '@/components/upskilling/smart-home/RGBWSection';
import { TrailingEdgeDimmerQuickCheck } from '@/components/upskilling/smart-home/TrailingEdgeDimmerQuickCheck';
import { ColourTemperatureSection } from '@/components/upskilling/smart-home/ColourTemperatureSection';
import { WarmWhiteKelvinQuickCheck } from '@/components/upskilling/smart-home/WarmWhiteKelvinQuickCheck';
import { CompatibilityAndControlSection } from '@/components/upskilling/smart-home/CompatibilityAndControlSection';
import { BenefitsOfDimmingColourControlSection } from '@/components/upskilling/smart-home/BenefitsOfDimmingColourControlSection';

import { TrueWhiteImportanceQuickCheck } from '@/components/upskilling/smart-home/TrueWhiteImportanceQuickCheck';
import { SmartHomeModule3Section3RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule3Section3RealWorld';
import { PracticalDimmingDesignSection } from '@/components/upskilling/smart-home/PracticalDimmingDesignSection';
import { HandsOnColourConfigurationSection } from '@/components/upskilling/smart-home/HandsOnColourConfigurationSection';
import { SmartHomeModule3Section3FAQ } from '@/components/upskilling/smart-home/SmartHomeModule3Section3FAQ';
import { SmartHomeModule3Section3Quiz } from '@/components/upskilling/smart-home/SmartHomeModule3Section3Quiz';

const SmartHomeModule3Section3 = () => {
  useEffect(() => {
    document.title = 'Dimming, RGBW, and Colour Temperature | Smart Home Module 3 Section 3';
    const desc = 'Master smart lighting dimming, RGBW colour control and colour temperature. Learn compatibility, circadian lighting and advanced colour applications.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12 bg-[#1a1a1a]/95">
        <Link to="../smart-home-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Dimming, RGBW, and Colour Temperature</h1>
                <p className="text-lg text-white">Understanding colour control and dimming capabilities</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-card text-yellow-400 border border-gray-600">Module 3 - Section 3</Badge>
            </div>
          </div>

          <SmartHomeModule3Section3Intro />
          <SmartHomeModule3Section3LearningOutcomes />
          <DimmingInSmartLightingSection />
          <RGBWStandsForQuickCheck />
          <RGBWSection />
          <TrailingEdgeDimmerQuickCheck />
          <ColourTemperatureSection />
          <WarmWhiteKelvinQuickCheck />
          <CompatibilityAndControlSection />
          <BenefitsOfDimmingColourControlSection />
          
          <TrueWhiteImportanceQuickCheck />
          <SmartHomeModule3Section3RealWorld />
          <PracticalDimmingDesignSection />
          <HandsOnColourConfigurationSection />
          <SmartHomeModule3Section3FAQ />
          <SmartHomeModule3Section3Quiz />

          <div className="flex justify-between mt-8">
            <Link to="../smart-home-module-3-section-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-3-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule3Section3;