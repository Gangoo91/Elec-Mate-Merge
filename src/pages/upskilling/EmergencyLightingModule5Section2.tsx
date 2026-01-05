import { ArrowLeft, ArrowRight, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingModule5Section2Intro } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section2Intro';
import { EmergencyLightingModule5Section2LearningOutcomes } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section2LearningOutcomes';
import { EmergencyLightingModule5Section2Technical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section2Technical';
import { EmergencyLightingModule5Section2Practical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section2Practical';
import { EmergencyLightingModule5Section2RealWorld } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section2RealWorld';
import { EmergencyLightingModule5Section2FAQ } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section2FAQ';
import { EmergencyLightingModule5Section2Summary } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section2Summary';
import { EmergencyLightingModule5Section2Quiz } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section2Quiz';

const EmergencyLightingModule5Section2 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../emergency-lighting-module-5">
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
            <Timer className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Functional Testing and 3-Hour Duration Tests
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed" aria-label="Section description">
            Essential testing procedures to verify emergency lighting systems operate correctly in the event of mains failure
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <EmergencyLightingModule5Section2Intro />
          <EmergencyLightingModule5Section2LearningOutcomes />
          <EmergencyLightingModule5Section2Technical />
          <EmergencyLightingModule5Section2Practical />
          <EmergencyLightingModule5Section2RealWorld />
          <EmergencyLightingModule5Section2FAQ />
          <EmergencyLightingModule5Section2Summary />
          <EmergencyLightingModule5Section2Quiz />

          {/* Mobile Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
            <Link to="../emergency-lighting-module-5-section-1" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-card hover:text-yellow-400"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Initial Inspection
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-5" className="flex-1">
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-600">
                Complete Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EmergencyLightingModule5Section2;
