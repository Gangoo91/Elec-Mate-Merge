import { ArrowLeft, ArrowRight, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { SmartHomeModule2Section3Intro } from '@/components/upskilling/smart-home/SmartHomeModule2Section3Intro';
import { SmartHomeModule2Section3LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule2Section3LearningOutcomes';
import { WiFiInSmartHomesSection } from '@/components/upskilling/smart-home/WiFiInSmartHomesSection';
import { BluetoothOverviewSection } from '@/components/upskilling/smart-home/BluetoothOverviewSection';
import { ThreadProtocolSection } from '@/components/upskilling/smart-home/ThreadProtocolSection';
import { MatterStandardSection } from '@/components/upskilling/smart-home/MatterStandardSection';
import { ModernProtocolComparisonSection } from '@/components/upskilling/smart-home/ModernProtocolComparisonSection';
import { ModernProtocolUseCasesSection } from '@/components/upskilling/smart-home/ModernProtocolUseCasesSection';
import { SmartHomeModule2Section3RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule2Section3RealWorld';
import { SmartHomeModule2Section3FAQ } from '@/components/upskilling/smart-home/SmartHomeModule2Section3FAQ';
import { SmartHomeModule2Section3Summary } from '@/components/upskilling/smart-home/SmartHomeModule2Section3Summary';
import { SmartHomeModule2Section3QuizNewStyle } from '@/components/upskilling/smart-home/SmartHomeModule2Section3QuizNewStyle';

const SmartHomeModule2Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Wi-Fi, Bluetooth, Thread & Matter | Smart Home Module 2 Section 3';
    document.title = title; // Smart Home Module 2 Section 3
    const desc = 'Learn about Wi-Fi, Bluetooth, Thread and Matter protocols in smart homes. Understand their strengths, applications, and how they shape the future of home automation.';
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
        <Link to="/study-centre/upskilling/smart-home-module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Wifi className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 2 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Wi-Fi, Bluetooth, Thread & Matter
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Modern Protocols and Future Standards
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <SmartHomeModule2Section3Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule2Section3LearningOutcomes />

          {/* Wi-Fi in Smart Homes */}
          <WiFiInSmartHomesSection />

          {/* Bluetooth Overview */}
          <BluetoothOverviewSection />

          {/* Thread Protocol */}
          <ThreadProtocolSection />

          {/* Matter Standard */}
          <MatterStandardSection />

          {/* Protocol Comparison */}
          <ModernProtocolComparisonSection />

          {/* Best Use Cases */}
          <ModernProtocolUseCasesSection />

          {/* Real World Example */}
          <SmartHomeModule2Section3RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule2Section3FAQ />

          {/* Summary */}
          <SmartHomeModule2Section3Summary />

          {/* Quiz Section */}
          <SmartHomeModule2Section3QuizNewStyle />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="/study-centre/upskilling/smart-home-module-2-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-transparent/80 hover:text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/smart-home-module-2">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
                Back to Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule2Section3;