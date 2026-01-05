import { ArrowLeft, ClipboardCheck, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SmartHomeModule8 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../smart-home-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Smart Home Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 8: Mock Exam
            </h1>
            <p className="text-xl text-white mb-6">
              Test your knowledge with a comprehensive mock examination covering all aspects of smart home technology
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                45 minutes
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                30 Questions
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-transparent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ClipboardCheck className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Exam Overview</h3>
                </div>
                <div className="space-y-3 text-white">
                  <p>• 30 multiple-choice questions</p>
                  <p>• 45-minute time limit</p>
                  <p>• Pass mark: 70% (21 correct answers)</p>
                  <p>• Covers all smart home technology areas</p>
                  <p>• Immediate results and detailed feedback</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-transparent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Topics Covered</h3>
                </div>
                <div className="space-y-3 text-white">
                  <p>• Smart home system fundamentals</p>
                  <p>• Communication protocols</p>
                  <p>• Lighting and scene programming</p>
                  <p>• HVAC and environmental control</p>
                  <p>• Security and access control</p>
                  <p>• Hubs and voice assistants</p>
                  <p>• Installation and safety</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-yellow-400/10 border-yellow-400/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Before You Begin</h3>
              </div>
              <div className="space-y-3 text-white">
                <p>• Ensure you have completed all previous modules</p>
                <p>• Review your module notes and key concepts</p>
                <p>• Find a quiet environment with stable internet connection</p>
                <p>• Allow uninterrupted time for the full 60-minute duration</p>
                <p>• Have a calculator and notepad available if needed</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Link to="../smart-home-mock-exam">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 px-8 py-3 text-lg font-semibold"
              >
                <Clock className="mr-2 h-5 w-5" />
                Start Mock Exam
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule8;