import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule6Section3Intro from '@/components/upskilling/smart-home/SmartHomeModule6Section3Intro';
import SmartHomeModule6Section3LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule6Section3LearningOutcomes';
import SmartHomeModule6Section3Routines from '@/components/upskilling/smart-home/SmartHomeModule6Section3Routines';
import SmartHomeModule6Section3VoiceLogic from '@/components/upskilling/smart-home/SmartHomeModule6Section3VoiceLogic';
import SmartHomeModule6Section3Types from '@/components/upskilling/smart-home/SmartHomeModule6Section3Types';
import SmartHomeModule6Section3Troubleshooting from '@/components/upskilling/smart-home/SmartHomeModule6Section3Troubleshooting';
import SmartHomeModule6Section3Practical from '@/components/upskilling/smart-home/SmartHomeModule6Section3Practical';
import SmartHomeModule6Section3RealWorld from '@/components/upskilling/smart-home/SmartHomeModule6Section3RealWorld';
import SmartHomeModule6Section3FAQ from '@/components/upskilling/smart-home/SmartHomeModule6Section3FAQ';
import SmartHomeModule6Section3Summary from '@/components/upskilling/smart-home/SmartHomeModule6Section3Summary';
import SmartHomeModule6Section3Quiz from '@/components/upskilling/quiz/SmartHomeModule6Section3Quiz';

const SmartHomeModule6Section3 = () => {
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
            <Settings className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Voice Control Logic and Routine Mapping
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Programming voice commands and automation routines for efficient smart home control
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule6Section3Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule6Section3LearningOutcomes />

          {/* Content Sections */}
          <SmartHomeModule6Section3Routines />
          <SmartHomeModule6Section3VoiceLogic />
          <SmartHomeModule6Section3Types />
          <SmartHomeModule6Section3Troubleshooting />
          <SmartHomeModule6Section3Practical />

          {/* Real-World Scenario */}
          <SmartHomeModule6Section3RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule6Section3FAQ />

          {/* Summary */}
          <SmartHomeModule6Section3Summary />

          {/* Quiz Section */}
          <SmartHomeModule6Section3Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule6Section3;