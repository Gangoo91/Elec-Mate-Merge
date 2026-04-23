import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getInitials } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  ListCard,
  Pill,
  EmptyState,
  FilterBar,
  itemVariants,
} from '@/components/college/primitives';

export function TutorsSection() {
  const { staff, cohorts, isLoading } = useCollegeSupabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [addTutorOpen, setAddTutorOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectStaff = (member: CollegeStaff) => {
    if (batchMode) {
      toggleSelection(member.id);
      return;
    }
    setSelectedStaff(member);
    setDetailOpen(true);
  };
  const handleEditStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setDetailOpen(false);
    setEditOpen(true);
  };
  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleLongPress = useCallback(
    (id: string) => {
      if (!batchMode) {
        setBatchMode(true);
        setSelectedIds(new Set([id]));
      }
    },
    [batchMode]
  );
  const exitBatchMode = () => {
    setBatchMode(false);
    setSelectedIds(new Set());
  };

  const tutors = useMemo(
    () =>
      staff.filter(
        (s) => (s.role === 'tutor' || s.role === 'head_of_department') && s.status !== 'Archived'
      ),
    [staff]
  );

  const filteredTutors = useMemo(
    () =>
      tutors.filter((tutor) => {
        const matchesSearch =
          tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (tutor.department ?? '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterRole === 'all' || tutor.role === filterRole;
        return matchesSearch && matchesFilter;
      }),
    [tutors, searchQuery, filterRole]
  );

  const getCohortCount = (staffId: string): number =>
    cohorts.filter((c) => c.tutor_id === staffId && c.status === 'Active').length;

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const hasActiveFilters = searchQuery || filterRole !== 'all';

  return (
    <PageFrame>
      {/* HERO */}
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="People · Tutors"
          title="Teaching staff"
          description={`${tutors.length} tutor${tutors.length === 1 ? '' : 's'} in the department.`}
          tone="blue"
          actions={
            <button
              onClick={() => setAddTutorOpen(true)}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Add tutor →
            </button>
          }
        />
      </motion.div>

      {/* FILTER BAR */}
      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: tutors.length },
            { value: 'tutor', label: 'Tutors', count: tutors.filter((t) => t.role === 'tutor').length },
            {
              value: 'head_of_department',
              label: 'Heads',
              count: tutors.filter((t) => t.role === 'head_of_department').length,
            },
          ]}
          activeTab={filterRole}
          onTabChange={setFilterRole}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search name, email, department…"
        />
      </motion.div>

      {/* LIST */}
      {isLoading ? (
        <StaffCardSkeletonList count={3} />
      ) : (
        <PullToRefresh onRefresh={handleRefresh}>
          {filteredTutors.length === 0 ? (
            <EmptyState
              title="No tutors found"
              description={
                hasActiveFilters
                  ? 'Try adjusting your search or filters.'
                  : 'Get started by adding your first tutor.'
              }
              action={hasActiveFilters ? undefined : 'Add tutor'}
              onAction={() => setAddTutorOpen(true)}
            />
          ) : (
            <motion.div variants={itemVariants}>
              <ListCard>
                {filteredTutors.map((tutor) => {
                  const cohortCount = getCohortCount(tutor.id);
                  const isSelected = selectedIds.has(tutor.id);

                  return (
                    <SwipeableCard
                      key={tutor.id}
                      onTap={() => handleSelectStaff(tutor)}
                      onLongPress={() => handleLongPress(tutor.id)}
                      selected={isSelected}
                      rightActions={[
                        {
                          label: 'Call',
                          onClick: () => {
                            if (tutor.phone) window.location.href = `tel:${tutor.phone}`;
                          },
                          className: 'bg-emerald-500/90 text-white',
                        },
                        {
                          label: 'Email',
                          onClick: () => {
                            window.location.href = `mailto:${tutor.email}`;
                          },
                          className: 'bg-blue-500/90 text-white',
                        },
                      ]}
                    >
                      <button
                        onClick={() => handleSelectStaff(tutor)}
                        className={cn(
                          'group w-full flex items-start gap-4 px-5 sm:px-6 py-5 text-left touch-manipulation transition-colors',
                          isSelected ? 'bg-blue-500/10' : 'hover:bg-[hsl(0_0%_15%)]'
                        )}
                      >
                        {batchMode ? (
                          <div
                            className={cn(
                              'h-10 w-10 shrink-0 rounded-full flex items-center justify-center border-2 transition-colors',
                              isSelected
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'border-white/20'
                            )}
                          >
                            {isSelected && (
                              <span className="text-[14px] font-semibold">✓</span>
                            )}
                          </div>
                        ) : (
                          <Avatar className="h-10 w-10 shrink-0 ring-1 ring-white/[0.08]">
                            <AvatarImage src={tutor.photo_url ?? undefined} />
                            <AvatarFallback className="bg-blue-500/10 text-blue-400 text-xs font-semibold">
                              {getInitials(tutor.name)}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[15px] font-medium text-white truncate">
                                {tutor.name}
                              </div>
                              <div className="mt-0.5 text-[11.5px] text-white/75 truncate">
                                {tutor.department ?? 'Tutor'}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {cohortCount > 0 && (
                                <Pill tone="blue">
                                  {cohortCount} cohort{cohortCount !== 1 ? 's' : ''}
                                </Pill>
                              )}
                              <Pill
                                tone={
                                  tutor.status === 'Active'
                                    ? 'green'
                                    : tutor.status === 'On Leave'
                                      ? 'amber'
                                      : 'red'
                                }
                              >
                                {tutor.status}
                              </Pill>
                            </div>
                          </div>

                          {tutor.specialisations && tutor.specialisations.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {tutor.specialisations.slice(0, 4).map((spec, i) => (
                                <span
                                  key={i}
                                  className="text-[11px] text-white/60 bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5"
                                >
                                  {spec}
                                </span>
                              ))}
                              {tutor.specialisations.length > 4 && (
                                <span className="text-[11px] text-white/70 px-1.5 py-0.5">
                                  +{tutor.specialisations.length - 4}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-white/75">
                            <span className="truncate max-w-[200px]">{tutor.email}</span>
                            {tutor.phone && <span>{tutor.phone}</span>}
                            {tutor.max_teaching_hours && (
                              <span className="tabular-nums">
                                {tutor.max_teaching_hours}h/week
                              </span>
                            )}
                          </div>

                          {(tutor.teaching_qual || tutor.assessor_qual || tutor.iqa_qual) && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {tutor.teaching_qual && (
                                <Pill tone="green">{tutor.teaching_qual}</Pill>
                              )}
                              {tutor.assessor_qual && (
                                <Pill tone="blue">{tutor.assessor_qual}</Pill>
                              )}
                              {tutor.iqa_qual && <Pill tone="amber">{tutor.iqa_qual}</Pill>}
                            </div>
                          )}
                        </div>
                      </button>
                    </SwipeableCard>
                  );
                })}
              </ListCard>
            </motion.div>
          )}
        </PullToRefresh>
      )}

      {/* BATCH BAR */}
      {batchMode && selectedIds.size > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
            <p className="text-sm text-white font-medium tabular-nums">
              {selectedIds.size} selected
            </p>
            <button
              onClick={exitBatchMode}
              className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <AddTutorDialog open={addTutorOpen} onOpenChange={setAddTutorOpen} />
      <StaffDetailSheet
        staff={selectedStaff}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEditStaff}
      />
      <EditStaffSheet staff={selectedStaff} open={editOpen} onOpenChange={setEditOpen} />
    </PageFrame>
  );
}
