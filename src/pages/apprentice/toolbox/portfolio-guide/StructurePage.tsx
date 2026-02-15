import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const StructurePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Structure & Planning
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-green-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            Building a Well-Organised Portfolio
          </h2>
          <p className="text-white text-sm leading-relaxed">
            A well-structured portfolio makes it easy for assessors to find
            evidence, demonstrates your organisational skills, and ensures
            you cover all required KSBs. Plan your structure early and stick
            to it throughout your apprenticeship.
          </p>
        </CardContent>
      </Card>

      {/* Recommended Structure */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            Recommended Portfolio Structure
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Use this structure as a starting point. Your training provider
            may have their own template — always follow their requirements
            first.
          </p>
          <div className="space-y-3">
            {[
              {
                section: 'Section 1: Personal Information',
                contents: [
                  'Your name, employer, training provider',
                  'Apprenticeship start and expected end dates',
                  'Apprenticeship standard reference (ST0152 v1.2)',
                  'Your pathway (Installation or Maintenance)',
                  'Contact details for your assessor and mentor',
                ],
              },
              {
                section: 'Section 2: Induction & Safety',
                contents: [
                  'Site induction records',
                  'Health and safety training certificates',
                  'CSCS card details',
                  'First aid training',
                  'Manual handling certificate',
                  'Working at height training',
                ],
              },
              {
                section: 'Section 3: Knowledge Evidence',
                contents: [
                  'College coursework and assignments',
                  'Written assessments and exam results',
                  'Technical notes and calculations',
                  'BS 7671 knowledge demonstrations',
                  'Electrical science understanding',
                ],
              },
              {
                section: 'Section 4: Skills Evidence',
                contents: [
                  'Installation photographs (before/during/after)',
                  'Testing and inspection records',
                  'Wiring diagrams you have produced',
                  'Fault-finding documentation',
                  'Tool and instrument competency records',
                ],
              },
              {
                section: 'Section 5: Behaviours Evidence',
                contents: [
                  'Witness testimonies from supervisors',
                  'Team working examples',
                  'Communication evidence (emails, site reports)',
                  'Initiative and problem-solving examples',
                  'Professional conduct records',
                ],
              },
              {
                section: 'Section 6: Professional Development',
                contents: [
                  'Training certificates (ECS, 18th Edition, AM2)',
                  'CPD activity log',
                  'Progress review records',
                  'Self-assessment and target-setting documents',
                  'Additional qualifications gained',
                ],
              },
              {
                section: 'Section 7: Reflective Accounts',
                contents: [
                  'Monthly or quarterly reflective journals',
                  'Project-based reflections',
                  'Learning from mistakes documentation',
                  'Links between theory and practice',
                  'Personal development insights',
                ],
              },
              {
                section: 'Section 8: Off-the-Job Training Log',
                contents: [
                  'OJT hours tracker',
                  'College attendance records',
                  'Self-study evidence',
                  'Mentoring and coaching records',
                  'Activities mapped to 20% minimum requirement',
                ],
              },
            ].map((item) => (
              <div
                key={item.section}
                className="bg-white/5 border border-blue-500/20 rounded-lg p-3"
              >
                <h3 className="text-blue-400 font-semibold text-sm mb-2">
                  {item.section}
                </h3>
                <ul className="space-y-1">
                  {item.contents.map((content) => (
                    <li
                      key={content}
                      className="flex items-start gap-2 text-sm text-white"
                    >
                      <span className="text-blue-400 flex-shrink-0">
                        &bull;
                      </span>
                      {content}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Planning */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-amber-400">
            Step-by-Step Planning Guide
          </h2>
          <div className="space-y-3">
            {[
              {
                step: 1,
                title: 'Understand Your Requirements',
                tasks: [
                  'Read your apprenticeship standard (ST0152 v1.2) — available on IfATE/Skills England website',
                  'Get the full KSB list from your training provider',
                  'Understand the assessment criteria for each KSB',
                  'Note any submission deadlines from your provider',
                  'Ask your assessor what format they prefer',
                ],
              },
              {
                step: 2,
                title: 'Set Up Your Filing System',
                tasks: [
                  'Create folders for each portfolio section (digital or physical)',
                  'Set up a KSB tracking spreadsheet or checklist',
                  'Create a naming convention for files (e.g. 2026-02-K3-cable-sizing.jpg)',
                  'Set up cloud backup (Google Drive, OneDrive, or iCloud)',
                  'If physical, buy a sturdy ring binder with divider tabs',
                ],
              },
              {
                step: 3,
                title: 'Create Your Evidence Collection Plan',
                tasks: [
                  'List all KSBs and identify which evidence types suit each one',
                  'Plan which evidence you can collect in each year of your apprenticeship',
                  'Identify gaps early — some KSBs are harder to evidence',
                  'Schedule regular portfolio review sessions with your assessor',
                  'Set weekly reminders to add new evidence',
                ],
              },
              {
                step: 4,
                title: 'Build Your Collection Habits',
                tasks: [
                  'Take photos of every installation you work on',
                  'Write brief notes about each task on the same day',
                  'Ask supervisors for witness statements immediately after tasks',
                  'Save all certificates, reports, and documents straight away',
                  'Reflect on what you learned at the end of each week',
                ],
              },
              {
                step: 5,
                title: 'Review and Refine',
                tasks: [
                  'Check your KSB tracking monthly — identify gaps',
                  'Review evidence quality — replace weak items with better ones',
                  'Get feedback from your assessor at each progress review',
                  'Cross-reference evidence — one piece can map to multiple KSBs',
                  'Prepare for gateway by ensuring full KSB coverage',
                ],
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/5 border border-amber-500/20 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 font-bold text-sm">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-amber-400 font-semibold text-sm">
                    {item.title}
                  </h3>
                </div>
                <ul className="space-y-1 ml-9">
                  {item.tasks.map((task) => (
                    <li
                      key={task}
                      className="flex items-start gap-2 text-sm text-white"
                    >
                      <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KSB Tracking Template */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-purple-400">
            KSB Tracking Method
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Create a simple spreadsheet or table with these columns to track
            your evidence against each KSB:
          </p>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <div className="space-y-2">
              {[
                'Column 1: KSB Reference (e.g. K3, S5, B2)',
                'Column 2: KSB Description (e.g. "Understand cable selection and sizing")',
                'Column 3: Evidence Collected (list of file names / descriptions)',
                'Column 4: Evidence Type (photo, certificate, witness statement, etc.)',
                'Column 5: Date Collected',
                'Column 6: Status (Not Started / In Progress / Complete)',
                'Column 7: Notes (any gaps, extra evidence needed)',
              ].map((item) => (
                <p key={item} className="text-sm text-white">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Review this tracker monthly. Aim to have at least 2-3 pieces of
            evidence for each KSB by gateway. Some KSBs naturally generate
            more evidence than others — focus on quality, not quantity.
          </p>
        </CardContent>
      </Card>

      {/* Naming Conventions */}
      <Card className="border-green-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            File Naming Conventions
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Good file naming saves hours when searching for evidence. Use a
            consistent format throughout:
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <h3 className="text-green-400 font-semibold text-sm mb-2">
              Recommended Format
            </h3>
            <p className="text-white text-sm font-mono">
              YYYY-MM-DD_KSB-ref_description.ext
            </p>
            <h3 className="text-green-400 font-semibold text-sm mt-3 mb-2">
              Examples
            </h3>
            <ul className="space-y-1">
              {[
                '2026-02-15_K3_cable-sizing-calculation.pdf',
                '2026-02-15_S5_consumer-unit-install-photo.jpg',
                '2026-02-15_B2_supervisor-witness-teamwork.pdf',
                '2026-02-15_S8_rcd-test-results.pdf',
                '2026-02-15_K7_bs7671-assignment.docx',
              ].map((item) => (
                <li key={item} className="text-sm text-white font-mono">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Planning Pitfalls */}
      <Card className="border-red-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-red-400">
            Planning Pitfalls to Avoid
          </h2>
          <ul className="space-y-2">
            {[
              'Over-complicating your structure — keep it simple and consistent',
              'Not following your training provider\'s required format',
              'Creating too many sub-folders — you will lose track of where things are',
              'Not including a contents page or index in physical portfolios',
              'Forgetting to update your KSB tracker when adding new evidence',
              'Planning to collect everything in Year 4 — it is too late by then',
              'Not making a backup plan — what happens if your laptop breaks?',
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
        </CardContent>
      </Card>

      {/* Portfolio Review Checklist */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            Monthly Review Checklist
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Run through this checklist at the start of every month:
          </p>
          <ul className="space-y-2">
            {[
              'Have I added new evidence this month?',
              'Does every new piece map to at least one KSB?',
              'Are there any KSBs with no evidence yet?',
              'Have I written a reflective account this month?',
              'Are all files named correctly and in the right folder?',
              'Is my KSB tracker up to date?',
              'Have I backed up my digital portfolio this month?',
              'Do I need to request any witness statements?',
              'Is my OJT log current and accurate?',
              'Have I discussed my progress with my assessor?',
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
        </CardContent>
      </Card>
    </div>
  );
};

export default StructurePage;
