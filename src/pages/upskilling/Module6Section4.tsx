import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import RCDInstallationContent from '@/components/upskilling/RCDInstallationContent';
import RCDInstallationPractical from '@/components/upskilling/RCDInstallationPractical';
import RCDInstallationFAQ from '@/components/upskilling/RCDInstallationFAQ';
import { RCDInstallationQuiz } from '@/components/upskilling/quiz/RCDInstallationQuiz';

const Module6Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-6">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">RCD Installation Requirements</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">Proper installation methods and regulatory compliance for residual current devices</p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 6.4</Badge>
            <Badge variant="outline" className="border-gray-600 text-white">35 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <RCDInstallationContent />
          <RCDInstallationPractical />
          <RCDInstallationFAQ />
          <RCDInstallationQuiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-stretch sm:items-center">
            <Link to="module-6/section-3" className="flex-1 sm:flex-initial">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Previous: RCD Testing</span>
              </Button>
            </Link>
            <Link to="module-6/section-5" className="flex-1 sm:flex-initial">
              <Button 
                className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 min-h-[48px] px-4 py-3 text-sm sm:text-base"
              >
                <span className="truncate">Next: Maintenance & Compliance</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module6Section4;