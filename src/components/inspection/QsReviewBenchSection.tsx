import React from 'react';
import { QSReviewsSection } from '@/components/employer/sections/QSReviewsSection';

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
 * QSReviewsSection carries the full workspace itself — Awaiting review, the
 * complete sign-off history (with the assessment-ready register export) and the
 * Team Certificates library — so this shell adds nothing but the page header.
 *
 * Access is server-side gated: the underlying get_qs_review_queue / approve_qs_review
 * RPCs only return / accept work for an authorised reviewer (is_qs_reviewer_for), so
 * a non-QS who reaches this route simply sees an empty queue. The entry-point tile in
 * the I&T dashboard is additionally gated on `am_i_qs`.
 */
const QsReviewBenchSection: React.FC<QsReviewBenchSectionProps> = ({ onBack }) => {
  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header — quiet, no rules or eyebrows */}
      <div className="px-4 lg:px-8 pt-3 pb-1">
        <button
          type="button"
          onClick={onBack}
          className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white/60 touch-manipulation active:scale-[0.97]"
        >
          Back
        </button>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">QS Review</h1>
          <span className="text-[13px] text-white/50">
            Sign-offs, history and your team's certificates
          </span>
        </div>
      </div>

      <div className="px-4 py-4 lg:px-8 lg:max-w-[1600px]">
        <QSReviewsSection embedded />
      </div>
    </div>
  );
};

export default QsReviewBenchSection;
