
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, RefreshCw, BookOpen, Zap, Clock, CheckCircle } from "lucide-react";

const DailyAITipsTab = () => {
  const [currentTipSet, setCurrentTipSet] = useState(0);

  const tipSets = [
    {
      title: "Safety First Tuesday",
      tips: [
        {
          category: "Safety",
          tip: "Always test circuits are dead before starting work - use a proven voltage tester and test it on a known live source first.",
          icon: Zap,
          difficulty: "Essential"
        },
        {
          category: "Practical",
          tip: "Keep your tool belt organised - group similar tools together and always return them to the same pocket.",
          icon: BookOpen,
          difficulty: "Beginner"
        },
        {
          category: "Regulation",
          tip: "BS 7671 Regulation 314.1 - Every installation must be divided into circuits to avoid danger and minimise inconvenience.",
          icon: CheckCircle,
          difficulty: "Intermediate"
        }
      ]
    },
    {
      title: "Wisdom Wednesday",
      tips: [
        {
          category: "Career",
          tip: "Document everything you learn in a daily log - it'll be invaluable for your portfolio and future reference.",
          icon: BookOpen,
          difficulty: "Beginner"
        },
        {
          category: "Practical",
          tip: "When pulling cables, always leave 150mm extra at each end - it's easier to trim than to re-pull the entire cable.",
          icon: Zap,
          difficulty: "Beginner"
        },
        {
          category: "Testing",
          tip: "Before doing insulation resistance tests, ensure all electronic equipment is disconnected to avoid damage.",
          icon: CheckCircle,
          difficulty: "Intermediate"
        }
      ]
    },
    {
      title: "Technical Thursday",
      tips: [
        {
          category: "Calculation",
          tip: "For voltage drop calculations, remember: Vd = (mV/A/m × Ib × L) ÷ 1000, where L is the length of the run.",
          icon: Zap,
          difficulty: "Advanced"
        },
        {
          category: "Installation",
          tip: "When installing sockets, maintain 150mm from corners and 450mm from the floor as standard practice.",
          icon: BookOpen,
          difficulty: "Beginner"
        },
        {
          category: "Inspection",
          tip: "Visual inspection catches 70% of electrical faults - take your time and be thorough before testing.",
          icon: CheckCircle,
          difficulty: "Essential"
        }
      ]
    }
  ];

  const handleNewTips = () => {
    setCurrentTipSet((prev) => (prev + 1) % tipSets.length);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Essential":
        return "bg-red-600 text-white";
      case "Beginner":
        return "bg-green-600 text-white";
      case "Intermediate":
        return "bg-blue-600 text-white";
      case "Advanced":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety":
        return "text-red-500";
      case "Career":
        return "text-green-500";
      case "Practical":
        return "text-blue-500";
      case "Testing":
        return "text-purple-500";
      case "Regulation":
        return "text-orange-500";
      case "Installation":
        return "text-teal-500";
      case "Calculation":
        return "text-pink-500";
      case "Inspection":
        return "text-yellow-600";
      default:
        return "text-gray-500";
    }
  };

  const currentTips = tipSets[currentTipSet];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/50 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              {currentTips.title}
            </CardTitle>
            <Button onClick={handleNewTips} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              New Tips
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Fresh daily insights to boost your electrical knowledge and skills
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {currentTips.tips.map((tip, index) => (
              <Card key={index} className="border-elec-gray/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <tip.icon className={`h-5 w-5 mt-1 ${getCategoryColor(tip.category)}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={getCategoryColor(tip.category)}>
                          {tip.category}
                        </Badge>
                        <Badge className={getDifficultyColor(tip.difficulty)}>
                          {tip.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm leading-relaxed">{tip.tip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Learning Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tips learned today</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This week</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Favourite category</span>
                <span className="font-medium">Safety</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-elec-yellow mb-2">7</div>
              <p className="text-sm text-muted-foreground">days in a row</p>
              <p className="text-xs text-muted-foreground mt-2">
                Keep checking daily tips to maintain your streak!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg">💡 Pro Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Make the most of your daily tips by discussing them with your supervisor or mentor. 
            Real-world application helps cement theoretical knowledge into practical skills.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyAITipsTab;
