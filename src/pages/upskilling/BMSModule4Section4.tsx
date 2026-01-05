import { ArrowLeft, ArrowRight, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule4Section4Intro } from '@/components/upskilling/bms/BMSModule4Section4Intro';
import { BMSModule4Section4LearningOutcomes } from '@/components/upskilling/bms/BMSModule4Section4LearningOutcomes';
import { BMSModule4Section4Content } from '@/components/upskilling/bms/BMSModule4Section4Content';
import { BMSModule4Section4Practical } from '@/components/upskilling/bms/BMSModule4Section4Practical';
import { BMSModule4Section4RealWorld } from '@/components/upskilling/bms/BMSModule4Section4RealWorld';
import { BMSModule4Section4Summary } from '@/components/upskilling/bms/BMSModule4Section4Summary';
import { BMSModule4Section4Quiz } from '@/components/upskilling/bms/BMSModule4Section4Quiz';
import { ShadingInlineCheck1, ShadingInlineCheck2, ShadingInlineCheck3 } from '@/components/upskilling/bms/BMSModule4Section4InlineChecks';

const BMSModule4Section4 = () => {
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
            <Sun className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Shading, Blinds, and Façade Automation
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Solar control and daylight management in intelligent building systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <BMSModule4Section4Intro />

          {/* Learning Outcomes */}
          <BMSModule4Section4LearningOutcomes />

          {/* Main Content with Inline Checks */}
          <BMSModule4Section4Content />
          
          <ShadingInlineCheck1 />

          <ShadingInlineCheck2 />

          <ShadingInlineCheck3 />

          {/* Practical Guidance */}
          <BMSModule4Section4Practical />

          {/* Real World Example */}
          <BMSModule4Section4RealWorld />

          {/* Summary */}
          <BMSModule4Section4Summary />

          {/* Quiz */}
          <BMSModule4Section4Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../bms-module-4-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-4-section-5">
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

export default BMSModule4Section4;