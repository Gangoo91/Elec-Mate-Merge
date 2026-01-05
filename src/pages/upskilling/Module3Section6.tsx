
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
    <div className="min-h-screen bg-background text-foreground">
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
            <FileText className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
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
        <div className="max-w-4xl mx-auto space-y-8">
          
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
            <Link to="../module-3-section-5">
              <Button 
                variant="outline" 
                className="text-foreground border-border hover:bg-card hover:text-yellow-400"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../module-4">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400/10 font-semibold"
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
