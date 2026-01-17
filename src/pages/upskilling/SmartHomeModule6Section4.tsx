import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule6Section4Intro from '@/components/upskilling/smart-home/SmartHomeModule6Section4Intro';
import SmartHomeModule6Section4LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule6Section4LearningOutcomes';
import SmartHomeModule6Section4Bridging from '@/components/upskilling/smart-home/SmartHomeModule6Section4Bridging';
import SmartHomeModule6Section4Legacy from '@/components/upskilling/smart-home/SmartHomeModule6Section4Legacy';
import SmartHomeModule6Section4Methods from '@/components/upskilling/smart-home/SmartHomeModule6Section4Methods';
import SmartHomeModule6Section4Challenges from '@/components/upskilling/smart-home/SmartHomeModule6Section4Challenges';
import SmartHomeModule6Section4Practical from '@/components/upskilling/smart-home/SmartHomeModule6Section4Practical';
import SmartHomeModule6Section4RealWorld from '@/components/upskilling/smart-home/SmartHomeModule6Section4RealWorld';
import SmartHomeModule6Section4FAQ from '@/components/upskilling/smart-home/SmartHomeModule6Section4FAQ';
import SmartHomeModule6Section4Summary from '@/components/upskilling/smart-home/SmartHomeModule6Section4Summary';
import SmartHomeModule6Section4Quiz from '@/components/upskilling/quiz/SmartHomeModule6Section4Quiz';

const SmartHomeModule6Section4 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/smart-home-module-6">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <ArrowUpDown className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Bridging Systems and Legacy Devices
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Integrating older systems with modern smart home platforms for seamless operation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule6Section4Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule6Section4LearningOutcomes />

          {/* Content Sections */}
          <SmartHomeModule6Section4Bridging />
          <SmartHomeModule6Section4Legacy />
          <SmartHomeModule6Section4Methods />
          <SmartHomeModule6Section4Challenges />
          <SmartHomeModule6Section4Practical />

          {/* Real-World Scenario */}
          <SmartHomeModule6Section4RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule6Section4FAQ />

          {/* Summary */}
          <SmartHomeModule6Section4Summary />

          {/* Quiz Section */}
          <SmartHomeModule6Section4Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule6Section4;