import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule6Section5Intro from '@/components/upskilling/smart-home/SmartHomeModule6Section5Intro';
import SmartHomeModule6Section5LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule6Section5LearningOutcomes';
import SmartHomeModule6Section5Causes from '@/components/upskilling/smart-home/SmartHomeModule6Section5Causes';
import SmartHomeModule6Section5Symptoms from '@/components/upskilling/smart-home/SmartHomeModule6Section5Symptoms';
import SmartHomeModule6Section5Troubleshooting from '@/components/upskilling/smart-home/SmartHomeModule6Section5Troubleshooting';
import SmartHomeModule6Section5Prevention from '@/components/upskilling/smart-home/SmartHomeModule6Section5Prevention';
import SmartHomeModule6Section5Practical from '@/components/upskilling/smart-home/SmartHomeModule6Section5Practical';
import SmartHomeModule6Section5RealWorld from '@/components/upskilling/smart-home/SmartHomeModule6Section5RealWorld';
import SmartHomeModule6Section5Summary from '@/components/upskilling/smart-home/SmartHomeModule6Section5Summary';
import SmartHomeModule6Section5Quiz from '@/components/upskilling/quiz/SmartHomeModule6Section5Quiz';

const SmartHomeModule6Section5 = () => {
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
            <AlertTriangle className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Troubleshooting Ecosystem Conflicts
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Diagnosing and resolving compatibility issues in multi-brand smart home systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">

          {/* Introduction */}
          <SmartHomeModule6Section5Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule6Section5LearningOutcomes />

          {/* Content Sections */}
          <SmartHomeModule6Section5Causes />
          <SmartHomeModule6Section5Symptoms />
          <SmartHomeModule6Section5Troubleshooting />
          <SmartHomeModule6Section5Prevention />
          <SmartHomeModule6Section5Practical />

          {/* Real-World Scenario */}
          <SmartHomeModule6Section5RealWorld />

          {/* Summary */}
          <SmartHomeModule6Section5Summary />

          {/* Quiz Section */}
          <SmartHomeModule6Section5Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule6Section5;