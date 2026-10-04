import { useEffect, useState } from 'react';

/**
 * True while an on-screen keyboard is actually covering the page.
 *
 * Detected from the visual viewport shrinking, not from a field having focus:
 * a focus-based guess hid the sign-up footer for anyone on a tablet with a
 * hardware keyboard (or a desktop browser narrower than lg), leaving them no
 * Continue button until they clicked away (found 4 Oct 2026).
 */
export function useKeyboardOpen(threshold = 150) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const vv = typeof window !== 'undefined' ? window.visualViewport : null;
    if (!vv) return;
    const update = () => setOpen(window.innerHeight - vv.height > threshold);
    update();
    vv.addEventListener('resize', update);
    return () => vv.removeEventListener('resize', update);
  }, [threshold]);

  return open;
}
