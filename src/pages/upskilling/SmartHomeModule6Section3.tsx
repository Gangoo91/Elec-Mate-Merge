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
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../smart-home-module-6">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Voice Control Logic and Routine Mapping</h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">Programming voice commands and automation routines for efficient smart home control</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 6.3</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">45 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <SmartHomeModule6Section3Intro />
          <SmartHomeModule6Section3LearningOutcomes />
          <SmartHomeModule6Section3Routines />
          <SmartHomeModule6Section3VoiceLogic />
          <SmartHomeModule6Section3Types />
          <SmartHomeModule6Section3Troubleshooting />
          <SmartHomeModule6Section3Practical />
          <SmartHomeModule6Section3RealWorld />
          <SmartHomeModule6Section3FAQ />
          <SmartHomeModule6Section3Summary />
          <SmartHomeModule6Section3Quiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-6-section-2">
              <Button variant="outline" className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Voice Assistants
              </Button>
            </Link>
            <Link to="../smart-home-module-6-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Next: Bridging Systems
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule6Section3;