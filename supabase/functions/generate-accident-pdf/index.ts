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
const fmtDateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString("en-GB") : "N/A";

const SEVERITY_MAP: Record<string, StatusColour> = {
  minor: "success",
  moderate: "warning",
  major: "danger",
  fatal: "danger",
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
      .from("accident_records")
      .select("*")
      .eq("id", recordId)
      .single();

    if (fetchError || !record) throw new Error("Accident record not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const severity = (record.severity || "").toLowerCase();
    const statusColour: StatusColour = SEVERITY_MAP[severity] || "warning";
    const pdf = await SafetyPDFBuilder.create(
      "Accident / Incident Record",
      recordId,
      record.severity || "Unknown",
      statusColour
    );

    // RIDDOR Warning Banner
    if (record.is_riddor_reportable) {
      pdf.warningBanner(
        "RIDDOR REPORTABLE \u2014 Must be reported to HSE within required timeframe"
      );
    }

    // Incident Details
    pdf.section("Incident Details");
    const dateTime = [
      fmtDate(record.incident_date),
      record.incident_time || "",
    ]
      .filter(Boolean)
      .join(" ");

    pdf.keyValueGrid([
      { label: "Injured Person", value: record.injured_name || "N/A" },
      { label: "Date & Time", value: dateTime || "N/A" },
      { label: "Location", value: record.location || "N/A" },
      {
        label: "Severity",
        value: (record.severity || "N/A").toUpperCase(),
      },
      { label: "Injury Type", value: record.injury_type || "N/A" },
      { label: "Body Part", value: record.body_part || "N/A" },
    ]);

    // Description of Incident
    pdf.section("Description of Incident");
    pdf.textBox(
      record.incident_description || "Not provided",
      C.danger
    );

    // Witnesses
    pdf.section("Witnesses");
    if (record.witnesses) {
      pdf.paragraph(record.witnesses);
    } else {
      pdf.paragraph("None recorded", { color: C.textSec });
    }

    // First Aid
    pdf.section("First Aid");
    pdf.keyValueGrid([
      {
        label: "First Aid Given",
        value: record.first_aid_given ? "Yes" : "No",
      },
      {
        label: "First Aid Details",
        value: record.first_aid_details || "N/A",
      },
    ]);

    // Hospital Visit
    pdf.section("Hospital Visit");
    pdf.paragraph(record.hospital_visit ? "Yes" : "No");

    // Time Off Work
    if (record.time_off_work) {
      pdf.section("Time Off Work");
      pdf.keyValueGrid([
        {
          label: "Days Off",
          value: record.days_off != null ? String(record.days_off) : "N/A",
        },
        {
          label: "Return Date",
          value: fmtDate(record.return_date),
        },
      ]);
    }

    // RIDDOR Details
    if (record.is_riddor_reportable) {
      pdf.section("RIDDOR Details");
      pdf.keyValueGrid([
        {
          label: "RIDDOR Category",
          value: record.riddor_category || "To be determined",
        },
        {
          label: "RIDDOR Reference",
          value: record.riddor_reference || "Pending",
        },
      ]);
    }

    // Footer
    pdf.footnote(
      "RIDDOR 2013 Compliance \u2014 Reporting of Injuries, Diseases and Dangerous Occurrences Regulations. Recorded: " +
        fmtDateTime(record.created_at)
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `accident-${recordId}-${Date.now()}.pdf`;

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
      .from("accident_records")
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
