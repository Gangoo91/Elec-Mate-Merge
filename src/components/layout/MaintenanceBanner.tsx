/**
 * MaintenanceBanner — shown to every signed-in user while the
 * `maintenance_mode` feature flag is on (toggled from Admin → System).
 * Informational only; it doesn't block anything.
 */
import { Wrench } from 'lucide-react';
import { useMaintenanceMode } from '@/hooks/useFeatureFlag';

const MaintenanceBanner = () => {
  const maintenanceOn = useMaintenanceMode();
  if (!maintenanceOn) return null;

  return (
    <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2.5">
      <p className="text-[12.5px] text-amber-200 leading-snug flex items-center gap-2 max-w-3xl mx-auto">
        <Wrench className="h-3.5 w-3.5 shrink-0" />
        We&rsquo;re doing some maintenance right now — a few things may be briefly unavailable. Your
        data is safe, and everything will be back shortly.
      </p>
    </div>
  );
};

export default MaintenanceBanner;
