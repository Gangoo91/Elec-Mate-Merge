import { corsHeaders } from '../_shared/cors.ts';

interface TenderProject {
  status: string;
  category: string;
  project_name: string;
  description: string;
  client: string;
  contract_value: string;
  duration: string;
  location: string;
  contractors: string;
  start_date: string;
  details_link: string;
  project_link: string;
  awarded: boolean;
}

async function fetchTenders(): Promise<TenderProject[]> {
  const baseUrl = "https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search";

  const params = new URLSearchParams({
    stages: "award", // only awarded contracts
    q: "latest major electrical infrastructure", // ✅ keyword filter
    size: "20", // results per page
    page: "1", // page number
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    console.log(`Fetching from URL: ${url}`);
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Supabase-Edge-Function/1.0",
      },
    });

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(`Found ${data.releases?.length || 0} releases`);

    if (!data.releases || !Array.isArray(data.releases)) {
      console.warn("No releases found in response");
      return [];
    }

    const awardedContracts = data.releases.map((tenderData: any) => {
      const tender = tenderData.tender || {};
      const buyer = tenderData.buyer || {};
      const award = (tenderData.awards && tenderData.awards[0]) || {};
      const supplierNames = award.suppliers ? award.suppliers.map((s: any) => s.name).join(", ") : "";
      const buyerAddress = buyer.address || {};
      const isAwarded = award.suppliers && award.suppliers.length > 0;

      return {
        status: tender.status || "",
        category: tender.classification?.description || "",
        project_name: tender.title || "",
        description: tender.description || "",
        client: buyer.name || "",
        contract_value: award.value ? `${award.value.amount} ${award.value.currency}` : "",
        duration: award.contractPeriod ? `${award.contractPeriod.startDate} to ${award.contractPeriod.endDate}` : "",
        location: [buyerAddress.locality, buyerAddress.region, buyerAddress.countryName].filter(Boolean).join(", "),
        contractors: supplierNames,
        start_date: award.contractPeriod?.startDate || "",
        details_link: award.documents?.[0]?.url || "",
        project_link: buyer.details?.url || "",
        awarded: isAwarded
      };
    });

    console.log(`Processed ${awardedContracts.length} contracts`);
    return awardedContracts;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Fetching major projects...");
    const projects = await fetchTenders();
    
    console.log(`Returning ${projects.length} projects`);
    
    return new Response(JSON.stringify({ projects }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in fetch-projects function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to fetch projects', details: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});