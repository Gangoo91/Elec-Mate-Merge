import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { EmergencyLightingModule5Section3Intro } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section3Intro';
import { EmergencyLightingModule5Section3LearningOutcomes } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section3LearningOutcomes';
import { EmergencyLightingModule5Section3Technical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section3Technical';
import { EmergencyLightingModule5Section3Practical } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section3Practical';
import { EmergencyLightingModule5Section3RealWorld } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section3RealWorld';
import { EmergencyLightingModule5Section3Summary } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section3Summary';
import { EmergencyLightingModule5Section3FAQ } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section3FAQ';
import { EmergencyLightingModule5Section3Quiz } from '@/components/upskilling/emergency-lighting/EmergencyLightingModule5Section3Quiz';

const EmergencyLightingModule5Section3 = () => {
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
            <Calendar className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Monthly and Annual Testing Requirements
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Ensuring emergency lighting reliability through regular testing and compliance documentation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <EmergencyLightingModule5Section3Intro />

          {/* Learning Outcomes */}
          <EmergencyLightingModule5Section3LearningOutcomes />

          {/* Technical Content */}
          <EmergencyLightingModule5Section3Technical />

          {/* Practical Guidance */}
          <EmergencyLightingModule5Section3Practical />

          {/* Real-World Example */}
          <EmergencyLightingModule5Section3RealWorld />

          {/* Summary */}
          <EmergencyLightingModule5Section3Summary />

          {/* FAQ Section */}
          <EmergencyLightingModule5Section3FAQ />

          {/* Quiz Section */}
          <EmergencyLightingModule5Section3Quiz />

        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col gap-3">
          <Link to="../emergency-lighting-module-5-section-2" className="w-full">
            <Button
              variant="outline"
              className="w-full bg-card text-white border-gray-600 hover:bg-card/80 hover:text-yellow-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
          </Link>
          <Link to="../emergency-lighting-module-5-section-4" className="w-full">
            <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-600">
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto w-full flex justify-between">
          <Link to="../emergency-lighting-module-5-section-2">
            <Button
              variant="outline"
              className="bg-card text-white border-gray-600 hover:bg-card/80 hover:text-yellow-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
          </Link>
          <Link to="../emergency-lighting-module-5-section-4">
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

export default EmergencyLightingModule5Section3;
