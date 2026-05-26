import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { SafetyPDFBuilder } from '../_shared/SafetyPDFBuilder.ts';
import type { CompanyBranding, StatusColour } from '../_shared/SafetyPDFBuilder.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

/** Map document status to PDF status colour */
function statusToColour(status: string): StatusColour {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Draft':
      return 'warning';
    case 'Review Due':
      return 'danger';
    case 'Archived':
      return 'grey';
    default:
      return 'info';
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    // Fetch company branding
    const { data: profileRows } = await supabase
      .from('company_profiles')
      .select(
        'company_name, company_address, company_postcode, company_phone, company_email, company_website, company_registration, vat_number, logo_data_url, logo_url, primary_color, secondary_color'
      )
      .eq('user_id', user.id)
      .limit(1);
    const branding: CompanyBranding = profileRows?.[0] ?? {};

    const { documentId, recordId } = await req.json();
    const id = documentId || recordId;
    if (!id) throw new Error('Missing documentId');

    const { data: doc, error: fetchError } = await userSupabase
      .from('user_safety_documents')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !doc) throw new Error('Document not found');

    // ── v2 path — full-depth AI-regenerated content ──────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const v2: any = (doc as any).structured_content_v2;
    const isV2 = !!v2 && (doc.version === 2 || Array.isArray(v2.hazards));

    if (isV2) {
      const pdfV2 = await SafetyPDFBuilder.create(
        doc.name,
        doc.id,
        doc.status || 'Draft',
        statusToColour(doc.status || 'Draft'),
        branding
      );

      // Document details from _fieldValues or template fields
      const fv: Record<string, string> = v2._fieldValues ?? {};
      const fields: Array<{ id?: string; key?: string; label: string }> = v2.fields ?? [];
      if (fields.length > 0) {
        pdfV2.section('Document Details');
        pdfV2.keyValueGrid(
          fields.map((f) => ({
            label: f.label,
            value: fv[f.id ?? f.key ?? ''] ?? '',
          }))
        );
      } else if (doc.company_name || doc.site_address) {
        pdfV2.section('Document Details');
        pdfV2.keyValueGrid(
          [
            { label: 'Company', value: doc.company_name ?? '' },
            { label: 'Site', value: doc.site_address ?? '' },
          ].filter((kv) => kv.value)
        );
      }

      // Executive summary
      if (v2.executive_summary) {
        pdfV2.section('Executive Summary');
        pdfV2.paragraph(String(v2.executive_summary));
      }
      if (v2.scope) {
        pdfV2.section('Scope');
        pdfV2.paragraph(String(v2.scope));
      }

      // Preparation
      if (v2.preparation && typeof v2.preparation === 'object') {
        const pairs: Array<{ label: string; value: string }> = [];
        if (Array.isArray(v2.preparation.competency_required)) {
          pairs.push({
            label: 'Competency',
            value: v2.preparation.competency_required.join(' · '),
          });
        }
        if (Array.isArray(v2.preparation.permits_required)) {
          pairs.push({
            label: 'Permits',
            value: v2.preparation.permits_required.join(' · '),
          });
        }
        if (Array.isArray(v2.preparation.documentation_required)) {
          pairs.push({
            label: 'Documentation',
            value: v2.preparation.documentation_required.join(' · '),
          });
        }
        if (Array.isArray(v2.preparation.site_access)) {
          pairs.push({
            label: 'Site access',
            value: v2.preparation.site_access.join(' · '),
          });
        }
        if (Array.isArray(v2.preparation.ppe_baseline)) {
          pairs.push({
            label: 'PPE baseline',
            value: v2.preparation.ppe_baseline.join(' · '),
          });
        }
        if (pairs.length > 0) {
          pdfV2.section('Preparation');
          pdfV2.keyValueGrid(pairs);
        }
      }

      // Hazard register — table for the summary, then per-hazard detail
      if (Array.isArray(v2.hazards) && v2.hazards.length > 0) {
        pdfV2.section(`Hazard Register (${v2.hazards.length})`);
        pdfV2.table(
          ['#', 'Hazard', 'L', 'S', 'Risk', 'Residual'],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          v2.hazards.map((h: any, i: number) => [
            String(h.hazard_number ?? i + 1),
            String(h.hazard ?? ''),
            String(h.likelihood ?? ''),
            String(h.severity ?? ''),
            String(h.risk_rating ?? ''),
            String(h.residual_risk_rating ?? ''),
          ])
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        v2.hazards.forEach((h: any, i: number) => {
          pdfV2.section(`H${String(h.hazard_number ?? i + 1).padStart(2, '0')} · ${h.hazard ?? ''}`);
          if (h.rationale) pdfV2.paragraph(`Why: ${h.rationale}`);
          if (Array.isArray(h.who_at_risk) && h.who_at_risk.length > 0) {
            pdfV2.paragraph(`At risk: ${h.who_at_risk.join(', ')}`);
          }
          if (Array.isArray(h.controls) && h.controls.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pdfV2.bulletList(
              h.controls.map((c: any) => {
                const tier = c.tier ? `[${String(c.tier).toUpperCase()}] ` : '';
                const detail = c.detail ? ` — ${c.detail}` : '';
                return `${tier}${c.control ?? ''}${detail}`;
              })
            );
          }
          const cites: string[] = [];
          if (Array.isArray(h.bs7671_cites)) cites.push(...h.bs7671_cites);
          if (Array.isArray(h.safety_cites)) cites.push(...h.safety_cites);
          if (cites.length > 0) pdfV2.badges(cites);
          if (Array.isArray(h.ppe_required) && h.ppe_required.length > 0) {
            pdfV2.paragraph(`PPE: ${h.ppe_required.join(', ')}`);
          }
          if (Array.isArray(h.evidence_required) && h.evidence_required.length > 0) {
            pdfV2.paragraph(`Evidence: ${h.evidence_required.join('; ')}`);
          }
          if (Array.isArray(h.monitoring_checks) && h.monitoring_checks.length > 0) {
            pdfV2.paragraph(`Monitoring: ${h.monitoring_checks.join('; ')}`);
          }
          if (Array.isArray(h.stop_work_triggers) && h.stop_work_triggers.length > 0) {
            pdfV2.paragraph(`Stop-work: ${h.stop_work_triggers.join('; ')}`);
          }
        });
      }

      // Method steps
      if (Array.isArray(v2.method_steps) && v2.method_steps.length > 0) {
        pdfV2.section(`Method Statement (${v2.method_steps.length} steps)`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        v2.method_steps.forEach((s: any, i: number) => {
          pdfV2.section(`Step ${String(s.step_number ?? i + 1).padStart(2, '0')} · ${s.title ?? ''}`);
          if (s.description) pdfV2.paragraph(String(s.description));
          if (Array.isArray(s.safety_requirements) && s.safety_requirements.length > 0) {
            pdfV2.paragraph(`Safety: ${s.safety_requirements.join('; ')}`);
          }
          if (Array.isArray(s.equipment_needed) && s.equipment_needed.length > 0) {
            pdfV2.paragraph(`Equipment: ${s.equipment_needed.join(', ')}`);
          }
          if (Array.isArray(s.qualifications) && s.qualifications.length > 0) {
            pdfV2.paragraph(`Qualifications: ${s.qualifications.join(', ')}`);
          }
          if (s.estimated_duration) {
            pdfV2.paragraph(`Duration: ${s.estimated_duration} · Risk: ${s.risk_level ?? 'low'}`);
          }
        });
      }

      // Tools / Materials / Tips / Mistakes
      if (Array.isArray(v2.tools_required) && v2.tools_required.length > 0) {
        pdfV2.section('Tools Required');
        pdfV2.badges(v2.tools_required);
      }
      if (Array.isArray(v2.materials_required) && v2.materials_required.length > 0) {
        pdfV2.section('Materials Required');
        pdfV2.bulletList(v2.materials_required);
      }
      if (Array.isArray(v2.practical_tips) && v2.practical_tips.length > 0) {
        pdfV2.section('Practical Tips');
        pdfV2.bulletList(v2.practical_tips);
      }
      if (Array.isArray(v2.common_mistakes) && v2.common_mistakes.length > 0) {
        pdfV2.section('Common Mistakes');
        pdfV2.bulletList(v2.common_mistakes);
      }

      // Site logistics
      if (v2.site_logistics && typeof v2.site_logistics === 'object') {
        const sl = v2.site_logistics;
        const pairs: Array<{ label: string; value: string }> = [
          { label: 'Vehicle access', value: sl.vehicle_access ?? '' },
          { label: 'Parking', value: sl.parking ?? '' },
          { label: 'Material storage', value: sl.material_storage ?? '' },
          { label: 'Waste management', value: sl.waste_management ?? '' },
          { label: 'Welfare', value: sl.welfare_facilities ?? '' },
          { label: 'Restrictions', value: sl.site_restrictions ?? '' },
        ].filter((p) => p.value);
        if (pairs.length > 0) {
          pdfV2.section('Site Logistics');
          pdfV2.keyValueGrid(pairs);
        }
      }

      // PPE summary
      if (Array.isArray(v2.ppe_grid) && v2.ppe_grid.length > 0) {
        pdfV2.section('Personal Protective Equipment');
        pdfV2.badges(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          v2.ppe_grid.map((p: any) =>
            p.specification ? `${p.name} (${p.specification})` : p.name
          )
        );
      }

      // Emergency procedures
      if (Array.isArray(v2.emergency_procedures) && v2.emergency_procedures.length > 0) {
        pdfV2.section('Emergency Procedures');
        pdfV2.bulletList(v2.emergency_procedures);
      }

      // Competence requirements
      if (Array.isArray(v2.competence_requirements) && v2.competence_requirements.length > 0) {
        pdfV2.section('Competence Requirements');
        pdfV2.keyValueGrid(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          v2.competence_requirements.map((kv: any) => ({
            label: kv.key ?? '',
            value: kv.value ?? '',
          }))
        );
      }

      // Compliance
      if (Array.isArray(v2.compliance_regulations) && v2.compliance_regulations.length > 0) {
        pdfV2.section('Regulations Referenced');
        pdfV2.badges(v2.compliance_regulations);
      }
      if (Array.isArray(v2.compliance_warnings) && v2.compliance_warnings.length > 0) {
        pdfV2.section('Compliance Warnings');
        pdfV2.bulletList(v2.compliance_warnings);
      }

      // Regulatory references
      if (Array.isArray(v2.regulatory_references) && v2.regulatory_references.length > 0) {
        pdfV2.section('Regulatory References');
        pdfV2.bulletList(v2.regulatory_references);
      }

      // Signature block
      if (v2.signature_block && Array.isArray(v2.signature_block.entries)) {
        pdfV2.section('Sign-Off');
        pdfV2.signatureBlock(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          v2.signature_block.entries.map((e: any) => ({
            role: e.role ?? '',
            name: e.name ?? '',
            date: e.date ?? '',
          }))
        );
      }

      pdfV2.auditFooter(doc.id);
      const pdfBytes = await pdfV2.toBuffer();
      const fileName = `safety-doc-v2-${id}-${Date.now()}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from('safety-documents')
        .upload(`${user.id}/${fileName}`, pdfBytes, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (uploadError) {
        // Fallback: base64 inline
        const bytes = new Uint8Array(pdfBytes);
        let binary = '';
        const chunkSize = 8192;
        for (let i = 0; i < bytes.length; i += chunkSize) {
          binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
        }
        const base64 = btoa(binary);
        return new Response(JSON.stringify({ success: true, pdf_base64: base64 }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: urlData } = supabase.storage
        .from('safety-documents')
        .getPublicUrl(`${user.id}/${fileName}`);
      return new Response(JSON.stringify({ success: true, url: urlData.publicUrl }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── v1 path — original structured_content layout ─────────────────
    const sc = doc.structured_content;

    if (!sc || !sc.sections || sc.sections.length === 0) {
      // No structured content — return error (legacy docs don't have a PDF path)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Document has no structured content. Please re-adopt from a template.',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const pdf = await SafetyPDFBuilder.create(
      doc.name,
      doc.id,
      doc.status || 'Draft',
      statusToColour(doc.status || 'Draft'),
      branding
    );

    // ── Document details from fields ──────────────────────────────────
    if (sc.fields && sc.fields.length > 0) {
      pdf.section('Document Details');
      pdf.keyValueGrid(
        sc.fields.map((f: { label: string; default_value?: string }) => ({
          label: f.label,
          value: f.default_value || '',
        }))
      );
    }

    // ── Render each section ───────────────────────────────────────────
    for (const section of sc.sections) {
      pdf.section(section.title);

      switch (section.type) {
        case 'hazard_table': {
          const hazards = section.hazards || [];
          pdf.table(
            ['Hazard', 'Who at Risk', 'L', 'S', 'Risk', 'Controls', 'Residual'],
            hazards.map(
              (h: {
                hazard: string;
                who_at_risk: string;
                likelihood: number;
                severity: number;
                risk_rating: number;
                controls: string[];
                residual_risk: number;
              }) => [
                h.hazard,
                h.who_at_risk,
                String(h.likelihood),
                String(h.severity),
                String(h.risk_rating),
                (h.controls || []).join('; '),
                String(h.residual_risk),
              ]
            )
          );
          break;
        }

        case 'steps': {
          const steps = section.steps || [];
          pdf.bulletList(
            steps.map(
              (s: { step_number: number; title: string; description: string }) =>
                `${s.step_number}. ${s.title}${s.description ? ' — ' + s.description : ''}`
            )
          );
          break;
        }

        case 'checklist': {
          const items = section.items || [];
          pdf.checklist(
            items.map((item: { label: string; checked: boolean }) => ({
              label: item.label,
              passed: item.checked,
            }))
          );
          break;
        }

        case 'text_block': {
          // Strip HTML tags for plain-text rendering
          const plainText = (section.content || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          if (plainText) pdf.paragraph(plainText);
          break;
        }

        case 'bullet_list': {
          const listItems = section.items || [];
          if (listItems.length > 0) pdf.bulletList(listItems);
          break;
        }

        case 'ppe_grid': {
          const ppeItems = section.items || [];
          const requiredPPE = ppeItems
            .filter((p: { required: boolean }) => p.required)
            .map((p: { name: string; specification?: string }) =>
              p.specification ? `${p.name} (${p.specification})` : p.name
            );
          if (requiredPPE.length > 0) pdf.badges(requiredPPE);
          break;
        }

        case 'signature_block': {
          const entries = section.entries || [];
          pdf.signatureBlock(
            entries.map((e: { role: string; name?: string; date?: string }) => ({
              role: e.role,
              name: e.name || '',
              date: e.date || '',
            }))
          );
          break;
        }

        case 'references': {
          const refs = section.items || [];
          pdf.bulletList(
            refs.map((r: { code: string; description?: string }) =>
              r.description ? `${r.code} — ${r.description}` : r.code
            )
          );
          break;
        }

        case 'key_value': {
          const pairs = section.pairs || [];
          pdf.keyValueGrid(
            pairs.map((p: { label: string; value: string }) => ({
              label: p.label,
              value: p.value,
            }))
          );
          break;
        }

        default:
          // Unknown section type — skip
          break;
      }
    }

    // ── Audit footer ─────────────────────────────────────────────────────
    pdf.auditFooter(doc.id);

    const pdfBytes = await pdf.toBuffer();

    // ── Upload PDF ─────────────────────────────────────────────────────
    const fileName = `safety-doc-${id}-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('safety-documents')
      .upload(`${user.id}/${fileName}`, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      // Fallback: return base64-encoded PDF
      const bytes = new Uint8Array(pdfBytes);
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
      }
      const base64 = btoa(binary);
      return new Response(JSON.stringify({ success: true, pdf_base64: base64 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: urlData } = supabase.storage
      .from('safety-documents')
      .getPublicUrl(`${user.id}/${fileName}`);

    // Update pdf_url on the document record
    await supabase
      .from('user_safety_documents')
      .update({ pdf_url: urlData.publicUrl })
      .eq('id', id);

    return new Response(JSON.stringify({ success: true, url: urlData.publicUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
