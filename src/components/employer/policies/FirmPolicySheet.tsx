/**
 * One firm policy (ELE-1946): read it, publish it to the team, see who has
 * signed, and export the policy with its acknowledgement record as a PDF.
 *
 * Publishing stamps a version and sends "Policy to read and sign" to everyone
 * on the team who is on the app; they sign it in Worker Tools → Sign-offs.
 * Changing the policy after that offers a new version, which everyone signs
 * again.
 */
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { PolicyEditor } from '@/components/employer/PolicyEditor';
import { policyProseClass, sanitizePolicyHtml } from '@/utils/policyHtml';
import { downloadPolicyPDF } from '@/utils/policy-pdf';
import { describeLocation } from '@/lib/signingLocation';
import { Tag, panel, rowsClass } from '@/components/employer/pageParts/PageParts';
import {
  usePolicyTracker,
  usePublishPolicy,
  useUpdatePolicy,
  type PublishResult,
  type UserPolicy,
} from '@/hooks/usePolicies';
import { cn } from '@/lib/utils';

const day = (iso?: string | null) => {
  if (!iso) return '';
  try {
    return format(parseISO(iso), 'd MMM yyyy');
  } catch {
    return '';
  }
};

/** Edited since it was last sent to the team (allowing for the save itself). */
export function changedSincePublished(p: UserPolicy): boolean {
  if (!p.published_at) return false;
  return new Date(p.updated_at).getTime() - new Date(p.published_at).getTime() > 5000;
}

const btn =
  'inline-flex h-11 items-center justify-center rounded-full px-5 text-[14px] font-semibold touch-manipulation disabled:opacity-50';

interface Props {
  policy: UserPolicy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FirmPolicySheet({ policy, open, onOpenChange }: Props) {
  const [editing, setEditing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [published, setPublished] = useState<PublishResult | null>(null);
  const [reviewDate, setReviewDate] = useState<string>('');
  const { data: tracker, isLoading: trackerLoading } = usePolicyTracker(
    open && policy?.published_version ? policy.id : null
  );
  const publish = usePublishPolicy();
  const update = useUpdatePolicy();

  if (!policy) return null;

  const isPublished = policy.published_version != null;
  const changed = changedSincePublished(policy);
  const people = tracker?.people ?? [];
  const signed = people.filter((p) => p.signed_at).length;

  const doPublish = async () => {
    try {
      const r = await publish.mutateAsync(policy.id);
      setPublished(r);
      toast.success(`Version ${r.version} sent to the team to sign.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not publish. Try again.');
    }
  };

  const exportPdf = async () => {
    setExporting(true);
    try {
      let companyName: string | undefined;
      try {
        const { data } = await supabase.rpc('get_my_company_profile');
        const profile = Array.isArray(data) ? data[0] : data;
        companyName = (profile as { company_name?: string } | null)?.company_name || undefined;
      } catch {
        /* the PDF leaves the company line off */
      }
      await downloadPolicyPDF({
        userPolicy: policy,
        companyName,
        acknowledgements: isPublished ? (tracker?.acknowledgements ?? []) : undefined,
        outstanding: people.filter((p) => !p.signed_at).map((p) => p.name),
        publishedVersion: policy.published_version ?? null,
      });
    } catch (e) {
      console.error('[FirmPolicySheet] export failed', e);
      toast.error('Could not make the PDF. Try again.');
    } finally {
      setExporting(false);
    }
  };

  const saveReview = async () => {
    if (!reviewDate) return;
    try {
      await update.mutateAsync({ id: policy.id, review_date: reviewDate });
      setReviewDate('');
    } catch {
      /* the hook shows the error */
    }
  };

  const status = !isPublished ? (
    <Tag tone="outline">Not sent to the team</Tag>
  ) : people.length > 0 && signed === people.length ? (
    <Tag tone="done">All signed</Tag>
  ) : (
    <Tag tone="yellow">
      {signed} of {people.length} signed
    </Tag>
  );

  return (
    <>
      <FormSheet
        open={open && !editing}
        onOpenChange={(o) => {
          onOpenChange(o);
          if (!o) setPublished(null);
        }}
        eyebrow={isPublished ? `Policy · version ${policy.published_version}` : 'Policy · draft'}
        title={policy.name}
        headerTrailing={status}
        width="wide"
        footer={
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className={cn(btn, 'border border-white/[0.14] bg-white/[0.06] text-white')}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              disabled={exporting || (isPublished && trackerLoading)}
              className={cn(btn, 'border border-white/[0.14] bg-white/[0.06] text-white')}
              onClick={exportPdf}
            >
              {exporting
                ? 'Making the PDF…'
                : isPublished
                  ? 'Export with signatures'
                  : 'Export PDF'}
            </button>
            {(!isPublished || changed) && (
              <button
                type="button"
                disabled={publish.isPending}
                className={cn(btn, 'bg-elec-yellow text-black sm:flex-1')}
                onClick={doPublish}
              >
                {publish.isPending
                  ? 'Sending…'
                  : isPublished
                    ? `Send version ${(policy.published_version ?? 0) + 1} to sign`
                    : 'Publish to the team'}
              </button>
            )}
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="order-2 min-w-0 lg:order-1">
            <div
              className={policyProseClass}
              dangerouslySetInnerHTML={{ __html: sanitizePolicyHtml(policy.content) }}
            />
          </div>

          <div className="order-1 min-w-0 space-y-4 lg:order-2">
            {published && (
              <section className={cn(panel, 'space-y-2 px-4 py-4 sm:px-5')}>
                <p className="text-[15px] font-semibold text-white">
                  Version {published.version} sent
                </p>
                <p className="text-[13.5px] text-white">
                  {published.notified.length
                    ? `${published.notified.length} on the app will be asked to sign it.`
                    : 'Nobody on your team is on the app yet.'}
                </p>
                {published.off_app.length > 0 && (
                  <p className="text-[13.5px] text-white">
                    Not on the app: {published.off_app.map((p) => p.name).join(', ')}. Invite them
                    from Team so they can sign, or print the policy for them.
                  </p>
                )}
              </section>
            )}

            {changed && !published && (
              <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-[13.5px] text-orange-300">
                Changed since version {policy.published_version} was sent. Send the new version so
                the team signs what it says now.
              </p>
            )}

            <section className={panel}>
              <div className="flex min-h-[52px] items-center gap-3 border-b border-white/[0.07] px-4 sm:px-5">
                <h3 className="text-[16px] font-semibold text-white">Who has signed</h3>
              </div>
              {!isPublished ? (
                <p className="px-4 py-4 text-[14px] text-white sm:px-5">
                  Publish it and everyone on your team is asked to read and sign it in the app. You
                  see each signature here.
                </p>
              ) : trackerLoading ? (
                <p className="px-4 py-4 text-[14px] text-white sm:px-5">Loading…</p>
              ) : people.length === 0 ? (
                <p className="px-4 py-4 text-[14px] text-white sm:px-5">
                  Nobody is on your team yet.
                </p>
              ) : (
                <div className={rowsClass}>
                  {people.map((p) => (
                    <div
                      key={p.employee_id}
                      className="flex min-h-[56px] items-center gap-3 px-4 py-3 sm:px-5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-semibold text-white">{p.name}</p>
                        <p className="truncate text-[12.5px] text-white">
                          {p.signed_at
                            ? [day(p.signed_at), describeLocation(p.location)]
                                .filter(Boolean)
                                .join(' · ')
                            : !p.on_app
                              ? 'Not on the app'
                              : p.last_version
                                ? `Signed version ${p.last_version}, not this one`
                                : 'Not signed yet'}
                        </p>
                      </div>
                      {p.signed_at ? (
                        <Tag tone="done">Signed</Tag>
                      ) : (
                        <Tag tone="outline">Waiting</Tag>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className={cn(panel, 'space-y-3 px-4 py-4 sm:px-5')}>
              <p className="text-[14px] text-white">
                {policy.review_date ? `Review by ${day(policy.review_date)}` : 'No review date set'}
                {isPublished && policy.published_at ? ` · sent ${day(policy.published_at)}` : ''}
              </p>
              <div className="flex items-end gap-2">
                <div className="min-w-0 flex-1 space-y-1">
                  <label
                    htmlFor="policy-review"
                    className="block text-[12px] font-medium text-white"
                  >
                    {policy.review_date ? 'Change review date' : 'Set a review date'}
                  </label>
                  <input
                    id="policy-review"
                    type="date"
                    value={reviewDate}
                    onChange={(e) => setReviewDate(e.target.value)}
                    className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark] touch-manipulation"
                  />
                </div>
                <button
                  type="button"
                  disabled={!reviewDate || update.isPending}
                  onClick={saveReview}
                  className={cn(btn, 'border border-white/[0.14] bg-white/[0.06] text-white')}
                >
                  Save
                </button>
              </div>
            </section>
          </div>
        </div>
      </FormSheet>

      {editing && (
        <PolicyEditor
          open={editing}
          onOpenChange={setEditing}
          policy={policy}
          onSaved={() => setEditing(false)}
        />
      )}
    </>
  );
}

export default FirmPolicySheet;
