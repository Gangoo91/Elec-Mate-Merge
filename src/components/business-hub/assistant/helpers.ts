import type { ProposedAction, SparkTask, SparkProject, Customer } from './types';

export const SUGGESTIONS = [
  'Add 3 snags for 14 Oak Lane: cracked socket in kitchen, loose neutral in CU, label all MCBs',
  'New project for Hilltop Primary rewire, customer Hilltop School, est £24k, due 30 May',
  'Chase Mrs Smith about the rewire quote tomorrow at 3pm — high priority',
  'What does BS 7671 say about RCD protection for sockets in domestic kitchens?',
];

export const PRIORITY_CHOICES: Array<'low' | 'normal' | 'high' | 'urgent'> = [
  'low',
  'normal',
  'high',
  'urgent',
];

/**
 * Surface for a proposed action card.
 *
 * This was a seven-colour rainbow — orange for a snag, purple for a project,
 * cyan for a customer, indigo for a message, blue for anything else — all as
 * translucent washes. None of it carried meaning: the card already says what
 * the action is, in words. What it cost was the one distinction that DOES
 * matter, because "delete a project" in red looked like just another colour in
 * a set rather than a warning.
 *
 * So: red when the action destroys something, neutral otherwise. Volt is not
 * used here at all — a translucent volt goes muddy brown on this ground, and
 * solid volt belongs to the approve button, not the card behind it.
 */
export function accentForAction(action: ProposedAction): string {
  if (isDestructive(action)) return 'border-red-400/40 bg-red-500/[0.10]';
  return 'border-white/[0.18] bg-white/[0.06]';
}

export function isDestructive(action: ProposedAction): boolean {
  return (
    action.type === 'delete-task' ||
    action.type === 'delete-project' ||
    action.type === 'delete-customer'
  );
}

export function labelForType(type: ProposedAction['type']): string {
  switch (type) {
    case 'create-task':
      return 'New task';
    case 'create-snag':
      return 'New snag';
    case 'create-project':
      return 'New project';
    case 'create-customer':
      return 'New customer';
    case 'draft-message':
      return 'Draft email';
    case 'add-material':
      return 'Add material';
    case 'draft-invoice':
      return 'Draft invoice';
    case 'amend-task':
      return 'Update task';
    case 'amend-project':
      return 'Update project';
    case 'amend-customer':
      return 'Update customer';
    case 'complete-task':
      return 'Mark task done';
    case 'complete-project':
      return 'Mark project done';
    case 'delete-task':
      return 'Delete task';
    case 'delete-project':
      return 'Delete project';
    case 'delete-customer':
      return 'Delete customer';
  }
}

export function primaryLine(
  action: ProposedAction,
  lookupTask: (id: string) => SparkTask | undefined,
  lookupProject: (id: string) => SparkProject | undefined,
  lookupCustomer: (id: string) => Customer | undefined
): string {
  switch (action.type) {
    case 'create-task':
    case 'create-snag':
    case 'create-project':
      return action.payload.title || '(no title)';
    case 'create-customer':
      return action.payload.name || '(no name)';
    case 'draft-message':
      return action.payload.subject || '(no subject)';
    case 'add-material': {
      const qty = action.payload.quantity ?? 1;
      const unit = action.payload.unit ? ` ${action.payload.unit}` : '×';
      return `${qty}${unit} ${action.payload.name}`;
    }
    case 'draft-invoice':
      return lookupProject(action.payload.projectId)?.title ?? '(unknown job)';
    case 'amend-task':
    case 'complete-task':
    case 'delete-task':
      return lookupTask(action.id)?.title ?? '(unknown task)';
    case 'amend-project':
    case 'complete-project':
    case 'delete-project':
      return lookupProject(action.id)?.title ?? '(unknown project)';
    case 'amend-customer':
    case 'delete-customer':
      return lookupCustomer(action.id)?.name ?? '(unknown customer)';
  }
}

export function secondaryLine(
  action: ProposedAction,
  lookupProject: (id: string) => SparkProject | undefined
): string | null {
  if (
    action.type === 'create-task' ||
    action.type === 'create-snag' ||
    action.type === 'create-project'
  ) {
    const p: any = action.payload;
    const bits: string[] = [];
    if (p.priority && p.priority !== 'normal') bits.push(cap(p.priority));
    if (p.dueAt) bits.push(`Due ${formatDue(p.dueAt)}`);
    if (p.dueDate) bits.push(`Due ${formatDue(p.dueDate)}`);
    if (p.startDate) bits.push(`Start ${formatDue(p.startDate)}`);
    if (p.estimatedValue) bits.push(`£${Number(p.estimatedValue).toLocaleString('en-GB')}`);
    if (p.customerName) bits.push(p.customerName);
    if (p.location) bits.push(p.location);
    if (p.projectId) {
      const proj = lookupProject(p.projectId);
      if (proj) bits.push(`→ ${proj.title}`);
    }
    if (p.projectType) bits.push(p.projectType);
    if (Array.isArray(p.tags) && p.tags.length) {
      const visible = p.tags.filter((t: string) => t !== 'snagging');
      if (visible.length) bits.push(`#${visible.join(' #')}`);
    }
    return bits.length ? bits.join(' · ') : null;
  }
  if (action.type === 'create-customer') {
    const p = action.payload;
    const bits: string[] = [];
    if (p.email) bits.push(p.email);
    if (p.phone) bits.push(p.phone);
    if (p.address) bits.push(p.address);
    return bits.length ? bits.join(' · ') : null;
  }
  if (action.type === 'draft-message') {
    const p = action.payload;
    return `To: ${p.toName}${p.to ? ` <${p.to}>` : ''}`;
  }
  if (action.type === 'add-material') {
    const p = action.payload;
    const bits: string[] = [];
    const proj = lookupProject(p.projectId);
    if (proj) bits.push(`→ ${proj.title}`);
    if (p.unitPrice != null) bits.push(`£${Number(p.unitPrice).toFixed(2)} each`);
    return bits.length ? bits.join(' · ') : null;
  }
  if (action.type === 'draft-invoice') {
    return 'Opens the invoice composer with this job’s unbilled time + materials';
  }
  if (
    action.type === 'amend-task' ||
    action.type === 'amend-project' ||
    action.type === 'amend-customer'
  ) {
    const p = action.patch as any;
    const keys = Object.keys(p).filter((k) => k !== 'customerName');
    if (keys.length === 0) return null;
    return keys.map((k) => `${k}: ${describePatchValue(p[k])}`).join(' · ');
  }
  return null;
}

export function describePatchValue(v: unknown): string {
  if (v === null) return 'cleared';
  if (Array.isArray(v)) return v.join(', ');
  if (typeof v === 'string' && v.match(/^\d{4}-\d{2}-\d{2}T/)) return formatDue(v);
  return String(v);
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatDue(iso: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const sameDay =
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow =
      d.getFullYear() === tomorrow.getFullYear() &&
      d.getMonth() === tomorrow.getMonth() &&
      d.getDate() === tomorrow.getDate();

    const time = d.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (sameDay) return `today ${time}`;
    if (isTomorrow) return `tomorrow ${time}`;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    }) + ` ${time}`;
  } catch {
    return iso;
  }
}

export function summarise(
  action: ProposedAction,
  lookupTask: (id: string) => SparkTask | undefined,
  lookupProject: (id: string) => SparkProject | undefined,
  lookupCustomer: (id: string) => Customer | undefined
): string {
  switch (action.type) {
    case 'create-task':
      return `Created task: ${action.payload.title}`;
    case 'create-snag':
      return `Created snag: ${action.payload.title}`;
    case 'create-project':
      return `Created project: ${action.payload.title}`;
    case 'create-customer':
      return `Created customer: ${action.payload.name}`;
    case 'draft-message':
      return `Email ready: ${action.payload.subject}`;
    case 'add-material':
      return `Added material: ${action.payload.name}`;
    case 'draft-invoice':
      return `Invoice composer opened: ${lookupProject(action.payload.projectId)?.title ?? 'job'}`;
    case 'complete-task':
      return `Marked task done: ${lookupTask(action.id)?.title ?? action.id}`;
    case 'complete-project':
      return `Marked project done: ${lookupProject(action.id)?.title ?? action.id}`;
    case 'delete-task':
      return `Deleted task: ${lookupTask(action.id)?.title ?? action.id}`;
    case 'delete-project':
      return `Deleted project: ${lookupProject(action.id)?.title ?? action.id}`;
    case 'delete-customer':
      return `Deleted customer: ${lookupCustomer(action.id)?.name ?? action.id}`;
    case 'amend-task':
      return `Updated task: ${lookupTask(action.id)?.title ?? action.id}`;
    case 'amend-project':
      return `Updated project: ${lookupProject(action.id)?.title ?? action.id}`;
    case 'amend-customer':
      return `Updated customer: ${lookupCustomer(action.id)?.name ?? action.id}`;
  }
}
