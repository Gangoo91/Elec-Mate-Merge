import { ppeItems, ppeTip } from '@/data/professional-tools/ppeData';

const PPESafetyPanel = () => {
  const dailyItems = ppeItems.filter((item) => item.group === 'daily');
  const taskItems = ppeItems.filter((item) => item.group === 'task-specific');

  const groups = [
    {
      id: 'daily',
      title: 'Daily Essentials',
      count: `${dailyItems.length} items`,
      items: dailyItems,
    },
    {
      id: 'task-specific',
      title: 'Task-Specific PPE',
      count: `${taskItems.length} items`,
      items: taskItems,
    },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Flat, not collapsed. PPE especially: the copy above says every item on
          this list exists because someone was seriously injured without it, and
          then the list itself was hidden behind a chevron. */}
      {groups.map((group) => (
        <section key={group.id} className="space-y-3 pt-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">{group.title}</h3>
            <span className="text-[12px] text-white">{group.count}</span>
          </div>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-[14px] font-semibold text-white">{item.name}</h4>
                  <span className="text-[12px] text-white px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-[14px] text-white leading-relaxed">{item.description}</p>
                <div className="text-[13px] text-white space-y-1">
                  <div>
                    <span className="font-medium">Standard:</span> {item.standard}
                  </div>
                  <div>
                    <span className="font-medium">Replace:</span> {item.replacementFrequency}
                  </div>
                </div>
                {item.apprenticeTip && (
                  <div className="rounded-lg border border-elec-yellow/20 bg-white/[0.05] p-3 space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                      Tip
                    </span>
                    <p className="text-[14px] text-white leading-relaxed">{item.apprenticeTip}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="rounded-xl border border-elec-yellow/20 bg-white/[0.05] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Remember
        </span>
        <p className="text-[14px] text-white leading-relaxed">{ppeTip}</p>
      </div>
    </div>
  );
};

export default PPESafetyPanel;
