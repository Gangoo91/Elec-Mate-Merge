import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileInput } from "@/components/ui/mobile-input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { CVData } from "../types";

interface SmartCVWizardProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

type StepKey = 'skills' | 'experience' | 'education' | 'projects';

export const SmartCVWizard: React.FC<SmartCVWizardProps> = ({ cvData, onChange }) => {
  const [currentStep, setCurrentStep] = useState<StepKey>('skills');
  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newProject, setNewProject] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !cvData.skills.includes(newSkill.trim())) {
      onChange({
        ...cvData,
        skills: [...cvData.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange({
      ...cvData,
      skills: cvData.skills.filter(s => s !== skill)
    });
  };

  const addExperience = () => {
    if (newExperience.trim() && !cvData.experience.includes(newExperience.trim())) {
      onChange({
        ...cvData,
        experience: [...cvData.experience, newExperience.trim()]
      });
      setNewExperience("");
    }
  };

  const removeExperience = (experience: string) => {
    onChange({
      ...cvData,
      experience: cvData.experience.filter(e => e !== experience)
    });
  };

  const addEducation = () => {
    if (newEducation.trim() && !cvData.education.includes(newEducation.trim())) {
      onChange({
        ...cvData,
        education: [...cvData.education, newEducation.trim()]
      });
      setNewEducation("");
    }
  };

  const removeEducation = (education: string) => {
    onChange({
      ...cvData,
      education: cvData.education.filter(e => e !== education)
    });
  };

  const addProject = () => {
    if (newProject.trim() && !cvData.projects.includes(newProject.trim())) {
      onChange({
        ...cvData,
        projects: [...cvData.projects, newProject.trim()]
      });
      setNewProject("");
    }
  };

  const removeProject = (project: string) => {
    onChange({
      ...cvData,
      projects: cvData.projects.filter(p => p !== project)
    });
  };

  const suggestedSkills = [
    "Electrical Installation", "Wiring", "Testing & Inspection", "PAT Testing",
    "Circuit Design", "Fault Finding", "Health & Safety", "BS 7671 Regulations",
  ];

  const suggestedExperience = [
    "Electrician", "Electrical Engineer", "Electrical Technician", "Electrical Apprentice",
  ];

  const suggestedEducation = [
    "Level 3 Electrical Installation", "18th Edition Wiring Regulations", "City & Guilds 2365",
  ];

  const suggestedProjects = [
    "Domestic Wiring", "Commercial Installation", "Industrial Maintenance", "Solar Panel Installation",
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Smart CV Builder</h2>

      {/* Skills Step */}
      {currentStep === 'skills' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Select Your Skills</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Add your technical skills and expertise. You can select from suggestions or add your own.
            </p>
          </div>

          {/* Add Skill Input */}
          <div className="flex flex-col gap-2">
            <MobileInput
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              placeholder="Enter a skill..."
              className="w-full"
            />
            <Button
              onClick={addSkill}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>

          {/* Selected Skills Display */}
          {cvData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 pr-1"
                >
                  {skill}
                  <Button
                    onClick={() => removeSkill(skill)}
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1 hover:bg-red-500/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Suggested Skills */}
          <div>
            <Label className="text-white text-sm">Suggested Skills:</Label>
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestedSkills
                .filter(skill => !cvData.skills.includes(skill))
                .slice(0, 6)
                .map((skill, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      onChange({
                        ...cvData,
                        skills: [...cvData.skills, skill]
                      });
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
                  >
                    + {skill}
                  </Button>
                ))}
            </div>
          </div>

          <Button onClick={() => setCurrentStep('experience')} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Next: Experience
          </Button>
        </div>
      )}

      {/* Experience Step */}
      {currentStep === 'experience' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Add Your Experience</h3>
            <p className="text-muted-foreground text-sm mb-4">
              List your relevant work experience.
            </p>
          </div>

          {/* Add Experience Input */}
          <div className="flex flex-col gap-2">
            <MobileInput
              value={newExperience}
              onChange={(e) => setNewExperience(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addExperience()}
              placeholder="Enter a job title..."
              className="w-full"
            />
            <Button
              onClick={addExperience}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>

          {/* Display Experience */}
          {cvData.experience.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cvData.experience.map((exp, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-400 border-blue-500/30 pr-1"
                >
                  {exp}
                  <Button
                    onClick={() => removeExperience(exp)}
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1 hover:bg-red-500/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Suggested Experience */}
          <div>
            <Label className="text-white text-sm">Suggested Experience:</Label>
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestedExperience
                .filter(exp => !cvData.experience.includes(exp))
                .slice(0, 6)
                .map((exp, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      onChange({
                        ...cvData,
                        experience: [...cvData.experience, exp]
                      });
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs border-blue-500/30 hover:bg-blue-500/10 text-white"
                  >
                    + {exp}
                  </Button>
                ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setCurrentStep('skills')} variant="outline">
              Previous: Skills
            </Button>
            <Button onClick={() => setCurrentStep('education')} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next: Education
            </Button>
          </div>
        </div>
      )}

      {/* Education Step */}
      {currentStep === 'education' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Add Your Education</h3>
            <p className="text-muted-foreground text-sm mb-4">
              List your relevant education and qualifications.
            </p>
          </div>

          {/* Add Education Input */}
          <div className="flex flex-col gap-2">
            <MobileInput
              value={newEducation}
              onChange={(e) => setNewEducation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addEducation()}
              placeholder="Enter a qualification..."
              className="w-full"
            />
            <Button
              onClick={addEducation}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>

          {/* Display Education */}
          {cvData.education.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cvData.education.map((edu, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-green-500/20 text-green-400 border-green-500/30 pr-1"
                >
                  {edu}
                  <Button
                    onClick={() => removeEducation(edu)}
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1 hover:bg-red-500/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Suggested Education */}
          <div>
            <Label className="text-white text-sm">Suggested Education:</Label>
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestedEducation
                .filter(edu => !cvData.education.includes(edu))
                .slice(0, 6)
                .map((edu, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      onChange({
                        ...cvData,
                        education: [...cvData.education, edu]
                      });
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs border-green-500/30 hover:bg-green-500/10 text-white"
                  >
                    + {edu}
                  </Button>
                ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setCurrentStep('experience')} variant="outline">
              Previous: Experience
            </Button>
            <Button onClick={() => setCurrentStep('projects')} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next: Projects
            </Button>
          </div>
        </div>
      )}

      {/* Projects Step */}
      {currentStep === 'projects' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Add Your Projects</h3>
            <p className="text-muted-foreground text-sm mb-4">
              List any personal or professional projects you've worked on.
            </p>
          </div>

          {/* Add Project Input */}
          <div className="flex flex-col gap-2">
            <MobileInput
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addProject()}
              placeholder="Enter a project..."
              className="w-full"
            />
            <Button
              onClick={addProject}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>

          {/* Display Projects */}
          {cvData.projects.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cvData.projects.map((project, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 pr-1"
                >
                  {project}
                  <Button
                    onClick={() => removeProject(project)}
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1 hover:bg-red-500/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Suggested Projects */}
          <div>
            <Label className="text-white text-sm">Suggested Projects:</Label>
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestedProjects
                .filter(project => !cvData.projects.includes(project))
                .slice(0, 6)
                .map((project, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      onChange({
                        ...cvData,
                        projects: [...cvData.projects, project]
                      });
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs border-yellow-500/30 hover:bg-yellow-500/10 text-white"
                  >
                    + {project}
                  </Button>
                ))}
            </div>
          </div>

          <Button onClick={() => setCurrentStep('education')} variant="outline">
            Previous: Education
          </Button>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Generate CV
          </Button>
        </div>
      )}
    </div>
  );
};
