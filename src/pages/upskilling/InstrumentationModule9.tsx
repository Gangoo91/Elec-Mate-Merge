import { ArrowLeft, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationMockExam from '@/components/upskilling/InstrumentationMockExam';

const InstrumentationModule9 = () => {
  const sections = [
    {
      id: 1,
      title: "Mock Examination",
      description: "Comprehensive 25-question examination covering all instrumentation modules with 70% pass rate required",
      icon: FileCheck,
      component: <InstrumentationMockExam />
  }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-4 pb-10">
        
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 9: Mock Exam
            </h1>
            <p className="text-xl text-gray-400 mb-3">
              Comprehensive assessment covering all instrumentation course modules
            </p>
          </div>

          <div>
            <InstrumentationMockExam />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule9;