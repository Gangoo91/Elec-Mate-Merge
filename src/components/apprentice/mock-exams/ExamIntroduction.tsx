
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText } from "lucide-react";

interface ExamIntroductionProps {
  exam: {
    title: string;
    description: string;
    duration: number;
    questionCount: number;
  };
  onStart: () => void;
}

const ExamIntroduction: React.FC<ExamIntroductionProps> = ({ exam, onStart }) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-lg sm:text-xl">Exam Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base">{exam.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 sm:mt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm sm:text-base">Duration: {exam.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm sm:text-base">Questions: {exam.questionCount}</span>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 p-3 sm:p-4 rounded-md mt-4 sm:mt-6">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li>Complete all questions within the allocated time of {exam.duration} minutes</li>
              <li>You can navigate between questions using the Previous and Next buttons</li>
              <li>If you run out of time, the exam will automatically submit</li>
              <li>Your results will be displayed at the end of the exam</li>
              <li>A score of 70% or higher is considered a pass</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="pb-4">
          <Button 
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" 
            onClick={onStart}
          >
            Start Exam
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExamIntroduction;
