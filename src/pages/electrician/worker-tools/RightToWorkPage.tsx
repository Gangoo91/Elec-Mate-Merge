/**
 * RightToWorkPage — the worker sends their right-to-work details to the firm
 * (ELE-2061).
 *
 * A Home Office share code (from gov.uk "Prove your right to work") with their
 * date of birth, or photos of their documents. The firm still does the check:
 * it checks the code online, or sees the originals with the person present,
 * and records it. Files go to the private rtw-evidence bucket under the
 * person's own folder; only the firm's owner and admins can open them.
 */
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { WorkerPanel, SectionTitle, workerTextareaCn } from '@/components/worker-tools/WorkerUi';
import { inputClass, fieldLabelClass } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import {
  SHARE_CODE_RE,
  normaliseShareCode,
  myRtwSentRecently,
  useMyRtwStatus,
  useSubmitMyRtw,
  type MyRtwRow,
} from '@/hooks/useRightToWork';
import type { PageHelpContent } from '@/components/hub/PageHelp';

const WT_RTW_HELP: PageHelpContent = {
  id: 'wt-right-to-work',
  title: 'Right to work',
  what: 'Every firm must check that the people who work for it are allowed to work in the UK. This page sends your details to the office so they can do the check.',
  steps: [
    {
      title: 'Get a share code',
      body: 'If you have an eVisa or settled status, get a share code on gov.uk ("Prove your right to work to an employer"). It starts with W.',
    },
    {
      title: 'Or photograph your documents',
      body: 'A British or Irish passport, or the documents the office asks for. They still need to see the originals with you.',
    },
    {
      title: 'Send it',
      body: 'The office checks it and records the check. Only the owner and admins can see what you send.',
    },
  ],
};

const statusLine = (r: MyRtwRow) => {
  if (r.status === 'checked') return { text: 'Checked. Nothing to do.', tone: 'text-emerald-400' };
  if (r.status === 'not_required') return { text: 'Not needed for you.', tone: 'text-white' };
  if (myRtwSentRecently(r))
    return {
      text: `Sent ${format(parseISO(r.last_submitted_at!), 'd MMM')}. Waiting for the office to check it.`,
      tone: 'text-white',
    };
  if (r.status === 'due' || r.status === 'overdue')
    return {
      text: `Your follow-up check is due${r.follow_up_due ? ` ${format(parseISO(r.follow_up_due), 'd MMM yyyy')}` : ''}. Send a new share code.`,
      tone: r.status === 'overdue' ? 'text-red-400' : 'text-elec-yellow',
    };
  return { text: 'The office needs your right-to-work details.', tone: 'text-elec-yellow' };
};

export default function RightToWorkPage() {
  const { data: rows = [], isLoading } = useMyRtwStatus();
  const submit = useSubmitMyRtw();
  const [rosterId, setRosterId] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [dob, setDob] = useState('');
  const [note, setNote] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const row = rows.find((r) => r.roster_id === rosterId) ?? rows[0];

  // Gap §3C #27: typed once. If the firm already holds their date of birth
  // (pay profile or an earlier submission), the form arrives filled in.
  const rowId = row?.roster_id ?? null;
  const { data: dobOnFile = null } = useQuery({
    queryKey: ['my-dob-on-file', rowId],
    enabled: !!rowId,
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<string | null> => {
      const { data, error } = await supabase.rpc('my_date_of_birth_on_file' as never, {
        p_roster_id: rowId,
      } as never);
      if (error) return null;
      return (data as unknown as string | null) ?? null;
    },
  });
  useEffect(() => {
    if (dobOnFile) setDob((cur) => cur || dobOnFile);
  }, [dobOnFile, rowId]);
  const clean = normaliseShareCode(code);
  const codeBad = clean.length > 0 && !SHARE_CODE_RE.test(clean);
  const canSend = !!row && !submit.isPending && !codeBad && (clean.length > 0 || files.length > 0);

  const send = async () => {
    if (!row) return;
    try {
      await submit.mutateAsync({
        row,
        shareCode: clean || null,
        dateOfBirth: dob || null,
        note: note.trim() || null,
        files,
      });
      toast.success('Sent to the office', {
        description: 'They check it and record it. You do not need to do anything else.',
      });
      setCode('');
      setDob(dobOnFile ?? '');
      setNote('');
      setFiles([]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Not sent');
    }
  };

  return (
    <WorkerToolPage
      eyebrow="Worker"
      title="Right to work"
      description="Send the office your share code or documents so they can do your right-to-work check."
      maxWidth="3xl"
      help={WT_RTW_HELP}
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        </div>
      ) : !row ? (
        <WorkerPanel className="px-4 py-4 sm:px-5">
          <p className="text-[14px] text-white">You are not on a team right now.</p>
        </WorkerPanel>
      ) : (
        <div className="space-y-8">
          <section>
            <SectionTitle title="Your status" />
            <WorkerPanel className="divide-y divide-white/[0.07]">
              {rows.map((r) => {
                const s = statusLine(r);
                return (
                  <button
                    key={r.roster_id}
                    type="button"
                    onClick={() => setRosterId(r.roster_id)}
                    className={cn(
                      'flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation sm:px-5',
                      rows.length > 1 && r.roster_id === row.roster_id && 'bg-white/[0.04]'
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-semibold text-white">{r.firm_name}</div>
                      <div className={cn('mt-0.5 text-[13px] font-medium', s.tone)}>{s.text}</div>
                    </div>
                  </button>
                );
              })}
            </WorkerPanel>
          </section>

          {row.status !== 'checked' && row.status !== 'not_required' && (
            <section>
              <SectionTitle title={`Send to ${row.firm_name}`} />
              <WorkerPanel className="space-y-5 px-4 py-5 sm:px-5">
                <div>
                  <label className={fieldLabelClass} htmlFor="rtw-code">
                    Share code
                  </label>
                  <input
                    id="rtw-code"
                    className={cn(inputClass, 'uppercase tracking-wider')}
                    value={code}
                    placeholder="W12 345 678"
                    autoComplete="off"
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <p className={cn('mt-1 text-[12px]', codeBad ? 'text-red-400' : 'text-white')}>
                    {codeBad
                      ? 'A right to work share code has 9 characters and starts with W.'
                      : 'Get one on gov.uk: "Prove your right to work to an employer". It lasts 90 days.'}
                  </p>
                </div>
                <div>
                  <label className={fieldLabelClass} htmlFor="rtw-dob">
                    Date of birth
                  </label>
                  <input
                    id="rtw-dob"
                    type="date"
                    className={inputClass}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <p className="mt-1 text-[12px] text-white">
                    {dobOnFile && dob === dobOnFile
                      ? 'Already on your record, so you do not need to type it again.'
                      : 'The office needs it with a share code to do the online check.'}
                  </p>
                </div>
                <div>
                  <span className={fieldLabelClass}>Photos of your documents</span>
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const picked = Array.from(e.target.files ?? []).filter(
                        (f) => f.size <= 10 * 1024 * 1024
                      );
                      setFiles((prev) => [...prev, ...picked].slice(0, 6));
                      e.target.value = '';
                    }}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="h-11 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation"
                    >
                      Add a photo
                    </button>
                    {files.map((f, i) => (
                      <button
                        key={`${f.name}-${i}`}
                        type="button"
                        onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                        className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] text-white touch-manipulation"
                      >
                        {f.name.length > 20 ? `${f.name.slice(0, 18)}…` : f.name} ×
                      </button>
                    ))}
                  </div>
                  <p className="mt-1 text-[12px] text-white">
                    For example the photo page of your passport. The office still needs to see the
                    original with you.
                  </p>
                </div>
                <div>
                  <label className={fieldLabelClass} htmlFor="rtw-note">
                    Note for the office
                  </label>
                  <textarea
                    id="rtw-note"
                    className={workerTextareaCn}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  disabled={!canSend}
                  onClick={send}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation disabled:opacity-50"
                >
                  {submit.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Send to the office
                </button>
                <p className="text-[12px] leading-snug text-white">
                  Only the owner and admins at {row.firm_name} can see what you send.
                </p>
              </WorkerPanel>
            </section>
          )}
        </div>
      )}
    </WorkerToolPage>
  );
}
