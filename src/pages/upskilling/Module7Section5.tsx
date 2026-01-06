import { ArrowLeft, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import ObservationCodesContent from '@/components/upskilling/ObservationCodesContent';
import ObservationCodesPractical from '@/components/upskilling/ObservationCodesPractical';
import ObservationCodesFAQ from '@/components/upskilling/ObservationCodesFAQ';
import ObservationCodesQuiz from '@/components/upskilling/quiz/ObservationCodesQuiz';

const Module7Section5 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-7">
          <Button variant="ghost" className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileX className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Understanding Observation Codes</h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">Comprehensive guide to C1, C2, C3, and FI classification and application</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Module 7.5</Badge>
            <Badge variant="outline" className="border-gray-600 text-white">40 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <ObservationCodesContent />
          <ObservationCodesPractical />
          <ObservationCodesFAQ />
          <ObservationCodesQuiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="module-7/section-4" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 min-h-[48px]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">Previous: EICR</span>
              </Button>
            </Link>
            <Link to="module-7/section-6" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 min-h-[48px]">
                <span className="text-sm sm:text-base">Next: Documentation Best Practices</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module7Section5;