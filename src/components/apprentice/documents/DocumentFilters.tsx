
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  documentType: string;
  onDocumentTypeChange: (value: string) => void;
}

const DocumentFilters = ({ searchQuery, onSearchChange, documentType, onDocumentTypeChange }: DocumentFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          className="pl-8 bg-elec-dark border-elec-yellow/20"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={documentType} onValueChange={onDocumentTypeChange}>
        <SelectTrigger className="w-[180px] bg-elec-dark border-elec-yellow/20">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent className="bg-elec-dark border-elec-yellow/20">
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="PDF Form">PDF Forms</SelectItem>
          <SelectItem value="Word Document">Word Documents</SelectItem>
          <SelectItem value="Excel Sheet">Excel Sheets</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentFilters;
