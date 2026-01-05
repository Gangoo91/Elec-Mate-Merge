import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule4Section5Intro } from '@/components/upskilling/bms/BMSModule4Section5Intro';
import { BMSModule4Section5LearningOutcomes } from '@/components/upskilling/bms/BMSModule4Section5LearningOutcomes';
import { BMSModule4Section5Content } from '@/components/upskilling/bms/BMSModule4Section5Content';
import { BMSModule4Section5Practical } from '@/components/upskilling/bms/BMSModule4Section5Practical';
import { BMSModule4Section5RealWorld } from '@/components/upskilling/bms/BMSModule4Section5RealWorld';
import { BMSModule4Section5Summary } from '@/components/upskilling/bms/BMSModule4Section5Summary';
import { BMSModule4Section5Quiz } from '@/components/upskilling/bms/BMSModule4Section5Quiz';
import { EnergyInlineCheck1, EnergyInlineCheck2, EnergyInlineCheck3 } from '@/components/upskilling/bms/BMSModule4Section5InlineChecks';

const BMSModule4Section5 = () => {
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
            <Zap className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Combined Energy Saving Scenarios
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Integrating HVAC and lighting systems for maximum efficiency gains
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <BMSModule4Section5Intro />

          {/* Learning Outcomes */}
          <BMSModule4Section5LearningOutcomes />

          {/* Main Content */}
          <BMSModule4Section5Content />
          
          {/* Interactive Inline Check 1 - positioned after main content */}
          <EnergyInlineCheck1 />

          {/* Practical Guidance */}
          <BMSModule4Section5Practical />

          {/* Interactive Inline Check 2 - positioned after practical guidance */}
          <EnergyInlineCheck2 />

          {/* Real World Example */}
          <BMSModule4Section5RealWorld />

          {/* Interactive Inline Check 3 - positioned after real world example */}
          <EnergyInlineCheck3 />

          {/* Summary */}
          <BMSModule4Section5Summary />

          {/* Quiz */}
          <BMSModule4Section5Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../bms-module-4-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-4-section-6">
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

export default BMSModule4Section5;