
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CVBuilderBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cvPrompt, setCvPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCV, setGeneratedCV] = useState("");

  const handleGenerateCV = async () => {
    if (!cvPrompt.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your experience and skills",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // In a production app, this would call a real AI service through a Supabase Edge Function
      // For now, we'll use our enhanced mock generator but structure it like a real API call
      
      // Mock API call with timeout to simulate network request
      setTimeout(() => {
        // Extract key information from the prompt
        const hasCommercial = cvPrompt.toLowerCase().includes("commercial");
        const hasIndustrial = cvPrompt.toLowerCase().includes("industrial");
        const hasResidential = cvPrompt.toLowerCase().includes("residential");
        const yearsExperience = extractYearsOfExperience(cvPrompt);
        const hasLeadership = cvPrompt.toLowerCase().includes("lead") || 
                              cvPrompt.toLowerCase().includes("manage") || 
                              cvPrompt.toLowerCase().includes("supervis");
        const hasApprenticeship = cvPrompt.toLowerCase().includes("apprentice");
        const hasMaintenanceExperience = cvPrompt.toLowerCase().includes("maintenance") || 
                                         cvPrompt.toLowerCase().includes("repair");
        
        // Generate a more tailored CV based on extracted information
        const mockCV = `
# Professional Electrical CV

## Personal Information
[Your Name]
[Your Email] | [Your Phone]
[Your Location]

## Professional Summary
${generateSummary(yearsExperience, hasCommercial, hasIndustrial, hasResidential, hasLeadership)}

## Skills & Qualifications
${generateSkills(hasCommercial, hasIndustrial, hasResidential, hasMaintenanceExperience, hasLeadership)}

## Work Experience
${generateWorkExperience(yearsExperience, hasCommercial, hasIndustrial, hasResidential, hasLeadership, hasMaintenanceExperience)}

## Education & Certifications
${generateEducation(hasApprenticeship)}

## Professional References
* Available upon request
        `;
        
        setGeneratedCV(mockCV);
        setIsGenerating(false);
        
        toast({
          title: "CV Generated",
          description: "Your professional CV has been created. You can now download it.",
        });
      }, 2000);
      
    } catch (error) {
      console.error("Error generating CV:", error);
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your CV. Please try again.",
        variant: "destructive",
      });
    }
  };

  const extractYearsOfExperience = (prompt: string) => {
    // Look for patterns like "X years" or "X year" in the prompt
    const match = prompt.match(/(\d+)[ -]*(years?|yrs?)/i);
    return match ? parseInt(match[1]) : 0;
  };

  const generateSummary = (years: number, commercial: boolean, industrial: boolean, residential: boolean, leadership: boolean) => {
    let summary = "";
    
    if (years > 0) {
      summary += `${years}+ year${years === 1 ? '' : 's'} experienced `;
    } else {
      summary += "Qualified ";
    }
    
    summary += "electrical professional ";
    
    if (commercial && industrial && residential) {
      summary += "with comprehensive expertise across commercial, industrial, and residential sectors. ";
    } else if ((commercial && industrial) || (commercial && residential) || (industrial && residential)) {
      const sectors = [];
      if (commercial) sectors.push("commercial");
      if (industrial) sectors.push("industrial");
      if (residential) sectors.push("residential");
      summary += `specializing in ${sectors.join(" and ")} electrical systems. `;
    } else if (commercial) {
      summary += "specializing in commercial electrical installations and systems. ";
    } else if (industrial) {
      summary += "specializing in industrial electrical systems and controls. ";
    } else if (residential) {
      summary += "specializing in residential electrical services and installations. ";
    }
    
    if (leadership) {
      summary += "Proven leadership experience managing teams and projects to successful completion. ";
    }
    
    summary += "Committed to safety, quality, and electrical code compliance with a track record of delivering projects on time and to specification.";
    
    return summary;
  };

  const generateSkills = (commercial: boolean, industrial: boolean, residential: boolean, maintenance: boolean, leadership: boolean) => {
    const skills = [
      "* NEC/BS7671 regulations compliance and implementation",
      "* Circuit design, installation, and troubleshooting",
      "* Blueprint and schematic reading"
    ];
    
    if (commercial) {
      skills.push("* Commercial electrical installations and fit-outs");
      skills.push("* Distribution board installation and maintenance");
    }
    
    if (industrial) {
      skills.push("* Industrial control systems and PLC programming");
      skills.push("* Three-phase power systems");
    }
    
    if (residential) {
      skills.push("* Residential wiring and lighting systems");
      skills.push("* Consumer unit installations and upgrades");
    }
    
    if (maintenance) {
      skills.push("* Preventative maintenance procedures");
      skills.push("* Emergency repair and troubleshooting");
    }
    
    if (leadership) {
      skills.push("* Team leadership and project management");
      skills.push("* Client communications and stakeholder management");
    }
    
    return skills.join("\n");
  };

  const generateWorkExperience = (years: number, commercial: boolean, industrial: boolean, residential: boolean, leadership: boolean, maintenance: boolean) => {
    let experience = "";
    
    // Create fictional but realistic work history based on the input
    if (years >= 5) {
      experience += `### Senior Electrician, ${commercial ? "PowerTech Solutions" : industrial ? "Industrial Systems Ltd" : "Quality Electric Services"}\n`;
      experience += `${2024 - Math.min(Math.floor(years/2), 5)} - Present\n`;
      experience += "* " + (leadership ? "Led a team of electricians in executing complex electrical projects" : "Executed complex electrical projects") + "\n";
      experience += `* Specialized in ${commercial ? "commercial electrical installations" : industrial ? "industrial control systems" : "residential electrical services"}\n`;
      experience += "* Maintained strong client relationships and ensured code compliance\n\n";
      
      experience += `### ${leadership ? "Lead" : "Journey"} Electrician, ${industrial ? "Factory Electrics" : commercial ? "BuildRight Construction" : "City Sparks Electric"}\n`;
      experience += `${2024 - Math.min(years, 10)} - ${2024 - Math.min(Math.floor(years/2), 5) - 1}\n`;
      experience += `* ${maintenance ? "Performed maintenance and troubleshooting on" : "Installed and upgraded"} electrical systems\n`;
      experience += `* ${leadership ? "Supervised apprentice electricians and" : "Worked closely with senior electricians to"} complete projects efficiently\n`;
    } else if (years >= 2) {
      experience += `### Electrician, ${residential ? "HomeWorks Electric" : commercial ? "Commercial Electric Co." : "General Electrical Services"}\n`;
      experience += `${2024 - years} - Present\n`;
      experience += `* Performed ${residential ? "residential" : commercial ? "commercial" : "various"} electrical installations and repairs\n`;
      experience += "* Ensured all work met electrical codes and safety standards\n";
    } else {
      experience += "### Junior Electrician, Starting Electric\n";
      experience += `${2023 - Math.max(1, years)} - Present\n`;
      experience += "* Assisting senior electricians with installations and repairs\n";
      experience += "* Learning industry best practices and electrical code requirements\n";
    }
    
    return experience;
  };

  const generateEducation = (apprentice: boolean) => {
    let education = "* City & Guilds Level 3 Electrotechnical Qualification\n";
    
    if (apprentice) {
      education += "* Currently completing electrical apprenticeship program\n";
    } else {
      education += "* NVQ Level 3 in Electrical Installation\n";
    }
    
    education += "* 18th Edition Wiring Regulations BS7671\n";
    education += "* Health and Safety certification\n";
    
    return education;
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
