import { useState } from "react";
import {
  Zap,
  Clock,
  RefreshCw,
  Plus,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Shield,
  Briefcase,
  DollarSign,
  Users,
  Activity,
  History,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useAutomationRules,
  useAutomationLogs,
  useAutomationStats,
  useToggleAutomation,
  useRunAutomation,
} from "@/hooks/useAutomations";
import { getCategoryInfo, getTriggerTypeInfo, type AutomationRule, type AutomationLog } from "@/services/automationService";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDistanceToNow } from "date-fns";

export function AutomationsSection() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("rules");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: rules, isLoading: rulesLoading } = useAutomationRules();
  const { data: logs, isLoading: logsLoading } = useAutomationLogs({ limit: 50 });
  const { data: stats, isLoading: statsLoading } = useAutomationStats();
  const toggleMutation = useToggleAutomation();
  const runMutation = useRunAutomation();

  const categories = ['compliance', 'jobs', 'finance', 'hr'];
  
  const filteredRules = selectedCategory
    ? rules?.filter(r => r.category === selectedCategory)
    : rules;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return <Shield className="h-4 w-4" />;
      case 'jobs': return <Briefcase className="h-4 w-4" />;
      case 'finance': return <DollarSign className="h-4 w-4" />;
      case 'hr': return <Users className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'schedule': return <Clock className="h-3.5 w-3.5" />;
      case 'field_change': return <RefreshCw className="h-3.5 w-3.5" />;
      case 'record_created': return <Plus className="h-3.5 w-3.5" />;
      default: return <Zap className="h-3.5 w-3.5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'partial': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  if (rulesLoading || statsLoading) {
    return (
      <div className="space-y-6 animate-fade-in pb-safe">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-safe">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Zap className="h-6 w-6 text-elec-yellow" />
          Workflow Automations
        </h1>
        <p className="text-muted-foreground text-sm">
          Automate repetitive tasks and stay on top of compliance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-elec-yellow/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.activeRules || 0}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Executions</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.totalExecutions || 0}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Activity className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.totalExecutions
                    ? Math.round((stats.successfulExecutions / stats.totalExecutions) * 100)
                    : 100}%
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Actions This Week</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats?.actionsThisWeek || 0}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <History className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="rules" className="gap-2">
            <Zap className="h-4 w-4" />
            Rules
          </TabsTrigger>
          <TabsTrigger value="logs" className="gap-2">
            <History className="h-4 w-4" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4 mt-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => {
              const info = getCategoryInfo(cat);
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="gap-2"
                >
                  {getCategoryIcon(cat)}
                  {info.label}
                </Button>
              );
            })}
          </div>

          {/* Rules List */}
          <div className="space-y-3">
            {filteredRules?.map((rule) => (
              <AutomationRuleCard
                key={rule.id}
                rule={rule}
                isMobile={isMobile}
                onToggle={(isActive) =>
                  toggleMutation.mutate({ id: rule.id, isActive })
                }
                onRun={() => runMutation.mutate(rule.id)}
                isToggling={toggleMutation.isPending}
                isRunning={runMutation.isPending}
                getCategoryIcon={getCategoryIcon}
                getTriggerIcon={getTriggerIcon}
              />
            ))}

            {filteredRules?.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No automation rules found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>
                Last 50 automation executions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {logsLoading ? (
                <div className="p-4 space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16" />
                  ))}
                </div>
              ) : logs && logs.length > 0 ? (
                <ScrollArea className="h-[400px]">
                  <div className="divide-y divide-border">
                    {logs.map((log) => (
                      <AutomationLogItem
                        key={log.id}
                        log={log}
                        rules={rules || []}
                        getStatusIcon={getStatusIcon}
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="p-8 text-center">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No automation logs yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Logs will appear here when automations run
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AutomationRuleCardProps {
  rule: AutomationRule;
  isMobile: boolean;
  onToggle: (isActive: boolean) => void;
  onRun: () => void;
  isToggling: boolean;
  isRunning: boolean;
  getCategoryIcon: (category: string) => React.ReactNode;
  getTriggerIcon: (type: string) => React.ReactNode;
}

function AutomationRuleCard({
  rule,
  isMobile,
  onToggle,
  onRun,
  isToggling,
  isRunning,
  getCategoryIcon,
  getTriggerIcon,
}: AutomationRuleCardProps) {
  const categoryInfo = getCategoryInfo(rule.category);
  const triggerInfo = getTriggerTypeInfo(rule.trigger_type);

  return (
    <Card className={`transition-all ${!rule.is_active ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
          {/* Left: Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${categoryInfo.color}`}
            >
              <span className="text-foreground">{getCategoryIcon(rule.category)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-medium text-foreground truncate">{rule.name}</h3>
                {rule.is_system && (
                  <Badge variant="secondary" className="text-xs shrink-0">
                    System
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                {rule.description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  {getTriggerIcon(rule.trigger_type)}
                  {rule.trigger_config?.description || triggerInfo.label}
                </span>
                {rule.last_run_at && (
                  <span>
                    Last run: {formatDistanceToNow(new Date(rule.last_run_at), { addSuffix: true })}
                  </span>
                )}
                {rule.run_count > 0 && (
                  <span className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {rule.run_count} runs
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className={`flex items-center gap-3 ${isMobile ? 'justify-end' : ''}`}>
            {rule.trigger_type === 'schedule' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRun}
                disabled={isRunning || !rule.is_active}
                className="gap-1"
              >
                <Play className="h-4 w-4" />
                {!isMobile && 'Run Now'}
              </Button>
            )}
            <Switch
              checked={rule.is_active}
              onCheckedChange={onToggle}
              disabled={isToggling}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface AutomationLogItemProps {
  log: AutomationLog;
  rules: AutomationRule[];
  getStatusIcon: (status: string) => React.ReactNode;
}

function AutomationLogItem({ log, rules, getStatusIcon }: AutomationLogItemProps) {
  const rule = rules.find(r => r.id === log.rule_id);
  const successfulActions = log.actions_taken?.filter(a => a.success).length || 0;
  const totalActions = log.actions_taken?.length || 0;

  return (
    <div className="p-4 hover:bg-muted/30 transition-colors">
      <div className="flex items-start gap-3">
        {getStatusIcon(log.status)}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-foreground">
              {rule?.name || 'Unknown Rule'}
            </span>
            <Badge
              variant={
                log.status === 'success'
                  ? 'default'
                  : log.status === 'failed'
                  ? 'destructive'
                  : 'secondary'
              }
              className="text-xs"
            >
              {log.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {log.records_processed} records processed • {successfulActions}/{totalActions} actions
            {log.duration_ms && ` • ${log.duration_ms}ms`}
          </p>
          {log.error_message && (
            <p className="text-xs text-destructive mt-1">{log.error_message}</p>
          )}
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDistanceToNow(new Date(log.executed_at), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}
