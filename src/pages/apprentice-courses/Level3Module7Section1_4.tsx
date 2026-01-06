import { ArrowLeft, ArrowRight, Target, CheckCircle, GraduationCap, Award, FileText, Building2, BookOpen, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Apprenticeships, NVQs, and AM2 Assessment - Level 3 Career Awareness & Professional Development";
const DESCRIPTION = "Overview of training routes including apprenticeships, NVQs and assessment methods for electrical careers.";

const Level3Module7Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the typical duration of an electrical apprenticeship?",
      options: ["2 years", "3-4 years", "5 years", "6 months"],
      correctAnswer: 1,
      explanation: "Electrical apprenticeships typically take 3-4 years to complete, combining practical work experience with college-based learning."
    },
    {
      id: 2,
      question: "What does NVQ stand for?",
      options: ["National Vocational Qualification", "New Vocational Quality", "National Verification Quest", "Network Vocational Questions"],
      correctAnswer: 0,
      explanation: "NVQ stands for National Vocational Qualification, a work-based qualification that demonstrates practical competence."
    },
    {
      id: 3,
      question: "What is the AM2 assessment?",
      options: ["A written theory exam", "A practical assessment of electrical installation skills", "A health and safety test", "A mathematics exam"],
      correctAnswer: 1,
      explanation: "The AM2 is a practical assessment that tests an apprentice's ability to install, test, and certify electrical work."
    },
    {
      id: 4,
      question: "At what level is the electrical installation apprenticeship typically delivered?",
      options: ["Level 1", "Level 2", "Level 3", "Level 4"],
      correctAnswer: 2,
      explanation: "The electrical installation apprenticeship is typically delivered at Level 3, equivalent to A-level standard."
    },
    {
      id: 5,
      question: "What percentage of time is typically spent in the workplace during an apprenticeship?",
      options: ["50%", "60%", "80%", "90%"],
      correctAnswer: 2,
      explanation: "Apprentices typically spend around 80% of their time in the workplace gaining practical experience, with 20% in college."
    },
    {
      id: 6,
      question: "What is the main purpose of the NVQ Level 3 in Electrical Installation?",
      options: ["Theory knowledge only", "Demonstrating practical competence in the workplace", "Health and safety awareness", "Sales training"],
      correctAnswer: 1,
      explanation: "The NVQ Level 3 demonstrates that an individual can carry out electrical installation work competently in real workplace situations."
    },
    {
      id: 7,
      question: "When is the AM2 assessment typically taken?",
      options: ["At the start of apprenticeship", "Halfway through apprenticeship", "Near the end of the apprenticeship", "After completing all college work"],
      correctAnswer: 2,
      explanation: "The AM2 assessment is typically taken near the end of the apprenticeship to demonstrate competence before completion."
    },
    {
      id: 8,
      question: "What does the AM2 assessment include?",
      options: ["Written exam only", "Practical installation, testing, and certification tasks", "Interview only", "Portfolio review only"],
      correctAnswer: 1,
      explanation: "The AM2 includes practical tasks covering installation work, testing procedures, and completion of electrical certificates."
    },
    {
      id: 9,
      question: "What qualification typically needs to be completed before starting an electrical apprenticeship?",
      options: ["University degree", "Level 2 Electrical Installation or equivalent", "A-levels", "No prior qualification needed"],
      correctAnswer: 1,
      explanation: "Most electrical apprenticeships require completion of Level 2 Electrical Installation or equivalent qualification as entry requirement."
    },
    {
      id: 10,
      question: "What is the main difference between college-based learning and NVQ assessment?",
      options: ["No difference", "College is theory-focused, NVQ demonstrates workplace competence", "College is practical, NVQ is theory", "College is longer duration"],
      correctAnswer: 1,
      explanation: "College learning focuses on theoretical knowledge and understanding, while NVQ assessment demonstrates practical competence in real work situations."
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
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs md:text-sm">
              Section 7.1.4
            </Badge>
          </div>
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Apprenticeships, NVQs, and AM2 Assessment
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Overview of training routes including apprenticeships, NVQs and assessment methods for electrical careers.
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
                <li>Apprenticeships combine workplace learning with college study.</li>
                <li>NVQs demonstrate practical competence in real work situations.</li>
                <li>AM2 assessment validates installation and testing skills.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 md:p-4 bg-card border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Apprentice progress, NVQ portfolios, AM2 preparations.</li>
                <li><strong>Use:</strong> Plan training progression, assess competence development.</li>
                <li><strong>Check:</strong> Training standards, assessment criteria, career pathways.</li>
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
              Understand different training pathways in electrical work.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Recognise the structure and requirements of apprenticeships.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Identify assessment methods and qualification standards.
            </li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz</h2>
          <Quiz questions={quizQuestions} title="Apprenticeships, NVQs, and AM2 Assessment" />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="../section1_3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Trade Bodies
            </Link>
          </Button>
          <Button asChild>
            <Link to="../section1_5">
              Next: Higher Qualifications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Level3Module7Section1_4;