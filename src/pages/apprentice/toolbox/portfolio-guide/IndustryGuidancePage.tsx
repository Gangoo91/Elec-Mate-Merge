/**
 * Portfolio · IndustryGuidancePage — sector-specific portfolio guidance.
 *
 * Domestic, commercial, industrial evidence requirements, universal
 * requirements, maximising industry exposure, assessment tips, client
 * confidentiality.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Home,
  Building2,
  Factory,
  Shield,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface SectorGuide {
  sector: string;
  icon: LucideIcon;
  description: string;
  workAreas: string[];
  evidenceTypes: string[];
  regulations: string[];
}

const sectors: SectorGuide[] = [
  {
    sector: 'Domestic electrical work',
    icon: Home,
    description:
      'Residential installations are the most common starting point for apprentices. Covers everything from rewires to new builds to additions and alterations.',
    workAreas: [
      'Consumer unit installations and upgrades (split-load, RCBO boards)',
      'Domestic wiring systems — ring finals, radial circuits, lighting circuits',
      'Kitchen and bathroom electrical work (special locations per BS 7671)',
      'Garden and outdoor installations — external sockets, lighting, ponds',
      'EV charging point installations',
      'Smoke and heat alarm installations (BS 5839-6)',
      'Rewires — full and partial, including first-fix and second-fix',
      'Additions and alterations to existing installations',
      'New build electrical installations from scratch',
    ],
    evidenceTypes: [
      'EICRs (Electrical Installation Condition Reports)',
      'Minor Works Certificates',
      'Electrical Installation Certificates',
      'Schedule of Test Results (R1+R2, Zs, IR, RCD times)',
      'Customer testimonials about your professionalism',
      'Before/during/after installation photos',
      "Wiring diagrams and circuit charts you've produced",
    ],
    regulations: [
      'BS 7671:2018+A4:2026 (18th Edition Wiring Regulations)',
      'Part P of the Building Regulations (England and Wales)',
      'BS 5839-6 (domestic fire detection and fire alarm systems)',
      'NICEIC / NAPIT / ELECSA scheme requirements',
      'IET Guidance Notes (particularly GN1, GN3, GN7)',
      'Building Regulations Approved Document P',
    ],
  },
  {
    sector: 'Commercial electrical work',
    icon: Building2,
    description:
      'Offices, shops, schools, hospitals, and other non-industrial buildings. Often involves larger systems, 3-phase supplies, and specialist systems like fire alarms and emergency lighting.',
    workAreas: [
      'Three-phase distribution systems and sub-distribution boards',
      'Commercial lighting installations and controls (DALI, PIR, lux sensors)',
      'Emergency lighting systems (maintained and non-maintained)',
      'Fire alarm installations (conventional and addressable)',
      'Structured cabling and data installations (Cat6 / Cat6a)',
      'Access control and intruder alarm systems',
      'Power distribution units (PDUs) in server rooms',
      'Energy monitoring and building management systems (BMS)',
      'External lighting — car parks, building facades, pathways',
    ],
    evidenceTypes: [
      'Periodic inspection reports (commonly recommended at 5-yearly intervals for commercial — see IET GN3 for the recommended maximum periods)',
      'Commissioning test results and handover documents',
      'Emergency lighting certificates (BS 5266)',
      'Fire alarm commissioning records (BS 5839-1)',
      'Cable schedule documentation',
      'As-built drawings showing your installations',
      'Snagging lists and completion records',
    ],
    regulations: [
      'BS 7671:2018+A4:2026 (18th Edition Wiring Regulations)',
      'BS 5266 (Emergency lighting)',
      'BS 5839-1 (Fire detection and fire alarm systems)',
      'CDM Regulations 2015',
      'Workplace (Health, Safety and Welfare) Regulations 1992',
      'The Electricity at Work Regulations 1989',
    ],
  },
  {
    sector: 'Industrial electrical work',
    icon: Factory,
    description:
      'Manufacturing plants, factories, process facilities, and heavy engineering. Larger power systems, motor control, automation, and potentially hazardous areas.',
    workAreas: [
      'Motor control centres (MCCs) and variable speed drives (VSDs)',
      'PLC systems and automation',
      'High voltage switching and protection systems',
      'Industrial process control instrumentation',
      'Hazardous area installations (ATEX zones)',
      'Power factor correction equipment',
      'Industrial lighting (high bays, floodlighting)',
      'Cable tray and ladder rack containment systems',
      'Busbar trunking systems',
      'Standby generator installations and changeover systems',
    ],
    evidenceTypes: [
      'Commissioning reports for plant and machinery',
      'FAT and SAT (Factory / Site Acceptance Test) documents',
      'Loop testing certificates for instrumentation',
      'Motor testing results (insulation, winding resistance)',
      'Safety system validation records',
      'Permit-to-work documentation',
      'Lock-out / tag-out (LOTO) procedure evidence',
    ],
    regulations: [
      'BS 7671:2018+A4:2026 (18th Edition Wiring Regulations)',
      'BS EN 60079 (Explosive atmospheres — equipment classification)',
      'DSEAR (Dangerous Substances and Explosive Atmospheres Regulations)',
      'PUWER (Provision and Use of Work Equipment Regulations)',
      'Machinery Directive (2006/42/EC)',
      'The Electricity at Work Regulations 1989',
      'LOLER (Lifting Operations and Lifting Equipment Regulations)',
    ],
  },
];

const universalRequirements = [
  {
    category: 'Health & safety',
    items: [
      'Risk assessment completion evidence',
      'Method statement preparation or contribution',
      'PPE usage documentation',
      'Accident / incident / near-miss reporting',
      'Safety training records (CSCS, first aid, manual handling)',
      'Safe isolation procedure compliance',
    ],
  },
  {
    category: 'Testing & inspection',
    items: [
      'Initial verification testing (new installations)',
      'Periodic inspection and testing (existing installations)',
      'Portable appliance testing (PAT)',
      'Emergency lighting testing and records',
      'Fire alarm system testing and records',
      'Earth fault loop impedance and RCD testing',
    ],
  },
  {
    category: 'Professional standards',
    items: [
      'BS 7671:2018+A4:2026 (18th Edition) compliance in all work',
      'IET Guidance Note understanding and application',
      'On-Site Guide reference and use',
      'Building Regulations awareness and compliance',
      'CDM Regulations awareness (commercial and industrial)',
      'Environmental regulations and waste management',
    ],
  },
];

const maximisingExposure = [
  'Ask your employer about job variety — can you shadow other teams?',
  'Use college workshops to practise work outside your usual sector',
  'Volunteer for different types of projects when opportunities arise',
  'Discuss exposure gaps with your training provider at reviews',
  'If you only do domestic work, focus heavily on domestic evidence requirements',
  'Some EPAOs accept college-based evidence if site exposure is limited',
  "Your pathway choice (Installation vs Maintenance) affects what's expected",
];

const assessorsLookFor = [
  'Evidence that is authentic, verifiable, and clearly your own work',
  'Dates, witness signatures, and location details on all evidence',
  'Progression and development across your apprenticeship',
  'Coverage of ALL required KSBs, not just the easy ones',
  'Quality over quantity in evidence selection',
  'Clear organisation and easy navigation',
];

const portfolioWeakeners = [
  'Evidence not mapped to specific KSBs',
  'Missing or incomplete sections',
  'All evidence from one time period (shows last-minute collection)',
  'No reflective commentary — just raw evidence with no analysis',
  'Generic content copied from textbooks or the internet',
  'Messy presentation and poor organisation',
  'Confidential client information included without consent',
];

const IndustryGuidancePage = () => {
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
          title="Industry guidance"
          description="Different sectors have different work, evidence, and regulations. Domestic, commercial, industrial — whatever you work in, here’s what to collect."
          tone="yellow"
        />
      </motion.div>

      {/* ── Intro ───────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <Eyebrow>Why sector matters</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Different sectors have different evidence types and regulations. Most apprentices
            experience a mix — collect evidence from all areas you work in to build a well-rounded
            portfolio.
          </p>
        </div>
      </motion.div>

      {/* ── Sectors ─────────────────────────────────────────────── */}
      {sectors.map((sector) => {
        const Icon = sector.icon;
        return (
          <motion.section key={sector.sector} variants={itemVariants} className="space-y-3">
            <SectionHeader
              eyebrow={sector.sector.split(' ').slice(0, 1).join(' ')}
              title={sector.sector}
              meta={sector.description}
              action={
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-elec-yellow/25 bg-elec-yellow/[0.06]">
                  <Icon className="h-4 w-4 text-elec-yellow" />
                </span>
              }
            />
            <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
              <div className="space-y-2">
                <Eyebrow>Key work areas to evidence</Eyebrow>
                <ul className="space-y-1.5">
                  {sector.workAreas.map((item) => (
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
                <Eyebrow>Evidence types</Eyebrow>
                <ul className="space-y-1.5">
                  {sector.evidenceTypes.map((item) => (
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
                <Eyebrow>Key regulations</Eyebrow>
                <ul className="space-y-1.5">
                  {sector.regulations.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                    >
                      <Shield className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        );
      })}

      {/* ── Universal requirements ──────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Universal requirements"
          title="Three categories that apply everywhere"
          meta="Regardless of which sector you work in"
        />
        <ul className="space-y-2">
          {universalRequirements.map((section) => (
            <li
              key={section.category}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2"
            >
              <h3 className="text-[13.5px] font-semibold text-elec-yellow tracking-tight">
                {section.category}
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

      {/* ── Maximising exposure ─────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Maximising industry exposure"
          title="A well-rounded portfolio is stronger"
          meta="If your employer focuses on one sector, branch out"
        />
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
          <ul className="space-y-1.5">
            {maximisingExposure.map((item) => (
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

      {/* ── Assessment tips ─────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Portfolio assessment tips"
          title="What they look for vs what weakens"
          meta="A portfolio that confirms gateway readiness vs one that gets sent back"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
            <Eyebrow className="text-elec-yellow/85">What assessors look for</Eyebrow>
            <ul className="space-y-1.5">
              {assessorsLookFor.map((item) => (
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
            <Eyebrow className="text-red-300">What weakens a portfolio</Eyebrow>
            <ul className="space-y-1.5">
              {portfolioWeakeners.map((item) => (
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

      {/* ── Confidentiality ─────────────────────────────────────── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5">
          <Eyebrow className="text-elec-yellow/85">Client confidentiality</Eyebrow>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Always respect client confidentiality. Remove or redact client names, addresses, and
            personal details from certificates and photos. Never share portfolio evidence publicly
            on social media. If in doubt, ask your employer and the client for permission first.
          </p>
          <p className="text-[12.5px] text-white/70 leading-relaxed">
            Client addresses and personal details are personal data under UK GDPR and the Data
            Protection Act 2018 — redact them before adding a certificate or photo to your
            portfolio.
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default IndustryGuidancePage;
