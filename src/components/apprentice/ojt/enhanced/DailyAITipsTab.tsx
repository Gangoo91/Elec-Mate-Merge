
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, RefreshCw, BookOpen, Zap, Clock, CheckCircle, Target, AlertTriangle, Calculator, Wrench } from "lucide-react";

const DailyAITipsTab = () => {
  const [currentTipSet, setCurrentTipSet] = useState(0);

  const tipSets = [
    {
      title: "Safety First Monday",
      tips: [
        {
          category: "Safety",
          tip: "Before testing: Switch off at the main board, test your voltage tester on a known live source, then test the circuit. Always follow the 'Prove, Test, Prove' sequence.",
          icon: AlertTriangle,
          difficulty: "Essential",
          actionable: "Create a laminated card with this sequence to keep in your toolkit"
        },
        {
          category: "Practical",
          tip: "When installing socket outlets, measure 450mm from finished floor level to the bottom of the socket. Use a spirit level and mark both screw holes before drilling.",
          icon: Wrench,
          difficulty: "Beginner",
          actionable: "Practice measuring and marking 5 socket positions on a practice board"
        },
        {
          category: "Testing",
          tip: "For R1+R2 testing: Record the highest reading from your ring circuit tests. This reading must not exceed the maximum values in BS7671 Table 54.7.",
          icon: Calculator,
          difficulty: "Intermediate",
          actionable: "Download Table 54.7 and create a quick reference sheet for common cable sizes"
        }
      ]
    },
    {
      title: "Technical Tuesday",
      tips: [
        {
          category: "Calculations",
          tip: "Voltage drop calculation shortcut: For 2.5mm² T&E over 20m, expect roughly 7-8V drop at 20A load. Always verify with the full calculation: (mV/A/m × Ib × L) ÷ 1000.",
          icon: Calculator,
          difficulty: "Intermediate",
          actionable: "Calculate voltage drop for a 32A ring circuit using 2.5mm² cable over 25m run"
        },
        {
          category: "Installation",
          tip: "When running cables through joists: Drill holes at least 50mm from top/bottom edges, maximum hole diameter is joist depth ÷ 4. Never drill through load-bearing points.",
          icon: Wrench,
          difficulty: "Practical",
          actionable: "Identify safe drilling zones on 3 different joist sizes in your current job"
        },
        {
          category: "Regulations",
          tip: "Amendment 2 to BS7671:2018: RCD protection now required for ALL socket outlets up to 32A, regardless of installation method. No exceptions for height or accessibility.",
          icon: BookOpen,
          difficulty: "Current",
          actionable: "Check if any existing installations you know need upgrading to meet this requirement"
        }
      ]
    },
    {
      title: "Wisdom Wednesday",
      tips: [
        {
          category: "Career",
          tip: "Document every installation photo: Before work starts, during cable runs, and after completion. Use your phone's timestamp and location features. These become invaluable portfolio evidence.",
          icon: Target,
          difficulty: "Essential",
          actionable: "Take 'before, during, after' photos of your next installation task"
        },
        {
          category: "Problem-Solving",
          tip: "Circuit tripping randomly? Check for loose connections first - 80% of intermittent faults are poor connections. Use thermal imaging or look for discoloured terminals.",
          icon: Zap,
          difficulty: "Intermediate",
          actionable: "Inspect 5 existing connections in your current workplace for signs of overheating"
        },
        {
          category: "Quality",
          tip: "Cable management rule: Support cables every 300mm horizontally, 400mm vertically. Use proper clips, not cable ties on final fixes. Your installation should look professional for 20+ years.",
          icon: CheckCircle,
          difficulty: "Practical",
          actionable: "Measure cable support spacing on a completed installation - does it meet standards?"
        }
      ]
    },
    {
      title: "Practical Thursday",
      tips: [
        {
          category: "Testing",
          tip: "When using a multifunction tester: Always null your test leads first. Temperature affects resistance readings - test lead resistance can add 0.05Ω error to your R1+R2 readings.",
          icon: Calculator,
          difficulty: "Practical",
          actionable: "Null your test leads and record the reading - subtract this from future R1+R2 tests"
        },
        {
          category: "Installation",
          tip: "Wago connector tip: Strip cable to exactly 11mm (use the gauge on the connector). Push firmly until you feel resistance - the orange lever should move freely when cable is fully inserted.",
          icon: Wrench,
          difficulty: "Practical",
          actionable: "Practice with 5 different cable sizes using Wago connectors until you can do it by feel"
        },
        {
          category: "Efficiency",
          tip: "Plan your cable routes before starting: Measure, mark, and drill all holes first. Run all cables second. Terminate last. This workflow prevents backtracking and saves 30% time.",
          icon: Target,
          difficulty: "Workflow",
          actionable: "Time yourself doing a practice installation using this method vs. your usual approach"
        }
      ]
    },
    {
      title: "Friday Focus",
      tips: [
        {
          category: "Inspection",
          tip: "Visual inspection catches most faults: Look for damaged cables, incorrect connections, missing labels, and inadequate IP ratings. Check manufacturer instructions are being followed.",
          icon: CheckCircle,
          difficulty: "Essential",
          actionable: "Create a 10-point visual inspection checklist for your most common installation type"
        },
        {
          category: "Communication",
          tip: "When explaining electrical work to customers: Use analogies they understand. Water pressure = voltage, flow rate = current, pipe size = cable size. Draw simple diagrams.",
          icon: Target,
          difficulty: "Soft Skills",
          actionable: "Practice explaining earthing using the water analogy to a family member"
        },
        {
          category: "Preparation",
          tip: "Monday morning routine: Check weather forecast, plan your day's jobs by location, ensure test equipment batteries are charged, and vehicle stock is adequate for planned work.",
          icon: BookOpen,
          difficulty: "Workflow",
          actionable: "Create a Sunday evening preparation checklist for the week ahead"
        }
      ]
    },
    {
      title: "Weekend Warrior",
      tips: [
        {
          category: "Study",
          tip: "Practice calculations weekly: Set aside 30 minutes every Sunday to work through 5 different calculation types. Focus on the ones you find most challenging.",
          icon: Calculator,
          difficulty: "Study",
          actionable: "Complete 5 voltage drop calculations using different cable types and installation methods"
        },
        {
          category: "Regulations",
          tip: "Read one regulation per weekend: Choose a Part of BS7671 and read 2-3 regulations. Take notes on practical applications. Create real-world examples for each regulation.",
          icon: BookOpen,
          difficulty: "Study",
          actionable: "Read Part 4 Chapter 41 and list 3 practical applications from your current workplace"
        },
        {
          category: "Skills",
          tip: "Tool maintenance time: Clean and calibrate your test equipment, check your hand tools for damage, organise your toolkit. A maintained toolkit reflects professional pride.",
          icon: Wrench,
          difficulty: "Maintenance",
          actionable: "Calibrate your multimeter and record the calibration date in your maintenance log"
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
      case "Practical":
        return "bg-purple-600 text-white";
      case "Current":
        return "bg-orange-600 text-white";
      case "Study":
        return "bg-indigo-600 text-white";
      case "Workflow":
        return "bg-teal-600 text-white";
      case "Soft Skills":
        return "bg-pink-600 text-white";
      case "Maintenance":
        return "bg-gray-600 text-white";
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
      case "Regulations":
        return "text-orange-500";
      case "Installation":
        return "text-teal-500";
      case "Calculations":
        return "text-pink-500";
      case "Inspection":
        return "text-yellow-600";
      case "Problem-Solving":
        return "text-cyan-500";
      case "Quality":
        return "text-emerald-500";
      case "Efficiency":
        return "text-amber-500";
      case "Communication":
        return "text-rose-500";
      case "Preparation":
        return "text-violet-500";
      case "Study":
        return "text-sky-500";
      case "Skills":
        return "text-lime-500";
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
            Practical, actionable insights to accelerate your electrical skills and knowledge
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
                      <p className="text-sm leading-relaxed mb-3">{tip.tip}</p>
                      <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
                        <h5 className="font-medium text-elec-yellow mb-1 text-xs">Action Step</h5>
                        <p className="text-xs text-muted-foreground">{tip.actionable}</p>
                      </div>
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
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tips learned today</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Actions completed</span>
                <span className="font-medium">2/3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This week's focus</span>
                <span className="font-medium text-sm">Safety & Testing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Skill Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-elec-yellow mb-2">12</div>
              <p className="text-sm text-muted-foreground mb-1">days learning streak</p>
              <p className="text-xs text-muted-foreground">
                Complete action steps to maintain your streak!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg">🎯 Weekly Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            This week's challenge: Complete one action step from each category (Safety, Testing, Practical).
            Share your progress with your supervisor or mentor for feedback.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-red-500">Safety: 1/1</Badge>
            <Badge variant="outline" className="text-purple-500">Testing: 0/1</Badge>
            <Badge variant="outline" className="text-blue-500">Practical: 1/1</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyAITipsTab;
