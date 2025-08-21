
import { supabase } from "@/integrations/supabase/client";

interface AIGenerationRequest {
  type: 'professional_summary' | 'job_description' | 'skills' | 'achievements' | 'complete_cv' | 'refine_content' | 'optimize_ats' | 'quantify_achievements' | 'generate_from_raw';
  context: {
    jobTitle?: string;
    company?: string;
    industry?: string;
    experience?: string;
    skills?: string[];
    personalInfo?: any;
    targetRole?: string;
    previousRoles?: any[];
    currentContent?: string;
    rawCVData?: any;
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
          type: 'cv_refinement'
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

      case 'refine_content':
        return `Refine and enhance this electrical CV content to make it more professional, impactful, and engaging:

Current Content: "${context.currentContent}"
Role Context: ${context.jobTitle || 'Electrician'}
Experience Level: ${context.experience || 'Not specified'}
Additional Context: ${userInput || 'None'}

Please enhance the content by:
1. Using stronger action verbs and professional language
2. Making statements more specific and quantifiable where possible
3. Improving clarity and readability
4. Ensuring UK electrical industry terminology is used correctly
5. Making the content more ATS-friendly with relevant keywords
6. Maintaining professional tone throughout

Return only the refined content without explanations.`;

      case 'optimize_ats':
        return `Optimize this electrical CV content for Applicant Tracking Systems (ATS) while maintaining readability:

Current Content: "${context.currentContent}"
Target Role: ${context.targetRole || context.jobTitle || 'Electrician'}
Industry Keywords: Electrical installation, BS 7671, 18th Edition, PAT testing, NICEIC, fault finding
Additional Context: ${userInput || 'None'}

Enhance the content by:
1. Incorporating relevant electrical industry keywords naturally
2. Using standard job title variations employers search for
3. Including technical skills and certifications keywords
4. Ensuring proper formatting for ATS parsing
5. Maintaining natural language flow
6. Adding quantifiable metrics where appropriate

Return the optimized content that will rank well in ATS systems.`;

      case 'quantify_achievements':
        return `Transform this electrical work content into quantified achievements with measurable impact:

Current Content: "${context.currentContent}"
Role: ${context.jobTitle || 'Electrician'}
Company: ${context.company || 'Previous employer'}
Additional Context: ${userInput || 'None'}

Create specific, quantified achievement statements by:
1. Adding numbers, percentages, timeframes, and scale
2. Focusing on measurable business impact
3. Highlighting safety improvements, cost savings, or efficiency gains
4. Using STAR method (Situation, Task, Action, Result) structure
5. Including project scope, team size, or budget figures where relevant
6. Demonstrating progression and increasing responsibility

Return 3-5 powerful achievement statements with specific metrics.`;

      case 'generate_from_raw':
        return `I am providing raw content about my skills, qualifications, and certifications. Please create a professional and well-structured resume from this data. Organize it into standard resume sections such as:

Header (Name, Contact Information – use placeholders if not provided)
Professional Summary (2–3 lines highlighting my strengths as an electrician)
Skills (technical skills, regulatory knowledge, software tools, etc.)
Certifications (e.g., City & Guilds, Wiring Regulations, PAT Testing)
Work Experience (create a clean section with placeholders if no details are provided)
Education (use the provided qualifications, and placeholders if needed)

Make sure the formatting is consistent, polished, and easy to read. Keep the tone professional and suitable for job applications. Do not change the meaning of the content but refine the wording so it looks impressive on a resume.

Raw CV Data:
${JSON.stringify(context.rawCVData, null, 2)}

Return the response in JSON format with the following structure:
{
  "personalInfo": {
    "fullName": "enhanced name or use existing",
    "email": "enhanced or use existing",
    "phone": "enhanced or use existing", 
    "address": "enhanced or use existing",
    "postcode": "enhanced or use existing",
    "professionalSummary": "professional 2-3 line summary"
  },
  "experience": [
    {
      "id": "unique-id",
      "jobTitle": "enhanced job title",
      "company": "enhanced company name",
      "location": "enhanced location",
      "startDate": "enhanced start date",
      "endDate": "enhanced end date or Present",
      "current": boolean,
      "description": "professional bullet points describing achievements and responsibilities"
    }
  ],
  "education": [
    {
      "id": "unique-id",
      "qualification": "enhanced qualification name",
      "institution": "enhanced institution name", 
      "location": "enhanced location",
      "startDate": "enhanced start date",
      "endDate": "enhanced end date",
      "current": boolean,
      "grade": "enhanced grade if available"
    }
  ],
  "skills": ["enhanced skill 1", "enhanced skill 2", ...],
  "certifications": ["enhanced certification 1", "enhanced certification 2", ...]
}`;

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

  static async refineContent(currentContent: string, context: AIGenerationRequest['context'], userInput?: string): Promise<string> {
    const response = await this.callAIAssistant({
      type: 'refine_content',
      context: { ...context, currentContent },
      userInput
    });
    return response.content;
  }

  static async optimizeForATS(currentContent: string, context: AIGenerationRequest['context'], userInput?: string): Promise<string> {
    const response = await this.callAIAssistant({
      type: 'optimize_ats',
      context: { ...context, currentContent },
      userInput
    });
    return response.content;
  }

  static async quantifyAchievements(currentContent: string, context: AIGenerationRequest['context'], userInput?: string): Promise<string[]> {
    const response = await this.callAIAssistant({
      type: 'quantify_achievements',
      context: { ...context, currentContent },
      userInput
    });
    return response.content.split('\n').filter(line => line.trim().length > 0);
  }

  static async generateFromRawContent(rawCVData: any): Promise<any> {
    const response = await this.callAIAssistant({
      type: 'generate_from_raw',
      context: { rawCVData }
    });
    
    try {
      // Try to parse JSON response
      const parsed = JSON.parse(response.content);
      return parsed;
    } catch (error) {
      // If JSON parsing fails, return a structured response
      console.warn('Failed to parse JSON response, using content as-is');
      return {
        content: response.content,
        error: 'Failed to parse structured response'
      };
    }
  }
}
