
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Play,
  BookOpen,
  Cable,
  AlertTriangle,
  Zap
} from "lucide-react";
import InteractiveTestingGuide from "./InteractiveTestingGuide";
import { comprehensiveTestingGuides, EnhancedTestGuide } from "@/data/bs7671-testing/comprehensiveTestingGuides";

const RunThroughStepsTab = () => {
  const [selectedGuide, setSelectedGuide] = useState<EnhancedTestGuide | null>(null);
  const [completedGuides, setCompletedGuides] = useState<Set<string>>(new Set());

  const handleGuideSelect = (guide: EnhancedTestGuide) => {
    setSelectedGuide(guide);
  };

  const handleGuideComplete = (guideId: string) => {
    const newCompleted = new Set(completedGuides);
    newCompleted.add(guideId);
    setCompletedGuides(newCompleted);
    setSelectedGuide(null);
  };

  const handleBackToSteps = () => {
    setSelectedGuide(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const overallProgress = (completedGuides.size / comprehensiveTestingGuides.length) * 100;

  if (selectedGuide) {
    return (
      <InteractiveTestingGuide
        guide={selectedGuide}
        onComplete={() => handleGuideComplete(selectedGuide.id)}
        onBack={handleBackToSteps}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/10 to-amber-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            BS7671 Testing Run-Through Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Complete step-by-step guides for all essential BS7671 testing procedures. Each guide includes 
            detailed Wago connection instructions, safety warnings, and troubleshooting tips.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedGuides.size} of {comprehensiveTestingGuides.length} completed
              </span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">{comprehensiveTestingGuides.length}</div>
              <div className="text-sm text-muted-foreground">Testing Procedures</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{completedGuides.size}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-sm text-muted-foreground">Wago Compatible</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">BS 7671</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Essential Testing Sequence */}
      <Card className="border-cyan-500/30 bg-cyan-500/5">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Essential Testing Sequence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-cyan-100 mb-4">
            Follow this sequence for comprehensive BS7671 testing. Each step builds upon the previous 
            to ensure safe and systematic testing procedures.
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            {comprehensiveTestingGuides.map((guide, index) => {
              const isCompleted = completedGuides.has(guide.id);
              const canStart = index === 0 || completedGuides.has(comprehensiveTestingGuides[index - 1].id);
              
              return (
                <Card 
                  key={guide.id} 
                  className={`border-elec-yellow/20 bg-elec-gray transition-colors ${
                    canStart ? 'hover:border-elec-yellow/40 cursor-pointer' : 'opacity-60'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-500' 
                            : canStart 
                              ? 'bg-elec-yellow' 
                              : 'bg-gray-600'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : (
                            <span className={`font-bold ${canStart ? 'text-elec-dark' : 'text-gray-300'}`}>
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{guide.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{guide.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(guide.difficulty)}>
                          {guide.difficulty}
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {guide.duration}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                      <h4 className="font-medium text-blue-300 mb-2">Purpose</h4>
                      <p className="text-sm text-blue-100">{guide.purpose}</p>
                    </div>

                    {guide.testLimits.length > 0 && (
                      <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                        <h4 className="font-medium text-green-300 mb-2">Key Test Limits</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {guide.testLimits.slice(0, 2).map((limit, idx) => (
                            <div key={idx} className="text-sm text-green-100 flex justify-between">
                              <span>{limit.parameter}:</span>
                              <span className="font-mono">{limit.limit} {limit.unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                      <h4 className="font-medium text-orange-300 mb-2 flex items-center gap-2">
                        <Cable className="h-4 w-4" />
                        Wago Connection Features
                      </h4>
                      <ul className="space-y-1">
                        <li className="text-sm text-orange-100 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          Step-by-step Wago connector instructions
                        </li>
                        <li className="text-sm text-orange-100 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          Safe connection practices for testing
                        </li>
                        <li className="text-sm text-orange-100 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          Recommended connector types for each test
                        </li>
                      </ul>
                    </div>

                    {guide.commonIssues.length > 0 && (
                      <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                        <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Common Issues to Watch For
                        </h4>
                        <ul className="space-y-1">
                          {guide.commonIssues.slice(0, 2).map((issue, idx) => (
                            <li key={idx} className="text-xs text-amber-100 flex items-start gap-2">
                              <span className="text-amber-400 mt-1">•</span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {guide.steps.length} steps
                        </span>
                        {isCompleted && (
                          <Badge className="bg-green-500/20 text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => handleGuideSelect(guide)}
                        disabled={!canStart}
                        className={
                          isCompleted 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                        }
                      >
                        {isCompleted ? (
                          <>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Review Guide
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Guide
                          </>
                        )}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Enhanced Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-purple-200">Wago Integration</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Detailed Wago connector selection guidance</li>
                <li>• Step-by-step connection procedures</li>
                <li>• Safety tips for testing applications</li>
                <li>• Visual connection verification methods</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-purple-200">Interactive Learning</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Progress tracking through each procedure</li>
                <li>• Step-by-step guided instructions</li>
                <li>• Equipment setup and configuration</li>
                <li>• Real-time troubleshooting support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-purple-200">Professional Standards</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• BS 7671:2018+A2:2022 compliant procedures</li>
                <li>• Industry best practice methods</li>
                <li>• Safety warnings and precautions</li>
                <li>• Professional documentation guidance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunThroughStepsTab;
