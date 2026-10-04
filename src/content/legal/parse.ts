/**
 * Front matter + heading parser for the legal Markdown files. Plain JS-safe
 * TypeScript so scripts/build-legal-static.mjs can mirror it exactly.
 */
export interface LegalDoc {
  title: string;
  summary: string;
  updated: string;
  body: string;
  headings: { id: string; text: string }[];
}

/** "8. International transfers" → "8-international-transfers" */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function parseLegalDoc(source: string): LegalDoc {
  const m = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  const body = (m ? m[2] : source).trim();
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((h) => {
    // Strip inline markdown so the anchor matches the rendered text.
    const text = h[1].replace(/\*\*|`|\[|\]\([^)]*\)/g, '').trim();
    return { id: slugify(text), text };
  });
  return {
    title: meta.title ?? '',
    summary: meta.summary ?? '',
    updated: meta.updated ?? '',
    body,
    headings,
  };
}

/** Every legal page, in reading order — the footer list on each one. */
export const LEGAL_DOCS = [
  { href: '/privacy', label: 'Privacy notice' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/terms', label: 'Terms of service' },
  { href: '/business-terms', label: 'Business terms' },
  { href: '/dpa', label: 'Data processing agreement' },
  { href: '/subprocessors', label: 'Sub-processors' },
  { href: '/acceptable-use', label: 'Acceptable use' },
  { href: '/account-deletion', label: 'Deleting your account' },
];
