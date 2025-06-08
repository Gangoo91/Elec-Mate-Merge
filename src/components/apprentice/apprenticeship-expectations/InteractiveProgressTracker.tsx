
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Star, Target, Calendar } from "lucide-react";

const InteractiveProgressTracker = () => {
  const [currentYear, setCurrentYear] = useState(1);
  const [completedMilestones, setCompletedMilestones] = useState<number[]>([]);

  const yearMilestones = [
    {
      year: 1,
      title: "Foundation Year",
      milestones: [
        { id: 1, text: "Complete site induction and safety training", points: 10 },
        { id: 2, text: "Learn basic tool usage", points: 15 },
        { id: 3, text: "Complete first college assessments", points: 20 },
        { id: 4, text: "Build first learning portfolio entries", points: 15 }
      ]
    },
    {
      year: 2,
      title: "Development Year", 
      milestones: [
        { id: 5, text: "Pass 18th Edition Wiring Regulations", points: 25 },
        { id: 6, text: "Complete first independent installation", points: 20 },
        { id: 7, text: "Mentor a Year 1 apprentice", points: 15 },
        { id: 8, text: "Master power tool operation", points: 10 }
      ]
    },
    {
      year: 3,
      title: "Competence Year",
      milestones: [
        { id: 9, text: "Complete testing and inspection course", points: 30 },
        { id: 10, text: "Handle customer interactions independently", points: 20 },
        { id: 11, text: "Complete complex installation project", points: 25 },
        { id: 12, text: "Build professional network", points: 15 }
      ]
    },
    {
      year: 4,
      title: "Mastery Year",
      milestones: [
        { id: 13, text: "Pass End Point Assessment", points: 40 },
        { id: 14, text: "Complete portfolio to high standard", points: 30 },
        { id: 15, text: "Lead a project team", points: 25 },
        { id: 16, text: "Plan post-qualification career", points: 20 }
      ]
    }
  ];

  const toggleMilestone = (milestoneId: number) => {
    setCompletedMilestones(prev => 
      prev.includes(milestoneId) 
        ? prev.filter(id => id !== milestoneId)
        : [...prev, milestoneId]
    );
  };

  const getCurrentYearData = () => yearMilestones.find(y => y.year === currentYear);
  const getTotalPoints = () => completedMilestones.reduce((total, id) => {
    const milestone = yearMilestones.flatMap(y => y.milestones).find(m => m.id === id);
    return total + (milestone?.points || 0);
  }, 0);

  const getYearProgress = (year: number) => {
    const yearData = yearMilestones.find(y => y.year === year);
    if (!yearData) return 0;
    
    const totalMilestones = yearData.milestones.length;
    const completedCount = yearData.milestones.filter(m => 
      completedMilestones.includes(m.id)
    ).length;
    
    return (completedCount / totalMilestones) * 100;
  };

  const currentYearData = getCurrentYearData();
  const totalPoints = getTotalPoints();
  const maxPoints = yearMilestones.flatMap(y => y.milestones).reduce((sum, m) => sum + m.points, 0);

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Interactive Progress Tracker
          </CardTitle>
          <p className="text-sm text-muted-foreground">Track your apprenticeship milestones and earn points</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Progress */}
            <div className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">Overall Progress</h4>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">{totalPoints} / {maxPoints} points</span>
                </div>
              </div>
              <Progress value={(totalPoints / maxPoints) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((totalPoints / maxPoints) * 100)}% complete
              </p>
            </div>

            {/* Year Selection */}
            <div className="flex gap-2 flex-wrap">
              {yearMilestones.map((year) => (
                <Button
                  key={year.year}
                  onClick={() => setCurrentYear(year.year)}
                  variant={currentYear === year.year ? "default" : "outline"}
                  size="sm"
                  className={`${
                    currentYear === year.year 
                      ? "bg-elec-yellow text-black" 
                      : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  }`}
                >
                  Year {year.year}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {Math.round(getYearProgress(year.year))}%
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Current Year Milestones */}
            {currentYearData && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-elec-yellow" />
                  <h3 className="text-lg font-medium text-white">{currentYearData.title}</h3>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    {currentYearData.milestones.filter(m => completedMilestones.includes(m.id)).length} / {currentYearData.milestones.length} completed
                  </Badge>
                </div>

                <div className="space-y-3">
                  {currentYearData.milestones.map((milestone) => (
                    <div 
                      key={milestone.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        completedMilestones.includes(milestone.id)
                          ? "bg-green-500/20 border-green-500/40"
                          : "bg-elec-gray/50 border-elec-yellow/20 hover:border-elec-yellow/40"
                      }`}
                      onClick={() => toggleMilestone(milestone.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {completedMilestones.includes(milestone.id) ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className={`text-sm ${
                            completedMilestones.includes(milestone.id) 
                              ? "text-green-300 line-through" 
                              : "text-muted-foreground"
                          }`}>
                            {milestone.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-medium text-yellow-400">{milestone.points}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievement Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {yearMilestones.map((year) => (
                <div key={year.year} className="text-center p-3 bg-elec-gray/30 rounded-lg">
                  <h5 className="text-sm font-medium text-white mb-1">Year {year.year}</h5>
                  <div className="mb-2">
                    <Progress value={getYearProgress(year.year)} className="h-1" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {year.milestones.filter(m => completedMilestones.includes(m.id)).length} / {year.milestones.length}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveProgressTracker;
