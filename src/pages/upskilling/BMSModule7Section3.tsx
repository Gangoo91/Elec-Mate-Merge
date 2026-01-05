import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BMSModule7Section3Intro } from '@/components/upskilling/bms/BMSModule7Section3Intro';
import { BMSModule7Section3LearningOutcomes } from '@/components/upskilling/bms/BMSModule7Section3LearningOutcomes';
import { BMSModule7Section3ContentPart1 } from '@/components/upskilling/bms/BMSModule7Section3ContentPart1';
import { BMSModule7Section3ContentPart2 } from '@/components/upskilling/bms/BMSModule7Section3ContentPart2';
import { BMSModule7Section3ContentPart3 } from '@/components/upskilling/bms/BMSModule7Section3ContentPart3';
import { BMSModule7Section3ContentPart4 } from '@/components/upskilling/bms/BMSModule7Section3ContentPart4';
import { BMSModule7Section3Practical } from '@/components/upskilling/bms/BMSModule7Section3Practical';
import { BMSModule7Section3RealWorld } from '@/components/upskilling/bms/BMSModule7Section3RealWorld';
import { BMSModule7Section3Summary } from '@/components/upskilling/bms/BMSModule7Section3Summary';
import { BMSModule7Section3FAQ } from '@/components/upskilling/bms/BMSModule7Section3FAQ';
import { BMSModule7Section3Quiz } from '@/components/upskilling/bms/BMSModule7Section3Quiz';

const BMSModule7Section3 = () => {
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Addressing and Device Mapping</h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">Device configuration and network addressing for BMS communication</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.3</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Section 3</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">15 minutes</Badge>
          </div>
        </div>
      </header>
      
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <BMSModule7Section3Intro />
          <BMSModule7Section3LearningOutcomes />
          <BMSModule7Section3ContentPart1 />
          <BMSModule7Section3ContentPart2 />
          <BMSModule7Section3ContentPart3 />
          <BMSModule7Section3ContentPart4 />
          <BMSModule7Section3Practical />
          <BMSModule7Section3RealWorld />
          <BMSModule7Section3Summary />
          <BMSModule7Section3FAQ />
          <BMSModule7Section3Quiz />
        </div>
      </main>
      
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="../bms-module-7-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Programming Methods
              </Button>
            </Link>
            <Link to="../bms-module-7-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BMSModule7Section3;