
import React, { useState } from "react";
import { FolderKanban, Plus, Trash2, ChevronDown, ChevronUp, Building2 } from "lucide-react";
import { CVData, KeyProject } from "../types";
import { SmartContentAssistant } from "../ai/SmartContentAssistant";

interface KeyProjectsFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const KeyProjectsForm: React.FC<KeyProjectsFormProps> = ({ cvData, onChange }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const addProject = () => {
    const newProject: KeyProject = {
      id: `project-${Date.now()}`,
      title: '',
      client: '',
      value: '',
      role: '',
      description: '',
      completionDate: ''
    };
    onChange({
      ...cvData,
      keyProjects: [...cvData.keyProjects, newProject]
    });
    setExpandedProject(newProject.id);
  };

  const updateProject = (id: string, field: keyof KeyProject, value: string) => {
    onChange({
      ...cvData,
      keyProjects: cvData.keyProjects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...cvData,
      keyProjects: cvData.keyProjects.filter(project => project.id !== id)
    });
  };

  const handleAIContent = (projectId: string, content: string | string[]) => {
    if (typeof content === 'string') {
      updateProject(projectId, 'description', content);
    }
  };

  const getAIContext = (project: KeyProject) => ({
    projectTitle: project.title || 'Electrical Project',
    role: project.role || 'Electrician',
    client: project.client || '',
    existingDescription: project.description
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-elec-light mb-4 flex items-center gap-2">
          <FolderKanban className="h-5 w-5 text-elec-yellow" />
          Key Projects
        </h3>
        <p className="text-sm text-elec-light/60 mb-6">
          Showcase your most impressive electrical projects. This helps employers see the scale and type of work you've handled.
        </p>

        {/* Project Cards */}
        <div className="space-y-4">
          {cvData.keyProjects.map((project, index) => (
            <div
              key={project.id}
              className="border border-elec-light/20 rounded-xl overflow-hidden bg-elec-gray/30"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                className="w-full flex items-center justify-between p-4 text-left touch-manipulation"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-elec-light truncate">
                      {project.title || `Project ${index + 1}`}
                    </h4>
                    <p className="text-sm text-elec-light/60 truncate">
                      {project.client || project.role || 'Add details...'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(project.id);
                    }}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {expandedProject === project.id ? (
                    <ChevronUp className="h-5 w-5 text-elec-light/60" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-elec-light/60" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedProject === project.id && (
                <div className="p-4 pt-0 space-y-4 border-t border-elec-light/10">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-elec-light">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                      placeholder="e.g., Commercial Office Rewire"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-elec-light">
                        Client/Company
                      </label>
                      <input
                        type="text"
                        value={project.client || ''}
                        onChange={(e) => updateProject(project.id, 'client', e.target.value)}
                        className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                        placeholder="e.g., ABC Construction Ltd"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-elec-light">
                        Project Value
                      </label>
                      <input
                        type="text"
                        value={project.value || ''}
                        onChange={(e) => updateProject(project.id, 'value', e.target.value)}
                        className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                        placeholder="e.g., £50,000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-elec-light">
                        Your Role *
                      </label>
                      <input
                        type="text"
                        value={project.role}
                        onChange={(e) => updateProject(project.id, 'role', e.target.value)}
                        className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                        placeholder="e.g., Lead Electrician"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-elec-light">
                        Completion Date
                      </label>
                      <input
                        type="month"
                        value={project.completionDate || ''}
                        onChange={(e) => updateProject(project.id, 'completionDate', e.target.value)}
                        className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-elec-light">
                      Project Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none touch-manipulation"
                      placeholder="Describe the project scope, challenges, and your achievements..."
                      rows={4}
                    />
                    <p className="text-xs text-elec-light/60">
                      Include key details like: systems installed, team size, any challenges overcome
                    </p>
                  </div>

                  <SmartContentAssistant
                    type="project_description"
                    context={getAIContext(project)}
                    onContentGenerated={(content) => handleAIContent(project.id, content)}
                    currentContent={project.description}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Add Project Button */}
          <button
            onClick={addProject}
            className="w-full flex items-center justify-center gap-2 p-4 min-h-[56px] border-2 border-dashed border-elec-light/20 rounded-xl text-elec-light/60 hover:text-elec-yellow hover:border-elec-yellow/50 transition-colors touch-manipulation active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add Key Project</span>
          </button>

          {/* Tips */}
          {cvData.keyProjects.length === 0 && (
            <div className="p-4 bg-elec-gray/50 rounded-lg border border-elec-light/10">
              <h4 className="text-sm font-semibold text-elec-light mb-2">Project Ideas</h4>
              <ul className="text-xs text-elec-light/60 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
                  Large commercial installations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
                  Domestic rewires or new builds
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
                  Industrial control systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
                  EV charging installations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
                  Solar PV or battery storage
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
