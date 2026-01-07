
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { RecordingIntro } from '@/components/upskilling/RecordingIntro';
import { RecordingLearningOutcomes } from '@/components/upskilling/RecordingLearningOutcomes';
import { RecordingContent } from '@/components/upskilling/RecordingContent';
import { RecordingScenario } from '@/components/upskilling/RecordingScenario';
import { RecordingTakeaways } from '@/components/upskilling/RecordingTakeaways';
import { RecordingFAQ } from '@/components/upskilling/RecordingFAQ';
import { RecordingPractical } from '@/components/upskilling/RecordingPractical';
import { RecordingQuiz } from '@/components/upskilling/RecordingQuiz';

const Module4Section7 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <Link to="../module-4">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Recording & Interpreting Results
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Proper documentation and interpretation of continuity and insulation resistance test results
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <RecordingIntro />
          <RecordingLearningOutcomes />
          <RecordingContent />
          <RecordingScenario />
          <RecordingTakeaways />
          <RecordingFAQ />
          
          <RecordingPractical />

          <RecordingQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <Link to="../module-4/section-6" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-elec-yellow text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 py-3 px-4 min-h-[48px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Test Methods
              </Button>
            </Link>

            <Link to="../module-5" className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-all duration-200 py-3 px-4 min-h-[48px]"
              >
                Next Module: Polarity Testing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module4Section7;
