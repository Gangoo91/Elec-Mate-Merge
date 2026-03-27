import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  Home,
  Phone,
  Heart,
  Activity,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Safety', href: '/electrical-safety-at-home' },
  { label: 'Electric Shock First Aid', href: '/electric-shock-first-aid' },
];

const tocItems = [
  { id: 'critical-warning', label: 'Critical: Do NOT Touch the Casualty' },
  { id: 'isolate-supply', label: 'Isolate the Supply' },
  { id: 'call-999', label: 'Call 999' },
  { id: 'cpr', label: 'CPR if Not Breathing' },
  { id: 'low-vs-high-voltage', label: 'Low vs High Voltage Severity' },
  { id: 'after-treatment', label: 'After Treatment — Always See a Doctor' },
  { id: 'delayed-effects', label: 'Delayed Cardiac Arrhythmia' },
  { id: 'prevention', label: 'Prevention' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'NEVER touch a person who is still in contact with the electrical source — you risk becoming a second casualty. Isolate the supply first.',
  'Call 999 immediately for any electric shock — even if the person appears unharmed, internal injury, cardiac damage, and delayed arrhythmia can occur.',
  'If the casualty is unresponsive and not breathing normally, begin CPR immediately after calling 999. Early CPR is critical.',
  'Low-voltage shocks (UK domestic 230V) can be fatal — voltage level alone is not a reliable guide to severity of injury.',
  'Electric shock can cause delayed cardiac arrhythmia hours after the incident — anyone who has received a shock MUST be assessed by a doctor, even if they feel fine immediately afterwards.',
  'High-voltage shocks (above 1,000V) cause additional injuries including severe internal burns along the current path — NEVER approach high-voltage equipment after an incident until the supply is confirmed isolated.',
];

const faqs = [
  {
    question: 'What is the most important thing to do first when someone gets an electric shock?',
    answer:
      'Do NOT touch the casualty if they are still in contact with the electrical source. Touching them will pass current through you, making you a second casualty. The first priority is to make the situation safe — switch off the power at the consumer unit, switch off the appliance at the wall, or use a non-conducting object (dry wood, plastic) to move the source away from the casualty. Only when you are certain there is no live electrical contact should you approach and touch the casualty.',
  },
  {
    question: 'Should I call 999 even if the person seems fine after an electric shock?',
    answer:
      'Yes — always call 999 for any electric shock, regardless of how the person appears immediately afterwards. Electric current passing through the body can cause internal damage that is not visible externally, including damage to the heart muscle (myocardial injury), cardiac arrhythmia that may develop hours later, and internal burns along the current path. A person who walks away from a shock and declines medical attention may develop a fatal arrhythmia in the hours that follow. This is well documented in the medical literature.',
  },
  {
    question: 'How do I do CPR on an electric shock casualty?',
    answer:
      'Once the casualty is away from the electrical source and you are certain you will not be electrocuted by touching them, check for response by calling to them and tapping their shoulders firmly. If unresponsive: call 999 (or ask a bystander to call while you begin CPR). Tilt the head back gently and lift the chin — check for normal breathing for no more than 10 seconds. If not breathing normally, begin chest compressions: place the heel of your hand on the centre of their chest (breastbone), interlace your fingers, and press down 5 to 6 cm at a rate of 100 to 120 compressions per minute. After every 30 compressions, give 2 rescue breaths if you are trained to do so. Continue until the emergency services arrive or the casualty recovers.',
  },
  {
    question: 'Is a 230V shock dangerous?',
    answer:
      'Yes — UK domestic mains voltage (230V) is fully capable of causing fatal cardiac arrhythmia or ventricular fibrillation, particularly if the current path passes through the chest. The severity of electric shock injury depends on the current (determined by voltage and body resistance), the current path through the body, the duration of contact, and whether the current is AC or DC. A current of just 10 to 30 milliamps (mA) of AC at 50Hz (the UK mains frequency) passing through the chest can cause ventricular fibrillation. Do not assume a 230V shock is "just a tingle" — seek medical assessment.',
  },
  {
    question: 'What are the signs that someone has been badly hurt by an electric shock?',
    answer:
      'Immediate signs of serious electric shock injury include: loss of consciousness; no pulse or abnormal pulse; cessation of breathing; muscle contractions or tetanic spasm; entry and exit burn wounds (burns where the current entered and exited the body); confusion, disorientation, or changes in behaviour; falls or injuries from involuntary muscle contraction. However, the absence of these signs does not mean the shock was harmless — internal injury and delayed arrhythmia can occur without dramatic immediate symptoms.',
  },
  {
    question: 'What is delayed cardiac arrhythmia after electric shock?',
    answer:
      'The electrical current from a shock can temporarily disrupt the heart\'s conduction system without causing immediate cardiac arrest. However, this disruption can trigger arrhythmias (irregular heart rhythms) in the hours following the incident. Ventricular fibrillation and other life-threatening arrhythmias have been documented occurring up to 12 to 24 hours after a low-voltage electric shock. This is why hospital monitoring for at least 12 to 24 hours is recommended for anyone who has received a significant electric shock, even if they feel well immediately afterwards.',
  },
  {
    question: 'What is different about high-voltage electric shock first aid?',
    answer:
      'High-voltage electrical sources (above 1,000V) — including overhead power lines, railway overhead line equipment, and high-voltage substations — present additional dangers. NEVER approach within the exclusion zone (at least 15 metres for overhead lines). The current can arc through the air over several metres, meaning you can be electrocuted without touching the source or the casualty. Call 999 immediately. Do not attempt to move the casualty or approach until the supply authority (National Grid, Network Rail, or DNO) confirms the supply is isolated and it is safe to approach.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description:
      'Complete guide to home electrical safety including RCD testing and common hazards.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/finding-emergency-electrician',
    title: 'Finding an Emergency Electrician',
    description:
      'What counts as an electrical emergency and how to find a 24/7 registered electrician.',
    icon: Phone,
    category: 'Guide',
  },
  {
    href: '/extension-lead-safety',
    title: 'Extension Lead Safety',
    description: 'Safe use of extension leads — load limits, RCD protection, and outdoor use.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'critical-warning',
    heading: 'CRITICAL: Do NOT Touch the Casualty While They Are in Contact with the Source',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/20 border border-red-500/40 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white text-lg mb-2">
                Do NOT touch the casualty if they are still in contact with the electrical source.
              </p>
              <p className="text-white">
                If you touch a person who is still connected to a live electrical source, current
                will pass through you as well. You will become a second casualty, incapacitated
                and potentially killed, leaving the original casualty with no help. This is how
                multiple fatalities from a single electrical accident occur.
              </p>
            </div>
          </div>
        </div>
        <p>
          The golden rule of electric shock first aid is:
        </p>
        <ol className="space-y-2 text-white list-decimal list-inside my-4">
          <li><strong>Make the situation safe first</strong> — isolate the supply</li>
          <li><strong>Only then approach and help the casualty</strong></li>
          <li><strong>Call 999 — do this as soon as possible, ideally at the same time as step 1</strong></li>
        </ol>
        <p>
          This sequence is not about prioritising the power over the person — it is the only
          approach that allows you to actually help the casualty without becoming a casualty
          yourself.
        </p>
      </>
    ),
  },
  {
    id: 'isolate-supply',
    heading: 'How to Isolate the Electrical Supply',
    content: (
      <>
        <p>
          Isolating the supply removes the danger to both the casualty and to you. The
          method depends on the situation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turn off at the consumer unit</strong> — if the consumer unit is
                nearby and you can reach it safely without crossing the affected area,
                turn off the main switch. This isolates all circuits in the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch off the appliance at the wall</strong> — if the casualty
                is in contact with an appliance (a faulty tool, appliance, or lead),
                switch off or unplug it at the wall socket — not the appliance switch,
                as the fault may be in the appliance itself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you cannot switch off the supply</strong> — use a dry,
                non-conducting object to move the source away from the casualty or
                the casualty away from the source. Suitable materials include a dry
                wooden broom handle, a folded dry newspaper, or a dry rubber mat.
                Do not use anything damp, metal, or wet. Stand on a dry, insulating
                surface if possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High voltage — do not approach</strong> — if the source is high
                voltage (overhead power lines, railway electrification, substations),
                do not approach within 15 metres. Call 999 immediately and keep bystanders
                well back. Only approach when the relevant authority confirms the supply
                is isolated.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'call-999',
    heading: 'Call 999 — Always, for Every Electric Shock',
    content: (
      <>
        <p>
          Call 999 immediately for any electric shock, regardless of how the casualty
          appears. Do not delay calling because the person says they feel fine. Electric
          shock injuries include delayed effects that make immediate medical assessment
          essential for every case.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tell the emergency operator:</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>That the casualty has received an electric shock</li>
                  <li>Whether they are conscious and breathing</li>
                  <li>The exact location</li>
                  <li>Whether the supply has been isolated</li>
                  <li>Any visible injuries</li>
                </ul>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not hang up</strong> — the emergency operator will guide you
                through what to do while the ambulance is on its way. Follow their
                instructions exactly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>If a bystander is present</strong> — direct a specific person
                to call 999 while you begin first aid. Say: "You — call 999 now and
                tell them someone has had an electric shock at [address]." Giving a
                specific person the task ensures it is done.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cpr',
    heading: 'CPR If the Casualty Is Not Breathing',
    content: (
      <>
        <p>
          Once the casualty is away from the electrical source and you are certain you
          are not at risk of electrocution, check for response and breathing. If the
          casualty is unresponsive and not breathing normally, begin CPR immediately.
          Early CPR is the single most important factor in survival from cardiac arrest.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check for response</strong> — call their name and tap their
                shoulders firmly. If no response, shout for help.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open the airway</strong> — tilt the head back gently by placing
                one hand on the forehead and lifting the chin with two fingers. Look for
                no more than 10 seconds for normal breathing (normal breathing is not
                occasional gasps).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Start chest compressions</strong> — place the heel of one hand
                on the centre of the chest (lower half of the breastbone). Place your
                other hand on top and interlace your fingers. Press down 5 to 6 cm,
                keeping your arms straight. Compress at a rate of 100 to 120 per minute
                (the beat of "Stayin' Alive" by the Bee Gees is a useful guide).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rescue breaths (if trained)</strong> — after every 30 compressions,
                give 2 rescue breaths: pinch the nose, seal your lips over the casualty's
                mouth, and blow steadily for about 1 second. If you are not trained or
                not confident in rescue breaths, continue with compressions only — hands-only
                CPR is effective.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use an AED if available</strong> — Automated External Defibrillators
                (AEDs) are available in many public places. Send a bystander to find one
                while you continue CPR. Follow the AED's voice instructions exactly — they
                are designed to be used by untrained bystanders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continue until help arrives</strong> — do not stop CPR until a
                paramedic takes over, the casualty shows signs of life (normal breathing,
                movement), or you are physically unable to continue.
              </span>
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'low-vs-high-voltage',
    heading: 'Low Voltage vs High Voltage: How Severity Differs',
    content: (
      <>
        <p>
          The terms "low voltage" and "high voltage" have specific technical meanings, but the
          key point is: both can be fatal. Low voltage does not mean low risk.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Low voltage (up to 1,000V AC) — includes UK mains (230V)</strong>
                <p className="mt-1">
                  UK domestic mains electricity (230V, 50Hz AC) is fully capable of causing
                  cardiac arrest. The 50Hz frequency of UK mains is particularly dangerous
                  because it falls within the range most likely to induce ventricular
                  fibrillation. The path of current through the body is critical — hand-to-hand
                  or hand-to-foot paths passing through the chest carry the highest risk of
                  cardiac injury. Burns at the contact points may be visible but are not a
                  reliable guide to internal injury severity.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <strong>High voltage (above 1,000V AC) — power lines, railway, substations</strong>
                <p className="mt-1">
                  High-voltage shocks cause additional injury patterns not seen with domestic
                  voltages. The current travels through the body along the path of least
                  resistance (nerve sheaths, blood vessels), causing deep internal burns from
                  entry to exit point. Flash burns from the electrical arc can cause severe
                  surface burns even without direct contact. Tetanic muscle contraction may
                  cause fractures or joint dislocations from the violent involuntary movement.
                  Blast injuries from the arc explosion can occur. High-voltage injury is a
                  major trauma requiring specialist burns and surgical care.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'after-treatment',
    heading: 'After Treatment: Why Everyone Must See a Doctor',
    content: (
      <>
        <p>
          Anyone who has received an electric shock — even if they appear completely unharmed
          — must be assessed by a doctor. This is not optional.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal burns are not visible</strong> — current passing through
                the body can cause internal burns along blood vessels and nerves that
                cause no immediate pain or visible surface injury.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardiac monitoring is required</strong> — the heart's conduction
                system may have been disrupted without causing immediate arrest. An ECG
                (electrocardiogram) is needed to assess the heart rhythm. Abnormalities
                may not be immediately apparent and may require monitoring over several
                hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secondary injury from falls</strong> — electric shocks can cause
                violent involuntary muscle contraction and unconsciousness, leading to
                falls and impact injuries. Head injury from a fall must be assessed and
                ruled out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tetanic muscle contraction injuries</strong> — severe involuntary
                muscle contraction can be strong enough to cause fractures of the long
                bones or dislocations of major joints. These may not be immediately obvious
                in the post-shock confusion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Do not allow a shock casualty to drive themselves to hospital or to be left alone
          in the hours after an incident. They must be accompanied to Accident and Emergency
          or taken by ambulance.
        </p>
      </>
    ),
  },
  {
    id: 'delayed-effects',
    heading: 'Delayed Cardiac Arrhythmia: The Hidden Risk',
    content: (
      <>
        <p>
          One of the most serious and least-understood aspects of electric shock injury is
          the risk of delayed cardiac arrhythmia — abnormal heart rhythms that develop in
          the hours after the incident rather than immediately.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>What happens</strong> — the electrical current can cause temporary
                disruption to the heart's conduction system (the electrical signals that
                coordinate the heartbeat). The heart may continue to beat normally
                immediately after the shock, but the myocardium (heart muscle) may have
                been damaged or irritated sufficiently to trigger ventricular fibrillation
                or other dangerous arrhythmias hours later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documented time frame</strong> — delayed arrhythmias have been
                documented occurring up to 24 hours after the initial shock. The risk is
                highest in the first 12 hours. This is why medical protocols call for ECG
                monitoring for at least 12 to 24 hours for any significant shock exposure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning symptoms</strong> — anyone who has received an electric
                shock should seek immediate emergency attention if they develop any of the
                following in the hours after the incident: chest pain or tightness,
                palpitations (awareness of irregular or rapid heartbeat), dizziness or
                fainting, difficulty breathing, or confusion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This is why even a person who received a seemingly minor shock and feels fine
          immediately must be seen by a doctor. A brief ECG in A&amp;E and a period of
          monitoring can be life-saving.
        </p>
      </>
    ),
  },
  {
    id: 'prevention',
    heading: 'Prevention: Reducing the Risk of Electric Shock',
    content: (
      <>
        <p>
          The best electric shock first aid is never needing it. Most domestic electric
          shock incidents are preventable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test your RCD monthly</strong> — a functioning 30mA RCD can trip
                fast enough to prevent a fatal shock in many situations. Test by pressing
                the test button on your consumer unit monthly. See{' '}
                <SEOInternalLink href="/electrical-safety-at-home">
                  our home electrical safety guide
                </SEOInternalLink>{' '}
                for full testing instructions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use RCD-protected extension leads for power tools</strong> — when
                using power tools, always use an RCD-protected extension lead or a plug-in
                RCD adaptor rated at 30mA. See our guide on{' '}
                <SEOInternalLink href="/extension-lead-safety">
                  extension lead safety
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace damaged cables immediately</strong> — never use appliances
                with damaged leads. Replace flexes rather than wrapping them with tape.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Have your installation inspected regularly</strong> — an{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">
                  Electrical Installation Condition Report (EICR)
                </SEOInternalLink>{' '}
                every ten years for owner-occupied homes identifies hidden wiring faults
                before they cause accidents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Learn CPR</strong> — consider taking a first aid course that
                includes CPR. The British Red Cross and St John Ambulance offer courses
                throughout the UK. Knowing how to perform CPR could save a life.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Are you an electrician? Help keep UK homes electrically safe"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Start your 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricShockFirstAidPage() {
  return (
    <GuideTemplate
      title="Electric Shock First Aid UK | What to Do if Someone Gets an Electric Shock"
      description="Critical electric shock first aid guide for the UK. Do NOT touch the casualty — isolate supply first. Call 999, CPR if not breathing, low vs high voltage severity, why everyone must see a doctor, and delayed cardiac arrhythmia risk."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="First Aid Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Electric Shock First Aid UK:{' '}
          <span className="text-yellow-400">What to Do — and What Not to Do</span>
        </>
      }
      heroSubtitle="Life-critical guide to electric shock first aid in the UK. The most important rule: do NOT touch the casualty while they are in contact with the source. Isolate the supply first, call 999, and always ensure the casualty is seen by a doctor — even if they appear unharmed."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electric Shock First Aid"
      relatedPages={relatedPages}
      ctaHeading="Are You an Electrician? Complete EICRs Faster with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
