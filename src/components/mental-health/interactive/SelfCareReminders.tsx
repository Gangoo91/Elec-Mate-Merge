
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Clock, Heart, Coffee, Moon, Dumbbell, Users } from "lucide-react";
import { toast } from "sonner";

interface SelfCareActivity {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'physical' | 'mental' | 'social' | 'rest';
  completed: boolean;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
}

const SelfCareReminders = () => {
  const [activities, setActivities] = useState<SelfCareActivity[]>([
    {
      id: '1',
      title: 'Take a 5-minute break',
      description: 'Step away from work and breathe deeply',
      icon: <Clock className="h-4 w-4" />,
      category: 'mental',
      completed: false,
      timeOfDay: 'afternoon'
    },
    {
      id: '2',
      title: 'Drink water',
      description: 'Stay hydrated throughout the day',
      icon: <Coffee className="h-4 w-4" />,
      category: 'physical',
      completed: false
    },
    {
      id: '3',
      title: 'Connect with someone',
      description: 'Send a message to a friend or colleague',
      icon: <Users className="h-4 w-4" />,
      category: 'social',
      completed: false
    },
    {
      id: '4',
      title: 'Gentle stretching',
      description: 'Stretch your neck and shoulders',
      icon: <Dumbbell className="h-4 w-4" />,
      category: 'physical',
      completed: false
    },
    {
      id: '5',
      title: 'Wind down routine',
      description: 'Prepare for restful sleep',
      icon: <Moon className="h-4 w-4" />,
      category: 'rest',
      completed: false,
      timeOfDay: 'evening'
    }
  ]);

  const [remindersEnabled, setRemindersEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('elec-mate-selfcare-activities');
    if (stored) {
      setActivities(JSON.parse(stored));
    }
    
    const reminders = localStorage.getItem('elec-mate-selfcare-reminders');
    if (reminders) {
      setRemindersEnabled(JSON.parse(reminders));
    }
  }, []);

  const toggleActivity = (id: string) => {
    const updated = activities.map(activity => 
      activity.id === id 
        ? { ...activity, completed: !activity.completed }
        : activity
    );
    
    setActivities(updated);
    localStorage.setItem('elec-mate-selfcare-activities', JSON.stringify(updated));
    
    const completedActivity = updated.find(a => a.id === id);
    if (completedActivity?.completed) {
      toast.success(`Well done! You completed: ${completedActivity.title}`, {
        description: "Keep taking care of yourself"
      });
    }
  };

  const resetDaily = () => {
    const reset = activities.map(activity => ({ ...activity, completed: false }));
    setActivities(reset);
    localStorage.setItem('elec-mate-selfcare-activities', JSON.stringify(reset));
    toast.success("Daily activities reset", {
      description: "Ready for a new day of self-care"
    });
  };

  const toggleReminders = () => {
    const newState = !remindersEnabled;
    setRemindersEnabled(newState);
    localStorage.setItem('elec-mate-selfcare-reminders', JSON.stringify(newState));
    
    if (newState) {
      toast.success("Self-care reminders enabled");
    } else {
      toast.success("Self-care reminders disabled");
    }
  };

  const getCategoryColor = (category: SelfCareActivity['category']) => {
    switch (category) {
      case 'physical': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'mental': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'social': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'rest': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    }
  };

  const completedCount = activities.filter(a => a.completed).length;
  const progressPercentage = (completedCount / activities.length) * 100;

  return (
    <Card className="border-green-500/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-green-400" />
            Self-Care Reminders
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleReminders}
            className="flex items-center gap-1"
          >
            <Bell className={`h-4 w-4 ${remindersEnabled ? 'text-green-400' : 'text-muted-foreground'}`} />
            <span className="text-xs">{remindersEnabled ? 'On' : 'Off'}</span>
          </Button>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Daily Progress</span>
            <span>{completedCount}/{activities.length} completed</span>
          </div>
          <div className="w-full bg-elec-dark rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Activities List */}
        <div className="space-y-2">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className={`p-3 border rounded-lg transition-all ${
                activity.completed 
                  ? 'border-green-500/30 bg-green-500/5' 
                  : 'border-elec-yellow/20 hover:border-elec-yellow/40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleActivity(activity.id)}
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      activity.completed 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-elec-yellow/30 hover:border-elec-yellow'
                    }`}
                  >
                    {activity.completed && <Check className="h-3 w-3 text-white" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {activity.icon}
                      <h4 className={`text-sm font-medium ${activity.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {activity.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <Badge className={getCategoryColor(activity.category)}>
                    {activity.category}
                  </Badge>
                  {activity.timeOfDay && (
                    <span className="text-xs text-muted-foreground">
                      {activity.timeOfDay}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-elec-yellow/20">
          <Button
            variant="outline"
            size="sm"
            onClick={resetDaily}
            className="text-xs"
          >
            Reset Daily
          </Button>
          {completedCount === activities.length && (
            <Badge className="bg-green-500 text-white">
              All completed! 🎉
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfCareReminders;
