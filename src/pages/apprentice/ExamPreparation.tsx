
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Target, CheckCircle, AlertCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const ExamPreparation = () => {
  const examTypes = [
    {
      title: "AM2 Practical Assessment",
      description: "End-point assessment for Level 3 Electrical Installation apprenticeship",
      duration: "5.5 hours",
      difficulty: "Advanced",
      topics: ["Fault finding", "Inspection and testing", "Installation work", "Health and safety"],
      progress: 65,
      link: "/apprentice/am2-prep"
    },
    {
      title: "18th Edition (BS 7671)",
      description: "Wiring Regulations examination",
      duration: "2 hours",
      difficulty: "Intermediate", 
      topics: ["Regulations knowledge", "Design principles", "Installation methods", "Special locations"],
      progress: 80,
      link: "/apprentice/18th-edition"
    },
    {
      title: "2391 Inspection & Testing",
      description: "Initial verification and periodic inspection",
      duration: "2.5 hours",
      difficulty: "Advanced",
      topics: ["Testing procedures", "Test equipment", "Certification", "Fault diagnosis"],
      progress: 45,
      link: "/apprentice/inspection-testing"
    },
    {
      title: "Level 2 Technical Certificate",
      description: "Electrical installations knowledge assessment",
      duration: "1.5 hours",
      difficulty: "Intermediate",
      topics: ["Basic principles", "Safety procedures", "Tools and equipment", "Installation basics"],
      progress: 90,
      link: "/apprentice/level-2"
    }
  ];

  const studyResources = [
    {
      title: "Practice Questions",
      description: "Topic-specific questions with detailed explanations",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      count: "500+ questions"
    },
    {
      title: "Mock Examinations",
      description: "Full-length practice exams under timed conditions",
      icon: <Clock className="h-5 w-5 text-elec-yellow" />,
      count: "12 mock exams"
    },
    {
      title: "Study Guides",
      description: "Comprehensive revision materials for each qualification",
      icon: <BookOpen className="h-5 w-5 text-elec-yellow" />,
      count: "8 study guides"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step explanations of complex topics",
      icon: <CheckCircle className="h-5 w-5 text-elec-yellow" />,
      count: "50+ videos"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Advanced": return "border-red-500/40 text-red-300";
      case "Intermediate": return "border-yellow-500/40 text-yellow-300";
      case "Beginner": return "border-green-500/40 text-green-300";
      default: return "border-elec-yellow/40 text-elec-yellow";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-400";
    if (progress >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Examination Preparation</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Comprehensive preparation resources for electrical qualifications and assessments
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {studyResources.map((resource, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {resource.icon}
                <CardTitle className="text-sm">{resource.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
              <Badge variant="outline" className="text-xs">
                {resource.count}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {examTypes.map((exam, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl text-elec-yellow">{exam.title}</CardTitle>
                <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                  {exam.difficulty}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">{exam.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{exam.duration}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Key Topics:</h4>
                <div className="flex flex-wrap gap-1">
                  {exam.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Preparation Progress</span>
                  <span className={`text-sm font-medium ${getProgressColor(exam.progress)}`}>
                    {exam.progress}%
                  </span>
                </div>
                <Progress value={exam.progress} className="h-2" />
              </div>

              <Link to={exam.link}>
                <Button className="w-full">
                  Start Preparation
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Exam Success Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Before the Exam</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Review regulations and standards thoroughly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Practice calculations and formulas
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Take multiple mock exams under timed conditions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Get plenty of rest the night before
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">During the Exam</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Read all questions carefully before answering
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Manage your time effectively
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Answer easier questions first
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  Double-check calculations and answers
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Practical Assessments</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Follow safe isolation procedures
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Use appropriate test equipment correctly
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Document results clearly and accurately
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Demonstrate professional working practices
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamPreparation;
