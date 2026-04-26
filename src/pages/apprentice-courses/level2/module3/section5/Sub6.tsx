/**
 * Module 3 · Section 5 · Subsection 6 — DNO boundary and customer interface
 * Maps to City & Guilds 2365-02 / Unit 203 / LO5 / AC 5.4
 *   AC 5.4 — "State the component parts of the electrical distribution network"
 *
 * Deep dive on the supply boundary itself. Where the DNO ends and the
 * customer's electrician begins, the cut-out seal, the MOP role distinct
 * from the DNO and the supplier, smart metering and the DCC, and a clear
 * decision tree on what the electrician can and cannot legally touch on the
 * supply side. Final Sub of Module 3 Section 5.
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
  'DNO boundary and customer interface (5.4) | Level 2 Module 3.5.6 | Elec-Mate';
const DESCRIPTION =
  'Where the DNO ends and the customer electrician begins. The cut-out seal, the MOP role, smart meter integration and the DCC, three-phase commercial boundaries, and the decision tree of what the electrician can and cannot legally touch on the supply side.';

const checks = [
  {
    id: 'm3s5s6-cut-out-seal',
    question:
      'A customer wants you to change their consumer unit. The cut-out has a wire-and-lead seal across the fuse holder. What does that seal mean legally and operationally?',
    options: [
      'It is a tidiness measure — you can cut it as long as you put a new one back.',
      'It is a legal device. Breaking it without DNO authority is a criminal offence (potentially abstraction under the Theft Act 1968 if supply is unmetered) and a breach of every electrical scheme membership condition.',
      'It only matters if the customer complains.',
      'It is the customer\'s seal — they can authorise you to cut it.',
    ],
    correctIndex: 1,
    explanation:
      'The cut-out fuse and the seal are DNO property. Breaking the seal without authorisation has serious consequences — criminal prosecution potential (theft of supply if abstracted), removal from your scheme membership (NICEIC, NAPIT, ELECSA, SELECT), and personal liability for any damage. Customer consent does not override any of that. Always go through the DNO via 105 or via a Meter Operator (MOP) acting under DNO authority.',
  },
  {
    id: 'm3s5s6-meter-owner',
    question:
      'Who owns the meter at a typical UK domestic property?',
    options: [
      'The customer — they paid for it as part of their property.',
      'The DNO (e.g. UK Power Networks).',
      'The Meter Operator (MOP) — a company contracted by the energy supplier to install and maintain the meter.',
      'The energy supplier (Octopus, British Gas, etc.) directly.',
    ],
    correctIndex: 2,
    explanation:
      'The meter is owned by the MOP — a separate commercial entity contracted by the energy supplier. The MOP is responsible for installing, maintaining and replacing the meter (and the meter-side tails on its DNO side). The supplier you pay your bill to is a different organisation again. Three distinct industry roles in one cabinet — easy to confuse.',
  },
  {
    id: 'm3s5s6-mop-vs-dno',
    question:
      'A customer wants their existing 60 A cut-out fuse upgraded to 100 A so they can install a 7 kW EV charger. Who do you call and why?',
    options: [
      'The MOP — they install meters and do all supply work.',
      'The DNO. The cut-out fuse rating is determined by the declared maximum demand, the service cable capacity and the supply infrastructure — all DNO assets. The DNO will assess and either uprate or refuse.',
      'No one — you can swap the fuse yourself if the customer signs a disclaimer.',
      'The energy supplier — they manage the customer\'s connection.',
    ],
    correctIndex: 1,
    explanation:
      'Cut-out fuse rating is a DNO matter. The DNO checks declared maximum demand against service cable capacity and the upstream network. If they refuse the uprate (often because the service cable is a 25 mm² aluminium that cannot carry 100 A safely), the customer needs a service cable upgrade — a chargeable DNO project. EV chargers also require G98 / G99 notification to the DNO; do not skip that.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In the meter cabinet of a typical UK domestic property, the boundary between DNO-owned kit and MOP-owned kit is at:',
    options: [
      'The customer\'s consumer unit.',
      'The load-side terminals of the cut-out — the meter-side tails (cut-out to meter) and the meter itself are MOP-owned.',
      'The street-side end of the service cable.',
      'There is no boundary — DNO owns everything up to the consumer unit.',
    ],
    correctAnswer: 1,
    explanation:
      'DNO owns the service cable, the cut-out, the supplier earth terminal and the cut-out fuse. MOP owns the meter and the meter-side tails (the conductors from the cut-out load side to the meter). The customer owns from the meter load-side terminals onwards. Three distinct ownership zones in one small cabinet.',
  },
  {
    id: 2,
    question:
      'You break the seal on a cut-out fuse without authority and pull the fuse to safely isolate for a CU swap. What is the realistic worst-case professional consequence?',
    options: [
      'A polite letter from the DNO.',
      'Removal from your electrical scheme membership (NICEIC / NAPIT / ELECSA / SELECT), potential criminal prosecution if abstraction is alleged, and personal civil liability for any damage. Career-altering.',
      'Nothing if no one finds out.',
      'A small fine paid by your employer.',
    ],
    correctAnswer: 1,
    explanation:
      'Scheme bodies treat seal breaking as a serious breach. The cut-out fuse is not yours to touch; pulling it is a "theft of seal" offence even if no electricity is abstracted, and an abstraction charge under the Theft Act 1968 follows if any unmetered supply is taken. Loss of scheme membership effectively ends a contractor\'s ability to certify domestic work in the UK.',
  },
  {
    id: 3,
    question:
      'A SMETS2 smart meter is fitted at a property. Who can remotely disconnect the supply from that meter?',
    options: [
      'No one — meters cannot be remotely disconnected.',
      'Only the customer themselves via the in-home display.',
      'The energy supplier, via the Data Communications Company (DCC) WAN. Remote disconnection is a contractual capability of the smart-meter system.',
      'Only the DNO.',
    ],
    correctAnswer: 2,
    explanation:
      'The SMETS2 standard supports supplier-initiated remote disconnection (typically used for non-payment or supplier change). Communications go via the DCC WAN to the meter\'s internal contactor. The DNO does not control this — it is a supplier function. Worth knowing because customers sometimes find their supply has been cut and assume it is a network fault.',
  },
  {
    id: 4,
    question:
      'A customer wants you to install meter tails of 25 mm² for a new EV charger. The existing tails are 16 mm² and clearly inadequate. The cut-out has a sealed connection. What is your scope?',
    options: [
      'Cut the seal, swap the meter-side tails yourself, re-seal with a generic seal.',
      'You can replace the LOAD-SIDE tails (meter to consumer unit) without DNO / MOP attendance — that is customer-side. The METER-SIDE tails (cut-out to meter) are MOP territory and must be replaced by them. Coordinate with the MOP via the energy supplier.',
      'Replace both sets of tails — you are a competent person.',
      'Ignore the issue — 16 mm² is fine for any load.',
    ],
    correctAnswer: 1,
    explanation:
      'The customer-side scope ends at the meter\'s load terminals. Load-side tails (meter to CU / main switch) are yours to design and install. Meter-side tails (cut-out to meter) belong to the MOP. The customer raises the request via their supplier; the supplier dispatches the MOP to attend. Frustrating waiting time, but the boundary is non-negotiable.',
  },
  {
    id: 5,
    question:
      'On a three-phase domestic / small commercial supply, how is the supply typically arranged?',
    options: [
      'One single phase enters the property as 230 V.',
      'All three line conductors plus neutral enter the meter cabinet as 400 V three-phase. A three-phase meter measures each phase. Single-phase loads inside the property are spread across the three phases to balance the supply.',
      'Three separate single-phase supplies are installed.',
      'Three-phase domestic supplies do not exist.',
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase domestic / small commercial supplies have all three lines plus neutral entering the meter cabinet. A three-phase smart meter measures total energy per phase. Final circuits inside the property are typically single-phase, distributed across the three phases to balance load. Common in larger detached houses with EV chargers, heat pumps and PV.',
  },
  {
    id: 6,
    question:
      'What is the purpose of the supplier earth terminal on a cut-out?',
    options: [
      'To bond the meter cabinet door.',
      'To provide a low-impedance earth reference for the customer\'s installation on TN-C-S or TN-S supplies — connected back through the service cable PEN (or PE) to the secondary substation earth.',
      'To act as a backup if the customer\'s electrode fails.',
      'It is decorative only.',
    ],
    correctAnswer: 1,
    explanation:
      'The supplier earth terminal is the customer\'s earth on TN-C-S (PME) and TN-S supplies. It is bonded to the cut-out body, connected via the service cable PEN / PE to the multiple earths on the LV distributor and the secondary substation. It is the reason most modern UK installations do not need an earth electrode. TT supplies (no supplier earth) require the customer to install their own electrode.',
  },
  {
    id: 7,
    question:
      'A customer with an old TT supply (rural overhead, no supplier earth) wants a CU swap. You spot the earth electrode at the front of the property is corroded and the earth conductor barely connects. What do you do?',
    options: [
      'Ignore — it is the customer\'s problem.',
      'Phone the DNO immediately — they own electrodes on TT supplies.',
      'You must replace or repair the earth electrode and earthing conductor as part of the installation works — TT earth electrodes are CUSTOMER-side assets. Test Ze, RA and confirm RCD discrimination after replacement.',
      'Convert the supply to TN-C-S yourself.',
    ],
    correctAnswer: 2,
    explanation:
      'On TT supplies the earth electrode is customer-side — the electrician\'s responsibility to install, replace and maintain. The DNO provides no earth on TT. Replacing the electrode is part of the CU swap scope. Test the new electrode resistance (RA), confirm Ze, verify RCD operation against the new earth fault loop impedance. Document on the EIC.',
  },
  {
    id: 8,
    question:
      'Which UK number do you phone for any DNO emergency or to arrange supply isolation?',
    options: ['999', '105', '111', '101'],
    correctAnswer: 1,
    explanation:
      '105 is the universal UK power-cut and DNO contact number. It routes you automatically to your local DNO based on the postcode. Use it for outages, damaged supply cables, requests for a supply isolation visit, and any other DNO-side issue. Save it in every customer-facing engineer\'s phone.',
  },
];

const faqs = [
  {
    question:
      'What does the seal on a cut-out actually look like?',
    answer:
      'A short twisted wire (usually copper or galvanised steel) threaded through holes in the fuse carrier and the cut-out housing, then crimped through a small lead bead embossed with the DNO\'s name or logo. The lead bead is the seal. It is not designed to physically prevent removal — it is designed so removal is impossible without leaving obvious evidence.',
  },
  {
    question:
      'Can I get DNO authority to break and re-seal cut-outs as part of my normal work?',
    answer:
      'Some DNOs run a Withdrawal of Consent or "Approved Contractor" agreement where named, registered contractors are authorised to break and replace seals on agreed types of property (typically domestic CU swaps). The application is via your scheme provider (NICEIC / NAPIT / ELECSA) and requires specific training and audited record-keeping. Without that authority you must arrange a DNO or MOP attendance every time. Worth setting up if you do volume CU work.',
  },
  {
    question:
      'What is the difference between SMETS1 and SMETS2 smart meters?',
    answer:
      'SMETS1 (the original 2011-onwards spec) communicated directly with the original supplier — change supplier and the meter often went "dumb" until adopted by the DCC. SMETS2 (current spec since 2018) communicates via the DCC WAN, so any supplier can read it. Most SMETS1 meters have been migrated onto the DCC by now. From the electrician\'s point of view they look the same in the cabinet; the difference is invisible until you change supplier.',
  },
  {
    question:
      'Can I work on the customer-side meter tails without isolating the supply?',
    answer:
      'No — never. The meter tails are live unless the supply is isolated. To work on them safely you need the cut-out fuse pulled (DNO or MOP attendance, never yourself), the meter tails proven dead at the point of work, and locked-off isolation. The whole BS 7671 + Electricity at Work Regulations 1989 framework applies. Work-on-live in this context is essentially never justifiable.',
  },
  {
    question:
      'Who pays when the DNO has to attend for a supply isolation?',
    answer:
      'Depends on the DNO and the type of work. For a CU swap, most DNOs offer a free or low-cost isolation visit because they want the work done safely. For a service uprate (cut-out fuse upgrade, cable upgrade) the cost is a chargeable connection works quote and the customer pays — sometimes thousands of pounds. The customer should be warned at the survey stage if an uprate is likely.',
  },
  {
    question:
      'What does G98 / G99 notification have to do with the supply boundary?',
    answer:
      'G98 / G99 are the Engineering Recommendations from the Energy Networks Association (ENA) covering the connection of generation (PV, battery storage, EV chargers above a threshold) to a DNO network. G98 covers small installations (up to 16 A per phase) which can be installed and notified after the fact. G99 covers larger installations which require pre-approval. Both are about coordination at the supply boundary — the DNO needs to know what is being connected because it affects fault levels, voltage regulation and protection settings. Skipping G98 / G99 is a regulatory breach with the same career consequences as breaking a cut-out seal.',
  },
];

export default function Sub6() {
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 6"
            title="DNO boundary and customer interface"
            description="Where the DNO ends and the customer electrician begins. Cross the line wrong and you are liable, fired, prosecuted — possibly all three. The cut-out seal, the MOP role, smart meter integration and the decision tree on what you can and cannot legally touch on the supply side."
            tone="emerald"
          />

          <TLDR
            points={[
              'Three owners in one cabinet: DNO owns service cable + cut-out + supplier earth terminal. MOP owns the meter + meter-side tails. Customer owns from the meter load-side terminals onwards.',
              'Cut-out seal is a legal device. Breaking it without DNO authority risks criminal prosecution (Theft Act 1968 if abstraction alleged) AND scheme membership removal (NICEIC / NAPIT / ELECSA / SELECT). Career-altering.',
              'Decision tree: cut-out / cut-out fuse / service cable / new connection → DNO (phone 105). Meter / meter-side tails / smart meter swap → MOP via energy supplier. Load-side tails / main switch / CU / final circuits → you.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the component parts of the electrical distribution network (AC 5.4) at the customer interface — cut-out, supplier earth terminal, meter, meter-side tails, MET.',
              'Explain the three-party ownership boundary (DNO / MOP / customer) and what each party owns in the meter cabinet.',
              'Describe the cut-out seal — what it physically is, what breaking it without authority means legally and contractually, and how Withdrawal of Consent works.',
              'Distinguish the MOP role from the DNO role and from the energy supplier role; explain who to call for which kind of work.',
              'Describe smart meter integration with the DCC WAN, supplier-initiated remote disconnection, and the relevance to the electrician on site.',
              'Apply the call-or-do-it-yourself decision tree to common supply-side scenarios (CU swap, EV charger, service uprate, three-phase commercial intake).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The boundary in one breath</ContentEyebrow>

          <ConceptBlock
            title="Three owners in 30 cm of cable"
            plainEnglish="Open any UK meter cabinet. The cable coming in from the street is the DNO's. The fuse and the small block of metal next to it are the DNO's. The pair of tails going up to the meter are the MOP's. The meter is the MOP's. The pair of tails coming OUT of the meter into the consumer unit are yours and the customer's."
          >
            <p>
              The supply boundary is not a single line — it is a sequence of three handovers
              that all happen inside one small enclosure. Get any of them wrong and you have
              touched property that is not yours, broken a contract you signed when you
              joined your scheme, and exposed yourself to criminal prosecution. Every
              electrician who works on intake equipment has to know exactly where each
              handover sits.
            </p>
            <p>
              This Sub is the operational follow-up to Sub 5.4 (the named components in the
              chain) and Sub 5.5 (the chain end-to-end). Same components, different focus —
              the legal, operational and commercial line that runs through them.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The components, in ownership order"
            onSite="Every meter cabinet you ever open has these in the same order. Memorise the order, memorise the owner."
          >
            <p>
              From street to consumer unit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Service cable</strong> — DNO. Concentric ALPVC (modern) or PILC
                (older). Terminates at the cut-out.
              </li>
              <li>
                <strong>Cut-out</strong> — DNO. Sealed BS 1361 / BS 88-3 fuse, plus the
                supplier earth terminal block (TN-C-S or TN-S supplies).
              </li>
              <li>
                <strong>Meter-side tails</strong> — MOP. The pair of conductors from the
                load side of the cut-out to the meter input terminals.
              </li>
              <li>
                <strong>Meter</strong> — MOP. SMETS2 smart meter (modern) or older
                electromechanical / first-gen smart.
              </li>
              <li>
                <strong>Load-side tails</strong> — customer / electrician. From the meter
                load-side terminals to the main switch / consumer unit.
              </li>
              <li>
                <strong>Main switch / CU / final circuits / MET</strong> — customer /
                electrician.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The cut-out seal</ContentEyebrow>

          <ConceptBlock
            title="What the seal actually is — and what it really means"
            plainEnglish="A bit of twisted wire crimped into a soft lead bead. Costs the DNO maybe ten pence to fit. Removing it without authority costs you your career."
          >
            <p>
              The wire-and-lead seal across the cut-out fuse holder is the simplest piece of
              hardware in any electrical installation, and it carries the heaviest legal
              weight of any single object in the meter cabinet. It exists for one reason: to
              prove that nobody has tampered with the supply, the fuse rating, the meter
              connections or the supplier earth terminal.
            </p>
            <p>
              Breaking the seal without DNO authority is treated by the industry as
              equivalent to breaking into the network. The consequences stack up:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Criminal — Theft Act 1968.</strong> If unmetered electricity is
                abstracted as a result, the offence is theft. The seal removal itself is
                evidence of intent.
              </li>
              <li>
                <strong>Civil — DNO recovery.</strong> If your removal causes damage to the
                cut-out, the meter, or the supply infrastructure, the DNO will pursue costs
                personally.
              </li>
              <li>
                <strong>Professional — scheme membership.</strong> NICEIC, NAPIT, ELECSA and
                SELECT all treat unauthorised seal removal as a breach of conditions
                serious enough to remove scheme membership. Without scheme membership a
                contractor cannot self-certify domestic notifiable work in England, Wales,
                Scotland or Northern Ireland — the practical end of the contractor business.
              </li>
              <li>
                <strong>Insurance — public liability.</strong> Many PL policies exclude
                cover for losses arising from unauthorised network tampering.
              </li>
            </ul>
            <p>
              No customer is allowed to authorise you to break the seal. The DNO is the
              owner; only the DNO can authorise. The fact that the customer wrote you a
              waiver is irrelevant in court.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Thinking pulling the cut-out fuse counts as safe isolation"
            whatHappens={
              <>
                You are doing a CU swap. The DNO cannot attend for two weeks. The customer is
                pressing for the work today. You think: "I will just pull the fuse, swap the
                CU, push the fuse back in, and re-seal it with a generic seal from my van.
                Nobody will know." Two months later the next contractor opens the cabinet,
                spots the wrong seal type, reports it. The DNO investigates and identifies
                you from the EIC. NICEIC removes your registration. Insurance refuses to
                cover the abstraction claim because it was unauthorised tampering.
              </>
            }
            doInstead={
              <>
                Pulling the cut-out fuse is NOT safe isolation under your authority — it is
                tampering with DNO property. Either book the DNO attendance (phone 105) and
                wait, or apply through your scheme provider for a Withdrawal of Consent /
                Approved Contractor agreement that gives you authority to break and replace
                seals on agreed types of work. If neither is available today, the work waits.
                Nothing the customer can offer is worth losing scheme membership over.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The MOP — distinct from DNO, distinct from supplier</ContentEyebrow>

          <ConceptBlock
            title="The Meter Operator role — five-minute primer"
            onSite="If a customer ever says 'the meter is broken' or 'the meter has been condemned', the answer is the same — phone the energy supplier, who phones the MOP. Not the DNO. Not you."
          >
            <p>
              The Meter Operator (MOP) is a separate commercial entity contracted by the
              energy supplier to install, read, maintain and replace meters. They are not
              the DNO and they are not the supplier. The same MOP often serves multiple
              suppliers across multiple DNO regions.
            </p>
            <p>
              MOP scope:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install new meters (new connections, smart meter rollouts).</li>
              <li>Replace failed or end-of-life meters.</li>
              <li>Maintain the meter and the meter-side tails (cut-out to meter).</li>
              <li>Re-seal the cut-out after their work (under DNO authority).</li>
              <li>Re-locate meters when the customer moves a meter cabinet.</li>
            </ul>
            <p>
              MOP attendance is arranged via the energy supplier — the supplier raises the
              request to the MOP. Customers cannot phone the MOP directly in most cases. If
              you tell a customer "you need the MOP", the practical instruction is "phone
              your supplier".
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

          <ContentEyebrow>Smart meters and the DCC</ContentEyebrow>

          <ConceptBlock
            title="What a smart meter actually is — and what the electrician needs to know"
            plainEnglish="A smart meter is a metering instrument plus a cellular modem plus an internal contactor. It measures energy, sends the readings to the supplier over the cellular network, and can be remotely opened or closed by the supplier. Same boundary as any other meter — but with capabilities the older meters did not have."
          >
            <p>
              SMETS2 smart meters (the current standard since 2018) communicate via the
              Data Communications Company (DCC) WAN — a cellular network operated under
              government licence specifically for smart-metering data. Readings go from the
              meter to the DCC to the customer's energy supplier. The same WAN supports the
              In-Home Display (IHD) showing real-time consumption.
            </p>
            <p>
              Capabilities that matter in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Half-hourly readings.</strong> Enables time-of-use tariffs (Octopus
                Agile, Cosy etc.) — useful context when scoping EV charger or battery
                storage installs.
              </li>
              <li>
                <strong>Export metering.</strong> Built-in support for measuring electricity
                exported back to the grid from PV, battery or other generation. Required
                for Smart Export Guarantee (SEG) payments.
              </li>
              <li>
                <strong>Remote disconnection.</strong> The supplier can remotely open the
                internal contactor — typically for non-payment or supplier change.
                Customers sometimes find their supply has gone and assume it is a network
                fault.
              </li>
              <li>
                <strong>Cellular signal.</strong> Smart meters need a cellular signal — in
                rural areas or basement meter cupboards the meter sometimes loses
                connectivity. That is a MOP issue, not the electrician's.
              </li>
            </ul>
            <p>
              The presence of a smart meter does not change the supply boundary in any way.
              The cut-out is still the cut-out; the meter is still MOP-owned; load-side
              tails are still your scope.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What you can do on the supply side</ContentEyebrow>

          <ConceptBlock
            title="What the electrician CAN do without DNO / MOP attendance"
            onSite="Inspection and identification work — yes. Anything that touches DNO or MOP property — no."
          >
            <p>
              Without any DNO or MOP authorisation, the electrician can:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visually inspect</strong> the cut-out, meter and meter cabinet for
                obvious defects (cracked casing, signs of overheating, tampering, water
                ingress).
              </li>
              <li>
                <strong>Identify the earthing arrangement</strong> (TN-C-S, TN-S or TT) by
                examining the supplier earth terminal and service cable type.
              </li>
              <li>
                <strong>Read off the cut-out fuse rating</strong> from the marking on the
                fuse carrier (typically 60, 80 or 100 A in domestic).
              </li>
              <li>
                <strong>Measure prospective fault current (Ipf)</strong> at the supply
                origin using an MFT — the conductors are accessible at the load-side meter
                terminals without breaking any seal.
              </li>
              <li>
                <strong>Measure earth fault loop impedance (Ze)</strong> at the supply
                origin using an MFT — same access point.
              </li>
              <li>
                <strong>Replace anything from the load-side meter terminals downwards</strong>{' '}
                — load-side tails, main switch, consumer unit, RCBOs, SPDs, AFDDs, all final
                circuits and accessories.
              </li>
              <li>
                <strong>Add a sub-main, sub-board or new final circuit</strong> downstream
                of the consumer unit, subject to BS 7671 Reg 132.16 sanity checks on the
                existing installation and the distributor.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="What the electrician CANNOT do without DNO / MOP attendance"
            onSite="Anything that involves a sealed component, a DNO-owned conductor, or any change to the supply rating."
          >
            <p>
              Without explicit DNO / MOP authority, the electrician must NOT:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Break the cut-out seal</strong> for any reason — including "safe
                isolation" for downstream work.
              </li>
              <li>
                <strong>Pull or replace the cut-out fuse</strong> — the fuse is DNO
                property, replacement requires DNO attendance.
              </li>
              <li>
                <strong>Change the cut-out fuse rating</strong> (e.g. 60 A to 100 A for an
                EV charger upgrade) — requires DNO assessment of declared maximum demand
                and service cable capacity.
              </li>
              <li>
                <strong>Replace, alter or relocate the meter</strong> — MOP scope only.
              </li>
              <li>
                <strong>Replace or alter meter-side tails</strong> (cut-out to meter) — MOP
                scope only.
              </li>
              <li>
                <strong>Modify the supplier earth terminal</strong> — DNO property.
              </li>
              <li>
                <strong>Energise a new connection</strong> — first energisation is always a
                DNO act.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ESQCR 2002, Reg. 26 (paraphrased — meters)"
            clause="A distributor shall not allow electricity to be supplied to a consumer unless an appropriate metering installation provided by the consumer's supplier (or by another person authorised by the supplier) is in place. The metering installation shall be installed and maintained in such a manner as to prevent danger so far as is reasonably practicable."
            meaning={
              <>
                The meter is required by law to be in place before supply is energised, and
                the meter installation is the supplier's responsibility (executed via the
                MOP). The DNO cannot energise without a meter. From the electrician's point
                of view this is why MOPs exist — they discharge the supplier's statutory
                duty to provide a metering installation that is safe and does not create
                danger. Any work that affects the metering installation must go through the
                MOP, not through you.
              </>
            }
            cite="Paraphrased; see Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665, as amended), Reg. 26 — full text on legislation.gov.uk."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances."
            meaning={
              <>
                Every addition or alteration starts at the supply origin. The distributor's
                equipment (cut-out, service cable, declared earth fault loop impedance, the
                whole supply infrastructure) must be confirmed adequate for the new total
                demand BEFORE the new circuit is designed, never after. If the existing
                cut-out fuse cannot carry the new total demand, you escalate to the DNO.
                The regulation is what forces the conversation with the DNO at the design
                stage rather than the post-installation surprise.
              </>
            }
            cite="Verbatim source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.16."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The decision tree</ContentEyebrow>

          <ConceptBlock
            title="Call DNO, call MOP, or do it yourself — concrete examples"
            plainEnglish="Three columns. Three phone calls. Apply this every time."
          >
            <p>
              Memorise the routing rule:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Phone 105 (DNO)</strong> — supply isolation for CU swap (without
                Withdrawal of Consent), cut-out fuse rating change, service cable damage,
                new connection, generation notification (G98 / G99), supply quality
                complaint (frequency, voltage outside ESQCR envelope).
              </li>
              <li>
                <strong>Phone the energy supplier (who dispatches MOP)</strong> — meter
                replacement, meter relocation, smart meter installation, meter-side tail
                replacement, suspected meter fault.
              </li>
              <li>
                <strong>Proceed yourself</strong> — load-side tail replacement (subject to
                MOP attending if cut-out needs to be pulled), main switch replacement,
                consumer unit swap (subject to DNO isolation), final circuit additions, EV
                charger installation downstream of CU (subject to G98 / G99 notification).
              </li>
            </ul>
            <p>
              Worked examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>"Customer wants a CU swap"</strong> — DNO (or use Withdrawal of
                Consent if you have it) for isolation, then you do the swap.
              </li>
              <li>
                <strong>"Meter has cracked casing"</strong> — energy supplier, who arranges
                MOP attendance.
              </li>
              <li>
                <strong>"Customer wants a 7 kW EV charger and the cut-out is 60 A"</strong>{' '}
                — assess declared maximum demand. If the new total exceeds 60 A
                continuously, phone DNO for fuse uprate (often requires service cable
                upgrade — chargeable). You install the charger and notify under G98 /
                G99.
              </li>
              <li>
                <strong>"Three-phase commercial intake — extra distribution board"</strong>{' '}
                — assess existing maximum demand vs DNO declared MIC (Maximum Import
                Capacity). If close to MIC, request DNO uprate before any new sub-main
                design.
              </li>
              <li>
                <strong>"Customer says smart meter has stopped working"</strong> — energy
                supplier, who decides whether the MOP attends or it is a DCC connectivity
                issue.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Three-phase commercial</ContentEyebrow>

          <ConceptBlock
            title="The boundary on three-phase commercial supplies"
            onSite="Three-phase boundaries follow the same logic as single-phase, but the kit is bigger and the consequences of mistakes are more expensive."
          >
            <p>
              On a three-phase commercial intake the boundary kit is the same in principle
              but built bigger:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Service cable</strong> — typically 70 mm² to 300 mm² aluminium or
                copper, four-core (three lines + neutral / PEN). Often armoured.
              </li>
              <li>
                <strong>Cut-out</strong> — three single-phase BS 88-3 fuses (one per phase)
                in a single enclosure. Ratings 100 A, 200 A, 315 A, 400 A common. Often
                separate sealed compartments per phase.
              </li>
              <li>
                <strong>Supplier earth terminal</strong> — single terminal serving all
                three phases on TN-C-S supplies.
              </li>
              <li>
                <strong>Three-phase meter</strong> — measures each phase separately, plus
                neutral current. SMETS2 commercial variants exist; older sites may have
                separate CT-operated metering for higher currents.
              </li>
              <li>
                <strong>Load-side three-phase main switch</strong> — typically a switch-fuse
                or moulded-case circuit-breaker (MCCB), sized to the supply fuse.
              </li>
              <li>
                <strong>Distribution board(s)</strong> — three-phase TP&amp;N or TP&amp;N
                with separate single-phase final circuits balanced across the three phases.
              </li>
            </ul>
            <p>
              Same three-party ownership: DNO (service cable + cut-out + supplier earth
              terminal), MOP (meter + meter-side tails), customer / electrician (load-side
              tails onwards). The boundary discipline is the same — break a seal on a
              commercial cut-out and the consequences are larger because the contracts and
              insurance values are larger.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scenario</ContentEyebrow>

          <Scenario
            title="Customer wants 25 mm² meter tails for an EV charger"
            situation={
              <>
                Customer is having a 7 kW EV charger installed. Existing meter tails are
                16 mm², about 1.5 m long, in a domestic meter cabinet on the side of the
                house. The existing CU is being swapped at the same time. You need to be
                able to add the EV charger as a new dedicated radial from the new CU. The
                customer asks: "while you are at it, swap the meter tails to 25 mm² and
                I will pay you for the extra time."
              </>
            }
            whatToDo={
              <>
                Split the work by ownership zone. The <strong>load-side tails</strong>
                {' '}(meter to CU) ARE in your scope — you can specify and install 25 mm²
                load-side tails as part of the CU swap, no DNO / MOP attendance required.
                The <strong>meter-side tails</strong> (cut-out to meter) are NOT in your
                scope — they are MOP-owned. Tell the customer to phone their supplier and
                request the MOP attend to upgrade the meter-side tails to 25 mm² to match.
                Coordinate timing if you can. Do not, under any circumstances, swap both
                sets yourself even if the lengths are short and the work is trivial.
                Document the load-side tails on your EIC; the meter-side tails are the
                MOP's certification.
              </>
            }
            whyItMatters={
              <>
                The 30 cm of cable inside one cabinet has two different owners and two
                different responsibility regimes. Crossing the boundary "to be helpful" is
                the most common way that good electricians end up in front of a scheme
                disciplinary panel.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three owners in the meter cabinet: DNO (service cable + cut-out + supplier earth terminal), MOP (meter + meter-side tails), customer (load-side tails onwards).',
              'The cut-out seal is a legal device. Breaking it without DNO authority risks criminal prosecution under the Theft Act 1968 AND scheme membership removal — career-altering. Customer consent does not override.',
              'MOP is distinct from DNO and from energy supplier. Meter work is requested via the supplier; the supplier dispatches the MOP. The DNO does not own meters.',
              'Smart meters (SMETS2) communicate via the DCC WAN to the supplier and support remote disconnection — but the supply boundary itself is unchanged.',
              'Decision tree: 105 (DNO) for cut-out / fuse rating / service cable / new connection. Energy supplier (MOP) for meter / meter-side tails. Yourself for load-side tails / CU / final circuits.',
              'BS 7671 Reg 132.16 + ESQCR Reg 26 frame the responsibilities. Reg 132.16 forces the upstream check on every alteration; Reg 26 establishes the supplier / MOP duty for the metering installation.',
            ]}
          />

          <Quiz title="DNO boundary and customer interface — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section5/5-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.5 From generation to your CU
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section6/6-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 6 — Micro-renewable energy
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
