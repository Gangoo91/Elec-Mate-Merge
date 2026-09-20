/**
 * Circuit Breaker Pattern - Prevents cascading failures
 * Opens circuit after threshold failures, prevents overwhelming failing services
 */

export class CircuitBreaker {
  private failures = 0;
  private lastFailTime = 0;
  private readonly threshold: number;
  private readonly resetTimeout: number;
  private readonly name: string;

  constructor(name: string, threshold = 5, resetTimeout = 60000) {
    this.name = name;
    this.threshold = threshold;
    this.resetTimeout = resetTimeout;
  }

  isOpen(): boolean {
    if (this.failures >= this.threshold) {
      const timeSinceLastFail = Date.now() - this.lastFailTime;
      if (timeSinceLastFail < this.resetTimeout) {
        return true;
      }
      // Try half-open state
      this.failures = Math.floor(this.threshold / 2);
    }
    return false;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.isOpen()) {
      throw new Error(`Circuit breaker OPEN for ${this.name} - service temporarily unavailable`);
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    console.log(`✅ Circuit breaker ${this.name} - success, failures reset`);
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailTime = Date.now();
    console.warn(`⚠️ Circuit breaker ${this.name} - failure ${this.failures}/${this.threshold}`);
    
    if (this.failures >= this.threshold) {
      console.error(`🔴 Circuit breaker ${this.name} OPEN - will retry after ${this.resetTimeout}ms`);
    }
  }

  getStatus(): { name: string; failures: number; isOpen: boolean } {
    return {
      name: this.name,
      failures: this.failures,
      isOpen: this.isOpen()
    };
  }
}

// Global circuit breakers for shared services
export const embeddingCircuit = new CircuitBreaker('OpenAI-Embeddings', 5, 60000);
export const lovableAICircuit = new CircuitBreaker('Lovable-AI', 5, 60000);
export const ragSearchCircuit = new CircuitBreaker('RAG-Search', 3, 30000);
