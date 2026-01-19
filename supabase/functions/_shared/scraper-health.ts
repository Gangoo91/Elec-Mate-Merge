/**
 * Scraper Health Monitoring
 * Tracks scraper runs, performance, and errors
 */

import { createClient } from './deps.ts';

export interface ScraperRunConfig {
  scraperName: string;
  metadata?: Record<string, unknown>;
}

export interface ScraperRunResult {
  itemsFound: number;
  itemsInserted: number;
  itemsUpdated?: number;
  itemsSkipped?: number;
  apiCreditsUsed?: number;
}

export class ScraperHealthTracker {
  private runId: string | null = null;
  private startTime: number = 0;
  private scraperName: string;
  private supabase: ReturnType<typeof createClient>;
  private metadata: Record<string, unknown>;

  constructor(config: ScraperRunConfig) {
    this.scraperName = config.scraperName;
    this.metadata = config.metadata || {};

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async startRun(): Promise<string> {
    this.startTime = Date.now();

    const { data, error } = await this.supabase
      .from('scraper_health_logs')
      .insert({
        scraper_name: this.scraperName,
        status: 'running',
        metadata: this.metadata
      })
      .select('id')
      .single();

    if (error) {
      console.error('Failed to log scraper start:', error);
      return '';
    }

    this.runId = data.id;
    console.log(`[Health] Started tracking run ${this.runId} for ${this.scraperName}`);
    return this.runId;
  }

  async completeRun(result: ScraperRunResult): Promise<void> {
    if (!this.runId) return;

    const durationMs = Date.now() - this.startTime;

    const { error } = await this.supabase
      .from('scraper_health_logs')
      .update({
        status: 'success',
        run_completed_at: new Date().toISOString(),
        items_found: result.itemsFound,
        items_inserted: result.itemsInserted,
        items_updated: result.itemsUpdated || 0,
        items_skipped: result.itemsSkipped || 0,
        api_credits_used: result.apiCreditsUsed || null,
        duration_ms: durationMs
      })
      .eq('id', this.runId);

    if (error) {
      console.error('Failed to log scraper completion:', error);
    } else {
      console.log(`[Health] Completed run ${this.runId}: ${result.itemsInserted} inserted in ${durationMs}ms`);
    }
  }

  async failRun(errorMessage: string): Promise<void> {
    if (!this.runId) return;

    const durationMs = Date.now() - this.startTime;

    const { error } = await this.supabase
      .from('scraper_health_logs')
      .update({
        status: 'failed',
        run_completed_at: new Date().toISOString(),
        error_message: errorMessage.substring(0, 1000), // Limit error message length
        duration_ms: durationMs
      })
      .eq('id', this.runId);

    if (error) {
      console.error('Failed to log scraper failure:', error);
    } else {
      console.log(`[Health] Run ${this.runId} failed: ${errorMessage}`);
    }
  }

  async partialRun(result: ScraperRunResult, warningMessage?: string): Promise<void> {
    if (!this.runId) return;

    const durationMs = Date.now() - this.startTime;

    const { error } = await this.supabase
      .from('scraper_health_logs')
      .update({
        status: 'partial',
        run_completed_at: new Date().toISOString(),
        items_found: result.itemsFound,
        items_inserted: result.itemsInserted,
        items_updated: result.itemsUpdated || 0,
        items_skipped: result.itemsSkipped || 0,
        error_message: warningMessage?.substring(0, 1000),
        duration_ms: durationMs
      })
      .eq('id', this.runId);

    if (error) {
      console.error('Failed to log partial run:', error);
    } else {
      console.log(`[Health] Partial run ${this.runId}: ${result.itemsInserted} inserted with warnings`);
    }
  }
}

/**
 * Helper function to create and start a health tracker
 */
export async function startScraperRun(scraperName: string, metadata?: Record<string, unknown>): Promise<ScraperHealthTracker> {
  const tracker = new ScraperHealthTracker({ scraperName, metadata });
  await tracker.startRun();
  return tracker;
}
