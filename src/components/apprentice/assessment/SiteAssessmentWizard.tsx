import { siteAssessmentChecklist, sectionLabels, getCategoriesBySection } from "./data/siteAssessmentChecklist";
import SiteAssessmentCategory from "./SiteAssessmentCategory";
import SiteAssessmentSummary from "./SiteAssessmentSummary";
import type { useAssessmentProgress } from "./hooks/useAssessmentProgress";

interface SiteAssessmentWizardProps {
  progress: ReturnType<typeof useAssessmentProgress>;
}

const SiteAssessmentWizard = ({ progress }: SiteAssessmentWizardProps) => {
  const sections: ('pre-job' | 'site-condition' | 'electrical')[] = ['pre-job', 'site-condition', 'electrical'];

  const sectionColors: Record<string, string> = {
    'pre-job': 'bg-green-400',
    'site-condition': 'bg-blue-400',
    'electrical': 'bg-elec-yellow',
  };

  return (
    <div className="space-y-6">
      {sections.map(section => {
        const categories = getCategoriesBySection(section);
        const sectionConfig = sectionLabels[section];

        return (
          <div key={section} className="space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${sectionColors[section]}`} />
              {sectionConfig.label}
            </h3>

            {categories.map(category => {
              const itemIds = category.items.map(i => i.id);
              const categoryProgress = progress.getCategoryProgress(itemIds);

              return (
                <SiteAssessmentCategory
                  key={category.id}
                  category={category}
                  isChecked={progress.isChecked}
                  getNote={progress.getNote}
                  onToggle={progress.toggleCheckItem}
                  onNote={progress.addNote}
                  progress={categoryProgress}
                />
              );
            })}
          </div>
        );
      })}

      <SiteAssessmentSummary progress={progress} />
    </div>
  );
};

export default SiteAssessmentWizard;
