import { ArrowLeft, ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { TerminationIntro } from '@/components/upskilling/data-cabling/TerminationIntro';
import { TerminationLearningOutcomes } from '@/components/upskilling/data-cabling/TerminationLearningOutcomes';
import { TerminationContent } from '@/components/upskilling/data-cabling/TerminationContent';
import { TerminationCaseStudies } from '@/components/upskilling/data-cabling/TerminationCaseStudies';
import { TerminationScenario } from '@/components/upskilling/data-cabling/TerminationScenario';
import { TerminationTakeaways } from '@/components/upskilling/data-cabling/TerminationTakeaways';
import { TerminationQuiz } from '@/components/upskilling/data-cabling/TerminationQuiz';

const DataCablingModule5Section1 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../data-cabling-module-5">
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
            <Wrench className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Copper Termination Tools and Techniques
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Professional tools and methods for achieving consistent, high-quality copper cable terminations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <TerminationIntro />

          {/* Learning Outcomes */}
          <TerminationLearningOutcomes />

          {/* Core Content */}
          <TerminationContent />

          {/* Case Studies */}
          <TerminationCaseStudies />

          {/* On-the-Job Scenario */}
          <TerminationScenario />

          {/* Key Takeaways */}
          <TerminationTakeaways />

          {/* Quiz Section */}
          <TerminationQuiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../data-cabling-module-5">
              <Button variant="outline" className="border-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module
              </Button>
            </Link>
            <Link to="../data-cabling-module-5-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DataCablingModule5Section1;