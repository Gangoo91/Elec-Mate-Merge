
import React from 'react';
import { ArrowLeft, TrendingUp, FileText, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { RecordingIntro } from '@/components/upskilling/RecordingIntro';
import { RecordingLearningOutcomes } from '@/components/upskilling/RecordingLearningOutcomes';
import { RecordingContent } from '@/components/upskilling/RecordingContent';
import { RecordingPractical } from '@/components/upskilling/RecordingPractical';
import { RecordingScenario } from '@/components/upskilling/RecordingScenario';
import { RecordingTakeaways } from '@/components/upskilling/RecordingTakeaways';
import { RecordingFAQ } from '@/components/upskilling/RecordingFAQ';
import { RecordingQuizNewStyle } from '@/components/upskilling/RecordingQuizNewStyle';

const Module3Section6 = () => {
  // Set document title and meta description for SEO
  React.useEffect(() => {
    document.title = "Recording Visual Inspection Results - BS 7671 Module 3 Section 6";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how to properly record visual inspection findings in electrical certificates, with correct observation codes and professional documentation standards for BS 7671 compliance.');
    }
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
            <FileText className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 3 - Section 6
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Recording Visual Inspection Results
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Learn how to document visual inspection findings clearly, accurately, and in compliance with BS 7671 standards
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <RecordingIntro />

          {/* Learning Outcomes */}
          <RecordingLearningOutcomes />

          {/* Core Content */}
          <RecordingContent />

          {/* Practical Learning */}
          <RecordingPractical />

          {/* On-the-Job Scenario */}
          <RecordingScenario />

          {/* Key Takeaways */}
          <RecordingTakeaways />

          {/* FAQ Section */}
          <RecordingFAQ />

          {/* Quiz Section */}
          <RecordingQuizNewStyle />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Link to="/study-centre/upskilling/inspection-testing-module-3-section-5">
              <Button
                variant="outline"
                className="text-white border-elec-yellow hover:bg-transparent/80 hover:text-elec-yellow min-h-[48px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/inspection-testing-module-4">
              <Button
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold min-h-[48px]"
              >
                Next Module
                <TrendingUp className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Module3Section6;
