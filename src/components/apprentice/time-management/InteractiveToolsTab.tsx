
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, Clock, Target, Calendar, Timer, AlertCircle } from "lucide-react";
import { useState } from "react";

const InteractiveToolsTab = () => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [checkedGoals, setCheckedGoals] = useState<{[key: string]: boolean}>({});
  const [customGoal, setCustomGoal] = useState("");

  const pomodoroPresets = [
    { name: "Study Session", minutes: 25, break: 5 },
    { name: "Deep Work", minutes: 50, break: 10 },
    { name: "Quick Review", minutes: 15, break: 3 },
    { name: "Assignment Work", minutes: 45, break: 8 }
  ];

  const weeklyGoals = [
    { id: "study-hours", text: "Complete 10 hours of study time", category: "Study" },
    { id: "coursework", text: "Finish all college assignments", category: "Academic" },
    { id: "practical", text: "Practice 3 new electrical techniques", category: "Practical" },
    { id: "reading", text: "Read 2 chapters of regulations", category: "Study" },
    { id: "exercise", text: "Do physical exercise 3 times", category: "Health" },
    { id: "sleep", text: "Get 7+ hours sleep each night", category: "Health" },
    { id: "mentor", text: "Have meaningful conversation with supervisor", category: "Professional" },
    { id: "reflection", text: "Complete daily reflection for 5 days", category: "Personal" }
  ];

  const dailyHabits = [
    { id: "morning-review", text: "Review today's priorities (5 min)", time: "Morning" },
    { id: "study-block", text: "Complete focused study session", time: "Evening" },
    { id: "site-notes", text: "Write down 3 things learned on site", time: "After Work" },
    { id: "next-day-prep", text: "Prepare for tomorrow", time: "Evening" },
    { id: "gratitude", text: "Note one positive thing from today", time: "Bedtime" }
  ];

  const timeBlockTemplate = [
    { time: "06:00", activity: "Wake up & breakfast", type: "personal", editable: true },
    { time: "07:00", activity: "Travel to site", type: "work", editable: true },
    { time: "08:00", activity: "Work starts", type: "work", editable: false },
    { time: "12:00", activity: "Lunch break", type: "work", editable: false },
    { time: "17:00", activity: "Work ends", type: "work", editable: false },
    { time: "18:00", activity: "Study time", type: "study", editable: true },
    { time: "20:00", activity: "Dinner & family time", type: "personal", editable: true },
    { time: "21:30", activity: "Personal time", type: "personal", editable: true },
    { time: "22:30", activity: "Prepare for tomorrow", type: "planning", editable: true },
    { time: "23:00", activity: "Sleep", type: "personal", editable: true }
  ];

  const handleGoalToggle = (goalId: string) => {
    setCheckedGoals(prev => ({
      ...prev,
      [goalId]: !prev[goalId]
    }));
  };

  const addCustomGoal = () => {
    if (customGoal.trim()) {
      const newGoalId = `custom-${Date.now()}`;
      weeklyGoals.push({
        id: newGoalId,
        text: customGoal.trim(),
        category: "Custom"
      });
      setCustomGoal("");
    }
  };

  const startTimer = (minutes: number, type: string) => {
    setActiveTimer(type);
    setTimerMinutes(minutes);
    // Here you would implement actual timer functionality
    setTimeout(() => {
      setActiveTimer(null);
      alert(`${type} completed! Time for a break.`);
    }, minutes * 60 * 1000); // Convert to milliseconds
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Timer className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Focus Timer</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {pomodoroPresets.map((preset, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-white mb-2">{preset.name}</h4>
                <div className="text-2xl font-bold text-elec-yellow mb-1">{preset.minutes}m</div>
                <p className="text-xs text-muted-foreground mb-3">Break: {preset.break}m</p>
                <Button 
                  size="sm" 
                  className="w-full"
                  variant={activeTimer === preset.name ? "destructive" : "default"}
                  onClick={() => activeTimer === preset.name ? setActiveTimer(null) : startTimer(preset.minutes, preset.name)}
                  disabled={activeTimer && activeTimer !== preset.name}
                >
                  {activeTimer === preset.name ? "Stop" : "Start"}
                </Button>
              </div>
            ))}
          </div>

          {activeTimer && (
            <div className="border border-elec-yellow/20 rounded-lg p-4 bg-elec-yellow/5">
              <div className="flex items-center justify-center gap-4">
                <Clock className="h-6 w-6 text-elec-yellow" />
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">{activeTimer} in progress</div>
                  <div className="text-2xl font-bold text-elec-yellow">{timerMinutes}:00</div>
                  <p className="text-sm text-muted-foreground">Stay focused! You've got this.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Weekly Goals Tracker</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklyGoals.map((goal) => (
                <div key={goal.id} className="flex items-center gap-3 p-3 border border-elec-yellow/20 rounded-lg">
                  <input
                    type="checkbox"
                    id={goal.id}
                    checked={checkedGoals[goal.id] || false}
                    onChange={() => handleGoalToggle(goal.id)}
                    className="w-4 h-4 rounded border-elec-yellow/40 text-elec-yellow focus:ring-elec-yellow"
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor={goal.id} 
                      className={`text-sm cursor-pointer ${
                        checkedGoals[goal.id] ? 'text-muted-foreground line-through' : 'text-white'
                      }`}
                    >
                      {goal.text}
                    </label>
                    <Badge variant="outline" className="ml-2 text-xs border-elec-yellow/30 text-elec-yellow">
                      {goal.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-elec-yellow/20 pt-4">
              <h4 className="font-semibold text-white mb-3">Add Custom Goal</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your custom goal..."
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  className="flex-1 px-3 py-2 bg-elec-dark border border-elec-yellow/20 rounded text-white placeholder-muted-foreground focus:outline-none focus:border-elec-yellow"
                />
                <Button onClick={addCustomGoal} disabled={!customGoal.trim()}>
                  Add Goal
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Daily Habits Checklist</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyHabits.map((habit) => (
              <div key={habit.id} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={habit.id}
                    className="w-4 h-4 mt-1 rounded border-elec-yellow/40 text-elec-yellow focus:ring-elec-yellow"
                  />
                  <div className="flex-1">
                    <label htmlFor={habit.id} className="text-sm text-white cursor-pointer">
                      {habit.text}
                    </label>
                    <Badge variant="outline" className="mt-1 text-xs border-blue-400/30 text-blue-400">
                      {habit.time}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Daily Schedule Planner</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeBlockTemplate.map((block, index) => (
              <div key={index} className={`flex items-center gap-4 p-3 rounded-lg ${
                block.type === 'work' ? 'bg-blue-500/10 border border-blue-500/20' :
                block.type === 'study' ? 'bg-green-500/10 border border-green-500/20' :
                block.type === 'personal' ? 'bg-purple-500/10 border border-purple-500/20' :
                'bg-orange-500/10 border border-orange-500/20'
              }`}>
                <Badge variant="outline" className="text-sm border-white/20">
                  {block.time}
                </Badge>
                
                {block.editable ? (
                  <input
                    type="text"
                    defaultValue={block.activity}
                    className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-1 focus:ring-elec-yellow rounded px-2 py-1"
                  />
                ) : (
                  <span className="flex-1 text-white">{block.activity}</span>
                )}
                
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    block.type === 'work' ? 'border-blue-400/30 text-blue-400' :
                    block.type === 'study' ? 'border-green-400/30 text-green-400' :
                    block.type === 'personal' ? 'border-purple-400/30 text-purple-400' :
                    'border-orange-400/30 text-orange-400'
                  }`}
                >
                  {block.type}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 border border-elec-yellow/20 rounded-lg">
            <h4 className="font-semibold text-white mb-2">📝 Schedule Notes</h4>
            <textarea
              placeholder="Add notes about your schedule, adjustments needed, or reminders..."
              rows={3}
              className="w-full bg-elec-dark border border-elec-yellow/20 rounded text-white placeholder-muted-foreground focus:outline-none focus:border-elec-yellow p-3"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Quick Stress Check</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">Rate your current stress level:</p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Low</span>
              <div className="flex-1 flex gap-1">
                {[1,2,3,4,5,6,7,8,9,10].map(level => (
                  <button
                    key={level}
                    className="flex-1 h-8 border border-elec-yellow/20 rounded hover:bg-elec-yellow/20 transition-colors text-xs text-white"
                  >
                    {level}
                  </button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">High</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Button variant="outline" size="sm" className="border-green-400/30 text-green-400 hover:bg-green-400/10">
                I'm feeling good!
              </Button>
              <Button variant="outline" size="sm" className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10">
                Some pressure, but managing
              </Button>
              <Button variant="outline" size="sm" className="border-red-400/30 text-red-400 hover:bg-red-400/10">
                Feeling overwhelmed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
