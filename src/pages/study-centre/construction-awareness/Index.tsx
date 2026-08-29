import { useNavigate } from 'react-router-dom';

import useSEO from '@/hooks/useSEO';
import { EmptyState } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

export default function ConstructionAwarenessIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Construction Site Awareness | Study Centre | Elec-Mate',
    description: 'Site safety, CSCS preparation and construction industry essentials.',
  });

  return (
    <HubPage>
      <HubMasthead
        section="Study centre · Coming soon"
        title="Construction site awareness"
        backTo="/study-centre"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Site safety, CSCS prep and the construction-side knowledge that keeps you safe and
          respected on multi-trade jobs.
        </p>

        <EmptyState
          title="Courses coming soon"
          description="We're building primers on site rules, safety inductions, RAMS, working alongside other trades, and the cards every site asks for."
          action="Browse other categories"
          onAction={() => navigate('/study-centre')}
        />
      </HubBody>
    </HubPage>
  );
}
