/**
 * Older symbol ids, mapped to the ids the registry uses today.
 *
 * WHY THIS EXISTS
 * ───────────────
 * The planner carried a second, hand-written symbol list alongside the
 * registry. Both were consulted when resolving an id, so ids that only ever
 * existed in that legacy list still work their way in from two places:
 *
 *   - the AI room builder, whose prompt and stored examples emit the old names
 *     (ELE-604 already had to strip a `-bs7671` suffix for the same reason);
 *   - any plan or session created while the old list was live.
 *
 * Deleting the legacy list without this map would turn those into "unknown
 * symbol skipped" — a room that silently comes back with fewer sockets than the
 * user asked for, which is worse than a wrong symbol because nothing announces
 * it.
 *
 * Only aliases belong here. A genuinely new symbol gets an SVG in
 * `public/symbols/` and an entry in `symbolRegistry`, not a line in this file.
 */
export const SYMBOL_ID_ALIASES: Readonly<Record<string, string>> = {
  // Same symbol, renamed when the registry replaced the legacy list.
  'light-exit': 'light-exit-sign',
  'light-security-pir': 'light-pir',
  'socket-outdoor-ip66': 'socket-outdoor',
  'switch-pullcord': 'switch-pull-cord',
  'rcd-30ma': 'rcd',
  'surge-protection': 'spd',
  busbar: 'busbar-chamber',
  'immersion-heater': 'water-heater',

  // Near-equivalents. Neither had artwork of its own in the legacy list worth
  // keeping, and drawing the closest real symbol beats dropping the item:
  //   - a floodlight is an outside light until we draw a proper one;
  //   - an RCD-protected socket is drawn as a double 13A; the RCD belongs on
  //     the board, not on the outlet, so there is no separate plan symbol.
  'light-floodlight': 'light-outside',
  'socket-rcd-13a': 'socket-double-13a',
};

/**
 * Normalise a symbol id: strip the `-bs7671` suffix the AI sometimes appends
 * (ELE-604), then apply any alias. Returns the id unchanged when it is already
 * current, so this is safe to call on every lookup.
 */
export function resolveSymbolId(symbolId: string): string {
  const stripped = symbolId.replace(/-bs7671$/, '');
  return SYMBOL_ID_ALIASES[stripped] ?? stripped;
}
