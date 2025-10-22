/**
 * Structured AI Response Schemas
 * JSON schemas for enforcing consistent AI output
 */

export const DESIGNER_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    summary: { 
      type: "string", 
      description: "1-2 sentence overview in conversational tone" 
    },
    design: {
      type: "object",
      properties: {
        cable: { type: "string", description: "Cable specification (e.g., '6mm² twin & earth')" },
        mcb: { type: "string", description: "MCB rating (e.g., '40A Type B')" },
        voltageDrop: { type: "string", description: "Voltage drop result with pass/fail" },
        earthFault: { type: "string", description: "Zs check with pass/fail" }
      },
      required: ["cable", "mcb", "voltageDrop", "earthFault"]
    },
    regulations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          number: { type: "string" },
          what: { type: "string", description: "Plain English: what does this reg say?" },
          why: { type: "string", description: "Why it matters for THIS installation" },
          consequence: { type: "string", description: "What happens if ignored" }
        },
        required: ["number", "what", "why"]
      }
    },
    practicalGuidance: {
      type: "object",
      properties: {
        installation: { type: "array", items: { type: "string" } },
        testing: { type: "array", items: { type: "string" } },
        commonMistakes: { type: "array", items: { type: "string" } }
      }
    },
    warnings: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["summary", "design", "regulations", "practicalGuidance"],
  additionalProperties: false
};

export const HEALTH_SAFETY_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    response: {
      type: "string",
      description: "Comprehensive UK English explanation (200-300 words)"
    },
    riskAssessment: {
      type: "object",
      properties: {
        hazards: {
          type: "array",
          items: {
            type: "object",
            properties: {
              hazard: { type: "string" },
              likelihood: { type: "number", minimum: 1, maximum: 5 },
              severity: { type: "number", minimum: 1, maximum: 5 },
              riskScore: { type: "number" },
              riskLevel: { type: "string", enum: ["low", "medium", "high", "very-high"] },
              regulation: { type: "string" }
            },
            required: ["hazard", "likelihood", "severity", "riskScore", "riskLevel"]
          }
        },
        controls: {
          type: "array",
          items: {
            type: "object",
            properties: {
              hazard: { type: "string" },
              controlMeasure: { type: "string" },
              residualRisk: { type: "number" },
              residualRiskLevel: { type: "string" }
            }
          }
        },
        ppeDetails: {
          type: "array",
          description: "Structured PPE extracted from knowledge base",
          items: {
            type: "object",
            properties: {
              itemNumber: { type: "number" },
              ppeType: { type: "string" },
              standard: { type: "string" },
              mandatory: { type: "boolean" },
              purpose: { type: "string" }
            },
            required: ["itemNumber", "ppeType", "standard", "mandatory", "purpose"]
          }
        }
      },
      required: ["hazards", "controls"]
    }
  },
  required: ["response", "riskAssessment"],
  additionalProperties: false
};

export const COMMISSIONING_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    response: {
      type: "string",
      description: "COMPREHENSIVE GN3 testing guidance (300-400 words)"
    },
    testingProcedure: {
      type: "object",
      properties: {
        deadTests: {
          type: "array",
          items: {
            type: "object",
            properties: {
              testName: { type: "string" },
              regulation: { type: "string" },
              instrumentSetup: { type: "string" },
              procedure: { type: "array", items: { type: "string" } },
              expectedResult: { type: "object" }
            }
          }
        },
        liveTests: {
          type: "array",
          items: {
            type: "object",
            properties: {
              testName: { type: "string" },
              regulation: { type: "string" },
              procedure: { type: "array", items: { type: "string" } },
              expectedResult: { type: "object" }
            }
          }
        }
      }
    }
  },
  required: ["response", "testingProcedure"],
  additionalProperties: false
};
