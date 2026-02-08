/**
 * VideoSearchBar
 *
 * Search input for filtering videos.
 */

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface VideoSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function VideoSearchBar({ value, onChange }: VideoSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search electrical training videos..."
        className="h-11 pl-10 pr-10 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation"
        >
          <X className="h-4 w-4 text-white/40" />
        </button>
      )}
    </div>
  );
}
