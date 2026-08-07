import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { NavItem } from './SidebarNavItems';
import SafeLink from '@/components/common/SafeLink';
import { prefetchPeerSupportData } from '@/hooks/usePeerChat';

interface SidebarNavLinkProps {
  item: NavItem;
  onItemClick?: () => void;
}

const SidebarNavLink = ({ item, onItemClick }: SidebarNavLinkProps) => {
  try {
    const location = useLocation();
    const queryClient = useQueryClient();
    const isActive =
      location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

    const handleClick = () => {
      // Call the onItemClick prop if provided (for closing mobile sidebar)
      onItemClick?.();
    };

    const handleMouseEnter = () => {
      // Prefetch data for specific routes on hover
      if (item.path === '/mental-health') {
        prefetchPeerSupportData(queryClient);
      }
    };

    return (
      <SafeLink
        to={item.path}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          'group relative flex items-center justify-between overflow-hidden rounded-2xl py-3 pl-4 pr-3 text-[15px] touch-manipulation',
          'transition-[background-color,border-color] duration-200 ease-out active:scale-[0.98]',
          // Border on BOTH states. It was only on the active item, so every
          // item grew 2px the moment you navigated to it and the whole list
          // shifted under the cursor.
          'border',
          isActive
            ? 'border-elec-yellow/35 bg-white/[0.09]'
            : 'border-transparent hover:border-white/[0.10] hover:bg-white/[0.06]'
        )}
      >
        {/* "You are here" on the LEFT edge, which is where every other list in
            the app puts it — the work list, the notification rows. It was a
            floating pill on the right, reading more like a scrollbar than a
            position marker. */}
        {isActive && (
          <span
            aria-hidden
            className="absolute inset-y-1.5 left-0 w-[3px] rounded-r-full bg-elec-yellow"
          />
        )}
        <span className={cn(
          'flex items-center gap-2 transition-colors duration-200',
          isActive ? 'text-elec-yellow font-semibold tracking-tight' : 'text-white font-medium'
        )}>
          {item.name}
          {item.badge && (
            <span
              className={cn(
                // Outline + text, no fill. A translucent volt or amber fill
                // goes muddy brown on this ground; a border does not.
                'rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                item.badgeVariant === 'early'
                  ? 'border border-white/[0.30] text-white'
                  : 'border border-elec-yellow/50 text-elec-yellow'
              )}
            >
              {item.badge}
            </span>
          )}
        </span>
      </SafeLink>
    );
  } catch (error) {
    console.warn('SidebarNavLink: Router context not available', error);
    // Fallback: render without Link functionality
    return (
      <div className="flex items-center rounded-2xl border border-transparent py-3 pl-4 pr-3 text-[15px] font-medium text-white">
        <span>{item.name}</span>
      </div>
    );
  }
};

export default SidebarNavLink;
