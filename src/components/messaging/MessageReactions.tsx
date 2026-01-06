import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Smile, Plus } from 'lucide-react';

// Common emoji reactions
const QUICK_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
const ALL_REACTIONS = [
  '👍', '👎', '❤️', '🔥', '😂', '😮', '😢', '😡',
  '🙏', '👏', '🎉', '💯', '✅', '❌', '⚡', '💡',
  '🤔', '👀', '🚀', '💪', '🙌', '🤝', '👌', '✨',
];

export interface Reaction {
  id: string;
  emoji: string;
  userId: string;
  userName?: string;
}

interface MessageReactionsProps {
  reactions: Reaction[];
  currentUserId: string;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: (reactionId: string) => void;
  className?: string;
}

export function MessageReactions({
  reactions,
  currentUserId,
  onAddReaction,
  onRemoveReaction,
  className,
}: MessageReactionsProps) {
  const [showPicker, setShowPicker] = useState(false);

  // Group reactions by emoji
  const groupedReactions = reactions.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = [];
    }
    acc[reaction.emoji].push(reaction);
    return acc;
  }, {} as Record<string, Reaction[]>);

  const handleReactionClick = (emoji: string) => {
    // Check if current user already reacted with this emoji
    const existingReaction = reactions.find(
      r => r.emoji === emoji && r.userId === currentUserId
    );

    if (existingReaction) {
      onRemoveReaction(existingReaction.id);
    } else {
      onAddReaction(emoji);
    }
    setShowPicker(false);
  };

  const hasReactions = Object.keys(groupedReactions).length > 0;

  return (
    <div className={cn('flex items-center gap-1 flex-wrap', className)}>
      {/* Existing reactions */}
      {Object.entries(groupedReactions).map(([emoji, reactionList]) => {
        const hasUserReacted = reactionList.some(r => r.userId === currentUserId);
        const userNames = reactionList.map(r => r.userName || 'User').join(', ');

        return (
          <button
            key={emoji}
            onClick={() => handleReactionClick(emoji)}
            title={userNames}
            className={cn(
              'flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs transition-all',
              'hover:bg-muted/80 active:scale-95',
              hasUserReacted
                ? 'bg-elec-yellow/20 border border-elec-yellow/50'
                : 'bg-muted/50 border border-transparent'
            )}
          >
            <span>{emoji}</span>
            <span className="text-muted-foreground">{reactionList.length}</span>
          </button>
        );
      })}

      {/* Add reaction button */}
      <Popover open={showPicker} onOpenChange={setShowPicker}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-6 w-6 rounded-full',
              hasReactions ? 'opacity-50 hover:opacity-100' : ''
            )}
          >
            {hasReactions ? <Plus className="h-3 w-3" /> : <Smile className="h-3.5 w-3.5" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 p-2"
          align="start"
          side="top"
        >
          <div className="space-y-2">
            {/* Quick reactions */}
            <div className="flex items-center justify-between">
              {QUICK_REACTIONS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleReactionClick(emoji)}
                  className="text-xl hover:scale-125 transition-transform p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* All reactions */}
            <div className="border-t pt-2">
              <div className="grid grid-cols-8 gap-1">
                {ALL_REACTIONS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleReactionClick(emoji)}
                    className="text-lg hover:bg-muted rounded p-1 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/**
 * Compact version for inline display
 */
export function ReactionBar({
  onReact,
  className,
}: {
  onReact: (emoji: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-0.5 bg-background/95 backdrop-blur rounded-full border shadow-sm px-1 py-0.5', className)}>
      {QUICK_REACTIONS.map(emoji => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className="text-sm hover:scale-110 transition-transform p-0.5"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
