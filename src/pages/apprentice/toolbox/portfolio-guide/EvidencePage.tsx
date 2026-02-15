import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const EvidencePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Evidence Collection
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-orange-400">
            Collecting Quality Evidence
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The quality of your evidence matters far more than the quantity.
            Each piece should clearly demonstrate competence against one or
            more KSBs. This section covers each evidence type in detail,
            with practical tips for collecting the best evidence on site.
          </p>
        </CardContent>
      </Card>

      {/* Photographic Evidence */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            Photographic Evidence
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Photos are often your strongest evidence. They show exactly what
            you did, how you did it, and the quality of your work. Always
            take photos in a sequence: before, during, and after.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <h3 className="text-blue-400 font-semibold text-sm mb-2">
              What to Photograph
            </h3>
            <ul className="space-y-1">
              {[
                'Consumer unit installations — before removing old unit, during wiring, after completion',
                'Cable routing and containment — trunking, conduit, tray installations',
                'Terminations — close-up shots showing neat, secure connections',
                'Testing setups — your instrument connected to the circuit',
                'Distribution boards — labelling, circuit identification',
                'Outdoor installations — EV chargers, garden lighting, external sockets',
                'Fault-finding — the fault condition, your testing approach, the repair',
                'Safety measures — barriers, signage, PPE in use, isolation locks',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-blue-400 flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <h3 className="text-green-400 font-semibold text-sm mb-2">
              Photo Quality Tips
            </h3>
            <ul className="space-y-1">
              {[
                'Use good lighting — turn on room lights, use your phone torch if needed',
                'Keep your hands steady — brace against a wall or surface',
                'Include context — show the full installation, not just a close-up',
                'Add scale — include a ruler, your hand, or a known object for size reference',
                'Check the photo immediately — retake if blurry or dark',
                'Clean the lens — site dust makes photos hazy',
                'Take landscape orientation for wide installations, portrait for vertical runs',
                'Include your face or PPE in some shots — proves you were there',
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
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <h3 className="text-amber-400 font-semibold text-sm mb-2">
              Annotating Photos
            </h3>
            <p className="text-white text-sm">
              Always add a brief annotation to each photo explaining what it
              shows, what KSB it maps to, the date, and the location. You
              can use your phone's markup tool, a Word document, or your
              e-portfolio platform's annotation feature. Without annotation,
              a photo is just a picture — with annotation, it becomes
              evidence.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Written Documentation */}
      <Card className="border-green-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            Written Documentation
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Formal documents carry significant weight because they are
            standardised and verifiable. Collect these throughout your
            apprenticeship.
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Test Certificates & Reports',
                items: [
                  'Electrical Installation Certificates (EICs) you have contributed to',
                  'Electrical Installation Condition Reports (EICRs)',
                  'Minor Works Certificates',
                  'Schedule of Test Results (R1+R2, Zs, RCD trip times, insulation resistance)',
                  'Tip: Keep copies even if your supervisor signs them — they prove you did the testing',
                ],
              },
              {
                title: 'Risk Assessments & Method Statements',
                items: [
                  'Risk assessments you have written or contributed to',
                  'Method statements for specific tasks',
                  'COSHH assessments',
                  'Dynamic risk assessments completed on site',
                  'Tip: Write your own RA/MS for a task you do regularly — excellent Behaviour evidence',
                ],
              },
              {
                title: 'College Work & Assignments',
                items: [
                  'Completed assignments with assessor feedback',
                  'Exam results and grade sheets',
                  'Technical reports and calculations',
                  'BS 7671 exercises and worked examples',
                  'Tip: Keep the feedback — it shows your progression and learning from mistakes',
                ],
              },
              {
                title: 'Training Certificates',
                items: [
                  'ECS/CSCS card',
                  'BS 7671 18th Edition certificate',
                  'First aid certificate',
                  'Working at height training',
                  'Asbestos awareness',
                  'Manual handling',
                  'Any manufacturer-specific training (e.g. EV charger installation)',
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="bg-white/5 border border-green-500/20 rounded-lg p-3"
              >
                <h3 className="text-green-400 font-semibold text-sm mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-white"
                    >
                      <span className="text-green-400 flex-shrink-0">
                        &bull;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Witness Testimonies */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-purple-400">
            Witness Testimonies
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Witness testimonies are statements from people who have observed
            your work and can confirm your competence. They are particularly
            valuable for Behaviours evidence.
          </p>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <h3 className="text-purple-400 font-semibold text-sm mb-2">
              Who Can Provide Witness Testimonies?
            </h3>
            <ul className="space-y-1">
              {[
                'Your site supervisor or line manager',
                'Qualified electricians you work alongside',
                'Other tradespeople on the same project',
                'Clients or site managers (for professionalism evidence)',
                'Your college tutor or assessor',
                'Your mentor (if you have a formal mentoring arrangement)',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-purple-400 flex-shrink-0">
                    &bull;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <h3 className="text-blue-400 font-semibold text-sm mb-2">
              What Makes a Good Witness Testimony?
            </h3>
            <ul className="space-y-1">
              {[
                'Be specific — "John installed a consumer unit safely and to BS 7671" is better than "John is a good worker"',
                'Include the date, location, and task performed',
                'State which KSBs the testimony covers',
                'Include the witness\'s name, role, qualifications, and signature',
                'Add the witness\'s contact details for verification',
                'Ask for it on the same day — people forget details quickly',
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
              Template for Requesting a Witness Statement
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Make it easy for your witness — provide a simple form with:
              Date of observation, task performed, what they observed you
              doing, the standard of your work, KSB references covered,
              and their name/role/signature. The easier you make it, the
              more likely people will complete it promptly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Practical Assessment Records */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-amber-400">
            Practical Assessment Records
          </h2>
          <p className="text-white text-sm leading-relaxed">
            These are records of formal and informal practical assessments
            where your skills have been observed and evaluated.
          </p>
          <ul className="space-y-2">
            {[
              'Practical assessment results from college workshops',
              'On-site observation records from your assessor',
              'Installation completion records signed by a supervisor',
              'Skills demonstration records (e.g. safe isolation, testing procedures)',
              'Troubleshooting and fault diagnosis documentation',
              'AM2 mock assessment results',
              'Timed practical exercises and results',
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
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <h3 className="text-amber-400 font-semibold text-sm mb-2">
              Tip: Document Your Process
            </h3>
            <p className="text-white text-sm">
              Do not just record the result — document your process. Explain
              what you did, why you chose that approach, what regulations
              applied, and what you would do differently next time. This
              demonstrates understanding, not just ability.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Safety Documentation */}
      <Card className="border-red-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-red-400">
            Safety Documentation
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Health and safety evidence demonstrates your awareness and
            compliance — essential for Behaviours KSBs.
          </p>
          <ul className="space-y-2">
            {[
              'Site induction completion records',
              'PPE usage documentation and photos',
              'Toolbox talk attendance records',
              'Near-miss or incident reports you have raised',
              'Risk assessments you have contributed to or written',
              'Safe isolation procedure evidence (photos + description)',
              'Permit-to-work documentation',
              'Safety improvement suggestions you have made',
              'First aid incidents you responded to',
              'COSHH awareness documentation',
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
        </CardContent>
      </Card>

      {/* Evidence Quality Checklist */}
      <Card className="border-green-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            Evidence Quality Checklist
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Before adding any evidence to your portfolio, check it against
            these quality criteria:
          </p>
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h3 className="text-green-400 font-semibold text-sm mb-2">
                Good Evidence Is:
              </h3>
              <ul className="space-y-1">
                {[
                  'Authentic — your own work, not someone else\'s',
                  'Current — recent and relevant to your stage of training',
                  'Sufficient — detailed enough to demonstrate competence',
                  'Valid — clearly linked to specific KSBs',
                  'Reliable — could be verified by an independent party',
                  'Clear — readable, well-lit photos, legible handwriting',
                  'Contextualised — includes date, location, and description',
                  'Annotated — explains what it shows and why it matters',
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
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <h3 className="text-red-400 font-semibold text-sm mb-2">
                Common Evidence Mistakes:
              </h3>
              <ul className="space-y-1">
                {[
                  'Blurry or dark photographs with no context',
                  'Undated documents with no location information',
                  'Evidence that does not clearly link to any KSB',
                  'Unsigned witness testimonies',
                  'Copies of generic information rather than your own work',
                  'Too much evidence for one KSB, nothing for another',
                  'Messy presentation — crumpled paper, disorganised folders',
                  'Including confidential client information without consent',
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
          </div>
        </CardContent>
      </Card>

      {/* Cross-Referencing Evidence */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            Cross-Referencing Evidence
          </h2>
          <p className="text-white text-sm leading-relaxed">
            One piece of evidence can map to multiple KSBs. For example, a
            photo of you installing a consumer unit with proper PPE could
            cover Skills (installation), Knowledge (BS 7671), and Behaviours
            (safe working). Cross-referencing reduces the total evidence
            needed and shows holistic competence.
          </p>
          <p className="text-white text-sm leading-relaxed">
            When you add evidence, list ALL the KSBs it covers — not just
            the most obvious one. Your KSB tracker should show these
            cross-references so you can see your overall coverage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidencePage;
