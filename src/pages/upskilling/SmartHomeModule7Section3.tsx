import { ArrowLeft, ArrowRight, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule7Section3Intro from '@/components/upskilling/smart-home/SmartHomeModule7Section3Intro';
import SmartHomeModule7Section3LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule7Section3LearningOutcomes';
import SignalImportanceSection from '@/components/upskilling/smart-home/SignalImportanceSection';
import TestingToolsMethodsSection from '@/components/upskilling/smart-home/TestingToolsMethodsSection';
import CoverageOptimisationSection from '@/components/upskilling/smart-home/CoverageOptimisationSection';
import ConnectivityTroubleshootingSection from '@/components/upskilling/smart-home/ConnectivityTroubleshootingSection';
import SmartHomeModule7Section3Practical from '@/components/upskilling/smart-home/SmartHomeModule7Section3Practical';
import SmartHomeModule7Section3RealWorld from '@/components/upskilling/smart-home/SmartHomeModule7Section3RealWorld';
import SmartHomeModule7Section3Summary from '@/components/upskilling/smart-home/SmartHomeModule7Section3Summary';
import SmartHomeModule7Section3FAQ from '@/components/upskilling/smart-home/SmartHomeModule7Section3FAQ';
import SmartHomeModule7Section3Quiz from '@/components/upskilling/smart-home/SmartHomeModule7Section3Quiz';

const SmartHomeModule7Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../smart-home-module-7">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <Wifi className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Wi-Fi and RF Signal Verification</h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">Testing and optimising wireless connectivity for reliable smart home communication</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.3</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Section 3</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">16 minutes</Badge>
          </div>
        </div>
      </header>
      
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <SmartHomeModule7Section3Intro />
          <SmartHomeModule7Section3LearningOutcomes />
          <SignalImportanceSection />
          <TestingToolsMethodsSection />
          <CoverageOptimisationSection />
          <ConnectivityTroubleshootingSection />
          <SmartHomeModule7Section3Practical />
          <SmartHomeModule7Section3RealWorld />
          <SmartHomeModule7Section3Summary />
          <SmartHomeModule7Section3FAQ />
          <SmartHomeModule7Section3Quiz />
        </div>
      </main>
      
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-7-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Commissioning
              </Button>
            </Link>
            <Link to="../smart-home-module-7">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Back to Module 7
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule7Section3;