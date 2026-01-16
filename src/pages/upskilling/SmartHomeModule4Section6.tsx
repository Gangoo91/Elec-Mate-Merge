import { ArrowLeft, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="../smart-home-module-4">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 6
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            BMS Light Integration for Larger Sites
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding Building Management Systems and how HVAC integrates with lighting control in commercial and industrial applications
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule4Section6Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule4Section6LearningOutcomes />

          {/* Content Sections */}
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

          {/* Real-World Scenario */}
          <SmartHomeModule4Section6RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule4Section6FAQ />

          {/* Quiz Section */}
          <SmartHomeModule4Section6Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule4Section6;