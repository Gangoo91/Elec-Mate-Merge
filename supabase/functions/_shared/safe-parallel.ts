/**
 * Safe Parallel Execution Helper
 * Provides structured error handling for parallel async operations
 */

export interface ParallelTask<T> {
  name: string;
  execute: () => Promise<T>;
}

export interface ParallelResult<T> {
  successes: Array<{ name: string; result: T }>;
  failures: Array<{ name: string; error: unknown }>;
}

/**
 * Execute tasks in parallel with structured error handling
 * Uses Promise.allSettled to ensure all tasks complete
 */
export async function safeAll<T>(
  tasks: ParallelTask<T>[]
): Promise<ParallelResult<T>> {
  const results = await Promise.allSettled(
    tasks.map(task => task.execute())
  );

  const successes: Array<{ name: string; result: T }> = [];
  const failures: Array<{ name: string; error: unknown }> = [];

  results.forEach((result, index) => {
    const taskName = tasks[index].name;
    
    if (result.status === 'fulfilled') {
      successes.push({ name: taskName, result: result.value });
    } else {
      failures.push({ name: taskName, error: result.reason });
      console.error(`❌ Task ${taskName} failed:`, result.reason);
    }
  });

  return { successes, failures };
}

/**
 * Execute tasks in parallel and throw if any fail
 * Useful when all tasks must succeed
 */
export async function safeAllStrict<T>(
  tasks: ParallelTask<T>[]
): Promise<T[]> {
  const { successes, failures } = await safeAll(tasks);
  
  if (failures.length > 0) {
    throw new Error(
      `${failures.length} task(s) failed: ${failures.map(f => f.name).join(', ')}`
    );
  }
  
  return successes.map(s => s.result);
}
