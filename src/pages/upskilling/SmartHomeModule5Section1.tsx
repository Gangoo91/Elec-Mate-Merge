import { ArrowLeft, Lock, Target, BookOpen, Users, Lightbulb, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule5Section1Intro } from '@/components/upskilling/smart-home/SmartHomeModule5Section1Intro';
import { SmartHomeModule5Section1LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule5Section1LearningOutcomes';
import { SmartLockBasicsSection } from '@/components/upskilling/smart-home/SmartLockBasicsSection';
import { RetrofitReplacementQuickCheck } from '@/components/upskilling/smart-home/RetrofitReplacementQuickCheck';
import { SmartLockTypesSection } from '@/components/upskilling/smart-home/SmartLockTypesSection';
import { PinCodeQuickCheck } from '@/components/upskilling/smart-home/PinCodeQuickCheck';
import { SmartLockBenefitsSection } from '@/components/upskilling/smart-home/SmartLockBenefitsSection';
import { SecurityRisksQuickCheck } from '@/components/upskilling/smart-home/SecurityRisksQuickCheck';
import { SmartLockBestPracticesSection } from '@/components/upskilling/smart-home/SmartLockBestPracticesSection';
import { FirmwareUpdateQuickCheck } from '@/components/upskilling/smart-home/FirmwareUpdateQuickCheck';
import { SmartLockInstallationSection } from '@/components/upskilling/smart-home/SmartLockInstallationSection';
import { SmartHomeModule5Section1RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule5Section1RealWorld';
import { SmartHomeModule5Section1FAQ } from '@/components/upskilling/smart-home/SmartHomeModule5Section1FAQ';
import { SmartHomeModule5Section1Quiz } from '@/components/upskilling/smart-home/SmartHomeModule5Section1Quiz';

const SmartHomeModule5Section1 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
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
            <Lock className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Smart Locks and Keypads
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Secure, flexible, and trackable access control systems for modern smart homes
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <SmartHomeModule5Section1Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule5Section1LearningOutcomes />

          {/* Smart Lock Basics */}
          <SmartLockBasicsSection />
          <RetrofitReplacementQuickCheck />

          {/* Smart Lock Types */}
          <SmartLockTypesSection />
          <PinCodeQuickCheck />

          {/* Benefits */}
          <SmartLockBenefitsSection />
          <SecurityRisksQuickCheck />

          {/* Best Practices */}
          <SmartLockBestPracticesSection />
          <FirmwareUpdateQuickCheck />

          {/* Installation */}
          <SmartLockInstallationSection />

          {/* Real-World Scenario */}
          <SmartHomeModule5Section1RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule5Section1FAQ />

          {/* Quiz Section */}
          <SmartHomeModule5Section1Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule5Section1;
// Route: /smart-home-module-5-section-1