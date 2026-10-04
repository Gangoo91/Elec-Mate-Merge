/**
 * LegalDocument — renders one of the legal documents in src/content/legal/*.md
 * (4 Oct 2026). The Markdown is the single source: the same files build the
 * static public/privacy.html and public/account-deletion.html that Google Play
 * and Apple reviewers load without JavaScript (scripts/build-legal-static.mjs),
 * so the app page and the static page can no longer say different things.
 *
 * Volt: grey ground, white type, volt only as a line or a label. Contents rail
 * sticks beside the text on desktop; on phones it's a ruled list at the top.
 */
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { LEGAL_DOCS, parseLegalDoc, slugify } from '@/content/legal/parse';

const textOf = (children: ReactNode): string =>
  Array.isArray(children)
    ? children.map(textOf).join('')
    : typeof children === 'string' || typeof children === 'number'
      ? String(children)
      : children && typeof children === 'object' && 'props' in children
        ? textOf((children as { props: { children?: ReactNode } }).props.children)
        : '';

type El = ReactElement<{ children?: ReactNode; 'data-label'?: string }>;
const kids = (node: ReactNode) => Children.toArray(node).filter(isValidElement) as El[];

/**
 * Tables are a real table from sm: up. On a phone each row becomes its own
 * ruled block, with the column name above each value — no sideways
 * scrolling (CLAUDE.md: no horizontal tables on mobile).
 */
function ResponsiveTable({ children }: { children: ReactNode }) {
  const parts = kids(children);
  const head = parts.find((c) => c.type === 'thead');
  const body = parts.find((c) => c.type === 'tbody');
  const labels = head
    ? kids(kids(head.props.children)[0]?.props.children).map((th) => textOf(th.props.children))
    : [];
  const rows = body ? kids(body.props.children) : [];

  return (
    <table className="mt-5 block w-full border-collapse text-left text-[15px] leading-snug text-white sm:table sm:text-[14.5px]">
      <thead className="hidden border-b border-elec-yellow/50 sm:table-header-group">
        <tr>
          {labels.map((l) => (
            <th
              key={l}
              className="py-2.5 pr-4 align-bottom text-[12.5px] font-semibold uppercase tracking-[0.08em] text-white"
            >
              {l}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block border-t border-white/[0.08] sm:table-row-group sm:border-t-0">
        {rows.map((tr, r) => (
          <tr key={r} className="block border-b border-white/[0.08] py-3 sm:table-row sm:py-0">
            {kids(tr.props.children).map((td, c) =>
              cloneElement(td, {
                key: c,
                children: (
                  <>
                    {labels[c] && c > 0 && (
                      <span className="block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-elec-yellow sm:hidden">
                        {labels[c]}
                      </span>
                    )}
                    {td.props.children}
                  </>
                ),
              })
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LegalDocument({ source }: { source: string }) {
  const doc = parseLegalDoc(source);

  useEffect(() => {
    document.title = `${doc.title} · Elec-Mate`;
    // Arriving on /privacy#8-international-transfers should land on it once
    // the lazy chunk has rendered.
    if (window.location.hash) {
      const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      el?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [doc.title]);

  const isInternal = (href?: string) => !!href && href.startsWith('/');

  return (
    <PublicPageLayout>
      <div className="px-5 pb-16 pt-10 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="max-w-[46rem]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              Legal · Elec-Mate Ltd
            </p>
            <h1 className="mt-3 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[46px]">
              {doc.title}
            </h1>
            <p className="mt-4 text-[17px] leading-[1.6] text-white">{doc.summary}</p>
            <p className="mt-4 text-[13.5px] font-medium text-white">
              Last updated <span className="text-elec-yellow">{doc.updated}</span>
            </p>
          </header>

          <div className="mt-10 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            {/* Contents */}
            <nav aria-label="Contents" className="mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-[calc(5rem+env(safe-area-inset-top,0px))]">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
                  Contents
                </p>
                <ol className="mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08] lg:divide-y-0 lg:border-y-0">
                  {doc.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="flex min-h-[44px] items-center py-1 text-[14.5px] text-white transition-colors hover:text-elec-yellow touch-manipulation lg:min-h-[34px] lg:text-[13.5px]"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            {/* Body */}
            <article className="min-w-0 max-w-[46rem]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const id = slugify(textOf(children));
                    return (
                      <h2
                        id={id}
                        className="mt-12 scroll-mt-24 border-t border-white/[0.08] pt-8 text-[22px] font-bold leading-tight tracking-[-0.02em] text-white first:mt-0 first:border-t-0 first:pt-0 sm:text-[26px]"
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => (
                    <h3 className="mt-6 text-[17px] font-semibold text-white">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mt-4 text-[16px] leading-[1.7] text-white">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-[1.65] text-white marker:text-elec-yellow">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mt-4 list-decimal space-y-2 pl-5 text-[16px] leading-[1.65] text-white marker:font-semibold marker:text-elec-yellow">
                      {children}
                    </ol>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  code: ({ children }) => (
                    <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[14px] text-white">
                      {children}
                    </code>
                  ),
                  a: ({ href, children }) =>
                    isInternal(href) ? (
                      <Link
                        to={href as string}
                        className="font-semibold text-elec-yellow underline decoration-elec-yellow/40 underline-offset-2 hover:decoration-elec-yellow"
                      >
                        {children}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-elec-yellow underline decoration-elec-yellow/40 underline-offset-2 hover:decoration-elec-yellow"
                      >
                        {children}
                      </a>
                    ),
                  table: ({ children }) => <ResponsiveTable>{children}</ResponsiveTable>,
                  td: ({ children }) => (
                    <td className="block py-1 align-top first:text-[16px] first:font-semibold sm:table-cell sm:py-3 sm:pr-4 sm:first:text-[14.5px] sm:first:font-normal">
                      {children}
                    </td>
                  ),
                }}
              >
                {doc.body}
              </ReactMarkdown>

              {/* Other documents */}
              <div className="mt-14 border-t border-white/[0.08] pt-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                  Other legal pages
                </p>
                <ul className="mt-3 grid divide-y divide-white/[0.08] border-y border-white/[0.08] sm:grid-cols-2 sm:divide-y-0">
                  {LEGAL_DOCS.map((d) => (
                    <li key={d.href} className="sm:border-b sm:border-white/[0.08]">
                      <Link
                        to={d.href}
                        className="flex min-h-[48px] items-center text-[15px] font-medium text-white hover:text-elec-yellow touch-manipulation"
                      >
                        {d.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[13.5px] leading-relaxed text-white">
                  Elec-Mate Ltd · company number 16416291 · registered office 33 Gable Road,
                  Whitehaven, CA28 8HE · ICO registration ZB935897 · info@elec-mate.com
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
}
