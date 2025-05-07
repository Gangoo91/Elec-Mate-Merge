
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const CVBuilderBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cvPrompt, setCvPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCV, setGeneratedCV] = useState("");

  const handleGenerateCV = () => {
    if (!cvPrompt.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your experience and skills",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Mock AI generation - in a real app, this would call an API
    setTimeout(() => {
      const mockCV = `
# Professional CV

## Personal Information
[Your Name]
[Your Contact Details]

## Professional Summary
${cvPrompt.includes("experienced") ? "Experienced electrical professional with a proven track record in the industry." : "Qualified electrical professional seeking opportunities in the field."}

## Skills & Qualifications
* ${cvPrompt.includes("commercial") ? "Commercial electrical installations" : "Residential electrical work"}
* Electrical safety standards compliance
* ${cvPrompt.includes("maintenance") ? "Electrical systems maintenance and troubleshooting" : "Electrical installations and upgrades"}
* ${cvPrompt.includes("team") ? "Team management and coordination" : "Collaborative work environment adaptation"}

## Work Experience
[Previous employer information would be generated based on your input]

## Education & Certifications
* Electrical Engineering qualification
* ${cvPrompt.includes("apprentice") ? "Currently completing apprenticeship" : "Relevant certifications in electrical work"}
* Health and Safety certification
      `;
      
      setGeneratedCV(mockCV);
      setIsGenerating(false);
      
      toast({
        title: "CV Generated",
        description: "Your professional CV has been created. You can now download it.",
      });
    }, 2000);
  };

  const handleDownloadCV = () => {
    // Create a Blob with the CV content
    const blob = new Blob([generatedCV], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const a = document.createElement("a");
    a.href = url;
    a.download = "Professional_Electrical_CV.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "CV Downloaded",
      description: "Your CV has been downloaded successfully.",
    });
  };

  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 bg-elec-gray">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-xl font-medium">AI CV Builder</h2>
        </div>
        <Button variant="outline" size="sm" className="text-elec-yellow border-elec-yellow/30">
          {isExpanded ? "Close" : "Create CV"}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-sm">
              Describe your experience, skills, and the type of electrical work you do. 
              Our AI will generate a professional CV tailored to the electrical industry.
            </p>
            <Textarea 
              placeholder="e.g., I'm an experienced commercial electrician with 5 years of experience in large-scale projects. I specialize in industrial control systems and have led teams of up to 8 electricians..."
              className="min-h-[120px] bg-black/30 border-elec-yellow/20"
              value={cvPrompt}
              onChange={(e) => setCvPrompt(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={handleGenerateCV}
              disabled={isGenerating || !cvPrompt.trim()}
            >
              {isGenerating ? "Generating..." : "Generate Professional CV"}
            </Button>
            
            {generatedCV && (
              <Button 
                variant="outline" 
                className="border-elec-yellow/30"
                onClick={handleDownloadCV}
              >
                <Download className="h-4 w-4 mr-2" /> Download CV
              </Button>
            )}
          </div>
          
          {generatedCV && (
            <div className="mt-4 p-4 bg-black/20 rounded-md border border-elec-yellow/20">
              <h3 className="text-lg font-medium mb-2">Preview:</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-300 max-h-[200px] overflow-y-auto">
                {generatedCV}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CVBuilderBox;
