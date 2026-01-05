import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SmartHomeModule6Section5Intro from '@/components/upskilling/smart-home/SmartHomeModule6Section5Intro';
import SmartHomeModule6Section5LearningOutcomes from '@/components/upskilling/smart-home/SmartHomeModule6Section5LearningOutcomes';
import SmartHomeModule6Section5Causes from '@/components/upskilling/smart-home/SmartHomeModule6Section5Causes';
import SmartHomeModule6Section5Symptoms from '@/components/upskilling/smart-home/SmartHomeModule6Section5Symptoms';
import SmartHomeModule6Section5Troubleshooting from '@/components/upskilling/smart-home/SmartHomeModule6Section5Troubleshooting';
import SmartHomeModule6Section5Prevention from '@/components/upskilling/smart-home/SmartHomeModule6Section5Prevention';
import SmartHomeModule6Section5Practical from '@/components/upskilling/smart-home/SmartHomeModule6Section5Practical';
import SmartHomeModule6Section5RealWorld from '@/components/upskilling/smart-home/SmartHomeModule6Section5RealWorld';
import SmartHomeModule6Section5Summary from '@/components/upskilling/smart-home/SmartHomeModule6Section5Summary';
import SmartHomeModule6Section5Quiz from '@/components/upskilling/quiz/SmartHomeModule6Section5Quiz';

const SmartHomeModule6Section5 = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../smart-home-module-6">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        <div className="space-y-3">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Troubleshooting Ecosystem Conflicts</h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">Diagnosing and resolving compatibility issues in multi-brand smart home systems</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 6.5</Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">45 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <SmartHomeModule6Section5Intro />
          <SmartHomeModule6Section5LearningOutcomes />
          <SmartHomeModule6Section5Causes />
          <SmartHomeModule6Section5Symptoms />
          <SmartHomeModule6Section5Troubleshooting />
          <SmartHomeModule6Section5Prevention />
          <SmartHomeModule6Section5Practical />
          <SmartHomeModule6Section5RealWorld />
          <SmartHomeModule6Section5Summary />
          <SmartHomeModule6Section5Quiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../smart-home-module-6-section-4">
              <Button variant="outline" className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            </Link>
            <Link to="../smart-home-module-6-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Next
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartHomeModule6Section5;