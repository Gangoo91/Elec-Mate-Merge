import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
    label: 'Reliable',
    dotClass: 'bg-emerald-400',
    badgeClass: 'bg-emerald-500/15 text-emerald-400',
  },
  fair: {
    label: 'Fair',
    dotClass: 'bg-amber-400',
    badgeClass: 'bg-amber-500/15 text-amber-400',
  },
  poor: {
    label: 'Late',
    dotClass: 'bg-red-400',
    badgeClass: 'bg-red-500/15 text-red-400',
  },
};

const getAvatarAccent = (name: string): string => {
  const accents = [
    'from-elec-yellow via-amber-400 to-orange-400',
    'from-blue-500 via-blue-400 to-cyan-400',
    'from-emerald-500 via-emerald-400 to-green-400',
    'from-amber-500 via-amber-400 to-yellow-400',
    'from-cyan-500 via-cyan-400 to-blue-400',
    'from-rose-500 via-rose-400 to-pink-400',
    'from-violet-500 via-purple-400 to-indigo-400',
    'from-teal-500 via-teal-400 to-emerald-400',
  ];
  return accents[name.charCodeAt(0) % accents.length];
};

const getInitials = (name: string): string =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

export const CustomerListRow = ({
  customer,
  paymentReliability,
}: CustomerListRowProps) => {
  const navigate = useNavigate();

  const formatLastActivity = (date?: string) => {
    if (!date) return 'No activity';
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

  const initials = getInitials(customer.name);
  const accent = getAvatarAccent(customer.name);

  // Build subtitle from available contact info
  const subtitleParts: string[] = [];
  if (customer.phone) subtitleParts.push(customer.phone);
  if (customer.email) subtitleParts.push(customer.email);
  if (!customer.phone && !customer.email && customer.address) subtitleParts.push(customer.address);
  const subtitle = subtitleParts.join(' · ');

  return (
    <button
      onClick={() => navigate(`/customers/${customer.id}`)}
      className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
    >
      <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
        {/* Gradient accent line — colour varies by customer */}
        <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity duration-200', accent)} />

        <div className="relative z-10 p-4">
          {/* Top row: initials + badges */}
          <div className="flex items-center gap-3 mb-1.5">
            {/* Compact initial badge */}
            <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
              <span className="font-bold text-xs text-white">{initials}</span>
            </div>

            {/* Name */}
            <h3 className="font-semibold text-[15px] text-white truncate group-hover:text-elec-yellow transition-colors flex-1 min-w-0">
              {customer.name}
            </h3>

            {/* Badges */}
            <div className="flex items-center gap-1.5 shrink-0">
              {(customer.certificateCount || 0) > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                  {customer.certificateCount} cert{(customer.certificateCount || 0) !== 1 ? 's' : ''}
                </span>
              )}
              {paymentReliability && paymentReliability !== 'none' && (
                <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1', reliabilityBadgeConfig[paymentReliability].badgeClass)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', reliabilityBadgeConfig[paymentReliability].dotClass)} />
                  {reliabilityBadgeConfig[paymentReliability].label}
                </span>
              )}
            </div>
          </div>

          {/* Contact info — no icons */}
          {subtitle && (
            <p className="text-[12px] text-white truncate">{subtitle}</p>
          )}

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-[11px] font-medium text-white">
              {formatLastActivity(customer.lastActivityAt)}
            </span>
            <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
