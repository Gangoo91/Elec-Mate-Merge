
import { ArrowLeft, Zap, Target, BookOpen, Users, Lightbulb, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ContinuityIntro } from '@/components/upskilling/ContinuityIntro';
import { ContinuityLearningOutcomes } from '@/components/upskilling/ContinuityLearningOutcomes';
import { ContinuityContent } from '@/components/upskilling/ContinuityContent';
import { ContinuityScenario } from '@/components/upskilling/ContinuityScenario';
import { ContinuityTakeaways } from '@/components/upskilling/ContinuityTakeaways';
import { ContinuityQuiz } from '@/components/upskilling/ContinuityQuiz';
import { ContinuityFAQ } from '@/components/upskilling/ContinuityFAQ';
import { ContinuityPractical } from '@/components/upskilling/ContinuityPractical';

const Module4Section1 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-4">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Purpose of Continuity Testing
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Understanding the fundamental reasons and requirements for conducting continuity testing in electrical installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <ContinuityIntro />

          {/* Learning Outcomes */}
          <ContinuityLearningOutcomes />

          {/* Core Content */}
          <ContinuityContent />

          {/* Practical Guidance */}
          <ContinuityPractical />

          {/* On-the-Job Scenario */}
          <ContinuityScenario />

          {/* Key Takeaways */}
          <ContinuityTakeaways />

          {/* FAQ Section */}
          <ContinuityFAQ />

          {/* Quiz Section */}
          <ContinuityQuiz />

        </div>
      </main>
    </div>
  );
};

export default Module4Section1;
