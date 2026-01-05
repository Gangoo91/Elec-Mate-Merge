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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../smart-home-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mic className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Alexa, Google Home, Siri Integration
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Connecting smart homes with voice assistants and understanding integration options
          </p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Module 6.2
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              25 minutes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <SmartHomeModule6Section2Intro />
          <SmartHomeModule6Section2LearningOutcomes />
          <SmartHomeModule6Section2VoiceRole />
          <SmartHomeModule6Section2Alexa />
          <SmartHomeModule6Section2GoogleHome />
          <SmartHomeModule6Section2Siri />
          <SmartHomeModule6Section2PracticalGuidance />
          <SmartHomeModule6Section2RealWorld />
          <SmartHomeModule6Section2FAQ />
          <SmartHomeModule6Section2Summary />
          <SmartHomeModule6Section2Quiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-6-section-1">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Hub Types
              </Button>
            </Link>
            
            <Link to="../smart-home-module-6-section-3">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
              >
                Next: Voice Control Logic
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule6Section2;