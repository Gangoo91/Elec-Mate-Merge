import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

/**
 * Consistent search input for admin pages
 */
export default function AdminSearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  autoFocus = false,
}: AdminSearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 h-12 touch-manipulation text-base rounded-xl"
        autoFocus={autoFocus}
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
