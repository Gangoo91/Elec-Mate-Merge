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

export function accentForAction(action: ProposedAction): string {
  if (isDestructive(action)) return 'border-red-500/30 bg-red-500/[0.05]';
  if (action.type === 'create-snag') return 'border-orange-500/30 bg-orange-500/[0.05]';
  if (action.type === 'create-project') return 'border-purple-500/30 bg-purple-500/[0.05]';
  if (action.type === 'create-customer') return 'border-cyan-500/30 bg-cyan-500/[0.05]';
  if (action.type === 'create-task') return 'border-elec-yellow/30 bg-elec-yellow/[0.04]';
  if (action.type === 'draft-message') return 'border-indigo-400/30 bg-indigo-500/[0.05]';
  return 'border-blue-400/30 bg-blue-500/[0.05]';
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
