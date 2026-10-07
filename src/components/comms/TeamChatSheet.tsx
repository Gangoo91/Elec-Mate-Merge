/**
 * Team chat, reachable from Comms (ELE-1959). Channels and direct messages
 * already exist (team-chat/), but were only in the global Messages sheet and
 * only for the owner. The office gets the full list (create channels, DMs);
 * a worker sees the channels they belong to and their DMs.
 */
import { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Hash, Loader2, Lock, MessageSquare } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { TeamChatList, TeamChatView } from '@/components/employer/team-chat';
import { useMyTeamChannels, useTeamDMConversations } from '@/hooks/useTeamChat';
import type { TeamChannel, TeamDirectMessage } from '@/services/teamChatService';

export function TeamChatSheet({
  open,
  onOpenChange,
  firmId,
  mode,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  firmId: string | null | undefined;
  mode: 'office' | 'worker';
}) {
  const [channel, setChannel] = useState<TeamChannel | null>(null);
  const [dm, setDm] = useState<TeamDirectMessage | null>(null);

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        eyebrow="Team chat"
        title="Channels and direct messages"
        description={
          mode === 'office'
            ? 'Everyday chat with the team. Use a Comms message when you need a record of who read or acknowledged it.'
            : 'Everyday chat with your team and the office.'
        }
        width="lg"
      >
        {!firmId ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          </div>
        ) : mode === 'office' ? (
          <TeamChatList
            employerId={firmId}
            onSelectChannel={(c) => {
              setDm(null);
              setChannel(c);
            }}
            onSelectDM={(d) => {
              setChannel(null);
              setDm(d);
            }}
          />
        ) : (
          <WorkerChatList
            firmId={firmId}
            onChannel={(c) => {
              setDm(null);
              setChannel(c);
            }}
            onDm={(d) => {
              setChannel(null);
              setDm(d);
            }}
          />
        )}
      </FormSheet>

      <TeamChatView
        channel={channel}
        dmConversation={dm}
        open={!!channel || !!dm}
        onOpenChange={(o) => {
          if (!o) {
            setChannel(null);
            setDm(null);
          }
        }}
      />
    </>
  );
}

function WorkerChatList({
  firmId,
  onChannel,
  onDm,
}: {
  firmId: string;
  onChannel: (c: TeamChannel) => void;
  onDm: (d: TeamDirectMessage) => void;
}) {
  const { data: channels = [], isLoading: lc } = useMyTeamChannels();
  const { data: dms = [], isLoading: ld } = useTeamDMConversations(firmId);
  const mine = channels.filter((c) => c.employer_id === firmId);

  if (lc || ld) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-5 w-5 animate-spin text-white" />
      </div>
    );
  }

  if (mine.length === 0 && dms.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5 text-center">
        <p className="text-[15px] font-semibold text-white">No team chats yet</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white">
          When the office adds you to a channel it shows here. To ask the office something about a
          message, reply in that message.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {mine.length > 0 && (
        <section>
          <h3 className="mb-2 text-[13px] font-semibold text-white">Channels</h3>
          <div className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.1]">
            {mine.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onChannel(c)}
                className="flex min-h-[56px] w-full items-center gap-3 bg-white/[0.03] px-4 text-left touch-manipulation hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08]">
                  {c.is_private ? (
                    <Lock className="h-4 w-4 text-white" />
                  ) : (
                    <Hash className="h-4 w-4 text-white" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-medium text-white">
                    {c.name}
                  </span>
                  {c.description && (
                    <span className="block truncate text-[12px] text-white">{c.description}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
      {dms.length > 0 && (
        <section>
          <h3 className="mb-2 text-[13px] font-semibold text-white">Direct messages</h3>
          <div className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.1]">
            {dms.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => onDm(d)}
                className="flex min-h-[56px] w-full items-center gap-3 bg-white/[0.03] px-4 text-left touch-manipulation hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08]">
                  <MessageSquare className="h-4 w-4 text-white" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-medium text-white">
                    {d.other_participant?.name || 'Direct message'}
                  </span>
                  <span className="block truncate text-[12px] text-white">
                    {d.last_message_preview || 'No messages yet'}
                  </span>
                </span>
                {d.last_message_at && (
                  <span className="shrink-0 text-[11.5px] text-white">
                    {formatDistanceToNow(parseISO(d.last_message_at), { addSuffix: false })}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
