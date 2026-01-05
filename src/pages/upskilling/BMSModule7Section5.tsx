import { ArrowLeft, ArrowRight, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule7Section5Intro } from '@/components/upskilling/bms/BMSModule7Section5Intro';
import { BMSModule7Section5LearningOutcomes } from '@/components/upskilling/bms/BMSModule7Section5LearningOutcomes';
import { BMSModule7Section5ContentPart1 } from '@/components/upskilling/bms/BMSModule7Section5ContentPart1';
import { BMSModule7Section5ContentPart2 } from '@/components/upskilling/bms/BMSModule7Section5ContentPart2';
import { BMSModule7Section5ContentPart3 } from '@/components/upskilling/bms/BMSModule7Section5ContentPart3';
import { BMSModule7Section5Practical } from '@/components/upskilling/bms/BMSModule7Section5Practical';
import { BMSModule7Section5RealWorld } from '@/components/upskilling/bms/BMSModule7Section5RealWorld';
import { BMSModule7Section5Summary } from '@/components/upskilling/bms/BMSModule7Section5Summary';
import { BMSModule7Section5FAQ } from '@/components/upskilling/bms/BMSModule7Section5FAQ';
import { BMSModule7Section5Quiz } from '@/components/upskilling/bms/BMSModule7Section5Quiz';

const BMSModule7Section5 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
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
              <CheckSquare className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Pre-Functional and Functional Commissioning
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white break-words">
                  Module 7, Section 5 - System Verification and Testing
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 7.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                45 minutes
              </Badge>
            </div>
          </div>

          <BMSModule7Section5Intro />
          <BMSModule7Section5LearningOutcomes />
          <BMSModule7Section5ContentPart1 />
          <BMSModule7Section5ContentPart2 />
          <BMSModule7Section5ContentPart3 />
          <BMSModule7Section5Practical />
          <BMSModule7Section5RealWorld />
          <BMSModule7Section5Summary />
          <BMSModule7Section5FAQ />
          <BMSModule7Section5Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bms-module-7-section-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-7-section-6">
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

export default BMSModule7Section5;