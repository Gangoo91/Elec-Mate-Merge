import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule5Section2Intro } from '@/components/upskilling/smart-home/SmartHomeModule5Section2Intro';
import { SmartHomeModule5Section2LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule5Section2LearningOutcomes';
import { CCTVTypesSection } from '@/components/upskilling/smart-home/CCTVTypesSection';
import { DoorbellCameraQuickCheck } from '@/components/upskilling/smart-home/DoorbellCameraQuickCheck';
import { ResolutionStandardsSection } from '@/components/upskilling/smart-home/ResolutionStandardsSection';
import { ResolutionQuickCheck } from '@/components/upskilling/smart-home/ResolutionQuickCheck';
import { StorageOptionsSection } from '@/components/upskilling/smart-home/StorageOptionsSection';
import { CloudStorageQuickCheck } from '@/components/upskilling/smart-home/CloudStorageQuickCheck';
import { CCTVFeaturesSection } from '@/components/upskilling/smart-home/CCTVFeaturesSection';
import { CCTVBestPracticesSection } from '@/components/upskilling/smart-home/CCTVBestPracticesSection';
import { GDPRQuickCheck } from '@/components/upskilling/smart-home/GDPRQuickCheck';
import { SmartHomeModule5Section2RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule5Section2RealWorld';
import { SmartHomeModule5Section2FAQ } from '@/components/upskilling/smart-home/SmartHomeModule5Section2FAQ';
import { SmartHomeModule5Section2Quiz } from '@/components/upskilling/smart-home/SmartHomeModule5Section2Quiz';

const SmartHomeModule5Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/smart-home-module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Camera className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            CCTV Types, Resolution, and Storage Options
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding different camera types, resolution standards, and storage methods for modern CCTV systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">
          <SmartHomeModule5Section2Intro />
          <SmartHomeModule5Section2LearningOutcomes />
          <CCTVTypesSection />
          <DoorbellCameraQuickCheck />
          <ResolutionStandardsSection />
          <ResolutionQuickCheck />
          <StorageOptionsSection />
          <CloudStorageQuickCheck />
          <CCTVFeaturesSection />
          <CCTVBestPracticesSection />
          <GDPRQuickCheck />
          <SmartHomeModule5Section2RealWorld />
          <SmartHomeModule5Section2FAQ />
          <SmartHomeModule5Section2Quiz />
        </div>
      </main>

    </div>
  );
};

export default SmartHomeModule5Section2;
// Route: /smart-home-module-5-section-2