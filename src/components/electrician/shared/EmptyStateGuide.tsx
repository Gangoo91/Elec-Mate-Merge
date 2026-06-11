import React from 'react';
import { cn } from '@/lib/utils';
import { PANEL } from '@/components/electrician/shared/surfaces';
import { Button } from '@/components/ui/button';
import {
  FileText,
  User,
  Briefcase,
  Calculator,
  Lightbulb,
  Plus,
  Clock,
  ChevronRight,
  Sparkles,
  Upload,
  ClipboardCheck,
  Search,
  Share2,
} from 'lucide-react';

interface EmptyStateGuideProps {
  type: 'quote' | 'invoice' | 'certificate';
  onCreateClick: () => void;
  createLabel?: string;
}

export const EmptyStateGuide: React.FC<EmptyStateGuideProps> = ({ type, onCreateClick, createLabel }) => {
  const steps =
    type === 'quote'
      ? [
          {
            icon: User,
            title: 'Add Client Details',
            description: 'Enter customer information and contact details',
            time: '30 sec',
          },
          {
            icon: Briefcase,
            title: 'Describe the Job',
            description: 'Add job title, description, and work scope',
            time: '1 min',
          },
          {
            icon: Calculator,
            title: 'Add Items',
            description: 'Include labour, materials, and equipment costs',
            time: '2 min',
          },
          {
            icon: FileText,
            title: 'Generate Quote',
            description: 'Review and download professional PDF quote',
            time: '30 sec',
          },
        ]
      : type === 'invoice'
      ? [
          {
            icon: User,
            title: 'Client Details',
            description: 'Customer and project information',
            time: '1 min',
          },
          {
            icon: Calculator,
            title: 'Line Items',
            description: 'Completed work and materials',
            time: '2 min',
          },
          {
            icon: FileText,
            title: 'Payment Terms',
            description: 'Due date and payment methods',
            time: '30 sec',
          },
          {
            icon: Sparkles,
            title: 'Generate',
            description: 'Download professional PDF',
            time: '30 sec',
          },
        ]
      : [
          {
            icon: Upload,
            title: 'Import Certificates',
            description: 'Upload PDFs from your previous software or paperwork',
            time: '1 min',
          },
          {
            icon: ClipboardCheck,
            title: 'Add Details',
            description: 'Tag certificate type, date, client and address',
            time: '1 min',
          },
          {
            icon: Search,
            title: 'Search & Filter',
            description: 'Find any certificate instantly by client or number',
            time: 'Instant',
          },
          {
            icon: Share2,
            title: 'Share Anytime',
            description: 'Download or share directly with clients',
            time: 'Instant',
          },
        ];

  return (
    <div className="space-y-4">
      {/* Hero panel */}
      <div className={cn(PANEL, 'relative overflow-hidden p-5 sm:p-7 text-center')}>
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-elec-yellow/[0.07] to-transparent pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-elec-yellow/15 border border-elec-yellow/25 mb-4">
            <FileText className="h-7 w-7 text-elec-yellow" />
          </div>
          <h2 className="text-[20px] sm:text-[24px] font-bold text-white tracking-tight">
            {type === 'quote'
              ? 'Create your first quote'
              : type === 'invoice'
              ? 'Create your first invoice'
              : 'Import your certificates'}
          </h2>
          <p className="text-[13px] text-white/70 mt-1.5 max-w-md mx-auto">
            {type === 'quote'
              ? 'A professional, client-ready quote in about four minutes.'
              : type === 'invoice'
              ? 'A professional, client-ready invoice in about four minutes.'
              : 'Bring your existing certificates into Elec-Mate.'}
          </p>
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08]">
            <Clock className="h-3.5 w-3.5 text-elec-yellow" />
            <span className="text-[11px] font-medium text-white/80">~4 minutes total</span>
          </div>
        </div>
      </div>

      {/* Steps — numbered tiles, 2-up mobile / 4-up desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {steps.map((step, index) => (
          <div key={index} className={cn(PANEL, 'p-4')}>
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                0{index + 1}
              </span>
              <span className="text-[10px] text-white/45 ml-auto">{step.time}</span>
            </div>
            <div className="mt-3 h-9 w-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <step.icon className="h-4 w-4 text-elec-yellow" />
            </div>
            <h3 className="mt-3 text-[13px] font-semibold text-white leading-tight">{step.title}</h3>
            <p className="mt-1 text-[11px] text-white/60 leading-snug line-clamp-2">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className={cn(PANEL, 'flex items-start gap-2.5 px-4 py-3.5')}>
        <Lightbulb className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
        <p className="text-[12px] text-white/80 leading-snug">
          {type === 'quote'
            ? 'Everything auto-saves as you type — come back anytime to finish.'
            : type === 'invoice'
            ? 'Convert an accepted quote in one tap, or start fresh with new client details.'
            : 'Supports EICR, EIC, Minor Works and more. Import once, access forever.'}
        </p>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        onClick={onCreateClick}
        className="w-full h-12 text-[15px] font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl touch-manipulation active:scale-[0.98] transition-all"
      >
        <Plus className="mr-2 h-5 w-5" />
        {createLabel ?? (type === 'quote' ? 'Create your first quote' : type === 'invoice' ? 'Create your first invoice' : 'Import certificates')}
      </Button>
    </div>
  );
};
