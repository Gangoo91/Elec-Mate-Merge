
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
      console.log(`AI Service: Making request with type: ${request.type}`);
      
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

      console.log('AI Service: Raw response data:', data);

      if (!data) {
        throw new Error('No response from AI service');
      }

      // Handle response structure - data.response contains the AI response
      const responseContent = data.response || data;
      console.log('AI Service: Response content type:', typeof responseContent);
      console.log('AI Service: Response content sample:', responseContent?.substring?.(0, 200));

      return this.parseAIResponse(responseContent, request.type);
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
        return `CRITICAL: You must respond with ONLY valid JSON - no markdown, no explanations, no additional text.

Transform the provided raw CV data into a professional, well-structured resume using UK electrical industry standards. Enhance the content while preserving all original meaning.

Requirements:
- Use British English spelling and electrical terminology (earth, consumer unit, BS 7671)
- Enhance job titles with proper electrical industry terms
- Create compelling professional summary highlighting electrical expertise
- Quantify achievements where possible (projects completed, team sizes, timeframes)
- Use action verbs: managed, delivered, implemented, achieved, optimised, installed
- Include relevant electrical certifications and qualifications
- Ensure content is ATS-optimized with industry keywords

Raw CV Data:
${JSON.stringify(context.rawCVData, null, 2)}

Return ONLY this exact JSON structure with enhanced content:
{
  "personalInfo": {
    "fullName": "enhanced name or use existing",
    "email": "enhanced or use existing",
    "phone": "enhanced or use existing", 
    "address": "enhanced or use existing",
    "postcode": "enhanced or use existing",
    "professionalSummary": "Professional 2-3 line summary highlighting electrical expertise, experience, and key qualifications"
  },
  "experience": [
    {
      "id": "unique-id",
      "jobTitle": "Professional electrical job title",
      "company": "Company name",
      "location": "City, UK",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "current": false,
      "description": "Enhanced bullet points with achievements, quantified results, and technical accomplishments using electrical terminology"
    }
  ],
  "education": [
    {
      "id": "unique-id",
      "qualification": "Enhanced qualification name",
      "institution": "Institution name", 
      "location": "City, UK",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY",
      "current": false,
      "grade": "Grade if available"
    }
  ],
  "skills": ["Electrical Installation", "BS 7671 18th Edition", "PAT Testing", "Fault Finding", "Additional skills..."],
  "certifications": ["City & Guilds Level 3", "18th Edition Wiring Regulations", "PAT Testing Certification", "Additional certifications..."]
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
    console.log('AI Service: Generating from raw content:', rawCVData);
    
    try {
      const response = await this.callAIAssistant({
        type: 'generate_from_raw',
        context: { rawCVData }
      });
      
      console.log('AI Service: Raw AI response received:', typeof response.content);
      console.log('AI Service: Response content preview:', response.content?.substring?.(0, 500));
      
      // Handle the response content - it might be a string that needs parsing
      let contentToParse = response.content;
      
      // If the response content is already an object (unlikely but possible), return it directly
      if (typeof contentToParse === 'object') {
        console.log('AI Service: Content is already an object, validating structure');
        return this.validateCVStructure(contentToParse);
      }
      
      // Sanitize the response to extract JSON
      const sanitized = this.sanitizeJSONResponse(contentToParse);
      console.log('AI Service: Sanitized response preview:', sanitized.substring(0, 300));
      
      // Try to parse JSON response
      let parsed;
      try {
        parsed = JSON.parse(sanitized);
        console.log('AI Service: Successfully parsed JSON response');
      } catch (parseError) {
        console.error('AI Service: JSON parse error:', parseError);
        console.error('AI Service: Failed to parse content:', sanitized.substring(0, 500));
        throw new SyntaxError(`Invalid JSON response from AI: ${parseError.message}`);
      }
      
      // Validate the parsed response structure
      const validated = this.validateCVStructure(parsed);
      console.log('AI Service: Successfully validated CV structure');
      
      return validated;
    } catch (error) {
      console.error('AI Service: Error in generateFromRawContent:', error);
      
      // Provide more specific error handling
      if (error instanceof SyntaxError) {
        throw new Error(`AI returned invalid response format: ${error.message}. Please try again or check your input data.`);
      } else if (error.message.includes('AI service error')) {
        throw new Error('AI service is temporarily unavailable. Please try again in a moment.');
      } else {
        throw new Error(`Failed to generate professional resume: ${error.message}`);
      }
    }
  }

  private static sanitizeJSONResponse(response: string): string {
    console.log('AI Service: Sanitizing JSON response, input type:', typeof response);
    console.log('AI Service: Input response preview:', response?.substring?.(0, 200));
    
    if (typeof response !== 'string') {
      throw new Error(`Expected string response but got ${typeof response}`);
    }
    
    // Remove markdown code blocks if present
    let sanitized = response.replace(/```json\s*/gi, '').replace(/```\s*$/gm, '');
    
    // Remove any text before the first { and after the last }
    const firstBrace = sanitized.indexOf('{');
    const lastBrace = sanitized.lastIndexOf('}');
    
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      console.error('AI Service: No valid JSON braces found in response');
      throw new Error('No valid JSON structure found in AI response');
    }
    
    sanitized = sanitized.substring(firstBrace, lastBrace + 1);
    
    // Clean up extra whitespace and newlines
    sanitized = sanitized.trim();
    
    console.log('AI Service: Sanitized response preview:', sanitized.substring(0, 200));
    return sanitized;
  }

  private static validateCVStructure(data: any): any {
    // Ensure the response has the required structure
    const defaultStructure = {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        postcode: "",
        professionalSummary: ""
      },
      experience: [],
      education: [],
      skills: [],
      certifications: []
    };

    // Merge with defaults to ensure all required fields exist
    const validated = {
      personalInfo: {
        ...defaultStructure.personalInfo,
        ...(data.personalInfo || {})
      },
      experience: Array.isArray(data.experience) ? data.experience.map((exp: any, index: number) => ({
        id: exp.id || `exp-${index}-${Date.now()}`,
        jobTitle: exp.jobTitle || 'Position Title',
        company: exp.company || 'Company Name',
        location: exp.location || 'Location',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        current: exp.current || false,
        description: exp.description || 'Job description and achievements'
      })) : [],
      education: Array.isArray(data.education) ? data.education.map((edu: any, index: number) => ({
        id: edu.id || `edu-${index}-${Date.now()}`,
        qualification: edu.qualification || 'Qualification',
        institution: edu.institution || 'Institution',
        location: edu.location || 'Location',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        current: edu.current || false,
        grade: edu.grade || ''
      })) : [],
      skills: Array.isArray(data.skills) ? data.skills : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : []
    };

    return validated;
  }
}
