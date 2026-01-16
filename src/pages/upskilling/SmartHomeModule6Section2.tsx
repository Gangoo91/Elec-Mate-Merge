import { ArrowLeft, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule6Section2Intro } from '@/components/upskilling/smart-home/SmartHomeModule6Section2Intro';
import { SmartHomeModule6Section2LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule6Section2LearningOutcomes';
import { SmartHomeModule6Section2VoiceRole } from '@/components/upskilling/smart-home/SmartHomeModule6Section2VoiceRole';
import { SmartHomeModule6Section2Alexa } from '@/components/upskilling/smart-home/SmartHomeModule6Section2Alexa';
import { SmartHomeModule6Section2GoogleHome } from '@/components/upskilling/smart-home/SmartHomeModule6Section2GoogleHome';
import { SmartHomeModule6Section2Siri } from '@/components/upskilling/smart-home/SmartHomeModule6Section2Siri';
import { SmartHomeModule6Section2PracticalGuidance } from '@/components/upskilling/smart-home/SmartHomeModule6Section2PracticalGuidance';
import { SmartHomeModule6Section2RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule6Section2RealWorld';
import { SmartHomeModule6Section2FAQ } from '@/components/upskilling/smart-home/SmartHomeModule6Section2FAQ';
import { SmartHomeModule6Section2Summary } from '@/components/upskilling/smart-home/SmartHomeModule6Section2Summary';
import { SmartHomeModule6Section2Quiz } from '@/components/upskilling/smart-home/SmartHomeModule6Section2Quiz';

const SmartHomeModule6Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="../smart-home-module-6">
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
            <Mic className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Alexa, Google Home, Siri Integration
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Connecting smart homes with voice assistants and understanding integration options
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule6Section2Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule6Section2LearningOutcomes />

          {/* Content Sections */}
          <SmartHomeModule6Section2VoiceRole />
          <SmartHomeModule6Section2Alexa />
          <SmartHomeModule6Section2GoogleHome />
          <SmartHomeModule6Section2Siri />
          <SmartHomeModule6Section2PracticalGuidance />

          {/* Real-World Scenario */}
          <SmartHomeModule6Section2RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule6Section2FAQ />

          {/* Summary */}
          <SmartHomeModule6Section2Summary />

          {/* Quiz Section */}
          <SmartHomeModule6Section2Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule6Section2;