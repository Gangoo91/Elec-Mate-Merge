import { ArrowLeft, ArrowRight, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmergencyLightingModule5Section4Intro } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section4Intro';
import { EmergencyLightingModule5Section4LearningOutcomes } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section4LearningOutcomes';
import { EmergencyLightingModule5Section4Technical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section4Technical';
import { EmergencyLightingModule5Section4Practical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section4Practical';
import { EmergencyLightingModule5Section4RealWorld } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section4RealWorld';
import { EmergencyLightingModule5Section4FAQ } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section4FAQ';
import { EmergencyLightingModule5Section4Summary } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section4Summary';
import { EmergencyLightingModule5Section4Quiz } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section4Quiz';

const EmergencyLightingModule5Section4 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../emergency-lighting-module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileCheck className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            System Labelling and Maintenance Records
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed" aria-label="Section description">
            Documentation, compliance, and legal requirements for emergency lighting systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <EmergencyLightingModule5Section4Intro />
          <EmergencyLightingModule5Section4LearningOutcomes />
          <EmergencyLightingModule5Section4Technical />
          <EmergencyLightingModule5Section4Practical />
          <EmergencyLightingModule5Section4RealWorld />
          <EmergencyLightingModule5Section4FAQ />
          <EmergencyLightingModule5Section4Summary />
          <EmergencyLightingModule5Section4Quiz />

          {/* Mobile Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
            <Link to="../emergency-lighting-module-5-section-3" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-white hover:bg-transparent hover:text-elec-yellow"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Initial Verification
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-5" className="flex-1">
              <Button className="w-full bg-elec-yellow text-black hover:bg-yellow-600">
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

export default EmergencyLightingModule5Section4;
