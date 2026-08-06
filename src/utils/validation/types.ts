/**
 * The certificate validation model.
 *
 * Written after an audit of the three engines this will eventually replace
 * (`useEICRValidation`, `regulationChecker/`, `testValidation`). Two problems
 * drove the shape of it, and both are prevented here by construction rather
 * than by discipline:
 *
 * 1. **Regulation numbers were printed beside thresholds that did not come from
 *    them** — a ring R1+R2 limit of 1.67 Ω cited to Reg 643.2.1, a 10% Zs margin
 *    cited to "Tables 41.2–41.4, NOTE 2". `RuleSource` is a discriminated union
 *    in which a `house` rule has no field to put a reference in. It is a type
 *    error to attribute an in-house threshold to the standard.
 *
 * 2. **Rules guessed when their inputs were missing.** The disconnection time
 *    was chosen by searching the circuit description, defaulting to 0.4 s, which
 *    fails compliant 40 A cooker circuits that belong at 5 s. A rule that cannot
 *    establish its inputs returns `abstain` and names what it needs. An honest
 *    gap is recoverable; a confident wrong verdict on a signed document is not.
 *
 * Nothing here is wired into the app yet.
 */
import { TestResult } from '@/types/testResult';

/** Which revision of the governing standard a rule speaks for. */
export type Revision = 'A4:2026' | 'A3:2024';

/**
 * Where a rule's threshold comes from.
 *
 * Note the asymmetry: `house` carries a rationale and **no reference field**.
 * That is the point — the UI can render provenance faithfully because a rule
 * cannot claim authority it does not have.
 */
export type RuleSource =
  | {
      kind: 'standard';
      /** e.g. "BS 7671 Reg 433.1.202", "BS 7671 Table 64" */
      ref: string;
      /** ISO date this reference was last checked against `bs7671_facets`. */
      verifiedOn: string;
    }
  | {
      kind: 'guidance';
      publication: 'GN3' | 'OSG' | 'IET';
      ref: string;
      verifiedOn: string;
    }
  | {
      kind: 'house';
      /** Why we flag it, in the electrician's terms. Never a regulation number. */
      rationale: string;
    };

/**
 * blocking — the certificate should not be issued in this state.
 * defect   — a real finding; on an EICR it wants an observation and a code.
 * advisory — worth knowing, not a failure.
 *
 * The existing engines use "critical"/"warning"/"info" to mean different things
 * in different files. These three are defined once.
 */
export type Severity = 'blocking' | 'defect' | 'advisory';

export type Outcome =
  | { status: 'pass' }
  /** The rule does not apply to this row at all (spare way, device row, N/A). */
  | { status: 'skip'; reason: string }
  /**
   * The rule applies but cannot be evaluated. `missing` names the inputs, so
   * the UI can ask for them instead of reporting a verdict nobody can trust.
   */
  | { status: 'abstain'; missing: string[]; message: string }
  | {
      status: 'fail';
      /** Short, scannable headline. Falls back to the rule's own title. */
      title?: string;
      message: string;
      /** The numbers the verdict turns on — shown, not hidden. */
      detail?: string;
      suggestion?: string;
    };

/** Certificate-level facts a circuit rule may legitimately depend on. */
export interface CertificateContext {
  earthingArrangement?: string;
  /** Nominal line-to-earth voltage. Table 41.3 is only valid at 230 V (411.4.202). */
  nominalVoltage?: number;
  revision: Revision;
}

export interface CircuitRule {
  /** Stable identifier — used for muting, and never shown to the user. */
  id: string;
  /** One line, in the electrician's language. */
  title: string;
  severity: Severity;
  source: RuleSource;
  /** Which revisions this rule speaks for. Omitted means all. */
  revisions?: Revision[];
  /**
   * The field this issue belongs to, so the UI can put the cursor in it.
   * Every issue being navigable is a property of the model, not a feature.
   */
  field?: keyof TestResult;
  evaluate: (circuit: TestResult, ctx: CertificateContext) => Outcome;
}

/** A rule's verdict, with everything the UI needs to show and navigate to it. */
export interface Issue {
  ruleId: string;
  title: string;
  severity: Severity;
  source: RuleSource;
  circuitId: string;
  field?: keyof TestResult;
  message: string;
  detail?: string;
  suggestion?: string;
  /** True when the rule abstained — a prompt for input, not a verdict. */
  needsInput: boolean;
  missing?: string[];
}
