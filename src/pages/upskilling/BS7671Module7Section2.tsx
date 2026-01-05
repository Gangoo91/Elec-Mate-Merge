import { ArrowLeft, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BS7671Module7Section2Intro } from '@/components/upskilling/bs7671/BS7671Module7Section2Intro';
import { BS7671Module7Section2LearningOutcomes } from '@/components/upskilling/bs7671/BS7671Module7Section2LearningOutcomes';
import { EVChargerConfigurationSection } from '@/components/upskilling/bs7671/EVChargerConfigurationSection';
import { PMEProtectionSection } from '@/components/upskilling/bs7671/PMEProtectionSection';
import { BS7671Module7Section2RealWorld } from '@/components/upskilling/bs7671/BS7671Module7Section2RealWorld';
import { BS7671Module7Section2FAQ } from '@/components/upskilling/bs7671/BS7671Module7Section2FAQ';
import BS7671Module7Section2Quiz from '@/components/upskilling/quiz/BS7671Module7Section2Quiz';

const BS7671Module7Section2 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../bs7671-module-7">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0">
              Module 7 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Electric Vehicle Charging Installations
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            BS 7671 Part 722 requirements for safe EV charging infrastructure
          </p>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          <BS7671Module7Section2Intro />
          <BS7671Module7Section2LearningOutcomes />
          <EVChargerConfigurationSection />
          <PMEProtectionSection />
          <BS7671Module7Section2RealWorld />
          <BS7671Module7Section2FAQ />
          <BS7671Module7Section2Quiz />

        </div>
      </main>
    </div>
  );
};

export default BS7671Module7Section2;