/**
 * Module 7 · Section 2 · Subsection 4 — Specialised routes
 * Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.7 (primary) + LO2 / AC 2.1, 2.2 (layered)
 *   AC 1.7 — "Explain opportunities for progression within building services engineering"
 *   AC 2.1 — "Describe specific requirements for career choices in building services engineering"
 *   AC 2.2 — "Identify the areas in building services which run competent person schemes"
 *             (BAFE, NSI/SSAIB, NICEIC, MCS, etc. — covered in this Sub)
 *
 * The specialist routes within electrical contracting that pay above standard
 * rates and require specific competence — control & instrumentation, marine
 * & offshore, rail (Network Rail PTS), fire alarm (BAFE SP203-1),
 * CCTV/security/access (NSI/SSAIB), data and structured cabling. Each
 * specialism: training, certification, day rates, lifestyle.
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

const TITLE = 'Specialised routes | Level 3 Module 7.2.4 | Elec-Mate';
const DESCRIPTION =
  'Specialist routes within UK electrical contracting — control & instrumentation, marine & offshore, rail PTS, fire alarm BAFE, CCTV/security NSI/SSAIB, data cabling. Training, certification, day rates and lifestyle.';

const checks = [
  {
    id: 'mod7-s2-sub4-fire',
    question: "What's BAFE SP203-1 and why does it matter for fire alarm work?",
    options: [
      "BAFE SP203-1 is the BS 7671 amendment that brought fire alarm wiring under the Wiring Regulations for the first time — it sets the cable type and segregation rules for fire detection circuits and is enforced by Building Control.",
      "BAFE SP203-1 is a manufacturer's product approval mark applied to individual fire alarm panels and detectors — it certifies the device, not the installer, and any electrician can fit BAFE-marked equipment without registration.",
      "The UK third-party certification scheme for fire detection and alarm installer firms, increasingly required by insurers and commercial clients as evidence of competence.",
      "BAFE SP203-1 is the legal licence every fire alarm installer must hold by statute — working on a fire alarm without it is a criminal offence under the Fire Safety Order, in the same way Gas Safe registration is mandatory for gas work.",
    ],
    correctIndex: 2,
    explanation:
      "BAFE (British Approvals for Fire Equipment) is the UK third-party certification body for fire safety. SP203-1 is the specific scheme for fire alarm installation, commissioning and maintenance. It's not legally mandatory but is increasingly de facto required by insurers, commercial landlords, healthcare and education clients as evidence of competence under the Regulatory Reform (Fire Safety) Order 2005. BAFE registration earns the ECS Fire Detection endorsement and unlocks insurance-driven fire alarm work that pays above standard electrical rates.",
  },
  {
    id: 'mod7-s2-sub4-pts',
    question: "What's PTS and why does it matter for rail electrical work?",
    options: [
      "Permit To Switch — a Network Rail document that authorises an electrician to operate trackside signalling switchgear; it is issued per shift by the signaller and is unrelated to any personal competence card.",
      "Portable Test Set — the calibrated instrument used to verify trackside earthing and bonding on the rail network; holding a current PTS calibration certificate is what qualifies an electrician for rail work.",
      "Provisional Track Status — a planning classification that tells contractors whether a section of line is open, closed or under possession; it governs scheduling rather than worker competence.",
      "Personal Track Safety — the Network Rail mandatory competence card for working on or near operational track, with a 2-day course, medical and 2-yearly re-validation.",
    ],
    correctIndex: 3,
    explanation:
      "PTS is the Network Rail safety competence baseline for trackside work. Without PTS you cannot work on or near operational track; main contractors won't admit you. The course covers track safety, sighting and warning, lookout duties, and the Network Rail Rule Book basics. Rail electrical work (signalling, OLE — Overhead Line Equipment, station electrical) pays significantly above standard rates (often £350-500+/day) but typically involves night shifts (when track is closed) and significant travel, making it a lifestyle commitment.",
  },
  {
    id: 'mod7-s2-sub4-compex',
    question: "What's the practical difference between CompEx and standard electrical work?",
    options: [
      "Hazardous-area work uses Ex-rated equipment, special installation methods (cable glanding) and prescribed inspection regimes; CompEx is the recognised competence scheme.",
      "There is no practical difference in the work itself — CompEx is simply a higher day-rate band negotiated by the union for the same standard installation work, with no special equipment or method involved.",
      "CompEx work uses the same Ex-rated equipment as standard work but at a lower voltage (110 V centre-tapped) to reduce ignition risk — the only practical difference is the reduced site voltage, not the equipment or inspection regime.",
      "CompEx applies only to high-voltage work above 1000 V — below that voltage there is no hazardous-area distinction, and standard BS 7671 installation methods apply unchanged regardless of any flammable atmosphere.",
    ],
    correctIndex: 0,
    explanation:
      "Hazardous-area electrical work is genuinely different from standard installation — equipment selection, installation techniques and inspection regimes are all governed by ATEX/UKEX directives and BS 60079 series standards. It covers petrochemical, offshore, fuel storage, paint shops and distilleries. CompEx Ex01-04 covers gas-protected installations; Ex05-06 covers dust-protected. The 5-day course is typically £1,000-1,500, with day rates 50-100% above standard. Common employers: oil and gas majors, petrochemical contractors, offshore service companies, defence and aerospace.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's NSI / SSAIB and why does it matter for security and CCTV work?",
    options: [
      "NSI and SSAIB are two competing intruder-alarm manufacturers whose panels dominate the UK market — installers train on one or the other, and the choice of panel brand determines which insurers will cover the premises.",
      "National Security Inspectorate (NSI) and Security Systems and Alarms Inspection Board (SSAIB) are the two main UK third-party certification bodies for security systems installers — intruder alarms, CCTV, access control. Insurers typically specify NSI Gold / NSI NACOSS (or SSAIB equivalent) for higher-value insured premises. Police response to alarms requires NSI / SSAIB certification.",
      "NSI and SSAIB are Government licensing schemes run by the Home Office — every CCTV and alarm installer must hold one by law, in the same way the SIA licenses door supervisors, and working without one is a criminal offence.",
      "NSI and SSAIB are the data-protection registrations a security firm needs to operate CCTV under UK GDPR — they certify the firm's handling of recorded footage rather than the quality of the installation work.",
    ],
    correctAnswer: 1,
    explanation:
      "NSI and SSAIB are the security-systems equivalents of BAFE for fire. Police response to alarm activations requires the alarm system to be installed by an NSI/SSAIB-registered firm. Insurance-driven security work (commercial premises, banks, jewellers, museums) typically requires the higher-tier NSI Gold registration. Security specialism is a parallel trade that an electrician can move into through training plus firm registration.",
  },
  {
    id: 2,
    question: "What's the typical training route into control & instrumentation (C&I)?",
    options: [
      "C&I needs only the standard 2365-03 apprenticeship plus C&G 2382 — it is treated as ordinary final-circuit work, so no further qualifications or manufacturer training are required to move into it.",
      "C&I is entered through a CompEx hazardous-area certification alone, because all process-control work is in explosive atmospheres — once CompEx is held, no PLC or instrumentation training is needed.",
      "Approved Electrician + HNC/HND in electrical/electronic or process control + manufacturer-specific PLC training (Siemens, Rockwell, Schneider).",
      "C&I requires a software-engineering degree rather than an electrical background — it is an IT discipline, so electricians cannot move into it and it recruits from computer-science graduates instead.",
    ],
    correctAnswer: 2,
    explanation:
      "C&I (sometimes 'I&C' or 'Process Electrical') is the technician-tier discipline behind process automation, covering control systems, instrumentation, PLCs, SCADA and DCS. It blends electrical competence with control systems knowledge (PLC programming, SCADA configuration, instrumentation calibration). Pay is typically above standard installation electrician rates. Common employers: process industries (food, pharma, water utilities like Unilever, GSK, Anglian Water), petrochemical, large manufacturing, and specialist C&I sub-contractors.",
  },
  {
    id: 3,
    question: "What's the marine electrician specialism?",
    options: [
      "Marine electrical work is identical to domestic work but carried out near water — it uses standard BS 7671 230 V single-phase wiring throughout, with the only difference being IP65 accessories to cope with spray.",
      "Marine work covers only the shore-side marina pedestals supplying visiting boats — the work on the vessels themselves is done by the boat manufacturer, so the marine electrician never works aboard.",
      "Marine electrical work is a sub-set of CompEx covering fuel-tanker loading bays at ports — it is purely a hazardous-area discipline and involves no vessel wiring, DC systems or shore-power work.",
      "Shipping, naval, offshore and marinas, with marine-grade standards (BS EN 60092), corrosion protection, DC systems and shore-power connections.",
    ],
    correctAnswer: 3,
    explanation:
      "Marine electrical is a meaningful specialism covering commercial shipping, naval, offshore (oil and gas, wind), ports and marinas, with its own equipment standards (BS EN 60092), corrosion-protection methods, DC systems (24V/48V common on vessels) and shore-power connections. Offshore wind in particular has been a fast-growing UK marine-electrical employer. Pay is typically high (offshore rotation pays significant uplift) but the lifestyle is demanding (rotational shifts, weeks at sea or on platform). Common entry: Royal Navy / Merchant Navy electrical training, or direct entry to specialist marine sub-contractors.",
  },
  {
    id: 4,
    question: "What's structured cabling and how does it relate to electrical work?",
    options: [
      "The standardised install of data cabling (Cat 6/6A copper plus fibre) for IT and telephony, to standards like BS EN 50173; BICSI training is the route.",
      "Structured cabling is the BS 7671 requirement to run power cables in a tidy, labelled, parallel layout within trunking — it is a workmanship standard for ordinary 230 V wiring rather than a separate data discipline.",
      "Structured cabling refers to the SWA armoured sub-mains feeding distribution boards in a commercial building — the 'structure' is the power distribution hierarchy, and it is core electrical work rather than a data specialism.",
      "Structured cabling is the fixed wiring for a fire alarm system to BS 5839 — the term describes the structured detection zones, and the work falls under the BAFE fire-alarm specialism rather than data networking.",
    ],
    correctAnswer: 0,
    explanation:
      "Structured cabling is a meaningful electrical-adjacent specialism — same trade family but different competence requirements (cable termination, patch panels, cabinet installation, certification testing with a Fluke DTX-CableAnalyzer or similar, to BS EN 50173 / TIA-568). Data cabling installers earn well (typical day rates above standard installation electrician rates) and the work is often less heavy than power install. BICSI Installer 1, 2 and Technician are the recognised competence levels. Many electricians who specialise in fit-out commercial work add structured cabling as a complementary skill.",
  },
  {
    id: 5,
    question: "What's the lifestyle reality of offshore wind electrical work?",
    options: [
      "Rotational (typically 2 weeks on / 2 weeks off), helicopter transit, harsh weather and extended time away from home, with high day rates.",
      "Standard Monday-to-Friday day shifts with a daily boat crossing back to shore each evening, so the work pattern and home life are no different from a normal onshore commercial contract.",
      "Permanent residence on the turbine platform for months at a time with no rotation home, which is why offshore wind struggles to recruit and pays no premium over onshore rates.",
      "Office-based remote monitoring of turbines from a shore control room, with the physical work all done by automated maintenance robots — so it is a desk job rather than a hands-on trade.",
    ],
    correctAnswer: 0,
    explanation:
      "Offshore is high-pay-high-demand. Rotational schedule (14/14 patterns common), helicopter transit, confined-space and working-at-height, plus HUET (Helicopter Underwater Escape Training) and BOSIET (Basic Offshore Safety Induction and Emergency Training) certification are all required. Day rates are typically £400-700+ on rotation (some offshore electrical rates £600-800+) but the family/relationship demands are significant. Common in North Sea (oil and gas) and offshore wind (East Coast UK, Scotland). Pathway: standard apprenticeship → CompEx → offshore-specific training → rotational offshore role.",
  },
  {
    id: 6,
    question: "What's the role of an Electrical Technician in healthcare estates (NHS / private hospitals)?",
    options: [
      "It is purely portable-appliance testing of ward equipment — the technician spends the whole role PAT-testing kettles and bed controls, with no involvement in the building's fixed electrical systems.",
      "It is identical to domestic rewiring work but carried out in a hospital — standard BS 7671 applies with no additional standards, and the only difference is wearing scrubs on the wards.",
      "Critical-care and medical-equipment environments (UPS, medical IT circuits, theatres, MRI) under HTM standards alongside BS 7671; NHS Agenda for Change pay.",
      "It is a CompEx hazardous-area role because hospitals store medical oxygen — the technician works almost entirely on Ex-rated equipment in oxygen-rich zones and needs no healthcare-specific standards knowledge.",
    ],
    correctAnswer: 2,
    explanation:
      "Healthcare estate electrical work is technically demanding (HTM 06-01 / 06-02 standards layered on BS 7671, covering UPS systems, medical IT isolated-power circuits, theatres, ICU and MRI suites) but offers stable employment, structured progression (NHS Agenda for Change Band 5-7, £28-45k, plus on-call), pension benefits, and the satisfaction of supporting healthcare delivery. Entry typically via Approved Electrician + 2391-52 + healthcare-specific training. Many NHS Estates teams sponsor staff through HNC / HND for senior technician progression.",
  },
  {
    id: 7,
    question: "What's the typical CompEx course like?",
    options: [
      "A half-day online webinar followed by a multiple-choice quiz, with no practical element — once passed, the certificate is valid for life and never needs refreshing.",
      "An apprenticeship-length programme of two years' day-release, equivalent to a full NVQ, because hazardous-area competence cannot be taught in a short course.",
      "A single practical assessment with no classroom content, where the candidate is observed glanding a cable into a flameproof enclosure and passes or fails on that one task alone.",
      "A 5-day classroom-and-lab course covering zone classification, Ex equipment and installation methods, with a written exam and practical inspection task.",
    ],
    correctAnswer: 3,
    explanation:
      "CompEx is a substantive 5-day investment at an accredited centre, covering ATEX/UKEX directives, hazardous-area zone classification (zones 0/1/2 for gas, 20/21/22 for dust), Ex equipment marking and selection, installation methods (cable glanding, conduit, sealing) and inspection regimes (visual / close / detailed). Cost typically £1,000-1,500 plus travel. The day-rate uplift on hazardous-area work pays it back quickly. Many petrochemical and offshore contractors fund staff CompEx as part of the recruitment package. Re-validation is typically required every 3-5 years to stay current with standards updates (BS 60079 series).",
  },
  {
    id: 8,
    question: "Can a domestic electrician realistically move into specialist work?",
    options: [
      "Yes — most specialisms welcome experienced electricians from any background. The path requires investment in specialist training (BAFE, CompEx, NSI/SSAIB, BICSI) and sometimes a step-down in seniority while building specialist competence. Many career-direction electricians specialise in their 5-15 year window post-AM2 to escape the price-pressure of generic domestic work and access higher-value markets.",
      "No — specialist work is closed to anyone who started in domestic, because the specialisms recruit only from a separate offshore/rail apprenticeship stream that runs in parallel to the standard 2365 route.",
      "Only by re-doing AM2 — each specialism requires the electrician to sit a completely new apprenticeship from scratch, so moving across means starting again as a first-year apprentice.",
      "No — a domestic electrician cannot transfer any existing competence, so the specialisms treat them as untrained and require a full Level 3 NVQ in the specialist trade before any work is permitted.",
    ],
    correctAnswer: 0,
    explanation:
      "Specialisation is one of the most reliable strategies for moving above the standard electrician day-rate market. Each specialism has its own training pathway and certification, but core electrical competence transfers across. Plan deliberately — pick a specialism that matches your interests and your geography (offshore needs you near coast/airport; rail needs you near major routes; healthcare needs you near hospitals).",
  },
];

const faqs = [
  {
    question: "Which specialism pays the most?",
    answer:
      "Offshore (oil and gas, offshore wind) and CompEx-required hazardous-area work typically pay the highest day rates. Healthcare-estate work pays less per day but offers stable permanent employment with strong pension benefits. Rail (PTS-required) pays well for project work. Fire alarm and security pay above standard install rates and offer steady commercial work. Choose based on lifestyle as much as pay.",
  },
  {
    question: "Do I need to commit to one specialism only?",
    answer:
      "No — many electricians hold multiple specialist endorsements (e.g. PV + EV, or BAFE + NSI). Each specialism is a distinct training and certification investment but they often complement rather than compete. A firm with PV, EV charging and battery storage capability has cross-selling opportunities; an individual electrician with multiple endorsements has wider job options.",
  },
  {
    question: "What's the BAFE SP203-1 process?",
    answer:
      "Firm applies to BAFE for SP203-1 registration. BAFE auditor visits to assess competence, QMS, sample fire alarm install, insurance and qualifications. Annual reaccreditation visits thereafter. Cost typically £1,500-3,000/year for the firm. Individual technician competence evidenced through fire-alarm-specific training (FIA — Fire Industry Association — runs accredited courses) plus experience.",
  },
  {
    question: "How does specialism affect ECS card?",
    answer:
      "Most specialist competences earn ECS endorsements — PV, EV, Hazardous Areas (CompEx), Fire Detection (BAFE-aligned), Solar Thermal. Endorsements appear as lines on the card and are searchable on the public ECS register. Main contractors increasingly check specialist endorsements for specialist work — endorsement-required jobs are not open to non-endorsed electricians.",
  },
  {
    question: "What's HUET / BOSIET for offshore work?",
    answer:
      "HUET (Helicopter Underwater Escape Training) — survival training for helicopter ditching, mandatory for offshore helicopter transit. BOSIET (Basic Offshore Safety Induction and Emergency Training) — broader offshore safety, includes sea survival, firefighting, first aid. Both required for offshore platform access. Combined cost typically £800-1,500 for initial certification; refreshers every 3-4 years.",
  },
  {
    question: "Is there any specialism that doesn't need extra qualifications?",
    answer:
      "Most specialisms require some additional certification because clients/insurers/main contractors use the certification as evidence of competence. The exception is sub-specialisms that develop within a firm by experience — e.g. an electrician who becomes the firm's go-to person for kitchen rewires or for landlord rental property EICRs. Internal specialism is real but doesn't carry external credentialing.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Subsection 4"
            title="Specialised routes"
            description="Control & instrumentation, marine & offshore, rail (PTS), fire alarm (BAFE SP203), CCTV/security (NSI/SSAIB), data cabling — the specialist routes that pay above standard rates."
            tone="emerald"
          />

          <TLDR
            points={[
              "Specialist routes pay above standard installation rates because they require specific competence and certification — barrier to entry creates margin.",
              "Hazardous areas (CompEx) — petrochemical, offshore, fuel storage. £1,000-1,500 training; day rates 50-100% above standard.",
              "Fire alarm (BAFE SP203-1) — insurer-driven commercial work. Firm registration; FIA training for individuals.",
              "Rail (Network Rail PTS) — high day rates (£350-500+); rotational/night shifts; 2-yearly PTS revalidation.",
              "Healthcare estate, marine, structured cabling, security/CCTV (NSI/SSAIB) all offer stable specialist routes with structured progression.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.7 — explain opportunities for progression within building services engineering (with layered AC 2.1 specific requirements and AC 2.2 competent person schemes).",
              "Identify the main UK electrical specialisms — control & instrumentation, marine, rail, fire alarm, CCTV/security, structured cabling, hazardous areas, healthcare estate.",
              "State the typical certification and training requirements for each specialism.",
              "Identify the link between specialism, ECS endorsements and day-rate uplift.",
              "Identify lifestyle factors (rotational shifts, travel, lifestyle commitments) attached to each specialism.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The specialism map</ContentEyebrow>

          <ConceptBlock
            title="Why specialism pays — the barrier-to-entry margin"
            plainEnglish="Specialist electrical work pays above standard installation rates because the certification and training requirements limit the supply of qualified electricians. Fewer competing installers = higher prices. Each specialism has its own certification body, its own training providers, and its own market — but the underlying electrical competence transfers from standard installation work."
            onSite="The specialist day-rate premium is real but the path to access it requires investment. Specialist training typically £500-1,500 per certification; specialist firm registration £1,500-3,000/year. Payback period varies — high-volume specialisms (BAFE fire alarm) pay back quickly; low-volume specialisms (offshore) require commitment to the lifestyle to make it work."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  High day-rate specialisms
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Offshore (oil &amp; gas, wind), CompEx hazardous areas, rail PTS-required.
                  Day rates &pound;400-800+. Lifestyle demanding.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Steady commercial specialisms
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Fire alarm BAFE, security NSI/SSAIB, structured cabling BICSI. Day rates
                  &pound;250-400. Lifestyle stable.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Process and technical
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  C&amp;I (control &amp; instrumentation), healthcare estate, marine. Often
                  permanent employment with strong pension; pay above standard install.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Renewables (Sub 2.2)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  PV, heat pumps, EV charging, battery storage &mdash; covered in Sub 2.2.
                  Grant-driven UK demand under BUS, SEG, ECO4.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The headline specialisms</ContentEyebrow>

          <ConceptBlock
            title="Hazardous areas (CompEx) — petrochemical, offshore, fuel storage"
            plainEnglish="Hazardous-area electrical work covers any environment where flammable gases or combustible dust could create explosive atmospheres — petrochemical plants, oil refineries, offshore platforms, fuel storage depots, paint shops, distilleries, certain food-processing sites. Equipment must be Ex-rated; installation methods must maintain Ex protection; inspection regimes are prescribed by BS 60079 standards."
            onSite="CompEx (Competency in Explosive Atmospheres) is the recognised UK competence scheme. CompEx Ex01-04 covers gas-protected installations; Ex05-06 covers dust-protected. 5-day course at accredited centres typically £1,000-1,500. Day rates 50-100% above standard. Common employers: petrochemical contractors, oil and gas service companies, offshore wind, defence."
          >
            <p>
              CompEx course content highlights:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ATEX / UKEX directives and hazardous-area zone classification.</li>
              <li>Ex equipment marking and selection (Ex e, Ex d, Ex i, Ex n).</li>
              <li>BS 60079 series standards.</li>
              <li>Cable glanding to maintain Ex protection.</li>
              <li>Conduit, sealing and barrier installation.</li>
              <li>Visual / close / detailed inspection regimes.</li>
              <li>Documentation and Ex registers.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Fire alarm (BAFE SP203-1) — commercial and insurance-driven"
            plainEnglish="Fire detection and alarm (FDA) installation is governed by BS 5839-1 (commercial) and BS 5839-6 (domestic). BAFE (British Approvals for Fire Equipment) operates the SP203-1 third-party certification scheme for FDA installer firms. Insurance-driven commercial fire alarm work increasingly requires BAFE registration as evidence of competence under the Regulatory Reform (Fire Safety) Order 2005."
            onSite="Path: existing electrical competence + FIA (Fire Industry Association) accredited fire alarm training + firm BAFE SP203-1 registration. Individual technicians earn ECS Fire Detection endorsement. BAFE registration cost typically £1,500-3,000/year for the firm. Commercial fire alarm work is steady and pays above standard install rates because BAFE-registered firms have limited competition."
          >
            <p>
              Typical fire alarm installer pathway:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>JIB Approved Electrician (post-AM2 + 2391-52).</li>
              <li>FIA fire alarm installation modules (typically 5-day course series).</li>
              <li>Specific manufacturer training (Apollo, Hochiki, Advanced, Kentec).</li>
              <li>BS 5839-1 commercial fire alarm design and install knowledge.</li>
              <li>Firm registration with BAFE SP203-1.</li>
              <li>ECS Fire Detection endorsement applied for.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Rail (Network Rail PTS) — signalling, OLE, station electrical"
            plainEnglish="Rail electrical work covers signalling installation and maintenance, OLE (Overhead Line Equipment) for electrified routes, station electrical (lighting, public-address, customer-information), and depot electrical for rolling-stock maintenance. All trackside or near-track work requires Network Rail Personal Track Safety (PTS) — the safety competence card that authorises trackside access."
            onSite="Path: existing electrical competence + PTS course (2 days, includes medical fitness check) + role-specific training (signalling, OLE) + Network Rail competence cards specific to discipline. Day rates strong (£350-500+). Lifestyle commitment: significant night shifts (when track is closed), weekend possessions, travel to remote rail sites. Common employers: Network Rail directly, major rail contractors (Balfour Beatty Rail, Siemens Mobility, Alstom)."
          >
            <p>
              Rail electrical specialism typical entry:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>JIB Electrician or Approved Electrician.</li>
              <li>PTS (Personal Track Safety) course + medical.</li>
              <li>Network Rail Sentinel card with relevant competences.</li>
              <li>Discipline-specific training (signalling apprenticeship, OLE training).</li>
              <li>Often CompEx (some rail depots are hazardous areas).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Other specialist routes</ContentEyebrow>

          <ConceptBlock
            title="Security, CCTV, data cabling, healthcare estate"
            plainEnglish="Several other specialisms offer steady employment and decent day rates without the demanding lifestyle of offshore or rail. Security and CCTV work needs NSI Gold or SSAIB registration for police-response systems. Structured cabling (data) needs BICSI training and high-end termination skills. Healthcare estate offers stable NHS or private-hospital employment with strong pension benefits."
            onSite="These specialisms are particularly suitable for electricians wanting predictable hours and family-friendly schedules. Pay is above standard install rates but below offshore/CompEx peaks. Career progression is structured (NHS Agenda for Change, large security contractor career ladders). Often a sensible mid-career destination after the high-intensity install years."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Security and CCTV (NSI/SSAIB)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Intruder alarms, CCTV, access control. NSI Gold or SSAIB registration
                  for police-response systems. Steady commercial and high-net-worth domestic
                  market.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Structured cabling (BICSI)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Cat 6/Cat 6A copper, fibre splicing, patch panels. BICSI Installer 1/2 and
                  Technician are recognised levels. Strong commercial fit-out market.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Healthcare estate (HTM)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  NHS or private-hospital electrical maintenance. HTM 06-01/06-02 standards.
                  NHS Agenda for Change Band 5-7 (&pound;28-45k). Stable hours plus rota
                  for on-call.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Control &amp; instrumentation (C&amp;I)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  PLC programming, SCADA, instrumentation calibration. Process industries
                  (food, pharma, water). Often Approved + HNC + manufacturer-specific
                  training (Siemens, Rockwell).
                </p>
              </div>
            </div>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Order places duties on the Responsible Person (typically the building
                  owner or employer) to:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Carry out and maintain a fire risk assessment.
                  </li>
                  <li>
                    Identify the general fire precautions necessary to safeguard the safety
                    of relevant persons.
                  </li>
                  <li>
                    Ensure fire detection and alarm systems are appropriate, properly
                    installed, maintained and tested.
                  </li>
                  <li>
                    Use competent persons for fire safety work.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                The Order is the regulatory anchor for the BAFE SP203-1 scheme&apos;s
                commercial value. Responsible Persons in non-domestic premises increasingly
                use BAFE registration as the practical evidence that they used a
                &quot;competent person&quot; for fire alarm installation and maintenance. As
                an electrician moving into fire alarm work the Order is the legal context
                that makes BAFE registration commercially valuable.
              </>
            }
            cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Equipment and Protective Systems Intended for Use in Potentially Explosive Atmospheres Regulations 2016 (UKEX) (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  UKEX (and the EU ATEX equivalent) sets the regulatory framework for
                  equipment placed on the market for use in potentially explosive
                  atmospheres:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Equipment categorisation by intended use (mining, surface industry).
                  </li>
                  <li>
                    Equipment Group I (mining) and Group II (other industries).
                  </li>
                  <li>
                    Equipment marked with the Ex hexagon and category, manufacturer
                    declaration of conformity.
                  </li>
                  <li>
                    Installation must maintain the Ex protection across the equipment
                    boundary &mdash; cable glanding, sealing, barrier maintenance.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                UKEX/ATEX is the regulatory context that makes CompEx-trained competence
                commercially valuable. Hazardous-area sites cannot use uncertified
                installers because the Ex protection must be maintained through the install.
                CompEx is the route to the technical competence that lets you legally and
                safely work on Ex-rated equipment.
              </>
            }
            cite="Source: Equipment and Protective Systems Intended for Use in Potentially Explosive Atmospheres Regulations 2016 (SI 2016/1107) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Network Rail Rule Book (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Network Rail Rule Book sets the operating and safety rules for trackside
                  work on the UK rail network. Headline rules include:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Personal Track Safety (PTS) competence required for any work on or near
                    operational track.
                  </li>
                  <li>
                    Track access must be planned, authorised and protected (typically via a
                    PICOP/COSS — Person in Charge of Possession / Controller of Site Safety).
                  </li>
                  <li>
                    Sighting and warning arrangements when working on open lines.
                  </li>
                  <li>
                    Specific safe-working rules for OLE (Overhead Line Equipment),
                    signalling and station environments.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                The Rule Book governs every aspect of trackside work. PTS is the entry
                competence that lets you understand and follow the Rule Book. Without PTS
                you simply cannot be admitted to operational rail sites. For an electrician
                moving into rail work PTS is the unavoidable first step &mdash; followed by
                discipline-specific training (signalling, OLE).
              </>
            }
            cite="Source: Network Rail Rule Book — paraphrased from publicly-available Network Rail safety guidance at networkrail.co.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Investing in offshore certifications then discovering you can't do the lifestyle"
            whatHappens={
              <>
                Electrician spends &pound;3,000+ on CompEx, HUET, BOSIET certifications
                aiming for offshore work. Lands first offshore rotation. Discovers two weeks
                away from family is harder than imagined; the helicopter ride is genuinely
                unpleasant; the platform schedule is exhausting. After three rotations
                decides offshore isn&apos;t for them. Specialist training cost is sunk;
                returns to onshore work having gained no day-rate uplift.
              </>
            }
            doInstead={
              <>
                Before investing in offshore-specific certifications, do a single offshore
                day visit (sometimes available through main contractors as taster days) or
                talk to current offshore electricians about the lifestyle reality. Helicopter
                anxiety, time-away-from-family, platform routine all matter. CompEx itself
                transfers to onshore petrochemical work so isn&apos;t wasted; HUET / BOSIET
                are offshore-specific. Be honest about the lifestyle before investing.
              </>
            }
          />

          <Scenario
            title="2 years post-AM2 — fire alarm specialism or PV specialism?"
            situation={
              <>
                You&apos;re 2 years post-AM2, JIB Electrician on standard installation work.
                You want to specialise to escape generic price-pressured domestic install
                work. Two options on the table: (a) fire alarm via BAFE SP203-1 + FIA
                training (your firm is considering BAFE registration and would back you), or
                (b) PV via AM2S and self-funded MCS PV (you&apos;d need to leave current
                firm or set up sole trader). Which makes more sense?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; assess employer alignment</strong>. Fire alarm has
                strong employer alignment &mdash; firm wants BAFE, will fund training,
                you&apos;ll be doing the work in your existing role. PV requires you to
                change firm or set up alone &mdash; bigger career disruption.
                <br /><br />
                <strong>Step 2 &mdash; assess market</strong>. Fire alarm is steady
                commercial work with insurance-driven demand. PV is grant-driven domestic
                work with strong but more cyclical demand. Both are sustainable; different
                demand profiles.
                <br /><br />
                <strong>Step 3 &mdash; assess lifestyle</strong>. Fire alarm work is
                typically business-hours commercial premises. PV install work is rooftop work
                (working at height, weather-dependent, summer-heavy). Different physical
                demands.
                <br /><br />
                <strong>Step 4 &mdash; assess investment vs payback</strong>. Fire alarm:
                FIA training cost largely employer-funded; faster payback through firm work.
                PV: self-funded AM2S + MCS firm setup &pound;3,000+; slower payback but
                self-employment optionality.
                <br /><br />
                <strong>Step 5 &mdash; pick deliberately</strong>. Both are legitimate
                paths. Fire alarm with employer support is the lower-risk, faster-payback
                option. PV is the higher-risk, higher-eventual-autonomy option. Pick
                deliberately based on your career direction (employed senior tech vs
                self-employed business owner) rather than tossing a coin.
              </>
            }
            whyItMatters={
              <>
                Specialisation is the single most reliable strategy for moving above the
                standard installation electrician rate. But specialisations are not
                interchangeable &mdash; each has its own market dynamics, lifestyle profile
                and career arc. Pick one that matches your circumstances. Doing both
                eventually is fine; doing neither is the real risk.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Niche specialisms — pay, lifestyle, qualification path</ContentEyebrow>

          <ConceptBlock
            title="Hazardous Areas (CompEx) — petrochem, pharma, offshore"
            plainEnglish="CompEx (Competence in Explosive Atmospheres) is the UK industry-standard certification for working on electrical installations in hazardous (potentially explosive) atmospheres — petrochemical refineries, oil and gas terminals, pharmaceutical clean rooms, distilleries, paint plants. The CompEx Ex01-Ex04 stack covers gas, vapour and dust atmospheres for installation and inspection. Cost ~£1,800-2,400 for the full Ex01-04 plus 5-yearly refresher (~£800). Day rates for CompEx-qualified electricians on petrochem sites typically £350-450/day inland, £450-700+ offshore."
            onSite="CompEx is one of the highest-paying single specialisms in UK electrical work. The trade-off is the work environment — strict permit-to-work systems, bonded clothing, no naked metal, exhaustive risk assessment for every screw turned. Petrochem maintenance shutdowns (planned outages every 2-4 years on major refineries) are typically very high-rate intensive periods (£600+/day for 2-4 weeks straight). Offshore CompEx work adds offshore survival training (BOSIET ~£1,200, 4-yearly refresher) and lifestyle disruption (rotational 2-on-3-off or similar). Suits people who want premium pay and don't mind structure."
          >
            <p>
              CompEx qualification stack and use cases:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ex01-04 foundation</strong> &mdash; gas/vapour atmospheres install &amp; inspection (~&pound;1,800&ndash;2,400).
              </li>
              <li>
                <strong>Ex05-06</strong> &mdash; dust atmospheres add-on (food, pharma, paint).
              </li>
              <li>
                <strong>Ex07-08</strong> &mdash; for designers and CompEx auditors (advanced).
              </li>
              <li>
                <strong>Refresher</strong> &mdash; 5-yearly to maintain currency.
              </li>
              <li>
                <strong>BOSIET (offshore add-on)</strong> &mdash; ~&pound;1,200, 4-yearly.
              </li>
              <li>
                <strong>Day rates</strong> &mdash; &pound;350&ndash;450 inland, &pound;450&ndash;700+ offshore.
              </li>
              <li>
                <strong>Sectors</strong> &mdash; petrochem, oil &amp; gas, pharma, paint, distilleries, mines.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Rail PTS — UK rail and Network Rail projects"
            plainEnglish="Personal Track Safety (PTS) is the Network Rail-mandated competence for working on or near the railway. The PTS course (1-day) plus medical (D&A test, eyesight, hearing) plus competency assessment is required for every track-side worker. AC/DC track type endorsements are added for OLE (overhead line) and 3rd-rail systems. Rail electrical work — signalling, OLE, station systems, traction — is a substantial UK market with major projects (Crossrail, HS2, station upgrades, electrification programmes). Day rates £320-450 standard, £500-750 on night-shift possessions."
            onSite="UK rail electrical is dominated by a relatively small number of accredited contractors (Balfour Beatty Rail, SPL Powerlines, Babcock, Jacobs, Network Rail in-house). The work is physically demanding (mostly night shifts during track possession windows), heavy on safety procedures, and requires sustained PTS currency. Suits people who don't mind night work and want guaranteed-rate work on long-running national infrastructure programmes. The skills are fairly transferable — a qualified electrician with PTS+OLE can move between major rail projects (HS2, Trans-Pennine, Midland Main Line electrification) over a 10-15 year horizon."
          >
            <p>
              Rail electrical work qualification stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PTS (Personal Track Safety)</strong> &mdash; Network Rail mandatory, 1-day course + medical.
              </li>
              <li>
                <strong>D&amp;A medical</strong> &mdash; drug &amp; alcohol screening at point of qualification.
              </li>
              <li>
                <strong>OLE (Overhead Line)</strong> &mdash; AC traction add-on, specialist HV training.
              </li>
              <li>
                <strong>3rd Rail</strong> &mdash; DC traction add-on (Southern, Merseyrail, etc.).
              </li>
              <li>
                <strong>IRSE Licence</strong> &mdash; signalling competence, separate framework.
              </li>
              <li>
                <strong>Day rates</strong> &mdash; &pound;320&ndash;450 standard, &pound;500&ndash;750+ on night possessions.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Fire detection (BAFE / FIA) — BS 5839 commissioning specialism"
            plainEnglish="Fire detection and alarm work to BS 5839 is its own specialism — design, install, commissioning and maintenance of fire alarm systems for commercial, residential and industrial premises. The route runs through FIA (Fire Industry Association) Unit qualifications (Unit 1-5 stack covering foundation through advanced commissioning) plus BAFE SP203-1 third-party scheme certification at the firm level. BAFE registration is increasingly required by insurers as evidence of competent installation. Day rates £280-400 install, £350-500 commissioning, £400-650 senior service engineer."
            onSite="Fire detection work is steady demand because every commercial premises needs a current fire alarm system maintained to BS 5839 — sub-contracted maintenance contracts (typically 6-monthly visits) provide recurring revenue. The work is intellectually demanding (system design, panel programming, false-alarm diagnosis) but lower-physical than install work. Many electricians move into fire detection as a second-career specialism in their 40s-50s when install work becomes physically harder. The qualification stack is modular — you can start with FIA Unit 1 and add as commercial demand grows."
          >
            <p>
              Fire detection qualification path:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>FIA Unit 1</strong> &mdash; Foundation Fire Alarm Designer, Installer, Commissioner, Maintainer.
              </li>
              <li>
                <strong>FIA Unit 2</strong> &mdash; Designer of Fire Alarm Systems.
              </li>
              <li>
                <strong>FIA Unit 3</strong> &mdash; Installer of Fire Alarm Systems.
              </li>
              <li>
                <strong>FIA Unit 4</strong> &mdash; Commissioner of Fire Alarm Systems.
              </li>
              <li>
                <strong>FIA Unit 5</strong> &mdash; Maintainer of Fire Alarm Systems.
              </li>
              <li>
                <strong>BAFE SP203-1</strong> &mdash; firm-level scheme registration (third-party certified).
              </li>
              <li>
                <strong>Day rates</strong> &mdash; &pound;280&ndash;500 install/commissioning, &pound;400&ndash;650 senior service.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Data cabling and structured networks — BICSI and vendor routes"
            plainEnglish="Structured data cabling (Cat6, Cat6A, fibre) for IT networks is a substantial specialism — every commercial fit-out needs structured cabling, and every refurbishment typically replaces aged cabling. Qualification routes run through BICSI Installer 1-3 (international standard, recognised globally) and vendor-specific certifications (CommScope SP, Excel Cabling, Panduit Certified Installer). MoD and government work often requires additional security clearance plus specific encryption-grade cabling competence. Day rates £200-280 install, £280-400 commissioning, £350-500 fibre splicing specialist."
            onSite="Data cabling sits adjacent to electrical install but is typically a separate sub-package on commercial projects. Many electrical sub-contractors carry a small data cabling team alongside their main electrical workforce. Adding BICSI Installer 1 to your CV ~£1,000 cost) opens a parallel work stream and is genuinely useful when electrical work is quiet. Fibre splicing is a higher-margin specialism within the cabling world — the kit is expensive (fusion splicer ~£3-5k) but the day rates command premium. Suits electricians who like precision detail work."
          >
            <p>
              Data cabling certification ladder:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BICSI Installer 1 (INST1)</strong> &mdash; foundation copper installer.
              </li>
              <li>
                <strong>BICSI Installer 2 (INST2)</strong> &mdash; advanced copper + foundation fibre.
              </li>
              <li>
                <strong>BICSI Technician (TECH)</strong> &mdash; commissioning and certification.
              </li>
              <li>
                <strong>BICSI RCDD</strong> &mdash; design qualification (Registered Communications Distribution Designer).
              </li>
              <li>
                <strong>Vendor certs</strong> &mdash; CommScope, Excel, Panduit, Siemon, R&amp;M.
              </li>
              <li>
                <strong>Fibre splicing</strong> &mdash; specialist day rate, requires fusion splicer.
              </li>
              <li>
                <strong>Day rates</strong> &mdash; &pound;200&ndash;500 depending on level and specialism.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BMS and controls — Trend, Tridium, Siemens, Schneider routes"
            plainEnglish="Building Management Systems (BMS) — the central control systems for HVAC, lighting, energy, security in commercial buildings — are one of the fastest-growing specialisms in UK building services. Vendor-specific certifications (Trend Controls Level 2/3, Tridium Niagara N4, Siemens Desigo CC, Schneider EcoStruxure) are the entry-points. Course costs typically £1,200-2,400 per vendor stack. BMS commissioning engineer day rates £320-450 standard, £450-700+ on data centre and complex commercial work. Senior controls specialists routinely earn £65-95k as employed engineers."
            onSite="BMS is not 'just electrical' — it sits at the intersection of electrical (the cabling and field devices), mechanical (HVAC plant) and IT (the head-end software). The career suits electricians who enjoy the systems-thinking and software side. Demand is structural — every modern commercial building has a BMS, every refurbishment upgrades it, every smart-building initiative adds more. Vendor lock-in is real (Trend-trained engineers don't typically work on Tridium without extra training) so picking the dominant vendor in your local market matters. Trend has historic UK strength; Tridium is the platform-agnostic open standard increasingly preferred on new builds."
          >
            <p>
              BMS career qualification path:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Trend Controls L2/L3</strong> &mdash; UK-strong vendor, IQ4 platform.
              </li>
              <li>
                <strong>Tridium Niagara N4</strong> &mdash; open-platform, increasingly dominant on new builds.
              </li>
              <li>
                <strong>Siemens Desigo CC</strong> &mdash; large commercial, high-end systems.
              </li>
              <li>
                <strong>Schneider EcoStruxure</strong> &mdash; integrated power + controls.
              </li>
              <li>
                <strong>BACnet / Modbus</strong> &mdash; protocol fundamentals, vendor-independent.
              </li>
              <li>
                <strong>Day rates</strong> &mdash; &pound;320&ndash;700+ depending on vendor and project complexity.
              </li>
              <li>
                <strong>Employed salary</strong> &mdash; &pound;38&ndash;58k mid-level, &pound;58&ndash;95k senior controls.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Specialisation is the most reliable strategy for moving above standard installation rates; barrier-to-entry creates margin.",
              "Hazardous areas (CompEx Ex01-04 gas, Ex05-06 dust) — petrochemical, offshore, fuel storage. £1,000-1,500 training; day rates 50-100% above standard.",
              "Fire alarm (BAFE SP203-1) — insurer/RRFSO-driven commercial work. FIA training; firm BAFE registration £1,500-3,000/year. ECS Fire Detection endorsement.",
              "Rail (Network Rail PTS) — high day rates (£350-500+). PTS course + medical, 2-yearly revalidation. Signalling, OLE, station electrical.",
              "Security/CCTV (NSI Gold or SSAIB) — police-response systems require certified installer. Steady commercial market.",
              "Structured cabling (BICSI Installer 1/2/Technician) — Cat 6/Cat 6A and fibre. Strong commercial fit-out demand.",
              "Healthcare estate (NHS HTM standards) — stable employment, NHS Agenda for Change Band 5-7 (£28-45k), strong pension.",
              "Control & instrumentation — process industries; Approved + HNC + PLC manufacturer training. Pay above standard install.",
              "Offshore needs HUET + BOSIET on top of CompEx; lifestyle commitment is real (rotational schedule, helicopter, weeks away).",
            ]}
          />

          <Quiz title="Specialised routes — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 Design route
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Teaching/assessing route
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
