
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NewsArticle {
  title: string;
  summary: string;
  content: string;
  source: string;
  regulatory_body?: string;
  source_url: string;
  external_id: string;
  date_published: string;
  category: string;
  tags: string[];
}

async function parseRSSFeed(url: string, source: string): Promise<NewsArticle[]> {
  console.log(`Fetching RSS feed from: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ElecMate/1.0; +https://elec-mate.com)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const xmlText = await response.text();
    console.log(`Received ${xmlText.length} characters from ${source}`);
    
    // Parse XML manually (simple approach for RSS/Atom)
    const articles: NewsArticle[] = [];
    
    if (source === 'IET') {
      // Parse IET RSS
      const itemMatches = xmlText.matchAll(/<item>(.*?)<\/item>/gs);
      for (const match of itemMatches) {
        const item = match[1];
        const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/s)?.[1] || 
                     item.match(/<title>(.*?)<\/title>/s)?.[1] || '';
        const link = item.match(/<link>(.*?)<\/link>/s)?.[1] || '';
        const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/s)?.[1] ||
                           item.match(/<description>(.*?)<\/description>/s)?.[1] || '';
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/s)?.[1] || '';
        const guid = item.match(/<guid.*?>(.*?)<\/guid>/s)?.[1] || link;
        
        if (title && link) {
          articles.push({
            title: title.trim(),
            summary: description.trim().substring(0, 500),
            content: description.trim(),
            source: 'IET',
            regulatory_body: 'IET',
            source_url: link.trim(),
            external_id: guid || link,
            date_published: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
            category: title.toLowerCase().includes('bs 7671') || title.toLowerCase().includes('wiring') ? 'regulations' : 'general',
            tags: title.toLowerCase().includes('bs 7671') ? ['BS 7671', 'Wiring Regulations'] : []
          });
        }
      }
    } else if (source === 'HSE') {
      // Parse HSE RSS
      const itemMatches = xmlText.matchAll(/<item>(.*?)<\/item>/gs);
      for (const match of itemMatches) {
        const item = match[1];
        const title = item.match(/<title>(.*?)<\/title>/s)?.[1] || '';
        const link = item.match(/<link>(.*?)<\/link>/s)?.[1] || '';
        const description = item.match(/<description>(.*?)<\/description>/s)?.[1] || '';
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/s)?.[1] || '';
        const guid = item.match(/<guid.*?>(.*?)<\/guid>/s)?.[1] || link;
        
        if (title && link) {
          articles.push({
            title: title.trim(),
            summary: description.trim().substring(0, 500),
            content: description.trim(),
            source: 'HSE',
            regulatory_body: 'HSE',
            source_url: link.trim(),
            external_id: guid || link,
            date_published: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
            category: title.toLowerCase().includes('electrical') ? 'electrical' : 'safety',
            tags: title.toLowerCase().includes('electrical') ? ['Electrical Safety'] : ['Safety']
          });
        }
      }
    } else if (source === 'GOV.UK') {
      // Parse GOV.UK Atom feed
      const entryMatches = xmlText.matchAll(/<entry>(.*?)<\/entry>/gs);
      for (const match of entryMatches) {
        const entry = match[1];
        const title = entry.match(/<title.*?>(.*?)<\/title>/s)?.[1] || '';
        const link = entry.match(/<link.*?href="(.*?)".*?\/>/s)?.[1] || '';
        const summary = entry.match(/<summary.*?>(.*?)<\/summary>/s)?.[1] || '';
        const updated = entry.match(/<updated>(.*?)<\/updated>/s)?.[1] || '';
        const id = entry.match(/<id>(.*?)<\/id>/s)?.[1] || link;
        
        if (title && link) {
          articles.push({
            title: title.trim(),
            summary: summary.trim().substring(0, 500),
            content: summary.trim(),
            source: 'GOV.UK',
            regulatory_body: 'BEIS',
            source_url: link.trim(),
            external_id: id || link,
            date_published: updated ? new Date(updated).toISOString() : new Date().toISOString(),
            category: 'regulatory',
            tags: ['Government', 'Policy']
          });
        }
      }
    }
    
    console.log(`Parsed ${articles.length} articles from ${source}`);
    return articles;
    
  } catch (error) {
    console.error(`Error parsing RSS feed from ${source}:`, error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log("Starting industry news fetch...");
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // RSS/Atom feeds to fetch
    const feeds = [
      { url: 'https://feeds.iet.org/wiringmatters/rss.xml', source: 'IET' },
      { url: 'https://www.hse.gov.uk/feeds/news.xml', source: 'HSE' },
      { url: 'https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy.atom', source: 'GOV.UK' }
    ];

    let totalInserted = 0;
    let totalErrors = 0;

    // Process each feed
    for (const feed of feeds) {
      try {
        const articles = await parseRSSFeed(feed.url, feed.source);
        
        // Insert articles with upsert to handle duplicates
        for (const article of articles) {
          try {
            const { error } = await supabase
              .from('industry_news')
              .upsert(article, { 
                onConflict: 'source,external_id',
                ignoreDuplicates: false 
              });

            if (error) {
              console.error(`Error inserting article:`, error);
              totalErrors++;
            } else {
              totalInserted++;
            }
          } catch (insertError) {
            console.error(`Error inserting article:`, insertError);
            totalErrors++;
          }
        }
        
      } catch (feedError) {
        console.error(`Error processing feed ${feed.source}:`, feedError);
        totalErrors++;
      }
    }

    console.log(`Fetch completed: ${totalInserted} articles inserted, ${totalErrors} errors`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        inserted: totalInserted, 
        errors: totalErrors 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error('Industry news fetch error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
