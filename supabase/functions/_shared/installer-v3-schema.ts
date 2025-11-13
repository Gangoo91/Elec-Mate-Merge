/**
 * AI Tool Schema for Installer V3
 * Extracted to reduce bundle size
 */

export const installerV3ToolSchema = {
  type: 'function' as const,
  function: {
    name: 'provide_installation_guidance',
    description: 'Return comprehensive installation guidance. MUST extract specific measurements from the installation knowledge database.',
    parameters: {
      type: 'object',
      properties: {
        response: {
          type: 'string',
          description: 'Natural, conversational response IN UK ENGLISH ONLY (authorised not authorized, realise not realize, organise not organize, metres not meters, whilst not while). Reference previous messages naturally. As long as needed to answer thoroughly.'
        },
        installationSteps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              step: { type: 'number' },
              title: { type: 'string' },
              description: { 
                type: 'string', 
                description: 'COMPREHENSIVE, FIELD-READY step description (MINIMUM 150-300 words, 8-15 sentences). Structure with numbered sub-steps or bullet points. MANDATORY FORMAT: 1️⃣ Overview Sentence 2️⃣ Detailed Sub-Steps (3-6 sub-tasks) 3️⃣ Measurements & Specifications 4️⃣ Quality Checks 5️⃣ BS 7671 Reference'
              },
              tools: { 
                type: 'array', 
                items: { type: 'string' },
                minItems: 3,
                description: 'MANDATORY: List 3-10 SPECIFIC tools needed for THIS STEP based on the work described.' 
              },
              materials: { 
                type: 'array', 
                items: { type: 'string' },
                description: 'List SPECIFIC materials for THIS STEP with quantities where applicable. EXTRACT from Practical Work Intelligence RAG data.'
              },
              safetyNotes: { 
                type: 'array', 
                items: { 
                  type: 'string', 
                  description: 'STEP-SPECIFIC safety requirements for THIS STEP ONLY (not general project safety). In UK English.' 
                } 
              },
              linkedHazards: { 
                type: 'array', 
                items: { type: 'string' },
                minItems: 2,
                description: 'MANDATORY: Identify 2-5 SPECIFIC hazards for THIS STEP. Format: "[Hazard] - [Mitigation]".'
              },
              qualifications: { 
                type: 'array', 
                items: { type: 'string' },
                description: 'Required qualifications/competencies for the person performing THIS STEP.'
              },
              estimatedTime: { 
                type: 'number', 
                description: 'Estimated time in minutes for this step.' 
              }
            },
            required: ['step', 'title', 'description']
          }
        },
        practicalTips: {
          type: 'array',
          items: { type: 'string' }
        },
        commonMistakes: {
          type: 'array',
          items: { type: 'string' }
        },
        toolsRequired: {
          type: 'array',
          items: { type: 'string' }
        },
        testingProcedures: {
          type: 'array',
          minItems: 5,
          description: 'MANDATORY: Provide MINIMUM 5 comprehensive BS 7671-compliant testing procedures.',
          items: {
            type: 'object',
            properties: {
              testName: { 
                type: 'string',
                description: 'Name of test (e.g., "Continuity of Protective Conductors (R1+R2)")'
              },
              standard: { 
                type: 'string',
                description: 'BS 7671 regulation reference (e.g., "BS 7671 Reg 643.2.1")'
              },
              procedure: { 
                type: 'string',
                description: 'DETAILED test procedure in UK English (3-5 sentences minimum).'
              },
              acceptanceCriteria: { 
                type: 'string',
                description: 'SPECIFIC acceptance criteria with exact values from BS 7671.'
              },
              certificateRequired: { 
                type: 'string',
                description: 'Certificate type where test results are recorded.'
              },
              regulationRef: { 
                type: 'string',
                description: 'Full BS 7671 regulation reference.'
              }
            },
            required: ['testName', 'standard', 'procedure', 'acceptanceCriteria']
          }
        },
        competencyRequirements: {
          type: 'object',
          description: 'MANDATORY: Specify overall competency requirements for the complete installation job.',
          properties: {
            minimumQualifications: {
              type: 'array',
              minItems: 2,
              items: { type: 'string' },
              description: 'MANDATORY: List SPECIFIC minimum qualifications required.'
            },
            supervision: {
              type: 'string',
              description: 'Supervision requirements.'
            },
            additionalTraining: {
              type: 'array',
              items: { type: 'string' },
              description: 'Additional training/certifications genuinely relevant to THIS job.'
            }
          },
          required: ['minimumQualifications']
        },
        siteLogistics: {
          type: 'object',
          description: 'MANDATORY: Provide detailed site logistics.',
          properties: {
            isolationPoints: {
              type: 'array',
              minItems: 1,
              items: { type: 'string' },
              description: 'MANDATORY: List SPECIFIC isolation points with detail.'
            },
            accessRequirements: {
              type: 'string',
              description: 'MANDATORY: Comprehensive site access information (minimum 2-3 sentences).'
            },
            permitsRequired: {
              type: 'array',
              items: { type: 'string' },
              description: 'MANDATORY: Permits required.'
            },
            workingHours: {
              type: 'string',
              description: 'Recommended working hours considering supply interruption impact.'
            }
          },
          required: ['isolationPoints', 'accessRequirements', 'permitsRequired']
        },
        regulatoryCitations: {
          type: 'array',
          minItems: 3,
          description: 'MANDATORY: Provide MINIMUM 3 BS 7671 regulatory citations.',
          items: {
            type: 'object',
            properties: {
              regulation: {
                type: 'string',
                description: 'Full BS 7671 regulation reference.'
              },
              applicableToStep: {
                type: 'number',
                description: 'Step number this regulation applies to.'
              },
              requirement: {
                type: 'string',
                description: 'Plain English summary of what the regulation requires.'
              }
            },
            required: ['regulation', 'applicableToStep', 'requirement']
          }
        }
      },
      required: ['response'],
      additionalProperties: false
    }
  }
};
