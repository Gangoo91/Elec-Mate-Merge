
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, FileText, Download, Plus, Edit, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BriefingTemplate {
  id: string;
  name: string;
  category: string;
  keyPoints: string[];
  safetyPoints: string[];
  equipment: string[];
  duration: string;
  teamSize: string;
}

const TeamBriefingTemplates = () => {
  const [templates, setTemplates] = useState<BriefingTemplate[]>([
    {
      id: "1",
      name: "Consumer Unit Installation Briefing",
      category: "Installation",
      keyPoints: [
        "Review site-specific hazards and risks",
        "Confirm isolation procedures and lock-off points",
        "Check all team members have appropriate PPE",
        "Establish communication protocols and emergency procedures"
      ],
      safetyPoints: [
        "Electrical isolation mandatory before work begins",
        "Prove dead testing required at all stages",
        "No live working permitted without specific risk assessment",
        "Emergency contact numbers confirmed with all team"
      ],
      equipment: [
        "Personal protective equipment (PPE)",
        "Voltage indicator and proving unit",
        "Lock-off devices and warning signs",
        "First aid kit and emergency communication"
      ],
      duration: "10-15 minutes",
      teamSize: "2-4 personnel"
    },
    {
      id: "2", 
      name: "Working at Height Safety Briefing",
      category: "Safety",
      keyPoints: [
        "Review height-related risks for the specific job",
        "Confirm ladder inspection and setup procedures",
        "Establish safe access and egress routes",
        "Review rescue procedures for emergencies"
      ],
      safetyPoints: [
        "3:1 rule for ladder angle must be maintained",
        "Someone must be present when working above 2 metres",
        "Weather conditions assessed - no work in high winds",
        "Fall protection equipment inspected before use"
      ],
      equipment: [
        "Properly inspected ladders or platforms",
        "Safety harnesses where required",
        "Hard hats and high-vis clothing",
        "Emergency rescue equipment"
      ],
      duration: "8-12 minutes",
      teamSize: "2-6 personnel"
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<BriefingTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const categories = ["Installation", "Maintenance", "Testing", "Safety", "Emergency", "General"];

  const createNewTemplate = () => {
    const newTemplate: BriefingTemplate = {
      id: Date.now().toString(),
      name: "New Briefing Template",
      category: "General",
      keyPoints: [""],
      safetyPoints: [""],
      equipment: [""],
      duration: "10 minutes",
      teamSize: "2-4 personnel"
    };
    setTemplates(prev => [...prev, newTemplate]);
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
  };

  const duplicateTemplate = (template: BriefingTemplate) => {
    const duplicatedTemplate: BriefingTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`
    };
    setTemplates(prev => [...prev, duplicatedTemplate]);
  };

  const updateTemplate = (updatedTemplate: BriefingTemplate) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === updatedTemplate.id ? updatedTemplate : template
      )
    );
    setSelectedTemplate(updatedTemplate);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Installation": "bg-blue-500",
      "Maintenance": "bg-green-500", 
      "Testing": "bg-purple-500",
      "Safety": "bg-red-500",
      "Emergency": "bg-orange-500",
      "General": "bg-gray-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Briefing Templates
            </CardTitle>
            <Button onClick={createNewTemplate} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Pre-built safety briefing templates to ensure consistent communication 
            and safety standards across all your electrical projects.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template List */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white">Available Templates ({templates.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`border-elec-yellow/30 cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id ? 'bg-elec-yellow/10' : 'hover:bg-elec-gray/80'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(template.category)}>
                            {template.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {template.duration} • {template.teamSize}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.keyPoints.length} key points, {template.safetyPoints.length} safety points
                        </p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateTemplate(template);
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                            setIsEditing(true);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Template Preview/Editor */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {selectedTemplate ? (isEditing ? 'Edit Template' : 'Template Preview') : 'Select Template'}
              </CardTitle>
              {selectedTemplate && (
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" variant="outline">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selectedTemplate ? (
              <div className="text-center py-8 text-muted-foreground">
                Select a template from the list to preview or edit it.
              </div>
            ) : (
              <div className="space-y-6">
                {/* Template Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Template Name</Label>
                    {isEditing ? (
                      <Input
                        value={selectedTemplate.name}
                        onChange={(e) => updateTemplate({
                          ...selectedTemplate,
                          name: e.target.value
                        })}
                      />
                    ) : (
                      <div className="p-2 bg-elec-dark rounded">{selectedTemplate.name}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">Category</Label>
                    {isEditing ? (
                      <select
                        className="w-full p-2 border rounded-md bg-background"
                        value={selectedTemplate.category}
                        onChange={(e) => updateTemplate({
                          ...selectedTemplate,
                          category: e.target.value
                        })}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-2 bg-elec-dark rounded">{selectedTemplate.category}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">Duration</Label>
                    {isEditing ? (
                      <Input
                        value={selectedTemplate.duration}
                        onChange={(e) => updateTemplate({
                          ...selectedTemplate,
                          duration: e.target.value
                        })}
                      />
                    ) : (
                      <div className="p-2 bg-elec-dark rounded">{selectedTemplate.duration}</div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">Team Size</Label>
                    {isEditing ? (
                      <Input
                        value={selectedTemplate.teamSize}
                        onChange={(e) => updateTemplate({
                          ...selectedTemplate,
                          teamSize: e.target.value
                        })}
                      />
                    ) : (
                      <div className="p-2 bg-elec-dark rounded">{selectedTemplate.teamSize}</div>
                    )}
                  </div>
                </div>

                {/* Key Points */}
                <div>
                  <Label className="text-sm font-medium">Key Briefing Points</Label>
                  <div className="mt-2 space-y-2">
                    {selectedTemplate.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        {isEditing ? (
                          <Textarea
                            value={point}
                            onChange={(e) => {
                              const newPoints = [...selectedTemplate.keyPoints];
                              newPoints[index] = e.target.value;
                              updateTemplate({
                                ...selectedTemplate,
                                keyPoints: newPoints
                              });
                            }}
                            rows={2}
                            className="flex-1"
                          />
                        ) : (
                          <span className="text-sm">{point}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Points */}
                <div>
                  <Label className="text-sm font-medium">Critical Safety Points</Label>
                  <div className="mt-2 space-y-2">
                    {selectedTemplate.safetyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">⚠</span>
                        {isEditing ? (
                          <Textarea
                            value={point}
                            onChange={(e) => {
                              const newPoints = [...selectedTemplate.safetyPoints];
                              newPoints[index] = e.target.value;
                              updateTemplate({
                                ...selectedTemplate,
                                safetyPoints: newPoints
                              });
                            }}
                            rows={2}
                            className="flex-1"
                          />
                        ) : (
                          <span className="text-sm">{point}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment List */}
                <div>
                  <Label className="text-sm font-medium">Required Equipment</Label>
                  <div className="mt-2 space-y-2">
                    {selectedTemplate.equipment.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">🔧</span>
                        {isEditing ? (
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newEquipment = [...selectedTemplate.equipment];
                              newEquipment[index] = e.target.value;
                              updateTemplate({
                                ...selectedTemplate,
                                equipment: newEquipment
                              });
                            }}
                          />
                        ) : (
                          <span className="text-sm">{item}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamBriefingTemplates;
