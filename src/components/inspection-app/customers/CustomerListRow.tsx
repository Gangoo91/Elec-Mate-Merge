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

  return (
    <div
      onClick={handleViewDetails}
      className={cn(
        'flex items-center gap-3 p-3 sm:p-4 bg-card rounded-lg border border-border',
        'hover:border-elec-yellow/40 hover:bg-card/80 transition-all cursor-pointer',
        'touch-manipulation'
      )}
    >
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Name and badges */}
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sm sm:text-base truncate">{customer.name}</h3>
          {(customer.certificateCount || 0) > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 flex-shrink-0">
              <FileText className="w-3 h-3 mr-0.5" />
              {customer.certificateCount}
            </Badge>
          )}
          {(customer.propertyCount || 0) > 0 && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 flex-shrink-0 hidden sm:flex">
              <Home className="w-3 h-3 mr-0.5" />
              {customer.propertyCount}
            </Badge>
          )}
        </div>

        {/* Contact info - visible on larger screens */}
        <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
          {customer.email && (
            <span className="flex items-center gap-1 truncate max-w-[200px]">
              <Mail className="w-3 h-3 flex-shrink-0" />
              {customer.email}
            </span>
          )}
          {customer.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 flex-shrink-0" />
              {customer.phone}
            </span>
          )}
        </div>

        {/* Last activity */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <Clock className="w-3 h-3" />
          <span>{formatLastActivity(customer.lastActivityAt)}</span>
        </div>
      </div>

      {/* Quick action buttons - desktop */}
      <div className="hidden sm:flex items-center gap-1">
        {customer.phone && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCall}
            className="h-9 w-9 text-muted-foreground hover:text-green-400"
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
            className="h-9 w-9 text-muted-foreground hover:text-blue-400"
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
          className="h-9 w-9 text-muted-foreground hover:text-elec-yellow"
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
            className="h-10 w-10 sm:h-9 sm:w-9 touch-manipulation flex-shrink-0"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
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
          <DropdownMenuSeparator />
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
            className="min-h-[44px] sm:min-h-[36px] text-red-500 focus:text-red-500"
          >
            Delete Customer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Chevron for mobile */}
      <ChevronRight className="h-5 w-5 text-muted-foreground sm:hidden flex-shrink-0" />
    </div>
  );
};
