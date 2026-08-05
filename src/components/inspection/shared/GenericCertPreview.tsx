import React from 'react';

/**
 * Generic certificate preview — ELE-1477.
 *
 * `QsCertReviewBody` is purpose-built for EICR / EIC / Minor Works: every one
 * of its sections reads `scheduleOfTests`, `inspectionItems`, `observations`
 * or `distributionBoards`, and returns null when they are absent. Point it at
 * an EV or PAT certificate and it renders the installation header and nothing
 * else — a complete certificate that looks empty, which is worse than offering
 * no preview at all.
 *
 * Rather than hand-write a renderer for each of the ~16 specialist certs, this
 * walks the PDFMonkey payload the cert's own formatter already produces. Two
 * things fall out of that:
 *
 *  - It shows exactly what goes on the PDF, so it cannot drift from the output.
 *  - A new cert type gets a preview for free the moment it has a formatter.
 *
 * The payload keys were written for humans (`client_details.telephone`,
 * `main_switch_bs_en`), so de-snaking them yields readable labels without a
 * per-cert dictionary.
 */

/** 'client_details' → 'Client details' · 'main_switch_bs_en' → 'Main switch BS EN'. */
const ACRONYMS: Record<string, string> = {
  bs: 'BS',
  en: 'EN',
  rcd: 'RCD',
  rcbo: 'RCBO',
  mcb: 'MCB',
  spd: 'SPD',
  pv: 'PV',
  ev: 'EV',
  ir: 'IR',
  cpc: 'CPC',
  zs: 'Zs',
  ze: 'Ze',
  ipf: 'IPF',
  pfc: 'PFC',
  dno: 'DNO',
  mpan: 'MPAN',
  ocpp: 'OCPP',
  id: 'ID',
  url: 'URL',
  pat: 'PAT',
  co: 'CO',
  ac: 'AC',
  dc: 'DC',
};

export const humaniseKey = (key: string): string => {
  const words = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(/[_\s]+/).filter(Boolean);
  return words
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (ACRONYMS[lower]) return ACRONYMS[lower];
      return i === 0 ? lower.charAt(0).toUpperCase() + lower.slice(1) : lower;
    })
    .join(' ');
};

/** Values that carry nothing worth showing on a preview. */
const isEmptyValue = (v: unknown): boolean => {
  if (v === null || v === undefined) return true;
  if (typeof v === 'string') return v.trim() === '' || /^n\/?a$/i.test(v.trim());
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === 'object') return Object.values(v as object).every(isEmptyValue);
  return false;
};

const displayValue = (v: unknown): string => {
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  return String(v);
};

const isScalar = (v: unknown): boolean =>
  v === null || v === undefined || typeof v !== 'object';

/** Label/value pair. */
const Field: React.FC<{ label: string; value: unknown }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 py-1.5">
    <span className="text-[11px] uppercase tracking-wide text-white">{label}</span>
    <span className="text-[14px] leading-snug text-white">{displayValue(value)}</span>
  </div>
);

/** An array of like-shaped objects — rendered as a scrolling table. */
const Rows: React.FC<{ rows: Record<string, unknown>[] }> = ({ rows }) => {
  const columns = Array.from(
    rows.reduce<Set<string>>((acc, row) => {
      Object.entries(row).forEach(([k, v]) => {
        if (!isEmptyValue(v) && isScalar(v)) acc.add(k);
      });
      return acc;
    }, new Set())
  );
  if (columns.length === 0) return null;

  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-white/[0.14]">
            {columns.map((c) => (
              <th
                key={c}
                className="whitespace-nowrap px-2 py-1.5 text-left text-[11px] font-semibold uppercase tracking-wide text-white"
              >
                {humaniseKey(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.06]">
              {columns.map((c) => (
                <td key={c} className="whitespace-nowrap px-2 py-1.5 text-white">
                  {isEmptyValue(row[c]) ? '—' : displayValue(row[c])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** One payload group — a nested object becomes a titled card. */
const Section: React.FC<{ title: string; value: unknown }> = ({ title, value }) => {
  if (isEmptyValue(value)) return null;

  if (Array.isArray(value)) {
    const objectRows = value.filter(
      (v): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
    );
    const body =
      objectRows.length === value.length && objectRows.length > 0 ? (
        <Rows rows={objectRows} />
      ) : (
        <p className="text-[14px] text-white">{value.map(displayValue).join(', ')}</p>
      );
    return (
      <section className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
        <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">{title}</h3>
        {body}
      </section>
    );
  }

  const entries = Object.entries(value as Record<string, unknown>).filter(
    ([, v]) => !isEmptyValue(v)
  );
  if (entries.length === 0) return null;

  const scalars = entries.filter(([, v]) => isScalar(v));
  const nested = entries.filter(([, v]) => !isScalar(v));

  return (
    <section className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
      <h3 className="mb-1 text-[15px] font-semibold tracking-tight text-white">{title}</h3>
      {scalars.length > 0 && (
        <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-3">
          {scalars.map(([k, v]) => (
            <Field key={k} label={humaniseKey(k)} value={v} />
          ))}
        </div>
      )}
      {nested.map(([k, v]) => (
        <div key={k} className="mt-3 border-t border-white/[0.1] pt-3">
          <h4 className="mb-1.5 text-[13px] font-semibold text-white">{humaniseKey(k)}</h4>
          {Array.isArray(v) ? (
            <Rows
              rows={v.filter(
                (r): r is Record<string, unknown> => !!r && typeof r === 'object' && !Array.isArray(r)
              )}
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-3">
              {Object.entries(v as Record<string, unknown>)
                .filter(([, vv]) => !isEmptyValue(vv) && isScalar(vv))
                .map(([kk, vv]) => (
                  <Field key={kk} label={humaniseKey(kk)} value={vv} />
                ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export const GenericCertPreview: React.FC<{ payload: Record<string, unknown> }> = ({ payload }) => {
  const entries = Object.entries(payload || {}).filter(([, v]) => !isEmptyValue(v));

  // Loose top-level scalars (many formatters emit flat copies alongside the
  // nested groups) are collected into one leading card rather than scattered.
  const loose = entries.filter(([, v]) => isScalar(v));
  const groups = entries.filter(([, v]) => !isScalar(v));

  if (entries.length === 0) {
    return (
      <p className="py-8 text-center text-[14px] text-white">
        Nothing to preview yet — fill in the certificate and it will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {loose.length > 0 && <Section title="Certificate" value={Object.fromEntries(loose)} />}
      {groups.map(([k, v]) => (
        <Section key={k} title={humaniseKey(k)} value={v} />
      ))}
    </div>
  );
};

export default GenericCertPreview;
