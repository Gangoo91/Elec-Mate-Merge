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
} from '@/components/study-centre/learning';
import { CustomerEducationHandover } from '@/components/study-centre/diagrams/renewableM12';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm12s7-handover-meeting-purpose',
    question:
      'What is the purpose of the handover meeting at install completion?',
    options: [
      'Sign paperwork only',
      'The handover meeting is the customer-facing close of the install: (1) demonstrate the system working + key controls; (2) walk through portal access + monitoring + alerts; (3) explain emergency stop + fault response + contacts; (4) cover maintenance schedule + warranty terms + EICR-equivalent cycle; (5) hand over the MCS handover pack (paper + digital); (6) sign-off acknowledgement. The 60-90 min investment in handover meeting prevents most customer confusion + support calls over the install life',
      'Random',
      'Optional',
    ],
    correctIndex: 1,
    explanation:
      'Handover meeting purpose: (1) System demonstration — show customer the LCT system working in their property; key controls + operating modes; expected behaviour. (2) Portal walkthrough — log customer into manufacturer monitoring portal on their device (web + mobile app); show today\'s yield / SoC / energy flow / alerts; demonstrate where to find specific information. (3) Emergency procedures — emergency stop location + procedure; categorical \"do not open the enclosure\" message; fault → call installer / manufacturer; emergency contacts. (4) Maintenance + warranty — annual customer self-check + 5-10 yr EICR-equivalent + manufacturer service intervals + warranty terms + warranty registration confirmation. (5) MCS handover pack — physical + digital handover; explain structure + key documents; signpost where to find which information. (6) Sign-off — customer acknowledges receipt + understanding; supports installer audit + warranty + dispute resolution. (7) UK 2025-26 typical handover meeting duration 60-90 min depending on system complexity; multi-source LCT may be 2 hours. (8) Investment pays back: well-handed-over customers have fewer support calls + better warranty + insurance + EICR-equivalent compliance over the install life. (9) Customer engagement quality predicts customer relationship quality.',
  },
  {
    id: 'm12s7-customer-fault-response',
    question:
      'What should the customer be taught about fault response?',
    options: [
      'Open the unit + check',
      'Categorical do-not-open + sequence: (1) note the alarm / fault message + time; (2) note any unusual sounds / smells / smoke; (3) for emergency (smoke, fire, smell of burning) — operate emergency stop + call 999 + leave property; (4) for non-emergency — call the installer first (24-hr emergency line if provided); manufacturer second; (5) never open the enclosure (lithium fire risk + high DC voltage); (6) never modify the install. The customer\'s role is observation + reporting; not diagnosis or repair. Cert evidence bundle records the customer education sign-off',
      'Random',
      'DIY repair',
    ],
    correctIndex: 1,
    explanation:
      'Customer fault response training: (1) Observation — note the alarm / fault message displayed by the system (inverter LCD, charger LED, portal alert); note the time + duration + any pattern; note any unusual sounds (clicking, hum, fan continuous running) / smells (electrical, burning, sweet) / visible smoke. (2) Emergency procedures — for smoke, fire, smell of burning, electrical buzzing: operate emergency stop (location demonstrated at handover); evacuate property; call 999. Do not attempt to fight a lithium battery fire (regular extinguishers ineffective + can make it worse); do not open the enclosure. (3) Non-emergency procedures — note the fault; check portal for additional info; call the installer first (most installers offer a service contract or emergency line); manufacturer support second. (4) Categorical no-DIY — never open the enclosure (lithium battery + high DC voltage hazards); never modify the install; never bypass safety devices. (5) Customer\'s role — observation + reporting + early engagement; not diagnosis or repair. (6) Contacts — installer + manufacturer + emergency services + DNO (for grid-related issues); ideally on a single page in the handover pack + visible in the property. (7) Cert evidence bundle records the customer education + sign-off; supports the customer + protects the installer. (8) Annual touchpoint refreshes customer awareness.',
  },
  {
    id: 'm12s7-monitoring-expectation',
    question:
      'What ongoing monitoring expectations should the customer be taught?',
    options: [
      'No monitoring',
      'Ongoing monitoring expectations: (1) BMS / inverter continuously self-monitors + alerts; customer notified via portal app + email. (2) Customer self-check monthly or weekly — quick portal review (yield today + SoC + any alerts) takes 2 minutes. (3) Annual installer touchpoint or manufacturer service visit — paid service typically £50-150/yr; tracks SoH + firmware + condition. (4) 5-10 yr professional EICR-equivalent per Reg 652.1. (5) Warranty review at half-life (5 yr) + approaching warranty floor. The continuous + self-check + annual + periodic = layered monitoring approach',
      'Random',
      'Only annual',
    ],
    correctIndex: 1,
    explanation:
      'Monitoring expectations + layered approach: (1) Continuous BMS / inverter self-monitoring — runs in background; alerts portal + email on fault state; customer doesn\'t need to do anything for this layer. (2) Customer self-check — monthly or weekly portal review (2-5 min): yield vs expected; SoC pattern normal; any alerts cleared; portal accessible. (3) Annual touchpoint — installer + manufacturer typically offer paid annual review (£50-150/yr); tracks SoH trend, firmware updates, condition baseline; relationship maintained. (4) 5-10 yr professional EICR-equivalent per Reg 652.1 — comprehensive periodic; cert evidence bundle updated. (5) Warranty events — at 5 yr (half-life) + approaching warranty floor (~70-80% SoH at 10 yr for BESS); manufacturer engagement. (6) Customer education emphasises: continuous + self-check + annual + periodic = layered approach. Each layer catches different issues. (7) Portal app on phone is the typical customer-facing interface; manufacturer + installer have richer access via professional portals. (8) Realistic expectations — system is mostly hands-off; ~2-5 min/month customer engagement is sufficient for typical install; deeper involvement only on alerts. (9) Failure modes prevented — the layered monitoring catches: silent failures (PV dead inverter), degradation (BESS SoH drift), environmental changes (heat exposure), warranty windows.',
  },
  {
    id: 'm12s7-annual-touchpoint-value',
    question:
      'What is the value of an annual touchpoint between installer + customer?',
    options: [
      'No value',
      'Annual touchpoint value: (1) relationship maintenance — customer knows who to call; reduces churn at the EICR-equivalent + warranty events; (2) early issue detection — small issues (firmware lag, soiling, minor degradation) caught at 1 yr cycle vs 5-10 yr cycle; (3) firmware updates applied — security + capability + bug fixes; (4) customer education refresh — operating tips, new features, fault response refresh; (5) commercial — paid service relationship (£50-150/yr typical); installer revenue + customer service; (6) warranty support — installer present to advocate when needed',
      'Random',
      'Only for installer',
    ],
    correctIndex: 1,
    explanation:
      'Annual touchpoint value layers: (1) Relationship maintenance — customer + installer relationship maintained vs going dormant for 5-10 yr until next EICR-equivalent. Customer knows who to call for any issue; reduces churn; supports both parties at warranty + EICR-equivalent events. (2) Early issue detection — annual cadence catches small issues before they become large: PV yield drift (soiling, shading change, minor module degradation); BESS SoH or cell-balance drift; EV charger OPDD event log; heat pump fault history. 1-yr cycle is more responsive than 5-10 yr EICR-equivalent. (3) Firmware updates — most BMS + inverter manufacturers release firmware updates several times per year; security + capability + bug-fix; annual visit ensures application. (4) Customer education refresh — operating tips (e.g. winter mode for heat pump; SEG tariff optimisation for PV + BESS); new features (manufacturer adds capabilities); fault response procedure refresh. (5) Commercial — paid service relationship typical £50-150/yr for residential; £500-2000+ for commercial; installer revenue + customer service quality. (6) Warranty support — when warranty issues arise, the installer who knows the system + has relationship with manufacturer is best positioned to advocate. (7) UK 2025-26 reality: many BESS + PV manufacturers offer scheduled monitoring as paid service; some installers offer comprehensive multi-source coverage. (8) Cert evidence bundle records annual touchpoints; supports comprehensive lifecycle picture.',
  },
];

const quizQuestions = [
  {
    question:
      'Customer handover meeting — how long should it be + what activities?',
    options: [
      '5 minutes paperwork',
      '60-90 min typical (2 hr for multi-source). Activities: (1) Walk through the install — show outdoor equipment + isolators + safety labels; (2) demo system operating — start charging, show yield / SoC, show emergency stop; (3) portal walkthrough — log customer in, show key views, set up alerts; (4) maintenance schedule + warranty terms + EICR-equivalent cycle; (5) fault response procedure + emergency contacts; (6) MCS handover pack physical + digital handover + structure walkthrough; (7) Q&A; (8) sign-off acknowledgement. Investment in this 60-90 min prevents most support calls + reinforces customer confidence',
      'Random',
      '15 minutes',
    ],
    correctAnswer: 1,
    explanation:
      'Handover meeting structure (60-90 min typical, 2 hr for multi-source): (1) Walk-through (15 min) — show customer the install in their property; outdoor equipment + isolators + safety labels + warning notices; cable routing; install location considerations (vent clearance, future access). (2) System demo (15-20 min) — start a charging cycle (BESS / EV); show PV yield in real-time; demonstrate emergency stop; show normal operating sounds + LEDs. (3) Portal walkthrough (15-20 min) — log customer into the manufacturer monitoring portal on their phone + computer; show today\'s view + weekly view + monthly view; demonstrate where to find specific information (alerts, history, settings). Set up notification alerts to customer\'s email + phone. (4) Maintenance + warranty (10 min) — annual customer self-check schedule; EICR-equivalent 5-10 yr cycle; manufacturer service intervals + scheduled monitoring options (paid service); warranty terms summary + warranty registration confirmation; what counts as warranty event. (5) Fault response (10 min) — observation procedure; emergency procedures + 999 call criteria; non-emergency installer-first call; categorical no-open / no-modify; emergency contacts visible. (6) MCS handover pack (5-10 min) — paper + digital handover; structure walkthrough (sizing, commissioning, EIC, warranty, customer guide); signpost where to find what. (7) Q&A (5-10 min) — invite customer questions; capture for follow-up. (8) Sign-off acknowledgement — customer signs to confirm receipt + understanding; cert evidence bundle records. (9) Follow-up email — sends summary, key contacts, portal login, support email; ensures customer has digital reference.',
  },
  {
    question:
      'Customer reports PV yield is "lower than last summer". What is the structured installer response?',
    options: [
      'Replace inverter',
      'Structured response: (1) acknowledge + thank for early engagement; (2) check portal data — look at yield over the period; compare to weather data (was last summer particularly sunny?); compare to similar nearby installs if available; (3) consider soiling (annual cleaning may be due); shading changes (new structure, tree growth); module degradation (typical ~0.5%/yr LFP); inverter performance (firmware up-to-date?); (4) propose action — visual inspection visit; thermal imaging if accessible; portal data deep-dive; manufacturer engagement if pattern indicates issue; (5) report back to customer with findings + recommended actions',
      'Random',
      'Ignore',
    ],
    correctAnswer: 1,
    explanation:
      'Structured response to customer yield concern: (1) Acknowledge + thank — customer engagement is valuable; reinforces relationship + catches issues early. (2) Portal data review (remote) — pull yield data over the period the customer references; compare to: (a) same period prior year; (b) modelled yield for the actual weather (cooler summers + cloudier produce lower yield naturally — weather data from Met Office or similar); (c) similar installs in the area if installer fleet data available. (3) Hypothesis generation — soiling (annual cleaning may be due for grime / bird droppings / pollen / leaf debris); shading changes (new shed, tree growth, new building); module degradation (typical 0.5-1%/yr; if yield dropped 8-10% in 1 yr that\'s outside normal); inverter performance (firmware bug or degradation; manufacturer alerts); cabling / connection degradation (DC connector ingress, junction box issues). (4) Visit + investigation — visual inspection of array (binoculars from ground or roof access where safe); thermal imaging where accessible; DC string IR re-test per Section 712 (mini-EICR-equivalent visit); module-level data extract where supported by inverter / optimisers. (5) Manufacturer engagement — if pattern indicates warranty event (premature degradation, module hot spots); engage manufacturer support. (6) Report back — customer-facing summary of findings + recommended actions + costs (if any); maintain customer confidence + relationship. (7) Cert evidence bundle update — record the customer touchpoint + investigation + outcome.',
  },
  {
    question:
      'Avoiding silent failures — what should the installer establish at handover for the customer?',
    options: [
      'Nothing',
      'Silent failure prevention: (1) portal alert configuration — push notification to customer phone on any fault state; email to customer + installer on critical; (2) monthly customer self-check habit — 2 min portal review (yield + SoC + alerts); (3) annual touchpoint — paid service or installer-initiated check-in; (4) manufacturer scheduled monitoring where available; (5) make the abnormal visible — what does "system not generating" look like vs "system not running due to fault"; (6) emergency contact + non-emergency contact clearly distinguished. Silent failures (dead inverter, BESS at 0% for months, charger failed) caught early via these layers',
      'Random',
      'Annual only',
    ],
    correctAnswer: 1,
    explanation:
      'Silent failure prevention strategy: (1) Portal alert configuration at handover — set up customer\'s phone for push notifications on any fault state; email to customer + copy to installer for critical alerts. Default manufacturer settings may not be optimal; customise for the customer. (2) Monthly customer self-check habit — establish at handover: 2 min portal review monthly (or weekly for keen customers) covers most silent failures. Quick visual scan: yield today (PV); SoC pattern (BESS); any active alerts. (3) Annual touchpoint — paid service or installer-initiated annual check-in; comprehensive review beyond what self-check catches. (4) Manufacturer scheduled monitoring — where manufacturer offers paid monitoring service, configure at install + customer can opt in. (5) Make abnormal visible — at handover educate customer on \"what does normal look like\" vs \"what does abnormal look like\": for example, normal PV yield curve mid-summer day vs zero generation due to dead inverter; normal BESS SoC pattern vs stuck at 0% or 100%. (6) Emergency contact + non-emergency contact — clearly distinguished + visible (sticker on equipment? handover pack page? customer\'s contacts list?); reduces friction at point of need. (7) Common silent failures avoided: dead inverter (PV stops generating; customer doesn\'t notice for months); BESS stuck at 0% (no self-consumption benefit; warranty implications); EV charger failure (next charge attempt unsuccessful — but if EV not used daily may be missed); heat pump in defrost loop (high power consumption but no useful heat).',
  },
  {
    question:
      'Multi-source customer education — how to avoid overwhelming the customer?',
    options: [
      'Same as single source',
      'Multi-source education approach: (1) integrated portal where possible — single app showing PV + BESS + EV + heat pump in one view; (2) layered detail — top-level dashboard for daily check; deeper drilldown when needed; (3) one-page summary card — key contacts, emergency stops, fault response sequence + portal login; (4) walk-through at handover focuses on integrated operation not technology-by-technology; (5) follow-up email with reference materials; (6) annual touchpoint covers comprehensive review without re-doing handover',
      'Random',
      'Skip education',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-source customer education: (1) Integrated portal — many manufacturer ecosystems offer integrated portals (e.g. Tesla app covers Powerwall + EV + solar; GivEnergy portal covers PV inverter + BESS; manufacturer-agnostic platforms like SolarEdge ONE emerging). Where integrated portal available, use it as the primary customer interface. (2) Layered detail — top-level dashboard shows the headline metrics for daily check (today\'s yield, SoC, heat pump running, EV charging); deeper drilldown for those who want it (per-module detail, per-cell voltage, hour-by-hour log). (3) One-page summary card — physical sticker / card / handover pack page with: key contacts (installer 24-hr emergency + non-emergency); emergency stops per source; fault response sequence; portal login. Reduces decision-making friction at point of need. (4) Handover walk-through focuses on integrated operation — \"this is your energy system\" not \"this is your PV, this is your BESS, this is your heat pump\". Customer doesn\'t need to think about technology boundaries; system thinks for them. (5) Follow-up email — within 24-48 hr of handover: summary, key contacts, portal logins, support FAQ link; provides written reference. (6) Annual touchpoint — comprehensive review without re-doing the entire handover; refresh on operating tips + new features + any updates. (7) Avoid technology jargon — use \"battery\" not \"BESS\"; use \"solar\" not \"PV\"; use \"heat pump\" not \"ASHP\"; use \"charger\" not \"EVSE\". Customer-friendly language maintains comprehension. (8) Reality 2025-26: customer engagement varies widely — some customers deeply engaged; others want minimal-interaction set-and-forget. Tailor the touchpoint depth.',
  },
  {
    question:
      'Operating guide content — what topics must the customer-facing guide cover?',
    options: [
      'No guide needed',
      'Operating guide must cover: (1) system overview — what each source does + how they interact; (2) operating modes + controls — normal operation + holiday mode + boost / max + manufacturer-specific features; (3) portal access + login + key views; (4) maintenance schedule — customer self-check + annual + EICR-equivalent; (5) warranty terms summary + manufacturer warranty contacts; (6) fault response — observation, emergency vs non-emergency, contacts; (7) emergency stop location + procedure per source; (8) categorical do-not-open + do-not-modify; (9) future considerations — additions, replacements, end-of-life; (10) Q&A / FAQ for common questions',
      'Random',
      'Specs only',
    ],
    correctAnswer: 1,
    explanation:
      'Operating guide essential content: (1) System overview — plain-English description of what each source does + how they interact (e.g. \"PV generates electricity during the day; BESS stores excess; heat pump uses electricity to heat the home; EV charger powers the car\"). (2) Operating modes + controls — normal day-to-day; holiday mode (reduce heating + manage cycling); boost / max settings; manufacturer-specific features (e.g. winter mode on heat pump; charge-from-grid override on BESS). (3) Portal access + login — written instructions for first-time portal login on phone + computer; what each view shows. (4) Maintenance schedule — customer self-check (monthly or weekly portal review); annual touchpoint (paid or installer-initiated); 5-10 yr EICR-equivalent. (5) Warranty terms — summary of manufacturer warranties per component (modules, inverter, BMS, heat pump); installer workmanship guarantee; what to do at warranty event. (6) Fault response — observation, emergency vs non-emergency, contacts (visible). (7) Emergency stop — location per source + procedure; demonstrated at handover; visible safety labels at the equipment. (8) Do-not-open + do-not-modify — categorical safety message; lithium battery fire risk; high DC voltage hazard; warranty void if modified. (9) Future considerations — additions (more PV, BESS, EV charger); replacements (inverter at 10-15 yr typical); end-of-life (BESS 15-20 yr, PV 25-30 yr); contacts to engage. (10) FAQ — common questions: how to handle holidays; how to optimise SEG export; what happens in a power cut; how to read the bill alongside the system. (11) Contacts page — clear visible list. (12) UK 2025-26 typical operating guide 12-20 pages; tablet + phone-friendly digital version.',
  },
  {
    question:
      'Property sale + LCT install — what handover information transfers to new owner?',
    options: [
      'Nothing',
      'Transfer to new owner: (1) MCS handover pack travels with property in conveyancing documents alongside EPC + planning; (2) warranty transferable per manufacturer terms (most are; some require notification); (3) BUS grant continues per scheme rules (typically tied to property + system, not original owner); (4) SEG tariff may need re-registration with new owner / new supplier; (5) installer service relationship — new owner may continue or change; (6) portal accounts may need reassignment. Cert evidence bundle remains with installer for audit + service continuity',
      'Random',
      'Only with sale',
    ],
    correctAnswer: 1,
    explanation:
      'Property sale + LCT handover: (1) MCS handover pack — physical + digital copy travels with property in the standard conveyancing pack alongside EPC + planning + warranties + property records. New owner takes possession at completion. (2) Manufacturer warranty — typically transferable to new owner subject to manufacturer terms; some require notification (sale to installer who notifies manufacturer); cert evidence bundle records the transfer. Warranty floor (e.g. 10 yr SoH ≥ 70-80% for BESS) typically applies regardless of ownership. (3) BUS grant — UK 2025-26 BUS grants tied to property + system installation, not original owner; new owner inherits the asset + the grant validity; ongoing obligations (operate system per intended design) continue. (4) SEG (Smart Export Guarantee) tariff — typically requires re-registration when ownership changes; new owner contacts their energy supplier (which may be different) to set up SEG with the existing install evidence. (5) Installer service relationship — new owner has the option to continue with the original installer or switch to a different MCS company; original installer is well-positioned (knowledge of the install) but the customer chooses. (6) Portal accounts — manufacturer portals typically need reassignment (original owner removed, new owner added); installer can facilitate. (7) Cert evidence bundle — remains with installer for audit + service continuity; transferable to new servicing company on customer request. (8) Future EICR-equivalent — new owner uses the property\'s MCS handover pack + future EICR-equivalent reports as the lifecycle record. (9) Reality 2025-26: smooth transfer is the norm for well-documented installs; gaps in documentation create complication at sale + reduce property value.',
  },
];

const faqs = [
  {
    question: 'How much detail should the customer get vs the technical detail kept by installer?',
    answer:
      'Customer-facing: plain-English operating guide + key contacts + emergency procedures + monthly self-check + warranty summary. Technical detail (per-cell voltages, BMS firmware logs, full schematic, full commissioning record) stays in the cert evidence bundle. Customer can request specific items at any time. The split is by usefulness — what helps the customer operate + monitor + respond vs what supports the installer\'s audit + warranty + service.',
  },
  {
    question: 'Should the handover meeting be in-person or remote?',
    answer:
      'In-person is the norm + preferred at completion of physical install — customer in their home, system being demonstrated. Remote handover (video call) possible for follow-up touchpoints + new owners post-sale. Hybrid model: in-person primary handover + video follow-up + annual touchpoint via call or visit per customer preference + service contract terms.',
  },
  {
    question: 'How to handle customers who don\'t use technology or apps?',
    answer:
      'Adapt the engagement — paper operating guide + sticker with phone contacts + monthly call from installer instead of portal app. UK 2025-26 has wide variation in customer technology comfort; the installer\'s job is to serve the customer where they are. Manufacturer may not offer non-app options + the installer fills the gap via paid touchpoints. Cert evidence bundle records the customer\'s engagement preference.',
  },
  {
    question: 'What if the customer ignores alerts or fails to engage?',
    answer:
      'Common scenario. Installer\'s response: (1) follow-up call when alert is unacknowledged for >24-48 hr (depending on severity); (2) annual touchpoint catches issues even if customer hasn\'t engaged; (3) record the engagement gap in cert evidence bundle; (4) escalate to manufacturer if safety-critical; (5) customer education re-emphasised at annual; (6) commercial conversation — paid monitoring service may be appropriate. Disengaged customers + LCT installs = elevated risk vs engaged customers; installer + manufacturer aware of this.',
  },
  {
    question: 'How to manage the handover when the install completes in stages?',
    answer:
      'Multi-stage install (PV first, BESS later, EV later): mini-handover at each stage; cumulative MCS handover pack updated; annual or coordinated touchpoint integrates the cumulative system. Customer can have multiple operating guides initially + integrated guide at multi-source completion. Cert evidence bundle tracks each stage + transitions. UK 2025-26 reality: many customers add LCT over years; staged handover is the normal pattern.',
  },
];

export default function RenewableEnergyModule12Section7() {
  const navigate = useNavigate();

  useSEO({
    title: 'Customer education + handover delivery | Renewable Energy 12.7 | Elec-Mate',
    description:
      'Customer education + handover delivery — operating guide, fault response, monitoring expectations, annual touchpoint, avoiding silent failures, multi-source customer journey. The handover meeting + ongoing engagement framework. UK 2025-26 customer education best practice.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-12')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 12
          </button>

          <PageHero
            eyebrow="Module 12 · Section 7 · Customer engagement + lifecycle delivery"
            title="Customer education + handover delivery"
            description="The handover meeting, the operating guide, fault response, monitoring expectations, the annual touchpoint, avoiding silent failures, multi-source customer journey, property-sale handover. The non-technical but business-critical layer of the LCT install — done well, prevents most support calls + supports warranty + insurance + EICR-equivalent across the install lifecycle."
            tone="yellow"
          />

          <TLDR
            points={[
              'Handover meeting at install completion: 60-90 min typical (2 hr multi-source). System demo + portal walkthrough + maintenance + warranty + fault response + MCS pack handover + sign-off.',
              'Operating guide: system overview, modes + controls, portal access, maintenance schedule, warranty summary, fault response, emergency stops, do-not-open / modify, future considerations, FAQ.',
              'Fault response training: observation + reporting + emergency vs non-emergency + installer-first + categorical no-DIY.',
              'Monitoring expectations layered: continuous BMS / inverter + monthly customer self-check + annual touchpoint + 5-10 yr EICR-equivalent + warranty events.',
              'Annual touchpoint value: relationship maintenance + early detection + firmware updates + customer education refresh + commercial + warranty support.',
              'Silent failure prevention: portal alert configuration + monthly self-check habit + annual touchpoint + manufacturer monitoring + abnormal visibility.',
              'Multi-source customer education: integrated portal where possible + layered detail + one-page summary + system-thinking not technology-by-technology + follow-up email.',
              'Property sale: MCS handover pack travels with property; warranty transfer per manufacturer; BUS grant inherited; SEG re-registration; portal reassignment.',
              'Customer engagement varies — engaged customers benefit fully + disengaged customers carry elevated risk; installer + manufacturer aware + adapt.',
              'Cert evidence bundle records customer touchpoints + sign-offs; supports installer audit + warranty + dispute resolution.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Structure + deliver an effective handover meeting (60-90 min) covering all key topics.',
              'Compose a customer-facing operating guide covering system, controls, portal, maintenance, warranty, faults.',
              'Train customer in fault response: observation + emergency vs non-emergency + installer-first + no-DIY.',
              'Set monitoring expectations: continuous + self-check + annual + periodic + warranty events.',
              'Configure portal alerts + customer\'s phone for silent-failure prevention.',
              'Adapt customer education for multi-source LCT vs single-source.',
              'Manage property sale handover transitions + warranty + grant + portal reassignment.',
              'Engage customer over the install lifecycle via annual touchpoints + alarm response + EICR-equivalent visits.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The customer is the final mile of every LCT install. A great install with poor customer handover ends in confusion + support calls. Invest the 90 minutes.
          </Pullquote>

          <ContentEyebrow>Handover meeting + operating guide structure</ContentEyebrow>

          <ConceptBlock
            title="The handover meeting — 60-90 minutes that matter"
            plainEnglish="The handover meeting at install completion is the customer-facing close. 60-90 min typical (2 hr for multi-source). Activities: walk-through, system demo, portal walkthrough, maintenance + warranty briefing, fault response, MCS handover pack delivery, Q&A, sign-off. Investment in this meeting prevents most customer confusion + support calls over the install life."
            onSite="UK 2025-26 reality: many installers skip or rush the handover meeting + suffer the consequence (high support call volume, weak customer reviews, lost referrals). Conscientious installers invest the 90 minutes + reap the benefit (low support + high customer reviews + repeat business)."
          >
            <p>Handover meeting structure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Walk-through
                  (15 min)</strong> — show customer the install in their property;
                outdoor equipment + isolators + safety labels + cable routing
              </li>
              <li>
                <strong className="text-white">System demo
                  (15-20 min)</strong> — start a charging cycle / show generation;
                demonstrate emergency stop; show normal operating signs
              </li>
              <li>
                <strong className="text-white">Portal
                  walkthrough (15-20 min)</strong> — log customer into manufacturer
                portal on phone + computer; show key views; configure alerts
              </li>
              <li>
                <strong className="text-white">Maintenance
                  + warranty (10 min)</strong> — annual schedule + EICR-equivalent
                cycle + manufacturer service + warranty terms summary
              </li>
              <li>
                <strong className="text-white">Fault response
                  (10 min)</strong> — observation procedure + emergency vs non-emergency
                + categorical no-open + emergency contacts
              </li>
              <li>
                <strong className="text-white">MCS handover
                  pack delivery (5-10 min)</strong> — paper + digital handover; structure
                walkthrough; signpost key documents
              </li>
              <li>
                <strong className="text-white">Q&A (5-10 min)</strong>
                — invite customer questions; capture for follow-up
              </li>
              <li>
                <strong className="text-white">Sign-off
                  acknowledgement</strong> — customer signs to confirm receipt +
                understanding; cert evidence bundle records
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Operating guide — the customer\'s reference document"
            plainEnglish="The operating guide is the customer-facing reference document — accompanies the install for the lifecycle. Covers system overview, modes + controls, portal access, maintenance schedule, warranty, fault response, emergency stops, do-not-open / modify, future considerations, FAQ. UK 2025-26 typical 12-20 pages; tablet + phone-friendly digital version + paper copy."
            onSite="The operating guide gets referenced when something happens — alert raised, customer wants to optimise, holiday mode question, warranty event. Well-written + visually clear guides reduce installer support calls + reinforce customer confidence + protect the warranty + install integrity."
          >
            <p>Operating guide essential sections:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">System overview</strong>
                — plain-English description of what each source does + how they interact
              </li>
              <li>
                <strong className="text-white">Operating modes
                  + controls</strong> — normal + holiday mode + boost + manufacturer-specific
                features
              </li>
              <li>
                <strong className="text-white">Portal access</strong>
                — written instructions for first-time login + key views
              </li>
              <li>
                <strong className="text-white">Maintenance
                  schedule</strong> — customer self-check + annual + EICR-equivalent
                cycle + manufacturer service
              </li>
              <li>
                <strong className="text-white">Warranty terms</strong>
                — manufacturer + installer workmanship; what counts as warranty event;
                claim process
              </li>
              <li>
                <strong className="text-white">Fault
                  response</strong> — observation + emergency vs non-emergency +
                contacts (visible)
              </li>
              <li>
                <strong className="text-white">Emergency stop</strong>
                — location per source + procedure
              </li>
              <li>
                <strong className="text-white">Do-not-open
                  + do-not-modify</strong> — categorical safety message + warranty
                void if breached
              </li>
              <li>
                <strong className="text-white">Future
                  considerations</strong> — additions, replacements (inverter 10-15 yr),
                end-of-life (BESS 15-20 yr; PV 25-30 yr)
              </li>
              <li>
                <strong className="text-white">FAQ</strong>
                — common questions (holidays, SEG optimisation, power cut behaviour,
                bill alongside system)
              </li>
              <li>
                <strong className="text-white">Contacts
                  page</strong> — clear visible list (installer 24-hr, non-emergency,
                manufacturer support, DNO, emergency services)
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 514.9.1 — Diagrams + identification"
            clause="A diagram, chart or table or equivalent form of information shall be provided indicating in particular: (i) the type and composition of each circuit (points of utilization served, number and size of conductors, type of wiring); (ii) the method used for fault protection; (iii) the information necessary for the identification of each device performing the function of protection, isolation and switching, and its location."
            meaning="Reg 514.9.1 mandates the diagram / chart / table providing key system information — for LCT this becomes a key handover document. The diagram supports: the customer (understanding their system), the installer (audit + future service), the EICR-equivalent verifier (quick orientation), the warranty + insurance (system identification), the DNO (where applicable, the SLD for grid connection). For multi-source LCT the diagram integrates: PV array + inverter + DC isolators + AC isolators; BESS battery + BMS + inverter + isolators; EV charger + OPDD + protective architecture; heat pump + outdoor unit + control wiring + dedicated supply circuit; main CU + protective devices + main earth + bonding. Reg 712.514 PV-specific warning notices supplement the diagram. Cert evidence bundle keeps the diagram + warning notices + EIC together as the BS 7671 anchor; MCS handover pack includes the customer-facing version. UK 2025-26 best practice: diagram is part of the operating guide + visible physically at the CU or system location. Customer reference + technical audit dual purpose."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Monitoring + annual touchpoint + silent failures</ContentEyebrow>

          <Pullquote>
            The system that\'s monitored is the system that lasts. The silent failure caught early is the warranty claim handled smoothly. The annual touchpoint is the relationship — and the relationship is the business.
          </Pullquote>

          <ConceptBlock
            title="Layered monitoring approach"
            plainEnglish="Monitoring expectations work in layers: continuous BMS / inverter + monthly customer self-check + annual installer or manufacturer touchpoint + 5-10 yr professional EICR-equivalent + warranty events. Each layer catches different issues; together they cover the install lifecycle."
            onSite="UK 2025-26 reality: customer engagement varies widely — some customers love the portal + check daily; others want set-and-forget. The layered approach accommodates both — continuous BMS catches the safety-critical even when customer disengaged; annual touchpoint maintains the relationship even when customer self-check infrequent."
          >
            <p>Monitoring layers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Continuous BMS
                  / inverter monitoring</strong> — automatic background self-monitoring;
                alerts on fault state; portal app + email notification; safety-critical
                coverage independent of customer engagement
              </li>
              <li>
                <strong className="text-white">Monthly
                  customer self-check</strong> — 2-5 min portal review (yield + SoC +
                alerts); habit established at handover; catches non-safety-critical
                issues (yield drift, soiling, minor degradation)
              </li>
              <li>
                <strong className="text-white">Annual
                  installer / manufacturer touchpoint</strong> — paid service typical
                £50-150/yr residential; comprehensive review beyond customer self-check;
                relationship maintenance
              </li>
              <li>
                <strong className="text-white">5-10 yr
                  professional EICR-equivalent</strong> — Reg 652.1 frequency;
                comprehensive periodic + LCT-specific extensions (covered §12.5)
              </li>
              <li>
                <strong className="text-white">Warranty
                  events</strong> — at half-life (~5 yr) review + approaching warranty
                floor (~10 yr); manufacturer engagement as needed
              </li>
              <li>
                <strong className="text-white">Manufacturer
                  scheduled monitoring</strong> — many manufacturers offer paid monitoring
                with installer or manufacturer-direct service; configurable at handover
              </li>
              <li>
                <strong className="text-white">Customer
                  configurations</strong> — portal alerts customised at handover for
                customer\'s phone + email; default settings may not be optimal
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle integration</strong> — each monitoring layer feeds the lifecycle
                record; comprehensive picture for warranty + insurance + EICR
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Silent failure prevention strategies"
            plainEnglish={`Silent failures = system not generating / charging / heating as expected, undetected for weeks or months. Examples: dead PV inverter (yield drops to zero, customer doesn't notice for months); BESS stuck at 0% SoC (no self-consumption benefit); EV charger failed (next charge attempt fails). Layered monitoring + customer education + abnormal-visibility prevent.`}
            onSite={`The customer-facing reality: customers don't always notice silent failures — they may attribute lower yield to weather, see the BESS as "empty so nothing to discharge", or only use EV charger weekly. The installer's job at handover + via annual touchpoint is to make abnormal visible.`}
          >
            <p>Silent failure prevention:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Portal alert
                  configuration</strong> — push notification to customer phone on fault
                state; email to customer + copy to installer for critical
              </li>
              <li>
                <strong className="text-white">Customer
                  self-check habit</strong> — monthly portal review established at
                handover; 2-5 min checks the headline metrics
              </li>
              <li>
                <strong className="text-white">Make abnormal
                  visible</strong> — at handover educate customer on \"normal\" patterns
                (PV yield curve, BESS SoC daily pattern, heat pump cycling); \"abnormal\"
                patterns prompt action
              </li>
              <li>
                <strong className="text-white">Annual
                  touchpoint</strong> — installer or manufacturer-initiated check covers
                even disengaged customers
              </li>
              <li>
                <strong className="text-white">Manufacturer
                  scheduled monitoring</strong> — paid service from manufacturer;
                automated alerts even if customer doesn\'t check
              </li>
              <li>
                <strong className="text-white">Installer
                  fleet monitoring</strong> — installer keeps eye on fleet via portal
                aggregation; identifies outliers (one customer\'s yield down vs others
                in similar conditions)
              </li>
              <li>
                <strong className="text-white">Customer-facing
                  alerts</strong> — clear language (\"your inverter has stopped\" not
                \"error code 1234\"); calls to action (\"contact installer\")
              </li>
              <li>
                <strong className="text-white">Common silent
                  failures avoided</strong> — dead inverter (PV no yield months); BESS
                0% stuck (cell failure, BMS misbehaviour); EV charger failure (weekly
                user gap); heat pump defrost loop (high consumption + no heat)
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651.4 — Recording in periodic reports"
            clause="Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
            meaning="Reg 651.4 sets the recording requirement for periodic findings — and the customer touchpoint + monitoring approach feeds this. Damage (physical impact, weather, vandalism), deterioration (silent degradation captured by monitoring; trends caught by customer + installer + manufacturer engagement), defects (manufacturing or install issues identified over time), dangerous conditions (safety-critical events captured by continuous monitoring). The customer education + annual touchpoint feed the data + observations into the cert evidence bundle + the next EICR-equivalent report. Customer-facing simplification: customer doesn\'t need to know Reg 651.4; what they need to know is to engage with the portal + report what they see. Cert evidence bundle assembles: customer touchpoint records + portal alert log + annual touchpoint findings + EICR-equivalent reports + manufacturer correspondence + warranty events + thermal images + photographs. The comprehensive lifecycle record supports: warranty claims + insurance + audit + future verifiers + property sale + safety case. UK 2025-26 customer-installer-manufacturer triangle is the engagement framework; cert evidence bundle is the audit anchor."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Multi-source customer journey + property sale</ContentEyebrow>

          <ConceptBlock
            title="Multi-source customer education approach"
            plainEnglish="Multi-source LCT customer (PV + BESS + heat pump + EV) education approach: integrated portal where available; layered detail; one-page summary card; system-thinking not technology-by-technology; follow-up email with reference; annual touchpoint covers comprehensive review. Avoid technical jargon; tailor depth to customer engagement preference."
            onSite="UK 2025-26 reality: multi-source customers range from deeply-engaged-energy-enthusiast to hands-off-just-want-it-to-work. The installer\'s approach adapts. The integrated portal (where manufacturer ecosystem supports) is the single-pane-of-glass; the operating guide integrates the technologies into one system; the touchpoints scale to customer engagement."
          >
            <p>Multi-source customer education tactics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Integrated
                  portal</strong> — Tesla app covers Powerwall + EV + solar; GivEnergy
                portal covers PV inverter + BESS; manufacturer-agnostic platforms
                (SolarEdge ONE) emerging. Use as primary customer interface where
                available
              </li>
              <li>
                <strong className="text-white">Layered
                  detail</strong> — top-level dashboard for daily check; deeper drilldown
                for those who want it
              </li>
              <li>
                <strong className="text-white">One-page
                  summary card</strong> — physical card / sticker / handover pack page
                with: key contacts, emergency stops, fault response, portal login
              </li>
              <li>
                <strong className="text-white">System-thinking</strong>
                — \"this is your energy system\" not \"your PV + your BESS + your heat
                pump + your EV charger\"; customer doesn\'t think about technology
                boundaries
              </li>
              <li>
                <strong className="text-white">Follow-up
                  email</strong> — within 24-48 hr of handover; summary, key contacts,
                portal logins, support FAQ; written reference
              </li>
              <li>
                <strong className="text-white">Annual
                  touchpoint integrated</strong> — covers all sources in one visit/call;
                refresh + update + relationship maintenance
              </li>
              <li>
                <strong className="text-white">Avoid jargon</strong>
                — \"battery\" not \"BESS\"; \"solar\" not \"PV\"; \"heat pump\" not \"ASHP\";
                \"charger\" not \"EVSE\"
              </li>
              <li>
                <strong className="text-white">Tailor depth</strong>
                — engaged customers love technical detail; disengaged customers want
                minimal; gauge + adapt
              </li>
              <li>
                <strong className="text-white">Reality</strong>
                — most customers settle on hands-off-with-occasional-engagement; the
                layered monitoring catches issues regardless
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Property sale handover transitions"
            plainEnglish="Property sale + LCT install: MCS handover pack travels with property in conveyancing documents; warranty transfer per manufacturer terms; BUS grant continues per scheme; SEG re-registration; portal account reassignment. Cert evidence bundle remains with installer for audit + service continuity. UK 2025-26 increasingly seamless for well-documented installs."
            onSite="The original installer is well-positioned to support the transition — knowledge of the install + warranty relationships + portal access. The new owner may continue with the original installer or switch; either way the documentation supports continuity."
          >
            <p>Property sale transition elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">MCS handover
                  pack</strong> — physical + digital copy travels with property in
                conveyancing; new owner takes possession at completion
              </li>
              <li>
                <strong className="text-white">Manufacturer
                  warranty</strong> — typically transferable; some require notification
                via installer; cert evidence bundle records the transfer
              </li>
              <li>
                <strong className="text-white">BUS grant</strong>
                — tied to property + system; new owner inherits asset + grant validity
                + ongoing obligations
              </li>
              <li>
                <strong className="text-white">SEG tariff</strong>
                — re-registration with new owner\'s energy supplier; existing MCS +
                DNO + handover pack evidence supports
              </li>
              <li>
                <strong className="text-white">Installer
                  service relationship</strong> — new owner option to continue or switch;
                original installer has knowledge + relationship advantages
              </li>
              <li>
                <strong className="text-white">Portal account
                  reassignment</strong> — manufacturer portals need reassignment from
                original owner to new owner; installer facilitates
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — remains with installer; transferable to new servicing
                company on customer request
              </li>
              <li>
                <strong className="text-white">EICR-equivalent
                  continuity</strong> — new owner uses property\'s existing cert
                + MCS handover pack as lifecycle baseline
              </li>
              <li>
                <strong className="text-white">Documentation
                  gaps</strong> — older installs may have incomplete records; sale
                process more complicated; cert evidence bundle reconstruction may
                be needed
              </li>
              <li>
                <strong className="text-white">Property
                  value</strong> — well-documented LCT installs add measurable property
                value; poorly-documented installs may detract; investment in handover
                + cert pays back at sale
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 514.9.1 + Reg 712.514 — Diagrams + warning notices"
            clause="Reg 514.9.1 mandates diagram / chart / table of system information. Reg 712.514.101 mandates instruction notice for PV at origin of installation + at metering position if remote from origin + at consumer unit / distribution board to which inverter is connected."
            meaning="These regs together create the physical-and-documentary information layer that supports customer + installer + verifier + emergency services. Reg 514.9.1 diagram: shows system topology + protective device identification + locations — for LCT this includes the integrated multi-source diagram. Reg 712.514.101 PV-specific warning notices: at the origin of the electrical installation (so DNO + emergency services + meter readers see the PV presence); at the metering position (where remote from origin); at the CU / DB where the inverter connects (for electricians + maintenance). Customer-facing implication: the warning notices + diagrams are part of the customer\'s mental model of their system. At handover the installer points out + explains. Cert evidence bundle keeps the diagram + warning notice photographs + locations. For multi-source LCT the integrated diagram + per-source warning notices create the physical info layer; customer can refer to it; emergency services see it. UK 2025-26 best practice: integrated SLD on a permanent label / engraved plate near the CU; PV warning at origin + meter + CU; BESS warning per Chapter 57; EV warning per Section 722."
          />

          <InlineCheck {...inlineChecks[3]} />

          <CustomerEducationHandover
            caption="Customer education + handover delivery framework diagram. Top: handover meeting structure — walk-through + system demo + portal walkthrough + maintenance + warranty + fault response + MCS pack + Q&A + sign-off (60-90 min). Middle-upper: operating guide content — system overview + modes + portal access + maintenance + warranty + fault response + emergency stops + do-not-open + future considerations + FAQ + contacts. Middle-lower: layered monitoring approach — continuous BMS + monthly customer self-check + annual touchpoint + 5-10 yr EICR-equivalent + warranty events. Bottom-left: silent failure prevention — portal alerts + customer habit + abnormal-visibility + annual + manufacturer monitoring + installer fleet view. Bottom-right: property sale handover — MCS pack travels + warranty transfer + BUS grant inheritance + SEG re-registration + portal reassignment + cert evidence bundle audit continuity."
          />

          <SectionRule />

          <Scenario
            title="Comprehensive handover meeting on a multi-source LCT install"
            situation="Mrs Hassan, single mother, retrofit completed: 4 kWp PV + 8 kWh BESS + Zappi EV charger. Originally interested but moderately engaged with technology. MCS company\'s lead electrician conducts handover meeting after final IV + commissioning."
            whatToDo="(1) Handover meeting starts 4 pm Friday evening (customer preference around school pickup). Total ~90 min planned. (2) Walk-through (15 min): show the install outdoor + indoor. Outdoor: PV array on south-facing roof (visible from garden); inverter on garage exterior wall; isolators + warning labels; cable routing. Indoor: BESS in utility room (vent clearance noted); EV charger on driveway; CU with new circuits labelled. Mrs Hassan asks about the visible cables; explanation. (3) System demo (15 min): real-time portal on the manufacturer app showing PV generating + BESS charging + EV not currently in use. Demonstrate emergency stop on each source. Show how the system automatically prioritises (PV → BESS charging → grid export when full; EV draws from BESS where possible). Mrs Hassan engages with the visualisation. (4) Portal walkthrough (20 min): log Mrs Hassan into manufacturer app on her phone + family laptop. Show today\'s view (yield + consumption + battery state); weekly summary; monthly summary. Set up notification alerts to her email + phone. She asks how to read the bill alongside the system; explanation. (5) Maintenance + warranty (10 min): annual self-check (2 min portal review monthly); annual touchpoint £75/yr service (she opts in for installer\'s annual service); EICR-equivalent in 10 yr aligned with property AC EICR; warranty terms summary; warranty registration confirmed. (6) Fault response (10 min): observation procedure; emergency procedures (smoke / fire → 999 + emergency stop + leave); non-emergency installer-first (24-hr emergency line provided on a magnet for the fridge); contacts visible. Categorical no-open + no-modify message. (7) MCS handover pack (10 min): paper + digital copy handed over; structure walkthrough (sizing + commissioning + EIC + warranty + customer guide); signposting key documents. (8) Q&A (10 min): Mrs Hassan asks: what happens in a power cut? Will EV charge if grid is down? What about Christmas when usage spikes? Each answered with practical guidance. (9) Sign-off acknowledgement: Mrs Hassan signs to confirm receipt + understanding; lead electrician countersigns; copy goes into cert evidence bundle. (10) Follow-up: email sent 24 hr later with handover summary + key contacts + portal logins + support FAQ link + service contract confirmation. Mrs Hassan replies thanking + with one minor clarifying question. (11) Cert evidence bundle: comprehensive record of handover meeting + sign-off + follow-up correspondence."
            whyItMatters="A well-delivered handover meeting on a multi-source install demonstrates the discipline. The 90-min investment creates a confident + engaged customer; supports the install lifecycle; reduces support calls; positions the installer for the annual touchpoint + future EICR-equivalent + word-of-mouth referral. The customer\'s confidence + understanding + buy-in = the business reality. Cert evidence bundle records the handover; protects the installer + supports the customer."
          />

          <Scenario
            title="Property sale handover transition — well-documented install benefits"
            situation="Mr Singh originally installed 6 kWp PV + 10 kWh BESS in 2027; now selling property in 2030. New buyer Mrs Patel doing due diligence on the LCT install. Original installer engaged by Mrs Patel\'s solicitor for sale documentation."
            whatToDo="(1) Installer reviews cert evidence bundle for the install — MCS handover pack (2027), EIC, Schedule of Test Results, manufacturer commissioning records, EREC G98 reference, warranty registrations, portal data over 3 yr (yield + SoH + clean fault history), 1-yr touchpoint records, no warranty events. (2) Sale documentation pack prepared for Mrs Patel: copy of MCS handover pack; current portal data summary; warranty status (modules 22 yr remaining, inverter 7 yr remaining, BESS 7 yr remaining + SoH 92% — healthy); 1-yr touchpoint history; recommended next steps (annual touchpoint scheduled for new owner; 5-yr full periodic in 2032). (3) Mrs Patel\'s solicitor accepts the documentation; sale completion. (4) New owner handover (30-45 min, lighter than original 90 min): installer meets Mrs Patel at the property; brief walk-through; portal account reassignment (Mr Singh removed, Mrs Patel added with installer support); annual touchpoint relationship explained + she opts to continue at £75/yr; SEG re-registration with her chosen energy supplier (different from Mr Singh\'s); cert evidence bundle updated with new owner details + reassignment record. (5) Cert evidence bundle: comprehensive record across original owner + transition + new owner; continuity maintained; supports warranty + insurance + future EICR-equivalent + ongoing service. (6) Mrs Patel\'s perspective: comprehensive documentation gave her confidence to proceed with property purchase including the LCT value; clear ongoing service relationship with installer; predictable cost + maintenance schedule."
            whyItMatters="Well-documented LCT install + property sale = smooth transition + asset value preserved. The MCS handover pack + cert evidence bundle + portal data over years = the documentation Mrs Patel\'s due diligence needs. The installer\'s ongoing relationship + cert discipline pay back at the sale + into the new owner relationship. UK 2025-26 + 2030 reality: as LCT installs age into property sale cycle, documentation quality becomes a key value-preservation factor. Cert evidence bundle as the audit + service continuity anchor."
          />

          <CommonMistake
            title="Rushing the handover meeting to 15 minutes"
            whatHappens={`Installer wraps up the install + hands over the MCS handover pack with 5-min explanation. Customer signs without comprehension. Over the next year: 8 support calls ("how do I check yield", "what does this alert mean", "is my battery broken"), customer never engages with portal, silent failure (PV inverter fault) goes undetected for 6 weeks; warranty claim complicated by lack of customer evidence.`}
            doInstead={`Invest the 60-90 minutes. The handover meeting is the highest-leverage customer engagement moment in the install lifecycle. System demo + portal walkthrough + maintenance + fault response + Q&A. Set up portal alerts on customer's phone there + then. Sign-off acknowledgement. Follow-up email next day. The investment pays back: low support call volume + engaged customer + early issue detection + warranty support + customer reviews + referrals. Cert evidence bundle records the meeting + sign-off; protects the installer + supports the customer.`}
          />

          <CommonMistake
            title="Assuming the customer will engage with the portal without setup"
            whatHappens={`Installer mentions the portal app at handover, says "the app is free, download it, your install code is on page 12". Customer doesn't download, doesn't login, doesn't configure alerts. 3 months later there's a fault; customer doesn't see it; failure persists; relationship strained.`}
            doInstead={`Set up the portal access at the handover meeting. Customer downloads the app on their phone there + then; logs in; sees their data; you configure notification alerts to their email + phone. Show them the views they'll use most. Send the follow-up email with the login info + a screenshot of where to find each view. UK 2025-26 reality: customer technology comfort varies; assume nothing + ensure the basic engagement layer works. Cert evidence bundle records the portal setup + customer's configured alert preferences.`}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Handover meeting at install completion: 60-90 min typical (2 hr multi-source). High-leverage customer engagement moment.',
              'Operating guide content: system overview + modes + portal + maintenance + warranty + fault response + emergency stops + do-not-open + future + FAQ + contacts.',
              'Fault response training: observation + reporting + emergency vs non-emergency + installer-first + categorical no-DIY.',
              'Layered monitoring: continuous BMS + monthly customer self-check + annual touchpoint + 5-10 yr EICR-equivalent + warranty events.',
              'Annual touchpoint value: relationship + early detection + firmware updates + customer education refresh + commercial + warranty support.',
              'Silent failure prevention: portal alert configuration + customer habit + abnormal-visibility + annual + manufacturer monitoring + installer fleet view.',
              'Multi-source customer education: integrated portal + layered detail + one-page summary + system-thinking + follow-up email.',
              'Property sale: MCS pack travels with property; warranty transfer; BUS grant inheritance; SEG re-registration; portal reassignment; cert evidence bundle continuity.',
              'Customer engagement varies — adapt depth + frequency; layered monitoring catches issues regardless of engagement level.',
              'Reg 514.9.1 + Reg 712.514: diagrams + warning notices are part of the physical info layer; cert evidence bundle keeps copies.',
              'Cert evidence bundle records all customer touchpoints + sign-offs + correspondence + monitoring events + warranty + service.',
              'Well-documented install + handover discipline = customer confidence + low support + warranty support + property value preservation.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                12.6 MCS handover packs
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                12.8 The Renewable Electrician
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
