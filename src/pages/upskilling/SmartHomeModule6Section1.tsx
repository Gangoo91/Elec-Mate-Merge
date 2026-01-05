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
            <CircleDot className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Hub Types (Home Assistant, SmartThings, Proprietary)
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Understanding different smart home hub options and their applications
          </p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Module 6.1
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              30 minutes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <SmartHomeModule6Section1Intro />
          <SmartHomeModule6Section1LearningOutcomes />
          <SmartHomeModule6Section1HubPurpose />
          <SmartHomeModule6Section1HomeAssistant />
          <SmartHomeModule6Section1SmartThings />
          <SmartHomeModule6Section1Proprietary />
          <SmartHomeModule6Section1PracticalGuidance />
          <SmartHomeModule6Section1RealWorld />
          <SmartHomeModule6Section1FAQ />
          <SmartHomeModule6Section1Summary />
          <SmartHomeModule6Section1Quiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-6">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 6
              </Button>
            </Link>
            
            <Link to="../smart-home-module-6-section-2">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
              >
                Next: Voice Assistant Integration
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule6Section1;