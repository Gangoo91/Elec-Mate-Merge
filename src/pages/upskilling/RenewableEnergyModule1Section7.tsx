import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s7-part-p-scope',
    question:
      'Building Regulations Part P (England) governs what?',
    options: [
      'Energy efficiency',
      'Electrical safety in or attached to dwellings — making notifiable electrical work in dwellings a Building Control matter and setting the framework for either Competent Person Scheme self-certification or Building Control notification on every notifiable job',
      'Fire detection only',
      'Structural design',
    ],
    correctIndex: 1,
    explanation:
      'Approved Document P (Part P) sets the requirement for electrical safety in or attached to dwellings in England. Notifiable electrical work in dwellings (including most LCT installs) must either be self-certified by a Competent Person Scheme member (NICEIC, NAPIT, ELECSA, Stroma) or notified to Building Control before commencement. Wales has its own Part P; Scotland uses the Building (Scotland) Regulations 2004; Northern Ireland uses the Building Regulations (NI) 2012.',
  },
  {
    id: 'm1s7-part-l-scope',
    question:
      'Building Regulations Part L (England) covers energy efficiency. For an LCT installer doing a heat pump retrofit, which framing of Part L is most useful?',
    options: [
      'Part L is irrelevant to LCT work',
      'Part L sets the energy-efficiency framework that drives the heat pump retrofit case — the Future Homes Standard (effective 2025) mandates low-carbon heating in new builds, and Part L1B / L2B set the retrofit energy-efficiency requirements that pair with the LCT install',
      'Part L only applies to commercial buildings',
      'Part L has been withdrawn',
    ],
    correctIndex: 1,
    explanation:
      'Part L is the energy-efficiency framework — Part L1A (new dwellings), L1B (existing dwellings, including retrofit), L2A (new non-domestic), L2B (existing non-domestic). The Future Homes Standard (effective 2025 in England) mandates low-carbon heating in new builds, effectively making heat pumps the default for new-build heating systems. For retrofit work, Part L1B sets the energy-efficiency requirements that the LCT retrofit must respect.',
  },
  {
    id: 'm1s7-part-s',
    question:
      'Building Regulations Part S (England), effective 2022, requires what?',
    options: [
      'Solar panels on all new dwellings',
      'EV chargepoint provision in new dwellings with associated parking, and in new non-domestic buildings under certain conditions — setting the EV infrastructure framework for new-build developments',
      'BESS in all new dwellings',
      'Smart meters in all dwellings',
    ],
    correctIndex: 1,
    explanation:
      'Approved Document S sets the EV infrastructure requirement for new buildings in England from June 2022. New dwellings with associated parking spaces must have an EV chargepoint or, where one chargepoint is impractical, cable provision for a future chargepoint. New non-domestic buildings with parking must have specified proportions of EV chargepoints. Part S is the regulatory driver behind the new-build EV market and a key reason for the chargepoint volume on the supply-side projections.',
  },
  {
    id: 'm1s7-cps-vs-bc',
    question:
      'On a notifiable LCT job in an English dwelling, what are the two lawful notification routes?',
    options: [
      'CPS only',
      'Either (a) self-certification by a Competent Person Scheme member (NICEIC, NAPIT, ELECSA, Stroma) within 30 days of completion, or (b) notification to Building Control before the work commences',
      'Building Control only',
      'No notification required',
    ],
    correctIndex: 1,
    explanation:
      'Under Part P, notifiable electrical work in dwellings has two lawful notification routes. CPS self-certification (the typical route for CPS-registered installers — install first, notify the scheme within 30 days, scheme notifies Building Control on the installer\'s behalf) or Building Control notification (the route for non-CPS installers — notify Building Control before work commences, pay the inspection fee, Building Control inspects). Most LCT contractors use the CPS route because it is cheaper and faster.',
  },
  {
    id: 'm1s7-scotland-wales-ni',
    question:
      'For LCT work in Scotland and Northern Ireland, which framework applies?',
    options: [
      'Approved Document P (same as England)',
      'Scotland uses the Building (Scotland) Regulations 2004 with the Technical Handbooks (particularly Standard 4.5 Electrical Safety); Northern Ireland uses the Building Regulations (NI) 2012 with Technical Booklet E. The MCS scheme is UK-wide; the Building Regulations differ',
      'No regulations apply',
      'EU regulations apply',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 is UK-wide. MCS is UK-wide. The Building Regulations differ by nation. Scotland: Building (Scotland) Regulations 2004 plus Technical Handbooks (Section 4.5 Electrical Safety). Wales: own Part P (similar to but distinct from English Part P). Northern Ireland: Building Regulations (NI) 2012 plus Technical Booklet E. The notification routes also differ — Scotland uses local authority Building Standards rather than Building Control.',
  },
  {
    id: 'm1s7-future-homes-standard',
    question:
      'The Future Homes Standard takes effect in England from 2025. What is its practical impact on the LCT installer?',
    options: [
      'No impact',
      'New dwellings must produce 75–80% lower CO₂ emissions than 2013 standards, effectively mandating low-carbon heating (typically heat pumps) and tighter fabric efficiency. The standard is the regulatory driver behind much of the heat pump installer demand growth',
      'Only commercial buildings are affected',
      'Listed buildings are required to install heat pumps',
    ],
    correctIndex: 1,
    explanation:
      'The Future Homes Standard targets a 75–80% reduction in CO₂ emissions from new dwellings vs 2013 standards, achieved through low-carbon heating (heat pumps as the typical default), tighter fabric efficiency, and improved building services. For the LCT installer this is the regulatory driver behind the supply-side growth in heat pump volumes through the late 2020s.',
  },
  {
    id: 'm1s7-conservation-area',
    question:
      'A customer in a Conservation Area wants a PV array on a south-facing roof visible from the street. What is the survey-stage planning consideration?',
    options: [
      'No planning consideration — PV is always permitted development',
      'Conservation Area status may restrict permitted-development rights for visible-from-public-realm PV installs. Planning permission may be required even though PV on the rear of the same property would be permitted development. Check the local planning authority\'s policy and any Article 4 Direction in force',
      'Listed-building consent is automatically granted',
      'PV must be ground-mounted only',
    ],
    correctIndex: 1,
    explanation:
      'In England, permitted-development rights for rooftop PV are tightened in Conservation Areas where the PV would be on a roof slope visible from a road or highway. An Article 4 Direction may further restrict the rights. The survey identifies the Conservation Area status; the customer\'s planning conversation precedes the install quote. Listed buildings require listed-building consent regardless of permitted-development status.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A customer in England asks you to install a heat pump retrofit. Which Building Regulations Approved Documents are most directly engaged?',
    options: [
      'Part P alone',
      'Part L1B (energy efficiency in existing dwellings, sets the retrofit energy-efficiency framework), Part P (electrical safety in dwellings, sets the notifiable-work framework), Part F (ventilation, often affected by heat pump installation in cavity-wall properties), and Part B (fire safety, particularly relevant where BESS is paired)',
      'Part S only',
      'No Building Regulations apply to retrofit',
    ],
    correctAnswer: 1,
    explanation:
      'A heat pump retrofit in an existing English dwelling engages multiple Approved Documents. Part L1B for energy-efficiency requirements affecting the retrofit envelope. Part P for the notifiable electrical work. Part F for ventilation impact (heat pumps in well-insulated properties can shift the ventilation balance). Part B for fire safety where BESS is paired. The competent installer scopes the install across all relevant ADs at survey stage.',
  },
  {
    id: 2,
    question:
      'A CPS-registered installer (NICEIC) completes a notifiable LCT install in an English dwelling. What is the timing of the Part P notification?',
    options: [
      'Notify Building Control before commencement',
      'Self-certify via NICEIC within 30 days of completion — NICEIC notifies Building Control on the installer\'s behalf; the customer receives a compliance certificate; no pre-commencement notification needed',
      'Notify HMRC',
      'No notification required',
    ],
    correctAnswer: 1,
    explanation:
      'CPS self-certification is the standard route for CPS-registered installers on Part P notifiable work. The installer notifies the scheme within 30 days of completion, the scheme notifies Building Control, and the customer receives a Building Regulations compliance certificate. The route is cheaper and faster than direct Building Control notification.',
  },
  {
    id: 3,
    question:
      'Approved Document S (effective 2022 in England) requires EV chargepoint provision in new dwellings with parking. How does this interact with the LCT installer market?',
    options: [
      'It doesn\'t — Part S is a developer responsibility, not an installer responsibility',
      'Part S creates a structural demand pipeline for EV chargepoint installation in new-build developments. The LCT installer working with housebuilders is operating in a Part S-driven market — the chargepoint is part of the building handover, not a customer-discretionary addition',
      'Part S applies only to commercial buildings',
      'Part S has been withdrawn',
    ],
    correctAnswer: 1,
    explanation:
      'Part S creates the new-build EV chargepoint market — every new dwelling with parking gets a chargepoint or cable provision for one. For the LCT installer this is structural demand from the housebuilder side, separate from the retrofit market. Section 722 + Reg 722.411.4.1 still apply; the chargepoint design conversation is the same; the customer-acquisition pattern is different (housebuilder relationships vs end-customer marketing).',
  },
  {
    id: 4,
    question:
      'A customer in Scotland asks for a heat pump install. Which Building Standards framework applies?',
    options: [
      'Approved Document L (English)',
      'The Building (Scotland) Regulations 2004 plus the Technical Handbooks — particularly Section 6 (energy) for the heat pump energy-efficiency framework, Section 4 (safety) including Standard 4.5 for electrical safety, and Section 3 (environment) for ventilation impact',
      'No regulations apply in Scotland',
      'Northern Irish Building Regulations apply',
    ],
    correctAnswer: 1,
    explanation:
      'Scotland operates under the Building (Scotland) Regulations 2004 with the Technical Handbooks providing the operational detail. Section 6 covers energy (the parallel to English Part L). Section 4 covers safety, including Standard 4.5 electrical safety (the parallel to Part P). Notification is via the local authority Building Standards office, not Building Control. The MCS scheme is UK-wide.',
  },
  {
    id: 5,
    question:
      'The Future Homes Standard effectively mandates low-carbon heating in new-build dwellings in England from 2025. Strategic implication for the established gas-boiler installer:',
    options: [
      'No change',
      'The new-build heating market is shifting away from gas boilers. The MIS 3003 (heat pump) competence pathway becomes a market-access requirement, not an optional CPD topic. The installer who delays the MIS 3003 investment is the one who loses access to the new-build market over the next 5–10 years',
      'Heat pump training is a temporary trend',
      'Gas boilers will be reinstated',
    ],
    correctAnswer: 1,
    explanation:
      'The Future Homes Standard makes the heat pump the typical default for new-build heating. The gas-boiler installer who doesn\'t add MIS 3003 capability over the next 5 years is exiting the new-build market by default. The strategic decision is whether to invest in heat pump competence proactively or accept the market contraction.',
  },
  {
    id: 6,
    question:
      'A customer\'s property is in a Conservation Area in England. PV install is proposed on a roof slope visible from the road. Survey-stage planning conversation:',
    options: [
      'PV is always permitted development',
      'Conservation Area status restricts permitted-development rights for visible-from-public-realm PV. Check the local planning authority\'s policy. Check whether an Article 4 Direction is in force (which further restricts permitted-development rights). Planning permission may be required even where the same install would be PD on a non-Conservation Area property',
      'Move the install to the rear roof slope only',
      'Decline the job',
    ],
    correctAnswer: 1,
    explanation:
      'PV in Conservation Areas in England loses some permitted-development rights where the array is visible from public realm. Article 4 Directions can further restrict PD rights. The local planning authority\'s policy is the operational reference. The survey identifies the Conservation Area status; the planning conversation precedes the install quote; the customer may need to apply for planning permission before the install can proceed.',
  },
  {
    id: 7,
    question:
      'On a notifiable electrical install in a Welsh dwelling, the notification framework is:',
    options: [
      'Identical to English Part P',
      'Wales has its own Part P (similar but distinct from English Part P) and operates the same CPS / Building Control notification routes through Welsh competent person schemes and Welsh local authority Building Control',
      'Scotland\'s Section 4',
      'No notification required in Wales',
    ],
    correctAnswer: 1,
    explanation:
      'Wales has its own Approved Document P, similar in scope to English Part P. The notification routes are equivalent — CPS self-certification through Welsh-recognised schemes, or Building Control notification through Welsh local authorities. The MCS scheme is UK-wide, so the LCT funding gates work the same way.',
  },
  {
    id: 8,
    question:
      'A customer asks whether their listed-building status affects the LCT install. The right survey-stage answer:',
    options: [
      'Listed-building status doesn\'t affect electrical work',
      'Listed-building status materially affects what can be installed where and how. Listed-building consent is typically required for external alterations even where planning permission is not. Conservation officers can refuse PV / BESS / heat pump installs that compromise the building\'s historic character. The survey records the listed-building status, identifies the relevant consents, and flags the listed-building consent timeline as a project gating item',
      'Listed buildings are exempt from BS 7671',
      'Listed-building consent is automatic',
    ],
    correctAnswer: 1,
    explanation:
      'Listed-building status affects LCT installs at multiple points. External alterations (PV array, ASHP outdoor unit, EV chargepoint with visible cabling, BESS in a visible location) typically require listed-building consent. The local authority\'s conservation officer reviews the application. Refusal is possible where the install compromises historic character. The survey-stage conversation flags the listed-building consent as a project gating item with its own timeline — separate from planning permission and Building Control notification.',
  },
];

const faqs = [
  {
    question:
      'Part P notification — is the CPS self-certification route actually faster than Building Control?',
    answer:
      'Substantially faster and cheaper. CPS self-certification: the installer notifies the scheme within 30 days of completion; the scheme notifies Building Control automatically; the customer receives a compliance certificate within weeks. Building Control: the installer notifies before commencement; pays a fee (typically £100–£300 depending on local authority); Building Control inspects during or after the work. For a CPS-registered installer, the self-certification route is the standard practice.',
  },
  {
    question:
      'What counts as "notifiable" electrical work in dwellings under Part P?',
    answer:
      'Notifiable work in England includes: installation of a new circuit; replacement of a consumer unit; any work in special locations (bathrooms, around swimming pools, saunas) regardless of circuit; and additions or alterations to circuits in special locations. Most LCT installs are notifiable — adding a dedicated EV circuit, a dedicated PV / BESS circuit, a dedicated heat pump circuit, or replacing the CU for the LCT install. The 2013 simplification removed some categories from notifiability; the LCT-relevant categories remain notifiable.',
  },
  {
    question:
      'Part L and the Future Homes Standard — are heat pumps actually mandated in new builds from 2025?',
    answer:
      'Effectively yes, though not by direct mandate. The Future Homes Standard targets a 75–80% reduction in CO₂ emissions from new dwellings vs 2013 standards. Achieving that with a gas boiler is impractical; heat pumps become the typical default. Some builders may achieve compliance with hybrid heat pumps, district heat networks, or biomass in eligible locations, but the heat pump is the dominant solution for the new-build heating market from 2025 onwards.',
  },
  {
    question:
      'Part S (EV chargepoint requirement) — what proportion of new dwellings actually get a chargepoint installed?',
    answer:
      'In England under Part S, new dwellings with associated parking spaces must have an EV chargepoint, with limited exceptions where chargepoint installation is impractical (in which case cable provision for a future chargepoint is required). For new non-domestic buildings, the requirement is a specified proportion of parking spaces with chargepoints. The practical effect is that the new-build chargepoint market is now structural — almost all new dwellings with parking ship with a chargepoint, creating the supply-chain pipeline for the volume forecasts.',
  },
  {
    question:
      'How do I tell whether a customer\'s LCT install needs planning permission?',
    answer:
      'Most domestic LCT installs in England fall under permitted-development rights (no planning permission required) — subject to conditions. Rooftop PV: PD subject to size limits and the array not protruding above the roof ridge. Heat pump outdoor unit: PD subject to size, location and noise limits. EV chargepoint: PD in most cases. Exceptions where PD does NOT apply: Conservation Areas (for visible-from-public-realm installs); listed buildings (where listed-building consent is required regardless); Article 4 Direction areas (where PD rights are locally restricted); flats / maisonettes (more restrictive PD framework). The survey identifies the property designation; the planning conversation precedes the install quote.',
  },
  {
    question:
      'What\'s the relationship between Building Control notification and CPS notification?',
    answer:
      'They are two routes to the same legal endpoint: Building Control informed of notifiable electrical work. CPS notification: the installer notifies the CPS scheme (NICEIC / NAPIT / ELECSA / Stroma); the scheme notifies Building Control; the customer receives a compliance certificate. Direct Building Control notification: the installer notifies Building Control directly before commencement; Building Control inspects; Building Control issues completion certificate. For CPS-registered installers, the CPS route is the standard. For non-CPS installers, Building Control direct is the route. Both end at the same place — Building Control has a record of the notifiable work.',
  },
  {
    question:
      'A customer in Northern Ireland asks for a heat pump install. How does the regulatory landscape differ?',
    answer:
      'Northern Ireland operates under the Building Regulations (NI) 2012 with Technical Booklet E (electrical), Technical Booklet F1 (energy in dwellings), and other relevant Booklets. Notification is via the District Council Building Control rather than English Building Control. The Electricity at Work Regulations (NI) 1991 covers the statutory hook. BS 7671 applies; MCS is UK-wide; the funding mechanisms in NI differ from BUS (NI operates its own Energy Strategy with separate grants). The cert form is BS 7671 standard; the notification regime is NI-specific.',
  },
  {
    question:
      'What\'s the impact of Building Regulations Part B (fire safety) on a BESS install?',
    answer:
      'Part B affects BESS siting decisions, particularly in dwellings. Compartmentation rules — the BESS should not compromise escape routes; certain locations (under-stairs, bedrooms, lofts) are typically unsuitable. Fire-rating of enclosures where the BESS is in a shared-occupancy building (e.g. flats / HMOs). The IET Code of Practice for Electrical Energy Storage Systems is the operational reference for fire-safety arrangements specific to BESS chemistry. The competent installer reads Part B alongside Chapter 57 and the IET CoP at survey stage.',
  },
  {
    question:
      'Where does Approved Document Q (security) fit in?',
    answer:
      'Approved Document Q (security in dwellings) is rarely the primary regulation on an LCT install, but it can be relevant where the LCT install involves security-relevant features — EV chargepoint cable routing, BESS isolation accessibility, EV chargepoint location relative to building security. Most LCT installs do not engage Part Q directly. Where the LCT install requires modifications to security features (door locks, window openings, cable runs through secured surfaces), the Part Q requirements should be considered.',
  },
];

export default function RenewableEnergyModule1Section7() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Building Regulations Part L, Part P & Building Control for LCT | Renewable Energy 1.7 | Elec-Mate',
    description:
      'Where the Building Regulations bite on LCT installs — Part L energy efficiency (and the Future Homes Standard), Part P electrical safety in dwellings, Part S EV infrastructure, plus the Scottish, Welsh and Northern Irish frameworks.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 7 · BS 7671:2018+A4:2026"
            title="Building Regulations Part L, Part P & Building Control for LCT"
            description="Where the Building Regulations bite on LCT installs — Part L energy efficiency (and the Future Homes Standard), Part P electrical safety in dwellings, Part S EV infrastructure, plus the Scottish, Welsh and Northern Irish equivalents."
            tone="yellow"
          />

          <TLDR
            points={[
              'Building Regulations Part P (England and Wales) governs electrical safety in dwellings. Notifiable electrical work is either CPS self-certified within 30 days or Building Control notified before commencement.',
              'Building Regulations Part L sets the energy-efficiency framework. The Future Homes Standard (effective 2025 in England) effectively mandates low-carbon heating in new builds.',
              'Building Regulations Part S (England, effective 2022) requires EV chargepoint provision in new dwellings with associated parking — creating the structural new-build chargepoint market.',
              'Scotland operates under the Building (Scotland) Regulations 2004 with Technical Handbooks; Northern Ireland under the Building Regulations (NI) 2012 with Technical Booklets. MCS is UK-wide.',
              'Planning, listed-building consent, Conservation Area restrictions and Article 4 Directions can constrain LCT installs even where Building Regulations notification is straightforward.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify which Approved Documents apply to a given LCT install — Part P (electrical safety), Part L (energy efficiency), Part S (EV infrastructure), Part F (ventilation), Part B (fire safety where BESS is engaged).',
              'Apply the Part P notification routes correctly — CPS self-certification (the standard route for CPS-registered installers) or Building Control notification before commencement (the non-CPS route).',
              'Read the Future Homes Standard (effective 2025) as the regulatory driver behind new-build heat pump volume, and align MIS 3003 capability investment to that demand pipeline.',
              'Anticipate Part S as the structural pipeline for new-build EV chargepoint volume — separate from the retrofit market, accessed through housebuilder relationships.',
              'Navigate the Scottish, Welsh and Northern Irish Building Regulations frameworks where the customer\'s property is in those jurisdictions.',
              'Identify planning constraints (permitted development, Conservation Areas, listed buildings, Article 4 Directions) at survey stage rather than after the quote.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Part P is the safety route. Part L is the efficiency route. Part S is the EV route.</Pullquote>

          <ContentEyebrow>The Approved Documents the LCT installer needs to know</ContentEyebrow>

          <ConceptBlock
            title="The four Approved Documents most directly engaged by LCT work"
            plainEnglish="Most LCT installs in England engage four Approved Documents at once. Part P (electrical safety), Part L (energy efficiency), Part S (EV infrastructure), and depending on scope Part F (ventilation), Part B (fire safety) and Part Q (security)."
            onSite="On a hybrid install, walk the relevant ADs at survey stage. The notification routes differ per AD. The CPS self-certification covers Part P; other ADs may require separate consideration."
          >
            <p>The most LCT-relevant Approved Documents (England):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Part P</strong> — Electrical safety in
                dwellings. Notifiable work either CPS self-certified or Building Control
                notified.
              </li>
              <li>
                <strong className="text-white">Part L</strong> — Energy efficiency. L1A
                (new dwellings), L1B (existing dwellings), L2A (new non-domestic), L2B
                (existing non-domestic). The Future Homes Standard from 2025 tightens
                Part L1A substantially.
              </li>
              <li>
                <strong className="text-white">Part S</strong> — EV chargepoint provision
                in new dwellings and non-domestic buildings (effective June 2022).
              </li>
              <li>
                <strong className="text-white">Part F</strong> — Ventilation. Heat pump
                installs in well-sealed properties can shift the ventilation balance and
                trigger Part F considerations.
              </li>
              <li>
                <strong className="text-white">Part B</strong> — Fire safety. Particularly
                relevant where BESS is paired (siting, compartmentation, escape route
                preservation).
              </li>
              <li>
                <strong className="text-white">Part Q</strong> — Security in dwellings.
                Rarely the primary regulation but engaged where the LCT install requires
                modifications to security features.
              </li>
            </ul>
            <p>
              Wales has its own equivalents of these Approved Documents — typically similar
              in scope but distinct in detail. Scotland and Northern Ireland use different
              regulatory frameworks entirely.
            </p>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="LCT Building Regulations engagement map — which Approved Document applies to which LCT activity. Part P → all notifiable electrical work in dwellings. Part L → heat pump retrofit energy-efficiency framework. Part S → new-build EV chargepoint provision. Part F → ventilation impact on heat pumps. Part B → BESS fire-safety considerations."
            filename="renewable/m1s7-building-regs-map.png"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Part P notification — the CPS route vs the Building Control route</ContentEyebrow>

          <Pullquote>CPS self-certification is the LCT installer\'s standard Part P route.</Pullquote>

          <ConceptBlock
            title="The two lawful Part P notification routes — and why CPS dominates"
            plainEnglish="Part P notifiable electrical work in English dwellings has two lawful notification routes. CPS self-certification (within 30 days of completion) or Building Control notification (before commencement)."
            onSite="CPS-registered LCT installers use CPS self-certification on every notifiable job. The marginal cost of CPS membership is repaid many times over in the workflow advantage on every notification."
          >
            <p>The two notification routes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CPS self-certification</strong> — installer
                completes the work, notifies the CPS scheme (NICEIC, NAPIT, ELECSA,
                Stroma) within 30 days, scheme notifies Building Control on the
                installer\'s behalf, customer receives a Building Regulations compliance
                certificate within weeks.
              </li>
              <li>
                <strong className="text-white">Building Control notification</strong> —
                installer notifies Building Control before commencement, pays an
                inspection fee (typically £100–£300), Building Control inspects during or
                after the work, Building Control issues a completion certificate.
              </li>
            </ul>
            <p>
              For a CPS-registered LCT installer, the self-certification route is
              materially cheaper and faster:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>No pre-commencement notification required</li>
              <li>No Building Control inspection visit needed</li>
              <li>No per-job inspection fee</li>
              <li>Compliance certificate delivered to customer within weeks</li>
            </ul>
            <p>
              The Building Control route is the non-CPS installer\'s only lawful route on
              notifiable work. The Building Control fee plus the inspection time cost
              typically exceeds the annual CPS membership fee within 5–10 notifiable jobs —
              meaning CPS membership pays for itself for any installer doing routine LCT
              work.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Part L and the Future Homes Standard</ContentEyebrow>

          <Pullquote>Future Homes Standard 2025 = heat pumps in new builds, by default.</Pullquote>

          <ConceptBlock
            title="The Future Homes Standard — and what it does to the LCT installer market"
            plainEnglish="The Future Homes Standard tightens Part L1A for new dwellings to 75–80% CO₂ reduction vs 2013. Achieving that with a gas boiler is impractical. Heat pumps become the typical default."
            onSite="The LCT installer chasing the new-build heating market needs MIS 3003 capability from 2025 onwards. The gas-boiler-only installer is exiting the new-build market by default — slowly through the late 2020s, faster as housebuilders standardise heat-pump specifications."
          >
            <p>
              Part L covers energy efficiency in buildings. The four documents:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Part L1A</strong> — Conservation of fuel
                and power in new dwellings
              </li>
              <li>
                <strong className="text-white">Part L1B</strong> — Conservation of fuel
                and power in existing dwellings (the retrofit framework)
              </li>
              <li>
                <strong className="text-white">Part L2A</strong> — Conservation of fuel
                and power in new non-domestic buildings
              </li>
              <li>
                <strong className="text-white">Part L2B</strong> — Conservation of fuel
                and power in existing non-domestic buildings
              </li>
            </ul>
            <p>
              The Future Homes Standard takes effect in England from 2025. The target is
              a 75–80% reduction in CO₂ emissions from new dwellings vs 2013 standards.
              Practical compliance routes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Low-carbon heating (typically air source or ground source heat pumps)</li>
              <li>Tighter fabric efficiency (insulation, glazing, air-tightness)</li>
              <li>Improved building services (mechanical ventilation with heat recovery, where applicable)</li>
              <li>Higher efficiency hot-water systems (paired with the heat pump)</li>
              <li>Solar PV (typically alongside, not instead of, the heat pump)</li>
            </ul>
            <p>
              For the LCT installer, the Future Homes Standard is the regulatory driver
              behind the heat pump demand projections. The MIS 3003 investment is a
              market-access requirement for the new-build heating market from 2025
              onwards.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Part S — the new-build EV chargepoint market</ContentEyebrow>

          <ConceptBlock
            title="Part S (effective June 2022) — the EV infrastructure requirement"
            plainEnglish="Part S requires EV chargepoint provision in new dwellings with associated parking, and in new non-domestic buildings under certain conditions. This is the structural new-build EV market."
            onSite="The LCT installer working with housebuilders is operating in a Part S-driven market. The chargepoint is part of the building handover — not a customer-discretionary addition negotiated later."
          >
            <p>Part S requirements (England, effective June 2022):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">New dwellings with parking</strong> — must
                have an EV chargepoint, or where impractical, cable provision for a
                future chargepoint
              </li>
              <li>
                <strong className="text-white">New non-domestic buildings with parking</strong>
                {' '}— specified proportions of parking spaces with chargepoints, depending
                on building type and number of spaces
              </li>
              <li>
                <strong className="text-white">Major renovations</strong> — may trigger
                Part S requirements where the renovation affects the parking provision or
                the electrical infrastructure
              </li>
            </ul>
            <p>
              The chargepoint must meet BS 7671 Section 722 (including A4:2026\'s
              722.411.4.1 PEN-fault protective measure on PME supplies) and the
              manufacturer\'s installation instructions. The cert evidence bundle is
              standard — EIC, MCS where applicable, DNO notification.
            </p>
            <p>
              For the LCT installer, Part S creates two distinct customer-acquisition
              patterns. Retrofit chargepoints sold direct to end customers (the
              traditional market). New-build chargepoints sold via housebuilder
              relationships (the Part S-driven market). The two markets have different
              economics — new-build is higher-volume, lower-margin, longer-relationship;
              retrofit is lower-volume, higher-margin, transaction-based.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Scotland, Wales, Northern Ireland — the parallel frameworks</ContentEyebrow>

          <ConceptBlock
            title="The Scottish, Welsh and Northern Irish frameworks — same outcomes, different routes"
            plainEnglish="BS 7671 is UK-wide. MCS is UK-wide. The Building Regulations differ by nation. The cert form is the same; the notification regime and funding mechanism differ."
            onSite="When working outside England, check which national framework applies — the Approved Documents you\'re used to (English Part P / L / S) don\'t apply. The equivalents do."
          >
            <p>The national frameworks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">England</strong> — Building Regulations
                2010 with Approved Documents P, L (L1A/L1B/L2A/L2B), S, F, B, Q. Future
                Homes Standard effective 2025.
              </li>
              <li>
                <strong className="text-white">Wales</strong> — Own Approved Documents
                similar in scope to English ADs. Welsh Part P is the parallel to English
                Part P. CPS schemes operate in Wales the same way.
              </li>
              <li>
                <strong className="text-white">Scotland</strong> — Building (Scotland)
                Regulations 2004 with the Technical Handbooks. Section 4 (safety,
                including Standard 4.5 electrical safety) is the Part P parallel.
                Section 6 (energy) is the Part L parallel. Notification via local
                authority Building Standards.
              </li>
              <li>
                <strong className="text-white">Northern Ireland</strong> — Building
                Regulations (NI) 2012 with Technical Booklets. Technical Booklet E
                (electrical) is the Part P parallel. Notification via District Council
                Building Control. Electricity at Work Regulations (NI) 1991 replaces
                EAWR 1989.
              </li>
            </ul>
            <p>The funding mechanisms also differ by nation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">England and Wales</strong> — Boiler Upgrade Scheme, SEG, ECO4 / GBIS</li>
              <li><strong className="text-white">Scotland</strong> — Home Energy Scotland grants and loans, SEG</li>
              <li><strong className="text-white">Northern Ireland</strong> — NI Energy Strategy grants, SEG-equivalent arrangements</li>
            </ul>
            <p>
              MCS is the UK-wide scheme — the installer competence layer travels across
              the four nations. The Building Regulations and the funding mechanisms are
              the nation-specific layers.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Planning, listed buildings and Conservation Areas</ContentEyebrow>

          <Pullquote>Planning is a survey-stage conversation, not an install-stage discovery.</Pullquote>

          <ConceptBlock
            title="Permitted development vs planning permission for LCT"
            plainEnglish="Most domestic LCT installs fall under permitted-development rights — no planning permission required. The exceptions are the survey-stage items: Conservation Areas, listed buildings, Article 4 Directions, flats / maisonettes."
            onSite="At survey stage, check the property designation. PD rights are the default; the exceptions are what trigger the planning conversation. Identify them at survey, not after the quote."
          >
            <p>Permitted-development rights for domestic LCT in England (subject to conditions):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Rooftop PV</strong> — PD subject to size
                limits and the array not protruding above the roof ridge
              </li>
              <li>
                <strong className="text-white">Heat pump outdoor unit</strong> — PD
                subject to size, siting and noise limits (the MIS 3003 noise calculation
                is the operational reference)
              </li>
              <li>
                <strong className="text-white">EV chargepoint</strong> — PD in most cases
                for domestic chargepoints
              </li>
              <li>
                <strong className="text-white">Domestic BESS</strong> — generally PD when
                installed in or attached to a dwelling
              </li>
            </ul>
            <p>Exceptions where PD does NOT apply:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Conservation Areas</strong> — visible-from-
                public-realm installs (PV on a road-facing roof slope, externally
                mounted heat pump units, externally visible EV chargepoints) may lose PD
                rights
              </li>
              <li>
                <strong className="text-white">Listed buildings</strong> — listed-building
                consent typically required for external alterations regardless of PD
                status
              </li>
              <li>
                <strong className="text-white">Article 4 Directions</strong> — local
                planning authority restrictions that further constrain PD rights in
                specified areas
              </li>
              <li>
                <strong className="text-white">Flats and maisonettes</strong> — more
                restrictive PD framework; freeholder consent typically required
              </li>
            </ul>
            <p>
              The survey captures the property designation in writing. The planning
              conversation precedes the install quote. Where planning permission or
              listed-building consent is required, the timeline becomes part of the
              project plan.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A hybrid PV + heat pump install on a Grade II listed Welsh dwelling in a Conservation Area"
            situation="A homeowner of a Grade II listed dwelling in a Welsh Conservation Area asks for a 4 kWp PV array on the south-facing rear roof slope and an ASHP at the rear of the property. The Welsh equivalent of Part P applies; the Welsh planning framework restricts visible installations."
            whatToDo="Survey identifies three regulatory tracks running in parallel. (1) Building Regulations — Welsh Part P notification via CPS self-certification (standard route); Welsh Part L1B for the heat pump retrofit energy-efficiency framework. (2) Planning permission — Conservation Area status checked; the rear-roof PV may retain PD rights (not visible from public realm); the rear-mounted ASHP outdoor unit may also be PD subject to noise and siting limits. (3) Listed-building consent — required for external alterations on a Grade II listed building regardless of PD status. Conservation officer engagement at survey stage. The install timeline includes the listed-building consent timeline (typically 8–12 weeks). The cert evidence bundle: BS 7671 EIC, CPS notification reference, MCS certificates (MIS 3002 PV + MIS 3003 heat pump), DNO G98 / G99 notification, listed-building consent reference, customer handover pack."
            whyItMatters="The installer who quotes the install without identifying the listed-building consent requirement faces a project block at install commencement — the local authority will not allow external alterations without the consent. The honest survey captures the consent requirement and reflects it in the project plan; the customer\'s timeline expectation is set by the survey, not the imagined-install conversation."
          />

          <CommonMistake
            title="Treating Part P notification as a post-install paperwork item"
            whatHappens="The installer completes a notifiable LCT install — typically replacing a CU for a hybrid install — and forgets to submit the CPS notification within the 30-day window. The notification deadline passes. The customer chases the compliance certificate; the installer realises the gap; submission outside the window is treated as a late notification by the scheme, with administrative penalties or audit consequences."
            doInstead="Build the CPS notification into the post-install workflow. The 30-day window starts at completion, not at customer payment. Most CPS schemes provide online notification systems that can be completed in minutes; setting up a same-week notification habit is the right discipline. The cost of a late notification is small but cumulative; the cost of a missed notification is the loss of self-certification rights for that job."
          />

          <CommonMistake
            title="Missing the planning conversation on a Conservation Area customer"
            whatHappens="The installer treats every domestic PV install as PD by default. The customer\'s property is in a Conservation Area, and the proposed install is on a road-visible roof slope. The install proceeds; a neighbour reports it to the local planning authority; the LPA serves a planning contravention notice; the customer is required to remove the install at their cost; the customer disputes with the installer."
            doInstead="At survey stage, identify the Conservation Area status (the local planning authority\'s online maps show CA boundaries). On Conservation Area properties, check the proposed install position against the visible-from-public-realm test; check whether an Article 4 Direction is in force; check the LPA\'s policy on PV in CAs. Where planning permission is required, build the timeline into the project plan and the quote."
          />

          <CommonMistake
            title="Treating the Future Homes Standard as a future problem"
            whatHappens="An installer with strong general electrical capability and a gas-boiler-only heating background continues to take new-build heating work in 2025 on the assumption that compliance routes other than heat pumps will remain viable. The new-build customer base shifts to heat-pump standardisation faster than expected; the installer\'s heating work disappears; the MIS 3003 training that should have been completed in 2023–2024 is now an emergency requirement to retain market access."
            doInstead="The Future Homes Standard is not a future problem — it is the regulatory driver behind the current shift in new-build heating. MIS 3003 (heat pump) competence is the market-access requirement. Investing in MIS 3003 in 2024–2025 is materially cheaper than the same investment under time pressure in 2026–2027. The supply-constraint analysis in Section 1.1 applies — the qualified entrant captures the pricing power."
          />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Building Regulations Part P (England and Wales) governs electrical safety in dwellings. Two lawful notification routes: CPS self-certification or Building Control notification.',
              'Building Regulations Part L sets the energy-efficiency framework. The Future Homes Standard (effective 2025 in England) effectively mandates heat pumps in new-build dwellings.',
              'Building Regulations Part S (England, effective 2022) requires EV chargepoint provision in new dwellings with parking — the structural new-build EV market driver.',
              'Scotland, Wales and Northern Ireland operate parallel Building Regulations frameworks with their own equivalents of the English Approved Documents. MCS is UK-wide.',
              'Planning permission is mostly not required for domestic LCT under permitted-development rights. Exceptions: Conservation Areas, listed buildings, Article 4 Directions, flats / maisonettes.',
              'For CPS-registered LCT installers, the CPS self-certification route on Part P is materially cheaper and faster than Building Control notification — and the membership cost is recovered within 5–10 notifiable jobs.',
              'The funding mechanisms differ by nation — BUS in England and Wales, Home Energy Scotland in Scotland, NI Energy Strategy grants in Northern Ireland — but the MCS gate works the same way across all four nations.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1.6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Site survey first principles
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.8 Notifications &amp; certs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
