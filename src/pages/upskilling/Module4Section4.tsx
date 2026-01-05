
import { ArrowLeft, Gauge, Target, BookOpen, Users, Lightbulb, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { TestProceduresIntro } from '@/components/upskilling/TestProceduresIntro';
import { TestProceduresLearningOutcomes } from '@/components/upskilling/TestProceduresLearningOutcomes';
import { TestProceduresContent } from '@/components/upskilling/TestProceduresContent';
import { TestProceduresScenario } from '@/components/upskilling/TestProceduresScenario';
import { TestProceduresTakeaways } from '@/components/upskilling/TestProceduresTakeaways';
import { TestProceduresQuiz } from '@/components/upskilling/TestProceduresQuiz';
import { TestProceduresFAQ } from '@/components/upskilling/TestProceduresFAQ';
import { TestProceduresPractical } from '@/components/upskilling/TestProceduresPractical';

const Module4Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Gauge className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Test Procedures & Expected Values
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Standard continuity test procedures and expected values for healthy electrical installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <TestProceduresIntro />

          {/* Learning Outcomes */}
          <TestProceduresLearningOutcomes />

          {/* Core Content */}
          <TestProceduresContent />

          {/* Practical Guidelines */}
          <TestProceduresPractical />

          {/* On-the-Job Scenario */}
          <TestProceduresScenario />

          {/* Key Takeaways */}
          <TestProceduresTakeaways />

          {/* FAQ Section */}
          <TestProceduresFAQ />

          {/* Quiz Section */}
          <TestProceduresQuiz />

        </div>
      </main>
    </div>
  );
};

export default Module4Section4;
