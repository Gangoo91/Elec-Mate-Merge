/**
 * SupportStaffSection — assessors, admin, IQA and support staff (College Hub
 * kit, 7 Oct 2026). Header with "?" → figures by role → search and role
 * chips → one row per person. Tapping a row opens the staff sheet.
 *
 * Status is compared case-insensitively: `college_staff.status` holds both
 * 'Active' and 'active'. Role chips cover every role the DB allows for
 * non-teaching staff (admin, assessor, iqa, support); the TS `StaffRole`
 * type is narrower than the column, which is why the filter compares as a
 * string.
 */
import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getRoleLabel } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import { FilterChips, NameBadge, PeopleRow, SEARCH_CN, isSupportStaff, norm } from '@/components/college/people/peopleKit';

const HELP: PageHelpContent = {
  id: 'college-support-staff',
  title: 'Support staff',
  what: 'Everyone who is not teaching: assessors, internal quality assurers (IQA), administrators and learner support.',
  steps: [
    { title: 'Add someone', body: 'Add staff member takes a name, email and role. Finish their qualifications from their profile.' },
    { title: 'Filter by role', body: 'The chips narrow the list to assessors, IQA, admin or support.' },
    { title: 'Open a profile', body: 'Tap a row for their details, qualifications and contact. Compliance checks are in the ⋯ menu.' },
  ],
  notes: [
    { title: 'Assessors and IQA', body: 'An assessor or IQA needs their qualification on file (for example TAQA, IQA award) before they sign off evidence. Put it on their profile.' },
  ],
};

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
  // ELE-1898: adding staff shows only for people the database lets add staff.
  const { can } = useCollegeCan();
  const canManageStaff = can('staff.manage');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [complianceId, setComplianceId] = useState<string | null>(null);

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
      staff.filter(isSupportStaff),
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

  const missingQual = supportStaff.filter(
    (m) => ((m.role as string) === 'assessor' && !m.assessor_qual) || ((m.role as string) === 'iqa' && !m.iqa_qual)
  ).length;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8">
      <CollegePageHeader
        eyebrow="People"
        title="Support staff"
        description="Assessors, IQA, administrators and learner support: everyone who is not teaching."
        help={HELP}
        actions={
          canManageStaff ? (
            <button type="button" onClick={() => setAddStaffOpen(true)} className={COLLEGE_BTN_PRIMARY}>
              Add staff member
            </button>
          ) : undefined
        }
      />

      <CollegeStats
        items={[
          { label: 'Support staff', value: String(supportStaff.length), sub: 'Not teaching', onClick: () => setFilterRole('all') },
          { label: 'Assessors', value: String(countForRole('assessor')), sub: 'Sign off evidence', onClick: () => setFilterRole('assessor') },
          { label: 'IQA', value: String(countForRole('iqa')), sub: 'Sample and check assessments', onClick: () => setFilterRole('iqa') },
          {
            label: 'Qualification missing',
            value: String(missingQual),
            sub: missingQual > 0 ? 'Assessor or IQA award not on file' : 'Every assessor and IQA has one',
            warn: missingQual > 0,
          },
        ]}
      />

      <motion.div variants={itemVariants} className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name, email or department…"
          aria-label="Search support staff"
          className={cn(SEARCH_CN, 'lg:max-w-md')}
        />
        <FilterChips
          label="Role"
          value={filterRole}
          onChange={setFilterRole}
          items={ROLE_CHIPS.map((c) => ({ ...c, count: countForRole(c.value) }))}
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle
          title="Assessors, admin and IQA"
          sub={filteredStaff.length === supportStaff.length ? `${supportStaff.length} on the team` : `${filteredStaff.length} of ${supportStaff.length} shown`}
        />
        {isLoading ? (
          <StaffCardSkeletonList count={3} />
        ) : filteredStaff.length === 0 ? (
          <CollegeEmpty
            title={supportStaff.length === 0 ? 'No support staff yet' : hasActiveFilters ? 'Nobody matches' : 'No support staff'}
            body={supportStaff.length === 0 ? 'Add an assessor, administrator or internal quality assurer.' : 'Clear the search or pick another chip.'}
            action={
              supportStaff.length === 0 && canManageStaff ? (
                <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => setAddStaffOpen(true)}>
                  Add staff member
                </button>
              ) : undefined
            }
          />
        ) : (
          <PullToRefresh onRefresh={handleRefresh}>
            <div className={COLLEGE_LIST}>
              <ul className="divide-y divide-white/[0.06]">
                {filteredStaff.map((member) => {
                  const status = norm(member.status);
                  const role = member.role as string;
                  const noQual = (role === 'assessor' && !member.assessor_qual) || (role === 'iqa' && !member.iqa_qual);
                  const sub = [getRoleLabel(member.role), member.department, member.assessor_qual, member.iqa_qual, member.email]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <PeopleRow
                      key={member.id}
                      title={member.name}
                      badge={
                        status && status !== 'active' ? (
                          <NameBadge>{member.status}</NameBadge>
                        ) : noQual ? (
                          <NameBadge tone="warn">No qualification on file</NameBadge>
                        ) : undefined
                      }
                      sub={sub}
                      tone={noQual ? 'warn' : 'quiet'}
                      onOpen={() => handleSelectStaff(member)}
                      menu={[
                        { label: 'Open profile', onClick: () => handleSelectStaff(member) },
                        {
                          label: member.phone ? `Call · ${member.phone}` : 'No phone on file',
                          disabled: !member.phone,
                          separated: true,
                          onClick: () => {
                            if (member.phone) window.location.href = `tel:${member.phone}`;
                          },
                        },
                        { label: 'Email', onClick: () => (window.location.href = `mailto:${member.email}`) },
                        { label: 'Compliance checks', separated: true, onClick: () => setComplianceId(member.id) },
                      ]}
                    />
                  );
                })}
              </ul>
            </div>
          </PullToRefresh>
        )}
      </motion.section>

      <AddTutorDialog open={addStaffOpen} onOpenChange={setAddStaffOpen} />
      <StaffDetailSheet staff={selectedStaff} open={detailOpen} onOpenChange={setDetailOpen} onEdit={handleEditStaff} />
      <EditStaffSheet staff={selectedStaff} open={editOpen} onOpenChange={setEditOpen} />
      <StaffComplianceDrawer
        open={!!complianceId}
        onOpenChange={(o) => {
          if (!o) setComplianceId(null);
        }}
        staffId={complianceId}
      />
    </motion.div>
  );
}
