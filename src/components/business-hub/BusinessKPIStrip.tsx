import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface KPICardProps {
  label: string;
  value: string;
  href: string;
  highlight: 'green' | 'amber' | 'red' | 'neutral';
  isLoading: boolean;
}

const highlightClasses: Record<KPICardProps['highlight'], string> = {
  green: 'border-emerald-500/30 bg-emerald-500/10',
  amber: 'border-amber-500/30 bg-amber-500/10',
  red: 'border-red-500/30 bg-red-500/10',
  neutral: 'border-white/10 bg-white/5',
};

const valueColourClasses: Record<KPICardProps['highlight'], string> = {
  green: 'text-emerald-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  neutral: 'text-white',
};

function KPICard({ label, value, href, highlight, isLoading }: KPICardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(href)}
      className={`flex flex-col items-start justify-center rounded-xl border px-3 py-2 h-14 touch-manipulation active:scale-[0.97] transition-all ${highlightClasses[highlight]}`}
    >
      {isLoading ? (
        <>
          <Skeleton className="h-3 w-16 mb-1.5" />
          <Skeleton className="h-5 w-12" />
        </>
      ) : (
        <>
          <span className="text-[11px] font-medium text-white leading-tight">{label}</span>
          <span className={`text-base font-bold leading-tight ${valueColourClasses[highlight]}`}>
            {value}
          </span>
        </>
      )}
    </button>
  );
}

interface BusinessKPIStripProps {
  paidThisMonth: number;
  outstanding: number;
  overdueAmount: number;
  winRate: number;
  isLoading: boolean;
  formatCurrency: (amount: number) => string;
}

export default function BusinessKPIStrip({
  paidThisMonth,
  outstanding,
  overdueAmount,
  winRate,
  isLoading,
  formatCurrency,
}: BusinessKPIStripProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <KPICard
        label="Paid This Month"
        value={formatCurrency(paidThisMonth)}
        href="/electrician/invoices"
        highlight={paidThisMonth > 0 ? 'green' : 'neutral'}
        isLoading={isLoading}
      />
      <KPICard
        label="Outstanding"
        value={formatCurrency(outstanding)}
        href="/electrician/invoices"
        highlight="amber"
        isLoading={isLoading}
      />
      <KPICard
        label="Overdue"
        value={formatCurrency(overdueAmount)}
        href="/electrician/invoices"
        highlight={overdueAmount > 0 ? 'red' : 'neutral'}
        isLoading={isLoading}
      />
      <KPICard
        label="Win Rate"
        value={`${winRate}%`}
        href="/electrician/quotes"
        highlight={winRate >= 50 ? 'green' : 'amber'}
        isLoading={isLoading}
      />
    </div>
  );
}
