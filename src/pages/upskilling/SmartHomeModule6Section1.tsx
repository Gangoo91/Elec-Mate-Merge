import { ArrowLeft, CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule6Section1Intro } from '@/components/upskilling/smart-home/SmartHomeModule6Section1Intro';
import { SmartHomeModule6Section1LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule6Section1LearningOutcomes';
import { SmartHomeModule6Section1HubPurpose } from '@/components/upskilling/smart-home/SmartHomeModule6Section1HubPurpose';
import { SmartHomeModule6Section1HomeAssistant } from '@/components/upskilling/smart-home/SmartHomeModule6Section1HomeAssistant';
import { SmartHomeModule6Section1SmartThings } from '@/components/upskilling/smart-home/SmartHomeModule6Section1SmartThings';
import { SmartHomeModule6Section1Proprietary } from '@/components/upskilling/smart-home/SmartHomeModule6Section1Proprietary';
import { SmartHomeModule6Section1PracticalGuidance } from '@/components/upskilling/smart-home/SmartHomeModule6Section1PracticalGuidance';
import { SmartHomeModule6Section1RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule6Section1RealWorld';
import { SmartHomeModule6Section1FAQ } from '@/components/upskilling/smart-home/SmartHomeModule6Section1FAQ';
import { SmartHomeModule6Section1Summary } from '@/components/upskilling/smart-home/SmartHomeModule6Section1Summary';
import { SmartHomeModule6Section1Quiz } from '@/components/upskilling/smart-home/SmartHomeModule6Section1Quiz';

const SmartHomeModule6Section1 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/smart-home-module-6">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CircleDot className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Hub Types (Home Assistant, SmartThings, Proprietary)
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding different smart home hub options and their applications
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule6Section1Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule6Section1LearningOutcomes />

          {/* Content Sections */}
          <SmartHomeModule6Section1HubPurpose />
          <SmartHomeModule6Section1HomeAssistant />
          <SmartHomeModule6Section1SmartThings />
          <SmartHomeModule6Section1Proprietary />
          <SmartHomeModule6Section1PracticalGuidance />

          {/* Real-World Scenario */}
          <SmartHomeModule6Section1RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule6Section1FAQ />

          {/* Summary */}
          <SmartHomeModule6Section1Summary />

          {/* Quiz Section */}
          <SmartHomeModule6Section1Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule6Section1;