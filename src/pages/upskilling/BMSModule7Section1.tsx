import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule7Section1Intro } from '@/components/upskilling/bms/BMSModule7Section1Intro';
import { BMSModule7Section1LearningOutcomes } from '@/components/upskilling/bms/BMSModule7Section1LearningOutcomes';
import { BMSModule7Section1ContentPart1 } from '@/components/upskilling/bms/BMSModule7Section1ContentPart1';
import { BMSModule7Section1ContentPart2 } from '@/components/upskilling/bms/BMSModule7Section1ContentPart2';
import { BMSModule7Section1ContentPart3 } from '@/components/upskilling/bms/BMSModule7Section1ContentPart3';
import { BMSModule7Section1Practical } from '@/components/upskilling/bms/BMSModule7Section1Practical';
import { BMSModule7Section1RealWorld } from '@/components/upskilling/bms/BMSModule7Section1RealWorld';
import { BMSModule7Section1Summary } from '@/components/upskilling/bms/BMSModule7Section1Summary';
import { BMSModule7Section1FAQ } from '@/components/upskilling/bms/BMSModule7Section1FAQ';
import { BMSModule7Section1Quiz } from '@/components/upskilling/bms/BMSModule7Section1Quiz';

const BMSModule7Section1 = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../bms-module-7">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">BMS Design: IO Lists, Schematics, Network Topology</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">Essential design documentation for Building Management Systems</p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black text-sm sm:text-base">Module 7.1</Badge>
            <Badge variant="outline" className="border-gray-600 text-white text-sm sm:text-base">45 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <BMSModule7Section1Intro />
          <BMSModule7Section1LearningOutcomes />
          <BMSModule7Section1ContentPart1 />
          <BMSModule7Section1ContentPart2 />
          <BMSModule7Section1ContentPart3 />
          <BMSModule7Section1Practical />
          <BMSModule7Section1RealWorld />
          <BMSModule7Section1Summary />
          <BMSModule7Section1FAQ />
          <BMSModule7Section1Quiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-stretch sm:items-center">
            <Link to="../bms-module-7" className="flex-1 sm:flex-initial">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Back to Module 7</span>
              </Button>
            </Link>
            <Link to="../bms-module-7-section-2" className="flex-1 sm:flex-initial">
              <Button 
                className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <span className="truncate">Next: Commissioning and Testing</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule7Section1;