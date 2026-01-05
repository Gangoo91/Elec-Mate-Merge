import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SmartHomeModule5Section4Intro } from '@/components/upskilling/smart-home/SmartHomeModule5Section4Intro';
import { SmartHomeModule5Section4LearningOutcomes } from '@/components/upskilling/smart-home/SmartHomeModule5Section4LearningOutcomes';
import { SmartHomeModule5Section4RemoteAccess } from '@/components/upskilling/smart-home/SmartHomeModule5Section4RemoteAccess';
import { SmartHomeModule5Section4Notifications } from '@/components/upskilling/smart-home/SmartHomeModule5Section4Notifications';
import { SmartHomeModule5Section4Monitoring } from '@/components/upskilling/smart-home/SmartHomeModule5Section4Monitoring';
import { SmartHomeModule5Section4Risks } from '@/components/upskilling/smart-home/SmartHomeModule5Section4Risks';
import { SmartHomeModule5Section4PracticalGuidance } from '@/components/upskilling/smart-home/SmartHomeModule5Section4PracticalGuidance';
import { SmartHomeModule5Section4RealWorld } from '@/components/upskilling/smart-home/SmartHomeModule5Section4RealWorld';
import { SmartHomeModule5Section4FAQ } from '@/components/upskilling/smart-home/SmartHomeModule5Section4FAQ';
import { SmartHomeModule5Section4Summary } from '@/components/upskilling/smart-home/SmartHomeModule5Section4Summary';
import { SmartHomeModule5Section4Quiz } from '@/components/upskilling/smart-home/SmartHomeModule5Section4Quiz';
import { RemoteAccessDefinitionQuickCheck } from '@/components/upskilling/smart-home/RemoteAccessDefinitionQuickCheck';
import { PushNotificationExampleQuickCheck } from '@/components/upskilling/smart-home/PushNotificationExampleQuickCheck';
import { RemoteMonitoringAdvantageQuickCheck } from '@/components/upskilling/smart-home/RemoteMonitoringAdvantageQuickCheck';
import { SecurityRiskQuickCheck } from '@/components/upskilling/smart-home/SecurityRiskQuickCheck';

const SmartHomeModule5Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Remote Access and Alerts | Smart Home Module 5 Section 4';
    document.title = title;
    const desc = 'Learn about remote access, mobile notifications, and cloud-based monitoring for smart home systems. Understand security risks and configuration best practices.';
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
            <Smartphone className="h-8 w-8 text-yellow-400 drop-shadow-lg" />
            <Badge 
              variant="secondary" 
              className="bg-card text-yellow-400 border border-gray-600 font-semibold text-sm px-3 py-1"
            >
              Module 5 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
            Remote Access and Alerts
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Monitor and control smart home systems from anywhere via mobile apps
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          {/* Introduction */}
          <SmartHomeModule5Section4Intro />

          {/* Learning Outcomes */}
          <SmartHomeModule5Section4LearningOutcomes />

          {/* What is Remote Access? */}
          <SmartHomeModule5Section4RemoteAccess />

          {/* Quick Check - Remote Access Definition */}
          <RemoteAccessDefinitionQuickCheck />

          {/* Mobile Notifications and Alerts */}
          <SmartHomeModule5Section4Notifications />

          {/* Quick Check - Push Notification Example */}
          <PushNotificationExampleQuickCheck />

          {/* Monitoring and Control from Anywhere */}
          <SmartHomeModule5Section4Monitoring />

          {/* Quick Check - Remote Monitoring Advantage */}
          <RemoteMonitoringAdvantageQuickCheck />

          {/* Risks and Challenges */}
          <SmartHomeModule5Section4Risks />

          {/* Quick Check - Security Risk */}
          <SecurityRiskQuickCheck />

          {/* Practical Guidance */}
          <SmartHomeModule5Section4PracticalGuidance />

          {/* Real World Example */}
          <SmartHomeModule5Section4RealWorld />

          {/* FAQ Section */}
          <SmartHomeModule5Section4FAQ />

          {/* Summary */}
          <SmartHomeModule5Section4Summary />

          {/* Quiz Section */}
          <SmartHomeModule5Section4Quiz />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../smart-home-module-5-section-3">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Section 3
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

export default SmartHomeModule5Section4;