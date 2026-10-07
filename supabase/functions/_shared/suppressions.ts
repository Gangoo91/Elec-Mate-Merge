/**
 * The do-not-send list (`email_suppressions`), read in FULL.
 *
 * 🔴 `.range(0, 49999)` does NOT return 50,000 rows: the API caps every
 * response at 1,000 rows, silently. With 6,682 addresses on the list (7 Oct
 * 2026), every sender that read it that way checked only the first 1,000 and
 * emailed people who had unsubscribed or bounced. Proved live: a suppressed
 * test address was sent a booking confirmation.
 *
 * Read in pages until a short page comes back. Returns the same shape the
 * old call did ({ data, error }), so it drops into existing code. An error is
 * returned, not swallowed: callers must fail closed.
 */
// deno-lint-ignore no-explicit-any
type Client = any;

const PAGE = 1000;

export async function allSuppressionRows(
  supabase: Client
): Promise<{ data: { email: string }[] | null; error: { message: string } | null }> {
  const rows: { email: string }[] = [];
  for (let from = 0; from < 1_000_000; from += PAGE) {
    const { data, error } = await supabase
      .from('email_suppressions')
      .select('email')
      .order('email', { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) return { data: null, error };
    rows.push(...((data ?? []) as { email: string }[]));
    if (!data || data.length < PAGE) break;
  }
  return { data: rows, error: null };
}

/** One address, case-insensitive. Throws on a read error (fail closed). */
export async function isSuppressed(supabase: Client, email: string): Promise<boolean> {
  const e = email.trim().toLowerCase();
  if (!e) return false;
  const { data, error } = await supabase
    .from('email_suppressions')
    .select('email')
    .ilike('email', e.replace(/[\\%_]/g, (m: string) => '\\' + m))
    .limit(1);
  if (error) throw error;
  return (data ?? []).length > 0;
}
