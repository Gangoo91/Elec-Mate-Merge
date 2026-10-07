/**
 * One of the worker's own claims — Worker Tools → Expenses (ELE-2001).
 * Shows the amount, where it is (sent / approved / paid / rejected with the
 * dates), the mileage working, and the receipt through a signed link. A
 * Pending claim can be changed or withdrawn; the server re-checks both.
 */
import { useState } from 'react';
import { ExternalLink, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  DestructiveButton,
  PrimaryButton,
  SecondaryButton,
} from '@/components/employer/editorial';
import { SolidBadge } from '@/components/worker-tools/WorkerUi';
import type { WorkerExpenseClaim } from '@/hooks/useExpenses';
import {
  categoryLabel,
  gbp,
  isMileage,
  longDate,
  pence,
  statusKey,
  STATUS_LABEL,
} from '@/components/worker-tools/expenses/expenseShared';
import { isPdfReceipt, useSignedReceipt } from '@/components/worker-tools/expenses/receiptLinks';
import { openExternalUrl } from '@/utils/open-external-url';
import { expensePayState, shortPayday } from '@/utils/expensePayroll';

interface Props {
  claim: WorkerExpenseClaim | null;
  jobTitle?: string | null;
  onOpenChange: (open: boolean) => void;
  onEdit: (claim: WorkerExpenseClaim) => void;
  onWithdraw: (claim: WorkerExpenseClaim) => Promise<void>;
  withdrawing?: boolean;
}

function Step({ done, label, when, tone }: { done: boolean; label: string; when?: string; tone?: 'red' }) {
  return (
    <li className="flex items-start gap-3 py-2.5">
      <span
        aria-hidden
        className={
          done
            ? tone === 'red'
              ? 'mt-1 h-3 w-3 shrink-0 rounded-full bg-red-500'
              : 'mt-1 h-3 w-3 shrink-0 rounded-full bg-elec-yellow'
            : 'mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-white/40'
        }
      />
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-white">{label}</p>
        {when && <p className="text-[12.5px] text-white">{when}</p>}
      </div>
    </li>
  );
}

export function ExpenseClaimDetailSheet({
  claim,
  jobTitle,
  onOpenChange,
  onEdit,
  onWithdraw,
  withdrawing,
}: Props) {
  const [confirming, setConfirming] = useState(false);
  const signed = useSignedReceipt(claim?.receipt_url ?? null);

  if (!claim) return null;

  const s = statusKey(claim.status);
  const pending = s === 'pending';
  const mileage = isMileage(claim);
  const bands = claim.mileage_breakdown?.bands ?? [];
  const pdf = isPdfReceipt(claim.receipt_url);

  const openReceipt = async () => {
    if (!signed.data) {
      toast.error('Could not open that receipt');
      return;
    }
    await openExternalUrl(signed.data);
  };

  return (
    <FormSheet
      open={!!claim}
      onOpenChange={(o) => {
        if (!o) setConfirming(false);
        onOpenChange(o);
      }}
      width="wide"
      eyebrow={categoryLabel(claim.category)}
      title={
        <span className="flex flex-wrap items-center gap-3">
          {gbp(Number(claim.amount))}
          <SolidBadge
            tone={s === 'rejected' ? 'red' : s === 'paid' || s === 'approved' ? 'green' : 'neutral'}
          >
            {(() => {
              const pay = expensePayState(claim);
              return pay?.kind === 'in_payroll'
                ? `In payroll · paid on ${shortPayday(pay.payday)}`
                : (STATUS_LABEL[s] ?? claim.status);
            })()}
          </SolidBadge>
        </span>
      }
      description={claim.description && claim.description !== claim.category ? claim.description : undefined}
      footer={
        pending ? (
          confirming ? (
            <div className="flex w-full gap-2">
              <SecondaryButton fullWidth onClick={() => setConfirming(false)}>
                Keep it
              </SecondaryButton>
              <DestructiveButton
                fullWidth
                disabled={withdrawing}
                onClick={async () => {
                  await onWithdraw(claim);
                  setConfirming(false);
                }}
              >
                {withdrawing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Withdraw claim
              </DestructiveButton>
            </div>
          ) : (
            <div className="flex w-full gap-2" data-help="wt-expenses.change">
              <SecondaryButton fullWidth onClick={() => setConfirming(true)}>
                Withdraw
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={() => onEdit(claim)}>
                Change it
              </PrimaryButton>
            </div>
          )
        ) : undefined
      }
    >
      {confirming && (
        <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-3 text-[13.5px] text-orange-300">
          Withdraw this claim? It is removed for you and the office, and any receipt you added is
          deleted.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-6">
          <section data-help="wt-expenses.where">
            <h3 className="mb-1 text-[15px] font-semibold tracking-tight text-white">Where it is</h3>
            <ol className="divide-y divide-white/[0.08]">
              <Step
                done
                label="Sent to the office"
                when={longDate(claim.created_at || claim.submitted_date)}
              />
              {s === 'rejected' ? (
                <Step
                  done
                  tone="red"
                  label="Rejected"
                  when={claim.rejection_reason ? `Reason: ${claim.rejection_reason}` : 'No reason given. Ask the office.'}
                />
              ) : (
                <>
                  <Step
                    done={s === 'approved' || s === 'paid'}
                    label={s === 'approved' || s === 'paid' ? 'Approved' : 'Waiting for approval'}
                    when={
                      s === 'approved' || s === 'paid'
                        ? [longDate(claim.approved_date), claim.approved_by ? `by ${claim.approved_by}` : '']
                            .filter(Boolean)
                            .join(' ')
                        : 'You can change or withdraw it until then.'
                    }
                  />
                  <Step
                    done={s === 'paid'}
                    label={
                      s === 'paid'
                        ? claim.payroll_export_id
                          ? 'Paid back with your pay'
                          : 'Paid back to you'
                        : claim.payroll_payday && s === 'approved'
                          ? 'In payroll'
                          : 'Paid back'
                    }
                    when={
                      s === 'paid'
                        ? longDate(claim.paid_date) || 'Date not recorded'
                        : s === 'approved' && claim.payroll_payday
                          ? `The office has sent it to payroll. It is paid on ${longDate(claim.payroll_payday)}, with your pay.`
                          : s === 'approved'
                            ? 'With your next pay, or when the office pays expenses.'
                            : undefined
                    }
                  />
                </>
              )}
            </ol>
          </section>

          <section className="space-y-2">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">Details</h3>
            <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-[13.5px]">
              <div>
                <dt className="text-[12px] text-white">{mileage ? 'Journey date' : 'Receipt date'}</dt>
                <dd className="font-semibold text-white">
                  {longDate(claim.incurred_on || claim.submitted_date)}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] text-white">Job</dt>
                <dd className="font-semibold text-white">{jobTitle || 'None'}</dd>
              </div>
            </dl>
          </section>

          {mileage && (
            <section className="space-y-2">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">Mileage</h3>
              <p className="text-[14px] text-white">
                {claim.mileage_from || '?'} {claim.mileage_return ? '⇄' : '→'} {claim.mileage_to || '?'}
              </p>
              <p className="text-[13.5px] text-white">
                {Number(claim.mileage_miles).toLocaleString('en-GB')} miles
                {claim.mileage_return ? ' (there and back)' : ''}
                {bands.length > 0 &&
                  ` · ${bands.map((b) => `${Number(b.miles).toLocaleString('en-GB')} mi at ${pence(Number(b.pence))}`).join(' + ')}`}
              </p>
              <p className="text-[12px] text-white">
                {claim.mileage_breakdown?.rate_source === 'firm'
                  ? "At your firm's rate."
                  : 'At the HMRC approved rate.'}
              </p>
            </section>
          )}
        </div>

        <section className="space-y-2">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Receipt</h3>
          {!claim.receipt_url ? (
            <p className="text-[13.5px] text-white">
              {pending ? 'No receipt. Tap "Change it" to add one.' : 'No receipt on this claim.'}
            </p>
          ) : signed.isLoading ? (
            <div className="h-40 animate-pulse rounded-xl bg-white/[0.06]" />
          ) : signed.isError ? (
            <p className="text-[13.5px] text-white">
              This receipt can&rsquo;t be opened here. The office can still see it.
            </p>
          ) : pdf ? (
            <button
              type="button"
              onClick={openReceipt}
              className="flex h-14 w-full items-center gap-3 rounded-xl border border-white/[0.14] bg-white/[0.05] px-4 text-left touch-manipulation"
            >
              <FileText className="h-5 w-5 shrink-0 text-elec-yellow" />
              <span className="flex-1 text-[14px] font-semibold text-white">Open the PDF receipt</span>
              <ExternalLink className="h-4 w-4 text-white" />
            </button>
          ) : (
            <button
              type="button"
              onClick={openReceipt}
              className="block w-full overflow-hidden rounded-xl border border-white/[0.14] bg-black touch-manipulation"
              aria-label="Open the receipt full size"
            >
              <img
                src={signed.data}
                alt="Your receipt"
                className="max-h-[50vh] w-full object-contain"
              />
            </button>
          )}
        </section>
      </div>
    </FormSheet>
  );
}
