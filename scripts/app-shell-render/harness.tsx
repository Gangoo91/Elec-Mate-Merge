import { createRoot } from 'react-dom/client';

/*
 * ELE-1752 — is the Elec-AI composer actually on screen?
 *
 * This reproduces the real stack rather than the component: a fixed header, a
 * banner rendered ABOVE the routed page (which is where Layout puts it), and a
 * `.h-app-shell` page whose last child is the composer. The shell does not
 * scroll, so anything past its bottom edge is unreachable — which is the whole
 * bug.
 *
 * It asserts on the composer's position against the viewport, because that is
 * the thing the user experiences. Reasoning about the calc is what produced
 * the bug in the first place.
 */
const errors: string[] = [];
const q = new URLSearchParams(location.search);
const bannerPx = Number(q.get('banner') || '0');
const HEADER_PX = 56;

document.documentElement.style.setProperty('--header-height', `${HEADER_PX}px`);

function Shell() {
  return (
    <div style={{ minHeight: '100dvh' }}>
      <div
        style={{
          position: 'fixed',
          insetInline: 0,
          top: 0,
          height: HEADER_PX,
          background: '#11161d',
        }}
      />
      <div style={{ paddingTop: HEADER_PX }}>
        {/* The banner stack. Layout publishes its height as --banner-height;
            `banner=0` is the no-announcement case. */}
        <div
          ref={(el) => {
            if (el) {
              document.documentElement.style.setProperty('--banner-height', `${el.offsetHeight}px`);
            }
          }}
        >
          {bannerPx > 0 && (
            <div style={{ height: bannerPx, background: '#1d2734' }} id="banner">
              Elec-Mate X Makita
            </div>
          )}
        </div>

        <div className="h-app-shell flex flex-col bg-background">
          <div className="shrink-0 h-12 border-b border-white/10" />
          <div className="min-h-0 flex-1 overflow-y-auto" />
          {/* The composer — the thing that went missing. */}
          <div
            id="composer"
            className="shrink-0 h-[72px] border-t border-white/10 bg-white/[0.04]"
          />
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<Shell />);

setTimeout(() => {
  const composer = document.getElementById('composer')!;
  const r = composer.getBoundingClientRect();
  const vh = window.innerHeight;
  const overflow = Math.round(r.bottom - vh);

  if (r.bottom > vh + 1) {
    errors.push(
      `the composer is ${overflow}px BELOW the fold (bottom ${Math.round(r.bottom)} > viewport ${vh}) — ` +
        `unreachable, because .h-app-shell does not scroll`
    );
  }
  if (r.height < 44) errors.push(`composer is ${Math.round(r.height)}px tall`);

  const shellH = getComputedStyle(document.querySelector('.h-app-shell')!).height;
  document.getElementById('res')!.textContent = errors.length
    ? 'FAIL::' + errors.join(' ||| ')
    : `PASS::banner=${bannerPx}px shell=${shellH} composer bottom=${Math.round(r.bottom)} vh=${vh}`;
}, 350);
