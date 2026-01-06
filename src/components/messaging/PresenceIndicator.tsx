import { cn } from '@/lib/utils';
import { formatLastSeen, getStatusColor } from '@/services/presenceService';

interface PresenceIndicatorProps {
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

/**
 * Online/offline status indicator dot
 */
export function PresenceIndicator({
  status,
  lastSeen,
  size = 'md',
  showLabel = false,
  className,
}: PresenceIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  const statusColor = getStatusColor(status);

  const getLabel = () => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'offline':
        return lastSeen ? `Last seen ${formatLastSeen(lastSeen)}` : 'Offline';
      default:
        return '';
    }
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span
        className={cn(
          'rounded-full',
          sizeClasses[size],
          statusColor,
          status === 'online' && 'animate-pulse'
        )}
      />
      {showLabel && (
        <span className="text-xs text-muted-foreground">{getLabel()}</span>
      )}
    </div>
  );
}

/**
 * Avatar with presence indicator overlay
 */
interface AvatarWithPresenceProps {
  children: React.ReactNode;
  status: 'online' | 'away' | 'offline';
  className?: string;
}

export function AvatarWithPresence({
  children,
  status,
  className,
}: AvatarWithPresenceProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      <span
        className={cn(
          'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
          getStatusColor(status),
          status === 'online' && 'animate-pulse'
        )}
      />
    </div>
  );
}

/**
 * Status badge (more prominent display)
 */
interface StatusBadgeProps {
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
  className?: string;
}

export function StatusBadge({ status, lastSeen, className }: StatusBadgeProps) {
  const getBadgeStyles = () => {
    switch (status) {
      case 'online':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'away':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'offline':
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'offline':
        return lastSeen ? formatLastSeen(lastSeen) : 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
        getBadgeStyles(),
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          getStatusColor(status)
        )}
      />
      {getLabel()}
    </span>
  );
}

/**
 * "X is online" notification toast content
 */
interface PresenceNotificationProps {
  userName: string;
  status: 'online' | 'offline';
  avatarUrl?: string;
}

export function PresenceNotification({
  userName,
  status,
  avatarUrl,
}: PresenceNotificationProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-medium">{userName.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
            status === 'online' ? 'bg-green-500' : 'bg-gray-400'
          )}
        />
      </div>
      <div>
        <p className="font-medium">{userName}</p>
        <p className="text-sm text-muted-foreground">
          {status === 'online' ? 'is now online' : 'went offline'}
        </p>
      </div>
    </div>
  );
}
