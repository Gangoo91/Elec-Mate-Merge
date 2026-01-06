import { ArrowLeft, ArrowRight, Target, CheckCircle, Users, Award, FileText, Building2, BookOpen, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Trade Bodies and Registration (NICEIC, NAPIT, ECA, JIB) - Level 3 Career Awareness & Professional Development";
const DESCRIPTION = "Understanding professional trade bodies and registration requirements for electrical professionals.";

const Level3Module7Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is NICEIC primarily known for?",
      options: ["Training courses", "Electrical installation certification and contractor registration", "Tool sales", "Insurance services"],
      correctAnswer: 1,
      explanation: "NICEIC is one of the UK's leading certification bodies for electrical installation work, providing registration for competent contractors."
    },
    {
      id: 2,
      question: "What does NAPIT stand for?",
      options: ["National Assessment Programme for Installation Technicians", "National Association of Professional Installation Technicians", "New Approved Professional Installation Testing", "National Accreditation Programme for Installation Training"],
      correctAnswer: 1,
      explanation: "NAPIT stands for National Assessment Programme for Installation Technicians, offering certification and registration services."
    },
    {
      id: 3,
      question: "What is the main purpose of ECA membership?",
      options: ["Providing insurance", "Trade association representing electrical contractors", "Training delivery", "Equipment supply"],
      correctAnswer: 1,
      explanation: "The Electrical Contractors' Association (ECA) is the UK's leading trade association for electrical contractors, representing their interests."
    },
    {
      id: 4,
      question: "What does JIB primarily focus on?",
      options: ["Equipment testing", "Employment, training and grading in the electrical contracting industry", "Health and safety", "Technical standards"],
      correctAnswer: 1,
      explanation: "The Joint Industry Board (JIB) sets standards for employment, training, and grading of electricians in the contracting industry."
    },
    {
      id: 5,
      question: "Which document do registered electricians typically issue for domestic work?",
      options: ["Building warrant", "Electrical Installation Certificate", "Minor Works Certificate or Electrical Installation Certificate", "Planning permission"],
      correctAnswer: 2,
      explanation: "Registered electricians can self-certify their work by issuing Minor Works Certificates or Electrical Installation Certificates."
    },
    {
      id: 6,
      question: "How often do trade body registrations typically need renewal?",
      options: ["Every 6 months", "Annually", "Every 2 years", "Every 5 years"],
      correctAnswer: 1,
      explanation: "Most trade body registrations require annual renewal, including assessment and payment of fees."
    },
    {
      id: 7,
      question: "What is Part P of the Building Regulations concerned with?",
      options: ["Plumbing", "Electrical safety in dwellings", "Fire safety", "Structural work"],
      correctAnswer: 1,
      explanation: "Part P of the Building Regulations covers electrical safety in dwellings and requires notification of certain electrical work."
    },
    {
      id: 8,
      question: "What benefits does trade body membership typically provide?",
      options: ["Free tools", "Technical support, training updates, and industry recognition", "Guaranteed work", "Insurance discounts only"],
      correctAnswer: 1,
      explanation: "Trade body membership provides technical support, training updates, industry recognition, and often insurance benefits."
    },
    {
      id: 9,
      question: "Which grading system is used by JIB for electricians?",
      options: ["Levels 1-5", "Apprentice, Approved Electrician, Technician, etc.", "Bronze, Silver, Gold", "Basic, Standard, Advanced"],
      correctAnswer: 1,
      explanation: "JIB uses grades including Apprentice, Approved Electrician, Technician, and other specific classifications for different roles."
    },
    {
      id: 10,
      question: "What is required to maintain trade body registration?",
      options: ["Payment of fees only", "Continuing Professional Development (CPD) and ongoing assessment", "Annual exam", "New qualifications every year"],
      correctAnswer: 1,
      explanation: "Maintaining registration requires Continuing Professional Development (CPD), ongoing assessment, and demonstration of competence."
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
              <Users className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs md:text-sm">
              Section 7.1.3
            </Badge>
          </div>
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trade Bodies and Registration (NICEIC, NAPIT, ECA, JIB)
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Understanding professional trade bodies and registration requirements for electrical professionals.
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
                <li>Professional bodies certify electrical competence and quality.</li>
                <li>Registration enables self-certification and industry recognition.</li>
                <li>Ongoing CPD and assessment maintain professional standards.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 md:p-4 bg-card border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> NICEIC/NAPIT certificates, ECA membership, JIB cards.</li>
                <li><strong>Use:</strong> Check contractor credentials, verify competency schemes.</li>
                <li><strong>Check:</strong> Registration status, insurance coverage, CPD compliance.</li>
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
              Understand the role and purpose of major electrical trade bodies.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Identify registration requirements and benefits.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Recognise professional standards and competency schemes.
            </li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz</h2>
          <Quiz questions={quizQuestions} title="Trade Bodies and Registration" />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="../section1_2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild>
            <Link to="../section1_4">
              Next: Apprenticeships & NVQs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Level3Module7Section1_3;