/**
 * HomeEditMode — customise the home screen ON the home screen (ELE-1804).
 *
 * The first version was a panel that slid over the page. On a phone it covered
 * the very blocks you were moving, so "changes show straight away" was true
 * only on a laptop, and it ran to three screens of scrolling. Andrew chose the
 * iPhone-home-screen model instead (4 Oct 2026): tap Customise, the real page
 * goes into edit mode, every block gets ▲ ▼ Hide in place, hidden ones park at
 * the bottom with Show, and a bar at the bottom carries the starting layouts
 * and Done. What you see while editing IS the result.
 *
 * Block content is inert while editing so a tap meant for ▲ never opens a cert.
 */

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, EyeOff, Plus, RotateCcw } from 'lucide-react';

import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDashboardPreferences } from '@/hooks/useDashboardPreferences';
import {
  HOME_BLOCKS,
  HOME_PRESETS,
  HOME_SHORTCUTS,
  MAX_SHORTCUTS,
  type HomeBlockId,
  type HomeLayout,
  type HomeNumbers,
  type HomePresetId,
} from '@/hooks/useHomeLayout';
import { hubsForRole } from '@/components/dashboard/editorial/EditorialHubGrid';
import { cn } from '@/lib/utils';

// Solid-or-neutral only — a translucent yellow wash reads brown on this UI.
const CHIP_ON = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const CHIP_OFF = 'border-white/[0.12] bg-white/[0.06] font-medium text-white';

const ICON_BTN =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white touch-manipulation transition-colors active:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none';

// ── The frame each visible block gets while editing ─────────────────────

interface EditFrameProps {
  id: HomeBlockId;
  isFirst: boolean;
  isLast: boolean;
  onMove: (dir: -1 | 1) => void;
  onHide: () => void;
  /** Block-specific control under the toolbar (shortcuts, figures, hubs). */
  extra?: React.ReactNode;
  children: React.ReactNode;
}

export function EditFrame({ id, isFirst, isLast, onMove, onHide, extra, children }: EditFrameProps) {
  const label = HOME_BLOCKS[id].label;
  return (
    // `layout` animates the swap, so a moved block visibly travels to its new
    // place instead of teleporting; the id lets the page keep it in view.
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      id={`home-block-${id}`}
      className="-mx-4 scroll-mb-48 scroll-mt-24 border-y border-dashed border-elec-yellow/50 px-4 pb-4 sm:mx-0 sm:rounded-2xl sm:border-x"
    >
      <div className="flex items-center gap-2 py-2">
        <p className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">{label}</p>
        <button
          type="button"
          className={ICON_BTN}
          onClick={() => onMove(-1)}
          disabled={isFirst}
          aria-label={`Move ${label} up`}
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={ICON_BTN}
          onClick={() => onMove(1)}
          disabled={isLast}
          aria-label={`Move ${label} down`}
        >
          <ChevronDown className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onHide}
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[13px] font-semibold text-white touch-manipulation active:bg-white/[0.12]"
        >
          <EyeOff className="h-4 w-4" />
          Hide
        </button>
      </div>
      {extra && <div className="pb-3">{extra}</div>}
      {/* inert: no navigation, no focus, while the layout is being arranged */}
      <div
        // React 18's DOM types predate `inert`; the attribute itself is supported.
        {...({ inert: '' } as Record<string, string>)}
        aria-hidden
        className="peer pointer-events-none select-none"
      >
        {children}
      </div>
      {/* A block with nothing to show renders nothing — say what will appear,
          rather than leaving a toolbar over an empty frame. */}
      <p className="hidden rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-[13px] leading-snug text-white peer-empty:block">
        {HOME_BLOCKS[id].emptyNote}
      </p>
    </motion.div>
  );
}

// ── Hidden blocks, parked at the bottom ─────────────────────────────────

export function HiddenBlocks({ hidden, onShow }: { hidden: HomeBlockId[]; onShow: (id: HomeBlockId) => void }) {
  if (hidden.length === 0) return null;
  return (
    <section className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <h2 className="text-[15px] font-semibold tracking-tight text-white">Hidden</h2>
      <p className="mt-0.5 text-[13px] text-white">Tap Show to put it back at the bottom.</p>
      <ul className="mt-3 divide-y divide-white/[0.08]">
        {hidden.map((id) => (
          <li key={id} className="flex min-h-[56px] items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-semibold text-white">{HOME_BLOCKS[id].label}</p>
              <p className="text-[12.5px] text-white">{HOME_BLOCKS[id].description}</p>
            </div>
            <button
              type="button"
              onClick={() => onShow(id)}
              className="flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation active:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Show
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Inline controls that live inside a block's frame ────────────────────

export function NumbersChoice({ value, onChange }: { value: HomeNumbers; onChange: (v: HomeNumbers) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {(
        [
          ['business', 'Business figures'],
          ['study', 'Study progress'],
        ] as const
      ).map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={cn('h-11 rounded-xl border text-[14px] touch-manipulation', value === v ? CHIP_ON : CHIP_OFF)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function FrameButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-semibold text-white touch-manipulation active:bg-white/[0.12]"
    >
      {children}
    </button>
  );
}

// ── The bar at the bottom while editing ─────────────────────────────────

interface EditBarProps {
  preset: HomePresetId | null;
  onPreset: (id: HomePresetId) => void;
  onReset: () => void;
  onDone: () => void;
}

const PRESET_SHORT: Record<HomePresetId, string> = {
  work: 'Jobs & certs',
  study: 'Studying',
  both: 'Both',
};

export function EditBar({ preset, onPreset, onReset, onDone }: EditBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.14] bg-[#161616] px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:w-[min(640px,calc(100%-2rem))] sm:-translate-x-1/2 sm:rounded-2xl sm:border lg:left-[calc(50%+8rem)] lg:w-[min(640px,calc(100%-18rem))]">
      <p className="mb-2 text-[12px] font-medium text-white">Start from a layout</p>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(HOME_PRESETS) as HomePresetId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onPreset(id)}
            aria-pressed={preset === id}
            className={cn(
              'h-11 rounded-xl border px-1 text-[13px] leading-tight touch-manipulation',
              preset === id ? CHIP_ON : CHIP_OFF
            )}
          >
            {PRESET_SHORT[id]}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          className="flex h-12 items-center gap-2 rounded-xl px-3 text-[14px] font-medium text-white touch-manipulation active:bg-white/[0.06]"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <button
          type="button"
          onClick={onDone}
          className="h-12 flex-1 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:opacity-90"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ── Small pickers that open from inside a frame ─────────────────────────

function PickerSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isDesktop ? 'right' : 'bottom'}
        className={cn(
          'flex flex-col gap-0 overflow-hidden border-white/10 bg-[#141414] p-0',
          isDesktop ? 'w-[420px] sm:max-w-[420px]' : 'h-[85vh] rounded-t-2xl border-t'
        )}
      >
        <div className="border-b border-white/10 px-5 pb-4 pt-5">
          <SheetTitle className="text-[19px] font-bold tracking-tight text-white">{title}</SheetTitle>
          <SheetDescription className="mt-1 text-[13px] leading-snug text-white">{description}</SheetDescription>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">{children}</div>
        <div className="border-t border-white/10 px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:opacity-90"
          >
            Done
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ShortcutsSheet({
  open,
  onOpenChange,
  layout,
  onChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  layout: HomeLayout;
  onChange: (shortcuts: string[]) => void;
}) {
  const full = layout.shortcuts.length >= MAX_SHORTCUTS;
  const toggle = (id: string) => {
    if (layout.shortcuts.includes(id)) onChange(layout.shortcuts.filter((s) => s !== id));
    // Full: the new one takes the last slot rather than greying the rest out.
    else if (full) onChange([...layout.shortcuts.slice(0, MAX_SHORTCUTS - 1), id]);
    else onChange([...layout.shortcuts, id]);
  };

  return (
    <PickerSheet
      open={open}
      onOpenChange={onOpenChange}
      title={`Your shortcuts · ${layout.shortcuts.length}/${MAX_SHORTCUTS}`}
      description={
        full
          ? `Tap another to swap it in as number ${MAX_SHORTCUTS}. Tap a numbered one to remove it.`
          : `Pick up to ${MAX_SHORTCUTS}, in order. The first is the big yellow button.`
      }
    >
      {(['work', 'study'] as const).map((group) => (
        <div key={group} className="mb-5 last:mb-0">
          <h3 className="mb-2 text-[13px] font-semibold text-white">{group === 'work' ? 'Work' : 'Study'}</h3>
          <div className="flex flex-wrap gap-2">
            {HOME_SHORTCUTS.filter((s) => s.group === group).map((s) => {
              const pos = layout.shortcuts.indexOf(s.id);
              const picked = pos >= 0;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-pressed={picked}
                  className={cn(
                    'flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-[14px] touch-manipulation transition-opacity',
                    picked ? CHIP_ON : CHIP_OFF
                  )}
                >
                  {picked && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-elec-yellow">
                      {pos + 1}
                    </span>
                  )}
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </PickerSheet>
  );
}

export function HubCardsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { profile } = useAuth();
  const { isHubVisible, toggleHub } = useDashboardPreferences();
  const hubs = hubsForRole(profile?.role);

  return (
    <PickerSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Hub cards"
      description="Which cards show in Your hubs. Everything stays in the menu either way."
    >
      <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {hubs.map((h) => (
          <li key={h.id} className="flex min-h-[56px] items-center justify-between gap-3">
            <span className="text-[15px] font-medium text-white">{h.title}</span>
            <Switch
              checked={isHubVisible(h.id)}
              onCheckedChange={(v) => toggleHub({ hubId: h.id, visible: v })}
              aria-label={`Show ${h.title}`}
            />
          </li>
        ))}
      </ul>
    </PickerSheet>
  );
}
