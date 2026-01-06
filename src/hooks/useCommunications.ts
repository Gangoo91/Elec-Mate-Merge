import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  getCommunications,
  getActiveCommunications,
  getCommunicationById,
  createCommunication,
  updateCommunication,
  deleteCommunication,
  pinCommunication,
  getRecipientsForCommunication,
  markAsRead,
  acknowledgeMessage,
  getUnreadCount,
  getCommunicationStats,
  Communication,
} from '@/services/communicationService';

// Query keys
const COMMUNICATIONS_KEY = ['communications'];
const COMMUNICATION_STATS_KEY = ['communications', 'stats'];

export const useCommunications = (activeOnly = false) => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('communications-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'communications' },
        () => {
          queryClient.invalidateQueries({ queryKey: COMMUNICATIONS_KEY });
          queryClient.invalidateQueries({ queryKey: COMMUNICATION_STATS_KEY });
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'communication_recipients' },
        () => {
          queryClient.invalidateQueries({ queryKey: COMMUNICATIONS_KEY });
          queryClient.invalidateQueries({ queryKey: COMMUNICATION_STATS_KEY });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: activeOnly ? [...COMMUNICATIONS_KEY, 'active'] : COMMUNICATIONS_KEY,
    queryFn: activeOnly ? getActiveCommunications : getCommunications,
  });
};

export const useCommunication = (id: string) => {
  return useQuery({
    queryKey: [...COMMUNICATIONS_KEY, id],
    queryFn: () => getCommunicationById(id),
    enabled: !!id,
  });
};

export const useCommunicationRecipients = (communicationId: string) => {
  return useQuery({
    queryKey: [...COMMUNICATIONS_KEY, communicationId, 'recipients'],
    queryFn: () => getRecipientsForCommunication(communicationId),
    enabled: !!communicationId,
  });
};

export const useCommunicationStats = () => {
  return useQuery({
    queryKey: COMMUNICATION_STATS_KEY,
    queryFn: getCommunicationStats,
  });
};

export const useUnreadCount = (employeeId: string) => {
  return useQuery({
    queryKey: [...COMMUNICATIONS_KEY, 'unread', employeeId],
    queryFn: () => getUnreadCount(employeeId),
    enabled: !!employeeId,
  });
};

export const useCreateCommunication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communication: Omit<Communication, 'id' | 'created_at'>) =>
      createCommunication(communication),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: COMMUNICATION_STATS_KEY });
    },
  });
};

export const useUpdateCommunication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Communication> }) =>
      updateCommunication(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COMMUNICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: [...COMMUNICATIONS_KEY, variables.id] });
    },
  });
};

export const useDeleteCommunication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommunication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNICATIONS_KEY });
      queryClient.invalidateQueries({ queryKey: COMMUNICATION_STATS_KEY });
    },
  });
};

export const usePinCommunication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isPinned }: { id: string; isPinned: boolean }) =>
      pinCommunication(id, isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNICATIONS_KEY });
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communicationId, employeeId }: { communicationId: string; employeeId: string }) =>
      markAsRead(communicationId, employeeId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...COMMUNICATIONS_KEY, variables.communicationId, 'recipients'] });
      queryClient.invalidateQueries({ queryKey: [...COMMUNICATIONS_KEY, 'unread'] });
      queryClient.invalidateQueries({ queryKey: COMMUNICATION_STATS_KEY });
    },
  });
};

export const useAcknowledgeMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communicationId, employeeId }: { communicationId: string; employeeId: string }) =>
      acknowledgeMessage(communicationId, employeeId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...COMMUNICATIONS_KEY, variables.communicationId, 'recipients'] });
      queryClient.invalidateQueries({ queryKey: [...COMMUNICATIONS_KEY, 'unread'] });
      queryClient.invalidateQueries({ queryKey: COMMUNICATION_STATS_KEY });
    },
  });
};
