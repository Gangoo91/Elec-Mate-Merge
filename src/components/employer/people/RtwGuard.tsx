/**
 * The right-to-work gate (ELE-2061).
 *
 * Every path that puts someone to work or pays them calls
 *   if (!(await confirmRtw(ids, 'assign'))) return;
 * before it writes. When everyone is checked it resolves straight away.
 * Otherwise <RtwGuardHost /> (mounted once in the Employer Hub) shows who is
 * unchecked: in "warn" mode the office can carry on, in "block" mode it can
 * only go and record the check. The firm chooses the mode in Right to work
 * and HR records.
 *
 * Block applies to assign and dispatch only (putting someone to work). Hours
 * already worked are always approvable and payable: withholding pay for work
 * done risks an unlawful deduction (Employment Rights Act 1996 s.13), so
 * approve and pay only ever warn. The server enforces block on new bookings
 * too (trigger rtw_block_assignment on employer_job_assignments).
 *
 * It fails open: if the check can't be read (offline, old database) the
 * action goes ahead, so this can never stop a live job being booked.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import FormSheet from '@/components/forms/FormSheet';
import { panel } from '@/components/employer/overview/HomeSections';
import {
  Row,
  StatusPill,
  rowBtnPrimary,
  rowBtnSecondary,
  rowsClass,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';

export type RtwAction = 'assign' | 'dispatch' | 'approve' | 'pay';

interface GatePerson {
  id: string;
  name: string;
  status: 'missing' | 'overdue';
  submitted: boolean;
}
interface Pending {
  action: RtwAction;
  mode: 'warn' | 'block';
  canRecord: boolean;
  people: GatePerson[];
  resolve: (ok: boolean) => void;
}

let hostCount = 0;
let show: ((p: Pending) => void) | null = null;

/** Actions that block mode can stop. Approve and pay always warn. */
const BLOCKABLE: Record<RtwAction, boolean> = {
  assign: true,
  dispatch: true,
  approve: false,
  pay: false,
};

const ACTION_WORD: Record<RtwAction, { verb: string; carry: string }> = {
  assign: { verb: 'put on a job', carry: 'Assign anyway' },
  dispatch: { verb: 'booked on', carry: 'Book anyway' },
  approve: { verb: 'paid for these hours', carry: 'Approve anyway' },
  pay: { verb: 'paid', carry: 'Issue anyway' },
};

export async function confirmRtw(employeeIds: string[], action: RtwAction): Promise<boolean> {
  const ids = [...new Set(employeeIds.filter(Boolean))];
  if (ids.length === 0 || hostCount === 0 || !show) return true;
  try {
    const { data, error } = await supabase.rpc(
      'rtw_gate' as never,
      {
        p_employee_ids: ids,
      } as never
    );
    if (error) return true;
    const res = data as unknown as {
      mode?: 'warn' | 'block';
      can_record?: boolean;
      people?: GatePerson[];
    } | null;
    const people = res?.people ?? [];
    if (people.length === 0) return true;
    return await new Promise<boolean>((resolve) =>
      show?.({
        action,
        mode: res?.mode === 'block' && BLOCKABLE[action] ? 'block' : 'warn',
        canRecord: !!res?.can_record,
        people,
        resolve,
      })
    );
  } catch {
    return true;
  }
}

export function RtwGuardHost() {
  const navigate = useNavigate();
  const [pending, setPending] = useState<Pending | null>(null);

  useEffect(() => {
    hostCount += 1;
    show = (p) => setPending(p);
    return () => {
      hostCount -= 1;
      if (hostCount === 0) show = null;
    };
  }, []);

  const close = (ok: boolean) => {
    pending?.resolve(ok);
    setPending(null);
  };

  const n = pending?.people.length ?? 0;
  const one = pending?.people[0];
  const words = pending ? ACTION_WORD[pending.action] : ACTION_WORD.assign;
  const blocked = pending?.mode === 'block';
  const paying = pending?.action === 'approve' || pending?.action === 'pay';

  return (
    <FormSheet
      open={!!pending}
      onOpenChange={(o) => !o && close(false)}
      width="wide"
      eyebrow="Right to work"
      title={
        n === 1
          ? `${one?.name.split(' ')[0] ?? 'They'} has no right-to-work check`
          : `${n} people have no right-to-work check`
      }
      description={
        blocked
          ? `Your firm blocks this until the check is recorded. Nobody should be ${words.verb} without one.`
          : paying
            ? 'Work already done must be paid, so you can carry on. Record the check before they work again.'
            : `Check before they are ${words.verb}. Your firm has chosen to warn, so you can carry on.`
      }
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            className={cn(rowBtnSecondary, 'flex-1')}
            onClick={() => close(false)}
          >
            Go back
          </button>
          {blocked ? (
            pending?.canRecord && one ? (
              <button
                type="button"
                className={cn(rowBtnPrimary, 'flex-1')}
                onClick={() => {
                  close(false);
                  navigate(`/employer?section=team&member=${one.id}`);
                }}
              >
                Record the check
              </button>
            ) : null
          ) : (
            <button
              type="button"
              className={cn(rowBtnPrimary, 'flex-1')}
              onClick={() => close(true)}
            >
              {words.carry}
            </button>
          )}
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className={cn(panel, 'overflow-hidden')}>
          <div className={rowsClass}>
            {pending?.people.map((p) => (
              <Row
                key={p.id}
                title={p.name}
                detail={
                  p.status === 'overdue'
                    ? 'Follow-up check is overdue'
                    : p.submitted
                      ? 'They sent their details. Do the check and record it'
                      : 'No check recorded'
                }
                trailing={
                  <StatusPill tone="red">
                    {p.status === 'overdue' ? 'Overdue' : 'Missing'}
                  </StatusPill>
                }
                onClick={
                  pending?.canRecord
                    ? () => {
                        close(false);
                        navigate(`/employer?section=team&member=${p.id}`);
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
        <div className="space-y-3 text-[13px] leading-relaxed text-white">
          <p>
            The Home Office expects a right-to-work check before anyone starts work. Since 1 October
            2026 that includes individual subcontractors and workers engaged from that date.
          </p>
          <p>
            Without a check the firm has no excuse against a civil penalty of up to £60,000 per
            person.
          </p>
          {!pending?.canRecord && <p>The owner or an admin records checks. Ask them to do it.</p>}
        </div>
      </div>
    </FormSheet>
  );
}
