import { ArrowLeft, Wrench, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question:
      'If an electrician spends 10 minutes searching for tools and materials per job, and completes 5 jobs per day, how much time is lost per 48-week working year?',
    options: [
      'Approximately 50 hours',
      'Approximately 100 hours',
      'Approximately 200 hours',
      'Approximately 400 hours',
    ],
    correctAnswer: 2,
    explanation:
      '10 minutes \u00d7 5 jobs = 50 minutes per day. 50 minutes \u00d7 5 days = 250 minutes (approximately 4 hours 10 minutes) per week. 4.17 hours \u00d7 48 weeks = 200 hours per year. At \u00a345/hour, that is \u00a39,000 in lost productive time annually \u2014 simply from not having an organised van.',
  },
  {
    id: 2,
    question: 'What does the "S" stand for in the first step of the 5S methodology?',
    options: [
      'Sanitise \u2014 clean everything in the workspace',
      'Sort \u2014 separate what is needed from what is not, and remove unnecessary items',
      'Schedule \u2014 plan when to organise the workspace',
      'Stack \u2014 arrange items in vertical storage to save space',
    ],
    correctAnswer: 1,
    explanation:
      'The first S is Sort (Seiri in the original Japanese). It means going through every item in the workspace (van) and separating what is genuinely needed from what is not. Broken tools, obsolete materials, duplicates, and items not used in the last 6 months are removed. This step alone can free up 20\u201330% of van space.',
  },
  {
    id: 3,
    question: 'What is the principle of "designated places" in van organisation?',
    options: [
      'Tools should be stored wherever there is space available',
      'Every tool and material should have one specific, labelled home location and always be returned there',
      'Tools should be rotated between different storage positions weekly',
      'Only expensive tools need designated storage locations',
    ],
    correctAnswer: 1,
    explanation:
      'The designated place principle means every item has one specific home \u2014 and only one. When you finish using a tool, it goes back to exactly the same place. When you need it, you reach for that place without thinking. This eliminates search time entirely because retrieval becomes automatic muscle memory rather than a conscious search.',
  },
  {
    id: 4,
    question: 'What is the recommended approach to managing van consumable stock?',
    options: [
      'Buy everything in bulk at the start of each month',
      'Only buy materials as needed for each specific job',
      'Maintain minimum stock levels for commonly used items and reorder when stock drops below the trigger point',
      'Keep the maximum possible quantity of every material in the van at all times',
    ],
    correctAnswer: 2,
    explanation:
      'A minimum-stock system ensures you always have commonly used items (cable clips, connector blocks, earth sleeving, fixing screws) without overloading the van. Set a trigger point for each item \u2014 for example, reorder 2.5mm T&E when you have less than one drum. This prevents both running out mid-job and carrying excessive weight.',
  },
  {
    id: 5,
    question: 'Why is material pre-ordering important for time management?',
    options: [
      'Because suppliers are always out of stock',
      'Because it eliminates unplanned trips to the merchant, which waste 30\u201360 minutes each time',
      'Because pre-ordered materials are always cheaper',
      'Because it reduces the weight in the van',
    ],
    correctAnswer: 1,
    explanation:
      'An unplanned trip to the electrical merchant takes 30\u201360 minutes: driving there, finding what you need, queuing, paying, driving back. If this happens twice per week, that is 1\u20132 hours lost. Pre-ordering materials the evening before (for collection or delivery first thing) means you arrive at the job with everything you need, eliminating these unplanned trips.',
  },
  {
    id: 6,
    question: 'What is the "Set in Order" (Seiton) step of 5S?',
    options: [
      'Arrange items so the most frequently used are most accessible, with clear labelling',
      'Sort all items alphabetically',
      'Set a schedule for cleaning the workspace',
      'Order new supplies to replace old ones',
    ],
    correctAnswer: 0,
    explanation:
      'Set in Order means arranging items based on frequency of use. Tools and materials used multiple times daily should be in the most accessible positions (waist-to-shoulder height, nearest to the van door). Items used weekly can be less accessible. Rarely used items go in the least accessible locations. Clear labels ensure anyone can find items quickly.',
  },
  {
    id: 7,
    question: 'How often should a systematic van maintenance check be performed?',
    options: [
      'Only when the van breaks down',
      'Once a year at MOT time',
      'Weekly for a quick check (oil, tyres, lights), with a comprehensive review monthly',
      'Every 6 months',
    ],
    correctAnswer: 2,
    explanation:
      'A weekly 5-minute check of oil level, tyre pressure, lights, and windscreen washer fluid catches problems early. A monthly review includes checking tyre tread depth, brake fluid, coolant, and any warning lights. This prevents breakdowns that cost far more in lost working time than the few minutes spent on prevention.',
  },
  {
    id: 8,
    question: 'What is the "Sustain" (Shitsuke) step of 5S and why is it the most challenging?',
    options: [
      'It means sustaining high energy levels throughout the working day',
      'It means maintaining the systems and discipline long-term through habit and routine, which is challenging because it requires ongoing effort after the initial motivation fades',
      'It means sustaining a minimum stock level of all materials',
      'It means making the van exterior look professional at all times',
    ],
    correctAnswer: 1,
    explanation:
      'Sustain is about making the organised system permanent through discipline, routine, and habit. It is the hardest step because the initial organising burst is motivating, but maintaining the system daily requires consistent effort. The 5-minute end-of-day routine (returning tools, restocking consumables, clearing rubbish) is the key habit that sustains the system.',
  },
];

export default function TMOModule4Section3() {
  useSEO({
    title:
      'Van, Tool & Material Organisation | Module 4 Section 3 | Time Management & Organisation',
    description:
      'Systematic tool storage, stock management, material pre-ordering, van maintenance, and the 5S methodology for electricians.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <Wrench className="w-5 h-5 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
                <span className="text-white text-xs">&bull;</span>
                <span className="text-white text-xs">SECTION 3</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Van, Tool &amp; Material Organisation
            </h1>
            <p className="text-white text-sm sm:text-base">
              Your van is your mobile workshop &mdash; organising it properly eliminates hours of
              wasted searching and prevents the costly mid-job supply runs
            </p>
          </div>

          {/* In 30 Seconds + Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                An organised van saves 1&ndash;2 hours per day through instant tool retrieval,
                elimination of unplanned merchant trips, and prevention of forgotten materials. The
                5S methodology (Sort, Set in Order, Shine, Standardise, Sustain) provides a
                structured approach that transforms a chaotic van into a system where every item has
                a designated place and can be found in seconds.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm leading-relaxed">
                If you spend just 10 minutes searching for tools or materials per job across 5 jobs
                daily, that is 50 minutes lost every single day. Over a 48-week year, that
                accumulates to 200 hours &mdash; roughly 5 full working weeks. At &pound;45/hour,
                that is &pound;9,000 in lost productive time. A well-organised van is not just tidy;
                it is a direct financial investment.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Calculate the true cost of van disorganisation in hours and pounds lost per year',
                'Apply the 5S methodology (Sort, Set in Order, Shine, Standardise, Sustain) to van organisation',
                'Implement a designated-place system where every tool has one specific, labelled home location',
                'Set up minimum stock levels and reorder triggers for commonly used consumables',
                'Design a material pre-ordering workflow that eliminates unplanned merchant trips',
                'Establish a weekly van maintenance routine and a daily 5-minute end-of-day reset',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: The Van as Mobile Workshop */}
          <div className="mb-8">
            <div className="border-l-2 border-rose-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">1. The Van as Mobile Workshop</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                For most electricians, the van is not just transport &mdash; it is the primary
                workspace. It is where tools are stored, materials are carried, paperwork lives, and
                the working day begins and ends. An office worker would never accept working in a
                room where they could not find their keyboard, where files were scattered across the
                floor, and where essential supplies ran out without warning. Yet many electricians
                tolerate precisely this level of chaos in their vans, often without recognising the
                time and money it costs them.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The psychology of disorganisation is insidious. Each individual search feels minor
                &mdash; &ldquo;it only took a couple of minutes to find the side cutters.&rdquo; But
                these small losses compound. Ten minutes per job, five jobs per day, five days per
                week, forty-eight weeks per year. The arithmetic is unforgiving: 200 hours per year
                lost to searching. That is five full working weeks. Five weeks of your annual
                productive capacity consumed by looking for things that should be exactly where you
                left them.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Beyond the direct time cost, there are secondary effects. A disorganised van
                increases stress &mdash; arriving at a job unable to find the right tool creates
                frustration and anxiety. It damages professional image &mdash; clients who see you
                rummaging through a chaotic van for 10 minutes form impressions about your
                competence. And it creates safety risks &mdash; unsecured tools and materials become
                projectiles in a sudden stop, and a cluttered van floor creates trip hazards that
                can cause injury.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              The Compounding Cost of Disorganisation
            </h3>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">10 min/job &times; 5 jobs/day = 50 min/day.</strong> 50
              min/day &times; 5 days/week = 250 min/week (4 hrs 10 min). 4.17 hrs/week &times; 48
              weeks = <strong className="text-white">200 hours/year</strong>. At &pound;45/hour ={' '}
              <strong className="text-white">&pound;9,000/year in lost productive time.</strong>{' '}
              Even reducing search time by half through better organisation recovers &pound;4,500
              annually. This is the single easiest productivity gain available to most electricians.
            </p>
          </div>

          {/* Section 2: The 5S Methodology */}
          <div className="mb-8">
            <div className="border-l-2 border-amber-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                2. The 5S Methodology for Van Organisation
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The 5S methodology originated in Japanese manufacturing (Toyota Production System)
                and has since been adopted worldwide as a framework for workplace organisation. The
                five steps &mdash; Sort, Set in Order, Shine, Standardise, Sustain &mdash; provide a
                structured approach that transforms any workspace from chaos to order. While
                originally designed for factory floors, 5S applies directly to van organisation and
                has been used by trades businesses across the UK with remarkable results.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Step 1: Sort (Seiri).</strong> Empty your van
                completely. Every tool, every cable drum, every box of fittings, every scrap of
                material. Lay it all out and sort into three categories: keep (used regularly),
                relocate (still useful but belongs in the workshop, not the van), and discard
                (broken, obsolete, duplicated, or not used in the last 6 months). Most electricians
                find that 20&ndash;30% of what they carry is unnecessary. Removing it frees up space
                and reduces weight, improving fuel economy.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Step 2: Set in Order (Seiton).</strong> Arrange the
                remaining items based on frequency of use. Tools used multiple times daily (side
                cutters, screwdrivers, multimeter) go in the most accessible positions &mdash;
                waist-to-shoulder height, nearest to the van door. Items used daily but less
                frequently (drill, SDS, cable rods) go in the next tier. Materials used weekly
                (specialist fittings, backup supplies) go in less accessible locations. Every item
                gets a designated home, and that position is labelled so anyone could find it.
              </p>
            </div>
          </div>

          {/* Framework box: 5S Steps */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              The 5S Steps Applied to Van Organisation
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">1. Sort (Seiri):</strong> Empty the van. Keep,
                relocate, or discard every item. Remove anything not used in 6 months.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">2. Set in Order (Seiton):</strong> Arrange by
                frequency of use. Most-used tools nearest the door at grab height. Label every
                position.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">3. Shine (Seiso):</strong> Clean the van thoroughly.
                Sweep, vacuum, wipe down racking. A clean van reveals damage and makes organisation
                visible.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">4. Standardise (Seiketsu):</strong> Create rules that
                maintain the system. &ldquo;Every tool returns to its labelled position. Stock is
                checked every Friday. Rubbish is cleared daily.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">5. Sustain (Shitsuke):</strong> Build daily habits. A
                5-minute end-of-day routine: return all tools, restock consumables, clear rubbish,
                check tomorrow&rsquo;s materials.
              </p>
            </div>
          </div>

          {/* InlineCheck 1 */}
          <InlineCheck
            id="tmo-4-3-5s-sort"
            question="During the Sort step, you find three SDS drill bits of the same size, a broken spirit level, and a box of 16mm PVC conduit fittings you have not used in 8 months. What should you do?"
            options={[
              'Keep everything because you might need it someday',
              'Keep one SDS bit, discard the broken level, and relocate the conduit fittings to your workshop',
              'Discard everything and buy new supplies',
              'Reorganise them into a neater pile but keep them all in the van',
            ]}
            correctIndex={1}
            explanation="Keep one SDS bit (you only need one of each size in the van), discard the broken spirit level (it has no value), and relocate the conduit fittings to your workshop (still useful, but taking up van space when not used for 8 months). The Sort step is about being honest about what actually needs to be in the van daily."
          />

          {/* Section 3: Systematic Tool Storage */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">3. Systematic Tool Storage</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The core principle of systematic tool storage is simple:{' '}
                <strong className="text-white">
                  every tool has one home, and that home is labelled
                </strong>
                . This means you never need to search for anything. When you need your multifunction
                tester, your hand goes to the same spot every time, automatically. When you finish
                using your side cutters, they go back to their specific clip or pouch. Over time,
                retrieval becomes muscle memory rather than a conscious search process &mdash; and
                that is where the real time saving occurs.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Van racking systems (Sortimo, Bott, DeWalt ToughSystem, or even DIY solutions using
                plywood and screws) provide the physical infrastructure for designated places. The
                specific system matters less than the principle: tools should be visible,
                accessible, and secured so they do not shift during driving. Open-front bins work
                well for consumables (cable clips, connector blocks, screws) because you can see the
                stock level at a glance. Tool bags or pouches mounted on the racking work for hand
                tools. Foam inserts with tool-shaped cutouts (shadow boards) make it immediately
                obvious when a tool is missing.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                An often-overlooked aspect of tool storage is the{' '}
                <strong className="text-white">grab bag</strong> &mdash; a tool bag that you carry
                to the job containing the tools needed for that specific task. Rather than making
                multiple trips to the van (each one consuming 2&ndash;5 minutes), load a grab bag
                before leaving the van. For a consumer unit change, the grab bag contains: side
                cutters, strippers, screwdrivers, ferrule crimper, labels, cable ties, and your
                testing kit. For an EICR, it contains test instruments, labels, and the
                certification device. Pre-loading the grab bag for each job type is another form of
                batching that saves time.
              </p>
            </div>
          </div>

          {/* Section 4: Stock Management */}
          <div className="mb-8">
            <div className="border-l-2 border-blue-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                4. Stock Management &amp; Material Pre-Ordering
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Running out of a &pound;2 box of cable clips mid-job can cost you 45 minutes: 15
                minutes to drive to the merchant, 15 minutes queuing and buying, 15 minutes driving
                back. That is a &pound;33.75 time cost (at &pound;45/hour) to buy &pound;2 of stock.
                This scenario is entirely preventable with a minimum-stock system. The principle is
                straightforward: for every commonly used consumable, define a minimum quantity. When
                stock drops below that level, it goes on the reorder list. You never run out because
                you reorder before you reach zero.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Common consumables for electricians include: cable clips (various sizes), connector
                blocks, WAGO connectors, earth sleeving, brown and blue sleeving, cable ties, fixing
                screws, rawl plugs, insulation tape (multiple colours), labels, and fuse wire. For
                each, set a minimum level and a reorder quantity. For example: WAGO 221 3-way
                connectors &mdash; minimum 20, reorder 50 when below 20. This prevents both
                shortages and excessive stock. A simple list stuck to the inside of a van door or in
                a notes app is sufficient.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Material pre-ordering</strong> goes a step further.
                The evening before a job, review the scope of work and check whether you have all
                the materials needed. If the next day is a consumer unit change, confirm you have
                the unit, MCBs, RCBOs, tails, earth rod (if needed), labels, and cable. Anything
                missing gets ordered for collection or delivery first thing in the morning. This
                5&ndash;10 minute evening review eliminates the unplanned mid-morning merchant run
                that can derail an entire day&rsquo;s schedule.
              </p>
            </div>
          </div>

          {/* InlineCheck 2 */}
          <InlineCheck
            id="tmo-4-3-stock"
            question="You are halfway through a first fix and discover you have run out of 2.5mm twin and earth. The nearest merchant is a 20-minute round trip. What is the true time cost, and how could this have been prevented?"
            options={[
              'The cost is 20 minutes for the round trip. Prevention is not possible because you cannot predict exact quantities.',
              'The cost is 30\u201345 minutes including the trip, refocusing, and context-switching. Prevention: check stock levels and pre-order materials the evening before.',
              'The cost is only the price of the cable. Prevention: always buy double what you need.',
              'The cost is minimal because you can send an apprentice instead.',
            ]}
            correctIndex={1}
            explanation="The round trip takes 20 minutes, but you also lose time finding your place in the first fix, re-establishing the workflow, and dealing with the frustration of the interruption. The true cost is typically 30\u201345 minutes. This is entirely preventable by reviewing the bill of materials the evening before and confirming stock levels in the van."
          />

          {/* Section 5: Van Maintenance */}
          <div className="mb-8">
            <div className="border-l-2 border-purple-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                5. Van Maintenance as Time Management
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                A van breakdown is a catastrophic time event. It does not just cost you the
                breakdown itself &mdash; it cancels an entire day (or more) of work, damages client
                relationships when jobs are rescheduled at short notice, and creates emergency costs
                for recovery and repair. The irony is that most breakdowns are preventable through
                basic maintenance routines that take less than 10 minutes per week. Van maintenance
                is time management because prevention is always cheaper than cure.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                A weekly 5-minute check should cover: engine oil level, coolant level, windscreen
                washer fluid, tyre pressures (including the spare), all lights (headlights, brake
                lights, indicators, reverse lights), and any dashboard warning lights. These checks
                catch problems early &mdash; low oil spotted on Monday is a quick top-up; low oil
                not spotted until Friday is a seized engine and a &pound;3,000 repair bill.
                Additionally, a monthly check should include tyre tread depth, brake fluid level,
                wiper blade condition, and a visual inspection of the tyres for damage.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Fuel management is another overlooked time factor. Running low on fuel and needing
                to make a detour to a petrol station during the working day wastes 10&ndash;15
                minutes. The simple discipline of refuelling whenever you pass your preferred
                station on the way home &mdash; before the tank drops below a quarter &mdash;
                eliminates this entirely. Similarly, keeping the van reasonably clean (a 10-minute
                weekly vacuum and wipe) maintains professional appearance and prevents the gradual
                accumulation of rubbish that contributes to disorganisation.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              The 5-Minute End-of-Day Routine
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Before driving home each day, spend exactly 5 minutes on:{' '}
              <strong className="text-white">(1)</strong> Return all tools to their designated
              positions. <strong className="text-white">(2)</strong> Note any consumables that need
              reordering. <strong className="text-white">(3)</strong> Clear all rubbish, packaging,
              and cable offcuts. <strong className="text-white">(4)</strong> Check materials for
              tomorrow&rsquo;s first job. <strong className="text-white">(5)</strong> Charge any
              battery tools overnight. This routine takes 5 minutes and saves 30+ minutes the
              following morning because you start the day with an organised van and confirmed
              materials.
            </p>
          </div>

          {/* Section 6: Construction Examples */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                6. Real-World Construction Examples
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Consider a domestic electrician who has implemented 5S in his van. He arrives at a
                consumer unit change at 08:00. He opens the van, picks up his pre-loaded grab bag
                (labelled &ldquo;CU Change Kit&rdquo;), grabs the new consumer unit and the
                pre-ordered MCBs/RCBOs from their designated shelf positions, and walks to the
                property. Total time from van to starting work: 2 minutes. His disorganised
                counterpart arrives, rummages for his screwdrivers (3 minutes), realises his wire
                strippers are under a pile of offcuts (2 minutes), cannot find the crimping tool (5
                minutes), and discovers he forgot to buy the RCBO he needed (45 minutes round trip
                to the merchant). The organised electrician is an hour ahead before the first cable
                is cut.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                On a commercial site, van organisation becomes even more critical. A commercial
                electrician working on a floor fit-out may need to carry materials up several
                floors, through corridors, and to a specific area. Each return trip to the van takes
                10&ndash;15 minutes. If he forgets a single item, that is another 20&ndash;30 minute
                round trip. By pre-loading a wheeled case or bucket with everything needed for the
                morning&rsquo;s work (using a checklist for that job type), a single trip carries
                everything. Four return trips avoided saves 40&ndash;60 minutes on a single day.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The 5S system also protects against tool theft &mdash; one of the most significant
                costs facing UK tradespeople. When every tool has a designated position and a
                visible shadow board, you can see at a glance if something is missing at the end of
                the day. This makes it far less likely that you will drive away from a site having
                left an expensive tool behind. The visual management aspect of 5S means that
                absences are immediately noticeable, unlike a pile of tools in a bag where you might
                not notice a missing multimeter until you need it three days later.
              </p>
            </div>
          </div>

          {/* InlineCheck 3 */}
          <InlineCheck
            id="tmo-4-3-routine"
            question="An electrician skips the 5-minute end-of-day routine on Friday evening. On Monday morning, he discovers tools are scattered, batteries are flat, and he has run out of earth sleeving. What is the likely total cost?"
            options={[
              'Zero cost because he can sort it out in 5 minutes on Monday',
              'Approximately 5 minutes of lost time',
              'Approximately 30\u201345 minutes: time searching for tools, waiting for batteries to charge, and making an emergency trip for earth sleeving',
              'The cost is only the price of the earth sleeving',
            ]}
            correctIndex={2}
            explanation="The 5-minute routine skipped on Friday now costs 30\u201345 minutes on Monday: searching for scattered tools (10 min), waiting for or working without fully charged batteries (ongoing productivity loss), and an unplanned merchant trip for earth sleeving (30 min). The 5-minute investment prevents the 30\u201345 minute cost. This is a 6:1 to 9:1 return on time invested."
          />

          {/* Section Summary */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Section Summary</h2>
            <div className="space-y-3">
              {[
                'Van disorganisation costs the average electrician 200 hours and \u00a39,000+ per year in lost productive time',
                'The 5S methodology (Sort, Set in Order, Shine, Standardise, Sustain) provides a proven framework for transformation',
                'Every tool must have one designated, labelled home position \u2014 retrieval becomes muscle memory, not a search',
                'Minimum stock levels with reorder triggers prevent the costly mid-job merchant runs that derail schedules',
                'Material pre-ordering the evening before eliminates unplanned supply trips worth 30\u201360 minutes each',
                'A 5-minute end-of-day routine (return tools, check stock, clear rubbish) saves 30+ minutes the following morning',
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How much does a proper van racking system cost?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Professional van racking (Sortimo, Bott) typically costs &pound;1,500&ndash;3,000
                  fully installed. However, a DIY solution using plywood shelving, plastic bins, and
                  tool clips can be built for &pound;200&ndash;400 and is perfectly effective. The
                  racking system pays for itself within weeks through time saved. Even a basic
                  system of labelled plastic boxes on plywood shelves is dramatically better than no
                  system at all.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How long does it take to implement 5S in a van?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  The initial Sort, Set in Order, and Shine steps typically take a full Saturday or
                  a quiet weekday &mdash; 4&ndash;6 hours to empty, sort, clean, and reorganise.
                  Standardise happens over the following week as you fine-tune positions based on
                  actual use. Sustain is an ongoing commitment, with the critical habit being the
                  5-minute end-of-day routine. Most electricians report that the system is fully
                  embedded within 3&ndash;4 weeks.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What if I do different types of work and need different tools each day?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  This is where the grab bag system excels. Keep your core tools permanently mounted
                  in the van, and create pre-loaded grab bags or cases for different job types:
                  &ldquo;Testing Kit,&rdquo; &ldquo;CU Change Kit,&rdquo; &ldquo;First Fix
                  Kit,&rdquo; and &ldquo;EICR Kit.&rdquo; Each bag contains the specific tools and
                  accessories for that work type. Grab the appropriate bag each morning based on the
                  day&rsquo;s schedule. This approach gives flexibility without sacrificing
                  organisation.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  My van is too small for proper racking. Can 5S still work?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes &mdash; in fact, 5S is even more important in a small van because space is at
                  a premium. The Sort step is critical: remove everything that is not genuinely
                  needed daily. The remaining items can be organised in stackable boxes,
                  wall-mounted tool clips, and overhead storage nets. A small van that is
                  well-organised is more efficient than a large van that is chaotic because you can
                  reach everything without climbing past obstacles.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            questions={quizQuestions}
            title="Section 3 Quiz: Van, Tool & Material Organisation"
          />

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
            <Button
              size="lg"
              className="min-h-[44px] bg-rose-500 hover:bg-rose-600 text-white touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4-section-4">
                Next: Financial Admin &amp; CIS
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
