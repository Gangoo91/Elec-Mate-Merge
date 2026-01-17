import { ArrowLeft, Wifi } from 'lucide-react';
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
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/smart-home-module-7">
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
            <Wifi className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Wi-Fi and RF Signal Verification
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Testing and optimising wireless connectivity for reliable smart home communication
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule7Section3Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule7Section3LearningOutcomes />

          {/* Content Sections */}
          <SignalImportanceSection />
          <TestingToolsMethodsSection />
          <CoverageOptimisationSection />
          <ConnectivityTroubleshootingSection />
          <SmartHomeModule7Section3Practical />

          {/* Real-World Scenario */}
          <SmartHomeModule7Section3RealWorld />

          {/* Summary */}
          <SmartHomeModule7Section3Summary />

          {/* FAQ Section */}
          <SmartHomeModule7Section3FAQ />

          {/* Quiz Section */}
          <SmartHomeModule7Section3Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule7Section3;