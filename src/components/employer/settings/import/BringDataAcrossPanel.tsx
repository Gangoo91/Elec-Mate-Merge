/**
 * ELE-2067 — Settings → Bring your data across. Import a file yourself, or
 * ask us to move you for free; every past import listed with Undo.
 * Owner and admins import (imports carry invoices); only the owner can send
 * export files to us.
 */
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { DestructiveButton, PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import {
  PanelHead,
  Row,
  Rows,
  StatusPill,
  panelShellClass,
  plural,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';
import { KIND_LABEL, KIND_ORDER, type ImportKind } from '@/lib/firmImport/types';
import { sourceInfo } from '@/lib/firmImport/sources';
import { undoImport } from '@/lib/firmImport/run';
import { ImportWizardSheet } from './ImportWizardSheet';
import { MigrationRequestSheet } from './MigrationRequestSheet';

interface Batch {
  id: string;
  source: string;
  status: 'running' | 'complete' | 'undone' | 'failed';
  counts: Record<string, { created: number; matched: number }>;
  undo_counts: { deleted?: number; kept?: number } | null;
  created_at: string;
  undone_at: string | null;
}

interface MigrationRequest {
  id: string;
  source_system: string;
  status: 'new' | 'call_booked' | 'importing' | 'done' | 'cancelled';
  files: { name: string }[];
  preferred_times: string[];
  call_at: string | null;
  created_at: string;
}

const REQ_STATUS: Record<
  MigrationRequest['status'],
  { label: string; tone: 'neutral' | 'volt' | 'green' | 'red' }
> = {
  new: { label: 'Asked', tone: 'volt' },
  call_booked: { label: 'Call booked', tone: 'neutral' },
  importing: { label: 'Moving now', tone: 'neutral' },
  done: { label: 'Moved', tone: 'green' },
  cancelled: { label: 'Cancelled', tone: 'red' },
};

function countLine(b: Batch) {
  const parts = KIND_ORDER.filter((k) => b.counts?.[k]?.created).map(
    (k) =>
      `${b.counts[k].created} ${(b.counts[k].created === 1 ? KIND_LABEL[k as ImportKind].one : KIND_LABEL[k as ImportKind].many).toLowerCase()}`
  );
  const n = KIND_ORDER.reduce((s, k) => s + (b.counts?.[k]?.created ?? 0), 0);
  return n ? `${plural(n, 'record')}: ${parts.join(', ')}` : 'Nothing added';
}

export function BringDataAcrossPanel({
  firmId,
  isOwner,
  canImport,
  contact,
}: {
  firmId: string;
  isOwner: boolean;
  canImport: boolean;
  contact: { name?: string; email?: string; phone?: string };
}) {
  const qc = useQueryClient();
  const [wizard, setWizard] = useState(false);
  const [ask, setAsk] = useState(false);
  const [confirm, setConfirm] = useState<Batch | null>(null);
  const [undoing, setUndoing] = useState<{ id: string; done: number; total: number } | null>(null);

  const { data: batches = [] } = useQuery({
    queryKey: ['firm-import-batches', firmId],
    enabled: !!firmId && canImport,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_import_batches' as never)
        .select('id, source, status, counts, undo_counts, created_at, undone_at')
        .eq('employer_id', firmId)
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as unknown as Batch[];
    },
  });

  const { data: requests = [] } = useQuery({
    queryKey: ['firm-migration-requests', firmId],
    enabled: !!firmId && isOwner,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_migration_requests' as never)
        .select('id, source_system, status, files, preferred_times, call_at, created_at')
        .eq('employer_id', firmId)
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return (data ?? []) as unknown as MigrationRequest[];
    },
  });

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['firm-import-batches', firmId] });
    qc.invalidateQueries({ queryKey: ['firm-migration-requests', firmId] });
  };

  const doUndo = async (b: Batch) => {
    setConfirm(null);
    setUndoing({ id: b.id, done: 0, total: 1 });
    try {
      const r = await undoImport(b.id, (deleted, remaining) =>
        setUndoing({ id: b.id, done: deleted, total: deleted + remaining })
      );
      toast({
        title: 'Import undone',
        description:
          `${plural(r.deleted, 'record')} taken out.` +
          (r.kept ? ` ${plural(r.kept, 'record')} kept because they have been used since.` : ''),
      });
    } catch (e) {
      toast({
        title: 'Undo did not finish',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setUndoing(null);
      refresh();
    }
  };

  const openRequest = requests.find(
    (r) => r.status === 'new' || r.status === 'call_booked' || r.status === 'importing'
  );

  return (
    <>
      <div className={panelShellClass}>
        <PanelHead
          title="Bring your data across"
          meta={
            <span className="hidden text-[13px] text-white sm:inline">
              From Tradify, Fergus, Powered Now and others
            </span>
          }
        />
        <div className="space-y-4 px-4 py-4 sm:px-5">
          <p className="text-[14px] leading-snug text-white">
            Bring in your customers, sites, jobs, quotes, invoices, price book, team and kit from
            the export files of the system you use now. You see exactly what will come across first,
            and you can undo the whole import.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            {canImport && (
              <PrimaryButton onClick={() => setWizard(true)}>Import from a file</PrimaryButton>
            )}
            {isOwner && (
              <SecondaryButton onClick={() => setAsk(true)} disabled={!!openRequest}>
                {openRequest ? 'We are on it' : 'Move me across for free'}
              </SecondaryButton>
            )}
          </div>
          {!canImport && (
            <p className="text-[13px] text-white">Only the owner or an admin can import records.</p>
          )}
        </div>

        {requests.length > 0 && (
          <Rows className="border-t border-white/[0.07]">
            {requests.map((r) => (
              <Row
                key={r.id}
                title={`Free move from ${sourceInfo(r.source_system as never).label}`}
                detail={[
                  `Asked ${format(new Date(r.created_at), 'd MMM yyyy')}`,
                  r.files?.length ? plural(r.files.length, 'file') : 'No files yet',
                  r.call_at
                    ? `Call ${format(new Date(r.call_at), 'd MMM, HH:mm')}`
                    : r.preferred_times?.join(', '),
                ]
                  .filter(Boolean)
                  .join(' · ')}
                trailing={
                  <StatusPill tone={REQ_STATUS[r.status].tone}>
                    {REQ_STATUS[r.status].label}
                  </StatusPill>
                }
              />
            ))}
          </Rows>
        )}

        {batches.length > 0 && (
          <Rows className="border-t border-white/[0.07]">
            {batches.map((b) => (
              <Row
                key={b.id}
                title={`${sourceInfo(b.source as never).label} · ${format(new Date(b.created_at), 'd MMM yyyy, HH:mm')}`}
                detail={
                  undoing?.id === b.id
                    ? `Taking it out: ${undoing.done} of ${undoing.total}`
                    : b.status === 'undone'
                      ? `Undone ${b.undone_at ? format(new Date(b.undone_at), 'd MMM') : ''}${b.undo_counts?.kept ? ` · ${b.undo_counts.kept} kept, in use` : ''}`
                      : countLine(b)
                }
                trailing={
                  b.status === 'undone' ? (
                    <StatusPill>Undone</StatusPill>
                  ) : undoing?.id === b.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  ) : canImport && b.status !== 'running' ? (
                    <button type="button" className={rowBtnSecondary} onClick={() => setConfirm(b)}>
                      Undo
                    </button>
                  ) : (
                    <StatusPill tone="volt">
                      {b.status === 'failed' ? 'Stopped' : 'Running'}
                    </StatusPill>
                  )
                }
              />
            ))}
          </Rows>
        )}
      </div>

      {canImport && (
        <ImportWizardSheet
          open={wizard}
          onOpenChange={setWizard}
          firmId={firmId}
          onImported={refresh}
          onAskMigration={
            isOwner
              ? () => {
                  setWizard(false);
                  setTimeout(() => setAsk(true), 250);
                }
              : undefined
          }
        />
      )}
      {isOwner && (
        <MigrationRequestSheet
          open={ask}
          onOpenChange={setAsk}
          firmId={firmId}
          defaultEmail={contact.email}
          defaultPhone={contact.phone}
          defaultName={contact.name}
          onSent={refresh}
        />
      )}

      <FormSheet
        open={!!confirm}
        onOpenChange={(o) => !o && setConfirm(null)}
        width="wide"
        title="Undo this import?"
        description={
          confirm
            ? `${countLine(confirm)}. Records that have been used since, such as an invoice you have sent or a job with time on it, are kept.`
            : undefined
        }
        footer={
          <div className="flex gap-2">
            <SecondaryButton className="flex-1" onClick={() => setConfirm(null)}>
              Keep it
            </SecondaryButton>
            <DestructiveButton className="flex-1" onClick={() => confirm && doUndo(confirm)}>
              Undo import
            </DestructiveButton>
          </div>
        }
      >
        <p className="text-[14px] text-white">
          Customers and records that were already in Elec-Mate before the import are never touched.
        </p>
      </FormSheet>
    </>
  );
}
