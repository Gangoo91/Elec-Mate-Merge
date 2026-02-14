import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  CheckCircle2,
  Building,
  Scale,
  Shield,
  Zap,
  AlertTriangle,
  BookOpen,
  Award,
  DollarSign,
  ClipboardCheck,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Commercial EICR Guide | Industrial Inspection UK';
const PAGE_DESCRIPTION =
  'Complete guide to commercial and industrial EICRs in the UK. Health and Safety at Work Act requirements, three-phase testing, larger installations, TT and TN-S earthing, documentation requirements, observation codes, costs, and frequency of inspection for commercial premises.';

const breadcrumbs = [
  { label: 'Certificates', href: '/guides' },
  { label: 'Commercial EICR Guide', href: '/guides/commercial-eicr-guide' },
];

const tocItems = [
  { id: 'what-is-commercial-eicr', label: 'What Is a Commercial EICR?' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'scope-and-planning', label: 'Scope and Planning' },
  { id: 'three-phase-testing', label: 'Three-Phase Testing' },
  { id: 'larger-installations', label: 'Larger Installations' },
  { id: 'documentation', label: 'Documentation Requirements' },
  { id: 'costs-and-frequency', label: 'Costs and Frequency' },
  { id: 'common-findings', label: 'Common Findings' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Commercial EICRs are a legal requirement under the Health and Safety at Work etc. Act 1974 and the Electricity at Work Regulations 1989 — employers have a legal duty to maintain electrical installations in a safe condition and to have them periodically inspected and tested.',
  'Three-phase installations require additional testing procedures including phase rotation checks, prospective fault current at every distribution board, and earth fault loop impedance measurements on all three phases — significantly more work than a domestic single-phase inspection.',
  'Commercial installations are typically larger and more complex than domestic, with multiple distribution boards, sub-mains, diverse earthing arrangements, and specialist equipment that all require systematic inspection and testing.',
  'The recommended inspection frequency for commercial premises is typically 5 years for offices and shops, 3 years for industrial and manufacturing, and 1 year for special locations such as petrol stations, swimming pools, and construction sites.',
  'Elec-Mate produces professional, BS 7671-compliant EICR documentation for commercial installations, with integrated schedule of test results, observation coding, and professional PDF export suitable for submission to building managers and insurers.',
];

const faqs = [
  {
    question: 'Is a commercial EICR a legal requirement in the UK?',
    answer:
      'Yes, commercial EICRs are effectively a legal requirement, although the legislation does not use the term "EICR" directly. The Health and Safety at Work etc. Act 1974 (Section 2) requires employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of employees. The Electricity at Work Regulations 1989 (Regulation 4) require that all electrical systems are maintained so as to prevent danger. The accepted method of demonstrating compliance with these duties is periodic inspection and testing in accordance with BS 7671 Chapter 64, documented on an EICR. Additionally, the Regulatory Reform (Fire Safety) Order 2005 requires a fire risk assessment, which should consider the condition of the electrical installation. Insurers also require evidence of periodic electrical inspection as a condition of cover. While there is no single regulation that says "you must have an EICR every X years," the combined effect of these legal duties means that a commercial premises without a current EICR is in breach of multiple legal obligations.',
  },
  {
    question: 'How often should a commercial EICR be done?',
    answer:
      'The recommended maximum intervals between inspections are published in BS 7671 Table 3A and IET Guidance Note 3 (GN3). For commercial and retail premises (offices, shops, hotels), the recommended interval is every 5 years. For industrial and manufacturing premises, the recommended interval is every 3 years due to the harsher operating environment and higher risk of damage. For special locations — such as construction sites, agricultural installations, petrol stations, swimming pools, and marinas — the recommended interval is annually or even more frequently. Places of entertainment require inspection every 1-3 years depending on the licensing authority. These are maximum intervals — if the installation is subject to harsh conditions, heavy use, or a history of defects, more frequent inspection may be appropriate. The "next inspection recommended before" date on the EICR should reflect the specific conditions of the installation, not just the default table values.',
  },
  {
    question: 'How much does a commercial EICR cost?',
    answer:
      'Commercial EICR costs vary enormously depending on the size and complexity of the installation. A small shop or office with a single distribution board and 20-30 circuits might cost GBP 300-500. A medium-sized commercial unit with multiple distribution boards and 50-100 circuits might cost GBP 800-1,500. A large commercial building or industrial unit with extensive three-phase installations, multiple sub-mains, and specialist equipment might cost GBP 2,000-5,000 or more. Very large installations (multi-storey office blocks, shopping centres, factories, hospitals) are typically priced per distribution board or per circuit rather than as a lump sum, and the total cost can run into tens of thousands of pounds. Pricing should reflect the time required for thorough inspection and testing — a commercial EICR that is priced too cheaply is unlikely to be thorough enough to meet the legal standard. Always ask for a detailed scope and methodology before accepting a price.',
  },
  {
    question: 'What is different about testing three-phase installations?',
    answer:
      'Three-phase installations require several additional testing procedures beyond what is needed for single-phase domestic installations. Phase rotation must be verified to ensure the correct phase sequence (typically L1, L2, L3 in clockwise rotation) — incorrect phase rotation can cause three-phase motors to run backwards. Prospective fault current must be measured at every distribution board, including phase-to-phase (line-to-line) fault current as well as phase-to-earth, because the highest prospective fault current may occur between phases. Earth fault loop impedance must be tested on circuits supplied from each phase, as values can differ between phases depending on the cable route and the position of the circuit within the distribution board. Three-phase distribution boards require testing of all three phase connections, neutral connections, and the protective conductor. The schedule of test results must clearly identify which phase supplies each circuit. Three-phase testing takes significantly longer than single-phase and requires a tester with the appropriate qualifications and experience.',
  },
  {
    question: 'Who can carry out a commercial EICR?',
    answer:
      'A commercial EICR must be carried out by a competent person — someone with the necessary qualifications, experience, and knowledge to inspect and test the type of installation being assessed. For commercial and industrial installations, this typically means a qualified electrician holding the City & Guilds 2391 (or equivalent) inspection and testing qualification, with current BS 7671 18th Edition certification, and demonstrable experience with commercial and three-phase installations. The inspector must be competent with the specific type of installation — experience of domestic EICRs alone is not sufficient competence for a complex industrial installation. Many commercial clients and building managers require the inspector to be registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. The EICR must be signed by the inspector (who carried out the physical inspection and testing) and may also require sign-off by a supervisor or duty holder.',
  },
  {
    question: 'How does Elec-Mate help with commercial EICRs?',
    answer:
      'Elec-Mate provides comprehensive EICR tools that support the full commercial inspection and testing workflow. The EICR form follows the BS 7671 format with all required sections, including the general characteristics section (which captures information about the type of supply, earthing arrangement, prospective fault current, and protective devices) that is particularly important for commercial installations. The integrated schedule of test results handles multi-board installations with clear board-by-board organisation. The observation coding system (C1, C2, C3, FI) follows the current BS 7671 classification with descriptions for each observation. Professional PDF export produces documentation suitable for submission to building managers, facilities teams, insurers, and enforcement officers. All data is stored securely in the cloud and can be accessed from any device, which is particularly useful for inspectors working across multiple commercial sites.',
  },
];

const sections = [
  {
    id: 'what-is-commercial-eicr',
    heading: 'What Is a Commercial EICR?',
    content: (
      <>
        <p>
          A commercial EICR (Electrical Installation Condition Report) is a detailed inspection and
          testing report on the electrical installation of a commercial or industrial premises. It
          assesses the condition and safety of the fixed wiring, distribution equipment, and
          earthing and bonding arrangements against the requirements of{' '}
          <SEOInternalLink href="/guides/bs7671-18th-edition-guide">BS 7671</SEOInternalLink> (the
          IET Wiring Regulations), recording any defects, deterioration, or non-compliances as coded
          observations.
        </p>
        <p>
          While the EICR format is the same for domestic and commercial installations (the BS 7671
          form is universal), commercial EICRs differ significantly in scope, complexity, and the
          expertise required. Commercial installations typically involve three-phase supplies,
          multiple distribution boards, sub-main cables, diverse earthing arrangements, and
          specialist equipment that requires specific knowledge to inspect and test safely.
        </p>
        <p>
          The purpose of a commercial EICR is to determine whether the electrical installation is in
          a satisfactory condition for continued service, to identify any defects that could pose a
          danger to persons or property, and to recommend remedial work and a date for the next
          inspection. The report provides the legal evidence that the duty holder (employer,
          landlord, or building manager) needs to demonstrate compliance with their obligations
          under health and safety legislation.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for Commercial Electrical Inspection',
    content: (
      <>
        <p>
          The legal framework for commercial electrical inspection is more extensive than for
          domestic premises, reflecting the higher risk associated with commercial and industrial
          installations and the employer's duty of care to employees and visitors.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                Health and Safety at Work etc. Act 1974
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Section 2 places a general duty on employers to ensure, so far as is reasonably
              practicable, the health, safety, and welfare at work of all employees. This includes
              the maintenance of plant and systems of work (including electrical installations) in a
              condition that is safe and without risks to health. Section 3 extends this duty to
              non-employees (visitors, contractors, members of the public) who may be affected by
              the employer's undertaking. A periodic EICR is the accepted method of demonstrating
              compliance with these duties in respect of the electrical installation.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Electricity at Work Regulations 1989</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Regulation 4(2) requires that every electrical system shall be maintained so as to
              prevent, so far as is reasonably practicable, such danger. The HSE Memorandum of
              Guidance on the Electricity at Work Regulations (HSR25) states that regular inspection
              and testing is an essential part of any preventive maintenance programme. Regulation
              16 requires that adequate records are kept — the EICR and schedule of test results
              constitute these records. These regulations apply to all workplaces, not just those
              with employees, and carry criminal penalties for non-compliance.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                Regulatory Reform (Fire Safety) Order 2005
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              The "responsible person" (usually the employer or building manager) must carry out a
              fire risk assessment that considers all potential sources of ignition, including
              electrical faults. An unsatisfactory electrical installation is a significant fire
              risk, and the fire risk assessment should reference the most recent EICR. Fire and
              rescue authorities can request to see the EICR during fire safety inspections, and the
              absence of a current EICR can result in enforcement action.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Insurance Requirements</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Commercial property insurance policies typically require the policyholder to maintain
              the electrical installation in good condition and to have periodic inspection and
              testing carried out by a competent person. Failure to maintain a current EICR may
              invalidate the insurance cover, leaving the business exposed in the event of a fire or
              electrical injury claim. Insurers may also specify a maximum interval between
              inspections that is shorter than the BS 7671 recommendation.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'scope-and-planning',
    heading: 'Scope and Planning',
    content: (
      <>
        <p>
          Planning a commercial EICR requires careful consideration of the scope of inspection, the
          extent of testing, the access arrangements, and the impact on business operations. Unlike
          a domestic EICR where the entire installation can typically be inspected in one visit,
          commercial EICRs may take multiple days and require careful coordination with building
          management.
        </p>
        <p>
          The scope must be clearly defined before work begins. What is included in the inspection?
          The fixed wiring and distribution equipment are always included. But does the scope extend
          to emergency lighting, fire alarm circuits, external installations, temporary
          installations, or tenant fit-out installations? These boundaries must be agreed with the
          client in writing to avoid disputes about what was and was not inspected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Planning Considerations</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Access to distribution boards</strong> — Are all
                boards accessible during normal working hours? Are keys required? Are any boards in
                restricted areas (server rooms, plant rooms, roof areas)?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Disruption to operations</strong> — Testing
                requires circuits to be disconnected. Which circuits can be tested during normal
                working hours and which require out-of-hours access? IT server circuits,
                refrigeration circuits, and security circuits often cannot be disconnected during
                business hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Previous reports</strong> — Obtain the previous
                EICR if available. It provides baseline data, highlights known issues, and allows
                comparison of test results over time to identify deterioration trends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Schematic drawings</strong> — Request any
                available drawings of the installation, including single-line diagrams, distribution
                board schedules, and cable route drawings. These significantly speed up the
                inspection process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">
                  <SEOInternalLink href="/guides/safe-isolation-procedure">
                    Safe isolation arrangements
                  </SEOInternalLink>
                </strong>{' '}
                — How will circuits be isolated for testing? Is there a{' '}
                <SEOInternalLink href="/guides/permit-to-work-electrician">
                  permit-to-work system
                </SEOInternalLink>{' '}
                on site? Who needs to be notified before circuits are disconnected?
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'three-phase-testing',
    heading: 'Three-Phase Testing',
    content: (
      <>
        <p>
          Three-phase installations are standard in commercial and industrial premises and require
          testing procedures that go beyond the single-phase testing familiar from domestic work.
          The additional tests, the higher voltage levels, and the larger fault currents involved
          make three-phase testing more demanding and more hazardous than single-phase work.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Phase Rotation</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Phase rotation must be verified at every three-phase distribution board using a phase
              rotation meter. The standard rotation in the UK is L1-L2-L3 (clockwise). Incorrect
              phase rotation causes three-phase motors to run in reverse, which can damage equipment
              and pose a safety hazard. Phase rotation must also be checked when paralleling
              supplies or connecting standby generators. The test is quick but critical — it should
              be the first test performed on any three-phase board.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Prospective Fault Current (PFC)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              PFC must be measured at every distribution board in the installation. In three-phase
              installations, both phase-to-earth and phase-to-phase fault currents must be measured,
              because the highest PFC may occur between phases rather than between a phase and
              earth. The measured PFC must not exceed the rated breaking capacity of the protective
              devices installed in the board. PFC values in commercial installations can be very
              high (10 kA, 16 kA, or more at the intake), so{' '}
              <SEOInternalLink href="/guides/prospective-fault-current-calculator">
                accurate measurement
              </SEOInternalLink>{' '}
              is essential for verifying that protective device ratings are adequate.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Earth Fault Loop Impedance (Zs)</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Earth fault loop impedance must be tested on circuits supplied from each phase. Values
              can differ between phases depending on the cable route, the position of the circuit
              within the distribution board, and the characteristics of the supply. The schedule of
              test results must identify which phase supplies each circuit and record the Zs value
              accordingly. In TN-S and TN-C-S earthing arrangements common in commercial premises,
              the external earth fault loop impedance (Ze) at the intake provides the baseline, with
              the circuit impedance (R1+R2) added to give the total Zs for each circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Insulation Resistance</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Insulation resistance testing on three-phase installations requires testing between
              all live conductors and earth (L1-E, L2-E, L3-E, N-E) and between all live conductors
              (L1-L2, L2-L3, L3-L1, L1-N, L2-N, L3-N). This is significantly more testing than a
              single-phase installation. The minimum acceptable value remains 1 M-ohm for circuits
              rated at 500 V or below, tested at 500 V DC. Each phase and the neutral must be tested
              individually to identify the specific conductor with degraded insulation if a low
              reading is obtained.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'larger-installations',
    heading: 'Larger Installations: Structure and Approach',
    content: (
      <>
        <p>
          Commercial installations range from a small shop with one distribution board to a
          multi-storey office building or factory with dozens of boards, sub-main cables, and a
          hierarchical distribution structure. Inspecting larger installations requires a systematic
          approach to ensure every part of the installation is assessed.
        </p>
        <p>
          The structure of a typical larger commercial installation includes a main intake (the
          point of supply from the DNO), the main switchboard or panel board, sub-main cables
          feeding distribution boards on each floor or in each area, and final circuits from each
          distribution board to the points of use. Each level of this hierarchy must be inspected
          and tested: the intake and main switchboard, each sub-main cable, each distribution board,
          and a representative sample (or all) of the final circuits.
        </p>
        <p>
          For very large installations, a 100% inspection and test of every circuit may not be
          practical or necessary. BS 7671 and GN3 allow for sampling, provided the sample size is
          sufficient to provide confidence in the condition of the installation as a whole. The
          sampling strategy must be documented on the EICR, explaining what percentage of circuits
          was tested and the rationale for the sample. If the sample reveals significant defects,
          the sample size must be increased to determine the extent of the problem.
        </p>
        <p>
          The EICR for a larger installation may cover multiple pages of schedule of test results,
          with separate schedules for each distribution board.{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes">Observation codes</SEOInternalLink>{' '}
          must be applied consistently across the entire installation, and the overall assessment
          (satisfactory or unsatisfactory) must reflect the worst findings across all parts of the
          installation.
        </p>
        <SEOAppBridge
          title="Commercial EICR documentation made easy"
          description="Elec-Mate handles multi-board commercial EICRs with structured, board-by-board schedules of test results. Professional PDF export produces documentation that meets building management and insurance requirements. BS 7671 compliant, every time."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation Requirements',
    content: (
      <>
        <p>
          Commercial EICR documentation must be thorough, accurate, and professionally presented.
          The report will be reviewed by building managers, facilities teams, insurers, enforcement
          officers, and potentially legal professionals in the event of an incident. Sloppy
          documentation undermines the credibility of the inspection and the inspector.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">EICR Documentation Package</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">EICR form</strong> — Completed per BS 7671
                including all sections: details of the installation, extent and limitations, supply
                characteristics, earthing and bonding arrangements, general characteristics,
                observations, and overall assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Schedule of test results</strong> — For every
                distribution board inspected, recording continuity, insulation resistance, polarity,
                earth fault loop impedance, PFC, and RCD test results for each circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Schedule of items inspected</strong> — A
                detailed checklist of all items visually inspected, confirming their condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Observations and recommendations</strong> — Each
                observation coded (C1, C2, C3, FI) with a clear description of the defect, its
                location, and the recommended remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Accompanying photographs</strong> — For
                commercial EICRs, photographs of significant defects, distribution boards, earthing
                arrangements, and general installation condition are expected.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The overall assessment — satisfactory or unsatisfactory — must be clearly stated. An
          installation is assessed as unsatisfactory if any C1 (danger present) or C2 (potentially
          dangerous) observations are recorded. The{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes">observation codes</SEOInternalLink>{' '}
          must be applied correctly and consistently, as incorrect coding can lead to legal
          challenges and professional liability issues.
        </p>
      </>
    ),
  },
  {
    id: 'costs-and-frequency',
    heading: 'Costs and Inspection Frequency',
    content: (
      <>
        <p>
          Commercial EICR costs are determined by the size of the installation (number of
          distribution boards and circuits), the complexity of the installation (three-phase,
          specialist equipment, diverse earthing), the access arrangements (normal hours vs
          out-of-hours working), and the location (London and South East rates are higher than other
          regions).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Recommended Inspection Intervals</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <span className="text-white font-medium">Offices, shops, hotels</span>
              <span className="text-yellow-400 font-bold">Every 5 years</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Industrial, manufacturing</span>
              <span className="text-yellow-400 font-bold">Every 3 years</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Cinemas, restaurants, pubs</span>
              <span className="text-yellow-400 font-bold">Every 3 years</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Agricultural, horticultural</span>
              <span className="text-yellow-400 font-bold">Every 3 years</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Construction sites</span>
              <span className="text-yellow-400 font-bold">Every 3 months</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Petrol stations, launderettes</span>
              <span className="text-yellow-400 font-bold">Every 1 year</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-medium">Swimming pools, marinas</span>
              <span className="text-yellow-400 font-bold">Every 1 year</span>
            </div>
          </div>
        </div>
        <p>
          These intervals are guidelines, not absolute rules. The inspector should set the "next
          inspection recommended before" date based on the specific condition of the installation,
          its environment, and the nature of the business. An installation in good condition in a
          clean office environment may safely go to the maximum interval. An installation showing
          signs of deterioration in a harsh industrial environment should be inspected more
          frequently.
        </p>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common Findings on Commercial EICRs',
    content: (
      <>
        <p>
          Certain defects and non-compliances appear repeatedly on commercial EICRs. Being aware of
          these common findings helps inspectors know what to look for and helps building managers
          understand the typical issues that arise.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Lack of Main Bonding</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Missing or inadequate main equipotential bonding to metallic service pipes (gas,
              water, oil) is one of the most common C2 observations on commercial EICRs. Bonding
              conductors may have been removed during plumbing alterations or were never installed.
              BS 7671 Regulation 411.3.1.2 requires main bonding conductors to
              extraneous-conductive-parts including metallic service pipes, structural steelwork,
              and lightning protection systems.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Inadequate RCD Protection</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Older commercial installations often lack RCD protection on socket outlet circuits,
              which is required by BS 7671 Regulation 411.3.3 for socket outlets rated up to 32 A.
              This is typically coded C3 (improvement recommended) rather than C2 because the
              installation may have been compliant with the regulations in force at the time of
              installation. However, the inspector should consider whether the absence of RCD
              protection represents a genuine risk in the specific circumstances.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Poor Labelling</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Distribution boards with missing, illegible, or inaccurate circuit charts are
              extremely common in commercial premises. Circuits may have been added, removed, or
              repurposed without updating the chart. This makes{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation
              </SEOInternalLink>{' '}
              difficult and increases the risk of the wrong circuit being disconnected. BS 7671
              Regulation 514.9.1 requires every distribution board to have a durable chart
              identifying each circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Overcrowded Distribution Boards</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Commercial distribution boards are frequently overcrowded with additional circuits
              squeezed in, cables dressed poorly, and neutral bars overloaded. Overcrowding can lead
              to overheating, difficulty in identifying circuits, and challenges with safe
              isolation. The original design spare capacity has been consumed by additions over the
              years, and what should be a tidy, well-organised board has become a mess of cables and
              connections.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Professional EICR tools for commercial inspections"
          description="Elec-Mate produces BS 7671-compliant EICR documentation with multi-board support, clear observation coding, and professional PDF export. Build your reputation with documentation that impresses building managers and facilities teams."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate Guide',
    description: 'Complete guide to completing EICRs including the schedule of test results.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3, and FI observation codes explained with examples.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the current UK wiring regulations and amendments.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'GS 38 prove-test-prove method for safe isolation on commercial installations.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/inspection-testing-course',
    title: '2391 Inspection & Testing Course',
    description: 'Guide to the City & Guilds 2391 qualification for inspection and testing.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK',
    description: 'What an EICR should cost — domestic and commercial pricing guide.',
    icon: DollarSign,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CommercialEICRGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificates"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          Commercial EICR Guide:{' '}
          <span className="text-yellow-400">Industrial Inspection & Testing</span>
        </>
      }
      heroSubtitle="The complete guide to commercial and industrial EICRs in the UK. Legal requirements, three-phase testing, larger installations, documentation standards, costs, inspection frequency, and common findings — everything you need to deliver professional commercial inspections."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Professional commercial EICR tools"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for BS 7671-compliant EICR documentation, multi-board test result schedules, and professional PDF export. Impress building managers with documentation that stands up to scrutiny. 7-day free trial, cancel anytime."
    />
  );
}
