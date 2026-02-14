import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Brain,
  Camera,
  PoundSterling,
  CircuitBoard,
  ShieldAlert,
  Search,
  FileText,
  Sparkles,
} from 'lucide-react';

export default function AIToolsForElectriciansPage() {
  return (
    <GuideTemplate
      title="AI Tools for Electricians 2026 | Complete Guide"
      description="How AI is transforming electrical work in 2026. Practical guide to AI board scanning, defect classification, cost estimation, circuit design, RAMS generation, fault diagnosis, and more. Covers privacy, accuracy, and what to look for in AI tools."
      datePublished="2026-01-15"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'AI Tools for Electricians', href: '/guides/ai-tools-for-electricians' },
      ]}
      tocItems={[
        { id: 'how-ai-is-changing-electrical-work', label: 'How AI Is Changing Electrical Work' },
        { id: 'practical-ai-uses', label: 'Practical AI Uses on Site' },
        { id: 'ai-board-scanning', label: 'AI Board Scanning' },
        { id: 'ai-defect-classification', label: 'AI Defect Classification' },
        { id: 'ai-cost-estimation', label: 'AI Cost Estimation and Quoting' },
        { id: 'ai-circuit-design', label: 'AI Circuit Design' },
        { id: 'ai-health-safety', label: 'AI Health and Safety Documents' },
        { id: 'ai-fault-diagnosis', label: 'AI Fault Diagnosis' },
        { id: 'what-to-look-for', label: 'What to Look for in AI Tools' },
        { id: 'privacy-and-data', label: 'Privacy and Data Concerns' },
        { id: 'future-of-ai', label: 'The Future of AI in the Trade' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="AI Guide"
      badgeIcon={Brain}
      heroTitle={
        <>
          <span className="text-yellow-400">AI Tools</span> for Electricians — The Complete 2026
          Guide
        </>
      }
      heroSubtitle="Artificial intelligence is no longer a futuristic concept for the electrical trade. From scanning consumer units with your phone camera to generating compliant RAMS documents in seconds, AI tools are already saving electricians hours every week. This guide covers every practical AI application available to UK electricians in 2026 — what works, what does not, and how to choose the right tools for your business."
      readingTime={18}
      keyTakeaways={[
        'AI can now scan a consumer unit photo and extract circuit data, device ratings, and board layout in seconds — replacing manual data entry on site.',
        'Defect classification AI maps plain-English defect descriptions to the correct C1, C2, C3, or FI code with the supporting BS 7671 regulation reference.',
        'AI cost estimation tools generate itemised quotes with materials and labour from a job description, using real UK trade pricing data.',
        'AI circuit designers produce complete consumer unit schedules with cable sizes, protective device ratings, and diversity calculations to BS 7671.',
        'Privacy matters — look for AI tools that process data in the UK/EU, do not train on your client data, and comply with GDPR.',
      ]}
      sections={[
        {
          id: 'how-ai-is-changing-electrical-work',
          heading: 'How AI Is Changing Electrical Work',
          content: (
            <>
              <p>
                The electrical trade has always been slower to adopt software than office-based
                industries. That is changing rapidly. In 2026, AI tools designed specifically for
                electricians are handling tasks that used to take hours — writing up inspection
                reports, calculating cable sizes, pricing jobs, generating health and safety
                documents, and even diagnosing faults from symptom descriptions.
              </p>
              <p>
                The important distinction is between general AI tools (like ChatGPT or Google
                Gemini) and trade-specific AI tools built for electricians. General AI can answer
                basic electrical questions, but it lacks the precision needed for BS 7671 compliance
                work. It does not know current trade pricing, it cannot reference specific
                regulation numbers reliably, and it has no understanding of UK-specific installation
                practices.
              </p>
              <p>
                Trade-specific AI tools are different. They are built on top of large language
                models but augmented with specialist data — the full text of BS 7671:2018+A3:2024,
                IET Guidance Notes, real trade pricing databases, and installation scenario
                libraries. This means the AI retrieves the exact regulation text or pricing data
                before generating its response, rather than relying on what it memorised during
                training.
              </p>
              <p>
                The result is AI that can cite Regulation 411.3.2 when discussing disconnection
                times, quote current Hager RCBO prices when estimating a board change, and know that
                a 10mm twin and earth cable to a cooker circuit needs a 32A MCB, not a 40A. This
                level of accuracy makes AI genuinely useful on site, not just a novelty.
              </p>
            </>
          ),
        },
        {
          id: 'practical-ai-uses',
          heading: 'Practical AI Uses on Site',
          content: (
            <>
              <p>
                AI is not about replacing electricians. It is about eliminating the repetitive,
                time-consuming tasks that eat into your productive hours. Here are the practical
                applications that are already in use across the UK trade in 2026:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Board scanning</span> — photograph a
                  consumer unit and AI extracts every circuit, device type, rating, and manufacturer
                  automatically.
                </li>
                <li>
                  <span className="font-semibold text-white">Defect code classification</span> —
                  describe a defect in plain English and AI assigns the correct observation code
                  (C1, C2, C3, or FI) with the supporting BS 7671 regulation.
                </li>
                <li>
                  <span className="font-semibold text-white">Cost estimation</span> — describe a job
                  and get an itemised quote with materials, labour, and profit margin in under a
                  minute.
                </li>
                <li>
                  <span className="font-semibold text-white">Circuit design</span> — specify a
                  property and AI produces a complete consumer unit schedule with cable sizes,
                  protective device selections, and diversity calculations.
                </li>
                <li>
                  <span className="font-semibold text-white">RAMS generation</span> — describe the
                  work and location, and AI produces a site-specific risk assessment and method
                  statement.
                </li>
                <li>
                  <span className="font-semibold text-white">Fault diagnosis</span> — describe
                  symptoms and AI suggests probable causes with diagnostic steps.
                </li>
                <li>
                  <span className="font-semibold text-white">Voice to test results</span> — speak
                  your test readings aloud and AI transcribes them directly into your schedule of
                  test results.
                </li>
                <li>
                  <span className="font-semibold text-white">Regulations lookup</span> — ask a
                  question about BS 7671 in plain English and get the specific regulation reference
                  with explanation.
                </li>
                <li>
                  <span className="font-semibold text-white">Client explainer</span> — AI translates
                  technical defects and recommendations into plain English that homeowners can
                  understand.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'ai-board-scanning',
          heading: 'AI Board Scanning',
          content: (
            <>
              <p>
                AI board scanning is one of the most immediately useful AI features for electricians
                carrying out EICRs. Instead of manually recording every circuit in a consumer unit —
                the device type, rating, manufacturer, and circuit description — you photograph the
                board and AI does the data entry for you.
              </p>
              <p>
                The technology uses computer vision (image recognition) combined with a database of
                consumer unit components. The AI identifies the manufacturer and model of the
                enclosure, recognises individual MCBs, RCBOs, RCDs, and SPDs by their physical
                appearance, reads the current rating printed on each device, and maps out the board
                layout from left to right.
              </p>
              <p>
                This is not hypothetical technology. Elec-Mate's{' '}
                <SEOInternalLink href="/tools/ai-electrician">AI Board Scanner</SEOInternalLink>{' '}
                does exactly this. You take a photo of the consumer unit with your phone, the AI
                processes the image, and the circuit data appears in your EICR or EIC form ready for
                review. You still verify the data — the AI is not perfect, especially with older or
                damaged boards — but it eliminates 80-90% of the manual data entry.
              </p>
              <SEOAppBridge
                title="AI Board Scanner — Built Into Elec-Mate"
                description="Photograph any consumer unit and the AI extracts circuit data, device ratings, and board layout in seconds. Review and edit before it flows into your EICR. No separate app needed."
                icon={Camera}
              />
              <p>
                For a typical domestic EICR with 10-12 circuits, manual data entry takes 5-10
                minutes. AI board scanning reduces this to under 30 seconds plus a quick review.
                Over a week of inspections, that adds up to hours saved.
              </p>
            </>
          ),
        },
        {
          id: 'ai-defect-classification',
          heading: 'AI Defect Classification',
          content: (
            <>
              <p>
                One of the most time-consuming parts of an EICR is classifying defects correctly.
                You need to assign the right observation code (C1 for danger present, C2 for
                potentially dangerous, C3 for improvement recommended, or FI for further
                investigation) and cite the relevant BS 7671 regulation that the defect contravenes.
              </p>
              <p>
                Getting this wrong has consequences. An incorrect C1 classification when the defect
                is really a C3 creates unnecessary alarm for the client and landlord. An incorrect
                C3 when the defect should be a C2 could leave a genuinely dangerous condition
                unreported. And citing the wrong regulation undermines your credibility if the
                certificate is reviewed by a scheme provider or challenged in a dispute.
              </p>
              <p>
                AI defect classification solves this by letting you describe the defect in plain
                English — for example, "no RCD protection on socket outlets in the kitchen" — and
                the AI returns the correct code (C2), the regulation reference (Regulation 411.3.3),
                and a properly worded observation for the certificate.
              </p>
              <p>
                Elec-Mate's Defect Code AI is trained on BS 7671:2018+A3:2024 and thousands of
                real-world EICR observations. It handles everything from simple non-compliances ("no
                earth on lighting circuit" = C2, Reg 411.3.1.1) to nuanced situations ("original
                wiring in good condition but no RCD protection" = C3, Reg 411.3.3 — because it was
                compliant at the time of installation under the 16th Edition).
              </p>
              <SEOAppBridge
                title="Defect Code AI — Instant C1/C2/C3/FI Classification"
                description="Describe any defect in plain English. The AI assigns the correct observation code, cites the specific BS 7671 regulation, and writes a professional observation for your certificate."
                icon={Search}
              />
            </>
          ),
        },
        {
          id: 'ai-cost-estimation',
          heading: 'AI Cost Estimation and Quoting',
          content: (
            <>
              <p>
                Pricing electrical work accurately is one of the hardest parts of running an
                electrical business. Underquote and you lose money. Overquote and you lose the job.
                The challenge is that accurate quoting requires you to mentally itemise every
                material, estimate labour time for each task, add overheads and profit, and do it
                all before you have started the work.
              </p>
              <p>
                AI cost estimation changes this by doing the itemisation for you. You describe the
                job — "consumer unit upgrade in a 3-bed semi, 10 circuits, split-load to dual RCD
                board with SPD, like-for-like cable reuse" — and the AI produces a detailed
                breakdown including specific materials (Hager VML955RK, 6 x Hager MCBs, 2 x Hager
                RCDs, Type 2 SPD), quantities, trade prices, estimated labour hours, and a total
                with your profit margin applied.
              </p>
              <p>
                Elec-Mate's{' '}
                <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink>{' '}
                uses live UK trade pricing data updated weekly and labour timing benchmarks from
                real-world installations. The AI also includes an{' '}
                <SEOInternalLink href="/tools/ai-electrician">
                  AI Remedial Cost Estimator
                </SEOInternalLink>{' '}
                that takes the defects from an EICR and generates a priced remedial works quotation
                — so you can hand the client an inspection report and a repair quote at the same
                time.
              </p>
              <SEOAppBridge
                title="AI Cost Engineer — Quotes in Under a Minute"
                description="Describe any electrical job and the AI generates an itemised quote with real UK trade pricing, labour estimates, and your profit margin. Convert to a professional PDF quote with one tap."
                icon={PoundSterling}
              />
              <p>
                For electricians who struggle with the business side of the trade — and many do — AI
                cost estimation removes the guesswork from pricing and helps ensure every job is
                quoted profitably. See our full guide on{' '}
                <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
                  how to price electrical jobs
                </SEOInternalLink>{' '}
                for more on pricing strategy.
              </p>
            </>
          ),
        },
        {
          id: 'ai-circuit-design',
          heading: 'AI Circuit Design',
          content: (
            <>
              <p>
                Designing a consumer unit schedule manually means looking up cable current-carrying
                capacities in BS 7671 Appendix 4, applying correction factors for grouping,
                insulation, and ambient temperature, selecting protective devices that coordinate
                with the cable rating, calculating earth fault loop impedance, and verifying
                disconnection times. It is essential work, but it is also mechanical and
                time-consuming.
              </p>
              <p>
                AI circuit design tools automate this entire process. You describe the installation
                — property type, number of bedrooms, special loads (EV charger, electric shower,
                heat pump), earthing arrangement, supply capacity — and the AI produces a complete
                consumer unit schedule. This includes circuit numbers, descriptions, cable types and
                sizes, protective device types and ratings, maximum Zs values, and the recommended
                consumer unit model.
              </p>
              <p>
                Elec-Mate's{' '}
                <SEOInternalLink href="/tools/ai-circuit-designer">
                  AI Circuit Designer
                </SEOInternalLink>{' '}
                goes further by applying diversity calculations, checking that RCD protection is
                provided where required by BS 7671 (socket outlets, cables in walls and partitions,
                bathroom circuits), and recommending SPD protection in line with Regulation 443. The
                output feeds directly into your EIC schedule of circuits.
              </p>
              <SEOAppBridge
                title="AI Circuit Designer — Full CU Schedules to BS 7671"
                description="Describe the installation and the AI produces a complete consumer unit schedule with cable sizes, protective devices, diversity calculations, and RCD/SPD recommendations. All to BS 7671:2018+A3:2024."
                icon={CircuitBoard}
              />
            </>
          ),
        },
        {
          id: 'ai-health-safety',
          heading: 'AI Health and Safety Documents',
          content: (
            <>
              <p>
                Every commercial and many domestic electrical jobs require a risk assessment and
                method statement (RAMS). Writing RAMS from scratch is tedious, but using generic
                templates is worse — if a RAMS is not site-specific, it offers no real protection
                and will be rejected by any competent principal contractor.
              </p>
              <p>
                AI RAMS generation solves this by producing genuinely site-specific documents. You
                describe the work and location — "consumer unit change in an occupied ground-floor
                flat, asbestos survey clear, access via shared communal hallway, parking on public
                road" — and the AI generates a complete RAMS covering all relevant hazards (working
                on or near live equipment, working at height if the board is high-mounted, manual
                handling of the old and new consumer units, dust and debris in an occupied
                property), control measures, PPE requirements, emergency procedures, and competency
                requirements.
              </p>
              <p>
                Elec-Mate's{' '}
                <SEOInternalLink href="/tools/ai-health-safety-agent">
                  AI Health and Safety agent
                </SEOInternalLink>{' '}
                generates risk assessments, method statements, COSHH assessments, and toolbox talk
                documents. The{' '}
                <SEOInternalLink href="/tools/rams-generator">RAMS Generator</SEOInternalLink>{' '}
                exports professional PDF documents ready for submission. Documents reference the
                Health and Safety at Work Act 1974, the Management of Health and Safety at Work
                Regulations 1999, the CDM Regulations 2015, and the Electricity at Work Regulations
                1989 where applicable.
              </p>
              <SEOAppBridge
                title="AI RAMS Generator — Site-Specific in 60 Seconds"
                description="Describe the job and location. The AI generates a site-specific risk assessment and method statement with all relevant hazards, control measures, and legal references. Export as a professional PDF."
                icon={ShieldAlert}
              />
            </>
          ),
        },
        {
          id: 'ai-fault-diagnosis',
          heading: 'AI Fault Diagnosis',
          content: (
            <>
              <p>
                Diagnosing electrical faults is where experience counts most. A tripping RCD could
                be caused by a failing appliance, a deteriorated cable, moisture ingress, a neutral-
                earth fault, or a combination of factors. An experienced electrician narrows down
                the cause through systematic testing, but even experienced sparks occasionally
                encounter faults that are difficult to diagnose.
              </p>
              <p>
                AI fault diagnosis tools act as a second opinion. You describe the symptoms — "RCD
                trips when the immersion heater is turned on but only after 10-15 minutes of
                operation" — and the AI suggests probable causes ranked by likelihood (in this case,
                a deteriorating immersion heater element allowing current leakage to earth as it
                heats up), along with diagnostic steps to confirm or rule out each cause.
              </p>
              <p>
                Elec-Mate includes an AI Fault Diagnosis tool that draws on a library of real-world
                fault scenarios. It is not a replacement for proper testing — you still need to
                carry out insulation resistance tests, continuity tests, and visual inspections —
                but it helps you consider causes you might not have thought of, especially for
                intermittent or unusual faults.
              </p>
              <p>
                The platform also includes a{' '}
                <SEOInternalLink href="/tools/ai-electrician">Client Explainer</SEOInternalLink>{' '}
                that translates your technical diagnosis into plain English the homeowner can
                understand. Instead of saying "you have a 0.3 megohm IR reading on the shower
                circuit suggesting cable insulation breakdown," you can generate a clear explanation
                that helps the client understand why the repair is needed and what it involves.
              </p>
            </>
          ),
        },
        {
          id: 'what-to-look-for',
          heading: 'What to Look for in AI Tools',
          content: (
            <>
              <p>
                Not all AI tools marketed to electricians are equal. Here is what separates a useful
                AI tool from a gimmick:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Regulation accuracy</span> — the AI
                  must cite specific BS 7671 regulation numbers, not make vague references to "the
                  regulations." Ask it about RCD protection requirements and check whether it cites
                  Regulation 411.3.3 correctly.
                </li>
                <li>
                  <span className="font-semibold text-white">Current data</span> — pricing tools
                  must use current UK trade pricing, not data from 2023. Check whether the prices
                  are in the right ballpark for your wholesaler.
                </li>
                <li>
                  <span className="font-semibold text-white">UK-specific</span> — tools built for
                  the US market use NEC codes, not BS 7671. Ensure the tool is built for UK
                  electricians and references the correct standards, regulations, and practices.
                </li>
                <li>
                  <span className="font-semibold text-white">Integration</span> — AI that generates
                  a circuit schedule is only useful if that schedule flows into your EIC or EICR
                  form without re-typing it. Look for tools where the AI output integrates with your
                  certification and documentation workflow.
                </li>
                <li>
                  <span className="font-semibold text-white">No hallucinations</span> — all AI
                  systems can generate plausible-sounding but incorrect information
                  ("hallucinations"). The best trade AI tools ground their responses in actual
                  regulation text and pricing data, which dramatically reduces hallucination.
                </li>
              </ul>
              <p>
                Elec-Mate was built from the ground up as an AI-native platform for UK electricians.
                Every AI feature — from the 5 specialist agents to the 12 AI-powered tools — is
                trained on BS 7671:2018+A3:2024, uses real UK trade data, and integrates directly
                with the certification, quoting, and documentation tools in the app.
              </p>
            </>
          ),
        },
        {
          id: 'privacy-and-data',
          heading: 'Privacy and Data Concerns',
          content: (
            <>
              <p>
                Electricians handle sensitive information — client addresses, property details,
                access arrangements, photos of installations inside people's homes. When you use AI
                tools, this data is processed by the AI system, which raises legitimate privacy
                questions.
              </p>
              <p>Key questions to ask any AI tool provider:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Where is the data processed?</span> —
                  ideally within the UK or EU. Processing in the US or other jurisdictions means
                  your client data is subject to different legal frameworks.
                </li>
                <li>
                  <span className="font-semibold text-white">Is your data used for training?</span>{' '}
                  — some AI providers use the data you submit to improve their models. This means
                  your client's property photos could theoretically influence responses given to
                  other users. Look for providers that explicitly do not train on your data.
                </li>
                <li>
                  <span className="font-semibold text-white">GDPR compliance</span> — any AI tool
                  used in the UK must comply with UK GDPR (the Data Protection Act 2018). This
                  includes the right to deletion, data minimisation, and transparent processing.
                </li>
                <li>
                  <span className="font-semibold text-white">Data retention</span> — how long does
                  the provider keep your data? Are board photos and client details deleted after
                  processing, or stored indefinitely?
                </li>
              </ul>
              <p>
                Elec-Mate processes all AI requests through secure, GDPR-compliant infrastructure.
                Board photos are processed for data extraction and are not used to train AI models.
                Client data is encrypted at rest and in transit, and you retain full ownership and
                control of your data at all times.
              </p>
            </>
          ),
        },
        {
          id: 'future-of-ai',
          heading: 'The Future of AI in the Trade',
          content: (
            <>
              <p>
                AI in the electrical trade is still in its early stages, but the trajectory is
                clear. Over the next 2-3 years, expect to see:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Thermal imaging integration</span> — AI
                  analysis of thermal images to identify hot spots, loose connections, and
                  overloaded circuits automatically during inspections.
                </li>
                <li>
                  <span className="font-semibold text-white">Predictive maintenance</span> — AI that
                  analyses historical test data across installations to predict when components are
                  likely to fail, enabling proactive maintenance before faults occur.
                </li>
                <li>
                  <span className="font-semibold text-white">Automated report writing</span> — AI
                  that drafts complete EICR reports from test data, board scans, and defect
                  observations, requiring only review and sign-off from the inspector.
                </li>
                <li>
                  <span className="font-semibold text-white">Voice-controlled testing</span> —
                  hands-free test result entry using voice recognition while you work at the board,
                  so you never need to put down your test leads to type.
                </li>
                <li>
                  <span className="font-semibold text-white">Real-time regulation updates</span> —
                  AI that alerts you to changes in BS 7671 and explains how amendments affect your
                  current work, keeping you compliant without attending refresher courses for every
                  amendment.
                </li>
              </ul>
              <p>
                The electricians who adopt AI tools now will have a significant competitive
                advantage — faster quoting, more accurate pricing, less paperwork, and more time on
                the tools. The trade is not going to be replaced by AI, but electricians who use AI
                will outperform those who do not.
              </p>
              <SEOAppBridge
                title="Elec-Mate — 5 AI Agents, 12 AI Tools, Zero Extra Cost"
                description="Circuit Designer, Cost Engineer, Installation Specialist, Maintenance Specialist, Health and Safety agent — plus Board Scanner, Defect Code AI, Voice to Test Results, Remedial Estimator, Component Identifier, Fault Diagnosis, Regulations Lookup, Client Explainer, Diagram Builder, and Report Writer. All included in your subscription."
                icon={Sparkles}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Is AI going to replace electricians?',
          answer:
            "No. AI cannot pull cables, terminate connections, test circuits, or carry out physical installations. Electrical work is a skilled manual trade that requires hands-on expertise, and that is not going to change. What AI does replace is the paperwork, data entry, pricing calculations, and administrative tasks that take up a significant portion of an electrician's working day. A typical self-employed electrician spends 10-15 hours per week on non-productive tasks — writing quotes, filling in certificates, creating RAMS, doing accounts. AI can reduce this to 2-3 hours per week, freeing up time for billable work. The electricians who embrace AI will not lose their jobs — they will simply be more productive and more profitable than those who do not.",
        },
        {
          question: 'How accurate is AI for BS 7671 regulation lookups?',
          answer:
            "Accuracy depends entirely on how the AI tool is built. General-purpose AI models like ChatGPT have been trained on a broad dataset that includes some electrical regulation content, but they frequently confuse BS 7671 with NEC (the US National Electrical Code), cite regulation numbers that do not exist, or give answers based on older editions. Trade-specific AI tools built for electricians are far more accurate because they retrieve the exact regulation text from a current copy of BS 7671:2018+A3:2024 before generating a response. Elec-Mate's AI Regulations Lookup uses this approach, achieving high accuracy on regulation references. However, no AI tool should be used as the sole reference for compliance decisions — always verify critical regulation references against the published standard.",
        },
        {
          question: "What does Elec-Mate's AI actually include?",
          answer:
            'Elec-Mate includes 5 specialist AI agents (Circuit Designer, Cost Engineer, Installation Specialist, Maintenance Specialist, and Health and Safety) plus 12 additional AI-powered tools: AI Board Scanner (photograph a consumer unit to extract circuit data), Defect Code AI (plain-English defect to C1/C2/C3/FI classification with BS 7671 regulation), Voice to Test Results (speak your readings and they appear in the schedule), AI Remedial Cost Estimator (EICR defects to a priced remedial works quote), Component Identifier (photograph an electrical component for identification), Fault Diagnosis (symptom description to probable causes), Client Explainer (technical language to plain English for homeowners), Diagram Builder (AI-assisted wiring diagrams), Regulations Lookup (plain-English questions answered with BS 7671 references), and Report Writer (AI-assisted certificate and report drafting). All features are included in the standard subscription at no extra cost.',
        },
        {
          question: 'Can I trust AI-generated quotes and cost estimates?',
          answer:
            "AI-generated cost estimates should always be treated as a starting point, not a final quote. The accuracy of AI cost estimation depends on the quality of the pricing data, the detail in your job description, and how well the AI understands the scope of work. Elec-Mate's AI Cost Engineer uses weekly-updated UK trade pricing from major wholesalers and labour timing data from real installations, which typically produces estimates within 5-15% of the final actual cost for standard domestic and commercial work. You should always review the AI output, adjust material prices to match your actual supplier costs, modify labour hours based on site-specific factors (access difficulties, working in occupied properties, complex containment routes), and add contingency for unknown conditions. The AI saves you the 30-60 minutes of manual itemisation — the review and adjustment takes 5-10 minutes.",
        },
        {
          question: 'Is my client data safe when using AI tools?',
          answer:
            'Data safety depends on the provider. Key factors to check: whether the provider is GDPR-compliant (mandatory for UK use), whether your data is used to train AI models (it should not be), where the data is processed and stored (UK/EU is preferable), how long data is retained, and whether data is encrypted in transit and at rest. Elec-Mate is fully GDPR-compliant, does not use your data to train AI models, encrypts all data in transit and at rest, and gives you full control over your data including the right to export and delete. Board photos submitted for AI scanning are processed for data extraction only and are not shared with third parties or used for model training.',
        },
        {
          question: 'Do I need an internet connection to use AI features?',
          answer:
            'Yes. AI features require an internet connection because the AI processing happens on secure cloud servers, not on your phone. This is necessary because the AI models are too large to run on a mobile device and because they need to access current pricing data, regulation databases, and other reference material that is updated regularly. However, Elec-Mate is designed for site work where mobile signal can be unreliable. Core features like certificate forms, calculators, and test result entry work offline and sync when you regain a connection. AI features queue your request if you lose signal mid-query and process it automatically when the connection returns.',
        },
        {
          question: 'How is AI board scanning different from OCR?',
          answer:
            'Traditional OCR (optical character recognition) can read printed text on labels, but consumer units present unique challenges that basic OCR cannot handle. Device ratings are often embossed rather than printed, labels fade or are covered in dust, and the physical arrangement of devices matters as much as the text on them. AI board scanning uses computer vision — a branch of AI that understands images, not just text. It recognises the physical shape of MCBs, RCBOs, RCDs, and isolators, identifies manufacturers by device appearance (a Hager MCB looks different from a Wylex MCB), reads ratings from the device face, and maps the spatial layout of the board. The result is structured data — a list of circuits with their positions, device types, and ratings — rather than raw text. This structured data flows directly into your EICR or EIC form.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/ai-electrician',
          title: 'AI Electrician Hub',
          description:
            '5 specialist AI agents and 12 AI tools built for UK electricians. Board scanner, defect classification, cost estimation, and more.',
          icon: Brain,
          category: 'AI Tools',
        },
        {
          href: '/tools/ai-circuit-designer',
          title: 'AI Circuit Designer',
          description:
            'Complete consumer unit schedules with cable sizes, protective devices, and diversity calculations to BS 7671.',
          icon: CircuitBoard,
          category: 'AI Tools',
        },
        {
          href: '/tools/ai-cost-engineer',
          title: 'AI Cost Engineer',
          description:
            'Describe a job and get an itemised quote with real UK trade pricing, labour estimates, and profit margins.',
          icon: PoundSterling,
          category: 'AI Tools',
        },
        {
          href: '/tools/ai-health-safety-agent',
          title: 'AI Health and Safety Agent',
          description:
            'Site-specific RAMS, risk assessments, COSHH assessments, and toolbox talks generated from a job description.',
          icon: ShieldAlert,
          category: 'AI Tools',
        },
        {
          href: '/tools/rams-generator',
          title: 'RAMS Generator',
          description:
            'Professional risk assessment and method statement documents with all relevant hazards, control measures, and legal references.',
          icon: FileText,
          category: 'Health & Safety',
        },
        {
          href: '/tools/best-electrician-app-uk',
          title: 'Best Electrician App UK',
          description:
            'Compare electrician apps for certificates, testing, AI tools, quoting, and business management.',
          icon: Sparkles,
          category: 'Comparison',
        },
      ]}
      ctaHeading="Try Elec-Mate's AI Tools Free for 7 Days"
      ctaSubheading="5 AI agents, 12 AI tools, certificates, calculators, quoting, invoicing — everything an electrician needs in one app. No card required to start."
    />
  );
}
