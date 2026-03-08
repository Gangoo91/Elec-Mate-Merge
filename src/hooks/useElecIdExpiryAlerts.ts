import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { differenceInDays, parseISO } from 'date-fns';

export type ElecIdExpiryUrgency = 'expired' | 'urgent' | 'warning' | 'headsup';

export interface ElecIdExpiryAlert {
  id: string;
  type: 'ecs_card' | 'qualification' | 'training';
  name: string;
  expiryDate: string;
  daysUntilExpiry: number;
  urgency: ElecIdExpiryUrgency;
  category?: string | null;
}

function calcUrgency(days: number): ElecIdExpiryUrgency {
  if (days < 0) return 'expired';
  if (days <= 14) return 'urgent';
  if (days <= 30) return 'warning';
  return 'headsup';
}

export function useElecIdExpiryAlerts() {
  return useQuery<ElecIdExpiryAlert[]>({
    queryKey: ['elec-id-expiry-alerts'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      // 1. Get this user's elec-id profile(s)
      const { data: profiles } = await supabase
        .from('employer_elec_id_profiles')
        .select('id, ecs_expiry_date')
        .eq('employee_id', user.id);

      if (!profiles || profiles.length === 0) return [];

      const profileIds = profiles.map((p) => p.id);
      const alerts: ElecIdExpiryAlert[] = [];
      const HORIZON_DAYS = 90;

      // 2. ECS card expiry from profile
      for (const profile of profiles) {
        if (profile.ecs_expiry_date) {
          const days = differenceInDays(parseISO(profile.ecs_expiry_date), new Date());
          if (days <= HORIZON_DAYS) {
            alerts.push({
              id: `ecs-${profile.id}`,
              type: 'ecs_card',
              name: 'ECS Card',
              expiryDate: profile.ecs_expiry_date,
              daysUntilExpiry: days,
              urgency: calcUrgency(days),
            });
          }
        }
      }

      // 3. Qualifications
      const { data: quals } = await supabase
        .from('employer_elec_id_qualifications')
        .select('id, qualification_name, expiry_date, category')
        .in('profile_id', profileIds)
        .not('expiry_date', 'is', null);

      for (const q of quals ?? []) {
        if (!q.expiry_date) continue;
        const days = differenceInDays(parseISO(q.expiry_date), new Date());
        if (days <= HORIZON_DAYS) {
          alerts.push({
            id: `qual-${q.id}`,
            type: 'qualification',
            name: q.qualification_name,
            expiryDate: q.expiry_date,
            daysUntilExpiry: days,
            urgency: calcUrgency(days),
            category: q.category,
          });
        }
      }

      // 4. Training
      const { data: training } = await supabase
        .from('employer_elec_id_training')
        .select('id, training_name, expiry_date')
        .in('profile_id', profileIds)
        .not('expiry_date', 'is', null);

      for (const t of training ?? []) {
        if (!t.expiry_date) continue;
        const days = differenceInDays(parseISO(t.expiry_date), new Date());
        if (days <= HORIZON_DAYS) {
          alerts.push({
            id: `training-${t.id}`,
            type: 'training',
            name: t.training_name,
            expiryDate: t.expiry_date,
            daysUntilExpiry: days,
            urgency: calcUrgency(days),
          });
        }
      }

      // Sort: most urgent first
      return alerts.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
    },
    staleTime: 5 * 60 * 1000,
  });
}
