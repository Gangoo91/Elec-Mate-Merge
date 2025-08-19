import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Project {
  title: string;
  description: string;
  value: string;
  location: string;
  deadline: string;
  client: string;
  source: string;
  external_id: string;
  url: string;
}

async function parseProjectFeed(url: string, source: string): Promise<Project[]> {
  try {
    console.log(`Fetching project feed from: ${url}`);
    const response = await fetch(url);
    const xmlText = await response.text();
    
    const projects: Project[] = [];
    
    // Parse RSS/Atom feeds for project information
    const itemPattern = /<(?:item|entry)[\s\S]*?<\/(?:item|entry)>/gi;
    const items = xmlText.match(itemPattern) || [];
    
    for (const item of items) {
      const titleMatch = item.match(/<(?:title)(?:[^>]*)>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/(?:title)>/i);
      const linkMatch = item.match(/<(?:link)(?:[^>]*)>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/(?:link)>|<link[^>]*href=["']([^"']*)["']/i);
      const descriptionMatch = item.match(/<(?:description|summary|content)(?:[^>]*)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/(?:description|summary|content)>/i);
      const pubDateMatch = item.match(/<(?:pubDate|published|updated)(?:[^>]*)>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/(?:pubDate|published|updated)>/i);
      const guidMatch = item.match(/<(?:guid|id)(?:[^>]*)>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/(?:guid|id)>/i);
      
      if (titleMatch && linkMatch) {
        const title = titleMatch[1]?.replace(/<[^>]*>/g, '').trim() || '';
        const link = linkMatch[1] || linkMatch[2] || '';
        const description = descriptionMatch?.[1]?.replace(/<[^>]*>/g, '').trim() || '';
        const publishedDate = pubDateMatch?.[1] || new Date().toISOString();
        const external_id = guidMatch?.[1] || link;
        
        // Extract project details from title and description
        const valueMatch = description.match(/£([\d,]+(?:\.\d{2})?)/);
        const locationMatch = description.match(/(?:in|at|for)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
        
        if (title && link) {
          projects.push({
            title,
            description: description.substring(0, 500),
            value: valueMatch ? `£${valueMatch[1]}` : 'TBC',
            location: locationMatch ? locationMatch[1] : 'Various',
            deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // Default 90 days from now
            client: source,
            source,
            external_id,
            url: link
          });
        }
      }
    }
    
    console.log(`Parsed ${projects.length} projects from ${source}`);
    return projects;
  } catch (error) {
    console.error(`Error parsing project feed from ${source}:`, error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Project feeds to parse
    const feeds = [
      { url: 'https://www.contractsfinder.service.gov.uk/Search/Results/RSS?SearchType=1&Keywords=electrical', source: 'Contracts Finder' },
      { url: 'https://ted.europa.eu/en/search/rss?q=electrical', source: 'TED' }
    ];

    let totalInserted = 0;
    let errors = 0;

    for (const feed of feeds) {
      try {
        const projects = await parseProjectFeed(feed.url, feed.source);
        
        for (const project of projects) {
          try {
            const { error } = await supabase
              .from('major_projects')
              .upsert({
                title: project.title,
                description: project.description,
                value: project.value,
                location: project.location,
                deadline: project.deadline,
                client: project.client,
                source: project.source,
                external_id: project.external_id,
                url: project.url,
                status: 'active',
                view_count: 0,
                average_rating: 0
              }, { 
                onConflict: 'source,external_id',
                ignoreDuplicates: true 
              });

            if (!error) {
              totalInserted++;
            } else {
              console.error('Error inserting project:', error);
              errors++;
            }
          } catch (insertError) {
            console.error('Error processing project:', insertError);
            errors++;
          }
        }
      } catch (feedError) {
        console.error(`Error processing feed ${feed.source}:`, feedError);
        errors++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${totalInserted} projects`,
        inserted: totalInserted,
        errors: errors
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-projects function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});