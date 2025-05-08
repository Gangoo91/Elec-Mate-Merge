
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '@/types/project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects from localStorage on initial load
    const loadProjects = () => {
      try {
        const storedProjects = localStorage.getItem('electrician-projects');
        if (storedProjects) {
          setProjects(JSON.parse(storedProjects));
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Save projects to localStorage whenever the projects state changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('electrician-projects', JSON.stringify(projects));
    }
  }, [projects, loading]);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id 
          ? { 
              ...project, 
              ...projectData, 
              updatedAt: new Date().toISOString() 
            } 
          : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    getProject,
  };
};
