import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';

const InteractiveToolsTab = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete electrical theory assignment', completed: false, priority: 'high' },
    { id: 2, text: 'Review safety procedures document', completed: true, priority: 'medium' },
    { id: 3, text: 'Practice conduit bending techniques', completed: false, priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  const [scheduleEntries, setScheduleEntries] = useState([
    { id: 1, day: 'Monday', time: '09:00', activity: 'Site work', duration: '8 hours' },
    { id: 2, day: 'Tuesday', time: '18:00', activity: 'College coursework', duration: '2 hours' },
  ]);
  const [newEntry, setNewEntry] = useState({
    day: 'Monday',
    time: '',
    activity: '',
    duration: '',
  });

  const [stressEntries, setStressEntries] = useState([
    { id: 1, date: '2024-01-15', level: 6, notes: 'Busy day with testing procedures' },
    { id: 2, date: '2024-01-16', level: 3, notes: 'Good day, felt confident' },
  ]);
  const [newStressEntry, setNewStressEntry] = useState({ level: 5, notes: '' });

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          priority: newPriority,
        },
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addScheduleEntry = () => {
    if (newEntry.time && newEntry.activity && newEntry.duration) {
      setScheduleEntries([
        ...scheduleEntries,
        {
          id: Date.now(),
          ...newEntry,
        },
      ]);
      setNewEntry({ day: 'Monday', time: '', activity: '', duration: '' });
    }
  };

  const addStressEntry = () => {
    if (newStressEntry.notes.trim()) {
      setStressEntries([
        ...stressEntries,
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          ...newStressEntry,
        },
      ]);
      setNewStressEntry({ level: 5, notes: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Task manager
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Keep track of work and study tasks with priority levels
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="px-3 py-2 border border-white/15 rounded-md bg-white/[0.02] text-white touch-manipulation"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Button
            onClick={addTask}
            size="icon"
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
            >
              <button onClick={() => toggleTask(task.id)} className="touch-manipulation">
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                ) : (
                  <Circle className="h-5 w-5 text-white/55" />
                )}
              </button>
              <span
                className={`flex-1 text-[14px] ${
                  task.completed ? 'line-through text-white/55' : 'text-white/85'
                }`}
              >
                {task.text}
              </span>
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {task.priority}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-[13px] text-white/55">
          {tasks.filter((t) => !t.completed).length} of {tasks.length} tasks remaining
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Weekly schedule planner
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Plan your weekly activities including work, college, and personal time
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <Label className="text-[12px] text-white/55">Day</Label>
            <select
              value={newEntry.day}
              onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
              className="w-full px-2 py-1 border border-white/15 rounded bg-white/[0.02] text-white text-[13px] touch-manipulation"
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
            <Label className="text-[12px] text-white/55">Time</Label>
            <Input
              type="time"
              value={newEntry.time}
              onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <Label className="text-[12px] text-white/55">Activity</Label>
            <Input
              placeholder="e.g., Site work"
              value={newEntry.activity}
              onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value })}
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label className="text-[12px] text-white/55">Duration</Label>
              <Input
                placeholder="e.g., 2 hours"
                value={newEntry.duration}
                onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            <Button
              onClick={addScheduleEntry}
              size="sm"
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
            (day) => (
              <div
                key={day}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <h4 className="text-[14px] font-semibold text-white mb-2">{day}</h4>
                <div className="space-y-1">
                  {scheduleEntries
                    .filter((entry) => entry.day === day)
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center gap-3 text-[13px]"
                      >
                        <span className="text-elec-yellow font-mono">{entry.time}</span>
                        <span className="text-white/85">{entry.activity}</span>
                        <span className="text-white/55">({entry.duration})</span>
                      </div>
                    ))}
                  {scheduleEntries.filter((entry) => entry.day === day).length === 0 && (
                    <span className="text-white/55 text-[13px]">No activities planned</span>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Daily stress level tracker
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Monitor your daily stress levels and identify patterns
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-[13px] text-white/85">Today's stress level (1-10)</Label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[13px] text-white/55">1</span>
              <input
                type="range"
                min="1"
                max="10"
                value={newStressEntry.level}
                onChange={(e) =>
                  setNewStressEntry({ ...newStressEntry, level: parseInt(e.target.value) })
                }
                className="flex-1 touch-manipulation"
              />
              <span className="text-[13px] text-white/55">10</span>
              <span className="text-[18px] font-semibold text-elec-yellow">
                {newStressEntry.level}
              </span>
            </div>
          </div>

          <div>
            <Label className="text-[13px] text-white/85">Notes about today</Label>
            <Textarea
              placeholder="What contributed to your stress level today?"
              value={newStressEntry.notes}
              onChange={(e) => setNewStressEntry({ ...newStressEntry, notes: e.target.value })}
              className="mt-1 touch-manipulation text-base focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              rows={2}
            />
          </div>

          <Button
            onClick={addStressEntry}
            className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
          >
            Add today's entry
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-[14px] font-semibold text-white">Recent entries</h4>
          {stressEntries
            .slice(-5)
            .reverse()
            .map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-white/55">{entry.date}</span>
                  <span className="text-[16px] font-semibold text-elec-yellow">
                    {entry.level}/10
                  </span>
                </div>
                <p className="text-[14px] text-white/85 leading-relaxed">{entry.notes}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveToolsTab;
