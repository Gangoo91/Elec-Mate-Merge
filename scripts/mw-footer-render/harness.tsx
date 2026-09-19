import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import MWStickyFooter from '@/components/minor-works/MWStickyFooter';

/*
 * ELE-1750 — does the Sign off footer actually mount, and does the row of
 * actions survive a phone?
 *
 * The bug this guards is not a crash. `MWStickyFooter` gained a fifth button
 * (View PDF), and five `flex-1` buttons on a 390px screen is how a footer goes
 * from usable to unusable without anything failing — tsc, eslint and the dev
 * server are all silent on a button squeezed to 60px with its label clipped.
 * So the assertions are about GEOMETRY: every action reachable, none below the
 * 44px touch minimum, nothing overflowing the viewport.
 */
const errors: string[] = [];
window.addEventListener('error', (e) => errors.push('window.error: ' + e.message));
const origErr = console.error;
console.error = (...a: unknown[]) => {
  errors.push('console.error: ' + a.map(String).join(' '));
  origErr(...a);
};

/*
 * A boundary, not a bare mount. `window.onerror` on a file:// page reports
 * "Script error." with the real message stripped, so without this the harness
 * tells you something broke and refuses to say what.
 */
class Boundary extends React.Component<{ children: React.ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) {
    return { err };
  }
  componentDidCatch(err: Error) {
    errors.push(`CRASH: ${err.message}`);
  }
  render() {
    return this.state.err ? null : (this.props.children as React.ReactElement);
  }
}

const q = new URLSearchParams(location.search);
const withReportId = q.get('reportId') !== 'none';

createRoot(document.getElementById('root')!).render(
  <Boundary>
    {/* ReportPdfViewer calls useNavigate(), which needs a Router above it. The
      app always has one; the harness has to supply its own. */}
    <MemoryRouter>
      <MWStickyFooter
        previewData={{ clientName: 'A. Gilbert', propertyAddress: '16 Grafton Way' }}
        previewReportId={withReportId ? 'MW-2026-7710' : null}
        currentTabIndex={3}
        totalTabs={4}
        canNavigatePrevious
        navigateNext={() => {}}
        navigatePrevious={() => {}}
        onEmail={() => {}}
        onInvoice={() => {}}
        onGenerate={() => {}}
      />
    </MemoryRouter>
  </Boundary>
);

const EXPECTED_WITH_ID = [
  'Back',
  'Preview',
  'View PDF',
  'Email',
  'Invoice',
  'Generate certificate',
];
const EXPECTED_NO_ID = ['Back', 'Preview', 'Email', 'Invoice', 'Generate certificate'];

setTimeout(() => {
  const expected = withReportId ? EXPECTED_WITH_ID : EXPECTED_NO_ID;
  const buttons = Array.from(document.querySelectorAll('button'));
  const labels = buttons.map((b) => (b.textContent || '').trim());

  for (const label of expected) {
    if (!labels.includes(label))
      errors.push(`missing action: "${label}" (found: ${labels.join(', ')})`);
  }
  // A "View PDF" that appears before the certificate is saved would open an
  // empty viewer, so its ABSENCE is as much a requirement as its presence.
  if (!withReportId && labels.includes('View PDF')) {
    errors.push('View PDF is offered on an unsaved certificate — it has nothing to render');
  }

  for (const b of buttons) {
    const r = b.getBoundingClientRect();
    const label = (b.textContent || '').trim();
    if (r.width === 0 && r.height === 0) continue;
    if (r.height < 44)
      errors.push(`"${label}" is ${Math.round(r.height)}px tall — below the 44px touch minimum`);
    /*
     * The width floor is a MOBILE rule only. Below `lg` the buttons stretch
     * (`flex-1`) and share the row, so a narrow one means the row is
     * overcrowded. From `lg` up they are `lg:flex-none lg:px-5` and size to
     * their own text — "Back" is legitimately 75px there, and asserting a
     * floor made the harness fail healthy code.
     */
    if (window.innerWidth < 1024 && r.width < 76) {
      errors.push(`"${label}" is only ${Math.round(r.width)}px wide — the row is overcrowded`);
    }
    if (r.right > window.innerWidth + 0.5)
      errors.push(
        `"${label}" overflows the viewport (right ${Math.round(r.right)} > ${window.innerWidth})`
      );
    if (b.scrollWidth > b.clientWidth + 1)
      errors.push(`"${label}" label is clipped by its own button`);
  }

  if (document.documentElement.scrollWidth > window.innerWidth + 0.5) {
    errors.push(
      `the page scrolls sideways (${document.documentElement.scrollWidth} > ${window.innerWidth})`
    );
  }

  /*
   * CLAUDE.md: "All text is `text-white`. Low-opacity white (`text-white/65`)
   * renders as grey and is not allowed." Nothing in the build enforces that —
   * `text-white/80` is a perfectly valid class — so three greyed labels sat in
   * this footer until a screenshot showed them. Alpha is the one thing a
   * renderer can check that a linter cannot.
   */
  for (const el of Array.from(document.querySelectorAll('#root *'))) {
    const text = Array.from(el.childNodes)
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => (n.textContent || '').trim())
      .join('');
    if (!text) continue;
    /*
     * Only `rgba(r, g, b, a)` carries an alpha. A first pass regexed the last
     * number out of any colour, which read `rgb(0, 0, 0)` — plain black, the
     * Generate button's own label — as alpha 0 and failed every case. Split on
     * commas and require four parts.
     */
    const parts = getComputedStyle(el).color.match(/^rgba\(([^)]+)\)$/);
    const alpha = parts ? parts[1].split(',').map((v) => v.trim()) : null;
    if (alpha && alpha.length === 4 && Number(alpha[3]) < 1) {
      errors.push(
        `"${text.slice(0, 40)}" is rendered at ${alpha[3]} opacity — grey text is not allowed`
      );
    }
  }

  const res = document.getElementById('res')!;
  res.textContent = errors.length
    ? 'FAIL::' + errors.join(' ||| ')
    : /*
       * The width is reported, not assumed. An earlier runner asked for 390 and
       * rendered at 500 — every case passed a viewport it had never used, while
       * the screenshot beside it showed a button sliced off the edge. If the
       * number here is not the number the runner asked for, the run is void.
       */
      `PASS::@${window.innerWidth}px — ${labels.filter(Boolean).length} actions, all ≥44px, no overflow, no grey text`;
}, 400);
