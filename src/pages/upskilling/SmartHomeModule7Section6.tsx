import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule7Section6Intro from '@/components/upskilling/smart-home/SmartHomeModule7Section6Intro';
import SmartHomeModule7Section6LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule7Section6LearningOutcomes';
import DocumentationEssentialsSection from '@/components/upskilling/smart-home/DocumentationEssentialsSection';
import WarrantyCoverageSection from '@/components/upskilling/smart-home/WarrantyCoverageSection';
import AftercareMaintenanceSection from '@/components/upskilling/smart-home/AftercareMaintenanceSection';
import ProfessionalStandardsSection from '@/components/upskilling/smart-home/ProfessionalStandardsSection';
import SmartHomeModule7Section6Practical from '@/components/upskilling/smart-home/SmartHomeModule7Section6Practical';
import SmartHomeModule7Section6RealWorld from '@/components/upskilling/smart-home/SmartHomeModule7Section6RealWorld';
import SmartHomeModule7Section6Summary from '@/components/upskilling/smart-home/SmartHomeModule7Section6Summary';
import SmartHomeModule7Section6FAQ from '@/components/upskilling/smart-home/SmartHomeModule7Section6FAQ';
import SmartHomeModule7Section6Quiz from '@/components/upskilling/smart-home/SmartHomeModule7Section6Quiz';

const SmartHomeModule7Section6 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/smart-home-module-7">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 6
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Documentation, Warranty, and Aftercare
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Professional record keeping and ongoing client support strategies
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule7Section6Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule7Section6LearningOutcomes />

          {/* Content Sections */}
          <DocumentationEssentialsSection />
          <WarrantyCoverageSection />
          <AftercareMaintenanceSection />
          <ProfessionalStandardsSection />
          <SmartHomeModule7Section6Practical />

          {/* Real-World Scenario */}
          <SmartHomeModule7Section6RealWorld />

          {/* Summary */}
          <SmartHomeModule7Section6Summary />

          {/* FAQ Section */}
          <SmartHomeModule7Section6FAQ />

          {/* Quiz Section */}
          <SmartHomeModule7Section6Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule7Section6;