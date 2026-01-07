import { ArrowLeft, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import CertificationPurposeContent from '@/components/upskilling/CertificationPurposeContent';
import CertificationPurposePractical from '@/components/upskilling/CertificationPurposePractical';
import CertificationPurposeFAQ from '@/components/upskilling/CertificationPurposeFAQ';
import CertificationPurposeQuiz from '@/components/upskilling/quiz/CertificationPurposeQuiz';

const Module7Section1 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-7">
          <Button variant="ghost" className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Purpose of Certification</h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">Understanding the fundamental role and legal importance of electrical certification</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Module 7.1</Badge>
            <Badge variant="outline" className="border-gray-600 text-white">45 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <CertificationPurposeContent />
          <CertificationPurposePractical />
          <CertificationPurposeFAQ />
          <CertificationPurposeQuiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <div className="order-2 sm:order-1"></div>
            <Link to="../module-7/section-2" className="order-1 sm:order-2 w-full sm:w-auto">
              <Button className="bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 w-full sm:w-auto min-h-[48px] text-sm sm:text-base">
                <span className="hidden sm:inline">Next: Electrical Installation Certificate</span>
                <span className="sm:hidden">Next: EIC</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module7Section1;