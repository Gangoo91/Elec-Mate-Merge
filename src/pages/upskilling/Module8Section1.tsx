import { ArrowLeft, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MockExamQuiz from '@/components/upskilling/MockExamQuiz';

const Module8Section1 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="/study-centre/upskilling/inspection-testing-module-8">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <MockExamQuiz />
      </div>
    </div>
  );
};

export default Module8Section1;