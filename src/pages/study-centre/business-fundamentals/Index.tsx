import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { PageFrame, PageHero, EmptyState } from '@/components/college/primitives';

export default function BusinessFundamentalsIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Business Fundamentals | Study Centre | Elec-Mate',
    description: 'Quoting, invoicing, marketing and running your own electrical business.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Study centre
          </button>

          <PageHero
            eyebrow="Study centre · Coming soon"
            title="Business fundamentals"
            description="Quoting, invoicing, marketing and the operational backbone of running your own electrical business."
            tone="indigo"
          />

          <EmptyState
            title="Courses coming soon"
            description="We're building this category — quote templates, invoicing playbooks, lead-gen and the day-to-day of running a small trades business. Check back soon."
            action="Browse other categories"
            onAction={() => navigate('/study-centre')}
          />
        </PageFrame>
      </div>
    </div>
  );
}
