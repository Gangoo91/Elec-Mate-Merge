import { cn } from '@/lib/utils';
import {
  Plus,
  AlertTriangle,
  FolderKanban,
  UserPlus,
  Mail,
  Pencil,
  CheckCircle2,
  Trash2,
  Users,
  Package,
  Receipt,
} from 'lucide-react';
import type { ProposedAction } from './types';

export function ActionIcon({ action }: { action: ProposedAction }) {
  const cls = 'h-4 w-4 shrink-0 mt-0.5';
  switch (action.type) {
    case 'create-task':
      return <Plus className={cn(cls, 'text-elec-yellow')} />;
    case 'create-snag':
      return <AlertTriangle className={cn(cls, 'text-orange-400')} />;
    case 'create-project':
      return <FolderKanban className={cn(cls, 'text-purple-300')} />;
    case 'create-customer':
      return <UserPlus className={cn(cls, 'text-cyan-300')} />;
    case 'draft-message':
      return <Mail className={cn(cls, 'text-indigo-300')} />;
    case 'add-material':
      return <Package className={cn(cls, 'text-emerald-300')} />;
    case 'draft-invoice':
      return <Receipt className={cn(cls, 'text-elec-yellow')} />;
    case 'amend-task':
    case 'amend-project':
    case 'amend-customer':
      return <Pencil className={cn(cls, 'text-blue-300')} />;
    case 'complete-task':
    case 'complete-project':
      return <CheckCircle2 className={cn(cls, 'text-emerald-400')} />;
    case 'delete-task':
    case 'delete-project':
      return <Trash2 className={cn(cls, 'text-red-400')} />;
    case 'delete-customer':
      return <Users className={cn(cls, 'text-red-400')} />;
  }
}
