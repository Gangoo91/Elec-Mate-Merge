/**
 * StudentRequirementsPanel
 *
 * Allows tutors to view unit evidence requirements and manage
 * custom requirements assigned to individual students.
 */

import React, { useState } from 'react';
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
import { cn } from '@/lib/utils';
import { useEvidenceRequirements } from '@/hooks/useEvidenceRequirements';
import { useTutorRequirements } from '@/hooks/useTutorRequirements';
import AddRequirementDialog from './AddRequirementDialog';
import type { EvidenceTypeCode, TutorPortfolioRequirement } from '@/types/evidence';
import {
  SectionHeader,
  StatStrip,
  ListCard,
  Pill,
  EmptyState,
  LoadingState,
  type Tone,
} from '@/components/college/primitives';

// Evidence type short-labels (no icons)
const EVIDENCE_LABELS: Record<EvidenceTypeCode, string> = {
  photo: 'Photo',
  document: 'Document',
  certificate: 'Certificate',
  test_result: 'Test',
  witness: 'Witness',
  reflection: 'Reflection',
  work_log: 'Work log',
  video: 'Video',
  drawing: 'Drawing',
  calculation: 'Calculation',
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
  const [editingRequirement, setEditingRequirement] = useState<TutorPortfolioRequirement | null>(
    null
  );
  const [deletingRequirement, setDeletingRequirement] = useState<TutorPortfolioRequirement | null>(
    null
  );

  const {
    requirements: unitRequirements,
    evidenceTypes,
    isLoading: unitLoading,
    getEvidenceType,
  } = useEvidenceRequirements({ categoryId });

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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
            Evidence Requirements
          </div>
          <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Requirements
          </h3>
          <p className="mt-1 text-[13px] text-white/55">
            Manage custom requirements for this student
          </p>
        </div>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation shrink-0"
        >
          Add Requirement
        </button>
      </div>

      {/* Stats */}
      <StatStrip
        columns={3}
        stats={[
          { value: activeCount, label: 'Active', tone: 'amber' },
          { value: completedCount, label: 'Completed', tone: 'green' },
          { value: unitRequirements.length, label: 'Unit Reqs', tone: 'blue' },
        ]}
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'unit' | 'tutor')}>
        <TabsList className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full p-1 h-auto">
          <TabsTrigger
            value="tutor"
            className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Your Requirements
            {activeCount > 0 && (
              <span className="ml-1.5 tabular-nums text-[11px]">{activeCount}</span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="unit"
            className="rounded-full px-4 py-1.5 text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Unit Requirements
          </TabsTrigger>
        </TabsList>

        {/* Tutor Requirements */}
        <TabsContent value="tutor" className="mt-6 space-y-4">
          {isLoading ? (
            <LoadingState />
          ) : tutorRequirements.length === 0 ? (
            <EmptyState
              title="No custom requirements assigned"
              description="Add specific evidence requirements for this student."
              action="Add requirement"
              onAction={() => setIsAddDialogOpen(true)}
            />
          ) : (
            <div className="space-y-5">
              {activeRequirements.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                    Active
                  </div>
                  <div className="space-y-2">
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
                </div>
              )}

              {completedRequirements.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                    Completed
                  </div>
                  <div className="space-y-2">
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
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Unit Requirements */}
        <TabsContent value="unit" className="mt-6">
          {unitLoading ? (
            <LoadingState />
          ) : unitRequirements.length === 0 ? (
            <EmptyState
              title="No unit-level evidence requirements defined"
              description="Unit requirements will appear here when configured."
            />
          ) : (
            <ListCard>
              {unitRequirements.map((req) => (
                <div key={req.id} className="px-5 sm:px-6 py-4 sm:py-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Pill tone="indigo">{req.assessment_criterion}</Pill>
                      <div className="flex flex-wrap gap-1.5">
                        {req.evidence_type_codes.map((code) => (
                          <Pill key={code} tone="cyan">
                            {EVIDENCE_LABELS[code] || code}
                          </Pill>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {req.is_mandatory && <Pill tone="amber">Required</Pill>}
                      <span className="text-[13px] text-white/70 tabular-nums">
                        {req.quantity_required}×
                      </span>
                    </div>
                  </div>
                  {req.assessment_criterion_text && (
                    <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
                      {req.assessment_criterion_text}
                    </p>
                  )}
                  {req.guidance && (
                    <p className="mt-1.5 text-[12px] text-white/45 italic leading-relaxed">
                      {req.guidance}
                    </p>
                  )}
                </div>
              ))}
            </ListCard>
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
      <AlertDialog
        open={!!deletingRequirement}
        onOpenChange={(open) => !open && setDeletingRequirement(null)}
      >
        <AlertDialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Requirement</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Are you sure you want to delete "{deletingRequirement?.title}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/[0.08] text-white/70 hover:bg-white/5 hover:text-white rounded-full">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRequirement}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full"
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
    requirement.due_date && !isCompleted && new Date(requirement.due_date) < new Date();

  const dueDateTone: Tone = isOverdue ? 'red' : isDueSoon ? 'amber' : 'blue';

  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 transition-opacity',
        isCompleted && 'opacity-60'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleComplete}
              aria-label={isCompleted ? 'Mark as active' : 'Mark as complete'}
              className={cn(
                'shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors touch-manipulation',
                isCompleted
                  ? 'bg-green-500/20 border-green-500'
                  : 'bg-transparent border-white/30 hover:border-elec-yellow'
              )}
            >
              {isCompleted && <span className="text-green-400 text-[11px] font-bold">✓</span>}
            </button>
            <h4
              className={cn(
                'text-[15px] font-medium truncate',
                isCompleted ? 'line-through text-white/55' : 'text-white'
              )}
            >
              {requirement.title}
            </h4>
            {requirement.is_mandatory && <Pill tone="amber">Required</Pill>}
          </div>

          {requirement.description && (
            <p className="mt-2 text-[13px] text-white/60 line-clamp-2 leading-relaxed pl-8">
              {requirement.description}
            </p>
          )}

          <div className="mt-3 flex items-center flex-wrap gap-2 pl-8">
            <div className="flex flex-wrap gap-1.5">
              {requirement.evidence_type_codes.map((code) => (
                <Pill key={code} tone="cyan">
                  {EVIDENCE_LABELS[code as EvidenceTypeCode] || code}
                </Pill>
              ))}
            </div>
            <span className="text-[11.5px] text-white/45 tabular-nums">
              {requirement.quantity_required}× required
            </span>
            {requirement.due_date && (
              <Pill tone={dueDateTone}>Due {formatDate(requirement.due_date)}</Pill>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Options"
              className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-white/60 hover:bg-white/5 hover:text-white transition-colors touch-manipulation"
            >
              <span className="text-lg leading-none">⋯</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[hsl(0_0%_12%)] border-white/[0.08] min-w-[180px]"
          >
            <DropdownMenuItem onClick={onEdit} className="text-white/80 focus:bg-white/5">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onToggleComplete}
              className="text-white/80 focus:bg-white/5"
            >
              {isCompleted ? 'Mark as active' : 'Mark as complete'}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/[0.06]" />
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default StudentRequirementsPanel;
