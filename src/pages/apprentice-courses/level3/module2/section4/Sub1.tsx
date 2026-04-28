/**
 * Module 2 · Section 4 · Subsection 1 — Building Regulations Part L + MCS framework
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and
 *             non-statutory requirements for the installation and maintenance of
 *             environmental technology systems"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 1.4 (interpret requirements for electrical
 * installations as outlined in relevant sections of the Building Regulations and the
 * Code for Sustainable Homes) and AC 3.3 (Local Authority Building Control requirements
 * for environmental technology systems).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed MCS sign-off competence belongs in
 * the technology-specific MCS quals (2399 / 2919 / 2921), not 2365-03. This Sub gives
 * the L3 electrician the regulatory map — what governs what, and where the boundaries sit.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Building Regulations Part L + MCS framework (4.1) | Level 3 Module 2.4.1 | Elec-Mate';
const DESCRIPTION =
  'The regulatory framework for environmental technology systems — Building Regulations Part L (Conservation of Fuel and Power), Future Homes Standard, MCS Code and Installation Standards, Boiler Upgrade Scheme, Smart Export Guarantee. Where each rule sits and what it actually requires of the L3 electrician on a UK install.';

const checks = [
  {
    id: 'l3-m2-s4-sub1-part-l-vs-mcs',
    question:
      'A customer asks "do I need MCS to install a heat pump?". What\'s the precise answer?',
    options: [
      'Yes — it\'s legally required.',
      "No, MCS is not legally required to install a heat pump. Building Regulations Part L compliance is required for any new heating system in a notifiable installation, but Part L can be demonstrated by various pathways. MCS is required if the customer wants the Boiler Upgrade Scheme (BUS) grant — currently £7,500 toward an ASHP install. Most manufacturer warranties also require MCS-certified installation. So in practice almost every install is MCS, even though it isn't a legal install requirement. Without MCS the customer can have a working heat pump; they just don't get the grant or the warranty.",
      'Only on Wednesdays.',
      'MCS is for solar only.',
    ],
    correctIndex: 1,
    explanation:
      "The MCS-vs-legal-requirement distinction is one of the most commonly muddled points on environmental tech. MCS is a competence and quality scheme — not a regulator. Its enforcement comes through funding gateways (BUS grant, SEG export tariff) and through manufacturer warranty conditions. Building Regulations Part L is the legal framework that applies regardless of MCS. The customer's pragmatic answer is usually 'go MCS' but the legal answer is 'Part L compliance is the legal floor; MCS is the funding gateway'.",
  },
  {
    id: 'l3-m2-s4-sub1-future-homes',
    question:
      'What is the Future Homes Standard and when does it take effect?',
    options: [
      'A planning rule that\'s been around for 50 years.',
      "The Future Homes Standard is the Government's policy framework for new-build dwellings, expected to take effect on a phased basis from 2025. It tightens Part L of the Building Regulations to require new-build homes to produce 75-80% lower CO₂ emissions than the previous standard. In practice it effectively rules out fossil-fuel boilers in new-build (heat pump or hydrogen-ready boiler instead), pushes higher fabric standards, and credits PV / MVHR / smart controls in the SAP calculation. The Future Homes Standard sits downstream of the Climate Change Act 2008 (as amended for the 2050 net-zero duty).",
      'It\'s an EU rule that lapsed after Brexit.',
      'It only applies to listed buildings.',
    ],
    correctIndex: 1,
    explanation:
      "Future Homes Standard is the regulatory mechanism that will normalise heat pumps + PV + MVHR as the default new-build kit. The phased timeline reflects implementation lead-times for the supply chain. As the L3 electrician you'll see Future Homes Standard new-build sites where the integration of heat pump + PV + MVHR + smart controls is the routine kit, not the exotic add-on.",
  },
  {
    id: 'l3-m2-s4-sub1-bus-grant',
    question:
      'A customer wants the £7,500 Boiler Upgrade Scheme grant for an ASHP. What\'s the L3 electrician\'s role in securing it?',
    options: [
      'Sign the grant application yourself.',
      "Indirectly — your role is to make sure the install meets the standard the MCS-certified installer is signing off against. The BUS grant requires the installation to be done by an MCS-certified installer, who applies for the grant on the customer's behalf. As the L3 electrician on the install you carry out the electrical work to the certified installer's design, complete the BS 7671 inspection-and-testing, and contribute to the customer handover pack. The certified installer is the named accountable person for the MCS sign-off; you don't sign it yourself unless you're personally MCS-certified for heat pumps.",
      'Apply directly to the customer\'s bank.',
      'There\'s no grant — that scheme has closed.',
    ],
    correctIndex: 1,
    explanation:
      "The BUS grant is the current main UK government incentive for low-carbon heating retrofits. It replaced the Renewable Heat Incentive (RHI) which closed in 2022. The grant is paid to the installer who passes it through to the customer as a price reduction. Without MCS sign-off the customer can't claim the grant. As the apprentice on the install you support the MCS process; you don't substitute for it.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What does Part L of the Building Regulations cover and how does it relate to environmental technology systems?',
    options: [
      'Part L covers fire safety only.',
      "Part L (Conservation of Fuel and Power) is the section of the Building Regulations governing the energy efficiency of buildings. It applies to new dwellings, extensions, replacement boilers, replacement windows, controlled fittings, and major refurbishments. Compliance is demonstrated via the SAP (Standard Assessment Procedure) calculation for dwellings or SBEM (Simplified Building Energy Model) for non-domestic. Environmental technology systems contribute to Part L compliance: PV adds generation credits to the SAP score, heat pumps reduce the regulated carbon emissions, MVHR reduces ventilation losses. Successive Part L revisions have tightened the target rate, pushing more environmental tech into the standard build specification.",
      'Part L is the lighting regulation only.',
      'Part L is for listed buildings only.',
    ],
    correctAnswer: 1,
    explanation:
      "Part L is the energy-efficiency regulator for buildings. It applies regardless of whether the customer 'wants' to install environmental tech — the SAP / SBEM target rate has to be met to get Building Regs sign-off for new-build and major refurbishment. Environmental tech is increasingly the routine route to compliance rather than an optional add-on.",
  },
  {
    id: 2,
    question:
      'What is the SAP and why does it matter for an environmental technology install?',
    options: [
      'The SAP is the colour of the cable insulation.',
      "The Standard Assessment Procedure (SAP) is the methodology for calculating the energy performance of dwellings under Part L of the Building Regulations. It produces a SAP rating (1-100+) and a regulated CO₂ emissions figure that must beat the Target Emission Rate (TER). PV, heat pumps, MVHR, smart controls and fabric measures all feed into the SAP calculation. The MCS-certified installer's design pack typically includes the system's contribution to the SAP score; that contribution is what gets the building Building Regs sign-off.",
      'A type of fuse.',
      'A solar charge controller.',
    ],
    correctAnswer: 1,
    explanation:
      "SAP is the calculation engine behind Part L compliance for dwellings (SBEM is the equivalent for non-domestic). Every environmental tech install in a Part L-relevant context contributes to a SAP calculation. As the L3 electrician you don't run the SAP yourself but you should recognise that the installer's design pack feeds into it.",
  },
  {
    id: 3,
    question:
      'What is the MCS Code of Practice and what does it require of installers?',
    options: [
      'A dress code for trade events.',
      "The MCS Code of Practice is the over-arching code that all MCS-certified installers must comply with. It covers consumer protection (sales practices, contracts, performance estimates honestly disclosed), installation quality, commissioning records, customer handover documentation, complaints handling and after-sales support. The installer's MCS certification can be withdrawn for breaches of the Code. The Code references the technology-specific MCS Installation Standards (MIS 3001 solar thermal, 3002 PV, 3003 wind, 3004 biomass boiler, 3005 heat pump, 3006 biomass stove, 3007 EV, 3008 hydro, 3012 battery storage) for the technical detail.",
      'A bus timetable.',
      'A Welsh-language requirement.',
    ],
    correctAnswer: 1,
    explanation:
      "The MCS Code is the consumer-protection framework for the certified-installer industry. It sits alongside the technical MIS standards. As an apprentice on an MCS-certified install you don't sign off the Code yourself but you should recognise that customer-facing conversations, performance estimates and handover documentation all sit within the Code's framework.",
  },
  {
    id: 4,
    question:
      'What\'s the difference between a notifiable and non-notifiable electrical installation under Building Regs Part P?',
    options: [
      'There\'s no such distinction.',
      "Part P (Electrical Safety in Dwellings) requires certain types of electrical work in dwellings to be notified to Building Control — either via a registered competent-person scheme (NICEIC, NAPIT, etc.) or directly to the Local Authority. Notifiable work currently includes new circuits, consumer unit changes, and work in special locations (bathrooms / locations 700). Most environmental tech installs are notifiable — adding a PV inverter circuit, an EV charging circuit or a heat-pump dedicated radial all create new circuits and trigger Part P notification. Non-notifiable work (e.g. like-for-like socket replacement on an existing circuit) doesn't trigger Part P.",
      'Notifiable means it works on a Sunday.',
      'Both terms mean the same thing.',
    ],
    correctAnswer: 1,
    explanation:
      "Part P is the safety regulator for domestic electrical work. Adding any environmental tech circuit (PV, EV, heat pump, battery storage) is notifiable — your firm registers the work via the competent-person scheme and the customer receives a Building Regs compliance certificate. Skipping notification leaves the customer unable to demonstrate Part P compliance to a future buyer / surveyor / insurer.",
  },
  {
    id: 5,
    question:
      'What is the Boiler Upgrade Scheme (BUS) and what does it pay for?',
    options: [
      'A scheme to upgrade hot-water cylinders only.',
      "The BUS is the current main UK government grant for low-carbon heating retrofits — currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and lower amounts toward biomass boilers in eligible properties. The grant is administered by Ofgem and paid to the MCS-certified installer who passes it through to the customer as a price reduction. Eligible properties: existing dwellings (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC. The grant has been extended several times and is currently confirmed through the late 2020s.",
      'A free bus pass.',
      'A grant for chimney sweeps.',
    ],
    correctAnswer: 1,
    explanation:
      "BUS is the de facto subsidy that makes heat-pump retrofit financially competitive with fossil-fuel replacement for many UK households. The MCS sign-off is the gateway to the grant. As the L3 electrician on a BUS-funded install you don't claim the grant yourself but your work has to support the MCS install pack that triggers it.",
  },
  {
    id: 6,
    question:
      'What is the Smart Export Guarantee (SEG) and how does it apply to a domestic PV installation?',
    options: [
      'It\'s a guarantee the customer will export to Europe.',
      "SEG is a regulated payment scheme requiring electricity suppliers to pay domestic generators for electricity exported to the grid. Replaced the Feed-in Tariff (FiT) which closed to new entrants in 2019. SEG tariffs vary by supplier (typically 5-15p/kWh in 2026); customers shop around for the best rate. To qualify, the install must be MCS-certified and the meter must be capable of recording export (most modern smart meters are). The customer signs up for SEG with their chosen supplier; it isn't automatic.",
      'A health and safety briefing.',
      'A type of inverter.',
    ],
    correctAnswer: 1,
    explanation:
      "SEG is the current export-payment mechanism for domestic PV. The MCS sign-off is the gateway, the smart meter is the measurement, the supplier is the payer. Customer-facing conversations should mention SEG eligibility — without it the customer's payback calculation is wrong by the export value.",
  },
  {
    id: 7,
    question:
      'Where does the Code for Sustainable Homes sit in the regulatory framework?',
    options: [
      'It\'s the current mandatory standard.',
      "The Code for Sustainable Homes was a non-mandatory sustainability rating system (1 to 6 stars) for new-build dwellings, used between 2007 and 2015 in England. It was withdrawn for new applications in March 2015 and replaced by enhanced Part L of the Building Regulations and (for higher-rated developments) by local-authority-specific sustainability requirements. You may still meet the Code referenced on older properties (a Code Level 4 or Level 5 home from 2010-2014 will have been built to Code spec) but it isn't the current standard for new applications.",
      'It\'s a building standard for boats.',
      'It only applies in Scotland.',
    ],
    correctAnswer: 1,
    explanation:
      "The Code is largely historical now in England — replaced by enhanced Part L. The 2357 Unit 602 syllabus references it by name (AC 1.4) because the qualification text pre-dates the withdrawal. As an apprentice in 2026 you should recognise the Code by name and explain its historical role, but you'll meet Part L (and Future Homes Standard) as the live regulators on current work.",
  },
  {
    id: 8,
    question:
      'What\'s the role of Local Authority Building Control in an environmental technology install?',
    options: [
      'They have no role.',
      "Building Control is the local-authority enforcement of the Building Regulations. For most environmental tech installs the route is via a competent-person scheme (the installer's firm is registered with NICEIC / NAPIT / similar, and self-certifies the work) — Building Control is notified by the scheme but doesn't visit. For non-notifiable work (e.g. some maintenance) Building Control isn't involved. For installs that fall outside competent-person schemes, or for major works, Building Control may inspect on-site. The customer receives a Building Regs compliance certificate — either from the competent-person scheme or from Building Control directly.",
      'They are a private members club.',
      'They only inspect commercial buildings.',
    ],
    correctAnswer: 1,
    explanation:
      "The competent-person scheme route is the normal mechanism. The customer doesn't typically deal with Building Control directly — they get the compliance certificate from the installer's scheme. The 2357 Unit 602 syllabus AC 3.3 specifically references Local Authority Building Control because some major environmental tech projects (e.g. commercial-scale hydro, large biomass boilers) bypass the competent-person route and go directly to LABC.",
  },
];

const faqs = [
  {
    question: "If MCS isn't legally required, why is everyone obsessed with it?",
    answer:
      "Because MCS is the gateway to most of the financial incentives. The Boiler Upgrade Scheme grant requires MCS-certified installation. The Smart Export Guarantee requires MCS-certified installation for the customer to claim export payments. Most manufacturer warranties require MCS-certified installation. The Renewable Heat Incentive (closed 2022) and the Feed-in Tariff (closed 2019) historically required MCS too. So while you can technically install non-MCS, the customer almost always loses money by doing so. In practice MCS-certified install is the default, and non-MCS is the exception.",
  },
  {
    question: "Which environmental tech installs are notifiable under Part P?",
    answer:
      "Almost all of them in domestic property. PV: yes (new circuits). EV charging: yes. Heat pump: yes (new dedicated circuit). Battery storage: yes. MVHR: typically yes (new dedicated circuit). Biomass boiler: usually yes (new dedicated circuit for the controls and pump). Wind / hydro: yes. The general rule for Part P notifiability: any new circuit, consumer unit work, or work in a special location (bathroom etc.) is notifiable. Most environmental tech adds a new circuit, so most environmental tech is notifiable. The competent-person scheme handles the notification for the installer's firm.",
  },
  {
    question: "What's the Permitted Development position for ASHP outdoor units?",
    answer:
      "ASHP is generally Permitted Development in England (and broadly similar in the devolved nations) subject to MCS 020 sound-assessment compliance, distance from boundary, and not being installed on a flat roof or on the principal elevation facing a highway. Where MCS 020 isn't met or the install is in a conservation area / on a listed building, full planning permission is required. The MCS-certified installer runs the MCS 020 check at design stage. The customer doesn't normally need to apply for planning unless one of the exclusions applies.",
  },
  {
    question: "Does the customer's EPC need to be updated after an environmental tech install?",
    answer:
      "Yes for major work. Adding PV, a heat pump or insulating the property changes the SAP rating; the EPC should be re-issued to reflect the new performance. The certified installer normally arranges this as part of the handover pack. Mortgage lenders, insurers and future buyers refer to the EPC; an out-of-date EPC understates the property's actual performance. EPCs are valid for 10 years from issue.",
  },
  {
    question: "What happens if I install non-MCS — is there a legal consequence?",
    answer:
      "No legal consequence to the install itself (assuming Part P, BS 7671 and Building Regs are satisfied). The consequence is to the customer: no BUS grant, no SEG export payments, manufacturer warranty likely void. As the L3 electrician you can install non-MCS and the install can be safe and compliant — but you owe the customer an honest conversation about what they're giving up. Most customers, when informed, opt for the MCS-certified route.",
  },
  {
    question: "How does the regulatory framework differ between England, Scotland, Wales and Northern Ireland?",
    answer:
      "Building Regulations are devolved — England, Scotland, Wales and Northern Ireland each have their own. The structure is similar but the detailed targets differ. Scotland's equivalent of Part L is Section 6 of the Scottish Technical Standards. Wales has its own version of Part L within its Building Regulations. Northern Ireland has Part F. MCS is UK-wide. BS 7671 is UK-wide (and Channel Islands / Isle of Man). ENA G98/G99 is UK-wide. Future Homes Standard is England's scheme; the devolved nations have their own equivalents on similar timescales. As the L3 electrician working across borders, check the local Building Regulations equivalent.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 1"
            title="Building Regulations Part L + MCS framework"
            description="The regulatory framework for environmental technology systems — Building Regs Part L (energy), Future Homes Standard, MCS Code and Installation Standards, Boiler Upgrade Scheme, Smart Export Guarantee. Where each rule sits and what it actually requires."
            tone="emerald"
          />

          <TLDR
            points={[
              "Building Regulations Part L (Conservation of Fuel and Power) is the legal framework for energy efficiency in buildings. Compliance demonstrated via SAP (dwellings) or SBEM (non-domestic). Environmental tech is increasingly the standard route to compliance.",
              "Future Homes Standard tightens Part L for new-build from 2025 — effectively rules out fossil-fuel boilers in new-build, normalises heat pump + PV + MVHR + smart controls.",
              "MCS is not legally required to install — it's the funding gateway (Boiler Upgrade Scheme grant for heat pumps, Smart Export Guarantee for PV export). Manufacturer warranties also typically require MCS.",
              "Building Regs Part P makes most environmental tech installs notifiable. The competent-person scheme route (NICEIC, NAPIT) handles notification on the installer's behalf.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify Part L of the Building Regulations as the energy-efficiency framework for buildings, and state how environmental technology systems contribute to Part L compliance via the SAP / SBEM calculation.",
              "Recognise the Future Homes Standard as the upcoming tightening of Part L for new-build dwellings.",
              "Distinguish MCS (funding gateway and quality scheme) from the legal regulatory framework (Building Regs, BS 7671). Identify the Boiler Upgrade Scheme and Smart Export Guarantee as the current main MCS-gated incentives.",
              "Identify Building Regulations Part P as the safety regulator for domestic electrical work and recognise that most environmental tech installs are notifiable under Part P.",
              "Identify the technology-specific MCS Installation Standards (MIS 3001-3012) and their respective scopes.",
              "Recognise the role of Local Authority Building Control and the competent-person scheme route to Part P / Part L sign-off.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Building Regulations Part L — the legal floor</ContentEyebrow>

          <ConceptBlock
            title="Part L is the energy-efficiency regulator for buildings"
            plainEnglish="Part L of the Building Regulations (Conservation of Fuel and Power) sets minimum energy-performance standards for new and refurbished buildings in England (with equivalents in the devolved nations). Compliance is demonstrated through a calculation methodology — SAP for dwellings, SBEM for non-domestic. Successive Part L revisions have tightened the targets, pushing more environmental tech into the standard build specification."
            onSite="On a new-build site or major refurbishment you'll see the Part L compliance pack — heat-loss calc, SAP score, SAP recommendations, contribution from environmental tech (PV credits, heat pump SCOP, MVHR efficiency). The MCS-certified designer typically produces the environmental tech contribution; the SAP assessor compiles the overall compliance pack."
          >
            <p>
              How environmental tech contributes to Part L compliance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV</strong> — generation credits in the SAP calculation reduce the
                regulated CO₂ emission rate, helping the dwelling beat the Target Emission
                Rate (TER).
              </li>
              <li>
                <strong>Heat pumps</strong> — lower regulated CO₂ per kWh of heat than
                fossil-fuel boilers, particularly as the grid carbon intensity falls.
              </li>
              <li>
                <strong>MVHR</strong> — reduces ventilation heat losses in airtight
                buildings, contributing to the fabric energy efficiency score.
              </li>
              <li>
                <strong>Smart controls</strong> — load-shedding / demand-response capability
                gives a (modest) SAP credit.
              </li>
              <li>
                <strong>Fabric measures</strong> — insulation, glazing, airtightness — the
                largest single SAP contribution in most dwellings, and the foundation that
                makes other measures effective.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010, Approved Document L (Conservation of Fuel and Power)"
            clause={
              <>
                Approved Document L sets out the methodology for demonstrating Part L
                compliance and the minimum standards for fabric, services and on-site
                generation. For dwellings, SAP is the assessment methodology and the dwelling
                must meet a Target Emission Rate (TER) and a Target Fabric Energy Efficiency
                (TFEE) calculated for the specific design.
              </>
            }
            meaning={
              <>
                Approved Document L is the live document for Part L compliance — different
                editions apply for different commencement dates, so the install pack needs
                to use the right version. The Future Homes Standard editions (expected
                phased in from 2025) tighten the targets significantly. As the L3 electrician
                you don&apos;t run the SAP yourself, but you should recognise that the
                installer&apos;s design pack feeds into a regulated compliance calculation.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L (paraphrased from the published Approved Document available via gov.uk)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>MCS — the funding gateway and quality scheme</ContentEyebrow>

          <ConceptBlock
            title="MCS is not a regulator — it's a funding gateway"
            plainEnglish="The Microgeneration Certification Scheme (MCS) is a non-statutory competence and quality scheme administered by MCS Service Co. Installers join the scheme, pay annual membership, and submit installs for sign-off against the relevant Installation Standard (MIS). Customers who use MCS-certified installers can access funding incentives — currently the Boiler Upgrade Scheme grant for heat pumps and the Smart Export Guarantee for PV export. Most manufacturer warranties also require MCS-certified installation."
            onSite="The MCS-certified installer is the named accountable person on the install pack. As an apprentice on the install you carry out the work to the certified installer's design and contribute to the install record, but you don't sign off the MCS pack yourself unless you're personally MCS-certified for the technology in question."
          >
            <p>
              The MCS Installation Standards by technology:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MIS 3001</strong> — Solar thermal hot water systems
              </li>
              <li>
                <strong>MIS 3002</strong> — Solar PV systems
              </li>
              <li>
                <strong>MIS 3003</strong> — Small wind turbine systems
              </li>
              <li>
                <strong>MIS 3004</strong> — Biomass boilers
              </li>
              <li>
                <strong>MIS 3005</strong> — Heat pumps (ASHP, GSHP, water-source)
              </li>
              <li>
                <strong>MIS 3006</strong> — Biomass stoves
              </li>
              <li>
                <strong>MIS 3007</strong> — EV chargepoints (selected aspects; not the
                primary EV regulator)
              </li>
              <li>
                <strong>MIS 3008</strong> — Small hydro systems
              </li>
              <li>
                <strong>MIS 3012</strong> — Battery storage systems
              </li>
            </ul>
            <p>
              All MCS Installation Standards reference BS 7671 explicitly for the electrical
              detail. MCS doesn&apos;t replace BS 7671; it adds installer-quality and
              consumer-protection requirements on top.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Boiler Upgrade Scheme</ContentEyebrow>

          <ConceptBlock
            title="The current main grant for heat-pump retrofit"
            plainEnglish="The Boiler Upgrade Scheme (BUS) is the UK government's grant for low-carbon heating retrofits. Currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and £5,000 toward a biomass boiler in eligible properties. Administered by Ofgem, paid to the MCS-certified installer who passes it through as a price reduction to the customer. Replaced the Renewable Heat Incentive (RHI) which closed in 2022."
            onSite="The grant requires: the customer's property to be an existing dwelling (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC; the installer to be MCS-certified for the relevant technology; the install to be signed off against the relevant MIS standard. The certified installer applies for the grant on the customer's behalf via the Ofgem portal. As an apprentice on a BUS-funded install your work supports the MCS install pack but you don't apply for the grant."
          >
            <p>
              The customer-facing logic:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                BUS is what makes heat-pump retrofit financially competitive with fossil-
                fuel replacement for many UK households.
              </li>
              <li>
                Without MCS the customer can&apos;t access BUS — and the £7,500 difference
                usually swings the install economics.
              </li>
              <li>
                The grant is currently confirmed through the late 2020s (with periodic
                budget renewals).
              </li>
              <li>
                Eligibility requires no outstanding insulation recommendations on the EPC —
                which means fabric upgrades may be needed before the grant can be claimed.
                The MCS-certified installer guides the customer through this.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Smart Export Guarantee</ContentEyebrow>

          <ConceptBlock
            title="Payment for exported PV / wind / hydro generation"
            plainEnglish="The Smart Export Guarantee (SEG) requires electricity suppliers above a customer threshold to offer a tariff for electricity exported to the grid by domestic generators. Replaced the Feed-in Tariff (FiT) which closed to new entrants in 2019. SEG tariffs vary by supplier (5-15p/kWh in 2026); customers shop around. To qualify the install must be MCS-certified and the meter must be capable of recording export."
            onSite="As the L3 electrician on a PV install, the SEG eligibility check is part of the customer handover. The meter must be smart-meter-capable of separate import and export registers. The MCS sign-off paperwork is the gateway to the customer signing up with their chosen supplier. SEG is the financial argument for sizing PV slightly above immediate consumption — the surplus is paid for, not lost."
          >
            <p>
              Practical SEG considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Tariff rates vary widely between suppliers — the customer should shop
                around. Some suppliers offer enhanced rates for customers who also import
                from them (bundled offers).
              </li>
              <li>
                The customer signs up for SEG with their chosen supplier; it isn&apos;t
                automatic. The MCS install pack provides the supporting documentation.
              </li>
              <li>
                Smart meter required — older import-only meters can&apos;t measure export.
                The DNO / supplier arranges meter replacement if required.
              </li>
              <li>
                Some installs use a battery primarily to maximise self-consumption (avoiding
                the modest SEG tariff in favour of the higher avoided-import savings).
                Tariff vs avoided-import is the financial calculation.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Building Regs Part P and notifiable work</ContentEyebrow>

          <ConceptBlock
            title="Most environmental tech installs are notifiable under Part P"
            plainEnglish="Building Regulations Part P (Electrical Safety in Dwellings) requires certain types of electrical work in dwellings to be notified to Building Control — either directly or via a registered competent-person scheme (NICEIC, NAPIT, ELECSA, Stroma, etc.). Most environmental tech installs add new circuits and therefore trigger Part P notification. The competent-person scheme route handles notification on the installer's behalf."
            onSite="As the L3 electrician on the install you work to the certified-installer's design and complete the BS 7671 inspection and testing. The notification is handled by the firm's competent-person scheme registration. The customer receives a Building Regs compliance certificate from the scheme — typically posted within 30 days of the install."
          >
            <p>
              Notifiable work that environmental tech typically triggers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New circuits</strong> — PV inverter circuit, EV charging circuit,
                heat-pump dedicated radial, MVHR supply, biomass controls supply, battery
                storage circuit. All notifiable.
              </li>
              <li>
                <strong>Consumer unit work</strong> — relocating, extending or replacing the
                consumer unit. Notifiable.
              </li>
              <li>
                <strong>Special locations</strong> — work in bathrooms (Part 7 special
                locations) is notifiable.
              </li>
              <li>
                <strong>Non-notifiable</strong> — like-for-like socket replacement on an
                existing circuit, replacing a fitting (no circuit change). Mostly
                housekeeping work.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>SAP and SBEM — the calculation methodologies</ContentEyebrow>

          <ConceptBlock
            title="SAP for dwellings, SBEM for non-domestic — the engines behind Part L"
            plainEnglish="SAP (Standard Assessment Procedure) is the government&apos;s methodology for calculating the energy and carbon performance of dwellings. SBEM (Simplified Building Energy Model) does the same job for non-domestic buildings. Both produce a score against a benchmark; both produce an EPC rating (A-G) for the customer. Both are run by an accredited assessor — not by the L3 electrician — but the inputs come from the design pack including the environmental technology contribution."
            onSite="The L3 apprentice does not run a SAP calc but should recognise the inputs the install contributes. Heat pump SCOP, PV kWp and orientation, MVHR efficiency, smart controls capability, fabric U-values, air permeability all feed in. The output is the dwelling&apos;s Dwelling Emission Rate (DER, kgCO2 per m2 per year) and Target Emission Rate (TER, set by Part L per the design specification). DER must beat TER for compliance. The Future Homes Standard reduces TER significantly, effectively requiring environmental tech to hit it."
          >
            <p>
              SAP / SBEM key concepts:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DER (Dwelling Emission Rate)</strong> — calculated CO2
                emissions per m2 per year for the actual design.
              </li>
              <li>
                <strong>TER (Target Emission Rate)</strong> — the maximum allowable,
                set by Part L for the type and design.
              </li>
              <li>
                <strong>FEE (Fabric Energy Efficiency)</strong> — fabric heat-loss
                metric independent of services. Future Homes Standard introduces a
                minimum FEE to stop fabric being undersized in favour of services.
              </li>
              <li>
                <strong>Primary energy</strong> — kWh of source energy per kWh
                delivered. Future Homes Standard adds a primary-energy ceiling
                alongside the carbon target.
              </li>
              <li>
                <strong>EPC rating</strong> — A-G banding presented to the customer.
                Built from SAP score; required at sale or rent of any dwelling.
              </li>
              <li>
                <strong>Installer&apos;s contribution</strong> — the design pack
                including heat pump SCOP, PV array spec and orientation, MVHR
                efficiency, smart controls capability all feed in.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Devolved-nation regulatory differences</ContentEyebrow>

          <ConceptBlock
            title="Building Regs differ across the four UK nations — recognise the framework where you are"
            plainEnglish="Building Regulations are devolved. England has Approved Documents L and P. Wales has its own Approved Documents L and P, similar but not identical. Scotland has Building Standards (Section 6 covers energy, Section 4 covers electrical safety) administered by Local Authority Building Standards. Northern Ireland has Technical Booklets (F covers energy, P covers electrical safety, equivalent to England&apos;s Part P). The MCS scheme is UK-wide; the Boiler Upgrade Scheme is Great Britain only (Northern Ireland has separate funding via the Northern Ireland Sustainable Energy Programme)."
            onSite="The L3 apprentice working across the four nations should recognise the framework name and where the rule sits, even if the technical content is broadly similar. The MCS-certified designer applies the local rules; the apprentice executes the install. Documentation differs — in Scotland the Building Standards completion certificate replaces the Building Regs Part P compliance certificate; in Wales the regs are Welsh-language as well as English. Smart Export Guarantee applies UK-wide. Renewables Obligation applies to commercial-scale generation."
          >
            <p>
              The four-nation regulatory map:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>England</strong> — Approved Document L (energy), Approved
                Document P (electrical safety in dwellings). Boiler Upgrade Scheme.
                Smart Export Guarantee.
              </li>
              <li>
                <strong>Wales</strong> — Welsh equivalents of Approved Documents L and
                P. Boiler Upgrade Scheme. Smart Export Guarantee.
              </li>
              <li>
                <strong>Scotland</strong> — Building Standards Section 6 (energy),
                Section 4 (electrical safety). Local Authority Building Standards
                completion certificate. Home Energy Scotland funding alongside Boiler
                Upgrade Scheme.
              </li>
              <li>
                <strong>Northern Ireland</strong> — Technical Booklets F (energy) and
                P (electrical safety). Northern Ireland Sustainable Energy Programme
                instead of Boiler Upgrade Scheme. Smart Export Guarantee.
              </li>
              <li>
                <strong>UK-wide</strong> — MCS scheme, BS 7671, ENA G98 / G99,
                F-Gas Regulations, OZEV Smart Charge Points Regulations 2021.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Future Homes Standard and the heat-pump market trajectory</ContentEyebrow>

          <ConceptBlock
            title="FHS plus Clean Heat Market Mechanism are pushing the trajectory toward 600,000 heat pumps a year by 2028"
            plainEnglish="The Future Homes Standard tightens Part L for new-build dwellings to a level effectively requiring heat pumps and PV as standard. The Clean Heat Market Mechanism (CHMM) places obligations on boiler manufacturers to sell a rising proportion of heat pumps each year, backed by financial penalties for missing the target. Together these measures aim to grow UK domestic heat pump installations from ~60,000 in 2023 to ~600,000 per year by 2028."
            onSite="For the L3 apprentice this is the single biggest career-relevant trend. The volume of environmental tech work is going to grow significantly across the rest of the 2020s. The apprentice who treats Unit 301 as serious foundation, layers the MCS standalone qualifications (2399 PV, 2919 ASHP, 3012 BESS, 2921 EV) on top, and develops competence in integrated installs is going to be in high demand. The apprentice who treats it as a tick-box overview unit will have to catch up later. The market trajectory is clear; the regulatory direction is clear; the apprentice&apos;s career planning should reflect that."
          >
            <p>
              The headline policy and market drivers shaping 2026-2030:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Future Homes Standard</strong> — phased in from 2025 for
                new-build. Effectively requires heat pumps + PV + low-carbon
                services. Eliminates fossil-fuel boilers from new-build.
              </li>
              <li>
                <strong>Clean Heat Market Mechanism</strong> — boiler manufacturers
                obligated to sell rising proportion of heat pumps. Backed by financial
                penalties. Aims to drive market scale.
              </li>
              <li>
                <strong>Boiler Upgrade Scheme</strong> — currently £7,500 grant
                toward heat pump retrofit. Confirmed through 2028. Drives
                retrofit volume.
              </li>
              <li>
                <strong>Phase-out of new fossil-fuel boiler installations</strong> —
                target of 2035 for off-gas-grid, with broader trajectory toward
                phasing out gas boilers in subsequent years.
              </li>
              <li>
                <strong>EV mandate</strong> — Zero Emission Vehicle mandate requires
                rising proportion of new car sales to be electric. Drives EV charging
                install volume.
              </li>
              <li>
                <strong>Network reinforcement</strong> — DNOs investing in network
                capacity to absorb the heat pump and EV load. Periodic free supply
                upgrades for low-carbon installs in some areas.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Telling the customer 'MCS is just paperwork — let's skip it'"
            whatHappens={
              <>
                Apprentice or unscrupulous installer tells the customer MCS &quot;isn&apos;t
                really needed&quot; and offers a cheaper non-MCS install. Customer accepts.
                Install completes; customer applies for BUS grant — refused because the
                installer isn&apos;t MCS-certified. Customer applies for SEG — supplier
                refuses because the install lacks MCS sign-off. Customer&apos;s
                manufacturer warranty is voided. The £1,000-2,000 the customer thought
                they&apos;d saved by going non-MCS is dwarfed by the £7,500 BUS grant
                they&apos;ve just lost.
              </>
            }
            doInstead={
              <>
                Be honest with the customer about what MCS gives them and what it doesn&apos;t.
                MCS is not a legal requirement to install, but it is the gateway to the
                grants and incentives that make the install financially viable for most
                customers. A non-MCS install is technically possible but the customer
                almost always loses money on the deal. The right framing is &quot;MCS-
                certified install for the financial benefits + the manufacturer warranty;
                non-MCS only in unusual cases where the customer specifically declines
                grants and warranties&quot;.
              </>
            }
          />

          <CommonMistake
            title="Confusing Part L (energy) with Part P (electrical safety)"
            whatHappens={
              <>
                Apprentice tells the customer &quot;Part P covers energy efficiency&quot;.
                Customer is confused because the EPC says nothing about Part P. The two
                regulations cover entirely different things and the apprentice has
                conflated them.
              </>
            }
            doInstead={
              <>
                Memorise the split: Part L is energy efficiency (SAP / SBEM, fabric
                standards, services efficiency, on-site generation credits). Part P is
                electrical safety in dwellings (notifiable work, competent-person scheme,
                Building Regs compliance certificate). Both apply to most environmental tech
                installs but they regulate different things. The customer&apos;s EPC
                reflects Part L; the Building Regs compliance certificate reflects Part P.
              </>
            }
          />

          <Scenario
            title="Heat-pump retrofit — what the customer needs to know about the regulatory pack"
            situation={
              <>
                You&apos;re working on a BUS-funded ASHP retrofit. The MCS-certified
                installer has handled the design, the MCS application, the BUS grant
                application and the Building Regs Part L compliance pack. You&apos;ve
                completed the electrical first-fix and the F-Gas engineer is in tomorrow
                for the refrigerant work. The customer asks &quot;so what do I actually
                get at the end of all this paperwork?&quot;.
              </>
            }
            whatToDo={
              <>
                Run the customer through the handover pack they&apos;ll receive: (1) MCS
                install certificate — the formal sign-off that triggers the BUS grant and
                supports the manufacturer warranty; (2) BUS grant payment confirmation —
                deducted from the install invoice as a price reduction; (3) Building Regs
                Part P compliance certificate — from the firm&apos;s competent-person
                scheme, posted within 30 days; (4) updated EPC reflecting the new heat
                pump (typically arranged by the installer); (5) electrical installation
                certificate (EIC) for the new circuit; (6) heat-pump commissioning records,
                SCOP estimate, manufacturer&apos;s instructions, customer operating guide.
                Keep the pack safe — needed for future house sale, mortgage, insurance.
              </>
            }
            whyItMatters={
              <>
                The handover pack is what the customer actually keeps. The work you and the
                F-Gas engineer and the certified installer have done all converges into
                that pack. A future buyer / surveyor / insurer will ask to see it.
                Without it the customer can&apos;t prove the install was done to standard.
                Walking the customer through the pack at handover is the moment the trust
                in the install is built.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (PV) extensive revision"
            clause={
              <>
                Section 712 &apos;Solar photovoltaic (PV) power supply systems&apos; has been
                extensively revised and expanded in BS 7671:2018+A4:2026. The technical content
                of this section has been extensively revised and expanded and now contains
                updated requirements specific to PV systems.
              </>
            }
            meaning={
              <>
                Building Regs Part L drives the demand for PV through the SAP target rate; BS
                7671 Section 712 governs the electrical installation of the PV that satisfies
                that demand. They sit alongside one another — Part L for energy / SAP credit,
                Section 712 for safe installation. A4:2026 reset the Section 712 wording.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712 — verbatim from published facets."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 (EV charging) significant changes"
            clause={
              <>
                Section 722 of Part 7 of BS 7671:2018+A4:2026 covers electric vehicle charging
                installations. The published text indicates that this section contains
                significant changes to the Regulation(s) applicable to EV charging
                installations; installers and certifiers shall consult Section 722 for the
                updated requirements and obligations.
              </>
            }
            meaning={
              <>
                The OZEV Smart Charge Points Regulations 2021 govern what may be sold; BS 7671
                Section 722 governs what may be installed and how. A4:2026 brought significant
                changes to PME / TN-C-S handling that the L3 electrician needs to be aware of
                even if the MCS-certified installer makes the final design call.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722 — verbatim from published facets."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Building Regulations Part L (Conservation of Fuel and Power) is the legal energy-efficiency framework. Compliance via SAP / SBEM. Environmental tech contributes to compliance.",
              "Future Homes Standard tightens Part L for new-build from 2025 — effectively rules out fossil-fuel boilers in new-build, normalises heat pump + PV + MVHR.",
              "MCS is not legally required to install — it's the funding gateway. Boiler Upgrade Scheme grant (£7,500 ASHP / GSHP) and Smart Export Guarantee both require MCS sign-off.",
              "MCS Installation Standards (MIS 3001-3012) cover each technology family. All reference BS 7671 explicitly for the electrical detail.",
              "Building Regs Part P (Electrical Safety in Dwellings) makes most environmental tech installs notifiable. Competent-person scheme route (NICEIC, NAPIT) handles notification.",
              "Part L (energy) and Part P (electrical safety) are different regulations. Both apply to most environmental tech installs but regulate different things.",
              "The SAP calculation is the methodology behind Part L compliance for dwellings. PV, heat pumps, MVHR, smart controls and fabric all feed into the SAP score.",
              "The customer's handover pack — MCS certificate, BUS confirmation, Part P compliance certificate, updated EPC, EIC, commissioning records — is what they keep. Future house sale / mortgage / insurance depends on it.",
            ]}
          />

          <Quiz title="Building Regs + MCS framework — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.3 MVHR, wind, micro-CHP overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 BS 7671 712/722/753 + G98/G99
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
