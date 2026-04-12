import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Heart,
  Phone,
  Zap,
  FileCheck2,
  Lock,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Health & Safety', href: '/guides/electrical-safety-at-home' },
  { label: 'Electrical Rescue Procedure', href: '/electrical-rescue-procedure' },
];

const tocItems = [
  { id: 'do-not-touch', label: 'Do NOT Touch the Casualty First' },
  { id: 'isolate-supply', label: 'How to Isolate the Supply Safely' },
  { id: 'call-999', label: 'Calling 999' },
  { id: 'cpr', label: 'CPR After Electric Shock' },
  { id: 'burn-treatment', label: 'Burn Treatment' },
  { id: 'entry-exit-wounds', label: 'Entry and Exit Wounds' },
  { id: 'voltage-lethality', label: 'Low vs High Voltage — When Can Each Kill?' },
  { id: 'first-aid-training', label: 'First Aid Training' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'NEVER touch someone who appears to be in contact with a live electrical source. You will become a second casualty. Isolate the power supply first — or use a non-conductive object to separate the casualty from the source if isolation is not immediately possible.',
  'After isolating the supply, call 999 immediately. Electric shock can cause cardiac arrest with no external symptoms — always treat as a medical emergency even if the casualty appears conscious.',
  'CPR should be started immediately if the casualty is unresponsive and not breathing normally. Electric shock causes ventricular fibrillation (VF) — the heart is in chaotic rhythm rather than stopped. An AED (automated external defibrillator) is the definitive treatment for VF. Commence CPR and send someone to find an AED.',
  'Electric current enters and exits the body, causing damage along its path. Look for both an entry wound (where current entered, often charred or depressed) and an exit wound (where current left the body, often explosive in appearance). Both require medical treatment.',
  'Household 230V AC can kill. The threshold for ventricular fibrillation is approximately 100mA through the heart — far below what a standard domestic circuit can deliver. Never underestimate low-voltage shock.',
];

const faqs = [
  {
    question: 'What is the first thing to do if someone receives an electric shock?',
    answer:
      'Do not touch the casualty until you are certain the electrical supply has been isolated. If you touch someone who is still in contact with a live electrical source, the current will pass through you and you will become a second casualty. Switch off the power at the consumer unit, isolator, or plug socket. If you cannot reach the power supply, use a dry non-conductive object (a wooden broom handle, a folded dry blanket, a rubber mat) to push the casualty away from the source — never use anything metal or wet. Only when you are certain the source is isolated should you approach the casualty.',
  },
  {
    question: 'How do I isolate the supply in an emergency?',
    answer:
      'In a domestic property, switch off the main switch at the consumer unit (the large switch at the top of the fuseboard). If you cannot reach the consumer unit, remove the plug from the socket if it is accessible. For electrical equipment plugged in, pull out the plug. Do not pull cables — they may be damaged. On a construction site, operate the site isolation switch or the nearest isolator. For high-voltage systems (overhead lines, substations), do not attempt to isolate — contact the network operator (National Grid, local DNO) or emergency services. Stand well back and keep others away.',
  },
  {
    question: 'Should I start CPR on someone who has had an electric shock?',
    answer:
      'Yes, if the casualty is unresponsive and not breathing normally, begin CPR immediately after confirming the electrical supply is isolated. Do not delay CPR to wait for an ambulance. Electric shock commonly causes ventricular fibrillation (VF) — a chaotic heart rhythm that prevents the heart from pumping blood. Without CPR, the brain begins to suffer irreversible damage within 4 to 6 minutes. CPR keeps blood circulating until an AED can deliver a shock to restore normal heart rhythm. Send someone else to call 999 and find an AED while you begin CPR. Thirty chest compressions followed by two rescue breaths — continue until the AED arrives or the casualty starts breathing normally.',
  },
  {
    question: 'Can 230V household electricity kill you?',
    answer:
      'Yes. The widely cited minimum lethal current through the heart is approximately 100mA — a tenth of an ampere. UK domestic circuits are protected by 32A breakers on ring main circuits and 6A or 16A on lighting and dedicated circuits. Even at skin contact resistance of 1,000 ohms (which is typical for dry skin contact), 230V produces 230mA — more than enough to cause ventricular fibrillation. Wet or broken skin dramatically reduces resistance, increasing current further. The duration of shock also matters — brief contacts may cause burns and muscle contraction without cardiac effects; prolonged contacts are more likely to cause VF. Never assume low voltage is safe.',
  },
  {
    question: 'What are entry and exit wounds from electric shock?',
    answer:
      'When current passes through the body, it enters at one point and exits at another. The entry wound is typically where the current first contacts the skin — often the hand or fingers. It may appear as a charred, grey, or depressed area. The exit wound is where the current leaves the body, often through the feet (to ground). Exit wounds are often more dramatic — the rapid vaporisation of tissue can cause an explosive appearance. Both wounds require hospital treatment. There is also internal damage along the path of the current — muscle necrosis, nerve damage, and cardiac injury may not be immediately visible.',
  },
  {
    question: 'How should I treat electrical burns at the scene?',
    answer:
      'Cool the burn with cool running water for 20 minutes. Do not use ice, ice-cold water, butter, toothpaste, or any other home remedy. Cover with a clean non-fluffy dressing or cling film (not wrapped tightly). Do not remove clothing that is stuck to the burn. Do not burst blisters. All electrical burns require hospital assessment, even if they appear minor — the extent of internal damage is not visible from the surface wound. While treating burns, continue to monitor the casualty for signs of cardiac arrest and be prepared to begin CPR.',
  },
  {
    question: 'Is first aid training compulsory for electricians?',
    answer:
      'The Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate and appropriate first aid equipment, facilities, and personnel for their employees. For electrical contractors, this typically means at least one first aider on site and an appropriate first aid kit. The Management of Health and Safety at Work Regulations 1999 require employers to carry out a risk assessment identifying first aid needs. While specific first aid training is not mandated by name in the Electricity at Work Regulations 1989, the Construction (Design and Management) Regulations 2015 and many client site rules require first aid trained personnel on all construction sites. All practising electricians should hold at minimum a valid Emergency First Aid at Work (EFAW) certificate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/lockout-tagout-guide',
    title: 'Lockout Tagout Guide',
    description: 'Safe isolation procedures to prevent electric shock — LOTO and Electricity at Work Regulations 1989.',
    icon: Lock,
    category: 'Safety',
  },
  {
    href: '/insulated-tools-guide',
    title: 'Insulated Tools Guide',
    description: 'IEC 60900 rated tools for electricians — required PPE for live work.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-accident-reporting',
    title: 'Accident Reporting Guide',
    description: 'RIDDOR 2013 reporting for electrical accidents, injuries, and near misses.',
    icon: FileCheck2,
    category: 'Safety',
  },
  {
    href: '/electrical-fire-safety',
    title: 'Electrical Fire Safety',
    description: 'Preventing electrical fires and what to do if one starts.',
    icon: AlertTriangle,
    category: 'Safety',
  },
  {
    href: '/rams-generator',
    title: 'RAMS Generator',
    description: 'Generate site-specific risk assessments including electrical emergency procedures.',
    icon: HardHat,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'do-not-touch',
    heading: 'CRITICAL: Do NOT Touch the Casualty Until the Supply Is Isolated',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/20 border border-red-500/40 p-6 my-4">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white font-bold text-lg">
              If someone appears to be in contact with a live electrical source, touching them
              will pass current through you. You will become a second casualty.
            </p>
          </div>
          <p className="text-white">
            This is the most important rule in electrical rescue. The instinct to help someone
            in distress is powerful — but reaching out to grab a casualty who is still connected
            to a live electrical source is one of the most common ways rescuers are killed.
            Control that instinct. Isolate first.
          </p>
        </div>
        <p>
          Signs that a casualty may still be in contact with a live electrical source include:
          visible sparking, the casualty gripping or frozen to a conductor (muscle tetanus caused
          by AC current at power frequency can lock the hand around a live conductor), smoke or
          burning from the point of contact, or the casualty being unable to release their grip.
        </p>
        <p>
          If the casualty is clearly no longer in contact with the source and the source has been
          confirmed isolated, approach and begin assessment. But if there is any doubt — isolate
          first.
        </p>
      </>
    ),
  },
  {
    id: 'isolate-supply',
    heading: 'How to Isolate the Supply Safely',
    content: (
      <>
        <p>
          Isolating the electrical supply is the first action in any electrical rescue. How you
          do this depends on the type of electrical system and the environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">1</span>
              <span>
                <strong>Domestic property</strong> — switch off the main switch at the consumer
                unit (the large isolating switch at the top of the fuseboard). If a specific
                circuit is involved and you know which breaker controls it, switch that off
                as well. Pull out the plug if the item is plug-connected and the plug is
                accessible without touching the casualty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">2</span>
              <span>
                <strong>Construction site or commercial premises</strong> — use the site emergency
                stop or main isolator. These are typically clearly labelled and brightly coloured.
                On construction sites, the main isolator is usually located at the site distribution
                board or the temporary supply intake.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">3</span>
              <span>
                <strong>Cannot reach the isolation point</strong> — if the isolation point is
                inaccessible, use a dry non-conductive object to push the casualty away from
                the source. A wooden broom handle, a dry rope, a folded dry blanket, or a rubber
                mat can be used. NEVER use anything metal, wet, or damp. Push the casualty away —
                do not pull them towards you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">4</span>
              <span>
                <strong>High voltage systems</strong> — do NOT attempt to isolate high-voltage
                overhead lines or substation equipment. Stand well back (at least 15 metres from
                any fallen overhead line), keep others away, call 999, and wait for the network
                operator. Only authorised engineers with specialist equipment can safely isolate
                HV systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'call-999',
    heading: 'Calling 999 — Always Treat as a Medical Emergency',
    content: (
      <>
        <p>
          Call 999 immediately after isolating the supply — even if the casualty appears
          conscious and uninjured. Electric shock causes internal injuries that are not
          immediately visible, including cardiac arrhythmias that can develop minutes or
          hours after the shock.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to tell the 999 operator</strong> — state that this is an electrical
                injury, give the exact location, state how many casualties there are, describe the
                casualty's current condition (conscious/unconscious, breathing/not breathing), and
                confirm that the electrical supply has been isolated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not leave the casualty</strong> — once on the phone, follow the
                operator's instructions. If another person is present, send them to guide the
                ambulance and locate an AED. Stay with the casualty and monitor their condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>All electric shock casualties must go to hospital</strong> — even if the
                casualty refuses or says they feel fine. Cardiac arrhythmias, rhabdomyolysis
                (muscle breakdown), and internal burns can present with delayed symptoms. Paramedics
                will carry out an ECG on scene and transport for further monitoring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cpr',
    heading: 'CPR for Cardiac Arrest After Electric Shock',
    content: (
      <>
        <p>
          Electric shock commonly causes ventricular fibrillation (VF) — the heart goes into a
          rapid, chaotic rhythm that does not pump blood. VF is the leading cause of death from
          electric shock. CPR and an AED are the definitive treatments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check for response</strong> — shake the casualty's shoulders and call
                loudly "Are you all right?" If no response, shout for help and call 999 (or
                direct someone to call). Open the airway by tilting the head back and lifting
                the chin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check for normal breathing</strong> — look, listen, and feel for no
                more than 10 seconds. Occasional gasps (agonal breathing) do not count as normal
                breathing. If in any doubt — begin CPR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30 chest compressions</strong> — place the heel of your hand on the
                centre of the chest. Place your other hand on top and interlace your fingers.
                Push down hard and fast — at least 5cm deep, at a rate of 100 to 120 per minute.
                Allow the chest to fully recoil between compressions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>2 rescue breaths</strong> — tilt the head back, lift the chin, pinch the
                nose, seal your mouth over theirs, and breathe steadily for about one second until
                the chest rises. Two breaths, then return to 30 compressions. If you are untrained
                or unwilling to give rescue breaths, hands-only CPR (compressions only) is better
                than no CPR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>AED as soon as possible</strong> — an automated external defibrillator
                delivers a controlled electric shock that can restore normal heart rhythm from VF.
                Many public buildings carry AEDs. Send someone to find the nearest one while CPR
                continues. The AED will guide you with voice instructions — follow them exactly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Continue CPR without stopping until paramedics take over, the casualty starts breathing
          normally, or you are physically unable to continue.
        </p>
      </>
    ),
  },
  {
    id: 'burn-treatment',
    heading: 'Burn Treatment at the Scene',
    content: (
      <>
        <p>
          Electric shock causes burns at the points of entry and exit, and can cause internal
          thermal burns along the path of the current. Flash burns from electrical arcing can
          also cause severe surface burns to exposed skin.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cool with running water for 20 minutes</strong> — use cool (not cold)
                running water. Start cooling as soon as possible — ideally within 3 minutes of
                the burn occurring. Cooling is effective for up to 3 hours after the burn.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cover with cling film or a clean dressing</strong> — after cooling, cover
                loosely with non-fluffy cling film or a clean non-adhesive dressing. Do not wrap
                tightly — burns swell. Do not use ice, butter, toothpaste, or any home remedy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not remove stuck clothing</strong> — if clothing is adhered to burned
                skin, do not attempt to remove it. Cut around the area if possible. Leave removal
                to medical professionals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>All electrical burns require hospital treatment</strong> — the surface
                wound does not reflect internal damage. Even a small entry wound may mask
                extensive internal muscle and nerve damage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'entry-exit-wounds',
    heading: 'Entry and Exit Wounds',
    content: (
      <>
        <p>
          Understanding the nature of electrical wounds helps you communicate effectively with
          the 999 operator and paramedics, and ensures that both injuries are treated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Entry wound</strong> — typically located on the hand or fingers where the
                casualty made contact with the live conductor. Often appears as a charred, grey,
                or punched-out wound. May be relatively small, particularly from low-voltage DC
                sources. On AC systems, the entry point may show a dry, parchment-like appearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exit wound</strong> — typically located on the foot, heel, or wherever
                the current completed its path to earth. Exit wounds are often more severe than
                entry wounds — the rapid vaporisation of body fluids causes an explosive
                appearance. Shoes and socks may be blown off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal damage along the current path</strong> — muscles, nerves, and
                blood vessels along the path between entry and exit are damaged by the current.
                This damage (particularly muscle necrosis or rhabdomyolysis) may not be
                immediately apparent and can cause life-threatening kidney failure days later.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When giving information to paramedics, tell them both wound locations. This helps them
          understand the likely path of the current and the organs at risk.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-lethality',
    heading: 'Low Voltage vs High Voltage — When Can Each Kill?',
    content: (
      <>
        <p>
          A common and dangerous misconception is that low-voltage electricity (230V or 400V) is
          not as dangerous as high voltage. In practice, low-voltage electricity kills many people
          in the UK every year.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low voltage (below 1,000V AC)</strong> — the threshold for ventricular
                fibrillation is approximately 100mA. UK domestic 230V circuits can deliver far
                more than 100mA through the body, even accounting for skin resistance. AC at 50Hz
                (UK mains frequency) is particularly dangerous because it causes muscle tetanus
                (sustained contraction), preventing the casualty from releasing their grip on a
                live conductor and prolonging the contact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High voltage (above 1,000V AC)</strong> — high-voltage contacts cause
                immediate and severe burns, arc flash injuries, and blast injuries in addition to
                cardiac effects. The arc from a high-voltage flashover can extend across several
                metres — you do not need to touch HV equipment to be injured by it. HV contacts
                are more likely to cause cardiac arrest from the direct thermal effect on the heart
                rather than VF. Survival rates for HV contacts are lower than LV contacts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wet conditions</strong> — water dramatically reduces skin resistance and
                increases current for a given voltage. A 230V shock in dry conditions that causes
                a painful muscle contraction may cause cardiac arrest in wet conditions. Working
                around electrical equipment in the rain, in bathrooms, or in areas with standing
                water significantly increases the risk of electrocution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'first-aid-training',
    heading: 'First Aid Training — Why It Is Essential for Electricians',
    content: (
      <>
        <p>
          Electrical accidents happen quickly and without warning. Bystanders and colleagues
          at the scene have the best chance of saving a casualty's life — but only if they are
          trained. Every electrician should hold a valid first aid certificate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency First Aid at Work (EFAW)</strong> — one-day course covering
                CPR, AED use, management of unconscious casualties, burns, wounds, and shock.
                Valid for three years. This is the minimum recommended qualification for all
                electricians, particularly sole traders working alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>First Aid at Work (FAW)</strong> — three-day course (or equivalent blended
                learning). Required for designated first aiders on larger sites. Covers a broader
                range of medical emergencies and is the standard required by many principal
                contractors on construction sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>AED training</strong> — modern AEDs are designed to be used by untrained
                bystanders, but formal training in their use builds confidence. Many first aid
                courses include AED practical sessions. Know where the nearest AED is located
                on every site you work on.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Include rescue procedures in your site RAMS"
          description="Elec-Mate's AI RAMS generator creates site-specific risk assessments and method statements that include electrical emergency procedures, rescue plans, and first aid arrangements. Compliant with UK regulations. 7-day free trial."
          icon={Heart}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Emergency Procedure Documentation',
    content: (
      <>
        <p>
          Your RAMS (Risk Assessment and Method Statement) must include an electrical emergency
          procedure for every project. This documents what to do in the event of an electric
          shock, who the first aider is, where the nearest AED is located, and how the electrical
          supply can be isolated in an emergency.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Generate Site RAMS with Emergency Procedures</h4>
              <p className="text-white text-sm leading-relaxed">
                Use the{' '}
                <SEOInternalLink href="/rams-generator">
                  Elec-Mate RAMS generator
                </SEOInternalLink>{' '}
                to create site-specific risk assessments that include electrical emergency rescue
                procedures, first aid arrangements, and isolation point identification. Ready for
                site in minutes and compliant with UK health and safety regulations.
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

export default function ElectricalRescueProcedurePage() {
  return (
    <GuideTemplate
      title="Electrical Rescue Procedure UK | Electric Shock First Aid Guide"
      description="UK electrical rescue procedure guide — do not touch the casualty, isolate the supply, call 999, CPR for electric shock, burn treatment, entry and exit wounds, and first aid training requirements for electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Critical"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Electrical Rescue Procedure UK:{' '}
          <span className="text-yellow-400">Electric Shock First Aid</span>
        </>
      }
      heroSubtitle="Life-saving guidance for responding to electrical accidents — safe isolation before touching the casualty, calling 999, CPR and AED use after electric shock, burn treatment, entry and exit wounds, and why all electricians need first aid training."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Rescue"
      relatedPages={relatedPages}
      ctaHeading="Include Emergency Procedures in Your Site RAMS"
      ctaSubheading="Elec-Mate's AI RAMS generator creates site-specific risk assessments with electrical emergency rescue procedures and first aid arrangements. Compliant with UK regulations. 7-day free trial."
    />
  );
}
