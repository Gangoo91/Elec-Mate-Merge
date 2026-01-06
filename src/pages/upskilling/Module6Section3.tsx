import { ArrowLeft, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import RCDTestingContent from '@/components/upskilling/RCDTestingContent';
import RCDTestingPractical from '@/components/upskilling/RCDTestingPractical';
import RCDTestingFAQ from '@/components/upskilling/RCDTestingFAQ';
import { RCDTestingQuiz } from '@/components/upskilling/quiz/RCDTestingQuiz';

const Module6Section3 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-6">
          <Button variant="ghost" className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <TestTube className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">RCD Testing Procedures</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">Comprehensive testing methods and compliance verification for residual current devices</p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Module 6.3</Badge>
            <Badge variant="outline" className="border-gray-600 text-white">30 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <RCDTestingContent />
          <RCDTestingPractical />
          <RCDTestingFAQ />
          <RCDTestingQuiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-stretch sm:items-center">
            <Link to="module-6/section-2" className="flex-1 sm:flex-initial">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Previous: RCD Types</span>
              </Button>
            </Link>
            <Link to="module-6/section-4" className="flex-1 sm:flex-initial">
              <Button 
                className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <span className="truncate">Next: Installation Requirements</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module6Section3;