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
                description: 'FIELD-READY step description (100-200 words). Structure with numbered sub-steps or bullet points. INCLUDE: 1️⃣ Overview 2️⃣ Sub-Steps (3-5 sub-tasks) 3️⃣ Key Measurements 4️⃣ Quality Checks 5️⃣ BS 7671 Reference if applicable'
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
          minItems: 3,
          description: 'Provide 3-5 essential BS 7671-compliant testing procedures relevant to this specific installation.',
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
          description: 'Provide site logistics if specific to this installation (e.g., confined space, working at height). Omit for standard installations.',
          properties: {
            isolationPoints: {
              type: 'array',
              items: { type: 'string' },
              description: 'List SPECIFIC isolation points with detail.'
            },
            accessRequirements: {
              type: 'string',
              description: 'Site access information (2-3 sentences).'
            },
            permitsRequired: {
              type: 'array',
              items: { type: 'string' },
              description: 'Permits required.'
            },
            workingHours: {
              type: 'string',
              description: 'Recommended working hours considering supply interruption impact.'
            }
          }
        },
        regulatoryCitations: {
          type: 'array',
          minItems: 2,
          description: 'Provide 2-4 key BS 7671 regulatory citations most relevant to this installation.',
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
