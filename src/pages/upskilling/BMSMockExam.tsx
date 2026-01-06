import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BMSMockExam from '@/components/upskilling/BMSMockExam';

const BMSMockExamPage = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="../bms-course">
            <Button variant="ghost" className="text-white hover:text-elec-yellow hover:bg-white/5">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to BMS Course
            </Button>
          </Link>
        </div>

        <BMSMockExam />
      </div>
    </div>
  );
};

export default BMSMockExamPage;