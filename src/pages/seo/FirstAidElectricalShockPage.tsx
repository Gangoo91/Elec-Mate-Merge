import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Heart,
  AlertTriangle,
  Zap,
  Phone,
  ShieldCheck,
  FileText,
  GraduationCap,
  ClipboardCheck,
  Shield,
  Activity,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-on-site' },
  { label: 'First Aid Electrical Shock', href: '/guides/first-aid-electrical-shock' },
];

const tocItems = [
  { id: 'danger-assessment', label: 'Danger Assessment' },
  { id: 'isolate-supply', label: 'Isolate the Supply' },
  { id: 'cpr-guidance', label: 'CPR and Rescue Breathing' },
  { id: 'burns-treatment', label: 'Burns Treatment' },
  { id: 'when-to-call-999', label: 'When to Call 999' },
  { id: 'riddor-reporting', label: 'RIDDOR Reporting' },
  { id: 'training-requirements', label: 'First Aid Training Requirements' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Never touch the casualty until you are certain the electrical supply has been isolated — you will become a second casualty.',
  'Call 999 immediately for any electrical shock incident, even if the person appears uninjured — internal injuries may not be visible.',
  'If the casualty is unresponsive and not breathing normally, begin CPR immediately and continue until the ambulance arrives.',
  'Electrical burns often have a small entry wound but can cause severe internal tissue damage — cool the burn with running water for at least 20 minutes.',
  'All electrical shock incidents on site must be reported under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013).',
];

const faqs = [
  {
    question: 'What should I do first if someone gets an electrical shock on site?',
    answer:
      'The very first thing you must do is ensure your own safety. Do not touch the casualty until you are certain the electrical supply has been disconnected. If the supply cannot be isolated, use a non-conductive object (such as a dry wooden broom handle, a dry rope, or a rubber mat) to separate the casualty from the source. Once the casualty is clear of the electrical source, call 999 immediately. Check for responsiveness — tap their shoulders and ask "Are you all right?" If they are unresponsive and not breathing normally, begin CPR immediately. Continue CPR until the ambulance arrives or the casualty starts breathing normally. Even if the person appears uninjured after the shock, they must still be assessed by a medical professional because internal injuries from electrical shock are not always immediately apparent.',
  },
  {
    question: 'Do I need to report an electrical shock under RIDDOR?',
    answer:
      'Yes. Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR), any injury caused by electrical shock or electrical burn that results in a person being incapacitated for more than 7 consecutive days, or which requires hospital treatment, must be reported to the Health and Safety Executive (HSE). Additionally, any dangerous occurrence involving electrical short circuit or overload attended by fire or explosion, or any loss of consciousness caused by electric shock, is reportable regardless of injury duration. For fatal injuries, the HSE must be notified immediately by telephone (0345 300 9923). Non-fatal reportable injuries must be reported online via the HSE RIDDOR reporting portal within 15 days. Failure to report under RIDDOR is a criminal offence.',
  },
  {
    question: 'How long should I cool an electrical burn for?',
    answer:
      'Cool the burn under gently running cool (not cold) water for at least 20 minutes. This is the guidance from the British Burns Association and NHS. Do not use ice, iced water, or any creams or greasy substances on the burn. After cooling, loosely cover the burn with cling film or a clean, non-fluffy dressing to protect the wound. Electrical burns are particularly deceptive because the visible surface burn may appear small (the entry and exit wounds), but the electric current can cause extensive damage to muscles, nerves, and blood vessels beneath the skin. This is why every electrical burn casualty must be assessed at hospital, regardless of how minor the surface injury appears.',
  },
  {
    question: 'Can a low voltage shock (230V) kill you?',
    answer:
      'Yes. The UK domestic supply voltage of 230V can and does kill. The severity of an electrical shock depends on the current flowing through the body, the path of the current (hand-to-hand through the heart is the most dangerous path), the duration of contact, and the skin resistance at the point of contact. Wet skin reduces resistance dramatically, allowing far more current to flow. As little as 30 milliamps (0.03A) of alternating current flowing through the heart for a few seconds can cause ventricular fibrillation (a life-threatening heart rhythm disorder). This is well within the range a 230V supply can deliver. Construction sites use 110V centre-tapped supplies specifically to reduce the risk — the maximum voltage to earth is 55V, significantly reducing the risk of a fatal shock.',
  },
  {
    question: 'What first aid qualifications should electricians hold?',
    answer:
      'As a minimum, all electricians working on site should hold a current first aid certificate. The Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate first aid arrangements. For construction sites, the recommended qualification is the Level 3 Award in First Aid at Work (FAW), which is a 3-day course covering a wide range of injuries and medical emergencies. For smaller sites, the Level 2 Award in Emergency First Aid at Work (EFAW) is the minimum — this is a 1-day course covering basic life-saving first aid. Both qualifications must be renewed every 3 years. Additionally, all electricians should receive specific training in dealing with electrical shock incidents, including how to safely isolate the supply and perform CPR. Elec-Mate offers first aid training courses that are specifically tailored to the risks electricians face on site.',
  },
  {
    question: 'Should I move someone who has received an electrical shock?',
    answer:
      'Only move the casualty if they are in continuing danger — for example, if the electrical source cannot be isolated and they remain in contact with it, or if there is a fire or structural collapse risk. If you must move them, do so using a non-conductive method (drag them by their clothing if dry, or use a dry rope). If the casualty is not in continuing danger, do not move them — particularly if they are unconscious. Moving an unconscious casualty without proper technique can worsen spinal or internal injuries. If the casualty is unconscious but breathing normally, place them in the recovery position (on their side with their airway open) and wait for the ambulance. If they are not breathing, begin CPR where they are.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-safety-on-site',
    title: 'Electrical Safety on Site',
    description:
      'Complete guide to managing electrical risks on construction sites including 110V systems and permit to work.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation procedure with GS38 probe requirements and lock-off protocols.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description:
      'How to write and use risk assessments for electrical work including shock and burn hazards.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/near-miss-reporting',
    title: 'Near Miss Reporting',
    description:
      'Why reporting near misses prevents serious incidents and how to build a reporting culture.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description:
      'Essential personal protective equipment for electrical work including arc flash protection.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/toolbox-talks-electrical',
    title: 'Toolbox Talks for Electricians',
    description:
      'Ready-made toolbox talk topics and templates including electrical shock first aid.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'danger-assessment',
    heading: 'Step 1: Danger Assessment — Protect Yourself First',
    content: (
      <>
        <p>
          When you find a colleague who has received an electrical shock, your first instinct will
          be to rush to help. Resist that instinct. The single most important rule in electrical
          shock first aid is to protect yourself before you touch the casualty. If the electrical
          supply is still live and the casualty is still in contact with it, touching them will make
          you a second casualty.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stop and assess.</strong> Look at the scene before you approach. Is there
                visible arcing? Is the casualty still in contact with a conductor? Is there water on
                the floor? Are there damaged cables?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not touch the casualty</strong> until you are certain the supply has been
                disconnected. Even if they appear to be free of the source, residual charge or a
                second fault could still present a danger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call for help.</strong> Shout for assistance so that someone else can
                isolate the supply while you prepare to provide first aid.
              </span>
            </li>
          </ul>
        </div>
        <p>
          On a construction site, you should already know the location of the nearest isolation
          point for every temporary supply. This is covered during site induction and should be part
          of your{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">
            risk assessment
          </SEOInternalLink>{' '}
          for every job. If you do not know where the isolation point is, you have already failed at
          the planning stage.
        </p>
      </>
    ),
  },
  {
    id: 'isolate-supply',
    heading: 'Step 2: Isolate the Supply',
    content: (
      <>
        <p>
          Isolating the electrical supply is the critical step that makes the scene safe for both
          you and the casualty. There are several ways to do this, depending on the situation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch off at the distribution board or isolator.</strong> This is the
                preferred method. If you can reach the DB or isolator safely, switch off the
                relevant circuit or the main switch. Use your{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedure
                </SEOInternalLink>{' '}
                — prove dead before touching any conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unplug the equipment.</strong> If the shock is from a portable appliance,
                pull the plug from the socket — but only if you can do so without touching the
                casualty or the wet/damaged equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a non-conductive object.</strong> If the supply cannot be isolated
                quickly, use a dry wooden broom handle, a dry rope, or a rubber mat to separate the
                casualty from the source. Never use anything wet or metallic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High voltage incidents.</strong> If the shock involves high voltage (above
                1000V AC), do not approach. Call 999 and the electricity network operator
                immediately. Maintain a safe distance of at least 5 metres. Only trained high
                voltage authorised persons should approach HV equipment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Once the supply is confirmed isolated, you can safely approach the casualty. Time is
          critical — every second counts if the casualty is in cardiac arrest.
        </p>
      </>
    ),
  },
  {
    id: 'cpr-guidance',
    heading: 'Step 3: CPR and Rescue Breathing',
    content: (
      <>
        <p>
          Electrical shock can cause cardiac arrest (the heart stops beating) or ventricular
          fibrillation (the heart beats erratically and cannot pump blood). Either condition is
          immediately life-threatening. CPR (Cardiopulmonary Resuscitation) is the single most
          important intervention you can provide while waiting for the ambulance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Check for responsiveness.</strong> Tap the casualty on the shoulders and shout
              "Are you all right?" If there is no response, they are unresponsive.
            </li>
            <li>
              <strong>Open the airway.</strong> Tilt the head back gently by lifting the chin with
              two fingers. This prevents the tongue from blocking the airway.
            </li>
            <li>
              <strong>Check for normal breathing.</strong> Look, listen, and feel for normal
              breathing for up to 10 seconds. Occasional gasps are not normal breathing.
            </li>
            <li>
              <strong>Call 999.</strong> If the casualty is not breathing normally, call 999
              immediately (or get someone else to call). Ask for a defibrillator (AED) to be brought
              if one is available on site.
            </li>
            <li>
              <strong>Begin chest compressions.</strong> Place the heel of one hand on the centre of
              the chest (on the breastbone). Place your other hand on top and interlock your
              fingers. Push hard and fast — compress the chest by 5 to 6 cm at a rate of 100 to 120
              compressions per minute. Allow the chest to fully recoil between compressions.
            </li>
            <li>
              <strong>Give rescue breaths.</strong> After 30 compressions, tilt the head back, lift
              the chin, pinch the nose, and give 2 rescue breaths. Each breath should last about 1
              second and make the chest rise. If you are not trained or not confident giving rescue
              breaths, continuous chest compressions alone are still effective.
            </li>
            <li>
              <strong>Continue the cycle:</strong> 30 compressions, 2 breaths. Do not stop until the
              ambulance arrives, the casualty starts breathing normally, or you are physically
              unable to continue.
            </li>
          </ol>
        </div>
        <p>
          If an automated external defibrillator (AED) is available, use it as soon as possible.
          AEDs are designed to be used by anyone — the device gives voice instructions and will only
          deliver a shock if the heart rhythm requires it. Every construction site with more than 25
          workers should have an AED readily available.
        </p>
        <SEOAppBridge
          title="First aid training courses on Elec-Mate"
          description="Complete your first aid at work qualification through the Elec-Mate study centre. Courses cover CPR, AED use, electrical shock response, and burns treatment — all tailored specifically for electricians working on site."
          icon={Heart}
        />
      </>
    ),
  },
  {
    id: 'burns-treatment',
    heading: 'Step 4: Treating Electrical Burns',
    content: (
      <>
        <p>
          Electrical burns are different from thermal burns. The electric current enters the body at
          one point (the entry wound) and exits at another (the exit wound), causing damage to all
          tissues in between. The surface burns may appear small, but the internal damage can be
          extensive — muscles, nerves, blood vessels, and organs along the current path can all be
          affected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cool the burn under running water</strong> for at least 20 minutes. Use cool
                (not cold) water. Do not use ice or iced water as this can cause further tissue
                damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remove clothing and jewellery</strong> near the burn, but only if they are
                not stuck to the skin. Do not pull off anything that is adhered to the burn.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cover with cling film.</strong> After cooling, loosely cover the burn with
                cling film (laid over the burn, not wrapped around the limb) or a clean, non-fluffy
                dressing. This protects the wound and reduces pain from air exposure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not apply creams, gels, or butter.</strong> These do not help and can
                make medical assessment more difficult. Do not burst any blisters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All electrical burn casualties must go to hospital.</strong> Even if the
                surface burn looks minor, the internal damage may be significant. The casualty needs
                medical assessment including blood tests and cardiac monitoring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Arc flash burns are a separate category — they are thermal burns caused by the extreme
          heat of an electrical arc (which can reach temperatures of 20,000°C). Arc flash burns are
          treated the same way as any thermal burn: cool with water, cover, and get to hospital. The
          key difference is that arc flash can also cause blast injuries, hearing damage, and eye
          injuries from the intense UV light. This is why{' '}
          <SEOInternalLink href="/guides/ppe-for-electricians">
            appropriate PPE including arc-rated clothing
          </SEOInternalLink>{' '}
          is essential for any work where arc flash is a foreseeable risk.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-call-999',
    heading: 'When to Call 999',
    content: (
      <>
        <p>
          The short answer is: always. Every electrical shock incident warrants a 999 call. Even if
          the casualty appears uninjured and feels fine, the effects of electric current passing
          through the body can be delayed. Cardiac arrhythmias can develop hours after the initial
          shock.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call 999 immediately if:</strong> the casualty is unconscious, not
                breathing, has visible burns, was thrown by the shock, was in contact with high
                voltage, or was in contact with the source for more than a few seconds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call 999 even if the casualty seems fine.</strong> Electrical current
                passing through the body can cause internal injuries that are not immediately
                apparent. Cardiac monitoring for at least 24 hours is recommended after any
                significant electrical shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Information for the 999 operator:</strong> Tell them it is an electrical
                shock incident, the voltage involved (230V, 400V, 110V, HV), whether the supply has
                been isolated, whether the casualty is breathing, and your exact location including
                postcode or what3words if on a construction site.
              </span>
            </li>
          </ul>
        </div>
        <p>
          On construction sites, the site emergency plan should include the location of the nearest
          A&E department, the site access route for ambulances, and the designated meeting point for
          emergency services. This information should be covered in the site induction and displayed
          on the site safety board.
        </p>
      </>
    ),
  },
  {
    id: 'riddor-reporting',
    heading: 'RIDDOR Reporting for Electrical Shock Incidents',
    content: (
      <>
        <p>
          The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR)
          require certain workplace incidents to be reported to the Health and Safety Executive
          (HSE). Electrical shock incidents fall squarely within the scope of RIDDOR.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fatal injuries:</strong> Must be reported to the HSE immediately by
                telephone (0345 300 9923), followed by an online report within 10 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specified injuries:</strong> Loss of consciousness caused by electric shock
                is a specified injury and must be reported online within 10 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Over-7-day incapacitation:</strong> If the casualty cannot work for more
                than 7 consecutive days as a result of the injury, the incident must be reported
                online within 15 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dangerous occurrences:</strong> Electrical short circuit or overload
                attended by fire or explosion is a dangerous occurrence and must be reported
                regardless of whether anyone was injured.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Beyond the legal requirement, recording and investigating every electrical shock incident
          (including minor ones that do not meet the RIDDOR threshold) is essential for preventing
          future incidents. A{' '}
          <SEOInternalLink href="/guides/near-miss-reporting">
            near miss reporting system
          </SEOInternalLink>{' '}
          captures the incidents that did not result in injury but easily could have. Every near
          miss is a free lesson.
        </p>
        <SEOAppBridge
          title="Generate RIDDOR-ready incident reports with Elec-Mate"
          description="Elec-Mate's AI Health and Safety agent helps you document incidents, generate risk assessments, and create RIDDOR-compliant reports. Record what happened, when, and why — directly from your phone on site."
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'training-requirements',
    heading: 'First Aid Training Requirements for Electricians',
    content: (
      <>
        <p>
          The Health and Safety (First-Aid) Regulations 1981 require every employer to provide
          adequate and appropriate first aid equipment, facilities, and personnel. For electricians
          working on construction sites, this means having trained first aiders available and
          ensuring all workers know the basics of emergency response.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency First Aid at Work (EFAW):</strong> A 1-day course covering basic
                life-saving first aid. This is the minimum qualification for most workers. Valid for
                3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First Aid at Work (FAW):</strong> A 3-day course covering a comprehensive
                range of injuries and medical emergencies. Required for designated first aiders on
                construction sites. Valid for 3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical shock-specific training:</strong> All electricians should receive
                additional training on recognising electrical shock, safe approach procedures,
                supply isolation, and CPR techniques. This can be delivered as part of a{' '}
                <SEOInternalLink href="/guides/toolbox-talks-electrical">
                  toolbox talk
                </SEOInternalLink>{' '}
                or a dedicated training session.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AED training:</strong> Automated External Defibrillator training is
                increasingly included in first aid courses and is highly recommended for anyone
                working in environments where electrical shock is a foreseeable risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate offers a range of training courses through the study centre, including first
          aid,{' '}
          <SEOInternalLink href="/guides/manual-handling-course">manual handling</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/pasma-training">PASMA</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/ipaf-training">IPAF</SEOInternalLink>, working at height,
          and asbestos awareness. All courses are designed for electricians and can be completed on
          your phone between jobs.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FirstAidElectricalShockPage() {
  return (
    <GuideTemplate
      title="First Aid for Electrical Shock | Emergency Response"
      description="Emergency first aid guide for electrical shock incidents. Covers danger assessment, supply isolation, CPR, burns treatment, when to call 999, and RIDDOR reporting requirements for UK electricians."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Heart}
      heroTitle={
        <>
          First Aid for Electrical Shock:{' '}
          <span className="text-yellow-400">Emergency Response That Saves Lives</span>
        </>
      }
      heroSubtitle="Knowing how to respond in the first 60 seconds after an electrical shock incident can be the difference between life and death. This guide covers the complete emergency response procedure: danger assessment, supply isolation, CPR, burns treatment, calling 999, and RIDDOR reporting."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About First Aid for Electrical Shock"
      relatedPages={relatedPages}
      ctaHeading="Safety Training Built for Electricians"
      ctaSubheading="Access first aid courses, risk assessment tools, RAMS generation, and AI-powered health and safety support — all from your phone. 7-day free trial, cancel anytime."
    />
  );
}
