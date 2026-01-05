import { ArrowLeft, ArrowRight, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeSection4Intro } from '@/components/upskilling/smart-home/SmartHomeSection4Intro';
import { SmartHomeSection4LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeSection4LearningOutcomes';
import { LocalArchitecturesSection } from '@/components/upskilling/smart-home/LocalArchitecturesSection';
import { CloudArchitecturesSection } from '@/components/upskilling/smart-home/CloudArchitecturesSection';
import { HybridArchitecturesSection } from '@/components/upskilling/smart-home/HybridArchitecturesSection';
import { ArchitectureComparisonsSection } from '@/components/upskilling/smart-home/ArchitectureComparisonsSection';
import { ChoosingArchitectureSection } from '@/components/upskilling/smart-home/ChoosingArchitectureSection';

import { SmartHomeSection4RealWorld } from '@/components/upskilling/smart-home/SmartHomeSection4RealWorld';
import { SmartHomeSection4FAQ } from '@/components/upskilling/smart-home/SmartHomeSection4FAQ';
import { SmartHomeSection4Summary } from '@/components/upskilling/smart-home/SmartHomeSection4Summary';
import { SmartHomeSection4Quiz } from '@/components/upskilling/smart-home/SmartHomeSection4Quiz';

const SmartHomeModule1Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Smart Home Architectures | Smart Home Module 1 Section 4';
    document.title = title;
    const desc = 'Learn about local, cloud, and hybrid smart home architectures. Compare advantages, disadvantages, and choose the right system for different applications.';
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
            <Network className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 1 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Smart Home Architectures
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Local, Cloud, and Hybrid Systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <SmartHomeSection4Intro />

          {/* Learning Outcomes */}
          <SmartHomeSection4LearningOutcomes />

          {/* Local Architectures Section */}
          <LocalArchitecturesSection />

          {/* Cloud Architectures Section */}
          <CloudArchitecturesSection />

          {/* Hybrid Architectures Section */}
          <HybridArchitecturesSection />

          {/* Architecture Comparisons Section */}
          <ArchitectureComparisonsSection />

          {/* Choosing Architecture Section */}
          <ChoosingArchitectureSection />


          {/* Real World Example */}
          <SmartHomeSection4RealWorld />

          {/* FAQ Section */}
          <SmartHomeSection4FAQ />

          {/* Summary */}
          <SmartHomeSection4Summary />

          {/* Quiz Section */}
          <SmartHomeSection4Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-1-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-1-section-5">
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

export default SmartHomeModule1Section4;