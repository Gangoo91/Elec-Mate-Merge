import DOMPurify from 'dompurify';

/**
 * ELE-1982 — contract text on the signing page and the signed copy.
 *
 * Contract templates are HTML (headings, tables, lists). The signing page
 * rendered the frozen copy as plain text, so a worker reading their contract
 * saw raw "<h2>" and "<td>" tags. These two helpers give the page safe HTML
 * and the PDF readable text. Plain-text contracts pass through unchanged.
 */

const looksLikeHtml = (s: string) =>
  /<\/?(h[1-6]|p|table|tr|td|th|ul|ol|li|strong|em|br|div)\b/i.test(s);

/** Most stored templates are entity-escaped ("&lt;h2&gt;"); turn those back into tags. */
const decodeEscaped = (s: string) =>
  !s.includes('<') && s.includes('&lt;')
    ? s
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
    : s;

/** Sanitised HTML for display, or null when the content is plain text. */
export function contractHtml(raw: string | null | undefined): string | null {
  const content = raw ? decodeEscaped(raw) : raw;
  if (!content || !looksLikeHtml(content)) return null;
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'h1',
      'h2',
      'h3',
      'h4',
      'p',
      'br',
      'hr',
      'strong',
      'b',
      'em',
      'i',
      'u',
      'ul',
      'ol',
      'li',
      'table',
      'thead',
      'tbody',
      'tr',
      'td',
      'th',
      'div',
      'span',
    ],
    ALLOWED_ATTR: [],
  });
}

/** Readable plain text for the PDF: block breaks kept, table cells joined. */
export function contractPlainText(raw: string | null | undefined): string {
  if (!raw) return '';
  const content = decodeEscaped(raw);
  if (!looksLikeHtml(content)) return content;
  const html = contractHtml(content) ?? '';
  let text: string;
  if (typeof DOMParser !== 'undefined') {
    // Walk the real DOM: string-replacing tags inside a <table> lets the
    // parser hoist the text out of order ("foster parenting").
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('tr').forEach((tr) => {
      const cells = Array.from(tr.children)
        .map((c) => (c.textContent ?? '').trim())
        .filter(Boolean);
      const p = doc.createElement('p');
      p.textContent = cells.reduce(
        (line, cell, i) => (i === 0 ? cell : `${line}${line.endsWith(':') ? ' ' : ': '}${cell}`),
        ''
      );
      tr.replaceWith(p);
    });
    doc
      .querySelectorAll('table, thead, tbody')
      .forEach((t) => t.replaceWith(...Array.from(t.childNodes)));
    doc.querySelectorAll('li').forEach((li) => li.prepend(doc.createTextNode('- ')));
    doc.querySelectorAll('br').forEach((br) => br.replaceWith(doc.createTextNode('\n')));
    doc.querySelectorAll('h1, h2, h3, h4, p, div, li, ul, ol, hr').forEach((el) => {
      el.before(doc.createTextNode('\n'));
      el.after(doc.createTextNode('\n'));
    });
    text = doc.body.textContent ?? '';
  } else {
    text = html
      .replace(/<\/(h[1-6]|p|li|tr|div|table)>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<li[^>]*>/gi, '- ')
      .replace(/<\/t[dh]>\s*<t[dh][^>]*>/gi, ': ')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
  return text
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
