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

    // ── Build PDF from structured_content using SafetyPDFBuilder ────────
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
