
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Zap, Clock, Target, TrendingUp } from "lucide-react";
import MoodTracker from "@/components/mental-health/interactive/MoodTracker";
import SelfCareReminders from "@/components/mental-health/interactive/SelfCareReminders";
import StressManagementTools from "@/components/mental-health/interactive/StressManagementTools";

const InteractiveToolsTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Mental Health Tools</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Engage with our interactive tools designed to help you understand, monitor, and improve your mental wellbeing. 
            These evidence-based tools provide personalised insights and practical support for your mental health journey.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Zap className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Interactive</div>
              <div className="text-xs text-muted-foreground">Real-time feedback</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Personalised</div>
              <div className="text-xs text-muted-foreground">Tailored to you</div>
            </div>
            <div className="text-center">
              <Heart className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Evidence-Based</div>
              <div className="text-xs text-muted-foreground">Clinically proven</div>
            </div>
            <div className="text-center">
              <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">24/7 Access</div>
              <div className="text-xs text-muted-foreground">Always available</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodTracker />
        <SelfCareReminders />
      </div>

      <StressManagementTools />

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goal Setting & Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Set personal mental health goals and track your progress over time. 
              This feature helps you stay focused on your wellbeing journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">Set Goals</div>
                <div className="text-xs text-muted-foreground">Define your targets</div>
              </div>
              <div className="text-center p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">Track Progress</div>
                <div className="text-xs text-muted-foreground">Monitor improvements</div>
              </div>
              <div className="text-center p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <Brain className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">Get Insights</div>
                <div className="text-xs text-muted-foreground">Understand patterns</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
