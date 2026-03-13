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
          'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium touch-manipulation',
          'transition-all duration-150 ease-out',
          isActive ? 'bg-elec-yellow/[0.12] text-white' : 'text-white hover:bg-white/5'
        )}
      >
        <span
          className={cn(
            'shrink-0 transition-colors duration-150',
            isActive ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {item.icon}
        </span>
        <span className={isActive ? 'font-semibold' : ''}>{item.name}</span>
        {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-elec-yellow" />}
      </SafeLink>
    );
  } catch (error) {
    console.warn('SidebarNavLink: Router context not available', error);
    // Fallback: render without Link functionality
    return (
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium',
          'text-white hover:bg-white/5'
        )}
      >
        <span className="shrink-0 text-white">{item.icon}</span>
        <span>{item.name}</span>
      </div>
    );
  }
};

export default SidebarNavLink;
