
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/project-management/ProjectCard";
import { ProjectManagementSkeletonCard } from "@/components/ui/skeleton-card";

type ProjectListProps = {
  projects: Project[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
};

export const ProjectList = ({ projects, onView, onEdit, onDelete, isLoading = false }: ProjectListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {isLoading ? (
        // Show skeleton loading cards
        Array.from({ length: 6 }, (_, index) => (
          <ProjectManagementSkeletonCard key={`skeleton-${index}`} />
        ))
      ) : (
        // Show actual project data
        projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};
