import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SmartHomeModule5Section6Intro } from '@/components/upskilling/smart-home/SmartHomeModule5Section6Intro';
import { SmartHomeModule5Section6LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule5Section6LearningOutcomes';
import { SmartHomeModule5Section6NetworkSecurity } from '@/components/upskilling/smart-home/SmartHomeModule5Section6NetworkSecurity';
import { SmartHomeModule5Section6PrivacyRisks } from '@/components/upskilling/smart-home/SmartHomeModule5Section6PrivacyRisks';
import { SmartHomeModule5Section6SecuringNetworks } from '@/components/upskilling/smart-home/SmartHomeModule5Section6SecuringNetworks';
import { SmartHomeModule5Section6ElectricianRole } from '@/components/upskilling/smart-home/SmartHomeModule5Section6ElectricianRole';
import { SmartHomeModule5Section6PracticalGuidance } from '@/components/upskilling/smart-home/SmartHomeModule5Section6PracticalGuidance';
import { SmartHomeModule5Section6RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule5Section6RealWorld';
import { SmartHomeModule5Section6FAQ } from '@/components/upskilling/smart-home/SmartHomeModule5Section6FAQ';
import { SmartHomeModule5Section6Summary } from '@/components/upskilling/smart-home/SmartHomeModule5Section6Summary';
import { SmartHomeModule5Section6Quiz } from '@/components/upskilling/smart-home/SmartHomeModule5Section6Quiz';

const SmartHomeModule5Section6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../smart-home-module-5">
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
            <Shield className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Network Security and User Privacy
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Securing smart home networks and protecting user data from cyber threats
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <SmartHomeModule5Section6Intro />
          <SmartHomeModule5Section6LearningOutcomes />
          <SmartHomeModule5Section6NetworkSecurity />
          <SmartHomeModule5Section6PrivacyRisks />
          <SmartHomeModule5Section6SecuringNetworks />
          <SmartHomeModule5Section6ElectricianRole />
          <SmartHomeModule5Section6PracticalGuidance />
          <SmartHomeModule5Section6RealWorld />
          <SmartHomeModule5Section6FAQ />
          <SmartHomeModule5Section6Summary />
          <SmartHomeModule5Section6Quiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-5-section-5">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Lighting and Emergency Scenes
              </Button>
            </Link>
            
            <Link to="../smart-home-course">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
              >
                Complete Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule5Section6;