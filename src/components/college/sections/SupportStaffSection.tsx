import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getInitials, getRoleLabel } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PeopleListRow,
  PageHero,
  ListCard,
  Pill,
  EmptyState,
  FilterBar,
  itemVariants,
} from '@/components/college/primitives';

export function SupportStaffSection() {
  const { staff, isLoading } = useCollegeSupabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
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

  const supportStaff = useMemo(
    () =>
      staff.filter(
        (s) => s.role !== 'tutor' && s.role !== 'head_of_department' && s.status !== 'Archived'
      ),
    [staff]
  );

  const filteredStaff = useMemo(
    () =>
      supportStaff.filter((member) => {
        const matchesSearch =
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (member.department ?? '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterRole === 'all' || member.role === filterRole;
        return matchesSearch && matchesFilter;
      }),
    [supportStaff, searchQuery, filterRole]
  );

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const hasActiveFilters = searchQuery || filterRole !== 'all';

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="People · Support Staff"
          title="Assessors, admin & IQA"
          description={`${supportStaff.length} support staff member${supportStaff.length === 1 ? '' : 's'}.`}
          tone="cyan"
          actions={
            <button
              onClick={() => setAddStaffOpen(true)}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Add staff →
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: supportStaff.length },
            {
              value: 'admin',
              label: 'Admin',
              count: supportStaff.filter((s) => s.role === 'admin').length,
            },
            {
              value: 'assessor',
              label: 'Assessors',
              count: supportStaff.filter((s) => s.role === 'assessor').length,
            },
            {
              value: 'iqa',
              label: 'IQA',
              count: supportStaff.filter((s) => s.role === 'iqa').length,
            },
            {
              value: 'support',
              label: 'Support',
              count: supportStaff.filter((s) => s.role === 'support').length,
            },
          ]}
          activeTab={filterRole}
          onTabChange={setFilterRole}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search name, email, department…"
        />
      </motion.div>

      {isLoading ? (
        <StaffCardSkeletonList count={3} />
      ) : (
        <PullToRefresh onRefresh={handleRefresh}>
          {filteredStaff.length === 0 ? (
            <EmptyState
              title="No support staff found"
              description={
                hasActiveFilters
                  ? 'Try adjusting your search or filters.'
                  : 'No support staff members have been added yet.'
              }
            />
          ) : (
            <motion.div variants={itemVariants}>
              <ListCard>
                {filteredStaff.map((member) => {
                  const isSelected = selectedIds.has(member.id);
                  const statusTone =
                    member.status === 'Active'
                      ? 'green'
                      : member.status === 'On Leave'
                        ? 'amber'
                        : 'red';
                  return (
                    <PeopleListRow
                      key={member.id}
                      id={member.id}
                      lead={
                        batchMode
                          ? { kind: 'checkbox', checked: isSelected }
                          : {
                              kind: 'avatar',
                              name: member.name,
                              photoUrl: member.photo_url,
                              ringTone: 'blue',
                            }
                      }
                      title={member.name}
                      titleChips={<Pill tone="cyan">{getRoleLabel(member.role)}</Pill>}
                      subtitle={member.department ?? getRoleLabel(member.role)}
                      meta={
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-white">
                          <span className="truncate max-w-[220px]">{member.email}</span>
                          {member.phone && <span>{member.phone}</span>}
                          {member.assessor_qual && (
                            <Pill tone="blue">{member.assessor_qual}</Pill>
                          )}
                          {member.iqa_qual && <Pill tone="amber">{member.iqa_qual}</Pill>}
                        </div>
                      }
                      status={{ label: member.status, tone: statusTone }}
                      selected={isSelected}
                      onOpen={() => handleSelectStaff(member)}
                      onLongPress={() => handleLongPress(member.id)}
                      actions={[
                        { label: 'Open profile', onClick: () => handleSelectStaff(member) },
                        {
                          label: member.phone ? `Call · ${member.phone}` : 'Call',
                          onClick: () => {
                            if (member.phone) window.location.href = `tel:${member.phone}`;
                          },
                          disabled: !member.phone,
                          divider: true,
                        },
                        {
                          label: 'Email',
                          onClick: () => {
                            window.location.href = `mailto:${member.email}`;
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

      {batchMode && selectedIds.size > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-sm border-t border-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
            <p className="text-sm text-white font-medium tabular-nums">
              {selectedIds.size} selected
            </p>
            <button
              onClick={exitBatchMode}
              className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <AddTutorDialog open={addStaffOpen} onOpenChange={setAddStaffOpen} />
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
