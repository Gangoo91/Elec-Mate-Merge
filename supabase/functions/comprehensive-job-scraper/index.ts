import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * COMPREHENSIVE UK ELECTRICAL JOB SCRAPER v2
 *
 * MASSIVELY EXPANDED - 500+ jobs per refresh
 *
 * Primary Sources (Official APIs - Reliable):
 * - Reed.co.uk API: 50+ UK locations × 100 jobs each
 * - Adzuna API: UK-wide coverage
 *
 * Secondary Sources (Firecrawl - Where it works):
 * - Gumtree Jobs (works well)
 * - Indeed (partial extraction)
 *
 * Coverage: EVERY major UK city and town
 * Target: 500-1000 fresh electrical jobs daily
 */

// ALL major UK locations for comprehensive coverage
const UK_LOCATIONS = {
  // London & Greater London
  london: [
    "London", "Central London", "East London", "West London", "North London", "South London",
    "Croydon", "Bromley", "Enfield", "Barnet", "Hounslow", "Ealing", "Hillingdon",
    "Harrow", "Brent", "Waltham Forest", "Redbridge", "Havering"
  ],
  // Southeast
  southeast: [
    "Brighton", "Southampton", "Portsmouth", "Reading", "Oxford", "Milton Keynes",
    "Guildford", "Maidstone", "Canterbury", "Crawley", "Slough", "Basingstoke",
    "Woking", "Tunbridge Wells", "Hastings", "Eastbourne", "Worthing", "Chelmsford"
  ],
  // Southwest
  southwest: [
    "Bristol", "Plymouth", "Exeter", "Bath", "Bournemouth", "Swindon", "Gloucester",
    "Cheltenham", "Taunton", "Torquay", "Poole", "Salisbury", "Yeovil", "Truro"
  ],
  // Midlands
  midlands: [
    "Birmingham", "Nottingham", "Leicester", "Coventry", "Derby", "Wolverhampton",
    "Stoke-on-Trent", "Walsall", "Dudley", "Solihull", "Northampton", "Worcester",
    "Telford", "Hereford", "Shrewsbury", "Lincoln", "Peterborough", "Kettering"
  ],
  // North West
  northwest: [
    "Manchester", "Liverpool", "Preston", "Blackpool", "Bolton", "Stockport",
    "Warrington", "Wigan", "Oldham", "Rochdale", "Salford", "Bury", "Burnley",
    "Blackburn", "Chester", "Crewe", "Macclesfield", "Lancaster"
  ],
  // Yorkshire & Humber
  yorkshire: [
    "Leeds", "Sheffield", "Bradford", "Hull", "York", "Huddersfield", "Doncaster",
    "Wakefield", "Rotherham", "Barnsley", "Halifax", "Harrogate", "Scarborough",
    "Grimsby", "Scunthorpe"
  ],
  // North East
  northeast: [
    "Newcastle upon Tyne", "Sunderland", "Middlesbrough", "Durham", "Darlington",
    "Gateshead", "Hartlepool", "Stockton-on-Tees", "South Shields"
  ],
  // East of England
  east: [
    "Norwich", "Cambridge", "Ipswich", "Colchester", "Luton", "Southend-on-Sea",
    "Peterborough", "Bedford", "Stevenage", "Watford", "St Albans", "Hertford",
    "Harlow", "Basildon", "Braintree"
  ],
  // Scotland
  scotland: [
    "Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness", "Stirling",
    "Perth", "Paisley", "East Kilbride", "Livingston", "Cumbernauld", "Falkirk",
    "Ayr", "Kilmarnock"
  ],
  // Wales
  wales: [
    "Cardiff", "Swansea", "Newport", "Wrexham", "Barry", "Neath", "Bridgend",
    "Cwmbran", "Llanelli", "Merthyr Tydfil", "Aberystwyth", "Bangor"
  ],
  // Northern Ireland
  northernIreland: [
    "Belfast", "Derry", "Lisburn", "Newry", "Bangor", "Craigavon"
  ],
};

// Batch configurations - OPTIMIZED for 150s timeout
// Each batch: ~10 locations × 2 keywords = 20 Reed API calls (~60 seconds)
const BATCHES = [
  {
    batch: 1,
    region: "London",
    reedLocations: ["London", "Central London", "East London", "West London", "North London", "South London", "Croydon", "Bromley"],
    gumtreeLocations: ["london"],
  },
  {
    batch: 2,
    region: "Southeast",
    reedLocations: ["Brighton", "Southampton", "Portsmouth", "Reading", "Oxford", "Milton Keynes", "Guildford", "Maidstone"],
    gumtreeLocations: ["brighton", "southampton"],
  },
  {
    batch: 3,
    region: "Midlands",
    reedLocations: ["Birmingham", "Nottingham", "Leicester", "Coventry", "Derby", "Wolverhampton", "Stoke-on-Trent", "Northampton"],
    gumtreeLocations: ["birmingham", "nottingham"],
  },
  {
    batch: 4,
    region: "Northwest",
    reedLocations: ["Manchester", "Liverpool", "Preston", "Blackpool", "Bolton", "Stockport", "Warrington", "Wigan"],
    gumtreeLocations: ["manchester", "liverpool"],
  },
  {
    batch: 5,
    region: "Yorkshire",
    reedLocations: ["Leeds", "Sheffield", "Bradford", "Hull", "York", "Huddersfield", "Doncaster", "Wakefield"],
    gumtreeLocations: ["leeds", "sheffield"],
  },
  {
    batch: 6,
    region: "Scotland",
    reedLocations: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness", "Stirling", "Perth", "Paisley"],
    gumtreeLocations: ["glasgow", "edinburgh"],
  },
  {
    batch: 7,
    region: "Wales & Southwest",
    reedLocations: ["Cardiff", "Swansea", "Newport", "Bristol", "Plymouth", "Exeter", "Bath", "Bournemouth"],
    gumtreeLocations: ["cardiff", "bristol"],
  },
  {
    batch: 8,
    region: "East & Northeast",
    reedLocations: ["Norwich", "Cambridge", "Ipswich", "Newcastle upon Tyne", "Sunderland", "Middlesbrough", "Peterborough", "Luton"],
    gumtreeLocations: ["cambridge", "newcastle"],
  },
  {
    batch: 9,
    region: "Specialist Nationwide",
    reedLocations: ["United Kingdom"],
    reedKeywords: [
      "solar pv electrician",
      "ev charger installer",
      "industrial electrician",
      "data centre electrician",
      "commissioning engineer electrical",
    ],
    gumtreeLocations: [],
  },
];

// Multiple search keywords to maximize results
const ELECTRICIAN_KEYWORDS = [
  "electrician",
  "electrical engineer",
  "electrical technician",
  "electrical installer",
  "electrical maintenance",
  "spark", // Trade slang
  "18th edition",
  "2391 electrician",
  "approved electrician",
  "JIB electrician",
];

/**
 * Fetch jobs from Reed API - THE MAIN SOURCE
 * Reed allows 100 results per request, with extensive filtering
 */
async function fetchReedJobs(
  locations: string[],
  reedApiKey: string,
  customKeywords?: string[]
): Promise<any[]> {
  if (!reedApiKey) {
    console.log("⚠️ No Reed API key");
    return [];
  }

  const allJobs: any[] = [];
  const keywords = customKeywords || ["electrician", "electrical engineer"]; // 2 keywords for speed

  // Process locations in parallel batches of 5
  const batchSize = 5;

  for (let i = 0; i < locations.length; i += batchSize) {
    const locationBatch = locations.slice(i, i + batchSize);

    const promises = locationBatch.map(async (location) => {
      const locationJobs: any[] = [];

      for (const keyword of keywords) {
        try {
          const params = new URLSearchParams({
            keywords: keyword,
            locationName: location,
            distanceFromLocation: "15", // Tighter radius for more specific results
            resultsToTake: "100",
            resultsToSkip: "0",
          });

          const response = await fetch(
            `https://www.reed.co.uk/api/1.0/search?${params}`,
            {
              headers: {
                Authorization: `Basic ${btoa(reedApiKey + ":")}`,
                Accept: "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const jobs = (data.results || []).map((job: any) => ({
              title: job.jobTitle,
              company: job.employerName,
              location: job.locationName,
              salary: formatReedSalary(job),
              jobType: job.contractType || (job.fullTime ? "Full-time" : job.partTime ? "Part-time" : "Permanent"),
              description: job.jobDescription?.substring(0, 500) || "",
              postedDate: job.datePosted?.split("T")[0] || new Date().toISOString().split("T")[0],
              applyUrl: job.jobUrl,
              source: "reed",
              expiryDate: job.expirationDate,
            }));
            locationJobs.push(...jobs);
          }

          // Rate limit: 250ms between requests
          await new Promise((r) => setTimeout(r, 250));
        } catch (error) {
          console.error(`Reed error ${location}/${keyword}:`, error);
        }
      }

      return { location, jobs: locationJobs };
    });

    const results = await Promise.all(promises);

    for (const result of results) {
      allJobs.push(...result.jobs);
      if (result.jobs.length > 0) {
        console.log(`✅ Reed ${result.location}: ${result.jobs.length} jobs`);
      }
    }

    // Pause between batches
    if (i + batchSize < locations.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return allJobs;
}

function formatReedSalary(job: any): string {
  if (job.minimumSalary && job.maximumSalary) {
    if (job.minimumSalary === job.maximumSalary) {
      return `£${job.minimumSalary.toLocaleString()}`;
    }
    return `£${job.minimumSalary.toLocaleString()} - £${job.maximumSalary.toLocaleString()}`;
  }
  if (job.minimumSalary) {
    return `£${job.minimumSalary.toLocaleString()}+`;
  }
  return job.salaryString || "Competitive";
}

/**
 * Fetch jobs from Adzuna API - FREE OFFICIAL API
 * Get API key from: https://developer.adzuna.com/
 */
async function fetchAdzunaJobs(
  adzunaAppId: string,
  adzunaApiKey: string
): Promise<any[]> {
  if (!adzunaAppId || !adzunaApiKey) {
    console.log("⚠️ No Adzuna API credentials");
    return [];
  }

  const allJobs: any[] = [];
  const keywords = ["electrician", "electrical engineer", "electrical installer"];

  for (const keyword of keywords) {
    try {
      // Adzuna allows up to 50 results per page, can paginate
      for (let page = 1; page <= 3; page++) {
        const params = new URLSearchParams({
          app_id: adzunaAppId,
          app_key: adzunaApiKey,
          results_per_page: "50",
          what: keyword,
          where: "uk",
          sort_by: "date",
          max_days_old: "14",
        });

        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?${params}`
        );

        if (response.ok) {
          const data = await response.json();
          const jobs = (data.results || []).map((job: any) => ({
            title: job.title,
            company: job.company?.display_name || "Not specified",
            location: job.location?.display_name || "UK",
            salary: job.salary_min && job.salary_max
              ? `£${Math.round(job.salary_min).toLocaleString()} - £${Math.round(job.salary_max).toLocaleString()}`
              : job.salary_is_predicted
                ? `~£${Math.round(job.salary_min || job.salary_max || 0).toLocaleString()}`
                : "Competitive",
            jobType: job.contract_type || job.contract_time || "Permanent",
            description: job.description?.substring(0, 500) || "",
            postedDate: job.created?.split("T")[0] || new Date().toISOString().split("T")[0],
            applyUrl: job.redirect_url,
            source: "adzuna",
          }));
          allJobs.push(...jobs);

          if ((data.results || []).length < 50) break; // No more pages
        }

        await new Promise((r) => setTimeout(r, 500));
      }
    } catch (error) {
      console.error(`Adzuna error for ${keyword}:`, error);
    }
  }

  console.log(`✅ Adzuna: ${allJobs.length} jobs`);
  return allJobs;
}

/**
 * Scrape Gumtree Jobs - Works with Firecrawl
 */
async function scrapeGumtreeJobs(
  locations: string[],
  firecrawlApiKey: string
): Promise<any[]> {
  if (!firecrawlApiKey || locations.length === 0) {
    return [];
  }

  const allJobs: any[] = [];

  for (const location of locations) {
    try {
      const url = `https://www.gumtree.com/jobs/${location}/electrician`;

      const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firecrawlApiKey}`,
        },
        body: JSON.stringify({
          url,
          formats: ["extract"],
          extract: {
            schema: {
              type: "object",
              properties: {
                jobs: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      company: { type: "string" },
                      location: { type: "string" },
                      salary: { type: "string" },
                      jobType: { type: "string" },
                      description: { type: "string" },
                      postedDate: { type: "string" },
                      applyUrl: { type: "string" },
                    },
                  },
                },
              },
            },
            prompt: "Extract all electrician job listings. Get title, company, location, salary, job type, description, posting date, and apply URL for each job.",
          },
          timeout: 30000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const jobs = (data.data?.extract?.jobs || []).map((job: any) => ({
          ...job,
          source: "gumtree",
          postedDate: normalizeDate(job.postedDate),
        }));
        allJobs.push(...jobs);
        console.log(`✅ Gumtree ${location}: ${jobs.length} jobs`);
      }

      await new Promise((r) => setTimeout(r, 2000));
    } catch (error) {
      console.error(`Gumtree error ${location}:`, error);
    }
  }

  return allJobs;
}

/**
 * Scrape Indeed UK - Partial extraction via Firecrawl
 */
async function scrapeIndeedJobs(
  locations: string[],
  firecrawlApiKey: string
): Promise<any[]> {
  if (!firecrawlApiKey || locations.length === 0) {
    return [];
  }

  const allJobs: any[] = [];

  for (const location of locations.slice(0, 3)) { // Limit to 3 locations
    try {
      const url = `https://uk.indeed.com/jobs?q=electrician&l=${encodeURIComponent(location)}&sort=date`;

      const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firecrawlApiKey}`,
        },
        body: JSON.stringify({
          url,
          formats: ["extract"],
          extract: {
            schema: {
              type: "object",
              properties: {
                jobs: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      company: { type: "string" },
                      location: { type: "string" },
                      salary: { type: "string" },
                      jobType: { type: "string" },
                      postedDate: { type: "string" },
                    },
                  },
                },
              },
            },
            prompt: "Extract all job listings shown on this Indeed search results page. For each job get the title, company name, location, salary if shown, job type, and when it was posted.",
          },
          timeout: 30000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const jobs = (data.data?.extract?.jobs || []).map((job: any) => ({
          ...job,
          source: "indeed",
          postedDate: normalizeDate(job.postedDate),
          applyUrl: `https://uk.indeed.com/jobs?q=${encodeURIComponent(job.title || "electrician")}&l=${encodeURIComponent(location)}`,
        }));
        allJobs.push(...jobs);
        console.log(`✅ Indeed ${location}: ${jobs.length} jobs`);
      }

      await new Promise((r) => setTimeout(r, 2000));
    } catch (error) {
      console.error(`Indeed error ${location}:`, error);
    }
  }

  return allJobs;
}

function normalizeDate(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];

  const lower = dateStr.toLowerCase();
  const today = new Date();

  if (lower.includes("today") || lower.includes("just") || lower.includes("now")) {
    return today.toISOString().split("T")[0];
  }
  if (lower.includes("yesterday")) {
    today.setDate(today.getDate() - 1);
    return today.toISOString().split("T")[0];
  }

  const daysMatch = lower.match(/(\d+)\s*day/i);
  if (daysMatch) {
    today.setDate(today.getDate() - parseInt(daysMatch[1]));
    return today.toISOString().split("T")[0];
  }

  const weeksMatch = lower.match(/(\d+)\s*week/i);
  if (weeksMatch) {
    today.setDate(today.getDate() - parseInt(weeksMatch[1]) * 7);
    return today.toISOString().split("T")[0];
  }

  const hoursMatch = lower.match(/(\d+)\s*hour/i);
  if (hoursMatch) {
    return today.toISOString().split("T")[0];
  }

  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }
  } catch {}

  return new Date().toISOString().split("T")[0];
}

// Deduplicate jobs by title + company
function deduplicateJobs(jobs: any[]): any[] {
  const seen = new Set();
  return jobs.filter((job) => {
    const key = `${job.title?.toLowerCase().trim()}_${job.company?.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Sort by freshness
function sortByFreshness(jobs: any[]): any[] {
  return jobs.sort((a, b) => {
    const dateA = new Date(a.postedDate || 0);
    const dateB = new Date(b.postedDate || 0);
    return dateB.getTime() - dateA.getTime();
  });
}

// Check cache freshness
async function checkCache(supabase: any, region: string) {
  const { data } = await supabase
    .from("jobs_weekly_cache")
    .select("*")
    .eq("region", region)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return data;
}

// Save to cache
async function saveToCache(
  supabase: any,
  region: string,
  jobs: any[],
  batchNumber: number
) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 12); // 12 hour cache

  // Delete old cache for this region
  await supabase.from("jobs_weekly_cache").delete().eq("region", region);

  const { error } = await supabase.from("jobs_weekly_cache").insert({
    batch_number: batchNumber,
    region,
    jobs_data: jobs,
    source: "comprehensive-v2",
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    console.error("Cache save error:", error);
  } else {
    console.log(`💾 Cached ${jobs.length} jobs for ${region}`);
  }
}

// Merge all cached regions
async function mergeAllRegions(supabase: any) {
  const { data: allCached, error } = await supabase
    .from("jobs_weekly_cache")
    .select("*")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Merge error:", error);
    return { success: false, jobs: [], totalJobs: 0 };
  }

  const allJobs: any[] = [];
  const sourceStats: Record<string, number> = {};
  const regionsFound: string[] = [];

  for (const cached of allCached || []) {
    const jobs = cached.jobs_data || [];
    allJobs.push(...jobs);

    for (const job of jobs) {
      sourceStats[job.source] = (sourceStats[job.source] || 0) + 1;
    }

    if (!regionsFound.includes(cached.region)) {
      regionsFound.push(cached.region);
    }
  }

  // Deduplicate and sort
  const uniqueJobs = deduplicateJobs(allJobs);
  const sortedJobs = sortByFreshness(uniqueJobs);

  return {
    success: true,
    jobs: sortedJobs,
    totalJobs: sortedJobs.length,
    regionsFound,
    totalRegions: BATCHES.length,
    sourceStats,
    allComplete: regionsFound.length >= BATCHES.length - 1, // Allow 1 region to fail
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { batch, forceRefresh, mergeAll } = body;

    const reedApiKey = Deno.env.get("REED_API_KEY");
    const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
    const adzunaAppId = Deno.env.get("ADZUNA_APP_ID");
    const adzunaApiKey = Deno.env.get("ADZUNA_API_KEY");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle merge request
    if (mergeAll) {
      const merged = await mergeAllRegions(supabase);

      // Update job_listings table
      if (merged.jobs.length > 0) {
        // Clear old scraped jobs
        await supabase
          .from("job_listings")
          .delete()
          .not("source", "is", null)
          .neq("source", "internal");

        // Insert top 500 jobs with proper UUIDs (9 batches × ~55 unique per region)
        // Filter out invalid jobs and provide defaults for NOT NULL columns
        const topJobs = merged.jobs
          .slice(0, 500)
          .filter((job) => job.title && job.company) // Must have title and company
          .map((job) => ({
            id: crypto.randomUUID(),
            title: job.title || "Electrician Position",
            company: job.company || "Company",
            location: job.location || "UK",
            salary: job.salary || null,
            type: job.jobType || "Permanent",
            description: job.description || "",
            posted_date: job.postedDate || new Date().toISOString().split("T")[0],
            external_url: job.applyUrl || "https://www.reed.co.uk",
            source: job.source || "reed",
          }));

        const { error: insertError } = await supabase.from("job_listings").insert(topJobs);
        if (insertError) {
          console.error("❌ Insert error:", insertError);
        } else {
          console.log(`✅ Inserted ${topJobs.length} jobs into job_listings`);
        }
      }

      return new Response(
        JSON.stringify({
          success: merged.success,
          totalJobs: merged.totalJobs,
          insertedJobs: Math.min(merged.jobs.length, 200),
          regionsFound: merged.regionsFound,
          totalRegions: merged.totalRegions,
          sourceStats: merged.sourceStats,
          allComplete: merged.allComplete,
          mode: "merge",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Process specific batch
    const batchNumber = batch || 1;
    if (batchNumber < 1 || batchNumber > BATCHES.length) {
      throw new Error(`Batch must be 1-${BATCHES.length}`);
    }

    const config = BATCHES[batchNumber - 1];
    console.log(`📊 Processing Batch ${batchNumber}: ${config.region}`);
    console.log(`   Reed locations: ${config.reedLocations.length}`);

    // Check cache
    if (!forceRefresh) {
      const cached = await checkCache(supabase, config.region);
      if (cached) {
        return new Response(
          JSON.stringify({
            success: true,
            totalJobs: cached.jobs_data?.length || 0,
            region: config.region,
            batch: batchNumber,
            cached: true,
            expiresAt: cached.expires_at,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    console.log(`🚀 Scraping ${config.region}...`);
    const startTime = Date.now();

    // Fetch from all sources in parallel
    const [reedJobs, adzunaJobs, gumtreeJobs, indeedJobs] = await Promise.all([
      fetchReedJobs(
        config.reedLocations,
        reedApiKey || "",
        (config as any).reedKeywords
      ),
      batchNumber === 1 ? fetchAdzunaJobs(adzunaAppId || "", adzunaApiKey || "") : Promise.resolve([]),
      scrapeGumtreeJobs(config.gumtreeLocations || [], firecrawlApiKey || ""),
      scrapeIndeedJobs(config.gumtreeLocations || [], firecrawlApiKey || ""),
    ]);

    // Combine all jobs
    const allJobs = [...reedJobs, ...adzunaJobs, ...gumtreeJobs, ...indeedJobs];

    // Deduplicate and sort
    const uniqueJobs = deduplicateJobs(allJobs);
    const sortedJobs = sortByFreshness(uniqueJobs);

    // Save to cache
    await saveToCache(supabase, config.region, sortedJobs, batchNumber);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    // Source breakdown
    const sourceStats: Record<string, number> = {};
    for (const job of sortedJobs) {
      sourceStats[job.source] = (sourceStats[job.source] || 0) + 1;
    }

    console.log(`🎉 ${config.region}: ${sortedJobs.length} unique jobs in ${elapsed}s`);

    return new Response(
      JSON.stringify({
        success: true,
        totalJobs: sortedJobs.length,
        region: config.region,
        batch: batchNumber,
        elapsed: `${elapsed}s`,
        sources: sourceStats,
        breakdown: {
          reed: reedJobs.length,
          adzuna: adzunaJobs.length,
          gumtree: gumtreeJobs.length,
          indeed: indeedJobs.length,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Scraper error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
