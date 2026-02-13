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

const RESULT_STATUS: Record<string, StatusColour> = {
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
      .from("pre_use_checks")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const overallResult = (record.overall_result || "").toLowerCase();
    const statusColour: StatusColour =
      RESULT_STATUS[overallResult] || "warning";

    const pdf = await SafetyPDFBuilder.create(
      "Pre-Use Equipment Check",
      recordId,
      record.overall_result || "pending",
      statusColour
    );

    // Equipment Details
    pdf.section("Equipment Details");
    pdf.keyValueGrid([
      { label: "Equipment Type", value: record.equipment_type || "N/A" },
      {
        label: "Equipment Description",
        value: record.equipment_description || "N/A",
      },
      { label: "Site Address", value: record.site_address || "N/A" },
      { label: "Date", value: fmtDate(record.created_at) },
    ]);

    // Overall Result
    pdf.section("Overall Result");
    if (overallResult === "pass") {
      pdf.paragraph("PASS", { bold: true, color: C.success, size: 14 });
    } else if (overallResult === "fail") {
      pdf.warningBanner(
        "EQUIPMENT FAILED PRE-USE CHECK \u2014 Do not use"
      );
    } else {
      pdf.paragraph(
        (record.overall_result || "Pending").toUpperCase(),
        { bold: true, color: C.warning, size: 14 }
      );
    }

    // Check Items
    const items = (record.items as any[]) || [];
    pdf.section("Check Items");
    pdf.checklist(
      items.map((i: any) => ({
        label: i.label || "Check item",
        passed: i.result === "pass",
        notes: i.result === "na" ? "N/A" : undefined,
      }))
    );

    // Footnote
    pdf.footnote(
      `This document was generated electronically by Elec-Mate. Check Ref: ${recordId}`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `pre-use-check-${recordId}-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("safety-documents")
      .upload(`${user.id}/${fileName}`, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      return new Response(pdfBytes, {
        headers: { ...corsHeaders, "Content-Type": "application/pdf" },
      });
    }

    const { data: urlData } = supabase.storage
      .from("safety-documents")
      .getPublicUrl(`${user.id}/${fileName}`);

    await supabase
      .from("pre_use_checks")
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
