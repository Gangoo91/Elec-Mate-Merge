import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  Award,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  FileText,
  ClipboardCheck,
  GraduationCap,
  Wrench,
  Filter,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Assessment {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  grade?: string;
  feedback?: string;
  unit?: string;
}

const ASSESSMENT_TYPES = [
  { value: 'practical', label: 'Practical', icon: Wrench },
  { value: 'written', label: 'Written', icon: FileText },
  { value: 'observation', label: 'Observation', icon: ClipboardCheck },
  { value: 'professional-discussion', label: 'Prof. Discussion', icon: GraduationCap },
];

/**
 * AssessmentsSection - Assessment tracking for OJT Hub
 *
 * Features:
 * - Assessment list with status tracking
 * - Due date management
 * - Grade display
 * - Add new assessments
 * - Progress overview
 */
export function AssessmentsSection() {
  const { toast } = useToast();
  const [showAddAssessment, setShowAddAssessment] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const [newAssessment, setNewAssessment] = useState({
    title: '',
    type: 'practical',
    dueDate: '',
    unit: '',
  });

  // Mock assessments
  const [assessments] = useState<Assessment[]>([
    {
      id: '1',
      title: 'Consumer Unit Installation',
      type: 'practical',
      dueDate: '2024-01-15',
      status: 'in_progress',
      unit: 'Unit 202',
    },
    {
      id: '2',
      title: 'Electrical Science Theory',
      type: 'written',
      dueDate: '2024-01-20',
      status: 'pending',
      unit: 'Unit 201',
    },
    {
      id: '3',
      title: 'Safe Isolation Procedure',
      type: 'observation',
      dueDate: '2024-01-08',
      status: 'completed',
      grade: 'Pass',
      feedback: 'Excellent demonstration of safe isolation procedure.',
      unit: 'Unit 203',
    },
    {
      id: '4',
      title: 'Testing & Inspection',
      type: 'practical',
      dueDate: '2024-01-05',
      status: 'overdue',
      unit: 'Unit 206',
    },
    {
      id: '5',
      title: 'Health & Safety Discussion',
      type: 'professional-discussion',
      dueDate: '2023-12-20',
      status: 'completed',
      grade: 'Merit',
      unit: 'Unit 200',
    },
  ]);

  // Filter assessments
  const filteredAssessments = selectedFilter
    ? assessments.filter((a) => a.status === selectedFilter)
    : assessments;

  // Sort by due date (overdue first, then upcoming)
  const sortedAssessments = [...filteredAssessments].sort((a, b) => {
    if (a.status === 'overdue' && b.status !== 'overdue') return -1;
    if (b.status === 'overdue' && a.status !== 'overdue') return 1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  // Stats
  const stats = {
    total: assessments.length,
    completed: assessments.filter((a) => a.status === 'completed').length,
    inProgress: assessments.filter((a) => a.status === 'in_progress').length,
    overdue: assessments.filter((a) => a.status === 'overdue').length,
  };

  const completionPercent = Math.round((stats.completed / stats.total) * 100);

  const handleAddAssessment = () => {
    if (!newAssessment.title || !newAssessment.dueDate) {
      toast({
        title: 'Missing information',
        description: 'Please fill in title and due date',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Assessment added',
      description: `${newAssessment.title} has been added`,
    });

    setNewAssessment({
      title: '',
      type: 'practical',
      dueDate: '',
      unit: '',
    });
    setShowAddAssessment(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          badge: 'bg-green-500/20 text-green-500 border-green-500/30',
          icon: CheckCircle2,
          iconColor: 'text-green-500',
          label: 'Completed',
        };
      case 'in_progress':
        return {
          badge: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
          icon: Clock,
          iconColor: 'text-blue-500',
          label: 'In Progress',
        };
      case 'overdue':
        return {
          badge: 'bg-red-500/20 text-red-500 border-red-500/30',
          icon: AlertCircle,
          iconColor: 'text-red-500',
          label: 'Overdue',
        };
      default:
        return {
          badge: 'bg-muted text-muted-foreground',
          icon: Clock,
          iconColor: 'text-muted-foreground',
          label: 'Pending',
        };
    }
  };

  const getTypeIcon = (type: string) => {
    return ASSESSMENT_TYPES.find((t) => t.value === type)?.icon || FileText;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / 86400000);
    return diffDays;
  };

  return (
    <>
      <div className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Assessments</h1>
            <p className="text-sm text-muted-foreground">Track your assessment progress</p>
          </div>
          <Button
            onClick={() => setShowAddAssessment(true)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>

        {/* Progress Overview */}
        <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-foreground">Overall Progress</p>
                <p className="text-xs text-muted-foreground">
                  {stats.completed} of {stats.total} assessments completed
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-elec-yellow">{completionPercent}%</span>
              </div>
            </div>
            <Progress value={completionPercent} className="h-2" />
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedFilter(null)}
            className={cn(
              "p-3 rounded-xl border text-center transition-all active:scale-95",
              !selectedFilter
                ? "border-elec-yellow/50 bg-elec-yellow/10"
                : "border-border bg-card"
            )}
          >
            <p className="text-lg font-bold text-foreground">{stats.total}</p>
            <p className="text-[10px] text-muted-foreground">All</p>
          </button>
          <button
            onClick={() => setSelectedFilter('completed')}
            className={cn(
              "p-3 rounded-xl border text-center transition-all active:scale-95",
              selectedFilter === 'completed'
                ? "border-green-500/50 bg-green-500/10"
                : "border-border bg-card"
            )}
          >
            <p className="text-lg font-bold text-green-500">{stats.completed}</p>
            <p className="text-[10px] text-muted-foreground">Done</p>
          </button>
          <button
            onClick={() => setSelectedFilter('in_progress')}
            className={cn(
              "p-3 rounded-xl border text-center transition-all active:scale-95",
              selectedFilter === 'in_progress'
                ? "border-blue-500/50 bg-blue-500/10"
                : "border-border bg-card"
            )}
          >
            <p className="text-lg font-bold text-blue-500">{stats.inProgress}</p>
            <p className="text-[10px] text-muted-foreground">Active</p>
          </button>
          <button
            onClick={() => setSelectedFilter('overdue')}
            className={cn(
              "p-3 rounded-xl border text-center transition-all active:scale-95",
              selectedFilter === 'overdue'
                ? "border-red-500/50 bg-red-500/10"
                : "border-border bg-card"
            )}
          >
            <p className="text-lg font-bold text-red-500">{stats.overdue}</p>
            <p className="text-[10px] text-muted-foreground">Overdue</p>
          </button>
        </div>

        {/* Assessment List */}
        <div className="space-y-3">
          {sortedAssessments.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="font-medium text-foreground">No assessments</p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedFilter ? 'Try a different filter' : 'Add your first assessment'}
              </p>
            </div>
          ) : (
            sortedAssessments.map((assessment) => {
              const statusConfig = getStatusConfig(assessment.status);
              const TypeIcon = getTypeIcon(assessment.type);
              const StatusIcon = statusConfig.icon;
              const daysUntil = getDaysUntilDue(assessment.dueDate);

              return (
                <Card
                  key={assessment.id}
                  className={cn(
                    "border-2 transition-all active:scale-[0.99]",
                    assessment.status === 'overdue'
                      ? "border-red-500/30 bg-red-500/5"
                      : assessment.status === 'in_progress'
                      ? "border-blue-500/20"
                      : "border-border"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={cn(
                          "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                          assessment.status === 'completed'
                            ? "bg-green-500/10"
                            : assessment.status === 'overdue'
                            ? "bg-red-500/10"
                            : "bg-elec-yellow/10"
                        )}
                      >
                        <TypeIcon
                          className={cn(
                            "h-6 w-6",
                            assessment.status === 'completed'
                              ? "text-green-500"
                              : assessment.status === 'overdue'
                              ? "text-red-500"
                              : "text-elec-yellow"
                          )}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-foreground line-clamp-1">
                              {assessment.title}
                            </p>
                            {assessment.unit && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {assessment.unit}
                              </p>
                            )}
                          </div>
                          <Badge variant="outline" className={statusConfig.badge}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>

                        {/* Due date & Grade */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(assessment.dueDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}
                            {assessment.status !== 'completed' && (
                              <span
                                className={cn(
                                  "ml-1",
                                  daysUntil < 0
                                    ? "text-red-500"
                                    : daysUntil <= 3
                                    ? "text-amber-500"
                                    : ""
                                )}
                              >
                                ({daysUntil < 0
                                  ? `${Math.abs(daysUntil)}d overdue`
                                  : daysUntil === 0
                                  ? 'Today'
                                  : `${daysUntil}d left`})
                              </span>
                            )}
                          </div>
                          {assessment.grade && (
                            <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-[10px]">
                              {assessment.grade}
                            </Badge>
                          )}
                        </div>

                        {/* Feedback */}
                        {assessment.feedback && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2 bg-muted/50 p-2 rounded">
                            {assessment.feedback}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Add Assessment Sheet */}
      <Sheet open={showAddAssessment} onOpenChange={setShowAddAssessment}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader>
            <SheetTitle>Add Assessment</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assessment Title</label>
              <Input
                placeholder="e.g., Consumer Unit Installation"
                value={newAssessment.title}
                onChange={(e) =>
                  setNewAssessment({ ...newAssessment, title: e.target.value })
                }
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <div className="grid grid-cols-2 gap-2">
                {ASSESSMENT_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() =>
                        setNewAssessment({ ...newAssessment, type: type.value })
                      }
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-xl border transition-all active:scale-95",
                        newAssessment.type === type.value
                          ? "border-elec-yellow bg-elec-yellow/10"
                          : "border-border"
                      )}
                    >
                      <Icon className="h-4 w-4 text-elec-yellow" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Unit (optional)</label>
              <Input
                placeholder="e.g., Unit 202"
                value={newAssessment.unit}
                onChange={(e) =>
                  setNewAssessment({ ...newAssessment, unit: e.target.value })
                }
              />
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={newAssessment.dueDate}
                onChange={(e) =>
                  setNewAssessment({ ...newAssessment, dueDate: e.target.value })
                }
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 pb-8">
              <Button
                variant="outline"
                onClick={() => setShowAddAssessment(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddAssessment}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Add Assessment
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AssessmentsSection;
