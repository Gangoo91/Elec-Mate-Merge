import { useEffect, useRef, useState } from 'react';

/**
 * Says WHY the Calculate button is greyed out.
 *
 * 55 of the 63 calculators gate Calculate on `isDisabled`, but only 10 show any
 * field-level error. On the other 53 the button simply greys out and nothing on
 * screen says which value it is waiting for — you are left hunting the form.
 *
 * Rather than hand-writing 53 different "requires x, y, z" strings (which would
 * then drift from the real condition), this reads the form: it lists the fields
 * that are still empty. `CalculatorPanes` marks the form pane with
 * `data-calc-form`, so the scan is bounded to the inputs of THIS calculator.
 *
 * Fields whose label says "optional" are skipped — that is the convention the
 * calculators already use ("Measured R1+R2 (Optional)", "Custom k Factor
 * (optional)"), so an optional field is never reported as missing.
 *
 * It says "Empty:" rather than "Required:" on purpose. The scan can see that a
 * field has no value; it cannot see the disable rule. Ohm's Law solves for
 * whichever value you leave blank, so calling all four "required" would be
 * plainly false — listing them as empty is true and still points you at where
 * to type.
 */
const fieldInfo = (el: Element): { label: string; optional: boolean } | null => {
  // CalculatorInput / CalculatorSelect wrap label + control + hint in one
  // container. The hint matters: voltage-drop's upstream field carries no
  // "(optional)" in its label, but its hint says "Leave blank if this circuit
  // starts at the origin" — and listing it as needed would be simply wrong.
  let node: Element | null = el;
  for (let i = 0; i < 4 && node; i++) {
    node = node.parentElement;
    const label = node?.querySelector('label');
    if (label?.textContent?.trim()) {
      const surrounding = node?.textContent ?? '';
      return {
        label: label.textContent.trim(),
        optional: /optional|leave blank|if known|if applicable/i.test(surrounding),
      };
    }
  }
  return null;
};

const isPlaceholderText = (t: string) => /^(select|choose|pick)\b/i.test(t.trim());

export const MissingFieldsHint = () => {
  const anchor = useRef<HTMLSpanElement | null>(null);
  const [missing, setMissing] = useState<string[]>([]);

  useEffect(() => {
    const scan = () => {
      const form = anchor.current?.closest('[data-calc-form]');
      if (!form) return setMissing([]);

      const names: string[] = [];

      for (const input of Array.from(form.querySelectorAll('input'))) {
        if (['checkbox', 'radio', 'search', 'range', 'hidden'].includes(input.type)) continue;
        if (input.value.trim() !== '') continue;
        const info = fieldInfo(input);
        if (!info || info.optional) continue;
        names.push(info.label);
      }

      // Radix triggers keep their placeholder text until something is chosen.
      for (const combo of Array.from(form.querySelectorAll('[role="combobox"]'))) {
        const shown = combo.textContent ?? '';
        if (!isPlaceholderText(shown)) continue;
        const info = fieldInfo(combo);
        if (!info || info.optional) continue;
        names.push(info.label);
      }

      // Only speak up when something is actually blocked. Four calculators
      // render their own Calculate button rather than using CalculatorActions,
      // so gating on a disabled button in the form — rather than on a prop —
      // covers all 63 without per-file wiring.
      const blocked = Array.from(form.querySelectorAll('button')).some(
        (b) =>
          b.disabled && /calculate|analyse|check|compute|show values/i.test(b.textContent ?? '')
      );
      setMissing(blocked ? [...new Set(names)] : []);
    };

    scan();
    // Re-scan as the user types. An observer beats polling and catches Radix
    // updating a trigger's text, which fires no input event.
    const form = anchor.current?.closest('[data-calc-form]');
    if (!form) return;
    const observer = new MutationObserver(scan);
    observer.observe(form, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
    });
    form.addEventListener('input', scan);
    return () => {
      observer.disconnect();
      form.removeEventListener('input', scan);
    };
  }, []);

  if (!missing.length) return <span ref={anchor} className="hidden" />;

  const shown = missing.slice(0, 3).join(', ');
  const more = missing.length > 3 ? ` and ${missing.length - 3} more` : '';

  return (
    <p className="text-[12px] leading-relaxed text-white" role="status">
      <span ref={anchor} />
      Empty: {shown}
      {more}.
    </p>
  );
};

export default MissingFieldsHint;
