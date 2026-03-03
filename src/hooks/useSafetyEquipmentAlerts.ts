import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { differenceInDays, parseISO } from 'date-fns';

export type EquipmentAlertUrgency = 'overdue' | 'urgent' | 'warning';

export interface EquipmentAlert {
  id: string;
  name: string;
  category: string | null;
  alertType: 'calibration' | 'inspection';
  dueDate: string;
  daysUntilDue: number;
  urgency: EquipmentAlertUrgency;
}

function calcUrgency(days: number): EquipmentAlertUrgency {
  if (days < 0) return 'overdue';
  if (days <= 14) return 'urgent';
  return 'warning';
}

export function useSafetyEquipmentAlerts() {
  return useQuery<EquipmentAlert[]>({
    queryKey: ['safety-equipment-alerts'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: equipment } = await supabase
        .from('safety_equipment')
        .select('id, name, category, requires_calibration, calibration_due, next_inspection')
        .eq('user_id', user.id)
        .not('status', 'eq', 'retired');

      if (!equipment) return [];

      const alerts: EquipmentAlert[] = [];
      const HORIZON_DAYS = 30;
      const now = new Date();

      for (const eq of equipment) {
        // Calibration due
        if (eq.requires_calibration && eq.calibration_due) {
          const days = differenceInDays(parseISO(eq.calibration_due), now);
          if (days <= HORIZON_DAYS) {
            alerts.push({
              id: `cal-${eq.id}`,
              name: eq.name,
              category: eq.category,
              alertType: 'calibration',
              dueDate: eq.calibration_due,
              daysUntilDue: days,
              urgency: calcUrgency(days),
            });
          }
        }

        // Inspection due
        if (eq.next_inspection) {
          const days = differenceInDays(parseISO(eq.next_inspection), now);
          if (days <= HORIZON_DAYS) {
            alerts.push({
              id: `insp-${eq.id}`,
              name: eq.name,
              category: eq.category,
              alertType: 'inspection',
              dueDate: eq.next_inspection,
              daysUntilDue: days,
              urgency: calcUrgency(days),
            });
          }
        }
      }

      return alerts.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
    },
    staleTime: 10 * 60 * 1000,
  });
}
