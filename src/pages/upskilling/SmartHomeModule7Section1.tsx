import { ArrowLeft, ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule7Section1Intro from '@/components/upskilling/smart-home/SmartHomeModule7Section1Intro';
import SmartHomeModule7Section1LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule7Section1LearningOutcomes';
import WiringRequirementsSection from '@/components/upskilling/smart-home/WiringRequirementsSection';
import PowerSuppliesSection from '@/components/upskilling/smart-home/PowerSuppliesSection';
import ContainmentSection from '@/components/upskilling/smart-home/ContainmentSection';
import ComplianceSection from '@/components/upskilling/smart-home/ComplianceSection';
import SmartHomeModule7Section1Practical from '@/components/upskilling/smart-home/SmartHomeModule7Section1Practical';
import SmartHomeModule7Section1RealWorld from '@/components/upskilling/smart-home/SmartHomeModule7Section1RealWorld';
import SmartHomeModule7Section1Summary from '@/components/upskilling/smart-home/SmartHomeModule7Section1Summary';
import SmartHomeModule7Section1FAQ from '@/components/upskilling/smart-home/SmartHomeModule7Section1FAQ';
import SmartHomeModule7Section1Quiz from '@/components/upskilling/smart-home/SmartHomeModule7Section1Quiz';

const SmartHomeModule7Section1 = () => {
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
              <Wrench className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Device Wiring, Power Supplies, and Containment</h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">Professional installation practices for safe, reliable, and compliant smart home electrical systems</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.1</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Section 1</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">15 minutes</Badge>
          </div>
        </div>
      </header>
      
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <SmartHomeModule7Section1Intro />
          <SmartHomeModule7Section1LearningOutcomes />
          <WiringRequirementsSection />
          <PowerSuppliesSection />
          <ContainmentSection />
          <ComplianceSection />
          <SmartHomeModule7Section1Practical />
          <SmartHomeModule7Section1RealWorld />
          <SmartHomeModule7Section1Summary />
          <SmartHomeModule7Section1FAQ />
          <SmartHomeModule7Section1Quiz />
        </div>
      </main>
      
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-7">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 7
              </Button>
            </Link>
            <Link to="../smart-home-module-7-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Next: Commissioning and Device Pairing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule7Section1;