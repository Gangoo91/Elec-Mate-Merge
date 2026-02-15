import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const WorkingAtHeightPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Working at Height
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Falls Are the Biggest Killer in Construction
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Falls from height are the single largest cause of death in the UK
            construction industry — accounting for around 40 fatalities and over
            4,000 major injuries per year. As an electrician, you will regularly
            work from ladders, step ladders, scaffolding, and mobile towers. The{' '}
            <span className="font-semibold text-orange-400">
              Work at Height Regulations 2005
            </span>{' '}
            apply to all work where there is a risk of falling that could cause
            personal injury — there is no minimum height threshold.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-white text-sm">
              <span className="font-bold text-red-400">Key fact: </span>
              "Working at height" means any work where you could fall a distance
              that could cause injury. This includes working on a ladder, on a
              scaffold, on a flat roof, near an opening, or even standing on a
              chair. It does not require a specific height.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hierarchy of Controls */}
      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-orange-400">
            The Hierarchy — Avoid, Prevent, Mitigate
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The Work at Height Regulations require a three-step approach, in order
            of priority:
          </p>

          <div className="space-y-3">
            {[
              {
                step: '1. Avoid',
                detail: 'Can the work be done from ground level? Can you use extension tools, long-reach equipment, or pre-fabricate at ground level and lift into position? If you can avoid working at height entirely, do so.',
                colour: 'text-green-400',
                border: 'border-green-500/20',
                bg: 'bg-green-500/10',
              },
              {
                step: '2. Prevent Falls',
                detail: 'If you must work at height, use platforms with guard rails — scaffolding, mobile elevated work platforms (MEWPs), or mobile towers with edge protection. These physically prevent falls.',
                colour: 'text-blue-400',
                border: 'border-blue-500/20',
                bg: 'bg-blue-500/10',
              },
              {
                step: '3. Mitigate',
                detail: 'If you cannot prevent falls, use equipment that minimises the distance and consequences — harnesses with fall arrest, safety nets, or airbags. These are the last resort.',
                colour: 'text-orange-400',
                border: 'border-orange-500/20',
                bg: 'bg-orange-500/10',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`${item.bg} ${item.border} border rounded-lg p-4`}
              >
                <h3 className={`font-semibold ${item.colour} text-sm mb-2`}>
                  {item.step}
                </h3>
                <p className="text-white text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ladders */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            Ladders — BS EN 131
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Ladders should only be used for short-duration work (up to 30 minutes
            in one position) or where a more suitable platform is not reasonably
            practicable. They are a means of access, not a work platform — but in
            practice, electricians often need to work from them for tasks like
            fitting light fittings, pulling cables, and installing accessories at
            height.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Safe Use of Leaning Ladders
            </h3>
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Ladders */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            Step Ladders
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Step ladders are used where a leaning ladder is not practical — for
            example, in the middle of a room when fitting light fittings. They must
            only be used on firm, level ground.
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scaffolding */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-purple-400">
            Scaffolding
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Scaffolding provides a safe working platform for longer-duration work
            at height. It must be erected and inspected by a competent person. The
            NASC (National Access and Scaffolding Confederation) publishes safety
            guidance including SG4 (preventing falls in scaffolding).
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Before Working on Scaffolding
            </h3>
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Towers */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-green-400">
            Mobile Access Towers — PASMA
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Mobile aluminium scaffold towers (such as Boss or BoSS towers) are
            commonly used by electricians for work at height in commercial and
            industrial environments. You must hold a valid{' '}
            <span className="font-semibold text-green-400">PASMA</span>{' '}
            (Prefabricated Access Suppliers' and Manufacturers' Association)
            certificate to erect, alter, or dismantle a mobile tower.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Key Rules</h3>
            {[
              `Follow the manufacturer's instruction manual for assembly — the "3T" method (Through the Trap) or "Advance Guard Rail" (AGR) method must be used`,
              'Maximum height-to-base ratio: 3:1 indoors, 3:1 outdoors (some manufacturers specify 2.5:1 outdoors or with outriggers)',
              'Always use outriggers/stabilisers when required by the manufacturer',
              'Lock all castors (wheels) before climbing or working on the tower',
              'Never move a tower while anyone is on it',
              'Never move a tower with materials or tools on the platform',
              'Check the ground is firm and level — use base plates on soft ground',
              'Platforms must have guard rails and toe boards fitted',
              'Inspect the tower daily and after any modification',
              'Wind speed: do not use above 17 mph (force 4) unless the manufacturer specifies otherwise',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Harnesses */}
      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-red-400">
            Fall Arrest Harnesses
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Harnesses are a last resort — they do not prevent falls, they arrest
            them. A fall into a harness can still cause serious injury (suspension
            trauma, impact injuries). Harnesses are used when guard rails or
            platforms are not feasible, such as working on steel structures, near
            roof edges, or in confined access areas.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">
              Harness Requirements
            </h3>
            {[
              {
                point: 'Standard',
                detail: 'BS EN 361 (full body harness) — must be a full body harness, not just a belt.',
              },
              {
                point: 'Lanyard',
                detail: 'BS EN 355 (energy absorbing lanyard) — limits the force on your body during a fall to 6kN maximum.',
              },
              {
                point: 'Anchor point',
                detail: 'Must be rated for at least 12kN (BS EN 795) and positioned above the user where possible to minimise fall distance.',
              },
              {
                point: 'Clearance',
                detail: 'Calculate the total fall distance: lanyard length + energy absorber deployment (1.75m) + user height below attachment point + 1m safety margin. If there is not enough clearance below the anchor, a harness cannot be used safely.',
              },
              {
                point: 'Inspection',
                detail: 'Harnesses must be inspected by a competent person every 6 months (BS 8437). You must also do a visual pre-use check every time.',
              },
              {
                point: 'Training',
                detail: 'You must receive training before using a harness. This includes how to put it on, adjust it, connect to an anchor, and what to do if a fall occurs (rescue plan).',
              },
            ].map((item) => (
              <div
                key={item.point}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <h4 className="text-red-400 font-semibold text-sm mb-1">
                  {item.point}
                </h4>
                <p className="text-white text-xs">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fragile Surfaces */}
      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-amber-400">
              Fragile Surfaces and Roof Work
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Fragile roofs and surfaces are a major cause of fatal falls. Materials
            like cement fibre sheets, glass skylights, plastic roof lights, and
            corroded metal sheeting can give way without warning. You should{' '}
            <span className="font-bold text-amber-400">never</span> walk on a
            fragile surface unless proper precautions are in place.
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
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Electrical Tasks at Height */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-400">
            Common Electrical Tasks at Height
          </h2>
          <p className="text-white text-sm leading-relaxed">
            As an electrician, you will frequently need to work at height. Here
            are the most common tasks and the recommended access equipment:
          </p>

          <div className="space-y-3">
            {[
              {
                task: 'Fitting light fittings (domestic)',
                equipment: 'Step ladder — ensure firm, level floor. Hold time typically under 15 minutes.',
              },
              {
                task: 'Fitting light fittings (commercial/warehouse)',
                equipment: 'Mobile tower (PASMA) or MEWP (cherry picker). Heights above 2m in commercial settings usually require more than a ladder.',
              },
              {
                task: 'Running cable tray/basket tray at ceiling level',
                equipment: 'Mobile tower or scaffolding. Extended duration work — a ladder is not suitable.',
              },
              {
                task: 'Installing containment in a riser/shaft',
                equipment: 'Purpose-built access platform or scaffold. Never lean into a shaft from a ladder.',
              },
              {
                task: 'External cable runs, meter positions',
                equipment: 'Leaning ladder (short duration) or scaffold for extended work. Secure ladder at top.',
              },
              {
                task: 'Fire alarm devices at ceiling level',
                equipment: 'Step ladder or mobile tower depending on ceiling height and duration.',
              },
            ].map((item) => (
              <div
                key={item.task}
                className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
              >
                <h4 className="text-blue-400 font-semibold text-sm mb-1">
                  {item.task}
                </h4>
                <p className="text-white text-xs">{item.equipment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Based on the Work at Height Regulations 2005, BS EN 131 (ladders),
            NASC SG4 (scaffolding), PASMA guidance (mobile towers), BS EN 361/355
            (harnesses), and HSE guidance INDG401 (Working at height — a brief
            guide). Always follow your employer's site-specific risk assessment
            and method statement for working at height.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkingAtHeightPage;
