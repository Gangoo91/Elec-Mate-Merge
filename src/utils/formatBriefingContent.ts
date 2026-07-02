/**
 * Formats the structured briefing content returned by generate-briefing-content
 * into human-readable text for briefing_content, which workers read verbatim on
 * the sign-off screen. The AI returns a rich object (shape varies by briefing
 * type) — never write the raw JSON to a worker-facing field.
 */

type Dict = Record<string, unknown>;

const asArray = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const asStr = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

/** Pull readable text out of a paragraph-ish item (string or {content|text|point}). */
function paraText(item: unknown): string {
  if (typeof item === 'string') return item.trim();
  if (item && typeof item === 'object') {
    const o = item as Dict;
    return asStr(o.content) || asStr(o.text) || asStr(o.point) || asStr(o.paragraph);
  }
  return '';
}

export function formatBriefingContent(content: unknown): string {
  if (!content || typeof content !== 'object') return asStr(content);
  const c = content as Dict;
  const out: string[] = [];

  const overview = asArray(c.briefingOverview).length
    ? asArray(c.briefingOverview)
    : asArray(c.overview);
  const overviewText = overview.map(paraText).filter(Boolean);
  if (overviewText.length) out.push(overviewText.join('\n\n'));

  const keyPoints = asArray(c.keyPoints).map(paraText).filter(Boolean);
  if (keyPoints.length) {
    out.push('KEY POINTS\n' + keyPoints.map((p) => `• ${p}`).join('\n'));
  }

  const hazards = asArray(c.hazards);
  if (hazards.length) {
    const lines = hazards.map((h) => {
      const o = (h && typeof h === 'object' ? h : {}) as Dict;
      const name = asStr(o.hazardName) || asStr(o.name) || 'Hazard';
      const risk = asStr(o.riskLevel) || asStr(o.severity);
      const desc = asStr(o.description);
      const controls = asArray(o.controls).map(asStr).filter(Boolean);
      let block = `• ${name}${risk ? ` (${risk} risk)` : ''}`;
      if (desc) block += `\n  ${desc}`;
      if (controls.length) block += '\n  Controls: ' + controls.join('; ');
      return block;
    });
    out.push('HAZARDS & CONTROLS\n' + lines.join('\n'));
  }

  const warning = c.safetyWarning as Dict | undefined;
  if (warning && typeof warning === 'object') {
    const headline = asStr(warning.headline);
    const points = asArray(warning.points).map(asStr).filter(Boolean);
    if (headline || points.length) {
      out.push(
        `⚠ SAFETY WARNING${headline ? ` — ${headline}` : ''}` +
          (points.length ? '\n' + points.map((p) => `• ${p}`).join('\n') : '')
      );
    }
  }

  const ppe = asArray(c.ppe);
  if (ppe.length) {
    const lines = ppe.map((p) => {
      if (typeof p === 'string') return `• ${p.trim()}`;
      const o = (p && typeof p === 'object' ? p : {}) as Dict;
      const item = asStr(o.item);
      const std = asStr(o.standard);
      return item ? `• ${item}${std ? ` (${std})` : ''}` : '';
    });
    out.push('PPE REQUIRED\n' + lines.filter(Boolean).join('\n'));
  }

  const regs = asArray(c.regulations);
  if (regs.length) {
    const lines = regs.map((r) => {
      if (typeof r === 'string') return `• ${r.trim()}`;
      const o = (r && typeof r === 'object' ? r : {}) as Dict;
      const reg = asStr(o.regulation);
      const section = asStr(o.section);
      const topic = asStr(o.topic);
      return reg
        ? `• ${reg}${section ? ` ${section}` : ''}${topic ? ` — ${topic}` : ''}`
        : '';
    });
    out.push('REGULATIONS\n' + lines.filter(Boolean).join('\n'));
  }

  const actions = asArray(c.actionItems).map(paraText).filter(Boolean);
  if (actions.length) {
    out.push('ACTION ITEMS\n' + actions.map((a) => `• ${a}`).join('\n'));
  }

  const extra = asArray(c.additionalInfo).map(paraText).filter(Boolean);
  if (extra.length) out.push(extra.join('\n\n'));

  return out.join('\n\n').trim();
}
