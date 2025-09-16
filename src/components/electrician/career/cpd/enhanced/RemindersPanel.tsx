import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Calendar, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Target,
  Award,
  RefreshCw,
  X
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { CPDReminder } from '@/types/cpd-enhanced';

const RemindersPanel = () => {
  const { reminders, dismissReminder } = useEnhancedCPD();

  const getRemindersIcon = (type: CPDReminder['type']) => {
    switch (type) {
      case 'deadline':
        return <Clock className="h-4 w-4" />;
      case 'goal-progress':
        return <Target className="h-4 w-4" />;
      case 'assessment':
        return <Award className="h-4 w-4" />;
      case 'renewal':
        return <RefreshCw className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: CPDReminder['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'medium':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'low':
        return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  const getTypeColor = (type: CPDReminder['type']) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-500/10 text-red-400';
      case 'goal-progress':
        return 'bg-blue-500/10 text-blue-400';
      case 'assessment':
        return 'bg-green-500/10 text-green-400';
      case 'renewal':
        return 'bg-purple-500/10 text-purple-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const formatDaysUntil = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  const highPriorityReminders = reminders.filter(r => r.priority === 'high');
  const otherReminders = reminders.filter(r => r.priority !== 'high');

  if (reminders.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-2">All caught up!</h3>
          <p className="text-sm text-muted-foreground">
            No pending reminders. Your CPD progress is on track.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* High Priority Alerts */}
      {highPriorityReminders.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            Urgent Attention Required
          </h3>
          {highPriorityReminders.map((reminder) => (
            <Alert key={reminder.id} className="border-red-500/30 bg-red-500/5">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{reminder.title}</p>
                    <p className="text-sm mt-1">{reminder.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs border-red-500/30 text-red-400">
                        {formatDaysUntil(reminder.dueDate)}
                      </Badge>
                      {reminder.actionRequired && (
                        <Badge variant="secondary" className="text-xs">
                          Action: {reminder.actionRequired}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissReminder(reminder.id)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Other Reminders */}
      {otherReminders.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-foreground flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Reminders & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {otherReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-3 border rounded-lg ${getPriorityColor(reminder.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded ${getTypeColor(reminder.type)}`}>
                      {getRemindersIcon(reminder.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground text-sm">
                          {reminder.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {reminder.type.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {reminder.message}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-muted-foreground">
                            {formatDaysUntil(reminder.dueDate)}
                          </span>
                        </div>
                        
                        {reminder.actionRequired && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-foreground">
                              {reminder.actionRequired}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissReminder(reminder.id)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Set Reminder
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start">
              <Target className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start">
              <Award className="h-4 w-4 mr-2" />
              Schedule Assessment
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start">
              <RefreshCw className="h-4 w-4 mr-2" />
              Renewal Tracker
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-400">
                {highPriorityReminders.length}
              </div>
              <p className="text-xs text-muted-foreground">High Priority</p>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">
                {reminders.filter(r => r.priority === 'medium').length}
              </div>
              <p className="text-xs text-muted-foreground">Medium Priority</p>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">
                {reminders.filter(r => r.priority === 'low').length}
              </div>
              <p className="text-xs text-muted-foreground">Low Priority</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemindersPanel;
