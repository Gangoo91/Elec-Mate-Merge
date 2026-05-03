/**
 * Module 5 · Section 6 · Subsection 2 — Customer handover pack and scheme upload
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.3, 6.4
 *   AC 6.3 — "describe the procedure for handover of an electrical installation to the client"
 *   AC 6.4 — "describe the requirements for notification of work to building control"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 6.3; 2366-03 Unit 302 / AC 6.3
 *
 * The handover pack is what the customer takes away — and what every future
 * inspector, solicitor, lender or insurance investigator will read to make
 * sense of the installation. Pack composition, distribution, and the
 * Competent Person Scheme upload (NICEIC, NAPIT, ELECSA portals) are
 * covered here.
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

const TITLE = 'Customer handover pack and scheme upload | Level 3 Module 5.6.2 | Elec-Mate';
const DESCRIPTION =
  'The handover pack composition for a domestic CU swap — EIC trio, Building Control Compliance Certificate, operational instructions, as-built records, manuals — plus the Competent Person Scheme upload routes (NICEIC, NAPIT, ELECSA) and the 30-day Part P notification window.';

const checks = [
  {
    id: 'm5-s6-sub2-pack-contents',
    question:
      'For a domestic CU swap-out plus a new EV charger circuit, the standard customer handover pack contains:',
    options: [
      'Just the EIC.',
      'EIC + Schedule of Inspections + Schedule of Test Results + Building Control Compliance Certificate (issued by the Competent Person Scheme after upload) + operational instructions + as-built records + manufacturer manuals for the new equipment (RCBOs, EV charger, SPDs, AFDDs).',
      'Just the invoice.',
      'EIC plus a verbal briefing only.',
    ],
    correctIndex: 1,
    explanation:
      "The handover pack is more than the EIC. It is the full evidence bundle the customer needs for any future EICR, property sale, insurance claim or warranty interaction. Pack contents: EIC + Schedule of Inspections + Schedule of Test Results, the Building Control Compliance Certificate that the CPS issues after the contractor's upload, written operational instructions (CU location, RCD test routine, isolator location), as-built records (circuit schedule typically affixed inside the CU door for domestic), manufacturer manuals for installed equipment.",
  },
  {
    id: 'm5-s6-sub2-cps-window',
    question:
      'The standard Competent Person Scheme notification window for Part P notifiable work in England is:',
    options: [
      'No deadline — upload whenever convenient.',
      '30 days from completion. NICEIC, NAPIT and ELECSA all operate on a 30-day upload window for Part P notifiable work; missing the window risks scheme penalties and the customer not receiving their Building Control Compliance Certificate in time.',
      '7 days.',
      '12 months.',
    ],
    correctIndex: 1,
    explanation:
      'The 30-day window is the universal CPS notification standard for Part P notifiable work in England (Wales has its own broadly equivalent regime). NICEIC Online, NAPIT eCert and ELECSA Online all hold contractors to the 30-day upload deadline. Missing it triggers scheme audit flags and delays the Building Control Compliance Certificate that the customer needs for any property sale, insurance claim or future regulatory interaction.',
  },
  {
    id: 'm5-s6-sub2-walk-through',
    question:
      'Best-practice handover for a domestic CU swap includes a verbal walk-through covering:',
    options: [
      'Nothing — just hand over the paperwork.',
      'Location of the new CU and main isolator; how the RCDs work and the monthly test-button routine; what each circuit is labelled as; any new features (SPDs, AFDDs, smart switches) plus their manuals; the recommended next inspection date; the contact route for any post-handover issues.',
      'A detailed lecture on BS 7671.',
      'How to wire a new socket.',
    ],
    correctIndex: 1,
    explanation:
      'A five-minute walk-through saves an hour of phone calls afterwards. Cover the location of the CU and main isolator (so the customer can shut off in an emergency), how to test the RCDs monthly using the test buttons, what the circuit labels mean, any new features that the previous installation did not have (SPDs, AFDDs, smart switches with their own apps and manuals), the date the next inspection is due, and how to contact you if something goes wrong. This is the customer-facing layer of the regulatory handover.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The Competent Person Scheme upload generates which document for the customer?',
    options: [
      'A duplicate EIC.',
      'The Building Control Compliance Certificate — the legal evidence that the work has been notified to the local Building Control body via the scheme on the Part P notification route. Distinct from the EIC, but part of the same handover pack.',
      'A receipt for the upload fee.',
      'A test result printout.',
    ],
    correctAnswer: 1,
    explanation:
      "The Competent Person Scheme upload is the contractor's notification to Building Control, made by proxy through the scheme. The scheme then issues the Building Control Compliance Certificate to the customer — typically posted directly within a few weeks. The customer needs this certificate (alongside the EIC) for any property sale, since solicitors increasingly request both documents. The EIC certifies BS 7671 compliance; the BCCC certifies Part P / Building Regulations compliance.",
  },
  {
    id: 2,
    question: 'NICEIC, NAPIT and ELECSA are:',
    options: [
      'Government departments.',
      'Competent Person Schemes authorised by the Secretary of State (via DLUHC / its successors) to register contractors who self-certify Part P notifiable electrical work in England, replacing the need for individual Building Control notifications per job.',
      'Insurance companies.',
      'Equipment manufacturers.',
    ],
    correctAnswer: 1,
    explanation:
      'Competent Person Schemes were introduced in 2005 alongside Part P. Authorised schemes (NICEIC, NAPIT, ELECSA, Stroma, Certsure, ECA, BSI) register contractors against an assessment of competence, then act as the notification route to Building Control on behalf of their members. The contractor uploads each notifiable job to the scheme; the scheme aggregates and notifies Building Control; the customer receives the Building Control Compliance Certificate.',
  },
  {
    id: 3,
    question: 'Part P notifiable work in England (post-2013 reforms) is:',
    options: [
      'All electrical work.',
      'A defined subset — most non-trivial work in special locations (bathroom Zone 0/1, swimming pool, sauna, etc.); installation of a new circuit; replacement of a consumer unit. Like-for-like accessory replacement, repairs, additions to an existing circuit OUTSIDE special locations are NOT notifiable.',
      'Only commercial work.',
      'Only three-phase work.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2013 Part P revision narrowed the notifiable scope significantly. Notifiable: new circuits; consumer unit replacement; most work in defined special locations (Section 701 bathrooms, swimming pools, saunas). Not notifiable: like-for-like accessory replacement, repair work, additions to an existing circuit outside special locations. The notifiable list is what triggers the CPS upload requirement; non-notifiable work still needs the EIC or MEIWC for BS 7671 purposes but does not require Building Control notification.',
  },
  {
    id: 4,
    question: 'The contractor misses the 30-day CPS upload window. What happens?',
    options: [
      'Nothing.',
      'The scheme flags a missed notification (audit risk + potential scheme penalty); the Building Control Compliance Certificate to the customer is delayed; in some cases late notification fees apply; persistent missed notifications can put scheme membership at risk.',
      'The work has to be redone.',
      'The customer pays a fine.',
    ],
    correctAnswer: 1,
    explanation:
      'Missing the 30-day CPS window has compounding consequences. First, the scheme flags the contractor in their audit dashboard. Second, the customer waits longer for their Building Control Compliance Certificate — embarrassing if they need it for a sale or remortgage. Third, late-notification fees may apply (scheme-dependent). Fourth, persistent missed notifications can trigger remedial action from the scheme, up to and including suspension. Build the upload into your job-completion checklist so it never gets missed.',
  },
  {
    id: 5,
    question: 'For non-CPS work (e.g. a contractor not registered with any scheme) on a Part P notifiable job, the notification route is:',
    options: [
      'No notification required.',
      'Direct application to the Local Authority Building Control (LABC) office before the work starts, with a Building Notice or Full Plans application; LABC inspects and issues a completion certificate. Significantly more expensive and slower than CPS routes — most contractors register with a scheme for this reason.',
      'Telephone the scheme afterwards.',
      'Notification is optional.',
    ],
    correctAnswer: 1,
    explanation:
      'Without CPS membership the contractor must notify Building Control directly via an LABC application before the work starts. LABC then inspects and issues their own completion certificate. This route involves application fees (typically several hundred pounds per job), inspection booking delays, and risk of LABC raising additional requirements. CPS membership averages this out — the scheme fee is paid annually rather than per job, and the 30-day post-completion upload is far less disruptive than pre-work LABC application.',
  },
  {
    id: 6,
    question: "The customer's copy of the handover pack should be provided:",
    options: [
      'Verbally at handover.',
      'As a complete printed pack at handover plus PDF emailed for their records — they need it for any future EICR (so the inspector can compare current readings against the original), any property sale (solicitors increasingly require current EIC), any insurance claim (proof of certification at the time of an incident), any warranty claim on installed equipment.',
      'Posted six weeks later.',
      'Not provided at all.',
    ],
    correctAnswer: 1,
    explanation:
      'Hand-over the printed pack on completion plus email the PDF for redundancy. The customer needs it across multiple future scenarios — EICR (next inspector compares your readings to current), sale (solicitor requests current EIC), insurance (proof of certification), warranty (RCBO or EV-charger manufacturer claim). PDF gives them an indexed, searchable copy. Print copy gives them a tangible document to file. Both are cheap to produce and immeasurably valuable across the lifetime of the installation.',
  },
  {
    id: 7,
    question: 'On a domestic CU swap, the as-built circuit schedule should typically be:',
    options: [
      "Filed only in the contractor's office.",
      'Affixed inside the CU door (for the immediate user reference) plus included in the handover pack as a stand-alone document. Future fault diagnosis depends on accurate circuit-to-board labelling at the CU itself.',
      'Posted online only.',
      'Not produced at all on domestic work.',
    ],
    correctAnswer: 1,
    explanation:
      'The as-built circuit schedule on the inside of the CU door is the immediate reference for any future occupant or electrician opening up the board. At minimum it shows circuit number, OCPD type/rating, and circuit description. On more complex installs it may extend to a single-line diagram. The handover pack copy gives the customer a back-up if the in-CU schedule degrades or is removed. No schedule = future fault-finding starts with hours of guesswork at the board.',
  },
  {
    id: 8,
    question: 'The contractor uploads the EIC to NICEIC Online for a domestic CU swap completed today. Approximately when does the customer receive their Building Control Compliance Certificate?',
    options: [
      'Same day.',
      'Typically 2-6 weeks from upload — NICEIC processes the notification, Building Control receives it, and the BCCC is posted to the customer at the property address. Window varies by scheme and by season; most contractors set customer expectations accordingly at handover.',
      'Six months.',
      'Never — only the EIC is needed.',
    ],
    correctAnswer: 1,
    explanation:
      'BCCC delivery is not instant. The CPS processes the upload, batches notifications to Building Control, and the BCCC is then printed and posted to the customer. Two to six weeks is typical — longer in busy periods or where the scheme requires additional verification. Always set customer expectations at handover: explain the BCCC is posted separately by the scheme, explain the typical window, give them your contact details to chase if it has not arrived after eight weeks.',
  },
];

const faqs = [
  {
    question: 'Do I have to print the handover pack, or is emailing the PDF sufficient?',
    answer:
      "Best practice is both — printed at handover plus PDF emailed. The printed copy is the formal handover; the PDF is the customer's backup. Some customers (especially older ones, or non-UK first-language speakers) strongly prefer paper they can file. Some prefer the PDF only because they store everything in cloud folders. Offering both costs almost nothing and removes any risk of the customer claiming they did not receive the certification.",
  },
  {
    question: 'What if the customer wants me to email the EIC to their solicitor or lender directly?',
    answer:
      "Fine — provided the customer asks you to do so in writing (or by clear email request that you can save to file). Always copy the customer on the email so they have full visibility. Do not email third parties without the customer's instruction — you have a duty of confidentiality on the address, supply characteristics and technical details that go in the EIC. Customer-instructed third-party copies are normal and expected; uninstructed ones are a data-protection breach.",
  },
  {
    question: 'Which Competent Person Scheme should I register with?',
    answer:
      'NICEIC (Certsure-administered), NAPIT, ELECSA (also Certsure-administered) and Stroma are the most common UK choices for domestic Part P self-certification. They differ on annual fee, assessment style, branding and software portal. Most domestic-focused contractors choose NICEIC or NAPIT; commercial-focused contractors often add JIB / ECA membership for tendering credibility. Pick on assessment style, scheme support and per-job upload tooling — most contractors find the scheme that fits their workflow stays for the long term.',
  },
  {
    question: 'The customer says they do not want the EIC posted on the side of the CU because it looks untidy. What should I do?',
    answer:
      'Hand the EIC pack to the customer for filing — that is the correct destination for the formal certificate. The CU itself should carry the circuit schedule (typically a small label sheet inside the CU door listing circuit number / OCPD / description) and any required warning labels (e.g. PME warning, supply isolation, AFDD test reminder per A4:2026). The full EIC document does not belong on the CU — it goes to the customer for safe storage as part of the handover pack.',
  },
  {
    question: 'On a non-Part P notifiable job (e.g. like-for-like socket replacement), do I still need to issue an MEIWC?',
    answer:
      'Yes — BS 7671 requires the MEIWC for any minor electrical work irrespective of whether it is Part P notifiable. Part P (Building Regulations) and BS 7671 (the wiring regs) are separate regimes that overlap. Part P sets the building control notification requirement. BS 7671 sets the certification requirement. A like-for-like socket swap is non-notifiable (no CPS upload needed) but still requires an MEIWC under BS 7671 to record the test results for the altered portion.',
  },
  {
    question: 'The customer is a tenant rather than the owner. Who do I give the handover pack to?',
    answer:
      "The duty-holder for the installation is the landlord (in residential rented), not the tenant. Hand the formal pack to the landlord (or the landlord's agent or property manager who instructed the work). Provide the tenant with a verbal walk-through of the safety-relevant parts (CU location, RCD test buttons, what to do in an electrical emergency) and a one-page summary of any new equipment they will use day to day. The full EIC and supporting schedules go to the duty-holder — the landlord's file copy is the one that matters for the next 5-yearly EICR cycle and for compliance with the Electrical Safety Standards in the Private Rented Sector regulations.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · Subsection 2"
            title="Customer handover pack and scheme upload"
            description="The full evidence bundle the customer takes away — EIC trio, Building Control Compliance Certificate, operational instructions, as-built records, manuals — plus the 30-day Competent Person Scheme upload (NICEIC, NAPIT, ELECSA portals)."
            tone="emerald"
          />

          <TLDR
            points={[
              'The handover pack is more than the EIC. Standard contents: EIC + Schedule of Inspections + Schedule of Test Results + Building Control Compliance Certificate + operational instructions + as-built records (circuit schedule on CU door) + manufacturer manuals.',
              'Distribution = three places: customer (printed at handover plus PDF emailed), contractor (cloud file copy retained 6+ years), Competent Person Scheme (online upload within 30 days for Part P notifiable work in England).',
              "CPS upload = contractor's notification to Building Control via the scheme. Scheme then issues the Building Control Compliance Certificate to the customer (typically posted 2-6 weeks after upload).",
              'NICEIC Online, NAPIT eCert and ELECSA Online are the dominant UK scheme portals. All three operate on a 30-day post-completion upload window. Missing it = audit flag, delayed BCCC to customer, possible late-notification fee.',
              'Hand-over walk-through with the customer: CU and main isolator location, RCD test-button routine, circuit labels, any new features (SPDs, AFDDs, smart switches), recommended next inspection date, post-handover contact route.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the standard handover pack contents for a domestic CU swap and a single-circuit addition.',
              'Distinguish the EIC (BS 7671 certification) from the Building Control Compliance Certificate (Part P / Building Regulations notification).',
              'Identify the three CPS distribution destinations for the certification (customer, contractor, scheme) and the retention requirements at each.',
              'Apply the 30-day Competent Person Scheme notification window for Part P notifiable work in England.',
              'Choose between the CPS upload route (registered contractor) and the direct LABC notification route (non-registered).',
              'Define which work is Part P notifiable in England under the post-2013 narrowed scope.',
              'Conduct a customer handover walk-through covering CU location, RCD test routine, circuit labels, new features and next inspection date.',
              'Manage the difference between landlord and tenant duty-holders on rented installations.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The handover pack — what goes in</ContentEyebrow>

          <ConceptBlock
            title="Handover pack composition for a domestic CU swap"
            plainEnglish="The pack is everything the customer needs to evidence what was done, prove it was certified, operate it safely day to day, and serve any future inspector or solicitor or insurer who needs to make sense of the installation."
            onSite="Build the pack as you go through the job. Drop the manuals into a folder when you unbox the equipment. Print the EIC, Schedule of Inspections and Schedule of Test Results on completion. Compile it before you leave site. Hand it over with a verbal walk-through. PDF copy emailed within the hour."
          >
            <p>Standard handover pack contents:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Item</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Why it is in the pack</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">When the customer needs it</div>

                <div>EIC + Schedule of Inspections + Schedule of Test Results</div>
                <div>Top-level signed certification of the new work, visual checklist, per-circuit test readings</div>
                <div>Property sale, future EICR, insurance claim, warranty</div>

                <div>Building Control Compliance Certificate (BCCC)</div>
                <div>Building Regulations Part P notification evidence — issued by the CPS after upload</div>
                <div>Property sale (solicitor request), Building Control queries</div>

                <div>Operational instructions</div>
                <div>Plain-English summary for the user — CU/isolator location, RCD test routine, what each label means</div>
                <div>Daily operation, monthly RCD test, emergency isolation</div>

                <div>As-built circuit schedule (typically on CU door + pack copy)</div>
                <div>Plain mapping of circuit number to OCPD to circuit description</div>
                <div>Future fault diagnosis, addition of new circuits, EICR</div>

                <div>Manufacturer manuals (RCBOs, AFDDs, EV charger, SPDs, smart switches)</div>
                <div>Equipment-specific operation, fault codes, warranty terms, manufacturer test routines</div>
                <div>Equipment fault diagnosis, warranty claim, future maintenance</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                {
                  item: 'EIC + Schedule of Inspections + Schedule of Test Results',
                  why: 'Top-level signed certification, visual checklist, per-circuit test readings',
                  need: 'Property sale, future EICR, insurance claim, warranty',
                },
                {
                  item: 'Building Control Compliance Certificate (BCCC)',
                  why: 'Building Regulations Part P notification evidence — issued by CPS after upload',
                  need: 'Property sale (solicitor request), Building Control queries',
                },
                {
                  item: 'Operational instructions',
                  why: 'Plain-English summary — CU/isolator location, RCD test routine, label meanings',
                  need: 'Daily operation, monthly RCD test, emergency isolation',
                },
                {
                  item: 'As-built circuit schedule (on CU door + pack copy)',
                  why: 'Mapping of circuit number to OCPD to circuit description',
                  need: 'Future fault diagnosis, addition of new circuits, EICR',
                },
                {
                  item: 'Manufacturer manuals',
                  why: 'Equipment-specific operation, fault codes, warranty terms',
                  need: 'Equipment fault diagnosis, warranty claim, maintenance',
                },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Item</div>
                  <div className="text-white/90 mt-0.5 font-semibold">{row.item}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Why</div>
                  <div className="text-white/80 mt-0.5">{row.why}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">When needed</div>
                  <div className="text-white/80 mt-0.5">{row.need}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.1 (Design documentation framework, Regs 132.2–132.5)"
            clause="The information required as a basis for design is stated in Regulations 132.2 to 132.5. The requirements to which the design shall conform are stated in Regulations 132.6 to 132.16. Designers shall therefore determine and record the information listed in 132.2–132.5 to demonstrate conformity with subsequent design requirements."
            meaning={
              <>
                The Reg 132.1 framework is the design-side documentation requirement — the
                designer must determine and record the supply and installation information set out
                in Regs 132.2–132.5 so that the design itself can demonstrate conformity with
                Regs 132.6–132.16. On a domestic install this is typically the as-built circuit
                schedule inside the CU door plus the schedule attached to the EIC. On larger
                installations this extends to single-line diagrams, panel schedules and full cable
                books. The handover pack is the delivery vehicle for the Reg 132.1 documentation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.1 framework."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Distribution — three destinations</ContentEyebrow>

          <ConceptBlock
            title="Customer, contractor, Competent Person Scheme — three copies, three roles"
            plainEnglish="Customer copy = lifetime retention by the duty-holder. Contractor copy = liability + CPS audit retention. CPS copy = Building Control notification on the contractor's behalf and BCCC issue to the customer."
            onSite="Modern certification software auto-handles all three. NICEIC Online, NAPIT eCert and ELECSA Online let you generate the EIC, email the customer the PDF, file the contractor copy in the cloud and submit the scheme notification all from one workflow. If you are still managing distribution manually, expect to spend an extra hour per job."
          >
            <p>Where each copy goes and why:</p>

            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer copy.</strong> The duty-holder for the installation needs the
                full pack — printed at handover plus PDF for cloud filing. Lifetime retention
                from their side. Future scenarios that need it: any future EICR (next inspector
                compares current readings to your originals), property sale (solicitors
                increasingly request current EIC), insurance claim (proof of certification at
                time of incident), warranty claim on installed equipment.
              </li>
              <li>
                <strong>Contractor copy.</strong> File copy retained per Limitation Act (six
                years minimum for civil liability) and per professional indemnity insurer
                requirements (often 10-25 years). Per Competent Person Scheme audit (most CPSs
                require contractor retention for the duration of scheme membership plus a
                trailing period). Cloud storage of PDFs is now standard practice; physical
                paper-only filing is increasingly rare.
              </li>
              <li>
                <strong>Competent Person Scheme copy.</strong> Online upload within 30 days for
                Part P notifiable work in England. The scheme acts as the contractor's
                notification proxy to Building Control. Scheme then issues the Building Control
                Compliance Certificate to the customer at the property address (typically
                posted 2-6 weeks after upload).
              </li>
              <li>
                <strong>Building Control direct (non-CPS only).</strong> If the contractor is
                NOT registered with a CPS, notification goes direct to Local Authority Building
                Control before the work starts via a Building Notice or Full Plans application.
                LABC inspects and issues their own completion certificate. More expensive and
                slower than the CPS route — most contractors register with a scheme to avoid
                per-job LABC fees.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Competent Person Scheme upload — NICEIC, NAPIT, ELECSA</ContentEyebrow>

          <ConceptBlock
            title="The CPS upload workflow — portal entry, BCCC generation, customer delivery"
            plainEnglish="Contractor uploads the EIC details to the scheme portal. Scheme aggregates and notifies Building Control on the contractor\'s behalf. Scheme prints and posts the Building Control Compliance Certificate to the customer at the property address."
            onSite="Set the upload as the last item on your job-completion checklist — same day if possible, certainly within 30 days. Many contractors batch-upload weekly to avoid forgetting. Each of the three big schemes — NICEIC, NAPIT, ELECSA — has slightly different portal workflows but the same 30-day deadline and the same downstream BCCC issue process."
          >
            <p>The standard CPS upload workflow:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Generate the EIC in your certification software.</strong> All three big
                schemes integrate with the major certification software products (ElecCert,
                EasyCert, ElectricalCertificateSoftware, the in-house Stroma software, the
                NICEIC Online tool). Generated PDF is what the scheme expects.
              </li>
              <li>
                <strong>Log in to the scheme portal.</strong> NICEIC Online (certsure.com),
                NAPIT eCert (napit.org.uk), ELECSA Online (elecsa.co.uk via the Certsure
                portal). Two-factor authentication standard.
              </li>
              <li>
                <strong>Enter the notification details.</strong> Property address, customer
                name, type of work (CU replacement, new circuit, special location work),
                completion date, scope description. Many schemes auto-populate from the
                uploaded EIC PDF using OCR.
              </li>
              <li>
                <strong>Pay the per-notification fee (where applicable).</strong> Some schemes
                bundle the fee into annual membership; others charge per notification. Typical
                per-job fees are modest — single-digit pounds per notification.
              </li>
              <li>
                <strong>Receive the upload confirmation.</strong> Scheme issues a unique
                notification reference. Save this to the job file in case the customer or
                Building Control queries it later.
              </li>
              <li>
                <strong>Building Control Compliance Certificate to the customer.</strong>
                Scheme prints and posts the BCCC to the customer at the property address.
                Typical lead time 2-6 weeks. Customer keeps this alongside the EIC for life of
                the installation.
              </li>
            </ol>
            <p>
              Set customer expectations on BCCC delivery at handover. Telling the customer that
              a separate document will arrive in the post 4 weeks later avoids the panicked
              follow-up phone call when they assume something was missed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 — Approved Document P, Electrical Safety in Dwellings (Part P notifiable work scope, paraphrased)"
            clause="Notifiable electrical installation work in dwellings in England includes: the installation of a new circuit; the replacement of a consumer unit; the addition or alteration of existing circuits in a special location (e.g. Section 701 bathrooms, swimming pools, saunas). Like-for-like accessory replacement, repair work and additions/alterations to existing circuits OUTSIDE special locations are NOT notifiable."
            meaning={
              <>
                The 2013 Part P revision narrowed the notifiable scope. Notifiable work
                triggers the CPS upload requirement (or LABC direct route for non-registered
                contractors). Non-notifiable work still needs the EIC or MEIWC for BS 7671
                purposes — the certification regime and the Part P notification regime are
                separate and only partially overlap. Always check the scope test before
                deciding whether the upload is required.
              </>
            }
            cite="Source: Building Regulations 2010 (England), Approved Document P 2013 edition; Welsh equivalent under the Welsh Building Regulations."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Customer walk-through — the verbal handover layer</ContentEyebrow>

          <ConceptBlock
            title="The five-minute walk-through — what to cover with the customer"
            plainEnglish="The paperwork is the formal handover. The walk-through is the human handover. Five minutes of structured explanation saves an hour of confused phone calls afterwards."
            onSite="Customer walk-through is the most underrated part of handover. The customer has spent four-figure sums on a CU swap and feels nervous about the new equipment. A brief, structured tour establishes you as the trustworthy professional, prevents avoidable callouts, and earns the recommendation."
          >
            <p>Standard walk-through items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Location of the CU and main isolator.</strong> Where to go in an
                emergency to shut off the supply. Point at the main switch on the CU and the
                meter-side isolator (where fitted). Confirm the customer can identify both.
              </li>
              <li>
                <strong>RCD test routine.</strong> Demonstrate the test buttons on the RCBOs
                (or main RCDs on dual-RCD boards). Explain the monthly test routine — press
                the test button, the RCBO trips, reset by switching back on. Note that the
                test simulates a fault and confirms the device still trips correctly.
              </li>
              <li>
                <strong>Circuit labels.</strong> Walk the customer through the as-built circuit
                schedule on the CU door. Identify which circuit is which — kitchen ring,
                upstairs lights, shower, EV charger. Confirm any unusual labelling makes sense
                to them.
              </li>
              <li>
                <strong>New features the customer did not have before.</strong> SPDs (no
                customer action required, but explain they protect against lightning surge),
                AFDDs (test routine per manufacturer, typically a separate test button), smart
                switches with their own apps (hand over the manual and the app credentials).
              </li>
              <li>
                <strong>Recommended next inspection date.</strong> Confirm what is on the EIC
                — typically 10 years for owner-occupied domestic, 5 years for rented domestic
                under the Electrical Safety Standards in the Private Rented Sector regs.
                Suggest the customer puts a calendar reminder a few months before the date.
              </li>
              <li>
                <strong>Post-handover contact route.</strong> Hand over your card, mention
                your typical response window. Explain when to call versus when to deal with
                it themselves (e.g. RCD trip clears on reset = no need to call; persistent
                RCD trip = call).
              </li>
              <li>
                <strong>Building Control Compliance Certificate timing.</strong> Mention the
                BCCC will arrive separately by post from the scheme, typically 2-6 weeks
                after handover. This avoids the customer thinking it was missed.
              </li>
            </ul>
            <p>
              Five minutes done well. Customer feels in control of their new installation.
              Avoidable callouts evaporate. Recommendations arrive.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Missing the 30-day Competent Person Scheme upload window"
            whatHappens={
              <>
                You finish a domestic CU swap in early March, hand over the EIC pack to the
                customer, and move on to the next job without uploading the notification. Eight
                weeks later the customer calls — they have not received the Building Control
                Compliance Certificate, their solicitor is asking for it because the property
                sale is going through, and the buyer\'s lender will not release funds without
                it. You log in to NICEIC Online and find the upload window has expired; the
                late notification will take additional weeks to process and triggers a late
                fee plus an audit flag against your scheme membership.
              </>
            }
            doInstead={
              <>
                Build the CPS upload into your job-completion checklist. Same-day upload is
                ideal. End-of-week batch upload as a fallback. Many contractors set a Friday
                afternoon recurring slot to upload the week\'s notifications and review the
                scheme dashboard for any flags. The 30-day window is generous but it
                disappears quickly when jobs stack up — never let a month\'s worth of
                notifications accumulate.
              </>
            }
          />

          <CommonMistake
            title="Handing over only the EIC and assuming the customer knows the rest"
            whatHappens={
              <>
                You hand the customer a printed EIC at the end of a CU swap, say "all done",
                and leave. Two weeks later the customer calls in a panic — the upstairs ring
                has tripped and they cannot work out which switch to reset. They never noticed
                the CU door had a labelled circuit schedule. They cannot find the test buttons.
                They thought the BCCC would be inside the EIC pack and assume something was
                missed.
              </>
            }
            doInstead={
              <>
                Hand over the FULL pack — EIC trio, BCCC explanation, operational instructions,
                manuals, as-built schedule. Walk the customer through the new equipment for
                five minutes — CU and isolator location, RCD test buttons, circuit labels, any
                new features, when the BCCC will arrive. Five minutes saves an hour of
                follow-up calls and earns the recommendation.
              </>
            }
          />

          <Scenario
            title="Domestic CU swap-out handover for a customer about to remortgage"
            situation={
              <>
                You have completed a domestic CU swap-out for a customer who tells you they need
                the certificate today because their remortgage application closes tomorrow and
                the lender requires "current electrical certification". The job is 8 circuits,
                single-phase TN-C-S, all new RCBOs (Type A 30 mA), measured Ze = 0.30 Ω. Dead
                tests pass; live tests pass; RCD trip times all within 22-35 ms. You are NICEIC
                registered. Customer is the homeowner, owner-occupied. The lender is likely to
                accept the EIC as evidence of "current electrical certification" but may also
                ask for the BCCC.
              </>
            }
            whatToDo={
              <>
                <strong>Compile the pack on site before you leave.</strong> Print the EIC,
                Schedule of Inspections and Schedule of Test Results from your certification
                software. Add the manufacturer manuals for the new RCBOs and any new
                accessories. Print or write the operational instructions sheet (CU location,
                main isolator, RCD test routine, monthly check, what to do in an emergency).
                Print or write the as-built circuit schedule and affix the small label sheet
                inside the CU door; include a full copy in the pack.
                <br />
                <br />
                <strong>Hand over with a five-minute walk-through.</strong> Show the customer
                the CU and main isolator. Demonstrate the RCD test buttons on two of the
                RCBOs and explain the monthly routine. Walk through the circuit labels.
                Explain the BCCC will arrive by post from NICEIC in 2-6 weeks. Hand over your
                card with the post-handover contact route.
                <br />
                <br />
                <strong>Email the PDF pack within the hour.</strong> Customer gets a redundant
                cloud copy. Confirm by email what you handed over physically.
                <br />
                <br />
                <strong>Upload to NICEIC Online same day.</strong> Property address, customer
                name, type of work ("Consumer unit replacement, owner-occupied dwelling"),
                completion date today, scope description. Save the NICEIC notification
                reference number to the job file. Set customer expectation that the BCCC will
                arrive by post within 2-6 weeks; in the meantime the EIC is the immediate
                evidence of certification for the lender.
                <br />
                <br />
                <strong>Address the remortgage timing honestly.</strong> The lender accepts a
                certificate dated today; if the customer\'s completion is tomorrow, the EIC
                from today is current evidence. Do NOT back-date the EIC — back-dating is
                dishonest and can amount to fraud. If the lender requires the BCCC
                specifically and that is not yet available, the customer can present the EIC
                with the NICEIC notification reference as evidence the BCCC is in process.
                Most lenders accept this combination as sufficient interim evidence.
                <br />
                <br />
                <strong>File the contractor copy.</strong> Cloud storage with the customer
                pack PDF, the NICEIC notification reference, and any photos taken during the
                install (CU before/after, terminations, labels). Indefinite retention.
              </>
            }
            whyItMatters={
              <>
                The handover pack is the customer\'s evidence base across the entire lifetime
                of the installation. The remortgage tomorrow needs the EIC. The next EICR in
                10 years needs the original Schedule of Test Results to compare current
                readings against. The property sale in 5 years needs both the EIC and the
                BCCC. The insurance claim after any incident needs proof of certification at
                the time. Compile the pack carefully on the day of handover — every item has
                a forward use that you cannot easily go back and recreate.
              </>
            }
          />

          <ConceptBlock
            title="Sample size on a periodic — what proportion to actually test"
            plainEnglish="EICR sampling is professional judgement framed by GN3 guidance. On a domestic install most inspectors test every final circuit. On a large commercial install testing every circuit is impractical — sampling is unavoidable. The size of the sample reflects installation age, condition, evidence of previous reports, accessibility, and the risk profile of the load. A 50% sample on a critical load may be reasonable; a 10% sample on a low-risk lightly-loaded administrative office may also be reasonable, with documented rationale."
            onSite="Document the sample explicitly on the EICR — what was tested, what was visually inspected only, what was accepted on previous-report evidence. The sample limitation is itself a finding the customer needs to understand. &quot;Tested 60% of circuits, balance subject to next inspection&quot; is a defensible record; &quot;tested some&quot; is not."
          >
            <p>Factors driving sample size:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Age and condition of the installation.</li>
              <li>Quality and currency of previous certificates and reports.</li>
              <li>Accessibility of test points (concealed conductors push toward larger sample of accessible end points).</li>
              <li>Risk profile of the load (life-safety circuits push toward 100% sample).</li>
              <li>Time and cost constraints agreed with the duty holder.</li>
              <li>Any specific concerns raised by the duty holder during the pre-inspection briefing.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer file retention — the six-year minimum and the longer-life reality"
            plainEnglish="The Limitation Act 1980 sets the period in which a customer can bring a claim — six years for breach of contract and tort claims arising in England and Wales (five years in Scotland). For deeds and personal-injury actions the periods are longer. The professional indemnity insurer typically requires the contractor to retain customer files for at least six years from the date of work, and many firms retain indefinitely or until the next periodic certificate supersedes."
            onSite="Modern firms retain customer files in the cloud rather than physical storage; cost and accessibility favour digital retention. The L3 apprentice's contribution is to ensure every certificate, every photo, every test result attaches to the correct customer record at the time of the visit. Lost or mis-filed evidence becomes the contractor's problem when a claim arises three years later. Personal data on the file (customer name, address) attracts UK GDPR retention obligations — keep no longer than necessary, and under the firm's published privacy notice."
          >
            <p>
              File retention obligations summary:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Six-year minimum</strong> — Limitation Act 1980;
                most contractor PI insurers require this as a baseline.
              </li>
              <li>
                <strong>Indefinite for some</strong> — heritage works,
                deed-of-grant work, where personal injury could conceivably
                arise.
              </li>
              <li>
                <strong>Cloud retention</strong> — firm's CRM or job system
                stores certificates, photos, test data; backups in a
                separate location for resilience.
              </li>
              <li>
                <strong>UK GDPR alignment</strong> — personal data kept
                only as long as needed, with the firm's published privacy
                notice setting customer expectations.
              </li>
              <li>
                <strong>Customer access</strong> — under UK GDPR,
                customers can request copies of their personal data; the
                firm responds within 30 days.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Common upload errors and how the schemes handle them"
            plainEnglish="The competent-person scheme upload portals reject mismatched data, duplicate certificates and out-of-window submissions. Common errors include the wrong CU type entered, the wrong number of circuits, the wrong test voltage on IR, the wrong RCD type. Most schemes flag the error within 24 hours and ask the contractor to amend. Late or absent corrections can hold the BCCC for weeks and embarrass the customer who is waiting for it."
            onSite="The L3 apprentice on the upload should double-check the certificate against the install: count the circuits, verify each device type matches the photo, confirm the test data matches the schedule. A two-minute review at upload time prevents a half-day chase later. If the scheme rejects the upload, log into the portal, follow the rejection notice and amend; resubmit. The firm's office often handles uploads as a batch; the apprentice's discipline is in the source data accuracy."
          >
            <p>
              Common upload pitfalls and prevention:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mismatched circuit count</strong> — schedule shows
                12 ways but certificate header says 14; the schemes
                reconcile and reject the inconsistency.
              </li>
              <li>
                <strong>Wrong supply system</strong> — TN-C-S vs TN-S vs
                PME vs PNB confusion; A4:2026 introduced PNB
                terminology that older form templates may not match.
              </li>
              <li>
                <strong>RCD type</strong> — Type AC vs Type A vs Type B;
                A4:2026 mandates Type A or Type B for many circuits.
              </li>
              <li>
                <strong>Out-of-window submission</strong> — schemes reject
                submissions later than 30 days from completion; the
                contractor falls back to direct LABC notification.
              </li>
              <li>
                <strong>Duplicate certificate</strong> — re-upload of an
                amended certificate without referencing the original
                rejected one; the scheme treats it as a new
                submission.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer-facing portals — Easycert, ElectricalCertificate and the manufacturer apps"
            plainEnglish="Beyond the competent-person scheme upload, modern firms increasingly use a customer-facing portal — Easycert, ElectricalCertificate.co.uk, NICEIC's customer portal — that lets the customer log in to view their own certificates, schedule the next inspection, and request a contractor visit. The portal also stores manufacturer-app integration where smart devices are involved (Hive, Tado, GivEnergy, Tesla)."
            onSite="At handover, walk the customer through the portal sign-up — username (typically their email), password (set by them), how to download a copy of the certificate, how to find the next-inspection-due date. Most customers prefer the portal to a paper folder because they can find the certificate from their phone in five seconds. The L3 apprentice's role is to ensure the upload to the portal happens at the same time as the upload to the scheme; some firms automate this so a single submission handles both."
          >
            <p>
              Customer-portal walkthrough at handover:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Account creation</strong> — typically pre-created
                by the firm; the customer activates with an email-link
                first login.
              </li>
              <li>
                <strong>Certificate download</strong> — show how to find
                the certificate, save the PDF, share it with a
                conveyancing solicitor or insurer.
              </li>
              <li>
                <strong>Next-inspection reminder</strong> — portal flags
                the date based on the certificate's recommended next
                inspection.
              </li>
              <li>
                <strong>Contact for follow-up</strong> — portal offers a
                'request a visit' button that drops a job into the firm's
                booking system.
              </li>
              <li>
                <strong>Manufacturer app integration</strong> — for
                installations with smart devices, the portal links to the
                relevant manufacturer apps so the customer has all the
                relevant accounts in one place.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 652.1 (frequency of periodic inspection)"
            clause={
              <>
                The frequency of periodic inspection and testing of an installation shall be
                determined having regard to the type of installation and equipment, its use and
                operation, the frequency and quality of maintenance and the external influences
                to which it may be subjected. The results and recommendations of previous
                certificates and condition reports shall also be taken into account.
              </>
            }
            meaning={
              <>
                Frequency is professional judgement, not a rigid table. GN3 Table 3.2 gives
                starting points (10 years owner-occupied, 5 years rented domestic and
                commercial, 3 years industrial) but the regulation requires the inspector to
                weigh real-world factors and override the default where appropriate. Sample
                size moves with the same logic — high-use environments justify both shorter
                intervals and larger samples.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 652.1 — full text from published amendment."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Handover pack contents = EIC + Schedule of Inspections + Schedule of Test Results + Building Control Compliance Certificate (BCCC) + operational instructions + as-built records + manufacturer manuals.',
              'Distribution = customer (printed at handover plus PDF emailed; lifetime retention by the duty-holder), contractor (cloud file copy retained 6+ years per Limitation Act and PI requirements), CPS (online upload within 30 days for Part P notifiable work in England).',
              "CPS upload triggers BCCC issue — the scheme acts as the contractor's notification proxy to Building Control and posts the BCCC to the customer at the property address (typically 2-6 weeks after upload).",
              'NICEIC Online, NAPIT eCert and ELECSA Online are the dominant UK scheme portals. All three operate on the 30-day window. Build the upload into the job-completion checklist or batch upload weekly.',
              'Part P notifiable work scope (England, post-2013): new circuit, CU replacement, work in special locations. Like-for-like swap, repair, additions outside special locations are NOT notifiable.',
              'Non-CPS contractors notify Building Control direct via LABC before work starts — significantly more expensive and slower; CPS membership avoids per-job LABC fees.',
              'Customer walk-through covers CU/isolator location, RCD test routine, circuit labels, new features, recommended next inspection date, post-handover contact route, and BCCC timing expectation.',
              'Reg 132.13 documentation requirement is delivered through the handover pack — circuit schedule on CU door, schedules attached to EIC, and (on larger installs) single-line diagrams and panel schedules.',
            ]}
          />

          <Quiz title="Customer handover pack and scheme upload — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.1 EIC issue and certificate types
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Commissioning paperwork chain
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
