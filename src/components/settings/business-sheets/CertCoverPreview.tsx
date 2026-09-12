/**
 * Certificate preview — ELE-1671.
 *
 * Shows the cover sheet and the first interior page as they will actually
 * print, driven by the same `coverPalette()` and `mastheadFor()` the PDF
 * templates are fed. That shared derivation is the point: a preview computed a
 * second way is a preview that drifts, and this whole setting exists because
 * people could not tell what their choices did to the document.
 *
 * It is a faithful miniature, not a pixel-exact copy — the real page is
 * rendered by Chrome from a Liquid template, and duplicating that in React
 * would be a second implementation to keep in step. What it does guarantee is
 * the part people get wrong: the colours, and whether the logos are visible.
 */
import { coverPalette, type CertCoverStyle } from '@/utils/certBranding';
import type { LogoTone } from '@/utils/logoTone';
import { cn } from '@/lib/utils';

interface CertCoverPreviewProps {
  coverStyle: CertCoverStyle;
  coverColor: string;
  logoTone: LogoTone;
  logoUrl?: string | null;
  /** The standard lockup — dark ink, for a white masthead. */
  schemeLogoUrl?: string | null;
  /**
   * The reversed lockup — white ink, for a masthead that has gone dark because
   * the company's own logo is light artwork. Without this the preview shows a
   * dark wordmark on a dark band and reports a fault the PDF does not have.
   */
  schemeLogoReversedUrl?: string | null;
  companyName?: string | null;
  className?: string;
}

const Page = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="min-w-0 flex-1">
    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
      {label}
    </div>
    <div
      className="overflow-hidden rounded-xl border border-white/[0.12] bg-white"
      style={{ aspectRatio: '210 / 297' }}
    >
      {children}
    </div>
  </div>
);

export const CertCoverPreview = ({
  coverStyle,
  coverColor,
  logoTone,
  logoUrl,
  schemeLogoUrl,
  schemeLogoReversedUrl,
  companyName,
  className,
}: CertCoverPreviewProps) => {
  const c = coverPalette(coverStyle, coverColor, '#fbbf24', logoTone);

  // Same rule the payload applies: the masthead's ground picks the lockup.
  // Falls back to the standard artwork when no reversed asset exists for the
  // scheme, which is what the certificate itself does.
  const schemeLogo =
    c.schemeLogoVariant === 'reversed' ? schemeLogoReversedUrl || schemeLogoUrl : schemeLogoUrl;

  const masthead = (
    <div
      className="flex items-center justify-between px-2 py-1.5"
      style={{ background: c.mast_bg }}
    >
      {logoUrl ? (
        <img src={logoUrl} alt="" className="max-h-[14px] max-w-[46%] object-contain" />
      ) : (
        <span className="truncate text-[6px] font-bold" style={{ color: c.mast_fg }}>
          {companyName || 'Your company'}
        </span>
      )}
      {schemeLogo ? (
        <img src={schemeLogo} alt="" className="max-h-[11px] max-w-[26%] object-contain" />
      ) : null}
    </div>
  );

  return (
    <div className={cn('flex gap-3', className)}>
      <Page label="Cover">
        <div className="flex h-full flex-col">
          {masthead}
          <div
            className="px-2 pb-3 pt-2"
            style={{
              background: `linear-gradient(160deg, ${c.cover_from} 0%, ${c.cover_mid} 62%, ${c.cover_to} 100%)`,
              borderTop: `2px solid ${c.accent}`,
            }}
          >
            <div
              className="text-[4.5px] font-bold uppercase tracking-[0.16em]"
              style={{ color: c.accent }}
            >
              BS 7671:2018 + Amendment 4:2026
            </div>
            <div
              className="mt-1 text-[11px] font-extrabold leading-[1.02] tracking-tight"
              style={{ color: c.cover_fg }}
            >
              Electrical Installation
              <br />
              Certificate
            </div>
            <div className="mt-1.5 h-[2px] w-5 rounded-full" style={{ background: c.accent }} />
            <div className="mt-1.5 text-[4.5px]" style={{ color: c.cover_muted }}>
              {companyName || 'Your company name'}
            </div>
          </div>
          <div
            className="flex items-center justify-between px-2 py-1"
            style={{ background: c.cover_mid }}
          >
            <span
              className="text-[4px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: c.cover_fg }}
            >
              Certification
            </span>
            <span className="text-[5px] font-bold" style={{ color: c.accent }}>
              New installation
            </span>
          </div>
          <div className="flex flex-1 flex-col px-2 pt-2">
            <div className="text-[4px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Installation
            </div>
            <div className="mt-0.5 text-[7px] font-extrabold tracking-tight text-slate-900">
              4 Abbey Road
            </div>
            <div className="mt-2 h-px bg-slate-200" />
            <div className="mt-2 flex gap-2">
              {['Date', 'Signed by', 'Scheme'].map((l) => (
                <div key={l} className="flex-1">
                  <div className="text-[3.5px] uppercase tracking-wider text-slate-400">{l}</div>
                  <div className="mt-0.5 h-1 w-full rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
            <div className="mt-2 h-px bg-slate-200" />
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[9px] font-extrabold tracking-tight text-slate-900">
                09/09/2031
              </span>
              <span className="text-[3.5px] text-slate-400">Next inspection due</span>
            </div>
            <div className="mt-2 h-px bg-slate-200" />
            {/* The readings row and the issued-by line are stubbed in so the
                miniature has the REAL page's proportions. Without them the
                preview shows a third of a page of white that the printed
                certificate does not have, which makes the design look emptier
                than it is. */}
            <div className="mt-2 flex gap-2">
              {['Zs', 'Insulation', 'RCD'].map((l) => (
                <div key={l} className="flex-1">
                  <div className="text-[3.5px] uppercase tracking-wider text-slate-400">{l}</div>
                  <div className="mt-0.5 h-1.5 w-3/4 rounded-full bg-slate-300" />
                </div>
              ))}
            </div>
            <div className="mt-auto" />
            <div className="mt-2 h-px bg-slate-200" />
            <div className="mb-1.5 mt-1.5">
              <div className="text-[3.5px] uppercase tracking-wider text-slate-400">Issued by</div>
              <div className="mt-0.5 flex items-center gap-1">
                <span className="text-[4.5px] font-bold text-slate-900">
                  {companyName || 'Your company'}
                </span>
                <span className="h-1 w-8 rounded-full bg-slate-200" />
                <span className="h-1 w-6 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
          <div className="px-2 py-1" style={{ background: c.cover_from }}>
            <div className="text-[3.5px] italic" style={{ color: c.cover_dim }}>
              Produced with Elec-Mate
            </div>
          </div>
        </div>
      </Page>

      <Page label="Page 1">
        <div className="flex h-full flex-col">
          {/* The interior masthead stays dark on every page — that is why the
              scheme logo needs a second, reversed variant alongside the cover's. */}
          <div
            className="flex items-center justify-between px-2 py-1.5"
            style={{
              background: `linear-gradient(180deg, ${c.cover_from} 0%, ${c.cover_mid} 100%)`,
            }}
          >
            <span className="truncate text-[5px] font-bold" style={{ color: c.cover_fg }}>
              {companyName || 'Your company'}
            </span>
            <span className="text-[4px]" style={{ color: c.cover_muted }}>
              Page 1 of 5
            </span>
          </div>
          <div className="flex-1 space-y-1.5 px-2 py-2">
            {[
              'Part 1 — Details of the client',
              'Part 2 — Installation address',
              'Part 3 — Earthing & bonding',
            ].map((t) => (
              <div key={t}>
                {/* The section band is deliberately NOT the cover colour. Every
                    template hardcodes `.section-title` to this slate gradient
                    with white text, so the headings stay readable whatever the
                    electrician picks — and in print mode `cover_from` is #ffffff,
                    which would render white-on-white here and misrepresent a
                    document that is actually fine. Only the accent rule tracks
                    the brand, exactly as `border-left: 3px solid var(--accent-color)`
                    does in the templates. */}
                <div
                  className="px-1 py-0.5 text-[4px] font-bold uppercase tracking-wider text-white"
                  style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderLeft: `1px solid ${c.accent}`,
                  }}
                >
                  {t}
                </div>
                <div className="mt-1 space-y-1">
                  <div className="h-1.5 w-full rounded-sm border border-slate-200" />
                  <div className="h-1.5 w-[78%] rounded-sm border border-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </div>
  );
};

export default CertCoverPreview;
