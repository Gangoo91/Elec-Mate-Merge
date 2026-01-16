import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BMSMockExam from '@/components/upskilling/BMSMockExam';

const BMSMockExamPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to BMS Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8">
        <BMSMockExam />
      </div>
    </div>
  );
};

export default BMSMockExamPage;