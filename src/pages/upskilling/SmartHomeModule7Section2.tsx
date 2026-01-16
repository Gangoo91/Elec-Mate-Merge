import { ArrowLeft, Settings } from 'lucide-react';
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
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="../smart-home-module-7">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Commissioning and Device Pairing
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Testing, configuring, and pairing devices for reliable smart home operation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule7Section2Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule7Section2LearningOutcomes />

          {/* Content Sections */}
          <CommissioningFundamentalsSection />
          <DevicePairingSection />
          <TestingVerificationSection />
          <TroubleshootingIssuesSection />
          <SmartHomeModule7Section2Practical />

          {/* Real-World Scenario */}
          <SmartHomeModule7Section2RealWorld />

          {/* Summary */}
          <SmartHomeModule7Section2Summary />

          {/* FAQ Section */}
          <SmartHomeModule7Section2FAQ />

          {/* Quiz Section */}
          <SmartHomeModule7Section2Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule7Section2;