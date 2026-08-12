import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * ELE-1535 — a horizontal scrollbar that stays reachable.
 *
 * The schedule of tests scrolls sideways in a container that is `overflow-y-hidden`
 * and as tall as the whole table, because vertical scrolling belongs to the page.
 * The native horizontal scrollbar therefore sits at the bottom of the *table*, not
 * the viewport: work your way down twenty circuits and it is off-screen above you,
 * and you have to scroll back to the end of the table to move sideways.
 *
 * This mirrors the container's scroll position onto a slim track pinned near the
 * bottom of the viewport. It appears only while the table is on screen and only
 * when there is actually something to scroll to, and it drives — and is driven by
 * — the real container, so either one can be used.
 *
 * Deliberately not solved by giving the container its own vertical scroll: that
 * would trap tablet scrolling inside a full-bleed table, which is worse than the
 * problem being fixed.
 */
interface StickyHorizontalScrollbarProps {
  /** The element that actually scrolls horizontally. */
  targetRef: React.RefObject<HTMLElement>;
  /**
   * Distance from the bottom of the viewport. The default clears the certificate
   * shell's fixed step footer, measured at 73px.
   */
  bottomOffsetClass?: string;
}

export const StickyHorizontalScrollbar: React.FC<StickyHorizontalScrollbarProps> = ({
  targetRef,
  bottomOffsetClass = 'bottom-[80px]',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  /*
   * Horizontal position is taken from the table itself, not from the viewport.
   * `inset-x-0` spanned the full width, so on desktop the track ran underneath
   * the sidebar and its thumb ended up sitting inside the Employer badge in the
   * bottom-left corner — over navigation it has nothing to do with. Matching the
   * table's own left edge and width keeps it where it belongs at any layout.
   */
  const [rect, setRect] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  // Guards the two-way sync so mirroring one scroll cannot bounce back.
  const syncingRef = useRef(false);

  /*
   * The scroll container mounts LATER than this component — it lives inside the
   * table's "are there any circuits?" branch, so on first render targetRef.current
   * is null. A ref object's identity never changes, so an effect keyed on the ref
   * bails once and never runs again, and the scrollbar stays invisible forever.
   * Track the element in state instead, so everything below re-runs the moment it
   * actually appears.
   */
  const [target, setTarget] = useState<HTMLElement | null>(null);
  // Deliberately dependency-free: the element appearing is not a state change
  // React can see, so this has to look after every render. The equality guard
  // stops it looping — adding [targetRef, target] as the linter suggests would
  // break it, because neither changes on the render where the table mounts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (targetRef.current === target) return;
    setTarget(targetRef.current);
  });

  const measure = useCallback(() => {
    if (!target) return;
    setScrollWidth(target.scrollWidth);
    setClientWidth(target.clientWidth);
  }, [target]);

  // Track size changes: columns can be added, and the viewport can rotate.
  useEffect(() => {
    if (!target) return;
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(target);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [target, measure]);

  /*
   * Only show it while the table is actually on screen — a scrollbar floating
   * over an unrelated part of the form would be nonsense.
   *
   * Measured from the element's own rect rather than an IntersectionObserver.
   * The observer fired once at observe() time, when the table's branch had just
   * mounted and still had no height, reported "not intersecting", and never
   * fired again because nothing had scrolled — so the bar stayed hidden forever
   * on exactly the screen it exists for.
   */
  useEffect(() => {
    if (!target) return;
    let frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        /*
         * Only stand in when the real scrollbar cannot be reached.
         *
         * The container's native horizontal scrollbar sits on its bottom edge.
         * While that edge is on screen the native bar is right there, and a
         * floating copy is both redundant and — because it is pinned to the
         * viewport — left hovering over whatever happens to be below the table.
         * So: show it only once the bottom edge has passed below the fold,
         * which is exactly the case this component exists for.
         */
        const bottomEdgeOutOfReach = r.bottom > window.innerHeight;
        const tableOnScreen = r.top < window.innerHeight - 40 && r.height > 40;
        setVisible(tableOnScreen && bottomEdgeOutOfReach);
        setRect({ left: Math.round(r.left), width: Math.round(r.width) });
      });
    };
    check();
    window.addEventListener('scroll', check, { passive: true, capture: true });
    window.addEventListener('resize', check);
    const ro = new ResizeObserver(check);
    ro.observe(target);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', check, { capture: true });
      window.removeEventListener('resize', check);
      ro.disconnect();
    };
  }, [target]);

  // Container → track
  useEffect(() => {
    if (!target) return;
    const onScroll = () => {
      if (syncingRef.current) return;
      const track = trackRef.current;
      if (!track) return;
      syncingRef.current = true;
      track.scrollLeft = target.scrollLeft;
      requestAnimationFrame(() => {
        syncingRef.current = false;
      });
    };
    target.addEventListener('scroll', onScroll, { passive: true });
    return () => target.removeEventListener('scroll', onScroll);
  }, [target]);

  // Track → container
  const handleTrackScroll = () => {
    if (syncingRef.current) return;
    const track = trackRef.current;
    if (!target || !track) return;
    syncingRef.current = true;
    target.scrollLeft = track.scrollLeft;
    requestAnimationFrame(() => {
      syncingRef.current = false;
    });
  };

  const overflows = scrollWidth > clientWidth + 1;
  if (!visible || !overflows) return null;

  return (
    <div
      /*
       * z-30 keeps it BELOW the step footer (z-40) deliberately: if the two ever
       * meet, the footer's Back/Continue must win rather than be covered by a
       * scrollbar. The offset clears that 73px footer with a margin.
       */
      className={`pointer-events-none fixed z-30 ${bottomOffsetClass}`}
      style={{ left: rect.left, width: rect.width }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        onScroll={handleTrackScroll}
        /* Reads as a scrollbar, not a slab: no border, barely-there fill, and
           only as tall as the thumb needs. */
        className="sot-sticky-scrollbar pointer-events-auto overflow-x-auto rounded-full bg-white/[0.04]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Nothing to see — the spacer exists purely to give the track the same
          scrollable width as the table, so its thumb matches the real one. */}
        <div style={{ width: scrollWidth, height: 1 }} />
      </div>
    </div>
  );
};

export default StickyHorizontalScrollbar;
