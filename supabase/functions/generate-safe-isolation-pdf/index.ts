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
  isolated: "danger",
  re_energised: "success",
  in_progress: "warning",
  cancelled: "grey",
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
      .from("safe_isolation_records")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const statusKey = (record.status || "in_progress").toLowerCase();
    const statusColour: StatusColour = STATUS_MAP[statusKey] || "grey";

    const pdf = await SafetyPDFBuilder.create(
      "Safe Isolation Record",
      recordId,
      record.status || "in_progress",
      statusColour
    );

    // Warning banner for isolated circuits
    if (statusKey === "isolated") {
      pdf.warningBanner(
        "CIRCUIT CURRENTLY ISOLATED \u2014 DO NOT RE-ENERGISE WITHOUT AUTHORISATION"
      );
    }

    // Circuit Details
    pdf.section("Circuit Details");
    pdf.keyValueGrid([
      { label: "Site Address", value: record.site_address || "N/A" },
      {
        label: "Circuit Description",
        value: record.circuit_description || "N/A",
      },
      {
        label: "Distribution Board",
        value: record.distribution_board || "N/A",
      },
      { label: "Date", value: fmtDate(record.created_at) },
    ]);

    // Voltage Detector
    pdf.section("Voltage Detector");
    pdf.keyValueGrid([
      {
        label: "Serial Number",
        value: record.voltage_detector_serial || "N/A",
      },
      {
        label: "Calibration Date",
        value: fmtDate(record.voltage_detector_calibration_date),
      },
    ]);

    // Isolation Steps
    const steps = (record.steps as any[]) || [];
    pdf.section("Isolation Steps");

    if (steps.length > 0) {
      pdf.checklist(
        steps.map((s: any) => ({
          label: s.label || s.name || "Step",
          passed: s.completed === true,
          notes: s.notes || undefined,
        }))
      );
    } else {
      pdf.paragraph("No steps recorded");
    }

    // Signature Block
    pdf.signatureBlock([
      {
        role: "Isolated By",
        date: fmtDate(record.created_at),
      },
    ]);

    // Footnote with BS 7671 reference
    pdf.footnote(
      `This document was generated electronically by Elec-Mate. BS 7671:2018+A2:2022 compliance. Isolation Ref: ${recordId}`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `safe-isolation-${recordId}-${Date.now()}.pdf`;

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
      .from("safe_isolation_records")
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
