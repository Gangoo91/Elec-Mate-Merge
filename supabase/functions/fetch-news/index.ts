import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsArticle {
  title: string;
  link: string;
  summary: string;
  publishedDate: string;
  source: string;
  external_id: string;
}

async function parseRSSFeed(url: string, source: string): Promise<NewsArticle[]> {
  try {
    console.log(`Fetching RSS feed from: ${url}`);
    const response = await fetch(url);
    const xmlText = await response.text();
    
    const articles: NewsArticle[] = [];
    
    // Parse RSS/Atom feeds with regex
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
        const summary = descriptionMatch?.[1]?.replace(/<[^>]*>/g, '').trim() || '';
        const publishedDate = pubDateMatch?.[1] || new Date().toISOString();
        const external_id = guidMatch?.[1] || link;
        
        if (title && link) {
          articles.push({
            title,
            link,
            summary: summary.substring(0, 500),
            publishedDate,
            source,
            external_id
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
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // RSS feeds to parse
    const feeds = [
      { url: 'https://www.theiet.org/rss/engineering-horizons/', source: 'IET' },
      { url: 'https://www.hse.gov.uk/rss/news.xml', source: 'HSE' },
      { url: 'https://www.gov.uk/government/news.atom', source: 'GOV.UK' }
    ];

    let totalInserted = 0;
    let errors = 0;

    for (const feed of feeds) {
      try {
        const articles = await parseRSSFeed(feed.url, feed.source);
        
        for (const article of articles) {
          try {
            const { error } = await supabase
              .from('industry_news')
              .upsert({
                title: article.title,
                content: article.summary,
                source: article.source,
                external_id: article.external_id,
                url: article.link,
                published_at: new Date(article.publishedDate).toISOString(),
                is_breaking: false,
                view_count: 0,
                average_rating: 0
              }, { 
                onConflict: 'source,external_id',
                ignoreDuplicates: true 
              });

            if (!error) {
              totalInserted++;
            } else {
              console.error('Error inserting article:', error);
              errors++;
            }
          } catch (insertError) {
            console.error('Error processing article:', insertError);
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
        message: `Successfully processed ${totalInserted} articles`,
        inserted: totalInserted,
        errors: errors
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-news function:', error);
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