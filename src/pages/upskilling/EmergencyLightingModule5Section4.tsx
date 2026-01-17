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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        
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

          {/* Bottom Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="/study-centre/upskilling/emergency-lighting-module-5-section-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Section
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="/study-centre/upskilling/emergency-lighting-module-5-section-5">
                Next Section
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>

        </div>
      </main>

    </div>
  );
};

export default EmergencyLightingModule5Section4;
