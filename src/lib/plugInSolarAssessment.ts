/**
 * Plug-in Solar Suitability Assessment — rules engine (ELE-1660)
 *
 * Sources, in order of authority. Every rule below carries the `basis` that
 * generated it, because the legal weight genuinely differs and the output has to
 * say so on the customer's copy.
 *
 * - `statutory`     The Plugs and Sockets etc. (Safety) Regulations 1994 and
 *                   Electricity Safety, Quality and Continuity Regulations 2002
 *                   (Amendment) Regulations 2026 — SI 2026/848. Made 16 Jul 2026,
 *                   in force 27 Aug 2026.
 * - `product-spec`  Plug-in Solar Device Interim Product Specification v2.0,
 *                   DESNZ, July 2026 — the document SI 2026/848 points at. Its
 *                   requirements bind the *product*; several of them land on the
 *                   installation by way of the manufacturer's mandated
 *                   instructions. Cited as "Spec §x".
 * - `bs7671`        BS 7671:2018+A4:2026, named as an applicable standard by the
 *                   spec's own reference list.
 * - `network`       Engineering Recommendation G98 Issue 2 Amendment 1 2026.
 *                   Great Britain only; Northern Ireland is G98/NI.
 * - `guidance`      Safety advice from bodies such as Electrical Safety First.
 *                   Not law, and never to be rendered as law.
 *
 * A note on the "Type A bidirectional RCD" question, because it is easy to get
 * wrong in BOTH directions.
 *
 * It is a genuine, published recommendation from **Electrical Safety First**,
 * whose plug-in solar advice says households should have "at least a Type A
 * bidirectional RCD protecting circuits intended for use with plug-in solar
 * panels", that homes with Type AC "should not use plug-in solar systems without
 * first upgrading", and that the installation should be assessed by "a competent
 * electrician registered with a competent persons scheme". That is credible
 * safety guidance and this module should never dismiss it.
 *
 * It is NOT a legal requirement. Mandating bi-directional residual current
 * protection in the product was put to DESNZ during the consultation and
 * declined — "The government has not identified sufficient evidence to justify
 * mandating a specific plug design incorporating bi-directional residual current
 * protection" (Government Response, Annex B, "Plug Specification").
 *
 * Both are true at once, and the split matters: ESF advice belongs under
 * `guidance`, the statutory position under `product-spec`. What actually exists
 * is four separate propositions:
 *
 *  1. Spec §5.7 governs the *device* — its smooth DC residual current must not
 *     exceed 5 mA so it does not impair an upstream RCD.
 *  2. Spec §8.3.2 asks the consumer to check for "modern residual current
 *     protection (RCBO) and is in good condition", footnoting that MCBs plus an
 *     upstream RCD "may also be acceptable, subject to verification through
 *     further testing now being undertaken by DESNZ".
 *  3. BS 7671 531.3.3 independently rules out Type AC where the load current may
 *     contain DC components, and 551.7.1(c) requires a suitable protective
 *     device where energy flow is bidirectional.
 *  4. DESNZ's stated long-term preference is industry moving to Type B or F —
 *     not Type A (Government Response, Annex B, "Legacy RCDs/MCBs and
 *     Bidirectional RCDs").
 *
 * This module keeps all four distinct and never states a mandated circuit RCD
 * type, because there isn't one.
 *
 * Two points settled by the Government Response that save arguments on site:
 * ring final circuits are explicitly fine (Annex B, "Ring Final Circuits" — the
 * safety study found no concern on appropriately protected rings), and no
 * user-operated DC isolator is required (Annex B, "DC Cable").
 */

export type AssessmentBasis =
  | 'statutory'
  | 'product-spec'
  | 'bs7671'
  | 'network'
  | 'guidance';

export type AssessmentOutcome = 'pass' | 'needs-work' | 'refer';

/** How much a finding weighs on the overall outcome. */
export type FindingSeverity =
  | 'blocker' // Cannot proceed as proposed.
  | 'action' // Remediable; electrician work required first.
  | 'advisory'; // Worth recording, does not by itself stop the install.

export interface AssessmentFinding {
  id: string;
  severity: FindingSeverity;
  basis: AssessmentBasis;
  /** One line, plain English, safe to show a householder. */
  summary: string;
  /** The reasoning and the exact source. */
  detail: string;
  citation: string;
  /** Chargeable follow-on work this finding implies, if any. */
  remedialWork?: string;
}

export interface PlugInSolarAssessmentResult {
  outcome: AssessmentOutcome;
  findings: AssessmentFinding[];
  /** Findings grouped for the report's "what the law says vs what is advised". */
  statutoryFindings: AssessmentFinding[];
  guidanceFindings: AssessmentFinding[];
  /** Deduplicated list of suggested paid work, in the order it should be done. */
  suggestedWork: string[];
}

// ---------------------------------------------------------------------------
// Fixed figures from the specification. Single source of truth — the SEO page
// and the in-app copy both read these rather than hard-coding numbers.
// ---------------------------------------------------------------------------

export const PLUG_IN_SOLAR_FACTS = {
  /** SI 2026/848 came into force. */
  inForceDate: '2026-08-27',
  statutoryInstrument: 'SI 2026/848',
  specVersion: 'Plug-in Solar Device Interim Product Specification v2.0 (DESNZ, July 2026)',
  /** Spec §4.1 — maximum apparent power supplied to the mains installation. */
  maxApparentPowerVA: 800,
  /** Spec §4.1 — maximum current at the point of connection. */
  maxCurrentA: 3.5,
  /** Spec §4.1 — maximum permissible sum of PV module DC power output. */
  maxPvModuleDcW: 2000,
  /** Spec §4.1 — above this, professional assessment should be considered. */
  professionalAssessmentThresholdW: 960,
  /** Spec §6.2.3.2 — BS 1362 fuse in the moulded plug. */
  maxPlugFuseA: 5,
  /** Spec §4.2 / §Scope — single phase, domestic. */
  maxRatedVoltageAc: 253,
  /** Spec §5.7 — maximum smooth DC residual current injected by the device. */
  maxResidualDcMa: 5,
  /** Spec §4.2.2 — up to four PV modules may be connected to the inverter. */
  maxPvModules: 4,
  /** Spec §4.2.2 — no more than two modules in series within any string. */
  maxModulesInSeries: 2,
  /**
   * Spec §4.2.2 — open circuit voltage at the inverter inputs must not exceed
   * this. Adopted because the likelihood and consequences of sustained DC arcing
   * rise with DC voltage, and the user makes these connections themselves.
   */
  maxArrayVocV: 120,
  /**
   * Spec §4.2.3 — where the inverter AND the BS 1363 plug and socket are both
   * mounted external to the premises, the socket requires this ingress
   * protection or better.
   */
  minOutdoorSocketIp: 'IP55',
  /**
   * G98 is connect-and-notify: commission first, notify the DNO within 28 days.
   * It is NOT a prior approval, and it does not gate the installation.
   */
  dnoNotificationWindowDays: 28,
  /**
   * How many devices are permitted. G98 Issue 2 Amendment 1 2026 currently says
   * one per household and is the binding constraint today. DESNZ's stated
   * approach is to move to one per power circuit "subject to corresponding
   * changes to the G98" (Government Response, Annex B, "Multiple units per
   * premise"), having rejected both one-per-dwelling as policy and an 800 VA
   * per-dwelling cap. Re-check this before quoting it — it is expected to change.
   */
  deviceLimit: {
    current: 'one-per-household',
    intended: 'one-per-power-circuit',
    citation: 'ER G98 Issue 2 Amendment 1 2026; DESNZ Government Response Annex B',
  },
} as const;

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------

export type UkRegion = 'england' | 'wales' | 'scotland' | 'northern-ireland';

/**
 * What protects the final circuit the device would plug into. Determined at the
 * consumer unit, ideally from a photograph plus the device markings.
 */
export type CircuitProtection =
  | 'rcbo' // Per-circuit RCBO. The spec's stated expectation.
  | 'mcb-with-upstream-rcd' // Split-load board. See DESNZ footnote 9.
  | 'mcb-no-rcd' // Overcurrent only, no residual current protection.
  | 'rewireable-fuse' // BS 3036 or similar. Older installation.
  | 'unknown';

/** RCD type marking, where residual current protection is present. */
export type RcdType = 'ac' | 'a' | 'f' | 'b' | 'unknown' | 'none';

export type TargetCircuitKind =
  | 'socket-final-circuit' // The only permitted kind.
  | 'lighting'
  | 'fixed-equipment-spur' // e.g. cooker, boiler.
  | 'unknown';

export type MountingSurface =
  | 'masonry-or-render'
  | 'acm-mcm-cladding'
  | 'hpl-cladding'
  | 'timber-cladding'
  | 'timber-balcony'
  | 'ground-or-freestanding'
  | 'metal-balcony-railing'
  | 'unknown';

/**
 * Spec §4.2.2. How much assembly the consumer does decides how much can go
 * wrong: a one-component device arrives with the DC side already made off,
 * whereas multi-component kits leave the user connecting modules themselves.
 */
export type PlugInSolarDeviceType =
  | 'one-component'
  | 'two-component'
  | 'multi-component'
  | 'unknown';

/** Spec §4.2.3 — the inverter and the plug/socket may each be inside or out. */
export type MountingLocation = 'internal' | 'external' | 'unknown';

export type ConnectionMethod =
  | 'direct-to-fixed-socket' // The only permitted method.
  | 'extension-lead'
  | 'multi-way-adaptor'
  | 'rcd-adaptor'
  | 'travel-adaptor';

export interface PlugInSolarAssessmentInput {
  region: UkRegion;

  // --- The product ---
  /** Confirmed present on the ENA Type Test Register as compliant (Spec §7). */
  onEnaTypeTestRegister: boolean | 'unknown';
  /** Declared maximum apparent power at the inverter, VA. */
  inverterApparentPowerVa?: number;
  /** Sum of PV module maximum DC power (Pmax), W. */
  totalPvModuleDcW?: number;
  /** Device incorporates, or is to be used with, battery storage. */
  hasBatteryStorage: boolean;
  deviceType: PlugInSolarDeviceType;
  /** Number of PV modules connected to the inverter. */
  pvModuleCount?: number;
  /** Greatest number of modules in any one series string. */
  pvModulesInSeries?: number;
  /** Open circuit voltage at the inverter inputs, V DC. */
  arrayVocV?: number;

  // --- The connection ---
  connectionMethod: ConnectionMethod;
  targetCircuitKind: TargetCircuitKind;
  /** Socket is undamaged and complies with BS 1363-2 (Spec §8.3.1). */
  socketConditionSatisfactory: boolean | 'unknown';
  /** Another plug-in solar device already connected anywhere in the dwelling. */
  existingPlugInSolarInDwelling: boolean;
  /** Where the inverter is mounted (Spec §4.2.3). */
  inverterLocation: MountingLocation;
  /** Where the socket-outlet is (Spec §4.2.3). */
  socketLocation: MountingLocation;
  /** IP rating marked on the socket, e.g. "IP55". Blank if none/unknown. */
  socketIpRating?: string;

  // --- The installation ---
  circuitProtection: CircuitProtection;
  rcdType: RcdType;
  /**
   * Device confirmed suitable for bidirectional energy flow (BS 7671 551.7.1(c)).
   *
   * Deliberately separate from `rcdType`. The type marking and the direction of
   * flow are two different questions, and running them together as "Type A
   * bidirectional" is what causes the second one to be skipped.
   */
  rcdBidirectionalConfirmed: boolean | 'unknown';
  /** Consumer unit is clearly and correctly labelled (Spec §8.3.3). */
  consumerUnitLabelled: boolean | 'unknown';
  /** Approximate year the consumer unit / installation was last upgraded. */
  installationApproxYear?: number;

  // --- Siting ---
  mountingSurface: MountingSurface;
  /** Building is subject to external wall remediation works (Spec §5.8). */
  subjectToExternalWallRemediation: boolean | 'unknown';
  /** Panel would fix to a wall forming a boundary between dwellings. */
  onPartyBoundaryWall: boolean;
  /** Structure has a lightning protection system. */
  hasLightningProtection: boolean;

  // --- Permissions and admin ---
  /** DNO notified of the connection (Spec §8.2.3.1 — mandatory). */
  dnoNotified: boolean | 'unknown';
  /** Landlord / freeholder / managing agent consent obtained where needed. */
  ownerPermissionObtained: boolean | 'not-required' | 'unknown';
  /**
   * Customer shown the §8.3.4 routine: press the RCD/RCBO test button
   * periodically *while the device is generating*, and call an electrician if it
   * does not trip immediately.
   */
  testButtonRoutineExplained: boolean | 'unknown';
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

const finding = (f: AssessmentFinding): AssessmentFinding => f;

export function assessPlugInSolar(
  input: PlugInSolarAssessmentInput,
): PlugInSolarAssessmentResult {
  const findings: AssessmentFinding[] = [];

  // --- Jurisdiction -------------------------------------------------------
  // G98 applies to Great Britain only. The spec's own footnote says application
  // to Northern Ireland "is subject to further consideration and may require
  // amendment", so we must not return a pass there.
  if (input.region === 'northern-ireland') {
    findings.push(
      finding({
        id: 'region-ni',
        severity: 'blocker',
        basis: 'network',
        summary: 'Northern Ireland is not covered by this route.',
        detail:
          'SI 2026/848 and the DESNZ product specification are framed around Great Britain. Engineering Recommendation G98 applies to Great Britain only; connection requirements in Northern Ireland are set separately by G98/NI, and the specification records that its application to Northern Ireland is subject to further consideration. Refer to the DNO before proceeding.',
        citation: 'Spec §1 note 3; ER G98/NI',
        remedialWork: 'Confirm the position with the Northern Ireland DNO in writing.',
      }),
    );
  }

  // --- Product compliance -------------------------------------------------
  if (input.onEnaTypeTestRegister === false) {
    findings.push(
      finding({
        id: 'not-on-ena-register',
        severity: 'blocker',
        basis: 'product-spec',
        summary: 'Device is not confirmed compliant on the ENA Type Test Register.',
        detail:
          'Manufacturers must register devices on the ENA Type Test Register and obtain confirmation that the device has been assessed and identified as compliant before placing them on the market. The specification is explicit that a device merely submitted for registration is not, in itself, demonstrating compliance.',
        citation: 'Spec §7',
        remedialWork: 'Select a device confirmed as compliant on the ENA Type Test Register.',
      }),
    );
  } else if (input.onEnaTypeTestRegister === 'unknown') {
    findings.push(
      finding({
        id: 'ena-register-unchecked',
        severity: 'action',
        basis: 'product-spec',
        summary: 'ENA Type Test Register status not yet confirmed.',
        detail:
          'Check the ENA Type Test Register (ENA Direct Connect) and confirm the exact model is listed as assessed and compliant. Marketplace listings are not evidence of this.',
        citation: 'Spec §7',
        remedialWork: 'Verify the model against the ENA Type Test Register.',
      }),
    );
  }

  if (
    input.inverterApparentPowerVa !== undefined &&
    input.inverterApparentPowerVa > PLUG_IN_SOLAR_FACTS.maxApparentPowerVA
  ) {
    findings.push(
      finding({
        id: 'exceeds-800va',
        severity: 'blocker',
        basis: 'product-spec',
        summary: `Inverter exceeds the ${PLUG_IN_SOLAR_FACTS.maxApparentPowerVA} VA limit.`,
        detail:
          'Plug-in solar devices shall be designed such that the maximum apparent power supplied to the mains installation does not exceed 800 VA and the maximum current does not exceed 3.5 A. A larger system is not plug-in solar and requires a designed, notifiable installation.',
        citation: 'Spec §4.1',
        remedialWork:
          'Quote a fixed PV installation under BS 7671 Section 712 with the appropriate DNO application.',
      }),
    );
  }

  if (input.totalPvModuleDcW !== undefined) {
    if (input.totalPvModuleDcW > PLUG_IN_SOLAR_FACTS.maxPvModuleDcW) {
      findings.push(
        finding({
          id: 'exceeds-2000w-dc',
          severity: 'blocker',
          basis: 'product-spec',
          summary: `Panel capacity exceeds the ${PLUG_IN_SOLAR_FACTS.maxPvModuleDcW} W DC limit.`,
          detail:
            'The maximum permissible sum of PV module DC power output (Pmax according to BS EN IEC 61730-1:2018) is 2000 W.',
          citation: 'Spec §4.1',
          remedialWork: 'Reduce the array, or quote a fixed PV installation instead.',
        }),
      );
    } else if (
      input.totalPvModuleDcW > PLUG_IN_SOLAR_FACTS.professionalAssessmentThresholdW
    ) {
      findings.push(
        finding({
          id: 'above-960w-assessment',
          severity: 'action',
          basis: 'product-spec',
          summary: 'Above 960 W DC — a professional assessment is called for.',
          detail:
            'The specification requires manufacturers to advise that consumers installing plug-in solar devices with a total PV module maximum power above 960 W should consider professional assessment of their existing electrical installation prior to installation. This assessment satisfies that.',
          citation: 'Spec §4.1 and §8.3.2',
          remedialWork: 'Installation condition assessment of the final circuit and consumer unit.',
        }),
      );
    }
  }

  if (input.hasBatteryStorage) {
    findings.push(
      finding({
        id: 'battery-out-of-scope',
        severity: 'blocker',
        basis: 'product-spec',
        summary: 'Battery storage is outside this route entirely.',
        detail:
          'The specification excludes plug-in battery systems and plug-in solar PV devices integrated with battery systems from its scope, and requires the instructions to carry a prominent warning that the device is not intended to be connected to, operated with, or used in conjunction with a battery energy storage system.',
        citation: 'Spec §1 (Scope) and §8.3.2',
        remedialWork:
          'Quote a designed PV and battery installation under BS 7671 Section 712 and Chapter 82.',
      }),
    );
  }

  // --- Array configuration (Spec §4.2.2) ----------------------------------
  if (
    input.pvModuleCount !== undefined &&
    input.pvModuleCount > PLUG_IN_SOLAR_FACTS.maxPvModules
  ) {
    findings.push(
      finding({
        id: 'too-many-modules',
        severity: 'blocker',
        basis: 'product-spec',
        summary: `More than ${PLUG_IN_SOLAR_FACTS.maxPvModules} PV modules on one inverter.`,
        detail:
          'Up to four PV modules may be connected to the inverter. Beyond that the arrangement is outside this route and needs a designed installation.',
        citation: 'Spec §4.2.2',
        remedialWork: 'Reduce to four modules, or quote a fixed PV installation.',
      }),
    );
  }

  if (
    input.pvModulesInSeries !== undefined &&
    input.pvModulesInSeries > PLUG_IN_SOLAR_FACTS.maxModulesInSeries
  ) {
    findings.push(
      finding({
        id: 'too-many-in-series',
        severity: 'blocker',
        basis: 'product-spec',
        summary: `More than ${PLUG_IN_SOLAR_FACTS.maxModulesInSeries} modules in a series string.`,
        detail:
          'No more than two PV modules shall be connected in series within any series string. Series strings raise the DC voltage at the inverter input, and these connections are made by the consumer.',
        citation: 'Spec §4.2.2',
        remedialWork: 'Reconfigure the array so no string exceeds two modules in series.',
      }),
    );
  }

  if (input.arrayVocV !== undefined && input.arrayVocV > PLUG_IN_SOLAR_FACTS.maxArrayVocV) {
    findings.push(
      finding({
        id: 'voc-above-120',
        severity: 'blocker',
        basis: 'product-spec',
        summary: `Open circuit voltage above ${PLUG_IN_SOLAR_FACTS.maxArrayVocV} V DC.`,
        detail:
          'PV modules shall be configured such that open circuit voltage at the inverter inputs does not exceed 120 V DC. The limit was adopted because the likelihood and consequences of sustained DC arcing increase with DC voltage — and on a plug-in device these connections are made by the consumer, not an electrician.',
        citation: 'Spec §4.2.2',
        remedialWork: 'Reconfigure the array to bring open circuit voltage within 120 V DC.',
      }),
    );
  }

  // --- Outdoor socket (Spec §4.2.3) ---------------------------------------
  // Only bites when BOTH the inverter and the socket are outside — that is the
  // arrangement the specification attaches the IP rating to.
  if (input.inverterLocation === 'external' && input.socketLocation === 'external') {
    const digits = (input.socketIpRating ?? '').toUpperCase().match(/IP\s*(\d)(\d)/);
    const solids = digits ? Number(digits[1]) : null;
    const water = digits ? Number(digits[2]) : null;
    const satisfactory = solids !== null && water !== null && solids >= 5 && water >= 5;

    if (!digits) {
      findings.push(
        finding({
          id: 'outdoor-socket-ip-unknown',
          severity: 'action',
          basis: 'product-spec',
          summary: 'Outdoor socket-outlet — IP rating not recorded.',
          detail:
            'Where the inverter and the BS 1363 plug and socket are both mounted external to the premises, the socket requires an ingress protection rating of IP 55 or better. Record the rating marked on the accessory.',
          citation: 'Spec §4.2.3',
          remedialWork: 'Identify the socket-outlet IP rating, or fit a compliant outdoor socket.',
        }),
      );
    } else if (!satisfactory) {
      findings.push(
        finding({
          id: 'outdoor-socket-ip-low',
          severity: 'action',
          basis: 'product-spec',
          summary: `Outdoor socket-outlet below ${PLUG_IN_SOLAR_FACTS.minOutdoorSocketIp}.`,
          detail:
            'Where both the inverter and the plug and socket are mounted externally, the socket requires an ingress protection rating of IP 55 or better. The rating recorded does not meet that.',
          citation: 'Spec §4.2.3',
          remedialWork:
            'Install a fixed outdoor socket-outlet rated IP55 or better on the target circuit.',
        }),
      );
    }
  }

  // --- Who assembled the DC side (Spec §4.2.2) ----------------------------
  if (input.deviceType === 'multi-component') {
    findings.push(
      finding({
        id: 'multi-component-dc',
        severity: 'advisory',
        basis: 'product-spec',
        summary: 'Multi-component kit — the consumer makes the DC connections.',
        detail:
          'On a multi-component device the DC connections between modules and inverter are made by the user before use, following the manufacturer instructions. Only matching connector pairs from the same product family may be used, Y-connectors are not permitted, and DC connectors must not be disconnected under load. Worth walking the customer through.',
        citation: 'Spec §4.2.2, §6.2.2 and §8.3.2',
      }),
    );
  }

  // --- Connection method --------------------------------------------------
  if (input.connectionMethod !== 'direct-to-fixed-socket') {
    const labels: Record<Exclude<ConnectionMethod, 'direct-to-fixed-socket'>, string> = {
      'extension-lead': 'an extension cable',
      'multi-way-adaptor': 'a multi-way adaptor',
      'rcd-adaptor': 'an RCD adaptor',
      'travel-adaptor': 'a travel adaptor',
    };
    findings.push(
      finding({
        id: 'prohibited-connection-method',
        severity: 'blocker',
        basis: 'product-spec',
        summary: `Connection through ${labels[input.connectionMethod]} is not permitted.`,
        detail:
          'The use of multi-way adaptors, travel adaptors, RCD adaptors and plug convertors is not permitted, and the specification requires this warning to be marked on the plug itself. The device connects to a fixed socket-outlet complying with BS 1363-2 by the manufacturer-supplied plug only.',
        citation: 'Spec §6.2.3.1, §8.2.3.2 and §8.3.2',
        remedialWork:
          'Install a suitably located fixed socket-outlet — commonly an outdoor socket on the target circuit.',
      }),
    );
  }

  // --- Target circuit -----------------------------------------------------
  if (input.targetCircuitKind === 'lighting' || input.targetCircuitKind === 'fixed-equipment-spur') {
    findings.push(
      finding({
        id: 'wrong-circuit-kind',
        severity: 'blocker',
        basis: 'product-spec',
        summary: 'This circuit type cannot take a plug-in solar device.',
        detail:
          'A plug-in solar device shall only be connected to socket circuits, and not to circuits supplying lighting or other fixed equipment. The specification gives a spur circuit supplying fixed equipment such as an electric cooker or boiler as an example of what is not permitted.',
        citation: 'Spec §8.3.3',
        remedialWork: 'Identify a suitable socket final circuit, or install one.',
      }),
    );
  } else if (input.targetCircuitKind === 'unknown') {
    findings.push(
      finding({
        id: 'circuit-unidentified',
        severity: 'action',
        basis: 'product-spec',
        summary: 'The final circuit has not been identified.',
        detail:
          'Which socket-outlets share a circuit must be established before connection, since only one device is permitted per circuit. Where users are unsure how to identify circuits safely, the specification directs them to consult a professional electrician.',
        citation: 'Spec §8.3.3',
        remedialWork: 'Circuit identification and consumer unit labelling.',
      }),
    );
  }

  if (input.existingPlugInSolarInDwelling) {
    findings.push(
      finding({
        id: 'second-device',
        severity: 'blocker',
        basis: 'network',
        summary: 'A second device is not permitted while G98 stands as written.',
        detail:
          'Engineering Recommendation G98 Issue 2 Amendment 1 2026 currently restricts this to one device per household, and is the binding constraint unless and until it is amended. Note the direction of travel: DESNZ has stated its approach is to limit deployment to one per power circuit subject to corresponding changes to G98, having rejected both a one-per-dwelling policy and an 800 VA per-dwelling cap on the basis that most UK dwellings have at least two power circuits. Re-check the current G98 issue before advising a customer they cannot add a second.',
        citation:
          'ER G98 Issue 2 Amendment 1 2026; Spec §1 note; DESNZ Government Response Annex B, "Multiple units per premise"',
      }),
    );
  }

  if (input.socketConditionSatisfactory === false) {
    findings.push(
      finding({
        id: 'socket-condition',
        severity: 'blocker',
        basis: 'product-spec',
        summary: 'The socket-outlet is not fit to take the device.',
        detail:
          'The device shall not be connected to damaged, degraded or non-compliant socket outlets. Socket-outlets for the use of a plug-in solar device shall comply with BS 1363-2.',
        citation: 'Spec §6.2.3.2 and §8.3.1',
        remedialWork: 'Replace the socket-outlet with a compliant accessory and test the circuit.',
      }),
    );
  } else if (input.socketConditionSatisfactory === 'unknown') {
    findings.push(
      finding({
        id: 'socket-uninspected',
        severity: 'action',
        basis: 'product-spec',
        summary: 'Socket-outlet condition not yet verified.',
        detail:
          'Users are advised to seek inspection and assessment by a qualified electrician if there is any doubt regarding the condition or suitability of the installation.',
        citation: 'Spec §8.3.1',
        remedialWork: 'Inspect and test the socket-outlet and its final circuit.',
      }),
    );
  }

  // --- Protective devices -------------------------------------------------
  // This is the section the trade press most often gets wrong. Keep the three
  // propositions separate and attribute each one honestly.
  switch (input.circuitProtection) {
    case 'rewireable-fuse':
    case 'mcb-no-rcd':
      findings.push(
        finding({
          id: 'no-residual-current-protection',
          severity: 'action',
          basis: 'product-spec',
          summary: 'The circuit has no residual current protection.',
          detail: `The specification requires users to be advised to check that the electrical installation is equipped with modern residual current protection (RCBO) and is in good condition, and states that if the installation is using older fuse protection and does not incorporate RCBOs, the installation shall be checked and, where necessary, upgraded by a professional electrician.${
              input.circuitProtection === 'rewireable-fuse'
                ? ' Be accurate about why with the customer: Electrical Safety First are clear that rewirable or cartridge fuses will not themselves be impaired by adding plug-in solar. Nothing is being made worse. The point is that the installation does not have the protection a modern device would give it in the first place.'
                : ''
            }`,
          citation: 'Spec §8.3.2',
          remedialWork:
            'Upgrade the final circuit protection to RCBO, and assess the consumer unit as a whole.',
        }),
      );
      break;
    case 'mcb-with-upstream-rcd':
      findings.push(
        finding({
          id: 'mcb-upstream-rcd-unresolved',
          severity: 'advisory',
          basis: 'product-spec',
          summary: 'Split-load board — acceptable in principle, but not yet settled.',
          detail:
            'The specification names per-circuit RCBOs as the expectation, and footnotes that installations in which circuits are protected by MCBs with residual current protection provided upstream may also be acceptable, subject to verification through further testing now being undertaken by DESNZ. Record the arrangement and re-check when DESNZ reports.',
          citation: 'Spec §8.3.2 note 9',
          remedialWork:
            'Optional: upgrade the final circuit to a dedicated RCBO to remove the uncertainty.',
        }),
      );
      break;
    case 'unknown':
      findings.push(
        finding({
          id: 'protection-unknown',
          severity: 'action',
          basis: 'product-spec',
          summary: 'Circuit protection has not been identified.',
          detail:
            'Where the consumer unit does not use modern protective devices, is not clearly labelled, or is of unknown condition, users shall be advised to seek inspection and assessment by a qualified electrician before installing the product.',
          citation: 'Spec §8.3.3',
          remedialWork: 'Identify and record the protective device for the target circuit.',
        }),
      );
      break;
    case 'rcbo':
    default:
      break;
  }

  // BS 7671, not the product spec. A grid-following inverter is precisely the
  // kind of load whose residual current may contain DC components.
  if (input.rcdType === 'ac') {
    findings.push(
      finding({
        id: 'type-ac-rcd',
        severity: 'action',
        basis: 'bs7671',
        summary: 'Type AC RCD is the wrong type for this duty.',
        detail:
          'Regulation 531.3.3 confines RCD Type AC to fixed equipment where it is known that the load current contains no DC components. An inverter is a power electronic converter whose residual current may contain DC components, so positive knowledge of their absence is not available and Type AC is not appropriate. A Type A, F or B device should be selected as appropriate.',
        citation: 'BS 7671:2018+A4:2026 Reg 531.3.3',
        remedialWork: 'Replace the Type AC device with a Type A RCBO for the final circuit.',
      }),
    );
    findings.push(
      finding({
        id: 'esf-type-a-recommendation',
        severity: 'advisory',
        basis: 'guidance',
        summary: 'Electrical Safety First advises upgrading before use.',
        detail:
          'Electrical Safety First recommends that circuits intended for use with plug-in solar have at least a Type A bidirectional RCD, and that homes with Type AC RCDs should not use plug-in solar without first upgrading. Their published table treats Type AC as unsuitable and Types A, B and F as all suitable, so the recommendation is Type A or better rather than Type A specifically. This is published safety guidance rather than a legal requirement — but it is credible, it is in print, and it points the same way as BS 7671 531.3.3.',
        citation:
          'Electrical Safety First — "Plug-in Solar Panels: What to Know Before Buying", v1.0, August 2026',
        remedialWork:
          'Upgrade the final circuit to a Type A, F or B device before the customer uses the product.',
      }),
    );
  } else if (input.rcdType === 'unknown' && input.circuitProtection !== 'rewireable-fuse') {
    findings.push(
      finding({
        id: 'rcd-type-unknown',
        severity: 'action',
        basis: 'bs7671',
        summary: 'RCD type not identified.',
        detail:
          'The type marking on the device determines whether it is suitable where DC residual components may be present. Identify the marking at the consumer unit and record it. Regulation 531.3.3 governs the selection.',
        citation: 'BS 7671:2018+A4:2026 Reg 531.3.3',
        remedialWork: 'RCD type identification at the consumer unit.',
      }),
    );
  }

  // A4:2026 added the bidirectional-flow requirement. This is a SEPARATE question
  // from the type marking above, and it is the one that gets skipped — "Type A
  // bidirectional" reads like one property when it is two. ESF: most devices are
  // unidirectional, and "few RCD/RCBOs can be easily identified as being
  // bidirectionally capable by the consumer".
  if (input.rcdType !== 'none' && input.circuitProtection !== 'rewireable-fuse') {
    if (input.rcdBidirectionalConfirmed === false) {
      findings.push(
        finding({
          id: 'rcd-not-bidirectional',
          severity: 'action',
          basis: 'bs7671',
          summary: 'The protective device is not suitable for bidirectional flow.',
          detail:
            'Once a plug-in solar device is connected, the final circuit carries energy in both directions. Regulation 551.7.1(c) requires a protective device suitable where energy flow is bidirectional, and 551.7.1(d) restricts connecting a source to the load side of an RCD. Electrical Safety First are explicit that unidirectional devices are not suitable for plug-in solar, as they may fail to operate in the event of a fault.',
          citation: 'BS 7671:2018+A4:2026 Regs 551.7.1(c), 551.7.1(d)',
          remedialWork:
            'Replace the final circuit device with one rated for bidirectional energy flow.',
        }),
      );
    } else if (input.rcdBidirectionalConfirmed === 'unknown') {
      findings.push(
        finding({
          id: 'rcd-bidirectional-unconfirmed',
          severity: 'advisory',
          basis: 'bs7671',
          summary: 'Bidirectional capability not confirmed.',
          detail:
            'Separate from the type marking: most RCDs and RCBOs are designed for energy flowing one way. Some carry a "BD" or "Bi-dir" suffix, but many give no marking at all, in which case the manufacturer should be asked with the model number to hand. Regulation 551.7.1(c) requires a device suitable for bidirectional flow, and 551.7.2 — redrafted and split by A4:2026 — is the reference the specification names for replacing the circuit\'s overcurrent device. Record the make and model and confirm it.',
          citation:
            'BS 7671:2018+A4:2026 Regs 551.7.1(c), 551.7.2; Electrical Safety First consumer guidance, August 2026',
          remedialWork:
            'Identify the protective device make and model, and confirm bidirectional suitability.',
        }),
      );
    }
  }

  if (input.consumerUnitLabelled === false || input.consumerUnitLabelled === 'unknown') {
    findings.push(
      finding({
        id: 'consumer-unit-unlabelled',
        severity: 'action',
        basis: 'product-spec',
        summary: 'Consumer unit is not clearly labelled.',
        detail:
          'Modern protective devices allow individual circuits to be identified and are required to support safe installation of plug-in solar devices. Where the consumer unit is not clearly labelled or is of unknown condition, inspection and assessment by a qualified electrician is called for before installing the product.',
        citation: 'Spec §8.3.3',
        remedialWork: 'Circuit identification and durable labelling of the consumer unit.',
      }),
    );
  }

  // --- Siting and fire ----------------------------------------------------
  const prohibitedSurfaces: MountingSurface[] = [
    'acm-mcm-cladding',
    'hpl-cladding',
    'timber-cladding',
    'timber-balcony',
  ];
  if (prohibitedSurfaces.includes(input.mountingSurface)) {
    findings.push(
      finding({
        id: 'prohibited-mounting-surface',
        severity: 'blocker',
        basis: 'product-spec',
        summary: 'Installation is not permitted on this surface.',
        detail:
          'Installations shall not be permitted on aluminium composite material (ACM) or metal composite material (MCM) cladding systems, high pressure laminate (HPL) cladding systems, timber cladding systems, or timber balconies.',
        citation: 'Spec §5.8',
        remedialWork: 'Identify an alternative mounting position, or a ground-mounted arrangement.',
      }),
    );
  }

  if (input.subjectToExternalWallRemediation === true) {
    findings.push(
      finding({
        id: 'external-wall-remediation',
        severity: 'blocker',
        basis: 'product-spec',
        summary: 'Building is subject to external wall remediation works.',
        detail:
          'Installations shall not be permitted on buildings that are subject to external wall remediation works, building safety remediation works or equivalent restrictions relating to external wall fire safety.',
        citation: 'Spec §5.8',
      }),
    );
  }

  if (input.onPartyBoundaryWall) {
    findings.push(
      finding({
        id: 'party-boundary-wall',
        severity: 'blocker',
        basis: 'product-spec',
        summary: 'Cannot be fixed to a wall forming a boundary between dwellings.',
        detail:
          'Users are responsible for ensuring that PV modules are not installed on or fixed to walls or other parts of the building that form a property boundary between dwellings, and that modules do not increase the risk of fire spreading along external walls or balconies to neighbouring properties.',
        citation: 'Spec §8.3.2',
      }),
    );
  }

  if (input.hasLightningProtection) {
    findings.push(
      finding({
        id: 'lightning-separation',
        severity: 'advisory',
        basis: 'product-spec',
        summary: 'Observe separation from the lightning protection system.',
        detail:
          'In the case of buildings with a lightning protection system, the necessary separation distance from the discharges of the lightning protection system shall be observed.',
        citation: 'Spec §8.3.2; BS EN IEC 52305-3:2024',
        remedialWork: 'Confirm separation distance against the lightning protection design.',
      }),
    );
  }

  // --- Notification and permissions ---------------------------------------
  if (input.dnoNotified !== true) {
    findings.push(
      finding({
        id: 'dno-notification',
        severity: 'advisory',
        basis: 'network',
        summary: 'The DNO must be notified within 28 days of commissioning.',
        detail:
          'Notification to the distribution network operator about connection and disconnection is mandatory, and the product must carry that statement. G98 operates on a connect-and-notify basis: the device is installed and commissioned first, and the notification follows within 28 days. It is not a prior approval and it does not hold up the installation. Most consumers do not know the obligation exists, so submitting it on their behalf is worth offering.',
        citation: 'Spec §8.2.3.1 and §8.3.2; ER G98 (connect and notify, 28 days)',
        remedialWork: 'Submit the G98 notification to the DNO within 28 days of commissioning.',
      }),
    );
  }

  // Spec §8.3.4 — the recurring check the customer performs, and the referral it
  // creates. Worth stating on the certificate because it is the one obligation
  // that keeps working long after the visit: a test the householder runs, with an
  // instruction to ring an electrician when it fails.
  if (
    input.testButtonRoutineExplained !== true &&
    input.circuitProtection !== 'rewireable-fuse' &&
    input.rcdType !== 'none'
  ) {
    findings.push(
      finding({
        id: 'test-button-routine',
        severity: 'advisory',
        basis: 'product-spec',
        summary: 'Show the customer the test button routine before you leave.',
        detail:
          'Older residual current devices can be desensitised by equipment leaking DC into the AC circuit — plug-in EV chargers, IT equipment, power supplies and plug-in solar together. The specification requires the customer to be instructed to test the RCD or RCBO periodically by pressing its test button while the plug-in solar device is producing power, and states that if it does not trip immediately they should contact a competent professional electrician to discuss replacing it with a more modern unit. Electrical Safety First publish the same advice.',
        citation: 'Spec §8.3.4; Electrical Safety First consumer guidance, August 2026',
        remedialWork:
          'Demonstrate the test button to the customer and record that the routine was explained.',
      }),
    );
  }

  if (input.ownerPermissionObtained === false || input.ownerPermissionObtained === 'unknown') {
    findings.push(
      finding({
        id: 'owner-permission',
        severity: 'advisory',
        basis: 'product-spec',
        summary: 'Owner or landlord permission may be needed.',
        detail:
          'Users are responsible for obtaining any necessary permissions from the property owner, landlord, freeholder, managing agent or relevant authority prior to installation, for any necessary planning permission and Listed Building Consent, and for checking whether the product affects relevant insurance arrangements.',
        citation: 'Spec §8.3.1',
      }),
    );
  }

  // --- Installation age ---------------------------------------------------
  if (
    input.installationApproxYear !== undefined &&
    input.installationApproxYear < 2008 &&
    input.circuitProtection !== 'rcbo'
  ) {
    findings.push(
      finding({
        id: 'older-installation',
        severity: 'advisory',
        basis: 'guidance',
        summary: 'Older installation — condition assessment advised.',
        detail:
          'Where the installation predates widespread use of residual current protection and its condition is unknown, an installation condition assessment before connecting a generating device is prudent. This is professional judgement, not a requirement of the specification.',
        citation: 'Professional judgement',
        remedialWork: 'Installation condition report covering the final circuit and consumer unit.',
      }),
    );
  }

  // --- Outcome ------------------------------------------------------------
  const hasBlocker = findings.some((f) => f.severity === 'blocker');
  const hasAction = findings.some((f) => f.severity === 'action');
  const outcome: AssessmentOutcome = hasBlocker ? 'refer' : hasAction ? 'needs-work' : 'pass';

  const suggestedWork = findings
    .map((f) => f.remedialWork)
    .filter((w): w is string => Boolean(w))
    .filter((w, i, arr) => arr.indexOf(w) === i);

  return {
    outcome,
    findings,
    statutoryFindings: findings.filter(
      (f) => f.basis === 'statutory' || f.basis === 'product-spec' || f.basis === 'network',
    ),
    guidanceFindings: findings.filter((f) => f.basis === 'guidance' || f.basis === 'bs7671'),
    suggestedWork,
  };
}

/** Wording for the result banner. Deliberately avoids implying legal clearance. */
export const OUTCOME_COPY: Record<
  AssessmentOutcome,
  { title: string; body: string }
> = {
  pass: {
    title: 'No blocking issues found',
    body: 'On the information recorded, nothing was found that would prevent a compliant plug-in solar device being connected. This assessment records the condition found on the date of inspection; it is not a certificate and it does not transfer responsibility for the product or its installation.',
  },
  'needs-work': {
    title: 'Work needed first',
    body: 'The installation can take a plug-in solar device once the items below have been dealt with. Each item states whether it comes from the regulations, the product specification, BS 7671, or professional judgement.',
  },
  refer: {
    title: 'Not suitable as proposed',
    body: 'One or more items rule out connecting the device as proposed. These are set out below with their source, along with the alternatives worth quoting.',
  },
};
