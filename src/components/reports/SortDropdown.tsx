import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";

export type SortOption = 
  | 'date-desc'
  | 'date-asc'
  | 'cert-asc'
  | 'cert-desc'
  | 'client-asc'
  | 'client-desc'
  | 'modified-desc'
  | 'modified-asc'
  | 'status';

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortDropdown = ({ sortBy, onSortChange }: SortDropdownProps) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'date-desc', label: 'Date Created (Newest First)' },
    { value: 'date-asc', label: 'Date Created (Oldest First)' },
    { value: 'cert-asc', label: 'Certificate Number (A-Z)' },
    { value: 'cert-desc', label: 'Certificate Number (Z-A)' },
    { value: 'client-asc', label: 'Client Name (A-Z)' },
    { value: 'client-desc', label: 'Client Name (Z-A)' },
    { value: 'modified-desc', label: 'Last Modified (Newest First)' },
    { value: 'modified-asc', label: 'Last Modified (Oldest First)' },
    { value: 'status', label: 'Status' },
  ];

  const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={sortBy === option.value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
