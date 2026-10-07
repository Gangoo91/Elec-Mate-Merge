import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, Clock, Eye, MessageSquare, MessagesSquare, Plus, UserCheck } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { RecordObservationSheet } from '@/components/college/sheets/RecordObservationSheet';
import { StudentMessageSheet } from '@/components/college/sheets/StudentMessageSheet';
import { LearnerPicker } from '@/components/college/observe/LearnerPicker';
import { useCollegePortfolioOverview } from '@/components/college/portfolio/useCollegePortfolioOverview';
import { useCollegeCan, type CollegeCapability } from '@/hooks/useCollegeCan';

/* ==========================================================================
   CollegeActSheet — the tutor's workshop actions (ELE-1891): register,
   observe, decide, verify hours, message, and a professional discussion.

   No bottom bar in the College Hub (Andrew, 7 Oct). The actions are reached
   two ways instead:
   - `CollegeActButton`: the volt Act button in the masthead of every College
     Hub page, phone and desktop (CollegeGuard hands it to HubMasthead), so
     every action is two taps from anywhere: Act, then the action.
   - `CollegeActStrip`: the same tiles inline on the College Hub home, one tap.

   The sheet opens from the bottom with the tiles in the lower half of the
   screen, where a thumb already is. Observe and Message pick the learner
   inside their own sheet, so nothing here needs the dashboard; the register
   opens in place when the caller can host it (`onRegister`), otherwise it
   hands over to the College Hub.
   ========================================================================== */

type Flow = null | 'observe' | 'discussion' | 'decide' | 'message';

type ActTile = { key: string; label: string; hint: string; Icon: typeof Eye; onClick: () => void; primary?: boolean };

/** The six tiles and the sheets they open. `close` runs before each action (closes the Act sheet). */
function useCollegeActions(close: () => void, onRegister?: () => void) {
  const navigate = useNavigate();
  const [flow, setFlow] = useState<Flow>(null);
  const [messageTo, setMessageTo] = useState<{ id: string; name: string } | null>(null);
  // ELE-1898: each tile needs its capability (support and EQA are read only).
  const { can, loading: capsLoading } = useCollegeCan();

  const start = (f: Exclude<Flow, null>) => {
    close();
    setFlow(f);
  };

  const allTiles: (ActTile & { needs: CollegeCapability })[] = [
    {
      key: 'register',
      needs: 'register.take',
      label: 'Register',
      hint: 'Tap only who is missing',
      Icon: UserCheck,
      onClick: () => {
        close();
        if (onRegister) onRegister();
        else navigate('/college?act=register');
      },
    },
    {
      key: 'observe',
      needs: 'observations.record',
      label: 'Observe',
      hint: 'Tick criteria, add a photo',
      Icon: Eye,
      onClick: () => start('observe'),
      primary: true,
    },
    {
      key: 'decide',
      needs: 'assess.decide',
      label: 'Decide',
      hint: 'Pass or refer criteria',
      Icon: ClipboardCheck,
      onClick: () => start('decide'),
    },
    {
      key: 'hours',
      needs: 'learners.edit',
      label: 'Verify hours',
      hint: 'Off-the-job to approve',
      Icon: Clock,
      onClick: () => {
        close();
        navigate('/college/otj');
      },
    },
    {
      key: 'message',
      needs: 'messages.send',
      label: 'Message',
      hint: 'A learner, privately',
      Icon: MessageSquare,
      onClick: () => start('message'),
    },
    {
      key: 'discussion',
      needs: 'observations.record',
      label: 'Discussion',
      hint: 'Professional discussion',
      Icon: MessagesSquare,
      onClick: () => start('discussion'),
    },
  ];

  // Until the answer arrives, show every tile rather than flash an empty strip.
  const tiles: ActTile[] = capsLoading ? allTiles : allTiles.filter((t) => can(t.needs));

  const flows = (
    <>
      <RecordObservationSheet
        open={flow === 'observe' || flow === 'discussion'}
        onOpenChange={(o) => !o && setFlow(null)}
        kind={flow === 'discussion' ? 'professional_discussion' : 'observation'}
      />

      {flow === 'decide' && (
        // Mounted only when asked: the overview counts every learner's criteria.
        <DecidePicker
          open
          onOpenChange={(o) => !o && setFlow(null)}
          onPick={(id) => {
            setFlow(null);
            navigate(`/college?section=student360&studentId=${id}#assess`);
          }}
        />
      )}

      <FormSheet
        open={flow === 'message'}
        onOpenChange={(o) => !o && setFlow(null)}
        width="wide"
        eyebrow="Message"
        title="Who to message?"
      >
        <div className="mx-auto w-full max-w-2xl">
          <LearnerPicker
            onPick={(l) => {
              setFlow(null);
              setMessageTo({ id: l.id, name: l.name });
            }}
          />
        </div>
      </FormSheet>
      {messageTo && (
        <StudentMessageSheet
          open={!!messageTo}
          onOpenChange={(o) => !o && setMessageTo(null)}
          studentId={messageTo.id}
          studentName={messageTo.name}
        />
      )}
    </>
  );

  return { tiles, flows };
}

export function CollegeActSheet({
  open,
  onOpenChange,
  onRegister,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** Open the register here. Without it, the register opens in the College Hub. */
  onRegister?: () => void;
}) {
  const { tiles, flows } = useCollegeActions(() => onOpenChange(false), onRegister);
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
        >
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-white/15" aria-hidden />
          <div className="mx-auto w-full max-w-xl px-4 pb-4 pt-3 sm:px-6">
            <SheetTitle className="text-left text-[20px] font-semibold tracking-tight text-white">
              What do you need to do?
            </SheetTitle>
            <SheetDescription className="mt-0.5 text-left text-[13px] text-white">
              Everything you do in the workshop, one tap from here.
            </SheetDescription>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {tiles.map(({ key, label, hint, Icon, onClick, primary }) => (
                <button
                  key={key}
                  type="button"
                  onClick={onClick}
                  className={cn(
                    'flex h-24 flex-col items-start justify-between rounded-2xl border p-3.5 text-left transition-colors touch-manipulation active:scale-[0.99]',
                    primary
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.12] bg-white/[0.05] text-white active:bg-white/[0.1]'
                  )}
                >
                  <Icon className={cn('h-5 w-5', primary ? 'text-black' : 'text-elec-yellow')} aria-hidden />
                  <span className="w-full min-w-0">
                    <span className="block text-[15px] font-semibold leading-tight">{label}</span>
                    <span className={cn('mt-0.5 block truncate text-[11.5px]', primary ? 'text-black' : 'text-white')}>
                      {hint}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-3 h-12 w-full rounded-xl text-[14px] font-medium text-white touch-manipulation"
              style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
            >
              Close
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {flows}
    </>
  );
}

/** Decide: learners with criteria waiting first, with the count. */
function DecidePicker({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPick: (studentId: string) => void;
}) {
  const { data } = useCollegePortfolioOverview();
  const waiting = new Map(
    (data?.learners ?? []).map((l) => [l.student_id, (l.criteria?.claimed ?? 0) + (l.criteria?.submitted ?? 0)])
  );
  return (
    <FormSheet open={open} onOpenChange={onOpenChange} width="wide" eyebrow="Decide" title="Whose criteria?">
      <div className="mx-auto w-full max-w-2xl">
        <LearnerPicker
          requireAccount
          onPick={(l) => onPick(l.id)}
          trailing={(l) => {
            const n = waiting.get(l.id) ?? 0;
            return n > 0 ? (
              <span className="shrink-0 rounded-full bg-elec-yellow px-2.5 py-1 text-[12px] font-semibold tabular-nums text-black">
                {n} ready
              </span>
            ) : null;
          }}
        />
      </div>
    </FormSheet>
  );
}

/**
 * The Act button in the College Hub masthead, phone and desktop. The tap
 * target is the full 44px of the 48px masthead; the volt pill inside it is
 * drawn smaller so the bar does not look crowded.
 */
export function CollegeActButton({ onRegister }: { onRegister?: () => void }) {
  const [open, setOpen] = useState(false);
  // Read-only staff (support, EQA) have nothing to act on.
  const { readOnly } = useCollegeCan();
  if (readOnly) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Act: register, observe, decide, verify hours, message"
        className="group flex h-11 shrink-0 items-center px-1.5 touch-manipulation"
      >
        <span className="inline-flex h-9 items-center gap-1 rounded-full bg-elec-yellow pl-2.5 pr-3.5 text-[13px] font-semibold text-black transition-opacity group-hover:opacity-90 group-active:scale-95">
          <Plus className="h-4 w-4" strokeWidth={2.6} aria-hidden />
          Act
        </span>
      </button>
      <CollegeActSheet open={open} onOpenChange={setOpen} onRegister={onRegister} />
    </>
  );
}

/**
 * The same six actions laid out on the College Hub home, one tap each. Three
 * across on a phone (labels only, the hints do not fit), six across on a
 * wide screen.
 */
export function CollegeActStrip({ onRegister }: { onRegister?: () => void }) {
  const { tiles, flows } = useCollegeActions(() => undefined, onRegister);
  if (tiles.length === 0) return null;
  return (
    <>
      <div className="grid grid-cols-3 gap-2 lg:grid-cols-6 lg:gap-3">
        {tiles.map(({ key, label, hint, Icon, onClick, primary }) => (
          <button
            key={key}
            type="button"
            onClick={onClick}
            className={cn(
              'flex min-h-[76px] flex-col items-start justify-between gap-2 rounded-2xl border p-3 text-left transition-colors touch-manipulation active:scale-[0.99] lg:min-h-[88px] lg:p-3.5',
              primary
                ? 'border-elec-yellow bg-elec-yellow text-black'
                : 'border-white/[0.12] bg-white/[0.05] text-white hover:bg-white/[0.08] active:bg-white/[0.1]'
            )}
          >
            <Icon className={cn('h-5 w-5', primary ? 'text-black' : 'text-elec-yellow')} aria-hidden />
            <span className="w-full min-w-0">
              <span className="block text-[14px] font-semibold leading-tight">{label}</span>
              <span className={cn('mt-0.5 hidden truncate text-[11.5px] sm:block', primary ? 'text-black' : 'text-white')}>
                {hint}
              </span>
            </span>
          </button>
        ))}
      </div>
      {flows}
    </>
  );
}
