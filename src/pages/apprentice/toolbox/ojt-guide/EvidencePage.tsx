import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const essentialDocs = [
  'Training logs with dates, start/end times, and total duration',
  'Course certificates and completion records',
  'Assignment submissions and marked feedback',
  'Photographic evidence of practical work',
  'Witness testimonials from trainers or supervisors',
  'Learning reflections and progress notes',
  'College attendance records and registers',
  'Online learning platform completion screenshots',
];

const qualityStandards = [
  'Clear, legible, and professionally presented',
  'Chronologically organised and dated',
  'Directly linked to apprenticeship standard KSBs',
  'Authenticated by appropriate personnel',
  'Regularly updated and maintained',
  'Accessible for assessment and verification',
];

const portfolioBestPractices = [
  'Use cloud storage (Google Drive, OneDrive) for backup and accessibility',
  'Maintain consistent file naming: YYYY-MM-DD_ActivityType_Topic',
  'Create separate folders for each learning activity type',
  'Include metadata and tags for easy searching',
  'Schedule weekly backups to prevent data loss',
  'Keep both digital and paper copies of signed documents',
];

const commonMistakes = [
  {
    mistake: 'Vague descriptions',
    example: '"College" or "Online learning"',
    fix: 'Write what you actually learned: "BS 7671 Part 4 — protection against electric shock, including ADS and double insulation"',
  },
  {
    mistake: 'Missing dates or times',
    example: 'Logging "8 hours" with no date',
    fix: 'Always include: date, start time, end time, and total hours',
  },
  {
    mistake: 'No KSB mapping',
    example: 'Not linking activities to the standard',
    fix: 'Reference which KSBs each session covers — your provider should give you a mapping sheet',
  },
  {
    mistake: 'Bulk logging at the end of term',
    example: 'Writing up 3 months of logs in one sitting',
    fix: 'Log every session on the same day. Auditors can tell when logs were bulk-written',
  },
  {
    mistake: 'No supervisor sign-off',
    example: 'Unsigned training logs',
    fix: 'Get your trainer or supervisor to countersign weekly — unsigned logs may be rejected',
  },
];

const auditorExpectations = [
  'A clear training plan showing planned vs actual hours',
  'Consistent, contemporaneous records (written at the time, not retrospectively)',
  'Evidence that activities are genuinely separate from productive work',
  'Supervisor or trainer signatures confirming attendance',
  'KSB mapping showing coverage across the full standard',
  'Evidence of quality — not just quantity — of learning',
  'Records of any missed sessions and how hours were made up',
];

const photoTips = [
  {
    title: 'What to photograph',
    items: [
      'Completed practical exercises (wiring, terminations, testing)',
      'Whiteboard notes or presentations from theory sessions',
      'Test results and instrument readings',
      'Workshop setups before and after',
      'Certificates, awards, or completion screens',
    ],
  },
  {
    title: 'How to capture it properly',
    items: [
      'Ensure good lighting — avoid blurry or dark images',
      'Include a date stamp (enable date overlay on your phone camera)',
      'Add a brief caption explaining what the photo shows',
      'Take close-ups of detailed work and wide shots for context',
      'Never photograph other apprentices without their permission',
    ],
  },
  {
    title: 'Organising your photos',
    items: [
      'Create monthly folders on your phone or cloud storage',
      'Name files clearly: 2025-09-15_CableTermination_Workshop.jpg',
      'Back up to cloud storage immediately — do not rely on your phone alone',
      'Cross-reference photos in your training log entries',
    ],
  },
];

const EvidencePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Evidence Collection</h1>
      </div>

      {/* Intro */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-white mb-2">Evidence Requirements</h2>
          <p className="text-white text-sm leading-relaxed">
            Proper documentation of your off-the-job training is essential for
            apprenticeship completion. You must maintain comprehensive evidence to
            demonstrate you have completed the fixed training hours required by your
            standard. Poor evidence is one of the most common reasons apprentices face
            issues at gateway.
          </p>
        </CardContent>
      </Card>

      {/* Example Log Entry */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">Example Evidence Log Entry</h2>
        </div>

        <Card className="border-green-500/20 bg-green-500/10">
          <CardContent className="p-4 space-y-2">
            <p className="text-white text-sm font-medium">
              This is what a good log entry looks like:
            </p>
            <div className="bg-white/10 rounded-lg p-3 space-y-1 text-sm text-white">
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>15 September 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>09:00 — 16:30 (6.5 hrs)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Location:</span>
                <span>City College Workshop B</span>
              </div>
              <div>
                <span className="font-medium">Activity:</span>
                <span className="ml-1">
                  Practical workshop — single-phase consumer unit installation and testing.
                  Completed wiring to BS 7671 requirements, performed initial verification
                  (insulation resistance, continuity, polarity). Trainer demonstrated RCD
                  testing procedure.
                </span>
              </div>
              <div>
                <span className="font-medium">KSBs covered:</span>
                <span className="ml-1">K4, K8, S1, S3, S7</span>
              </div>
              <div>
                <span className="font-medium">Trainer signature:</span>
                <span className="ml-1">J. Smith</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Essential Documentation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">Essential Documentation</h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4">
            <ul className="space-y-2">
              {essentialDocs.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {doc}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Common Mistakes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">Common Mistakes to Avoid</h2>
        </div>

        {commonMistakes.map((item) => (
          <Card key={item.mistake} className="border-red-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <h3 className="font-medium text-red-400 text-sm">{item.mistake}</h3>
              </div>
              <p className="text-white text-sm ml-7">
                <span className="text-white">Bad: </span>
                {item.example}
              </p>
              <div className="flex items-start gap-2 ml-7">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm">{item.fix}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* What Auditors Look For */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">What ESFA Auditors Look For</h2>
        </div>

        <Card className="border-amber-500/20 bg-amber-500/10">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Search className="h-4 w-4 text-amber-400" />
              <p className="text-white text-sm font-medium">
                Auditors check your provider, but your evidence matters too
              </p>
            </div>
            <ul className="space-y-2">
              {auditorExpectations.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-amber-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quality Standards */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">Quality Standards</h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4">
            <ul className="space-y-2">
              {qualityStandards.map((std) => (
                <li key={std} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {std}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Photo Evidence Tips */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">Photo Evidence Tips</h2>
        </div>

        {photoTips.map((section) => (
          <Card key={section.title} className="border-purple-500/20 bg-white/5">
            <CardContent className="p-4">
              <h3 className="text-purple-400 font-semibold text-sm mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white">
                    <span className="text-purple-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Digital Portfolio */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">Digital Portfolio Best Practices</h2>
        </div>

        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm">
              Modern apprentices benefit from digital evidence management:
            </p>
            <ul className="space-y-2">
              {portfolioBestPractices.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvidencePage;
