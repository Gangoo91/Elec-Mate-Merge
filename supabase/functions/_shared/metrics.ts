/**
 * Metrics Collection - Track performance and success rates
 * Enables observability and performance monitoring
 */

import { createClient } from './deps.ts';

export interface Metrics {
  requestId: string;
  functionName: string;
  parseTime?: number;
  calculationTime?: number;
  ragTime?: number;
  gpt5Time?: number;
  totalTime: number;
  cacheHit: boolean;
  queryType?: string;
  success: boolean;
  errorType?: string;
  regulationCount?: number;
  timestamp: string;
}

export class MetricsCollector {
  private metrics: Partial<Metrics>;
  private timers: Map<string, number>;
  private startTime: number;

  constructor(requestId: string, functionName: string) {
    this.metrics = {
      requestId,
      functionName,
      cacheHit: false,
      success: false,
      timestamp: new Date().toISOString()
    };
    this.timers = new Map();
    this.startTime = Date.now();
  }

  startTimer(operation: string): () => void {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      this.timers.set(operation, duration);
      this.metrics[`${operation}Time` as keyof Metrics] = duration as any;
    };
  }

  setCacheHit(hit: boolean): void {
    this.metrics.cacheHit = hit;
  }

  setQueryType(type: string): void {
    this.metrics.queryType = type;
  }

  setSuccess(success: boolean): void {
    this.metrics.success = success;
  }

  setError(errorType: string): void {
    this.metrics.errorType = errorType;
    this.metrics.success = false;
  }

  setRegulationCount(count: number): void {
    this.metrics.regulationCount = count;
  }

  async flush(): Promise<void> {
    try {
      // Calculate total time
      this.metrics.totalTime = Date.now() - this.startTime;

      // Log metrics (could also send to external service)
      console.log('📊 Metrics:', JSON.stringify({
        ...this.metrics,
        timers: Object.fromEntries(this.timers)
      }));

      // Store in Supabase for analysis
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('agent_metrics').insert(this.metrics as Metrics);
      }
    } catch (error) {
      console.error('Failed to flush metrics:', error);
      // Don't throw - metrics should never break main flow
    }
  }

  getMetrics(): Partial<Metrics> {
    return {
      ...this.metrics,
      totalTime: Date.now() - this.startTime
    };
  }
}
