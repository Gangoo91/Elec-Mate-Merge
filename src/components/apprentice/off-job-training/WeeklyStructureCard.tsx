
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target, TrendingUp } from "lucide-react";

const WeeklyStructureCard = () => {
  const weeklyStructure = {
    totalHours: 37.5,
    offJobRequired: 7.5,
    percentage: 20
  };

  const sampleWeekSchedules = [
    {
      pattern: "College Day Release",
      structure: "1 day per week at college",
      breakdown: [
        { day: "Monday", type: "On-the-job", hours: 7.5, activities: ["Site work", "Practical tasks"] },
        { day: "Tuesday", type: "Off-the-job", hours: 7.5, activities: ["College attendance", "Theory lessons"] },
        { day: "Wednesday", type: "On-the-job", hours: 7.5, activities: ["Site work", "Skills practice"] },
        { day: "Thursday", type: "On-the-job", hours: 7.5, activities: ["Site work", "Mentoring"] },
        { day: "Friday", type: "On-the-job", hours: 7.5, activities: ["Site work", "Review session"] }
      ],
      pros: ["Consistent routine", "Full day of focused learning", "Peer interaction"],
      cons: ["Less flexibility", "Fixed schedule", "Travel requirements"]
    },
    {
      pattern: "Block Release",
      structure: "2-4 weeks at college per term",
      breakdown: [
        { period: "Weeks 1-10", type: "On-the-job", hours: 75, activities: ["Site work", "Practical experience"] },
        { period: "Weeks 11-12", type: "Off-the-job", hours: 75, activities: ["Intensive college", "Theory modules"] },
        { period: "Weeks 13-22", type: "On-the-job", hours: 75, activities: ["Site work", "Applied learning"] },
        { period: "Weeks 23-24", type: "Off-the-job", hours: 75, activities: ["Assessment", "Revision"] }
      ],
      pros: ["Intensive learning", "Continuous assessment", "Immersive experience"],
      cons: ["Long periods away", "Adjustment challenges", "Catch-up required"]
    },
    {
      pattern: "Flexible Learning",
      structure: "Mixed delivery methods",
      breakdown: [
        { element: "Online learning", type: "Off-the-job", hours: "2-3 hrs/week", activities: ["E-learning modules", "Virtual classrooms"] },
        { element: "Workshop sessions", type: "Off-the-job", hours: "4 hrs/week", activities: ["Practical skills", "Assessments"] },
        { element: "Study time", type: "Off-the-job", hours: "1-2 hrs/week", activities: ["Research", "Assignments"] },
        { element: "Site work", type: "On-the-job", hours: "30 hrs/week", activities: ["Practical application", "Experience"] }
      ],
      pros: ["Very flexible", "Self-paced options", "Work-life balance"],
      cons: ["Requires discipline", "Less structure", "Coordination needed"]
    }
  ];

  const monthlyPlanning = [
    {
      month: "Month 1",
      focus: "Foundation & Induction",
      offJobHours: 32,
      activities: [
        "Health & Safety training",
        "Basic electrical theory",
        "Tool familiarisation",
        "Industry standards introduction"
      ],
      assessments: ["H&S test", "Basic knowledge quiz"]
    },
    {
      month: "Month 6",
      focus: "Intermediate Skills",
      offJobHours: 30,
      activities: [
        "Circuit design principles",
        "Testing procedures",
        "Regulations deep-dive",
        "Practical assessments"
      ],
      assessments: ["Practical test", "Theory examination"]
    },
    {
      month: "Month 12",
      focus: "Advanced Applications",
      offJobHours: 28,
      activities: [
        "Complex installations",
        "Fault diagnosis",
        "Commercial systems",
        "Project management"
      ],
      assessments: ["Portfolio review", "Competency assessment"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly & Monthly Structure Planning
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Understanding how to structure your off-the-job training time effectively
          </p>
        </CardHeader>
        <CardContent>
          {/* Time Allocation Overview */}
          <div className="mb-6 p-4 bg-elec-gray/50 rounded-lg border border-orange-500/20">
            <h4 className="font-medium text-white mb-3">20% Time Allocation Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{weeklyStructure.totalHours}</div>
                <div className="text-sm text-muted-foreground">Total Hours/Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{weeklyStructure.offJobRequired}</div>
                <div className="text-sm text-muted-foreground">Off-the-Job Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{weeklyStructure.percentage}%</div>
                <div className="text-sm text-muted-foreground">Required Minimum</div>
              </div>
            </div>
            <Progress value={weeklyStructure.percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              This equals approximately 278 hours over a 12-month period
            </p>
          </div>

          {/* Sample Week Schedules */}
          <div className="space-y-6">
            <h4 className="font-medium text-white">Common Delivery Patterns</h4>
            {sampleWeekSchedules.map((schedule, index) => (
              <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-orange-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-white">{schedule.pattern}</h5>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    {schedule.structure}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-orange-400">Schedule Breakdown:</span>
                    <div className="mt-2 space-y-2">
                      {schedule.breakdown.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-elec-dark rounded">
                          <div>
                            <span className="text-sm font-medium text-white">
                              {item.day || item.period || item.element}
                            </span>
                            <div className="text-xs text-muted-foreground">
                              {item.activities.join(", ")}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              className={`text-xs ${
                                item.type === "Off-the-job" 
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              }`}
                            >
                              {typeof item.hours === 'number' ? `${item.hours}h` : item.hours}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-green-400">Advantages:</span>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                        {schedule.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-green-400">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-red-400">Considerations:</span>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                        {schedule.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-red-400">!</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Planning */}
          <div className="mt-6">
            <h4 className="font-medium text-white mb-4">Monthly Planning Examples</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {monthlyPlanning.map((month, index) => (
                <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-orange-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-white">{month.month}</h5>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      {month.offJobHours}h
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium text-orange-400">Focus Area:</span>
                    <p className="text-sm text-muted-foreground">{month.focus}</p>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium text-blue-400">Key Activities:</span>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      {month.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-blue-400">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-green-400">Assessments:</span>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      {month.assessments.map((assessment, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <Target className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {assessment}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyStructureCard;
