import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const GettingStartedPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Getting Started
        </h1>
      </div>

      {/* What is a Portfolio */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            What is an Apprenticeship Portfolio?
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your apprenticeship portfolio is a structured collection of
            evidence that proves you are competent against the Level 3
            Installation Electrician / Maintenance Electrician standard
            (ST0152 v1.2). It is not just a folder of paperwork — it is a
            living document that tells the story of your development from
            day one to EPA readiness.
          </p>
          <p className="text-white text-sm leading-relaxed">
            Your portfolio will be reviewed during your End Point Assessment,
            specifically in the Professional Discussion component. The
            assessor will use it as a starting point for questions about your
            knowledge, skills, and behaviours.
          </p>
        </CardContent>
      </Card>

      {/* Why It Matters */}
      <Card className="border-green-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            Why Your Portfolio Matters
          </h2>
          <ul className="space-y-2">
            {[
              'It is required for EPA gateway sign-off — without it you cannot progress to assessment',
              'It demonstrates competence against all Knowledge, Skills and Behaviours (KSBs) in the standard',
              'It provides evidence for your Professional Discussion — assessors use it to guide questions',
              'It creates a permanent record of your professional development for future employers',
              'It proves to your EPAO that you have met all requirements of the apprenticeship',
              'It shows progression from beginner tasks to complex, independent work over 4 years',
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

      {/* What Goes In Your Portfolio */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-amber-400">
            What Goes in Your Portfolio?
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your portfolio should contain a mix of evidence types that
            together demonstrate your full range of competence. The key
            categories are:
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Photographic Evidence',
                desc: 'Before/after installation photos, cable routing, terminations, control panels, testing setups. Always clear, well-lit, and with context.',
              },
              {
                title: 'Written Documentation',
                desc: 'Test certificates, risk assessments, method statements, inspection reports, EICRs, minor works certificates.',
              },
              {
                title: 'Witness Testimonies',
                desc: 'Signed statements from supervisors, colleagues, or clients confirming your competence on specific tasks.',
              },
              {
                title: 'Practical Assessment Records',
                desc: 'Results from practical assessments, skills demonstrations, installation completion records.',
              },
              {
                title: 'Safety Documentation',
                desc: 'Safety induction records, PPE usage, accident/incident reports, toolbox talk attendance.',
              },
              {
                title: 'Professional Development',
                desc: 'Training certificates, CPD records, college coursework, self-study notes, reflective accounts.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-amber-500/20 rounded-lg p-3"
              >
                <h3 className="text-amber-400 font-semibold text-sm">
                  {item.title}
                </h3>
                <p className="text-white text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KSBs Explained */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-purple-400">
            Understanding KSBs
          </h2>
          <p className="text-white text-sm leading-relaxed">
            KSBs are the Knowledge, Skills, and Behaviours defined in the
            apprenticeship standard. Every piece of portfolio evidence should
            map to at least one KSB. Your training provider will give you a
            mapping document, but here is an overview:
          </p>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <h3 className="text-blue-400 font-semibold text-sm">
                Knowledge (K1–K15)
              </h3>
              <p className="text-white text-sm mt-1">
                What you understand — electrical science, BS 7671, health
                and safety legislation, environmental requirements, testing
                principles, fault-finding methods, and how electrical
                systems work.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h3 className="text-green-400 font-semibold text-sm">
                Skills (S1–S15)
              </h3>
              <p className="text-white text-sm mt-1">
                What you can do — install wiring systems, terminate cables,
                test and inspect circuits, diagnose faults, read drawings,
                use instruments correctly, work safely at height and in
                confined spaces.
              </p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <h3 className="text-purple-400 font-semibold text-sm">
                Behaviours (B1–B6)
              </h3>
              <p className="text-white text-sm mt-1">
                How you conduct yourself — working safely, taking
                responsibility, communicating effectively, working as part
                of a team, showing initiative, and maintaining a
                professional approach.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* When to Start */}
      <Card className="border-red-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-red-400">
            When to Start Building Your Portfolio
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The answer is simple:{' '}
            <span className="font-bold text-red-400">right now</span>.
            The biggest mistake apprentices make is leaving their portfolio
            until the final year. By then, you have forgotten details,
            lost photos, and cannot get witness statements for work done
            years ago.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <h3 className="text-red-400 font-semibold text-sm mb-2">
              Recommended Timeline
            </h3>
            <ul className="space-y-2">
              {[
                'Week 1: Set up your portfolio folder (digital or physical)',
                'Month 1: Start collecting induction evidence, safety records, and first photos',
                'Every week: Add at least one new piece of evidence',
                'Every month: Write a reflective account on what you have learned',
                'Every quarter: Review your KSB mapping — are there gaps?',
                'Year 3-4: Focus on filling KSB gaps and polishing presentation',
                'Gateway: Final review with your training provider before EPA',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-red-400 font-bold flex-shrink-0">
                    &bull;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Digital vs Physical */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            Digital vs Physical Portfolio
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Most training providers now accept or prefer digital portfolios.
            Check with your provider which format they require. Here are the
            pros and cons of each:
          </p>
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <h3 className="text-blue-400 font-semibold text-sm mb-2">
                Digital Portfolio
              </h3>
              <ul className="space-y-1">
                {[
                  'Easy to back up and cannot be lost in a fire or flood',
                  'Searchable — quickly find evidence for specific KSBs',
                  'Photos and videos easily included',
                  'Can share instantly with assessors and training providers',
                  'Common platforms: OneFile, Smart Assessor, Google Drive',
                  'Mobile-friendly — add evidence from your phone on site',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white"
                  >
                    <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <h3 className="text-amber-400 font-semibold text-sm mb-2">
                Physical Portfolio
              </h3>
              <ul className="space-y-1">
                {[
                  'Good for original certificates and signed documents',
                  'Some assessors prefer to flip through a physical folder',
                  'No technology issues during assessment',
                  'Use a ring binder with divider tabs for each KSB area',
                  'Print photos at decent quality — not tiny thumbnails',
                  'Always keep digital backups of everything physical',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white"
                  >
                    <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Early Mistakes */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-orange-400">
            Common Early Mistakes
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Avoid these pitfalls that catch many apprentices out in their
            first year:
          </p>
          <ul className="space-y-2">
            {[
              'Not starting until Year 3 or 4 — you will forget details and lose evidence',
              'Taking blurry or dark photos — always check quality before moving on',
              'Not getting witness statements signed — ask supervisors on the day, not months later',
              'Collecting quantity over quality — 5 excellent pieces beat 50 weak ones',
              'Not linking evidence to KSBs — every piece must map to at least one',
              'Ignoring Behaviours evidence — many apprentices focus only on Knowledge and Skills',
              'Not backing up digital files — one lost phone or laptop can wipe everything',
              'Waiting for perfect work — everyday tasks are valid evidence too',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <span className="text-orange-400 font-bold flex-shrink-0">
                  &bull;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Top Tips */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            Top Tips for Getting Started
          </h2>
          <ul className="space-y-2">
            {[
              'Set a weekly reminder on your phone to add portfolio evidence',
              'Keep a notes app on your phone for quick reflections on site',
              'Take photos BEFORE, DURING, and AFTER every installation',
              'Ask your assessor what format they prefer — then use that format',
              'Look at example portfolios if your training provider has them',
              'Talk to apprentices in later years — learn from their experience',
              'Create a KSB checklist and tick off evidence as you collect it',
              'Quality over quantity — one detailed, well-annotated photo beats ten blurry ones',
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

export default GettingStartedPage;
