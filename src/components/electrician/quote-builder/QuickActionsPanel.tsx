import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  FileText, 
  Copy, 
  History, 
  Calculator,
  Zap,
  Clock,
  TrendingUp
} from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  variant: 'default' | 'secondary' | 'outline';
  badge?: string;
  shortcut?: string;
}

interface QuickActionsPanelProps {
  onNewQuote: () => void;
  onUseTemplate: () => void;
  onDuplicateRecent: () => void;
  onViewHistory: () => void;
}

export const QuickActionsPanel = ({
  onNewQuote,
  onUseTemplate,
  onDuplicateRecent,
  onViewHistory
}: QuickActionsPanelProps) => {
  const quickActions: QuickAction[] = [
    {
      id: 'new-quote',
      title: 'New Quote',
      description: 'Start from scratch with guided setup',
      icon: Plus,
      action: onNewQuote,
      variant: 'default',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'templates',
      title: 'Use Template',
      description: 'Choose from pre-built quote templates',
      icon: FileText,
      action: onUseTemplate,
      variant: 'secondary',
      badge: '12 available'
    },
    {
      id: 'duplicate',
      title: 'Duplicate Recent',
      description: 'Copy settings from your last quote',
      icon: Copy,
      action: onDuplicateRecent,
      variant: 'outline'
    },
    {
      id: 'history',
      title: 'Quote History',
      description: 'View and manage all your quotes',
      icon: History,
      action: onViewHistory,
      variant: 'outline'
    }
  ];

  const recentStats = [
    { label: 'Avg. Quote Value', value: '£850', icon: Calculator, trend: '+12%' },
    { label: 'Response Time', value: '2.4h', icon: Clock, trend: '-15%' },
    { label: 'Success Rate', value: '78%', icon: TrendingUp, trend: '+5%' }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="mobile-card bg-gradient-to-br from-elec-gray/50 to-elec-card/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 mobile-subheading">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              onClick={action.action}
              variant={action.variant}
              className={`h-auto p-4 flex flex-col items-start text-left space-y-2 group transition-all duration-300 ${
                action.variant === 'default' 
                  ? 'mobile-button-primary h-auto py-4 hover:shadow-lg hover:shadow-elec-yellow/20' 
                  : action.variant === 'secondary'
                  ? 'mobile-button-secondary h-auto py-4 border-elec-yellow/40 hover:border-elec-yellow/60'
                  : 'border-border/50 hover:border-elec-yellow/40 hover:bg-elec-yellow/5 h-auto py-4'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <action.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                  action.variant === 'default' ? 'text-elec-dark' : 'text-elec-yellow'
                }`} />
                {action.badge && (
                  <Badge variant="outline" className="text-xs border-current">
                    {action.badge}
                  </Badge>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm">{action.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed">{action.description}</p>
                {action.shortcut && (
                  <p className="text-xs opacity-60 font-mono">{action.shortcut}</p>
                )}
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Recent Performance */}
      <Card className="mobile-card bg-gradient-to-br from-elec-gray/30 to-elec-card/30 border-elec-yellow/10">
        <CardHeader>
          <CardTitle className="mobile-text">Recent Performance</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {recentStats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="p-2 mx-auto w-fit rounded-lg bg-elec-yellow/10">
                <stat.icon className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <div className="font-semibold text-sm">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                <div className={`text-xs font-medium ${
                  stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};