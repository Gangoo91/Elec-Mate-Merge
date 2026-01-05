import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
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
              <Users className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Customer Handover and App Training</h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">Ensuring client confidence and system usability through effective training</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.5</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Section 5</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">15 minutes</Badge>
          </div>
        </div>
      </header>
      
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <SmartHomeModule7Section5Intro />
          <SmartHomeModule7Section5LearningOutcomes />
          <CustomerHandoverPurposeSection />
          <AppWalkthroughSection />
          <HandoverInformationSection />
          <AftercareAdviceSection />
          <SmartHomeModule7Section5Practical />
          <SmartHomeModule7Section5RealWorld />
          <SmartHomeModule7Section5Summary />
          <SmartHomeModule7Section5FAQ />
          <SmartHomeModule7Section5Quiz />
        </div>
      </main>
      
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-7-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Electrical Safety
              </Button>
            </Link>
            <Link to="../smart-home-module-7-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Next: Documentation & Warranty
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule7Section5;