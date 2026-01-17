import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FaultCurrentContent } from '@/components/upskilling/FaultCurrentContent';
import { FaultCurrentPractical } from '@/components/upskilling/FaultCurrentPractical';
import { FaultCurrentFAQ } from '@/components/upskilling/FaultCurrentFAQ';
import { FaultCurrentSummary } from '@/components/upskilling/FaultCurrentSummary';
import { FaultCurrentQuiz } from '@/components/upskilling/quiz/FaultCurrentQuiz';

const Module5Section5 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="/study-centre/upskilling/inspection-testing-module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Zap className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Prospective Fault Current Testing
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl leading-relaxed">
            Measurement and assessment of prospective short-circuit and earth fault currents in electrical systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <FaultCurrentContent />
          <FaultCurrentPractical />
          <FaultCurrentFAQ />
          <FaultCurrentSummary />
          <FaultCurrentQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/study-centre/upskilling/inspection-testing-module-5-section-4" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 py-3 px-6 text-sm sm:text-base min-h-[48px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Testing at Points
              </Button>
            </Link>

            <Link to="/study-centre/upskilling/inspection-testing-module-5-section-6" className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 py-3 px-6 text-sm sm:text-base min-h-[48px]"
              >
                Next: Equipment Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module5Section5;