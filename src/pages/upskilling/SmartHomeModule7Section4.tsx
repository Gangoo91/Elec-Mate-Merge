import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule7Section4Intro from '@/components/upskilling/smart-home/SmartHomeModule7Section4Intro';
import SmartHomeModule7Section4LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule7Section4LearningOutcomes';
import ElectricalSafetyIsolationSection from '@/components/upskilling/smart-home/ElectricalSafetyIsolationSection';
import BS7671RequirementsSection from '@/components/upskilling/smart-home/BS7671RequirementsSection';
import SafetyRisksConsiderationsSection from '@/components/upskilling/smart-home/SafetyRisksConsiderationsSection';
import ElectricalTestingVerificationSection from '@/components/upskilling/smart-home/ElectricalTestingVerificationSection';
import SmartHomeModule7Section4Practical from '@/components/upskilling/smart-home/SmartHomeModule7Section4Practical';
import SmartHomeModule7Section4RealWorld from '@/components/upskilling/smart-home/SmartHomeModule7Section4RealWorld';
import SmartHomeModule7Section4Summary from '@/components/upskilling/smart-home/SmartHomeModule7Section4Summary';
import SmartHomeModule7Section4FAQ from '@/components/upskilling/smart-home/SmartHomeModule7Section4FAQ';
import SmartHomeModule7Section4Quiz from '@/components/upskilling/smart-home/SmartHomeModule7Section4Quiz';

const SmartHomeModule7Section4 = () => {
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
            <Shield className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Electrical Safety and Isolation
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            BS 7671 alignment for safe smart home installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule7Section4Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule7Section4LearningOutcomes />

          {/* Content Sections */}
          <ElectricalSafetyIsolationSection />
          <BS7671RequirementsSection />
          <SafetyRisksConsiderationsSection />
          <ElectricalTestingVerificationSection />
          <SmartHomeModule7Section4Practical />

          {/* Real-World Scenario */}
          <SmartHomeModule7Section4RealWorld />

          {/* Summary */}
          <SmartHomeModule7Section4Summary />

          {/* FAQ Section */}
          <SmartHomeModule7Section4FAQ />

          {/* Quiz Section */}
          <SmartHomeModule7Section4Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule7Section4;