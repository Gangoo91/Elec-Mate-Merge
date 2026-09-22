/**
 * Enough Supabase surface for the routine inspection form to MOUNT.
 *
 * Every call resolves empty. The harness checks that components render, not
 * that data loads — a stub that returned rows would be testing the stub.
 */
/*
 * `any` is unavoidable and deliberate here: this is a Proxy that answers to
 * every method the Supabase builder chain offers, which has no static shape to
 * describe. It is a test double in a harness, never shipped to a user — typing
 * it properly would mean restating the whole client surface to stub four calls.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chain: any = new Proxy(() => chain, {
  get: (_t, k) =>
    k === 'then'
      ? undefined
      : k === 'maybeSingle' || k === 'single'
        ? async () => ({ data: null, error: null })
        : () => chain,
  apply: () => chain,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any = {
  from: () => chain,
  auth: { getUser: async () => ({ data: { user: { id: 'harness' } } }) },
  storage: {
    from: () => ({
      createSignedUrl: async () => ({ data: null }),
      download: async () => ({ data: null }),
    }),
  },
  functions: { invoke: async () => ({ data: null, error: null }) },
};

/*
 * `ReportPdfViewer` imports these alongside the client to build a direct
 * function URL. The harness never calls one, but esbuild still has to resolve
 * the named exports or the bundle does not build.
 */
export const SUPABASE_URL = 'https://harness.invalid';
export const SUPABASE_PUBLISHABLE_KEY = 'harness-anon-key';
