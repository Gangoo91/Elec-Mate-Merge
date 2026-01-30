import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-request-id",
};

interface UserDataExport {
  exportedAt: string;
  user: {
    id: string;
    email: string;
  };
  profile: Record<string, unknown> | null;
  elecId: Record<string, unknown> | null;
  certificates: Record<string, unknown>[];
  studyProgress: Record<string, unknown>[];
  quizAttempts: Record<string, unknown>[];
  invoices: Record<string, unknown>[];
  quotes: Record<string, unknown>[];
  customers: Record<string, unknown>[];
  settings: Record<string, unknown> | null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Create Supabase client with user's token
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error("Unauthorized: Could not get user");
    }

    const userId = user.id;
    console.log(`Starting data export for user: ${userId}`);

    // Initialize export object
    const exportData: UserDataExport = {
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email || "",
      },
      profile: null,
      elecId: null,
      certificates: [],
      studyProgress: [],
      quizAttempts: [],
      invoices: [],
      quotes: [],
      customers: [],
      settings: null,
    };

    // Fetch profile data
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profile) {
      // Remove sensitive fields
      const { ...safeProfile } = profile;
      exportData.profile = safeProfile;
    }

    // Fetch Elec-ID data
    const { data: elecId } = await supabaseClient
      .from("employer_elec_id_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (elecId) {
      exportData.elecId = elecId;
    }

    // Fetch certificates
    const { data: certificates } = await supabaseClient
      .from("certificates")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (certificates) {
      exportData.certificates = certificates;
    }

    // Fetch study progress (apprentice_progress)
    const { data: studyProgress } = await supabaseClient
      .from("apprentice_progress")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (studyProgress) {
      exportData.studyProgress = studyProgress;
    }

    // Fetch quiz attempts
    const { data: quizAttempts } = await supabaseClient
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (quizAttempts) {
      exportData.quizAttempts = quizAttempts;
    }

    // Fetch invoices created by user
    const { data: invoices } = await supabaseClient
      .from("invoices")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (invoices) {
      exportData.invoices = invoices;
    }

    // Fetch quotes created by user
    const { data: quotes } = await supabaseClient
      .from("quotes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (quotes) {
      exportData.quotes = quotes;
    }

    // Fetch customers created by user
    const { data: customers } = await supabaseClient
      .from("customers")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (customers) {
      exportData.customers = customers;
    }

    // Fetch user settings
    const { data: settings } = await supabaseClient
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (settings) {
      exportData.settings = settings;
    }

    console.log(`Data export completed for user: ${userId}`);

    // Return the data as JSON
    return new Response(
      JSON.stringify(exportData, null, 2),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="elec-mate-data-export-${new Date().toISOString().split('T')[0]}.json"`,
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in user-data-export:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
