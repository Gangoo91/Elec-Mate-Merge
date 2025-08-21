
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

Write a compelling 3-4 sentence professional summary that highlights their electrical expertise, relevant experience, and career objectives. Use UK electrical terminology and focus on industry-specific skills and qualifications.

IMPORTANT: Write in plain text only. Do not use any markdown formatting, headers, bullet points, or special characters. Keep the text clean and professional for CV use.`;

      case 'job_description':
        return `Generate a detailed job description for this electrical role:
- Job Title: ${context.jobTitle}
- Company: ${context.company}
- Industry context: ${userInput || ''}

Include key responsibilities, achievements, and technical skills relevant to UK electrical work. Mention specific electrical systems, regulations (BS 7671), and industry standards where appropriate. 

IMPORTANT: Format as simple bullet points using hyphens (-) or bullet symbols (•). Do not use headers, code blocks, or complex markdown. Keep formatting minimal and professional for CV use.`;

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
}
