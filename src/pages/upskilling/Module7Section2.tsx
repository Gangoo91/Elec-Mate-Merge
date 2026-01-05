import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import EICContent from '@/components/upskilling/EICContent';
import EICPractical from '@/components/upskilling/EICPractical';
import EICFAQ from '@/components/upskilling/EICFAQ';
import EICQuiz from '@/components/upskilling/quiz/EICQuiz';

const Module7Section2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-7">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Electrical Installation Certificate</h1>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-3xl">Comprehensive guide to completing EIC for new installations and major alterations</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">Module 7.2</Badge>
            <Badge variant="outline" className="border-gray-600 text-white">50 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <EICContent />
          <EICPractical />
          <EICFAQ />
          <EICQuiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <Link to="module-7/section-1" className="order-2 sm:order-1 w-full sm:w-auto">
              <Button variant="outline" className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto h-12 text-sm sm:text-base">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Previous: Purpose of Certification</span>
                <span className="sm:hidden">Previous: Purpose</span>
              </Button>
            </Link>
            <Link to="module-7/section-3" className="order-1 sm:order-2 w-full sm:w-auto">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto h-12 text-sm sm:text-base">
                <span className="hidden sm:inline">Next: Minor Works Certificate</span>
                <span className="sm:hidden">Next: Minor Works</span>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module7Section2;