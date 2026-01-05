import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule6Section4Intro from '@/components/upskilling/smart-home/SmartHomeModule6Section4Intro';
import SmartHomeModule6Section4LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule6Section4LearningOutcomes';
import SmartHomeModule6Section4Bridging from '@/components/upskilling/smart-home/SmartHomeModule6Section4Bridging';
import SmartHomeModule6Section4Legacy from '@/components/upskilling/smart-home/SmartHomeModule6Section4Legacy';
import SmartHomeModule6Section4Methods from '@/components/upskilling/smart-home/SmartHomeModule6Section4Methods';
import SmartHomeModule6Section4Challenges from '@/components/upskilling/smart-home/SmartHomeModule6Section4Challenges';
import SmartHomeModule6Section4Practical from '@/components/upskilling/smart-home/SmartHomeModule6Section4Practical';
import SmartHomeModule6Section4RealWorld from '@/components/upskilling/smart-home/SmartHomeModule6Section4RealWorld';
import SmartHomeModule6Section4FAQ from '@/components/upskilling/smart-home/SmartHomeModule6Section4FAQ';
import SmartHomeModule6Section4Summary from '@/components/upskilling/smart-home/SmartHomeModule6Section4Summary';
import SmartHomeModule6Section4Quiz from '@/components/upskilling/quiz/SmartHomeModule6Section4Quiz';

const SmartHomeModule6Section4 = () => {
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
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Bridging Systems and Legacy Devices</h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">Integrating older systems with modern smart home platforms for seamless operation</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 6.4</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">40 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <SmartHomeModule6Section4Intro />
          <SmartHomeModule6Section4LearningOutcomes />
          <SmartHomeModule6Section4Bridging />
          <SmartHomeModule6Section4Legacy />
          <SmartHomeModule6Section4Methods />
          <SmartHomeModule6Section4Challenges />
          <SmartHomeModule6Section4Practical />
          <SmartHomeModule6Section4RealWorld />
          <SmartHomeModule6Section4FAQ />
          <SmartHomeModule6Section4Summary />
          <SmartHomeModule6Section4Quiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-6-section-3">
              <Button variant="outline" className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            </Link>
            <Link to="../smart-home-module-6-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Next
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule6Section4;