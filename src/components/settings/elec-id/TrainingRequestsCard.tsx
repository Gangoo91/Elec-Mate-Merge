import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTrainingRequests, TrainingRequest } from '@/hooks/useTrainingRequests';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface TrainingRequestItemProps {
  request: TrainingRequest;
  onApprove: (id: string) => Promise<void>;
  onDecline: (id: string) => Promise<void>;
  isProcessing: boolean;
}

function TrainingRequestItem({
  request,
  onApprove,
  onDecline,
  isProcessing,
}: TrainingRequestItemProps) {
  const isPending = request.status === 'pending';
  const isApproved = request.status === 'approved';
  const isDeclined = request.status === 'declined';

  return (
    <div
      className={cn(
        'p-4 rounded-xl border',
        isPending
          ? 'bg-amber-500/10 border-amber-500/20'
          : isApproved
            ? 'bg-emerald-500/10 border-emerald-500/20'
            : 'bg-red-500/10 border-red-500/20'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate">{request.training_name}</p>
          {request.provider && (
            <p className="text-sm text-white mt-0.5 truncate">{request.provider}</p>
          )}
          {request.completed_date && (
            <p className="text-sm text-white mt-0.5">
              {format(new Date(request.completed_date), 'd MMM yyyy')}
            </p>
          )}
          <p className="text-xs text-white mt-2">
            {isPending
              ? `Requested ${formatDistanceToNow(new Date(request.requested_at), { addSuffix: true })}`
              : `Responded ${formatDistanceToNow(new Date(request.responded_at!), { addSuffix: true })}`}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {isPending && (
            <>
              <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/20">
                Pending
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="h-10 px-3 rounded-lg border-red-500/30 text-red-400 bg-transparent hover:bg-red-500/10 touch-manipulation"
                  onClick={() => onDecline(request.id)}
                  disabled={isProcessing}
                >
                  Decline
                </Button>
                <Button
                  className="h-10 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white touch-manipulation"
                  onClick={() => onApprove(request.id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Saving…' : 'Approve'}
                </Button>
              </div>
            </>
          )}
          {isApproved && (
            <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Approved
            </span>
          )}
          {isDeclined && (
            <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-red-500/10 text-red-400 border-red-500/20">
              Declined
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function TrainingRequestsCard() {
  const { requests, isLoading, isSubmitting, respondToRequest, getPendingCount } =
    useTrainingRequests();
  const [showHistory, setShowHistory] = useState(false);

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const historyRequests = requests.filter((r) => r.status !== 'pending');
  const pendingCount = getPendingCount();

  const handleApprove = async (id: string) => {
    await respondToRequest(id, true);
  };

  const handleDecline = async (id: string) => {
    await respondToRequest(id, false);
  };

  if (isLoading) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-center gap-2 text-white">
          <div className="h-5 w-5 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
          <span>Loading training requests…</span>
        </div>
      </div>
    );
  }

  if (requests.length === 0) return null;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/[0.06]">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Training requests
          </div>
          <div className="mt-1 text-base font-semibold text-white">
            Employer-submitted records
          </div>
        </div>
        {pendingCount > 0 && (
          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-elec-yellow text-black border-elec-yellow">
            {pendingCount} pending
          </span>
        )}
      </div>

      <div className="p-5 space-y-4">
        {pendingRequests.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-amber-400">
              {pendingCount} request{pendingCount > 1 ? 's' : ''} awaiting your approval
            </p>
            {pendingRequests.map((request) => (
              <TrainingRequestItem
                key={request.id}
                request={request}
                onApprove={handleApprove}
                onDecline={handleDecline}
                isProcessing={isSubmitting}
              />
            ))}
          </div>
        )}

        {historyRequests.length > 0 && (
          <>
            {pendingRequests.length > 0 && <Separator className="bg-white/[0.06]" />}
            <Button
              variant="ghost"
              className="w-full h-11 justify-between text-white hover:bg-white/[0.04] touch-manipulation"
              onClick={() => setShowHistory(!showHistory)}
            >
              <span>Past requests ({historyRequests.length})</span>
              <span aria-hidden>{showHistory ? '▴' : '▾'}</span>
            </Button>

            {showHistory && (
              <div className="space-y-3">
                {historyRequests.map((request) => (
                  <TrainingRequestItem
                    key={request.id}
                    request={request}
                    onApprove={handleApprove}
                    onDecline={handleDecline}
                    isProcessing={isSubmitting}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
