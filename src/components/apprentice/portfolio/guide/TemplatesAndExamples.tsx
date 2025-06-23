
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  FileText, 
  Image, 
  Video,
  Folder,
  Star,
  CheckCircle,
  ExternalLink,
  Eye,
  Copy
} from "lucide-react";

const TemplatesAndExamples = () => {
  const templates = [
    {
      category: "Portfolio Structure",
      items: [
        {
          name: "Portfolio Contents Page Template",
          type: "Word Document",
          description: "Professional contents page with sections and page numbers",
          downloadUrl: "#",
          previewUrl: "#"
        },
        {
          name: "Evidence Tracking Spreadsheet",
          type: "Excel Sheet",
          description: "Track evidence against learning outcomes and competencies",
          downloadUrl: "#",
          previewUrl: "#"
        },
        {
          name: "Portfolio Introduction Template",
          type: "Word Document",
          description: "Professional introduction with personal statement and objectives",
          downloadUrl: "#",
          previewUrl: "#"
        }
      ]
    },
    {
      category: "Evidence Documentation",
      items: [
        {
          name: "Work Activity Evidence Form",
          type: "PDF Form",
          description: "Template for documenting practical work activities",
          downloadUrl: "#",
          previewUrl: "#"
        },
        {
          name: "Witness Testimony Template",
          type: "Word Document",
          description: "Structured format for supervisor and peer testimonies",
          downloadUrl: "#",
          previewUrl: "#"
        },
        {
          name: "Reflection Template",
          type: "Word Document", 
          description: "Guided template for writing meaningful reflections",
          downloadUrl: "#",
          previewUrl: "#"
        },
        {
          name: "Photo Evidence Labels",
          type: "Word Document",
          description: "Professional labels for photographs and visual evidence",
          downloadUrl: "#",
          previewUrl: "#"
        }
      ]
    },
    {
      category: "Assessment Preparation",
      items: [
        {
          name: "Professional Discussion Preparation",
          type: "PDF Guide",
          description: "Question bank and preparation strategies",
          downloadUrl: "#",
          previewUrl: "#"
        },
        {
          name: "Competency Mapping Worksheet",
          type: "Excel Sheet",
          description: "Map your evidence to specific competency criteria",
          downloadUrl: "#",
          previewUrl: "#"
        },
        {
          name: "Assessment Checklist",
          type: "PDF Form",
          description: "Final preparation checklist before assessment",
          downloadUrl: "#",
          previewUrl: "#"
        }
      ]
    }
  ];

  const examples = [
    {
      title: "Excellent Portfolio Example",
      type: "Complete Portfolio",
      description: "Anonymised example of a high-quality apprentice portfolio",
      level: "Outstanding",
      highlights: [
        "Clear structure and professional presentation",
        "Comprehensive evidence across all competencies",
        "Excellent reflective commentary",
        "Strong witness testimonies"
      ]
    },
    {
      title: "Evidence Collection Examples",
      type: "Photo Gallery",
      description: "Examples of well-documented practical work with explanations",
      level: "Good Practice",
      highlights: [
        "Professional quality photographs",
        "Clear before/during/after sequences",
        "Detailed captions and context",
        "Safety measures documented"
      ]
    },
    {
      title: "Reflection Writing Examples",
      type: "Text Samples",
      description: "Examples of effective reflective writing at different levels",
      level: "Best Practice",
      highlights: [
        "Demonstrates learning and development",
        "Links theory to practice effectively",
        "Shows critical thinking skills",
        "Professional language and structure"
      ]
    }
  ];

  const quickStartGuides = [
    {
      title: "Week 1: Getting Started",
      description: "Essential first steps for new apprentices",
      tasks: [
        "Download and set up folder structure",
        "Complete portfolio introduction",
        "Take first workplace photos",
        "Write your first reflection entry"
      ]
    },
    {
      title: "Month 1: Establishing Routine",
      description: "Building evidence collection habits",
      tasks: [
        "Complete first witness testimony",
        "Document your first major project",
        "Update competency tracking sheet",
        "Schedule supervisor review meeting"
      ]
    },
    {
      title: "Month 3: Quality Review",
      description: "Reviewing and improving your portfolio",
      tasks: [
        "Conduct evidence gap analysis",
        "Improve weaker evidence pieces",
        "Reorganise portfolio structure",
        "Plan for next quarter's goals"
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Outstanding": return "border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-400";
      case "Good Practice": return "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-400";
      case "Best Practice": return "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-400";
      default: return "border-gray-500/30 bg-gradient-to-br from-gray-500/10 to-slate-500/10 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Download className="h-6 w-6" />
            Templates, Examples & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Access our comprehensive collection of templates, examples, and resources to help you build 
            a professional portfolio efficiently and effectively.
          </p>
        </CardContent>
      </Card>

      {/* Templates Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Portfolio Templates</h3>
        {templates.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-blue-500/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Folder className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((template, templateIndex) => (
                  <div key={templateIndex} className="border border-elec-yellow/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-white">{template.name}</h4>
                        <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30 mt-1">
                          {template.type}
                        </Badge>
                      </div>
                      <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-elec-yellow/30">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="border-elec-yellow/30">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Examples Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Portfolio Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <Card key={index} className={getLevelColor(example.level)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <Badge className="mt-1" variant="outline">
                      <Star className="h-3 w-3 mr-1" />
                      {example.level}
                    </Badge>
                  </div>
                  <div className="text-current">
                    {example.type === "Complete Portfolio" && <FileText className="h-5 w-5" />}
                    {example.type === "Photo Gallery" && <Image className="h-5 w-5" />}
                    {example.type === "Text Samples" && <Copy className="h-5 w-5" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{example.description}</p>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Key Highlights:</h4>
                  <ul className="space-y-1">
                    {example.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-current mt-1 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Example
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Start Guides */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Quick Start Guides</CardTitle>
          <p className="text-muted-foreground">
            Step-by-step guides to help you get started and maintain momentum
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickStartGuides.map((guide, index) => (
              <div key={index} className="space-y-3">
                <div>
                  <h4 className="font-medium text-green-400">{guide.title}</h4>
                  <p className="text-sm text-muted-foreground">{guide.description}</p>
                </div>
                <ul className="space-y-2">
                  {guide.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Library */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Video Tutorials</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Portfolio Structure Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Evidence Photography Techniques</span>
                </li>
                <li className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Writing Effective Reflections</span>
                </li>
                <li className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Assessment Preparation Tips</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Support Resources</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Portfolio FAQ Document</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Troubleshooting Common Issues</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Assessment Criteria Explained</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-muted-foreground">Industry Standards Reference</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesAndExamples;
