import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProjectData {
  status: string;
  category: string;
  project_name: string;
  description: string;
  client: string;
  contract_value: string;
  duration: string;
  location: string;
  contractors: number;
  start_date: string;
  details_link: string;
  project_link: string;
  awarded: string;
}

// Direct API call to UK Contracts Finder OCDS endpoint
async function fetchProjectsFromAPI(): Promise<ProjectData[]> {
  console.log('🚀 Starting official UK Contracts Finder API extraction...');

  const allProjects: ProjectData[] = [];
  
  // Multiple electrical-related search queries
  const searchQueries = [
    "electrical",
    "power",
    "infrastructure", 
    "substation",
    "grid",
    "transmission"
  ];

  for (const query of searchQueries) {
    try {
      console.log(`🔍 Fetching contracts for: ${query}`);
      
      const baseUrl = "https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search";
      const params = new URLSearchParams({
        stages: "award", // only awarded contracts
        q: query,
        size: "10", // results per page
        page: "1", // page number
      });

      const url = `${baseUrl}?${params.toString()}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.error(`❌ HTTP error for ${query}: ${response.status}`);
        continue;
      }

      const data = await response.json();
      
      if (!data.releases || !Array.isArray(data.releases)) {
        console.log(`⚠️ No releases found for ${query}`);
        continue;
      }

      const projects = data.releases.map((tenderData: any) => {
        const tender = tenderData.tender || {};
        const buyer = tenderData.buyer || {};
        const award = (tenderData.awards && tenderData.awards[0]) || {};
        const supplierNames = award.suppliers ? award.suppliers.map((s: any) => s.name).join(", ") : "";
        const buyerAddress = buyer.address || {};
        const isAwarded = award.suppliers && award.suppliers.length > 0;

        return {
          status: tender.status || "completed",
          category: tender.classification?.description || "Infrastructure",
          project_name: tender.title || "Untitled Project",
          description: tender.description || tender.title || "",
          client: buyer.name || "TBC",
          contract_value: award.value ? `${award.value.amount} ${award.value.currency}` : "TBC",
          duration: award.contractPeriod ? 
            `${new Date(award.contractPeriod.startDate).toLocaleDateString()} to ${new Date(award.contractPeriod.endDate).toLocaleDateString()}` 
            : "12 months",
          location: [buyerAddress.locality, buyerAddress.region, buyerAddress.countryName]
            .filter(Boolean).join(", ") || "UK",
          contractors: supplierNames.length || estimateContractorCount(award.value?.amount),
          start_date: award.contractPeriod?.startDate || award.date || new Date().toISOString(),
          details_link: award.documents?.[0]?.url || "",
          project_link: buyer.details?.url || "",
          awarded: isAwarded ? "Yes" : "No",
        };
      }).filter((project: ProjectData) => isElectricalContract(project));

      allProjects.push(...projects);
      console.log(`✅ Added ${projects.length} projects from ${query} query`);

    } catch (error) {
      console.error(`❌ Error fetching ${query} contracts:`, error);
      continue;
    }
  }

  console.log(`🎯 Total projects extracted: ${allProjects.length}`);
  return deduplicateProjects(allProjects).slice(0, 15);
}

// Check if contract is electrical/infrastructure related
function isElectricalContract(contract: ProjectData): boolean {
  const searchText = `${contract.project_name || ""} ${contract.description || ""} ${contract.category || ""}`.toLowerCase();
  
  const electricalKeywords = [
    'electrical', 'power', 'grid', 'substation', 'transmission', 'distribution',
    'transformer', 'switchgear', 'cable', 'hvdc', 'solar', 'wind', 'renewable',
    'lighting', 'wiring', 'installation', 'electrical infrastructure', 'energy',
    'fire door', 'housing', 'building'
  ];
  
  return electricalKeywords.some(keyword => searchText.includes(keyword));
}

function estimateContractorCount(amount: number): number {
  if (!amount) return 5;
  if (amount > 50000000) return 15; // > £50M
  if (amount > 20000000) return 10; // > £20M
  if (amount > 5000000) return 8;   // > £5M
  return 5;
}

// Normalize contract status to match database enum
function normalizeStatus(status: string): string {
  if (!status) return "awarded";
  
  const statusLower = status.toLowerCase();
  if (statusLower.includes('open') || statusLower.includes('tender')) return "open";
  if (statusLower.includes('award') || statusLower.includes('contract')) return "awarded"; 
  if (statusLower.includes('progress') || statusLower.includes('ongoing')) return "in_progress";
  if (statusLower.includes('complet')) return "completed";
  
  return "awarded";
}

function deduplicateProjects(projects: ProjectData[]): ProjectData[] {
  const seen = new Set();
  const titleSimilarityThreshold = 0.8;
  
  return projects.filter(project => {
    const currentTitle = project.project_name.toLowerCase();
    
    // Check against existing titles for similarity
    for (const existingTitle of seen) {
      const similarity = calculateStringSimilarity(currentTitle, existingTitle);
      if (similarity > titleSimilarityThreshold) {
        return false; // Skip similar project
      }
    }
    
    seen.add(currentTitle);
    return true;
  });
}

function calculateStringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🚀 Starting UK Contracts Finder API extraction...');
    
    const projects = await fetchProjectsFromAPI();
    
    let totalInserted = 0;
    let errors = 0;

    // Store projects in database
    for (const project of projects) {
      try {
        const { error } = await supabase
          .from('major_projects')
          .insert({
            title: project.project_name,
            summary: project.description.substring(0, 200),
            content: `${project.description}\n\nCategory: ${project.category}\nDuration: ${project.duration}\nContractors: ${project.contractors}`,
            awarded_to: project.client,
            project_value: project.contract_value,
            location: project.location,
            status: normalizeStatus(project.status),
            date_awarded: project.start_date,
            category: project.category,
            electrical_scope: 'General Electrical',
            source_url: project.details_link || "https://www.contractsfinder.service.gov.uk",
            external_project_url: project.project_link || project.details_link,
            tender_deadline: null,
            is_active: true,
          });

        if (!error) {
          totalInserted++;
        } else {
          console.error('Database insert error:', error);
          errors++;
        }
      } catch (insertError) {
        console.error('Project processing error:', insertError);
        errors++;
      }
    }

    // Fetch updated database projects
    const { data: dbProjects, error: dbError } = await supabase
      .from('major_projects')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(20);

    console.log(`✅ Contracts processing complete: ${totalInserted} projects inserted, ${errors} errors`);

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully processed ${totalInserted} UK electrical contracts from Contracts Finder`,
      inserted: totalInserted,
      errors: errors,
      scrapedProjects: projects.length,
      data: dbProjects || []
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Edge function error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});