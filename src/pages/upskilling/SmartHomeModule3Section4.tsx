import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule3Section4Intro } from '@/components/upskilling/smart-home/SmartHomeModule3Section4Intro';
import { SmartHomeModule3Section4LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule3Section4LearningOutcomes';
import { TypesOfLoadsSection } from '@/components/upskilling/smart-home/TypesOfLoadsSection';
import { TraditionalVsSmartControlSection } from '@/components/upskilling/smart-home/TraditionalVsSmartControlSection';
import { ResistiveLoadQuickCheck } from '@/components/upskilling/smart-home/ResistiveLoadQuickCheck';
import { LEDCompatibilityIssuesSection } from '@/components/upskilling/smart-home/LEDCompatibilityIssuesSection';
import { TrailingEdgeBestQuickCheck } from '@/components/upskilling/smart-home/TrailingEdgeBestQuickCheck';
import { SmartLightingControlOptionsSection } from '@/components/upskilling/smart-home/SmartLightingControlOptionsSection';
import { MatchingLoadsToControlsSection } from '@/components/upskilling/smart-home/MatchingLoadsToControlsSection';
import { LEDFlickerProblemQuickCheck } from '@/components/upskilling/smart-home/LEDFlickerProblemQuickCheck';
import { BestPracticesLoadCompatibilitySection } from '@/components/upskilling/smart-home/BestPracticesLoadCompatibilitySection';
import { PWMControlQuickCheck } from '@/components/upskilling/smart-home/PWMControlQuickCheck';
import { SmartHomeModule3Section4RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule3Section4RealWorld';
import { PracticalCompatibilityTestingSection } from '@/components/upskilling/smart-home/PracticalCompatibilityTestingSection';
import { HandsOnLoadMatchingSection } from '@/components/upskilling/smart-home/HandsOnLoadMatchingSection';
import { SmartHomeModule3Section4FAQ } from '@/components/upskilling/smart-home/SmartHomeModule3Section4FAQ';
import { SmartHomeModule3Section4Quiz } from '@/components/upskilling/smart-home/SmartHomeModule3Section4Quiz';

const SmartHomeModule3Section4 = () => {
  useEffect(() => {
    document.title = 'Load Compatibility and Control Types | Smart Home Module 3 Section 4';
    const desc = 'Master lighting load types and control compatibility. Learn to match dimmers, switches and smart controllers to different lamp technologies safely.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../smart-home-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Load Compatibility and Control Types</h1>
                <p className="text-lg text-gray-400">Understanding load types and matching appropriate controls</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-card text-yellow-400 border border-gray-600">Module 3 - Section 4</Badge>
            </div>
          </div>

          <SmartHomeModule3Section4Intro />
          <SmartHomeModule3Section4LearningOutcomes />
          <TypesOfLoadsSection />
          <TraditionalVsSmartControlSection />
          <ResistiveLoadQuickCheck />
          <LEDCompatibilityIssuesSection />
          <TrailingEdgeBestQuickCheck />
          <SmartLightingControlOptionsSection />
          <MatchingLoadsToControlsSection />
          <LEDFlickerProblemQuickCheck />
          <BestPracticesLoadCompatibilitySection />
          <PWMControlQuickCheck />
          <SmartHomeModule3Section4RealWorld />
          <PracticalCompatibilityTestingSection />
          <HandsOnLoadMatchingSection />
          <SmartHomeModule3Section4FAQ />
          <SmartHomeModule3Section4Quiz />

          <div className="flex justify-between mt-8">
            <Link to="../smart-home-module-3-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-3-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default SmartHomeModule3Section4;