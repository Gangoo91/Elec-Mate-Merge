import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QSReviewsSection } from '@/components/employer/sections/QSReviewsSection';
import TeamCertificatesSection from '@/components/inspection/TeamCertificatesSection';

interface QsReviewBenchSectionProps {
  onBack: () => void;
}

/**
 * I&T-hub "QS Review" bench. Lets a Qualifying Supervisor review and countersign
 * certificates awaiting their sign-off from the certificate workspace itself —
 * not only from the Employer Hub. Reuses the exact same reviewer queue / approve /
 * return hooks via QSReviewsSection, so there is no new data path here; this is a
 * second surface onto the existing QS review flow.
 *
 * Access is server-side gated: the underlying get_qs_review_queue / approve_qs_review
 * RPCs only return / accept work for an authorised reviewer (is_qs_reviewer_for), so
 * a non-QS who reaches this route simply sees an empty queue. The entry-point tile in
 * the I&T dashboard is additionally gated on `am_i_qs`.
 */
const QsReviewBenchSection: React.FC<QsReviewBenchSectionProps> = ({ onBack }) => {
  const [tab, setTab] = useState<'reviews' | 'certs'>('reviews');
  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky header — matches the other I&T hub sections (e.g. Part P notifications) */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:text-white hover:bg-white/10 rounded-lg w-9 h-9 flex-shrink-0 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">QS Review</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      {/* Team Certificates (ELE-1307 follow-on, Craig 2026-07-17): the QS
          workspace is no longer a snapshot — Reviews for pending sign-offs,
          Team Certificates for the full library with open/edit rights. */}
      <div className="max-w-6xl mx-auto px-4 pt-3">
        <div className="grid grid-cols-2 gap-1.5">
          {(
            [
              { key: 'reviews', label: 'Reviews' },
              { key: 'certs', label: 'Team Certificates' },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={
                tab === key
                  ? 'h-10 rounded-xl bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow text-[13px] font-semibold touch-manipulation active:scale-[0.98]'
                  : 'h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-[13px] font-semibold touch-manipulation active:scale-[0.98]'
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4">
        {tab === 'reviews' ? <QSReviewsSection /> : <TeamCertificatesSection />}
      </div>
    </div>
  );
};

export default QsReviewBenchSection;
