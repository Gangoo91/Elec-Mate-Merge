// Installation Method Agent Output Schema Definitions

export const INSTALLATION_METHOD_FULL_SCHEMA = {
  type: "object",
  title: "Installation Method Statement (Full Mode)",
  description: "Complete structured output from the AI Installation Specialist",
  properties: {
    projectMetadata: {
      type: "object",
      description: "Project and document metadata",
      properties: {
        workType: { type: "string", description: "Type of work (Domestic/Commercial/Industrial)" },
        location: { type: "string", description: "Job location/site address" },
        principalContractor: { type: "string", description: "Principal contractor name" },
        reference: { type: "string", description: "Method statement reference number" },
        preparedBy: { type: "string", description: "Person/organisation who prepared this" },
        date: { type: "string", description: "Date of preparation (ISO format)" },
        programmeDuration: { type: "string", description: "Expected work programme duration" },
        reviewDate: { type: "string", description: "Date for next review" },
        documentStatus: { type: "string", description: "Current document status" },
        emergencyContacts: {
          type: "object",
          description: "Emergency contacts and key personnel",
          properties: {
            emergency: { type: "string", description: "Emergency number (999)" },
            siteManager: { type: "string", description: "Site manager name and contact" },
            firstAider: { type: "string", description: "First aider name and contact" },
            hsOfficer: { type: "string", description: "H&S officer name and contact" },
            assemblyPoint: { type: "string", description: "Assembly point location" }
          }
        },
        riskAssessmentReference: { type: "string", description: "Associated Risk Assessment reference" }
      }
    },
    executiveSummary: {
      type: "object",
      description: "High-level overview of the installation",
      properties: {
        workScope: { type: "string", description: "Summary of work to be performed" },
        keyRisks: { 
          type: "array", 
          items: { type: "string" },
          description: "Primary hazards identified"
        },
        duration: { type: "string", description: "Estimated total duration" },
        teamSize: { type: "string", description: "Required team composition" }
      }
    },
    materialsList: {
      type: "array",
      description: "Complete bill of materials",
      items: {
        type: "object",
        properties: {
          item: { type: "string", description: "Material name" },
          quantity: { type: "string", description: "Quantity required" },
          specification: { type: "string", description: "Technical specification" },
          bsStandard: { type: "string", description: "BS standard reference" }
        }
      }
    },
    steps: {
      type: "array",
      description: "Detailed installation steps (12-15 steps)",
      minItems: 12,
      maxItems: 15,
      items: {
        type: "object",
        properties: {
          step: { type: "number", description: "Step number" },
          title: { type: "string", description: "Step title" },
          description: { type: "string", description: "Detailed step description (100-200 words)" },
          tools: { 
            type: "array", 
            items: { type: "string" },
            description: "Tools required for this step"
          },
          materials: { 
            type: "array", 
            items: { type: "string" },
            description: "Materials needed for this step"
          },
          safetyNotes: { 
            type: "array", 
            items: { type: "string" },
            description: "Safety considerations"
          },
          duration: { type: "string", description: "Estimated duration for this step" },
          personnel: { type: "string", description: "Personnel requirements" }
        }
      }
    },
    testingRequirements: {
      type: "object",
      description: "BS 7671 testing procedures summary",
      properties: {
        intro: { type: "string", description: "Introduction to testing requirements" },
        tests: {
          type: "array",
          items: {
            type: "object",
            properties: {
              testName: { type: "string", description: "Name of the test" },
              regulation: { type: "string", description: "BS 7671 regulation reference" },
              acceptanceCriteria: { type: "string", description: "Pass/fail criteria" }
            }
          }
        },
        recordingNote: { type: "string", description: "Notes on recording results" }
      }
    },
    testingProcedures: {
      type: "array",
      description: "Detailed testing procedures",
      items: {
        type: "object",
        properties: {
          testName: { type: "string" },
          regulation: { type: "string" },
          procedure: { type: "array", items: { type: "string" } },
          acceptanceCriteria: { type: "string" }
        }
      }
    },
    regulatoryReferences: {
      type: "array",
      description: "BS 7671 regulation citations",
      items: {
        type: "object",
        properties: {
          regulation: { type: "string", description: "Regulation number" },
          requirement: { type: "string", description: "Requirement description" },
          applicableToStep: { type: "number", description: "Step number this applies to" }
        }
      }
    },
    scopeOfWork: {
      type: "object",
      description: "Scope definition",
      properties: {
        inclusions: { type: "array", items: { type: "string" } },
        exclusions: { type: "array", items: { type: "string" } }
      }
    },
    scheduleDetails: {
      type: "object",
      description: "Timeline information",
      properties: {
        totalDuration: { type: "string" },
        phases: { type: "array", items: { type: "object" } }
      }
    },
    practicalTips: {
      type: "array",
      description: "Extracted practical tips",
      items: { type: "string" }
    },
    commonMistakes: {
      type: "array",
      description: "Common mistakes to avoid",
      items: { type: "string" }
    },
    ragCitations: {
      type: "array",
      description: "RAG knowledge base sources used",
      items: {
        type: "object",
        properties: {
          regulation: { type: "string", description: "Regulation number" },
          content: { type: "string", description: "Citation content" },
          source: { type: "string", description: "Source knowledge base" }
        }
      }
    }
  },
  required: ["steps", "testingRequirements"]
};

export const INSTALLATION_METHOD_SIMPLIFIED_SCHEMA = {
  type: "object",
  title: "Installation Guidance (Simplified Mode)",
  description: "Structured installation guidance for Circuit Designer integration",
  properties: {
    installationGuidance: {
      type: "object",
      description: "Structured installation guidance for circuit design",
      properties: {
        safetyConsiderations: {
          type: "array",
          items: { type: "string" },
          description: "Critical safety requirements"
        },
        materialsRequired: {
          type: "array",
          items: { type: "string" },
          description: "Materials needed for installation"
        },
        toolsRequired: {
          type: "array",
          items: { type: "string" },
          description: "Tools required for the job"
        },
        cableRouting: {
          type: "array",
          items: {
            type: "object",
            properties: {
              method: { type: "string", description: "Routing method description" },
              bsReference: { type: "string", description: "BS 7671 reference" }
            }
          },
          description: "Cable routing and containment methods"
        },
        terminationRequirements: {
          type: "array",
          items: {
            type: "object",
            properties: {
              procedure: { type: "string", description: "Termination procedure" },
              torqueSettings: { type: "string", description: "Torque specifications" }
            }
          },
          description: "Termination procedures"
        },
        installationProcedure: {
          type: "array",
          items: { type: "string" },
          description: "Step-by-step installation procedure"
        }
      }
    },
    testingRequirements: {
      type: "object",
      description: "Testing requirements summary",
      properties: {
        intro: { type: "string", description: "Introduction to testing" },
        tests: { 
          type: "array",
          description: "List of required tests"
        },
        recordingNote: { type: "string", description: "Recording guidance" }
      }
    },
    ragContextUsed: {
      type: "object",
      description: "RAG extraction metrics",
      properties: {
        regulationsCount: { type: "number", description: "Number of regulations retrieved" },
        practicalProceduresCount: { type: "number", description: "Number of practical procedures retrieved" },
        toolsExtracted: { type: "number", description: "Number of tools extracted from RAG" },
        materialsExtracted: { type: "number", description: "Number of materials extracted from RAG" }
      }
    },
    ragCitations: {
      type: "array",
      description: "RAG sources used",
      items: {
        type: "object",
        properties: {
          regulation: { type: "string" },
          content: { type: "string" },
          source: { type: "string" }
        }
      }
    }
  },
  required: ["installationGuidance", "testingRequirements"]
};
