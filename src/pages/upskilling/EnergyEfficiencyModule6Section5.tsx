import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Compliance Reporting and Audit Trails - Energy Efficiency Module 6 Section 5';
const DESCRIPTION = 'Master UK energy compliance reporting requirements including ESOS evidence, SECR annual reporting, audit trail maintenance, document version control, and ISO 50001 audit preparation.';

const quickCheckQuestions = [
  {
    id: 'ee-m6s5-qc1',
    question: 'How long must ESOS compliance evidence be retained?',
    options: [
      '2 years',
      '4 years (until the next compliance phase)',
      '7 years',
      'Permanently'
    ],
    correctIndex: 1,
    explanation: 'ESOS evidence must be retained for the duration of the compliance period (4 years until the next phase). However, best practice is to retain records longer as they may be needed for trend analysis and future compliance cycles.'
  },
  {
    id: 'ee-m6s5-qc2',
    question: 'Where must SECR energy and emissions data be reported?',
    options: [
      'Environment Agency online portal',
      'Companies House via the Directors\' Report',
      'Direct submission to DESNZ',
      'Local authority returns'
    ],
    correctIndex: 1,
    explanation: 'SECR data must be included in the Directors\' Report section of the company\'s Annual Report and Accounts, which is filed with Companies House. This makes the information publicly available.'
  },
  {
    id: 'ee-m6s5-qc3',
    question: 'What is the primary purpose of maintaining an audit trail?',
    options: [
      'To reduce energy consumption',
      'To prove compliance and enable verification of data',
      'To calculate payback periods',
      'To design energy dashboards'
    ],
    correctIndex: 1,
    explanation: 'Audit trails provide evidence that data is accurate, calculations are correct, and compliance requirements have been met. They enable internal and external auditors to verify information and trace any figure back to its source.'
  }
];

const quizQuestions = [
  {
    id: 1,
    question: 'Who must sign off ESOS compliance reports?',
    options: [
      'The company\'s CEO',
      'A registered ESOS Lead Assessor',
      'Any qualified electrician',
      'The Environment Agency'
    ],
    correctAnswer: 1,
    explanation: 'ESOS requires sign-off by a registered Lead Assessor from an approved professional register such as CIBSE, IEMA, or the Energy Institute.'
  },
  {
    id: 2,
    question: 'What must be included in SECR methodology disclosure?',
    options: [
      'Only total kWh figures',
      'Description of calculation methods and data sources',
      'Names of all employees',
      'Financial statements only'
    ],
    correctAnswer: 1,
    explanation: 'SECR requires disclosure of methodology used to calculate energy and emissions, including data sources, emission factors applied, and any estimation methods used for gaps in data.'
  },
  {
    id: 3,
    question: 'What is a key benefit of version control in compliance documentation?',
    options: [
      'Reduces file storage space',
      'Makes documents look professional',
      'Provides clear record of changes and prevents confusion',
      'Automatically calculates energy savings'
    ],
    correctAnswer: 2,
    explanation: 'Version control ensures everyone uses the correct current version, provides a clear history of changes, and prevents confusion when documents are updated over time.'
  },
  {
    id: 4,
    question: 'How should meter readings be documented for audit purposes?',
    options: [
      'Approximate monthly estimates are sufficient',
      'Date, time, reading, meter ID, and who took the reading',
      'Just the kWh figure',
      'Only readings over 1000 kWh need recording'
    ],
    correctAnswer: 1,
    explanation: 'Complete meter reading records should include date, time, actual reading, meter identification, units, and the name of person taking the reading. Photos provide additional evidence.'
  },
  {
    id: 5,
    question: 'What percentage of energy consumption must an ESOS audit cover?',
    options: ['50%', '75%', '90%', '100%'],
    correctAnswer: 2,
    explanation: 'ESOS audits must cover at least 90% of the organisation\'s total energy consumption across buildings, transport, and industrial processes.'
  },
  {
    id: 6,
    question: 'Which emission factors should be used for UK SECR reporting?',
    options: [
      'Company-specific factors only',
      'US EPA emission factors',
      'UK Government GHG Conversion Factors',
      'Industry average estimates'
    ],
    correctAnswer: 2,
    explanation: 'UK Government publishes annual GHG Conversion Factors (formerly DEFRA/BEIS factors) that must be used for SECR and most UK carbon reporting.'
  },
  {
    id: 7,
    question: 'What document demonstrates ISO 50001 continuous improvement?',
    options: [
      'Employee handbook',
      'Management review meeting minutes',
      'Marketing brochures',
      'Reception sign-in sheets'
    ],
    correctAnswer: 1,
    explanation: 'ISO 50001 requires documented management reviews that demonstrate top management commitment and systematic approach to continuous improvement of energy performance.'
  },
  {
    id: 8,
    question: 'How long should electrical installation certificates be retained?',
    options: [
      '1 year',
      '5 years',
      'Life of the installation',
      'Until the next inspection'
    ],
    correctAnswer: 2,
    explanation: 'Electrical installation certificates (EICs) should be retained for the life of the installation. They provide evidence of compliance and are needed for any future modifications or investigations.'
  },
  {
    id: 9,
    question: 'What triggers an ESOS compliance notice from the Environment Agency?',
    options: [
      'Any energy consumption increase',
      'Failure to notify compliance or submit adequate evidence',
      'Installing solar panels',
      'Changing energy suppliers'
    ],
    correctAnswer: 1,
    explanation: 'The Environment Agency issues compliance notices for failures such as not notifying compliance by the deadline, failing to conduct required audits, or not retaining adequate evidence.'
  },
  {
    id: 10,
    question: 'What should be documented when implementing energy efficiency measures?',
    options: [
      'Only the final energy bill',
      'Before/after readings, installation dates, equipment specs, and commissioning records',
      'Just the product brochure',
      'Only measures over £10,000'
    ],
    correctAnswer: 1,
    explanation: 'Complete documentation includes baseline readings, installation records, equipment specifications, commissioning records, and post-installation verification to demonstrate actual savings achieved.'
  }
];

const faqs = [
  {
    question: 'What happens if we miss an ESOS deadline?',
    answer: 'The Environment Agency can issue compliance notices and penalties. Initial penalties can reach £90,000 plus daily fines. They may also "name and shame" non-compliant organisations. If you realise you\'ve missed a deadline, contact the Environment Agency proactively - demonstrating good faith and working toward compliance may reduce penalties.'
  },
  {
    question: 'Can we use estimated data in SECR reports?',
    answer: 'Yes, but it must be clearly identified as estimated, use reasonable methodology, and be explained in the methodology disclosure. Common estimates include pro-rating partial-year data or using industry benchmarks for unmeasured activities. The goal is reasonable accuracy - perfection is not required but transparency is essential.'
  },
  {
    question: 'How do we prepare for an ISO 50001 surveillance audit?',
    answer: 'Review previous audit findings and ensure all corrective actions are complete. Update all documentation to reflect current practices. Verify EnPI data is current and accurate. Brief key personnel on their roles and the audit process. Have evidence ready for any changes since the last audit. Run an internal audit first to identify gaps.'
  },
  {
    question: 'Should subcontractors\' energy use be included in our reports?',
    answer: 'It depends on the reporting boundary and control. Under SECR, you report energy use within your operational control. For ISO 50001, you define the scope boundary. Consider if you pay the energy bills, if the work is on your premises, and the degree of control over operations. Document boundary decisions clearly.'
  },
  {
    question: 'What records should electricians keep for compliance support?',
    answer: 'Keep detailed job records including date, location, work description, equipment installed, energy ratings, commissioning results, and before/after meter readings where applicable. Retain product specifications, certificates, and test results. These support clients\' compliance requirements and protect you professionally.'
  },
  {
    question: 'How can we demonstrate continuous improvement for auditors?',
    answer: 'Maintain records showing: objectives set at each review, progress against targets, actions taken when targets missed, new improvement opportunities identified, training provided, and management decisions made. CUSUM charts and trend analysis visually demonstrate performance over time. Document both successes and lessons from projects that didn\'t deliver expected savings.'
  }
];

const EnergyEfficiencyModule6Section5: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['ESOS compliance', 'SECR reporting', 'audit trails', 'ISO 50001', 'energy compliance'],
    canonicalUrl: '/study-centre/upskilling/energy-efficiency/module-6/section-5'
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Compliance Reporting and Audit Trails
          </h1>
          <p className="text-white/80">
            Maintaining evidence and meeting reporting requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Key Reports</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ESOS:</strong> Lead Assessor sign-off, EA notification</li>
              <li><strong>SECR:</strong> Directors' Report annually</li>
              <li><strong>ISO 50001:</strong> Management review records</li>
              <li><strong>DECs:</strong> Annual operational ratings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Record Retention</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ESOS evidence:</strong> 4+ years</li>
              <li><strong>SECR data:</strong> 6+ years</li>
              <li><strong>EICs:</strong> Life of installation</li>
              <li><strong>Meter readings:</strong> 7+ years</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'ESOS compliance evidence requirements',
              'SECR annual reporting obligations',
              'Creating robust audit trails',
              'Document version control best practices',
              'ISO 50001 audit preparation',
              'Record retention requirements'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: ESOS Compliance Evidence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ESOS Compliance Evidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ESOS compliance requires comprehensive documentation to demonstrate that energy audits have been conducted properly and recommendations identified. The Environment Agency may request evidence at any time during the compliance period.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required evidence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Energy consumption data covering 90%+ of total use</li>
                <li>Energy audit reports for sampled sites</li>
                <li>Lead Assessor sign-off documentation</li>
                <li>Board director confirmation of compliance</li>
                <li>Notification confirmation from Environment Agency portal</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Audit report contents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Organisation details and qualification status</li>
                <li>Total energy consumption breakdown by fuel</li>
                <li>Significant energy uses identified</li>
                <li>Energy saving opportunities with estimated savings</li>
                <li>Payback periods for recommendations</li>
                <li>Lead Assessor credentials and signature</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environment Agency notification:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Submit via online portal by compliance deadline</li>
                <li>Confirm total energy consumption audited</li>
                <li>Provide Lead Assessor details</li>
                <li>Declare any alternative compliance routes used</li>
                <li>Keep notification confirmation as evidence</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: SECR Annual Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            SECR Annual Reporting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Streamlined Energy and Carbon Reporting requires qualifying companies to disclose energy and emissions data annually in the Directors' Report. This public disclosure promotes transparency and allows stakeholder comparison.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required disclosures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>UK energy use in kWh (electricity, gas, transport)</li>
                <li>Associated greenhouse gas emissions in tonnes CO2e</li>
                <li>At least one intensity ratio (e.g., tCO2e per £m revenue)</li>
                <li>Previous year figures for comparison</li>
                <li>Methodology description</li>
                <li>Energy efficiency actions taken</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Emission factors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use UK Government GHG Conversion Factors (updated annually)</li>
                <li>Apply correct factors for year of reporting</li>
                <li>Scope 1: Direct emissions (gas, company vehicles)</li>
                <li>Scope 2: Indirect from purchased electricity</li>
                <li>Document which factor set version was used</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Filing requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Included in Directors' Report section of Annual Accounts</li>
                <li>Filed with Companies House</li>
                <li>Available to public scrutiny</li>
                <li>Subject to audit alongside financial statements</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Creating Audit Trails */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Creating Robust Audit Trails
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An audit trail enables any figure in a report to be traced back to its original source. This is essential for both internal verification and external audits. Good audit trails also help identify errors and demonstrate data quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Audit trail principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Traceability:</strong> Every figure linked to source data</li>
                <li><strong>Transparency:</strong> Calculations clearly documented</li>
                <li><strong>Completeness:</strong> All data points captured</li>
                <li><strong>Consistency:</strong> Same methods applied throughout</li>
                <li><strong>Timeliness:</strong> Records created contemporaneously</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation chain:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Raw data (meter readings, invoices, delivery notes)</li>
                <li>Data entry records (spreadsheets with formulas visible)</li>
                <li>Calculations (clearly showing methodology)</li>
                <li>Summary reports (referencing source data locations)</li>
                <li>Final submissions (dated and version-controlled)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Meter reading best practice:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record date, time, reading, units, and meter ID</li>
                <li>Note who took the reading</li>
                <li>Take photographs as backup evidence</li>
                <li>Record any anomalies or meter issues</li>
                <li>Use consistent reading schedule (same time/day)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Document Version Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Document Version Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Version control ensures everyone works from the correct, current version of documents. Without it, outdated information may be used, changes are lost, and audit trails become unreliable.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Version control elements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Version number:</strong> Clear sequential numbering (v1.0, v1.1, v2.0)</li>
                <li><strong>Date:</strong> When this version was created</li>
                <li><strong>Author:</strong> Who made the changes</li>
                <li><strong>Change description:</strong> What was modified</li>
                <li><strong>Approval:</strong> Who authorised the change</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">File naming conventions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Include document type, date, and version</li>
                <li>Example: "EnergyAudit_BuildingA_2024-06_v2.1.xlsx"</li>
                <li>Avoid spaces - use underscores or hyphens</li>
                <li>Use consistent date format (YYYY-MM preferred)</li>
                <li>Don't use "final" - use version numbers instead</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Archive management:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep superseded versions in archive folder</li>
                <li>Don't delete old versions - you may need them</li>
                <li>Regularly back up to secure location</li>
                <li>Consider cloud storage for disaster recovery</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: ISO 50001 Audit Preparation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            ISO 50001 Audit Preparation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO 50001 certification requires initial and ongoing surveillance audits. Preparation is key to successful audits. Auditors verify that the energy management system is implemented effectively and driving continuous improvement.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key documentation for audits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Energy policy (signed by top management)</li>
                <li>Energy review and significant energy uses (SEUs)</li>
                <li>Energy baseline and EnPIs</li>
                <li>Objectives, targets, and action plans</li>
                <li>Management review meeting minutes</li>
                <li>Internal audit records and corrective actions</li>
                <li>Competence records and training logs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demonstrating continual improvement:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>EnPI trends showing improvement over time</li>
                <li>Completed energy projects and verified savings</li>
                <li>Evidence of PDCA cycle in action</li>
                <li>Management decisions based on energy data</li>
                <li>New opportunities identified and prioritised</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common audit findings to avoid:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Out-of-date documents still in circulation</li>
                <li>EnPI calculations without clear methodology</li>
                <li>Missing calibration records for meters</li>
                <li>Incomplete corrective action follow-up</li>
                <li>Staff unaware of energy policy or their role</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Record Retention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Record Retention Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different types of records have different retention requirements. Keeping records too briefly risks non-compliance; keeping everything forever creates storage and management challenges. A clear retention policy balances these needs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Minimum retention periods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>ESOS evidence:</strong> 4 years (full compliance period)</li>
                <li><strong>SECR supporting data:</strong> 6 years (accounting records)</li>
                <li><strong>ISO 50001 records:</strong> 3 years minimum (standard)</li>
                <li><strong>Electrical certificates:</strong> Life of installation</li>
                <li><strong>Meter readings:</strong> 7 years (good practice)</li>
                <li><strong>Equipment manuals:</strong> Life of equipment + disposal</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Secure storage considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Fire-safe storage for critical paper records</li>
                <li>Regular backups of electronic records</li>
                <li>Access controls to prevent unauthorised changes</li>
                <li>Clear destruction procedures when retention ends</li>
                <li>Consider GDPR for personal data in records</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Electrician record recommendations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep job sheets, certificates, and test results</li>
                <li>Retain photographs of installations</li>
                <li>Store equipment specifications and data sheets</li>
                <li>Maintain training and competence records</li>
                <li>Use cloud backup for business continuity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Supporting client compliance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Provide detailed job records with dates and specifications</li>
                <li>Include before/after meter readings for efficiency work</li>
                <li>Supply product data sheets and certifications</li>
                <li>Offer commissioning reports for new installations</li>
                <li>Document energy ratings of equipment installed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building your compliance toolkit</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Standardised job record templates</li>
                <li>Meter reading log sheets</li>
                <li>Equipment specification library</li>
                <li>Commissioning checklists</li>
                <li>Digital photo archive system</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common mistakes to avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Inadequate records</strong> - Document everything contemporaneously</li>
                <li><strong>Lost evidence</strong> - Back up records regularly</li>
                <li><strong>Wrong emission factors</strong> - Use correct year's factors</li>
                <li><strong>Missed deadlines</strong> - Set calendar reminders</li>
                <li><strong>Assuming compliance</strong> - Verify requirements annually</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between text-left min-h-[44px] touch-manipulation"
                >
                  <h3 className="text-sm font-medium text-white pr-4">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <p className="text-sm text-white/90 leading-relaxed mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Deadlines</p>
                <ul className="space-y-0.5">
                  <li>ESOS: Every 4 years (Phase 4: Dec 2027)</li>
                  <li>SECR: With Annual Accounts filing</li>
                  <li>DECs: Annually for &gt;1000m²</li>
                  <li>ISO 50001: Annual surveillance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Evidence Sources</p>
                <ul className="space-y-0.5">
                  <li>Utility invoices and meter readings</li>
                  <li>Lead Assessor reports (ESOS)</li>
                  <li>GHG Conversion Factors (SECR)</li>
                  <li>Management review minutes (ISO)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              Complete Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule6Section5;
