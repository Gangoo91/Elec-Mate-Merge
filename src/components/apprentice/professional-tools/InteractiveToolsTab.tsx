import ToolBudgetCalculator from './ToolBudgetCalculator';
import ToolChecklistGenerator from './ToolChecklistGenerator';

const InteractiveToolsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Interactive tools
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Use these tools to plan your toolkit investment and create project-specific equipment
          lists.
        </p>
      </div>

      <ToolBudgetCalculator />

      <ToolChecklistGenerator />

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Pro tip
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Download your checklists before heading to site to ensure you have all necessary tools.
          Update your budget calculator as your toolkit grows.
        </p>
      </div>
    </div>
  );
};

export default InteractiveToolsTab;
