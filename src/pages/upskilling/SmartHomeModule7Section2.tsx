import { ArrowLeft, ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule7Section2Intro from '@/components/upskilling/smart-home/SmartHomeModule7Section2Intro';
import SmartHomeModule7Section2LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule7Section2LearningOutcomes';
import CommissioningFundamentalsSection from '@/components/upskilling/smart-home/CommissioningFundamentalsSection';
import DevicePairingSection from '@/components/upskilling/smart-home/DevicePairingSection';
import TestingVerificationSection from '@/components/upskilling/smart-home/TestingVerificationSection';
import TroubleshootingIssuesSection from '@/components/upskilling/smart-home/TroubleshootingIssuesSection';
import SmartHomeModule7Section2Practical from '@/components/upskilling/smart-home/SmartHomeModule7Section2Practical';
import SmartHomeModule7Section2RealWorld from '@/components/upskilling/smart-home/SmartHomeModule7Section2RealWorld';
import SmartHomeModule7Section2Summary from '@/components/upskilling/smart-home/SmartHomeModule7Section2Summary';
import SmartHomeModule7Section2FAQ from '@/components/upskilling/smart-home/SmartHomeModule7Section2FAQ';
import SmartHomeModule7Section2Quiz from '@/components/upskilling/smart-home/SmartHomeModule7Section2Quiz';

const SmartHomeModule7Section2 = () => {
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
              <Settings className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Commissioning and Device Pairing</h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">Testing, configuring, and pairing devices for reliable smart home operation</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.2</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Section 2</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">18 minutes</Badge>
          </div>
        </div>
      </header>
      
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <SmartHomeModule7Section2Intro />
          <SmartHomeModule7Section2LearningOutcomes />
          <CommissioningFundamentalsSection />
          <DevicePairingSection />
          <TestingVerificationSection />
          <TroubleshootingIssuesSection />
          <SmartHomeModule7Section2Practical />
          <SmartHomeModule7Section2RealWorld />
          <SmartHomeModule7Section2Summary />
          <SmartHomeModule7Section2FAQ />
          <SmartHomeModule7Section2Quiz />
        </div>
      </main>
      
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-7-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Device Wiring
              </Button>
            </Link>
            <Link to="../smart-home-module-7-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Next: Wi-Fi and RF Signal Verification
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule7Section2;