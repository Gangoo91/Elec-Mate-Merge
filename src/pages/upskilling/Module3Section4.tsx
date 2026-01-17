
import { ArrowLeft, Eye, CheckCircle, FileText, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AccessibilityIntro } from '@/components/upskilling/AccessibilityIntro';
import { AccessibilityLearningOutcomes } from '@/components/upskilling/AccessibilityLearningOutcomes';
import { AccessibilityContent } from '@/components/upskilling/AccessibilityContent';
import { AccessibilityCaseStudies } from '@/components/upskilling/AccessibilityCaseStudies';
import { AccessibilityScenario } from '@/components/upskilling/AccessibilityScenario';
import { AccessibilityTakeaways } from '@/components/upskilling/AccessibilityTakeaways';
import { AccessibilityQuizNewStyle } from '@/components/upskilling/AccessibilityQuizNewStyle';
import { AccessibilityFAQ } from '@/components/upskilling/AccessibilityFAQ';
import { AccessibilityPractical } from '@/components/upskilling/AccessibilityPractical';

const Module3Section4 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="/study-centre/upskilling/inspection-testing-module-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 3 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Verifying Installation Accessibility & Labels
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Checking accessibility of electrical installations and verifying appropriate labelling and identification
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <AccessibilityIntro />

          {/* Learning Outcomes */}
          <AccessibilityLearningOutcomes />

          {/* Core Content */}
          <AccessibilityContent />

          {/* Practical Learning */}
          <AccessibilityPractical />

          {/* Case Studies */}
          <AccessibilityCaseStudies />

          {/* On-the-Job Scenario */}
          <AccessibilityScenario />

          {/* Key Takeaways */}
          <AccessibilityTakeaways />

          {/* FAQ Section */}
          <AccessibilityFAQ />

          {/* Quiz Section */}
          <AccessibilityQuizNewStyle />

        </div>
      </main>
    </div>
  );
};

export default Module3Section4;
