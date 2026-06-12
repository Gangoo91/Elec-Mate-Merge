import { supabase } from '@/integrations/supabase/client';

/**
 * Assessment-day print documents: branded, print-styled HTML opened in a new
 * window for Print / Save as PDF. The artefacts a NICEIC/NAPIT assessor or
 * principal contractor actually asks for.
 */
export async function openPrintRegister(input: {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: (string | number | null | undefined)[][];
}): Promise<boolean> {
  // Open the window SYNCHRONOUSLY inside the user gesture — awaiting first
  // gets the popup blocked on mobile Safari (our primary audience)
  const w = window.open('', '_blank');
  if (!w) return false;
  w.document.write('<p style="font-family:sans-serif;color:#64748b;padding:24px">Preparing…</p>');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let companyName = 'Company';
  if (user) {
    const { data: company } = await supabase
      .from('company_profiles')
      .select('company_name')
      .eq('user_id', user.id)
      .maybeSingle();
    companyName = company?.company_name?.trim() || companyName;
  }

  const esc = (v: string | number | null | undefined) =>
    String(v ?? '—').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${esc(input.title)}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,'Segoe UI',Roboto,sans-serif;color:#0f172a;padding:40px;max-width:980px;margin:0 auto}
.head{border-top:6px solid #f59e0b;padding-top:20px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:baseline}
h1{font-size:20px}.co{font-size:13px;color:#64748b}.sub{font-size:12px;color:#64748b;margin-bottom:20px}
table{width:100%;border-collapse:collapse;font-size:12.5px}th{text-align:left;font-size:10.5px;text-transform:uppercase;letter-spacing:.5px;color:#64748b;padding:8px 10px;border-bottom:2px solid #e2e8f0}
td{padding:8px 10px;border-bottom:1px solid #f1f5f9;vertical-align:top}tr:nth-child(even) td{background:#fafafa}
.foot{margin-top:28px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;display:flex;justify-content:space-between}
.actions{position:fixed;bottom:24px;right:24px}.actions button{padding:12px 24px;font-weight:600;border-radius:10px;border:none;cursor:pointer;background:#f59e0b}
@media print{.actions{display:none}body{padding:16px}}</style></head><body>
<div class="head"><h1>${esc(input.title)}</h1><div class="co">${esc(companyName)}</div></div>
<div class="sub">${esc(input.subtitle || '')} · Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
<table><thead><tr>${input.columns.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
<tbody>${input.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>
<div class="foot"><span>${esc(companyName)} — produced with Elec-Mate</span><span>${input.rows.length} records</span></div>
<div class="actions"><button onclick="window.print()">Print / Save as PDF</button></div></body></html>`;

  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  return true;
}
