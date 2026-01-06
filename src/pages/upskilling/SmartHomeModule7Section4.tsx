import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../smart-home-module-7">
          <Button variant="ghost" className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-elec-yellow" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Electrical Safety and Isolation</h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">BS 7671 alignment for safe smart home installations</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Module 7.4</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Section 4</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">20 minutes</Badge>
          </div>
        </div>
      </header>
      
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <SmartHomeModule7Section4Intro />
          <SmartHomeModule7Section4LearningOutcomes />
          <ElectricalSafetyIsolationSection />
          <BS7671RequirementsSection />
          <SafetyRisksConsiderationsSection />
          <ElectricalTestingVerificationSection />
          <SmartHomeModule7Section4Practical />
          <SmartHomeModule7Section4RealWorld />
          <SmartHomeModule7Section4Summary />
          <SmartHomeModule7Section4FAQ />
          <SmartHomeModule7Section4Quiz />
        </div>
      </main>
      
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-7-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Wi-Fi Signal Verification
              </Button>
            </Link>
            <Link to="../smart-home-module-7-section-5">
              <Button className="bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200">
                Next: Customer Handover
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule7Section4;