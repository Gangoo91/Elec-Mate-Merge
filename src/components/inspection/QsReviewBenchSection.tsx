import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
 * Access is server-side gated: the underlying get_qs_review_queue / approve_qs_review
 * RPCs only return / accept work for an authorised reviewer (is_qs_reviewer_for), so
 * a non-QS who reaches this route simply sees an empty queue. The entry-point tile in
 * the I&T dashboard is additionally gated on `am_i_qs`.
 */
const QsReviewBenchSection: React.FC<QsReviewBenchSectionProps> = ({ onBack }) => {
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

      <div className="px-4 py-4">
        <QSReviewsSection />
      </div>
    </div>
  );
};

export default QsReviewBenchSection;
