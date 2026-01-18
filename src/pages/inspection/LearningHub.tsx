import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Zap, GraduationCap, Shield, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LearningHub() {
  const navigate = useNavigate();

  const learningModules = [
    {
      id: "safe-isolation",
      title: "Safe Isolation Procedures",
      description: "Learn the correct GS38 safe isolation procedure step-by-step",
      icon: Shield,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      duration: "20 min",
      items: 8,
      progress: 0
    },
    {
      id: "testing-procedures",
      title: "Testing Procedures",
      description: "Complete guide to electrical testing methods and sequences",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      duration: "35 min",
      items: 18,
      progress: 0
    },
    {
      id: "continuity-testing",
      title: "Continuity Testing",
      description: "CPC continuity, ring final circuit testing, and recording results",
      icon: CheckCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      duration: "25 min",
      items: 12,
      progress: 0
    },
    {
      id: "insulation-resistance",
      title: "Insulation Resistance Testing",
      description: "IR testing at 500V and 250V with correct procedures",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      duration: "20 min",
      items: 10,
      progress: 0
    },
    {
      id: "rcd-testing",
      title: "RCD Testing",
      description: "Testing RCDs and RCBOs with correct trip times",
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      duration: "15 min",
      items: 8,
      progress: 0
    },
    {
      id: "fault-finding",
      title: "Fault Finding",
      description: "Systematic approach to diagnosing electrical faults",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      duration: "40 min",
      items: 20,
      progress: 0
    },
    {
      id: "bs7671-reference",
      title: "BS 7671 Quick Reference",
      description: "Key regulations and requirements for inspection & testing",
      icon: BookOpen,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      duration: "45 min",
      items: 24,
      progress: 0
    },
    {
      id: "quiz-assessment",
      title: "Knowledge Assessment",
      description: "Test your understanding with quizzes and mock exams",
      icon: GraduationCap,
      color: "text-primary",
      bgColor: "bg-primary/10",
      duration: "30 min",
      items: 50,
      progress: 0
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground p-0 mb-4"
            onClick={() => navigate("/electrician/inspection-testing")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Inspection & Testing
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Learning Hub</h1>
              <p className="text-sm text-muted-foreground">
                Master electrical inspection and testing with guided modules
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-foreground">8</div>
              <p className="text-sm text-muted-foreground">Modules</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-foreground">150</div>
              <p className="text-sm text-muted-foreground">Topics</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-warning">0%</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-muted-foreground">4h</div>
              <p className="text-sm text-muted-foreground">Est. Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Modules Grid */}
        <h2 className="text-lg font-semibold mb-4">Learning Modules</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {learningModules.map((module) => (
            <Card
              key={module.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/30 active:scale-[0.98] touch-manipulation"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg ${module.bgColor} flex items-center justify-center`}>
                    <module.icon className={`h-5 w-5 ${module.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {module.items} topics
                  </Badge>
                </div>
                <CardTitle className="text-base mt-2">{module.title}</CardTitle>
                <CardDescription className="text-sm">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{module.duration}</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Reference Cards */}
        <h2 className="text-lg font-semibold mb-4 mt-8">Quick Reference</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Test Sequence (Dead Testing)</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Continuity of protective conductors</li>
                <li>Continuity of ring final circuit conductors</li>
                <li>Insulation resistance</li>
                <li>Polarity</li>
                <li>Earth electrode resistance (where applicable)</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Test Sequence (Live Testing)</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Earth fault loop impedance (Zs)</li>
                <li>Prospective fault current (PFC)</li>
                <li>RCD operation</li>
                <li>Functional testing</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
