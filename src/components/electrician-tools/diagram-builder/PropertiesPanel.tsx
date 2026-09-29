import { useHaptic } from '@/hooks/useHaptic';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { symbolRegistry } from './symbols/symbolRegistry';
import { SCALE, SNAP_STEP } from './constants';

interface PropertiesPanelProps {
  selectedObject: CanvasObject | null;
  onUpdate: (updates: Partial<CanvasObject>) => void;
  onDelete: () => void;
  onClose: () => void;
  /** The drawing's circuits, so an item can be moved to another one. */
  circuits?: { ref: string; name: string; colour: string }[];
}

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';

/** "S3" → "S": circuits an item can sensibly move between. */
const family = (ref?: string) => /^([A-Z]+)/.exec(ref ?? '')?.[1] ?? '';

/**
 * Properties of the selected item, in the house style (29 Sep 2026).
 *
 * What an electrician needs from a tapped socket: what it is, which room, which
 * circuit — and to move it to another circuit. The old sheet showed raw canvas
 * coordinates ("X 1234") and the circuit as text it could not change.
 */
export const PropertiesPanel = ({
  selectedObject,
  onUpdate,
  onDelete,
  onClose,
  circuits = [],
}: PropertiesPanelProps) => {
  const haptic = useHaptic();
  if (!selectedObject) return null;
  const o = selectedObject;

  const symbolMeta = o.symbolId ? symbolRegistry.find((s) => s.id === o.symbolId) : null;
  const length =
    o.points && o.points.length >= 2
      ? Math.hypot(o.points[1].x - o.points[0].x, o.points[1].y - o.points[0].y) / SCALE
      : null;
  const title =
    symbolMeta?.name ??
    (o.type === 'wall'
      ? 'Wall'
      : o.type === 'text'
        ? 'Label'
        : o.type === 'cable'
          ? 'Cable'
          : 'Item');
  const where = [o.roomName, o.floor].filter(Boolean).join(' · ');

  // Circuits of the same kind (sockets with sockets, lights with lights).
  const sameKind = circuits.filter((c) => family(c.ref) === family(o.circuitRef));

  const nudge = (dx: number, dy: number) => {
    haptic.selection();
    onUpdate({ x: (o.x || 0) + dx * SNAP_STEP, y: (o.y || 0) + dy * SNAP_STEP });
  };
  const padBtn =
    'h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] text-lg font-semibold text-white touch-manipulation active:bg-white/[0.12]';

  return (
    <Sheet open={!!selectedObject} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="flex h-[85vh] flex-col overflow-hidden rounded-t-2xl p-0 lg:h-auto lg:max-h-[85vh]"
      >
        <div className="flex h-full flex-col bg-background">
          <SheetHeader className="mx-auto w-full max-w-2xl px-4 pb-3 pt-5 text-left sm:px-6">
            <SheetTitle className="text-[17px] font-semibold tracking-tight text-white">
              {title}
            </SheetTitle>
            {(where || length !== null) && (
              <p className="text-[13px] text-white">
                {where}
                {length !== null && `${where ? ' · ' : ''}${length.toFixed(2)} m long`}
              </p>
            )}
          </SheetHeader>

          <div className="mx-auto w-full max-w-2xl flex-1 space-y-6 overflow-y-auto px-4 pb-8 sm:px-6">
            {/* Circuit */}
            {o.type === 'symbol' && o.circuitRef && (
              <section>
                <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                  Circuit
                </h3>
                {sameKind.length > 1 ? (
                  <div className="flex flex-wrap gap-2">
                    {sameKind.map((c) => (
                      <button
                        key={c.ref}
                        type="button"
                        onClick={() => {
                          haptic.selection();
                          onUpdate({ circuitRef: c.ref });
                        }}
                        className={cn(
                          'flex h-11 items-center gap-2 rounded-full border px-4 text-sm touch-manipulation',
                          c.ref === o.circuitRef ? chipOn : chipOff
                        )}
                      >
                        <span
                          className="h-4 w-[3px] rounded-full"
                          style={{ backgroundColor: c.colour }}
                        />
                        <span className="font-bold">{c.ref}</span>
                        <span className="max-w-[12rem] truncate">{c.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-white">
                    <span className="font-bold">{o.circuitRef}</span>
                    {sameKind[0] && ` — ${sameKind[0].name}`}
                  </p>
                )}
              </section>
            )}

            {/* Label text */}
            {o.type === 'text' && (
              <section>
                <label
                  htmlFor="prop-text"
                  className="mb-1 block text-[12px] font-medium text-white"
                >
                  Text
                </label>
                <input
                  id="prop-text"
                  value={o.text || ''}
                  onChange={(e) => onUpdate({ text: e.target.value })}
                  className={inputCn}
                  autoFocus
                />
              </section>
            )}

            {/* Size — drawn shapes */}
            {o.type === 'rectangle' && (
              <section className="grid grid-cols-2 gap-4">
                {(
                  [
                    ['width', 'Width (m)'],
                    ['height', 'Height (m)'],
                  ] as const
                ).map(([k, label]) => (
                  <div key={k}>
                    <label
                      htmlFor={`prop-${k}`}
                      className="mb-1 block text-[12px] font-medium text-white"
                    >
                      {label}
                    </label>
                    <input
                      id={`prop-${k}`}
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      min="0.1"
                      value={Math.round(((o[k] ?? 40) / SCALE) * 100) / 100}
                      onChange={(e) => {
                        const v = Number.parseFloat(e.target.value);
                        if (Number.isFinite(v) && v >= 0.1) onUpdate({ [k]: v * SCALE });
                      }}
                      className={inputCn}
                    />
                  </div>
                ))}
              </section>
            )}

            {/* Rotation */}
            {o.type !== 'wall' && (
              <section>
                <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                  Rotation
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 90, 180, 270].map((angle) => {
                    const current = (((o.rotation ?? 0) % 360) + 360) % 360;
                    return (
                      <button
                        key={angle}
                        type="button"
                        onClick={() => {
                          haptic.light();
                          onUpdate({ rotation: angle });
                        }}
                        className={cn(
                          'h-11 rounded-full border text-sm touch-manipulation',
                          Math.round(current) === angle ? chipOn : chipOff
                        )}
                      >
                        {angle}°
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[13px] tabular-nums text-white">
                    {Math.round((((o.rotation ?? 0) % 360) + 360) % 360)}°
                  </span>
                  <div className="flex gap-2">
                    {[-15, 15].map((step) => (
                      <button
                        key={step}
                        type="button"
                        aria-label={step < 0 ? 'Turn 15° anticlockwise' : 'Turn 15° clockwise'}
                        onClick={() => {
                          haptic.selection();
                          onUpdate({ rotation: ((((o.rotation ?? 0) + step) % 360) + 360) % 360 });
                        }}
                        className="h-11 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-sm font-medium text-white touch-manipulation"
                      >
                        {step < 0 ? '−15°' : '+15°'}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Nudge */}
            <section>
              <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                Move <span className="font-medium">(0.1 m a tap)</span>
              </h3>
              <div className="mx-auto grid max-w-[15rem] grid-cols-3 gap-2">
                <div />
                <button
                  type="button"
                  aria-label="Move up"
                  onClick={() => nudge(0, -1)}
                  className={padBtn}
                >
                  ↑
                </button>
                <div />
                <button
                  type="button"
                  aria-label="Move left"
                  onClick={() => nudge(-1, 0)}
                  className={padBtn}
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  onClick={() => nudge(0, 1)}
                  className={padBtn}
                >
                  ↓
                </button>
                <button
                  type="button"
                  aria-label="Move right"
                  onClick={() => nudge(1, 0)}
                  className={padBtn}
                >
                  →
                </button>
              </div>
            </section>

            <button
              type="button"
              onClick={() => {
                haptic.heavy();
                onDelete();
                onClose();
              }}
              className="h-11 w-full rounded-xl border border-red-500/30 text-sm font-semibold text-red-300 touch-manipulation active:bg-red-500/10"
            >
              Delete {symbolMeta ? `this ${title}` : title.toLowerCase()}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
