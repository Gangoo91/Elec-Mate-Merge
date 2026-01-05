import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PolarityPurposeIntro } from '@/components/upskilling/PolarityPurposeIntro';
import { PolarityPurposeLearningOutcomes } from '@/components/upskilling/PolarityPurposeLearningOutcomes';
import { PolarityPurposeContent } from '@/components/upskilling/PolarityPurposeContent';
import { PolarityPurposeScenario } from '@/components/upskilling/PolarityPurposeScenario';
import { PolarityPurposeTakeaways } from '@/components/upskilling/PolarityPurposeTakeaways';
import { PolarityPurposePractical } from '@/components/upskilling/PolarityPurposePractical';
import { PolarityPurposeFAQ } from '@/components/upskilling/PolarityPurposeFAQ';
import { PolarityPurposeSummary } from '@/components/upskilling/PolarityPurposeSummary';
import { PolarityPurposeQuiz } from '@/components/upskilling/PolarityPurposeQuiz';

const Module5Section1 = () => {
  console.log('Module5Section1 component is rendering');
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Purpose of Polarity Testing
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Understanding the fundamental reasons and requirements for conducting polarity testing in electrical installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <PolarityPurposeIntro />
          <PolarityPurposeLearningOutcomes />
          <PolarityPurposeContent />
          <PolarityPurposeScenario />
          <PolarityPurposeTakeaways />
          <PolarityPurposePractical />
          <PolarityPurposeFAQ />
          <PolarityPurposeSummary />
          <PolarityPurposeQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="module-4/section-7">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Recording Results
              </Button>
            </Link>
            
            <Link to="module-5/section-2">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
              >
                Next: Test Methods
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module5Section1;