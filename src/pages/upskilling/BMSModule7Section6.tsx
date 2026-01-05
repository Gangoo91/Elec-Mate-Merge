import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule7Section6Intro } from '@/components/upskilling/bms/BMSModule7Section6Intro';
import { BMSModule7Section6LearningOutcomes } from '@/components/upskilling/bms/BMSModule7Section6LearningOutcomes';
import { BMSModule7Section6ContentPart1 } from '@/components/upskilling/bms/BMSModule7Section6ContentPart1';
import { BMSModule7Section6ContentPart2 } from '@/components/upskilling/bms/BMSModule7Section6ContentPart2';
import { BMSModule7Section6ContentPart3 } from '@/components/upskilling/bms/BMSModule7Section6ContentPart3';
import { BMSModule7Section6Practical } from '@/components/upskilling/bms/BMSModule7Section6Practical';
import { BMSModule7Section6RealWorld } from '@/components/upskilling/bms/BMSModule7Section6RealWorld';
import { BMSModule7Section6Summary } from '@/components/upskilling/bms/BMSModule7Section6Summary';
import { BMSModule7Section6FAQ } from '@/components/upskilling/bms/BMSModule7Section6FAQ';
import { BMSModule7Section6Quiz } from '@/components/upskilling/bms/BMSModule7Section6Quiz';

const BMSModule7Section6 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
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
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Client Handover and Documentation Requirements
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white break-words">
                  Module 7, Section 6 - Project Completion and Handover
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 7.6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                45 minutes
              </Badge>
            </div>
          </div>

          <BMSModule7Section6Intro />
          <BMSModule7Section6LearningOutcomes />
          <BMSModule7Section6ContentPart1 />
          <BMSModule7Section6ContentPart2 />
          <BMSModule7Section6ContentPart3 />
          <BMSModule7Section6Practical />
          <BMSModule7Section6RealWorld />
          <BMSModule7Section6Summary />
          <BMSModule7Section6FAQ />
          <BMSModule7Section6Quiz />

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link to="../bms-module-7-section-5">
              <Button
                variant="outline"
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            
            <Link to="../bms-course">
              <Button className="bg-yellow-400 hover:bg-yellow-400 text-black">
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

export default BMSModule7Section6;