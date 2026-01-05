import { ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BMSModule5Section5Intro } from '@/components/upskilling/bms/BMSModule5Section5Intro';
import { BMSModule5Section5LearningOutcomes } from '@/components/upskilling/bms/BMSModule5Section5LearningOutcomes';
import { BMSModule5Section5ContentPart1 } from '@/components/upskilling/bms/BMSModule5Section5ContentPart1';
import { BMSModule5Section5ContentPart2 } from '@/components/upskilling/bms/BMSModule5Section5ContentPart2';
import { BMSModule5Section5ContentPart3 } from '@/components/upskilling/bms/BMSModule5Section5ContentPart3';
import { 
  GatewayInlineCheck1, 
  GatewayInlineCheck2, 
  GatewayInlineCheck3 
} from '@/components/upskilling/bms/BMSModule5Section5InlineChecks';
import { BMSModule5Section5Practical } from '@/components/upskilling/bms/BMSModule5Section5Practical';
import { BMSModule5Section5RealWorld } from '@/components/upskilling/bms/BMSModule5Section5RealWorld';
import { BMSModule5Section5Summary } from '@/components/upskilling/bms/BMSModule5Section5Summary';
import { BMSModule5Section5Quiz } from '@/components/upskilling/bms/BMSModule5Section5Quiz';

const BMSModule5Section5 = () => {
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
            <Shuffle className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Gateways and Interoperability Between Protocols
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Understanding protocol conversion, system integration, and gateway installation practices
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <BMSModule5Section5Intro />
          <BMSModule5Section5LearningOutcomes />
          
          <BMSModule5Section5ContentPart1 />
          <GatewayInlineCheck1 />
          
          <BMSModule5Section5ContentPart2 />
          <GatewayInlineCheck2 />
          
          <BMSModule5Section5ContentPart3 />
          <GatewayInlineCheck3 />
          
          <BMSModule5Section5Practical />
          <BMSModule5Section5RealWorld />
          <BMSModule5Section5Summary />
          <BMSModule5Section5Quiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link to="../bms-module-5-section-4">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: KNX Topology
              </Button>
            </Link>
            
            <Link to="../bms-module-5-section-6">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto"
              >
                Next: Section 6
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule5Section5;