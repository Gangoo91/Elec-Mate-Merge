/**
 * EICR Defect Coding Tool Schema
 * Complete 8-field structure for consistent defect coding
 */

export const eicrDefectCodingTool = {
  type: 'function' as const,
  function: {
    name: 'provide_eicr_defect_coding',
    description: 'Provide comprehensive EICR defect coding with all 8 mandatory fields: primary code, secondary code (if context-dependent), BS 7671 regulations, GN3 guidance, NAPIT reference, hazard explanation, rectification steps, and verification procedure.',
    parameters: {
      type: 'object',
      properties: {
        defectSummary: {
          type: 'string',
          minLength: 20,
          maxLength: 150,
          description: 'Clear one-sentence description of the defect (e.g., "Socket outlets in bedroom without 30mA RCD protection")'
        },
        primaryCode: {
          type: 'object',
          required: ['code', 'title', 'urgency'],
          properties: {
            code: {
              type: 'string',
              enum: ['C1', 'C2', 'C3', 'FI'],
              description: 'Primary EICR observation code'
            },
            title: {
              type: 'string',
              description: 'Full title of code (e.g., "Danger Present", "Potentially Dangerous")'
            },
            urgency: {
              type: 'string',
              enum: ['IMMEDIATE', 'URGENT', 'RECOMMENDED', 'INVESTIGATE'],
              description: 'Action urgency level'
            }
          }
        },
        secondaryCode: {
          type: 'object',
          description: 'Alternative code if installation context changes the classification. ONLY provide if code is genuinely context-dependent.',
          properties: {
            code: {
              type: 'string',
              enum: ['C1', 'C2', 'C3', 'FI']
            },
            condition: {
              type: 'string',
              minLength: 20,
              description: 'Specific condition that would trigger this alternative code (e.g., "If socket is in bathroom Zone 1")'
            },
            reasoning: {
              type: 'string',
              minLength: 30,
              description: 'Explanation of why context changes the code severity'
            }
          },
          required: ['code', 'condition', 'reasoning']
        },
        bs7671Regulations: {
          type: 'array',
          minItems: 1,
          maxItems: 4,
          items: {
            type: 'object',
            required: ['regulation', 'description'],
            properties: {
              regulation: {
                type: 'string',
                pattern: '^(\\d{3}\\.\\d+|Table [0-9A-Z.]+|Appendix \\d+)',
                description: 'Regulation number (e.g., "411.3.3", "Table 41.3")'
              },
              description: {
                type: 'string',
                minLength: 20,
                description: 'What this regulation requires'
              }
            }
          }
        },
        gn3Guidance: {
          type: 'object',
          required: ['section', 'content'],
          properties: {
            section: {
              type: 'string',
              pattern: '^GN3 Section \\d+\\.\\d+',
              description: 'GN3 section reference (e.g., "GN3 Section 3.2")'
            },
            content: {
              type: 'string',
              minLength: 30,
              maxLength: 200,
              description: 'Brief summary of GN3 guidance for this code'
            }
          }
        },
        napitReference: {
          type: 'object',
          required: ['code', 'description'],
          properties: {
            code: {
              type: 'string',
              pattern: '^C[1-3]-\\d{3}|FI-\\d{3}',
              description: 'NAPIT Code Directory reference (e.g., "C2-002")'
            },
            description: {
              type: 'string',
              minLength: 20,
              description: 'NAPIT description of this specific defect type'
            }
          }
        },
        hazardExplanation: {
          type: 'string',
          minLength: 100,
          maxLength: 400,
          description: 'Detailed explanation of the hazard in 100-400 words. Must explain: (1) What danger exists, (2) How injury/damage could occur, (3) Who is at risk, (4) Under what conditions the hazard manifests'
        },
        rectification: {
          type: 'object',
          required: ['steps'],
          properties: {
            steps: {
              type: 'array',
              minItems: 3,
              maxItems: 8,
              items: {
                type: 'string',
                minLength: 30,
                description: 'Specific actionable step for rectification'
              }
            },
            estimatedTime: {
              type: 'string',
              description: 'Realistic time estimate (e.g., "2-4 hours", "Full day install")'
            },
            requiredMaterials: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of specific materials/equipment needed'
            }
          }
        },
        verificationProcedure: {
          type: 'object',
          required: ['tests', 'acceptanceCriteria'],
          properties: {
            tests: {
              type: 'array',
              minItems: 2,
              maxItems: 6,
              items: {
                type: 'string',
                minLength: 20,
                description: 'Specific test to verify rectification (e.g., "Insulation resistance test L-E: ≥1MΩ at 500V")'
              }
            },
            acceptanceCriteria: {
              type: 'array',
              minItems: 2,
              maxItems: 6,
              items: {
                type: 'string',
                minLength: 15,
                description: 'Pass criteria for each test (e.g., "RCD trips within 40ms at 1× rated current")'
              }
            }
          }
        },
        confidenceAssessment: {
          type: 'object',
          required: ['level', 'score', 'reasoning'],
          properties: {
            level: {
              type: 'string',
              enum: ['high', 'medium', 'low'],
              description: 'Confidence in code classification'
            },
            score: {
              type: 'number',
              minimum: 0,
              maximum: 100,
              description: 'Confidence percentage (high: 85-100, medium: 60-84, low: 0-59)'
            },
            reasoning: {
              type: 'string',
              minLength: 30,
              maxLength: 200,
              description: 'Why this confidence level? What additional info would increase confidence?'
            }
          }
        },
        contextFactors: {
          type: 'object',
          description: 'Installation context that affects code classification. Only include factors that are relevant to THIS specific defect.',
          properties: {
            bathroomZone: {
              type: 'string',
              enum: ['0', '1', '2', 'Outside zones'],
              description: 'If relevant to defect severity'
            },
            outdoorLocation: {
              type: 'boolean',
              description: 'Is defect in outdoor location?'
            },
            rcdPresent: {
              type: 'boolean',
              description: 'Is 30mA RCD protection present?'
            },
            conductorSize: {
              type: 'string',
              description: 'Cable CSA if relevant (e.g., "2.5mm²", "10mm²")'
            },
            enclosureRating: {
              type: 'string',
              description: 'IP rating if relevant (e.g., "IP20", "IP65", "No rating")'
            },
            supplementaryBonding: {
              type: 'boolean',
              description: 'Is supplementary bonding present where required?'
            }
          }
        }
      },
      required: [
        'defectSummary',
        'primaryCode',
        'bs7671Regulations',
        'gn3Guidance',
        'napitReference',
        'hazardExplanation',
        'rectification',
        'verificationProcedure',
        'confidenceAssessment'
      ]
    }
  }
};
