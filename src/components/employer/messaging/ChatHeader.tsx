import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MoreVertical, Phone, Video, Shield, Award, Briefcase } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Conversation } from "@/services/conversationService";

interface ChatHeaderProps {
  conversation: Conversation;
  onBack: () => void;
  onArchive?: () => void;
  onViewProfile?: () => void;
}

const tierConfig: Record<string, { color: string; bg: string; icon: typeof Shield }> = {
  basic: { color: 'text-muted-foreground', bg: 'bg-muted', icon: Shield },
  verified: { color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', icon: Shield },
  premium: { color: 'text-elec-yellow', bg: 'bg-yellow-100 dark:bg-yellow-900/30', icon: Award },
};

export function ChatHeader({ conversation, onBack, onArchive, onViewProfile }: ChatHeaderProps) {
  const profile = conversation.electrician_profile;
  const employee = profile?.employee;
  const name = employee?.name || 'Unknown';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const tier = tierConfig[profile?.verification_tier || 'basic'];
  const TierIcon = tier.icon;

  return (
    <div className="flex items-center gap-3 p-4 border-b border-border bg-background">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="shrink-0 -ml-2"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar className="w-10 h-10">
          <AvatarImage src={employee?.avatar_url || undefined} alt={name} />
          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {profile?.verification_tier && profile.verification_tier !== 'basic' && (
          <div className={`absolute -bottom-0.5 -right-0.5 ${tier.bg} p-0.5 rounded-full ring-2 ring-background`}>
            <TierIcon className={`h-2.5 w-2.5 ${tier.color}`} />
          </div>
        )}
      </div>

      {/* Name and context */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-foreground truncate">{name}</h2>
          {profile?.verification_tier && (
            <Badge variant="outline" className={`text-xs px-1.5 py-0 ${tier.bg} ${tier.color} border-0 shrink-0`}>
              {profile.verification_tier.charAt(0).toUpperCase() + profile.verification_tier.slice(1)}
            </Badge>
          )}
        </div>
        {conversation.vacancy && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Briefcase className="h-3 w-3" />
            <span className="truncate">Re: {conversation.vacancy.title}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onViewProfile && (
            <DropdownMenuItem onClick={onViewProfile}>
              View Profile
            </DropdownMenuItem>
          )}
          {onArchive && (
            <DropdownMenuItem onClick={onArchive} className="text-destructive">
              Archive Conversation
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
