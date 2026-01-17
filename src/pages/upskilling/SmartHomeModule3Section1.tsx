import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule3Section1Intro } from '@/components/upskilling/smart-home/SmartHomeModule3Section1Intro';
import { SmartHomeModule3Section1LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule3Section1LearningOutcomes';
import { LightingTypesOverviewSection } from '@/components/upskilling/smart-home/LightingTypesOverviewSection';
import { SmartBulbSystemsSection } from '@/components/upskilling/smart-home/SmartBulbSystemsSection';
import { LightingRentersQuickCheck } from '@/components/upskilling/smart-home/LightingRentersQuickCheck';
import { SmartSwitchSystemsSection } from '@/components/upskilling/smart-home/SmartSwitchSystemsSection';
import { SmartBulbLimitationQuickCheck } from '@/components/upskilling/smart-home/SmartBulbLimitationQuickCheck';
import { CentralisedWiredControlSection } from '@/components/upskilling/smart-home/CentralisedWiredControlSection';
import { CentralisedNewBuildQuickCheck } from '@/components/upskilling/smart-home/CentralisedNewBuildQuickCheck';
import { HybridLightingSystemsSection } from '@/components/upskilling/smart-home/HybridLightingSystemsSection';
import { RetrofitVsNewBuildSection } from '@/components/upskilling/smart-home/RetrofitVsNewBuildSection';
import { FutureSmartLightingSection } from '@/components/upskilling/smart-home/FutureSmartLightingSection';
import { HybridAdvantageQuickCheck } from '@/components/upskilling/smart-home/HybridAdvantageQuickCheck';
import { SmartHomeModule3Section1RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule3Section1RealWorld';
import { PracticalLightingDesignSection } from '@/components/upskilling/smart-home/PracticalLightingDesignSection';
import { HandsOnLightingConfigurationSection } from '@/components/upskilling/smart-home/HandsOnLightingConfigurationSection';
import { SmartHomeModule3Section1FAQ } from '@/components/upskilling/smart-home/SmartHomeModule3Section1FAQ';
import { SmartHomeModule3Section1Quiz } from '@/components/upskilling/smart-home/SmartHomeModule3Section1Quiz';

const SmartHomeModule3Section1 = () => {
  useEffect(() => {
    document.title = 'Types of Smart Lighting Systems | Smart Home Module 3 Section 1';
    const desc = 'Learn about smart bulbs, switches, centralised systems and hybrid approaches. Compare wired vs wireless lighting solutions for retrofit and new build applications.';
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
        <Link to="/study-centre/upskilling/smart-home-module-3">
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
              <Lightbulb className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Types of Smart Lighting Systems</h1>
                <p className="text-lg text-white">Smart bulbs, switches, and wired systems</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-card text-yellow-400 border border-gray-600">Module 3 - Section 1</Badge>
            </div>
          </div>

          <SmartHomeModule3Section1Intro />
          <SmartHomeModule3Section1LearningOutcomes />
          <LightingTypesOverviewSection />
          <SmartBulbSystemsSection />
          <LightingRentersQuickCheck />
          <SmartSwitchSystemsSection />
          <SmartBulbLimitationQuickCheck />
          <CentralisedWiredControlSection />
          <CentralisedNewBuildQuickCheck />
          <HybridLightingSystemsSection />
          <HybridAdvantageQuickCheck />
          <RetrofitVsNewBuildSection />
          <FutureSmartLightingSection />
          <SmartHomeModule3Section1RealWorld />
          <PracticalLightingDesignSection />
          <HandsOnLightingConfigurationSection />
          <SmartHomeModule3Section1FAQ />
          <SmartHomeModule3Section1Quiz />

          <div className="flex justify-between mt-8">
            <Link to="/study-centre/upskilling/smart-home-module-3">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Module 3 Overview
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/smart-home-module-3-section-2">
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

export default SmartHomeModule3Section1;