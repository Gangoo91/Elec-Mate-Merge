import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  HubCard,
  itemVariants,
} from '@/components/college/primitives';

/* ==========================================================================
   QualityComplianceHub — the single home for everything inspection / IQA /
   compliance, which was previously scattered across three places and 2–4
   clicks deep (some routes, some sections, some orphaned). One card grid,
   grouped by job: IQA & standardisation · inspection & Ofsted · records.
   ========================================================================== */

interface QualityComplianceHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function QualityComplianceHub({ onNavigate }: QualityComplianceHubProps) {
  const navigate = useNavigate();

  return (
    <PullToRefresh onRefresh={async () => { await new Promise((r) => setTimeout(r, 500)); }}>
      <PageFrame>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Quality & Compliance"
            title="Inspection-ready, in one place"
            description="IQA sampling and standardisation, the Ofsted lens, your self-assessment and improvement plans, and every audit record — no longer scattered."
            tone="purple"
          />
        </motion.div>

        {/* IQA & STANDARDISATION */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Internal Quality Assurance" title="Sample, standardise, assure" />
          <HubGrid columns={2}>
            <HubCard
              number="01"
              eyebrow="Sampling & verdicts"
              title="IQA Dashboard"
              description="Sampling plans, findings, standardisation and coverage."
              tone="purple"
              meta="Plans & verdicts"
              onClick={() => navigate('/college/iqa')}
            />
            <HubCard
              number="02"
              eyebrow="Findings & actions"
              title="IQA Workflow"
              description="Manage findings, standardisation prep and assessor agreement."
              tone="blue"
              meta="Open actions"
              onClick={() => onNavigate('iqaworkflow')}
            />
            <HubCard
              number="03"
              eyebrow="OTJ assurance"
              title="IQA OTJ Audit"
              description="Sample and audit off-the-job verification decisions."
              tone="amber"
              meta="Audit queue"
              onClick={() => onNavigate('iqaotjaudit')}
            />
            <HubCard
              number="04"
              eyebrow="Teaching quality"
              title="Tutor Observations"
              description="360 view of observations of tutors — peer, IQA, HoD, learning walks."
              tone="green"
              meta="Who's been seen"
              onClick={() => onNavigate('tutorobs')}
            />
          </HubGrid>
        </motion.section>

        {/* INSPECTION & OFSTED */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Inspection & Ofsted" title="Walk in ready" />
          <HubGrid columns={2}>
            <HubCard
              number="05"
              eyebrow="Live RAG lens"
              title="Ofsted EIF"
              description="Your KPIs against the Education Inspection Framework, RAG-rated live."
              tone="purple"
              meta="RAG dashboard"
              onClick={() => navigate('/college/compliance/ofsted')}
            />
            <HubCard
              number="06"
              eyebrow="Self-assessment"
              title="SAR Draft"
              description="Draft and maintain your Self-Assessment Report."
              tone="blue"
              meta="Editable draft"
              onClick={() => navigate('/college/compliance/sar')}
            />
            <HubCard
              number="07"
              eyebrow="Improvement plan"
              title="QIP Tracker"
              description="Quality Improvement Plan — actions, owners, due dates."
              tone="amber"
              meta="Tracked actions"
              onClick={() => navigate('/college/compliance/qip')}
            />
            <HubCard
              number="08"
              eyebrow="Evidence pack"
              title="Audit Pack"
              description="Ofsted-ready pack: IQA samples, assessor decisions, evidence chain."
              tone="green"
              meta="Printable"
              onClick={() => navigate('/college/compliance/pack')}
            />
            <HubCard
              number="09"
              eyebrow="Practice run"
              title="Inspection Rehearsal"
              description="Mate plays the inspector and asks you the hard questions."
              tone="indigo"
              meta="AI rehearsal"
              onClick={() => navigate('/college/compliance/rehearsal')}
            />
            <HubCard
              number="10"
              eyebrow="Quality overview"
              title="Quality Dashboard"
              description="Ofsted-ready quality overview: KPIs and the evidence behind them."
              tone="yellow"
              meta="At a glance"
              onClick={() => onNavigate('qualitydashboard')}
            />
          </HubGrid>
        </motion.section>

        {/* RECORDS & REPORTS */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Records & Reports" title="The paper trail" />
          <HubGrid columns={2}>
            <HubCard
              number="11"
              eyebrow="Funding & quality exports"
              title="Reports"
              description="CSV exports: OTJ, attendance, progress, EPA, AC coverage, quiz results."
              tone="blue"
              meta="Export hub"
              onClick={() => navigate('/college/reports')}
            />
            <HubCard
              number="12"
              eyebrow="Policies & checks"
              title="Compliance Docs"
              description="Institution policies, DBS checks, staff documentation."
              tone="purple"
              meta="Doc register"
              onClick={() => onNavigate('compliancedocs')}
            />
            <HubCard
              number="13"
              eyebrow="Who did what · when"
              title="Audit Log"
              description="Append-only record of every sensitive action — built for audits."
              tone="amber"
              meta="Append-only"
              onClick={() => onNavigate('auditlog')}
            />
          </HubGrid>
        </motion.section>
      </PageFrame>
    </PullToRefresh>
  );
}
