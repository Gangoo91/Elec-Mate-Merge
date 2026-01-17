import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeSection2Intro } from '@/components/upskilling/smart-home/SmartHomeSection2Intro';
import { SmartHomeSection2LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeSection2LearningOutcomes';
import { SmartLightingSection } from '@/components/upskilling/smart-home/SmartLightingSection';
import { SmartHVACSection } from '@/components/upskilling/smart-home/SmartHVACSection';
import { SmartSecuritySection } from '@/components/upskilling/smart-home/SmartSecuritySection';
import { SmartAccessibilitySection } from '@/components/upskilling/smart-home/SmartAccessibilitySection';
import { SmartHomeSection2RealWorld } from '@/components/upskilling/smart-home/SmartHomeSection2RealWorld';
import { SmartHomeSection2FAQ } from '@/components/upskilling/smart-home/SmartHomeSection2FAQ';
import { SmartHomeSection2Summary } from '@/components/upskilling/smart-home/SmartHomeSection2Summary';
import { SmartHomeSection2Quiz } from '@/components/upskilling/smart-home/SmartHomeSection2Quiz';

const SmartHomeModule1Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Benefits and Applications | Smart Home Module 1 Section 2';
    document.title = title;
    const desc = 'Explore smart home benefits and applications across lighting, HVAC, security, and accessibility. Learn about energy efficiency, automation, and system integration.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/smart-home-module-1">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 1 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Benefits and Applications
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Smart Home Applications Across Lighting, HVAC, Security, and Accessibility Systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeSection2Intro />

          {/* Learning Outcomes */}
          <SmartHomeSection2LearningOutcomes />

          {/* Smart Lighting Section with Interactive Check */}
          <SmartLightingSection />

          {/* Smart HVAC Section with Interactive Check */}
          <SmartHVACSection />

          {/* Smart Security Section with Interactive Check */}
          <SmartSecuritySection />

          {/* Smart Accessibility Section with Interactive Check */}
          <SmartAccessibilitySection />

          {/* Real World Example */}
          <SmartHomeSection2RealWorld />

          {/* FAQ Section */}
          <SmartHomeSection2FAQ />

          {/* Summary */}
          <SmartHomeSection2Summary />

          {/* Quiz Section */}
          <SmartHomeSection2Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="/study-centre/upskilling/smart-home-module-1-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-transparent/80 hover:text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/smart-home-module-1-section-3">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
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

export default SmartHomeModule1Section2;