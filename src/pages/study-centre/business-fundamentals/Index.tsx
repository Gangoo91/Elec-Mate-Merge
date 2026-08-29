import { useNavigate } from 'react-router-dom';

import useSEO from '@/hooks/useSEO';
import { EmptyState } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

export default function BusinessFundamentalsIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Business Fundamentals | Study Centre | Elec-Mate',
    description: 'Quoting, invoicing, marketing and running your own electrical business.',
  });

  return (
    <HubPage>
      <HubMasthead
        section="Study centre · Coming soon"
        title="Business fundamentals"
        backTo="/study-centre"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Quoting, invoicing, marketing and the operational backbone of running your own electrical
          business.
        </p>

        <EmptyState
          title="Courses coming soon"
          description="We're building this category — quote templates, invoicing playbooks, lead-gen and the day-to-day of running a small trades business. Check back soon."
          action="Browse other categories"
          onAction={() => navigate('/study-centre')}
        />
      </HubBody>
    </HubPage>
  );
}
