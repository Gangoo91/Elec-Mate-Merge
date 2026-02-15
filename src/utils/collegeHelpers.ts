/**
 * College People Hub Helpers
 * Shared utilities for college people management components
 */

/** Compute avatar initials from a full name */
export function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

/** Return Tailwind classes for risk level badge */
export function getRiskBadgeColour(level: string | null | undefined): string {
  switch (level) {
    case 'High':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'Medium':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'Low':
      return 'bg-success/10 text-success border-success/20';
    default:
      return 'bg-muted text-white';
  }
}

/** Return Tailwind classes for student/staff status badge */
export function getStatusColour(status: string | null | undefined): string {
  switch (status) {
    case 'Active':
      return 'bg-success/10 text-success border-success/20';
    case 'Withdrawn':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'Completed':
      return 'bg-info/10 text-info border-info/20';
    case 'Suspended':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'On Break':
    case 'On Leave':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'Archived':
      return 'bg-muted text-white';
    default:
      return 'bg-muted text-white';
  }
}

/** Format a date string to dd/mm/yyyy (UK format) */
export function formatUKDate(date: string | null | undefined): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/** Format a date as short UK format: "15 Jan 2026" */
export function formatUKDateShort(date: string | null | undefined): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Compute attendance rate from an array of attendance records */
export function computeAttendanceRate(records: Array<{ status: string | null }>): number {
  if (!records || records.length === 0) return 100;
  const present = records.filter((a) => a.status === 'Present' || a.status === 'Late').length;
  return Math.round((present / records.length) * 100);
}

/** Get status ring colour for avatar borders */
export function getStatusRingColour(status: string | null | undefined): string {
  switch (status) {
    case 'Active':
      return 'ring-success';
    case 'Withdrawn':
      return 'ring-destructive';
    case 'Suspended':
    case 'On Break':
      return 'ring-warning';
    default:
      return 'ring-muted';
  }
}

/** Get risk ring colour for avatar borders */
export function getRiskRingColour(riskLevel: string | null | undefined): string {
  switch (riskLevel) {
    case 'High':
      return 'ring-destructive';
    case 'Medium':
      return 'ring-warning';
    default:
      return 'ring-success';
  }
}

/** Human-readable role label */
export function getRoleLabel(role: string): string {
  switch (role) {
    case 'tutor':
      return 'Tutor';
    case 'head_of_department':
      return 'Head of Department';
    case 'admin':
      return 'Administrator';
    case 'assessor':
      return 'Assessor';
    case 'iqa':
      return 'Internal Quality Assurer';
    case 'support':
      return 'Support Staff';
    default:
      return role;
  }
}
