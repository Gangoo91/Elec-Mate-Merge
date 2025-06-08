
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Plus, Trash2, Calendar, Clock } from "lucide-react";

const InteractiveToolsTab = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete electrical theory assignment", completed: false, priority: "high" },
    { id: 2, text: "Review safety procedures document", completed: true, priority: "medium" },
    { id: 3, text: "Practice conduit bending techniques", completed: false, priority: "low" }
  ]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  // Weekly Schedule Planner State
  const [scheduleEntries, setScheduleEntries] = useState([
    { id: 1, day: "Monday", time: "09:00", activity: "Site work", duration: "8 hours" },
    { id: 2, day: "Tuesday", time: "18:00", activity: "College coursework", duration: "2 hours" }
  ]);
  const [newEntry, setNewEntry] = useState({ day: "Monday", time: "", activity: "", duration: "" });

  // Stress Level Tracker State
  const [stressEntries, setStressEntries] = useState([
    { id: 1, date: "2024-01-15", level: 6, notes: "Busy day with testing procedures" },
    { id: 2, date: "2024-01-16", level: 3, notes: "Good day, felt confident" }
  ]);
  const [newStressEntry, setNewStressEntry] = useState({ level: 5, notes: "" });

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: newPriority
      }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addScheduleEntry = () => {
    if (newEntry.time && newEntry.activity && newEntry.duration) {
      setScheduleEntries([...scheduleEntries, {
        id: Date.now(),
        ...newEntry
      }]);
      setNewEntry({ day: "Monday", time: "", activity: "", duration: "" });
    }
  };

  const addStressEntry = () => {
    if (newStressEntry.notes.trim()) {
      setStressEntries([...stressEntries, {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...newStressEntry
      }]);
      setNewStressEntry({ level: 5, notes: "" });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400 border-red-400";
      case "medium": return "text-yellow-400 border-yellow-400";
      case "low": return "text-green-400 border-green-400";
      default: return "text-gray-400 border-gray-400";
    }
  };

  const getStressColor = (level: number) => {
    if (level <= 3) return "text-green-400";
    if (level <= 6) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Task Manager */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Task Manager
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Keep track of work and study tasks with priority levels
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              className="flex-1"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="px-3 py-2 border border-elec-yellow/20 rounded-md bg-elec-gray text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Button onClick={addTask} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 border border-elec-yellow/20 rounded-lg">
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                
                <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-white'}`}>
                  {task.text}
                </span>
                
                <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            {tasks.filter(t => !t.completed).length} of {tasks.length} tasks remaining
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule Planner */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Weekly Schedule Planner
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Plan your weekly activities including work, college, and personal time
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <Label className="text-xs">Day</Label>
              <select
                value={newEntry.day}
                onChange={(e) => setNewEntry({...newEntry, day: e.target.value})}
                className="w-full px-2 py-1 border border-elec-yellow/20 rounded bg-elec-gray text-white text-sm"
              >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>
            
            <div>
              <Label className="text-xs">Time</Label>
              <Input
                type="time"
                value={newEntry.time}
                onChange={(e) => setNewEntry({...newEntry, time: e.target.value})}
                className="text-sm"
              />
            </div>
            
            <div>
              <Label className="text-xs">Activity</Label>
              <Input
                placeholder="e.g., Site work"
                value={newEntry.activity}
                onChange={(e) => setNewEntry({...newEntry, activity: e.target.value})}
                className="text-sm"
              />
            </div>
            
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label className="text-xs">Duration</Label>
                <Input
                  placeholder="e.g., 2 hours"
                  value={newEntry.duration}
                  onChange={(e) => setNewEntry({...newEntry, duration: e.target.value})}
                  className="text-sm"
                />
              </div>
              <Button onClick={addScheduleEntry} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} className="border border-elec-yellow/20 rounded-lg p-3">
                <h4 className="font-medium text-white mb-2">{day}</h4>
                <div className="space-y-1">
                  {scheduleEntries
                    .filter(entry => entry.day === day)
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map(entry => (
                      <div key={entry.id} className="flex items-center gap-3 text-sm">
                        <span className="text-elec-yellow font-mono">{entry.time}</span>
                        <span className="text-white">{entry.activity}</span>
                        <span className="text-muted-foreground">({entry.duration})</span>
                      </div>
                    ))}
                  {scheduleEntries.filter(entry => entry.day === day).length === 0 && (
                    <span className="text-muted-foreground text-sm">No activities planned</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Stress Level Tracker */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Daily Stress Level Tracker
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Monitor your daily stress levels and identify patterns
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm">Today's stress level (1-10)</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">1</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newStressEntry.level}
                  onChange={(e) => setNewStressEntry({...newStressEntry, level: parseInt(e.target.value)})}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">10</span>
                <span className={`text-lg font-bold ${getStressColor(newStressEntry.level)}`}>
                  {newStressEntry.level}
                </span>
              </div>
            </div>
            
            <div>
              <Label className="text-sm">Notes about today</Label>
              <Textarea
                placeholder="What contributed to your stress level today?"
                value={newStressEntry.notes}
                onChange={(e) => setNewStressEntry({...newStressEntry, notes: e.target.value})}
                className="mt-1"
                rows={2}
              />
            </div>
            
            <Button onClick={addStressEntry} className="w-full">
              Add Today's Entry
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">Recent Entries</h4>
            {stressEntries.slice(-5).reverse().map((entry) => (
              <div key={entry.id} className="border border-elec-yellow/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                  <span className={`text-lg font-bold ${getStressColor(entry.level)}`}>
                    {entry.level}/10
                  </span>
                </div>
                <p className="text-sm text-white">{entry.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
