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

const RISK_MAP: Record<string, StatusColour> = {
  low: "success",
  medium: "warning",
  high: "danger",
  "very-high": "danger",
  "very high": "danger",
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

    const { assessmentId, recordId } = await req.json();
    const id = assessmentId || recordId;
    if (!id) throw new Error("Missing assessmentId");

    const { data: record, error: fetchError } = await userSupabase
      .from("coshh_assessments")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !record) throw new Error("COSHH assessment not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const riskRating = (record.risk_rating || "").toLowerCase();
    const statusColour: StatusColour = RISK_MAP[riskRating] || "warning";
    const pdf = await SafetyPDFBuilder.create(
      "COSHH Assessment",
      id,
      record.risk_rating || "Unknown",
      statusColour
    );

    // Substance Details
    pdf.section("Substance Details");
    pdf.keyValueGrid([
      { label: "Substance Name", value: record.substance_name || "N/A" },
      { label: "Manufacturer", value: record.manufacturer || "N/A" },
      { label: "Risk Rating", value: record.risk_rating || "N/A" },
      { label: "Assessed By", value: record.assessed_by || "N/A" },
      { label: "Assessment Date", value: fmtDate(record.assessment_date) },
      { label: "Review Date", value: fmtDate(record.review_date) },
    ]);

    // GHS Hazards
    const ghsHazards = (record.ghs_hazards as string[]) || [];
    pdf.section("GHS Hazards");
    if (ghsHazards.length > 0) {
      pdf.badges(ghsHazards);
    } else {
      pdf.paragraph("None specified.", { color: C.textSec });
    }

    // Health Effects
    pdf.section("Health Effects");
    pdf.textBox(record.health_effects || "Not specified", C.danger);

    // Exposure Routes
    const exposureRoutes = (record.exposure_routes as string[]) || [];
    pdf.section("Exposure Routes");
    if (exposureRoutes.length > 0) {
      pdf.bulletList(exposureRoutes);
    } else {
      pdf.paragraph("None specified.", { color: C.textSec });
    }

    // Control Measures
    const controlMeasures = (record.control_measures as string[]) || [];
    pdf.section("Control Measures");
    if (controlMeasures.length > 0) {
      pdf.bulletList(controlMeasures);
    } else {
      pdf.paragraph("None specified.", { color: C.textSec });
    }

    // PPE Required
    const ppeRequired = (record.ppe_required as string[]) || [];
    pdf.section("PPE Required");
    if (ppeRequired.length > 0) {
      pdf.badges(ppeRequired);
    } else {
      pdf.paragraph("None specified.", { color: C.textSec });
    }

    // Storage Requirements
    pdf.section("Storage Requirements");
    pdf.textBox(record.storage_requirements || "Not specified");

    // Spill Procedure
    pdf.section("Spill Procedure");
    pdf.textBox(record.spill_procedure || "Not specified", C.warning);

    // First Aid Measures
    pdf.section("First Aid Measures");
    pdf.textBox(record.first_aid || "Not specified", C.info);

    // Disposal Method
    pdf.section("Disposal Method");
    pdf.paragraph(record.disposal_method || "Not specified");

    // Footer
    pdf.footnote(
      "COSHH Regulations 2002 Compliance \u2014 This assessment must be reviewed regularly and updated when substances, processes, or controls change."
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `coshh-${id}-${Date.now()}.pdf`;

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
      .from("coshh_assessments")
      .update({ pdf_url: urlData.publicUrl })
      .eq("id", id);

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
