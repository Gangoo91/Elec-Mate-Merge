import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getInitials } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PeopleListRow,
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

                  const statusTone =
                    tutor.status === 'Active'
                      ? 'green'
                      : tutor.status === 'On Leave'
                        ? 'amber'
                        : 'red';

                  return (
                    <PeopleListRow
                      key={tutor.id}
                      id={tutor.id}
                      lead={
                        batchMode
                          ? { kind: 'checkbox', checked: isSelected }
                          : {
                              kind: 'avatar',
                              name: tutor.name,
                              photoUrl: tutor.photo_url,
                              ringTone: 'blue',
                            }
                      }
                      title={tutor.name}
                      titleChips={
                        cohortCount > 0 ? (
                          <Pill tone="blue">
                            {cohortCount} cohort{cohortCount !== 1 ? 's' : ''}
                          </Pill>
                        ) : null
                      }
                      subtitle={tutor.department ?? 'Tutor'}
                      meta={
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-white/70">
                          {tutor.specialisations?.length
                            ? tutor.specialisations
                                .slice(0, 3)
                                .map((s, i) => (
                                  <span
                                    key={i}
                                    className="text-[11px] text-white/70 bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5"
                                  >
                                    {s}
                                  </span>
                                ))
                            : null}
                          {tutor.specialisations && tutor.specialisations.length > 3 && (
                            <span className="text-[11px] text-white/50">
                              +{tutor.specialisations.length - 3}
                            </span>
                          )}
                          {tutor.max_teaching_hours && (
                            <span className="tabular-nums">
                              {tutor.max_teaching_hours}h/wk
                            </span>
                          )}
                          {tutor.teaching_qual && (
                            <Pill tone="green">{tutor.teaching_qual}</Pill>
                          )}
                          {tutor.assessor_qual && (
                            <Pill tone="blue">{tutor.assessor_qual}</Pill>
                          )}
                          {tutor.iqa_qual && <Pill tone="amber">{tutor.iqa_qual}</Pill>}
                        </div>
                      }
                      status={{ label: tutor.status, tone: statusTone }}
                      selected={isSelected}
                      onOpen={() => handleSelectStaff(tutor)}
                      onLongPress={() => handleLongPress(tutor.id)}
                      actions={[
                        {
                          label: 'Open profile',
                          onClick: () => handleSelectStaff(tutor),
                        },
                        {
                          label: tutor.phone ? `Call · ${tutor.phone}` : 'Call',
                          onClick: () => {
                            if (tutor.phone) window.location.href = `tel:${tutor.phone}`;
                          },
                          disabled: !tutor.phone,
                          divider: true,
                        },
                        {
                          label: 'Email',
                          onClick: () => {
                            window.location.href = `mailto:${tutor.email}`;
                          },
                        },
                      ]}
                    />
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
