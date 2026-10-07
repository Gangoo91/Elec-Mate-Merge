import { Switch } from '@/components/ui/switch';
import { SettingsCard } from '@/components/settings/rows';
import { toast } from '@/hooks/use-toast';
import { useShowMeToCustomers } from '@/hooks/useCustomerPortal';

/**
 * ELE-1837: a worker's own say over whether a firm's customers see their
 * first name on the client portal ("Dan is on site today"). Off by default.
 * Only shown to people on a firm's team. Surnames, phone numbers and photos
 * are never shown either way.
 */
export function ShowMeToCustomersCard() {
  const { data, set } = useShowMeToCustomers();
  if (!data?.on_roster) return null;

  const toggle = async (on: boolean) => {
    try {
      await set.mutateAsync(on);
      toast({
        title: on ? 'Customers will see your first name' : 'Customers will not see your name',
      });
    } catch {
      toast({ title: 'Could not save', description: 'Please try again.', variant: 'destructive' });
    }
  };

  return (
    <SettingsCard eyebrow="Your firm" title="Customers">
      <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-medium text-white">Show me to customers</div>
          <div className="mt-0.5 text-[11.5px] leading-snug text-white">
            When you are booked on a job, the customer&apos;s page shows your first name, for
            example &quot;On site today: Dan&quot;. Never your surname or phone number. When this
            is off they only see how many people are booked.
          </div>
        </div>
        <Switch
          checked={!!data.on}
          disabled={set.isPending}
          onCheckedChange={(v) => void toggle(v)}
          className="touch-manipulation"
        />
      </div>
    </SettingsCard>
  );
}

export default ShowMeToCustomersCard;
