import { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';

interface CopyResultButtonProps {
  /** Calculator name, used as the first line of the copied text. */
  title: string;
  className?: string;
}

/**
 * Copies the result the user can actually see.
 *
 * Twenty of the sixty-three calculators had no copy action at all — including
 * ohms-law, voltage-drop, cable-size and maximum-demand, which are exactly the
 * ones whose answer ends up in a quote or on a certificate.
 *
 * The forty-three that DO have one each hand-build their own text:
 *
 *     let text = `Adiabatic Equation Calculator\nMinimum CSA: ...`;
 *     text += `\nStandard Size: ...`;
 *
 * That is a second copy of the result, written by hand, which drifts the moment
 * someone relabels a field or adds a figure to the panel — silently, because
 * nothing compares the two. This reads the rendered result pane instead, so what
 * you paste is what was on screen by construction.
 *
 * It finds the pane by walking up to the `data-result-placeholder` element that
 * `CalculatorPanes` puts around every result slot, so it works wherever it is
 * dropped inside one.
 */
export const CopyResultButton = ({ title, className }: CopyResultButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    const pane = ref.current?.closest('[data-result-placeholder]')?.previousElementSibling;
    const scope = pane instanceof HTMLElement ? pane : ref.current?.closest('div')?.parentElement;
    const host =
      scope instanceof HTMLElement
        ? scope
        : (ref.current?.closest('[data-result-placeholder]') as HTMLElement | null);

    // Only the tagged parts — headline, supporting values, verdict badge.
    // Scraping the whole pane pulled in the formula reference, the worked steps
    // and every collapsible heading: forty lines where the useful answer is six.
    const parts = host ? Array.from(host.querySelectorAll<HTMLElement>('[data-result-copy]')) : [];

    const lines: string[] = [];
    for (const el of parts) {
      const chunk = el.innerText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      // The grid renders a figure and its unit as separate nodes.
      const merged: string[] = [];
      for (const line of chunk) {
        const prev = merged[merged.length - 1];
        if (
          prev &&
          /^[A-Za-z\u03a9\u00b0%\u00b5/\u00b2\u00b3]{1,8}$/.test(line) &&
          /[\d)]$/.test(prev)
        ) {
          merged[merged.length - 1] = `${prev} ${line}`;
        } else {
          merged.push(line);
        }
      }

      // A label followed by its value reads better on one line.
      if (merged.length === 2) lines.push(`${merged[0]}: ${merged[1]}`);
      else lines.push(merged.join('\n'));
    }

    if (!lines.length) {
      toast({ title: 'Nothing to copy yet' });
      return;
    }

    const text = `${title}\n${'-'.repeat(title.length)}\n${lines.join('\n')}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      toast({ title: 'Result copied' });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex h-11 items-center gap-1.5 rounded-xl px-3 text-[12.5px] font-semibold',
        'text-white transition-colors touch-manipulation hover:bg-white/[0.08]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        className
      )}
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden />
      ) : (
        <Copy className="h-4 w-4" aria-hidden />
      )}
      {copied ? 'Copied' : 'Copy result'}
    </button>
  );
};

export default CopyResultButton;
