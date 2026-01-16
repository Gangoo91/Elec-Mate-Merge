import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link as RouterLink } from 'react-router-dom';
import { SmartHomeModule3Section5Intro } from '@/components/upskilling/smart-home/SmartHomeModule3Section5Intro';
import { SmartHomeModule3Section5LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule3Section5LearningOutcomes';
import { GroupingLightsIntoZonesSection } from '@/components/upskilling/smart-home/GroupingLightsIntoZonesSection';
import { LinkingLightingToOtherSystemsSection } from '@/components/upskilling/smart-home/LinkingLightingToOtherSystemsSection';
import { GroupingAdvantageQuickCheck } from '@/components/upskilling/smart-home/GroupingAdvantageQuickCheck';
import { MotionLogicSection } from '@/components/upskilling/smart-home/MotionLogicSection';
import { LinkingExampleQuickCheck } from '@/components/upskilling/smart-home/LinkingExampleQuickCheck';
import { BenefitsOfGroupingLinkingMotionSection } from '@/components/upskilling/smart-home/BenefitsOfGroupingLinkingMotionSection';
import { CommonChallengesAutomationSection } from '@/components/upskilling/smart-home/CommonChallengesAutomationSection';
import { MotionLogicDifferenceQuickCheck } from '@/components/upskilling/smart-home/MotionLogicDifferenceQuickCheck';
import { BestPracticesAutomationSection } from '@/components/upskilling/smart-home/BestPracticesAutomationSection';
import { OverAutomationProblemQuickCheck } from '@/components/upskilling/smart-home/OverAutomationProblemQuickCheck';
import { SmartHomeModule3Section5RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule3Section5RealWorld';
import { SmartHomeModule3Section5FAQ } from '@/components/upskilling/smart-home/SmartHomeModule3Section5FAQ';
import { SmartHomeModule3Section5Quiz } from '@/components/upskilling/smart-home/SmartHomeModule3Section5Quiz';

const SmartHomeModule3Section5 = () => {
  useEffect(() => {
    document.title = 'Grouping, Linking, and Motion Logic | Smart Home Module 3 Section 5';
    const desc = 'Master smart lighting automation through grouping, system linking, and motion-based logic. Learn to create effective automation strategies.';
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
        <RouterLink to="../smart-home-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </RouterLink>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Grouping, Linking, and Motion Logic</h1>
                <p className="text-lg text-gray-400">Smart lighting automation and system integration</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-card text-yellow-400 border border-gray-600">Module 3 - Section 5</Badge>
            </div>
          </div>

          <SmartHomeModule3Section5Intro />
          <SmartHomeModule3Section5LearningOutcomes />
          <GroupingLightsIntoZonesSection />
          <LinkingLightingToOtherSystemsSection />
          <GroupingAdvantageQuickCheck />
          <MotionLogicSection />
          <LinkingExampleQuickCheck />
          <BenefitsOfGroupingLinkingMotionSection />
          <CommonChallengesAutomationSection />
          <MotionLogicDifferenceQuickCheck />
          <BestPracticesAutomationSection />
          <OverAutomationProblemQuickCheck />
          <SmartHomeModule3Section5RealWorld />
          <SmartHomeModule3Section5FAQ />
          <SmartHomeModule3Section5Quiz />

          <div className="flex justify-between mt-8">
            <RouterLink to="../smart-home-module-3-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </RouterLink>
            <RouterLink to="../smart-home-module-3-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule3Section5;