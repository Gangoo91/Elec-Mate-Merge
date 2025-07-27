
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Award, CheckCircle, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for exams
const mockExams = [
  {
    id: "level2-am2",
    title: "Level 2 - AM2 Practice Exam",
    description: "Comprehensive practice exam covering all Level 2 topics with an emphasis on AM2 assessment preparation.",
    duration: 120,
    questionCount: 60,
    level: "Level 2",
    isPremium: false,
  },
  {
    id: "level2-unit1",
    title: "Level 2 - Unit 1 Health & Safety",
    description: "Practice exam focused on health and safety principles for electrical installation work.",
    duration: 45,
    questionCount: 30,
    level: "Level 2",
    isPremium: false,
  },
  {
    id: "level3-full",
    title: "Level 3 - Full Practice Exam",
    description: "Complete mock exam covering all Level 3 topics including electrical science and fault diagnosis.",
    duration: 180,
    questionCount: 80,
    level: "Level 3",
    isPremium: true,
  },
  {
    id: "level3-inspection",
    title: "Level 3 - Inspection & Testing",
    description: "Specialized practice test focusing on inspection, testing and commissioning procedures.",
    duration: 60,
    questionCount: 40,
    level: "Level 3",
    isPremium: true,
  },
  {
    id: "level4-design",
    title: "Level 4 - Electrical Design",
    description: "Advanced mock exam on electrical system design principles for experienced electricians.",
    duration: 120,
    questionCount: 50,
    level: "Level 4",
    isPremium: true,
  }
];

const MockExams = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { isSubscribed } = useAuth();
  
  // Filter exams based on the active tab
  const getFilteredExams = (level: string) => {
    return level === "all" 
      ? mockExams 
      : mockExams.filter(exam => exam.level.toLowerCase().includes(level));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Mock Exams</h1>
          <p className="text-muted-foreground">
            Prepare for your qualifications with practice exams and assessments
          </p>
        </div>
        <Link to="/apprentice/study" className="w-full sm:w-auto">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </div>

      <DropdownTabs
        placeholder="Select exam level"
        defaultValue="all"
        onValueChange={setActiveTab}
        tabs={[
          {
            value: "all",
            label: "All Exams",
            icon: CheckCircle,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredExams("all").map((exam) => (
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
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {exam.duration} mins
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {exam.questionCount} questions
                          </div>
                        </div>
                        
                        <Button asChild disabled={exam.isPremium && !isSubscribed}>
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
            )
          },
          {
            value: "level 2",
            label: "Level 2",
            icon: Star,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredExams("level 2").map((exam) => (
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
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {exam.duration} mins
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {exam.questionCount} questions
                          </div>
                        </div>
                        
                        <Button asChild disabled={exam.isPremium && !isSubscribed}>
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
            )
          },
          {
            value: "level 3",
            label: "Level 3",
            icon: Zap,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredExams("level 3").map((exam) => (
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
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {exam.duration} mins
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {exam.questionCount} questions
                          </div>
                        </div>
                        
                        <Button asChild disabled={exam.isPremium && !isSubscribed}>
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
            )
          },
          {
            value: "level 4",
            label: "Level 4",
            icon: Award,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredExams("level 4").map((exam) => (
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
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {exam.duration} mins
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {exam.questionCount} questions
                          </div>
                        </div>
                        
                        <Button asChild disabled={exam.isPremium && !isSubscribed}>
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
            )
          }
        ]}
      />
    </div>
  );
};

export default MockExams;
