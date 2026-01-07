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
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-6">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Understanding RCDs and Their Purpose
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">
            Comprehensive coverage of RCD fundamentals, operating principles, and safety applications
          </p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">
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
        <div className="space-y-4 sm:space-y-6">
          <RCDFundamentalsContent />
          <RCDFundamentalsPractical />
          <RCDFundamentalsFAQ />
          <RCDFundamentalsQuiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../module-5/section-7">
              <Button
                variant="outline"
                className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 min-h-[48px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Module 5 Final
              </Button>
            </Link>

            <Link to="../module-6/section-2">
              <Button
                className="bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 min-h-[48px]"
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