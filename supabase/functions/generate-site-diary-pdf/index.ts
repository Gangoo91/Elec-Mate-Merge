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

const fmtTime = (t: string | null): string => {
  if (!t) return "N/A";
  try {
    if (t.includes("T")) {
      return new Date(t).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return t;
  } catch {
    return t;
  }
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
      .from("electrician_site_diary")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const statusColour: StatusColour = "info";

    const pdf = await SafetyPDFBuilder.create(
      "Site Diary Entry",
      recordId,
      "recorded",
      statusColour
    );

    // Site Information
    pdf.section("Site Information");
    pdf.keyValueGrid([
      { label: "Site Name", value: record.site_name || "N/A" },
      { label: "Site Address", value: record.site_address || "N/A" },
      { label: "Entry Date", value: fmtDate(record.entry_date) },
      { label: "Weather", value: record.weather || "N/A" },
    ]);

    // Working Hours
    pdf.section("Working Hours");
    pdf.keyValueGrid(
      [
        { label: "Start Time", value: fmtTime(record.start_time) },
        { label: "End Time", value: fmtTime(record.end_time) },
        {
          label: "Personnel",
          value: (record.personnel_count ?? "N/A") + " personnel",
        },
      ],
      3
    );

    // Work Completed
    if (record.work_completed) {
      pdf.section("Work Completed");
      pdf.textBox(record.work_completed, C.success);
    }

    // Issues & Delays
    if (record.issues) {
      pdf.section("Issues & Delays");
      pdf.textBox(record.issues, C.warning);
    }

    // Materials Used
    if (record.materials_used) {
      pdf.section("Materials Used");
      pdf.textBox(record.materials_used, C.info);
    }

    // Additional Notes
    if (record.notes) {
      pdf.section("Additional Notes");
      pdf.paragraph(record.notes);
    }

    // Footnote
    pdf.footnote(
      `This document was generated electronically by Elec-Mate. Diary Ref: ${recordId}`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `site-diary-${recordId}-${Date.now()}.pdf`;

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
      .from("electrician_site_diary")
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
