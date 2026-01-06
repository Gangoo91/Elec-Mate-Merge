import { ArrowLeft, ArrowRight, Target, CheckCircle, TrendingUp, Award, FileText, Building2, BookOpen, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Progression into Higher Qualifications (HNC, degree routes) - Level 3 Career Awareness & Professional Development";
const DESCRIPTION = "Pathways to advanced qualifications and career progression opportunities in electrical engineering.";

const Level3Module7Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does HNC stand for?",
      options: ["Higher National Certificate", "Higher Network Certification", "Home Network Course", "Higher National Course"],
      correctAnswer: 0,
      explanation: "HNC stands for Higher National Certificate, a Level 4 qualification that provides advanced technical knowledge."
    },
    {
      id: 2,
      question: "What level is an HNC qualification?",
      options: ["Level 3", "Level 4", "Level 5", "Level 6"],
      correctAnswer: 1,
      explanation: "An HNC is a Level 4 qualification, equivalent to the first year of a university degree programme."
    },
    {
      id: 3,
      question: "How long does an HNC typically take to complete?",
      options: ["6 months", "1 year", "2 years", "3 years"],
      correctAnswer: 2,
      explanation: "An HNC typically takes 2 years to complete when studied part-time, or 1 year full-time."
    },
    {
      id: 4,
      question: "What is the progression from HNC?",
      options: ["Apprenticeship", "HND (Higher National Diploma)", "Back to Level 3", "No further progression"],
      correctAnswer: 1,
      explanation: "After completing an HNC, students can progress to an HND (Higher National Diploma) at Level 5."
    },
    {
      id: 5,
      question: "What level is a Bachelor's degree?",
      options: ["Level 4", "Level 5", "Level 6", "Level 7"],
      correctAnswer: 2,
      explanation: "A Bachelor's degree is a Level 6 qualification in the UK qualifications framework."
    },
    {
      id: 6,
      question: "Which route allows direct entry to the second year of a degree?",
      options: ["Level 3 qualification", "HNC completion", "Apprenticeship", "Work experience only"],
      correctAnswer: 1,
      explanation: "Completing an HNC often allows direct entry to the second year of a related degree programme."
    },
    {
      id: 7,
      question: "What is a Foundation Degree?",
      options: ["Level 3 qualification", "Level 4 qualification", "Level 5 qualification combining academic and work-based learning", "Level 6 qualification"],
      correctAnswer: 2,
      explanation: "A Foundation Degree is a Level 5 qualification that combines academic study with work-based learning."
    },
    {
      id: 8,
      question: "What career opportunities are opened by higher qualifications?",
      options: ["Basic installation work only", "Design, project management, and consultancy roles", "Apprenticeship training", "Manual work only"],
      correctAnswer: 1,
      explanation: "Higher qualifications open opportunities in electrical design, project management, consultancy, and senior technical roles."
    },
    {
      id: 9,
      question: "What is the typical study mode for working professionals pursuing HNC?",
      options: ["Full-time day courses", "Part-time evening or block release", "Online only", "Weekend intensive courses"],
      correctAnswer: 1,
      explanation: "Working professionals typically study HNC part-time through evening classes or day/block release from work."
    },
    {
      id: 10,
      question: "What subjects are typically covered in an Electrical Engineering HNC?",
      options: ["Basic wiring only", "Advanced electrical principles, power systems, and control systems", "Health and safety only", "Business studies only"],
      correctAnswer: 1,
      explanation: "Electrical Engineering HNC covers advanced electrical principles, power systems, control systems, and engineering mathematics."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card/10">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs md:text-sm">
              Section 7.1.5
            </Badge>
          </div>
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Progression into Higher Qualifications (HNC, degree routes)
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Pathways to advanced qualifications and career progression opportunities in electrical engineering.
          </p>
        </header>

        {/* Introduction Card */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground">Introduction</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 text-sm md:text-base text-foreground">
            <div className="rounded-lg p-3 md:p-4 bg-card border border-border/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>HNC/HND provide pathway to degree-level qualifications.</li>
                <li>Higher qualifications open design and management roles.</li>
                <li>Part-time study options available for working professionals.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 md:p-4 bg-card border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> HNC/HND opportunities, degree pathways, career advancement.</li>
                <li><strong>Use:</strong> Plan career progression, assess study options, research funding.</li>
                <li><strong>Check:</strong> Entry requirements, study modes, progression routes.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground">Learning Outcomes</h2>
          </div>
          <ul className="list-disc pl-6 text-sm md:text-base text-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Identify pathways to higher education and advanced qualifications.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Understand progression routes from vocational to academic qualifications.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Recognise career opportunities available with higher qualifications.
            </li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz</h2>
          <Quiz questions={quizQuestions} title="Progression into Higher Qualifications" />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="../level3-module7-section1-1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Apprenticeships
            </Link>
          </Button>
          <Button asChild>
            <Link to="../section1">
              Back to Section 1
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Level3Module7Section1_5;