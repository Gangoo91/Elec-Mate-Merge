import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  Brain,
  Search,
  Activity,
  ListChecks,
  CircuitBoard,
  Camera,
  ShieldCheck,
} from 'lucide-react';

export default function AIElectricalFaultFindingPage() {
  return (
    <GuideTemplate
      title="AI Electrical Fault Finding | How It Works | Elec-Mate"
      description="How AI analyses electrical fault symptoms, matches them against known fault patterns, suggests probable causes ranked by likelihood, and recommends diagnostic test sequences. Covers RCD tripping, insulation resistance failures, earth faults, and intermittent faults."
      datePublished="2026-01-28"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'AI Electrical Fault Finding', href: '/guides/ai-electrical-fault-finding' },
      ]}
      tocItems={[
        { id: 'why-fault-finding-is-hard', label: 'Why Fault Finding Is Hard' },
        { id: 'how-ai-fault-finding-works', label: 'How AI Fault Finding Works' },
        { id: 'pattern-matching', label: 'Pattern Matching' },
        { id: 'symptom-analysis', label: 'Symptom Analysis' },
        { id: 'test-sequence-suggestions', label: 'Test Sequence Suggestions' },
        { id: 'learning-from-fault-data', label: 'Learning from Fault Data' },
        { id: 'common-fault-scenarios', label: 'Common Fault Scenarios' },
        { id: 'limitations', label: 'Limitations of AI Fault Finding' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="AI Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          <span className="text-yellow-400">AI Electrical Fault Finding</span> — How It Works and
          When to Use It
        </>
      }
      heroSubtitle="Fault finding is where experience counts most. AI fault diagnosis tools act as a knowledgeable second opinion — analysing symptoms, matching them against thousands of known fault patterns, suggesting probable causes ranked by likelihood, and recommending the most efficient diagnostic test sequence."
      readingTime={11}
      keyTakeaways={[
        'AI fault finding works by matching reported symptoms against a database of thousands of real-world electrical fault scenarios, ranking probable causes by likelihood.',
        'The AI suggests the most efficient diagnostic test sequence to confirm or eliminate each probable cause, reducing the time spent on trial-and-error approaches.',
        'Pattern matching identifies correlations that human diagnosticians might miss — for example, that intermittent RCD tripping only occurs during humid weather suggesting moisture ingress.',
        'The AI learns from resolved faults, building an increasingly accurate model of which symptoms typically lead to which root causes in different types of installation.',
        'AI fault finding is a diagnostic aid, not a replacement for physical testing. It suggests where to look and what to test — you still carry out the actual measurements and repairs.',
      ]}
      sections={[
        {
          id: 'why-fault-finding-is-hard',
          heading: 'Why Fault Finding Is Hard',
          content: (
            <>
              <p>
                Electrical fault finding is one of the most challenging aspects of electrical work.
                Unlike new installation — where you follow a design and build from scratch — fault
                finding requires you to work backwards from symptoms to causes in an installation
                you did not design and may never have seen before. The possible causes for any given
                symptom are numerous, and the most obvious explanation is not always correct.
              </p>
              <p>
                Consider a common scenario: an RCD trips repeatedly. The possible causes include a
                failing appliance with leakage to earth, a deteriorated cable with damaged
                insulation, moisture ingress at a junction box or socket outlet, a neutral-earth
                fault somewhere on the protected circuits, a faulty RCD mechanism, cumulative
                leakage from multiple circuits just exceeding the trip threshold, or even an
                incorrectly wired circuit where neutral and earth have been transposed. Each cause
                requires a different diagnostic approach, and systematically working through them
                all takes time.
              </p>
              <p>
                Experienced electricians develop an intuition for fault diagnosis. They recognise
                symptom patterns, they know which causes are most common for each type of
                installation, and they have a mental library of faults they have encountered before.
                This experience is invaluable, but it has limits — even the most experienced
                electrician has not seen every possible fault, and unusual or intermittent faults
                can be genuinely difficult to diagnose.
              </p>
              <p>
                AI fault finding does not replace this experience. What it does is extend it — by
                drawing on a fault database that is larger than any individual electrician's
                experience, and by applying systematic pattern matching to identify the most likely
                causes for a given set of symptoms.
              </p>
            </>
          ),
        },
        {
          id: 'how-ai-fault-finding-works',
          heading: 'How AI Fault Finding Works',
          content: (
            <>
              <p>
                Elec-Mate's AI fault diagnosis tool uses a combination of natural language
                understanding and a structured fault knowledge base. The process works as follows:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Symptom capture</span> — you describe
                  the fault in plain English. For example: "the RCD protecting the downstairs ring
                  main trips after about 10 minutes. It resets fine and does not trip immediately.
                  Started happening three weeks ago. No new appliances connected."
                </li>
                <li>
                  <span className="font-semibold text-white">Symptom analysis</span> — the AI
                  extracts the key diagnostic information from your description: the affected
                  circuit (downstairs ring main), the protective device behaviour (delayed trip, not
                  immediate), the time to trip (approximately 10 minutes), the recurrence pattern
                  (repeatable after reset), the onset (three weeks ago), and any changes (none
                  reported).
                </li>
                <li>
                  <span className="font-semibold text-white">Pattern matching</span> — the extracted
                  symptoms are compared against the fault database. The delayed trip pattern (10
                  minutes) strongly suggests a thermal or moisture-related cause rather than a fixed
                  fault, because fixed faults typically trip the RCD immediately or within seconds.
                </li>
                <li>
                  <span className="font-semibold text-white">Probability ranking</span> — the AI
                  ranks the probable causes by likelihood based on the symptom pattern, the circuit
                  type, and historical fault data. For this example, the most likely causes would be
                  ranked as: (1) an appliance with a developing fault that worsens as it heats up,
                  (2) moisture ingress at a junction or connection point, (3) cable insulation
                  deterioration that becomes conductive when warm.
                </li>
                <li>
                  <span className="font-semibold text-white">Test sequence recommendation</span> —
                  for each probable cause, the AI recommends the specific test to confirm or
                  eliminate it. For the example above: disconnect all appliances and test if the RCD
                  still trips (eliminates cause 1); carry out insulation resistance testing on each
                  section of the ring with the circuit warm (tests causes 2 and 3); check all
                  accessible junction boxes for signs of moisture.
                </li>
              </ul>
              <SEOAppBridge
                title="AI Fault Diagnosis — Built Into Elec-Mate"
                description="Describe fault symptoms in plain English and the AI suggests probable causes ranked by likelihood, with diagnostic test sequences for each. A second opinion from a database of thousands of real-world electrical faults."
                icon={Zap}
              />
            </>
          ),
        },
        {
          id: 'pattern-matching',
          heading: 'Pattern Matching in Fault Diagnosis',
          content: (
            <>
              <p>
                Pattern matching is the core of AI fault diagnosis. The AI maintains a knowledge
                base of fault patterns — combinations of symptoms that are characteristic of
                specific root causes. These patterns are derived from real-world fault reports,
                manufacturer fault data, and the published technical literature on electrical fault
                diagnosis.
              </p>
              <p>
                Some patterns are simple and well-known. An insulation resistance reading of less
                than 1 megohm on a circuit almost certainly indicates cable insulation breakdown,
                moisture ingress, or a faulty connected device. An earth fault loop impedance
                reading that exceeds the maximum permitted value for the installed protective device
                indicates either a high-resistance earth path or incorrect/degraded connections.
              </p>
              <p>
                Other patterns are more subtle. The AI can identify correlations that a human
                diagnostician might miss because they require cross-referencing multiple pieces of
                information simultaneously. For example:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Time-dependent tripping</span> — if an
                  RCD or MCB trips only after a period of operation, the AI identifies this as a
                  thermal pattern and prioritises causes that worsen with temperature: failing
                  appliance heating elements, cable insulation that becomes conductive when warm, or
                  loose connections that expand with heat.
                </li>
                <li>
                  <span className="font-semibold text-white">Weather-dependent faults</span> — if
                  the fault occurs more frequently during rain or high humidity, the AI identifies
                  moisture ingress as a primary suspect and suggests checking outdoor junction
                  boxes, cable entries, and IP ratings of outdoor equipment.
                </li>
                <li>
                  <span className="font-semibold text-white">Load-dependent symptoms</span> — if the
                  fault occurs only when specific loads are connected, the AI identifies the load as
                  either the cause itself (appliance fault) or a trigger (marginal insulation that
                  fails only under load current heating).
                </li>
                <li>
                  <span className="font-semibold text-white">Multiple circuit involvement</span> —
                  if symptoms appear on multiple circuits simultaneously, the AI identifies
                  common-point failures: supply-side issues, main earthing problems, or shared
                  neutral/earth faults.
                </li>
              </ul>
              <p>
                The pattern matching also considers the installation context. A fault in a 1960s
                installation with rubber-insulated wiring has a different probability distribution
                than the same symptom in a 2020 installation with thermoplastic cables. The AI
                adjusts its probability rankings accordingly.
              </p>
            </>
          ),
        },
        {
          id: 'symptom-analysis',
          heading: 'Symptom Analysis in Detail',
          content: (
            <>
              <p>
                The quality of the AI's fault diagnosis depends heavily on the quality of the
                symptom description. The more detail you provide, the more accurately the AI can
                narrow down the probable causes. The AI extracts and analyses the following
                categories of information from your description:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Affected circuit(s)</span> — which
                  circuit or circuits are experiencing the fault. Single-circuit faults have
                  different causes to multi-circuit or whole-installation faults.
                </li>
                <li>
                  <span className="font-semibold text-white">Protective device behaviour</span> —
                  which device trips (RCD, MCB, or both), whether it trips immediately or after a
                  delay, whether it can be reset, and whether it trips on a specific operation
                  (switching on a load, turning on the supply).
                </li>
                <li>
                  <span className="font-semibold text-white">Temporal pattern</span> — when the
                  fault occurs (time of day, weather conditions, seasonal pattern), how often it
                  occurs, and when it first started.
                </li>
                <li>
                  <span className="font-semibold text-white">Recent changes</span> — any changes to
                  the installation, connected appliances, building structure, or environmental
                  conditions that preceded the fault onset.
                </li>
                <li>
                  <span className="font-semibold text-white">Test results</span> — any test readings
                  you have already taken, such as insulation resistance, continuity, or earth fault
                  loop impedance values.
                </li>
                <li>
                  <span className="font-semibold text-white">Installation age and type</span> — the
                  approximate age of the installation, wiring system type, and earthing arrangement,
                  which influence the probability of different fault types.
                </li>
              </ul>
              <p>
                If your initial description is missing key information, the AI asks clarifying
                questions before generating its diagnosis. For example, if you report an RCD
                tripping but do not mention whether it trips immediately or after a delay, the AI
                will ask — because the timing is a critical diagnostic indicator that significantly
                changes the probable cause ranking.
              </p>
            </>
          ),
        },
        {
          id: 'test-sequence-suggestions',
          heading: 'Test Sequence Suggestions',
          content: (
            <>
              <p>
                For each probable cause identified, the AI recommends a specific diagnostic test to
                confirm or eliminate it. The tests are ordered to follow the most efficient
                diagnostic path — starting with the simplest, quickest tests that can eliminate the
                most probable causes, then progressing to more detailed investigation if needed.
              </p>
              <p>
                For an RCD tripping fault on a ring final circuit, the AI might recommend the
                following diagnostic sequence:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Step 1: Appliance isolation</span> —
                  disconnect all appliances from the affected circuit and retest. If the RCD no
                  longer trips, reconnect appliances one at a time to identify the faulty unit. This
                  is the quickest test and eliminates the most common cause (faulty appliance).
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Step 2: Insulation resistance test
                  </span>{' '}
                  — with all appliances disconnected, carry out an insulation resistance test at
                  500V DC between live conductors and earth. A reading below 1 megohm indicates
                  cable insulation deterioration. Test each leg of the ring separately to localise
                  the fault.
                </li>
                <li>
                  <span className="font-semibold text-white">Step 3: Split the ring</span> — if
                  insulation resistance is marginal, disconnect the ring at the consumer unit and
                  test each leg independently. A significantly lower reading on one leg localises
                  the fault to that half of the ring.
                </li>
                <li>
                  <span className="font-semibold text-white">Step 4: Junction box inspection</span>{' '}
                  — visually inspect all accessible junction boxes, socket outlets, and connection
                  points on the affected section for signs of moisture, heat damage, or loose
                  connections.
                </li>
                <li>
                  <span className="font-semibold text-white">Step 5: Sectional isolation</span> — if
                  the fault is still not found, progressively disconnect sections of the circuit to
                  narrow down the fault location using a process of elimination.
                </li>
              </ul>
              <p>
                Each suggested test includes the expected result if the probable cause is confirmed,
                what to do next if the result is inconclusive, and the relevant testing procedure
                from the{' '}
                <SEOInternalLink href="/guides/testing-sequence">
                  testing sequence guide
                </SEOInternalLink>
                . This systematic approach reduces the time spent on fault finding by eliminating
                guesswork and ensuring you test in the most efficient order.
              </p>
            </>
          ),
        },
        {
          id: 'learning-from-fault-data',
          heading: 'Learning from Fault Data',
          content: (
            <>
              <p>
                The AI fault diagnosis system improves over time through two mechanisms: the
                collective fault database and individual feedback.
              </p>
              <p>
                The collective fault database aggregates anonymised fault data from all users. When
                an electrician reports a fault, diagnoses it, and confirms the root cause, that data
                point is added to the database. Over time, this builds an increasingly accurate
                picture of which symptoms typically lead to which root causes in different types of
                installation. The more faults that are reported and resolved, the better the AI
                becomes at ranking probable causes for new faults.
              </p>
              <p>
                Individual feedback refines the AI's recommendations for your specific work. If you
                consistently find that a particular fault type is more common in your area (for
                example, if you work in a coastal area where moisture ingress is more prevalent due
                to the salt air), the AI adjusts its probability rankings for your future diagnoses.
              </p>
              <p>
                This learning mechanism is particularly valuable for emerging fault patterns. For
                example, as more homes install EV chargers with Type A or Type B RCDs, new fault
                patterns emerge that are not yet documented in textbooks. The AI captures these
                patterns from early adopters and makes them available to all users, accelerating the
                spread of diagnostic knowledge across the trade.
              </p>
              <p>
                All fault data is anonymised before being added to the collective database. No
                client details, property addresses, or personally identifiable information is
                shared. Elec-Mate complies fully with UK GDPR for all data processing. See our guide
                on{' '}
                <SEOInternalLink href="/guides/ai-tools-for-electricians">
                  AI tools for electricians
                </SEOInternalLink>{' '}
                for more on privacy and data handling.
              </p>
            </>
          ),
        },
        {
          id: 'common-fault-scenarios',
          heading: 'Common Fault Scenarios',
          content: (
            <>
              <p>
                Here are some of the most common fault scenarios that electricians encounter, and
                how the AI approaches each one:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">RCD tripping — immediate</span> —
                  suggests a direct earth fault on one of the protected circuits. The AI recommends
                  isolating circuits one at a time to identify the affected circuit, then isolating
                  appliances on that circuit. If no appliance is at fault, insulation resistance
                  testing is recommended. See our guide on{' '}
                  <SEOInternalLink href="/guides/rcd-keeps-tripping">
                    RCD keeps tripping
                  </SEOInternalLink>
                  .
                </li>
                <li>
                  <span className="font-semibold text-white">RCD tripping — delayed</span> —
                  suggests a thermal or load-dependent cause. The AI prioritises appliance faults
                  (heating elements with developing insulation breakdown), moisture ingress that
                  worsens with ambient temperature, and cumulative leakage from multiple circuits.
                </li>
                <li>
                  <span className="font-semibold text-white">MCB tripping</span> — the AI
                  distinguishes between overcurrent tripping (circuit overloaded or short circuit)
                  and magnetic tripping (high inrush current). For overcurrent, it suggests load
                  analysis. For magnetic tripping, it suggests checking for appliances with high
                  starting currents.
                </li>
                <li>
                  <span className="font-semibold text-white">Partial loss of supply</span> — the AI
                  considers lost neutral (extremely dangerous on TN-C-S systems), single-phase loss
                  on a three-phase supply, supply fuse failure, and internal distribution faults.
                </li>
                <li>
                  <span className="font-semibold text-white">Intermittent faults</span> — the
                  hardest faults to diagnose. The AI asks for detailed timing patterns, weather
                  correlations, load correlations, and temperature correlations to narrow down the
                  cause. It may suggest extended monitoring or thermal imaging to capture the fault
                  during occurrence.
                </li>
                <li>
                  <span className="font-semibold text-white">High earth fault loop impedance</span>{' '}
                  — the AI considers loose or degraded earth connections, undersized CPCs, long
                  cable runs, and supply-side earth path issues. It recommends systematic testing
                  from the origin outward to localise the high-resistance point.
                </li>
              </ul>
              <p>
                For each scenario, the AI provides both the technical diagnosis and a plain-English
                explanation suitable for communicating with the client. This dual output saves time
                and helps you explain the fault and required repair to homeowners who do not
                understand electrical terminology. The{' '}
                <SEOInternalLink href="/tools/ai-electrician">Client Explainer</SEOInternalLink>{' '}
                feature produces even more detailed client-facing explanations when needed.
              </p>
              <SEOAppBridge
                title="AI Fault Diagnosis + Client Explainer"
                description="Diagnose the fault with AI assistance, then generate a clear, plain-English explanation for the client. Both features are built into Elec-Mate at no extra cost."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'limitations',
          heading: 'Limitations of AI Fault Finding',
          content: (
            <>
              <p>
                AI fault finding is a powerful diagnostic aid, but it has clear limitations that
                every electrician should understand:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">No physical inspection</span> — the AI
                  cannot see the installation, smell burning, feel a warm connection, or hear an
                  arcing fault. These sensory observations are often critical diagnostic clues that
                  only a person on site can detect.
                </li>
                <li>
                  <span className="font-semibold text-white">No testing capability</span> — the AI
                  suggests tests but cannot carry them out. You still need your Megger or Metrel,
                  your proved voltage indicator, and your competence in safe isolation and testing
                  procedures.
                </li>
                <li>
                  <span className="font-semibold text-white">Depends on symptom quality</span> — the
                  AI diagnosis is only as good as the symptom description. If you describe the fault
                  inaccurately or miss a key detail, the AI's ranking of probable causes may be
                  misleading.
                </li>
                <li>
                  <span className="font-semibold text-white">Unusual or unique faults</span> — the
                  AI works best for fault patterns that have been seen before. Truly novel faults —
                  caused by unusual equipment combinations, manufacturing defects, or unprecedented
                  environmental conditions — may not match any pattern in the database.
                </li>
                <li>
                  <span className="font-semibold text-white">Does not replace experience</span> —
                  the best fault diagnosticians combine AI assistance with their own experience,
                  intuition, and on-site observations. AI is a tool in the diagnostic toolkit, not
                  the entire toolkit.
                </li>
              </ul>
              <p>
                Think of AI fault finding as a colleague with a very good memory. They can recall
                every fault pattern from a database of thousands of cases and suggest what to check
                first. But they are not on site, they cannot hold a test lead, and they rely on you
                to describe what you see. The combination of their knowledge and your hands-on
                skills is more effective than either alone.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Is AI fault finding reliable enough for professional use?',
          answer:
            "AI fault finding should be used as a diagnostic aid, not as a definitive diagnosis. The probable causes it suggests are ranked by likelihood based on the symptoms described, but the actual root cause must always be confirmed through physical testing and inspection. That said, the AI is highly reliable in its role as a diagnostic aid — it consistently identifies the correct root cause within its top three suggestions for common fault patterns, and its recommended test sequences follow established diagnostic best practice. Many electricians find it most valuable for faults outside their usual experience, where the AI's broader knowledge base suggests causes they might not have considered.",
        },
        {
          question: 'How is AI fault finding different from just searching online?',
          answer:
            'There are three key differences. First, the AI analyses your specific symptom combination rather than returning generic articles about a single fault type. A web search for "RCD tripping" gives you general information; the AI analyses the specific timing, circuit, load pattern, and installation context of your fault. Second, the AI ranks causes by probability rather than presenting all possible causes as equally likely. This prioritisation is based on real fault data, not editorial judgement. Third, the AI recommends a specific diagnostic test sequence tailored to your symptoms, rather than a generic testing procedure. This directed approach typically resolves faults faster than working through general guidance.',
        },
        {
          question: 'Can the AI diagnose faults from test results alone?',
          answer:
            'Yes. If you have already taken test readings, you can provide them to the AI along with your symptom description. The AI analyses the test data — insulation resistance values, earth fault loop impedance readings, continuity measurements, RCD trip times — and uses them to refine its diagnosis. For example, if you report an RCD tripping and also provide an insulation resistance reading of 0.5 megohm on the shower circuit, the AI immediately identifies cable insulation deterioration on that circuit as the primary cause, rather than working through the full differential diagnosis. Including test data significantly improves the accuracy and speed of the diagnosis.',
        },
        {
          question: 'Does AI fault finding work for three-phase installations?',
          answer:
            'Yes. The AI handles three-phase fault diagnosis including phase-to-phase faults, single-phase loss, phase imbalance, neutral faults on three-phase systems, and power factor issues. Three-phase faults can be more complex than single-phase faults because of the additional conductors, the possibility of phase-to-phase faults as well as phase-to-earth faults, and the effects of load imbalance. The AI considers all of these factors and adjusts its diagnostic approach accordingly. For example, if lighting flickers on one phase while loads on other phases are unaffected, the AI identifies single-phase supply issues as more likely than internal installation faults.',
        },
        {
          question: 'Can I use AI fault finding for motor control circuit faults?',
          answer:
            'Yes, although motor control circuit diagnosis requires more specific information about the control circuit configuration. The AI can diagnose common motor circuit faults including contactor chatter (control voltage issues), motor overload tripping (mechanical overload, bearing failure, single-phasing), starter faults, and variable speed drive errors. For motor control circuits, the AI asks additional questions about the motor type, starter type, control circuit configuration, and any error codes displayed on VSD panels. This is one area where providing detailed symptom information makes a significant difference to the quality of the diagnosis.',
        },
        {
          question: 'Does the AI consider the age of the installation in its diagnosis?',
          answer:
            'Yes. Installation age is a significant factor in fault probability. Older installations with rubber-insulated wiring (pre-1970s) are far more likely to have insulation deterioration faults than modern thermoplastic installations. Installations from the 1960s-70s may have aluminium wiring (rare in the UK but present in some properties) with its associated oxidation and high-resistance connection problems. Rewireable fuse boards are more likely to have loose or deteriorated fuse carrier contacts. The AI adjusts its probability rankings based on the installation age, wiring system type, and the known failure modes of the components used in that era.',
        },
        {
          question: 'How does the AI handle intermittent faults?',
          answer:
            'Intermittent faults are the most challenging to diagnose, and the AI approaches them differently from permanent faults. For intermittent faults, the AI focuses heavily on the pattern — when does the fault occur, how long does it last, what environmental conditions are present, and what loads are connected at the time. It then correlates these patterns against known intermittent fault causes: thermal expansion of loose connections (occurs under load, clears when load is removed), moisture ingress (occurs during rain or high humidity), and time-switch or control circuit issues (occurs at specific times). The AI may also recommend extended monitoring strategies — for example, installing a data logger to record voltage and current over several days to capture the fault pattern, or using thermal imaging to identify hot spots during the fault condition.',
        },
      ]}
      faqHeading="AI Fault Finding FAQs"
      relatedPages={[
        {
          href: '/guides/rcd-keeps-tripping',
          title: 'RCD Keeps Tripping',
          description:
            'Common causes and diagnostic steps for RCDs that trip repeatedly, including appliance faults, insulation breakdown, and moisture ingress.',
          icon: Zap,
          category: 'Guides',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description:
            'The correct sequence for electrical testing to BS 7671 — continuity, insulation resistance, polarity, earth fault loop impedance, and RCD testing.',
          icon: ListChecks,
          category: 'Guides',
        },
        {
          href: '/guides/insulation-resistance-test',
          title: 'Insulation Resistance Testing',
          description:
            'How to carry out insulation resistance tests correctly, interpret results, and identify cable deterioration and moisture ingress.',
          icon: Activity,
          category: 'Guides',
        },
        {
          href: '/tools/ai-component-identification',
          title: 'AI Component Identification',
          description:
            'Identify electrical components from a photo — useful for identifying failed devices during fault finding.',
          icon: Camera,
          category: 'AI Tools',
        },
        {
          href: '/tools/ai-installation-verification',
          title: 'AI Installation Verification',
          description:
            'Automated compliance checking against BS 7671 — verify installations after fault repair.',
          icon: ShieldCheck,
          category: 'AI Tools',
        },
        {
          href: '/guides/ai-tools-for-electricians',
          title: 'AI Tools for Electricians 2026',
          description:
            'Complete guide to AI tools for UK electricians including fault diagnosis, board scanning, and compliance checking.',
          icon: Brain,
          category: 'Guides',
        },
      ]}
      ctaHeading="Diagnose faults faster with AI"
      ctaSubheading="Join 430+ UK electricians using AI-powered fault diagnosis. Describe the symptoms, get probable causes ranked by likelihood, and follow the optimal test sequence. 7-day free trial, cancel anytime."
    />
  );
}
