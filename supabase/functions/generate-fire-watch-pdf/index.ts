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

const fmtDateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString("en-GB") : "N/A";

const STATUS_MAP: Record<string, StatusColour> = {
  completed: "success",
  active: "warning",
  extended: "info",
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
      .from("fire_watch_records")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const statusKey = (record.status || "").toLowerCase();
    const statusColour: StatusColour = STATUS_MAP[statusKey] || "grey";

    const pdf = await SafetyPDFBuilder.create(
      "Fire Watch Record",
      recordId,
      record.status || "unknown",
      statusColour
    );

    // Fire Watch Details
    pdf.section("Fire Watch Details");
    pdf.keyValueGrid([
      { label: "Start Time", value: fmtDateTime(record.start_time) },
      { label: "End Time", value: fmtDateTime(record.end_time) },
      {
        label: "Duration",
        value: record.duration_minutes
          ? `${record.duration_minutes} minutes`
          : "N/A",
      },
      { label: "Completed By", value: record.completed_by || "N/A" },
      { label: "Status", value: (record.status || "N/A").toUpperCase() },
    ]);

    // Fire Watch Checklist
    pdf.section("Fire Watch Checklist");
    const items = (record.checklist as any[]) || [];

    if (items.length > 0) {
      pdf.checklist(
        items.map((i: any) => ({
          label: i.label || i.item || "Check",
          passed: i.checked === true || i.result === "pass",
        }))
      );
    } else {
      pdf.paragraph("No checklist items recorded.", { color: C.textSec });
    }

    // Footer
    pdf.footnote(
      `This document was generated electronically by Elec-Mate. Fire Watch Ref: ${recordId}`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `fire-watch-${recordId}-${Date.now()}.pdf`;

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
      .from("fire_watch_records")
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
