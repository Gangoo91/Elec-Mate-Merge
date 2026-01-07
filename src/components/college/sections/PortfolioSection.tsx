import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import CollegePortfolioHub from "@/components/college/portfolio/CollegePortfolioHub";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";

interface PortfolioSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

export function PortfolioSection({ onNavigate }: PortfolioSectionProps) {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Student Portfolios"
        description="Manage student portfolios, review submissions, and track EPA gateway progress"
      />

      <CollegePortfolioHub />
    </div>
  );
}
