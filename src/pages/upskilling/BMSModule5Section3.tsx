import { ArrowLeft, ArrowRight, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule5Section3Intro } from '@/components/upskilling/bms/BMSModule5Section3Intro';
import { BMSModule5Section3LearningOutcomes } from '@/components/upskilling/bms/BMSModule5Section3LearningOutcomes';
import { BMSModule5Section3ContentPart1 } from '@/components/upskilling/bms/BMSModule5Section3ContentPart1';
import { BMSModule5Section3ContentPart2 } from '@/components/upskilling/bms/BMSModule5Section3ContentPart2';
import { BMSModule5Section3ContentPart3 } from '@/components/upskilling/bms/BMSModule5Section3ContentPart3';
import { BMSModule5Section3ContentPart4 } from '@/components/upskilling/bms/BMSModule5Section3ContentPart4';
import { BMSModule5Section3ContentPart5 } from '@/components/upskilling/bms/BMSModule5Section3ContentPart5';
import { ModbusInlineCheck1, ModbusInlineCheck2, ModbusInlineCheck3, ModbusInlineCheck4 } from '@/components/upskilling/bms/BMSModule5Section3InlineChecks';
import { BMSModule5Section3Practical } from '@/components/upskilling/bms/BMSModule5Section3Practical';
import { BMSModule5Section3RealWorld } from '@/components/upskilling/bms/BMSModule5Section3RealWorld';
import { BMSModule5Section3Summary } from '@/components/upskilling/bms/BMSModule5Section3Summary';
import { BMSModule5Section3Quiz } from '@/components/upskilling/bms/BMSModule5Section3Quiz';

const BMSModule5Section3 = () => {
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
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Cable className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Modbus RTU and TCP/IP Use Cases
                </h1>
                <p className="text-lg sm:text-xl text-white max-w-3xl">
                  Understanding Modbus protocol implementation and practical applications in building automation systems
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 3
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <BMSModule5Section3Intro />
          <BMSModule5Section3LearningOutcomes />
          <BMSModule5Section3ContentPart1 />
          <ModbusInlineCheck1 />
          <BMSModule5Section3ContentPart2 />
          <ModbusInlineCheck2 />
          <BMSModule5Section3ContentPart3 />
          <ModbusInlineCheck3 />
          <BMSModule5Section3ContentPart4 />
          <ModbusInlineCheck4 />
          <BMSModule5Section3ContentPart5 />
          <BMSModule5Section3Practical />
          <BMSModule5Section3RealWorld />
          <BMSModule5Section3Summary />
          <BMSModule5Section3Quiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <Link to="../bms-module-5-section-2" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="sm:hidden">Previous Section</span>
                <span className="hidden sm:inline">Previous: BACnet Devices</span>
              </Button>
            </Link>
            
            <Link to="../bms-module-5-section-4" className="w-full sm:w-auto">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto text-sm sm:text-base"
              >
                <span className="sm:hidden">Next Section</span>
                <span className="hidden sm:inline">Next: Advanced Topics</span>
                <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule5Section3;