import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeSection5Intro } from '@/components/upskilling/smart-home/SmartHomeSection5Intro';
import { SmartHomeSection5LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeSection5LearningOutcomes';
import { RetrofitInstallationsSection } from '@/components/upskilling/smart-home/RetrofitInstallationsSection';
import { NewBuildInstallationsSection } from '@/components/upskilling/smart-home/NewBuildInstallationsSection';
import { CostDisruptionSection } from '@/components/upskilling/smart-home/CostDisruptionSection';
import { ScalabilityFlexibilitySection } from '@/components/upskilling/smart-home/ScalabilityFlexibilitySection';
import { ChoosingApproachSection } from '@/components/upskilling/smart-home/ChoosingApproachSection';
import { FutureTrendsSection } from '@/components/upskilling/smart-home/FutureTrendsSection';
import { SmartHomeSection5RealWorld } from '@/components/upskilling/smart-home/SmartHomeSection5RealWorld';
import { SmartHomeSection5FAQ } from '@/components/upskilling/smart-home/SmartHomeSection5FAQ';
import { SmartHomeSection5Summary } from '@/components/upskilling/smart-home/SmartHomeSection5Summary';
import { SmartHomeSection5Quiz } from '@/components/upskilling/smart-home/SmartHomeSection5Quiz';

const SmartHomeModule1Section5 = () => {
  // SEO
  useEffect(() => {
    const title = 'Retrofit vs New Build Smart Homes | Smart Home Module 1 Section 5';
    document.title = title;
    const desc = 'Learn the differences between retrofit and new build smart home installations. Compare costs, disruption, scalability, and choose the right approach for different projects.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../smart-home-module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 1 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            System Types: Retrofit vs New Build
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Installation Approaches and Practical Considerations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <SmartHomeSection5Intro />

          {/* Learning Outcomes */}
          <SmartHomeSection5LearningOutcomes />

          {/* Retrofit Installations Section */}
          <RetrofitInstallationsSection />

          {/* New Build Installations Section */}
          <NewBuildInstallationsSection />

          {/* Cost and Disruption Section */}
          <CostDisruptionSection />

          {/* Scalability and Flexibility Section */}
          <ScalabilityFlexibilitySection />

          {/* Choosing the Right Approach Section */}
          <ChoosingApproachSection />

          {/* Future Trends Section */}
          <FutureTrendsSection />

          {/* Real World Example */}
          <SmartHomeSection5RealWorld />

          {/* FAQ Section */}
          <SmartHomeSection5FAQ />

          {/* Summary */}
          <SmartHomeSection5Summary />

          {/* Quiz Section */}
          <SmartHomeSection5Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-1-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-1-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule1Section5;