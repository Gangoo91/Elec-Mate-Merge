/**
 * Structured AI-call logging (ELE-1155).
 *
 * Every AI provider call emits one single-line JSON log entry (event: 'ai_call')
 * so Supabase function logs can be queried for failure rates by function, model
 * and error class. Failures are also persisted (best-effort, never throws) to
 * public.ai_error_log for cross-function aggregation and alerting.
 *
 * duration_ms matters: the July 2026 Elec-AI credit outage returned "successful"
 * gateway responses in ~130ms — anomalously fast completions are a failure tell.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export type AiErrorClass =
  | 'auth'
  | 'credits'
  | 'rate_limit'
  | 'bad_request'
  | 'timeout'
  | 'provider_error'
  | 'network'
  | 'safety'
  | 'empty_response'
  | 'unknown';

export interface AiCallLog {
  fn: string;
  provider: string;
  model: string;
  status: 'ok' | 'error';
  http_status?: number;
  error_class?: AiErrorClass;
  duration_ms: number;
  user_id?: string;
  /** Truncated provider message — for logs/table only, never for clients. */
  detail?: string;
}

// Module-level function name: edge isolates are per-function, so this is safe.
let aiLogFn = 'unset';

/** Call once at function entry (or in a feature core) so log rows carry the name. */
export function setAiLogFn(name: string): void {
  aiLogFn = name;
}

export function getAiLogFn(): string {
  return aiLogFn;
}

export function classifyAiError(httpStatus?: number, message = ''): AiErrorClass {
  if (httpStatus === 401 || httpStatus === 403) return 'auth';
  if (httpStatus === 402 || /credit|quota|billing|insufficient funds/i.test(message))
    return 'credits';
  if (httpStatus === 429 || /rate limit/i.test(message)) return 'rate_limit';
  if (httpStatus === 408 || /timeout|timed out|abort/i.test(message)) return 'timeout';
  if (/safety|blocked/i.test(message)) return 'safety';
  if (/empty (response|content)/i.test(message)) return 'empty_response';
  if (httpStatus === 400 || httpStatus === 404 || /invalid|unsupported|does not exist/i.test(message))
    return 'bad_request';
  if (httpStatus && httpStatus >= 500) return 'provider_error';
  if (/fetch|network|connection|dns|socket/i.test(message)) return 'network';
  return 'unknown';
}

/** User-safe messages — raw provider errors must never reach the client. */
export function friendlyAiError(errorClass: AiErrorClass): string {
  switch (errorClass) {
    case 'rate_limit':
      return 'The AI is very busy right now — please try again in a minute.';
    case 'timeout':
      return 'That took longer than expected and timed out — please try again.';
    case 'safety':
      return 'The AI declined this request. Try rewording it.';
    case 'auth':
    case 'credits':
    case 'bad_request':
    case 'provider_error':
    case 'network':
    case 'empty_response':
    case 'unknown':
    default:
      return 'The AI service had a problem completing that — please try again shortly.';
  }
}

/** One structured line per AI call. Errors go to console.error, successes to console.log. */
export function logAiCall(entry: AiCallLog): void {
  const line = JSON.stringify({
    event: 'ai_call',
    ...entry,
    fn: entry.fn || aiLogFn,
    detail: entry.detail?.slice(0, 500),
  });
  if (entry.status === 'ok') {
    console.log(line);
  } else {
    console.error(line);
  }
}

/** Best-effort persistence of a failure. Bounded, and can never break the caller. */
export async function recordAiFailure(entry: AiCallLog): Promise<void> {
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) return;
    const admin = createClient(url, key, { auth: { persistSession: false } });
    const insert = admin.from('ai_error_log').insert({
      fn: entry.fn || aiLogFn,
      provider: entry.provider,
      model: entry.model,
      http_status: entry.http_status ?? null,
      error_class: entry.error_class ?? 'unknown',
      duration_ms: Math.round(entry.duration_ms),
      user_id: entry.user_id ?? null,
      detail: entry.detail?.slice(0, 500) ?? null,
    });
    await Promise.race([insert, new Promise((resolve) => setTimeout(resolve, 1500))]);
  } catch {
    // Logging must never take down the AI call itself.
  }
}

/**
 * Drop-in replacement for fetch() against an AI provider endpoint.
 * Times the call, logs ok/error (reading error bodies via clone so callers
 * keep full control of the Response), persists failures, and rethrows
 * network errors unchanged.
 */
export async function aiFetch(
  fnName: string,
  url: string,
  init: RequestInit
): Promise<Response> {
  const provider = url.includes('openai')
    ? 'openai'
    : url.includes('googleapis')
      ? 'gemini'
      : url.includes('anthropic')
        ? 'anthropic'
        : 'gateway';
  let model = 'unknown';
  if (provider === 'gemini') {
    model = url.match(/\/models\/([^:?]+)/)?.[1] ?? 'unknown';
  } else {
    try {
      model = String(JSON.parse(String(init.body ?? '{}')).model ?? 'unknown');
    } catch {
      // Non-JSON body — leave as unknown.
    }
  }
  const started = Date.now();
  try {
    const response = await fetch(url, init);
    if (response.ok) {
      logAiCall({
        fn: fnName,
        provider,
        model,
        status: 'ok',
        duration_ms: Date.now() - started,
      });
    } else {
      let detail: string | undefined;
      try {
        detail = (await response.clone().text()).slice(0, 500);
      } catch {
        // Body unavailable — status alone still classifies.
      }
      const entry: AiCallLog = {
        fn: fnName,
        provider,
        model,
        status: 'error',
        http_status: response.status,
        error_class: classifyAiError(response.status, detail),
        duration_ms: Date.now() - started,
        detail,
      };
      logAiCall(entry);
      await recordAiFailure(entry);
    }
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const entry: AiCallLog = {
      fn: fnName,
      provider,
      model,
      status: 'error',
      error_class: classifyAiError(undefined, message),
      duration_ms: Date.now() - started,
      detail: message,
    };
    logAiCall(entry);
    await recordAiFailure(entry);
    throw error;
  }
}

/**
 * Wrap a provider call: logs ok/error with duration, persists failures, rethrows.
 */
export async function withAiLog<T>(
  provider: string,
  model: string,
  run: () => Promise<T>,
  httpStatusOf?: (error: unknown) => number | undefined
): Promise<T> {
  const started = Date.now();
  try {
    const result = await run();
    logAiCall({
      fn: aiLogFn,
      provider,
      model,
      status: 'ok',
      duration_ms: Date.now() - started,
    });
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const httpStatus = httpStatusOf?.(error);
    const entry: AiCallLog = {
      fn: aiLogFn,
      provider,
      model,
      status: 'error',
      http_status: httpStatus,
      error_class: classifyAiError(httpStatus, message),
      duration_ms: Date.now() - started,
      detail: message,
    };
    logAiCall(entry);
    await recordAiFailure(entry);
    throw error;
  }
}
