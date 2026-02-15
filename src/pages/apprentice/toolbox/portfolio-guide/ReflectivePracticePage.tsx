import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const ReflectivePracticePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Reflective Practice
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-purple-400">
            Why Reflection Matters
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Reflective practice is the process of thinking about what you
            did, why you did it, what went well, what could be better, and
            what you will do differently next time. It is a critical part
            of your portfolio because it shows assessors that you
            understand your work, not just that you can do it.
          </p>
          <p className="text-white text-sm leading-relaxed">
            In the Professional Discussion component of your EPA, the
            assessor will ask you to reflect on your experiences. Practising
            reflection throughout your apprenticeship means you will be
            prepared and confident when that conversation happens.
          </p>
        </CardContent>
      </Card>

      {/* STAR Method */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            The STAR Method
          </h2>
          <p className="text-white text-sm leading-relaxed">
            STAR is the most commonly used framework for reflective
            writing in apprenticeships. Use it for every reflective
            account in your portfolio.
          </p>
          <div className="space-y-3">
            {[
              {
                letter: 'S',
                title: 'Situation',
                desc: 'Describe the context. Where were you? What was the project? What was the task?',
                example: 'I was on a domestic rewire project in a 3-bedroom semi-detached house. The existing wiring was TT earthing with old rubber-sheathed cables.',
                colour: 'text-blue-400',
                border: 'border-blue-500/20',
                bg: 'bg-blue-500/10',
              },
              {
                letter: 'T',
                title: 'Task',
                desc: 'What was your specific role and responsibility? What were you asked to do?',
                example: 'I was tasked with installing the new consumer unit and first-fix wiring for the upstairs circuits, working under my supervisor\'s guidance.',
                colour: 'text-green-400',
                border: 'border-green-500/20',
                bg: 'bg-green-500/10',
              },
              {
                letter: 'A',
                title: 'Action',
                desc: 'What did you actually do? Be specific about your actions, decisions, and the regulations or standards you followed.',
                example: 'I performed safe isolation of the existing supply using the GS38 procedure. I then installed a 10-way split-load consumer unit with dual RCDs, ran 2.5mm² T&E for ring finals and 1.5mm² for lighting circuits through the first-floor void, following BS 7671 Table 4D5.',
                colour: 'text-amber-400',
                border: 'border-amber-500/20',
                bg: 'bg-amber-500/10',
              },
              {
                letter: 'R',
                title: 'Result',
                desc: 'What was the outcome? What did you learn? What would you do differently?',
                example: 'All circuits tested satisfactorily — R1+R2 within expected ranges, insulation resistance >200MΩ, Zs values within limits. I learned that planning cable routes before starting saves significant time. Next time I would draw a full routing plan before cutting any cables.',
                colour: 'text-purple-400',
                border: 'border-purple-500/20',
                bg: 'bg-purple-500/10',
              },
            ].map((item) => (
              <div
                key={item.letter}
                className={`${item.bg} border ${item.border} rounded-lg p-3`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <span className={`${item.colour} font-bold text-sm`}>
                      {item.letter}
                    </span>
                  </div>
                  <h3 className={`${item.colour} font-semibold text-sm`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-white text-sm mb-2">{item.desc}</p>
                <div className="bg-white/5 rounded p-2">
                  <p className="text-white text-xs italic">
                    Example: {item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Writing Tips */}
      <Card className="border-green-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            Reflective Writing Tips
          </h2>
          <ul className="space-y-2">
            {[
              'Write in the first person — "I installed...", "I learned...", "I decided..."',
              'Be honest about mistakes — assessors value honesty and learning more than perfection',
              'Include technical detail — mention specific regulations, cable sizes, test values',
              'Explain your reasoning — why did you choose that approach? What alternatives were there?',
              'Link to KSBs — explicitly state which Knowledge, Skills, or Behaviours your reflection covers',
              'Keep it concise — 300-500 words per reflective account is usually sufficient',
              'Write soon after the event — you will forget important details if you wait weeks',
              'Show progression — early reflections should be simpler, later ones more detailed and analytical',
              'Include what went wrong — a reflection about a mistake you corrected is extremely valuable evidence',
              'Do not copy from textbooks — use your own words and your own experience',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Gibbs Reflective Cycle */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-amber-400">
            Gibbs Reflective Cycle (Alternative Method)
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Some training providers prefer the Gibbs Reflective Cycle
            instead of STAR. This 6-stage model goes deeper into your
            feelings and analysis:
          </p>
          <div className="space-y-2">
            {[
              {
                stage: '1. Description',
                desc: 'What happened? Describe the event factually.',
              },
              {
                stage: '2. Feelings',
                desc: 'What were you thinking and feeling at the time?',
              },
              {
                stage: '3. Evaluation',
                desc: 'What was good and bad about the experience?',
              },
              {
                stage: '4. Analysis',
                desc: 'What sense can you make of the situation? Why did things go the way they did?',
              },
              {
                stage: '5. Conclusion',
                desc: 'What else could you have done? What did you learn?',
              },
              {
                stage: '6. Action Plan',
                desc: 'What will you do differently next time?',
              },
            ].map((item) => (
              <div
                key={item.stage}
                className="bg-white/5 border border-amber-500/20 rounded-lg p-3"
              >
                <h3 className="text-amber-400 font-semibold text-sm">
                  {item.stage}
                </h3>
                <p className="text-white text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topics to Reflect On */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            Topics Worth Reflecting On
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Not sure what to write about? Here are excellent topics for
            reflective accounts that cover a range of KSBs:
          </p>
          <div className="space-y-3">
            {[
              {
                category: 'Technical Work',
                topics: [
                  'Your first consumer unit installation',
                  'A complex fault you helped diagnose',
                  'Testing and inspecting a completed installation',
                  'Working with 3-phase systems for the first time',
                  'Installing an EV charging point',
                  'Your first EICR contribution',
                ],
              },
              {
                category: 'Problem Solving',
                topics: [
                  'A time when something went wrong and how you fixed it',
                  'An unexpected fault that required creative thinking',
                  'Adapting your approach when original plans changed',
                  'Working around access difficulties on site',
                  'Dealing with damaged or incorrect materials',
                ],
              },
              {
                category: 'Professional Development',
                topics: [
                  'How your confidence has grown over your apprenticeship',
                  'A skill you struggled with but eventually mastered',
                  'What you learned from a more experienced electrician',
                  'How college theory helped you on site',
                  'Your preparation for the AM2 assessment',
                ],
              },
              {
                category: 'Working with Others',
                topics: [
                  'Coordinating with other trades on a project',
                  'Explaining electrical work to a non-technical client',
                  'Working effectively as part of a team on a large job',
                  'Dealing with a disagreement on site',
                  'Mentoring a newer apprentice',
                ],
              },
              {
                category: 'Health & Safety',
                topics: [
                  'A near-miss incident and what you learned from it',
                  'Implementing safe isolation on a live system',
                  'Identifying and reporting a safety hazard',
                  'Working at height for the first time',
                  'Dealing with asbestos discovery during a rewire',
                ],
              },
            ].map((section) => (
              <div
                key={section.category}
                className="bg-white/5 border border-blue-500/20 rounded-lg p-3"
              >
                <h3 className="text-blue-400 font-semibold text-sm mb-2">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-sm text-white"
                    >
                      <span className="text-blue-400 flex-shrink-0">
                        &bull;
                      </span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Linking to EPA */}
      <Card className="border-red-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-red-400">
            Linking Reflection to Your EPA
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your reflective accounts directly prepare you for the
            Professional Discussion component of your EPA. The assessor
            will ask you to discuss your experiences, explain your
            reasoning, and demonstrate your understanding. If you have
            been writing quality reflections throughout your apprenticeship,
            you will find this conversation natural and confident.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <h3 className="text-red-400 font-semibold text-sm mb-2">
              How Assessors Use Your Reflections
            </h3>
            <ul className="space-y-1">
              {[
                'They read your reflective accounts before the Professional Discussion',
                'They use them as starting points for deeper questions',
                'They look for evidence of genuine understanding, not rehearsed answers',
                'They want to see progression in your reflective ability over time',
                'They assess whether you can apply theory to practice',
                'They check that you understand why regulations exist, not just what they are',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-red-400 flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Example Reflective Account */}
      <Card className="border-purple-500/30 bg-purple-500/10">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-purple-400">
            Full Example: Reflective Account
          </h2>
          <p className="text-white text-sm italic leading-relaxed">
            KSBs covered: S5 (Install wiring systems), K3 (BS 7671),
            B1 (Safe working)
          </p>
          <div className="bg-white/5 rounded-lg p-3 space-y-2">
            <p className="text-white text-sm leading-relaxed">
              <span className="text-blue-400 font-semibold">Situation:</span>{' '}
              During a kitchen refurbishment in a domestic property, I was
              asked to install a new radial circuit for a cooker supply.
              The existing installation was a TN-C-S system with a 100A
              main fuse and 16mm² tails.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <span className="text-green-400 font-semibold">Task:</span>{' '}
              I needed to install a 32A radial circuit using 6mm² T&E
              from the consumer unit to a 45A cooker switch with a 13A
              socket outlet, a distance of approximately 18 metres.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <span className="text-amber-400 font-semibold">Action:</span>{' '}
              I first performed safe isolation of the consumer unit using
              the approved procedure (GS38). I then referred to BS 7671
              Table 4D5 to confirm that 6mm² T&E was suitable for the
              32A circuit, considering the installation method (clipped
              direct, method C) and the route length. I calculated the
              voltage drop using the mV/A/m values and confirmed it was
              within the 5% limit. I installed the cable, terminated at
              both ends, and fitted the cooker switch. I then tested the
              circuit: R1+R2 was 0.82Ω, insulation resistance was greater
              than 200MΩ, and Zs was 0.94Ω — all within acceptable limits.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <span className="text-purple-400 font-semibold">Result:</span>{' '}
              The circuit passed all tests and was signed off by my
              supervisor. I learned the importance of checking voltage
              drop calculations before starting the installation — if
              the route had been 5 metres longer, I would have needed
              to use 10mm² cable. In future, I will always calculate
              voltage drop as part of my planning before pulling cable.
            </p>
          </div>
          <p className="text-white text-sm leading-relaxed">
            This single reflective account covers installation skills,
            BS 7671 knowledge, and safe working behaviours — mapping to
            three KSBs with one piece of evidence.
          </p>
        </CardContent>
      </Card>

      {/* How Often */}
      <Card className="border-green-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            How Often Should You Reflect?
          </h2>
          <ul className="space-y-2">
            {[
              'Aim for at least one detailed reflective account per month',
              'Write brief notes after significant tasks (even just bullet points)',
              'Complete a full STAR reflection after each major installation or project',
              'Reflect on college learning and how it connects to site work',
              'Write a reflection whenever something unexpected happens',
              'By gateway, aim for 15-20 quality reflective accounts covering all KSBs',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReflectivePracticePage;
