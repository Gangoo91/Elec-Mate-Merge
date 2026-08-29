import { useNavigate } from 'react-router-dom';

import useSEO from '@/hooks/useSEO';
import { EmptyState } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

export default function MultiTradeIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Multi-Trade Awareness | Study Centre | Elec-Mate',
    description: 'Plumbing, gas, HVAC and other trade knowledge for electricians.',
  });

  return (
    <HubPage>
      <HubMasthead
        section="Study centre · Coming soon"
        title="Multi-trade awareness"
        backTo="/study-centre"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Plumbing, gas, HVAC and the adjacent trades you'll meet on site — enough to coordinate
          without stepping on toes.
        </p>

        <EmptyState
          title="Courses coming soon"
          description="We're building cross-trade primers — what plumbers, gas engineers and HVAC fitters expect from the spark on site, and where the boundaries are."
          action="Browse other categories"
          onAction={() => navigate('/study-centre')}
        />
      </HubBody>
    </HubPage>
  );
}
