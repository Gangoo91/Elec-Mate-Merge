import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Mail,
  FileText,
  Home,
  ChevronRight,
  Plus,
  MoreVertical,
  Clock,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Customer } from '@/hooks/inspection/useCustomers';
import { cn } from '@/lib/utils';

interface CustomerListRowProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onStartCertificate: (customer: Customer) => void;
  onQuickNote: (customer: Customer) => void;
}

// Get gradient based on customer name initial
const getAvatarGradient = (name: string): string => {
  const colors = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-cyan-500 to-blue-500',
    'from-amber-500 to-orange-500',
    'from-rose-500 to-pink-500',
    'from-emerald-500 to-green-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const CustomerListRow = ({
  customer,
  onEdit,
  onDelete,
  onStartCertificate,
  onQuickNote,
}: CustomerListRowProps) => {
  const navigate = useNavigate();

  const formatLastActivity = (date?: string) => {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleViewDetails = () => {
    navigate(`/customers/${customer.id}`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (customer.phone) {
      window.location.href = `tel:${customer.phone}`;
    }
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (customer.email) {
      window.location.href = `mailto:${customer.email}`;
    }
  };

  const avatarGradient = getAvatarGradient(customer.name);
  const initials = getInitials(customer.name);

  return (
    <div
      onClick={handleViewDetails}
      className={cn(
        'flex items-center gap-3 p-4 rounded-2xl border cursor-pointer group transition-all touch-manipulation',
        'bg-white/[0.02] border-white/10',
        'hover:border-white/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/10',
        'active:scale-[0.98]'
      )}
    >
      {/* Avatar Badge */}
      <div
        className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0',
          'bg-gradient-to-br shadow-lg',
          avatarGradient
        )}
        style={{ boxShadow: `0 4px 14px -2px rgba(99, 102, 241, 0.25)` }}
      >
        <span className="text-white font-semibold text-sm">{initials}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Name and badges */}
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sm sm:text-base truncate">{customer.name}</h3>
          {(customer.certificateCount || 0) > 0 && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-5 flex-shrink-0 bg-white/10 border-white/20 text-foreground"
            >
              <FileText className="w-3 h-3 mr-0.5" />
              {customer.certificateCount}
            </Badge>
          )}
          {(customer.propertyCount || 0) > 0 && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-5 flex-shrink-0 hidden sm:flex bg-white/5 border-white/10"
            >
              <Home className="w-3 h-3 mr-0.5" />
              {customer.propertyCount}
            </Badge>
          )}
        </div>

        {/* Contact info with icons */}
        <div className="space-y-0.5">
          {customer.email && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
              <Mail className="w-3 h-3 flex-shrink-0 text-blue-400/60" />
              <span className="truncate">{customer.email}</span>
            </div>
          )}
          {customer.phone && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Phone className="w-3 h-3 flex-shrink-0 text-green-400/60" />
              <span>{customer.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3 flex-shrink-0 text-white/40" />
            <span>{formatLastActivity(customer.lastActivityAt)}</span>
          </div>
        </div>
      </div>

      {/* Quick action buttons - desktop */}
      <div className="hidden sm:flex items-center gap-1">
        {customer.phone && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCall}
            className="h-9 w-9 text-muted-foreground hover:text-green-400 hover:bg-green-400/10 active:text-green-500 active:scale-95 transition-all touch-manipulation rounded-xl"
            title="Call"
          >
            <Phone className="h-4 w-4" />
          </Button>
        )}
        {customer.email && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEmail}
            className="h-9 w-9 text-muted-foreground hover:text-blue-400 hover:bg-blue-400/10 active:text-blue-500 active:scale-95 transition-all touch-manipulation rounded-xl"
            title="Email"
          >
            <Mail className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onStartCertificate(customer);
          }}
          className="h-9 w-9 text-muted-foreground hover:text-amber-400 hover:bg-amber-400/10 active:text-amber-500 active:scale-95 transition-all touch-manipulation rounded-xl"
          title="New Certificate"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* More actions dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-9 sm:w-9 touch-manipulation flex-shrink-0 rounded-xl hover:bg-white/[0.06]"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-white/10">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="min-h-[44px] sm:min-h-[36px]"
          >
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onQuickNote(customer);
            }}
            className="min-h-[44px] sm:min-h-[36px]"
          >
            Add Note
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onStartCertificate(customer);
            }}
            className="min-h-[44px] sm:min-h-[36px] sm:hidden"
          >
            New Certificate
          </DropdownMenuItem>
          {customer.phone && (
            <DropdownMenuItem
              onClick={handleCall}
              className="min-h-[44px] sm:min-h-[36px] sm:hidden"
            >
              Call
            </DropdownMenuItem>
          )}
          {customer.email && (
            <DropdownMenuItem
              onClick={handleEmail}
              className="min-h-[44px] sm:min-h-[36px] sm:hidden"
            >
              Send Email
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onEdit(customer);
            }}
            className="min-h-[44px] sm:min-h-[36px]"
          >
            Edit Customer
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onDelete(customer.id);
            }}
            className="min-h-[44px] sm:min-h-[36px] text-red-400 focus:text-red-400 focus:bg-red-400/10"
          >
            Delete Customer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Chevron for navigation affordance */}
      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
    </div>
  );
};
