import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight, Download, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegePageHeader,
} from '@/components/college/ui/CollegeUi';
import { useMyCollegeAccess } from '@/hooks/college/useCollegeAccess';
import { saveOrShareFile } from '@/utils/save-or-share-file';
import {
  DATAFLOW_SVG,
  SUPPORT_EMAIL,
  TRUST_PACK_CHECKED,
  buildTrustPack,
  splitPlaceholders,
  toStandaloneHtml,
  trustFilename,
  type TrustBlock,
  type TrustDoc,
} from '@/lib/college/trustPack';

/* ==========================================================================
   CollegeTrustPage — /college/trust (ELE-1972, ELE-1915)

   The college IT and procurement pack in the app: security and data
   processing, a pre-filled DPIA, the sub-processor list, the data-flow
   diagram, under-18 handling and the accessibility statement. Each one reads
   here, downloads as a self-contained HTML file and prints to PDF. The words
   live in src/lib/college/trustPack.ts (facts only, placeholders in
   [square brackets]).
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-trust',
  title: 'Security and procurement',
  what: 'The documents your IT lead, data protection officer and procurement team ask for before the college signs, written from how the system actually works.',
  steps: [
    {
      title: 'Read or download',
      body: 'Pick a document to read it here. Download saves it as a file that opens in any browser; Print lets you save it as a PDF.',
    },
    {
      title: 'Square brackets',
      body: 'Text in square brackets is for your college or Elec-Mate to complete, such as company details or your DPO’s risk ratings.',
    },
    {
      title: 'Questions',
      body: `Send anything the pack does not answer to ${SUPPORT_EMAIL}.`,
    },
  ],
};

function Inline({ text }: { text: string }) {
  return (
    <>
      {splitPlaceholders(text).map((r, i) =>
        r.placeholder ? (
          <span
            key={i}
            className="rounded border border-dashed border-elec-yellow/70 px-1 text-elec-yellow"
          >
            {r.text}
          </span>
        ) : (
          <span key={i}>{r.text}</span>
        )
      )}
    </>
  );
}

function Block({ b }: { b: TrustBlock }) {
  switch (b.kind) {
    case 'h2':
      return (
        <h3 className="border-t border-white/[0.1] pt-5 text-[15px] font-semibold tracking-tight text-white">
          <Inline text={b.text} />
        </h3>
      );
    case 'h3':
      return (
        <h4 className="text-[14px] font-semibold text-white">
          <Inline text={b.text} />
        </h4>
      );
    case 'p':
      return (
        <p className="max-w-3xl text-[14px] leading-relaxed text-white">
          <Inline text={b.text} />
        </p>
      );
    case 'note':
      return (
        <p className="max-w-3xl rounded-xl border border-white/[0.18] p-4 text-[13.5px] leading-relaxed text-white">
          <Inline text={b.text} />
        </p>
      );
    case 'ul':
      return (
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-white marker:text-white">
          {b.items.map((it, i) => (
            <li key={i}>
              <Inline text={it} />
            </li>
          ))}
        </ul>
      );
    case 'table':
      // Phone: one card per row (no sideways scrolling). Desktop: a real table.
      return (
        <>
          <div className="space-y-3 lg:hidden">
            {b.rows.map((r, i) => (
              <dl key={i} className="rounded-xl border border-white/[0.12] p-4">
                {r.map((cell, j) => (
                  <div key={j} className={cn(j > 0 && 'mt-2.5')}>
                    <dt className="text-[12.5px] font-semibold text-white">{b.head[j]}</dt>
                    <dd className="mt-0.5 text-[13.5px] leading-relaxed text-white">
                      <Inline text={cell} />
                    </dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
          <table className="hidden w-full border-collapse text-left text-[13px] text-white lg:table">
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="border-b border-white/[0.18] px-3 py-2 align-bottom text-[12px] font-semibold text-white"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-b border-white/[0.08] align-top">
                  {r.map((cell, j) => (
                    <td
                      key={j}
                      className={cn('px-3 py-2.5 leading-relaxed', j === 0 && 'font-semibold')}
                    >
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    case 'diagram':
      return (
        <figure
          className="rounded-xl border border-white/[0.12] p-3 text-white sm:p-5"
          // Static SVG authored in trustPack.ts; no user input reaches it.
          dangerouslySetInnerHTML={{ __html: DATAFLOW_SVG }}
        />
      );
  }
}

/** Prints a standalone document from a hidden frame, so the app chrome is not printed. */
function printHtml(html: string) {
  const frame = document.createElement('iframe');
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(frame);
  const done = () => setTimeout(() => frame.remove(), 1000);
  frame.onload = () => {
    try {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
    } finally {
      done();
    }
  };
  frame.srcdoc = html;
}

export default function CollegeTrustPage() {
  const { toast } = useToast();
  const [params, setParams] = useSearchParams();
  const { data: access } = useMyCollegeAccess();
  const ctx = useMemo(
    () => ({ collegeName: access?.college_name ?? null }),
    [access?.college_name]
  );
  const docs = useMemo(() => buildTrustPack(ctx), [ctx]);
  const current: TrustDoc = docs.find((d) => d.id === params.get('doc')) ?? docs[0];
  const [busy, setBusy] = useState<string | null>(null);

  const pick = (id: string) => {
    const next = new URLSearchParams(params);
    next.set('doc', id);
    setParams(next, { replace: true });
    // On a phone the document sits under the list: bring it into view.
    requestAnimationFrame(() =>
      document.getElementById('trust-doc')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  const download = async (which: TrustDoc[], key: string) => {
    if (busy) return;
    setBusy(key);
    try {
      const html = toStandaloneHtml(which, ctx);
      const res = await saveOrShareFile(
        new Blob([html], { type: 'text/html' }),
        trustFilename(which)
      );
      if (!res.cancelled) {
        toast({
          title: which.length === 1 ? 'Document saved' : 'Pack saved',
          description: 'Open it in any browser. Use Print to save it as a PDF.',
        });
      }
    } catch (e) {
      toast({
        title: 'Could not save',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Security and procurement"
        backTo="/college?section=collegesettings"
      />
      <HubBody hidePushPrompt>
        <CollegePageHeader
          eyebrow="For IT, data protection and procurement"
          title="Security and procurement pack"
          description={`Eight documents written from how the system actually works, checked ${TRUST_PACK_CHECKED}. Read them here, download them, or print them to PDF.`}
          help={HELP}
          actions={
            <button
              type="button"
              onClick={() => void download(docs, 'all')}
              disabled={busy !== null}
              className={COLLEGE_BTN_PRIMARY}
              data-testid="trust-download-all"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {busy === 'all' ? 'Saving…' : 'Download the full pack'}
            </button>
          }
        />

        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <nav aria-label="Documents in the pack" className="min-w-0 lg:sticky lg:top-24">
            <ul className={COLLEGE_LIST}>
              {docs.map((d) => {
                const on = d.id === current.id;
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => pick(d.id)}
                      aria-current={on ? 'true' : undefined}
                      className={cn(
                        'flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left touch-manipulation transition-colors hover:bg-white/[0.04] sm:px-6',
                        // Selected: a lifted surface and a hairline ring, never a coloured left bar.
                        on && 'bg-white/[0.07] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]'
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14.5px] font-semibold leading-snug text-white">
                          {d.title}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                          {d.summary}
                        </span>
                      </span>
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 shrink-0 text-white transition-transform',
                          on && 'translate-x-0.5'
                        )}
                        strokeWidth={on ? 2.75 : 2}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 px-1 text-[12.5px] leading-relaxed text-white">
              Text in{' '}
              <span className="rounded border border-dashed border-elec-yellow/70 px-1 text-elec-yellow">
                [square brackets]
              </span>{' '}
              is for your college or Elec-Mate to complete.
            </p>
          </nav>

          <article
            id="trust-doc"
            aria-labelledby="trust-doc-title"
            className={cn(COLLEGE_CARD, 'min-w-0 scroll-mt-24 space-y-4')}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white">
                  For {current.audience.toLowerCase()}
                </p>
                <h2
                  id="trust-doc-title"
                  className="mt-1 text-[19px] font-semibold tracking-tight text-white"
                >
                  {current.title}
                </h2>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => void download([current], current.id)}
                  disabled={busy !== null}
                  className={COLLEGE_BTN}
                  data-testid="trust-download-one"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {busy === current.id ? 'Saving…' : 'Download'}
                </button>
                <button
                  type="button"
                  onClick={() => printHtml(toStandaloneHtml([current], ctx))}
                  className={COLLEGE_BTN}
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  Print
                </button>
              </div>
            </div>
            {current.blocks.map((b, i) => (
              <Block key={`${current.id}-${i}`} b={b} />
            ))}
          </article>
        </div>
      </HubBody>
    </HubPage>
  );
}
