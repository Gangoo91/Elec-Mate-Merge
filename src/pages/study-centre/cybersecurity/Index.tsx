import { useNavigate } from 'react-router-dom';

import useSEO from '@/hooks/useSEO';
import { EmptyState } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

export default function CybersecurityIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Cybersecurity for the Trades | Study Centre | Elec-Mate',
    description: 'Protect your business and clients from digital threats.',
  });

  return (
    <HubPage>
      <HubMasthead
        section="Study centre · Coming soon"
        title="Cybersecurity for the trades"
        backTo="/study-centre"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Protect your business and your clients from phishing, ransomware and the digital threats
          hitting small trades.
        </p>

        <EmptyState
          title="Courses coming soon"
          description="We're building practical cyber hygiene for tradespeople — securing email, payment fraud, customer data and the basics every business should have."
          action="Browse other categories"
          onAction={() => navigate('/study-centre')}
        />
      </HubBody>
    </HubPage>
  );
}
