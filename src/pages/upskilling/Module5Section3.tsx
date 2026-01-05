import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { EarthFaultLoopContent } from '@/components/upskilling/EarthFaultLoopContent';
import { EarthFaultLoopPractical } from '@/components/upskilling/EarthFaultLoopPractical';
import { EarthFaultLoopFAQ } from '@/components/upskilling/EarthFaultLoopFAQ';
import { EarthFaultLoopSummary } from '@/components/upskilling/EarthFaultLoopSummary';
import { EarthFaultLoopQuiz } from '@/components/upskilling/quiz/EarthFaultLoopQuiz';

const Module5Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-5">
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
            <Shield className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Earth Fault Loop Impedance (Zs & Ze)
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Understanding earth fault loop impedance principles and the difference between Zs and Ze measurements
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <EarthFaultLoopContent />
          <EarthFaultLoopPractical />
          <EarthFaultLoopFAQ />
          <EarthFaultLoopSummary />
          <EarthFaultLoopQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="module-5/section-2">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Test Methods
              </Button>
            </Link>
            
            <Link to="module-5/section-4">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
              >
                Next: Testing at Various Points
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module5Section3;