import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import { useConversations, useElectricianConversations } from '@/hooks/useConversations';
import { useTeamChatUnread } from '@/hooks/useTeamChat';
import { useCollegeConversations } from '@/hooks/useCollegeChat';
import { useQuery } from '@tanstack/react-query';
import { peerConversationService } from '@/services/peerSupportService';

interface CombinedUnreadResult {
  notificationUnread: number;
  messageUnread: number;
  combinedUnread: number;
  hasUnread: boolean;
}

export const useCombinedUnread = (): CombinedUnreadResult => {
  const location = useLocation();
  const { user } = useAuth();
  const { profile: elecIdProfile } = useElecIdProfile();

  // Determine context
  const isEmployerContext = location.pathname.startsWith('/employer');
  const employerId = isEmployerContext ? user?.id : undefined;

  // Notification unread count - try to get from context
  // Note: NotificationProvider context is accessed via useNotifications hook
  // We'll pass this in from the component that uses this hook
  let notificationUnread = 0;

  // Message unread counts (same logic as MessagesDropdown)
  const { totalUnread: employerUnread = 0 } = useConversations();
  const { totalUnread: electricianUnread = 0 } = useElectricianConversations(elecIdProfile?.id);
  const teamChatUnread = useTeamChatUnread(employerId) || 0;
  const { totalUnread: collegeUnread = 0 } = useCollegeConversations();

  // Peer support conversations
  const { data: peerConversations = [] } = useQuery({
    queryKey: ['peer-conversations'],
    queryFn: () => peerConversationService.getMyConversations(),
    enabled: !!user,
  });

  const peerUnread = peerConversations?.filter(c => c.status === 'active').length || 0;

  // Calculate message total
  const messageUnread = useMemo(() => {
    const jobUnread = isEmployerContext ? employerUnread : electricianUnread;
    return (jobUnread || 0) + (teamChatUnread || 0) + (collegeUnread || 0) + peerUnread;
  }, [isEmployerContext, employerUnread, electricianUnread, teamChatUnread, collegeUnread, peerUnread]);

  const combinedUnread = messageUnread + notificationUnread;
  const hasUnread = combinedUnread > 0;

  return {
    notificationUnread,
    messageUnread,
    combinedUnread,
    hasUnread,
  };
};

// Hook that includes notification count (for use where NotificationProvider is available)
export const useCombinedUnreadWithNotifications = (notificationUnread: number): CombinedUnreadResult => {
  const baseResult = useCombinedUnread();

  return {
    ...baseResult,
    notificationUnread,
    combinedUnread: baseResult.messageUnread + notificationUnread,
    hasUnread: baseResult.messageUnread + notificationUnread > 0,
  };
};
