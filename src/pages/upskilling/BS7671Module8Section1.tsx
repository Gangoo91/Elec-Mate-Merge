import { ArrowLeft, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671Module8Section1Quiz from '@/components/upskilling/quiz/BS7671Module8Section1Quiz';
import BS7671Module8Section1Intro from '@/components/upskilling/bs7671/BS7671Module8Section1Intro';
import BS7671Module8Section1LearningOutcomes from '@/components/upskilling/bs7671/BS7671Module8Section1LearningOutcomes';
import AppendicesNavigationSection from '@/components/upskilling/bs7671/AppendicesNavigationSection';
import ZsTablesSection from '@/components/upskilling/bs7671/ZsTablesSection';
import ConductorSizingSection from '@/components/upskilling/bs7671/ConductorSizingSection';
import VoltageDropSection from '@/components/upskilling/bs7671/VoltageDropSection';
import BS7671Module8Section1RealWorld from '@/components/upskilling/bs7671/BS7671Module8Section1RealWorld';
import BS7671Module8Section1Summary from '@/components/upskilling/bs7671/BS7671Module8Section1Summary';
import BS7671Module8Section1FAQ from '@/components/upskilling/bs7671/BS7671Module8Section1FAQ';

const BS7671Module8Section1 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-8">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <div className="space-y-6 max-w-full overflow-hidden">
          {/* Header */}
          <div className="max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Navigating Key Appendices
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white break-words">
                  Module 8, Section 1 - Zs Tables, Conductor Sizing, Volt Drop
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 8.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                60 minutes
              </Badge>
            </div>
          </div>

          <BS7671Module8Section1Intro />
          <BS7671Module8Section1LearningOutcomes />
          
          <div className="grid gap-6">
            <AppendicesNavigationSection />
            <ZsTablesSection />
            <ConductorSizingSection />
            <VoltageDropSection />
          </div>
          
          <BS7671Module8Section1RealWorld />
          <BS7671Module8Section1Summary />
          <BS7671Module8Section1FAQ />
          
          <BS7671Module8Section1Quiz />
        </div>
      </div>
    </div>
  );
};

export default BS7671Module8Section1;