import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import useSEO from '@/hooks/useSEO';
import { PageFrame, PageHero, EmptyState } from '@/components/college/primitives';

export default function EmergingTechIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Emerging Tech | Study Centre | Elec-Mate',
    description: 'AI, IoT, robotics and the future of the electrical industry.',
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
            title="Emerging tech"
            description="AI, IoT, robotics and the technologies reshaping what an electrician's day will look like."
            tone="purple"
          />

          <EmptyState
            title="Courses coming soon"
            description="We're building forward-looking modules — AI on site, smart-home protocols, building automation and the practical tech you'll be expected to know."
            action="Browse other categories"
            onAction={() => navigate('/study-centre')}
          />
        </PageFrame>
      </div>
    </div>
  );
}
