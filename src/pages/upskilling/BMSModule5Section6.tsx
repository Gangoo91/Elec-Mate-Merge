import { ArrowLeft, ArrowRight, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule5Section6Intro } from '@/components/upskilling/bms/BMSModule5Section6Intro';
import { BMSModule5Section6LearningOutcomes } from '@/components/upskilling/bms/BMSModule5Section6LearningOutcomes';
import { BMSModule5Section6ContentPart1 } from '@/components/upskilling/bms/BMSModule5Section6ContentPart1';
import { BMSModule5Section6ContentPart2 } from '@/components/upskilling/bms/BMSModule5Section6ContentPart2';
import { BMSModule5Section6ContentPart3 } from '@/components/upskilling/bms/BMSModule5Section6ContentPart3';
import { BMSModule5Section6InlineChecks } from '@/components/upskilling/bms/BMSModule5Section6InlineChecks';
import { BMSModule5Section6Practical } from '@/components/upskilling/bms/BMSModule5Section6Practical';
import { BMSModule5Section6RealWorld } from '@/components/upskilling/bms/BMSModule5Section6RealWorld';
import { BMSModule5Section6Summary } from '@/components/upskilling/bms/BMSModule5Section6Summary';
import { BMSModule5Section6Quiz } from '@/components/upskilling/bms/BMSModule5Section6Quiz';

const BMSModule5Section6 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../bms-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Network className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Network Planning, Segmentation, and Latency Management
                </h1>
                <p className="text-xl text-gray-400">
                  Network design and performance optimisation
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 6
              </Badge>
            </div>
          </div>

        <BMSModule5Section6Intro />
        <BMSModule5Section6LearningOutcomes />
        <BMSModule5Section6ContentPart1 />
        <BMSModule5Section6InlineChecks checkNumber={1} />
        <BMSModule5Section6ContentPart2 />
        <BMSModule5Section6InlineChecks checkNumber={2} />
        <BMSModule5Section6ContentPart3 />
        <BMSModule5Section6InlineChecks checkNumber={3} />
        <BMSModule5Section6Practical />
          <BMSModule5Section6RealWorld />
          <BMSModule5Section6Summary />
          <BMSModule5Section6Quiz />

          <div className="flex justify-between">
            <Link to="../bms-module-5-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-5-section-7">
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

export default BMSModule5Section6;