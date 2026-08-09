/**
 * Insulation-resistance interpretation logic, kept out of the component file so
 * the component stays fast-refreshable (a file exporting both components and
 * helpers loses HMR).
 *
 * SOURCES, split deliberately because they carry different weight:
 *  - BS 7671:2018+A4:2026 **Table 64**, read from the printed standard 2026-08-07:
 *      SELV and PELV .................. 250 V DC test .... 0.5 MOhm minimum
 *      Up to and including 500 V ...... 500 V DC test .... 1.0 MOhm minimum
 *      Above 500 V .................... 1000 V DC test ... 1.0 MOhm minimum
 *  - **Reg 643.3.3** (new at A4): where connected equipment would influence the
 *    result or be damaged, test per Table 64 BEFORE connection, then a 250 V DC
 *    test after connection - "shall have a value of at least 1 MOhm".
 *  - The INTERPRETATION bands (1-2 deteriorating, >2 sound for aged wiring, >200
 *    typical of new work, GN3's <20 investigate trigger on NEW work) are GUIDANCE
 *    from the guide page's verified content - NOT requirements. The `guidanceOnly`
 *    flag carries that distinction into the UI.
 */
/** BS 7671 Table 64 — verified against the printed A4:2026. */
export const TABLE_64 = {
  selv: { label: 'SELV or PELV', testVolts: 250, minMohm: 0.5 },
  lv: { label: 'Up to and including 500 V', testVolts: 500, minMohm: 1.0 },
  hv: { label: 'Above 500 V', testVolts: 1000, minMohm: 1.0 },
} as const;

export type CircuitKind = keyof typeof TABLE_64;
export type AgeBand = 'new' | 'under15' | '15to40' | 'pre1970';

export interface IrVerdict {
  status: 'fail' | 'investigate' | 'acceptable' | 'excellent';
  headline: string;
  detail: string;
  requiredTestVolts: number;
  minMohm: number;
  /** True where the judgement comes from guidance rather than the Regulations. */
  guidanceOnly: boolean;
  trend?: string;
}

export const AGE_LABEL: Record<AgeBand, string> = {
  new: 'New or newly altered',
  under15: 'Under 15 years old',
  '15to40': '15 to 40 years old',
  pre1970: 'Pre-1970 (rubber or lead)',
};

/**
 * Interpret a reading. `mohm` is already normalised to MΩ.
 * Order matters: the Regulations decide pass/fail first, then guidance colours
 * what a technical pass actually means for the installation.
 */
export function interpretIr(
  mohm: number,
  kind: CircuitKind,
  age: AgeBand,
  previous?: number
): IrVerdict {
  const t = TABLE_64[kind];
  const base = { requiredTestVolts: t.testVolts, minMohm: t.minMohm };

  // Trend is computed regardless of the verdict — a comfortable pass that has
  // collapsed since the last test is the finding, not the number itself.
  let trend: string | undefined;
  if (previous && previous > 0) {
    const drop = ((previous - mohm) / previous) * 100;
    if (drop >= 50) {
      trend = `Down ${Math.round(drop)}% from ${previous} MΩ. A fall that steep points to insulation breaking down or moisture ingress, and is worth investigating even where the current reading passes.`;
    } else if (drop > 0) {
      trend = `Down ${Math.round(drop)}% from ${previous} MΩ — within normal variation, but worth recording so the next inspection has a trend to compare against.`;
    } else {
      trend = `Up on the previous ${previous} MΩ. No deterioration indicated.`;
    }
  }

  if (mohm < t.minMohm) {
    return {
      ...base,
      status: 'fail',
      guidanceOnly: false,
      headline: `Fails BS 7671 — below the ${t.minMohm} MΩ minimum`,
      detail: `Table 64 requires at least ${t.minMohm} MΩ for a ${t.label.toLowerCase()} circuit, tested at ${t.testVolts} V DC. Find the cause before energising: the usual candidates are a borrowed or shared neutral, moisture in an outbuilding or external accessory, a nail or screw through a cable, or connected equipment that should have been disconnected. On an existing installation this is commonly coded C1 or C2 depending on severity and context — that call is the inspector's.`,
      trend,
    };
  }

  // GN3 investigate trigger, new installations only. Guidance, not a requirement.
  if (age === 'new' && mohm < 20) {
    return {
      ...base,
      status: 'investigate',
      guidanceOnly: true,
      headline: `Passes the Regulations, but low for new work`,
      detail: `${mohm} MΩ is above the ${t.minMohm} MΩ Table 64 minimum, so it passes. But GN3 treats anything below 20 MΩ on a new installation as needing investigation — new cable in good condition normally reads 200 MΩ or higher. Something is dragging it down: connected equipment still in circuit, a damp accessory, or a damaged cable. Find it now rather than leaving it in the certificate.`,
      trend,
    };
  }

  if (mohm < 2) {
    return {
      ...base,
      status: 'investigate',
      guidanceOnly: true,
      headline: 'Passes, but deterioration is indicated',
      detail: `Between ${t.minMohm} MΩ and 2 MΩ a circuit technically passes, but on an installation ${AGE_LABEL[age].toLowerCase()} that reading indicates significant insulation deterioration. Record it, investigate the cause, and note it for the next inspection — a circuit sitting just above the limit tends not to stay there.`,
      trend,
    };
  }

  if (mohm >= 200) {
    return {
      ...base,
      status: 'excellent',
      guidanceOnly: false,
      headline: 'Excellent',
      detail: `${mohm} MΩ is typical of new installations and relatively new wiring in good condition. Record the value on the certificate — the figure matters at the next inspection, because the trend tells you more than any single reading.`,
      trend,
    };
  }

  return {
    ...base,
    status: 'acceptable',
    guidanceOnly: true,
    headline: `Acceptable for wiring ${AGE_LABEL[age].toLowerCase()}`,
    detail: `${mohm} MΩ is comfortably above the ${t.minMohm} MΩ minimum. Wiring in good condition should read above 2 MΩ even when it is old, so this is a sound result for its age. Record it so the next inspection has something to compare against.`,
    trend,
  };
}
