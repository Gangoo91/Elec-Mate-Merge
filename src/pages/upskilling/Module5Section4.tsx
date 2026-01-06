import { ArrowLeft, ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ZsTestingContent } from '@/components/upskilling/ZsTestingContent';
import { ZsTestingPractical } from '@/components/upskilling/ZsTestingPractical';
import { ZsTestingFAQ } from '@/components/upskilling/ZsTestingFAQ';
import { ZsTestingSummary } from '@/components/upskilling/ZsTestingSummary';
import { ZsTestingQuiz } from '@/components/upskilling/quiz/ZsTestingQuiz';

const Module5Section4 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Testing Zs at Various Points
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Procedures for measuring earth fault loop impedance at different points throughout the installation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <ZsTestingContent />
          <ZsTestingPractical />
          <ZsTestingFAQ />
          <ZsTestingSummary />
          <ZsTestingQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="module-5/section-3">
              <Button 
                variant="outline" 
                className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Earth Fault Loop
              </Button>
            </Link>
            
            <Link to="module-5/section-5">
              <Button 
                className="bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200"
              >
                Next: Fault Current Testing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module5Section4;