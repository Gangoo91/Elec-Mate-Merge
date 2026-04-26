/**
 * Module 3 · Section 6 · Sub 4 — Installation requirements for micro-renewables
 * Maps to City & Guilds 2365-02 / Unit 203 / LO6 / AC 6.2
 *   AC 6.2 — “Identify requirements for installation of micro-renewable energies”
 *
 * Source notes: NEW content. The regulatory framework — G98/G99 (ENA),
 * MCS scheme, BS 7671 Section 712 (PV), DC/AC isolation, anti-islanding,
 * earthing, documentation.
 *
 * Renamed 2026-04-25: was Sub 2, moved to Sub 4 when §6 expanded with
 * new Solar PV deep dive (Sub 2) and Battery storage deep dive (Sub 3).
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
  'Installation requirements for micro-renewables (6.2) | Level 2 Module 3.6.4 | Elec-Mate';
const DESCRIPTION =
  'G98 vs G99 DNO connection paperwork, MCS certification, BS 7671 Section 712 (PV), DC and AC isolation, anti-islanding, PV earthing, commissioning documentation.';

const checks = [
  {
    id: 'mr-g98-vs-g99',
    question:
      'A customer wants a 5 kW single-phase PV inverter on a 230 V supply. Which DNO connection process applies?',
    options: [
      'G98 — informal post-installation notification.',
      'G99 — full DNO application before installation begins.',
      'No paperwork — DNOs don’t care about generation under 10 kW.',
      'BS 7671 Section 701 only.',
    ],
    correctIndex: 1,
    explanation:
      'G98 covers parallel-connected generation up to and including 16 A per phase (≈3.68 kW on a 230 V single-phase supply). 5 kW is roughly 21.7 A — over the 16 A per phase limit — so it sits in G99 territory. G99 requires a formal application to the DNO before the install is connected, and the DNO can refuse or impose conditions if the local network can’t take the extra capacity.',
  },
  {
    id: 'mr-anti-islanding',
    question:
      'A grid-tied PV inverter must disconnect from the supply within how long if it loses the grid?',
    options: [
      '2 seconds.',
      '200 ms.',
      '5 minutes.',
      'It doesn’t — it should keep generating to support the supply.',
    ],
    correctIndex: 1,
    explanation:
      '200 ms (0.2 s) is the headline anti-islanding requirement under ENA G98 / G99 (and the underlying BS EN 50549-1 / 50549-2 product standards). The reason is safety — if the grid drops because the DNO has shut a section for maintenance, you cannot have a customer’s inverter back-feeding the network and electrocuting the linesman. The inverter senses the loss of grid frequency and voltage references and trips off automatically.',
  },
  {
    id: 'mr-dc-and-ac-isolation',
    question:
      'A PV install needs a DC isolator on the array side AND an AC isolator on the consumer-unit side. Why both?',
    options: [
      'Belt-and-braces — only one is strictly required.',
      'Because the DC side is energised by daylight on the panels, and the AC side is energised by the grid. To work safely on the inverter or its terminals you need to isolate BOTH sources independently and prove both dead.',
      'Only the AC isolator is required by Section 712.',
      'Only the DC isolator is required by Section 712.',
    ],
    correctIndex: 1,
    explanation:
      'Two independent live sources, two independent isolators. Reg 712.410.101 makes it explicit: the DC side is to be considered energised even when the AC side is disconnected, because the panels are still generating. So Section 712 requires both a DC isolator (between the array and the inverter) and an AC isolator (between the inverter and the consumer unit). Open both, prove both dead, then work.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'ENA Engineering Recommendations G98 and G99 — what do they cover and where do they sit in the regulatory stack?',
    options: [
      'They are sections of BS 7671.',
      'They are Distribution Network Operator engineering recommendations governing how customer-owned generation is connected in parallel with the public supply network — separate from BS 7671 (a British Standard) and from MCS (a certification scheme).',
      'They are HSE guidance documents.',
      'They are a sub-section of the Electricity Safety, Quality and Continuity Regulations.',
    ],
    correctAnswer: 1,
    explanation:
      'G98 and G99 are Engineering Recommendations published by the Energy Networks Association (ENA) on behalf of the GB DNOs. They sit alongside BS 7671 — BS 7671 tells you how to wire the install safely; G98/G99 tell you how (and whether) the DNO will allow you to connect it to their network. BS 7671 Note 1 of Reg 551 even cross-references G98/G99 explicitly.',
  },
  {
    id: 2,
    question:
      'MCS — what does it stand for and what does it actually do?',
    options: [
      'Ministry of Construction Standards — sets building regulations.',
      'Microgeneration Certification Scheme — a UK-government-backed certification scheme for installers and products of micro-generation. MCS is required to access most consumer financial schemes (including the Smart Export Guarantee) and is in practice mandatory for any commercial domestic install.',
      'Manufacturer Compliance Standard — a BS 7671 chapter.',
      'Mains Cable Specification — the standard for SWA cable.',
    ],
    correctAnswer: 1,
    explanation:
      'MCS — Microgeneration Certification Scheme — is a UK quality-mark scheme covering both the products (panels, inverters, batteries, heat pumps) and the installers. It’s not a legal regulation in itself, but the customer needs an MCS-certified install to qualify for the Smart Export Guarantee (SEG) payments from energy suppliers. In practice, every domestic micro-renewable install in the UK is done by an MCS-certified installer because non-MCS installs are commercially unviable for the customer.',
  },
  {
    id: 3,
    question:
      'BS 7671 Reg 712.410.101 says: “Electrical equipment on the DC side shall be considered to be energized, even when the AC side is disconnected from the grid or when the inverter is disconnected from the DC side.” What does this mean in practice?',
    options: [
      'You don’t need a DC isolator if you have an AC isolator.',
      'Pulling the AC isolator at the consumer unit doesn’t kill the panels — the DC string is still live. You need to operate the DC isolator AND prove dead at DC before any work on the inverter, the combiner box or the string cables.',
      'PV systems are always energised — there’s no safe way to work on them.',
      'The DC side automatically de-energises when the inverter is off.',
    ],
    correctAnswer: 1,
    explanation:
      'Two completely independent live sources sit either side of the inverter — the AC grid and the DC PV string. Each one needs its own isolator and each one needs to be proven dead before anyone touches the kit. Section 712 makes this explicit because it’s the single biggest cause of PV-related electric shocks: an electrician assumes that pulling the consumer-unit MCB has killed everything, when in fact the DC side is still humming away at 300+ volts.',
  },
  {
    id: 4,
    question:
      'A 4 kW PV install on a TN-C-S supply — what’s the BS 7671 Reg 712.531.3.5.1 RCD type requirement?',
    options: [
      'No RCD needed.',
      'A Type B RCD is required for the PV AC supply circuit, unless the inverter provides at least simple separation between AC and DC sides (which most modern transformerless inverters do not, but transformer-isolated inverters do), or the manufacturer states a Type B is not required.',
      'A Type AC RCD is sufficient.',
      'A 100 mA Type S RCD only.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 712.531.3.5.1 says the RCD on the PV AC supply circuit shall be Type B (per BS EN 62423 or BS EN 60947-2), unless the inverter provides simple separation between AC and DC, or the inverter manufacturer specifies otherwise. The reason: a transformerless inverter can pass smooth DC fault current through to the AC side, which a Type AC or Type A RCD won’t reliably detect. Always check the inverter manufacturer’s instructions — they’ll specify the required RCD type.',
  },
  {
    id: 5,
    question:
      'ENA G98 vs G99 — what is the threshold and how do the connection processes differ?',
    options: [
      'G98 is for over 16 A per phase, G99 is for under 16 A per phase.',
      'G98 covers parallel-connected generation up to and including 16 A per phase (informal post-installation notification to the DNO); G99 covers generation greater than 16 A per phase (full pre-installation application to the DNO, with the DNO able to refuse or impose conditions).',
      'They’re the same document.',
      'G98 only applies to wind; G99 only applies to solar.',
    ],
    correctAnswer: 1,
    explanation:
      'Quote from BS 7671 Note 1 (cross-referenced in Section 551): “ENA Engineering Recommendation G98 (up to and including 16 A per phase) and G99 (greater than 16 A per phase).” G98 is a “fit it then tell us” process for small-scale generation (PV, micro-wind, etc.), where the DNO is notified within 28 days of commissioning. G99 is a “ask permission first” process for larger generation, where the DNO can require network reinforcement or refuse the connection if the local capacity isn’t there.',
  },
  {
    id: 6,
    question:
      'Documentation handed over after a domestic PV install — what should the customer get?',
    options: [
      'A receipt only.',
      'An EIC (Electrical Installation Certificate) for the new circuit, the inverter manufacturer’s commissioning sheet, the DNO G98/G99 commissioning notice (filed with the DNO), the MCS certificate (issued by the MCS scheme), and the building regulations notification.',
      'Just the inverter handbook.',
      'Nothing — the installer keeps all paperwork.',
    ],
    correctAnswer: 1,
    explanation:
      'A correctly handed-over PV install produces a thick wallet of paperwork. The EIC covers the BS 7671 wiring side. The G98 commissioning notice (or G99 commissioning report) goes to the DNO. The MCS certificate is what the customer needs for SEG payments and for some house-sale evidence. Building regs notification (typically through Part P self-cert) covers the change to the consumer unit. Missing any one of these can stop the customer claiming SEG or selling the house cleanly.',
  },
  {
    id: 7,
    question:
      'A grid-tied PV inverter loses the grid (the DNO has dropped the supply for maintenance). What must the inverter do, and why?',
    options: [
      'Keep generating to support the local network.',
      'Disconnect within 200 ms (anti-islanding) — if it didn’t, it would back-feed the dead network and put any DNO engineer working on the lines at risk of a fatal shock from “islanded” customer-side generation.',
      'Wait 60 seconds before disconnecting.',
      'Switch to battery mode.',
    ],
    correctAnswer: 1,
    explanation:
      '200 ms anti-islanding is one of the headline requirements of G98/G99 (and the BS EN 50549-1/50549-2 product standards underneath). The risk it prevents: a DNO engineer goes out to fix a fault, isolates a section of LV cable, and starts working on it — and a customer-owned inverter on that section is still pumping 230 V onto the dead conductors. The inverter senses the loss of frequency and voltage stability and disconnects within 200 ms, eliminating the risk.',
  },
  {
    id: 8,
    question:
      'A customer asks you to “just slap on” a PV system without going through MCS — they say they don’t care about SEG payments. Is it legal and is it sensible?',
    options: [
      'Legal, never sensible — selling a non-MCS install means the customer can never claim SEG, can’t sell the house with a renewables certificate, and may invalidate their building insurance. The DNO G98/G99 paperwork is still mandatory regardless of MCS status.',
      'Illegal — only MCS installers can install PV.',
      'Always fine — MCS is just a brand name.',
      'You can’t install PV without MCS.',
    ],
    correctAnswer: 0,
    explanation:
      'MCS is a scheme, not a law. There is no legal requirement to be MCS-registered to install PV — you can do the work as a competent electrician under Part P. But the practical reality is brutal: no MCS = no SEG payments, awkward house-sale conversations, and some insurers refusing to cover non-MCS installs. The DNO G98/G99 commissioning paperwork still needs filing whether the install is MCS or not. In practice, every domestic install is done MCS.',
  },
];

const faqs = [
  {
    question: 'What’s the difference between BS 7671, MCS and G98/G99?',
    answer:
      'Three separate regulatory tracks that all apply at once. BS 7671 is the wiring standard (the IET Wiring Regulations) — it tells you how to install the kit safely. MCS is a UK certification scheme covering installers and products — it’s the route the customer needs for SEG payments and for clean house-sale paperwork. G98/G99 are ENA Engineering Recommendations — they tell the DNO what you’re connecting to their network and let the DNO refuse or impose conditions if local capacity is short. All three apply to every domestic PV install.',
  },
  {
    question: 'Why does my inverter need a Type B RCD when most appliances are fine on Type A?',
    answer:
      'Most modern PV inverters are “transformerless” — they don’t electrically isolate the AC side from the DC side internally. Under fault conditions, smooth DC fault current can be pushed through to the AC side. A Type AC or Type A RCD will magnetically saturate and stop seeing AC faults reliably when DC is present. Type B handles AC, pulsating DC and smooth DC, which is why Reg 712.531.3.5.1 mandates it for transformerless PV inverters. If your inverter has a built-in transformer providing simple separation, you can downgrade to Type A — but always check the manufacturer’s instructions.',
  },
  {
    question: 'How do I notify the DNO under G98? What does the form look like?',
    answer:
      'Each DNO publishes its own G98 commissioning form (UK Power Networks, Northern Powergrid, SP Energy Networks, etc.). It captures the install address, the inverter make/model/rating, the grid-protection settings, the test results, and the MCS certificate number. You submit it within 28 days of commissioning. For G99, it’s the other way round — you submit a G99 application before the install starts, the DNO comes back with conditions or a witness-test requirement, and you commission against those.',
  },
  {
    question: 'Are RCDs allowed on a PV install at all? I’ve heard you should avoid them.',
    answer:
      'Reg 712.531.3.5.1 NOTE 2 reads: “Installation methods that do not require additional protection by use of an RCD are recommended.” In other words, BS 7671 prefers a design that avoids the need for RCD protection on the PV AC circuit (typically by routing the cable in a way that meets the requirements without RCD additional protection). Where an RCD is needed (e.g. cables in walls less than 50 mm deep without earthed mechanical protection), it has to be Type B unless the inverter provides simple separation. Read the regulation properly — it’s not banning RCDs, it’s nudging the design away from needing one.',
  },
  {
    question: 'What earthing arrangement is required for the PV array structure?',
    answer:
      'The metallic frame of the PV array — the rails, the panel frames, the mounting hardware — needs to be earthed in line with BS 7671 (typically through a 6 mm² earthing conductor back to the main earthing terminal, often via the inverter or directly to the MET). Reg 712.312.2 also covers the optional earthing of one DC live conductor where simple separation between AC and DC sides exists. The detail is in the inverter manufacturer’s instructions, the MCS install standard MIS 3002 and the IET Code of Practice for Grid-Connected Solar PV.',
  },
  {
    question: 'Can I commission the inverter myself, or does it need a manufacturer engineer?',
    answer:
      'You can — most inverters are commissioned by the installing electrician using the manufacturer’s app or web-portal. You set the grid code (G98 or G99 settings appropriate to your DNO), confirm the export limit if applicable, run the inverter through a self-test, and capture the test report. The manufacturer’s commissioning sheet is one of the documents you hand over to the customer and submit with the G98/G99 notice.',
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 4"
            title="Installation requirements for micro-renewables"
            description="Hooking up generation to the grid is regulated. Three independent rule tracks apply at once — BS 7671 (the wiring standard), ENA G98/G99 (DNO connection paperwork) and MCS (the UK certification scheme). Skip any of them and you’re either disconnected, fined, or both."
            tone="emerald"
          />

          <TLDR
            points={[
              'Three separate regulatory tracks: BS 7671 (Section 712 for PV; Section 551 for other parallel generation), ENA G98 (≤ 16 A per phase) or G99 (> 16 A per phase) for DNO connection, and MCS for installer/product certification.',
              'PV needs both a DC isolator (panels-side) and an AC isolator (grid-side) — Reg 712.410.101 makes it explicit that the DC side stays energised even when the AC side is dead.',
              'Anti-islanding: the inverter must disconnect within 200 ms of losing the grid (G98/G99). Type B RCD is the default for transformerless inverters (Reg 712.531.3.5.1).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify ENA G98 and G99 thresholds and explain the difference between the post-installation notification (G98) and pre-installation application (G99) processes.',
              'State the role of the Microgeneration Certification Scheme (MCS) — for installers, for products, and for the customer’s SEG eligibility.',
              'Identify BS 7671 Section 712 as the dedicated PV regulation and cite the key clauses on DC-side energisation, isolation, RCD type, and PV-array earthing.',
              'Explain why both DC and AC isolation are required for any PV or battery install, and why anti-islanding (200 ms) protects DNO engineers.',
              'Specify the correct RCD type (typically Type B) for a transformerless inverter under Reg 712.531.3.5.1.',
              'List the documentation pack handed over at commissioning: EIC, manufacturer commissioning sheet, G98/G99 notice, MCS certificate, building-regs notification.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The three regulatory tracks</ContentEyebrow>

          <ConceptBlock
            title="BS 7671, ENA G98/G99 and MCS — three separate tracks, all apply at once"
            plainEnglish="BS 7671 says how to wire it. G98/G99 say whether the DNO will let you connect it. MCS says whether the customer can claim SEG or sell the house cleanly. Skip any one and you’ve got a problem."
            onSite="Apprentices often hear the three names mixed up — “MCS regs”, “G98 rules”, “the wiring regs”. They’re not the same thing and they cover different bases. Get this straight in the first month."
          >
            <p>
              Every domestic micro-renewable install in the UK has to satisfy three independent
              regulatory frameworks simultaneously. They’re published by different bodies, they cover
              different concerns, and skipping any one of them creates a different kind of problem:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:2018+A4:2026 — the IET Wiring Regulations.</strong> A British Standard
                covering electrical safety. For PV, the home section is <strong>Section 712</strong>. For
                wind, hydro, CHP and other generators in parallel with the supply, it’s <strong>Section
                551</strong> (low voltage generating sets), specifically <strong>551.7</strong> on
                parallel operation.
              </li>
              <li>
                <strong>ENA Engineering Recommendation G98 / G99.</strong> Published by the Energy
                Networks Association on behalf of the GB Distribution Network Operators (DNOs). These tell
                the DNO what you’re connecting to their network — <strong>G98</strong> for connections up
                to and including 16 A per phase (informal notification after the install),
                <strong> G99</strong> for connections greater than 16 A per phase (formal application
                before the install).
              </li>
              <li>
                <strong>MCS — Microgeneration Certification Scheme.</strong> A UK-government-backed
                certification scheme covering both <em>installers</em> (the person and company doing the
                work) and <em>products</em> (panels, inverters, batteries, heat pumps). MCS is required
                in practice for the customer to claim Smart Export Guarantee (SEG) payments and for clean
                house-sale evidence.
              </li>
            </ul>
            <p>
              These three are not sub-sections of each other. BS 7671 is a British Standard. G98/G99 are
              ENA documents. MCS is a separate scheme. They overlap at the install but they’re published
              and enforced by three different bodies.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 551 NOTE 1 (cross-reference to ENA G98/G99) (paraphrased)"
            clause="The parallel operation of a private source with the public supply network is subject to authorization by the distribution network operator (DNO). This may require special devices, for example to prevent reverse power. Refer also to Section 551, the D Code (Distribution Code of licensed distribution operators) and ENA Engineering Recommendations G98 (up to and including 16 A per phase) and G99 (greater than 16 A per phase)."
            meaning={
              <>
                BS 7671 itself defers the connection paperwork to the DNO via the ENA Engineering
                Recommendations. The Wiring Regulations explicitly cross-reference G98 and G99 in this
                NOTE. So when somebody says “the regs cover micro-generation”, the answer is: BS 7671
                covers the wiring side and tells you to read G98/G99 for the DNO side. You can’t do one
                without the other.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Section 551 NOTE 1 for full text. G98 and G99 are ENA Engineering Recommendations published separately and downloadable from the ENA Connection Portal."
          />

          <SectionRule />

          <ContentEyebrow>G98 vs G99 — the per-phase 16 A threshold</ContentEyebrow>

          <ConceptBlock
            title="G98 — small generation, post-installation notification"
            plainEnglish="If your inverter is rated at 16 A per phase or less, you fit it first and tell the DNO afterwards. 28 days is the usual window. The DNO files the notification — they very rarely refuse."
            onSite="A 3.68 kW single-phase inverter at 230 V draws exactly 16 A — that’s why so many UK domestic installs land on 3.68 kW. Anything smaller is automatically G98 territory. A 4 kW inverter is technically over the threshold (≈17.4 A) — most installers either drop the inverter to 3.68 kW or limit the export."
          >
            <p>
              G98 covers connections of <strong>≤ 16 A per phase</strong>. The process:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install the kit using a G98-listed (Type Tested) inverter.</li>
              <li>
                Commission against the DNO’s required grid-protection settings (the DNO publishes
                approved settings; the inverter is configured to match).
              </li>
              <li>
                Submit the G98 commissioning notice to the DNO within 28 days — usually via an online
                portal. Includes site address, inverter details, MCS certificate number.
              </li>
            </ul>
            <p>
              The DNO almost never refuses a G98 connection — that’s the point of the threshold. At 16 A
              per phase, the local network can absorb the export without significant impact, so the
              process is informal.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="G99 — bigger generation, application BEFORE you install"
            plainEnglish="Anything over 16 A per phase needs the DNO’s permission BEFORE you start. They might say no, they might require network reinforcement (paid for by the customer), they might insist on a witness test. Plan extra weeks into the job."
            onSite="A 5 kW inverter on a single-phase supply (~21.7 A) is G99. So is any three-phase install over 16 A per phase. So is a battery system that can export over the threshold. Don’t assume G98 just because it’s domestic."
          >
            <p>
              G99 covers connections <strong>greater than 16 A per phase</strong>. The process:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Submit a G99 application to the DNO <em>before</em> any work starts. Includes proposed
                inverter, export rating, single-line diagram, grid-protection settings.
              </li>
              <li>
                The DNO reviews local network capacity. They can: approve, approve with conditions
                (e.g. an export limit), require network reinforcement (the customer pays for transformer
                or cable upgrades), or refuse.
              </li>
              <li>
                Install per the DNO’s conditions. For larger installs the DNO may witness-test the
                anti-islanding and grid-protection settings on commissioning.
              </li>
              <li>
                Submit the G99 commissioning report to the DNO with the test evidence.
              </li>
            </ul>
            <p>
              G99 timelines are weeks-to-months on more constrained network areas. Build the DNO process
              into the customer quote up front — “we need DNO approval before we can give you a firm
              install date” is a normal conversation.
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

          <ContentEyebrow>MCS — the certification scheme, not a regulation</ContentEyebrow>

          <ConceptBlock
            title="MCS in plain English"
            plainEnglish="A UK quality-mark scheme. The installer is MCS-certified, the products they fit are MCS-listed. The certificate they issue at handover is what the customer needs to claim SEG payments from their energy supplier."
            onSite="The customer doesn’t care about your MCS scope letter — they care that you can hand them an MCS certificate at the end. Without it, no SEG. With it, the install effectively pays for part of itself over the years."
          >
            <p>
              MCS — the Microgeneration Certification Scheme — is a UK-wide certification body backed by
              government. It covers two things:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Installer certification:</strong> The company doing the install (and the
                individual installer) is MCS-certified for the technology in question (PV, wind, heat
                pumps, batteries, biomass, etc.). MCS audits the company’s processes, training records,
                quality management.
              </li>
              <li>
                <strong>Product certification:</strong> Panels, inverters, heat pumps and batteries are
                tested against MCS product standards (MCS 005 series for products) and listed in the MCS
                product database.
              </li>
            </ul>
            <p>
              At handover the installer issues an <strong>MCS certificate</strong> — a document with a
              unique reference number that the customer registers with their energy supplier to apply for
              the Smart Export Guarantee (SEG) tariff. SEG rates vary by supplier (currently roughly 3p
              to 15p per kWh exported, depending on tariff and supplier).
            </p>
            <p>
              MCS is a <em>scheme</em>, not a legal regulation. It’s perfectly legal to install PV
              without being MCS-certified — but the customer can’t claim SEG, can’t demonstrate
              compliance for some house-sale processes, and may have insurance issues. In practice, every
              domestic install in the UK is done by an MCS-certified installer.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS 7671 Section 712 — the PV install rulebook</ContentEyebrow>

          <ConceptBlock
            title="DC isolation and AC isolation — both are required, neither is optional"
            plainEnglish="The PV string and the grid are two completely independent live sources. You isolate them independently, you prove them dead independently, and you only then work on the kit between them."
            onSite="The single most common safety failure on PV work: electrician assumes the AC isolator on the consumer unit kills everything, sticks his fingers into the inverter terminals, and gets a 400 V DC slap from a string that’s been running on a sunny afternoon."
          >
            <p>
              A PV install has two live sources sitting either side of the inverter:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The DC side</strong> — the PV string, typically 300–500 V DC depending on the
                array configuration. Energised by daylight on the panels. Disconnected by the
                <strong> DC isolator</strong> (a rotary or knife-blade isolator rated for DC, fitted on
                the array side of the inverter).
              </li>
              <li>
                <strong>The AC side</strong> — the inverter output, 230 V AC at grid frequency.
                Energised by the grid. Disconnected by the <strong>AC isolator</strong> (a rotary
                isolator fitted between the inverter and the consumer unit, plus the dedicated MCB/RCBO
                in the consumer unit).
              </li>
            </ul>
            <p>
              Both isolators are required by Section 712. Both must be operated and proved dead before
              any work on the inverter, the combiner box or the cabling between them. A genuine DC
              voltmeter — not just an AC tester — is needed to verify the DC side dead, because the
              voltage is high enough to be lethal but it won’t register on an AC-only proving unit.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.410.101 (DC side energised even when AC is disconnected)"
            clause="Electrical equipment on the DC side shall be considered to be energized, even when the AC side is disconnected from the grid or when the inverter is disconnected from the DC side."
            meaning={
              <>
                The text BS 7671 uses to drill into every PV installer’s head. The DC side is alive
                whenever there is daylight on the panels. Pulling the AC isolator at the consumer unit
                does not kill the panels. The DC isolator does — and even then, you prove dead with a DC
                voltmeter before you trust it. This is the single regulation that prevents the most PV
                shocks.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.410.101."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712.531.3.5.1 (RCD type for PV AC supply circuit)"
            clause="Where an RCD is used for protection of the PV AC supply circuit, the RCD shall be of Type B according to BS EN 62423 or BS EN 60947-2, unless: (a) the inverter provides at least simple separation between the AC side and the DC side; or (b) the installation provides at least simple separation between the inverter and the RCD by means of separate windings of a transformer; or (c) the inverter does not require a Type B RCD as stated by the manufacturer of the inverter. NOTE 2: Installation methods that do not require additional protection by use of an RCD are recommended."
            meaning={
              <>
                Most modern PV inverters are transformerless — they don’t internally isolate AC from DC.
                Under fault, they can pass smooth DC fault current to the AC side, which a Type AC or
                Type A RCD will fail to detect (the toroid saturates). So the default Section 712 answer
                is Type B. The exceptions are inverters with internal transformers, downstream isolating
                transformers, or where the manufacturer has specifically certified that Type B is not
                required. Always check the inverter datasheet.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712, Regulation 712.531.3.5.1."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Anti-islanding — protecting the DNO engineer</ContentEyebrow>

          <ConceptBlock
            title="200 ms — the headline anti-islanding figure"
            plainEnglish="If the grid drops, the inverter must shut up and stop generating within 200 ms. Otherwise it’s back-feeding a dead network and electrocuting whoever is working on the lines."
            onSite="The figure isn’t in BS 7671 — it’s in ENA G98/G99 and the underlying BS EN 50549-1/50549-2 product standards. But it’s the question apprentices get asked at college: how fast must the inverter disconnect? 200 milliseconds."
          >
            <p>
              An <em>islanded</em> inverter is one that is still generating into a section of the network
              that the DNO has isolated for maintenance. From the DNO engineer’s point of view, the
              cable is supposed to be dead — they’ve opened their isolator. From the inverter’s point of
              view, it’s still seeing a load (the customer’s house) and so it keeps generating. The cable
              between is live with “islanded” customer-side generation, and the engineer can be killed.
            </p>
            <p>
              The fix: every G98/G99-compliant inverter has built-in anti-islanding logic. It monitors
              the grid frequency and voltage references continuously. The instant the grid signature
              drops (the frequency drifts or the voltage collapses), the inverter recognises it has been
              islanded and trips its internal contactors within <strong>200 ms</strong>. The standard is
              ENA G98 / G99 with BS EN 50549-1 (≤ 16 A per phase) and BS EN 50549-2 (greater) underneath.
              BS 7671 Reg 551.7.5 echoes the requirement.
            </p>
            <p>
              For commissioning, you set the inverter’s grid code (G98 or G99 settings appropriate to
              your DNO) and the inverter then enforces the right frequency/voltage trip thresholds and
              the 200 ms disconnect time automatically.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Earthing of the PV array</ContentEyebrow>

          <ConceptBlock
            title="The metallic frame of the array needs an earth"
            onSite="Mounting rails and panel frames are typically aluminium — exposed-conductive-parts that need earthing under BS 7671. A 6 mm² earthing conductor back to the MET (or to the inverter chassis if it’s designed to take it) covers it."
          >
            <p>
              The aluminium rails and panel frames are exposed-conductive-parts in BS 7671 terms. They
              need an equipotential bonding conductor back to the main earthing terminal of the
              installation. Typically a 6 mm² earthing conductor running with the DC string cables, with
              accessible test points so it can be verified during inspection and testing.
            </p>
            <p>
              The detailed requirements are in Section 712 (the earthing-of-PV-arrays clauses), the
              inverter manufacturer’s instructions, the MCS install standard MIS 3002, and the IET Code
              of Practice for Grid-Connected Solar PV Systems. Any one of those alone isn’t enough — the
              install needs to satisfy all of them.
            </p>
            <p>
              Reg 712.312.2 also permits earthing of one of the live conductors of the DC side, where
              there is at least simple separation between the AC and DC sides. That’s a design choice
              the inverter manufacturer makes — it doesn’t change the requirement to bond the metallic
              array structure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Documentation — the handover wallet</ContentEyebrow>

          <ConceptBlock
            title="What the customer leaves the install holding"
            plainEnglish="A wallet of paperwork that proves the install is safe, certified, and eligible for SEG payments."
          >
            <p>A correctly handed-over PV install gives the customer:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EIC (Electrical Installation Certificate)</strong> for the new circuit and any
                additions/alterations to the consumer unit, signed by the designer, constructor and
                inspector (often the same person on a domestic job).
              </li>
              <li>
                <strong>Inverter manufacturer’s commissioning sheet</strong> — a printout (or digital
                report) from the inverter showing it was commissioned with the correct G98/G99 grid
                code, with self-test results.
              </li>
              <li>
                <strong>G98 commissioning notice</strong> (or <strong>G99 commissioning report</strong>)
                — submitted to the DNO and copied to the customer.
              </li>
              <li>
                <strong>MCS certificate</strong> — the document the customer registers with their
                energy supplier to apply for SEG. Issued by the installer through the MCS portal.
              </li>
              <li>
                <strong>Building Regulations notification</strong> — typically through Part P
                self-certification (if the installer is a Competent Person Scheme member) or through a
                building control notice. Covers the alteration to the consumer unit.
              </li>
              <li>
                <strong>Single-line diagram and labels</strong> — the SLD goes on the consumer unit.
                Required by Section 712 to make it clear to anyone working on the installation in
                future that there is an additional source of supply.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating PV DC isolation as optional because the AC side is already isolated"
            whatHappens={
              <>
                You’re fault-finding on a PV install. The customer says the system has stopped exporting.
                You pull the AC isolator at the consumer unit, switch off the dedicated MCB, and start
                opening the inverter to check the connections — assuming you’ve killed the install. You
                haven’t. The DC string is still pumping 400 V DC into the inverter terminals because the
                sun is up.
              </>
            }
            doInstead={
              <>
                Reg 712.410.101: the DC side stays energised whenever there is daylight on the panels,
                regardless of what you’ve done on the AC side. Always operate the DC isolator on the
                array side AND the AC isolator on the grid side. Prove both dead — the DC side with a
                proper DC voltmeter, not an AC-only proving unit. Lock both isolators off if you’re
                going to be away from the install during the work.
              </>
            }
          />

          <Scenario
            title="A 4 kW PV inverter on an EV-charger house — what trips you up"
            situation={
              <>
                You’re fitting a 4 kW PV array with a transformerless string inverter on a house that
                already has a 7 kW EV charger. The inverter rating is 4 kW (≈17.4 A on a 230 V single
                phase). The customer wants the install signed off this week so they can claim SEG.
              </>
            }
            whatToDo={
              <>
                Three things to nail down. First, the inverter is over 16 A per phase, so it’s G99 not
                G98 — you need a DNO application BEFORE installing, which can take weeks. Many installers
                drop to a 3.68 kW inverter (or use an export limiter) to keep the install in G98
                territory and avoid the G99 timeline. Second, the EV charger needs Type B RCD on its
                circuit (already a given), and the PV inverter circuit also needs Type B unless the
                manufacturer states otherwise per Reg 712.531.3.5.1 — check the datasheet. Third, the
                MCS certificate has to be issued by the installing company through the MCS portal — the
                customer needs that number to register for SEG with their energy supplier.
              </>
            }
            whyItMatters={
              <>
                Apprentices regularly walk into PV jobs assuming it’s a quick install — wrong inverter
                size, no DNO application, wrong RCD type, missing MCS paperwork. Any one of those
                problems delays handover by weeks and costs the company money. Get the regulatory
                framework right before you put a panel on a roof.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three regulatory tracks apply to every install: BS 7671 (wiring safety), ENA G98/G99 (DNO connection paperwork), MCS (certification for installer/products and customer’s SEG eligibility).',
              'G98 covers ≤ 16 A per phase — informal post-installation notification within 28 days. G99 covers > 16 A per phase — formal application BEFORE install, DNO can refuse or impose conditions.',
              'BS 7671 Section 712 is the dedicated PV section. Reg 712.1 sets the scope; Reg 712.410.101 makes the DC side a permanent live source whenever there is daylight on the panels.',
              'PV needs both a DC isolator (panels-side) and an AC isolator (grid-side). Operate both, prove both dead with the right meter (DC voltmeter for the DC side), then work.',
              'Anti-islanding: 200 ms maximum disconnect time after loss of grid (G98/G99, BS EN 50549-1/-2). Built into the inverter through its grid-code commissioning settings.',
              'RCD type for transformerless PV inverters defaults to Type B per Reg 712.531.3.5.1, unless the inverter provides simple separation or the manufacturer states otherwise.',
              'Documentation pack: EIC, inverter commissioning sheet, G98/G99 notice, MCS certificate, building regs notification, single-line diagram on the consumer unit.',
            ]}
          />

          <Quiz title="Micro-renewables installation — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.3 Battery storage deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Advantages and disadvantages
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
