import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { SafetyPDFBuilder, C, type StatusColour } from "../_shared/SafetyPDFBuilder.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-GB") : "N/A";
const fmtDateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString("en-GB") : "N/A";

const TYPE_LABELS: Record<string, string> = {
  "hot-work": "Hot Work",
  "confined-space": "Confined Space",
  "electrical-isolation": "Electrical Isolation",
  "working-at-height": "Working at Height",
  excavation: "Excavation",
};

const STATUS_MAP: Record<string, StatusColour> = {
  active: "success",
  expired: "danger",
  closed: "info",
  draft: "grey",
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

    const { permitId, recordId } = await req.json();
    const id = permitId || recordId;
    if (!id) throw new Error("Missing permitId");

    const { data: permit, error: fetchError } = await userSupabase
      .from("permits_to_work")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !permit) throw new Error("Permit not found");

    // ── Build PDF ──────────────────────────────────────────────────────
    const statusColour = STATUS_MAP[permit.status] || "grey";
    const pdf = await SafetyPDFBuilder.create(
      "Permit to Work",
      id,
      permit.status || "draft",
      statusColour
    );

    // Permit details
    pdf.section("Permit Details");
    pdf.keyValueGrid([
      { label: "Permit Title", value: permit.title || "Untitled" },
      { label: "Type", value: TYPE_LABELS[permit.type] || permit.type || "N/A" },
      { label: "Location", value: permit.location || "N/A" },
      { label: "Duration", value: `${permit.duration_hours || "N/A"} hours` },
      { label: "Start", value: fmtDateTime(permit.start_time) },
      { label: "End", value: fmtDateTime(permit.end_time) },
      { label: "Issued", value: fmtDate(permit.created_at) },
      { label: "Status", value: (permit.status || "draft").toUpperCase() },
    ]);

    // Description
    if (permit.description) {
      pdf.section("Description of Work");
      pdf.textBox(permit.description);
    }

    // Hazards & Controls
    const hazards = (permit.hazards as any[]) || [];
    pdf.section("Hazards & Control Measures");
    if (hazards.length > 0) {
      pdf.table(
        ["Hazard", "Control Measures"],
        hazards.map((h: any) => [
          h.description || h.hazard || "",
          h.controls || h.control || "N/A",
        ])
      );
    } else {
      pdf.paragraph("None specified.", { color: C.textSec });
    }

    // Precautions
    const precautions = (permit.precautions as string[]) || [];
    if (precautions.length > 0) {
      pdf.section("Precautions");
      pdf.bulletList(precautions);
    }

    // PPE Required
    const ppe = (permit.ppe_required as string[]) || [];
    if (ppe.length > 0) {
      pdf.section("PPE Required");
      pdf.badges(ppe);
    }

    // Emergency Procedures
    if (permit.emergency_procedures) {
      pdf.section("Emergency Procedures");
      pdf.textBox(permit.emergency_procedures, C.danger);
    }

    // Authorisation
    pdf.section("Authorisation");
    pdf.signatureBlock([
      {
        role: "Permit Issuer",
        name: permit.issuer_name || undefined,
        date: fmtDate(permit.created_at),
      },
      {
        role: "Permit Receiver",
        name: permit.receiver_name || undefined,
        date: fmtDate(permit.created_at),
      },
    ]);

    // Additional Notes
    if (permit.additional_notes) {
      pdf.section("Additional Notes");
      pdf.paragraph(permit.additional_notes);
    }

    // Closure
    if (permit.closed_at) {
      pdf.section("Permit Closure");
      pdf.keyValueGrid([
        { label: "Closed At", value: fmtDateTime(permit.closed_at) },
        { label: "Closed By", value: permit.closed_by || "N/A" },
      ]);
    }

    // Footer
    pdf.footnote(
      `This document was generated electronically by Elec-Mate. Permit Ref: ${id}`
    );

    // ── Upload PDF ─────────────────────────────────────────────────────
    const pdfBytes = await pdf.toBuffer();
    const fileName = `permit-${id}-${Date.now()}.pdf`;

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
      .from("permits_to_work")
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
