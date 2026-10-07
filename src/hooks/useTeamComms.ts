/**
 * Team comms hooks (ELE-1959). Realtime is always filtered to the person's own
 * threads — never a whole table:
 *   office list    employer_communications      sender_id=eq.<firm>
 *   worker list    employer_communication_recipients employee_id=eq.<my roster id>
 *   open thread    employer_communication_replies communication_id=eq.<thread>
 *                  (+ recipients for the office, the message row for a worker)
 * RLS still applies on top of every filter.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import {
  acknowledge,
  chase,
  getJobOptions,
  getMessageMeta,
  getMyInbox,
  getOfficeInbox,
  getRecipients,
  getReplies,
  markSeen,
  sendMessage,
  sendReply,
  type CommsAttachment,
  type CommsReply,
  type SendInput,
} from '@/services/teamCommsService';

const ROOT = 'team-comms';
export const teamCommsKeys = {
  office: [ROOT, 'office'] as const,
  mine: (employeeId: string | undefined) => [ROOT, 'mine', employeeId ?? 'none'] as const,
  replies: (id: string) => [ROOT, 'replies', id] as const,
  meta: (id: string) => [ROOT, 'meta', id] as const,
  recipients: (id: string) => [ROOT, 'recipients', id] as const,
  jobs: [ROOT, 'jobs'] as const,
};

/** The firm the office user acts for (owner id; a manager's firm). */
export function useActingFirmId() {
  const { user } = useAuth();
  return useQuery({
    queryKey: [ROOT, 'firm', user?.id ?? 'none'],
    queryFn: () => getActingEmployerId(user?.id ?? null),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useOfficeInbox(firmId: string | null | undefined) {
  useRealtimeInvalidate(
    'team-comms-office',
    [{ table: 'employer_communications', filter: `sender_id=eq.${firmId}` }],
    [teamCommsKeys.office],
    !!firmId
  );
  return useQuery({
    queryKey: teamCommsKeys.office,
    queryFn: getOfficeInbox,
    enabled: !!firmId,
    staleTime: 15 * 1000,
  });
}

export function useMyInbox(employeeId: string | undefined) {
  useRealtimeInvalidate(
    'team-comms-mine',
    [{ table: 'employer_communication_recipients', filter: `employee_id=eq.${employeeId}` }],
    [teamCommsKeys.mine(employeeId), ['my-communications', employeeId], ['communications', 'unread', employeeId]],
    !!employeeId
  );
  return useQuery({
    queryKey: teamCommsKeys.mine(employeeId),
    queryFn: getMyInbox,
    enabled: !!employeeId,
    staleTime: 15 * 1000,
  });
}

export function useJobOptions(enabled: boolean) {
  return useQuery({
    queryKey: teamCommsKeys.jobs,
    queryFn: getJobOptions,
    enabled,
    staleTime: 60 * 1000,
  });
}

export function useThread(communicationId: string | null, mode: 'office' | 'worker') {
  const id = communicationId ?? '';
  useRealtimeInvalidate(
    `team-comms-thread-${mode}`,
    mode === 'office'
      ? [
          { table: 'employer_communication_replies', filter: `communication_id=eq.${id}` },
          { table: 'employer_communication_recipients', filter: `communication_id=eq.${id}` },
        ]
      : [
          { table: 'employer_communication_replies', filter: `communication_id=eq.${id}` },
          { table: 'employer_communications', filter: `id=eq.${id}`, event: 'UPDATE' },
        ],
    [teamCommsKeys.replies(id), teamCommsKeys.recipients(id), teamCommsKeys.meta(id)],
    !!communicationId
  );

  const replies = useQuery({
    queryKey: teamCommsKeys.replies(id),
    queryFn: () => getReplies(id),
    enabled: !!communicationId,
  });
  const meta = useQuery({
    queryKey: teamCommsKeys.meta(id),
    queryFn: () => getMessageMeta(id),
    enabled: !!communicationId,
  });
  const recipients = useQuery({
    queryKey: teamCommsKeys.recipients(id),
    queryFn: () => getRecipients(id),
    enabled: !!communicationId && mode === 'office',
  });
  return { replies, meta, recipients };
}

const invalidateLists = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: teamCommsKeys.office });
  qc.invalidateQueries({ queryKey: [ROOT, 'mine'] });
  qc.invalidateQueries({ queryKey: ['communications'] });
  qc.invalidateQueries({ queryKey: ['my-communications'] });
};

export function useSendTeamMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SendInput) => sendMessage(input),
    onSuccess: () => invalidateLists(qc),
  });
}

export function useSendReply(communicationId: string | null) {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (input: {
      body: string;
      attachments: CommsAttachment[];
      toEmployeeId?: string | null;
      authorKind: 'office' | 'worker';
      authorEmployeeId?: string | null;
    }) =>
      sendReply({
        communicationId: communicationId!,
        body: input.body,
        attachments: input.attachments,
        toEmployeeId: input.toEmployeeId,
        as: input.authorKind,
      }),
    // Optimistic bubble: it appears the instant you tap Send.
    onMutate: async (input) => {
      if (!communicationId) return;
      const key = teamCommsKeys.replies(communicationId);
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<CommsReply[]>(key);
      const optimistic: CommsReply = {
        id: `pending-${Date.now()}`,
        communication_id: communicationId,
        thread_employee_id:
          input.authorKind === 'worker' ? (input.authorEmployeeId ?? null) : (input.toEmployeeId ?? null),
        author_user_id: user?.id ?? '',
        author_employee_id: input.authorKind === 'worker' ? (input.authorEmployeeId ?? null) : null,
        author_kind: input.authorKind,
        author_name: null,
        body: input.body,
        attachments: input.attachments,
        created_at: new Date().toISOString(),
      };
      qc.setQueryData<CommsReply[]>(key, [...(prev ?? []), optimistic]);
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (communicationId && ctx?.prev) qc.setQueryData(teamCommsKeys.replies(communicationId), ctx.prev);
    },
    onSettled: () => {
      if (communicationId) qc.invalidateQueries({ queryKey: teamCommsKeys.replies(communicationId) });
      invalidateLists(qc);
    },
  });
}

export function useMarkSeen() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, as }: { id: string; as: 'office' | 'worker' }) => markSeen(id, as),
    onSuccess: () => invalidateLists(qc),
  });
}

export function useAcknowledge() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (communicationId: string) => acknowledge(communicationId),
    onSuccess: () => invalidateLists(qc),
  });
}

export function useChase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (communicationId: string) => chase(communicationId),
    onSuccess: () => invalidateLists(qc),
  });
}
