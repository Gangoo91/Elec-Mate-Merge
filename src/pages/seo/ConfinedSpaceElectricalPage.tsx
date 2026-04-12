import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  HardHat,
  FileCheck2,
  ClipboardCheck,
  Lock,
  Zap,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Health & Safety', href: '/guides/electrical-safety-at-home' },
  { label: 'Confined Space Electrical Work', href: '/confined-space-electrical' },
];

const tocItems = [
  { id: 'what-is-confined-space', label: 'What Counts as a Confined Space' },
  { id: 'legal-framework', label: 'Legal Framework — 1997 Regulations' },
  { id: 'gas-testing', label: 'Gas Testing and Atmospheric Monitoring' },
  { id: 'entry-team', label: 'Entry, Standby, and Rescue Team' },
  { id: 'electrical-hazards', label: 'Electrical Hazards in Confined Spaces' },
  { id: 'atex-equipment', label: 'ATEX Equipment' },
  { id: 'permit-to-work', label: 'Permit to Work' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Confined Spaces Regulations 1997 apply to all work in confined spaces in Great Britain. They require that work in confined spaces be avoided wherever possible. Where it cannot be avoided, a safe system of work must be followed and rescue arrangements must be in place before entry.',
  'A confined space does not have to be small. The legal definition covers any place that is substantially enclosed and where there is a foreseeable risk of serious injury due to dangerous substances, gases, liquids, free-flowing solids, fire, explosion, lack of oxygen, or inability to escape in an emergency. Manholes, cable ducts, tanks, vessels, sewers, and enclosed rooms can all qualify.',
  'Atmospheric monitoring must be carried out before and continuously during confined space work. The key measurements are oxygen level (should be between 19.5% and 23.5%), flammable gases (must be below 10% of the lower explosive limit), and toxic gases such as hydrogen sulphide and carbon monoxide.',
  'Three roles are required for confined space entry: the entrant (the person doing the work), the standby person (outside the space, monitoring, maintaining communications, and ready to initiate rescue), and the rescue team (competent to effect a rescue without entering if possible). The standby person must not enter the space to mount a rescue alone.',
  'All electrical equipment used in confined spaces classified as potentially explosive atmospheres must comply with the ATEX Directive (Equipment and Protective Systems Intended for Use in Potentially Explosive Atmospheres Regulations 2016). Using non-ATEX equipment in a flammable atmosphere can cause explosion.',
];

const faqs = [
  {
    question: 'What is the legal definition of a confined space?',
    answer:
      'The Confined Spaces Regulations 1997 define a confined space as any place, including any chamber, tank, vat, silo, pit, trench, pipe, sewer, flue, well, or similar space in which, by virtue of its enclosed nature, there arises a reasonably foreseeable specified risk. The specified risks include: injury from fire or explosion; loss of consciousness from elevated body temperature; loss of consciousness or asphyxiation from gas, fume, vapour, or lack of oxygen; drowning; asphyxiation from a free-flowing solid; or inability to reach a safe posture due to the nature of the space. Size is not the determining factor — risk is.',
  },
  {
    question: 'Do the Confined Spaces Regulations 1997 apply to cable ducts and conduit runs?',
    answer:
      'They can do, depending on the characteristics of the specific duct or conduit run. If the duct is substantially enclosed, entry requires a person to fully enter the space (not just reach in), and there is a foreseeable risk of the specified risks — particularly oxygen depletion from stale air, or flammable gases from adjacent services — then the regulations apply. Cable duct entries in substation environments, near gas mains, or in sewage infrastructure are particularly likely to require confined space procedures. Always carry out a risk assessment before entry.',
  },
  {
    question: 'What atmospheric testing is required before entering a confined space?',
    answer:
      'Before entry, the atmosphere must be tested for oxygen level (must be between 19.5% and 23.5% — below 19.5% causes oxygen deficiency, above 23.5% creates fire risk), flammable gases and vapours (must be below 10% of the lower explosive limit, LEL), and toxic gases relevant to the space (hydrogen sulphide in sewers and drainage, carbon monoxide in any space where combustion engines have operated, carbon dioxide in fermentation or underground spaces). Testing must be carried out from outside the space using a calibrated multi-gas detector with an integral pump to draw the sample. Do not rely on the appearance or smell of the atmosphere.',
  },
  {
    question: 'Can one person carry out confined space electrical work?',
    answer:
      'No. The Confined Spaces Regulations 1997 require that a rescue arrangement be in place before any person enters a confined space. At minimum, a standby person must be stationed outside the space throughout the period of entry. The standby person must maintain communication with the entrant, monitor the atmosphere at the entry point, and be able to initiate rescue without entering the space themselves. For high-risk confined spaces, a full rescue team must be present. Solo entry into a confined space is a serious breach of the regulations and has resulted in multiple fatalities where would-be rescuers have also died.',
  },
  {
    question: 'What does ATEX mean for electrical equipment in confined spaces?',
    answer:
      'ATEX (from the French "ATmosphères EXplosibles") refers to the European directives on equipment for use in potentially explosive atmospheres. In the UK, the relevant legislation is the Equipment and Protective Systems Intended for Use in Potentially Explosive Atmospheres Regulations 2016 (as retained in UK law). ATEX equipment is classified by zone (the likelihood of a flammable atmosphere being present) and group (the type of flammable substance). All electrical equipment — including torches, gas detectors, radios, and test instruments — used in a zone that has a flammable atmosphere must be rated for that zone. A spark from non-ATEX equipment in a zone containing flammable gas can cause an explosion.',
  },
  {
    question: 'Is a permit to work always required for confined space entry?',
    answer:
      'The Confined Spaces Regulations 1997 do not specifically mandate a permit to work system, but the HSE\'s Approved Code of Practice (L101) strongly recommends permits for all but the lowest-risk confined space entries. For electrical work in confined spaces — which involves additional hazards including electric shock, arc flash, and the use of test equipment that could ignite a flammable atmosphere — a permit to work is considered best practice and is required by most principal contractors and industrial clients. The permit confirms that the space has been gas-tested, isolations are in place, rescue arrangements are confirmed, and the hazards have been assessed.',
  },
  {
    question: 'What voltage equipment should I use for electrical work in confined spaces?',
    answer:
      'The HSE recommends using the lowest voltage practicable for electrical work in confined spaces. Centre-tapped earth (CTE) 110V AC from a transformer is the preferred supply for portable power tools in confined spaces and construction sites generally. Battery-powered LED lighting is preferred over mains-voltage portable lighting. Where 230V is unavoidable, RCD protection with a rated operating current of 30mA is mandatory. All equipment must be in good condition and its cables must not be damaged by the confined space environment (sharp edges, moisture, chemicals). In potentially explosive atmospheres, only ATEX-rated equipment must be used regardless of voltage.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/lockout-tagout-guide',
    title: 'Lockout Tagout Guide',
    description: 'Safe isolation procedures — essential before any confined space electrical work.',
    icon: Lock,
    category: 'Safety',
  },
  {
    href: '/electrical-rescue-procedure',
    title: 'Electrical Rescue Procedure',
    description: 'Electric shock first aid — critical knowledge for confined space work.',
    icon: AlertTriangle,
    category: 'Safety',
  },
  {
    href: '/electrical-accident-reporting',
    title: 'Accident Reporting Guide',
    description: 'RIDDOR 2013 reporting for confined space incidents and dangerous occurrences.',
    icon: ClipboardCheck,
    category: 'Safety',
  },
  {
    href: '/guides/electrical-safety-at-home',
    title: 'Electrical Safety Guide',
    description: 'Complete UK electrical safety reference for qualified electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/rams-generator',
    title: 'RAMS Generator',
    description: 'Generate confined space risk assessments and method statements.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-confined-space',
    heading: 'What Counts as a Confined Space',
    content: (
      <>
        <p>
          Many electricians do not realise that the spaces they work in regularly — cable ducts,
          meter rooms, plant rooms, tank rooms, and even large void spaces — may meet the legal
          definition of a confined space. The definition is based on risk, not size.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manholes and inspection chambers</strong> — particularly in drainage,
                sewage, and telecoms infrastructure. Risk of hydrogen sulphide (H₂S) — the silent
                killer that destroys the sense of smell at high concentrations before causing loss
                of consciousness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tanks and vessels</strong> — including water storage tanks, chemical storage
                tanks (where previous contents may create toxic or flammable atmospheres), and
                enclosed plant rooms. Oxygen depletion is a common risk in sealed tanks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable ducts and conduit systems</strong> — large cable ducts requiring
                physical entry may qualify, particularly in substation environments or where adjacent
                gas mains create a risk of gas ingress.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Roof voids, floor voids, and ceiling voids</strong> — particularly in
                older buildings where decomposing material may produce carbon dioxide, or in
                buildings near gas mains where leakage is possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Substation and switchgear rooms</strong> — SF6 (sulphur hexafluoride)
                gas used in modern switchgear is heavier than air and can accumulate at low level,
                displacing oxygen and causing asphyxiation with no warning.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When in doubt, treat the space as a confined space and apply the appropriate controls.
          The cost of unnecessary precautions is minor compared to the cost of a fatality.
        </p>
      </>
    ),
  },
  {
    id: 'legal-framework',
    heading: 'Legal Framework — Confined Spaces Regulations 1997',
    content: (
      <>
        <p>
          The Confined Spaces Regulations 1997 and their Approved Code of Practice (L101) set
          out the legal duties for all work in confined spaces in Great Britain. The HSE enforces
          these regulations, and breaches can result in prosecution under the Health and Safety
          at Work etc. Act 1974.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 3 — Avoid entry if possible</strong> — work in confined spaces
                must be avoided wherever reasonably practicable. This means considering whether the
                work can be done from outside the space using remote tools, cameras, or modified
                working methods before permitting entry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 4 — Safe system of work</strong> — if entry cannot be avoided,
                a safe system of work must be established before any person enters. This must
                address all the identified specified risks through risk assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 5 — Rescue arrangements</strong> — adequate rescue arrangements
                must be in place before entry. These must not rely on emergency services for
                immediate rescue — the response time for emergency services is often too long to
                prevent a fatality from oxygen deficiency.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Management of Health and Safety at Work Regulations 1999 also require employers to
          carry out a suitable and sufficient risk assessment for confined space work. This
          assessment must be recorded where there are five or more employees.
        </p>
      </>
    ),
  },
  {
    id: 'gas-testing',
    heading: 'Gas Testing and Atmospheric Monitoring',
    content: (
      <>
        <p>
          Atmospheric monitoring is a critical control measure for confined space work. An
          atmosphere that looks clear and smells normal can be lethal — oxygen deficiency and
          most toxic gases are invisible and odourless at dangerous concentrations.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oxygen level</strong> — must be between 19.5% and 23.5%. Normal
                atmospheric oxygen is 20.9%. Below 19.5%, performance is impaired; below 16%,
                loss of consciousness occurs rapidly; below 10%, death may be immediate. Oxygen
                enrichment above 23.5% dramatically increases fire and explosion risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flammable gases</strong> — measure as percentage of the lower explosive
                limit (%LEL). Entry is not permitted where the reading exceeds 10% LEL. Ventilate
                and re-test. Common flammable gases include methane (from sewage and landfill),
                hydrogen (from battery charging), and solvent vapours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hydrogen sulphide (H₂S)</strong> — found in sewers, drainage, and
                wastewater systems. The Workplace Exposure Limit (WEL) is 1 ppm (8-hour TWA)
                and 5 ppm (15-minute STEL). At concentrations above 100 ppm, a single breath
                can cause unconsciousness. At 1,000 ppm, death is nearly immediate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon monoxide (CO)</strong> — produced by incomplete combustion. Risk
                in spaces where petrol or diesel equipment has been used, or where vehicle exhaust
                can enter. WEL is 20 ppm (8-hour TWA). Odourless and colourless — a multi-gas
                detector is the only reliable way to detect it.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Monitoring must continue throughout the period of entry. If readings change, work must
          stop and all entrants must leave immediately. Many confined space contractors use
          continuous monitoring equipment worn by the entrant, with alarms audible outside
          the space.
        </p>
      </>
    ),
  },
  {
    id: 'entry-team',
    heading: 'Entry, Standby, and Rescue Team Requirements',
    content: (
      <>
        <p>
          Three distinct roles must be assigned before any person enters a confined space. The
          failure to maintain a standby person has been a contributing factor in multiple confined
          space fatalities in the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Entrant</strong> — the person working inside the confined space. Must be
                medically fit for confined space work, trained in confined space procedures, wearing
                appropriate PPE, and carrying a personal gas alarm. Must maintain regular
                communication with the standby person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standby person</strong> — stationed outside the space for the entire
                duration of the entry. Responsible for maintaining communication, monitoring the
                atmosphere at the entry point, operating the rescue equipment (tripod, winch, lifeline),
                and initiating the rescue plan if the entrant fails to respond or the alarm sounds.
                The standby person must NOT enter the space alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rescue team</strong> — for high-risk confined spaces, a trained rescue
                team (minimum two persons in addition to the standby) must be on standby and ready
                to effect a rescue. Rescue must where possible be carried out without entry —
                using a winch, lifeline, and rescue harness worn by the entrant. Entry-based rescue
                is only a last resort and requires full self-contained breathing apparatus (SCBA).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not enter to rescue without SCBA</strong> — if the entrant becomes
                incapacitated due to an atmospheric hazard, entering without breathing apparatus
                will incapacitate the rescuer. Multiple fatalities in the UK have occurred because
                well-intentioned rescuers entered a toxic atmosphere without protection. Initiate
                non-entry rescue (winch and lifeline) and call 999 immediately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'electrical-hazards',
    heading: 'Electrical Hazards Specific to Confined Spaces',
    content: (
      <>
        <p>
          Confined spaces create additional electrical hazards beyond those present in open
          environments. The enclosed nature concentrates risks and limits the ability to
          escape or seek assistance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduced voltage requirements</strong> — use 110V CTE (centre-tapped earth)
                supply from a transformer for all portable power tools. In wet or damp confined
                spaces, consider 25V or battery-powered equipment. The HSE strongly recommends
                110V as the maximum for portable tools in confined spaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — where 230V is unavoidable, a 30mA RCD must be
                used. In wet conditions, a 10mA RCD should be considered. RCDs must be tested
                before entry using the integral test button.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Increased shock risk from earth contact</strong> — in a confined space, the
                body may be in contact with a conductive surface (metal tank, damp concrete, damp
                earth) which provides a low-resistance path to earth. Contact with any live conductor
                in this situation is more likely to be fatal than in an open environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation before entry</strong> — all electrical services in or
                adjacent to the confined space must be identified and considered for isolation
                before entry. Apply{' '}
                <SEOInternalLink href="/lockout-tagout-guide">
                  lockout tagout (LOTO) procedures
                </SEOInternalLink>{' '}
                to prevent inadvertent re-energisation during the period of entry.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'atex-equipment',
    heading: 'ATEX Equipment in Confined Spaces',
    content: (
      <>
        <p>
          Where a confined space contains or may contain a flammable or explosive atmosphere,
          all electrical equipment used must be rated for that zone under the ATEX requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone classification</strong> — Zone 0 (flammable atmosphere present
                continuously or for long periods), Zone 1 (likely to occur occasionally in normal
                operation), Zone 2 (not likely to occur, and if it does, only briefly). Equipment
                is rated for specific zones — Zone 0 equipment can be used in Zone 1 and 2, but
                not vice versa.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>All equipment must be ATEX rated</strong> — this includes torches,
                multi-gas detectors, radios, mobile phones, and test instruments. If you carry
                an item into an ATEX zone that is not rated for that zone, you are introducing a
                potential ignition source.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intrinsically safe (Ex i) equipment</strong> — intrinsically safe equipment
                is designed so that the electrical energy within the equipment is too low to cause
                ignition. It is the most common ATEX protection concept for test instruments and
                portable devices used by electricians in Zone 1 and Zone 2 areas.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are working in a confined space and are unsure whether the atmosphere may be
          flammable, treat it as an ATEX zone until atmospheric testing confirms otherwise.
          Never introduce non-ATEX equipment into an unclassified confined space without
          gas testing first.
        </p>
      </>
    ),
  },
  {
    id: 'permit-to-work',
    heading: 'Permit to Work for Confined Space Electrical Work',
    content: (
      <>
        <p>
          A permit to work is best practice for all confined space entry and is mandatory on
          most industrial and commercial sites. It provides a documented record that all
          precautions have been confirmed before entry begins.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confined space permit contents</strong> — space identification, hazard
                assessment and specified risks, atmospheric test results (pre-entry), isolation
                details (electrical, mechanical, process), PPE requirements, entry personnel
                names, standby and rescue arrangements, communication method, duration of validity,
                and authorising signature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integration with electrical isolation permit</strong> — where a
                permit to work is also issued for electrical isolation (see{' '}
                <SEOInternalLink href="/lockout-tagout-guide">
                  the LOTO guide
                </SEOInternalLink>
                ), the two permits must be cross-referenced. The confined space permit should
                reference the isolation certificate number and confirm that isolation is confirmed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit suspension and cancellation</strong> — if atmospheric conditions
                change, work must stop and all personnel must exit. The permit is suspended and
                a new atmospheric test must be carried out before re-entry. When work is complete,
                the permit is formally cancelled by the authorising person after confirming all
                personnel have exited and equipment has been removed.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate confined space RAMS with Elec-Mate"
          description="Elec-Mate's AI RAMS generator creates comprehensive risk assessments and method statements for electrical work in confined spaces, including atmospheric hazard assessment, rescue arrangements, and permit to work documentation. 7-day free trial."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Confined Space Documentation',
    content: (
      <>
        <p>
          Before undertaking any electrical work that may involve a confined space, you need
          a site-specific risk assessment, method statement, and permit to work. This
          documentation must be produced before work begins — not after an incident.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Generate Confined Space RAMS Instantly</h4>
              <p className="text-white text-sm leading-relaxed">
                Use the{' '}
                <SEOInternalLink href="/rams-generator">
                  Elec-Mate RAMS generator
                </SEOInternalLink>{' '}
                to produce comprehensive risk assessments and method statements for confined space
                electrical work. Covers atmospheric hazards, LOTO requirements, entry team roles,
                rescue arrangements, and ATEX equipment requirements. Ready to share with your
                client or principal contractor.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConfinedSpaceElectricalPage() {
  return (
    <GuideTemplate
      title="Confined Space Electrical Work UK | Safety in Confined Spaces"
      description="UK guide to electrical work in confined spaces. Confined Spaces Regulations 1997, what counts as a confined space, gas testing, entry and standby team requirements, ATEX equipment, and permit to work."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={HardHat}
      heroTitle={
        <>
          Confined Space Electrical Work UK:{' '}
          <span className="text-yellow-400">Safety Requirements</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about working safely in confined spaces. Confined Spaces Regulations 1997, what qualifies as a confined space, gas testing requirements, entry and standby team roles, ATEX equipment, and permit to work systems."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Confined Space Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Generate Confined Space Risk Assessments"
      ctaSubheading="Elec-Mate's AI RAMS generator creates site-specific risk assessments for confined space electrical work, covering atmospheric hazards, isolation, rescue arrangements, and ATEX requirements. 7-day free trial."
    />
  );
}
