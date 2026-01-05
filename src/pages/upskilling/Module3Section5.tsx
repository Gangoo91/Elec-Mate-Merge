
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ReadinessIntro } from '@/components/upskilling/ReadinessIntro';
import { ReadinessLearningOutcomes } from '@/components/upskilling/ReadinessLearningOutcomes';
import { ReadinessContent } from '@/components/upskilling/ReadinessContent';
import { ReadinessScenario } from '@/components/upskilling/ReadinessScenario';
import { ReadinessBestPractices } from '@/components/upskilling/ReadinessBestPractices';
import { ReadinessTakeaways } from '@/components/upskilling/ReadinessTakeaways';
import { ReadinessQuiz } from '@/components/upskilling/ReadinessQuiz';
import { ReadinessFAQ } from '@/components/upskilling/ReadinessFAQ';
import { ReadinessPractical } from '@/components/upskilling/ReadinessPractical';

const Module3Section5 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 3 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Confirming Readiness for Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Essential verification steps to ensure installations are ready for electrical testing procedures
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <ReadinessIntro />

          {/* Learning Outcomes */}
          <ReadinessLearningOutcomes />

          {/* Core Content */}
          <ReadinessContent />

          {/* Practical Learning */}
          <ReadinessPractical />

          {/* Best Practices */}
          <ReadinessBestPractices />

          {/* On-the-Job Scenario */}
          <ReadinessScenario />

          {/* Key Takeaways */}
          <ReadinessTakeaways />

          {/* FAQ Section */}
          <ReadinessFAQ />

          {/* Quiz Section */}
          <ReadinessQuiz />

        </div>
      </main>
    </div>
  );
};

export default Module3Section5;
