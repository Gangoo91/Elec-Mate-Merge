import React from 'react';

/**
 * Inline formatters for answer markdown — turns plain text like
 * "Reg 411.3.3", "Table 41.1", "Figure 54.1", "30 mA" and "0.4 s"
 * into styled, tappable nodes so the answer reads like a compliance
 * tool, not a blog post.
 *
 * Used by InspectorMessage via the react-markdown custom renderers.
 */

export type InlineCtx = {
  /** Called when a user taps an inline regulation pill. */
  onRegClick?: (regNumber: string) => void;
};

// ─── Token regex (single combined alternation) ───────────────────────────
// Order matters — BS 7671 regulation refs must match before bare numbers.
//
// Group 1: Regulation (e.g. "Reg 411.3.3", "Regulation 722.411.4.1")
// Group 2: Table      (e.g. "Table 41.1", "Table 4D1")
// Group 3: Figure     (e.g. "Figure 54.1")
// Group 4: Numeric    (e.g. "4 mm²", "30mA", "0.4 s", "230V")
const TOKEN_RE =
  /(Reg(?:ulation)?\.?\s+\d{3}(?:\.\d+){1,4})|(Table\s+\d+[A-Z]?(?:\.\d+)*)|(Figure\s+\d+[A-Z]?(?:\.\d+)*)|(\d+(?:\.\d+)?\s*(?:mm²|mm2|kA|mA|µA|uA|A|kV|V|kΩ|Ω|kW|MW|kHz|Hz|°C|ms|s|%))/g;

function extractRegNumber(match: string): string {
  const m = match.match(/\d{3}(?:\.\d+){1,4}/);
  return m ? m[0] : match;
}

function extractRefNumber(match: string): string {
  const m = match.match(/\d+[A-Z]?(?:\.\d+)*/);
  return m ? m[0] : match;
}

// Editorial, text-forward references. No boxes, no badges — just typography.
// Regulation numbers read as tappable links; table/figure refs are bold
// inline text; numeric values are bumped to slightly brighter white + mono
// so they scan without interrupting the reading rhythm.

// NB: deliberately NO `whitespace-nowrap`. Long refs like `Reg 722.531.3.101`
// or `30 mA AC Type` could push a 360 px viewport sideways if forced onto one
// line. Using a non-breaking space between the prefix and number means the
// short tokens stay together visually but the line breaks naturally if the
// pill ever lands at a tight margin.

function RegReference({
  regNumber,
  onClick,
}: {
  regNumber: string;
  onClick?: (regNumber: string) => void;
}) {
  const interactive = !!onClick;
  if (!interactive) {
    return (
      <span className="font-medium text-elec-yellow align-baseline">
        Reg&nbsp;{regNumber}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onClick!(regNumber)}
      className={
        'inline font-medium text-elec-yellow align-baseline ' +
        'underline decoration-elec-yellow/30 decoration-[1.5px] underline-offset-[3px] ' +
        'hover:decoration-elec-yellow/80 transition-colors cursor-pointer touch-manipulation'
      }
    >
      Reg&nbsp;{regNumber}
    </button>
  );
}

function RefReference({ kind, reference }: { kind: 'Table' | 'Figure'; reference: string }) {
  return (
    <span className="font-medium text-white align-baseline">
      {kind}&nbsp;{reference}
    </span>
  );
}

function NumericValue({ value }: { value: string }) {
  return (
    <span className="font-mono text-white align-baseline">
      {value.replace(/\s+/g, ' ').trim()}
    </span>
  );
}

/**
 * Split a plain string into a mix of React nodes — raw text and token pills.
 * Keeps a stable key per token index so React can diff on re-renders.
 */
function splitStringIntoTokens(text: string, ctx: InlineCtx, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  let idx = 0;

  while ((m = TOKEN_RE.exec(text)) !== null) {
    const start = m.index;
    const matched = m[0];

    if (start > lastIndex) {
      out.push(text.slice(lastIndex, start));
    }

    const key = `${keyPrefix}-${idx++}`;
    if (m[1]) {
      const regNumber = extractRegNumber(m[1]);
      out.push(
        <RegReference key={key} regNumber={regNumber} onClick={ctx.onRegClick} />
      );
    } else if (m[2]) {
      out.push(<RefReference key={key} kind="Table" reference={extractRefNumber(m[2])} />);
    } else if (m[3]) {
      out.push(<RefReference key={key} kind="Figure" reference={extractRefNumber(m[3])} />);
    } else if (m[4]) {
      out.push(<NumericValue key={key} value={m[4]} />);
    } else {
      out.push(matched);
    }

    lastIndex = start + matched.length;
  }

  if (lastIndex < text.length) {
    out.push(text.slice(lastIndex));
  }

  return out.length > 0 ? out : [text];
}

/**
 * Transform react-markdown children — touches direct string leaves only.
 *
 * We deliberately DO NOT recurse into nested React elements (e.g. <strong>,
 * <em>, <a>). rehype-react sometimes attaches string `ref` attrs sourced
 * from raw HTML, and React 18 rejects string refs on function components
 * when those elements get cloned. Accepting the loss of inline-token
 * transforms inside <strong>/<em> is cheap — the system prompt tells the
 * model not to wrap citations in bold/italic anyway.
 */
export function transformInlineChildren(
  children: React.ReactNode,
  ctx: InlineCtx,
  keyPrefix = 'inline'
): React.ReactNode {
  const walk = (node: React.ReactNode, localKey: string): React.ReactNode => {
    if (typeof node === 'string') {
      const tokens = splitStringIntoTokens(node, ctx, localKey);
      return tokens.length === 1 ? tokens[0] : <>{tokens}</>;
    }
    if (Array.isArray(node)) {
      return node.map((child, i) => (
        <React.Fragment key={`${localKey}-${i}`}>{walk(child, `${localKey}-${i}`)}</React.Fragment>
      ));
    }
    // Non-string React nodes: return untouched to avoid cloneElement's
    // string-ref preservation landmine. We lose pill formatting inside
    // nested markup, but the tree renders cleanly.
    return node;
  };

  return walk(children, keyPrefix);
}

/**
 * Pull the verdict line off the start of an answer.
 *
 * Accepts any of:
 *   - `**Verdict:** ...`  (preferred)
 *   - `**Answer:** ...`
 *   - `> **Verdict:** ...`
 *
 * Returns `{ verdict, body }` where `body` is the remaining markdown with
 * the verdict line stripped. If no verdict line, returns `{ verdict: null, body: content }`.
 */
export function extractVerdict(content: string): { verdict: string | null; body: string } {
  const trimmed = content.replace(/^\s+/, '');
  const re = /^>?\s*\*\*(?:Verdict|Answer|Bottom line|TL;DR)\s*:?\*\*\s*(.+?)(\r?\n|$)/i;
  const m = trimmed.match(re);
  if (!m) return { verdict: null, body: content };
  const verdict = m[1].trim();
  const rest = trimmed.slice(m[0].length).replace(/^\s+/, '');
  return { verdict, body: rest };
}
