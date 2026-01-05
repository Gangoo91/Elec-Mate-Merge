import { ArrowLeft, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BS7671Module7Section5Intro } from '@/components/upskilling/bs7671/BS7671Module7Section5Intro';
import { BS7671Module7Section5LearningOutcomes } from '@/components/upskilling/bs7671/BS7671Module7Section5LearningOutcomes';
import { ProsumerInstallationSection } from '@/components/upskilling/bs7671/ProsumerInstallationSection';
import { EnergyManagementSection } from '@/components/upskilling/bs7671/EnergyManagementSection';
import { PEIProtectionSection } from '@/components/upskilling/bs7671/PEIProtectionSection';
import { BatteryStorageSection } from '@/components/upskilling/bs7671/BatteryStorageSection';
import { GridIntegrationSection } from '@/components/upskilling/bs7671/GridIntegrationSection';
import { PEICommissioningSection } from '@/components/upskilling/bs7671/PEICommissioningSection';
import { BS7671Module7Section5RealWorld } from '@/components/upskilling/bs7671/BS7671Module7Section5RealWorld';
import { BS7671Module7Section5Summary } from '@/components/upskilling/bs7671/BS7671Module7Section5Summary';
import { BS7671Module7Section5FAQ } from '@/components/upskilling/bs7671/BS7671Module7Section5FAQ';
import BS7671Module7Section5Quiz from '@/components/upskilling/quiz/BS7671Module7Section5Quiz';

const BS7671Module7Section5 = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../bs7671-module-7">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Factory className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Prosumer Electrical Installations (Part 8)
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            The future of energy systems - installations that consume and generate energy
          </p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.5</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">45 minutes</Badge>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <BS7671Module7Section5Intro />
          <BS7671Module7Section5LearningOutcomes />
          <ProsumerInstallationSection />
          <EnergyManagementSection />
          <PEIProtectionSection />
          <BatteryStorageSection />
          <GridIntegrationSection />
          <PEICommissioningSection />
          <BS7671Module7Section5RealWorld />
          <BS7671Module7Section5Summary />
          <BS7671Module7Section5FAQ />
          <BS7671Module7Section5Quiz />
        </div>
      </main>

      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-start">
            <Link to="../bs7671-module-7-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Special Installations
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BS7671Module7Section5;