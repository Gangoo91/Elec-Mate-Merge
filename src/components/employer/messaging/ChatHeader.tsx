import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, MoreVertical, Shield, Award, Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconButton, Pill } from '@/components/employer/editorial';
import type { Conversation } from '@/services/conversationService';

interface ChatHeaderProps {
  conversation: Conversation;
  onBack: () => void;
  onArchive?: () => void;
  onViewProfile?: () => void;
}

const tierConfig: Record<
  string,
  { tone: 'blue' | 'yellow' | 'amber'; icon: typeof Shield }
> = {
  basic: { tone: 'amber', icon: Shield },
  verified: { tone: 'blue', icon: Shield },
  premium: { tone: 'yellow', icon: Award },
};

export function ChatHeader({ conversation, onBack, onArchive, onViewProfile }: ChatHeaderProps) {
  const profile = conversation.electrician_profile;
  const employee = profile?.employee;
  const name = employee?.name || 'Unknown';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  const tier = tierConfig[profile?.verification_tier || 'basic'];
  const TierIcon = tier.icon;

  return (
    <div className="flex items-center gap-3 p-4 border-b border-white/[0.06] bg-[hsl(0_0%_8%)]">
      {/* Back button */}
      <IconButton onClick={onBack} aria-label="Back" className="shrink-0">
        <ArrowLeft className="h-5 w-5" />
      </IconButton>

      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar className="w-10 h-10">
          <AvatarImage src={employee?.avatar_url || undefined} alt={name} />
          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {profile?.verification_tier && profile.verification_tier !== 'basic' && (
          <div className="absolute -bottom-0.5 -right-0.5 bg-[hsl(0_0%_12%)] border border-white/[0.08] p-0.5 rounded-full ring-2 ring-[hsl(0_0%_8%)]">
            <TierIcon className="h-2.5 w-2.5 text-elec-yellow" />
          </div>
        )}
      </div>

      {/* Name and context */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-white truncate">{name}</h2>
          {profile?.verification_tier && (
            <Pill tone={tier.tone}>
              {profile.verification_tier.charAt(0).toUpperCase() +
                profile.verification_tier.slice(1)}
            </Pill>
          )}
        </div>
        {conversation.vacancy && (
          <div className="flex items-center gap-1 text-xs text-white mt-0.5">
            <Briefcase className="h-3 w-3" />
            <span className="truncate">Re: {conversation.vacancy.title}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="More actions"
            className="h-10 w-10 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation shrink-0"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white"
        >
          {onViewProfile && (
            <DropdownMenuItem
              onClick={onViewProfile}
              className="text-white focus:bg-white/[0.08] focus:text-white"
            >
              View Profile
            </DropdownMenuItem>
          )}
          {onArchive && (
            <DropdownMenuItem
              onClick={onArchive}
              className="text-red-400 focus:bg-red-500/15 focus:text-red-400"
            >
              Archive Conversation
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
