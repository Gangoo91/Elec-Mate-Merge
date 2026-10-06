/**
 * Who has acknowledged a team briefing — one answer for every screen.
 *
 * A team briefing records acknowledgements in two places:
 *   • `attendees[].signature` — signed in the app against a listed attendee;
 *   • `attendee_signatures[]` — signed through the shared link (drawn
 *     signature), or marked present when the briefing was delivered
 *     (`signed_via: 'in_person'`, no drawn signature).
 *
 * The list, the "fully signed" filter and the detail view each read only the
 * first, so a sender who shared the link saw "0 of 2 signed" however many
 * people had signed. This merges both, matching link sign-offs to listed
 * attendees by name, and keeps anyone who signed but was not on the list.
 *
 * Acknowledging a briefing is not approval of the RAMS and is not proof of
 * competence; the labels here describe only how the acknowledgement was made.
 */

export interface BriefingSignOff {
  name?: string;
  company?: string;
  signed_at?: string;
  timestamp?: string;
  signed_via?: string;
  [key: string]: unknown;
}

export interface BriefingRegisterRow {
  name: string;
  role?: string;
  /** Present when this person has acknowledged the briefing in any way. */
  acknowledged: boolean;
  /** How, in words: "Signed by link", "Marked present", "Signed". */
  how?: string;
  at?: string;
  /** True for someone who signed but was not on the attendee list. */
  unlisted?: boolean;
  signOff?: BriefingSignOff;
  [key: string]: unknown;
}

const key = (n: unknown) =>
  String(n ?? '')
    .trim()
    .toLowerCase();

export function briefingRegister(briefing: {
  attendees?: unknown;
  attendee_signatures?: unknown;
}): { rows: BriefingRegisterRow[]; signed: number; total: number } {
  const listed = Array.isArray(briefing.attendees)
    ? (briefing.attendees as Array<Record<string, unknown>>)
    : [];
  const signOffs = Array.isArray(briefing.attendee_signatures)
    ? (briefing.attendee_signatures as BriefingSignOff[])
    : [];

  const byName = new Map<string, BriefingSignOff>();
  for (const s of signOffs) {
    const k = key(s?.name);
    if (k && !byName.has(k)) byName.set(k, s);
  }

  const describe = (s?: BriefingSignOff) =>
    s ? (s.signed_via === 'in_person' ? 'Marked present' : 'Signed by link') : undefined;

  const matched = new Set<string>();
  const rows: BriefingRegisterRow[] = listed.map((a) => {
    const k = key(a?.name);
    const s = byName.get(k);
    if (s) matched.add(k);
    const inApp = !!a?.signature;
    return {
      ...a,
      name: String(a?.name ?? ''),
      role: (a?.role as string | undefined) ?? undefined,
      acknowledged: inApp || !!s,
      how: s ? describe(s) : inApp ? 'Signed' : undefined,
      at: (s?.signed_at as string) || (s?.timestamp as string) || (a?.timestamp as string),
      signOff: s,
    };
  });
  for (const s of signOffs) {
    const k = key(s?.name);
    if (!k || matched.has(k) || byName.get(k) !== s) continue;
    rows.push({
      name: String(s.name),
      role: s.company || 'Not on the list',
      acknowledged: true,
      how: describe(s),
      at: s.signed_at || s.timestamp,
      unlisted: true,
      signOff: s,
    });
  }

  const signed = rows.filter((r) => r.acknowledged).length;
  return { rows, signed, total: rows.length };
}
