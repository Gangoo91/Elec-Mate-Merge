import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule4Section3Intro } from '@/components/upskilling/bms/BMSModule4Section3Intro';
import { BMSModule4Section3LearningOutcomes } from '@/components/upskilling/bms/BMSModule4Section3LearningOutcomes';
import { BMSModule4Section3Content } from '@/components/upskilling/bms/BMSModule4Section3Content';
import { BMSModule4Section3Practical } from '@/components/upskilling/bms/BMSModule4Section3Practical';
import { BMSModule4Section3RealWorld } from '@/components/upskilling/bms/BMSModule4Section3RealWorld';
import { BMSModule4Section3Summary } from '@/components/upskilling/bms/BMSModule4Section3Summary';
import { BMSModule4Section3Quiz } from '@/components/upskilling/bms/BMSModule4Section3Quiz';
import { InlineCheck1, InlineCheck2, InlineCheck3 } from '@/components/upskilling/bms/BMSModule4Section3InlineChecks';

const BMSModule4Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../bms-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Lock className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Access Control Basics and Door Relays
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Security integration and door control systems in Building Management Systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <BMSModule4Section3Intro />

          {/* Learning Outcomes */}
          <BMSModule4Section3LearningOutcomes />

          {/* Main Content with Inline Checks */}
          <BMSModule4Section3Content />
          
          <InlineCheck1 />

          <InlineCheck2 />

          <InlineCheck3 />

          {/* Practical Guidance */}
          <BMSModule4Section3Practical />

          {/* Real World Example */}
          <BMSModule4Section3RealWorld />

          {/* Summary */}
          <BMSModule4Section3Summary />

          {/* Quiz */}
          <BMSModule4Section3Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../bms-module-4-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-4-section-4">
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

export default BMSModule4Section3;