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

const STATUS_MAP: Record<string, StatusColour> = {
  good: "success",
  attention: "warning",
  overdue: "danger",
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
      .from("safety_equipment")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const statusKey = (record.status || "").toLowerCase();
    const statusColour: StatusColour = STATUS_MAP[statusKey] || "grey";

    const pdf = await SafetyPDFBuilder.create(
      "Safety Equipment Record",
      recordId,
      record.status || "unknown",
      statusColour
    );

    // Equipment Details
    pdf.section("Equipment Details");
    pdf.keyValueGrid([
      { label: "Equipment Type", value: record.equipment_type || "N/A" },
      { label: "Serial Number", value: record.serial_number || "N/A" },
      { label: "Status", value: record.status || "N/A" },
      { label: "Description", value: record.description || "N/A" },
    ]);

    // Inspection & Calibration
    pdf.section("Inspection & Calibration");
    pdf.table(
      ["Date Type", "Date"],
      [
        ["Last Inspection", fmtDate(record.last_inspection_date)],
        ["Next Inspection", fmtDate(record.next_inspection_date)],
        ["Last Calibration", fmtDate(record.calibration_date)],
      ]
    );

    // Notes
    if (record.notes) {
      pdf.section("Notes");
      pdf.paragraph(record.notes);
    }

    // Footer
    pdf.footnote(
      `This document was generated electronically by Elec-Mate. Equipment Ref: ${recordId}`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `equipment-${recordId}-${Date.now()}.pdf`;

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
      .from("safety_equipment")
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
