import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm6-s1-scope',
    question: 'BS 5266-1:2025 expanded the scope of "emergency lighting" — to which categories?',
    options: [
      'Escape lighting only.',
      'Escape lighting, standby lighting, and the new category — LOCAL AREA LIGHTING — for high-risk task areas. The 2025 revision broadens the umbrella so that all three categories sit under a single code of practice. The earlier edition treated standby lighting as a separate matter; the 2025 edition unifies the design, installation, commissioning, maintenance and certification framework across all three.',
      'Escape lighting and standby lighting only.',
      'Standby lighting and security lighting.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 §1 (Scope) explicitly extends the document to escape lighting + standby lighting + local area (high-risk) task lighting. The unification matters because the same luminaires, batteries and test cycles increasingly serve more than one purpose, and the code now provides a single coherent reference.',
  },
  {
    id: 'elm6-s1-borrowed',
    question: 'What is the BS 5266-1:2025 position on "borrowed light" from adjacent compartments?',
    options: [
      'Permitted as it always was.',
      'EXCLUDED. Borrowed light — relying on emergency luminaires in an adjacent room or corridor to illuminate a stairway, lobby, or escape route — is no longer accepted as compliant emergency lighting under the 2025 revision. Each escape route must be illuminated by luminaires provided FOR that route. The change responds to fire-door closure, smoke ingress, and the post-Grenfell evidence that adjacent compartments cannot be relied on under fire conditions.',
      'Permitted only for stairways.',
      'Permitted only above 1 lx.',
    ],
    correctIndex: 1,
    explanation:
      'Borrowed light was a loophole. Under fire conditions a closed fire door, smoke layer, or compartment failure removes the borrowed source instantly. The 2025 edition closes the loophole — every escape route must have luminaires inside the route itself. Existing installations relying on borrowed light require remediation at the next major refit or recertification, depending on the duty holder\'s risk assessment.',
  },
  {
    id: 'elm6-s1-1lx',
    question: 'BS EN 1838:2024 escape route minimum illuminance — what value, where measured?',
    options: [
      '0.5 lx at the centre line (the superseded 2013 wording).',
      '1 lx across the FULL WIDTH of the escape route at floor level, with edge exclusions: outer 0.5 m on routes wider than 2 m, outer ¼ width on routes 2 m or narrower. The 2013 edition specified 1 lx on the centre line + 0.5 lx on a 2 m central band; the 2024 update replaces this with the full-width rule plus edge exclusions.',
      '5 lx full width.',
      '0.5 lx full width.',
    ],
    correctIndex: 1,
    explanation:
      'The 1 lx target is unchanged; the 2024 addition is the full-width rule with explicit edge exclusions, replacing the 2013 centre-line + central-band wording. The change reflects the reality that occupants under stress do not walk along the geometric centre line — they spread across the route. Designers must run photometric calculations across the full width and demonstrate 1 lx within the non-excluded boundary.',
  },
  {
    id: 'elm6-s1-photometric',
    question: 'The new BS 5266-1:2025 5-year requirement is...',
    options: [
      'Battery replacement.',
      'PHOTOMETRIC VERIFICATION — at intervals not exceeding 5 years, the installation must be verified to still deliver the design illuminance levels measured in the field, not just on the original photometric calculation. Verification is by lux-meter measurement or commissioning-grade software with measured inputs, performed by a competent person, and recorded against the original design.',
      'Full replacement.',
      'Battery and luminaire replacement.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 introduces photometric verification at 5-year intervals because LED depreciation, surface reflectance changes (paint, furniture), and luminaire ageing cumulatively reduce in-service illuminance below the design figure. The original photometric calculation is a paper exercise; the 5-year check is empirical. Failures trigger remediation — relamping, repositioning, or supplementary luminaires.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 5266-1:2025 — what is the headline scope change versus the earlier edition?',
    options: [
      'Smaller scope.',
      'Broader scope — escape lighting + standby lighting + local area (high-risk task) lighting all sit under a single code of practice. The unification reflects the reality that the same luminaires, batteries and test cycles increasingly serve more than one purpose. The 2025 edition gives a single coherent framework across all three categories rather than treating standby separately.',
      'Same scope.',
      'Scope removed.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 §1 (Scope) consolidates emergency lighting categories into one code of practice. Designers and installers benefit from a single reference; duty holders benefit from clearer obligations.',
  },
  {
    id: 2,
    question:
      'BS EN 1838:2024 — escape route illuminance: what is the 2024 update relative to the earlier edition?',
    options: [
      'Centre-line only, 1 lx (the superseded 2013 wording).',
      'FULL-WIDTH 1 lx coverage with edge exclusions. The 2013 edition specified 1 lx on the centre line + 0.5 lx on a 2 m central band; the 2024 edition replaces this with 1 lx across the full width of the route, with the outer 0.5 m on each side excluded for routes wider than 2 m, and the outer ¼ width on each side excluded for routes 2 m or narrower.',
      'Centre-line only, 5 lx.',
      'Removed.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 §4.2 raises the bar for escape route illumination — full width with edge exclusions, replacing the 2013 centre-line + central-band wording. Photometric calculations must reflect this. Existing centre-line-only installations may need supplementary luminaires to meet the new requirement.',
  },
  {
    id: 3,
    question: 'BS EN 1838:2024 anti-panic lighting minimum illuminance and uniformity?',
    options: [
      '5 lx, 10:1.',
      '0.5 lx minimum across the open area, with maximum-to-minimum ratio not exceeding 40:1. The purpose is to prevent panic in undefined open spaces (foyers, atria, halls) by ensuring occupants can perceive the space and locate escape routes. The 40:1 uniformity prevents glare and dark patches that disorientate occupants.',
      '1 lx, 10:1.',
      '15 lx, 40:1.',
    ],
    correctAnswer: 1,
    explanation:
      'Anti-panic (open area) lighting per BS EN 1838:2024 §4.3 — 0.5 lx minimum, 40:1 max:min ratio. Different from escape route (1 lx) and high-risk task (15 lx or 10% of normal task illuminance, whichever higher).',
  },
  {
    id: 4,
    question: 'BS EN 1838:2024 high-risk task area illuminance?',
    options: [
      '1 lx.',
      '15 lx OR 10% of the maintained task illuminance from the normal lighting, whichever is HIGHER. The 15 lx floor exists for tasks where 10% of the normal level would still be too low (a 100 lx normal task would only need 10 lx, which is insufficient for safe shutdown of dangerous machinery). High-risk task lighting also has a much shorter switch-on time — 0.5 s — to prevent operator harm during the brief darkness.',
      '0.5 lx.',
      '5 lx.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 1838:2024 §4.4 — high-risk task lighting must allow safe shutdown of processes that pose a hazard if abandoned in the dark. 15 lx or 10% of normal, whichever higher; 0.5 s switch-on; minimum duration as required by the process risk assessment.',
  },
  {
    id: 5,
    question: 'BS EN 1838:2024 switch-on times — escape route and high-risk task?',
    options: [
      'Same for both.',
      '5 s (50% of declared illuminance) and 60 s (full illuminance) for escape routes; 0.5 s (full illuminance) for HIGH-RISK task areas. The faster switch-on for high-risk reflects the immediate danger from operating machinery — even a 1 s blackout could cause serious harm. Escape routes tolerate 5 s because occupants need to react and orient before moving.',
      '0.5 s for both.',
      '60 s for both.',
    ],
    correctAnswer: 1,
    explanation:
      'Switch-on requirements per BS EN 1838:2024: escape route 5 s to 50%, 60 s to 100%; high-risk task 0.5 s to 100%. The differentiation is calibrated to the consequence of darkness.',
  },
  {
    id: 6,
    question:
      'BS 5266-1:2025 introduces a NEW maintenance obligation at intervals not exceeding 5 years — what is it?',
    options: [
      'Battery replacement.',
      'PHOTOMETRIC VERIFICATION. The installation must be verified to still deliver the design illuminance — measured by lux-meter in the field, or via commissioning-grade software with measured surface reflectances and luminaire outputs. The original photometric calculation is a paper exercise; the 5-year check confirms the in-service installation still meets EN 1838 levels after LED depreciation, paint changes, and luminaire ageing.',
      'Cable replacement.',
      'Earth bonding check.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 §10 (Maintenance) introduces 5-year photometric verification as a new mandatory check. The check catches the cumulative effect of LED lumen depreciation, surface reflectance changes, and luminaire ageing that the annual functional test does not detect.',
  },
  {
    id: 7,
    question:
      'BS 5266-1:2025 — high-risk circuit redundancy: what is the new minimum architecture?',
    options: [
      'One circuit, any size.',
      'NOT FEWER THAN 2 CIRCUITS, with no more than 20 luminaires affected by a single fault. The earlier edition allowed a single circuit with reasonable luminaire count; 2025 hardens this for high-risk areas. The architecture protects against a single circuit failure removing all emergency lighting from a high-risk task area, where loss of light could cause serious harm.',
      'One circuit, max 50 luminaires.',
      'Three circuits minimum.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1:2025 §6 (Design) for high-risk task areas requires not fewer than 2 emergency lighting circuits, max 20 luminaires affected by a single fault. The redundancy is justified by the harm consequence — a process that requires safe shutdown cannot tolerate complete darkness.',
  },
  {
    id: 8,
    question:
      'BS 5266-1:2025 explicit position on "borrowed light" from adjacent compartments?',
    options: [
      'Permitted as before.',
      'EXCLUDED. Each escape route must be illuminated by luminaires provided FOR that route. Borrowed light from adjacent rooms or corridors is no longer compliant. The change responds to evidence that fire doors, smoke layers, or compartment failures remove borrowed sources during a fire — the very moment the lighting is most needed.',
      'Permitted with risk assessment.',
      'Permitted for stairways only.',
    ],
    correctAnswer: 1,
    explanation:
      'Borrowed light is a closed loophole under BS 5266-1:2025. Existing installations relying on borrowed light require remediation; the 5-year photometric verification will flag deficient installations.',
  },
  {
    id: 9,
    question: 'BS 5266-1 is a "Code of Practice" — what does that mean for compliance?',
    options: [
      'Mandatory legislation.',
      'A code of practice sets out what the relevant industry expert consensus regards as good practice. It is NOT statute, but courts and Fire and Rescue Service auditors treat it as the benchmark of reasonable practice under the RRO 2005 and the Fire Safety Act 2021. Departures must be justified by competent risk assessment showing that the alternative achieves an equivalent or better safety outcome. Unjustified departures are evidence of negligence.',
      'Optional guidance only.',
      'Manufacturer literature.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1 is not statute, but compliance with it is the benchmark by which reasonable practice is judged. Departures must be evidence-based and recorded. The court asks: did the duty holder act as a reasonable competent person would? BS 5266-1 defines what a reasonable competent person does.',
  },
  {
    id: 10,
    question:
      'Which of the following is NOT a stated requirement of BS EN 1838:2024 / BS 5266-1:2025?',
    options: [
      'Escape route 1 lx full open width.',
      'Anti-panic 0.5 lx, 40:1 max:min.',
      '5 lx vertical at fire-fighting equipment and fire alarm call-points.',
      'Carbon monoxide sensors integrated with the emergency lighting circuit.',
    ],
    correctAnswer: 3,
    explanation:
      'CO sensors are not part of BS 5266 / EN 1838. The other three are explicit requirements: 1 lx escape route full width (EN 1838:2024 §4.2), 0.5 lx anti-panic with 40:1 ratio (§4.3), 5 lx vertical at fire equipment / call-points (§4.5). The 5 lx vertical requirement ensures fire-fighting equipment is locatable and operable in emergency.',
  },
];

const EmergencyLightingModule6Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title:
      'Key clauses BS 5266-1:2025 / EN 1838:2024 | Emergency Lighting Module 6.1 | Elec-Mate',
    description:
      'BS 5266-1:2025 + BS EN 1838:2024 + BS EN 50172:2024: scope expansion, illuminance levels (1 lx escape full width, 0.5 lx anti-panic, 15 lx high-risk), switch-on times, the new 5-year photometric verification, the borrowed-light exclusion, and the high-risk circuit redundancy rule.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() =>
              navigate('/electrician/upskilling/emergency-lighting-module-6')
            }
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1"
            title="Key clauses from BS 5266-1 and EN 1838"
            description="The 2024 / 2025 standards cycle has reshaped emergency lighting. BS 5266-1:2025 (effective 31 Oct 2025), BS EN 1838:2024 (effective Dec 2024) and BS EN 50172:2024 (effective Jul 2024) sit on every duty holder's compliance shelf. This section walks each, clause by clause, with the changes that matter on site."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5266-1:2025 — Code of Practice for emergency lighting. Effective 31 October 2025. Scope EXPANDED to cover escape + standby + local area (high-risk task) lighting under one document.',
              'BS EN 1838:2024 — illuminance levels. 1 lx escape route across the FULL WIDTH at floor level, with edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m) — supersedes the 2013 centre-line + central-band wording. 0.5 lx anti-panic with 40:1 max:min; 15 lx OR 10 % normal task at high-risk; 5 lx vertical at fire-fighting equipment and call-points.',
              'BS EN 50172:2024 — emergency escape lighting systems. Test cycles, system architecture, central battery vs self-contained, monitoring requirements.',
              'NEW 2025 obligation — 5-year photometric VERIFICATION (in-service measurement, not paper calculation). Catches LED depreciation, surface reflectance changes, luminaire ageing.',
              'NEW 2025 obligation — high-risk areas need NOT FEWER THAN 2 circuits, max 20 luminaires affected by a single fault. Redundancy at the circuit level, not just at the luminaire level.',
              'BORROWED LIGHT EXCLUDED — 2025 closes the loophole. Each escape route must be illuminated by luminaires inside that route, not by light spilling from adjacent compartments.',
              'Switch-on times: 5 s to 50% / 60 s to 100% for escape routes; 0.5 s to 100% for high-risk task lighting (process must be safely shut down even during brief darkness).',
              'Duration: 1 h / 2 h / 3 h options; 3 h is the standard for non-domestic premises in UK practice.',
              'BS 5266-1 is a Code of Practice, NOT statute. But courts and Fire and Rescue Service auditors treat it as the benchmark of reasonable practice under RRO 2005. Departures must be evidence-justified.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the structure and scope of BS 5266-1:2025 and identify the headline changes versus the earlier edition (scope expansion, photometric verification, high-risk circuit redundancy, borrowed-light exclusion)',
              'Apply BS EN 1838:2024 illuminance levels: 1 lx escape route full open width, 0.5 lx anti-panic with 40:1 ratio, 15 lx or 10% of task illuminance at high-risk, 5 lx vertical at fire equipment',
              'State BS EN 1838:2024 switch-on times: 5 s / 60 s for escape route, 0.5 s for high-risk task lighting',
              'Identify the BS 5266-1:2025 duration options (1 h / 2 h / 3 h) and explain why 3 h is the UK standard for non-domestic premises',
              'Explain the BS EN 50172:2024 system requirements (test cycles, architecture, monitoring) and how they integrate with BS 5266-1',
              'Apply the new 5-year photometric verification obligation correctly — measurement method, recording, remediation triggers',
              'Apply the new high-risk redundancy rule (≥ 2 circuits, ≤ 20 luminaires per fault) at design stage',
              'Explain the legal status of a Code of Practice — not statute, but the benchmark of reasonable practice — and how departures must be justified',
              'Cross-reference BS 5266-1 obligations with BS 7671:2018 +A4:2026 §560 (safety services) for the wiring side of the installation',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 — structure and scope</ContentEyebrow>

          <ConceptBlock
            title="What BS 5266-1 is, and what it covers"
            plainEnglish="BS 5266-1:2025 is the UK Code of Practice for emergency lighting. It tells designers, installers, commissioners and maintainers what good practice looks like across the whole life of an emergency lighting system. The 2025 edition (effective 31 October 2025) supersedes the 2016 edition and brings the document into alignment with BS EN 1838:2024 (illuminance levels) and BS EN 50172:2024 (system requirements). The headline change is scope: BS 5266-1:2025 now covers escape lighting, standby lighting and the new category of local area lighting under one document."
            onSite="Treat BS 5266-1 as the procedural backbone, EN 1838 as the illuminance arithmetic, and EN 50172 as the system architecture. They interlock. A correct installation satisfies all three; a non-compliance against any one is a non-compliance against the whole."
          >
            <p>The structure of BS 5266-1:2025 (clause numbering as published):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>§1 Scope.</strong> Application of the standard. 2025 expansion: escape +
                standby + local area lighting. Excludes domestic dwellings except where common parts
                serve multiple occupancies (HMOs, blocks of flats — overlap with Building Safety Act
                2022 obligations).
              </li>
              <li>
                <strong>§2 Normative references.</strong> Cross-references to BS EN 1838, BS EN
                50172, BS EN 60598-2-22 (luminaire performance), BS EN 50171 (central battery
                systems), and BS 7671 §560 (safety services wiring). The references are normative —
                compliance with BS 5266-1 requires compliance with the referenced documents in the
                relevant respects.
              </li>
              <li>
                <strong>§3 Terms and definitions.</strong> Updated terminology — "local area
                lighting" is a new defined term, "borrowed light" is now defined as a non-compliant
                arrangement, and "photometric verification" is introduced as a new defined check.
              </li>
              <li>
                <strong>§4 General requirements.</strong> System purpose, categories of emergency
                lighting (escape route, anti-panic, high-risk, standby, local area), categories of
                premises (sleeping risk, public, industrial, residential).
              </li>
              <li>
                <strong>§5 Risk assessment input.</strong> The emergency lighting design MUST be
                derived from the building's fire risk assessment under RRO 2005. The risk assessment
                identifies escape routes, high-risk areas, sleeping risk, disabled occupant
                provision, and place of ultimate safety. The emergency lighting then provides for
                each. Section 3 of this module deals with this in depth.
              </li>
              <li>
                <strong>§6 Design.</strong> Photometric calculation, luminaire selection, location
                rules, switch-on response, duration, redundancy. The 2025 high-risk circuit rule (≥
                2 circuits, ≤ 20 luminaires per fault) sits here.
              </li>
              <li>
                <strong>§7 Wiring and circuits.</strong> Cross-references BS 7671 §560. Cable
                survival in fire, segregation, terminations, supports. The wiring side of the
                installation.
              </li>
              <li>
                <strong>§8 Installation.</strong> Mounting, orientation, identification, marking.
                Installation tolerances against the photometric design.
              </li>
              <li>
                <strong>§9 Commissioning.</strong> Initial photometric measurement, functional test,
                duration test, certification (the acceptance certificate). The handover document
                set.
              </li>
              <li>
                <strong>§10 Maintenance.</strong> Test cycles (monthly functional, annual full
                duration), the new 5-year photometric verification, replacement criteria, logbook
                entries.
              </li>
              <li>
                <strong>§11 Certification.</strong> Acceptance certificate, annual test certificate,
                photometric verification certificate, logbook. The document set.
              </li>
              <li>
                <strong>Annexes (informative + normative).</strong> Worked examples, photometric
                methods, model logbook entries, model certificates, sample risk assessment outputs.
              </li>
            </ul>
            <p>
              The 2025 revision is a substantial rewrite, not a minor update. Designers using the
              2016 edition produce work that may not satisfy the 2025 obligations. The Fire and
              Rescue Service audit (Module 6 §4) tests against the current edition.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §1 (Scope)"
            clause={
              <>
                This British Standard gives recommendations for the emergency lighting of premises
                other than dwellings. The recommendations apply to escape lighting, standby lighting
                and local area lighting for high-risk task areas. The recommendations do not apply
                to "borrowed light" arrangements relying on luminaires in adjacent compartments;
                each escape route shall be provided with its own emergency luminaires.
              </>
            }
            meaning="Three clauses earn close reading. 'Escape + standby + local area' — the unified scope is new in 2025. 'Premises other than dwellings' — single-family homes are excluded; HMOs and blocks of flats are in scope at the common parts. 'Borrowed light arrangements' — explicitly excluded. Existing installations relying on borrowed light are non-compliant under the 2025 edition and require remediation."
          />

          <ConceptBlock
            title="Categories of emergency lighting under BS 5266-1:2025"
            plainEnglish="Emergency lighting is not a single thing. The standard defines five categories, each with a different purpose and a different illuminance target. Designers must identify which category applies in each part of the building, and provide accordingly. Most buildings need multiple categories — escape lighting along corridors, anti-panic in foyers, high-risk in plant rooms, standby in places where work must continue, and local area at specific task locations."
          >
            <p>The five categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route lighting.</strong> Illumination of identified escape routes
                during evacuation. 1 lx minimum across the full open width (BS EN 1838:2024 §4.2).
                Switch-on 5 s to 50% / 60 s to 100%. Duration per the building's risk assessment —
                typically 3 h for non-domestic.
              </li>
              <li>
                <strong>Anti-panic (open area) lighting.</strong> Illumination of undefined open
                spaces (foyers, atria, halls, large rooms) where occupants would otherwise be unable
                to locate escape routes. 0.5 lx minimum, 40:1 max:min uniformity (BS EN 1838:2024
                §4.3). Same switch-on as escape route.
              </li>
              <li>
                <strong>High-risk task area lighting.</strong> Illumination of locations where
                operators must safely shut down dangerous processes if normal lighting fails. 15 lx
                OR 10% of normal task illuminance, whichever higher (BS EN 1838:2024 §4.4).
                Switch-on 0.5 s to 100%. Duration as long as the process needs for safe shutdown.
              </li>
              <li>
                <strong>Standby lighting.</strong> Illumination that allows normal activity to
                continue when normal lighting fails. Common in hospitals (operating theatres),
                control rooms, security-sensitive areas. Illuminance per the activity (often equal
                to normal lighting). Duration per the activity. Standby lighting is NOT escape
                lighting; it serves a different purpose and is sized differently.
              </li>
              <li>
                <strong>Local area (high-risk) lighting (NEW 2024 / 2025).</strong> A subset of
                high-risk task lighting for specific machine or workstation locations where the
                wider area lighting is sufficient for escape but the local task requires more. The
                2024 EN 1838 introduced this; BS 5266-1:2025 codifies the design approach.
              </li>
            </ul>
            <p>
              Designers MUST identify the category for each space and demonstrate compliance against
              the matching illuminance, switch-on and duration criteria. A foyer treated as escape
              route only (1 lx along a defined path) but actually serving as anti-panic (0.5 lx
              across an open area) may pass the escape-route full-width check yet fail the
              open-area check.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS EN 1838:2024 — illuminance levels</ContentEyebrow>

          <ConceptBlock
            title="The four target illuminances"
            plainEnglish="BS EN 1838:2024 sets the photometric arithmetic. Designers run a photometric calculation against the building plans, surface reflectances and luminaire data, and demonstrate that each category of space achieves the relevant target. The 2024 edition tightens escape route coverage to full open width and clarifies the high-risk floor of 15 lx. Numbers are the language of compliance — get them right or fail."
          >
            <p>The four target illuminances and where they apply:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route — 1 lx, full width with edge exclusions.</strong> §4.2.
                Minimum 1 lx horizontally on the floor across the full width of the route, with
                the outer 0.5 m on each side excluded for routes wider than 2 m and the outer
                ¼ width on each side excluded for routes 2 m or narrower. The 2024 update replaces
                the 2013 centre-line + central-band wording with this full-width rule. Designers
                measure or calculate at floor level across the non-excluded cross-section. A
                single dark patch within the non-excluded width — a column shadow, an unlit
                corner — fails the requirement.
              </li>
              <li>
                <strong>Anti-panic — 0.5 lx, 40:1 max:min.</strong> §4.3. Minimum 0.5 lx
                horizontally across the open area. Maximum-to-minimum ratio not exceeding 40:1. The
                uniformity ratio prevents glare and dark patches that disorientate occupants in
                large undefined spaces. A foyer with one bright luminaire over the desk and dim
                corners can pass the 0.5 lx minimum and still fail the 40:1 uniformity.
              </li>
              <li>
                <strong>High-risk task — 15 lx OR 10% of normal task illuminance, whichever
                higher.</strong> §4.4. Higher of the two values. Maximum-to-minimum ratio not
                exceeding 10:1. Examples: a workshop with 200 lx normal task lighting needs 20 lx
                high-risk emergency (10% wins); a workshop with 100 lx normal needs 15 lx (the floor
                wins). Process safety analysis identifies which task locations qualify.
              </li>
              <li>
                <strong>Vertical illuminance at fire equipment — 5 lx.</strong> §4.5. Fire
                extinguishers, fire alarm call-points, emergency stop buttons, refuge call-points
                must be illuminated to 5 lx vertically on the equipment face. The vertical
                requirement ensures the equipment is identifiable and operable, not just locatable
                in plan.
              </li>
            </ul>
            <p>
              The figures are minima at end of life, not at commissioning. Photometric calculations
              must apply the maintained illuminance factor (manufacturer LED depreciation curve,
              maintenance factor for surface ageing). A new installation should comfortably exceed
              the targets; the 5-year photometric verification confirms it still does.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · §4.2 (Emergency escape route lighting)"
            clause={
              <>
                The horizontal illuminance at floor level on the escape route shall be not less
                than 1 lx across the full width of the route. For escape routes wider than 2 m, an
                outer border of 0.5 m on each side may be excluded. For escape routes of 2 m width
                or less, an outer border of one quarter of the route width on each side may be
                excluded. The maximum to minimum ratio along the route within the non-excluded
                width shall not exceed 40:1.
              </>
            }
            meaning="Two clauses earn close reading. The 2024 full-width rule with edge exclusions supersedes the 2013 centre-line + central-band wording — designers must demonstrate 1 lx everywhere across the non-excluded width of the route. The 40:1 ratio constrains the spacing — luminaires must be close enough together that the dark valleys between them do not exceed 1/40 of the bright peaks. Wider spacing fails the ratio even if each luminaire is bright."
          />

          <ConceptBlock
            title="Switch-on times — escape route vs high-risk"
            plainEnglish="The instant normal lighting fails, the emergency lighting must come on. BS EN 1838:2024 sets two different switch-on profiles — one for escape route (5 s to 50%, 60 s to 100%) and one for high-risk task (0.5 s to 100%). The differentiation reflects the consequence of darkness. Escape route occupants can tolerate a brief dim period because they react and orient before moving; high-risk task operators face immediate harm if their process continues running while they cannot see."
          >
            <p>Switch-on requirements per BS EN 1838:2024:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route lighting — 5 s to 50%, 60 s to 100%.</strong> The luminaires
                reach 50% of their declared emergency illuminance within 5 seconds, and 100% within
                60 seconds. The two-stage profile reflects battery and inverter response — instant
                full output is rarely achievable; partial output is achievable quickly.
              </li>
              <li>
                <strong>Anti-panic lighting — same as escape route.</strong> 5 s / 60 s. The same
                response is appropriate because anti-panic and escape route lighting both serve
                evacuation, where 5 s of dim transition is acceptable.
              </li>
              <li>
                <strong>High-risk task lighting — 0.5 s to 100%.</strong> Full illuminance within
                half a second. Achieved by uninterruptible architectures — central battery on an
                always-on inverter, or self-contained luminaires with capacitor-supported switching.
                The half-second figure is calibrated to the time it takes a typical operator to
                react and reach an emergency stop.
              </li>
              <li>
                <strong>Standby lighting — per the application.</strong> Standby lighting that
                supports an operating theatre, for example, must be near-instantaneous; standby
                lighting that supports continued security work in a fully-staffed control room can
                tolerate longer transitions. The application risk assessment sets the requirement.
              </li>
            </ul>
            <p>
              The 0.5 s requirement for high-risk drives architecture choices. Self-contained
              luminaires must use capacitor-bridged switching; central battery systems must be
              continuously on-line, not switch-from-mains. Designers select the architecture against
              the response requirement before considering luminaire models.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS EN 50172:2024 — system requirements</ContentEyebrow>

          <ConceptBlock
            title="What BS EN 50172 covers"
            plainEnglish="If BS 5266-1 is the procedural backbone and EN 1838 is the illuminance arithmetic, EN 50172 is the system architecture. EN 50172 sets out the requirements for the emergency escape lighting SYSTEM — central battery vs self-contained, monitoring, test facilities, fault indication, and the test regime. The 2024 edition aligns with BS EN 50171 (central battery systems) and updates the test cycle requirements."
          >
            <p>The key BS EN 50172:2024 requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>System type — central battery, self-contained, or hybrid.</strong> Central
                battery (one battery serving many luminaires) gives easier maintenance and longer
                life but needs fire-survival cabling. Self-contained (battery in each luminaire)
                gives circuit independence but needs more frequent battery replacement. Hybrid
                combines the two for different parts of the same building.
              </li>
              <li>
                <strong>Test facility.</strong> Every system must include a means to test
                operation without disconnecting the supply at the consumer unit. Self-contained
                luminaires achieve this with a key switch or remote test panel; central battery
                systems achieve this with the system controller.
              </li>
              <li>
                <strong>Test cycles.</strong> Monthly functional test (luminaires light when
                supply removed); annual full-duration test (luminaires sustain rated duration —
                typically 3 h). 2024 reaffirms the cycles and tightens the recording obligation.
              </li>
              <li>
                <strong>Monitoring.</strong> Self-contained luminaires must have a visible status
                indicator (charging LED). Larger installations should consider automated test
                systems (ATS) that record functional and duration tests and flag faults
                automatically.
              </li>
              <li>
                <strong>Fault indication.</strong> Faults must be visible to operating staff.
                Common faults: battery failure, lamp failure, charger failure. Each requires
                distinct indication.
              </li>
              <li>
                <strong>Cabling.</strong> Cross-references BS 7671 §560. Cable survival in fire (PH
                30 / PH 60 / PH 90 — minutes of survival at 842 °C). Segregation from other
                circuits. Mechanical protection.
              </li>
            </ul>
            <p>
              EN 50172 + EN 1838 + BS 5266-1 together describe the complete installation. EN 50172
              tells you the system shape; EN 1838 tells you the illuminance numbers; BS 5266-1 tells
              you the procedure. Compliance with all three is the test.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · Test requirements"
            clause={
              <>
                The emergency escape lighting system shall be tested at intervals not exceeding one
                month, with each luminaire energised by simulating a failure of the normal supply
                and verified to operate. The test shall be of sufficient duration to verify
                operation without significantly discharging the battery. At intervals not exceeding
                12 months, the system shall be subjected to a full-duration test verifying that each
                luminaire operates for its rated duration. The results shall be recorded.
              </>
            }
            meaning="Two cycles, one logbook. Monthly = brief functional check (does it light?). Annual = full duration check (does it last 1 / 2 / 3 hours as designed?). Both cycles must be recorded with date, who tested, result, and any remedial actions. Missing logbook entries are evidence of non-compliance — and will be the first thing the Fire and Rescue Service auditor asks for."
          />

          <SectionRule />

          <ContentEyebrow>The standards hierarchy and how they interlock</ContentEyebrow>

          {/* Standards hierarchy diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Emergency lighting standards hierarchy — 2024 / 2025 cycle
            </h4>
            <svg
              viewBox="0 0 820 580"
              className="w-full h-auto"
              role="img"
              aria-label="Hierarchy of emergency lighting standards. BS 5266-1:2025 (Code of Practice) at the top, with normative references to BS EN 1838:2024 (illuminance levels), BS EN 50172:2024 (system requirements), BS EN 60598-2-22 (luminaire performance), and BS EN 50171 (central battery). 2025 changes flagged: scope expansion, photometric verification, high-risk circuit redundancy, borrowed-light exclusion."
            >
              <rect
                x="240"
                y="30"
                width="340"
                height="80"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2.4"
              />
              <text x="410" y="58" textAnchor="middle" fill="#FBBF24" fontSize="14" fontWeight="bold">
                BS 5266-1:2025
              </text>
              <text x="410" y="76" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Code of Practice — UK procedural backbone
              </text>
              <text x="410" y="94" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Effective 31 October 2025
              </text>

              <line x1="410" y1="110" x2="180" y2="180" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <line x1="410" y1="110" x2="410" y2="180" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <line x1="410" y1="110" x2="640" y2="180" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />

              <rect
                x="60"
                y="180"
                width="240"
                height="86"
                rx="10"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="2"
              />
              <text x="180" y="206" textAnchor="middle" fill="#22D3EE" fontSize="13" fontWeight="bold">
                BS EN 1838:2024
              </text>
              <text x="180" y="224" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Illuminance levels
              </text>
              <text x="180" y="240" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                1 lx escape, 0.5 lx anti-panic
              </text>
              <text x="180" y="254" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                15 lx high-risk, 5 lx vertical
              </text>

              <rect
                x="290"
                y="180"
                width="240"
                height="86"
                rx="10"
                fill="rgba(168,85,247,0.08)"
                stroke="#A855F7"
                strokeWidth="2"
              />
              <text x="410" y="206" textAnchor="middle" fill="#A855F7" fontSize="13" fontWeight="bold">
                BS EN 50172:2024
              </text>
              <text x="410" y="224" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                System requirements
              </text>
              <text x="410" y="240" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Test cycles, architecture
              </text>
              <text x="410" y="254" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Monitoring, fault indication
              </text>

              <rect
                x="520"
                y="180"
                width="240"
                height="86"
                rx="10"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="2"
              />
              <text x="640" y="206" textAnchor="middle" fill="#22C55E" fontSize="13" fontWeight="bold">
                BS EN 60598-2-22
              </text>
              <text x="640" y="224" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Luminaire performance
              </text>
              <text x="640" y="240" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Product standard
              </text>
              <text x="640" y="254" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                CE marking + declared output
              </text>

              <line x1="180" y1="266" x2="180" y2="320" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <line x1="410" y1="266" x2="410" y2="320" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <line x1="640" y1="266" x2="640" y2="320" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />

              <rect
                x="60"
                y="320"
                width="240"
                height="64"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.6"
              />
              <text x="180" y="344" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="12" fontWeight="bold">
                BS 7671:2018 +A4:2026 §560
              </text>
              <text x="180" y="362" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10">
                Wiring of safety services
              </text>
              <text x="180" y="376" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Cable survival, segregation
              </text>

              <rect
                x="290"
                y="320"
                width="240"
                height="64"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.6"
              />
              <text x="410" y="344" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="12" fontWeight="bold">
                BS 5839-1:2025
              </text>
              <text x="410" y="362" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10">
                Fire alarm — cause &amp; effect
              </text>
              <text x="410" y="376" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Cross-link to EL switch-on
              </text>

              <rect
                x="520"
                y="320"
                width="240"
                height="64"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.6"
              />
              <text x="640" y="344" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="12" fontWeight="bold">
                BS EN 50171
              </text>
              <text x="640" y="362" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10">
                Central battery systems
              </text>
              <text x="640" y="376" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Where central battery used
              </text>

              <rect
                x="60"
                y="416"
                width="700"
                height="148"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.45)"
                strokeWidth="1.6"
              />
              <text x="410" y="438" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="bold">
                ⚠ 2025 CHANGES — flagged for compliance
              </text>
              <text x="80" y="462" fill="rgba(255,255,255,0.85)" fontSize="10">
                • Scope EXPANDED — escape + standby + local area lighting under one document
              </text>
              <text x="80" y="480" fill="rgba(255,255,255,0.85)" fontSize="10">
                • Borrowed light EXCLUDED — each escape route must have its own luminaires
              </text>
              <text x="80" y="498" fill="rgba(255,255,255,0.85)" fontSize="10">
                • 5-year PHOTOMETRIC VERIFICATION introduced (in-service measurement)
              </text>
              <text x="80" y="516" fill="rgba(255,255,255,0.85)" fontSize="10">
                • High-risk redundancy — ≥ 2 circuits, ≤ 20 luminaires per fault
              </text>
              <text x="80" y="534" fill="rgba(255,255,255,0.85)" fontSize="10">
                • Documentation/handover clarified — acceptance certificate now mandatory at commissioning
              </text>
              <text x="80" y="552" fill="rgba(255,255,255,0.85)" fontSize="10">
                • EN 1838:2024 escape route now FULL WIDTH with edge exclusions (was centre line + 2 m central band)
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The new 2025 obligations</ContentEyebrow>

          <ConceptBlock
            title="5-year photometric verification"
            plainEnglish="The 2025 edition introduces a new mandatory check: every 5 years (or sooner if there is a significant change to the building, surfaces, or luminaires), the installation must be verified to still deliver the design illuminance levels. This is not the annual functional test (which checks 'does it light?') and not the annual duration test (which checks 'does it last 3 hours?'). It is a measurement of LUX in the field, against the original photometric design. The check catches what the routine tests cannot — slow degradation."
          >
            <p>What the 5-year photometric verification involves:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lux-meter survey.</strong> A competent person walks the building during an
                emergency lighting test (or with normal lighting suppressed), measures lux at floor
                level along escape routes, in anti-panic spaces, and at high-risk task locations.
                Readings recorded against location and compared to the design figures.
              </li>
              <li>
                <strong>Or commissioning-grade software with measured inputs.</strong>
                Alternatively, a re-run of the original photometric calculation with current
                surface reflectances and current luminaire output (manufacturer data plus measured
                depreciation if available). Less labour than a lux survey but only as good as the
                input data.
              </li>
              <li>
                <strong>Comparison to design.</strong> Each measurement is compared to the design
                figure. Margin: design figures are minima at end of life, so a new installation
                should comfortably exceed; a 5-year verification should still be at or above design.
              </li>
              <li>
                <strong>Failures trigger remediation.</strong> Where measured illuminance is below
                design, options are: relamp (replace LED modules); reposition luminaires; add
                supplementary luminaires; redecorate (lighter surfaces increase reflected light).
                The remediation must restore compliance and be documented.
              </li>
              <li>
                <strong>Certificate.</strong> The verification produces a photometric verification
                certificate. The certificate joins the document set the Fire and Rescue Service
                auditor will request.
              </li>
            </ul>
            <p>
              The 5-year verification interval is calibrated to LED depreciation. Modern LED
              luminaires lose 10-30% of output over 5 years depending on model, drive current and
              ambient temperature. A new installation comfortably above 1 lx may, after 5 years,
              have dropped below 1 lx in places. The verification catches this before the auditor
              does.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="High-risk circuit redundancy — ≥ 2 circuits, ≤ 20 luminaires per fault"
            plainEnglish="The 2025 edition hardens the design rule for high-risk task areas. Where the earlier edition allowed a single emergency lighting circuit serving a high-risk area, the 2025 edition requires not fewer than 2 circuits, with no more than 20 luminaires affected by a single circuit fault. The change responds to the consequence of a single circuit failure — in a high-risk area, complete darkness during a process-shutdown sequence could cause serious harm. Two circuits, distributed appropriately, ensure that a single fault leaves at least half the lighting working."
          >
            <p>How the rule operates in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identify high-risk areas.</strong> The fire risk assessment identifies
                spaces where operators must safely shut down dangerous machinery if normal lighting
                fails. Examples: presses, mixers, robot cells, chemical handling areas, hot work
                stations.
              </li>
              <li>
                <strong>Provide ≥ 2 circuits.</strong> The high-risk area must have not fewer than 2
                emergency lighting circuits. The luminaires must be distributed across the circuits
                such that loss of either circuit leaves the area still illuminated to a useful
                level.
              </li>
              <li>
                <strong>Cap at 20 luminaires per fault.</strong> No single circuit fault may extinguish
                more than 20 luminaires. In small high-risk areas, this is easily met (a single
                circuit may have 5 luminaires). In larger high-risk areas, the 20 cap forces
                additional circuit splits.
              </li>
              <li>
                <strong>Self-contained alternative.</strong> Self-contained luminaires
                (battery-in-luminaire) achieve the redundancy at the luminaire level — each
                luminaire is its own micro-circuit. The 2-circuit rule applies primarily to central
                battery and centrally-supplied installations.
              </li>
              <li>
                <strong>Document the architecture.</strong> The design drawings and acceptance
                certificate must show the circuit allocation and the worst-case fault impact (≤ 20
                luminaires, leaves area sufficiently lit).
              </li>
            </ul>
            <p>
              The rule is targeted — it applies to high-risk areas only, not to general escape
              route lighting. A corridor with a single emergency lighting circuit serving its
              luminaires remains compliant under the 2025 edition. The design team must identify
              where the high-risk rule applies and design accordingly.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · §6 (Design — high-risk task areas)"
            clause={
              <>
                For high-risk task area lighting, the supply arrangement shall provide redundancy
                such that the failure of any single circuit does not extinguish all the emergency
                luminaires serving the area. The minimum arrangement is two circuits, with no more
                than 20 luminaires affected by the failure of a single circuit. Where self-contained
                luminaires are used, the redundancy is provided at the luminaire level and the
                two-circuit minimum does not apply.
              </>
            }
            meaning="The architectural requirement protects against a single point of failure removing all lighting from a high-risk area. The 20-luminaire cap is a quantitative limit on how much lighting one fault can take out — even with two circuits, you cannot have one circuit serving 80 luminaires and the other serving 5. Self-contained luminaires bypass the rule because each luminaire is independent."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Borrowed light — the closed loophole</ContentEyebrow>

          <ConceptBlock
            title="What borrowed light was, and why 2025 closes it"
            plainEnglish="Borrowed light is an installation arrangement where a stairway, lobby or short corridor has no emergency luminaires of its own, relying instead on light spilling in from adjacent rooms. The earlier edition tolerated this where the adjacent rooms had compliant emergency lighting and the doors between them were kept open. The 2025 edition closes the loophole — borrowed light is non-compliant. Each escape route must have luminaires inside the route itself."
          >
            <p>The reasoning behind the exclusion:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fire doors close.</strong> Most building fire doors are held open by
                magnetic releases that drop the door closed on fire alarm. The instant the alarm
                sounds, borrowed light from the adjacent room is cut off. The escape route relying
                on it goes dark.
              </li>
              <li>
                <strong>Smoke layer.</strong> Smoke ingress reduces transmitted light through doors
                and openings. Even a partially open door admits less light through smoke than
                through clear air.
              </li>
              <li>
                <strong>Compartment failure.</strong> If the adjacent compartment is the source of
                the fire, its lighting may be lost (luminaires damaged, circuits compromised). The
                escape route loses its light at the worst moment.
              </li>
              <li>
                <strong>Post-Grenfell evidence.</strong> Investigations after major fires have
                consistently shown that compartments cannot be relied on as light sources for
                adjacent compartments. The lighting must be inside the compartment that needs it.
              </li>
              <li>
                <strong>Practical impact.</strong> Existing installations relying on borrowed light
                must be remediated. The 5-year photometric verification will catch them — without
                the adjacent light, the route fails the 1 lx full-width check. Remediation is
                straightforward (add emergency luminaires inside the route) and the documentation
                requirements are clear.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="The retail unit with a borrowed-light stair"
            situation="A 1990s retail unit has a back-of-house stair leading from the shop floor to a first-floor stockroom. The stair is unlit by its own emergency luminaires; light borrows from a corridor luminaire at the foot of the stair (where the corridor opens into the shop). The 2025 photometric verification finds 0.3 lx along the stair when the corridor luminaire is operating at design output, and 0 lx when the corridor luminaire is off. The duty holder asks whether this is acceptable."
            whatToDo="No. BS 5266-1:2025 explicitly excludes borrowed light. The 0.3 lx figure fails the 1 lx escape route requirement on its own; the 0 lx figure when the corridor luminaire is off (a single fault could cause this) is a complete escape route failure. Remediation: add at least one emergency luminaire inside the stair, sized and located to deliver 1 lx across the full width of the stair at floor level (within the non-excluded boundary per BS EN 1838:2024), with photometric verification at commissioning. Update the asset register and risk assessment accordingly."
            whyItMatters="The borrowed-light exclusion is not a paperwork change — it identifies real safety gaps. The stair in this scenario is the very escape route occupants would use to leave the stockroom under fire conditions. A single corridor luminaire fault (the bulb fails, the battery fails, a circuit trips) and the entire stair goes dark. The 2025 revision treats this as the unacceptable single point of failure that it is."
          />

          <CommonMistake
            title="Designing to the 2016 edition because that is what is on the office shelf"
            whatHappens="A designer produces emergency lighting drawings in November 2025 (after the 2025 edition came into force on 31 October 2025) but uses the 2016 edition because that is the document on the office shelf. The drawings show centre-line escape route compliance only, no 5-year verification provision, no high-risk circuit redundancy, and a borrowed-light arrangement on a back stair. The installation goes in. At first audit the Fire and Rescue Service identifies non-compliance against current standards. The duty holder is left with remediation costs and an enforcement notice."
            doInstead="Designers must work to the current edition. BS 5266-1:2025 came into force on 31 October 2025. From that date, new designs must satisfy the 2025 edition. Existing installations move to the 2025 edition through the maintenance and verification cycles — the next 5-year photometric verification is the natural trigger. Office reference shelves must be kept current. Designs dated after 31 October 2025 referencing the 2016 edition are evidence of incompetence."
          />

          <CommonMistake
            title="Treating the photometric calculation as a one-time exercise"
            whatHappens="A 2018 emergency lighting installation has its original photometric calculation in the as-built file. The annual functional test passes every year (luminaires light when supply removed); the annual duration test passes every year (3 h sustained). The duty holder considers compliance assured. In 2026, an FRS audit finds escape route illuminance at 0.6 lx — below the 1 lx design — caused by LED depreciation, redecoration in a darker shade, and three luminaires that were swapped out for a different model with lower output. None of this was caught because no in-service measurement was ever done."
            doInstead="The photometric calculation is a paper exercise at design stage. The 5-year photometric verification is the in-service equivalent. Functional and duration tests do not measure illuminance — they only verify the luminaire lights and lasts. Build the 5-year verification into the maintenance contract; the verification certificate joins the document set. The 2025 edition makes this explicit, but the underlying obligation existed before — to maintain the design intent throughout the life of the installation."
          />

          <CommonMistake
            title="Mixing standby and escape lighting requirements on a single luminaire spec"
            whatHappens="A designer specifies a luminaire that 'covers both escape and standby' in a control room. The escape route requires 1 lx at floor level full open width; the standby requires 200 lx on the desk for continued operation. The luminaire chosen meets the 200 lx desk illuminance but produces only 0.6 lx at the floor at the edge of the route. The dual-purpose claim hides a single-purpose installation. The escape route fails."
            doInstead="Each category of emergency lighting has its own illuminance target measured in its own location. Standby lighting is measured on the work plane at the location of the activity. Escape lighting is measured at floor level across the route. A luminaire serving both must satisfy both measurements separately. Run the photometric calculation for each category independently and document each compliance separately."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cross-references — BS 7671 §560 and BS 5839-1:2025</ContentEyebrow>

          <ConceptBlock
            title="The wiring side — BS 7671:2018 +A4:2026 §560"
            plainEnglish="Emergency lighting circuits are 'safety services' under BS 7671. §560 sets out the wiring obligations: cable survival in fire (PH-rated), segregation from other circuits, mechanical protection, identification. The A4:2026 amendment to BS 7671 reinforces the segregation and identification requirements and aligns the cable selection guidance with current product offerings."
          >
            <p>The §560 requirements that interact with BS 5266-1:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable survival in fire (PH 30 / 60 / 90).</strong> Fire-survival cable rated
                in minutes at 842 °C. Selection depends on the building category and the design
                duration. Common selections: PH 30 (most non-domestic), PH 60 (sleeping risk, high
                occupancy), PH 90 (high-rise residential, high-risk industrial).
              </li>
              <li>
                <strong>Segregation.</strong> Safety service cables must be segregated from
                non-safety circuits. Segregation by separate containment, separate cable routes, or
                use of cables with intrinsic mineral insulation (MI cable). The principle: a fault
                or fire on a non-safety circuit must not compromise the safety service.
              </li>
              <li>
                <strong>Mechanical protection.</strong> Cables in escape routes must be protected
                against mechanical damage that could occur during evacuation or fire-fighting.
                Surface-mounted cables in evacuation corridors typically need additional capping or
                conduit.
              </li>
              <li>
                <strong>Identification.</strong> Safety service cables must be identifiable. Coloured
                outer sheath (typically red or marked); labels at terminations; consistent
                identification across the installation.
              </li>
              <li>
                <strong>A4:2026 changes.</strong> The forthcoming amendment (in draft as of 2026)
                aligns cable selection guidance with current product offerings, clarifies the
                interaction with TN-C-S (PNB) earthing, and updates the worked examples for
                emergency lighting and fire alarm circuits.
              </li>
            </ul>
            <p>
              The wiring is half the installation. A correctly designed emergency luminaire fed by a
              non-compliant cable does not satisfy the standard. The acceptance certificate at
              commissioning must confirm BS 7671 §560 compliance alongside the BS 5266-1
              photometric and procedural compliance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The fire alarm side — BS 5839-1:2025 cause and effect"
            plainEnglish="BS 5839-1:2025 is the fire alarm code of practice. Its cause-and-effect provisions describe what happens automatically when the fire alarm operates. In some installations, the fire alarm cause-and-effect can include emergency lighting actions — for example, switching local-area lighting to its emergency mode early (before mains failure) on a confirmed fire alarm. The cross-reference matters because the two codes (BS 5266-1 and BS 5839-1) describe different sides of the same system response."
          >
            <p>Where the cross-reference is significant:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Early activation.</strong> Some installations switch emergency lighting to
                its emergency state on fire alarm activation, ahead of any mains failure. This
                ensures full emergency illumination at the moment of evacuation, not 60 s later
                when the fire damages mains.
              </li>
              <li>
                <strong>Refuge lighting.</strong> Refuges for disabled occupants typically need
                lighting at refuge call-points. The fire alarm cause-and-effect can ensure refuge
                lighting is at full output during evacuation.
              </li>
              <li>
                <strong>High-risk area shutdown.</strong> Where the fire alarm triggers process
                shutdown (e.g. machinery stops on fire alarm), the high-risk emergency lighting
                must be active to allow operators to verify safe shutdown.
              </li>
              <li>
                <strong>Common power supply considerations.</strong> Fire alarm and emergency
                lighting are separate systems but may share power infrastructure (UPS, central
                battery). The cause-and-effect document records the interactions.
              </li>
            </ul>
            <p>
              In smaller installations the cross-reference is informational only — the two systems
              operate independently. In larger or higher-risk installations, the cross-reference is
              integral to the safety case and must be documented.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Code of Practice — what that means legally</ContentEyebrow>

          <ConceptBlock
            title="BS 5266-1 is not statute, but it is the benchmark"
            plainEnglish="BS 5266-1 is a Code of Practice published by the British Standards Institution. It is not an Act of Parliament; it is not a Statutory Instrument. There is no offence of 'failing to comply with BS 5266-1'. The legal force of the document is indirect — courts and Fire and Rescue Service auditors treat BS 5266-1 as the benchmark of reasonable practice when assessing duty holder performance under the Regulatory Reform (Fire Safety) Order 2005 and the Fire Safety Act 2021. Departures from BS 5266-1 are permissible — but they must be justified by competent risk assessment showing the alternative is at least as safe."
          >
            <p>How the legal force works in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>RRO 2005 Article 14 — escape routes adequately illuminated.</strong> The
                duty is to provide adequate emergency lighting. BS 5266-1 defines what 'adequate'
                means. A duty holder asserting compliance with Article 14 is implicitly asserting
                compliance with BS 5266-1 unless they can evidence an equivalent alternative.
              </li>
              <li>
                <strong>Court tests of reasonable practice.</strong> Where a fire causes harm and
                the matter goes to court, the question is: did the duty holder act as a reasonable
                competent person would? The court tests this against published codes of practice.
                BS 5266-1 is the published code for emergency lighting; departures invite the
                question 'why'.
              </li>
              <li>
                <strong>FRS audit benchmarks.</strong> The Fire and Rescue Service auditor checks
                installations against current BS 5266-1. Non-compliances are recorded;
                enforcement action escalates from informal advice through enforcement notices to
                prohibition notices and prosecution.
              </li>
              <li>
                <strong>Insurer expectations.</strong> Commercial insurance policies typically
                require BS 5266-1 compliance. Non-compliance is a defence to claims and a basis for
                premium loadings or refusal of cover.
              </li>
              <li>
                <strong>Justified departures.</strong> A departure must be evidence-based.
                Examples of justifiable departure: a heritage building where the architectural form
                prevents standard luminaire placement, with risk assessment showing equivalent
                safety via alternative means. Examples of unjustifiable departure: 'we did it that
                way last time'. The risk assessment is the test.
              </li>
            </ul>
            <p>
              Section 3 of this module deals with risk assessment in depth. For the standards side,
              the key takeaway is: BS 5266-1:2025 sets the benchmark. Comply with it and you have a
              defensible position. Depart from it without evidence and you do not.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Foreword (status of the document)"
            clause={
              <>
                This British Standard takes the form of guidance and recommendations. It should not
                be quoted as if it were a specification, and particular care should be taken to
                ensure that claims of compliance are not misleading. Compliance with a British
                Standard cannot confer immunity from legal obligations. The recommendations have
                been prepared on the assumption that they are applied by competent persons.
              </>
            }
            meaning="The status statement is double-edged. On one hand, the standard is guidance not law. On the other, a duty holder cannot avoid the underlying legal obligation by claiming the standard does not apply. The legal obligations come from the RRO 2005, Fire Safety Act 2021, Building Safety Act 2022 and HSAW 1974; BS 5266-1 is the technical means by which those obligations are typically met. Departures must be justified — and the justification is itself a competence test."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5266-1:2025 (effective 31 Oct 2025), BS EN 1838:2024 (effective Dec 2024), BS EN 50172:2024 (effective Jul 2024) — the current standards. Check publication dates on every reference.',
              'Scope of BS 5266-1:2025 — escape + standby + local area lighting. Unified under one document.',
              'Illuminance per BS EN 1838:2024 — 1 lx escape across the FULL WIDTH at floor level, with edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m); supersedes the 2013 centre-line + central-band wording. 0.5 lx anti-panic with 40:1 ratio; 15 lx OR 10 % normal at high-risk; 5 lx vertical at fire equipment.',
              'Switch-on — 5 s / 60 s for escape route and anti-panic; 0.5 s for high-risk task lighting.',
              'Duration — 1 h / 2 h / 3 h options. 3 h is the UK standard for non-domestic.',
              '5-year photometric verification — NEW in 2025. In-service lux measurement; catches LED depreciation, surface changes, luminaire ageing. Annual functional and duration tests do NOT replace it.',
              'High-risk circuit redundancy — NEW in 2025. ≥ 2 circuits, ≤ 20 luminaires affected by a single fault. Self-contained luminaires achieve this at the luminaire level.',
              'Borrowed light EXCLUDED — 2025 closes the loophole. Each escape route must have its own luminaires.',
              'Cross-references — BS 7671:2018 +A4:2026 §560 (cabling), BS 5839-1:2025 (fire alarm cause-and-effect), BS EN 50171 (central battery), BS EN 60598-2-22 (luminaire performance).',
              'Legal status — Code of Practice, not statute. But the benchmark of reasonable practice under RRO 2005 / Fire Safety Act 2021. Departures must be evidence-justified.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'When did BS 5266-1:2025 come into force, and what does that mean for existing installations?',
                answer:
                  'BS 5266-1:2025 was published in 2025 and effective from 31 October 2025. New designs from that date must satisfy the 2025 edition. Existing installations are not retrospectively non-compliant — they were built to the standard current at the time. They move to the 2025 edition through the natural maintenance and verification cycles. The first 5-year photometric verification under the 2025 regime is the typical trigger for remediation of issues like borrowed light or insufficient circuit redundancy.',
              },
              {
                question: 'Why does BS EN 1838:2024 require 1 lx across the FULL WIDTH of an escape route (with edge exclusions), not just the centre line?',
                answer:
                  'The earlier edition specified 1 lx on the centre line + 0.5 lx on a 2 m central band. The 2024 update replaces this with a full-width 1 lx rule and explicit edge exclusions (outer 0.5 m on routes > 2 m, outer ¼ width on routes ≤ 2 m), because occupants under stress do not walk along the geometric centre — they spread across the route. A route that meets 1 lx at the centre but only 0.3 lx within the non-excluded width is functionally inadequate. Designers must run the photometric calculation across the full width and demonstrate compliance within the non-excluded boundary.',
              },
              {
                question: 'What exactly does "high-risk task" mean in this context?',
                answer:
                  'High-risk task areas are locations where loss of normal lighting could cause immediate harm to occupants or operators. Examples: heavy machinery in operation, chemical processing, hot work, robot cells, presses. The fire risk assessment identifies these. The emergency lighting in these areas must be at 15 lx (or 10% of normal task illuminance, whichever higher) and must switch on in 0.5 s — fast enough that the operator can safely shut down the process before harm occurs.',
              },
              {
                question: 'Is the 5-year photometric verification really necessary if the annual tests pass?',
                answer:
                  'Yes. Annual tests verify two things: that the luminaire lights when mains is removed (functional test), and that the battery sustains the rated duration (duration test). Neither measures illuminance. LED depreciation, surface reflectance changes (paint, furniture), and luminaire substitution can all reduce in-service illuminance below design without affecting either annual test result. The 5-year photometric verification is the only check that catches this.',
              },
              {
                question: 'What is the relationship between BS 5266-1, BS EN 1838 and BS EN 50172?',
                answer:
                  'They interlock. BS 5266-1 is the procedural backbone — the code of practice covering design, installation, commissioning, maintenance and certification. BS EN 1838 is the illuminance arithmetic — the lux levels, uniformity ratios and switch-on times. BS EN 50172 is the system architecture — central battery vs self-contained, monitoring, test cycles. A correct installation satisfies all three. BS 5266-1 references the other two as normative — compliance with BS 5266-1 requires compliance with the relevant parts of EN 1838 and EN 50172.',
              },
              {
                question: 'Can we still use a 2016-edition design we already paid for?',
                answer:
                  'If the design is being constructed after 31 October 2025, the answer is no — the design must be brought up to the 2025 edition before construction. This typically means re-running the photometric calculation against the EN 1838:2024 requirements (full-width 1 lx, etc.), reviewing high-risk areas for the 2-circuit rule, eliminating any borrowed-light arrangements, and ensuring the documentation supports the 5-year verification cycle. The cost of bringing forward is typically modest compared to the cost of a non-compliant installation.',
              },
              {
                question: 'How does the new "local area lighting" category differ from "high-risk task" lighting?',
                answer:
                  'Local area lighting is a subset of high-risk task lighting introduced in EN 1838:2024 and codified in BS 5266-1:2025. It applies to specific machine or workstation locations within a wider area where the wider area lighting (escape route or anti-panic) is sufficient for evacuation but the local task requires more — a workbench within a larger workshop, for example. The illuminance and switch-on requirements are the same as high-risk task; the category exists to clarify the design approach for these mixed environments.',
              },
              {
                question: 'What is the legal force of BS 5266-1 if it is not statute?',
                answer:
                  'The legal force is indirect but powerful. The Regulatory Reform (Fire Safety) Order 2005 and the Fire Safety Act 2021 require duty holders to provide adequate emergency lighting (RRO Article 14) and maintain it (Article 17). BS 5266-1 defines what adequate and maintained mean in technical terms. Courts and Fire and Rescue Service auditors test compliance with the legal obligation by reference to BS 5266-1. Departures are permitted but must be evidence-justified — typically through risk assessment showing equivalent safety via an alternative approach.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Key clauses BS 5266-1 / EN 1838 — Module 6.1"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate(
                  '/electrician/upskilling/emergency-lighting-module-6-section-2'
                )
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Integration with fire safety regs
              </div>
            </button>
          </div>

          <div className="hidden">
            <BookOpen />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule6Section1;
