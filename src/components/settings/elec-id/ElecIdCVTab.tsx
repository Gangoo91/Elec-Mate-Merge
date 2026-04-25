/**
 * ElecIdCVTab — My CV tab in the Elec-ID settings
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVs, UserCV } from '@/hooks/useCV';
import { useElecIdForCV } from '@/hooks/useCVSync';
import CVCard from './CVCard';
import { toast } from '@/hooks/use-toast';
import { storageSetJSONSync, storageSetSync } from '@/utils/storage';
import { SectionHeader, EmptyState, Eyebrow } from '@/components/college/primitives';

interface ElecIdCVTabProps {
  onNavigate?: (tabId: string) => void;
}

const ElecIdCVTab = ({ onNavigate: _onNavigate }: ElecIdCVTabProps) => {
  const navigate = useNavigate();
  const { data: cvs, isLoading: isLoadingCVs, error: cvsError } = useCVs();
  const { data: elecIdData } = useElecIdForCV();

  const isLoading = isLoadingCVs;
  const hasElecIdProfile = !!elecIdData?.profile;

  const sortedCVs = cvs?.slice().sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const handleCreateCV = () => {
    navigate('/electrician/cv-builder');
  };

  const handleEditCV = (cv: UserCV) => {
    storageSetJSONSync('elecmate-cv-draft', cv.cv_data);
    storageSetSync('elecmate-cv-template', cv.template_id);
    storageSetSync('elecmate-cv-editing-id', cv.id);
    navigate('/electrician/cv-builder');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-40 bg-white/[0.04]" />
          <Skeleton className="h-11 w-32 bg-white/[0.04]" />
        </div>
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  if (cvsError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
        <h3 className="font-semibold text-white">Failed to load CVs</h3>
        <p className="text-sm text-white mt-1">Please refresh the page to try again.</p>
      </div>
    );
  }

  if (!sortedCVs || sortedCVs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-500/70 via-blue-400/70 to-purple-400/70" />
          <Eyebrow>Elec-ID · CV</Eyebrow>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-[1.05]">
            Create your professional CV
          </h2>
          <p className="mt-3 text-sm text-white max-w-2xl">
            Build a professional CV that showcases your electrical qualifications. Import your
            credentials directly from your Elec-ID profile.
          </p>
          <button
            onClick={handleCreateCV}
            className="mt-5 h-11 px-5 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
          >
            Create your CV →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {[
            {
              title: 'Import from Elec-ID',
              description: 'Automatically import your skills, qualifications, and work history',
            },
            {
              title: 'AI assistance',
              description: 'Get AI-powered suggestions to make your CV stand out',
            },
            {
              title: 'PDF download',
              description: 'Download professionally formatted PDF files instantly',
            },
          ].map((feat) => (
            <div key={feat.title} className="bg-[hsl(0_0%_12%)] p-5">
              <Eyebrow>{feat.title}</Eyebrow>
              <p className="mt-2 text-sm text-white">{feat.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Your credentials · CV"
        title="My CVs"
        action="New CV"
        onAction={handleCreateCV}
      />

      <p className="text-sm text-white/65">
        {sortedCVs.length} CV{sortedCVs.length !== 1 ? 's' : ''}
        {hasElecIdProfile && ' · Synced with Elec-ID'}
      </p>

      {hasElecIdProfile && (
        <div className="bg-[hsl(0_0%_12%)] border border-emerald-500/20 rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-400">Elec-ID connected</p>
            <p className="text-xs text-white/65">Skills and certifications sync automatically</p>
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
            Linked
          </span>
        </div>
      )}

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {sortedCVs.map((cv, index) => (
            <motion.div
              key={cv.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ delay: index * 0.04 }}
            >
              <CVCard cv={cv} onEdit={handleEditCV} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <EmptyState
        title="Pro tip"
        description="Set your best CV as Primary to use it automatically when applying for jobs."
      />
    </div>
  );
};

// Silence toast unused warning
void toast;

export default ElecIdCVTab;
