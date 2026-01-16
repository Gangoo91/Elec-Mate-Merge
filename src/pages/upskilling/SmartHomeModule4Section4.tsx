import { ArrowLeft, Calendar, Target, BookOpen, Users, Lightbulb, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule4Section4Intro } from '@/components/upskilling/smart-home/SmartHomeModule4Section4Intro';
import { SmartHomeModule4Section4LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule4Section4LearningOutcomes';
import { ScheduledHeatingControlSection } from '@/components/upskilling/smart-home/ScheduledHeatingControlSection';
import { ScheduleLimitationQuickCheck } from '@/components/upskilling/smart-home/ScheduleLimitationQuickCheck';
import { AILearningControlSection } from '@/components/upskilling/smart-home/AILearningControlSection';
import { OccupancyDetectionQuickCheck } from '@/components/upskilling/smart-home/OccupancyDetectionQuickCheck';
import { EnergyEfficiencyComparisonSection } from '@/components/upskilling/smart-home/EnergyEfficiencyComparisonSection';
import { IrregularRoutineQuickCheck } from '@/components/upskilling/smart-home/IrregularRoutineQuickCheck';
import { ComfortAndLifestyleSection } from '@/components/upskilling/smart-home/ComfortAndLifestyleSection';
import { SchedulePreferenceQuickCheck } from '@/components/upskilling/smart-home/SchedulePreferenceQuickCheck';
import { ChallengesAndFutureSection } from '@/components/upskilling/smart-home/ChallengesAndFutureSection';
import { SmartHomeModule4Section4RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule4Section4RealWorld';
import { SmartHomeModule4Section4FAQ } from '@/components/upskilling/smart-home/SmartHomeModule4Section4FAQ';
import { SmartHomeModule4Section4Quiz } from '@/components/upskilling/smart-home/SmartHomeModule4Section4Quiz';

const SmartHomeModule4Section4 = () => {
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
            <Calendar className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Schedule vs AI Learning Control
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Different approaches to heating automation - scheduled vs intelligent learning systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <SmartHomeModule4Section4Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule4Section4LearningOutcomes />

          {/* Scheduled Heating Control */}
          <ScheduledHeatingControlSection />
          <ScheduleLimitationQuickCheck />

          {/* AI Learning Control */}
          <AILearningControlSection />
          <OccupancyDetectionQuickCheck />

          {/* Energy Efficiency Comparison */}
          <EnergyEfficiencyComparisonSection />
          <IrregularRoutineQuickCheck />

          {/* Comfort and Lifestyle */}
          <ComfortAndLifestyleSection />
          <SchedulePreferenceQuickCheck />

          {/* Challenges and Future */}
          <ChallengesAndFutureSection />

          {/* Real-World Scenario */}
          <SmartHomeModule4Section4RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule4Section4FAQ />

          {/* Quiz Section */}
          <SmartHomeModule4Section4Quiz />

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule4Section4;