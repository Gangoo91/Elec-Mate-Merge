
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockExams } from "@/data/apprentice/mockExams";

const MockExams = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { isSubscribed } = useAuth();
  const isMobile = useIsMobile();
  
  // Filter exams based on the active tab
  const filteredExams = activeTab === "all" 
    ? mockExams 
    : mockExams.filter(exam => exam.level.toLowerCase().includes(activeTab));

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

      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 sm:p-6 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
          Why Mock Exams Matter
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4">
          Our mock exams simulate the actual examination experience for UK electrical qualifications. 
          Each exam contains 50 questions to be completed in 60 minutes, covering essential topics 
          from the latest syllabi and regulations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          <div className="bg-elec-dark/40 p-3 rounded-md flex flex-col items-center text-center">
            <FileText className="h-6 w-6 text-elec-yellow mb-2" />
            <h3 className="font-semibold mb-1 text-sm">Exam Format</h3>
            <p className="text-xs text-muted-foreground">Matches official examination structure</p>
          </div>
          <div className="bg-elec-dark/40 p-3 rounded-md flex flex-col items-center text-center">
            <Clock className="h-6 w-6 text-elec-yellow mb-2" />
            <h3 className="font-semibold mb-1 text-sm">Timed Practice</h3>
            <p className="text-xs text-muted-foreground">Develop time management skills</p>
          </div>
          <div className="bg-elec-dark/40 p-3 rounded-md flex flex-col items-center text-center">
            <FileText className="h-6 w-6 text-elec-yellow mb-2" />
            <h3 className="font-semibold mb-1 text-sm">Detailed Feedback</h3>
            <p className="text-xs text-muted-foreground">Review answers with explanations</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-elec-gray border border-elec-yellow/20 w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="level 2">Level 2</TabsTrigger>
          <TabsTrigger value="level 3">Level 3</TabsTrigger>
          <TabsTrigger value="am2">AM2</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredExams.map((exam) => (
                <Card 
                  key={exam.id}
                  className="border-elec-yellow/30 hover:border-elec-yellow/50 transition-colors bg-elec-gray"
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
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div className="flex flex-row gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {exam.duration} mins
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {exam.questionCount} questions
                        </div>
                      </div>
                      
                      <Button 
                        asChild 
                        disabled={exam.isPremium && !isSubscribed}
                        className="w-full sm:w-auto"
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
          ) : (
            <Card className="border-elec-yellow/30 bg-elec-gray p-6 text-center">
              <CardContent>
                <p>No mock exams available for this level at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">How to Use These Mock Exams</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <h3 className="font-medium text-sm">1. Create a Study-Like Environment</h3>
            <p className="text-xs text-muted-foreground">
              Find a quiet space free from distractions. Set up your workspace as you would for the real exam.
            </p>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-medium text-sm">2. Time Yourself Properly</h3>
            <p className="text-xs text-muted-foreground">
              Each exam is timed for 60 minutes. Try to complete all 50 questions within this timeframe.
            </p>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-medium text-sm">3. Review Your Results Thoroughly</h3>
            <p className="text-xs text-muted-foreground">
              Read the explanations for questions you answered incorrectly to improve your understanding.
            </p>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-medium text-sm">4. Track Your Progress</h3>
            <p className="text-xs text-muted-foreground">
              Take multiple exams over time to see your improvement and identify areas for further study.
            </p>
          </div>
        </CardContent>
      </Card>
      
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
