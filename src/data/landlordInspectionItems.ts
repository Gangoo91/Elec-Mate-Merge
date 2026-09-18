/**
 * Landlord annual visit — the maintenance schedule for a rented dwelling.
 *
 * 🔴 THIS IS NOT AN EICR, AND NOTHING HERE MAY IMPLY THAT IT IS.
 * An EICR is a condition report backed by testing. This is a yearly walk round
 * between EICRs: what can be seen, opened and operated without a test
 * instrument. Every item below is written so it can be answered honestly from
 * a visual and functional check, and nothing asks the inspector to conclude
 * something only a measurement could establish.
 *
 * ── WHAT GIVES THIS DOCUMENT ITS STANDING ─────────────────────────────────
 * Not the Electricity at Work Regulations — those are the workplace duty, and
 * they are the wrong hook for a tenant's home. The commercial schedule in
 * `routineInspectionItems.ts` keeps that framing because it is right there.
 *
 * For a rented dwelling the duty is a REPAIRING one, and it is continuous
 * rather than five-yearly. Verified against `bs7671_facets`:
 *
 *   • Landlord and Tenant Act 1985, s11(1)(b) (England and Wales) — the
 *     landlord "shall keep in repair and proper working order the installations
 *     in the dwelling-house for the supply of water, gas and electricity".
 *     GN3 notes the wording is 'shall': a mandatory duty, not guidance.
 *   • Housing (Scotland) Act 2014, s13 ch.4 — the installation must be in a
 *     "reasonable state of repair".
 *   • The Electrical Safety Standards in the Private Rented Sector (England)
 *     Regulations 2020 — an EICR at intervals of not more than 5 years, unless
 *     the inspector considers a shorter period necessary. New tenancies from
 *     1 July 2020, existing from 1 April 2021.
 *
 * The EICR discharges the five-yearly duty. THIS record is what a landlord has
 * to show they kept the installation in repair in between — which is the duty
 * that never pauses. That is the whole argument for the document, and it is
 * why the schedule is weighted towards things that DEGRADE between inspections:
 * alarms, damaged accessories, tenant-reported faults, overloaded sockets.
 *
 * ── 🔴 WHAT THIS SCHEDULE MUST NEVER DO ───────────────────────────────────
 * Imply a legal duty that does not exist. Two specific traps:
 *
 * 1. An existing installation is NOT required to meet the current edition of
 *    BS 7671. Regulation 411.3.3 (RCD protection for socket-outlets ≤ 32 A)
 *    applies to new and altered work. A 2004 board without RCD protection is a
 *    recommendation for improvement, not a breach — the items below record what
 *    is there and say so plainly.
 * 2. There is no published table of annual-visit intervals for dwellings. The
 *    next-visit date is the inspector's recommendation with reasoning, exactly
 *    as on the commercial schedule. See `routineInspectionItems.ts`.
 *
 * ── FIRE DETECTION ────────────────────────────────────────────────────────
 * Alarms are CHECKED here, not certified here. Grade and category (Grade A–F,
 * category LD1–3 to BS 5839-6) are deliberately absent: the app already has a
 * Smoke & CO Alarm certificate that owns that vocabulary, and
 * `smokeCOJsonFormatter.ts` records the same decision not to map them. Two
 * forms capturing the same fact is two sources that can disagree about it.
 */

import type { RoutineInspectionItem } from './routineInspectionItems';

/**
 * The landlord annual schedule.
 *
 * ⚠️ IDs are prefixed `lai_`, not `rir_`. Outcomes are stored against the item
 * id, so a distinct prefix is what stops an answer recorded on a commercial
 * visit reappearing against a different question on a landlord one when the
 * visit type is changed.
 */
export const landlordInspectionItems: RoutineInspectionItem[] = [
  // ── A. Supply, meter and consumer unit ──────────────────────────────────
  {
    id: 'lai_1_1',
    group: 'Supply, meter and consumer unit',
    itemNumber: '1.1',
    description: 'Intake, meter and supplier’s equipment — condition and security, no signs of overheating',
    outcome: '',
    hint: 'Do not disturb the supplier’s equipment. Report damage, heat damage or broken seals to the DNO or supplier.',
  },
  {
    id: 'lai_1_2',
    group: 'Supply, meter and consumer unit',
    itemNumber: '1.2',
    description: 'Main switch — present, operates, identified, and reachable by the tenant',
    outcome: '',
    hint: 'The tenant has to be able to turn the supply off in an emergency. A main switch behind a wardrobe is a finding.',
  },
  {
    id: 'lai_1_3',
    group: 'Supply, meter and consumer unit',
    itemNumber: '1.3',
    description: 'Consumer unit — enclosure condition, covers and barriers in place, no accessible live parts',
    outcome: '',
  },
  {
    id: 'lai_1_4',
    group: 'Supply, meter and consumer unit',
    itemNumber: '1.4',
    description: 'Earthing conductor and main protective bonding — present, sound, accessible and labelled',
    outcome: '',
    hint: 'Bonding to water and gas where those services are present. Record it as Not seen if it is buried or boxed in.',
  },
  {
    id: 'lai_1_5',
    group: 'Supply, meter and consumer unit',
    itemNumber: '1.5',
    description: 'Circuit identification, schedule and notices present and legible',
    outcome: '',
  },
  {
    id: 'lai_1_6',
    group: 'Supply, meter and consumer unit',
    itemNumber: '1.6',
    description: 'Access to the consumer unit unobstructed',
    outcome: '',
  },

  // ── B. Protective devices ───────────────────────────────────────────────
  {
    id: 'lai_2_1',
    group: 'Protective devices',
    itemNumber: '2.1',
    description: 'Devices secure, undamaged and correctly seated; no discolouration or heat damage',
    outcome: '',
  },
  {
    id: 'lai_2_2',
    group: 'Protective devices',
    itemNumber: '2.2',
    description: 'RCD and RCBO test buttons operated, devices tripped and reset',
    outcome: '',
    hint: 'The test button proves the mechanism only — it does not measure trip time. If you measured it with an instrument, record it under Spot checks.',
  },
  {
    id: 'lai_2_3',
    group: 'Protective devices',
    itemNumber: '2.3',
    description: 'RCD protection of socket-outlet circuits — recorded as found',
    outcome: '',
    hint: 'Reg 411.3.3 requires it for socket-outlets rated 32 A or less, and the risk-assessment exception is not available for a dwelling. That applies to new and altered work — an older installation without it is a recommendation for improvement, not a breach.',
  },
  {
    id: 'lai_2_4',
    group: 'Protective devices',
    itemNumber: '2.4',
    description: 'No nuisance tripping or repeated operation reported since the last visit',
    outcome: '',
    hint: 'Ask the tenant. Repeated tripping is the installation telling you something that a visual check will not.',
  },
  {
    id: 'lai_2_5',
    group: 'Protective devices',
    itemNumber: '2.5',
    description: 'Surge protective device status indicator checked where fitted',
    outcome: '',
  },
  {
    id: 'lai_2_6',
    group: 'Protective devices',
    itemNumber: '2.6',
    description: 'Arc fault detection — recorded where the premises is one that requires it',
    outcome: '',
    hint: 'Reg 421.1.7 makes AFDDs mandatory on socket-outlet final circuits rated 32 A or less in an HMO, purpose-built student accommodation, a care home or a higher-risk residential building, and recommends them elsewhere. Answer N/A for an ordinary single-household let.',
  },

  // ── C. Fire detection and alarms ────────────────────────────────────────
  {
    id: 'lai_3_1',
    group: 'Fire detection and alarms',
    itemNumber: '3.1',
    description: 'Smoke alarms — present on each storey, sited sensibly and securely fixed',
    outcome: '',
  },
  {
    id: 'lai_3_2',
    group: 'Fire detection and alarms',
    itemNumber: '3.2',
    description: 'Heat alarm in the kitchen where one is provided',
    outcome: '',
  },
  {
    id: 'lai_3_3',
    group: 'Fire detection and alarms',
    itemNumber: '3.3',
    description: 'Carbon monoxide alarm present where there is a fixed combustion appliance',
    outcome: '',
    hint: 'A solid fuel, oil or gas appliance — a boiler, fire or stove. Record what is there; the alarm’s own record belongs on a Smoke & CO Alarm certificate.',
  },
  {
    id: 'lai_3_4',
    group: 'Fire detection and alarms',
    itemNumber: '3.4',
    description: 'Every alarm tested at its test button and sounded',
    outcome: '',
  },
  {
    id: 'lai_3_5',
    group: 'Fire detection and alarms',
    itemNumber: '3.5',
    description: 'Alarms interlink when tested, where a linked system is fitted',
    outcome: '',
    hint: 'Test one head and listen for the others. An interlinked system that does not interlink is worth finding.',
  },
  {
    id: 'lai_3_6',
    group: 'Fire detection and alarms',
    itemNumber: '3.6',
    description: 'Replacement date on each alarm head checked and not passed',
    outcome: '',
    hint: 'Sealed units have a life printed on the body — commonly ten years. An expired head is a defect even though it still sounds.',
  },
  {
    id: 'lai_3_7',
    group: 'Fire detection and alarms',
    itemNumber: '3.7',
    description: 'Mains-powered alarms — supply healthy indicator lit, backup battery serviceable',
    outcome: '',
  },
  {
    id: 'lai_3_8',
    group: 'Fire detection and alarms',
    itemNumber: '3.8',
    description: 'Communal fire alarm or emergency lighting system in the building — noted, not tested',
    outcome: '',
    hint: 'A BS 5839-1 system and emergency lighting are inspected and serviced under their own regimes, on their own certificates. Record that it exists and move on.',
  },

  // ── D. Accessories, wiring and lighting ─────────────────────────────────
  {
    id: 'lai_4_1',
    group: 'Accessories, wiring and lighting',
    itemNumber: '4.1',
    description: 'Socket-outlets, switches and accessories — secure, undamaged, no accessible live parts',
    outcome: '',
    hint: 'Cracked plates, scorching around a socket and loose fittings are the usual year-on-year finds.',
  },
  {
    id: 'lai_4_2',
    group: 'Accessories, wiring and lighting',
    itemNumber: '4.2',
    description: 'Visible cables and containment — condition, support and fixing, no damage',
    outcome: '',
  },
  {
    id: 'lai_4_3',
    group: 'Accessories, wiring and lighting',
    itemNumber: '4.3',
    description: 'Lighting — fittings secure, lampholders and covers in place and undamaged',
    outcome: '',
  },
  {
    id: 'lai_4_4',
    group: 'Accessories, wiring and lighting',
    itemNumber: '4.4',
    description: 'Bathroom and shower room — equipment suitable for its position, no unsuitable accessories',
    outcome: '',
    hint: 'A portable heater, an extension lead or a standard socket in a bathroom is a finding in its own right.',
  },
  {
    id: 'lai_4_5',
    group: 'Accessories, wiring and lighting',
    itemNumber: '4.5',
    description: 'Kitchen — accessories clear of sinks and hobs, no heat or water damage',
    outcome: '',
  },
  {
    id: 'lai_4_6',
    group: 'Accessories, wiring and lighting',
    itemNumber: '4.6',
    description: 'Extension leads or adaptors in permanent use — recorded where found',
    outcome: '',
    hint: 'Not a fault in the installation, but it is evidence there are too few socket-outlets — which is a recommendation worth making and worth quoting for.',
  },
  {
    id: 'lai_4_7',
    group: 'Accessories, wiring and lighting',
    itemNumber: '4.7',
    description: 'Fire-stopping and sealing at penetrations intact where visible',
    outcome: '',
    hint: 'Matters most in a flat or a converted house, where a penetration breaches a compartment wall or floor.',
  },

  // ── E. Landlord-supplied equipment ──────────────────────────────────────
  {
    id: 'lai_5_1',
    group: 'Landlord-supplied equipment',
    itemNumber: '5.1',
    description: 'Cooker connection unit and cooker flex — condition and secure termination',
    outcome: '',
  },
  {
    id: 'lai_5_2',
    group: 'Landlord-supplied equipment',
    itemNumber: '5.2',
    description: 'Electric shower — isolation present, condition, no signs of overheating',
    outcome: '',
  },
  {
    id: 'lai_5_3',
    group: 'Landlord-supplied equipment',
    itemNumber: '5.3',
    description: 'Immersion heater — isolation present and condition',
    outcome: '',
  },
  {
    id: 'lai_5_4',
    group: 'Landlord-supplied equipment',
    itemNumber: '5.4',
    description: 'Extractor fans operate and have a means of isolation',
    outcome: '',
  },
  {
    id: 'lai_5_5',
    group: 'Landlord-supplied equipment',
    itemNumber: '5.5',
    description: 'Appliances supplied with the let — condition noted',
    outcome: '',
    hint: 'A visual check only. Testing them is PAT, on its own certificate.',
  },
  {
    id: 'lai_5_6',
    group: 'Landlord-supplied equipment',
    itemNumber: '5.6',
    description: 'EV charge point — condition noted',
    outcome: '',
    hint: 'Noted here, inspected under its own regime on its own certificate.',
  },

  // ── F. Outside and outbuildings ─────────────────────────────────────────
  {
    id: 'lai_6_1',
    group: 'Outside and outbuildings',
    itemNumber: '6.1',
    description: 'Outdoor socket-outlets — condition, enclosure sound and weatherproof, RCD protected',
    outcome: '',
  },
  {
    id: 'lai_6_2',
    group: 'Outside and outbuildings',
    itemNumber: '6.2',
    description: 'External lighting — condition and secure fixing',
    outcome: '',
  },
  {
    id: 'lai_6_3',
    group: 'Outside and outbuildings',
    itemNumber: '6.3',
    description: 'Supply to a garage, shed or outbuilding — cable condition, isolation and protection',
    outcome: '',
    hint: 'Buried or trailing cable to an outbuilding is one of the most common serious finds on a rented property.',
  },
  {
    id: 'lai_6_4',
    group: 'Outside and outbuildings',
    itemNumber: '6.4',
    description: 'Equipment suitable for the conditions it is exposed to',
    outcome: '',
  },

  // ── G. Records, access and the tenancy ──────────────────────────────────
  {
    id: 'lai_7_1',
    group: 'Records, access and the tenancy',
    itemNumber: '7.1',
    description: 'Electrical Installation Condition Report available and in date',
    outcome: '',
    hint: 'For a private rented property in England the EICR interval is not more than 5 years, or less if the inspector said so. Record the dates in the compliance section.',
  },
  {
    id: 'lai_7_2',
    group: 'Records, access and the tenancy',
    itemNumber: '7.2',
    description: 'Previous inspection, test and maintenance records available',
    outcome: '',
    hint: 'GN3 notes that in rented accommodation, passing copies to the occupier may itself be required by legislation.',
  },
  {
    id: 'lai_7_3',
    group: 'Records, access and the tenancy',
    itemNumber: '7.3',
    description: 'Faults reported by the tenant since the last visit',
    outcome: '',
    hint: 'Ask, and record the answer even when it is none. A reported fault that was never actioned is the thing that turns a repairing duty into a claim.',
  },
  {
    id: 'lai_7_4',
    group: 'Records, access and the tenancy',
    itemNumber: '7.4',
    description: 'Alterations or additions since the last visit',
    outcome: '',
    hint: 'Tenant-fitted lights, outdoor sockets and garden supplies are common and are rarely notified.',
  },
  {
    id: 'lai_7_5',
    group: 'Records, access and the tenancy',
    itemNumber: '7.5',
    description: 'All rooms and areas accessed on this visit',
    outcome: '',
    hint: 'Answer Not seen where a room was locked, occupied or refused. It prints in the limitations, which is what protects you.',
  },
];
