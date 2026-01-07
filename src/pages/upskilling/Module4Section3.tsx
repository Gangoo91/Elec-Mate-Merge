
import { ArrowLeft, RotateCcw, Target, BookOpen, Users, Lightbulb, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { RingFinalIntro } from '@/components/upskilling/RingFinalIntro';
import { RingFinalLearningOutcomes } from '@/components/upskilling/RingFinalLearningOutcomes';
import { RingFinalContent } from '@/components/upskilling/RingFinalContent';
import { R1R2MethodExplained } from '@/components/upskilling/R1R2MethodExplained';
import { RingFinalScenario } from '@/components/upskilling/RingFinalScenario';
import { RingFinalTakeaways } from '@/components/upskilling/RingFinalTakeaways';
import { RingFinalQuiz } from '@/components/upskilling/RingFinalQuiz';
import { RingFinalFAQ } from '@/components/upskilling/RingFinalFAQ';
import { RingFinalPractical } from '@/components/upskilling/RingFinalPractical';

const Module4Section3 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
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
            <RotateCcw className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ring Final Circuit Continuity
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Comprehensive testing procedures for ring final circuits including end-to-end and cross-connection tests
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <RingFinalIntro />

          {/* Learning Outcomes */}
          <RingFinalLearningOutcomes />

          {/* Core Content */}
          <RingFinalContent />

          {/* R1 + R2 Method Detailed Explanation */}
          <R1R2MethodExplained />

          {/* Practical Testing Procedures */}
          <RingFinalPractical />

          {/* On-the-Job Scenario */}
          <RingFinalScenario />

          {/* Key Takeaways */}
          <RingFinalTakeaways />

          {/* FAQ Section */}
          <RingFinalFAQ />

          {/* Quiz Section */}
          <RingFinalQuiz />

        </div>
      </main>
    </div>
  );
};

export default Module4Section3;
