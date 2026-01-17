import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule7Section5Intro from '@/components/upskilling/smart-home/SmartHomeModule7Section5Intro';
import SmartHomeModule7Section5LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule7Section5LearningOutcomes';
import CustomerHandoverPurposeSection from '@/components/upskilling/smart-home/CustomerHandoverPurposeSection';
import AppWalkthroughSection from '@/components/upskilling/smart-home/AppWalkthroughSection';
import HandoverInformationSection from '@/components/upskilling/smart-home/HandoverInformationSection';
import AftercareAdviceSection from '@/components/upskilling/smart-home/AftercareAdviceSection';
import SmartHomeModule7Section5Practical from '@/components/upskilling/smart-home/SmartHomeModule7Section5Practical';
import SmartHomeModule7Section5RealWorld from '@/components/upskilling/smart-home/SmartHomeModule7Section5RealWorld';
import SmartHomeModule7Section5Summary from '@/components/upskilling/smart-home/SmartHomeModule7Section5Summary';
import SmartHomeModule7Section5FAQ from '@/components/upskilling/smart-home/SmartHomeModule7Section5FAQ';
import SmartHomeModule7Section5Quiz from '@/components/upskilling/smart-home/SmartHomeModule7Section5Quiz';

const SmartHomeModule7Section5 = () => {
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
            <Users className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Customer Handover and App Training
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Ensuring client confidence and system usability through effective training
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule7Section5Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule7Section5LearningOutcomes />

          {/* Content Sections */}
          <CustomerHandoverPurposeSection />
          <AppWalkthroughSection />
          <HandoverInformationSection />
          <AftercareAdviceSection />
          <SmartHomeModule7Section5Practical />

          {/* Real-World Scenario */}
          <SmartHomeModule7Section5RealWorld />

          {/* Summary */}
          <SmartHomeModule7Section5Summary />

          {/* FAQ Section */}
          <SmartHomeModule7Section5FAQ />

          {/* Quiz Section */}
          <SmartHomeModule7Section5Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule7Section5;