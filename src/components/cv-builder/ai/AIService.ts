
import { supabase } from "@/integrations/supabase/client";

interface AIGenerationRequest {
  type: 'professional_summary' | 'job_description' | 'skills' | 'achievements' | 'complete_cv';
  context: {
    jobTitle?: string;
    company?: string;
    industry?: string;
    experience?: string;
    skills?: string[];
    personalInfo?: any;
    targetRole?: string;
    previousRoles?: any[];
    education?: any[];
    certifications?: string[];
  };
  userInput?: string;
}

interface AIGenerationResponse {
  content: string;
  suggestions?: string[];
  alternatives?: string[];
}

export class AIService {
  private static async callAIAssistant(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: {
          prompt: this.buildPrompt(request),
          type: 'cv_generation'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`AI service error: ${error.message}`);
      }

      if (!data || !data.response) {
        throw new Error('Invalid response from AI service');
      }

      return this.parseAIResponse(data.response, request.type);
    } catch (error) {
      console.error('AI Service Error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate content: ${error.message}`);
      }
      throw new Error('Failed to generate content. Please try again.');
    }
  }

  private static buildPrompt(request: AIGenerationRequest): string {
    const { type, context, userInput } = request;
    const industry = "electrical industry";
    
    switch (type) {
      case 'professional_summary':
        return `Create a professional summary for an electrical worker with the following details:
- Job Title: ${context.jobTitle || 'Electrician'}
- Experience: ${context.experience || 'Not specified'}
- Industry: ${industry}
- Target Role: ${context.targetRole || context.jobTitle || 'Electrician'}
- Additional context: ${userInput || 'None'}

Write a compelling 3-4 sentence professional summary that highlights their electrical expertise, relevant experience, and career objectives. Use UK electrical terminology and focus on industry-specific skills and qualifications.`;

      case 'job_description':
        return `Generate a detailed job description for this electrical role:
- Job Title: ${context.jobTitle}
- Company: ${context.company}
- Industry context: ${userInput || ''}

Include key responsibilities, achievements, and technical skills relevant to UK electrical work. Mention specific electrical systems, regulations (BS 7671), and industry standards where appropriate. Format as bullet points.`;

      case 'skills':
        return `Generate a comprehensive list of electrical skills based on:
- Current role: ${context.jobTitle}
- Experience level: ${context.experience}
- Existing skills: ${context.skills?.join(', ') || 'None listed'}
- Additional context: ${userInput || ''}

Provide a mix of technical electrical skills, software/tools, and soft skills relevant to the UK electrical industry. Include specific certifications, testing procedures, and electrical systems knowledge.`;

      case 'achievements':
        return `Generate professional achievements for an electrical worker:
- Role: ${context.jobTitle}
- Company: ${context.company}
- Experience: ${context.experience}
- Context: ${userInput || ''}

Create 3-5 quantifiable achievements that demonstrate electrical expertise, safety compliance, project completion, or business impact. Use specific electrical terminology and UK industry standards.`;

      case 'complete_cv':
        return `Generate a complete CV structure and content for:
- Target Role: ${context.targetRole}
- Current Experience: ${context.experience}
- Industry: Electrical
- Personal Info: ${JSON.stringify(context.personalInfo)}
- Previous Roles: ${JSON.stringify(context.previousRoles)}

Create comprehensive CV content including professional summary, enhanced job descriptions, relevant skills, and suggested improvements. Focus on UK electrical industry requirements and best practices.`;

      default:
        return `Help improve this CV content: ${userInput}`;
    }
  }

  private static parseAIResponse(response: string, type: string): AIGenerationResponse {
    // Parse the AI response to extract content and suggestions
    const lines = response.split('\n').filter(line => line.trim());
    
    if (type === 'skills') {
      // Extract skills from bullet points or comma-separated list
      const skillLines = lines.filter(line => 
        line.includes('•') || line.includes('-') || line.includes('*')
      );
      const skills = skillLines.map(line => 
        line.replace(/[•\-*]\s*/, '').trim()
      ).filter(skill => skill.length > 0);
      
      return {
        content: skills.join(', '),
        suggestions: skills.slice(0, 5)
      };
    }

    return {
      content: response,
      suggestions: [],
      alternatives: []
    };
  }

  static async generateProfessionalSummary(context: AIGenerationRequest['context'], userInput?: string): Promise<string> {
    const response = await this.callAIAssistant({
      type: 'professional_summary',
      context,
      userInput
    });
    return response.content;
  }

  static async generateJobDescription(jobTitle: string, company: string, additionalContext?: string): Promise<string> {
    const response = await this.callAIAssistant({
      type: 'job_description',
      context: { jobTitle, company },
      userInput: additionalContext
    });
    return response.content;
  }

  static async generateSkills(context: AIGenerationRequest['context'], userInput?: string): Promise<string[]> {
    const response = await this.callAIAssistant({
      type: 'skills',
      context,
      userInput
    });
    return response.content.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  }

  static async generateAchievements(jobTitle: string, company: string, experience: string, context?: string): Promise<string[]> {
    const response = await this.callAIAssistant({
      type: 'achievements',
      context: { jobTitle, company, experience },
      userInput: context
    });
    return response.content.split('\n').filter(line => line.trim().length > 0);
  }

  static async generateCompleteCV(context: AIGenerationRequest['context']): Promise<AIGenerationResponse> {
    return await this.callAIAssistant({
      type: 'complete_cv',
      context
    });
  }

  // Content Organization Methods
  static async optimizeContent(cvData: any): Promise<any> {
    try {
      // Organize and enhance CV content using AI
      const response = await this.callAIAssistant({
        type: 'complete_cv',
        context: {
          personalInfo: cvData.personalInfo,
          experience: cvData.experience,
          education: cvData.education,
          skills: cvData.skills,
          certifications: cvData.certifications,
          targetRole: 'Electrical Professional'
        }
      });

      return this.parseOptimizedContent(response.content, cvData);
    } catch (error) {
      console.error('Content optimization error:', error);
      return cvData; // Return original data if optimization fails
    }
  }

  private static parseOptimizedContent(aiContent: string, originalData: any): any {
    // Parse AI response and merge with original data
    try {
      // Extract different sections from AI response
      const sections = this.extractSections(aiContent);
      
      return {
        personalInfo: {
          ...originalData.personalInfo,
          professionalSummary: sections.summary || originalData.personalInfo.professionalSummary
        },
        experience: this.enhanceExperience(originalData.experience, sections.experience),
        education: originalData.education, // Keep original education data
        skills: this.categorizeSkills(sections.skills || originalData.skills),
        certifications: originalData.certifications
      };
    } catch (error) {
      console.error('Content parsing error:', error);
      return originalData;
    }
  }

  private static extractSections(content: string): any {
    const sections: any = {};
    
    // Extract professional summary
    const summaryMatch = content.match(/Professional Summary[:\n]+(.*?)(?=\n\n|\nWork Experience|\nSkills|$)/s);
    if (summaryMatch) {
      sections.summary = summaryMatch[1].trim();
    }

    // Extract skills
    const skillsMatch = content.match(/Skills[:\n]+(.*?)(?=\n\n|\nWork Experience|\nEducation|$)/s);
    if (skillsMatch) {
      const skillsText = skillsMatch[1];
      sections.skills = skillsText.split(/[,\n•\-\*]/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
    }

    return sections;
  }

  private static enhanceExperience(originalExperience: any[], aiExperience?: any[]): any[] {
    // Enhance job descriptions with AI suggestions while keeping original structure
    return originalExperience.map((exp, index) => {
      if (aiExperience && aiExperience[index]) {
        return {
          ...exp,
          description: aiExperience[index].description || exp.description
        };
      }
      return exp;
    });
  }

  private static categorizeSkills(skills: string[]): string[] {
    // Organize skills by priority and category
    const skillCategories = {
      electrical: ['wiring', 'electrical', 'power', 'voltage', 'circuit', 'installation', 'maintenance'],
      software: ['CAD', 'software', 'computer', 'digital', 'programming'],
      safety: ['safety', 'compliance', 'health', 'regulations', 'testing'],
      certifications: ['certified', 'qualification', 'license', 'BS 7671']
    };

    const categorized: string[] = [];
    const electrical: string[] = [];
    const software: string[] = [];
    const safety: string[] = [];
    const other: string[] = [];

    skills.forEach(skill => {
      const skillLower = skill.toLowerCase();
      if (skillCategories.electrical.some(keyword => skillLower.includes(keyword))) {
        electrical.push(skill);
      } else if (skillCategories.software.some(keyword => skillLower.includes(keyword))) {
        software.push(skill);
      } else if (skillCategories.safety.some(keyword => skillLower.includes(keyword))) {
        safety.push(skill);
      } else {
        other.push(skill);
      }
    });

    // Return prioritized order: electrical first, then software, safety, other
    return [...electrical, ...software, ...safety, ...other];
  }
}
