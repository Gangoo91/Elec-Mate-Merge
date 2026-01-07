import { ArrowLeft, ArrowRight, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PolarityMethodsIntro } from '@/components/upskilling/PolarityMethodsIntro';
import { PolarityMethodsLearningOutcomes } from '@/components/upskilling/PolarityMethodsLearningOutcomes';
import { PolarityMethodsContent } from '@/components/upskilling/PolarityMethodsContent';
import { PolarityMethodsScenario } from '@/components/upskilling/PolarityMethodsScenario';
import { PolarityMethodsTakeaways } from '@/components/upskilling/PolarityMethodsTakeaways';
import { PolarityMethodsPractical } from '@/components/upskilling/PolarityMethodsPractical';
import { PolarityMethodsFAQ } from '@/components/upskilling/PolarityMethodsFAQ';
import { PolarityMethodsSummary } from '@/components/upskilling/PolarityMethodsSummary';
import { PolarityMethodsQuiz } from '@/components/upskilling/PolarityMethodsQuiz';

const Module5Section2 = () => {
  console.log('Module5Section2 component is rendering');
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <TestTube className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Polarity Test Methods
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Practical testing procedures and methods for verifying correct polarity in different circuit configurations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <PolarityMethodsIntro />
          <PolarityMethodsLearningOutcomes />
          <PolarityMethodsContent />
          <PolarityMethodsScenario />
          <PolarityMethodsTakeaways />
          <PolarityMethodsPractical />
          <PolarityMethodsFAQ />
          <PolarityMethodsSummary />
          <PolarityMethodsQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../module-5/section-1">
              <Button
                variant="outline"
                className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 min-h-[48px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Purpose of Testing
              </Button>
            </Link>

            <Link to="../module-5/section-3">
              <Button
                className="bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 min-h-[48px]"
              >
                Next: Earth Fault Loop Impedance
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module5Section2;