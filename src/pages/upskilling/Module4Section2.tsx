
import { ArrowLeft, ShieldCheck, Target, BookOpen, Users, Lightbulb, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ProtectiveConductorIntro } from '@/components/upskilling/ProtectiveConductorIntro';
import { ProtectiveConductorLearningOutcomes } from '@/components/upskilling/ProtectiveConductorLearningOutcomes';
import { ProtectiveConductorContent } from '@/components/upskilling/ProtectiveConductorContent';
import { ProtectiveConductorScenario } from '@/components/upskilling/ProtectiveConductorScenario';
import { ProtectiveConductorTakeaways } from '@/components/upskilling/ProtectiveConductorTakeaways';
import { ProtectiveConductorQuiz } from '@/components/upskilling/ProtectiveConductorQuiz';
import { ProtectiveConductorFAQ } from '@/components/upskilling/ProtectiveConductorFAQ';
import { ProtectiveConductorPractical } from '@/components/upskilling/ProtectiveConductorPractical';

const Module4Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="/study-centre/upskilling/inspection-testing-module-4">
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
            <ShieldCheck className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Protective Conductor Continuity
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Testing methods and procedures for protective conductor continuity including CPC and equipotential bonding
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <ProtectiveConductorIntro />

          {/* Learning Outcomes */}
          <ProtectiveConductorLearningOutcomes />

          {/* Core Content */}
          <ProtectiveConductorContent />

          {/* Practical Guidance */}
          <ProtectiveConductorPractical />

          {/* On-the-Job Scenario */}
          <ProtectiveConductorScenario />

          {/* Key Takeaways */}
          <ProtectiveConductorTakeaways />

          {/* FAQ Section */}
          <ProtectiveConductorFAQ />

          {/* Quiz Section */}
          <ProtectiveConductorQuiz />

        </div>
      </main>
    </div>
  );
};

export default Module4Section2;
