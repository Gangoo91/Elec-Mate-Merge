
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/project-management/ProjectCard";

type ProjectListProps = {
  projects: Project[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const ProjectList = ({ projects, onView, onEdit, onDelete }: ProjectListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
