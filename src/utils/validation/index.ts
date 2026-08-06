/**
 * The rule registry and its runner.
 *
 * Rules are data. The runner knows nothing about electricity — it applies each
 * rule, keeps what it says, and attaches the provenance and the target field so
 * the UI can render the issue faithfully and navigate to it.
 *
 * NOT YET WIRED INTO THE APP. The existing engines are still the live ones.
 * This is built alongside them so its verdicts can be compared against theirs
 * before any surface is switched over.
 */
import { TestResult } from '@/types/testResult';
import { CertificateContext, CircuitRule, Issue, Revision } from './types';
import { overloadProtectionRule } from './rules/overloadProtection';
import { earthFaultLoopImpedanceRule } from './rules/earthFaultLoopImpedance';

export * from './types';
export * from './applicability';

/** Every circuit rule. Order here is the order issues are reported in. */
export const CIRCUIT_RULES: CircuitRule[] = [overloadProtectionRule, earthFaultLoopImpedanceRule];

const appliesToRevision = (rule: CircuitRule, revision: Revision): boolean =>
  !rule.revisions || rule.revisions.includes(revision);

/** Run every applicable rule over one circuit. */
export const evaluateCircuit = (
  circuit: TestResult,
  ctx: CertificateContext,
  rules: CircuitRule[] = CIRCUIT_RULES
): Issue[] => {
  const issues: Issue[] = [];

  for (const rule of rules) {
    if (!appliesToRevision(rule, ctx.revision)) continue;

    const outcome = rule.evaluate(circuit, ctx);
    if (outcome.status === 'pass' || outcome.status === 'skip') continue;

    issues.push({
      ruleId: rule.id,
      title: rule.title,
      severity: rule.severity,
      source: rule.source,
      circuitId: circuit.id,
      field: rule.field,
      message: outcome.message,
      detail: outcome.status === 'fail' ? outcome.detail : undefined,
      suggestion: outcome.status === 'fail' ? outcome.suggestion : undefined,
      needsInput: outcome.status === 'abstain',
      missing: outcome.status === 'abstain' ? outcome.missing : undefined,
    });
  }

  return issues;
};

/** Run every applicable rule over a whole schedule. */
export const evaluateSchedule = (
  circuits: TestResult[],
  ctx: CertificateContext,
  rules: CircuitRule[] = CIRCUIT_RULES
): Issue[] => circuits.flatMap((circuit) => evaluateCircuit(circuit, ctx, rules));

/**
 * How an issue should be described to the user, given where it came from.
 *
 * A house threshold has no `ref` field to print — the type makes it impossible
 * to attribute one to the standard. This is the single most important line in
 * the module: it is what stopped "R1+R2 > 1.67 Ω" being labelled Reg 643.2.1.
 */
export const describeSource = (source: Issue['source']): string => {
  switch (source.kind) {
    case 'standard':
      return source.ref;
    case 'guidance':
      return `${source.publication} guidance — ${source.ref}`;
    case 'house':
      return `Elec-Mate check — ${source.rationale}`;
  }
};
