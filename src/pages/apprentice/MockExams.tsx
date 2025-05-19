
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockExams } from "@/data/apprentice/mockExams";

const MockExams = () => {
  const { isSubscribed } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Mock Exams</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Prepare for your electrical qualifications with our practice exams
          </p>
        </div>
        <Link to="/apprentice/study" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <div className="bg-elec-gray border border-elec-yellow/30 rounded-lg p-4 sm:p-6 mb-4">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-elec-gray-dark/40 flex items-center justify-center">
            <FileText className="h-8 w-8 text-elec-yellow" />
          </div>
        </div>
        
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center">Detailed Feedback</h2>
        <p className="text-center text-muted-foreground text-sm mb-4">
          Review answers with explanations
        </p>
      </div>

      <div className="space-y-4">
        {mockExams.map((exam) => (
          <Card 
            key={exam.id}
            className="border-elec-yellow/30 bg-elec-gray overflow-hidden"
          >
            <CardHeader className="pb-2 px-4 pt-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg sm:text-xl">{exam.title}</CardTitle>
                {exam.isPremium && (
                  <Badge className="bg-elec-yellow text-elec-dark">Premium</Badge>
                )}
              </div>
              <CardDescription className="text-xs sm:text-sm">{exam.description}</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-elec-yellow" />
                    {exam.duration} mins
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1 text-elec-yellow" />
                    {exam.questionCount} questions
                  </div>
                </div>
                
                <Button 
                  asChild 
                  disabled={exam.isPremium && !isSubscribed}
                  className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <Link to={`/apprentice/study/mock-exams/${exam.id}`}>
                    Start Exam
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-3 mt-6 flex items-start gap-3">
        <FileText className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200/90">
          <strong>Disclaimer:</strong> These mock exams are designed to help with revision but do not guarantee 
          success in official examinations. All content is regularly updated to reflect current UK electrical regulations.
        </p>
      </div>
    </div>
  );
};

export default MockExams;
