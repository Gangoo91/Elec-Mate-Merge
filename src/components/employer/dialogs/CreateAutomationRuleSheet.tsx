import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IOSStepIndicator } from '@/components/ui/ios-step-indicator';
import { cn } from '@/lib/utils';
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
import {
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  fieldLabelClass,
  Eyebrow,
} from '@/components/employer/editorial';

const CATEGORIES = [
  {
    value: 'compliance',
    label: 'Compliance',
    icon: Shield,
    color: 'bg-orange-500/20 text-orange-400',
  },
  { value: 'jobs', label: 'Jobs', icon: Briefcase, color: 'bg-blue-500/20 text-blue-400' },
  { value: 'finance', label: 'Finance', icon: DollarSign, color: 'bg-green-500/20 text-green-400' },
  { value: 'hr', label: 'HR', icon: Users, color: 'bg-purple-500/20 text-purple-400' },
];

const TRIGGER_TYPES = [
  { value: 'schedule', label: 'Schedule', description: 'Run on a schedule', icon: Clock },
  {
    value: 'field_change',
    label: 'Field Change',
    description: 'When a field changes',
    icon: RefreshCw,
  },
  {
    value: 'record_created',
    label: 'Record Created',
    description: 'When a new record is added',
    icon: Plus,
  },
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
  const createAutomation = useCreateAutomation();
  const [step, setStep] = useState(1);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [triggerType, setTriggerType] = useState('');
  const [schedule, setSchedule] = useState('');
  const [actions, setActions] = useState<Array<{ type: string; config: Record<string, unknown> }>>(
    []
  );

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
      trigger_config:
        triggerType === 'schedule'
          ? { schedule, description: SCHEDULE_OPTIONS.find((s) => s.value === schedule)?.label }
          : {},
      conditions: [],
      actions,
      is_active: true,
      is_system: false,
    });

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
      case 1:
        return name.trim() && category;
      case 2:
        return triggerType && (triggerType !== 'schedule' || schedule);
      case 3:
        return actions.length > 0;
      default:
        return false;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-3xl bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <div className="flex flex-col h-full">
          <div className="pt-2.5 pb-1 flex justify-center">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <div className="px-4 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenChange(false)}
                  className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                >
                  <X className="h-5 w-5" />
                </button>
                <div>
                  <Eyebrow>New automation</Eyebrow>
                  <div className="mt-1 text-[18px] font-semibold text-white leading-tight">
                    Create a workflow rule
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[13px] font-medium text-white">
                  {stepLabels[step - 1]}
                </span>
                <IOSStepIndicator steps={3} currentStep={step - 1} className="mt-1" />
              </div>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 px-4">
            <div className="py-6 pb-48">
              {step === 1 && (
                <div className="space-y-4">
                  <FormCard eyebrow="Details">
                    <Field label="Rule name" required>
                      <Input
                        placeholder="e.g., MOT Expiry Reminder"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Description">
                      <Textarea
                        placeholder="What does this automation do?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={cn(textareaClass, 'min-h-[80px]')}
                      />
                    </Field>

                    <div className="space-y-2">
                      <label className={fieldLabelClass}>Category *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {CATEGORIES.map((cat) => {
                          const Icon = cat.icon;
                          const isSelected = category === cat.value;
                          return (
                            <div
                              key={cat.value}
                              onClick={() => setCategory(cat.value)}
                              className={cn(
                                'cursor-pointer transition-all touch-manipulation rounded-xl border p-4 flex items-center gap-3',
                                isSelected
                                  ? 'border-elec-yellow bg-elec-yellow/10'
                                  : 'border-white/[0.08] bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)]'
                              )}
                            >
                              <div
                                className={cn(
                                  'h-10 w-10 rounded-lg flex items-center justify-center',
                                  cat.color
                                )}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                              <span className="font-medium text-white">{cat.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </FormCard>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormCard eyebrow="Trigger">
                    <label className={fieldLabelClass}>Trigger type *</label>
                    <div className="space-y-2">
                      {TRIGGER_TYPES.map((trigger) => {
                        const Icon = trigger.icon;
                        const isSelected = triggerType === trigger.value;
                        return (
                          <div
                            key={trigger.value}
                            onClick={() => setTriggerType(trigger.value)}
                            className={cn(
                              'cursor-pointer transition-all touch-manipulation rounded-xl border p-4 flex items-center gap-3',
                              isSelected
                                ? 'border-elec-yellow bg-elec-yellow/10'
                                : 'border-white/[0.08] bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)]'
                            )}
                          >
                            <div className="h-10 w-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{trigger.label}</p>
                              <p className="text-[12.5px] text-white">{trigger.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {triggerType === 'schedule' && (
                      <Field label="Schedule" required>
                        <Select value={schedule} onValueChange={setSchedule}>
                          <SelectTrigger className={selectTriggerClass}>
                            <SelectValue placeholder="Select schedule..." />
                          </SelectTrigger>
                          <SelectContent className={selectContentClass}>
                            {SCHEDULE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}

                    {(triggerType === 'field_change' || triggerType === 'record_created') && (
                      <div className="p-4 text-center rounded-xl border border-dashed border-white/[0.15] bg-white/[0.02]">
                        <p className="text-[12.5px] text-white">
                          {triggerType === 'field_change' ? 'Field change' : 'Record'} triggers
                          require advanced configuration. Please contact support for custom setups.
                        </p>
                      </div>
                    )}
                  </FormCard>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <FormCard eyebrow="Actions">
                    <p className="text-[12.5px] text-white -mt-1">
                      What should happen when this automation runs?
                    </p>

                    {actions.length > 0 && (
                      <div className="space-y-2">
                        {actions.map((action, index) => {
                          const actionType = ACTION_TYPES.find((a) => a.value === action.type);
                          const Icon = actionType?.icon || Zap;
                          return (
                            <div
                              key={index}
                              className="rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.08] p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                                  <Icon className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-medium text-white">{actionType?.label}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveAction(index)}
                                className="h-8 w-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className={fieldLabelClass}>Add action</label>
                      <div className="grid grid-cols-1 gap-2">
                        {ACTION_TYPES.map((actionType) => {
                          const Icon = actionType.icon;
                          const isAdded = actions.some((a) => a.type === actionType.value);
                          return (
                            <button
                              key={actionType.value}
                              type="button"
                              onClick={() => handleAddAction(actionType.value)}
                              disabled={isAdded}
                              className={cn(
                                'h-12 px-4 rounded-xl border flex items-center gap-3 text-[13px] font-medium transition-colors disabled:opacity-50',
                                'bg-[hsl(0_0%_10%)] border-white/[0.08] text-white hover:bg-[hsl(0_0%_12%)]'
                              )}
                            >
                              <Icon className="h-5 w-5" />
                              {actionType.label}
                              {isAdded && (
                                <Badge className="ml-auto bg-white/[0.08] text-white border-white/[0.08]">
                                  Added
                                </Badge>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </FormCard>

                  {actions.length > 0 && name && category && triggerType && (
                    <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-2xl p-4 space-y-3">
                      <Eyebrow>Summary</Eyebrow>
                      <div className="text-[13px] space-y-1 text-white">
                        <p>
                          <span className="text-white">Name:</span> {name}
                        </p>
                        <p>
                          <span className="text-white">Category:</span>{' '}
                          {CATEGORIES.find((c) => c.value === category)?.label}
                        </p>
                        <p>
                          <span className="text-white">Trigger:</span>{' '}
                          {TRIGGER_TYPES.find((t) => t.value === triggerType)?.label}
                        </p>
                        {schedule && (
                          <p>
                            <span className="text-white">Schedule:</span>{' '}
                            {SCHEDULE_OPTIONS.find((s) => s.value === schedule)?.label}
                          </p>
                        )}
                        <p>
                          <span className="text-white">Actions:</span> {actions.length}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Fixed Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[hsl(0_0%_8%)] border-t border-white/[0.06]">
            <div className="px-4 py-3 pb-safe">
              <div className="flex gap-3 w-full">
                {step > 1 ? (
                  <SecondaryButton onClick={() => setStep(step - 1)} fullWidth>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </SecondaryButton>
                ) : (
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                    Cancel
                  </SecondaryButton>
                )}
                {step < 3 ? (
                  <PrimaryButton
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    fullWidth
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    onClick={handleSubmit}
                    disabled={!canProceed() || createAutomation.isPending}
                    fullWidth
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
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
