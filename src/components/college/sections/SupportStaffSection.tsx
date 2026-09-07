/**
 * SupportStaffSection — assessors, admin, IQA and support staff, on the
 * shared hub language. Content only; the masthead is CollegeDashboard's.
 *
 * Status is compared case-insensitively: `college_staff.status` holds both
 * 'Active' and 'active' in the live table. Role chips cover every role the
 * DB check constraint allows for non-teaching staff (admin, assessor, iqa,
 * support) — the TS `StaffRole` type is narrower than the column, which is
 * why the filter compares as a string.
 */
import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getRoleLabel } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { containerVariants, itemVariants } from '@/components/college/primitives';

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[12.5px] transition-colors touch-manipulation';
const CHIP_ON = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const CHIP_OFF = 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.10]';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-60 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] touch-manipulation sm:w-auto';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();

const ROLE_CHIPS: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'admin', label: 'Admin' },
  { value: 'assessor', label: 'Assessors' },
  { value: 'iqa', label: 'IQA' },
  { value: 'support', label: 'Support' },
];

export function SupportStaffSection() {
  const { staff, isLoading } = useCollegeSupabase();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addStaffOpen, setAddStaffOpen] = useState(false);

  const handleSelectStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setDetailOpen(true);
  };
  const handleEditStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setDetailOpen(false);
    setEditOpen(true);
  };

  const supportStaff = useMemo(
    () =>
      staff.filter(
        (s) =>
          s.role !== 'tutor' && s.role !== 'head_of_department' && norm(s.status) !== 'archived'
      ),
    [staff]
  );

  const filteredStaff = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return supportStaff.filter((member) => {
      const matchesSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q) ||
        (member.department ?? '').toLowerCase().includes(q);
      const matchesFilter = filterRole === 'all' || (member.role as string) === filterRole;
      return matchesSearch && matchesFilter;
    });
  }, [supportStaff, searchQuery, filterRole]);

  const countForRole = (role: string) =>
    role === 'all'
      ? supportStaff.length
      : supportStaff.filter((s) => (s.role as string) === role).length;

  // Invalidate every active query — the context has no refetch and the old
  // handler only slept 800ms.
  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
  };

  const hasActiveFilters = !!searchQuery || filterRole !== 'all';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <motion.div variants={itemVariants}>
        <button type="button" onClick={() => setAddStaffOpen(true)} className={PRIMARY}>
          Add staff member
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name, email or department…"
          aria-label="Search support staff"
          className={SEARCH}
        />
        <div className="flex flex-wrap gap-2">
          {ROLE_CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilterRole(chip.value)}
              className={cn(CHIP, filterRole === chip.value ? CHIP_ON : CHIP_OFF)}
            >
              {chip.label}
              <span className="tabular-nums opacity-70">{countForRole(chip.value)}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>Assessors, admin and IQA</HubSectionHeading>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {filteredStaff.length === supportStaff.length
              ? `${supportStaff.length} on the team`
              : `${filteredStaff.length} of ${supportStaff.length}`}
          </span>
        </div>

        {isLoading ? (
          <StaffCardSkeletonList count={3} />
        ) : (
          <PullToRefresh onRefresh={handleRefresh}>
            <div className={LIST_CARD}>
              {filteredStaff.length === 0 ? (
                <div className="px-4 py-5 sm:px-5">
                  <p className="text-[14px] font-semibold text-white">
                    {supportStaff.length === 0
                      ? 'No support staff yet'
                      : hasActiveFilters
                        ? 'Nobody matches'
                        : 'No support staff'}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-snug text-white">
                    {supportStaff.length === 0
                      ? 'Add an assessor, administrator or internal quality assurer above.'
                      : 'Clear the search or pick another chip.'}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-white/[0.10]">
                  {filteredStaff.map((member) => {
                    const status = norm(member.status);
                    const reason = [
                      getRoleLabel(member.role),
                      member.department,
                      member.assessor_qual,
                      member.iqa_qual,
                      status && status !== 'active' ? member.status : null,
                    ]
                      .filter(Boolean)
                      .join(' · ');
                    return (
                      <li key={member.id} className="flex items-center gap-2 pr-2 sm:pr-3">
                        <button
                          type="button"
                          onClick={() => handleSelectStaff(member)}
                          className="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-4 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:pl-5"
                        >
                          <span
                            aria-hidden
                            className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                              {member.name}
                            </span>
                            <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                              {reason}
                            </span>
                          </span>
                          <span className="hidden max-w-[220px] shrink-0 truncate text-[12px] text-white sm:inline">
                            {member.email}
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                        </button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label={`More actions for ${member.name}`}
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                            >
                              <span className="text-[15px] font-semibold tracking-[0.12em]">⋯</span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="min-w-[180px]">
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() => handleSelectStaff(member)}
                            >
                              Open profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              disabled={!member.phone}
                              onClick={() => {
                                if (member.phone) window.location.href = `tel:${member.phone}`;
                              }}
                            >
                              {member.phone ? `Call · ${member.phone}` : 'No phone on file'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="h-11 touch-manipulation"
                              onClick={() => {
                                window.location.href = `mailto:${member.email}`;
                              }}
                            >
                              Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </PullToRefresh>
        )}
      </motion.section>

      <AddTutorDialog open={addStaffOpen} onOpenChange={setAddStaffOpen} />
      <StaffDetailSheet
        staff={selectedStaff}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEditStaff}
      />
      <EditStaffSheet staff={selectedStaff} open={editOpen} onOpenChange={setEditOpen} />
    </motion.div>
  );
}
