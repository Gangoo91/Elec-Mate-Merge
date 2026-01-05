import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../smart-home-module-7">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-yellow-400" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Documentation, Warranty, and Aftercare</h1>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">Professional record keeping and ongoing client support strategies</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.6</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Section 6</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">18 minutes</Badge>
          </div>
        </div>
      </header>
      
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <SmartHomeModule7Section6Intro />
          <SmartHomeModule7Section6LearningOutcomes />
          <DocumentationEssentialsSection />
          <WarrantyCoverageSection />
          <AftercareMaintenanceSection />
          <ProfessionalStandardsSection />
          <SmartHomeModule7Section6Practical />
          <SmartHomeModule7Section6RealWorld />
          <SmartHomeModule7Section6Summary />
          <SmartHomeModule7Section6FAQ />
          <SmartHomeModule7Section6Quiz />
        </div>
      </main>
      
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-7-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Customer Handover
              </Button>
            </Link>
            <Link to="../smart-home-module-7">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Back to Module 7
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule7Section6;