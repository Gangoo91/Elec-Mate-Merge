import { ArrowLeft, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingModule5Section6Intro } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section6Intro';
import { EmergencyLightingModule5Section6LearningOutcomes } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section6LearningOutcomes';
import { EmergencyLightingModule5Section6Technical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section6Technical';
import { EmergencyLightingModule5Section6Practical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section6Practical';
import { EmergencyLightingModule5Section6RealWorld } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section6RealWorld';
import { EmergencyLightingModule5Section6FAQ } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section6FAQ';
import { EmergencyLightingModule5Section6Summary } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section6Summary';
import { EmergencyLightingModule5Section6Quiz } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section6Quiz';

const EmergencyLightingModule5Section6 = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="px-4 sm:px-8 pt-8 pb-12">
        <Link to="../emergency-lighting-module-5">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Handshake className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Client Handover Procedure
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mt-2">
                  Module 5, Section 6
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5 - Section 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                20 minutes
              </Badge>
            </div>
          </div>

          <main className="space-y-8">
            <EmergencyLightingModule5Section6Intro />
            <EmergencyLightingModule5Section6LearningOutcomes />
            <EmergencyLightingModule5Section6Technical />
            <EmergencyLightingModule5Section6Practical />
            <EmergencyLightingModule5Section6RealWorld />
            <EmergencyLightingModule5Section6FAQ />
            <EmergencyLightingModule5Section6Summary />
            <EmergencyLightingModule5Section6Quiz />
          </main>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link to="../emergency-lighting-module-5-section-5" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-card hover:text-yellow-400 transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../emergency-lighting-module-6" className="flex-1">
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
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

export default EmergencyLightingModule5Section6;
