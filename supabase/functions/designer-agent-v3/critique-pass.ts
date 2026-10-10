/**
 * Multi-pass critique loop.
 *
 * After the per-circuit design pass + deterministic tripwires, the critic
 * reviews the whole design as a system. It catches concerns that per-circuit
 * checks miss:
 *   - Discrimination between submain protection and the largest final circuit
 *   - Phase imbalance impacts on neutral sizing for harmonic loads
 *   - Cumulative load on the origin's main switch
 *   - Cable thermal grouping when many cables share a single route
 *   - Inconsistencies between justification prose and structured values
 *   - Missed A4:2026 considerations (AFDD on HMOs, SPD risk, Open-PEN for EV)
 *
 * Output is appended to the design as `criticReview` — frontend surfaces it
 * as a "Design audit" panel. Critic doesn't directly mutate circuits; it
 * raises observations the user can choose to act on.
 */

import { callOpenAI } from '../_shared/ai-providers.ts';

export interface CriticFinding {
  severity: 'info' | 'warn' | 'error';
  scope: 'system' | 'board' | 'circuit';
  circuitNumber?: number;
  circuitName?: string;
  boardName?: string;
  title: string;
  detail: string;
  reg?: string;
  recommendation?: string;
}

export interface CriticReview {
  pass: 'design-audit-v1';
  findings: CriticFinding[];
  summary: string;
  durationMs: number;
}

const CRITIQUE_TOOL = {
  type: 'function' as const,
  function: {
    name: 'audit_design',
    description:
      'Review the complete circuit design as a system. Identify concerns that per-circuit checks miss.',
    parameters: {
      type: 'object',
      properties: {
        findings: {
          type: 'array',
          description: 'List of audit findings, each with severity + reg cite + recommendation.',
          items: {
            type: 'object',
            properties: {
              severity: {
                type: 'string',
                enum: ['info', 'warn', 'error'],
                description:
                  'info = observation, warn = should review, error = needs fix before sign-off',
              },
              scope: {
                type: 'string',
                enum: ['system', 'board', 'circuit'],
                description: 'Whether this finding is about the whole design, a board, or a circuit.',
              },
              circuitNumber: {
                type: 'number',
                description: 'Circuit number (1-indexed) if scope is "circuit"',
              },
              circuitName: {
                type: 'string',
                description: 'Circuit name if scope is "circuit"',
              },
              boardName: {
                type: 'string',
                description: 'Board name if scope is "board"',
              },
              title: {
                type: 'string',
                description: 'Short title for the finding (max ~60 chars)',
              },
              detail: {
                type: 'string',
                description: 'Detail of the concern (1-3 sentences)',
              },
              reg: {
                type: 'string',
                description:
                  'BS 7671 regulation cite supporting the finding, e.g. "536.4" or "443.4 (A4)"',
              },
              recommendation: {
                type: 'string',
                description: 'Concrete fix the user could apply',
              },
            },
            required: ['severity', 'scope', 'title', 'detail'],
          },
        },
        summary: {
          type: 'string',
          description:
            'One-sentence overall verdict on the design (e.g. "All compliant, two minor housekeeping notes").',
        },
      },
      required: ['findings', 'summary'],
    },
  },
};

const CRITIC_SYSTEM_PROMPT = `You are a BS 7671:2018+A4:2026 design auditor reviewing a complete circuit design as a system.

Per-circuit safety checks have already been applied (Zs lookup, cable type, ring Vd, voltage reference). Your job is to catch SYSTEM-LEVEL issues a per-circuit check would miss:

1. DISCRIMINATION (BS 7671 536.4)
   - Submain protection device vs largest final-circuit device — ratio at least 3:1 for MCB / 1.6:1 for MCCB
   - Cascade tripping risk under fault conditions

2. PHASE BALANCE on three-phase boards (525.1.2)
   - Significant imbalance (>20%) suggests reassignment
   - Heavy non-linear loads on one phase → harmonic neutral oversizing per Section 524

3. MAIN SWITCH SIZING
   - Origin board's main switch must carry whole-installation diversified current including all submain feeds
   - Submain board's main switch must carry that board's diversified load

4. CABLE THERMAL GROUPING (Appendix 4 · Cg)
   - Many cables sharing one route → grouping factor reduces effective Iz
   - Designer should apply Cg if more than ~6 cables grouped

5. A4:2026 CONSIDERATIONS
   - AFDD recommendation on socket + lighting circuits in sleeping accommodation (421.1.7)
   - SPD risk assessment per 443.4
   - TN-C-S Open-PEN protection for EV chargers (411.4.5 / 722.411.4)
   - Section 7xx special-location compliance

6. CONTAINMENT / INSTALLATION COHERENCE
   - SWA buried in ground = correct; SWA inside dry building = unusual; flag
   - Singles in conduit on plaster = uncommon; flag

FACTS — do not contradict these:
- The numbers (cableSize, Iz, voltageDrop, zs, maxZs, protection rating) were recalculated from the
  BS 7671 Appendix 4 tables and OSG after design. They are authoritative.
- Ring final circuits (circuitTopology "ring") on a 30/32 A device with 2.5mm² copper are deemed to meet
  433.1.1 when Iz ≥ 20 A (Reg 433.1.204). Iz below In on such a ring is CORRECT — never flag it.
- Id is the diversified design current (e.g. household cooker: 10 A + 30% of the remainder, OSG Table A2).
  Judge Ib ≤ In on Id where it is given.
- alreadyRaised lists findings the design already shows. Do not repeat them.
- BS 5839-1: the fire alarm supply should NOT be on an RCD unless BS 7671 requires one; never
  recommend adding RCD protection to a fire alarm circuit.
- Ib ≤ In ≤ Iz (433.1.1): a device rating ABOVE the design current is what the rule requires. Never
  flag In > Ib.
- Amendment dates: 421.1.7 AFDDs were recommended in 2018 and made required in A2:2022 for single-phase
  socket circuits ≤ 32 A in HRRBs, HMOs, purpose-built student accommodation and care homes (A4:2026
  reworded HRRB as > 18 m or > 6 storeys). Section 443 (SPD) was redrafted in A2:2022. Do not
  credit either to A4:2026.

DO NOT REPORT:
- Missing information ("not evidenced", "cannot be assessed", "not provided"). The form does not ask for
  board schedules, routes or main switch details. Only report what the data shows.
- Discrimination between two final circuits on the same board — they are in parallel, not in series.
  Discrimination is only between a device and the devices downstream of it (submains).
- Anything about justification or prose wording.

Be concise. Cite the regulation for every finding. Prefer "info" or "warn" — only use "error" for things that genuinely block sign-off. If everything is fine, return { findings: [], summary: "Compliant — no audit concerns." }.

Output via the audit_design tool.`;

/**
 * The model ignores some of its brief some of the time. Across the 12-job
 * benchmark (10 Oct) 45 findings included: "32A on 2.5mm² with Iz 27A is not
 * valid" raised as an ERROR on ring finals (433.1.204 deems them compliant);
 * "justification truncated" (it was sent 200 characters); discrimination
 * between two parallel final circuits; and a dozen "not evidenced" notes about
 * data the form never asks for. Drop those classes deterministically.
 */
export function filterFindings(
  findings: CriticFinding[],
  design: any,
  installationType: string = String(design?.projectInfo?.installationType ?? '')
): CriticFinding[] {
  const circuits: any[] = design?.circuits ?? [];
  const byName = new Map(circuits.map((c) => [String(c?.name ?? '').toLowerCase(), c]));
  const hasSubmain = circuits.some((c) =>
    /submain|sub-main|distribution|sub-board|sub board/i.test(`${c?.loadType ?? ''} ${c?.name ?? ''}`)
  );
  const raised: any[] = design?.cableCapacityIssues ?? [];
  return findings.filter((f) => {
    const text = `${f.title ?? ''} ${f.detail ?? ''}`;
    // "Nothing to report" lines clutter an audit — keep concerns only.
    if (
      f.severity === 'info' &&
      /^no\b|not evidently|no [a-z -]*(concern|issue|trigger)|not applicable|acceptable|coherent|appropriate|present$|noted$|within (the )?limit/i.test(
        String(f.title ?? '').trim()
      )
    )
      return false;
    if (f.severity !== 'error' && /^no\b[^.]*\b(data|details?|information)\b/i.test(String(f.title ?? '')))
      return false;
    // AFDD sleeping-accommodation duties (421.1.7) don't reach a shop or a
    // factory floor.
    if (
      /afdd|arc fault/i.test(text) &&
      /commercial|industrial/i.test(installationType)
    )
      return false;
    // In above Ib is what 433.1.1 requires.
    if (/rating above (the )?design current|lightly protected|above ib\b/i.test(text)) return false;
    if (/justification|prose|narrative|truncat|cut off|mid-sentence|wording/i.test(text)) return false;
    // A4:2026 duties stay even when phrased as "not shown" — open-PEN for EV
    // (722.411.4.1), the SPD assessment (443.4) and AFDD (421.1.7) are things
    // the electrician must decide, not missing form data.
    const a4Duty = /open.?pen|\bspd\b|surge|afdd|arc fault|722\.|443\.|421\.1\.7/i.test(text);
    if (
      !a4Duty &&
      f.severity !== 'error' &&
      /not (evidenced|provided|shown|stated|assessable|available)|cannot be (assessed|verified|confirmed|completed|fully)|no (board|grouping|phase|discrimination|upstream)[^.]*(data|provided|possible|assessment)/i.test(
        text
      )
    )
      return false;
    if (/discriminat|selectiv|cascade/i.test(text) && !hasSubmain) return false;
    const c =
      byName.get(String(f.circuitName ?? '').toLowerCase()) ??
      circuits.find((x) => text.toLowerCase().includes(String(x?.name ?? '').toLowerCase()) && x?.name);
    // Ib vs In judged on the raw current when the design gives a diversified
    // Id within the rating (household cooking, OSG A2) — not a finding.
    {
      const ibRaw = Number(c?.calculations?.Ib);
      const id = Number(c?.calculations?.Id);
      const inA = Number(c?.protectionDevice?.rating);
      if (
        id > 0 &&
        id < ibRaw &&
        inA > 0 &&
        id <= inA &&
        /design current|\bIb\b|exceed[s]? (the )?device|device rating/i.test(text)
      )
        return false;
    }
    if (c?.circuitTopology === 'ring' && /\bIz\b|In ≤ Iz|In <= Iz|overload|433\.1\.1/i.test(text))
      return false;
    // Already on screen from the deterministic checks.
    if (
      f.circuitName &&
      raised.some(
        (r) =>
          String(r.circuitName ?? '').toLowerCase() === String(f.circuitName).toLowerCase() &&
          ((r.kind === 'voltage-drop' && /voltage drop|\bvd\b/i.test(text)) ||
            (r.kind === 'zs' && /\bzs\b|loop impedance/i.test(text)) ||
            ((r.kind === 'capacity' || r.kind === 'design-current') && /\bIz\b|\bIb\b|capacity|overload/i.test(text)))
      )
    )
      return false;
    return true;
  });
}

export async function runCritiquePass(
  design: any,
  openAiKey: string,
  logger: any,
  installationType?: string
): Promise<CriticReview> {
  const start = Date.now();

  // Build a compact summary of the design — just the bits the critic needs.
  const designSummary = {
    project: design?.projectInfo,
    supply: design?.supply,
    consumerUnit: design?.consumerUnit,
    totalLoad: design?.totalLoad,
    diversifiedLoad: design?.diversifiedLoad,
    diversityFactor: design?.diversityFactor,
    circuits: (design?.circuits ?? []).map((c: any, i: number) => ({
      circuitNumber: c.circuitNumber ?? i + 1,
      name: c.name,
      circuitTopology: c.circuitTopology,
      loadType: c.loadType,
      loadPower: c.loadPower,
      phases: c.phases,
      voltage: c.voltage,
      cableSize: c.cableSize,
      cpcSize: c.cpcSize,
      cableType: c.cableType,
      cableLength: c.cableLength,
      installationMethod: c.installationMethod,
      protectionDevice: c.protectionDevice,
      specialLocation: c.specialLocation,
      // Numbers only — the model's prose here can describe the circuit before
      // the safety checks changed it ("6A RCBO chosen…" on an MCB circuit).
      regulation_refs: (c.regulation_refs ?? []).map((r: any) => r?.reg ?? r),
      calculations: {
        Ib: c.calculations?.Ib,
        Id: c.calculations?.Id,
        Iz: c.calculations?.Iz,
        zs: c.calculations?.zs,
        maxZs: c.calculations?.maxZs,
        voltageDrop: c.calculations?.voltageDrop,
        diversityFactor: c.calculations?.diversityFactor,
      },
    })),
    alreadyRaised: (design?.cableCapacityIssues ?? []).map((x: any) => ({
      circuitName: x.circuitName,
      kind: x.kind,
      error: x.error,
    })),
    correctionsApplied: {
      zs: (design?.zsCorrections ?? []).length,
      cableType: (design?.cableTypeCorrections ?? []).length,
      ringVd: (design?.ringVdCorrections ?? []).length,
      voltage: (design?.voltageCorrections ?? []).length,
      // Appendix 4 sizing (deterministic-sizing.ts) — cable sizes and voltage
      // drop in the numbers above are table values, not the model's.
      cableSizeFromTables: (design?.cableCapacityCorrections ?? []).filter(
        (x: { field?: string }) => x.field !== 'rating'
      ).length,
      deviceRatingFromTables: (design?.cableCapacityCorrections ?? []).filter(
        (x: { field?: string }) => x.field === 'rating'
      ).length,
      voltageDropFromTables: (design?.voltageDropRecalculations ?? []).length,
    },
  };

  try {
    const response = await callOpenAI(
      {
        messages: [
          { role: 'system', content: CRITIC_SYSTEM_PROMPT },
          { role: 'user', content: JSON.stringify(designSummary, null, 2) },
        ],
        model: 'gpt-5.4-mini-2026-03-17',
        max_completion_tokens: 8000,
        tools: [CRITIQUE_TOOL],
        tool_choice: { type: 'function', function: { name: 'audit_design' } },
      },
      openAiKey,
      90000
    );

    // Parse tool call output
    const toolCall = (response as any)?.toolCalls?.[0];
    if (!toolCall) {
      logger?.warn?.('Critique pass returned no tool call', { response });
      return {
        pass: 'design-audit-v1',
        findings: [],
        summary: 'Audit unavailable for this design.',
        durationMs: Date.now() - start,
      };
    }

    const args = JSON.parse(toolCall.function?.arguments ?? '{}');
    const raw: CriticFinding[] = Array.isArray(args.findings) ? args.findings : [];
    const findings = filterFindings(raw, design, installationType);
    if (findings.length !== raw.length)
      logger?.info?.('Critique findings filtered', { kept: findings.length, dropped: raw.length - findings.length });
    const summary: string = String(args.summary ?? 'Design reviewed.');

    logger?.info?.('Critique pass complete', {
      findingsCount: findings.length,
      severities: findings.reduce(
        (acc: Record<string, number>, f) => {
          acc[f.severity] = (acc[f.severity] ?? 0) + 1;
          return acc;
        },
        {}
      ),
      durationMs: Date.now() - start,
    });

    return {
      pass: 'design-audit-v1',
      findings,
      summary,
      durationMs: Date.now() - start,
    };
  } catch (err: any) {
    logger?.warn?.('Critique pass failed (non-blocking)', {
      error: err?.message ?? String(err),
    });
    return {
      pass: 'design-audit-v1',
      findings: [],
      summary: 'Audit could not complete; design is shipped without critique.',
      durationMs: Date.now() - start,
    };
  }
}
