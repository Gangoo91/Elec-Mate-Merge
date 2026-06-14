/**
 * Portfolio · EvidencePage — editorial guide to evidence collection.
 *
 * Photos, written docs, witness testimonies, practical records, safety
 * documentation, quality checklist, cross-referencing.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, Camera } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const whatToPhotograph = [
  'Consumer unit installations — before removing old unit, during wiring, after completion',
  'Cable routing and containment — trunking, conduit, tray installations',
  'Terminations — close-up shots showing neat, secure connections',
  'Testing setups — your instrument connected to the circuit',
  'Distribution boards — labelling, circuit identification',
  'Outdoor installations — EV chargers, garden lighting, external sockets',
  'Fault-finding — the fault condition, your testing approach, the repair',
  'Safety measures — barriers, signage, PPE in use, isolation locks',
];

const photoTips = [
  'Use good lighting — turn on room lights, use your phone torch if needed',
  'Keep your hands steady — brace against a wall or surface',
  'Include context — show the full installation, not just a close-up',
  'Add scale — include a ruler, your hand, or known object for size',
  'Check the photo immediately — retake if blurry or dark',
  'Clean the lens — site dust makes photos hazy',
  'Take landscape for wide installations, portrait for vertical runs',
  'Include your face or PPE in some shots — proves you were there',
];

const writtenDocs = [
  {
    title: 'Test certificates & reports',
    items: [
      'Electrical Installation Certificates (EICs) you have contributed to',
      'Electrical Installation Condition Reports (EICRs)',
      'Minor Works Certificates',
      'Schedule of Test Results (R1+R2, Zs, RCD trip times, IR)',
      'Tip: keep copies even if your supervisor signs them — they prove you did the testing',
    ],
  },
  {
    title: 'Risk assessments & method statements',
    items: [
      'Risk assessments you have written or contributed to',
      'Method statements for specific tasks',
      'COSHH assessments',
      'Dynamic risk assessments completed on site',
      'Tip: write your own RA/MS for a task you do regularly — excellent Behaviour evidence',
    ],
  },
  {
    title: 'College work & assignments',
    items: [
      'Completed assignments with assessor feedback',
      'Exam results and grade sheets',
      'Technical reports and calculations',
      'BS 7671 exercises and worked examples',
      'Tip: keep the feedback — shows progression and learning from mistakes',
    ],
  },
  {
    title: 'Training certificates',
    items: [
      'ECS / CSCS card',
      'BS 7671 18th Edition certificate',
      'First aid certificate',
      'Working at height training',
      'Asbestos awareness',
      'Manual handling',
      'Manufacturer-specific training (e.g. EV charger installation)',
    ],
  },
];

const witnessProviders = [
  'Your site supervisor or line manager',
  'Qualified electricians you work alongside',
  'Other tradespeople on the same project',
  'Clients or site managers (for professionalism evidence)',
  'Your college tutor or assessor',
  'Your mentor (if you have a formal mentoring arrangement)',
];

const goodWitnessTips = [
  '"John installed a consumer unit safely and to BS 7671" beats "John is a good worker"',
  'Include the date, location, and task performed',
  'State which KSBs the testimony covers',
  "Include the witness's name, role, qualifications, and signature",
  "Add the witness's contact details for verification",
  'Ask for it on the same day — people forget details quickly',
];

const practicalRecords = [
  'Practical assessment results from college workshops',
  'On-site observation records from your assessor',
  'Installation completion records signed by a supervisor',
  'Skills demonstration records (safe isolation, testing procedures)',
  'Troubleshooting and fault diagnosis documentation',
  'AM2S mock assessment results',
  'Timed practical exercises and results',
];

const safetyDocs = [
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
];

const goodEvidence = [
  "Authentic — your own work, not someone else's",
  'Current — recent and relevant to your stage of training',
  'Sufficient — detailed enough to demonstrate competence',
  'Valid — clearly linked to specific KSBs',
  'Reliable — could be verified by an independent party',
  'Clear — readable, well-lit photos, legible handwriting',
  'Contextualised — includes date, location, and description',
  'Annotated — explains what it shows and why it matters',
];

const evidenceMistakes = [
  'Blurry or dark photographs with no context',
  'Undated documents with no location information',
  "Evidence that doesn't clearly link to any KSB",
  'Unsigned witness testimonies',
  'Copies of generic information rather than your own work',
  'Too much evidence for one KSB, nothing for another',
  'Messy presentation — crumpled paper, disorganised folders',
  'Including confidential client information without consent',
];

const EvidencePage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/portfolio-building')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Portfolio"
          title="Evidence collection"
          description="Quality matters more than quantity. Each piece should clearly demonstrate competence against one or more KSBs. Practical tips for collecting the best evidence on site."
          tone="yellow"
        />
      </motion.div>

      {/* ── Intro ───────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <Eyebrow>The principle</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            The quality of your evidence matters far more than the quantity. Each piece should
            clearly demonstrate competence against one or more KSBs. This section covers each
            evidence type in detail.
          </p>
        </div>
      </motion.div>

      {/* ── Photographic ────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Photographic evidence"
          title="Often your strongest evidence"
          meta="Before, during, after — every install, every time"
          action={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
              <Camera className="h-4 w-4 text-elec-yellow" />
            </span>
          }
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <div className="space-y-2">
            <Eyebrow>What to photograph</Eyebrow>
            <ul className="space-y-1.5">
              {whatToPhotograph.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 pt-2 border-t border-white/[0.04]">
            <Eyebrow>Photo quality tips</Eyebrow>
            <ul className="space-y-1.5">
              {photoTips.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
            <Eyebrow className="text-elec-yellow/85">Annotating photos</Eyebrow>
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              Always add a brief annotation to each photo explaining what it shows, what KSB it maps
              to, the date, and the location. Without annotation a photo is just a picture — with
              annotation, it becomes evidence.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Written documentation ───────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Written documentation"
          title="Standardised and verifiable"
          meta="Four categories that carry significant weight"
        />
        <ul className="space-y-2">
          {writtenDocs.map((section) => (
            <li
              key={section.title}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <h3 className="text-[13.5px] font-semibold text-elec-yellow tracking-tight">
                {section.title}
              </h3>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ── Witness testimonies ────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Witness testimonies"
          title="Particularly valuable for Behaviours"
          meta="Statements from people who have observed your work"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <div className="space-y-2">
            <Eyebrow>Who can provide testimonies?</Eyebrow>
            <ul className="space-y-1.5">
              {witnessProviders.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 pt-2 border-t border-white/[0.04]">
            <Eyebrow>What makes a good testimony</Eyebrow>
            <ul className="space-y-1.5">
              {goodWitnessTips.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
            <Eyebrow className="text-elec-yellow/85">Template for requesting</Eyebrow>
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              Make it easy: provide a simple form with date of observation, task performed, what
              they observed, standard of your work, KSB references covered, and their name / role /
              signature. The easier you make it, the more likely they’ll complete it.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Practical assessment records ────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Practical assessment records"
          title="Skills observed and evaluated"
          meta="Formal and informal assessment records"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <ul className="space-y-1.5">
            {practicalRecords.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 space-y-1">
            <Eyebrow className="text-elec-yellow/85">Document your process</Eyebrow>
            <p className="text-[12.5px] text-white/85 leading-relaxed">
              Don’t just record the result. Explain what you did, why you chose that approach, what
              regulations applied, and what you would do differently next time. Shows understanding,
              not just ability.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Safety documentation ────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Safety documentation"
          title="Essential for Behaviours KSBs"
          meta="Demonstrates your awareness and compliance"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {safetyDocs.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── Quality checklist ───────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Evidence quality checklist"
          title="Good vs common mistakes"
          meta="Check before adding any evidence to your portfolio"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
            <Eyebrow className="text-elec-yellow/85">Good evidence is</Eyebrow>
            <ul className="space-y-1.5">
              {goodEvidence.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
            <Eyebrow className="text-red-300">Common mistakes</Eyebrow>
            <ul className="space-y-1.5">
              {evidenceMistakes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-red-300 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── Cross-referencing ───────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Cross-referencing evidence"
          title="One piece can cover multiple KSBs"
          meta="Reduces total evidence needed and shows holistic competence"
        />
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            A photo of you installing a consumer unit with proper PPE could cover Skills
            (installation), Knowledge (BS 7671), and Behaviours (safe working).
          </p>
          <p className="text-[13px] text-white/85 leading-relaxed">
            When you add evidence, list ALL the KSBs it covers — not just the most obvious one. Your
            KSB tracker should show these cross-references so you can see overall coverage.
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default EvidencePage;
