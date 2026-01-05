import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SmartHomeModule4Section6Intro } from '@/components/upskilling/smart-home/SmartHomeModule4Section6Intro';
import { SmartHomeModule4Section6LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule4Section6LearningOutcomes';
import { BMSOverviewSection } from '@/components/upskilling/smart-home/BMSOverviewSection';
import { BMSDefinitionQuickCheck } from '@/components/upskilling/smart-home/BMSDefinitionQuickCheck';
import { HVACBMSIntegrationSection } from '@/components/upskilling/smart-home/HVACBMSIntegrationSection';
import { LightingBMSIntegrationSection } from '@/components/upskilling/smart-home/LightingBMSIntegrationSection';
import { ProtocolQuickCheck } from '@/components/upskilling/smart-home/ProtocolQuickCheck';
import { LinkingHVACLightingSection } from '@/components/upskilling/smart-home/LinkingHVACLightingSection';
import { OccupancyControlQuickCheck } from '@/components/upskilling/smart-home/OccupancyControlQuickCheck';
import { BMSBenefitsChallengesSection } from '@/components/upskilling/smart-home/BMSBenefitsChallengesSection';
import { BMSFutureSection } from '@/components/upskilling/smart-home/BMSFutureSection';
import { BMSCostQuickCheck } from '@/components/upskilling/smart-home/BMSCostQuickCheck';
import { SmartHomeModule4Section6RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule4Section6RealWorld';
import { SmartHomeModule4Section6FAQ } from '@/components/upskilling/smart-home/SmartHomeModule4Section6FAQ';
import { SmartHomeModule4Section6Quiz } from '@/components/upskilling/smart-home/SmartHomeModule4Section6Quiz';
import { BMSImplementationSection } from '@/components/upskilling/smart-home/BMSImplementationSection';
import { ProtocolDetailsSection } from '@/components/upskilling/smart-home/ProtocolDetailsSection';
import { ImplementationQuickCheck } from '@/components/upskilling/smart-home/ImplementationQuickCheck';
import { BMSROISection } from '@/components/upskilling/smart-home/BMSROISection';

const SmartHomeModule4Section6 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Back Button */}
      <div className="px-8 pt-8">
        <Link to="../smart-home-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 pb-8 space-y-8 module-content">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium">
            Module 4 - Section 6
          </div>
          <h1 className="text-3xl font-bold text-white">
            BMS Light Integration for Larger Sites
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Understanding Building Management Systems and how HVAC integrates with lighting control in commercial and industrial applications.
          </p>
        </div>

        {/* Content Sections */}
        <SmartHomeModule4Section6Intro />
        <SmartHomeModule4Section6LearningOutcomes />
        
        <BMSOverviewSection />
        <BMSDefinitionQuickCheck />
        
        <HVACBMSIntegrationSection />
        <LightingBMSIntegrationSection />
        <ProtocolQuickCheck />
        
        <LinkingHVACLightingSection />
        <OccupancyControlQuickCheck />
        
        <BMSBenefitsChallengesSection />
        <BMSFutureSection />
        <BMSCostQuickCheck />
        
        <BMSImplementationSection />
        <ImplementationQuickCheck />
        
        <ProtocolDetailsSection />
        
        <BMSROISection />
        
        <SmartHomeModule4Section6RealWorld />
        <SmartHomeModule4Section6FAQ />
        <SmartHomeModule4Section6Quiz />
      </div>
    </div>
  );
};

export default SmartHomeModule4Section6;