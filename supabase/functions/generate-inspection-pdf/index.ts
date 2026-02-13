import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import {
  SafetyPDFBuilder,
  C,
  type StatusColour,
} from "../_shared/SafetyPDFBuilder.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-GB") : "N/A";

const RESULT_MAP: Record<string, StatusColour> = {
  pass: "success",
  fail: "danger",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabase = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const userSupabase = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) throw new Error("Unauthorised");

    const { recordId } = await req.json();
    if (!recordId) throw new Error("Missing recordId");

    const { data: record, error: fetchError } = await userSupabase
      .from("inspection_records")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Inspection record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const overallResult = (record.overall_result || "").toLowerCase();
    const statusColour: StatusColour =
      RESULT_MAP[overallResult] || "warning";
    const titleText = `${record.template_title || "Safety"} Inspection`;
    const pdf = await SafetyPDFBuilder.create(
      titleText,
      recordId,
      record.overall_result || "Unknown",
      statusColour
    );

    // Inspection Summary
    pdf.section("Inspection Summary");
    pdf.keyValueGrid([
      { label: "Inspector", value: record.inspector_name || "N/A" },
      { label: "Date", value: fmtDate(record.date) },
      { label: "Location", value: record.location || "N/A" },
      {
        label: "Overall Result",
        value: (record.overall_result || "N/A").toUpperCase(),
      },
    ]);

    // Results Overview
    pdf.section("Results Overview");
    pdf.table(
      ["Metric", "Count"],
      [
        ["Pass", String(record.pass_count ?? 0)],
        ["Fail", String(record.fail_count ?? 0)],
        ["N/A", String(record.na_count ?? 0)],
        ["Total", String(record.total_items ?? 0)],
      ]
    );

    // Checklist Sections
    const sections = (record.sections as any[]) || [];
    for (const section of sections) {
      pdf.section(section.title || "Untitled Section");

      const items = (section.items || []) as Array<{
        text: string;
        result: string;
        notes?: string;
      }>;

      if (items.length > 0) {
        pdf.checklist(
          items.map((i) => ({
            label: i.text || "",
            passed: i.result === "pass",
            notes: i.result === "fail" ? i.notes : undefined,
          }))
        );
      } else {
        pdf.paragraph("No items in this section.", { color: C.textSec });
      }
    }

    // Additional Notes
    if (record.additional_notes) {
      pdf.section("Additional Notes");
      pdf.paragraph(record.additional_notes);
    }

    // Footer
    pdf.footnote(
      `Safety Inspection Record \u2014 ${record.total_items ?? 0} items checked`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `inspection-${recordId}-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("safety-documents")
      .upload(`${user.id}/${fileName}`, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      // Fallback: return PDF bytes directly
      return new Response(pdfBytes, {
        headers: { ...corsHeaders, "Content-Type": "application/pdf" },
      });
    }

    const { data: urlData } = supabase.storage
      .from("safety-documents")
      .getPublicUrl(`${user.id}/${fileName}`);

    await supabase
      .from("inspection_records")
      .update({ pdf_url: urlData.publicUrl })
      .eq("id", recordId);

    return new Response(
      JSON.stringify({ success: true, url: urlData.publicUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
