/**
 * StaffRoleFields — role picker, duty flags and the plain-English "what this
 * role can do" summary for the staff sheets (ELE-1898).
 *
 * The summary is read from the database matrix (get_college_role_matrix), the
 * same table college_can() and RLS read, so what the sheet promises is what
 * the role will actually be allowed to do.
 */
import { cn } from '@/lib/utils';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { labelCn } from '@/components/forms/fieldStyles';
import {
  COLLEGE_ROLE_LABELS,
  PRIVILEGED_COLLEGE_ROLES,
  useCollegeRoleMatrix,
  type CollegeStaffRoleKey,
} from '@/hooks/useCollegeCan';

export const STAFF_ROLE_ORDER: CollegeStaffRoleKey[] = [
  'tutor',
  'assessor',
  'iqa',
  'head_of_department',
  'admin',
  'support',
  'eqa',
];

export type StaffDutyKey =
  | 'is_dsl'
  | 'is_deputy_dsl'
  | 'is_prevent_lead'
  | 'is_h_and_s_lead'
  | 'is_quality_nominee'
  | 'is_mental_health_lead';

export const STAFF_DUTIES: { key: StaffDutyKey; label: string; body: string }[] = [
  { key: 'is_dsl', label: 'Safeguarding lead (DSL)', body: 'Reads and handles every safeguarding concern.' },
  { key: 'is_deputy_dsl', label: 'Deputy safeguarding lead', body: 'Same access as the DSL, to cover when they are away.' },
  { key: 'is_prevent_lead', label: 'Prevent lead', body: 'Named for the Prevent duty. No extra access.' },
  { key: 'is_h_and_s_lead', label: 'Health and safety lead', body: 'Named for health and safety. No extra access.' },
  { key: 'is_quality_nominee', label: 'Quality nominee', body: 'Opens the quality pack and can run IQA sampling.' },
  { key: 'is_mental_health_lead', label: 'Mental health lead', body: 'Named for wellbeing. No extra access.' },
];

const sectionTitleCn = 'text-[15px] font-semibold text-white';

export function StaffRolePicker({
  value,
  onChange,
  canGrant,
  locked,
  lockedReason,
}: {
  value: string;
  onChange: (role: CollegeStaffRoleKey) => void;
  /** May hand out admin / head of department (staff.grant_roles). */
  canGrant: boolean;
  /** The whole picker is read only (your own row, or no staff.manage). */
  locked?: boolean;
  lockedReason?: string;
}) {
  return (
    <div>
      <p className={labelCn}>Role *</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Role">
        {STAFF_ROLE_ORDER.map((r) => {
          const privileged = PRIVILEGED_COLLEGE_ROLES.includes(r);
          const disabled = locked || (privileged && !canGrant && value !== r);
          return (
            <button
              key={r}
              type="button"
              aria-pressed={value === r}
              disabled={disabled}
              onClick={() => onChange(r)}
              className={cn(chipCn(value === r), disabled && value !== r && 'cursor-not-allowed opacity-50')}
            >
              {COLLEGE_ROLE_LABELS[r]}
            </button>
          );
        })}
      </div>
      {locked && lockedReason ? (
        <p className="mt-2 text-[12px] leading-relaxed text-white">{lockedReason}</p>
      ) : !canGrant ? (
        <p className="mt-2 text-[12px] leading-relaxed text-white">
          Only a college admin or head of department can make someone an admin or head of department.
        </p>
      ) : null}
    </div>
  );
}

/** "What this role can do", straight from the database matrix. */
export function RoleCapabilitySummary({ role }: { role: string }) {
  const { data, isLoading } = useCollegeRoleMatrix();
  const label = COLLEGE_ROLE_LABELS[role as CollegeStaffRoleKey] ?? role;
  if (isLoading) {
    return <p className="text-[12.5px] text-white">Loading what a {label.toLowerCase()} can do…</p>;
  }
  if (!data) return null;
  const keys = new Set(data.roles[role as CollegeStaffRoleKey] ?? []);
  const items = data.capabilities.filter((c) => keys.has(c.key) && c.key !== 'learners.view_mine');
  const readOnly = keys.has('read_only');
  return (
    <section className="space-y-3 rounded-xl border border-white/[0.10] bg-white/[0.04] p-4">
      <h3 className={sectionTitleCn}>What a {label.toLowerCase()} can do</h3>
      {readOnly ? (
        <p className="text-[12.5px] leading-relaxed text-white">
          Read only. They can look things up but cannot change anything.
        </p>
      ) : null}
      <ul className="space-y-2">
        {items
          .filter((c) => c.key !== 'read_only')
          .map((c) => (
            <li key={c.key} className="text-[12.5px] leading-relaxed text-white">
              <span className="font-semibold">{c.label}.</span> {c.description}
            </li>
          ))}
      </ul>
      <p className="text-[12px] leading-relaxed text-white">
        Safeguarding concerns are read only by the safeguarding lead and deputy, whatever the role.
      </p>
    </section>
  );
}

export function StaffDutyToggles({
  values,
  onToggle,
  canGrant,
  locked,
}: {
  values: Partial<Record<StaffDutyKey, boolean>>;
  onToggle: (key: StaffDutyKey, on: boolean) => void;
  canGrant: boolean;
  locked?: boolean;
}) {
  const disabled = locked || !canGrant;
  return (
    <section className="space-y-3">
      <h3 className={sectionTitleCn}>Named duties</h3>
      <p className="text-[12px] leading-relaxed text-white">
        {disabled
          ? locked
            ? 'You cannot change your own duties. Ask another admin or head of department.'
            : 'Only a college admin or head of department can name the safeguarding and quality leads.'
          : 'Duties sit on top of the role. The safeguarding lead and deputy are the only people who read safeguarding concerns.'}
      </p>
      <ul className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
        {STAFF_DUTIES.map((d) => {
          const on = Boolean(values[d.key]);
          return (
            <li key={d.key} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white">{d.label}</p>
                <p className="text-[12px] text-white">{d.body}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={d.label}
                disabled={disabled}
                onClick={() => onToggle(d.key, !on)}
                className={cn(chipCn(on), 'min-w-[4.5rem]', disabled && 'cursor-not-allowed opacity-60')}
              >
                {on ? 'Yes' : 'No'}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
