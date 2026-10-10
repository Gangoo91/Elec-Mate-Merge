import type { Section } from '@/pages/employer/EmployerDashboard';
import { SafetyScopeProvider } from '@/components/electrician-tools/site-safety/common/SafetyScope';
import { LoadingBlocks } from '@/components/employer/editorial';
import { FirmRamsEntry } from './FirmRamsEntry';

interface AIRAMSSectionProps {
  onNavigate: (section: Section) => void;
}

/**
 * Smart Docs: "Safety documents for this job" (ELE-1941). One run gives the
 * job's RAMS and method statement; the old AI method statement section
 * redirects here. Opens the shared Site Safety generator in the firm's scope
 * (see FirmRamsEntry), so the result is the firm's and lives with the rest of
 * Site Safety rather than in a separate Employer Hub copy.
 */
export function AIRAMSSection({ onNavigate }: AIRAMSSectionProps) {
  return (
    <SafetyScopeProvider
      mode="firm"
      fallback={
        <div className="mx-auto max-w-[1600px] pt-6">
          <LoadingBlocks />
        </div>
      }
    >
      <FirmRamsEntry onNavigate={onNavigate} />
    </SafetyScopeProvider>
  );
}
