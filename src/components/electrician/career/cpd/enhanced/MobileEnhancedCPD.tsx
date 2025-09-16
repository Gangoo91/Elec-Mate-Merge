import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Clock, 
  Target, 
  Camera, 
  Mic, 
  MapPin, 
  Bell,
  TrendingUp,
  Award,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Star,
  FileText
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { CPD_ACTIVITY_TEMPLATES, QUICK_ACTIVITY_TEMPLATES } from '@/data/cpd-templates';

interface MobileEnhancedCPDProps {
  onAddEntry?: () => void;
  onViewHistory?: () => void;
  onManageGoals?: () => void;
}

const MobileEnhancedCPD = ({ onAddEntry, onViewHistory, onManageGoals }: MobileEnhancedCPDProps) => {
  const { entries, compliance, reminders, addFromTemplate } = useEnhancedCPD();
  const [activeTab, setActiveTab] = useState('dashboard');

  const recentEntries = entries.slice(0, 3);
  const urgentReminders = reminders.filter(r => r.priority === 'high').slice(0, 2);
  const popularTemplates = CPD_ACTIVITY_TEMPLATES.filter(t => t.isPopular).slice(0, 4);

  const handleQuickAdd = (template: any) => {
    addFromTemplate(template);
  };

  return (
    <div className="space-y-4">
      {/* Quick Stats Header */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-foreground">
                {compliance?.hoursCompleted || 0}
              </div>
              <p className="text-xs text-muted-foreground">Hours Logged</p>
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {entries.length}
              </div>
              <p className="text-xs text-muted-foreground">Activities</p>
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {compliance ? Math.round((compliance.hoursCompleted / compliance.hoursRequired) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Progress</p>
            </div>
          </div>
          
          {compliance && (
            <div className="mt-4">
              <Progress 
                value={Math.min((compliance.hoursCompleted / compliance.hoursRequired) * 100, 100)} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground text-center mt-1">
                {compliance.hoursRequired - compliance.hoursCompleted} hours to target
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Urgent Alerts */}
      {urgentReminders.length > 0 && (
        <div className="space-y-2">
          {urgentReminders.map((reminder) => (
            <Card key={reminder.id} className="bg-red-500/5 border-red-500/30">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{reminder.title}</p>
                    <p className="text-xs text-muted-foreground">{reminder.message}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-red-500/30 text-red-400">
                    Urgent
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="quick-add" className="text-xs">Quick Add</TabsTrigger>
          <TabsTrigger value="recent" className="text-xs">Recent</TabsTrigger>
          <TabsTrigger value="reminders" className="text-xs">Alerts</TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-4">
          {/* Compliance Status */}
          {compliance && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    className={
                      compliance.overallStatus === 'compliant' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : compliance.overallStatus === 'at-risk'
                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }
                  >
                    {compliance.overallStatus.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {compliance.hoursCompleted}/{compliance.hoursRequired}h
                  </span>
                </div>
                
                <Progress 
                  value={Math.min((compliance.hoursCompleted / compliance.hoursRequired) * 100, 100)} 
                  className="h-3"
                />

                {compliance.recommendations.length > 0 && (
                  <div className="mt-3 p-2 bg-muted/20 rounded text-xs text-muted-foreground">
                    <strong>Tip:</strong> {compliance.recommendations[0]}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Category Progress */}
          {compliance && compliance.categoryGaps.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-foreground">Category Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {compliance.categoryGaps.slice(0, 3).map((gap, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-foreground capitalize">
                          {gap.category.replace('-', ' ')}
                        </span>
                        <div className="flex items-center gap-1">
                          <Badge 
                            variant="outline"
                            className={
                              gap.status === 'complete' 
                                ? 'text-green-400 border-green-500/30' 
                                : gap.status === 'on-track'
                                ? 'text-yellow-400 border-yellow-500/30'
                                : 'text-red-400 border-red-500/30'
                            }
                          >
                            {gap.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {gap.completed}h
                          </span>
                        </div>
                      </div>
                      <Progress 
                        value={Math.min((gap.completed / gap.required) * 100, 100)} 
                        className="h-1"
                      />
                    </div>
                  ))}
                </div>
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
                <Button variant="outline" size="sm" onClick={onAddEntry}>
                  <Plus className="h-4 w-4 mr-2" />
                  Log Activity
                </Button>
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline" size="sm">
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Note
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Site Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quick Add Templates */}
        <TabsContent value="quick-add" className="space-y-4">
          {/* Popular Templates */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground flex items-center gap-2">
                <Star className="h-4 w-4" />
                Popular Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {popularTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {template.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {template.estimatedHours}h
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {template.category.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleQuickAdd(template)}
                      className="ml-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Activities */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">Quick Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {QUICK_ACTIVITY_TEMPLATES.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAdd(template)}
                    className="justify-between h-auto p-3"
                  >
                    <div className="text-left">
                      <p className="text-sm font-medium">{template.title}</p>
                      <p className="text-xs text-muted-foreground">{template.estimatedHours}h</p>
                    </div>
                    <Plus className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Activities */}
        <TabsContent value="recent" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-foreground">Recent Activities</CardTitle>
                <Button variant="ghost" size="sm" onClick={onViewHistory}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentEntries.length > 0 ? (
                <div className="space-y-3">
                  {recentEntries.map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3 p-2 bg-muted/20 rounded">
                      <div className="p-2 bg-primary/10 rounded">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {entry.activity}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{entry.hours}h</span>
                          <Badge variant="outline" className="text-xs">
                            {entry.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No activities logged yet. Start adding your CPD activities!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reminders */}
        <TabsContent value="reminders" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Active Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reminders.length > 0 ? (
                <div className="space-y-3">
                  {reminders.slice(0, 5).map((reminder) => (
                    <div key={reminder.id} className="p-2 bg-muted/20 rounded">
                      <div className="flex items-start gap-2">
                        <div className={`p-1 rounded ${
                          reminder.priority === 'high' 
                            ? 'bg-red-500/10 text-red-400'
                            : reminder.priority === 'medium'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          <Bell className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {reminder.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {reminder.message}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {reminder.type.replace('-', ' ')}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                reminder.priority === 'high' 
                                  ? 'border-red-500/30 text-red-400'
                                  : reminder.priority === 'medium'
                                  ? 'border-yellow-500/30 text-yellow-400'
                                  : 'border-blue-500/30 text-blue-400'
                              }`}
                            >
                              {reminder.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    All caught up! No pending reminders.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileEnhancedCPD;