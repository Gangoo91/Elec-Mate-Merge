import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule5Section5Intro } from '@/components/upskilling/smart-home/SmartHomeModule5Section5Intro';
import { SmartHomeModule5Section5LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule5Section5LearningOutcomes';
import { SmartHomeModule5Section5LightingScenes } from '@/components/upskilling/smart-home/SmartHomeModule5Section5LightingScenes';
import { SmartHomeModule5Section5SecurityIntegration } from '@/components/upskilling/smart-home/SmartHomeModule5Section5SecurityIntegration';
import { SmartHomeModule5Section5EmergencyLighting } from '@/components/upskilling/smart-home/SmartHomeModule5Section5EmergencyLighting';
import { SmartHomeModule5Section5PracticalSetup } from '@/components/upskilling/smart-home/SmartHomeModule5Section5PracticalSetup';
import { SmartHomeModule5Section5PracticalGuidance } from '@/components/upskilling/smart-home/SmartHomeModule5Section5PracticalGuidance';
import { SmartHomeModule5Section5RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule5Section5RealWorld';
import { SmartHomeModule5Section5FAQ } from '@/components/upskilling/smart-home/SmartHomeModule5Section5FAQ';
import { SmartHomeModule5Section5Summary } from '@/components/upskilling/smart-home/SmartHomeModule5Section5Summary';
import { SmartHomeModule5Section5Quiz } from '@/components/upskilling/smart-home/SmartHomeModule5Section5Quiz';
import { LightingSceneDefinitionQuickCheck } from '@/components/upskilling/smart-home/LightingSceneDefinitionQuickCheck';
import { SecurityLightingDeterrentQuickCheck } from '@/components/upskilling/smart-home/SecurityLightingDeterrentQuickCheck';
import { EmergencyLightingFireQuickCheck } from '@/components/upskilling/smart-home/EmergencyLightingFireQuickCheck';
import { ElectricianSetupTestingQuickCheck } from '@/components/upskilling/smart-home/ElectricianSetupTestingQuickCheck';

const SmartHomeModule5Section5 = () => {
  // SEO
  useEffect(() => {
    const title = 'Linking with Lighting and Emergency Scenes | Smart Home Module 5 Section 5';
    document.title = title;
    const desc = 'Learn how to integrate smart lighting with security systems and emergency scenarios. Understand lighting scenes, automation triggers, and safety protocols.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../smart-home-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 5 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
            Linking with Lighting and Emergency Scenes
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Integrating lighting automation with security systems and emergency protocols
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <SmartHomeModule5Section5Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule5Section5LearningOutcomes />

          {/* What Are Lighting Scenes? */}
          <SmartHomeModule5Section5LightingScenes />

          {/* Quick Check - Lighting Scene Definition */}
          <LightingSceneDefinitionQuickCheck />

          {/* Security Integration with Lighting */}
          <SmartHomeModule5Section5SecurityIntegration />

          {/* Quick Check - Security Lighting Deterrent */}
          <SecurityLightingDeterrentQuickCheck />

          {/* Emergency Lighting and Alerts */}
          <SmartHomeModule5Section5EmergencyLighting />

          {/* Quick Check - Emergency Lighting Fire */}
          <EmergencyLightingFireQuickCheck />

          {/* Practical Setup Considerations */}
          <SmartHomeModule5Section5PracticalSetup />

          {/* Quick Check - Electrician Setup Testing */}
          <ElectricianSetupTestingQuickCheck />

          {/* Practical Guidance */}
          <SmartHomeModule5Section5PracticalGuidance />

          {/* Real World Example */}
          <SmartHomeModule5Section5RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule5Section5FAQ />

          {/* Summary */}
          <SmartHomeModule5Section5Summary />

          {/* Quiz Section */}
          <SmartHomeModule5Section5Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-5-section-4">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Section 4
              </Button>
            </Link>
            <Link to="../smart-home-module-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default SmartHomeModule5Section5;