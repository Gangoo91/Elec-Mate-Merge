/**
 * Global stack of dismissable overlays (sheets, dialogs, sidebars). Used by the
 * Android hardware back button handler in useNativeApp so back closes the
 * topmost overlay before navigating the route history — matching the native
 * Android UX users expect.
 *
 * Usage from a primitive: in the component's open-effect, call pushOverlay
 * with a function that closes the overlay, and call the returned unregister
 * fn on cleanup or when the overlay closes naturally.
 */
type CloseFn = () => void;

const stack: CloseFn[] = [];

export function pushOverlay(close: CloseFn): () => void {
  stack.push(close);
  return () => {
    const idx = stack.lastIndexOf(close);
    if (idx !== -1) stack.splice(idx, 1);
  };
}

/**
 * Pop the top overlay and invoke its close fn. Returns true if an overlay was
 * closed, false if the stack was empty. Caller (back button handler) uses the
 * return value to decide whether to also call history.back().
 */
export function closeTopOverlay(): boolean {
  const close = stack.pop();
  if (!close) return false;
  try {
    close();
  } catch {
    // Ignore — caller doesn't need to know about overlay-internal errors.
  }
  return true;
}

export function overlayCount(): number {
  return stack.length;
}
