import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, ClipboardList } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';

const RiskAssessmentPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/safety-fundamentals')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Safety"
          title="Risk assessment & RAMS"
          description="Reading them, understanding them, and writing your own. RAMS aren't paperwork — they're the difference between knowing the risks and walking into them blind."
          tone="yellow"
        />
      </motion.div>

      {/* Intro */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold text-white">
              Understanding Risk Before You Start Work
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            A risk assessment identifies what could go wrong and what controls are in place to
            prevent it. Every job you work on should have a risk assessment — and you should read it
            before you start work. The Management of Health and Safety at Work Regulations 1999
            (regulation 3) require your employer to carry out a{' '}
            <span className="font-semibold text-elec-yellow">suitable and sufficient</span>{' '}
            assessment of the risks to workers and anyone else affected by the work.
          </p>
          <p className="text-white text-sm leading-relaxed">
            As an apprentice, you are not expected to write risk assessments from scratch, but you{' '}
            <span className="font-bold text-elec-yellow">
              must understand them, follow them, and speak up if something does not match reality on
              site
            </span>
            .
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-2">
            <h3 className="text-elec-yellow text-xs font-semibold uppercase tracking-wide">
              Hazard vs Risk — Know the Difference
            </h3>
            <p className="text-white text-xs leading-relaxed">
              <span className="font-semibold">Hazard:</span> anything with the potential to cause
              harm — e.g. a live conductor, a cable across a walkway, working at height.
            </p>
            <p className="text-white text-xs leading-relaxed">
              <span className="font-semibold">Risk:</span> the likelihood that the hazard will
              actually cause harm, combined with how serious that harm would be. The same hazard can
              carry a high or low risk depending on the controls in place. Risk assessment is about
              reducing that risk — you rarely remove the hazard entirely.
            </p>
          </div>
        </div>
      </div>

      {/* The 5 Steps */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">
            The HSE 5 Steps to Risk Assessment
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The Health and Safety Executive's long-standing five-step approach (set out in INDG163)
            is the process you will learn for your qualifications and the one most employers'
            assessments are built on. HSE now also frames this as identify, assess, control, record
            and review — the same five actions in plain language.
          </p>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Identify the Hazards',
                detail:
                  'Walk the work area and identify anything that could cause harm. For electrical work, hazards include: live conductors, working at height, manual handling (heavy cable drums, distribution boards), dust from chasing, asbestos in older buildings, confined spaces, hot surfaces, moving machinery, and other trades working nearby.',
                examples: [
                  'Exposed live parts during testing',
                  'Cables running across walkways (trip hazard)',
                  'Drilling into walls that may contain hidden services',
                  'Lifting heavy distribution boards',
                  'Working in a loft space with limited headroom and insulation (skin irritant)',
                ],
              },
              {
                step: 2,
                title: 'Decide Who Might Be Harmed and How',
                detail:
                  'Consider everyone who could be affected — not just those doing the work. This includes other workers, members of the public, visitors, and vulnerable groups. Think about how each hazard could cause harm.',
                examples: [
                  'Electricians — electric shock from live testing',
                  'Other trades — tripping over trailing cables',
                  'Building occupants — exposure to dust from chasing',
                  'Apprentices — less experience means higher risk of error',
                  'Members of public — if work is near a public area',
                ],
              },
              {
                step: 3,
                title: 'Evaluate the Risks and Decide on Precautions',
                detail:
                  'For each hazard, evaluate the likelihood of harm and the severity. Then decide what precautions (controls) are needed. Apply the hierarchy of controls (see below). The goal is to reduce the risk to "as low as reasonably practicable" (ALARP).',
                examples: [
                  'Electric shock → safe isolation, lock-off, GS38 test equipment',
                  'Falls from height → use tower scaffold instead of ladder for extended work',
                  'Dust → use extraction, wear FFP3 mask, dampen surface before cutting',
                  'Manual handling → use cable drum stand, trolley, or two-person lift',
                  'Hidden services → use CAT scanner before drilling, check drawings',
                ],
              },
              {
                step: 4,
                title: 'Record Your Findings and Implement Them',
                detail:
                  'If your employer has 5 or more employees, the risk assessment must be written down. The significant findings, the people affected, and the controls must all be recorded. The assessment must be shared with everyone affected — including you.',
                examples: [
                  'Risk assessment documented and filed on site',
                  'Briefed to all workers at toolbox talk or site induction',
                  'Controls put in place before work starts',
                  'PPE provided and available',
                  'Emergency procedures understood by all',
                ],
              },
              {
                step: 5,
                title: 'Review and Update',
                detail:
                  'Risk assessments are living documents — they must be reviewed when conditions change, after an incident, when new hazards are identified, or at regular intervals. If you notice something on site that the risk assessment does not cover, tell your supervisor immediately.',
                examples: [
                  'Weather changes making outdoor work more hazardous',
                  'Other trades starting work that creates new hazards',
                  'Discovery of asbestos or contaminated materials',
                  'Changes to the scope of work',
                  'After a near miss or accident',
                ],
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-white text-sm">{item.detail}</p>
                <div>
                  <h4 className="text-elec-yellow text-xs font-semibold mb-2">
                    Examples for Electrical Work
                  </h4>
                  <div className="space-y-1">
                    {item.examples.map((example) => (
                      <div key={example} className="flex items-start gap-2 text-xs text-white">
                        <div className="w-1 h-1 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0" />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hierarchy of Controls */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">Hierarchy of Controls</h2>
          <p className="text-white text-sm leading-relaxed">
            When deciding how to control a hazard, use the hierarchy of controls. Start at the top
            (most effective) and work down — only move to a lower, weaker control when the one above
            is not reasonably practicable. PPE is always the{' '}
            <span className="font-bold text-red-400">last resort</span>, not the first option.
          </p>

          <div className="space-y-3">
            {[
              {
                level: '1. Elimination',
                detail:
                  'Remove the hazard entirely. Can you design out the risk? For example, pre-wire at ground level before lifting into position to avoid working at height.',
                colour: 'text-green-400',
                border: 'border-green-500/20',
                bg: 'bg-green-500/10',
              },
              {
                level: '2. Substitution',
                detail:
                  'Replace the hazard with something less dangerous. For example, use battery-powered tools instead of 110V tools to eliminate trailing leads and reduce electrical risk.',
                colour: 'text-green-400',
                border: 'border-green-500/20',
                bg: 'bg-green-500/10',
              },
              {
                level: '3. Engineering Controls',
                detail:
                  'Physically separate people from the hazard. For example, use insulated barriers around live parts, guard rails around openings, extraction systems for dust.',
                colour: 'text-blue-400',
                border: 'border-blue-500/20',
                bg: 'bg-blue-500/10',
              },
              {
                level: '4. Administrative Controls',
                detail:
                  'Change the way people work. For example, permit-to-work systems, safe isolation procedures, training, toolbox talks, signage, supervision.',
                colour: 'text-amber-400',
                border: 'border-amber-500/20',
                bg: 'bg-amber-500/10',
              },
              {
                level: '5. PPE (Last Resort)',
                detail:
                  'Personal Protective Equipment only protects the individual and only when worn correctly. It does nothing to remove the hazard. Examples: safety glasses, gloves, hard hats, harnesses.',
                colour: 'text-red-400',
                border: 'border-red-500/20',
                bg: 'bg-red-500/10',
              },
            ].map((item) => (
              <div key={item.level} className={`${item.bg} ${item.border} border rounded-lg p-4`}>
                <h3 className={`font-semibold ${item.colour} text-sm mb-2`}>{item.level}</h3>
                <p className="text-white text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RAMS */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">
            RAMS — Risk Assessment and Method Statement
          </h2>
          <p className="text-white text-sm leading-relaxed">
            On commercial and industrial sites, you will encounter RAMS documents. A RAMS combines a
            risk assessment with a method statement — it covers both "what could go wrong" and "how
            we will do the work safely". Most principal contractors will not allow you to start work
            until RAMS have been submitted and approved.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">What a Method Statement Contains</h3>
            {[
              'Description of the work to be carried out',
              'Sequence of work — step by step, in order',
              'The people involved, their roles, and competencies required',
              'Equipment, tools, and materials needed',
              'Specific hazards identified and controls for each step',
              'PPE requirements for each stage of the work',
              'Emergency procedures and contacts',
              'Permit-to-work requirements (if applicable)',
              'Sign-off section for all workers who have read and understood it',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-elec-yellow">As an apprentice: </span>
              You will be asked to sign RAMS to confirm you have read and understood them. Never
              sign a RAMS you have not read. If you do not understand something in the RAMS, ask
              your supervisor to explain it before signing.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Risk Assessment */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-lg font-semibold text-elec-yellow">Dynamic Risk Assessment</h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            A dynamic risk assessment is an ongoing, real-time mental process of identifying hazards
            as you encounter them during work. Even when a formal written risk assessment exists,
            conditions on site change — and you must continuously assess whether it is safe to
            continue.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">The STAR Method</h3>
            {[
              {
                letter: 'S',
                word: 'Stop',
                detail:
                  'Before starting each task, pause and look around. What has changed since the risk assessment was written?',
              },
              {
                letter: 'T',
                word: 'Think',
                detail:
                  'What could go wrong with this specific task, in these specific conditions, right now?',
              },
              {
                letter: 'A',
                word: 'Act',
                detail:
                  'Put controls in place. If you cannot control the risk, stop work and report it.',
              },
              {
                letter: 'R',
                word: 'Review',
                detail: 'Check your controls are working. If conditions change, reassess.',
              },
            ].map((item) => (
              <div
                key={item.letter}
                className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-elec-yellow font-bold text-lg">{item.letter}</span>
                  <h4 className="text-elec-yellow font-semibold text-sm">— {item.word}</h4>
                </div>
                <p className="text-white text-xs">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">When to Stop Work and Reassess</h3>
            {[
              'You discover something unexpected (e.g. asbestos, hidden cables, gas pipes)',
              'The weather changes significantly (rain making surfaces slippery, wind affecting tower stability)',
              'Other trades start work that affects your area',
              'Equipment fails or is damaged',
              'You feel unwell, tired, or unable to concentrate',
              'You are asked to do something not covered by the risk assessment',
              'Something just does not feel right — trust your instincts',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <AlertTriangle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COSHH */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">COSHH — Hazardous Substances</h2>
          <p className="text-white text-sm leading-relaxed">
            The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers
            to assess and control exposure to hazardous substances. As an electrician, you may
            encounter:
          </p>

          <div className="space-y-2">
            {[
              {
                substance: 'Silica dust',
                source: 'Chasing walls, drilling concrete, cutting blocks',
                control:
                  'Use extraction or wet cutting. Wear FFP3 mask. Silica causes silicosis — a serious lung disease.',
              },
              {
                substance: 'Asbestos',
                source:
                  'Pre-2000 buildings — cable routes, floor tiles, textured coatings, insulation boards (AIB), pipe lagging, soffits and fuse flash-guards',
                control:
                  'STOP WORK immediately if you suspect asbestos. Do not drill, cut, or disturb it. Report to your supervisor and check the building’s asbestos register before work resumes. Most licensed asbestos work must be done by an HSE-licensed contractor.',
                danger: true,
              },
              {
                substance: 'Lead',
                source: 'Old paintwork, lead cable sheathing in pre-1970s buildings',
                control:
                  'Avoid sanding or burning lead paint. Wear gloves. Wash hands before eating.',
              },
              {
                substance: 'Isocyanates',
                source: 'Expanding foam (PU foam) used for sealing cable penetrations',
                control:
                  'Use in well-ventilated areas. Wear nitrile gloves. Can cause occupational asthma with repeated exposure.',
              },
              {
                substance: 'Solvents and adhesives',
                source: 'PVC cement, cable cleaner, degreaser',
                control: 'Use in ventilated areas. Wear gloves. Follow COSHH data sheet.',
              },
            ].map((item) => (
              <div
                key={item.substance}
                className={`rounded-md border p-3 ${
                  item.danger
                    ? 'border-red-500/30 bg-red-500/[0.06]'
                    : 'border-elec-yellow/20 bg-elec-yellow/[0.04]'
                }`}
              >
                <h4
                  className={`font-semibold text-sm mb-1 ${
                    item.danger ? 'text-red-400' : 'text-elec-yellow'
                  }`}
                >
                  {item.substance}
                </h4>
                <p className="text-white text-xs mb-1">
                  <span className="font-semibold">Source: </span>
                  {item.source}
                </p>
                <p className="text-white text-xs">
                  <span className="font-semibold">Control: </span>
                  {item.control}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Handling */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">Manual Handling</h2>
          <p className="text-white text-sm leading-relaxed">
            Manual handling injuries are one of the most common workplace injuries for electricians.
            Heavy cable drums, distribution boards, trunking lengths, and tools all need to be
            lifted, carried, and positioned regularly.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Safe Lifting Technique</h3>
            {[
              'Plan the lift: Where is it going? Is the path clear? Do you need help?',
              'Stand close to the load with feet shoulder-width apart, one foot slightly forward',
              'Bend at the knees, not the waist — keep your back straight',
              'Get a firm grip on the load',
              'Lift using your legs, not your back — straighten your knees smoothly',
              'Keep the load close to your body at waist height',
              'Avoid twisting — turn with your feet, not your spine',
              'Set down by reversing the procedure — bend knees, keep back straight',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-white">
                <span className="text-elec-yellow font-bold text-xs mt-0.5">{idx + 1}.</span>
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-white text-xs">
              <span className="font-semibold text-elec-yellow">HSE guideline weights: </span>
              The HSE filter figure for lifting at waist height, close to the body, is around 25kg
              for men and 16kg for women. These are screening guidelines, not safe limits — the
              figure drops sharply as the load moves away from the body, above shoulder or below
              knee height. Actual limits also depend on frequency, twisting, distance carried and
              individual capability. If in doubt, use a trolley, drum stand, or ask for help.
            </p>
          </div>
        </div>
      </div>

      {/* Your Role */}
      <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04]">
        <div className="p-4 sm:p-5 space-y-3">
          <h2 className="text-sm font-semibold text-elec-yellow">Your Role as an Apprentice</h2>
          <div className="space-y-2">
            {[
              'Read the risk assessment and method statement before starting any new task',
              'Sign the RAMS to confirm you have read and understood them',
              'Follow the controls specified in the risk assessment',
              'Speak up if conditions on site do not match the risk assessment',
              'Report any new hazards you identify to your supervisor',
              'Never take shortcuts that bypass safety controls',
              'If you are unsure whether something is safe, stop and ask',
              'Record near misses — they help prevent future accidents',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-md border border-white/[0.08] bg-[hsl(0_0%_8%)] p-3">
            <p className="text-white text-xs leading-relaxed">
              <span className="font-semibold text-elec-yellow">
                This is the law, not just good practice.{' '}
              </span>
              Under section 7 of the Health and Safety at Work etc. Act 1974 you have a legal duty
              to take reasonable care of your own health and safety and that of others affected by
              what you do, and to cooperate with your employer on safety. You cannot be disciplined
              or dismissed for raising a genuine safety concern — stopping an unsafe job is always
              the right call.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5">
          <p className="text-white text-xs leading-relaxed">
            Based on the Health and Safety at Work etc. Act 1974, the Management of Health and
            Safety at Work Regulations 1999, HSE guidance INDG163 (Five steps to risk assessment),
            the Control of Substances Hazardous to Health Regulations 2002, and the Manual Handling
            Operations Regulations 1992. Always follow your employer's specific risk assessment and
            method statement for each task.
          </p>
        </div>
      </div>
    </PageFrame>
  );
};

export default RiskAssessmentPage;
