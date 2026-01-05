import { ArrowLeft, ArrowRight, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671Module7Section4Quiz from '@/components/upskilling/quiz/BS7671Module7Section4Quiz';
import { BS7671Module7Section4Intro } from '@/components/upskilling/bs7671/BS7671Module7Section4Intro';
import { BS7671Module7Section4LearningOutcomes } from '@/components/upskilling/bs7671/BS7671Module7Section4LearningOutcomes';
import { MedicalLocationsSection } from '@/components/upskilling/bs7671/MedicalLocationsSection';
import { IndustrialSystemsSection } from '@/components/upskilling/bs7671/IndustrialSystemsSection';
import { BS7671Module7Section4RealWorld } from '@/components/upskilling/bs7671/BS7671Module7Section4RealWorld';
import { BS7671Module7Section4FAQ } from '@/components/upskilling/bs7671/BS7671Module7Section4FAQ';
import { BS7671Module7Section4Summary } from '@/components/upskilling/bs7671/BS7671Module7Section4Summary';

const BS7671Module7Section4 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div className="max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Building className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Medical, Commercial, and Industrial Locations
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white break-words">
                  Module 7, Section 4 - Critical Installation Requirements
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 7.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                35 minutes
              </Badge>
            </div>
          </div>

          <BS7671Module7Section4Intro />
          <BS7671Module7Section4LearningOutcomes />
          <MedicalLocationsSection />
          <IndustrialSystemsSection />
          <BS7671Module7Section4RealWorld />
          <BS7671Module7Section4FAQ />
          <BS7671Module7Section4Summary />
          <BS7671Module7Section4Quiz />
          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-7-section-3">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-7-section-5">
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

export default BS7671Module7Section4;