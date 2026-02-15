import {
  useSafetySignatureOverview,
  SignatureDocSummary,
} from '@/hooks/useSafetySignatureOverview';
import { PenTool, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface SignatureTrackingDashboardProps {
  onTap?: (docType: string) => void;
}

export function SignatureTrackingDashboard({ onTap }: SignatureTrackingDashboardProps) {
  const { data, isLoading } = useSafetySignatureOverview();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-card/50 p-4">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading signatures...</span>
        </div>
      </div>
    );
  }

  if (!data || data.totalDocuments === 0) return null;

  const hasUnsigned = data.totalUnsigned > 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-card/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <PenTool className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Signature Tracking</h3>
              <p className="text-xs text-white">{data.signedPercent}% of documents signed</p>
            </div>
          </div>
          {hasUnsigned && (
            <div className="px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30">
              <span className="text-xs font-medium text-orange-300">
                {data.totalUnsigned} unsigned
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-500"
            style={{ width: `${data.signedPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-white">{data.totalSigned} signed</span>
          <span className="text-[10px] text-white">{data.totalDocuments} total</span>
        </div>
      </div>

      {/* Document type breakdown */}
      <div className="px-4 pb-4 space-y-1.5">
        {data.byType
          .filter((t) => t.total > 0)
          .sort((a, b) => b.unsigned - a.unsigned)
          .map((item) => (
            <SignatureRow key={item.type} item={item} onTap={onTap} />
          ))}
      </div>
    </div>
  );
}

function SignatureRow({
  item,
  onTap,
}: {
  item: SignatureDocSummary;
  onTap?: (docType: string) => void;
}) {
  const allSigned = item.unsigned === 0;

  return (
    <button
      type="button"
      onClick={() => onTap?.(item.type)}
      className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 touch-manipulation active:scale-[0.98] transition-all"
    >
      <div className="flex items-center gap-2 min-w-0">
        {allSigned ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
        )}
        <span className="text-xs text-white truncate">{item.label}</span>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
        <span className="text-[10px] text-green-400 font-medium">{item.signed}</span>
        <span className="text-[10px] text-white">/</span>
        <span className="text-[10px] text-white font-medium">{item.total}</span>
      </div>
    </button>
  );
}
