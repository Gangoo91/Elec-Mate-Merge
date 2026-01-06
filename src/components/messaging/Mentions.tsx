import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface MentionUser {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: string;
}

interface MentionSuggestionsProps {
  users: MentionUser[];
  query: string;
  onSelect: (user: MentionUser) => void;
  selectedIndex: number;
  className?: string;
}

/**
 * Dropdown for @mention suggestions
 */
export function MentionSuggestions({
  users,
  query,
  onSelect,
  selectedIndex,
  className,
}: MentionSuggestionsProps) {
  // Filter users by query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredUsers.length === 0) {
    return (
      <div className={cn('p-3 text-sm text-muted-foreground text-center', className)}>
        No users found
      </div>
    );
  }

  return (
    <div className={cn('py-1', className)}>
      {filteredUsers.map((user, index) => (
        <button
          key={user.id}
          onClick={() => onSelect(user)}
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors',
            selectedIndex === index && 'bg-muted'
          )}
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="text-xs">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium">{user.name}</p>
            {user.role && (
              <p className="text-xs text-muted-foreground">{user.role}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

/**
 * Render text with highlighted mentions
 */
interface MentionTextProps {
  text: string;
  mentions?: Array<{ userId: string; userName: string }>;
  currentUserId?: string;
  onMentionClick?: (userId: string) => void;
  className?: string;
}

export function MentionText({
  text,
  mentions = [],
  currentUserId,
  onMentionClick,
  className,
}: MentionTextProps) {
  // Parse @mentions from text
  const mentionRegex = /@(\w+(?:\s\w+)?)/g;
  const parts: Array<{ type: 'text' | 'mention'; content: string; userId?: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    // Add text before mention
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      });
    }

    // Find matching mention data
    const mentionName = match[1];
    const mentionData = mentions.find(m =>
      m.userName.toLowerCase() === mentionName.toLowerCase()
    );

    parts.push({
      type: 'mention',
      content: `@${mentionName}`,
      userId: mentionData?.userId,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex),
    });
  }

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === 'mention') {
          const isSelfMention = part.userId === currentUserId;
          return (
            <span
              key={index}
              onClick={() => part.userId && onMentionClick?.(part.userId)}
              className={cn(
                'font-medium cursor-pointer hover:underline',
                isSelfMention
                  ? 'text-elec-yellow bg-elec-yellow/20 px-0.5 rounded'
                  : 'text-blue-500'
              )}
            >
              {part.content}
            </span>
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </span>
  );
}

/**
 * Hook to handle @mentions in a text input
 */
interface UseMentionsOptions {
  users: MentionUser[];
  onMentionComplete?: (user: MentionUser, position: { start: number; end: number }) => void;
}

export function useMentions({ users, onMentionComplete }: UseMentionsOptions) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mentionStart, setMentionStart] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const handleInputChange = useCallback((
    value: string,
    cursorPosition: number
  ) => {
    // Check if we're in a mention context
    const textBeforeCursor = value.slice(0, cursorPosition);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      setShowSuggestions(true);
      setMentionQuery(mentionMatch[1]);
      setMentionStart(mentionMatch.index!);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
      setMentionQuery('');
      setMentionStart(null);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredUsers.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : filteredUsers.length - 1
        );
        break;
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        if (filteredUsers[selectedIndex]) {
          selectMention(filteredUsers[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  }, [showSuggestions, filteredUsers, selectedIndex]);

  const selectMention = useCallback((user: MentionUser) => {
    if (mentionStart !== null && onMentionComplete) {
      onMentionComplete(user, {
        start: mentionStart,
        end: mentionStart + mentionQuery.length + 1, // +1 for @
      });
    }
    setShowSuggestions(false);
    setMentionQuery('');
    setMentionStart(null);
  }, [mentionStart, mentionQuery, onMentionComplete]);

  const insertMention = useCallback((
    currentValue: string,
    user: MentionUser
  ): string => {
    if (mentionStart === null) return currentValue;

    const before = currentValue.slice(0, mentionStart);
    const after = currentValue.slice(mentionStart + mentionQuery.length + 1);
    return `${before}@${user.name} ${after}`;
  }, [mentionStart, mentionQuery]);

  return {
    showSuggestions,
    mentionQuery,
    selectedIndex,
    filteredUsers,
    inputRef,
    handleInputChange,
    handleKeyDown,
    selectMention,
    insertMention,
    closeSuggestions: () => setShowSuggestions(false),
  };
}

/**
 * Extract mentions from text
 */
export function extractMentions(text: string): string[] {
  const mentionRegex = /@(\w+(?:\s\w+)?)/g;
  const mentions: string[] = [];
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    mentions.push(match[1]);
  }

  return [...new Set(mentions)];
}

/**
 * Replace @mention with user data
 */
export function replaceMentionWithData(
  text: string,
  userName: string,
  userId: string
): { text: string; mention: { userId: string; userName: string } } {
  const mentionRegex = new RegExp(`@${userName}\\b`, 'gi');
  const newText = text.replace(mentionRegex, `@${userName}`);

  return {
    text: newText,
    mention: { userId, userName },
  };
}
