import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule7Section4Intro } from '@/components/upskilling/bms/BMSModule7Section4Intro';
import { BMSModule7Section4LearningOutcomes } from '@/components/upskilling/bms/BMSModule7Section4LearningOutcomes';
import { BMSModule7Section4ContentPart1 } from '@/components/upskilling/bms/BMSModule7Section4ContentPart1';
import { BMSModule7Section4ContentPart2 } from '@/components/upskilling/bms/BMSModule7Section4ContentPart2';
import { BMSModule7Section4ContentPart3 } from '@/components/upskilling/bms/BMSModule7Section4ContentPart3';
import { BMSModule7Section4Practical } from '@/components/upskilling/bms/BMSModule7Section4Practical';
import { BMSModule7Section4RealWorld } from '@/components/upskilling/bms/BMSModule7Section4RealWorld';
import { BMSModule7Section4Summary } from '@/components/upskilling/bms/BMSModule7Section4Summary';
import { BMSModule7Section4FAQ } from '@/components/upskilling/bms/BMSModule7Section4FAQ';
import { BMSModule7Section4Quiz } from '@/components/upskilling/bms/BMSModule7Section4Quiz';

const BMSModule7Section4 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../bms-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div className="max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Software Upload and Controller Setup
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white break-words">
                  Module 7, Section 4 - System Configuration and Deployment
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 7.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                40 minutes
              </Badge>
            </div>
          </div>

          <BMSModule7Section4Intro />
          <BMSModule7Section4LearningOutcomes />
          <BMSModule7Section4ContentPart1 />
          <BMSModule7Section4ContentPart2 />
          <BMSModule7Section4ContentPart3 />
          <BMSModule7Section4Practical />
          <BMSModule7Section4RealWorld />
          <BMSModule7Section4Summary />
          <BMSModule7Section4FAQ />
          <BMSModule7Section4Quiz />

          <div className="flex justify-between">
            <Link to="../bms-module-7-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-7-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMSModule7Section4;