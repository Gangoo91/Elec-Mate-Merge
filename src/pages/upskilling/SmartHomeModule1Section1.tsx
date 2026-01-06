import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeIntro } from '@/components/upskilling/smart-home/SmartHomeIntro';
import { SmartHomeLearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeLearningOutcomes';
import { SmartHomeContent } from '@/components/upskilling/smart-home/SmartHomeContent';
import { SmartHomeQuickCheck } from '@/components/upskilling/smart-home/SmartHomeQuickCheck';
import { SmartHomeRealWorld } from '@/components/upskilling/smart-home/SmartHomeRealWorld';
import { SmartHomeFAQ } from '@/components/upskilling/smart-home/SmartHomeFAQ';
import { SmartHomeSummary } from '@/components/upskilling/smart-home/SmartHomeSummary';
import { SmartHomeQuiz } from '@/components/upskilling/SmartHomeQuiz';

const SmartHomeModule1Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'What is a Smart Home? | Smart Home Module 1 Section 1';
    document.title = title;
    const desc = 'Learn about smart home technology, communication protocols, benefits, and implementation strategies. Understand Zigbee, Z-Wave, Wi-Fi connectivity and automation systems.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../smart-home-module-1">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Home className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 1 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            What is a Smart Home?
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Introduction to Smart Home Technology, Communication Protocols, and Intelligent Automation Systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeIntro />

          {/* Learning Outcomes */}
          <SmartHomeLearningOutcomes />

          {/* Core Content */}
          <SmartHomeContent />

          {/* Quick Check */}
          <SmartHomeQuickCheck />

          {/* Real World Example */}
          <SmartHomeRealWorld />

          {/* FAQ Section */}
          <SmartHomeFAQ />

          {/* Summary */}
          <SmartHomeSummary />

          {/* Quiz Section */}
          <SmartHomeQuiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <div></div>
            <Link to="../smart-home-module-1-section-2">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600">
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

export default SmartHomeModule1Section1;