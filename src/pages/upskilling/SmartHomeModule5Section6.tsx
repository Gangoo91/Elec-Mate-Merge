import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
            <Shield className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 6
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Network Security and User Privacy
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Securing smart home networks and protecting user data from cyber threats
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule5Section6Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule5Section6LearningOutcomes />

          {/* Content Sections */}
          <SmartHomeModule5Section6NetworkSecurity />
          <SmartHomeModule5Section6PrivacyRisks />
          <SmartHomeModule5Section6SecuringNetworks />
          <SmartHomeModule5Section6ElectricianRole />
          <SmartHomeModule5Section6PracticalGuidance />

          {/* Real-World Scenario */}
          <SmartHomeModule5Section6RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule5Section6FAQ />

          {/* Summary */}
          <SmartHomeModule5Section6Summary />

          {/* Quiz Section */}
          <SmartHomeModule5Section6Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule5Section6;