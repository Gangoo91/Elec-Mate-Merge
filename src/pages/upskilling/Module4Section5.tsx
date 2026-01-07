
import { ArrowLeft, Cable, Target, BookOpen, Users, Lightbulb, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { InsulationResistanceIntro } from '@/components/upskilling/InsulationResistanceIntro';
import { InsulationResistanceLearningOutcomes } from '@/components/upskilling/InsulationResistanceLearningOutcomes';
import { InsulationResistanceContent } from '@/components/upskilling/InsulationResistanceContent';
import { InsulationResistanceTestingProcess } from '@/components/upskilling/InsulationResistanceTestingProcess';
import { InsulationResistanceValues } from '@/components/upskilling/InsulationResistanceValues';
import { InsulationResistanceScenario } from '@/components/upskilling/InsulationResistanceScenario';
import { InsulationResistanceTakeaways } from '@/components/upskilling/InsulationResistanceTakeaways';
import { InsulationResistanceFAQ } from '@/components/upskilling/InsulationResistanceFAQ';
import { InsulationResistancePractical } from '@/components/upskilling/InsulationResistancePractical';
import { InsulationResistanceQuiz } from '@/components/upskilling/InsulationResistanceQuiz';

const Module4Section5 = () => {
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
            <Cable className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Purpose of Insulation Resistance Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl leading-relaxed">
            Understanding the fundamental principles and requirements for insulation resistance testing
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <InsulationResistanceIntro />

          {/* Learning Outcomes */}
          <InsulationResistanceLearningOutcomes />

          {/* Core Content */}
          <InsulationResistanceContent />

          {/* Testing Process */}
          <InsulationResistanceTestingProcess />

          {/* Understanding Values */}
          <InsulationResistanceValues />

          {/* On-the-Job Scenario */}
          <InsulationResistanceScenario />

          {/* Key Takeaways */}
          <InsulationResistanceTakeaways />

          {/* Quiz Section */}
          <InsulationResistanceFAQ />
          
          <InsulationResistancePractical />

          <InsulationResistanceQuiz />

        </div>
      </main>
    </div>
  );
};

export default Module4Section5;
