import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  BookOpen,
  Smartphone,
  Calculator,
  ClipboardCheck,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  Brain,
  ListOrdered,
  Lock,
  ShieldAlert,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'How to Do Safe Isolation | GS38 Procedure Steps | Elec-Mate';
const PAGE_DESCRIPTION =
  'Step-by-step safe isolation procedure following HSE GS38 guidance. Prove-test-prove method, approved voltage indicators, lockout/tagout. Essential for every UK electrician.';

const faqs = [
  {
    question: 'What is GS38 and why does it matter for safe isolation?',
    answer:
      'GS38 is a Guidance Note published by the Health and Safety Executive (HSE) titled "Electrical test equipment for use by electricians." It sets out the requirements for test equipment and test leads used for proving circuits dead before working on them. GS38 is not a regulation — it is guidance — but following it is considered best practice and is expected by all competent person scheme providers. The key GS38 requirements are: test probes must have finger guards to prevent accidental contact with live parts, test leads must be fused (with a fuse no greater than 500mA), probe tips must be spring-loaded and no more than 4mm exposed, and the voltage indicator must be clearly marked with its voltage rating and conform to a recognised standard. Using non-GS38-compliant equipment is dangerous and could result in electric shock, arc flash, or an incorrect dead reading.',
  },
  {
    question: 'Can I use a multimeter instead of a voltage indicator for safe isolation?',
    answer:
      'GS38 strongly recommends using a dedicated two-pole voltage indicator (also called a voltage tester or proving unit) rather than a multimeter for proving circuits dead. The reason is that a multimeter can give a false "dead" reading if the battery is flat, the range selector is on the wrong setting, the fuse in the meter has blown, or the leads are damaged. A two-pole voltage indicator is a simpler, more reliable instrument that gives a clear live or dead indication without relying on batteries (it is powered by the circuit being tested). If you do use a multimeter, it must comply with GS38 requirements for test leads (fused, finger guards, 4mm tips) and you must prove it works on a known live source before and after testing the circuit you are isolating.',
  },
  {
    question: 'What is the prove-test-prove method?',
    answer:
      'The prove-test-prove method is the standard safe isolation procedure. Step 1 (Prove): Prove that your voltage indicator works correctly by testing it on a known live source (e.g., a proving unit or another circuit known to be energised). Step 2 (Test): Test the circuit you have isolated — check between all combinations of conductors (Line-Neutral, Line-Earth, Neutral-Earth) to confirm they are all dead. Step 3 (Prove): Prove that your voltage indicator still works correctly by testing it again on the same known live source. This final step is critical because it confirms that your voltage indicator did not fail between the first prove and the test — if it had failed, the "dead" reading on the isolated circuit would be meaningless.',
  },
  {
    question: 'Do I need to lock off every circuit I am working on?',
    answer:
      'Yes. Regulation 462 of BS 7671:2018+A3:2024 and the Electricity at Work Regulations 1989 (Regulation 12) require that precautions are taken to prevent equipment being inadvertently re-energised while work is being carried out on it. In practice, this means physically locking off the means of isolation (using a padlock and lock-off device on the circuit breaker or fuse carrier) and attaching a warning label ("Danger — Do Not Switch On"). The padlock should be a personal padlock with a unique key that only you hold. On multi-person jobs, each person working on the circuit should apply their own padlock (multi-lock hasp). Simply switching off a circuit breaker without locking it is not sufficient — another person could switch it back on.',
  },
  {
    question: 'What tests should I carry out to confirm a circuit is dead?',
    answer:
      'When confirming a circuit is dead, you must test between all combinations of conductors: Line to Neutral (L-N), Line to Earth (L-E), and Neutral to Earth (N-E). This is because a circuit could have a fault that keeps one conductor live even when the main isolation device is switched off. For example, a cross-connection between two circuits could keep the neutral conductor live from another source, or a borrowed neutral could mean the neutral is energised via a different circuit. Testing all three combinations (L-N, L-E, N-E) ensures that no conductor is at a dangerous potential relative to any other conductor or earth. For three-phase circuits, you must also test between all phase combinations (L1-L2, L1-L3, L2-L3) in addition to each phase to neutral and each phase to earth.',
  },
  {
    question: 'What should I do if my voltage indicator shows dead but I am not confident?',
    answer:
      'If you have any doubt at all, treat the circuit as live and do not work on it until you have resolved your doubt. Repeat the full prove-test-prove procedure. Check your voltage indicator is functioning correctly on a known live source. Check that you have isolated the correct circuit — circuit labelling can be wrong, especially in older installations. Test at the point of work, not just at the consumer unit. If necessary, use a second independent voltage indicator to cross-check the reading. Never rely solely on a single test or a single instrument. The consequences of working on a live circuit that you believed was dead are potentially fatal.',
  },
  {
    question: 'How does Elec-Mate help with safe isolation procedures?',
    answer:
      'Elec-Mate includes a guided safe isolation procedure within the app that walks you through each step of the prove-test-prove method. The app also includes a safe isolation checklist that you can complete digitally as part of your on-site documentation, ensuring you never skip a step. For apprentices and trainees, the safe isolation procedure is covered in detail within the Level 2 and Level 3 electrical courses on the platform. The 8 Elec-AI agents can also answer questions about safe isolation, GS38 requirements, and lock-off procedures in real time on site.',
  },
];

const howToSteps = [
  {
    name: 'Select an approved voltage indicator',
    text: 'Choose a two-pole voltage indicator that complies with HSE Guidance Note GS38. The instrument must be rated to at least CAT III (for distribution-level testing) or CAT IV (for origin-level testing). Check that the test leads have fused probes with no more than 500mA fuses, finger guards to prevent accidental contact, and spring-loaded tips with no more than 4mm of exposed metal. Verify the instrument is within its calibration date. Never use a multimeter as a substitute unless it meets all GS38 requirements.',
  },
  {
    name: 'Prove the voltage indicator works on a known live source',
    text: 'Before testing the circuit you are about to isolate, prove that your voltage indicator is working correctly. Test it on a known live source — this can be a dedicated proving unit (a battery-powered device that outputs a known voltage) or another circuit that you know is energised. The indicator should give a clear, positive indication that voltage is present. If the indicator does not give a clear reading on the known source, it is faulty — do not use it. Replace the instrument or the batteries/fuses and re-test.',
  },
  {
    name: 'Identify the circuit to be isolated',
    text: 'Identify the correct circuit at the distribution board or consumer unit. Check the circuit chart and labelling — but never rely solely on labels, as they may be incorrect or out of date, especially in older installations. Where possible, verify the circuit identity by switching the load on and off and observing the result at the point of work. For example, switch off the MCB and check that the light or socket at the work location goes off. This step prevents you from isolating the wrong circuit.',
  },
  {
    name: 'Isolate the circuit',
    text: 'Switch off the circuit breaker or remove the fuse for the circuit you are working on. For a circuit breaker, move the switch to the OFF position. For a fuse, remove the fuse carrier entirely and keep it in your possession. Once isolated, apply a lock-off device and your personal padlock to the circuit breaker or fuse carrier to prevent anyone from re-energising the circuit while you are working on it. Attach a warning label — "Danger — Do Not Switch On" — visible on the distribution board. On multi-person jobs, each person must apply their own padlock using a multi-lock hasp.',
  },
  {
    name: 'Test the isolated circuit at the point of work',
    text: 'At the point where you will be working (not at the consumer unit), use your proved voltage indicator to test between all conductor combinations: Line to Neutral (L-N), Line to Earth (L-E), and Neutral to Earth (N-E). All three tests must show zero volts (dead). If any test shows voltage, the circuit is not properly isolated — stop, investigate, and do not proceed until all conductors are confirmed dead. For three-phase circuits, also test between all phase combinations: L1-L2, L1-L3, L2-L3, plus each phase to neutral and each phase to earth.',
  },
  {
    name: 'Prove the voltage indicator still works on the known live source',
    text: 'Immediately after confirming the circuit is dead, return to the known live source and test your voltage indicator again. It must give the same clear, positive indication of voltage as it did in Step 2. This final prove step is critical — it confirms that your voltage indicator did not fail between the first prove and the test on the isolated circuit. If the indicator had failed silently (e.g., a broken lead, a blown fuse, or a flat battery), the "dead" reading you got in Step 5 would be meaningless. If the indicator fails the second prove, treat the circuit as live and repeat the entire procedure with a different instrument.',
  },
];

const features = [
  {
    icon: ListOrdered,
    title: 'Guided Safe Isolation Checklist',
    description:
      'Step-by-step prove-test-prove procedure built into the app. Complete each step digitally and keep a record of safe isolation for every job.',
  },
  {
    icon: Calculator,
    title: '70 Electrical Calculators',
    description:
      'Zs verification, prospective fault current, voltage drop, cable sizing, and dozens more. All built to BS 7671:2018+A3:2024.',
  },
  {
    icon: ClipboardCheck,
    title: '8 Certificate Types',
    description:
      'EICR, EIC, Minor Works, EV Charger, Emergency Lighting, Fire Alarm, Solar PV, and PAT Testing. All digitally signed with PDF export.',
  },
  {
    icon: Brain,
    title: '8 Elec-AI Agents',
    description:
      'Ask the AI about safe isolation, GS38 requirements, regulation references, or any technical question. Get instant, referenced answers on site.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Complete checklists and enter test results even without signal. Data saves locally and syncs automatically when connectivity returns.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A3:2024',
    description:
      'All regulation references, Zs limits, and compliance checks built to the current 18th Edition including Amendment 3.',
  },
];

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Do Safe Isolation (Prove-Test-Prove Procedure)',
  description:
    'A step-by-step guide to safe electrical isolation following HSE GS38 guidance. The prove-test-prove method explained with lockout/tagout requirements.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elec-mate.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://elec-mate.com/guides' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'How to Do Safe Isolation',
      item: 'https://elec-mate.com/guides/how-to-do-safe-isolation',
    },
  ],
};

export default function HowToDoSafeIsolationPage() {
  useSEO({
    title: 'How to Do Safe Isolation | GS38 Procedure Steps',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...breadcrumbSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <ShieldAlert className="w-4 h-4" />
            HSE Guidance Note GS38
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            How to Do
            <span className="block text-yellow-400 mt-1">Safe Isolation</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The complete prove-test-prove procedure for safe electrical isolation. GS38 voltage
            indicator requirements, lockout/tagout, and the six steps that could save your life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Your Free Trial
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#procedure"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See the Procedure
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Safe Isolation Matters */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ShieldAlert className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Safe Isolation Is the Most Important Procedure You Will Ever Learn
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Safe isolation is the process of disconnecting an electrical circuit from its supply
              and proving that it is dead before any work begins. It is the single most critical
              safety procedure for any electrician. Every year in the UK, electricians and other
              workers are killed or seriously injured by electric shock because safe isolation was
              not carried out properly — or was skipped entirely.
            </p>
            <p>
              The procedure is governed by the Electricity at Work Regulations 1989 (specifically
              Regulation 12, which requires precautions to be taken to prevent equipment being
              inadvertently re-energised), the Health and Safety at Work Act 1974, and BS
              7671:2018+A3:2024 (Regulation 462, which covers isolation and switching). HSE Guidance
              Note GS38 sets out the requirements for the test equipment used during safe isolation.
            </p>
            <p>
              The core principle is simple: never trust a circuit to be dead until you have
              personally proved it dead using a proved voltage indicator, and never trust a voltage
              indicator until you have proved it works. This is the prove-test-prove method — the
              three-step sequence that forms the foundation of safe isolation. Combined with
              physical lockout/tagout (preventing re-energisation), it provides the layered
              protection that keeps you alive.
            </p>
            <p>
              Whether you are an experienced electrician or a first-year apprentice, the safe
              isolation procedure must be followed every single time you work on a circuit. No
              shortcuts. No assumptions. No relying on someone else telling you the circuit is off.
              You prove it yourself, every time.
            </p>
          </div>
        </div>
      </section>

      {/* GS38 Requirements */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              GS38 Requirements for Test Equipment
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              HSE Guidance Note GS38 sets out the minimum requirements for electrical test equipment
              used by electricians. When selecting a voltage indicator for safe isolation, it must
              meet the following criteria.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <h3 className="font-bold text-white text-lg mb-2">Test Probes</h3>
              <p className="text-white text-sm leading-relaxed">
                Finger guards must prevent accidental contact with live parts. The probe tips must
                be spring-loaded with a maximum of 4mm of exposed metal. Tips must be insulated with
                a different colour to the probe body for visibility.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Test Leads</h3>
              <p className="text-white text-sm leading-relaxed">
                Leads must be fused with a maximum fuse rating of 500mA. They must have adequate
                insulation, be flexible, and be clearly marked with their voltage rating. Damaged
                leads must be replaced immediately — never repaired with tape.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Voltage Indicator</h3>
              <p className="text-white text-sm leading-relaxed">
                A two-pole voltage indicator (not a multimeter) is recommended. It must be clearly
                marked with its voltage rating and CAT rating (minimum CAT III for distribution
                work, CAT IV for origin work). It should conform to a recognised standard such as BS
                EN 61243-3.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Proving Unit</h3>
              <p className="text-white text-sm leading-relaxed">
                A proving unit is a battery-powered device that outputs a known voltage (typically
                230V or 400V) to verify that your voltage indicator is working correctly. It
                provides the known live source needed for the prove-test-prove procedure without
                relying on another circuit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Procedure */}
      <section id="procedure" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ListOrdered className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The Safe Isolation Procedure: Step by Step
            </h2>
          </div>
          <p className="text-white mb-8 leading-relaxed">
            Follow these six steps every time you need to work on a de-energised circuit. No
            shortcuts, no exceptions.
          </p>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Mistakes to Avoid</h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Skipping the second prove step</h3>
                  <p className="text-white text-sm leading-relaxed">
                    The most dangerous shortcut. If your voltage indicator failed silently between
                    the first prove and the test, you could have a live circuit that reads as dead.
                    The second prove confirms the instrument is still working. Never skip it.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Using a non-GS38-compliant multimeter
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    A standard multimeter with bare probe tips, no fuses in the leads, and
                    battery-dependent readings is not suitable for proving circuits dead. Use a
                    dedicated two-pole voltage indicator or ensure your multimeter meets all GS38
                    requirements.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Not locking off the isolation point</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Simply switching off an MCB is not sufficient. Someone else could switch it back
                    on while you are working on the circuit. Always apply a lock-off device and your
                    personal padlock. Keep the only key in your possession.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Testing only L-N and not L-E or N-E</h3>
                  <p className="text-white text-sm leading-relaxed">
                    You must test between all conductor combinations. A borrowed neutral or
                    cross-connected circuit could mean the neutral is live from another source.
                    Testing L-N alone would not detect voltage on the neutral relative to earth.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Relying on someone else to confirm the circuit is dead
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    You must personally prove the circuit is dead at the point of work. Never accept
                    another person telling you "it is off" without carrying out the full
                    prove-test-prove procedure yourself. Your safety is your responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Equipment */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Lock className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Tools and Equipment Needed
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <h3 className="font-bold text-white text-lg mb-2">Two-Pole Voltage Indicator</h3>
              <p className="text-white text-sm leading-relaxed">
                A GS38-compliant voltage indicator rated to at least CAT III or CAT IV. Major
                brands: Martindale, Fluke, Kewtech, Megger. Must have fused leads, finger guards,
                and spring-loaded 4mm tips.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Proving Unit</h3>
              <p className="text-white text-sm leading-relaxed">
                A battery-powered device that provides a known voltage output (typically 230V or
                400V) for proving your voltage indicator works. Essential for the prove-test-prove
                method. Some units also provide a test for the instrument fuses.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Lock-Off Devices and Padlocks</h3>
              <p className="text-white text-sm leading-relaxed">
                MCB lock-off clips, fuse carrier lock-off devices, and personal padlocks with unique
                keys. Multi-lock hasps for multi-person jobs. Warning labels ("Danger — Do Not
                Switch On").
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">Warning Labels</h3>
              <p className="text-white text-sm leading-relaxed">
                Self-adhesive or tie-on warning labels with the text "Danger — Do Not Switch On" or
                similar. Applied to the isolation point and visible to anyone approaching the
                distribution board.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Safe isolation guidance, 70 calculators, 8 certificate types, and 8 AI agents — all
            built for UK electricians working on site.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition-colors"
              >
                <summary className="flex items-start gap-3 cursor-pointer touch-manipulation list-none [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90" />
                  <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                </summary>
                <div className="mt-3 pl-8">
                  <p className="text-white leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Work Safer with Elec-Mate"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site procedures, testing, and certification. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
