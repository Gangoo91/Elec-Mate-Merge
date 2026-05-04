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

5. JUSTIFICATION CONSISTENCY
   - The structuredOutput sections should agree with the calculations
   - Conflicts (e.g. justification says "32A MCB" but rating field is 20A) are flagged as errors

6. A4:2026 CONSIDERATIONS
   - AFDD recommendation on socket + lighting circuits in sleeping accommodation (421.1.7)
   - SPD risk assessment per 443.4
   - TN-C-S Open-PEN protection for EV chargers (411.4.5 / 722.411.4)
   - Section 7xx special-location compliance

7. CONTAINMENT / INSTALLATION COHERENCE
   - SWA buried in ground = correct; SWA inside dry building = unusual; flag
   - Singles in conduit on plaster = uncommon; flag

Be concise. Cite the regulation for every finding. Prefer "info" or "warn" — only use "error" for things that genuinely block sign-off. If everything is fine, return { findings: [], summary: "Compliant — no audit concerns." }.

Output via the audit_design tool.`;

export async function runCritiquePass(
  design: any,
  openAiKey: string,
  logger: any
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
      regulation_refs: c.regulation_refs,
      cable_table_ref: c.cable_table_ref,
      ungrounded_choices: c.ungrounded_choices,
      calculations: {
        Ib: c.calculations?.Ib,
        Iz: c.calculations?.Iz,
        zs: c.calculations?.zs,
        maxZs: c.calculations?.maxZs,
        voltageDrop: c.calculations?.voltageDrop,
        diversityFactor: c.calculations?.diversityFactor,
      },
      justifications: {
        cableSize: c.justifications?.cableSize?.slice?.(0, 200),
        protection: c.justifications?.protection?.slice?.(0, 200),
      },
    })),
    correctionsApplied: {
      zs: (design?.zsCorrections ?? []).length,
      cableType: (design?.cableTypeCorrections ?? []).length,
      ringVd: (design?.ringVdCorrections ?? []).length,
      voltage: (design?.voltageCorrections ?? []).length,
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
    const findings: CriticFinding[] = Array.isArray(args.findings) ? args.findings : [];
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
