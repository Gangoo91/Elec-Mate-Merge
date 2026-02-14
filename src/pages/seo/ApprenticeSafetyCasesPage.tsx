import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Heart,
  Zap,
  GraduationCap,
  ClipboardCheck,
  FileText,
  HardHat,
  Eye,
  Target,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Safety Cases for Apprentices', href: '/guides/apprentice-safety-cases' },
];

const tocItems = [
  { id: 'why-safety-cases-matter', label: 'Why Safety Cases Matter' },
  { id: 'real-world-scenarios', label: 'Real-World Safety Scenarios' },
  { id: 'near-miss-learning', label: 'Learning from Near Misses' },
  { id: 'safe-isolation-beginners', label: 'Safe Isolation for Beginners' },
  { id: 'reporting-incidents', label: 'Reporting Incidents Correctly' },
  { id: 'ppe-and-hazard-awareness', label: 'PPE and Hazard Awareness' },
  { id: 'building-a-safety-mindset', label: 'Building a Safety Mindset' },
  { id: 'elecmate-safety', label: 'Safety Training with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrical work is one of the most dangerous trades in the UK. Every year, apprentices and qualified electricians suffer electric shocks, burns, and falls that could have been prevented with proper safety awareness and adherence to procedures.',
  'Near misses are free lessons. Every near miss that is reported, documented, and discussed prevents a future accident. Apprentices who develop the habit of reporting near misses from day one build a safety-first mindset that protects them for their entire career.',
  'Safe isolation is the single most important safety procedure you will learn. The prove-test-prove method using a voltage indicator and proving unit must become automatic — you do it every time, without exception, before touching any circuit.',
  'Incident reporting is not about blame. It is about learning. The Electricity at Work Regulations 1989, the Health and Safety at Work Act 1974, and BS 7671 all require that incidents and dangerous occurrences are reported so that preventive measures can be implemented.',
  'Elec-Mate includes safe isolation training, health and safety courses, risk assessment guidance, and a near miss reporting framework — all designed to build genuine safety competence from your first day on site.',
];

const faqs = [
  {
    question: 'What should I do if I see something unsafe on site?',
    answer:
      'Stop what you are doing and assess whether there is an immediate danger to anyone. If there is, warn people in the area and remove them from danger if it is safe to do so. Then report the hazard to your supervisor or site manager immediately. Do not attempt to fix the hazard yourself unless you are competent and authorised to do so. Every site should have a reporting procedure — verbal reports to your supervisor for immediate hazards, written near miss reports for documentation. Under the Health and Safety at Work Act 1974, you have a legal duty to report hazards, and you cannot be punished or dismissed for doing so. If you feel your concern is not being taken seriously, escalate to the principal contractor, your training provider, or the HSE directly.',
  },
  {
    question: 'Can I refuse to do work I think is unsafe?',
    answer:
      'Yes. Under the Health and Safety at Work Act 1974, every worker — including apprentices — has the right to refuse work they reasonably believe poses a serious and imminent danger. You cannot be dismissed or disciplined for refusing unsafe work. If you are asked to work on a live circuit without justification, work at height without proper equipment, enter a confined space without training, or carry out any task you are not competent or trained to do safely, you should refuse and explain your concern to your supervisor. If your supervisor disagrees, escalate to the site manager, your employer, or your training provider. Legitimate safety concerns are always taken seriously by responsible employers.',
  },
  {
    question: 'What is the most common cause of electrical accidents for apprentices?',
    answer:
      'Contact with live conductors due to failure to isolate is the most common cause of electrical accidents involving apprentices. This happens when an apprentice assumes a circuit is dead without verifying it, when isolation is carried out incorrectly or incompletely, when someone else re-energises a circuit that was isolated, or when an apprentice works on a circuit adjacent to a live circuit without adequate precautions. The safe isolation procedure — prove the voltage indicator works, test for voltage, prove the indicator still works — prevents these incidents. Lock-off procedures prevent re-energisation. Adequate PPE provides a final layer of protection. Every one of these controls must be applied every time.',
  },
  {
    question: 'What PPE should I wear as an electrical apprentice?',
    answer:
      'The PPE you need depends on the site and the task. On construction sites, the minimum is usually safety boots (with toe and midsole protection), a hard hat, high-visibility vest or jacket, safety glasses or goggles, and gloves appropriate to the task. When working near or on electrical equipment, you should wear insulated gloves rated to the appropriate voltage, safety glasses or a face shield (especially when testing), and flame-resistant clothing if there is a risk of arc flash. Your employer must provide PPE appropriate to the risks you face — this is a legal requirement under the Personal Protective Equipment at Work Regulations 1992. Ask your supervisor what PPE is required for each task and wear it every time.',
  },
  {
    question: 'How do I write a near miss report?',
    answer:
      'A near miss report should include the date, time, and exact location of the incident, a factual description of what happened, who was involved or nearby, what could have gone wrong (the potential consequence), the immediate cause (what triggered the near miss), any underlying factors (poor lighting, missing signage, inadequate training, time pressure), and your suggestion for preventing it from happening again. Keep the report factual and objective — do not blame individuals. The purpose is to identify systemic issues and improve safety for everyone. Most construction sites have standardised near miss report forms. Your employer or site manager will provide these. Elec-Mate includes near miss reporting guidance and templates that help you document incidents properly.',
  },
  {
    question: 'What happens if I get an electric shock on site?',
    answer:
      'If you receive an electric shock, no matter how minor it seems, you must report it immediately. Even a small shock from a 230V supply can cause internal injuries that are not immediately apparent — cardiac arrhythmia, burns to internal tissues, and delayed neurological effects can all occur. After a shock, stop work, inform your supervisor, and seek medical attention. You should attend A&E or see a doctor for an ECG (heart trace) after any mains-voltage shock. Your employer must record the incident in the accident book and report it under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations) if appropriate. Never dismiss an electric shock as trivial — it is a serious event that requires proper medical follow-up.',
  },
  {
    question: 'Are there specific safety regulations I need to know as an apprentice?',
    answer:
      "The key safety regulations for electrical apprentices are the Health and Safety at Work Act 1974 (general duties of employers and employees), the Electricity at Work Regulations 1989 (specific duties relating to electrical work, including Regulation 14 on working on dead equipment), the Management of Health and Safety at Work Regulations 1999 (risk assessment requirements), the Personal Protective Equipment at Work Regulations 1992 (PPE provision and use), and BS 7671 wiring regulations (technical standards for electrical installation). You do not need to memorise every regulation, but you should understand the principles: your employer must provide a safe workplace, adequate training, and appropriate PPE. You must follow safety procedures, use PPE provided, and report hazards. These responsibilities are shared — safety is everyone's job.",
  },
];

const relatedPages = [
  {
    href: '/guides/how-to-do-safe-isolation',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step prove-test-prove method for confirming circuits are dead before work begins.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description: 'Complete guide to personal protective equipment for electrical work on site.',
    icon: HardHat,
    category: 'Guide' as const,
  },
  {
    href: '/guides/electrical-safety-on-site',
    title: 'Electrical Safety on Site',
    description:
      'Construction site electrical safety procedures, temporary supplies, and safe systems of work.',
    icon: AlertTriangle,
    category: 'Guide' as const,
  },
  {
    href: '/guides/apprentice-mental-health',
    title: 'Apprentice Mental Health',
    description:
      'Supporting your mental health through the pressures of an electrical apprenticeship.',
    icon: Heart,
    category: 'Guide' as const,
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description: 'How to identify hazards, assess risks, and implement controls on every job.',
    icon: ClipboardCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/near-miss-reporting',
    title: 'Near Miss Reporting',
    description: 'Why near miss reporting matters and how to document incidents effectively.',
    icon: FileText,
    category: 'Guide' as const,
  },
];

const sections = [
  {
    id: 'why-safety-cases-matter',
    heading: 'Why Safety Cases Matter for Apprentices',
    content: (
      <>
        <p>
          Electrical work kills. That is not an exaggeration designed to frighten you — it is a
          statistical reality. Every year in the UK, electricians and electrical workers suffer
          fatal injuries, life-changing burns, and serious electric shocks. Many of these incidents
          involve apprentices or recently qualified electricians who have not yet developed the
          instinctive safety awareness that comes from years of disciplined practice.
        </p>
        <p>
          Safety cases — real-world scenarios drawn from actual incidents, near misses, and accident
          investigations — are one of the most powerful learning tools available to you. By studying
          what went wrong in real situations, you develop the ability to recognise danger before it
          becomes an emergency. You learn to spot the warning signs, the shortcuts, the assumptions,
          and the failures of procedure that lead to accidents.
        </p>
        <p>
          The HSE (Health and Safety Executive) publishes accident investigation reports for serious
          electrical incidents. Trade bodies like the{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            IET and JIB
          </SEOInternalLink>{' '}
          share anonymised case studies. Your training provider will include safety scenarios in
          your coursework. And on site, every experienced electrician has stories of close calls and
          colleagues who were injured. All of this experience is available to you — if you pay
          attention to it.
        </p>
        <p>
          The apprentices who take safety seriously from day one are not the cautious ones who work
          slowly — they are the competent ones who work confidently because they understand the
          risks and know exactly how to control them. Safety knowledge is not a burden that slows
          you down. It is the foundation that allows you to work effectively.
        </p>
      </>
    ),
  },
  {
    id: 'real-world-scenarios',
    heading: 'Real-World Safety Scenarios',
    content: (
      <>
        <p>
          The following scenarios are based on real incidents reported to the HSE and shared by
          industry bodies. Names and specific details are changed, but the circumstances and lessons
          are genuine.
        </p>
        <p>
          <strong>Scenario 1 — The assumed dead circuit:</strong> An apprentice was asked to remove
          a damaged socket outlet. His supervisor told him the circuit had been isolated. The
          apprentice did not verify isolation himself — he trusted the instruction. When he removed
          the faceplate and touched the terminals, he received a 230V shock. The supervisor had
          isolated the wrong circuit. The apprentice suffered burns to his hand and was taken to
          hospital. The lesson: always verify isolation yourself using the{' '}
          <SEOInternalLink href="/guides/how-to-do-safe-isolation">
            prove-test-prove method
          </SEOInternalLink>
          . Never rely on someone else telling you a circuit is dead.
        </p>
        <p>
          <strong>Scenario 2 — The re-energised circuit:</strong> An electrician isolated a lighting
          circuit and began replacing a ceiling rose. While he was working, a colleague on another
          floor noticed the lights were off and switched the circuit breaker back on, assuming it
          had tripped. The electrician working on the ceiling rose received a shock. The lesson:
          always lock off the circuit breaker and attach a warning label. A{' '}
          <SEOInternalLink href="/guides/lock-off-loto">lock-off/LOTO procedure</SEOInternalLink>{' '}
          prevents anyone from re-energising a circuit while you are working on it.
        </p>
        <p>
          <strong>Scenario 3 — The damaged cable:</strong> An apprentice was drilling into a wall to
          fit a back box. He did not use a cable detector and drilled through a buried cable,
          causing a short circuit, a loud bang, and a shower of sparks. He was fortunate not to be
          injured, but the damaged cable required significant repair work. The lesson: always use a
          cable detection device before drilling or chasing walls. Check drawings if available.
          Assume cables are present until you have confirmed they are not.
        </p>
        <p>
          <strong>Scenario 4 — The wet environment:</strong> An apprentice was helping install
          socket outlets in a commercial kitchen. The floor was wet from cleaning. He was using a
          mains-powered drill without an RCD. The drill developed a fault, and current flowed
          through the apprentice to earth via the wet floor. He received a significant shock and was
          hospitalised. The lesson: always use RCD protection when using portable equipment,
          especially in wet or damp environments. Use battery-powered tools where possible.
        </p>
        <p>
          These scenarios illustrate a consistent pattern: accidents happen when procedures are
          skipped, assumptions are made, and safety controls are not applied. The procedures exist
          for a reason — every one of them was written because someone was injured or killed in
          exactly the situation the procedure is designed to prevent.
        </p>
      </>
    ),
  },
  {
    id: 'near-miss-learning',
    heading: 'Learning from Near Misses',
    content: (
      <>
        <p>
          A near miss is an event that could have caused injury or damage but did not — this time.
          Near misses are the most valuable safety learning tool you have, because they reveal the
          same failures of procedure, the same hazards, and the same human errors that cause actual
          accidents. The only difference between a near miss and a serious accident is luck.
        </p>
        <p>
          <strong>Why near miss reporting matters:</strong> Research consistently shows that for
          every serious accident, there are approximately 10 minor injuries and 30 near misses
          involving the same hazard or procedural failure. If the near misses are reported and
          addressed, the serious accident is prevented. If they are ignored, the accident is
          inevitable — it is only a matter of time.
        </p>
        <p>
          <strong>Common near misses for apprentices:</strong> Touching a terminal that turned out
          to be live because isolation was not verified. Tripping over cables or tools left on the
          floor. Nearly dropping a heavy item from a ladder. Working in a confined space without
          realising it was a confined space. Using a tool with a damaged cable or cracked handle.
          Standing on an unstable surface to reach something overhead. Each of these is a learning
          opportunity — if it is reported and discussed.
        </p>
        <p>
          <strong>How to create a reporting culture:</strong> Many apprentices do not report near
          misses because they fear being blamed, mocked, or seen as incompetent. This is a cultural
          problem, and it is deadly. The best sites and the best employers actively encourage near
          miss reporting by thanking people who report, by discussing near misses in toolbox talks
          without naming individuals, and by visibly acting on reports to prevent recurrence. If
          your site does not have this culture, you can still report to your supervisor, your{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            training provider
          </SEOInternalLink>
          , or your employer's health and safety officer.
        </p>
        <SEOAppBridge
          title="Safety Training Built for Apprentices"
          description="Elec-Mate includes health and safety courses, safe isolation training, risk assessment guidance, and near miss reporting frameworks. Build genuine safety competence from your first day on site."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'safe-isolation-beginners',
    heading: 'Safe Isolation for Beginners',
    content: (
      <>
        <p>
          Safe isolation is the procedure you follow to confirm that a circuit or piece of equipment
          is dead (de-energised) before you work on it. It is the single most important safety
          procedure in electrical work, and it must become as automatic as breathing. Every time. No
          exceptions. No shortcuts.
        </p>
        <p>
          <strong>The prove-test-prove method:</strong> This is the core of safe isolation. You need
          two pieces of equipment: a two-pole voltage indicator (such as a Fluke T150 or Megger
          TPT420) and a proving unit (which provides a known voltage to test that your indicator is
          working correctly).
        </p>
        <p>
          <strong>Step 1 — Prove:</strong> Use the proving unit to confirm that your voltage
          indicator is working correctly. The indicator should show the known voltage from the
          proving unit. This proves that the indicator will detect voltage if it is present.
        </p>
        <p>
          <strong>Step 2 — Test:</strong> Test the circuit you are about to work on. Test between
          line and neutral, line and earth, and neutral and earth. The indicator should show no
          voltage on any combination. If it shows voltage, the circuit is still live — do not
          proceed.
        </p>
        <p>
          <strong>Step 3 — Prove again:</strong> After testing the circuit, use the proving unit
          again to confirm that your voltage indicator is still working correctly. This second prove
          eliminates the possibility that the indicator failed between the first prove and the test
          — giving you a false dead reading on a live circuit.
        </p>
        <p>
          <strong>Lock off:</strong> After confirming the circuit is dead, lock off the circuit
          breaker or isolator with a personal lock and attach a warning label. This prevents anyone
          from re-energising the circuit while you are working on it. Only you should have the key
          to your lock. For full detail on lock-off procedures, see our{' '}
          <SEOInternalLink href="/guides/lock-off-loto">LOTO guide</SEOInternalLink>.
        </p>
        <p>
          <strong>GS38 compliance:</strong> Your voltage indicator and test leads must comply with
          HSE Guidance Note <SEOInternalLink href="/guides/gs38-proving-dead">GS38</SEOInternalLink>
          . This means finger guards on the probes, fused test leads, and a maximum 4mm tip
          exposure. Do not use makeshift test leads, damaged probes, or non-compliant equipment.
        </p>
        <p>
          This procedure takes less than two minutes. It could save your life. Every apprentice
          should practise it until it becomes instinctive — you should feel uncomfortable starting
          any work without completing safe isolation first.
        </p>
      </>
    ),
  },
  {
    id: 'reporting-incidents',
    heading: 'Reporting Incidents Correctly',
    content: (
      <>
        <p>
          Incident reporting is a legal requirement, a professional obligation, and a moral
          responsibility. When something goes wrong — whether it is a near miss, a minor injury, or
          a serious accident — it must be reported, documented, and investigated so that it does not
          happen again.
        </p>
        <p>
          <strong>What must be reported:</strong> Under RIDDOR (Reporting of Injuries, Diseases and
          Dangerous Occurrences Regulations 2013), certain incidents must be reported to the HSE.
          These include deaths, specified injuries (fractures, amputations, loss of consciousness
          from electric shock), injuries that result in more than 7 days off work, dangerous
          occurrences (including electrical short circuits or overloads causing fire or explosion),
          and diseases (including occupational asthma from construction dust). Your employer is
          responsible for RIDDOR reporting, but you must inform them of any incident so they can
          fulfil this obligation.
        </p>
        <p>
          <strong>Internal reporting:</strong> In addition to RIDDOR, your employer should have an
          internal incident reporting procedure. This typically involves an accident book (required
          by law for employers with 10 or more employees), incident report forms for more detailed
          documentation, and near miss reporting systems. As an apprentice, your responsibility is
          to report any incident, injury, or near miss to your supervisor immediately. They will
          then ensure it is documented and reported through the appropriate channels.
        </p>
        <p>
          <strong>What to include in a report:</strong> A good incident report is factual, detailed,
          and objective. Include the date, time, and location. Describe exactly what happened in
          chronological order. List who was involved and who witnessed the event. Describe any
          injuries sustained and treatment given. Identify the immediate cause and any contributing
          factors. Suggest preventive measures. Do not speculate, do not apportion blame, and do not
          minimise what happened. The purpose of the report is to prevent recurrence, not to punish
          individuals.
        </p>
        <p>
          <strong>Your rights:</strong> You cannot be disciplined, dismissed, or disadvantaged for
          reporting a safety incident or concern in good faith. This protection is enshrined in the{' '}
          <SEOInternalLink href="/guides/apprentice-rights-pay">
            Employment Rights Act 1996
          </SEOInternalLink>{' '}
          (whistleblowing provisions) and the Health and Safety at Work Act 1974. If you believe you
          are being pressured not to report an incident, contact your training provider, the HSE, or
          ACAS for advice.
        </p>
      </>
    ),
  },
  {
    id: 'ppe-and-hazard-awareness',
    heading: 'PPE and Hazard Awareness on Site',
    content: (
      <>
        <p>
          Personal Protective Equipment is your last line of defence. It does not eliminate hazards
          — it reduces the severity of harm if a hazard is not adequately controlled by other means.
          Understanding this hierarchy is important: PPE is the bottom of the control hierarchy,
          used when engineering controls, safe systems of work, and administrative controls are
          insufficient.
        </p>
        <p>
          <strong>Mandatory PPE on construction sites:</strong> Safety boots with toe and midsole
          protection (EN ISO 20345). Hard hat (EN 397) — required in most construction environments.
          High-visibility vest or jacket (EN ISO 20471). Safety glasses or goggles (EN 166) —
          especially when drilling, chasing, or cutting. Gloves appropriate to the task — general
          work gloves for handling materials, insulated gloves (EN 60903) for electrical work near
          live equipment. For full{' '}
          <SEOInternalLink href="/guides/ppe-for-electricians">PPE guidance</SEOInternalLink>, see
          our dedicated page.
        </p>
        <p>
          <strong>Electrical-specific PPE:</strong> When working near or on electrical equipment,
          additional PPE may be required. Insulated gloves rated to the appropriate voltage class.
          Safety glasses with side shields or a full face shield — essential when testing, as arc
          flash can occur during fault-level testing. Flame-resistant clothing where there is a risk
          of arc flash (more common in industrial and commercial settings). Insulated tools rated to
          at least 1000V AC (VDE certified).
        </p>
        <p>
          <strong>Hazard awareness for apprentices:</strong> As a new apprentice, you need to
          develop the habit of continuously scanning your environment for hazards. When you arrive
          on site, look for trailing cables, uneven surfaces, overhead hazards, wet areas, and
          unsecured equipment. Before starting any task, ask yourself: what could go wrong? What are
          the risks? What controls are in place? This risk awareness becomes instinctive with
          practice, but you must consciously develop it during your apprenticeship.
        </p>
        <p>
          Understanding{' '}
          <SEOInternalLink href="/guides/electrical-safety-on-site">
            electrical safety on site
          </SEOInternalLink>{' '}
          means knowing not just what PPE to wear, but when to wear it, how to inspect it, and when
          to replace it. Damaged PPE is worse than useless — it gives you a false sense of security.
        </p>
      </>
    ),
  },
  {
    id: 'building-a-safety-mindset',
    heading: 'Building a Safety Mindset from Day One',
    content: (
      <>
        <p>
          A safety mindset is not something you are born with — it is something you build through
          deliberate practice, constant awareness, and a willingness to learn from every incident,
          near miss, and safety scenario you encounter. The best electricians are not the ones who
          have never had a close call — they are the ones who learned from every close call and
          changed their behaviour as a result.
        </p>
        <p>
          <strong>Question everything:</strong> Never assume a circuit is dead. Never assume someone
          else has isolated correctly. Never assume a cable detector has found every cable. Never
          assume the floor is dry. The moment you start assuming is the moment you become
          vulnerable. Verify, check, and confirm — every time.
        </p>
        <p>
          <strong>Follow procedures even when nobody is watching:</strong> The true test of a safety
          mindset is not what you do when your supervisor is standing behind you. It is what you do
          when you are alone, under time pressure, and tempted to skip a step. If you carry out safe
          isolation, wear your PPE, and follow procedures even when it is inconvenient and nobody
          would know if you did not — you have a genuine safety mindset.
        </p>
        <p>
          <strong>Learn from others:</strong> Listen to the stories that experienced electricians
          tell about close calls and incidents. Ask questions about safety during{' '}
          <SEOInternalLink href="/guides/toolbox-talks-electrical">toolbox talks</SEOInternalLink>.
          Read HSE investigation reports. Study the safety cases in your training materials. Every
          incident that someone else experienced is a lesson you can learn without suffering the
          consequences yourself.
        </p>
        <p>
          <strong>Speak up:</strong> If you see something unsafe, say something. If you are unsure
          about a procedure, ask. If you feel pressured to cut corners, refuse. This takes courage —
          especially as an apprentice who may feel pressure to please their employer and fit in with
          the team. But the electricians who earn the most respect are the ones who take safety
          seriously and are not afraid to speak up when something is wrong. Your{' '}
          <SEOInternalLink href="/guides/apprentice-mental-health">mental health</SEOInternalLink>{' '}
          also benefits from knowing you are working safely and not carrying the anxiety of
          unaddressed hazards.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-safety',
    heading: 'Safety Training with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate provides structured safety training that builds genuine competence, not just
          awareness. The platform includes dedicated health and safety courses, safe isolation
          training, risk assessment tools, and incident documentation guidance — all designed
          specifically for electrical apprentices and qualified electricians working in the UK.
        </p>
        <p>
          <strong>Health and safety courses:</strong> The Level 2 and Level 3 course content
          includes comprehensive health and safety units covering the Health and Safety at Work Act
          1974, the Electricity at Work Regulations 1989, COSHH, manual handling, working at height,
          and fire safety. These courses align with the C&G 2365 and 5357 syllabuses.
        </p>
        <p>
          <strong>Safe isolation training:</strong> Interactive safe isolation modules walk you
          through the prove-test-prove procedure step by step. Flashcards reinforce the correct
          sequence. Practice questions test your understanding of when and how to isolate circuits
          safely.
        </p>
        <p>
          <strong>Risk assessment guidance:</strong> Learn to identify hazards, assess risks, and
          select appropriate controls. The AI Health and Safety Agent can generate{' '}
          <SEOInternalLink href="/tools/rams-generator">RAMS documents</SEOInternalLink> for
          specific tasks, helping you understand what a thorough risk assessment looks like in
          practice.
        </p>
        <p>
          <strong>Flashcards and practice questions:</strong> Safety-specific flashcards cover
          regulations, procedures, PPE requirements, and hazard identification. Over 2,000 practice
          questions include safety topics at every level. The spaced repetition system ensures you
          retain critical safety knowledge long-term.
        </p>
        <p>
          <strong>Site diary with safety tracking:</strong> Record safety observations, near misses,
          and lessons learned in your daily{' '}
          <SEOInternalLink href="/guides/site-diary-for-apprentices">site diary</SEOInternalLink>.
          Build a documented record of your safety awareness and learning that feeds into your
          portfolio and demonstrates competence to your employer and assessor.
        </p>
        <SEOAppBridge
          title="Build Real Safety Competence from Day One"
          description="Health and safety courses, safe isolation training, risk assessment guidance, flashcards, and site diary with safety tracking. Elec-Mate builds the safety mindset that protects you throughout your career. 7-day free trial."
          icon={Shield}
        />
      </>
    ),
  },
];

export default function ApprenticeSafetyCasesPage() {
  return (
    <GuideTemplate
      title="Safety Cases for Electrical Apprentices | Real Scenarios"
      description="Real-world safety scenarios for electrical apprentices. Learn from near misses, understand safe isolation for beginners, master incident reporting, and build a safety-first mindset from your first day on site."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Safety Cases for <span className="text-yellow-400">Electrical Apprentices</span>
        </>
      }
      heroSubtitle="Real-world safety scenarios, near misses, and incident case studies for apprentice electricians. Learn from what went wrong so you can make sure it never happens to you. Safe isolation, PPE, hazard awareness, and incident reporting — all explained for beginners."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Safety for Apprentices"
      relatedPages={relatedPages}
      ctaHeading="Safety training that actually sticks"
      ctaSubheading="Join 430+ UK apprentices building genuine safety competence with Elec-Mate. Health and safety courses, safe isolation training, flashcards, and site diary. 7-day free trial, cancel anytime."
    />
  );
}
