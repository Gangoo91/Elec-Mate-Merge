import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface KPIItemProps {
  label: string;
  value: string;
  href: string;
  dotColour: string;
  isLoading: boolean;
}

function KPIItem({ label, value, href, dotColour, isLoading }: KPIItemProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(href)}
      className="flex-1 flex flex-col items-center gap-1 py-3 touch-manipulation active:opacity-70 transition-opacity"
    >
      {isLoading ? (
        <>
          <Skeleton className="h-5 w-14 mb-0.5" />
          <Skeleton className="h-3 w-10" />
        </>
      ) : (
        <>
          <span className="text-[15px] font-bold text-white leading-none tracking-tight">
            {value}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${dotColour}`} />
            <span className="text-[10px] text-white leading-none uppercase tracking-wide">
              {label}
            </span>
          </div>
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
    <div className="card-surface-interactive">
      <div className="flex items-center">
        <KPIItem
          label="Paid"
          value={formatCurrency(paidThisMonth)}
          href="/electrician/invoices"
          dotColour="bg-emerald-400"
          isLoading={isLoading}
        />
        <div className="w-px h-8 bg-white/[0.06]" />
        <KPIItem
          label="Owed"
          value={formatCurrency(outstanding)}
          href="/electrician/invoices"
          dotColour="bg-amber-400"
          isLoading={isLoading}
        />
        <div className="w-px h-8 bg-white/[0.06]" />
        <KPIItem
          label="Overdue"
          value={formatCurrency(overdueAmount)}
          href="/electrician/invoices"
          dotColour={overdueAmount > 0 ? 'bg-red-400' : 'bg-white/20'}
          isLoading={isLoading}
        />
        <div className="w-px h-8 bg-white/[0.06]" />
        <KPIItem
          label="Win Rate"
          value={`${winRate}%`}
          href="/electrician/quotes"
          dotColour="bg-blue-400"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
