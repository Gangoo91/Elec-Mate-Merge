import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule5Section3Intro } from '@/components/upskilling/smart-home/SmartHomeModule5Section3Intro';
import { SmartHomeModule5Section3LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule5Section3LearningOutcomes';
import { SmartHomeModule5Section3ContactSensors } from '@/components/upskilling/smart-home/SmartHomeModule5Section3ContactSensors';
import { SmartHomeModule5Section3PIRSensors } from '@/components/upskilling/smart-home/SmartHomeModule5Section3PIRSensors';
import { SmartHomeModule5Section3LayeredSecurity } from '@/components/upskilling/smart-home/SmartHomeModule5Section3LayeredSecurity';
import { SmartHomeModule5Section3Installation } from '@/components/upskilling/smart-home/SmartHomeModule5Section3Installation';
import { ContactSensorTriggerQuickCheck } from '@/components/upskilling/smart-home/ContactSensorTriggerQuickCheck';
import { PIRPlacementQuickCheck } from '@/components/upskilling/smart-home/PIRPlacementQuickCheck';
import { PIRRadiatorQuickCheck } from '@/components/upskilling/smart-home/PIRRadiatorQuickCheck';
import { LayeredSecurityBenefitQuickCheck } from '@/components/upskilling/smart-home/LayeredSecurityBenefitQuickCheck';
import { SmartHomeModule5Section3RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule5Section3RealWorld';
import { SmartHomeModule5Section3FAQ } from '@/components/upskilling/smart-home/SmartHomeModule5Section3FAQ';
import { SmartHomeModule5Section3Summary } from '@/components/upskilling/smart-home/SmartHomeModule5Section3Summary';
import { SmartHomeModule5Section3Quiz } from '@/components/upskilling/smart-home/SmartHomeModule5Section3Quiz';

const SmartHomeModule5Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Door/Window Contact Sensors and PIR | Smart Home Module 5 Section 3';
    document.title = title;
    const desc = 'Learn about door/window contact sensors and PIR motion detectors for smart home security. Understand layered perimeter and interior detection strategies.';
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
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../smart-home-module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-elec-yellow drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-transparent text-elec-yellow border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 5 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
            Door/Window Contact Sensors and PIR
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Perimeter contacts and indoor motion detection for layered security
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <SmartHomeModule5Section3Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule5Section3LearningOutcomes />

          {/* Door/Window Contact Sensors */}
          <SmartHomeModule5Section3ContactSensors />

          {/* Quick Check - Contact Sensor Trigger */}
          <ContactSensorTriggerQuickCheck />

          {/* PIR Motion Sensors */}
          <SmartHomeModule5Section3PIRSensors />

          {/* Quick Check - PIR Placement */}
          <PIRPlacementQuickCheck />

          {/* Quick Check - PIR Radiator */}
          <PIRRadiatorQuickCheck />

          {/* Layered Security Benefits */}
          <SmartHomeModule5Section3LayeredSecurity />

          {/* Quick Check - Layered Security Benefit */}
          <LayeredSecurityBenefitQuickCheck />

          {/* Installation & Limitations */}
          <SmartHomeModule5Section3Installation />

          {/* Real World Example */}
          <SmartHomeModule5Section3RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule5Section3FAQ />

          {/* Summary */}
          <SmartHomeModule5Section3Summary />

          {/* Quiz Section */}
          <SmartHomeModule5Section3Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-5-section-2">
              <Button 
                variant="outline" 
                className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Section 2
              </Button>
            </Link>
            <Link to="../smart-home-module-5">
              <Button className="bg-elec-yellow text-black hover:bg-yellow-600">
                Back to Module 5
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SmartHomeModule5Section3;