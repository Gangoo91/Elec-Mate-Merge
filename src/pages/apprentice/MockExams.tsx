
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Award, CheckCircle, Star, Zap, Lock, ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { useAuth } from "@/contexts/AuthContext";

interface MockExam {
  id: string;
  title: string;
  description: string;
  duration: number;
  questionCount: number;
  level: string;
  isPremium: boolean;
}

// Mock data for exams
const mockExams: MockExam[] = [
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
    description: "Specialised practice test focusing on inspection, testing and commissioning procedures.",
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

// Reusable ExamCard component
const ExamCard = ({ exam, isSubscribed }: { exam: MockExam; isSubscribed: boolean }) => {
  const isLocked = exam.isPremium && !isSubscribed;

  return (
    <Card
      className={`group relative overflow-hidden border-elec-yellow/20 transition-all duration-300 hover:border-elec-yellow/50 hover:shadow-lg hover:shadow-elec-yellow/5 ${
        isLocked ? 'bg-elec-gray/60' : 'bg-gradient-to-br from-elec-gray to-elec-gray/80'
      }`}
    >
      {/* Premium indicator strip */}
      {exam.isPremium && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
      )}

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg sm:text-xl text-white group-hover:text-elec-yellow transition-colors">
              {exam.title}
            </CardTitle>
            <Badge
              variant="outline"
              className={`mt-2 text-xs ${
                exam.level === 'Level 2' ? 'border-green-500/50 text-green-400' :
                exam.level === 'Level 3' ? 'border-blue-500/50 text-blue-400' :
                'border-purple-500/50 text-purple-400'
              }`}
            >
              {exam.level}
            </Badge>
          </div>
          {exam.isPremium && (
            <Badge className="bg-gradient-to-r from-elec-yellow to-amber-500 text-elec-dark font-semibold shrink-0">
              <Star className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm mt-2">{exam.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4 text-elec-yellow/70" />
            <span>{exam.duration} mins</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <FileText className="h-4 w-4 text-elec-yellow/70" />
            <span>{exam.questionCount} questions</span>
          </div>
        </div>

        {/* Action */}
        {isLocked ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
              <Lock className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-muted-foreground">Subscribe to unlock premium exams</span>
            </div>
            <Button variant="outline" className="w-full border-elec-yellow/30" disabled>
              <Lock className="mr-2 h-4 w-4" />
              Locked
            </Button>
          </div>
        ) : (
          <Button
            asChild
            className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold group/btn"
          >
            <Link to={`/apprentice/study/mock-exams/${exam.id}`}>
              Start Exam
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Exam grid component
const ExamGrid = ({ exams, isSubscribed }: { exams: MockExam[]; isSubscribed: boolean }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
    {exams.length > 0 ? (
      exams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} isSubscribed={isSubscribed} />
      ))
    ) : (
      <div className="col-span-full text-center py-12 text-muted-foreground">
        No exams available for this level yet.
      </div>
    )}
  </div>
);

const MockExams = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { isSubscribed } = useAuth();

  // Filter exams based on the active tab
  const getFilteredExams = (level: string): MockExam[] => {
    return level === "all"
      ? mockExams
      : mockExams.filter(exam => exam.level.toLowerCase().includes(level));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-elec-yellow/20">
              <GraduationCap className="h-6 w-6 text-elec-yellow" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mock Exams</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Prepare for your qualifications with practice exams and assessments
          </p>
        </div>
        <Link to="/apprentice/study" className="shrink-0">
          <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
            <FileText className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{mockExams.length}</div>
            <div className="text-xs text-muted-foreground">Total Exams</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {mockExams.filter(e => !e.isPremium).length}
            </div>
            <div className="text-xs text-muted-foreground">Free Exams</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">
              {mockExams.filter(e => e.isPremium).length}
            </div>
            <div className="text-xs text-muted-foreground">Premium</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {mockExams.reduce((acc, e) => acc + e.questionCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Questions</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Content */}
      <DropdownTabs
        placeholder="Select exam level"
        defaultValue="all"
        onValueChange={setActiveTab}
        tabs={[
          {
            value: "all",
            label: "All Exams",
            icon: CheckCircle,
            content: <ExamGrid exams={getFilteredExams("all")} isSubscribed={isSubscribed} />
          },
          {
            value: "level 2",
            label: "Level 2",
            icon: Star,
            content: <ExamGrid exams={getFilteredExams("level 2")} isSubscribed={isSubscribed} />
          },
          {
            value: "level 3",
            label: "Level 3",
            icon: Zap,
            content: <ExamGrid exams={getFilteredExams("level 3")} isSubscribed={isSubscribed} />
          },
          {
            value: "level 4",
            label: "Level 4",
            icon: Award,
            content: <ExamGrid exams={getFilteredExams("level 4")} isSubscribed={isSubscribed} />
          }
        ]}
      />
    </div>
  );
};

export default MockExams;
