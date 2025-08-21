
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Wand2, Loader2, Copy, RefreshCw, CheckCircle } from "lucide-react";
import { AIService } from "./AIService";
import { toast } from "@/hooks/use-toast";

interface SmartContentAssistantProps {
  type: 'professional_summary' | 'job_description' | 'skills' | 'achievements';
  context: any;
  onContentGenerated: (content: string | string[]) => void;
  placeholder?: string;
  currentContent?: string;
}

export const SmartContentAssistant: React.FC<SmartContentAssistantProps> = ({
  type,
  context,
  onContentGenerated,
  placeholder,
  currentContent = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showGenerated, setShowGenerated] = useState(false);

  const getTypeConfig = () => {
    switch (type) {
      case 'professional_summary':
        return {
          title: 'Professional Summary Assistant',
          description: 'Generate a compelling professional summary',
          placeholder: 'Add any specific achievements or career goals to highlight...',
          icon: <Wand2 className="h-4 w-4" />
        };
      case 'job_description':
        return {
          title: 'Job Description Enhancer',
          description: 'Enhance your job responsibilities and achievements',
          placeholder: 'Describe your key responsibilities or any specific projects...',
          icon: <Wand2 className="h-4 w-4" />
        };
      case 'skills':
        return {
          title: 'Skills Suggester',
          description: 'Get relevant electrical skills suggestions',
          placeholder: 'Mention any specific areas of expertise or equipment you work with...',
          icon: <Wand2 className="h-4 w-4" />
        };
      case 'achievements':
        return {
          title: 'Achievements Generator',
          description: 'Create impactful achievement statements',
          placeholder: 'Describe any projects, improvements, or recognition you received...',
          icon: <Wand2 className="h-4 w-4" />
        };
      default:
        return {
          title: 'Content Assistant',
          description: 'AI-powered content generation',
          placeholder: 'Enter your requirements...',
          icon: <Wand2 className="h-4 w-4" />
        };
    }
  };

  const config = getTypeConfig();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      let result;
      
      switch (type) {
        case 'professional_summary':
          result = await AIService.generateProfessionalSummary(context, userInput);
          break;
        case 'job_description':
          result = await AIService.generateJobDescription(
            context.jobTitle || '',
            context.company || '',
            userInput
          );
          break;
        case 'skills':
          result = await AIService.generateSkills(context, userInput);
          setGeneratedContent(Array.isArray(result) ? result.join(', ') : result);
          setShowGenerated(true);
          return;
        case 'achievements':
          result = await AIService.generateAchievements(
            context.jobTitle || '',
            context.company || '',
            context.experience || '',
            userInput
          );
          setGeneratedContent(Array.isArray(result) ? result.join('\n• ') : result);
          setShowGenerated(true);
          return;
      }
      
      setGeneratedContent(result);
      setShowGenerated(true);
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAccept = () => {
    if (type === 'skills') {
      const skillsArray = generatedContent.split(',').map(skill => skill.trim());
      onContentGenerated(skillsArray);
    } else if (type === 'achievements') {
      const achievementsArray = generatedContent.split('\n•').map(achievement => 
        achievement.replace('•', '').trim()
      ).filter(achievement => achievement.length > 0);
      onContentGenerated(achievementsArray);
    } else {
      onContentGenerated(generatedContent);
    }
    
    setShowGenerated(false);
    setUserInput('');
    toast({
      title: "Content Applied",
      description: "AI-generated content has been applied to your CV."
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied to your clipboard."
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {config.icon}
          <div>
            <CardTitle className="text-sm text-white">{config.title}</CardTitle>
            <p className="text-xs text-gray-400">{config.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!showGenerated ? (
          <>
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={config.placeholder}
              className="bg-elec-dark border-elec-yellow/20 text-white text-sm min-h-20"
            />
            
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              size="sm"
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-3 w-3 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
            
            {currentContent && (
              <div className="text-xs text-gray-400">
                Current content will be replaced with AI-generated content
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-elec-dark rounded-lg p-3 border border-elec-yellow/20">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow text-xs">
                  AI Generated
                </Badge>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-white text-sm whitespace-pre-wrap">
                {generatedContent}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleAccept}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white flex-1"
              >
                <CheckCircle className="h-3 w-3 mr-2" />
                Apply
              </Button>
              <Button
                onClick={handleGenerate}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                disabled={isGenerating}
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
              <Button
                onClick={() => setShowGenerated(false)}
                variant="outline"
                size="sm"
                className="border-gray-600 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
