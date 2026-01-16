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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../emergency-lighting-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-8 pt-8 pb-12">
        
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

          {/* Bottom Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../emergency-lighting-module-5-section-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Section
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../emergency-lighting-module-5-section-6">
                Next Section
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingModule5Section5;
