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

const SEVERITY_STATUS: Record<string, StatusColour> = {
  critical: "danger",
  high: "danger",
  medium: "warning",
  low: "success",
};

const SEVERITY_ACCENT: Record<string, typeof C.danger> = {
  critical: C.danger,
  high: C.danger,
  medium: C.warning,
  low: C.success,
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
      .from("near_miss_reports")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const sev = (record.severity || "").toLowerCase();
    const statusColour: StatusColour = SEVERITY_STATUS[sev] || "grey";

    const pdf = await SafetyPDFBuilder.create(
      "Near Miss Report",
      recordId,
      record.severity || "unknown",
      statusColour
    );

    // Incident Details
    pdf.section("Incident Details");
    pdf.keyValueGrid([
      { label: "Category", value: record.category || "N/A" },
      { label: "Location", value: record.location || "N/A" },
      { label: "Incident Date", value: fmtDate(record.incident_date) },
      { label: "Status", value: record.status || "N/A" },
      { label: "Reported", value: fmtDate(record.created_at) },
    ]);

    // Description
    pdf.section("Description");
    pdf.textBox(
      record.description || "No description provided.",
      SEVERITY_ACCENT[sev] || C.border
    );

    // Immediate Actions
    if (record.immediate_actions) {
      pdf.section("Immediate Actions Taken");
      pdf.textBox(record.immediate_actions, C.info);
    }

    // Footer
    pdf.footnote(
      `This document was generated electronically by Elec-Mate. Near Miss Ref: ${recordId}`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `near-miss-${recordId}-${Date.now()}.pdf`;

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
      .from("near_miss_reports")
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
