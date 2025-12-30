import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface SafetyEquipment {
  id: string;
  user_id: string;
  name: string;
  category: string;
  serial_number: string | null;
  purchase_date: string | null;
  purchase_price: number | null;
  warranty_expiry: string | null;
  location: string;
  assigned_to: string | null;
  last_inspection: string | null;
  next_inspection: string | null;
  inspection_interval_days: number;
  requires_calibration: boolean;
  last_calibration: string | null;
  calibration_due: string | null;
  calibration_interval_days: number | null;
  status: 'good' | 'needs_attention' | 'out_of_service' | 'overdue';
  condition_notes: string | null;
  photos: string[];
  qr_code: string | null;
  created_at: string;
  updated_at: string;
}

export type SafetyEquipmentInsert = Omit<SafetyEquipment, 'id' | 'created_at' | 'updated_at'>;
export type SafetyEquipmentUpdate = Partial<Omit<SafetyEquipment, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

export function useSafetyEquipment() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: equipment = [], isLoading, error } = useQuery({
    queryKey: ['safety-equipment', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('safety_equipment')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SafetyEquipment[];
    },
    enabled: !!user?.id,
  });

  const addEquipment = useMutation({
    mutationFn: async (newEquipment: Omit<SafetyEquipmentInsert, 'user_id'>) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_equipment')
        .insert({
          ...newEquipment,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Equipment added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add equipment: ' + error.message);
    },
  });

  const updateEquipment = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: SafetyEquipmentUpdate }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('safety_equipment')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Equipment updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update equipment: ' + error.message);
    },
  });

  const deleteEquipment = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('safety_equipment')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Equipment deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete equipment: ' + error.message);
    },
  });

  const markInspected = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      const item = equipment.find(e => e.id === id);
      if (!item) throw new Error('Equipment not found');

      const today = new Date().toISOString().split('T')[0];
      const intervalDays = item.inspection_interval_days || 90;
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + intervalDays);

      const { data, error } = await supabase
        .from('safety_equipment')
        .update({
          last_inspection: today,
          next_inspection: nextDate.toISOString().split('T')[0],
          status: 'good',
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Inspection recorded');
    },
    onError: (error) => {
      toast.error('Failed to record inspection: ' + error.message);
    },
  });

  const markCalibrated = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      const item = equipment.find(e => e.id === id);
      if (!item) throw new Error('Equipment not found');

      const today = new Date().toISOString().split('T')[0];
      const intervalDays = item.calibration_interval_days || 365;
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + intervalDays);

      const { data, error } = await supabase
        .from('safety_equipment')
        .update({
          last_calibration: today,
          calibration_due: nextDate.toISOString().split('T')[0],
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as SafetyEquipment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safety-equipment', user?.id] });
      toast.success('Calibration recorded');
    },
    onError: (error) => {
      toast.error('Failed to record calibration: ' + error.message);
    },
  });

  // Calculate stats
  const stats = {
    total: equipment.length,
    good: equipment.filter(e => e.status === 'good').length,
    needsAttention: equipment.filter(e => e.status === 'needs_attention').length,
    overdue: equipment.filter(e => {
      if (e.next_inspection) {
        return new Date(e.next_inspection) < new Date();
      }
      if (e.calibration_due) {
        return new Date(e.calibration_due) < new Date();
      }
      return false;
    }).length,
    outOfService: equipment.filter(e => e.status === 'out_of_service').length,
  };

  return {
    equipment,
    isLoading,
    error,
    stats,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    markInspected,
    markCalibrated,
  };
}
