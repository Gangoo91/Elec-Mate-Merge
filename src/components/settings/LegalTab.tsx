import React from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  ListCard,
  ListRow,
  SectionHeader,
  Arrow,
  Eyebrow,
  containerVariants,
  itemVariants,
  toneText,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface LegalDoc {
  title: string;
  description: string;
  url: string;
  lastUpdated: string;
  accent: Tone;
}

const LegalTab = () => {
  const legalDocuments: LegalDoc[] = [
    {
      title: 'Terms of Service',
      description: 'Our terms and conditions for using Elec-Mate',
      url: '/terms',
      lastUpdated: '5 Jan 2026',
      accent: 'blue',
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your data',
      url: '/privacy',
      lastUpdated: '5 Jan 2026',
      accent: 'green',
    },
    {
      title: 'Cookie Policy',
      description: 'Information about cookies we use',
      url: '/cookies',
      lastUpdated: '30 Jan 2026',
      accent: 'amber',
    },
    {
      title: 'Acceptable Use Policy',
      description: 'Guidelines for using our platform responsibly',
      url: '/acceptable-use',
      lastUpdated: '30 Jan 2026',
      accent: 'purple',
    },
    {
      title: 'Data Processing Agreement',
      description: 'For business and enterprise customers',
      url: '/dpa',
      lastUpdated: '30 Jan 2026',
      accent: 'cyan',
    },
  ];

  const complianceBadges = [
    {
      title: 'GDPR Compliant',
      description: 'Your data is protected under EU data protection laws',
      tone: 'green' as Tone,
    },
    {
      title: 'UK Data Protection',
      description: 'Compliant with UK GDPR and Data Protection Act 2018',
      tone: 'blue' as Tone,
    },
    {
      title: 'ISO 27001',
      description: 'Information security management certified',
      tone: 'purple' as Tone,
    },
  ];

  const dataRights = [
    'Right to access your data',
    'Right to rectification',
    'Right to erasure ("right to be forgotten")',
    'Right to data portability',
    'Right to restrict processing',
    'Right to object to processing',
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Overview */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="00" title="Legal and Privacy" />
        <p className="text-[13px] text-white/70 leading-relaxed max-w-2xl">
          Review our policies and learn how we protect your data.
        </p>
      </motion.section>

      {/* Legal Documents */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="01" title="Legal Documents" />
        <ListCard>
          {legalDocuments.map((doc) => (
            <button
              key={doc.url}
              onClick={() => openExternalUrl(doc.url)}
              className="group w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
            >
              <span aria-hidden className="w-[3px] h-10 rounded-full shrink-0 bg-elec-yellow/70" />
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium text-white truncate">{doc.title}</div>
                <div className="mt-0.5 text-[11.5px] text-white/65 truncate">{doc.description}</div>
              </div>
              <span className="hidden sm:inline text-[11px] text-white/55 tabular-nums whitespace-nowrap">
                Updated {doc.lastUpdated}
              </span>
              <Arrow />
            </button>
          ))}
        </ListCard>
      </motion.section>

      {/* Compliance */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="02" title="Compliance and Certifications" />
        <div className="grid gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden grid-cols-1 sm:grid-cols-3">
          {complianceBadges.map((badge) => (
            <div
              key={badge.title}
              className="bg-[hsl(0_0%_12%)] px-5 py-6 sm:px-6 sm:py-7 flex flex-col items-start"
            >
              <span
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.18em]',
                  toneText[badge.tone]
                )}
              >
                {badge.title}
              </span>
              <p className="mt-3 text-[12.5px] text-white/70 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Data storage */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="03" title="Data Storage and Security" />
        <ListCard>
          <ListRow
            title="UK and EU Data Centers"
            subtitle="Your data is stored securely in UK and EU data centers with full redundancy."
            accent="blue"
          />
          <ListRow
            title="End-to-End Encryption"
            subtitle="All data is encrypted in transit and at rest using AES-256 encryption."
            accent="green"
          />
        </ListCard>
      </motion.section>

      {/* Your rights */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="04" title="Your Data Rights" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <p className="text-[13px] text-white/70 mb-4 leading-relaxed">
            Under GDPR and UK data protection law, you have the following rights:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {dataRights.map((right) => (
              <li key={right} className="flex items-center gap-2 text-[13px] text-white/80">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full shrink-0 bg-green-400"
                />
                <span className="truncate">{right}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-5 border-t border-white/[0.06]">
            <p className="text-[13px] text-white/70 mb-3 leading-relaxed">
              To download your data or request deletion, go to Settings &gt; Privacy.
            </p>
            <Link to="/settings">
              <Button className="h-11 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white touch-manipulation">
                Go to Privacy Settings →
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="05" title="Legal Inquiries" />
        <ListCard>
          <ListRow
            title="Contact Legal"
            subtitle="legal@elec-mate.com"
            onClick={() => openExternalUrl('mailto:legal@elec-mate.com')}
            trailing={<Arrow />}
            accent="blue"
          />
        </ListCard>
      </motion.section>

      {/* Company info */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="06" title="Company Information" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <Eyebrow>Registered</Eyebrow>
          <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
            Elec-Mate Ltd
            <br />
            Registered in England &amp; Wales
            <br />
            Company No: 12345678
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default LegalTab;
