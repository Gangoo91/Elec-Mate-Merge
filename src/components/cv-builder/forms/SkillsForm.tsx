
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { CVData } from "../types";

interface SkillsFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ cvData, onChange }) => {
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

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

  const addCertification = () => {
    if (newCertification.trim() && !cvData.certifications.includes(newCertification.trim())) {
      onChange({
        ...cvData,
        certifications: [...cvData.certifications, newCertification.trim()]
      });
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    onChange({
      ...cvData,
      certifications: cvData.certifications.filter(c => c !== cert)
    });
  };

  const suggestedSkills = [
    "Electrical Installation", "Wiring", "Testing & Inspection", "PAT Testing",
    "Circuit Design", "Fault Finding", "Health & Safety", "BS 7671 Regulations",
    "NICEIC Knowledge", "Solar Panel Installation", "Emergency Lighting",
    "Fire Alarm Systems", "CCTV Systems", "LED Lighting", "Three Phase Systems"
  ];

  const suggestedCertifications = [
    "18th Edition Wiring Regulations", "Level 3 Electrical Installation",
    "2391 Testing & Inspection", "PAT Testing Certification", "NICEIC Approved",
    "ECS Gold Card", "IPAF Licence", "First Aid Certificate", "CSCS Card",
    "City & Guilds 2365", "AM2 Assessment", "Level 2 Electrical Installation"
  ];

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              placeholder="Add a skill..."
              className="bg-elec-dark border-elec-yellow/20 text-white"
            />
            <Button
              onClick={addSkill}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

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

          <div>
            <Label className="text-white text-sm">Suggested Skills:</Label>
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestedSkills
                .filter(skill => !cvData.skills.includes(skill))
                .slice(0, 8)
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
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Certifications & Qualifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCertification()}
              placeholder="Add a certification..."
              className="bg-elec-dark border-elec-yellow/20 text-white"
            />
            <Button
              onClick={addCertification}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {cvData.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cvData.certifications.map((cert, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-green-500/20 text-green-400 border-green-500/30 pr-1"
                >
                  {cert}
                  <Button
                    onClick={() => removeCertification(cert)}
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

          <div>
            <Label className="text-white text-sm">Suggested Certifications:</Label>
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestedCertifications
                .filter(cert => !cvData.certifications.includes(cert))
                .slice(0, 6)
                .map((cert, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      onChange({
                        ...cvData,
                        certifications: [...cvData.certifications, cert]
                      });
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs border-green-500/30 hover:bg-green-500/10 text-white"
                  >
                    + {cert}
                  </Button>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
