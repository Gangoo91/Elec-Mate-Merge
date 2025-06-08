
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, Calendar, Timer, Target, Download, RefreshCw } from "lucide-react";
import { useState } from "react";

const InteractiveToolsTab = () => {
  const [weeklyGoals, setWeeklyGoals] = useState([
    { id: 1, goal: "Complete electrical theory module 3", completed: false, priority: "high" },
    { id: 2, goal: "Practice cable calculations for 2 hours", completed: true, priority: "medium" },
    { id: 3, goal: "Update portfolio with this week's work", completed: false, priority: "high" },
    { id: 4, goal: "Review BS 7671 Chapter 4", completed: false, priority: "low" },
    { id: 5, goal: "Attend mentor meeting", completed: true, priority: "high" }
  ]);

  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds

  const toggleGoal = (id: number) => {
    setWeeklyGoals(goals => 
      goals.map(goal => 
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const completedGoals = weeklyGoals.filter(goal => goal.completed).length;
  const totalGoals = weeklyGoals.length;
  const completionPercentage = Math.round((completedGoals / totalGoals) * 100);

  const scheduleTemplate = [
    { time: "6:00 AM", activity: "Wake up, breakfast", type: "personal" },
    { time: "7:00 AM", activity: "Commute to site", type: "work" },
    { time: "8:00 AM", activity: "Start work", type: "work" },
    { time: "12:00 PM", activity: "Lunch break", type: "break" },
    { time: "1:00 PM", activity: "Resume work", type: "work" },
    { time: "5:00 PM", activity: "Finish work, commute home", type: "work" },
    { time: "6:30 PM", activity: "Dinner and family time", type: "personal" },
    { time: "8:00 PM", activity: "Study session (electrical theory)", type: "study" },
    { time: "9:30 PM", activity: "Portfolio updates", type: "study" },
    { time: "10:00 PM", activity: "Wind down, personal time", type: "personal" },
    { time: "11:00 PM", activity: "Sleep", type: "sleep" }
  ];

  const priorityMatrix = {
    urgent_important: [
      "Site safety issue needs reporting",
      "Assignment due tomorrow",
      "Supervisor needs immediate response"
    ],
    important_not_urgent: [
      "Study for upcoming exam",
      "Update portfolio with recent work",
      "Plan next week's schedule"
    ],
    urgent_not_important: [
      "Non-critical phone calls",
      "Social media notifications",
      "Minor administrative tasks"
    ],
    neither: [
      "Excessive social media browsing",
      "Watching random YouTube videos",
      "Gossiping during break time"
    ]
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Weekly Goals Tracker</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">This Week's Goals</h3>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                  {completedGoals}/{totalGoals} Complete
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                  {completionPercentage}%
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              {weeklyGoals.map((goal) => (
                <div 
                  key={goal.id} 
                  className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all ${
                    goal.completed 
                      ? 'border-green-500/40 bg-green-500/10' 
                      : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    goal.completed 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-400'
                  }`}>
                    {goal.completed && <CheckSquare className="h-3 w-3 text-white" />}
                  </div>
                  
                  <span className={`flex-1 ${goal.completed ? 'line-through text-muted-foreground' : 'text-white'}`}>
                    {goal.goal}
                  </span>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      goal.priority === 'high' ? 'border-red-500/40 text-red-400' :
                      goal.priority === 'medium' ? 'border-yellow-500/40 text-yellow-400' :
                      'border-gray-500/40 text-gray-400'
                    }`}
                  >
                    {goal.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Timer className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Pomodoro Timer</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl font-mono text-white">
                {formatTime(pomodoroTime)}
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => setPomodoroActive(!pomodoroActive)}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
                >
                  {pomodoroActive ? 'Pause' : 'Start'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {setPomodoroTime(25 * 60); setPomodoroActive(false);}}
                  className="border-elec-yellow/30"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Focus for 25 minutes, then take a 5-minute break</p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setPomodoroTime(25 * 60)}
                    className="text-xs"
                  >
                    25 min
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setPomodoroTime(15 * 60)}
                    className="text-xs"
                  >
                    15 min
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setPomodoroTime(5 * 60)}
                    className="text-xs"
                  >
                    5 min
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Priority Matrix</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="border border-red-500/40 rounded p-3 bg-red-500/10">
                <h4 className="font-semibold text-red-400 mb-2">Urgent & Important</h4>
                <h5 className="text-red-400 text-xs mb-1">DO FIRST</h5>
                <ul className="space-y-1">
                  {priorityMatrix.urgent_important.map((item, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-1">
                      <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-blue-500/40 rounded p-3 bg-blue-500/10">
                <h4 className="font-semibold text-blue-400 mb-2">Important, Not Urgent</h4>
                <h5 className="text-blue-400 text-xs mb-1">SCHEDULE</h5>
                <ul className="space-y-1">
                  {priorityMatrix.important_not_urgent.map((item, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-1">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-yellow-500/40 rounded p-3 bg-yellow-500/10">
                <h4 className="font-semibold text-yellow-400 mb-2">Urgent, Not Important</h4>
                <h5 className="text-yellow-400 text-xs mb-1">DELEGATE</h5>
                <ul className="space-y-1">
                  {priorityMatrix.urgent_not_important.map((item, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-1">
                      <div className="w-1 h-1 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border border-gray-500/40 rounded p-3 bg-gray-500/10">
                <h4 className="font-semibold text-gray-400 mb-2">Neither</h4>
                <h5 className="text-gray-400 text-xs mb-1">ELIMINATE</h5>
                <ul className="space-y-1">
                  {priorityMatrix.neither.map((item, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Daily Schedule Template</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="border-elec-yellow/30">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {scheduleTemplate.map((item, index) => {
              const typeColors = {
                work: "border-l-blue-500 bg-blue-500/5",
                study: "border-l-green-500 bg-green-500/5",
                personal: "border-l-purple-500 bg-purple-500/5",
                break: "border-l-yellow-500 bg-yellow-500/5",
                sleep: "border-l-gray-500 bg-gray-500/5"
              };
              
              return (
                <div 
                  key={index} 
                  className={`border-l-4 rounded-r p-3 flex items-center gap-4 ${typeColors[item.type as keyof typeof typeColors]}`}
                >
                  <div className="w-16 text-sm font-mono text-white">
                    {item.time}
                  </div>
                  <div className="flex-1 text-sm text-muted-foreground">
                    {item.activity}
                  </div>
                  <Badge variant="outline" className="text-xs border-white/20">
                    {item.type}
                  </Badge>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-elec-yellow/10 rounded border border-elec-yellow/20">
            <p className="text-sm text-elec-yellow font-medium">💡 Customisation Tip:</p>
            <p className="text-sm text-muted-foreground">Adjust times based on your work shifts and personal commitments. The key is consistency and realistic time allocations.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
