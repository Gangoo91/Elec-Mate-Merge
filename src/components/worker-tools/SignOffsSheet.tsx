import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  ChevronLeft,
  FileCheck2,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import SignatureInput from '@/components/signature/SignatureInput';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';

/* ==========================================================================
   SignOffsSheet — the worker's RAMS / job-pack signature flow.

   The office sends a job pack (RAMS, method statement, briefing); the worker
   reads it here and signs before starting. The signature, timestamp and
   device stamp land on the acknowledgement row — the employer's register
   updates live and their bell rings.
   ========================================================================== */

interface PackSignOff {
  id: string;
  job_pack_id: string;
  acknowledged_at: string | null;
  pack: {
    id: string;
    title: string;
    client: string | null;
    location: string | null;
    scope: string | null;
    hazards: string[] | null;
    required_certifications: string[] | null;
    briefing_content: string | null;
  } | null;
  documents: { id: string; title: string; document_type: string | null; file_url: string | null }[];
}

const useMySignOffs = () => {
  const { data: me } = useMyEmployeeRecord();
  return useQuery({
    queryKey: ['my-pack-signoffs', me?.id],
    queryFn: async (): Promise<PackSignOff[]> => {
      const { data, error } = await supabase
        .from('employer_job_pack_acknowledgements')
        .select(
          'id, job_pack_id, acknowledged_at, pack:employer_job_packs(id, title, client, location, scope, hazards, required_certifications, briefing_content)'
        )
        .eq('employee_id', me!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;

      const packIds = (data || []).map((a) => a.job_pack_id);
      let docs: PackSignOff['documents'] = [];
      if (packIds.length > 0) {
        const { data: docRows } = await supabase
          .from('employer_job_pack_documents')
          .select('id, title, document_type, file_url, job_pack_id')
          .in('job_pack_id', packIds);
        docs = docRows || [];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data || []).map((a: any) => ({
        ...a,
        documents: docs.filter(
          (d) => (d as { job_pack_id?: string }).job_pack_id === a.job_pack_id
        ),
      }));
    },
    enabled: !!me?.id,
    staleTime: 30 * 1000,
  });
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOffsSheet({ open, onOpenChange }: Props) {
  const { data: signoffs = [], isLoading } = useMySignOffs();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<PackSignOff | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const pending = useMemo(() => signoffs.filter((s) => !s.acknowledged_at), [signoffs]);
  const signed = useMemo(() => signoffs.filter((s) => !!s.acknowledged_at), [signoffs]);

  const signMutation = useMutation({
    mutationFn: async () => {
      if (!selected || !signature) throw new Error('Sign first');
      const { error } = await supabase
        .from('employer_job_pack_acknowledgements')
        .update({
          acknowledged_at: new Date().toISOString(),
          signature_data: signature,
          device_info: navigator.userAgent.slice(0, 200),
        })
        .eq('id', selected.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-pack-signoffs'] });
      toast.success('Signed — the office has been notified');
      setSelected(null);
      setSignature(null);
    },
    onError: () => toast.error('Could not save your signature'),
  });

  const renderRow = (s: PackSignOff) => (
    <button
      key={s.id}
      type="button"
      onClick={() => {
        setSelected(s);
        setSignature(null);
      }}
      className="w-full text-left rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5 touch-manipulation active:scale-[0.99] transition-transform"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13.5px] font-medium text-white leading-snug truncate">
          {s.pack?.title || 'Job pack'}
        </p>
        {s.acknowledged_at ? (
          <Badge className="border-0 text-[10.5px] bg-emerald-500/20 text-emerald-400 shrink-0">
            Signed
          </Badge>
        ) : (
          <Badge className="border-0 text-[10.5px] bg-amber-500/20 text-amber-400 shrink-0">
            Needs signature
          </Badge>
        )}
      </div>
      <p className="text-[11px] text-white/50 mt-0.5 truncate">
        {[s.pack?.client, s.pack?.location].filter(Boolean).join(' · ')}
      </p>
    </button>
  );

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) setSelected(null);
        onOpenChange(v);
      }}
    >
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {!selected ? (
            <>
              <SheetHeader className="px-4 pb-3 flex-shrink-0">
                <SheetTitle className="text-left text-base">
                  Sign-offs{pending.length > 0 ? ` · ${pending.length} waiting` : ''}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-5">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                  </div>
                ) : signoffs.length === 0 ? (
                  <div className="text-center py-12">
                    <FileCheck2 className="h-10 w-10 text-white/30 mx-auto mb-3" />
                    <p className="text-sm text-white/60">
                      Nothing to sign. When the office sends a job pack — RAMS, method statement,
                      briefing — it lands here for your signature.
                    </p>
                  </div>
                ) : (
                  <>
                    {pending.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-400/80 font-medium">
                          Waiting for your signature
                        </p>
                        {pending.map(renderRow)}
                      </div>
                    )}
                    {signed.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                          Signed
                        </p>
                        {signed.map(renderRow)}
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="px-4 pb-3 flex-shrink-0 flex items-center gap-2 border-b border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="h-10 w-10 -ml-2 flex items-center justify-center rounded-full text-white touch-manipulation"
                  aria-label="Back"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-white truncate">
                    {selected.pack?.title || 'Job pack'}
                  </p>
                  <p className="text-[11px] text-white/50 truncate">
                    {[selected.pack?.client, selected.pack?.location].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                {selected.pack?.scope && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                      Scope of works
                    </p>
                    <p className="text-[13px] text-white/80 leading-relaxed whitespace-pre-wrap">
                      {selected.pack.scope}
                    </p>
                  </div>
                )}

                {(selected.pack?.hazards?.length ?? 0) > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-red-400/80 font-medium flex items-center gap-1.5">
                      <AlertTriangle className="h-3 w-3" />
                      Hazards
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.pack!.hazards!.map((h) => (
                        <Badge
                          key={h}
                          className="border-0 bg-red-500/10 text-red-300 text-[11px] py-1 px-2.5"
                        >
                          {h}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selected.pack?.briefing_content && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                      Briefing
                    </p>
                    <p className="text-[13px] text-white/80 leading-relaxed whitespace-pre-wrap">
                      {selected.pack.briefing_content}
                    </p>
                  </div>
                )}

                {selected.documents.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                      Documents
                    </p>
                    {selected.documents.map((d) =>
                      d.file_url ? (
                        <a
                          key={d.id}
                          href={d.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3 touch-manipulation"
                        >
                          <span className="text-[12.5px] text-white truncate">{d.title}</span>
                          <ExternalLink className="h-3.5 w-3.5 text-white/40 shrink-0" />
                        </a>
                      ) : (
                        <div
                          key={d.id}
                          className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3"
                        >
                          <span className="text-[12.5px] text-white/60">{d.title}</span>
                        </div>
                      )
                    )}
                  </div>
                )}

                {!selected.acknowledged_at ? (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium">
                      Your signature
                    </p>
                    <p className="text-[11.5px] text-white/50">
                      By signing you confirm you've read and understood the scope, hazards and
                      method of work above.
                    </p>
                    <SignatureInput value={signature || undefined} onChange={setSignature} />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <p className="text-[12.5px] text-emerald-300">
                      Signed{' '}
                      {new Date(selected.acknowledged_at).toLocaleString('en-GB', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                )}
              </div>

              {!selected.acknowledged_at && (
                <div className="flex-shrink-0 border-t border-white/[0.06] p-4 pb-safe">
                  <button
                    type="button"
                    onClick={() => signMutation.mutate()}
                    disabled={!signature || signMutation.isPending}
                    className="h-12 w-full rounded-xl bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {signMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <FileCheck2 className="h-4 w-4" />
                    )}
                    Sign and confirm
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SignOffsSheet;
