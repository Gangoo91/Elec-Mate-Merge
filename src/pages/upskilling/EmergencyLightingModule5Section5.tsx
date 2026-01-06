import { ArrowLeft, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingModule5Section5Intro } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section5Intro';
import { EmergencyLightingModule5Section5LearningOutcomes } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section5LearningOutcomes';
import { EmergencyLightingModule5Section5Technical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section5Technical';
import { EmergencyLightingModule5Section5Practical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section5Practical';
import { EmergencyLightingModule5Section5RealWorld } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section5RealWorld';
import { EmergencyLightingModule5Section5FAQ } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section5FAQ';
import { EmergencyLightingModule5Section5Summary } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section5Summary';
import { EmergencyLightingModule5Section5Quiz } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section5Quiz';

const EmergencyLightingModule5Section5 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="px-4 sm:px-8 pt-8 pb-12">
        <Link to="../emergency-lighting-module-5">
          <Button
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-elec-yellow transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FileCheck className="h-8 w-8 text-elec-yellow" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Certification and Commissioning Checklists
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mt-2">
                  Module 5, Section 5
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-elec-yellow text-black">
                Module 5 - Section 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                15 minutes
              </Badge>
            </div>
          </div>

          <main className="space-y-8">
            <EmergencyLightingModule5Section5Intro />
            <EmergencyLightingModule5Section5LearningOutcomes />
            <EmergencyLightingModule5Section5Technical />
            <EmergencyLightingModule5Section5Practical />
            <EmergencyLightingModule5Section5RealWorld />
            <EmergencyLightingModule5Section5FAQ />
            <EmergencyLightingModule5Section5Summary />
            <EmergencyLightingModule5Section5Quiz />
          </main>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link to="../emergency-lighting-module-5-section-4" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-transparent hover:text-elec-yellow transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-5" className="flex-1">
              <Button
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200"
              >
                Complete Module 5
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule5Section5;
