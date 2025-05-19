
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Award, ArrowLeft } from "lucide-react";
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
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Mock Exams</h1>
          <p className="text-muted-foreground">
            Prepare for your electrical qualifications with our comprehensive practice exams
          </p>
        </div>
        <Link to="/apprentice/study" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Award className="h-5 w-5 text-elec-yellow" />
          Why Mock Exams Matter
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Our mock exams are carefully crafted to simulate the actual examination experience for UK electrical qualifications. 
          They cover all essential topics from the latest syllabi and regulations including the 18th Edition BS 7671.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-elec-dark/40 p-4 rounded-md flex flex-col items-center text-center">
            <FileText className="h-8 w-8 text-elec-yellow mb-2" />
            <h3 className="font-semibold mb-1">Exam Format</h3>
            <p className="text-xs text-muted-foreground">Matches official examination structure with similar question formats</p>
          </div>
          <div className="bg-elec-dark/40 p-4 rounded-md flex flex-col items-center text-center">
            <Clock className="h-8 w-8 text-elec-yellow mb-2" />
            <h3 className="font-semibold mb-1">Timed Practice</h3>
            <p className="text-xs text-muted-foreground">Develop time management skills under realistic exam conditions</p>
          </div>
          <div className="bg-elec-dark/40 p-4 rounded-md flex flex-col items-center text-center">
            <Award className="h-8 w-8 text-elec-yellow mb-2" />
            <h3 className="font-semibold mb-1">Detailed Feedback</h3>
            <p className="text-xs text-muted-foreground">Review your answers with expert explanations for each question</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-elec-gray border border-elec-yellow/20 w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="level 2">Level 2</TabsTrigger>
          <TabsTrigger value="level 3">Level 3</TabsTrigger>
          <TabsTrigger value="level 4">Level 4</TabsTrigger>
          <TabsTrigger value="am2">AM2</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6">
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExams.map((exam) => (
                <Card 
                  key={exam.id}
                  className={`border-elec-yellow/30 hover:border-elec-yellow/50 transition-colors ${exam.isPremium && !isSubscribed ? 'bg-elec-gray/80' : 'bg-elec-gray'}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{exam.title}</CardTitle>
                      {exam.isPremium && (
                        <Badge className="bg-elec-yellow text-elec-dark">Premium</Badge>
                      )}
                    </div>
                    <CardDescription>{exam.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
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
                        className="sm:flex-shrink-0"
                      >
                        <Link to={`/apprentice/study/mock-exams/${exam.id}`}>
                          Start Exam
                        </Link>
                      </Button>
                    </div>
                    
                    {exam.isPremium && !isSubscribed && (
                      <div className="mt-4 flex items-center justify-center p-2 bg-elec-dark/50 rounded-md">
                        <Award className="h-4 w-4 text-elec-yellow mr-2" />
                        <span className="text-xs">Subscribe to access premium mock exams</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-elec-yellow/30 bg-elec-gray p-8 text-center">
              <CardContent>
                <p>No mock exams available for this level at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg">How to Use These Mock Exams</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">1. Create a Study-Like Environment</h3>
            <p className="text-sm text-muted-foreground">
              Find a quiet space free from distractions. Set up your workspace as you would for the real exam.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">2. Time Yourself Properly</h3>
            <p className="text-sm text-muted-foreground">
              Our exams include timers, but we recommend setting a separate timer to build time-management skills.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">3. Review Your Results Thoroughly</h3>
            <p className="text-sm text-muted-foreground">
              Don't just focus on your score – read the explanations for questions you answered incorrectly to improve your understanding.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">4. Track Your Progress</h3>
            <p className="text-sm text-muted-foreground">
              Take multiple exams over time to see your improvement. Focus extra study on areas where you consistently struggle.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-4 mt-8 flex items-start gap-3">
        <FileText className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-200/90">
          <strong>Disclaimer:</strong> These mock exams are designed to help with your revision but do not guarantee 
          success in official examinations. All content is regularly updated to reflect current UK electrical regulations, 
          but always refer to the official examination bodies for the most up-to-date information.
        </p>
      </div>
    </div>
  );
};

export default MockExams;
