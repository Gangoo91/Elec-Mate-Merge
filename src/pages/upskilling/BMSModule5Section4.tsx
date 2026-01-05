import { ArrowLeft, ArrowRight, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BMSModule5Section4Intro } from '@/components/upskilling/bms/BMSModule5Section4Intro';
import { BMSModule5Section4LearningOutcomes } from '@/components/upskilling/bms/BMSModule5Section4LearningOutcomes';
import { BMSModule5Section4ContentPart1 } from '@/components/upskilling/bms/BMSModule5Section4ContentPart1';
import { BMSModule5Section4ContentPart2 } from '@/components/upskilling/bms/BMSModule5Section4ContentPart2';
import { BMSModule5Section4ContentPart3 } from '@/components/upskilling/bms/BMSModule5Section4ContentPart3';
import { BMSModule5Section4ContentPart4 } from '@/components/upskilling/bms/BMSModule5Section4ContentPart4';
import { 
  KNXInlineCheck1, 
  KNXInlineCheck2, 
  KNXInlineCheck3, 
  KNXInlineCheck4 
} from '@/components/upskilling/bms/BMSModule5Section4InlineChecks';
import { BMSModule5Section4Practical } from '@/components/upskilling/bms/BMSModule5Section4Practical';
import { BMSModule5Section4RealWorld } from '@/components/upskilling/bms/BMSModule5Section4RealWorld';
import { BMSModule5Section4Summary } from '@/components/upskilling/bms/BMSModule5Section4Summary';
import { BMSModule5Section4Quiz } from '@/components/upskilling/bms/BMSModule5Section4Quiz';

const BMSModule5Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../bms-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Network className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              KNX Topology and Bus Devices
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Understanding KNX bus system configuration, device addressing, and installation practices
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <BMSModule5Section4Intro />
          <BMSModule5Section4LearningOutcomes />
          
          <BMSModule5Section4ContentPart1 />
          <KNXInlineCheck1 />
          
          <BMSModule5Section4ContentPart2 />
          <KNXInlineCheck2 />
          
          <BMSModule5Section4ContentPart3 />
          <KNXInlineCheck3 />
          
          <BMSModule5Section4ContentPart4 />
          <KNXInlineCheck4 />
          
          <BMSModule5Section4Practical />
          <BMSModule5Section4RealWorld />
          <BMSModule5Section4Summary />
          <BMSModule5Section4Quiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link to="../bms-module-5-section-3">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Modbus Protocol
              </Button>
            </Link>
            
            <Link to="../bms-module-5-section-5">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto"
              >
                Next: Section 5
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule5Section4;