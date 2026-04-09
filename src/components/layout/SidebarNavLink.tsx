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
          'group flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] touch-manipulation',
          'transition-all duration-200 ease-out active:scale-[0.98]',
          isActive
            ? 'bg-white/[0.08] border border-white/[0.1]'
            : 'hover:bg-white/[0.03]'
        )}
      >
        <span className={cn(
          'transition-colors duration-200',
          isActive ? 'text-elec-yellow font-semibold tracking-tight' : 'text-white font-medium'
        )}>
          {item.name}
        </span>
        {isActive && (
          <span className="w-1.5 h-5 rounded-full bg-elec-yellow" />
        )}
      </SafeLink>
    );
  } catch (error) {
    console.warn('SidebarNavLink: Router context not available', error);
    // Fallback: render without Link functionality
    return (
      <div className="flex items-center px-4 py-3 rounded-2xl text-[15px] font-medium text-white">
        <span>{item.name}</span>
      </div>
    );
  }
};

export default SidebarNavLink;
