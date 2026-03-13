/**
 * Utility functions for structured safety documents
 */

import type {
  StructuredSafetyDocument,
  DocumentSection,
  DocumentField,
  HazardRow,
  ChecklistItem,
  PPEItem,
  SignatureEntry,
  KeyValuePair,
} from '@/types/safety-template';
import { sanitizeTextInputForDisplay } from './inputSanitization';

/**
 * Normalise raw DB JSON to match our TypeScript interfaces.
 * Handles schema variations from SQL seeding (id vs key, rows vs hazards, etc.)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normaliseStructuredContent(raw: any): StructuredSafetyDocument | null {
  if (!raw || typeof raw !== 'object') return null;

  // Normalise fields: id→key
  const fields: DocumentField[] = (raw.fields ?? []).map((f: any) => ({
    key: f.key ?? f.id ?? '',
    label: f.label ?? f.key ?? f.id ?? '',
    type: f.type ?? 'text',
    required: f.required ?? false,
    placeholder: f.placeholder,
    default_value: f.default_value,
  }));

  // Normalise sections
  const sections: DocumentSection[] = (raw.sections ?? []).map((s: any): DocumentSection => {
    switch (s.type) {
      case 'hazard_table': {
        // rows→hazards
        const hazards: HazardRow[] = (s.hazards ?? s.rows ?? []).map((h: any) => ({
          hazard: h.hazard ?? '',
          who_at_risk: h.who_at_risk ?? '',
          likelihood: h.likelihood ?? 1,
          severity: h.severity ?? 1,
          risk_rating: h.risk_rating ?? h.likelihood * h.severity,
          controls: h.controls ?? [],
          residual_likelihood: h.residual_likelihood ?? 1,
          residual_severity: h.residual_severity ?? 1,
          residual_risk: h.residual_risk ?? h.residual_likelihood * h.residual_severity,
        }));
        return { type: 'hazard_table', title: s.title ?? 'Hazards', hazards };
      }
      case 'checklist': {
        // text→label
        const items: ChecklistItem[] = (s.items ?? []).map((item: any) => ({
          id: item.id ?? `chk_${Math.random().toString(36).slice(2, 8)}`,
          label: item.label ?? item.text ?? '',
          checked: item.checked ?? false,
        }));
        return { type: 'checklist', title: s.title ?? 'Checklist', items };
      }
      case 'ppe_grid': {
        // item/standard → name/required/specification
        const items: PPEItem[] = (s.items ?? []).map((p: any) => ({
          name: p.name ?? p.item ?? '',
          required: p.required ?? true,
          specification: p.specification ?? p.standard ?? undefined,
        }));
        return { type: 'ppe_grid', title: s.title ?? 'PPE', items };
      }
      case 'signature_block': {
        // signatures/signature_entries → entries
        const entries: SignatureEntry[] = (
          s.entries ??
          s.signatures ??
          s.signature_entries ??
          []
        ).map((e: any) => ({
          role: e.role ?? '',
          name: e.name ?? '',
          date: e.date ?? '',
          signature: e.signature ?? '',
        }));
        return { type: 'signature_block', title: s.title ?? 'Sign-off', entries };
      }
      case 'key_value': {
        // key→label in pairs, items→pairs
        const pairs: KeyValuePair[] = (s.pairs ?? s.items ?? []).map((kv: any) => ({
          label: kv.label ?? kv.key ?? '',
          value: kv.value ?? '',
        }));
        return { type: 'key_value', title: s.title ?? 'Details', pairs };
      }
      case 'steps':
        return { type: 'steps', title: s.title ?? 'Procedure', steps: s.steps ?? [] };
      case 'text_block':
        return { type: 'text_block', title: s.title ?? 'Details', content: s.content ?? '' };
      case 'bullet_list':
        return { type: 'bullet_list', title: s.title ?? 'Items', items: s.items ?? [] };
      case 'references':
        return { type: 'references', title: s.title ?? 'References', items: s.items ?? [] };
      default:
        return { type: 'text_block', title: s.title ?? 'Section', content: '' };
    }
  });

  return {
    version: 1,
    document_type: raw.document_type ?? 'risk_assessment',
    fields,
    sections,
  };
}

/** Escape HTML entities for safe rendering in generated HTML */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Get risk colour class based on rating */
export function getRiskColour(rating: number): string {
  if (rating <= 4) return 'text-green-400 bg-green-500/10';
  if (rating <= 9) return 'text-amber-400 bg-amber-500/10';
  if (rating <= 15) return 'text-orange-400 bg-orange-500/10';
  return 'text-red-400 bg-red-500/10';
}

/** Get risk label */
export function getRiskLabel(rating: number): string {
  if (rating <= 4) return 'Low';
  if (rating <= 9) return 'Medium';
  if (rating <= 15) return 'High';
  return 'Very High';
}

/** Fill document fields with provided values */
export function fillFields(
  doc: StructuredSafetyDocument,
  values: Record<string, string>
): StructuredSafetyDocument {
  const filled = structuredClone(doc);
  filled.fields = filled.fields.map((f) => ({
    ...f,
    default_value: values[f.key] ?? f.default_value ?? '',
  }));
  return filled;
}

/** Compute summary stats for a structured document */
export function getTemplateStats(sc: StructuredSafetyDocument | null): {
  sections: number;
  hazards: number;
  steps: number;
  checkItems: number;
  ppeItems: number;
} {
  if (!sc) return { sections: 0, hazards: 0, steps: 0, checkItems: 0, ppeItems: 0 };
  let hazards = 0;
  let steps = 0;
  let checkItems = 0;
  let ppeItems = 0;
  for (const s of sc.sections) {
    if (s.type === 'hazard_table') hazards += s.hazards.length;
    if (s.type === 'steps') steps += s.steps.length;
    if (s.type === 'checklist') checkItems += s.items.length;
    if (s.type === 'ppe_grid') ppeItems += s.items.length;
  }
  return { sections: sc.sections.length, hazards, steps, checkItems, ppeItems };
}

/** Convert a single section to HTML */
function sectionToHtml(section: DocumentSection): string {
  switch (section.type) {
    case 'hazard_table': {
      let html = `<h3>${esc(section.title)}</h3>`;
      html += `<table><thead><tr><th>Hazard</th><th>Who at Risk</th><th>L</th><th>S</th><th>Risk</th><th>Controls</th><th>Residual</th></tr></thead><tbody>`;
      for (const h of section.hazards) {
        html += `<tr>`;
        html += `<td>${esc(h.hazard)}</td>`;
        html += `<td>${esc(h.who_at_risk)}</td>`;
        html += `<td>${h.likelihood}</td>`;
        html += `<td>${h.severity}</td>`;
        html += `<td>${h.risk_rating}</td>`;
        html += `<td><ul>${h.controls.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></td>`;
        html += `<td>${h.residual_risk}</td>`;
        html += `</tr>`;
      }
      html += `</tbody></table>`;
      return html;
    }
    case 'steps': {
      let html = `<h3>${esc(section.title)}</h3><ol>`;
      for (const s of section.steps) {
        html += `<li><strong>${esc(s.title)}</strong>`;
        html += `<br/>${esc(s.description)}`;
        if (s.safety_notes) html += `<br/><em>Safety: ${esc(s.safety_notes)}</em>`;
        html += `</li>`;
      }
      html += `</ol>`;
      return html;
    }
    case 'checklist': {
      let html = `<h3>${esc(section.title)}</h3><ul>`;
      for (const item of section.items) {
        const tick = item.checked ? '&#9745;' : '&#9744;';
        html += `<li>${tick} ${esc(item.label)}</li>`;
      }
      html += `</ul>`;
      return html;
    }
    case 'text_block':
      return `<h3>${esc(section.title)}</h3>${section.content}`;
    case 'bullet_list': {
      let html = `<h3>${esc(section.title)}</h3><ul>`;
      for (const item of section.items) html += `<li>${esc(item)}</li>`;
      html += `</ul>`;
      return html;
    }
    case 'ppe_grid': {
      let html = `<h3>${esc(section.title)}</h3><table><thead><tr><th>PPE Item</th><th>Required</th><th>Specification</th></tr></thead><tbody>`;
      for (const p of section.items) {
        html += `<tr><td>${esc(p.name)}</td><td>${p.required ? 'Yes' : 'Optional'}</td><td>${esc(p.specification ?? '')}</td></tr>`;
      }
      html += `</tbody></table>`;
      return html;
    }
    case 'signature_block': {
      let html = `<h3>${esc(section.title)}</h3><table><thead><tr><th>Role</th><th>Name</th><th>Date</th><th>Signature</th></tr></thead><tbody>`;
      for (const e of section.entries) {
        html += `<tr><td>${esc(e.role)}</td><td>${esc(e.name)}</td><td>${esc(e.date)}</td><td>${e.signature ? '(signed)' : '___'}</td></tr>`;
      }
      html += `</tbody></table>`;
      return html;
    }
    case 'references': {
      let html = `<h3>${esc(section.title)}</h3><ul>`;
      for (const r of section.items) {
        html += `<li><strong>${esc(r.code)}</strong>${r.description ? ` — ${esc(r.description)}` : ''}</li>`;
      }
      html += `</ul>`;
      return html;
    }
    case 'key_value': {
      let html = `<h3>${esc(section.title)}</h3><table><tbody>`;
      for (const kv of section.pairs) {
        html += `<tr><td><strong>${esc(kv.label)}</strong></td><td>${esc(kv.value)}</td></tr>`;
      }
      html += `</tbody></table>`;
      return html;
    }
    default:
      return '';
  }
}

/** Convert full structured document to HTML (for PDF / legacy compat) */
export function structuredToHtml(
  doc: StructuredSafetyDocument,
  fieldValues?: Record<string, string>
): string {
  const parts: string[] = [];

  // Header fields
  for (const f of doc.fields) {
    const val = fieldValues?.[f.key] ?? f.default_value ?? '___';
    const sanitised = sanitizeTextInputForDisplay(val) || '___';
    parts.push(`<h2>${esc(f.label)}: ${esc(sanitised)}</h2>`);
  }

  // Sections
  for (const section of doc.sections) {
    parts.push(sectionToHtml(section));
  }

  return parts.join('\n');
}

/** Deep-clone a structured document for adoption */
export function cloneStructuredDocument(doc: StructuredSafetyDocument): StructuredSafetyDocument {
  return structuredClone(doc);
}

/** Get the field values from a structured document as a map */
export function getFieldValues(doc: StructuredSafetyDocument): Record<string, string> {
  const values: Record<string, string> = {};
  for (const f of doc.fields) {
    values[f.key] = f.default_value ?? '';
  }
  return values;
}
