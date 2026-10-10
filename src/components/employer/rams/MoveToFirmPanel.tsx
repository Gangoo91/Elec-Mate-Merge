/**
 * ELE-1940: "Move to firm" for RAMS the signed-in owner or admin made as their
 * own, before the firm had a register. Opt-in per record or all at once, never
 * automatic, never anyone else's, and undoable (Move back).
 *
 * The database decides what may move (rams_move_to_firm): only the caller's own
 * personal RAMS, only into a firm they run. This panel only offers it.
 */
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMoveRams, useRamsMoveCandidates } from '@/hooks/useFirmSafetyDocs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  panel,
  PanelHead,
  Row,
  Tag,
  rowBtnSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';

const day = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

export function MoveToFirmPanel({ employerId }: { employerId: string }) {
  const { toast } = useToast();
  const { data } = useRamsMoveCandidates(employerId);
  const { toFirm, back } = useMoveRams(employerId);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmAll, setConfirmAll] = useState(false);
  const [showAll, setShowAll] = useState(false);

  if (!data?.eligible) return null;
  const personal = data.personal ?? [];
  const moved = data.moved ?? [];
  if (!personal.length && !moved.length) return null;

  const move = async (ids: string[], key: string) => {
    setBusy(key);
    try {
      const res = await toFirm.mutateAsync(ids);
      toast({
        title: res.moved
          ? `${plural(res.moved, 'RAMS', 'RAMS')} moved to the firm`
          : 'Nothing moved',
        description: res.moved
          ? 'They are on the register now. Move back undoes it.'
          : 'Only RAMS you made yourself, and not yet on a job, can move.',
      });
    } catch (err) {
      toast({
        title: 'Not moved',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const moveBack = async (id: string) => {
    setBusy(`back-${id}`);
    try {
      const res = await back.mutateAsync([id]);
      toast(
        res.restored
          ? { title: 'Moved back', description: 'It is your own RAMS again, not the firm’s.' }
          : res.on_job
            ? {
                title: 'Still on a firm job',
                description: 'Take it off the job first, then move it back.',
              }
            : { title: 'Nothing to move back' }
      );
    } catch (err) {
      toast({
        title: 'Not moved back',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const shown = showAll ? personal : personal.slice(0, 5);

  return (
    <section className={panel} data-help="rams.move">
      <PanelHead
        title="Your own RAMS"
        meta={
          personal.length ? (
            <span className="text-[13px] text-white">
              {plural(personal.length, 'not on the register', 'not on the register')}
            </span>
          ) : undefined
        }
      />
      {personal.length > 0 && (
        <>
          <p className="px-4 pt-3 text-[13px] leading-snug text-white sm:px-5">
            You made these before the firm had a register, so only you can see them. Move them to
            the firm and your managers can open and edit them too. Nothing moves unless you ask.
          </p>
          <div className="divide-y divide-white/[0.07]">
            {shown.map((r) => (
              <Row
                key={r.id}
                title={r.title}
                detail={[r.location, day(r.created_at)].filter(Boolean).join(' · ')}
                action={
                  <button
                    type="button"
                    className={rowBtnSecondary}
                    disabled={!!busy}
                    onClick={() => void move([r.id], r.id)}
                  >
                    {busy === r.id ? 'Moving…' : 'Move to firm'}
                  </button>
                }
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.07] px-4 py-3 sm:px-5">
            {personal.length > 5 && (
              <button
                type="button"
                className={rowBtnSecondary}
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? 'Show fewer' : `Show all ${personal.length}`}
              </button>
            )}
            {personal.length > 1 && (
              <button
                type="button"
                className={rowBtnSecondary}
                disabled={!!busy}
                onClick={() => setConfirmAll(true)}
              >
                {busy === 'all' ? 'Moving…' : `Move all ${personal.length}`}
              </button>
            )}
          </div>
        </>
      )}

      {moved.length > 0 && (
        <>
          <div className="border-t border-white/[0.07] px-4 pb-1 pt-3 text-[13px] font-semibold text-white sm:px-5">
            Moved to the firm by you
          </div>
          <div className="divide-y divide-white/[0.07]">
            {moved.map((r) => (
              <Row
                key={r.id}
                title={r.title}
                detail={`Moved ${day(r.moved_at)}`}
                status={r.on_job ? <Tag tone="outline">On a job</Tag> : undefined}
                action={
                  r.on_job ? undefined : (
                    <button
                      type="button"
                      className={rowBtnSecondary}
                      disabled={!!busy}
                      onClick={() => void moveBack(r.id)}
                    >
                      {busy === `back-${r.id}` ? 'Moving…' : 'Move back'}
                    </button>
                  )
                }
              />
            ))}
          </div>
        </>
      )}

      <AlertDialog open={confirmAll} onOpenChange={setConfirmAll}>
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Move all {personal.length} to the firm?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Your managers will be able to open and edit them, as with any firm RAMS. You can move
              any of them back.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={() => {
                setConfirmAll(false);
                void move(
                  personal.map((r) => r.id),
                  'all'
                );
              }}
            >
              Move all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
