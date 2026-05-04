import { PortfolioCategory, PortfolioEntry } from '@/types/portfolio';

interface PortfolioCategoriesOverviewProps {
  categories: PortfolioCategory[];
  entries: PortfolioEntry[];
}

const PortfolioCategoriesOverview = ({ categories, entries }: PortfolioCategoriesOverviewProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category) => {
          const categoryEntries = entries.filter((entry) => entry.category.id === category.id);
          const completedEntries = categoryEntries.filter(
            (entry) => entry.status === 'completed'
          ).length;
          const progress = Math.min((completedEntries / category.requiredEntries) * 100, 100);

          return (
            <div
              key={category.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 truncate">
                  {category.name}
                </span>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono flex-shrink-0">
                  {completedEntries}/{category.requiredEntries}
                </span>
              </div>

              <p className="text-[13px] text-white/70 leading-relaxed line-clamp-2">
                {category.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-white/55">Progress</span>
                  <span className="text-white/85 font-mono">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-elec-yellow transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[16px] font-mono text-white">{categoryEntries.length}</p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
                      Total
                    </p>
                  </div>
                  <div>
                    <p className="text-[16px] font-mono text-white">{completedEntries}</p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
                      Complete
                    </p>
                  </div>
                  <div>
                    <p className="text-[16px] font-mono text-white">
                      {categoryEntries.filter((e) => e.status === 'in-progress').length}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
                      Progress
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Recent activity
        </span>

        {entries.length === 0 ? (
          <p className="text-[14px] text-white/55 leading-relaxed text-center py-6">
            No portfolio entries yet. Start by adding your first entry.
          </p>
        ) : (
          <div className="space-y-2">
            {entries
              .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
              .slice(0, 3)
              .map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-white truncate">{entry.title}</p>
                    <p className="text-[11px] text-white/55 mt-0.5 font-mono">
                      {entry.category.name} ·{' '}
                      {new Date(entry.dateCreated).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] flex-shrink-0">
                    {entry.status}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCategoriesOverview;
