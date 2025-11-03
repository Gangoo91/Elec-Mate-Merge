/**
 * Performance Monitoring for Circuit Designer
 */

export interface PerformanceMetrics {
  requestId: string;
  totalDurationMs: number;
  stages: {
    inputValidation?: number;
    circuitExtraction?: number;
    ragSearch?: number;
    batchProcessing?: number;
    aiCalls?: number;
    validation?: number;
    postProcessing?: number;
  };
  ragStats?: {
    searchCount: number;
    failedSearches: number;
    cacheHits: number;
    avgDurationMs: number;
  };
  aiStats?: {
    totalTokens: number;
    batchCount: number;
    retryCount: number;
    avgBatchDurationMs: number;
  };
}

export class PerformanceMonitor {
  private requestId: string;
  private startTime: number;
  private stageTimers: Map<string, number>;
  private metrics: Partial<PerformanceMetrics>;

  constructor(requestId: string) {
    this.requestId = requestId;
    this.startTime = Date.now();
    this.stageTimers = new Map();
    this.metrics = {
      requestId,
      stages: {}
    };
  }

  startStage(name: string): () => void {
    const start = Date.now();
    this.stageTimers.set(name, start);
    
    return () => {
      const duration = Date.now() - start;
      (this.metrics.stages as any)[name] = duration;
      console.log(`⏱️ Stage "${name}" completed in ${duration}ms`);
    };
  }

  recordRAGStats(stats: { 
    searchCount: number;
    failedSearches: number;
    cacheHits: number;
    durations: number[];
  }) {
    this.metrics.ragStats = {
      ...stats,
      avgDurationMs: stats.durations.length > 0 
        ? stats.durations.reduce((a, b) => a + b, 0) / stats.durations.length 
        : 0
    };
  }

  recordAIStats(stats: {
    totalTokens: number;
    batchCount: number;
    retryCount: number;
    batchDurations: number[];
  }) {
    this.metrics.aiStats = {
      ...stats,
      avgBatchDurationMs: stats.batchDurations.length > 0
        ? stats.batchDurations.reduce((a, b) => a + b, 0) / stats.batchDurations.length
        : 0
    };
  }

  finish(): PerformanceMetrics {
    const totalDurationMs = Date.now() - this.startTime;
    const complete: PerformanceMetrics = {
      ...this.metrics,
      totalDurationMs
    } as PerformanceMetrics;

    console.log('📊 Performance Summary:', {
      total: `${totalDurationMs}ms`,
      stages: Object.entries(complete.stages)
        .map(([name, ms]) => `${name}: ${ms}ms`)
        .join(', '),
      ragAvg: complete.ragStats?.avgDurationMs || 0,
      aiAvg: complete.aiStats?.avgBatchDurationMs || 0
    });

    return complete;
  }
}
