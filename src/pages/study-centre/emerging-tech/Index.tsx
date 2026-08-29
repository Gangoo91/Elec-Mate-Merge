import { useNavigate } from 'react-router-dom';

import useSEO from '@/hooks/useSEO';
import { EmptyState } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

export default function EmergingTechIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Emerging Tech | Study Centre | Elec-Mate',
    description: 'AI, IoT, robotics and the future of the electrical industry.',
  });

  return (
    <HubPage>
      <HubMasthead
        section="Study centre · Coming soon"
        title="Emerging tech"
        backTo="/study-centre"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          AI, IoT, robotics and the technologies reshaping what an electrician's day will look like.
        </p>

        <EmptyState
          title="Courses coming soon"
          description="We're building forward-looking modules — AI on site, smart-home protocols, building automation and the practical tech you'll be expected to know."
          action="Browse other categories"
          onAction={() => navigate('/study-centre')}
        />
      </HubBody>
    </HubPage>
  );
}
