
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Check, X, Clock } from "lucide-react";
import { toast } from "sonner";

interface SelfCareReminder {
  id: string;
  title: string;
  time: string;
  frequency: 'daily' | 'weekly' | 'custom';
  isActive: boolean;
  lastCompleted?: string;
}

const SelfCareReminders = () => {
  const [reminders, setReminders] = useState<SelfCareReminder[]>([]);
  const [newReminder, setNewReminder] = useState({ title: '', time: '', frequency: 'daily' as const });
  const [showAddForm, setShowAddForm] = useState(false);

  // Load reminders from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('elec-mate-selfcare-reminders');
    if (stored) {
      setReminders(JSON.parse(stored));
    } else {
      // Set some default reminders
      const defaultReminders: SelfCareReminder[] = [
        {
          id: '1',
          title: 'Take a 5-minute break',
          time: '10:00',
          frequency: 'daily',
          isActive: true
        },
        {
          id: '2',
          title: 'Check in with your mood',
          time: '16:00',
          frequency: 'daily',
          isActive: true
        },
        {
          id: '3',
          title: 'Practice deep breathing',
          time: '12:00',
          frequency: 'daily',
          isActive: false
        }
      ];
      setReminders(defaultReminders);
      localStorage.setItem('elec-mate-selfcare-reminders', JSON.stringify(defaultReminders));
    }
  }, []);

  // Save reminders when they change
  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem('elec-mate-selfcare-reminders', JSON.stringify(reminders));
    }
  }, [reminders]);

  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) {
      toast.error("Please fill in all fields");
      return;
    }

    const reminder: SelfCareReminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      time: newReminder.time,
      frequency: newReminder.frequency,
      isActive: true
    };

    setReminders(prev => [...prev, reminder]);
    setNewReminder({ title: '', time: '', frequency: 'daily' });
    setShowAddForm(false);
    toast.success("Reminder added successfully");
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    ));
  };

  const markCompleted = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, lastCompleted: new Date().toISOString() }
        : reminder
    ));
    toast.success("Well done! Self-care completed", {
      description: "Keep taking care of yourself"
    });
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
    toast.success("Reminder removed");
  };

  return (
    <Card className="border-green-500/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-green-400" />
            Self-Care Reminders
          </CardTitle>
          <Button
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <div className="border border-green-500/20 rounded-lg p-3 space-y-3">
            <Input
              placeholder="Reminder title"
              value={newReminder.title}
              onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
            />
            <div className="flex gap-2">
              <Input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                className="flex-1"
              />
                <select
                value={newReminder.frequency}
                onChange={(e) => setNewReminder(prev => ({ ...prev, frequency: e.target.value as any }))}
                className="px-3 py-2 rounded border border-elec-yellow/20 bg-elec-dark text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={addReminder} size="sm" className="bg-green-500 hover:bg-green-600">
                Add Reminder
              </Button>
              <Button onClick={() => setShowAddForm(false)} size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {reminders.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No reminders set. Add one to get started!
            </p>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  reminder.isActive 
                    ? 'border-green-500/20 bg-green-500/5' 
                    : 'border-gray-500/20 bg-gray-500/5'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-medium ${reminder.isActive ? 'text-white' : 'text-gray-400'}`}>
                      {reminder.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {reminder.frequency}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{reminder.time}</span>
                    {reminder.lastCompleted && (
                      <span className="ml-2 text-green-400">
                        ✓ Completed {new Date(reminder.lastCompleted).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => markCompleted(reminder.id)}
                    className="h-8 w-8 p-0 text-green-400 hover:text-green-300"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleReminder(reminder.id)}
                    className={`h-8 w-8 p-0 ${reminder.isActive ? 'text-yellow-400' : 'text-gray-400'}`}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteReminder(reminder.id)}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-green-500/20 pt-3 mt-4">
          <p className="text-xs text-muted-foreground">
            {reminders.filter(r => r.isActive).length} active reminders • 
            Self-care is essential for your wellbeing
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfCareReminders;
