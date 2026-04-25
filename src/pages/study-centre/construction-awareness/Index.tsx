import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { PageFrame, PageHero, EmptyState } from '@/components/college/primitives';

export default function ConstructionAwarenessIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Construction Site Awareness | Study Centre | Elec-Mate',
    description: 'Site safety, CSCS preparation and construction industry essentials.',
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
            title="Construction site awareness"
            description="Site safety, CSCS prep and the construction-side knowledge that keeps you safe and respected on multi-trade jobs."
            tone="orange"
          />

          <EmptyState
            title="Courses coming soon"
            description="We're building primers on site rules, safety inductions, RAMS, working alongside other trades, and the cards every site asks for."
            action="Browse other categories"
            onAction={() => navigate('/study-centre')}
          />
        </PageFrame>
      </div>
    </div>
  );
}
