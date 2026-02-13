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

const TYPE_STATUS: Record<string, StatusColour> = {
  positive: "success",
  improvement: "warning",
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
      .from("safety_observations")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const obsType = (record.observation_type || "").toLowerCase();
    const statusColour: StatusColour =
      TYPE_STATUS[obsType] || "info";

    const pdf = await SafetyPDFBuilder.create(
      "Safety Observation",
      recordId,
      record.observation_type || "observation",
      statusColour
    );

    // Observation Details
    const capitalised =
      record.observation_type
        ? record.observation_type.charAt(0).toUpperCase() +
          record.observation_type.slice(1)
        : "N/A";

    pdf.section("Observation Details");
    pdf.keyValueGrid([
      { label: "Observation Type", value: capitalised },
      { label: "Category", value: record.category || "N/A" },
      { label: "Location", value: record.location || "N/A" },
      { label: "Person Observed", value: record.person_observed || "N/A" },
      { label: "Date", value: fmtDate(record.created_at) },
    ]);

    // Description
    pdf.section("Description");
    pdf.textBox(
      record.description || "No description provided.",
      obsType === "positive" ? C.success : C.warning
    );

    // Photo reference
    if (record.photo_url) {
      pdf.paragraph("Photo attached \u2014 view at: " + record.photo_url, {
        size: 8,
        color: C.textSec,
      });
    }

    // Footnote
    pdf.footnote(
      `This document was generated electronically by Elec-Mate. Observation Ref: ${recordId}`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `observation-${recordId}-${Date.now()}.pdf`;

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
      .from("safety_observations")
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
