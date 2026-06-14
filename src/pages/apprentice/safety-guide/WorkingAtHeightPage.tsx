import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';

const WorkingAtHeightPage = () => {
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
          title="Working at height"
          description="Falls are the biggest cause of fatal injuries on UK construction sites. Ladder use, podiums, scaffolding, mobile towers, edge protection — the rules and the practical decisions that keep you on solid ground."
          tone="yellow"
        />
      </motion.div>

      {/* Intro */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Falls are the biggest killer in construction
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Falls from height are the most common cause of fatal injury at work in Great Britain,
            and the single biggest killer in construction — HSE figures show falls account for over
            half of construction worker deaths. As an electrician, you will regularly work from
            ladders, step ladders, scaffolding, and mobile towers. The{' '}
            <span className="font-semibold text-elec-yellow">Work at Height Regulations 2005</span>{' '}
            apply to all work where there is a risk of falling that could cause personal injury —
            there is no minimum height threshold.
          </p>

          <div className="rounded-md border border-red-500/25 bg-red-500/[0.04] p-3">
            <p className="text-white text-sm">
              <span className="font-bold text-red-400">Key fact: </span>
              "Working at height" means any work where you could fall a distance liable to cause
              personal injury. This includes working on a ladder, on a scaffold, on a flat roof,
              next to an opening or fragile surface, or even standing on a chair. It does not
              require a specific height.
            </p>
          </div>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
            <p className="text-white text-sm">
              <span className="font-bold text-elec-yellow">Myth — the "two-metre rule": </span>
              There is no two-metre threshold in the Work at Height Regulations. The old rule was
              scrapped in 2005. A fall from below two metres can still kill or seriously injure —
              many electricians are hurt falling from step ladders and low platforms. Every
              work-at-height task needs assessing on its risk, not its height.
            </p>
          </div>
        </div>
      </div>

      {/* Hierarchy of Controls */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            The hierarchy — avoid, prevent, mitigate
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The Work at Height Regulations require a three-step approach, in strict order of
            priority. You must work down this list — you cannot jump straight to a harness because
            it is quicker:
          </p>

          <div className="space-y-3">
            {[
              {
                step: '1. Avoid',
                detail:
                  'Can the work be done without going up at all? Use long-reach tools, assemble at ground level and lift the finished unit into position, or design out the need to work at height. If you can avoid it entirely, you must.',
              },
              {
                step: '2. Prevent falls',
                detail:
                  'If you must work at height, use equipment that stops a fall happening — an existing safe place of work, or platforms with guard rails such as scaffolding, mobile towers, or a MEWP. These physically prevent falls and are collective protection (they protect everyone, not just the wearer).',
              },
              {
                step: '3. Mitigate',
                detail:
                  'Only if you cannot prevent a fall, use equipment that minimises the distance and consequences — first collective measures like safety nets or air bags, then, as a last resort, personal fall-arrest (a harness). The aim shifts from stopping the fall to limiting the harm.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4"
              >
                <h3 className="font-semibold text-elec-yellow text-sm mb-2">{item.step}</h3>
                <p className="text-white text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ladders */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Ladders — BS EN 131</h2>
          <p className="text-white text-sm leading-relaxed">
            A ladder is only justified for low-risk, short-duration work — HSE guidance treats
            "short duration" as a maximum of around 30 minutes in one position — or where the site
            means a more suitable platform is not reasonably practicable. A ladder is primarily a
            means of access, not a work platform. Choose a podium step, a step stool, or a tower
            over a ladder wherever you can.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Safe Use of Leaning Ladders</h3>
            {[
              'Set the ladder at a 75° angle — the 1-in-4 rule: for every 4 metres of height, the base should be 1 metre from the wall',
              'The ladder must extend at least 1 metre (3 rungs) above the landing point or work level',
              'Secure the ladder at the top (tied) or at the bottom (footed by another person, or use a ladder stabiliser)',
              'Both stiles must rest on a firm, level surface — never pack one stile to level it',
              'Maintain three points of contact at all times (two hands and one foot, or two feet and one hand)',
              'Never overreach — your belt buckle should stay within the stiles',
              'Do not carry heavy or bulky items up a ladder — use a tool belt or hoist',
              'Never work from the top 3 rungs of a leaning ladder',
              'Inspect the ladder before each use: check stiles, rungs, and feet for damage',
              'Industrial ladders (BS EN 131) are rated for 150kg — including your weight plus tools and materials',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Ladders */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Step Ladders</h2>
          <p className="text-white text-sm leading-relaxed">
            Step ladders are used where a leaning ladder is not practical — for example, in the
            middle of a room when fitting light fittings. They must only be used on firm, level
            ground.
          </p>

          <div className="space-y-2">
            {[
              'Always fully open the step ladder and engage the locking mechanism',
              'Never stand on the top 2 steps (top platform and step below) unless the step ladder has a platform with a handrail',
              'Face the steps — do not work with the steps behind you',
              'Do not overreach — move the step ladder instead',
              'Check all four feet are in firm contact with the ground',
              'Never use a step ladder as a leaning ladder',
              'Maximum recommended working height from a step ladder: the user should be able to maintain a handhold at all times',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scaffolding */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Scaffolding</h2>
          <p className="text-white text-sm leading-relaxed">
            Scaffolding provides a safe working platform for longer-duration work at height. It must
            be erected and inspected by a competent person. The NASC (National Access and
            Scaffolding Confederation) publishes safety guidance including SG4 (preventing falls in
            scaffolding).
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Before Working on Scaffolding</h3>
            {[
              'Check the scaffold has a current inspection tag (scafftag) — scaffolds must be inspected every 7 days and after adverse weather',
              'Check guard rails are in place: top rail at 950mm minimum, mid rail, and toe board at 150mm',
              'Check the platform is fully boarded with no gaps wider than 25mm',
              'Ensure there is safe access (internal ladder or stair tower)',
              'Never climb the scaffold frame — always use the designated access route',
              'Do not overload the scaffold — check the safe working load plate',
              'Never alter or remove any scaffold component (boards, guard rails, ties) without authorisation from the scaffold contractor',
              'Report any defects immediately and do not use the scaffold until it is repaired',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Towers */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Mobile Access Towers — PASMA</h2>
          <p className="text-white text-sm leading-relaxed">
            Mobile aluminium access towers are commonly used by electricians for work at height in
            commercial and industrial environments. Anyone who erects, alters, moves, inspects, or
            dismantles a tower should be trained and competent — a valid{' '}
            <span className="font-semibold text-elec-yellow">PASMA</span> (Prefabricated Access
            Suppliers' and Manufacturers' Association) certificate is the recognised industry
            standard and most sites require it. As an apprentice, do not build or alter a tower
            until you are trained and signed off.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Key Rules</h3>
            {[
              `Follow the manufacturer's instruction manual for assembly — the "3T" method (Through the Trap) or "Advance Guard Rail" (AGR) method must be used`,
              'Maximum height-to-base ratio (platform height to minimum base dimension): typically 3.5:1 indoors and 3:1 outdoors — always follow the manufacturer’s manual, which may be lower',
              'Always use outriggers/stabilisers when required by the manufacturer',
              'Lock all castors (wheels) before climbing or working on the tower',
              'Never move a tower while anyone is on it',
              'Never move a tower with materials or tools on the platform',
              'Check the ground is firm and level — use base plates on soft ground',
              'Platforms must have guard rails and toe boards fitted',
              'Inspect the tower daily and after any modification',
              'Wind speed: do not use above 17 mph (force 4) unless the manufacturer specifies otherwise',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MEWPs */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            MEWPs — Cherry Pickers and Scissor Lifts (IPAF)
          </h2>
          <p className="text-white text-sm leading-relaxed">
            A Mobile Elevating Work Platform (MEWP) — a scissor lift or a boom/cherry picker — gives
            a guarded platform that can be raised to height, ideal for high-bay lighting,
            containment runs, and external work. You must be trained and hold a valid operator
            licence for the category you are using. The recognised scheme is{' '}
            <span className="font-semibold text-elec-yellow">IPAF</span> (International Powered
            Access Federation), which issues the PAL Card (Powered Access Licence). Never operate a
            MEWP you are not licensed and authorised for.
          </p>

          <div className="space-y-2">
            {[
              'Hold the correct IPAF category — 3a (vertical/scissor) and 3b (boom) are different licences; a scissor-lift card does not cover a boom',
              'Complete a daily pre-use check (function test, controls, emergency lowering, tyres, guard rails) and check the LOLER thorough-examination report is in date (within the last 6 months)',
              'Carry out a ground assessment first — firm, level ground, no voids, drains, or kerbs; use spreader plates if specified',
              'Wear a restraint harness with a short lanyard clipped to the designated anchor in a boom-type (3b) MEWP — this stops you being catapulted out, not arrest a ground fall',
              'A scissor lift (3a) on level ground does not normally need a harness — follow the risk assessment and manufacturer’s instructions',
              'Never climb on, sit on, or lean out over the guard rails to extend your reach — reposition the platform instead',
              'Know the entrapment risk: keep clear of overhead steelwork and structures that could crush you against the controls; a trained ground rescuer must be available',
              'Keep well clear of overhead power lines — treat them as live and observe the exclusion distances on the permit',
              'Do not exceed the safe working load (people plus tools plus materials) shown on the platform',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Harnesses */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">Fall Arrest Harnesses</h2>
          <p className="text-white text-sm leading-relaxed">
            Harnesses are a last resort — they do not prevent falls, they arrest them. A fall into a
            harness can still cause serious injury (suspension trauma, impact injuries). Harnesses
            are used when guard rails or platforms are not feasible, such as working on steel
            structures, near roof edges, or in confined access areas.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Harness Requirements</h3>
            {[
              {
                point: 'Standard',
                detail:
                  'BS EN 361 (full body harness) — must be a full body harness, not just a belt.',
              },
              {
                point: 'Lanyard',
                detail:
                  'BS EN 355 (energy absorbing lanyard) — limits the force on your body during a fall to 6kN maximum.',
              },
              {
                point: 'Anchor point',
                detail:
                  'Must be rated for at least 12kN (BS EN 795) and positioned above the user where possible to minimise fall distance.',
              },
              {
                point: 'Clearance',
                detail:
                  'Calculate the total fall distance: lanyard length + energy absorber deployment (1.75m) + user height below attachment point + 1m safety margin. If there is not enough clearance below the anchor, a harness cannot be used safely.',
              },
              {
                point: 'Inspection',
                detail:
                  'Harnesses must be inspected by a competent person every 6 months (BS 8437). You must also do a visual pre-use check every time.',
              },
              {
                point: 'Training',
                detail:
                  'You must receive training before using a harness. This includes how to put it on, adjust it, connect to an anchor, and what to do if a fall occurs (rescue plan).',
              },
            ].map((item) => (
              <div
                key={item.point}
                className="rounded-md border border-red-500/25 bg-red-500/[0.04] p-3"
              >
                <h4 className="text-red-400 font-semibold text-sm mb-1">{item.point}</h4>
                <p className="text-white text-xs">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fragile Surfaces */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04]">
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-semibold text-red-400">Fragile Surfaces and Roof Work</h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Fragile roofs and surfaces are a major cause of fatal falls. Materials like cement fibre
            sheets, glass skylights, plastic roof lights, and corroded metal sheeting can give way
            without warning. You should <span className="font-bold text-red-400">never</span> walk
            on a fragile surface unless proper precautions are in place.
          </p>

          <div className="space-y-2">
            {[
              'Assume all roof coverings are fragile unless you have confirmed otherwise from a structural survey',
              'Crawling boards or staging must be used to spread your weight',
              'Edge protection and safety netting must be in place below',
              'Warning signs must be posted at all access points to fragile roofs',
              'Never step on roof lights, skylights, or translucent panels — even if they look solid',
              'If you are asked to work on or near a fragile roof, check the risk assessment covers fragile surfaces specifically',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Electrical Tasks at Height */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Common Electrical Tasks at Height</h2>
          <p className="text-white text-sm leading-relaxed">
            As an electrician, you will frequently need to work at height. Here are the most common
            tasks and the recommended access equipment:
          </p>

          <div className="space-y-3">
            {[
              {
                task: 'Fitting light fittings (domestic)',
                equipment:
                  'Step ladder — ensure firm, level floor. Hold time typically under 15 minutes.',
              },
              {
                task: 'Fitting light fittings (commercial/warehouse)',
                equipment:
                  'Mobile tower (PASMA) or MEWP (IPAF). At high-bay ceiling heights a ladder is rarely suitable — a guarded platform lets you work safely for the duration.',
              },
              {
                task: 'Running cable tray/basket tray at ceiling level',
                equipment:
                  'Mobile tower or scaffolding. Extended duration work — a ladder is not suitable.',
              },
              {
                task: 'Installing containment in a riser/shaft',
                equipment:
                  'Purpose-built access platform or scaffold. Never lean into a shaft from a ladder.',
              },
              {
                task: 'External cable runs, meter positions',
                equipment:
                  'Leaning ladder (short duration) or scaffold for extended work. Secure ladder at top.',
              },
              {
                task: 'Fire alarm devices at ceiling level',
                equipment: 'Step ladder or mobile tower depending on ceiling height and duration.',
              },
            ].map((item) => (
              <div
                key={item.task}
                className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3"
              >
                <h4 className="text-elec-yellow font-semibold text-sm mb-1">{item.task}</h4>
                <p className="text-white text-xs">{item.equipment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 sm:p-5">
          <p className="text-white text-xs leading-relaxed">
            Based on the Work at Height Regulations 2005, BS EN 131 (ladders), NASC SG4
            (scaffolding), PASMA guidance (mobile towers), IPAF guidance (MEWPs), LOLER 1998
            (thorough examination of access equipment), BS EN 361/355/795 (harnesses, lanyards, and
            anchors), and HSE guidance INDG401 (Working at height — a brief guide). Always follow
            your employer's site-specific risk assessment and method statement for working at
            height.
          </p>
        </div>
      </div>
    </PageFrame>
  );
};

export default WorkingAtHeightPage;
