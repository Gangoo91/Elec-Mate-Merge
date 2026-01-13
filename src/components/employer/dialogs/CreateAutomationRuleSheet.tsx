import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IOSStepIndicator } from '@/components/ui/ios-step-indicator';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Zap,
  Clock,
  RefreshCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
  Briefcase,
  DollarSign,
  Users,
  Loader2,
  X,
  Trash2,
  Bell,
  Mail,
  FileText,
} from 'lucide-react';
import { useCreateAutomation } from '@/hooks/useAutomations';

const CATEGORIES = [
  { value: 'compliance', label: 'Compliance', icon: Shield, color: 'bg-orange-500/20 text-orange-400' },
  { value: 'jobs', label: 'Jobs', icon: Briefcase, color: 'bg-blue-500/20 text-blue-400' },
  { value: 'finance', label: 'Finance', icon: DollarSign, color: 'bg-green-500/20 text-green-400' },
  { value: 'hr', label: 'HR', icon: Users, color: 'bg-purple-500/20 text-purple-400' },
];

const TRIGGER_TYPES = [
  { value: 'schedule', label: 'Schedule', description: 'Run on a schedule', icon: Clock },
  { value: 'field_change', label: 'Field Change', description: 'When a field changes', icon: RefreshCw },
  { value: 'record_created', label: 'Record Created', description: 'When a new record is added', icon: Plus },
];

const SCHEDULE_OPTIONS = [
  { value: '0 9 * * *', label: 'Daily at 9am' },
  { value: '0 9 * * 1', label: 'Weekly on Monday at 9am' },
  { value: '0 9 1 * *', label: 'Monthly on 1st at 9am' },
  { value: '0 9 * * 1-5', label: 'Weekdays at 9am' },
];

const ACTION_TYPES = [
  { value: 'notification', label: 'Send Notification', icon: Bell },
  { value: 'email', label: 'Send Email', icon: Mail },
  { value: 'create_task', label: 'Create Task', icon: FileText },
];

interface CreateAutomationRuleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAutomationRuleSheet({ open, onOpenChange }: CreateAutomationRuleSheetProps) {
  const isMobile = useIsMobile();
  const createAutomation = useCreateAutomation();
  const [step, setStep] = useState(1);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [triggerType, setTriggerType] = useState('');
  const [schedule, setSchedule] = useState('');
  const [actions, setActions] = useState<Array<{ type: string; config: Record<string, unknown> }>>([]);

  const stepLabels = ['Details', 'Trigger', 'Actions'];

  const handleAddAction = (type: string) => {
    setActions([...actions, { type, config: {} }]);
  };

  const handleRemoveAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    await createAutomation.mutateAsync({
      name,
      description: description || null,
      category,
      trigger_type: triggerType,
      trigger_config: triggerType === 'schedule' ? { schedule, description: SCHEDULE_OPTIONS.find(s => s.value === schedule)?.label } : {},
      conditions: [],
      actions,
      is_active: true,
      is_system: false,
    });

    // Reset and close
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setStep(1);
    setName('');
    setDescription('');
    setCategory('');
    setTriggerType('');
    setSchedule('');
    setActions([]);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return name.trim() && category;
      case 2: return triggerType && (triggerType !== 'schedule' || schedule);
      case 3: return actions.length > 0;
      default: return false;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-3xl">
        <div className="flex flex-col h-full">
          {/* Drag indicator */}
          <div className="pt-2 pb-1 flex justify-center">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          <SheetHeader className="px-4 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div>
                  <SheetTitle className="text-lg font-semibold">New Automation</SheetTitle>
                  <SheetDescription className="text-xs">Create a workflow rule</SheetDescription>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-muted-foreground">{stepLabels[step - 1]}</span>
                <IOSStepIndicator steps={3} currentStep={step - 1} className="mt-1" />
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4">
            <div className="py-6 pb-48">
              {step === 1 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label>Rule Name *</Label>
                    <Input
                      placeholder="e.g., MOT Expiry Reminder"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-14 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="What does this automation do?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Card
                            key={cat.value}
                            className={cn(
                              "cursor-pointer transition-all touch-manipulation",
                              category === cat.value
                                ? "border-elec-yellow bg-elec-yellow/10"
                                : "hover:border-border/80"
                            )}
                            onClick={() => setCategory(cat.value)}
                          >
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", cat.color)}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <span className="font-medium">{cat.label}</span>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label>Trigger Type *</Label>
                    <div className="space-y-3">
                      {TRIGGER_TYPES.map((trigger) => {
                        const Icon = trigger.icon;
                        return (
                          <Card
                            key={trigger.value}
                            className={cn(
                              "cursor-pointer transition-all touch-manipulation",
                              triggerType === trigger.value
                                ? "border-elec-yellow bg-elec-yellow/10"
                                : "hover:border-border/80"
                            )}
                            onClick={() => setTriggerType(trigger.value)}
                          >
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{trigger.label}</p>
                                <p className="text-sm text-muted-foreground">{trigger.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {triggerType === 'schedule' && (
                    <div className="space-y-2">
                      <Label>Schedule *</Label>
                      <Select value={schedule} onValueChange={setSchedule}>
                        <SelectTrigger className="h-14">
                          <SelectValue placeholder="Select schedule..." />
                        </SelectTrigger>
                        <SelectContent>
                          {SCHEDULE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {triggerType === 'field_change' && (
                    <Card className="bg-muted/30 border-dashed">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Field change triggers require advanced configuration.
                          Please contact support for custom setups.
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {triggerType === 'record_created' && (
                    <Card className="bg-muted/30 border-dashed">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Record triggers require advanced configuration.
                          Please contact support for custom setups.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label>Actions *</Label>
                    <p className="text-sm text-muted-foreground">
                      What should happen when this automation runs?
                    </p>
                  </div>

                  {/* Added Actions */}
                  {actions.length > 0 && (
                    <div className="space-y-2">
                      {actions.map((action, index) => {
                        const actionType = ACTION_TYPES.find(a => a.value === action.type);
                        const Icon = actionType?.icon || Zap;
                        return (
                          <Card key={index} className="bg-elec-gray">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="font-medium">{actionType?.label}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleRemoveAction(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  {/* Add Action Buttons */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Add Action</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {ACTION_TYPES.map((actionType) => {
                        const Icon = actionType.icon;
                        const isAdded = actions.some(a => a.type === actionType.value);
                        return (
                          <Button
                            key={actionType.value}
                            variant="outline"
                            className="h-14 justify-start gap-3"
                            onClick={() => handleAddAction(actionType.value)}
                            disabled={isAdded}
                          >
                            <Icon className="h-5 w-5" />
                            {actionType.label}
                            {isAdded && <Badge className="ml-auto">Added</Badge>}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary */}
                  {actions.length > 0 && name && category && triggerType && (
                    <Card className="bg-gradient-to-br from-primary/10 to-transparent border-elec-yellow/20">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="font-medium">Summary</h4>
                        <div className="text-sm space-y-1">
                          <p><span className="text-muted-foreground">Name:</span> {name}</p>
                          <p><span className="text-muted-foreground">Category:</span> {CATEGORIES.find(c => c.value === category)?.label}</p>
                          <p><span className="text-muted-foreground">Trigger:</span> {TRIGGER_TYPES.find(t => t.value === triggerType)?.label}</p>
                          {schedule && (
                            <p><span className="text-muted-foreground">Schedule:</span> {SCHEDULE_OPTIONS.find(s => s.value === schedule)?.label}</p>
                          )}
                          <p><span className="text-muted-foreground">Actions:</span> {actions.length}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Fixed Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="px-4 py-3 pb-safe">
              <div className="flex gap-3 w-full">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 h-12">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 h-12">
                    Cancel
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="flex-1 h-12"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || createAutomation.isPending}
                    className="flex-1 h-12"
                  >
                    {createAutomation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Create Rule
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
