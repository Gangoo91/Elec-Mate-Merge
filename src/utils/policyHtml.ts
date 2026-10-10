/**
 * Company policy HTML, made safe to show (ELE-1946). Policies are written in
 * the editor with headings and lists; the general sanitiser drops headings, so
 * a policy read as one run of paragraphs. This keeps the structure and nothing
 * else: no attributes, no links, no media.
 */
import DOMPurify from 'dompurify';

export function sanitizePolicyHtml(input: string | null | undefined): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'p', 'br', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i'],
    ALLOWED_ATTR: [],
  }).trim();
}

/** Reading styles for a sanitised policy: headings, spacing and list markers. */
export const policyProseClass =
  'max-w-none text-white [&_h1]:mb-3 [&_h1]:text-[20px] [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-[16px] [&_h2]:font-semibold [&_h3]:mb-1.5 [&_h3]:mt-4 [&_h3]:text-[15px] [&_h3]:font-semibold [&_p]:mb-3 [&_p]:text-[14px] [&_p]:leading-relaxed [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_li]:text-[14px] [&_li]:leading-relaxed [&_strong]:font-semibold';
