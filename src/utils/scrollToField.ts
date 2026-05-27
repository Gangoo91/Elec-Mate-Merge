/**
 * Scroll the viewport to a form field and flash it briefly so the sparky's
 * eye can find what was missing.
 *
 * Looks up the target by `[data-field="{name}"]`. Wrap the input (or its
 * containing FormField) with that attribute. Falls back silently if not
 * found — never throws.
 *
 * Used by validation panels: after onJumpToTab switches the tab, we queue
 * a short setTimeout so the tab content is mounted, then call this.
 */
const FLASH_CLASS = 'validation-flash-target';
const FLASH_DURATION_MS = 1500;

export function scrollToField(fieldName: string, delayMs = 50): void {
  if (typeof document === 'undefined' || !fieldName) return;

  // Tab switch may unmount/remount the target; give the DOM a tick to settle.
  setTimeout(() => {
    const el = document.querySelector<HTMLElement>(`[data-field="${CSS.escape(fieldName)}"]`);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Flash highlight — drives an inline outline animation that doesn't need
    // a global stylesheet. Falls back gracefully if a previous flash is still
    // running (we just restart it).
    el.classList.remove(FLASH_CLASS);
    void el.offsetWidth; // force reflow so the next add restarts the animation
    el.classList.add(FLASH_CLASS);
    el.style.transition = 'box-shadow 250ms ease-out, outline-color 250ms ease-out';
    el.style.borderRadius = el.style.borderRadius || '0.5rem';
    el.style.boxShadow = '0 0 0 3px rgba(250, 204, 21, 0.6)';

    setTimeout(() => {
      el.style.boxShadow = '';
      el.classList.remove(FLASH_CLASS);
    }, FLASH_DURATION_MS);
  }, delayMs);
}
