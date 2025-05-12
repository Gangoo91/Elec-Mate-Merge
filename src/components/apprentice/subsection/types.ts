
export interface SubsectionProps {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
  isElectricalTheory?: boolean;
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
}
