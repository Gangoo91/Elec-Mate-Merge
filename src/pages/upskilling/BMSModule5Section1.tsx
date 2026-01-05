import { ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule5Section1Intro } from '@/components/upskilling/bms/BMSModule5Section1Intro';
import { BMSModule5Section1LearningOutcomes } from '@/components/upskilling/bms/BMSModule5Section1LearningOutcomes';
import { BMSModule5Section1ContentPart1 } from '@/components/upskilling/bms/BMSModule5Section1ContentPart1';
import { BMSModule5Section1ContentPart2 } from '@/components/upskilling/bms/BMSModule5Section1ContentPart2';
import { BMSModule5Section1ContentPart3 } from '@/components/upskilling/bms/BMSModule5Section1ContentPart3';
import { BMSModule5Section1ContentPart4 } from '@/components/upskilling/bms/BMSModule5Section1ContentPart4';
import { 
  ProtocolInlineCheck1, 
  ProtocolInlineCheck2, 
  ProtocolInlineCheck3, 
  ProtocolInlineCheck4 
} from '@/components/upskilling/bms/BMSModule5Section1InlineChecks';
import { BMSModule5Section1Practical } from '@/components/upskilling/bms/BMSModule5Section1Practical';
import { BMSModule5Section1RealWorld } from '@/components/upskilling/bms/BMSModule5Section1RealWorld';
import { BMSModule5Section1Summary } from '@/components/upskilling/bms/BMSModule5Section1Summary';
import { BMSModule5Section1Quiz } from '@/components/upskilling/bms/BMSModule5Section1Quiz';

const BMSModule5Section1 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <Link to="../bms-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Globe className="h-8 w-8 text-yellow-400" />
            <div>
              <h1 className="text-4xl font-bold text-white">
                Overview of BMS Protocols
              </h1>
              <p className="text-xl text-white">
                Communication protocol fundamentals for electricians
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Module 5
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-white">
              Section 1
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-8 pb-12 space-y-8">
        <BMSModule5Section1Intro />
        
        <BMSModule5Section1LearningOutcomes />
        
        <BMSModule5Section1ContentPart1 />
        
        <ProtocolInlineCheck1 />
        
        <BMSModule5Section1ContentPart2 />
        
        <ProtocolInlineCheck2 />
        
        <BMSModule5Section1ContentPart3 />
        
        <ProtocolInlineCheck3 />
        
        <BMSModule5Section1ContentPart4 />
        
        <ProtocolInlineCheck4 />
        
        <BMSModule5Section1Practical />
        
        <BMSModule5Section1RealWorld />
        
        <BMSModule5Section1Summary />
        
        <BMSModule5Section1Quiz />
      </main>

      {/* Navigation Footer */}
      <div className="px-8 pb-8">
        <div className="flex justify-between">
          <div></div>
          <Link to="../bms-module-5-section-2">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BMSModule5Section1;