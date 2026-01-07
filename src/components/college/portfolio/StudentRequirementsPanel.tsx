/**
 * StudentRequirementsPanel
 *
 * Allows tutors to view unit evidence requirements and manage
 * custom requirements assigned to individual students.
 */

import React, { useState } from 'react';
import {
  Camera,
  FileText,
  Award,
  ClipboardList,
  Users,
  BookOpen,
  Calendar,
  Video,
  PenTool,
  Calculator,
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
  Plus,
  Trash2,
  Edit2,
  MoreVertical,
  UserCheck,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEvidenceRequirements } from '@/hooks/useEvidenceRequirements';
import { useTutorRequirements } from '@/hooks/useTutorRequirements';
import AddRequirementDialog from './AddRequirementDialog';
import type { EvidenceTypeCode, TutorPortfolioRequirement } from '@/types/evidence';

// Icon mapping for evidence types
const EVIDENCE_ICONS: Record<EvidenceTypeCode, React.ReactNode> = {
  photo: <Camera className="h-4 w-4" />,
  document: <FileText className="h-4 w-4" />,
  certificate: <Award className="h-4 w-4" />,
  test_result: <ClipboardList className="h-4 w-4" />,
  witness: <Users className="h-4 w-4" />,
  reflection: <BookOpen className="h-4 w-4" />,
  work_log: <Calendar className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  drawing: <PenTool className="h-4 w-4" />,
  calculation: <Calculator className="h-4 w-4" />,
};

interface StudentRequirementsPanelProps {
  studentId: string;
  qualificationId: string;
  categoryId?: string;
}

export function StudentRequirementsPanel({
  studentId,
  qualificationId,
  categoryId,
}: StudentRequirementsPanelProps) {
  const [activeTab, setActiveTab] = useState<'unit' | 'tutor'>('tutor');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<TutorPortfolioRequirement | null>(null);
  const [deletingRequirement, setDeletingRequirement] = useState<TutorPortfolioRequirement | null>(null);

  // Get unit-level requirements (read-only view)
  const {
    requirements: unitRequirements,
    evidenceTypes,
    isLoading: unitLoading,
    getEvidenceType,
  } = useEvidenceRequirements({ categoryId });

  // Get tutor-assigned requirements (CRUD)
  const {
    requirements: tutorRequirements,
    isLoading: tutorLoading,
    createRequirement,
    updateRequirement,
    deleteRequirement,
    markComplete,
    cancelRequirement,
    activeCount,
    completedCount,
  } = useTutorRequirements({ studentId, status: 'all' });

  const isLoading = unitLoading || tutorLoading;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleCreateRequirement = async (data: {
    title: string;
    description?: string;
    evidenceTypeCodes: EvidenceTypeCode[];
    quantityRequired: number;
    isMandatory: boolean;
    guidance?: string;
    dueDate?: string;
    categoryId?: string;
  }) => {
    try {
      await createRequirement({
        studentId,
        ...data,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error('Failed to create requirement:', err);
    }
  };

  const handleUpdateRequirement = async (data: {
    title: string;
    description?: string;
    evidenceTypeCodes: EvidenceTypeCode[];
    quantityRequired: number;
    isMandatory: boolean;
    guidance?: string;
    dueDate?: string;
  }) => {
    if (!editingRequirement) return;

    try {
      await updateRequirement(editingRequirement.id, {
        title: data.title,
        description: data.description,
        evidenceTypeCodes: data.evidenceTypeCodes,
        quantityRequired: data.quantityRequired,
        isMandatory: data.isMandatory,
        guidance: data.guidance,
        dueDate: data.dueDate || null,
      });
      setEditingRequirement(null);
    } catch (err) {
      console.error('Failed to update requirement:', err);
    }
  };

  const handleDeleteRequirement = async () => {
    if (!deletingRequirement) return;

    try {
      await deleteRequirement(deletingRequirement.id);
      setDeletingRequirement(null);
    } catch (err) {
      console.error('Failed to delete requirement:', err);
    }
  };

  const handleToggleComplete = async (req: TutorPortfolioRequirement) => {
    try {
      if (req.status === 'completed') {
        await updateRequirement(req.id, { status: 'active' });
      } else {
        await markComplete(req.id);
      }
    } catch (err) {
      console.error('Failed to toggle completion:', err);
    }
  };

  const activeRequirements = tutorRequirements.filter((r) => r.status === 'active');
  const completedRequirements = tutorRequirements.filter((r) => r.status === 'completed');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Evidence Requirements</h3>
          <p className="text-sm text-white/60">
            Manage custom requirements for this student
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Requirement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-amber-500/10">
                <AlertCircle className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">Active</p>
                <p className="text-lg font-semibold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-green-500/10">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">Completed</p>
                <p className="text-lg font-semibold">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-blue-500/10">
                <FileText className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">Unit Reqs</p>
                <p className="text-lg font-semibold">{unitRequirements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'unit' | 'tutor')}>
        <TabsList className="bg-white/5 border border-elec-gray/40">
          <TabsTrigger value="tutor">
            Your Requirements
            {activeCount > 0 && (
              <Badge className="ml-2 bg-amber-500/20 text-amber-400">{activeCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unit">Unit Requirements</TabsTrigger>
        </TabsList>

        {/* Tutor Requirements Tab */}
        <TabsContent value="tutor" className="mt-4 space-y-4">
          {isLoading ? (
            <Card className="bg-white/5 border-elec-gray/40 animate-pulse">
              <CardContent className="py-12 text-center">
                <p className="text-white/50">Loading requirements...</p>
              </CardContent>
            </Card>
          ) : tutorRequirements.length === 0 ? (
            <Card className="bg-white/5 border-elec-gray/40">
              <CardContent className="py-12 text-center">
                <UserCheck className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 mb-2">No custom requirements assigned</p>
                <p className="text-sm text-white/50 mb-4">
                  Add specific evidence requirements for this student
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {/* Active Requirements */}
              {activeRequirements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white/70">Active</h4>
                  {activeRequirements.map((req) => (
                    <RequirementCard
                      key={req.id}
                      requirement={req}
                      onEdit={() => setEditingRequirement(req)}
                      onDelete={() => setDeletingRequirement(req)}
                      onToggleComplete={() => handleToggleComplete(req)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}

              {/* Completed Requirements */}
              {completedRequirements.length > 0 && (
                <div className="space-y-2 mt-6">
                  <h4 className="text-sm font-medium text-white/70">Completed</h4>
                  {completedRequirements.map((req) => (
                    <RequirementCard
                      key={req.id}
                      requirement={req}
                      onEdit={() => setEditingRequirement(req)}
                      onDelete={() => setDeletingRequirement(req)}
                      onToggleComplete={() => handleToggleComplete(req)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Unit Requirements Tab (Read-only) */}
        <TabsContent value="unit" className="mt-4">
          {unitLoading ? (
            <Card className="bg-white/5 border-elec-gray/40 animate-pulse">
              <CardContent className="py-12 text-center">
                <p className="text-white/50">Loading unit requirements...</p>
              </CardContent>
            </Card>
          ) : unitRequirements.length === 0 ? (
            <Card className="bg-white/5 border-elec-gray/40">
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/50">
                  No unit-level evidence requirements defined
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/5 border-elec-gray/40">
              <CardContent className="p-0">
                <div className="divide-y divide-elec-gray/40">
                  {unitRequirements.map((req) => (
                    <div key={req.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono">
                            {req.assessment_criterion}
                          </Badge>
                          <div className="flex items-center gap-1.5">
                            {req.evidence_type_codes.map((code) => {
                              const type = getEvidenceType(code);
                              return type ? (
                                <Tooltip key={code}>
                                  <TooltipTrigger>
                                    <span style={{ color: type.color }}>
                                      {EVIDENCE_ICONS[code]}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>{type.name}</TooltipContent>
                                </Tooltip>
                              ) : null;
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {req.is_mandatory && (
                            <Badge className="bg-amber-500/20 text-amber-400">Required</Badge>
                          )}
                          <span className="text-sm text-white/60">
                            {req.quantity_required}x
                          </span>
                        </div>
                      </div>
                      {req.assessment_criterion_text && (
                        <p className="text-sm text-white/70 mt-2">
                          {req.assessment_criterion_text}
                        </p>
                      )}
                      {req.guidance && (
                        <p className="text-xs text-white/50 mt-1 italic">
                          {req.guidance}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <AddRequirementDialog
        open={isAddDialogOpen || !!editingRequirement}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setEditingRequirement(null);
          }
        }}
        onSubmit={editingRequirement ? handleUpdateRequirement : handleCreateRequirement}
        initialData={
          editingRequirement
            ? {
                title: editingRequirement.title,
                description: editingRequirement.description || undefined,
                evidenceTypeCodes: editingRequirement.evidence_type_codes,
                quantityRequired: editingRequirement.quantity_required,
                isMandatory: editingRequirement.is_mandatory,
                guidance: editingRequirement.guidance || undefined,
                dueDate: editingRequirement.due_date || undefined,
              }
            : undefined
        }
        evidenceTypes={evidenceTypes}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingRequirement} onOpenChange={(open) => !open && setDeletingRequirement(null)}>
        <AlertDialogContent className="bg-elec-dark border-elec-gray/40">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Requirement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingRequirement?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-elec-gray/40">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRequirement}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Requirement Card Component
function RequirementCard({
  requirement,
  onEdit,
  onDelete,
  onToggleComplete,
  formatDate,
}: {
  requirement: TutorPortfolioRequirement;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
  formatDate: (date: string) => string;
}) {
  const isCompleted = requirement.status === 'completed';
  const isDueSoon =
    requirement.due_date &&
    !isCompleted &&
    (() => {
      const due = new Date(requirement.due_date);
      const now = new Date();
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return due <= weekFromNow && due >= now;
    })();
  const isOverdue =
    requirement.due_date &&
    !isCompleted &&
    new Date(requirement.due_date) < new Date();

  return (
    <Card
      className={cn(
        'bg-white/5 border-elec-gray/40 transition-colors',
        isCompleted && 'opacity-60'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleComplete}
                className="shrink-0 p-1 -m-1 rounded hover:bg-white/10 transition-colors"
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-white/40" />
                )}
              </button>
              <h4
                className={cn(
                  'font-medium truncate',
                  isCompleted && 'line-through text-white/60'
                )}
              >
                {requirement.title}
              </h4>
              {requirement.is_mandatory && (
                <Badge className="bg-amber-500/20 text-amber-400 shrink-0">Required</Badge>
              )}
            </div>

            {requirement.description && (
              <p className="text-sm text-white/60 mt-1 line-clamp-2">
                {requirement.description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                {requirement.evidence_type_codes.map((code) => (
                  <span key={code} className="text-white/60">
                    {EVIDENCE_ICONS[code as EvidenceTypeCode]}
                  </span>
                ))}
              </div>
              <span className="text-xs text-white/50">
                {requirement.quantity_required}x required
              </span>
              {requirement.due_date && (
                <Badge
                  variant={isOverdue ? 'destructive' : isDueSoon ? 'outline' : 'secondary'}
                  className="text-xs"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(requirement.due_date)}
                </Badge>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-elec-dark border-elec-gray/40">
              <DropdownMenuItem onClick={onEdit}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleComplete}>
                {isCompleted ? (
                  <>
                    <Circle className="h-4 w-4 mr-2" />
                    Mark as Active
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentRequirementsPanel;
