import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Download, Eye, Loader2 } from 'lucide-react';
import { useUnifiedCPD } from '@/hooks/cpd/useUnifiedCPD';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CPDHistory = () => {
  const { entries, loading } = useUnifiedCPD();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const categoryNames: Record<string, string> = {
    'technical-skills': 'Technical Skills',
    'regulations-standards': 'Regulations & Standards',
    'safety-health': 'Safety & Health',
    'business-commercial': 'Business & Commercial',
    'professional-ethics': 'Professional Ethics',
    'environmental-sustainability': 'Environmental Sustainability',
    'digital-technology': 'Digital Technology',
    'customer-service': 'Customer Service',
  };

  const activityTypeNames: Record<string, string> = {
    'formal-training': 'Formal Training',
    'work-based-learning': 'Work-based Learning',
    'self-directed-study': 'Self-directed Study',
    'professional-activities': 'Professional Activities',
    'conferences-seminars': 'Conferences & Seminars',
    mentoring: 'Mentoring',
    'assessment-preparation': 'Assessment Preparation',
  };

  const categories = Object.entries(categoryNames);

  const years = useMemo(() => {
    const entryYears = entries.map((entry) =>
      new Date(entry.date_completed).getFullYear().toString()
    );
    return [...new Set(entryYears)].sort().reverse();
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || entry.category === categoryFilter;
      const matchesYear = yearFilter === 'all' || entry.date_completed.startsWith(yearFilter);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'verified' && entry.is_verified) ||
        (statusFilter === 'pending' && !entry.is_verified);

      return matchesSearch && matchesCategory && matchesYear && matchesStatus;
    });
  }, [entries, searchTerm, categoryFilter, yearFilter, statusFilter]);

  const totalHours = filteredEntries.reduce(
    (sum, entry) => sum + parseFloat(entry.hours.toString()),
    0
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Filter CPD records
        </span>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="relative md:col-span-2">
            {!searchTerm && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/55 pointer-events-none" />
            )}
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                'h-11 bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 touch-manipulation',
                !searchTerm && 'pl-10'
              )}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-11 bg-white/[0.03] border-white/10 text-white touch-manipulation">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/10">
              <SelectItem value="all">All categories</SelectItem>
              {categories.map(([id, name]) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="h-11 bg-white/[0.03] border-white/10 text-white touch-manipulation">
              <SelectValue placeholder="All years" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/10">
              <SelectItem value="all">All years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-11 bg-white/[0.03] border-white/10 text-white touch-manipulation">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/10">
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-4 text-[13px] text-white/85">
            <span>
              <span className="text-white/55">Entries: </span>
              {filteredEntries.length}
            </span>
            <span>
              <span className="text-white/55">Total: </span>
              <span className="text-white font-mono">{totalHours} hours</span>
            </span>
          </div>
          <Button
            variant="outline"
            className="h-10 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            disabled={filteredEntries.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3 text-white/55" />
          <p className="text-[14px] text-white/70">Loading CPD entries...</p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center space-y-2">
          <h3 className="text-[16px] font-semibold text-white">No entries found</h3>
          <p className="text-[14px] text-white/70 leading-relaxed">
            No CPD entries match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-[15px] font-semibold text-white">{entry.title}</h3>
                      {entry.description && (
                        <p className="text-[13px] text-white/70 line-clamp-2">
                          {entry.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                        {entry.is_verified ? 'Verified' : 'Pending'}
                      </span>
                      {entry.evidence_files && entry.evidence_files.length > 0 && (
                        <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                          Evidence
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      {format(new Date(entry.date_completed), 'dd MMM yyyy')}
                    </span>
                    <span className="text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                      {entry.hours} hours
                    </span>
                    <span className="text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      {categoryNames[entry.category] || entry.category}
                    </span>
                    <span className="text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      {activityTypeNames[entry.activity_type] || entry.activity_type}
                    </span>
                  </div>

                  {entry.learning_outcomes && entry.learning_outcomes.length > 0 && (
                    <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-2.5 space-y-1">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Learning outcomes
                      </span>
                      <p className="text-[12px] text-white/85">
                        {entry.learning_outcomes.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 border-white/15 text-white hover:bg-white/[0.05] flex-shrink-0 touch-manipulation"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CPDHistory;
