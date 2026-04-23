import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer } from 'vaul';
import { motion, AnimatePresence } from 'framer-motion';
import { UK_JOB_TITLES, getJobTitleLabel } from '@/data/uk-electrician-constants';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import {
  getWorkHistoryByProfileId,
  addElecIdWorkHistory,
  updateElecIdWorkHistory,
  deleteElecIdWorkHistory,
  ElecIdWorkHistory,
} from '@/services/elecIdService';
import {
  Eyebrow,
  SectionHeader,
  EmptyState,
} from '@/components/college/primitives';

interface WorkExperience {
  id: string;
  employerName: string;
  jobTitle: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  isVerified: boolean;
  verifiedByEmployer: boolean;
}

const ExperienceSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between px-1">
      <div>
        <Skeleton className="h-6 w-32 bg-white/[0.04]" />
        <Skeleton className="h-4 w-24 mt-1 bg-white/[0.04]" />
      </div>
      <Skeleton className="h-11 w-36 rounded-xl bg-white/[0.04]" />
    </div>
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-24 w-full rounded-2xl bg-white/[0.04]" />
    ))}
  </div>
);

const ElecIdExperience = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();
  const isMobile = useIsMobile();

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isCurrent, setIsCurrent] = useState(false);
  const [formData, setFormData] = useState({
    employerName: '',
    jobTitle: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [workHistory, setWorkHistory] = useState<WorkExperience[]>([]);

  useEffect(() => {
    const fetchWorkHistory = async () => {
      if (!profile?.id) {
        setIsFetching(false);
        return;
      }

      try {
        const data = await getWorkHistoryByProfileId(profile.id);
        const mapped = data.map((w: ElecIdWorkHistory) => ({
          id: w.id,
          employerName: w.employer_name,
          jobTitle: w.job_title,
          location: w.location || undefined,
          startDate: w.start_date,
          endDate: w.end_date || undefined,
          isCurrent: w.is_current,
          description: w.description || undefined,
          isVerified: w.is_verified,
          verifiedByEmployer: w.verified_by_employer,
        }));
        setWorkHistory(mapped);
      } catch (error) {
        console.error('Error fetching work history:', error);
        addNotification({
          title: 'Error',
          message: 'Failed to load work history',
          type: 'error',
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchWorkHistory();
  }, [profile?.id]);

  const handleAddExperience = async () => {
    if (!profile?.id) {
      addNotification({
        title: 'Error',
        message: 'Profile not found. Please try again.',
        type: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      const newDbExp = await addElecIdWorkHistory({
        profile_id: profile.id,
        employer_name: formData.employerName,
        job_title: formData.jobTitle,
        location: formData.location || null,
        start_date: formData.startDate,
        end_date: isCurrent ? null : formData.endDate || null,
        is_current: isCurrent,
        description: formData.description || null,
        projects: null,
        is_verified: false,
        verified_by_employer: false,
      });

      const newExp: WorkExperience = {
        id: newDbExp.id,
        employerName: formData.employerName,
        jobTitle: formData.jobTitle,
        location: formData.location || undefined,
        startDate: formData.startDate,
        endDate: isCurrent ? undefined : formData.endDate || undefined,
        isCurrent,
        description: formData.description || undefined,
        isVerified: false,
        verifiedByEmployer: false,
      };

      setWorkHistory((prev) => [newExp, ...prev]);
      setIsAddSheetOpen(false);
      resetForm();

      addNotification({
        title: 'Experience added',
        message: `${formData.employerName} has been added to your work history.`,
        type: 'success',
      });
    } catch (error) {
      console.error('Error adding experience:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to add experience. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditExperience = async () => {
    if (!editingExp) return;
    setIsLoading(true);

    try {
      await updateElecIdWorkHistory(editingExp.id, {
        employer_name: formData.employerName,
        job_title: formData.jobTitle,
        location: formData.location || null,
        start_date: formData.startDate,
        end_date: isCurrent ? null : formData.endDate || null,
        is_current: isCurrent,
        description: formData.description || null,
      });

      setWorkHistory((prev) =>
        prev.map((exp) =>
          exp.id === editingExp.id
            ? {
                ...exp,
                employerName: formData.employerName,
                jobTitle: formData.jobTitle,
                location: formData.location || undefined,
                startDate: formData.startDate,
                endDate: isCurrent ? undefined : formData.endDate || undefined,
                isCurrent,
                description: formData.description || undefined,
              }
            : exp
        )
      );

      setIsEditSheetOpen(false);
      setEditingExp(null);
      resetForm();

      addNotification({
        title: 'Experience updated',
        message: 'Your work experience has been updated.',
        type: 'success',
      });
    } catch (error) {
      console.error('Error updating experience:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to update experience. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExperience = async () => {
    if (!deleteConfirm.id) return;
    setIsLoading(true);

    try {
      await deleteElecIdWorkHistory(deleteConfirm.id);

      const deletedExp = workHistory.find((e) => e.id === deleteConfirm.id);
      setWorkHistory((prev) => prev.filter((e) => e.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });

      addNotification({
        title: 'Experience removed',
        message: deletedExp
          ? `${deletedExp.employerName} has been removed from your history.`
          : 'Experience has been removed.',
        type: 'info',
      });
    } catch (error) {
      console.error('Error deleting experience:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to delete experience. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditSheet = (exp: WorkExperience) => {
    setEditingExp(exp);
    setFormData({
      employerName: exp.employerName,
      jobTitle: exp.jobTitle,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      description: exp.description || '',
    });
    setIsCurrent(exp.isCurrent);
    setIsEditSheetOpen(true);
  };

  const resetForm = () => {
    setFormData({
      employerName: '',
      jobTitle: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setIsCurrent(false);
  };

  const formatDateRange = (start: string, end?: string, current?: boolean) => {
    const startDate = new Date(start).toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
    });
    if (current) return `${startDate} – Present`;
    if (!end) return startDate;
    const endDate = new Date(end).toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
    });
    return `${startDate} – ${endDate}`;
  };

  const calculateDuration = (start: string, end?: string) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
      startDate.getMonth();
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} mo`;
    if (remainingMonths === 0) return `${years} yr${years !== 1 ? 's' : ''}`;
    return `${years}y ${remainingMonths}m`;
  };

  const jobTitlesByCategory = UK_JOB_TITLES.reduce(
    (acc, title) => {
      if (!acc[title.category]) acc[title.category] = [];
      acc[title.category].push(title);
      return acc;
    },
    {} as Record<string, typeof UK_JOB_TITLES>
  );

  const FormContent = () => (
    <div className="space-y-5">
      <div className="space-y-3">
        <Eyebrow>Company</Eyebrow>
        <Input
          value={formData.employerName}
          onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
          placeholder="Company name"
          className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-white placeholder:text-white"
        />
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Location (e.g. London, Remote)"
          className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-white placeholder:text-white"
        />
      </div>

      <div className="space-y-3">
        <Eyebrow>Your role</Eyebrow>
        <div className="max-h-[200px] overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.02]">
          {Object.entries(jobTitlesByCategory).map(([category, titles], catIndex) => (
            <div key={category}>
              {catIndex > 0 && <div className="h-px bg-white/[0.06]" />}
              <div className="sticky top-0 z-10 px-4 py-2 bg-[hsl(0_0%_12%)] border-b border-white/[0.06]">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                  {category}
                </span>
              </div>
              <div className="p-2">
                {titles.map((title) => (
                  <button
                    key={title.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, jobTitle: title.value })}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg transition-all touch-manipulation text-left',
                      formData.jobTitle === title.value
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'hover:bg-white/[0.04]'
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'h-4 w-4 rounded-full border flex items-center justify-center shrink-0',
                        formData.jobTitle === title.value
                          ? 'bg-blue-400 border-blue-400'
                          : 'border-white/[0.2]'
                      )}
                    >
                      {formData.jobTitle === title.value && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span
                      className={cn(
                        'text-sm',
                        formData.jobTitle === title.value ? 'font-medium text-white' : 'text-white'
                      )}
                    >
                      {title.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Eyebrow>Employment period</Eyebrow>

        <button
          type="button"
          onClick={() => setIsCurrent(!isCurrent)}
          className={cn(
            'w-full flex items-center gap-4 p-4 rounded-xl border transition-all touch-manipulation text-left',
            isCurrent
              ? 'bg-emerald-500/10 border-emerald-500/20'
              : 'bg-white/[0.04] border-white/[0.06]'
          )}
        >
          <div className="flex-1">
            <p className={cn('font-medium', isCurrent ? 'text-emerald-400' : 'text-white')}>
              Current position
            </p>
            <p className="text-xs text-white">
              {isCurrent ? "You're still working here" : 'Toggle if this is your current role'}
            </p>
          </div>
          <div
            className={cn(
              'w-11 h-6 rounded-full p-0.5 transition-all',
              isCurrent ? 'bg-emerald-500' : 'bg-white/[0.15]'
            )}
          >
            <div
              className={cn(
                'w-5 h-5 rounded-full bg-white transition-transform',
                isCurrent ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </div>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-white">Started</Label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="h-11 bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-sm text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-white">{isCurrent ? 'Present' : 'Ended'}</Label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              disabled={isCurrent}
              className={cn(
                'h-11 bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-sm text-white',
                isCurrent && 'opacity-40 cursor-not-allowed'
              )}
            />
          </div>
        </div>

        {formData.startDate && (
          <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <span className="text-sm text-white">Duration</span>
            <span className="text-sm font-semibold text-elec-yellow tabular-nums">
              {calculateDuration(formData.startDate, isCurrent ? undefined : formData.endDate)}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Eyebrow>Description (optional)</Eyebrow>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your key responsibilities, projects, and achievements…"
          className="bg-white/[0.04] border-white/[0.06] rounded-xl touch-manipulation text-sm min-h-[120px] resize-none text-white placeholder:text-white"
        />
        <p className="text-xs text-white">
          Tip: mention specific projects, certifications earned, or skills developed.
        </p>
      </div>
    </div>
  );

  const formFooter = (isEdit: boolean, onClose: () => void) => (
    <div className="flex gap-3">
      <button
        className="flex-1 h-11 rounded-xl border border-white/[0.06] text-white touch-manipulation disabled:opacity-60"
        onClick={() => {
          onClose();
          resetForm();
        }}
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        className="flex-1 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-60"
        onClick={isEdit ? handleEditExperience : handleAddExperience}
        disabled={
          !formData.employerName || !formData.jobTitle || !formData.startDate || isLoading
        }
      >
        {isLoading ? (isEdit ? 'Saving…' : 'Adding…') : isEdit ? 'Save changes' : 'Add experience'}
      </button>
    </div>
  );

  if (isFetching) return <ExperienceSkeleton />;

  return (
    <div className="space-y-5">
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete work experience?"
        description="This will permanently remove this position from your Elec-ID profile. This action cannot be undone."
        onConfirm={handleDeleteExperience}
        isLoading={isLoading}
      />

      {/* Add */}
      {isMobile ? (
        <Drawer.Root
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[92vh] bg-[hsl(0_0%_12%)] rounded-t-2xl border-t border-white/[0.06]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
              </div>
              <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06]">
                <Drawer.Title className="text-lg font-semibold text-white">
                  Add work experience
                </Drawer.Title>
                <button
                  onClick={() => {
                    setIsAddSheetOpen(false);
                    resetForm();
                  }}
                  className="h-11 w-11 -mr-2 rounded-full hover:bg-white/[0.04] text-white touch-manipulation flex items-center justify-center text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <FormContent />
              </div>
              <div className="p-5 border-t border-white/[0.06]">
                {formFooter(false, () => setIsAddSheetOpen(false))}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Add work experience</DialogTitle>
            </DialogHeader>
            <FormContent />
            <div className="pt-4">{formFooter(false, () => setIsAddSheetOpen(false))}</div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit */}
      {isMobile ? (
        <Drawer.Root
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          shouldScaleBackground={false}
          noBodyStyles
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[92vh] bg-[hsl(0_0%_12%)] rounded-t-2xl border-t border-white/[0.06]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/[0.15]" />
              </div>
              <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06]">
                <Drawer.Title className="text-lg font-semibold text-white">
                  Edit work experience
                </Drawer.Title>
                <button
                  onClick={() => {
                    setIsEditSheetOpen(false);
                    resetForm();
                  }}
                  className="h-11 w-11 -mr-2 rounded-full hover:bg-white/[0.04] text-white touch-manipulation flex items-center justify-center text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <FormContent />
              </div>
              <div className="p-5 border-t border-white/[0.06]">
                {formFooter(true, () => setIsEditSheetOpen(false))}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Edit work experience</DialogTitle>
            </DialogHeader>
            <FormContent />
            <div className="pt-4">{formFooter(true, () => setIsEditSheetOpen(false))}</div>
          </DialogContent>
        </Dialog>
      )}

      <SectionHeader
        eyebrow="Career"
        title="Work history"
        action="Add experience"
        onAction={() => setIsAddSheetOpen(true)}
      />

      <p className="text-sm text-white">
        {workHistory.length} position{workHistory.length !== 1 ? 's' : ''} recorded
      </p>

      {workHistory.length > 0 ? (
        <div className="relative pl-6">
          <div className="absolute left-2 top-4 bottom-4 w-px bg-white/[0.12] rounded-full" />

          <AnimatePresence mode="popLayout">
            {workHistory.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.04 }}
                className="relative mb-4 last:mb-0"
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-[-13px] w-3 h-3 rounded-full top-6',
                    exp.isCurrent ? 'bg-elec-yellow' : 'bg-white/[0.2]'
                  )}
                />

                <div
                  className={cn(
                    'ml-3 rounded-2xl border overflow-hidden transition-all',
                    exp.isCurrent
                      ? 'bg-[hsl(0_0%_12%)] border-elec-yellow/20'
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.06]'
                  )}
                >
                  {exp.isCurrent && (
                    <div className="px-4 py-2 bg-elec-yellow/10 border-b border-elec-yellow/20 flex items-center justify-between">
                      <span className="text-xs font-semibold text-elec-yellow">
                        Current position
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-elec-yellow">
                        Active
                      </span>
                    </div>
                  )}

                  {exp.verifiedByEmployer && !exp.isCurrent && (
                    <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20">
                      <span className="text-xs font-semibold text-emerald-400">
                        Verified by employer
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => openEditSheet(exp)}
                    className="w-full text-left p-5 touch-manipulation hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-white text-base truncate">
                          {getJobTitleLabel(exp.jobTitle)}
                        </h4>
                        <p className="text-sm text-white mt-0.5 truncate">{exp.employerName}</p>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border tabular-nums',
                          exp.isCurrent
                            ? 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20'
                            : 'bg-white/[0.04] text-white border-white/[0.06]'
                        )}
                      >
                        {calculateDuration(exp.startDate, exp.isCurrent ? undefined : exp.endDate)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 text-xs text-white">
                      <span>{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>

                    {exp.description && (
                      <p className="text-sm text-white mt-3 line-clamp-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 flex-wrap mt-3">
                      {exp.verifiedByEmployer ? (
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                          Verified
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-400">
                          Self-reported
                        </span>
                      )}
                    </div>
                  </button>

                  <div className="flex items-center justify-between px-5 py-2 border-t border-white/[0.06]">
                    <button
                      className="h-11 px-3 text-xs rounded-lg hover:bg-white/[0.04] text-white touch-manipulation"
                      onClick={() => openEditSheet(exp)}
                    >
                      Edit details
                    </button>
                    <button
                      className="h-11 px-3 text-xs rounded-lg text-red-400 hover:bg-red-500/10 touch-manipulation"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm({ open: true, id: exp.id });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState
          title="Build your career timeline"
          description="Add your work experience to create a professional timeline that employers can verify."
          action="Add your first position"
          onAction={() => setIsAddSheetOpen(true)}
        />
      )}
    </div>
  );
};

export default ElecIdExperience;
