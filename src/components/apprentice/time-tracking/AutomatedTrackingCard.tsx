
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Clock, 
  BookOpen, 
  Trophy, 
  Zap,
  CheckCircle,
  Settings
} from "lucide-react";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import { useAutoPortfolioIntegration } from "@/hooks/portfolio/useAutoPortfolioIntegration";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AutomatedTrackingCard = () => {
  const { entries } = useTimeEntries();
  const { 
    autoSyncEnabled, 
    setAutoSyncEnabled, 
    lastSyncTimestamp 
  } = useAutoPortfolioIntegration();

  // Get automatic entries (quizzes, courses, etc.)
  const automaticEntries = entries.filter(entry => entry.isAutomatic || entry.isQuiz);
  const totalAutomaticTime = automaticEntries.reduce((total, entry) => total + entry.duration, 0);
  const hours = Math.floor(totalAutomaticTime / 60);
  const minutes = totalAutomaticTime % 60;

  // Get recent automatic activities
  const recentAutoEntries = automaticEntries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Auto Portfolio Integration Settings */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Zap className="h-5 w-5" />
            Smart Portfolio Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-sync" className="text-sm font-medium">
                Auto-sync to Portfolio
              </Label>
              <p className="text-xs text-muted-foreground">
                Automatically add activities to your portfolio with smart categorisation
              </p>
            </div>
            <Switch
              id="auto-sync"
              checked={autoSyncEnabled}
              onCheckedChange={setAutoSyncEnabled}
            />
          </div>
          
          {lastSyncTimestamp && (
            <div className="text-xs text-muted-foreground">
              Last sync: {formatDate(lastSyncTimestamp)}
            </div>
          )}
          
          {autoSyncEnabled && (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <CheckCircle className="h-4 w-4" />
              Auto-sync enabled - Activities will be automatically added to your portfolio
            </div>
          )}
        </CardContent>
      </Card>

      {/* Automatic Time Summary */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-elec-yellow" />
            Automated Tracking Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">
                {hours}h {minutes}m
              </div>
              <div className="text-sm text-muted-foreground">Total Auto-Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">
                {automaticEntries.length}
              </div>
              <div className="text-sm text-muted-foreground">Activities Tracked</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Automatic Activities
            </h4>
            
            {recentAutoEntries.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No automatic activities yet</p>
                <p className="text-xs">Complete quizzes or study sessions to see them here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentAutoEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10"
                  >
                    <div className="flex items-center gap-3">
                      {entry.isQuiz ? (
                        <Trophy className="h-4 w-4 text-blue-400" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-elec-yellow" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{entry.activity}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(entry.date)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={entry.isQuiz ? "bg-blue-500/20 text-blue-400" : "bg-elec-yellow/20 text-elec-yellow"}>
                        {entry.isQuiz ? "Quiz" : "Study"}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Integration Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="font-medium text-sm">Active Integrations</h5>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  Quiz Completion Tracking
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  Study Session Monitoring
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  Course Progress Tracking
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  Smart Portfolio Sync
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium text-sm">Smart Features</h5>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-elec-yellow" />
                  Auto-categorisation
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-elec-yellow" />
                  Skill Detection
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-elec-yellow" />
                  Learning Outcome Generation
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-elec-yellow" />
                  Progress Analytics
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedTrackingCard;
