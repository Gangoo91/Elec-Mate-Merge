
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Trash2, CheckCircle } from "lucide-react";
import { useMentalHealth } from "@/contexts/MentalHealthContext";

const SelfCareReminders = () => {
  const { reminders, setReminders } = useMentalHealth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    time: "",
    frequency: "daily" as const
  });

  const defaultReminders = [
    { title: "Take a 5-minute break", time: "10:00", frequency: "daily" as const },
    { title: "Practice deep breathing", time: "14:00", frequency: "daily" as const },
    { title: "Check in with yourself", time: "18:00", frequency: "daily" as const },
    { title: "Reflect on the week", time: "09:00", frequency: "weekly" as const }
  ];

  const addReminder = () => {
    if (newReminder.title.trim() && newReminder.time) {
      const reminder = {
        id: Date.now().toString(),
        title: newReminder.title.trim(),
        time: newReminder.time,
        frequency: newReminder.frequency,
        isActive: true
      };
      
      setReminders(prev => [...prev, reminder]);
      setNewReminder({ title: "", time: "", frequency: "daily" });
      setShowAddForm(false);
    }
  };

  const addDefaultReminder = (defaultReminder: typeof defaultReminders[0]) => {
    const reminder = {
      id: Date.now().toString(),
      ...defaultReminder,
      isActive: true
    };
    setReminders(prev => [...prev, reminder]);
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, isActive: !reminder.isActive }
          : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const markCompleted = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, lastCompleted: new Date().toISOString().split('T')[0] }
          : reminder
      )
    );
  };

  const isCompletedToday = (reminder: any) => {
    const today = new Date().toISOString().split('T')[0];
    return reminder.lastCompleted === today;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Self-Care Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.length === 0 ? (
          <div className="text-center py-6">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No reminders set yet</p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Try these suggestions:</p>
              {defaultReminders.map((reminder, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => addDefaultReminder(reminder)}
                  className="mr-2 mb-2"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {reminder.title} ({reminder.time})
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div 
                key={reminder.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  reminder.isActive ? 'border-elec-yellow/20 bg-elec-yellow/5' : 'border-gray-600 bg-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Switch
                    checked={reminder.isActive}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={reminder.isActive ? 'text-white' : 'text-muted-foreground'}>
                        {reminder.title}
                      </span>
                      {isCompletedToday(reminder) && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{reminder.time}</span>
                      <Badge variant="outline" className="text-xs">
                        {reminder.frequency}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {reminder.isActive && !isCompletedToday(reminder) && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markCompleted(reminder.id)}
                      className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                    >
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddForm ? (
          <div className="space-y-3 p-4 border border-elec-yellow/20 rounded-lg">
            <div>
              <Label className="text-sm">Reminder title</Label>
              <Input
                value={newReminder.title}
                onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Take a walk"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">Time</Label>
                <Input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Frequency</Label>
                <Select value={newReminder.frequency} onValueChange={(value: any) => setNewReminder(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addReminder} size="sm">Add Reminder</Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">Cancel</Button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setShowAddForm(true)}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Reminder
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SelfCareReminders;
