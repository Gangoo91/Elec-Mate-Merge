import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const TrainingScheduleOptimizer = () => {
  const [businessType, setBusinessType] = useState("");
  const [seasonality, setSeasonality] = useState("");
  const [workloadPeak, setWorkloadPeak] = useState("");
  const [apprenticeCount, setApprenticeCount] = useState(1);
  const [results, setResults] = useState(null);

  const optimizeSchedule = () => {
    if (!businessType || !seasonality || !workloadPeak) return;

    // Training modules based on industry best practices
    const coreModules = [
      { name: "Health & Safety Fundamentals", duration: 2, priority: "critical", timing: "immediate" },
      { name: "Basic Electrical Theory", duration: 4, priority: "critical", timing: "weeks 1-4" },
      { name: "Hand Tools & Equipment", duration: 3, priority: "high", timing: "weeks 2-5" },
      { name: "Basic Installation", duration: 6, priority: "high", timing: "weeks 5-11" },
      { name: "Testing & Inspection", duration: 4, priority: "medium", timing: "weeks 8-12" },
      { name: "Customer Service", duration: 2, priority: "medium", timing: "weeks 6-8" },
      { name: "Digital Portfolio", duration: 1, priority: "high", timing: "week 1" },
      { name: "Regulations (BS 7671)", duration: 8, priority: "critical", timing: "weeks 4-12" }
    ];

    // Seasonal adjustments
    let scheduleRecommendations = [];
    let optimalPeriods = [];
    let avoidPeriods = [];

    if (seasonality === "summer-peak") {
      optimalPeriods = ["September-November", "January-March"];
      avoidPeriods = ["June-August"];
      scheduleRecommendations.push("Front-load theoretical training in quieter months");
      scheduleRecommendations.push("Utilize summer for practical on-site experience");
    } else if (seasonality === "winter-peak") {
      optimalPeriods = ["April-June", "September-October"];
      avoidPeriods = ["November-February"];
      scheduleRecommendations.push("Schedule college blocks during busy winter periods");
      scheduleRecommendations.push("Maximize hands-on training in moderate weather");
    }

    // Business type specific adjustments
    let businessSpecificTips = [];
    if (businessType === "domestic") {
      businessSpecificTips = [
        "Focus on customer interaction skills early",
        "Emphasize neat installation practices",
        "Include consumer unit and domestic wiring specialization",
        "Schedule evening/weekend training options"
      ];
    } else if (businessType === "commercial") {
      businessSpecificTips = [
        "Prioritize three-phase systems training",
        "Include commercial installation techniques",
        "Focus on project management skills",
        "Emphasize team working and site safety"
      ];
    } else if (businessType === "industrial") {
      businessSpecificTips = [
        "Advanced motor control systems",
        "Industrial safety protocols",
        "Maintenance and fault-finding emphasis",
        "Shift pattern training considerations"
      ];
    }

    // Weekly schedule optimization
    const weeklySchedule = {
      monday: { onJob: 8, college: 0, notes: "Start week with practical application" },
      tuesday: { onJob: 8, college: 0, notes: "Continue practical work" },
      wednesday: { onJob: 4, college: 4, notes: "Mid-week theory session" },
      thursday: { onJob: 8, college: 0, notes: "Apply Wednesday's learning" },
      friday: { onJob: 4, college: 4, notes: "Week review and planning" }
    };

    // Multiple apprentices considerations
    let teamTrainingOptions = [];
    if (apprenticeCount > 1) {
      teamTrainingOptions = [
        "Stagger college days to maintain workforce",
        "Peer learning opportunities",
        "Group theoretical sessions for cost efficiency",
        "Buddy system for practical training"
      ];
    }

    setResults({
      coreModules,
      scheduleRecommendations,
      optimalPeriods,
      avoidPeriods,
      businessSpecificTips,
      weeklySchedule,
      teamTrainingOptions
    });
  };

  return (
    <Card className="border-green-500/20 bg-green-500/10">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Training Schedule Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business-type">Business Type</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic Installation</SelectItem>
                  <SelectItem value="commercial">Commercial Projects</SelectItem>
                  <SelectItem value="industrial">Industrial Maintenance</SelectItem>
                  <SelectItem value="mixed">Mixed Portfolio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="seasonality">Business Seasonality</Label>
              <Select value={seasonality} onValueChange={setSeasonality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select seasonal pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer-peak">Summer Peak (April-September)</SelectItem>
                  <SelectItem value="winter-peak">Winter Peak (October-March)</SelectItem>
                  <SelectItem value="consistent">Year-round Consistency</SelectItem>
                  <SelectItem value="project-based">Project-dependent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="workload-peak">Peak Workload Days</Label>
              <Select value={workloadPeak} onValueChange={setWorkloadPeak}>
                <SelectTrigger>
                  <SelectValue placeholder="Select peak days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mon-fri">Monday-Friday</SelectItem>
                  <SelectItem value="weekends">Weekend Heavy</SelectItem>
                  <SelectItem value="emergency">Emergency Response</SelectItem>
                  <SelectItem value="flexible">Flexible Pattern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="apprentice-count">Number of Apprentices</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={apprenticeCount}
                onChange={(e) => setApprenticeCount(parseInt(e.target.value) || 1)}
                placeholder="1"
              />
            </div>
          </div>

          <Button onClick={optimizeSchedule} className="w-full">
            <Target className="h-4 w-4 mr-2" />
            Generate Optimized Schedule
          </Button>

          {/* Results Section */}
          {results && (
            <div className="space-y-6">
              {/* Training Modules Timeline */}
              <div>
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Core Training Modules
                </h4>
                <div className="space-y-2">
                  {results.coreModules.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-elec-dark/50 rounded">
                      <div className="flex items-center gap-3">
                        <CheckCircle className={`h-4 w-4 ${
                          module.priority === 'critical' ? 'text-red-400' :
                          module.priority === 'high' ? 'text-amber-400' : 'text-green-400'
                        }`} />
                        <span className="text-white">{module.name}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            module.priority === 'critical' ? 'border-red-400/30 text-red-300' :
                            module.priority === 'high' ? 'border-amber-400/30 text-amber-300' : 
                            'border-green-400/30 text-green-300'
                          }`}
                        >
                          {module.priority}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-green-300 font-medium">{module.duration} weeks</div>
                        <div className="text-xs text-muted-foreground">{module.timing}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seasonal Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h5 className="font-medium text-blue-300 mb-2">Optimal Training Periods</h5>
                  <ul className="space-y-1">
                    {results.optimalPeriods.map((period, index) => (
                      <li key={index} className="text-blue-200 text-sm flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        {period}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <h5 className="font-medium text-red-300 mb-2">Periods to Avoid</h5>
                  <ul className="space-y-1">
                    {results.avoidPeriods.map((period, index) => (
                      <li key={index} className="text-red-200 text-sm flex items-center gap-2">
                        <AlertCircle className="h-3 w-3 text-red-400" />
                        {period}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Weekly Schedule */}
              <div>
                <h4 className="font-semibold text-white mb-3">Optimized Weekly Schedule</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {Object.entries(results.weeklySchedule).map(([day, schedule]: [string, any]) => (
                    <div key={day} className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="font-medium text-green-300 capitalize">{day}</div>
                      <div className="text-sm text-green-200">
                        On-job: {schedule.onJob}h<br />
                        College: {schedule.college}h
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{schedule.notes}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business-Specific Tips */}
              <div>
                <h4 className="font-semibold text-white mb-3">Business-Specific Training Focus</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {results.businessSpecificTips.map((tip, index) => (
                    <div key={index} className="p-2 bg-purple-500/10 border border-purple-500/30 rounded text-sm text-purple-200">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Training Options */}
              {apprenticeCount > 1 && (
                <div>
                  <h4 className="font-semibold text-white mb-3">Multiple Apprentices Strategy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {results.teamTrainingOptions.map((option, index) => (
                      <div key={index} className="p-2 bg-amber-500/10 border border-amber-500/30 rounded text-sm text-amber-200">
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingScheduleOptimizer;