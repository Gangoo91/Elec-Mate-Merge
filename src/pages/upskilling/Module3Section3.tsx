
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { DocumentationIntro } from '@/components/upskilling/DocumentationIntro';
import { LearningOutcomes } from '@/components/upskilling/LearningOutcomes';
import { DocumentationContent } from '@/components/upskilling/DocumentationContent';
import { DocumentationScenario } from '@/components/upskilling/DocumentationScenario';
import { DocumentationTakeaways } from '@/components/upskilling/DocumentationTakeaways';
import { DocumentationQuizNewStyle } from '@/components/upskilling/DocumentationQuizNewStyle';
import { DocumentationFAQ } from '@/components/upskilling/DocumentationFAQ';
import { DocumentationPractical } from '@/components/upskilling/DocumentationPractical';

const Module3Section3 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-elec-yellow" />
            <Badge variant="secondary" className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold">
              Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Required Documentation & Design Information
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Essential documentation and design information needed to conduct effective visual inspections
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Quick Intro */}
          <DocumentationIntro />

          {/* Learning Outcomes */}
          <LearningOutcomes />

          {/* Main Content */}
          <DocumentationContent />

          {/* Practical Learning */}
          <DocumentationPractical />

          {/* On-the-Job Scenario */}
          <DocumentationScenario />

          {/* Key Takeaways */}
          <DocumentationTakeaways />

          {/* FAQ Section */}
          <DocumentationFAQ />

          {/* Quick Quiz */}
          <DocumentationQuizNewStyle />

        </div>
      </main>
    </div>
  );
};

export default Module3Section3;
