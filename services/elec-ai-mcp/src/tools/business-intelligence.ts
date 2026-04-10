/**
 * Business Intelligence — learns from user patterns, spots missed revenue, predicts trends
 */

import type { UserContext } from '../auth.js';

// ─── Learn Pricing Style ──────────────────────────────────────────────────

/**
 * Analyse the user's pricing patterns from historical quotes and invoices.
 * Returns their "go-to" prices for common job types — use to auto-fill quotes.
 */
export async function getMyPricing(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  const [quotesRes, invoicesRes] = await Promise.all([
    supabase
      .from('quotes')
      .select('items, total, status, created_at')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('invoices')
      .select('line_items, total, status, created_at')
      .eq('status', 'paid')
      .order('created_at', { ascending: false })
      .limit(100),
  ]);

  // Extract all line items with descriptions and unit prices
  const priceMap: Record<string, number[]> = {};

  for (const q of quotesRes.data || []) {
    const items = q.items as Array<Record<string, unknown>> | null;
    if (!items) continue;
    for (const item of items) {
      const desc = ((item.description as string) || '').toLowerCase().trim();
      const price = Number(item.unitPrice || item.unit_price || 0);
      if (desc && price > 0) {
        if (!priceMap[desc]) priceMap[desc] = [];
        priceMap[desc].push(price);
      }
    }
  }

  for (const inv of invoicesRes.data || []) {
    const items = inv.line_items as Array<Record<string, unknown>> | null;
    if (!items) continue;
    for (const item of items) {
      const desc = ((item.description as string) || '').toLowerCase().trim();
      const price = Number(item.unitPrice || item.unit_price || 0);
      if (desc && price > 0) {
        if (!priceMap[desc]) priceMap[desc] = [];
        priceMap[desc].push(price);
      }
    }
  }

  // Build pricing profile — group similar descriptions
  const pricing: Array<{
    item: string;
    usual_price: number;
    min: number;
    max: number;
    times_used: number;
  }> = [];

  for (const [desc, prices] of Object.entries(priceMap)) {
    if (prices.length < 2) continue; // need at least 2 to establish a pattern
    const sorted = [...prices].sort((a, b) => a - b);
    const avg = Math.round(prices.reduce((s, v) => s + v, 0) / prices.length);
    pricing.push({
      item: desc,
      usual_price: avg,
      min: Math.round(sorted[0]),
      max: Math.round(sorted[sorted.length - 1]),
      times_used: prices.length,
    });
  }

  pricing.sort((a, b) => b.times_used - a.times_used);

  return {
    success: true,
    pricing_profile: pricing.slice(0, 30),
    total_items_tracked: pricing.length,
    note: 'These are your go-to prices based on past quotes and invoices. When creating a new quote, I can auto-fill with these.',
    currency: 'GBP',
  };
}

// ─── Predict Busy/Quiet Periods ───────────────────────────────────────────

export async function getPredictedWorkload(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // Get all invoices with dates for monthly pattern analysis
  const { data: invoices } = await supabase
    .from('invoices')
    .select('total, paid_at, created_at')
    .eq('status', 'paid')
    .order('paid_at', { ascending: true });

  if (!invoices || invoices.length < 6) {
    return {
      success: true,
      message: 'Not enough data yet — need at least 6 months of invoices to predict patterns.',
      predictions: [],
    };
  }

  // Group revenue by month
  const monthlyRevenue: Record<string, number> = {};
  const monthlyJobs: Record<string, number> = {};

  for (const inv of invoices) {
    const date = new Date((inv.paid_at as string) || (inv.created_at as string));
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + Number(inv.total || 0);
    monthlyJobs[monthKey] = (monthlyJobs[monthKey] || 0) + 1;
  }

  // Average by calendar month (1-12) across years
  const monthAvgRevenue: Record<number, number[]> = {};
  const monthAvgJobs: Record<number, number[]> = {};

  for (const [key, rev] of Object.entries(monthlyRevenue)) {
    const month = parseInt(key.split('-')[1]);
    if (!monthAvgRevenue[month]) monthAvgRevenue[month] = [];
    monthAvgRevenue[month].push(rev);
  }
  for (const [key, jobs] of Object.entries(monthlyJobs)) {
    const month = parseInt(key.split('-')[1]);
    if (!monthAvgJobs[month]) monthAvgJobs[month] = [];
    monthAvgJobs[month].push(jobs);
  }

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const predictions: Array<{
    month: string;
    avg_revenue: number;
    avg_jobs: number;
    verdict: string;
    tip: string;
  }> = [];

  // Find overall average for comparison
  const allRevValues = Object.values(monthAvgRevenue).flat();
  const overallAvg =
    allRevValues.length > 0 ? allRevValues.reduce((s, v) => s + v, 0) / allRevValues.length : 0;

  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const futureMonth = ((now.getMonth() + i) % 12) + 1;
    const revArr = monthAvgRevenue[futureMonth] || [];
    const jobArr = monthAvgJobs[futureMonth] || [];
    const avgRev =
      revArr.length > 0 ? Math.round(revArr.reduce((s, v) => s + v, 0) / revArr.length) : 0;
    const avgJobs =
      jobArr.length > 0 ? Math.round(jobArr.reduce((s, v) => s + v, 0) / jobArr.length) : 0;

    let verdict = 'average';
    let tip = '';
    if (avgRev > overallAvg * 1.3) {
      verdict = 'busy';
      tip =
        'Historically strong month. Make sure you have materials stocked and availability open.';
    } else if (avgRev < overallAvg * 0.7) {
      verdict = 'quiet';
      tip =
        'Historically quieter. Start marketing 4-6 weeks before to fill the gap. Run a seasonal campaign.';
    } else {
      tip = 'Average month. Keep your pipeline steady with quote follow-ups.';
    }

    predictions.push({
      month: months[futureMonth - 1],
      avg_revenue: avgRev,
      avg_jobs: avgJobs,
      verdict,
      tip,
    });
  }

  return {
    success: true,
    predictions,
    busiest_month:
      months[
        ((Object.entries(monthAvgRevenue).sort(
          (a, b) => b[1].reduce((s, v) => s + v, 0) - a[1].reduce((s, v) => s + v, 0)
        )[0]?.[0] as unknown as number) || 1) - 1
      ] || 'N/A',
    quietest_month:
      months[
        ((Object.entries(monthAvgRevenue).sort(
          (a, b) => a[1].reduce((s, v) => s + v, 0) - b[1].reduce((s, v) => s + v, 0)
        )[0]?.[0] as unknown as number) || 1) - 1
      ] || 'N/A',
    currency: 'GBP',
  };
}

// ─── Spot Missed Revenue ──────────────────────────────────────────────────

export async function spotMissedRevenue(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  const [completedJobsRes, invoicesRes, quotesRes] = await Promise.all([
    // Completed jobs
    supabase
      .from('employer_jobs')
      .select('id, title, client, location, value, status, end_date')
      .eq('status', 'Completed')
      .gte('end_date', sixMonthsAgo.toISOString()),
    // All invoices (to cross-reference)
    supabase
      .from('invoices')
      .select('total, client_data, created_at, status')
      .gte('created_at', sixMonthsAgo.toISOString()),
    // Accepted quotes not invoiced
    supabase
      .from('quotes')
      .select('id, total, client_data, quote_number, status, invoice_raised, created_at')
      .in('status', ['accepted', 'approved'])
      .eq('invoice_raised', false)
      .gte('created_at', sixMonthsAgo.toISOString()),
  ]);

  const completedJobs = completedJobsRes.data || [];
  const invoices = invoicesRes.data || [];
  const uninvoicedQuotes = quotesRes.data || [];

  const issues: Array<{
    type: string;
    description: string;
    estimated_value: number;
    action: string;
  }> = [];

  // 1. Completed jobs with no matching invoice
  for (const job of completedJobs) {
    const clientName = ((job.client as string) || '').toLowerCase();
    if (!clientName) continue;
    const hasInvoice = invoices.some((inv) => {
      const cd = inv.client_data as Record<string, unknown>;
      return ((cd?.name as string) || '').toLowerCase() === clientName;
    });
    if (!hasInvoice && Number(job.value || 0) > 0) {
      issues.push({
        type: 'uninvoiced_job',
        description: `Job "${job.title}" for ${job.client} completed but no invoice found`,
        estimated_value: Number(job.value),
        action: 'Create an invoice for this completed job',
      });
    }
  }

  // 2. Accepted quotes never invoiced (older than 14 days)
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 86400000);
  for (const q of uninvoicedQuotes) {
    if (new Date(q.created_at as string) < fourteenDaysAgo) {
      const cd = q.client_data as Record<string, unknown>;
      issues.push({
        type: 'accepted_not_invoiced',
        description: `Quote ${q.quote_number} for ${(cd?.name as string) || 'unknown'} (£${Number(q.total).toFixed(0)}) accepted but never invoiced`,
        estimated_value: Number(q.total),
        action: 'Convert this accepted quote into an invoice',
      });
    }
  }

  // 3. Quotes sent but never followed up (older than 7 days, status still 'sent')
  const { data: staleQuotes } = await supabase
    .from('quotes')
    .select('id, total, client_data, quote_number, created_at')
    .eq('status', 'sent')
    .lt('created_at', new Date(now.getTime() - 7 * 86400000).toISOString())
    .gte('created_at', sixMonthsAgo.toISOString())
    .limit(10);

  for (const q of staleQuotes || []) {
    const cd = q.client_data as Record<string, unknown>;
    const daysSinceSent = Math.round(
      (now.getTime() - new Date(q.created_at as string).getTime()) / 86400000
    );
    issues.push({
      type: 'quote_no_followup',
      description: `Quote ${q.quote_number} for ${(cd?.name as string) || 'unknown'} (£${Number(q.total).toFixed(0)}) sent ${daysSinceSent} days ago with no response`,
      estimated_value: Number(q.total),
      action: 'Follow up on this quote',
    });
  }

  const totalMissed = issues.reduce((s, i) => s + i.estimated_value, 0);

  return {
    success: true,
    issues: issues.sort((a, b) => b.estimated_value - a.estimated_value).slice(0, 15),
    total_missed_revenue: Math.round(totalMissed),
    issue_count: issues.length,
    note:
      issues.length === 0
        ? 'No missed revenue found — your admin is on point.'
        : `Found £${Math.round(totalMissed)} in potentially missed revenue across ${issues.length} items.`,
    currency: 'GBP',
  };
}

// ─── Analyse Spec Sheet ──────────────────────────────────────────────────

/**
 * Analyse a spec sheet or architect drawing using Claude Vision + BS 7671 knowledge.
 * Returns: circuits needed, cable sizes, accessories, compliance notes.
 */
export async function analyseSpecSheet(args: Record<string, unknown>, user: UserContext) {
  const imageUrl = args.image_url as string;
  const imagePath = args.image_path as string;
  const pdfUrl = args.pdf_url as string;

  if (!imageUrl && !imagePath && !pdfUrl) {
    return { error: 'image_url, image_path, or pdf_url is required' };
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) return { error: 'Vision analysis not configured' };

  let imageData: string | null = null;
  let mediaType = 'image/jpeg';

  if (imagePath || (imageUrl && imageUrl.startsWith('/'))) {
    // Local file
    const { readFile } = await import('fs/promises');
    const buf = await readFile(imagePath || imageUrl);
    imageData = buf.toString('base64');
    const path = imagePath || imageUrl;
    if (path.endsWith('.png')) mediaType = 'image/png';
    else if (path.endsWith('.webp')) mediaType = 'image/webp';
  } else if (imageUrl) {
    const res = await fetch(imageUrl);
    if (!res.ok) return { error: `Failed to download image: ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    imageData = buf.toString('base64');
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('png')) mediaType = 'image/png';
    else if (ct.includes('webp')) mediaType = 'image/webp';
  } else if (pdfUrl) {
    // For PDFs, use read_pdf tool internally — we can't send PDFs to vision directly
    return {
      error: 'For PDF spec sheets, use read_pdf first to extract text, then ask me to analyse it.',
    };
  }

  if (!imageData) return { error: 'Could not process the image' };

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageData } },
              {
                type: 'text',
                text: 'You are a UK electrician analysing a spec sheet or electrical drawing. Based on this image, provide:\n\n1. What circuits are shown or needed\n2. Recommended cable sizes (per BS 7671)\n3. Accessories and fittings needed\n4. Any compliance notes or concerns\n5. Estimated materials list\n\nBe specific and practical. Use UK terminology (consumer unit not panel, earth not ground). Reference BS 7671 regulation numbers where relevant.',
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { error: `Vision analysis failed: ${res.status}` };
    }

    const data = (await res.json()) as { content: Array<{ text: string }> };
    const analysis = data.content?.[0]?.text || '';

    return {
      success: true,
      analysis,
      note: 'This analysis is based on the image provided. Always verify on site and check current BS 7671 requirements.',
    };
  } catch {
    return { error: 'Spec sheet analysis failed' };
  }
}
