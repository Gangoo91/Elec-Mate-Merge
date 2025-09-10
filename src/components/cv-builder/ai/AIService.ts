
import { supabase } from "@/integrations/supabase/client";

interface AIGenerationRequest {
  type: 'professional_summary' | 'job_description' | 'skills' | 'achievements' | 'complete_cv' | 'quote_summary' | 'job_description_enhancement' | 'terms_conditions' | 'additional_services';
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
  // New quote enhancement methods
  static async generateQuoteSummary(quote: any, companyProfile: any): Promise<string> {
    const response = await this.callAIAssistant({
      type: 'quote_summary',
      context: {
        jobTitle: quote.jobDetails?.title,
        company: companyProfile?.company_name,
        targetRole: 'Executive Summary',
        personalInfo: { quote, companyProfile }
      }
    });
    return response.content;
  }

  static async enhanceJobDescription(jobDetails: any): Promise<string> {
    const response = await this.callAIAssistant({
      type: 'job_description_enhancement',
      context: {
        jobTitle: jobDetails.title,
        personalInfo: jobDetails
      },
      userInput: jobDetails.description
    });
    return response.content;
  }

  static async generateTermsAndConditions(quote: any): Promise<string> {
    const response = await this.callAIAssistant({
      type: 'terms_conditions',
      context: {
        jobTitle: quote.jobDetails?.title,
        experience: quote.jobDetails?.estimatedDuration,
        personalInfo: quote
      }
    });
    return response.content;
  }

  static async suggestAdditionalServices(quote: any): Promise<string[]> {
    const response = await this.callAIAssistant({
      type: 'additional_services',
      context: {
        jobTitle: quote.jobDetails?.title,
        personalInfo: quote
      }
    });
    return response.content.split('\n').filter((line: string) => line.trim().length > 0);
  }

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
        return `Generate 3-4 short, concise bullet points for MY work experience as:
- Job Title: ${context.jobTitle}
- Company: ${context.company}
- Context: ${userInput || ''}

Requirements:
- Each bullet point must be ONE LINE only
- Write from first-person perspective about MY achievements
- Use action verbs (implemented, managed, achieved, designed)
- Focus on specific accomplishments and results
- Include UK electrical terminology where relevant
- Keep it brief and impactful - no lengthy descriptions`;

      case 'skills':
        return `Generate relevant electrical skill keywords only based on:
- Current role: ${context.jobTitle}
- Experience level: ${context.experience}
- Existing skills: ${context.skills?.join(', ') || 'None listed'}
- Additional context: ${userInput || ''}

IMPORTANT: Return ONLY skill keywords or short phrases (1-3 words each). No descriptions, explanations, or sentences. Format as simple bullet points or comma-separated list.

Examples: "Electrical Installation", "PAT Testing", "18th Edition", "NICEIC Certified", "Fault Finding", "Consumer Units", "Emergency Lighting"

Focus on UK electrical industry terms, certifications, tools, and technical skills.`;

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

      case 'quote_summary':
        return `Create a professional executive summary for this electrical project quote:
- Project: ${context.jobTitle}
- Company: ${context.company}
- Quote Details: ${JSON.stringify(context.personalInfo)}

Write a compelling 2-3 paragraph executive summary that highlights the project scope, technical expertise required, and value proposition. Use professional electrical industry terminology and emphasise quality, safety, and compliance with UK standards.

IMPORTANT: Return the response in clean HTML format with proper paragraph tags (<p>), emphasis tags (<strong>, <em>), and list tags (<ul>, <li>) where appropriate. Do not use markdown formatting.`;

      case 'job_description_enhancement':
        return `Enhance this electrical job description to be more professional and detailed:
- Job Title: ${context.jobTitle}
- Current Description: ${userInput}
- Job Details: ${JSON.stringify(context.personalInfo)}

Improve the description with:
- Professional electrical terminology
- Technical specifications and requirements
- Safety considerations and compliance standards
- Clear scope of work
- BS 7671:2018 and building regulation compliance
Keep it concise but comprehensive.

IMPORTANT: Return the response in clean HTML format with proper paragraph tags (<p>), emphasis tags (<strong>, <em>), and list tags (<ul>, <li>) where appropriate. Do not use markdown formatting.`;

      case 'terms_conditions':
        return `Generate professional terms and conditions for this electrical project:
- Project Type: ${context.jobTitle}
- Duration: ${context.experience}
- Quote Context: ${JSON.stringify(context.personalInfo)}

Include standard electrical industry terms covering:
- Payment terms and conditions
- Health and safety requirements
- Warranty and guarantee provisions
- Compliance with BS 7671:2018
- Liability and insurance coverage
- Change order procedures
Keep it professional and legally appropriate for UK electrical contractors.

IMPORTANT: Return the response in clean HTML format with proper paragraph tags (<p>), emphasis tags (<strong>, <em>), and list tags (<ul>, <li>) where appropriate. Do not use markdown formatting.`;

      case 'additional_services':
        return `Suggest relevant additional services for this electrical project:
- Main Project: ${context.jobTitle}
- Project Context: ${JSON.stringify(context.personalInfo)}

Suggest 3-5 complementary electrical services that would benefit the client, such as:
- Maintenance contracts
- Safety inspections
- Upgrade recommendations
- Emergency call-out services
- Energy efficiency improvements

Format as short, clear service descriptions (one line each).

IMPORTANT: Return the response in clean HTML format with proper list tags (<ul>, <li>) for each service. Do not use markdown formatting.`;

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
