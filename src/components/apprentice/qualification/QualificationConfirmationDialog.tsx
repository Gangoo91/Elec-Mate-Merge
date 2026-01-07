import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  CalendarDays,
  Award,
  GraduationCap,
  FolderOpen,
  FileText,
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Target,
  Loader2,
} from 'lucide-react';
import { Qualification, QualificationCategory } from '@/types/qualification';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface QualificationConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qualification: Qualification | null;
  categories: QualificationCategory[];
  onConfirm: (targetDate?: string) => Promise<void>;
}

const QualificationConfirmationDialog = ({
  open,
  onOpenChange,
  qualification,
  categories,
  onConfirm,
}: QualificationConfirmationDialogProps) => {
  const [targetDate, setTargetDate] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const handleConfirm = async () => {
    if (!qualification) return;

    setIsConfirming(true);
    try {
      await onConfirm(targetDate || undefined);
      onOpenChange(false);
      setTargetDate('');
    } catch (error) {
      toast.error('Failed to select qualification');
    } finally {
      setIsConfirming(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Calculate stats
  const totalRequiredEntries = categories.reduce((sum, cat) => sum + cat.required_entries, 0);
  const totalLearningOutcomes = categories.reduce(
    (sum, cat) => sum + (cat.learning_outcomes?.length || 0),
    0
  );

  // Quick date presets
  const setQuickDate = (months: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    setTargetDate(date.toISOString().split('T')[0]);
  };

  if (!qualification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden bg-card border-border mx-2 w-[calc(100vw-1rem)] sm:w-full sm:mx-4">
        <div className="overflow-y-auto max-h-[calc(95vh-8rem)] pr-2 -mr-2">
          <DialogHeader className="pb-4">
            {/* Qualification Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Award className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-elec-yellow text-black font-semibold text-xs">
                      {qualification.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {qualification.awarding_body}
                    </span>
                  </div>
                  <DialogTitle className="text-lg mt-1 line-clamp-2">
                    {qualification.title}
                  </DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-sm">
                Code: {qualification.code}
                {qualification.description && (
                  <span className="block mt-1 text-muted-foreground">
                    {qualification.description}
                  </span>
                )}
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="space-y-5">
            {/* Stats Summary Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-muted/50 border border-border text-center">
                <div className="p-2 rounded-lg bg-elec-yellow/10 w-fit mx-auto mb-2">
                  <FolderOpen className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="text-2xl font-bold text-foreground">{categories.length}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  Categories
                </p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border text-center">
                <div className="p-2 rounded-lg bg-blue-500/10 w-fit mx-auto mb-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">{totalRequiredEntries}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  Evidence
                </p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border text-center">
                <div className="p-2 rounded-lg bg-green-500/10 w-fit mx-auto mb-2">
                  <Target className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">{totalLearningOutcomes}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  Outcomes
                </p>
              </div>
            </div>

            {/* Portfolio Requirements Accordion */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-elec-yellow" />
                <h4 className="font-semibold text-sm">Portfolio Requirements</h4>
              </div>

              <div className="space-y-2">
                {categories.map((category) => (
                  <Collapsible
                    key={category.id}
                    open={expandedCategories.has(category.id)}
                    onOpenChange={() => toggleCategory(category.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        className={cn(
                          'w-full p-3 rounded-xl text-left transition-all',
                          'bg-muted/50 border border-border',
                          'hover:bg-muted/80 hover:border-elec-yellow/30',
                          'active:scale-[0.99]',
                          expandedCategories.has(category.id) && 'border-elec-yellow/50'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'p-1.5 rounded-lg transition-colors',
                              expandedCategories.has(category.id)
                                ? 'bg-elec-yellow/20'
                                : 'bg-muted'
                            )}
                          >
                            {expandedCategories.has(category.id) ? (
                              <ChevronDown className="h-4 w-4 text-elec-yellow" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">
                              {category.name}
                            </p>
                            {category.description && (
                              <p className="text-xs text-muted-foreground truncate">
                                {category.description}
                              </p>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs border-elec-yellow/30 text-elec-yellow shrink-0"
                          >
                            {category.required_entries} required
                          </Badge>
                        </div>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-10 mr-3 mt-2 space-y-3 pb-2">
                        {/* Learning Outcomes */}
                        {category.learning_outcomes && category.learning_outcomes.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Learning Outcomes
                            </p>
                            <div className="space-y-1.5">
                              {category.learning_outcomes.map((outcome, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2 text-xs text-foreground"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                                  <span>{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Assessment Criteria */}
                        {category.assessment_criteria &&
                          category.assessment_criteria.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Assessment Criteria
                              </p>
                              <div className="space-y-1.5">
                                {category.assessment_criteria.map((criteria, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-2 text-xs text-muted-foreground"
                                  >
                                    <span className="text-elec-yellow shrink-0">•</span>
                                    <span>{criteria}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Fallback if no details */}
                        {(!category.learning_outcomes ||
                          category.learning_outcomes.length === 0) &&
                          (!category.assessment_criteria ||
                            category.assessment_criteria.length === 0) && (
                            <p className="text-xs text-muted-foreground italic">
                              No detailed requirements specified for this category.
                            </p>
                          )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}

                {categories.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No categories defined for this qualification yet.
                  </p>
                )}
              </div>
            </div>

            {/* Target Date Section */}
            <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="h-4 w-4 text-elec-yellow" />
                Target Completion Date
                <span className="text-muted-foreground font-normal">(Optional)</span>
              </Label>

              {/* Quick Date Presets */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickDate(3)}
                  className={cn(
                    'flex-1 text-xs h-9',
                    targetDate &&
                      new Date(targetDate).getMonth() ===
                        new Date(new Date().setMonth(new Date().getMonth() + 3)).getMonth() &&
                      'border-elec-yellow bg-elec-yellow/10'
                  )}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  3 months
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickDate(6)}
                  className={cn(
                    'flex-1 text-xs h-9',
                    targetDate &&
                      new Date(targetDate).getMonth() ===
                        new Date(new Date().setMonth(new Date().getMonth() + 6)).getMonth() &&
                      'border-elec-yellow bg-elec-yellow/10'
                  )}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  6 months
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickDate(12)}
                  className={cn(
                    'flex-1 text-xs h-9',
                    targetDate &&
                      new Date(targetDate).getMonth() ===
                        new Date(new Date().setMonth(new Date().getMonth() + 12)).getMonth() &&
                      'border-elec-yellow bg-elec-yellow/10'
                  )}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  1 year
                </Button>
              </div>

              {/* Manual Date Input */}
              <Input
                id="target-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-background border-border"
              />

              <p className="text-xs text-muted-foreground">
                Set a goal to track your progress. You can change this later.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isConfirming}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 w-full sm:w-auto order-1 sm:order-2 h-11"
          >
            {isConfirming ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Setting Up...
              </>
            ) : (
              <>
                <GraduationCap className="h-4 w-4 mr-2" />
                Confirm & Start Portfolio
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QualificationConfirmationDialog;
