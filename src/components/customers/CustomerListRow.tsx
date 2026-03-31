import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, FileText, Home, ChevronRight, Clock } from 'lucide-react';
import { Customer } from '@/hooks/inspection/useCustomers';
import { cn } from '@/lib/utils';
import { ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';

interface CustomerListRowProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onStartCertificate: (customer: Customer) => void;
  onQuickNote: (customer: Customer) => void;
  paymentReliability?: ReliabilityLevel | null;
}

const reliabilityBadgeConfig: Record<
  Exclude<ReliabilityLevel, 'none'>,
  { label: string; dotClass: string; badgeClass: string }
> = {
  good: {
    label: 'Good',
    dotClass: 'bg-emerald-400',
    badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  },
  fair: {
    label: 'Fair',
    dotClass: 'bg-amber-400',
    badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
  },
  poor: {
    label: 'Late',
    dotClass: 'bg-red-400',
    badgeClass: 'bg-red-500/15 border-red-500/30 text-red-400',
  },
};

const getAvatarColor = (name: string): { bg: string; border: string; text: string } => {
  const colours = [
    { bg: 'bg-elec-yellow/15', border: 'border-elec-yellow/30', text: 'text-elec-yellow' },
    { bg: 'bg-blue-500/15', border: 'border-blue-500/30', text: 'text-blue-400' },
    { bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    { bg: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-400' },
    { bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    { bg: 'bg-rose-500/15', border: 'border-rose-500/30', text: 'text-rose-400' },
    { bg: 'bg-violet-500/15', border: 'border-violet-500/30', text: 'text-violet-400' },
    { bg: 'bg-teal-500/15', border: 'border-teal-500/30', text: 'text-teal-400' },
  ];
  return colours[name.charCodeAt(0) % colours.length];
};

const getInitials = (name: string): string =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

export const CustomerListRow = ({
  customer,
  onEdit,
  onDelete,
  onStartCertificate,
  onQuickNote,
  paymentReliability,
}: CustomerListRowProps) => {
  const navigate = useNavigate();

  const formatLastActivity = (date?: string) => {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const avatar = getAvatarColor(customer.name);
  const initials = getInitials(customer.name);

  return (
    <div
      onClick={() => navigate(`/customers/${customer.id}`)}
      className="group relative overflow-hidden card-surface-interactive cursor-pointer active:scale-[0.98] transition-all duration-200 touch-manipulation"
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />

      <div className="relative z-10 flex items-center gap-3.5 p-4">
        {/* Avatar */}
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border', avatar.bg, avatar.border)}>
          <span className={cn('font-bold text-sm', avatar.text)}>{initials}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name + badges */}
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-semibold text-[15px] text-white truncate group-hover:text-elec-yellow transition-colors">{customer.name}</h3>
            {(customer.certificateCount || 0) > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full shrink-0">
                <FileText className="w-2.5 h-2.5" />
                {customer.certificateCount}
              </span>
            )}
            {(customer.propertyCount || 0) > 0 && (
              <span className="hidden sm:flex items-center gap-0.5 text-[10px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-full shrink-0">
                <Home className="w-2.5 h-2.5" />
                {customer.propertyCount}
              </span>
            )}
            {paymentReliability && paymentReliability !== 'none' && (
              <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full border flex items-center gap-1 shrink-0', reliabilityBadgeConfig[paymentReliability].badgeClass)}>
                <span className={cn('w-1.5 h-1.5 rounded-full', reliabilityBadgeConfig[paymentReliability].dotClass)} />
                {reliabilityBadgeConfig[paymentReliability].label}
              </span>
            )}
          </div>

          {/* Contact details */}
          <div className="flex items-center gap-3 text-[12px] text-white">
            {customer.email && (
              <span className="flex items-center gap-1 truncate max-w-[140px]">
                <Mail className="w-3 h-3 text-blue-400/70 shrink-0" />
                <span className="truncate">{customer.email}</span>
              </span>
            )}
            {customer.phone && (
              <span className="flex items-center gap-1 shrink-0">
                <Phone className="w-3 h-3 text-emerald-400/70" />
                {customer.phone}
              </span>
            )}
          </div>

          {/* Last activity */}
          <div className="flex items-center gap-1 mt-1 text-[11px] text-white">
            <Clock className="w-3 h-3 text-white/50" />
            {formatLastActivity(customer.lastActivityAt)}
          </div>
        </div>

        {/* Chevron */}
        <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200 shrink-0">
          <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};
