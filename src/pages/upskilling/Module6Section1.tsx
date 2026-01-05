import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { RCDFundamentalsContent } from '@/components/upskilling/RCDFundamentalsContent';
import { RCDFundamentalsPractical } from '@/components/upskilling/RCDFundamentalsPractical';
import { RCDFundamentalsFAQ } from '@/components/upskilling/RCDFundamentalsFAQ';
import { RCDFundamentalsQuiz } from '@/components/upskilling/quiz/RCDFundamentalsQuiz';

const Module6Section1 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Understanding RCDs and Their Purpose
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Comprehensive coverage of RCD fundamentals, operating principles, and safety applications
          </p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Module 6.1
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-white">
              25 minutes
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <RCDFundamentalsContent />
          <RCDFundamentalsPractical />
          <RCDFundamentalsFAQ />
          <RCDFundamentalsQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="../module-6">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 6
              </Button>
            </Link>
            
            <Link to="module-6/section-2">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
              >
                Next: RCD Types
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module6Section1;