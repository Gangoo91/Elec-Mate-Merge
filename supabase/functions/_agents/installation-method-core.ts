/**
 * VERSION: v3.1.0 - Circuit-Specific RAG & Prompts (2025-11-22)
 * Installation Method Core Agent
 * ISOLATED from AI RAMS - Used ONLY by Installation Specialist
 * Generates enhanced method statements for professional PDF templates
 * 
 * NOTE: This file exports TWO functions:
 * 1. generateInstallationMethod - Used by standalone installation-method-agent (existing)
 * 2. generateInstallationMethods - Used by new circuit-design-v2 unified function (new)
 */

import { searchInstallationMethodRAG } from './installation-method-rag.ts';
import { callOpenAI } from '../_shared/ai-providers.ts';
import { createLogger } from '../_shared/logger.ts';

/**
 * Detect installation type from project details
 */
function detectInstallationType(projectDetails: any): 'domestic' | 'commercial' | 'industrial' {
  const type = projectDetails?.installationType?.toLowerCase() || 
               projectDetails?.projectInfo?.workType?.toLowerCase() || 
               '';
  
  if (type.includes('domestic') || type.includes('residential')) return 'domestic';
  if (type.includes('industrial')) return 'industrial';
  return 'commercial'; // default
}

/**
 * Extract circuit-specific keywords grouped by loadType for circuit-specific guidance
 */
function extractCircuitKeywordsByType(circuits: any[]): Record<string, string[]> {
  const keywordsByCircuit: Record<string, string[]> = {};
  
  circuits.forEach((circuit, idx) => {
    const keywords = new Set<string>();
    const loadType = circuit.loadType?.toLowerCase() || 'general';
    
    // Load type specific keywords
    if (loadType.includes('ev')) {
      keywords.add('electric vehicle charging');
      keywords.add('EV charger installation');
      keywords.add('dedicated EV circuit');
      if (circuit.chargerPower) keywords.add(`${circuit.chargerPower}kW charger`);
    } else if (loadType.includes('shower')) {
      keywords.add('electric shower installation');
      keywords.add('high current circuits');
      keywords.add('water heating');
      if (circuit.power) keywords.add(`${Math.round(circuit.power/1000)}kW shower`);
    } else if (loadType.includes('cooker')) {
      keywords.add('cooker circuit');
      keywords.add('diversity factor');
      keywords.add('cooker control unit');
    } else if (loadType.includes('socket')) {
      keywords.add('socket circuits');
      keywords.add('socket outlet installation');
      if (circuit.description?.toLowerCase().includes('ring')) {
        keywords.add('ring final circuit');
      } else {
        keywords.add('radial socket circuit');
      }
    } else if (loadType.includes('light')) {
      keywords.add('lighting circuits');
      keywords.add('lighting installation');
      keywords.add('switching arrangements');
    } else if (loadType.includes('motor')) {
      keywords.add('motor circuits');
      keywords.add('motor control');
      keywords.add('starting methods');
    }
    
    // Cable size keywords
    if (circuit.cableSize) {
      keywords.add(`${circuit.cableSize}mm cable`);
      keywords.add(`${circuit.cableSize}mm² conductor`);
    }
    
    // Protection device keywords
    if (circuit.protectionDevice) {
      keywords.add(circuit.protectionDevice);
      const match = circuit.protectionDevice.match(/(\d+)A/);
      if (match) keywords.add(`${match[1]} amp protection`);
    }
    
    // Installation method keywords
    if (circuit.installationMethod) {
      keywords.add(circuit.installationMethod);
    }
    
    keywordsByCircuit[`circuit_${idx}_${loadType}`] = Array.from(keywords);
  });
  
  return keywordsByCircuit;
}

/**
 * Extract rich keywords from job inputs for fast intelligence search
 */
function extractInstallationKeywords(jobInputs: any, designerContext?: any): string[] {
  const keywords = new Set<string>();
  
  // Installation type keywords
  const installationType = detectInstallationType(jobInputs);
  keywords.add(installationType);
  
  if (installationType === 'domestic') {
    keywords.add('residential');
    keywords.add('dwelling');
    keywords.add('Part P');
  } else if (installationType === 'commercial') {
    keywords.add('business');
    keywords.add('office');
    keywords.add('non-domestic');
  } else if (installationType === 'industrial') {
    keywords.add('factory');
    keywords.add('manufacturing');
    keywords.add('three-phase');
  }
  
  // ✅ CIRCUIT-SPECIFIC KEYWORDS (enriched from designerContext)
  if (jobInputs.circuits && Array.isArray(jobInputs.circuits)) {
    jobInputs.circuits.forEach((circuit: any) => {
      // Load type
      if (circuit.loadType) {
        const loadType = circuit.loadType.toLowerCase();
        keywords.add(loadType);
        
        // ✅ Add specific load type synonyms
        if (loadType.includes('ev')) {
          keywords.add('electric vehicle charging');
          keywords.add('EV charger installation');
          if (circuit.chargerPower) {
            keywords.add(`${circuit.chargerPower}kW charger`);
          }
        }
        if (loadType.includes('shower')) {
          keywords.add('electric shower installation');
          keywords.add('high current circuits');
          if (circuit.power) {
            keywords.add(`${Math.round(circuit.power/1000)}kW shower`);
          }
        }
        if (loadType.includes('cooker')) {
          keywords.add('cooker circuit');
          keywords.add('diversity factor');
        }
        if (loadType.includes('socket')) keywords.add('socket circuits');
        if (loadType.includes('light')) keywords.add('lighting circuits');
        if (loadType.includes('motor')) keywords.add('motor circuits');
      }
      
      // ✅ Add cable size keywords
      if (circuit.cableSize) {
        keywords.add(`${circuit.cableSize}mm cable`);
        keywords.add(`${circuit.cableSize}mm² conductor`);
      }
      
      // ✅ Add protection device keywords
      if (circuit.protectionDevice) {
        keywords.add(circuit.protectionDevice);
        const match = circuit.protectionDevice.match(/(\d+)A/);
        if (match) {
          keywords.add(`${match[1]} amp protection`);
        }
      }
      
      // ✅ Add installation method keywords
      if (circuit.installationMethod) {
        keywords.add(circuit.installationMethod);
      }
      
      if (circuit.description) {
        const desc = circuit.description.toLowerCase();
        if (desc.includes('ring')) keywords.add('ring final circuit');
        if (desc.includes('radial')) keywords.add('radial circuit');
      }
    });
  }
  
  // Supply system keywords
  if (jobInputs.supply) {
    if (jobInputs.supply.earthing) {
      keywords.add(jobInputs.supply.earthing);
    }
    if (jobInputs.supply.phases) {
      keywords.add(`${jobInputs.supply.phases} phase`);
    }
  }
  
  // Generic installation keywords
  keywords.add('installation method');
  keywords.add('cable installation');
  keywords.add('testing');
  keywords.add('inspection');
  keywords.add('certification');
  
  return Array.from(keywords);
}

// Enhanced schema for Circuit Designer - RAG-driven detailed guidance
const INSTALLATION_METHOD_TOOL_SIMPLIFIED = {
  type: 'function' as const,
  function: {
    name: 'provide_installation_guidance',
    description: 'Generate detailed, context-aware installation guidance using RAG knowledge base',
    parameters: {
      type: 'object',
      properties: {
        installationGuidance: {
          type: 'object',
          properties: {
            // SAFETY CONSIDERATIONS - with specific tools and regulations
            safetyConsiderations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  consideration: { 
                    type: 'string',
                    description: 'Specific safety requirement'
                  },
                  toolsRequired: { 
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Specific tools from RAG context'
                  },
                  bsReference: { 
                    type: 'string',
                    description: 'BS 7671 regulation number from RAG'
                  },
                  priority: {
                    type: 'string',
                    enum: ['critical', 'high', 'medium'],
                    description: 'Safety priority level'
                  }
                },
                required: ['consideration', 'toolsRequired', 'priority']
              },
              minItems: 4
            },
            
            // MATERIALS LIST - extracted from RAG with specifications
            materialsRequired: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  item: { 
                    type: 'string',
                    description: 'Material description from RAG'
                  },
                  specification: { 
                    type: 'string',
                    description: 'BS/EN standard or size (e.g., "10mm² T&E to BS 6004")'
                  },
                  quantity: { 
                    type: 'string',
                    description: 'Estimated quantity'
                  },
                  source: {
                    type: 'string',
                    description: 'Where this material was identified (RAG/circuit design/calculated)'
                  }
                },
                required: ['item', 'specification', 'quantity']
              },
              minItems: 5
            },
            
            // TOOLS REQUIRED - extracted from RAG practical work intelligence
            toolsRequired: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  tool: { 
                    type: 'string',
                    description: 'Tool name from RAG context'
                  },
                  purpose: { 
                    type: 'string',
                    description: 'What this tool is used for in this installation'
                  },
                  category: {
                    type: 'string',
                    description: 'Tool category (e.g., testing, termination, installation)'
                  }
                },
                required: ['tool', 'purpose', 'category']
              },
              minItems: 8
            },
            
            // CABLE ROUTING - context-aware with specific guidance
            cableRouting: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  step: { 
                    type: 'string',
                    description: 'Routing instruction'
                  },
                  cableType: { 
                    type: 'string',
                    description: 'Specific cable type/size from RAG or circuit design'
                  },
                  method: { 
                    type: 'string',
                    description: 'Installation method (buried, surface, conduit, trunking)'
                  },
                  bsReference: { 
                    type: 'string',
                    description: 'BS 7671 regulation reference'
                  },
                  notes: {
                    type: 'string',
                    description: 'Additional context-specific notes'
                  }
                },
                required: ['step', 'method']
              },
              minItems: 4
            },
            
            // TERMINATION REQUIREMENTS - detailed with torque values
            terminationRequirements: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  location: { 
                    type: 'string',
                    description: 'Where termination occurs (consumer unit, socket, isolator)'
                  },
                  procedure: { 
                    type: 'string',
                    description: 'Termination procedure'
                  },
                  toolsNeeded: { 
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Specific tools for this termination'
                  },
                  torqueSettings: { 
                    type: 'string',
                    description: 'Torque values if applicable'
                  },
                  bsReference: { 
                    type: 'string',
                    description: 'BS 7671 reference'
                  }
                },
                required: ['location', 'procedure', 'toolsNeeded']
              },
              minItems: 3
            },
            
            // INSTALLATION STEPS - core procedures with context
            installationProcedure: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  stepNumber: { type: 'number' },
                  title: { type: 'string' },
                  description: { 
                    type: 'string',
                    description: '100-150 words context-aware description'
                  },
                  toolsForStep: { 
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Tools specifically for this step'
                  },
                  materialsForStep: { 
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Materials used in this step'
                  },
                  bsReferences: { 
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Relevant BS 7671 regulations'
                  }
                },
                required: ['stepNumber', 'title', 'description', 'toolsForStep']
              },
              minItems: 6,
              maxItems: 10
            }
          },
          required: [
            'safetyConsiderations',
            'materialsRequired',
            'toolsRequired',
            'cableRouting',
            'terminationRequirements',
            'installationProcedure'
          ]
        },
        
        // TESTING REQUIREMENTS - detailed with expected values
        testingRequirements: {
          type: 'object',
          properties: {
            intro: {
              type: 'string',
              description: 'Professional introduction to testing (BS 7671 Part 6 reference)'
            },
            tests: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  testName: { 
                    type: 'string',
                    description: 'Name of test (e.g., Continuity of Protective Conductors)'
                  },
                  regulation: { 
                    type: 'string',
                    description: 'BS 7671 regulation number'
                  },
                  procedure: { 
                    type: 'string',
                    description: 'How to perform the test'
                  },
                  expectedReading: { 
                    type: 'string',
                    description: 'Expected test result with units'
                  },
                  acceptanceCriteria: { 
                    type: 'string',
                    description: 'Pass/fail criteria'
                  },
                  toolsRequired: { 
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Testing equipment needed'
                  }
                },
                required: ['testName', 'regulation', 'procedure', 'acceptanceCriteria', 'toolsRequired']
              },
              minItems: 6
            },
            recordingNote: {
              type: 'string',
              description: 'EIC/Schedule of Test Results recording requirements'
            }
          },
          required: ['intro', 'tests', 'recordingNote']
        },
        
        // RAG CONTEXT SUMMARY - what knowledge was used
        ragContextUsed: {
          type: 'object',
          properties: {
            regulationsCount: { type: 'number' },
            practicalProceduresCount: { type: 'number' },
            toolsExtracted: { type: 'number' },
            materialsExtracted: { type: 'number' },
            keyRegulations: {
              type: 'array',
              items: { type: 'string' },
              description: 'Top 5 BS 7671 regulations used',
              maxItems: 5
            }
          },
          required: ['regulationsCount', 'practicalProceduresCount', 'toolsExtracted']
        }
      },
      required: ['installationGuidance', 'testingRequirements', 'ragContextUsed']
    }
  }
};

// Full schema for standalone Installation Specialist (comprehensive RAMS)
const INSTALLATION_METHOD_TOOL_FULL = {
  type: 'function' as const,
  function: {
    name: 'provide_installation_method_guidance',
    description: 'Generate comprehensive installation method statement for professional PDF documentation',
    parameters: {
      type: 'object',
      properties: {
        projectMetadata: {
          type: 'object',
          description: 'Project and document metadata for professional documentation',
          properties: {
            workType: { type: 'string', description: 'Type of work (Domestic/Commercial/Industrial)' },
            location: { type: 'string', description: 'Job location/site address' },
            principalContractor: { type: 'string', description: 'Principal contractor name' },
            reference: { type: 'string', description: 'Method statement reference (e.g., MS-001)' },
            preparedBy: { type: 'string', description: 'Person/organisation who prepared this' },
            date: { type: 'string', description: 'Date of preparation (ISO format)' },
            programmeDuration: { type: 'string', description: 'Expected work programme duration' },
            reviewDate: { type: 'string', description: 'Date for next review' },
            documentStatus: { 
              type: 'string',
              enum: ['Draft', 'For Review', 'Approved', 'Superseded'],
              description: 'Current document status'
            },
            emergencyContacts: {
              type: 'object',
              properties: {
                emergency: { type: 'string', default: '999' },
                siteManager: { type: 'string', description: 'Site manager name and contact' },
                firstAider: { type: 'string', description: 'First aider name and contact' },
                hsOfficer: { type: 'string', description: 'H&S officer name and contact' },
                assemblyPoint: { type: 'string', description: 'Assembly point location' }
              }
            },
            riskAssessmentReference: { type: 'string', description: 'Associated Risk Assessment ref (e.g., RA-001)' }
          },
          required: ['workType', 'location', 'reference', 'preparedBy', 'date', 'programmeDuration', 'reviewDate', 'documentStatus']
        },
        executiveSummary: {
          type: 'object',
          properties: {
            cableType: { type: 'string' },
            cableSize: { type: 'string' },
            runLength: { type: 'string' },
            installationMethod: { type: 'string' },
            supplyType: { type: 'string' },
            protectiveDevice: { type: 'string' },
            voltageDrop: { type: 'string' },
            zsRequirement: { type: 'string' },
            purpose: { type: 'string' }
          },
          required: ['purpose']
        },
        materialsList: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              description: { type: 'string' },
              specification: { type: 'string' },
              quantity: { type: 'string' },
              unit: { type: 'string' },
              notes: { type: 'string' }
            },
            required: ['description', 'quantity', 'unit']
          }
        },
        installationSteps: {
          type: 'array',
          minItems: 12, // Minimum 12 steps, scale up to 15 based on work complexity
          items: {
            type: 'object',
            properties: {
              step: { type: 'number' },
              title: { type: 'string' },
              description: { type: 'string' },
              tools: { type: 'array', items: { type: 'string' }, minItems: 3 },
              materials: { type: 'array', items: { type: 'string' } },
              safetyNotes: { type: 'array', items: { type: 'string' } },
              linkedHazards: { type: 'array', items: { type: 'string' }, minItems: 2 },
              qualifications: { type: 'array', items: { type: 'string' } },
              estimatedTime: { type: 'number' },
              bsReferences: { type: 'array', items: { type: 'string' } },
              assignedPersonnel: { type: 'array', items: { type: 'string' } }
            },
            required: ['step', 'title', 'description', 'tools', 'estimatedTime', 'bsReferences']
          }
        },
        toolsRequired: {
          type: 'array',
          items: { type: 'string' }
        },
        testingRequirements: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              description: { type: 'string' },
              regulation: { type: 'string' },
              expectedReading: { type: 'string' },
              passRange: { type: 'string' }
            },
            required: ['description', 'regulation', 'expectedReading', 'passRange']
          }
        },
        testingProcedures: {
          type: 'array',
          minItems: 3, // OPTIMIZED: Reduced from 5 to 3 for faster generation
          items: {
            type: 'object',
            properties: {
              testName: { type: 'string' },
              standard: { type: 'string' },
              procedure: { type: 'string' },
              acceptanceCriteria: { type: 'string' }
            },
            required: ['testName', 'standard', 'procedure', 'acceptanceCriteria']
          }
        },
        regulatoryReferences: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              number: { type: 'string' },
              description: { type: 'string' }
            },
            required: ['number', 'description']
          }
        },
        scopeOfWork: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            keyDeliverables: { type: 'array', items: { type: 'string' } },
            exclusions: { type: 'string' }
          }
        },
        scheduleDetails: {
          type: 'object',
          properties: {
            workingHours: { type: 'string' },
            teamSize: { type: 'string' },
            weatherDependency: { type: 'string' },
            accessRequirements: { type: 'string' }
          }
        }
      },
      required: ['executiveSummary', 'materialsList', 'installationSteps', 'toolsRequired', 'testingRequirements', 'testingProcedures', 'regulatoryReferences'] // scopeOfWork and scheduleDetails now optional
    }
  }
};

const SYSTEM_PROMPT = `You are a UK Electrical Installation Expert (BS 7671 18th Edition) creating PROFESSIONAL INSTALLATION METHOD STATEMENTS for client-facing PDF documentation.

CRITICAL REQUIREMENTS:
1. UK English ONLY (authorised, whilst, metres, earth not ground)
2. Follow BS 7671:2018+A3:2024 regulations
3. Professional, client-facing language
4. Cite BS 7671 regulation numbers (e.g., "514.1.1", "522.6.101")
5. Extract tools/materials from RAG "TOOLS:" and "MATERIALS:" sections

EXECUTIVE SUMMARY: Cable specification, installation method with BS 7671 reference, supply details, protective device, voltage drop, Zs requirement, purpose statement.

MATERIALS LIST: Description, specification (BS/EN codes), quantity with units, notes.

INSTALLATION STEPS (12-15 steps - scale based on work complexity):
- Simple installations (domestic socket): 12 steps
- Medium complexity (sub-main, motor): 13-14 steps
- Complex installations (3-phase, multiple zones): 15 steps

For each step:
- Step number + professional title
- Description: 100-150 words, client-facing language
- Tools: Extract from RAG first, supplement if needed (3+ per step)
- Materials: Step-specific items from RAG
- Safety notes: Step-specific controls
- Linked hazards: Specific to this step (2+ hazards)
- BS 7671 references: Cite regulations
- Estimated time + assigned personnel

Cover: Site preparation, isolation & testing, cable installation, terminations, bonding/earthing, testing (continuity, insulation, polarity, RCD), inspection.

TESTING PROCEDURES (3+ procedures): Test name, BS 7671 Part 6 standard, procedure, acceptance criteria.

Use RAG context to extract accurate tools, materials, and regulations.`;

const SYSTEM_PROMPT_SIMPLIFIED = `You are an Installation Guidance Specialist generating DETAILED, CONTEXT-AWARE, TYPE-SPECIFIC installation guidance for electrical circuit design documentation.

CRITICAL REQUIREMENTS:
1. UK English ONLY
2. Follow BS 7671:2018+A3:2024 strictly
3. Extract tools, materials, and regulations from RAG context below
4. Generate specific, actionable guidance based on circuit context AND installation type
5. Use structured lists with detailed metadata
6. **Adapt guidance for DOMESTIC, COMMERCIAL, or INDUSTRIAL contexts**

**INSTALLATION TYPE CONSIDERATIONS:**

**DOMESTIC (Residential/Dwelling):**
- Part P Building Regulations compliance
- Consumer unit compatibility (domestic MCB/RCBO sizes)
- DIY-friendly language for homeowner understanding
- Focus on: socket ring finals, lighting circuits, showers, cookers, EV chargers
- Bonding in special locations (bathrooms, kitchens per BS 7671 Section 701)
- RCD protection requirements (30mA for socket outlets ≤20A)
- Regulations: 411.3.3 (fault protection), 701.415 (bathrooms), 411.3.1.1 (ADS)

**COMMERCIAL (Offices/Shops/Non-domestic):**
- Fire alarm system integration considerations
- Emergency lighting circuits (BS 5266)
- Compliance with non-domestic regulations
- Focus on: sub-distribution boards, dedicated equipment circuits, emergency systems
- Access control and security system integration
- Coordination with building management systems
- Regulations: 560.6 (safety services), 313.1 (supplies for safety services)

**INDUSTRIAL (Factories/Manufacturing):**
- Three-phase supply systems
- Motor control circuits and starting methods
- Heavy machinery installation
- Focus on: high current circuits, motor circuits, control panels, protective equipment
- IP rating requirements for harsh environments
- Arc flash protection considerations
- Regulations: 552.1 (rotating machines), 530.3.3 (switchgear selection)

RAG EXTRACTION RULES:
- **TOOLS**: Extract from "TOOLS:" sections in RAG context
- **MATERIALS**: Extract from "MATERIALS:" and "CABLE SIZES:" sections
- **REGULATIONS**: Extract regulation numbers from RAG context
- **SPECIFICATIONS**: Use BS/EN codes from RAG (e.g., "BS 6004", "BS 7671 Section 522.6")
- **CABLE SIZES**: Reference specific sizes from RAG or circuit design

**LOAD-TYPE SPECIFIC GUIDANCE:**

**EV Charger Circuits:**
- Dedicated circuit with RCD/RCBO protection
- Outdoor installation considerations (IP65 enclosures)
- Earthing electrode requirements (TT systems)
- Load management systems (if applicable)
- Regulations: 722.531.2.101 (RCD protection), 722.411.4.1 (earthing)

**Electric Shower Circuits:**
- Supplementary bonding requirements (if extraneous parts present)
- 30mA RCD mandatory
- High current cable termination (10mm²/16mm²)
- Ceiling height clearances
- Regulations: 701.415.2 (RCD), 701.411.3.3 (supplementary bonding)

**Cooker Circuits:**
- Diversity factor application (10A + 30% + 5A if socket)
- Dedicated cooker control unit with indicator
- Heat-resistant cable route planning
- Regulations: Appendix 4 (diversity), 553.1.7 (control switches)

**Socket Ring Finals (Domestic):**
- 2.5mm² cable with 1.5mm² CPC
- 32A Type B MCB or 30mA RCBO
- Maximum floor area 100m²
- Ring continuity testing critical
- Regulations: 433.1.204 (ring final circuits), Appendix 15 (ring final testing)

**Lighting Circuits:**
- 1.5mm² cable with 1.0mm² CPC
- 6A/10A Type B MCB
- Switching arrangements (one-way, two-way, intermediate)
- Energy efficiency considerations (LED compatibility)
- Regulations: 559.5 (lighting circuits), 421.1.201 (lamp holders)

**Motor Circuits:**
- Starting current considerations (DOL, Star-Delta, VSD)
- Thermal overload protection
- Isolator within sight of motor
- Control circuit segregation
- Regulations: 552.1 (rotating machines), 537.2.1.5 (isolation)

CONTEXT-AWARENESS EXAMPLES:

**SAFETY CONSIDERATIONS** - Type and load-specific:
{
  "consideration": "Verify isolation and test for voltage before work - critical for high current shower circuit",
  "toolsRequired": ["Voltage detector (GS38)", "Lock-off kit", "Warning notices"],
  "bsReference": "BS 7671 Regulation 537.2.1.1",
  "priority": "critical"
}

**MATERIALS REQUIRED** - Extract from RAG with specifications:
{
  "item": "Twin & Earth Cable",
  "specification": "10mm² T&E to BS 6004 (shower circuit)",
  "quantity": "25m",
  "source": "circuit_design"
}

**TOOLS REQUIRED** - Extract from RAG practical work:
{
  "tool": "Megger MFT1835 Multifunction Tester",
  "purpose": "Insulation resistance and continuity testing per BS 7671 Part 6",
  "category": "testing"
}

**CABLE ROUTING** - Be specific based on circuit context:
{
  "step": "Route 10mm² T&E from consumer unit to first floor bathroom via loft space",
  "cableType": "10mm² Twin & Earth (BS 6004)",
  "method": "clipped direct with 50mm thermal insulation clearance",
  "bsReference": "BS 7671 Appendix 4 (thermal de-rating)",
  "notes": "Maintain 300mm clip spacing per manufacturer guidance. Avoid contact with thermal insulation."
}

**TERMINATION REQUIREMENTS** - Detailed with torque:
{
  "location": "Consumer unit RCBO terminals (domestic installation)",
  "procedure": "Strip 12mm insulation, insert conductor fully into terminal, torque to 2.5Nm",
  "toolsNeeded": ["Wire strippers", "Torque screwdriver 2.5Nm", "Terminal block screwdriver"],
  "torqueSettings": "2.5Nm for 10mm² conductor",
  "bsReference": "BS 7671 Section 526.1"
}

**INSTALLATION PROCEDURE** - Step-by-step with context:
{
  "stepNumber": 1,
  "title": "Site Preparation and Isolation (Domestic Installation)",
  "description": "Verify the supply can be safely isolated at the consumer unit. Display danger notices to prevent inadvertent re-energisation. Use voltage detector compliant with GS38 to prove dead on all incoming supply terminals. Fit lock-off device to main switch. Test voltage detector on known live source before and after testing to confirm functionality. This is critical for safe working on domestic installations where multiple occupants may have access to the consumer unit.",
  "toolsForStep": ["Voltage detector (GS38)", "Lock-off kit", "Danger notices"],
  "materialsForStep": ["Warning labels"],
  "bsReferences": ["537.2.1.1", "GS38"]
}

**TESTING REQUIREMENTS** - Detailed with expected values:
{
  "testName": "Continuity of Protective Conductors (R1+R2)",
  "regulation": "BS 7671 Section 643.2.1",
  "procedure": "Connect MFT leads to line terminal at consumer unit and earth terminal at load point. Measure resistance. Record result on EIC Schedule of Test Results.",
  "expectedReading": "~0.8Ω for 18m run in 10mm² T&E",
  "acceptanceCriteria": "R1+R2 must be ≤ maximum Zs minus Ze (typically < 1.0Ω for this circuit to meet disconnection time)",
  "toolsRequired": ["Megger MFT1835", "Test leads", "Continuity probe"]
}

**RAG CONTEXT SUMMARY** - Track what you used:
{
  "regulationsCount": 12,
  "practicalProceduresCount": 8,
  "toolsExtracted": 15,
  "materialsExtracted": 10,
  "keyRegulations": ["522.6.202", "643.2.1", "537.2.1.1", "411.3.2.2", "701.415.2"]
}

IMPORTANT REMINDERS:
- Scale guidance based on circuit complexity AND installation type
- Extract tools/materials from RAG "TOOLS:" and "MATERIALS:" sections
- Reference specific cable sizes, power ratings from RAG
- Cite BS 7671 regulation numbers throughout
- Adapt language: domestic = homeowner-friendly, commercial = building manager focus, industrial = technical specialist
- Be thorough - don't artificially limit yourself to minimums`;

export async function generateInstallationMethod(
  query: string,
  projectDetails: any,
  onProgress?: (progress: number, step: string) => void,
  sharedRegulations?: any[],
  mode: 'full' | 'simplified' = 'full',  // NEW: Mode parameter for schema selection
  designerContext?: any  // ✅ NEW: Accept designer context with full circuit specs
): Promise<any> {
  console.log('🔧 Installation Method Agent starting...');
  const startTime = Date.now();
  const phaseTimings: any = {};
  
  if (onProgress) onProgress(0, 'Installation Method: Starting...');
  
  // STEP 1: RAG - Use modern installation-specific search
  console.log('🔍 Fetching RAG knowledge...');
  if (onProgress) onProgress(10, 'Installation Method: Searching installation procedures...');
  
  const logger = createLogger('installation-method-agent');
  const openAiKey = Deno.env.get('OPENAI_API_KEY')!;
  
  // ✅ Build job inputs using designerContext if available (from Circuit Designer)
  // Otherwise fallback to generic inputs (from Installation Specialist standalone)
  const jobInputs = designerContext ? {
    circuits: designerContext.circuits || [],
    supply: designerContext.supply || {},
    projectInfo: {
      ...projectDetails,
      projectType: designerContext.projectType,
      location: designerContext.location
    }
  } : {
    circuits: [{ loadType: projectDetails.workType || 'general', description: query }],
    supply: {},
    projectInfo: projectDetails
  };
  
  // RAG progress callback
  const ragProgressCallback = onProgress 
    ? (msg: string) => onProgress(25, `Installation Method: ${msg}`)
    : undefined;
  
  // STEP 1: RAG SEARCH (ULTRA-FAST INTELLIGENCE APPROACH)
  const ragStart = Date.now();
  logger.info('Starting installation method RAG search (fast intelligence)', {
    hasDesignerContext: !!designerContext,
    circuitCount: jobInputs.circuits?.length || 0
  });
  
  let ragResults: any[] = [];
  
  try {
    // ✅ Build CIRCUIT-AWARE keyword list from jobInputs
    const keywords = extractInstallationKeywords(jobInputs, designerContext);
    const workType = jobInputs.projectInfo?.workType || 'general installation';
    const circuitTypes = jobInputs.circuits?.map((c: any) => c.loadType).filter(Boolean) || [];
    
    logger.info('Extracted circuit-aware keywords for RAG', {
      keywords: keywords.slice(0, 15),
      workType,
      circuitCount: circuitTypes.length,
      hasSpecificCircuits: designerContext?.circuits?.length > 0
    });
    
    // Use shared regulations if provided AND non-empty
    if (Array.isArray(sharedRegulations) && sharedRegulations.length > 0) {
      logger.info(`Using ${sharedRegulations.length} shared regulations from circuit designer`);
      ragResults = sharedRegulations;
    } else {
      // Run fast intelligence RAG search
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.49.4');
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const ragResult = await searchInstallationMethodRAG(
        supabase,
        keywords,
        workType,
        circuitTypes,
        15 // limit
      );
      
      // Combine regulations + practical work
      ragResults = [
        ...ragResult.regulations.map((r: any) => ({
          content: r.primary_topic || r.regulation_number,
          regulation_number: r.regulation_number,
          keywords: r.keywords,
          applies_to: r.applies_to,
          source: 'regulations_intelligence'
        })),
        ...ragResult.practicalWork.map((pw: any) => ({
          content: pw.content,
          primary_topic: pw.primary_topic,
          tools_required: pw.tools_required,
          bs7671_regulations: pw.bs7671_regulations,
          equipment_category: pw.equipment_category,
          cable_sizes: pw.cable_sizes,
          power_ratings: pw.power_ratings,
          source: 'practical_work_intelligence'
        }))
      ];
      
      logger.info(`✅ RAG complete: ${ragResults.length} results (${ragResult.searchTimeMs}ms, quality: ${ragResult.qualityScore.toFixed(1)})`);
    }
    
    // Minimal fallback if STILL empty
    if (ragResults.length === 0) {
      logger.error('🚨 CRITICAL: RAG returned 0 results even after fast intelligence search', {
        keywords: keywords.slice(0, 10),
        workType,
        circuitTypes: circuitTypes.slice(0, 3)
      });
      
      // Apply minimal core regulations fallback
      ragResults = [
        {
          content: 'Good workmanship and proper materials',
          regulation_number: '134.1.1',
          source: 'fallback'
        },
        {
          content: 'Automatic disconnection of supply (ADS) for shock protection',
          regulation_number: '411.3.1.1',
          source: 'fallback'
        }
      ];
      
      logger.warn('⚠️ Using minimal BS 7671 fallback regulations');
    }
    
  } catch (error) {
    logger.error('RAG search failed', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    
    // Minimal fallback on error
    ragResults = [
      {
        content: 'Good workmanship and proper materials',
        regulation_number: '134.1.1',
        source: 'fallback'
      },
      {
        content: 'Automatic disconnection of supply (ADS) for shock protection',
        regulation_number: '411.3.1.1',
        source: 'fallback'
      }
    ];
  }
  
  phaseTimings.rag = Date.now() - ragStart;
  logger.info('RAG complete', { duration: phaseTimings.rag, count: ragResults.length });
  
  // Validate we have at least some data
  if (ragResults.length === 0) {
    throw new Error('RAG search returned no results - cannot generate accurate method statement');
  }
  
  console.log(`✅ Fetched ${ragResults.length} RAG results (cache: ${ragResults.some((r: any) => r.cached)})`);
  
  // Enhanced debugging - RAG breakdown
  const practicalWorkCount = ragResults.filter((r: any) => 
    r.source === 'practical_work_intelligence' || r.hybrid_score
  ).length;
  const bs7671Count = ragResults.filter((r: any) => 
    r.regulation_number && r.source !== 'fallback'
  ).length;
  
  console.log('📊 RAG Breakdown:', {
    total: ragResults.length,
    practicalWork: practicalWorkCount,
    bs7671: bs7671Count,
    sampleFields: ragResults[0] ? Object.keys(ragResults[0]) : []
  });
  
  // Debug: Log sample RAG result to verify field names
  if (ragResults.length > 0) {
    console.log('📊 Sample RAG result fields:', Object.keys(ragResults[0]));
    console.log('📊 Sample practical work:', ragResults.find((r: any) => r.source === 'practical_work_intelligence'));
    console.log('📊 Sample regulation:', ragResults.find((r: any) => r.regulation_number));
  }
  
  const ragContext = ragResults
    .map((r: any, i: number) => {
      const regNumber = r.regulation_number || r.regulation || r.topic || 'N/A';
      const contentText = r.content || r.primary_topic || r.description || '';
      
      // Build rich context with all available fields
      let context = `[${i + 1}] ${regNumber}: ${contentText.substring(0, 300)}`;
      
      // Add tools if available (from practical_work_intelligence)
      if (r.tools_required && r.tools_required.length > 0) {
        context += `\n   TOOLS: ${r.tools_required.join(', ')}`;
      }
      
      // Add materials if available
      if (r.materials_needed && r.materials_needed.length > 0) {
        context += `\n   MATERIALS: ${r.materials_needed.join(', ')}`;
      }
      
      // Add equipment category for context
      if (r.equipment_category) {
        context += `\n   CATEGORY: ${r.equipment_category}`;
      }
      
      // Add cable sizes if relevant
      if (r.cable_sizes && r.cable_sizes.length > 0) {
        context += `\n   CABLE SIZES: ${r.cable_sizes.join(', ')}`;
      }
      
      // Add power ratings if relevant
      if (r.power_ratings && r.power_ratings.length > 0) {
        context += `\n   POWER RATINGS: ${r.power_ratings.join(', ')}`;
      }
      
      // Add BS 7671 regulations if available
      if (r.bs7671_regulations && r.bs7671_regulations.length > 0) {
        context += `\n   BS 7671: ${r.bs7671_regulations.join(', ')}`;
      }
      
      return context;
    })
    .join('\n\n');

  // STEP 2: GPT-5 Mini with tool calling
  // Select schema and prompt based on mode
  const toolSchema = mode === 'simplified' ? INSTALLATION_METHOD_TOOL_SIMPLIFIED : INSTALLATION_METHOD_TOOL_FULL;
  const systemPrompt = mode === 'simplified' ? SYSTEM_PROMPT_SIMPLIFIED : SYSTEM_PROMPT;
  const functionName = toolSchema.function.name;
  
  // Mode-aware progress message
  const progressMsg = mode === 'simplified' 
    ? 'Installation Method: Generating installation guidance...'
    : 'Installation Method: Generating comprehensive installation guide...';
  if (onProgress) onProgress(40, progressMsg);
  
  // ✅ Detect installation type for context-aware prompting
  const installationType = detectInstallationType(projectDetails);
  const installationTypeContext = installationType === 'domestic' 
    ? '(DOMESTIC INSTALLATION - Part P compliance, consumer unit, homeowner-friendly guidance)'
    : installationType === 'industrial'
    ? '(INDUSTRIAL INSTALLATION - Three-phase systems, motor circuits, heavy machinery)'
    : '(COMMERCIAL INSTALLATION - Non-domestic, fire alarm integration, emergency lighting)';
  
  // ✅ Build circuit-specific context summary for AI prompt
  let circuitContextSummary = '';
  if (designerContext?.circuits && designerContext.circuits.length > 0) {
    circuitContextSummary = `\n\n**INSTALLATION TYPE:** ${installationType.toUpperCase()} ${installationTypeContext}\n\n**CIRCUIT TECHNICAL SPECIFICATIONS:**\n`;
    designerContext.circuits.forEach((circuit: any, idx: number) => {
      const loadType = circuit.loadType?.toLowerCase() || 'general';
      let loadTypeGuidance = '';
      
      // Add load-type specific context hints
      if (loadType.includes('ev')) {
        loadTypeGuidance = ' [EV CHARGER - Dedicated circuit, outdoor installation, earthing electrode, load management]';
      } else if (loadType.includes('shower')) {
        loadTypeGuidance = ' [ELECTRIC SHOWER - Supplementary bonding, 30mA RCD, high current termination]';
      } else if (loadType.includes('cooker')) {
        loadTypeGuidance = ' [COOKER - Diversity factor, dedicated CCU, heat-resistant routing]';
      } else if (loadType.includes('socket') && circuit.description?.toLowerCase().includes('ring')) {
        loadTypeGuidance = ' [RING FINAL - 2.5mm² cable, 32A protection, ring continuity testing]';
      } else if (loadType.includes('light')) {
        loadTypeGuidance = ' [LIGHTING - 1.5mm² cable, switching arrangements, LED compatibility]';
      } else if (loadType.includes('motor')) {
        loadTypeGuidance = ' [MOTOR CIRCUIT - Starting current, thermal overload, isolator required]';
      }
      
      circuitContextSummary += `\nCircuit ${idx + 1}: ${circuit.description || circuit.loadType}${loadTypeGuidance}
- Load Type: ${circuit.loadType}
- Power: ${circuit.power}W (Design Current: ${circuit.designCurrent}A)
- Cable: ${circuit.cableSize}mm² with ${circuit.cpcSize}mm² CPC
- Protection: ${circuit.protectionDevice}
- Installation Method: ${circuit.installationMethod}
- Cable Length: ${circuit.cableLength}m
- Voltage Drop: ${circuit.voltageDropPercent}%
- Earth Fault Loop Impedance (Zs): ${circuit.earthFaultLoopImpedance}Ω`;
      
      // Add EV-specific details
      if (circuit.chargerType) {
        circuitContextSummary += `\n- EV Charger Type: ${circuit.chargerType} (${circuit.chargerPower}kW)`;
      }
    });
    
    circuitContextSummary += `\n\n**Supply System:**
- Voltage: ${designerContext.supply?.voltage}V
- Phases: ${designerContext.supply?.phases}
- Earthing: ${designerContext.supply?.earthing}
- External Impedance (Ze): ${designerContext.supply?.externalImpedance}Ω`;
  } else {
    // No designer context - add installation type only
    circuitContextSummary = `\n\n**INSTALLATION TYPE:** ${installationType.toUpperCase()} ${installationTypeContext}`;
  }

  const userPrompt = `Project: ${projectDetails.jobTitle || 'Electrical Installation'}
Location: ${projectDetails.location || 'Site'}
Installation Type: ${installationType.toUpperCase()} ${installationTypeContext}
${circuitContextSummary}

${mode === 'simplified' 
  ? `Generate DETAILED, CONTEXT-AWARE, ${installationType.toUpperCase()}-SPECIFIC installation and testing guidance tailored to the specific circuit types above:

**${installationType.toUpperCase()} INSTALLATION REQUIREMENTS:**
${installationType === 'domestic' ? '- Part P Building Regulations compliance\n- Consumer unit compatibility (domestic MCB/RCBO)\n- RCD protection for socket outlets ≤20A (30mA)\n- Special location bonding (bathrooms per Section 701)\n- Homeowner-friendly language' : ''}
${installationType === 'commercial' ? '- Fire alarm system integration\n- Emergency lighting circuits (BS 5266)\n- Non-domestic regulations compliance\n- Building management system coordination\n- Safety services compliance (Regulation 560.6)' : ''}
${installationType === 'industrial' ? '- Three-phase supply considerations\n- Motor control and starting methods\n- IP rating requirements for harsh environments\n- Arc flash protection\n- Heavy machinery installation standards (Regulation 552.1)' : ''}

**CIRCUIT-SPECIFIC GUIDANCE:**
- For EV chargers: Outdoor installation (IP65), earthing electrode (TT systems), load management, Regulation 722.531.2.101
- For showers: Supplementary bonding, 30mA RCD mandatory, high current termination (10-16mm²), Regulation 701.415.2
- For cookers: Diversity (10A + 30% + 5A), dedicated CCU with indicator, heat-resistant routing, Regulation 553.1.7
- For socket ring finals: 2.5mm² cable, 32A protection, max 100m² floor area, ring continuity critical, Regulation 433.1.204
- For lighting: 1.5mm² cable, 6A/10A protection, switching arrangements, LED compatibility, Regulation 559.5
- For motors: Starting current (DOL/Star-Delta/VSD), thermal overload, isolator within sight, Regulation 552.1

**EXTRACTION REQUIREMENTS:**
- Extract specific tools from RAG "TOOLS:" sections relevant to ${installationType} installations and these circuit types
- Extract specific materials from RAG "MATERIALS:" sections
- Reference BS 7671 regulations specific to ${installationType} installations and these load types
- Generate 6-10 installation procedure steps specific to these circuits and ${installationType} context
- Include testing requirements with expected values based on actual circuit parameters
- Adapt language to ${installationType} context (domestic = homeowner-friendly, commercial = building manager, industrial = technical specialist)`
  : 'Generate professional installation method statement for PDF export:\n- 12-15 installation steps (100-150 words each)\n- Testing procedures with BS 7671 Part 6 compliance\n- Extract tools/materials from RAG context below'
}

Query: ${query}

**RAG KNOWLEDGE BASE (EXTRACT TOOLS, MATERIALS, AND REGULATIONS FROM THIS):**
${ragContext}`;

  let methodData: any;
  
  try {
    const timeoutMs = mode === 'simplified' ? 180000 : 300000; // 3 minutes for simplified, 5 for full
    console.log(`🤖 Calling GPT-5 Mini in ${mode} mode with ${timeoutMs}ms timeout...`);
    const aiStart = Date.now();
    
    // Heartbeat during AI call to show progress
    const aiHeartbeat = setInterval(async () => {
      if (onProgress) {
        const elapsed = Math.floor((Date.now() - aiStart) / 1000);
        await onProgress(Math.min(95, 47 + elapsed), `Installer: Generating ${mode === 'simplified' ? 'guidance' : 'method statement'} (${elapsed}s elapsed)...`);
      }
    }, 10000); // Every 10 seconds
    
    const response = await callOpenAI({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'gpt-5-mini-2025-08-07',
      tools: [toolSchema],
      tool_choice: { type: 'function', function: { name: functionName } }
    }, Deno.env.get('OPENAI_API_KEY')!, timeoutMs)
    
    // Clear heartbeat
    clearInterval(aiHeartbeat);
    
    const aiDuration = Date.now() - aiStart;
    phaseTimings.openai = aiDuration;
    // timeoutMs already defined above (line 480)
    logger.info('✅ OpenAI complete', { 
      mode,
      duration: aiDuration,
      durationSeconds: Math.round(aiDuration / 1000),
      percentOfTimeout: Math.round((aiDuration / timeoutMs) * 100)
    });

    if (!response.toolCalls || response.toolCalls.length === 0) {
      throw new Error(`GPT-5 Mini did not return ${mode} installation method tool call`);
    }

    methodData = JSON.parse(response.toolCalls[0].function.arguments);
    
    // ✅ DEBUG: Log extracted installation guidance structure
    logger.info('📦 Installation guidance structure:', {
      mode,
      hasInstallationGuidance: !!methodData.installationGuidance,
      safetyCount: methodData.installationGuidance?.safetyConsiderations?.length || 0,
      toolsCount: methodData.installationGuidance?.toolsRequired?.length || 0,
      materialsCount: methodData.installationGuidance?.materialsRequired?.length || 0,
      cableRoutingCount: methodData.installationGuidance?.cableRouting?.length || 0,
      terminationCount: methodData.installationGuidance?.terminationRequirements?.length || 0,
      procedureCount: methodData.installationGuidance?.installationProcedure?.length || 0,
      testingCount: methodData.testingRequirements?.tests?.length || 0
    });

    // Validation: Check if steps have tools (full mode only)
    const stepsWithoutTools = methodData.installationSteps?.filter((s: any) => 
      !s.tools || s.tools.length < 3
    ) || [];

    if (mode === 'full' && stepsWithoutTools.length > 0) {
      console.warn(`⚠️ ${stepsWithoutTools.length} steps missing sufficient tools - AI may not have extracted RAG data properly`);
      console.warn('Steps needing attention:', stepsWithoutTools.map((s: any) => `Step ${s.step}: ${s.title}`));
    }
    console.log('✅ Installation method generated successfully');
    
  } catch (error) {
    // AIProviderError includes timeout details
    console.error('⏱️ OpenAI call failed:', error);
    throw error;
  }
  
  if (onProgress) onProgress(100, 'Installation Method: Complete!');
  
  phaseTimings.total = Date.now() - startTime;
  logger.info('Generation complete', phaseTimings);
  console.log(`⏱️ Installation Method Agent completed in ${phaseTimings.total}ms (RAG: ${phaseTimings.rag}ms, OpenAI: ${phaseTimings.openai}ms)`);

  // Helper: Extract practical tips from steps
  const extractPracticalTipsFromSteps = (steps: any[]): string[] => {
    const tips = new Set<string>();
    steps?.forEach(s => {
      (s.safetyNotes || []).forEach((note: string) => tips.add(note));
    });
    const uniqueTips = Array.from(tips).slice(0, 5);
    return uniqueTips.length > 0 ? uniqueTips : [
      'Always verify isolation before commencing work',
      'Use proper cable management and support spacing',
      'Document all test results immediately',
      'Maintain clean working area throughout installation'
    ];
  };
  
  // Helper: Extract common mistakes
  const extractCommonMistakesFromSteps = (steps: any[]): string[] => {
    return [
      'Insufficient cable support spacing',
      'Incorrect termination torque settings',
      'Missing or incomplete test documentation',
      'Poor cable routing in containment'
    ];
  };
  
  // Return data based on mode
  if (mode === 'simplified') {
    // Enhanced simplified mode: Return detailed structured guidance
    return {
      installationGuidance: {
        safetyConsiderations: methodData.installationGuidance?.safetyConsiderations || [],
        materialsRequired: methodData.installationGuidance?.materialsRequired || [],
        toolsRequired: methodData.installationGuidance?.toolsRequired || [],
        cableRouting: methodData.installationGuidance?.cableRouting || [],
        terminationRequirements: methodData.installationGuidance?.terminationRequirements || [],
        installationProcedure: methodData.installationGuidance?.installationProcedure || []
      },
      testingRequirements: {
        intro: methodData.testingRequirements?.intro || '',
        tests: methodData.testingRequirements?.tests || [],
        recordingNote: methodData.testingRequirements?.recordingNote || ''
      },
      ragContextUsed: methodData.ragContextUsed || {
        regulationsCount: 0,
        practicalProceduresCount: 0,
        toolsExtracted: 0,
        materialsExtracted: 0,
        keyRegulations: []
      },
      ragCitations: ragResults
        .map((r: any) => ({
          regulation: r.regulation_number || r.regulation || r.topic || null,
          content: r.content || r.primary_topic || r.description || '',
          source: r.source || 'practical_work_intelligence'
        }))
        .filter(c => c.regulation !== null && c.content.length > 0)
    };
  }
  
  // Full mode: Return complete installation method data for standalone RAMS
  return {
    executiveSummary: methodData.executiveSummary,
    materialsList: methodData.materialsList || [],
    steps: methodData.installationSteps || [],
    toolsRequired: methodData.toolsRequired || [],
    testingRequirements: methodData.testingRequirements || [],
    testingProcedures: methodData.testingProcedures || [],
    regulatoryReferences: methodData.regulatoryReferences || [],
    scopeOfWork: methodData.scopeOfWork,
    scheduleDetails: methodData.scheduleDetails,
    practicalTips: extractPracticalTipsFromSteps(methodData.installationSteps),
    commonMistakes: extractCommonMistakesFromSteps(methodData.installationSteps),
    ragCitations: ragResults
      .map((r: any) => ({
        regulation: r.regulation_number || r.regulation || r.topic || null,
        content: r.content || r.primary_topic || r.description || '',
        source: r.source || 'practical_work_intelligence'
      }))
      .filter(c => c.regulation !== null && c.content.length > 0)
  };
}

/**
 * NEW: Wrapper for circuit-design-v2 unified function
 * Accepts progress callbacks and shared RAG results
 * Mirrors the signature of designCircuits in circuit-designer-core.ts
 */
export async function generateInstallationMethods(
  jobInputs: any,
  progressCallback: (progress: number, step: string) => Promise<void>,
  sharedRegulations?: any[],
  mode: 'full' | 'simplified' = 'simplified'  // NEW: Default to simplified for Circuit Designer
): Promise<any> {
  
  console.log('🛠️ Installation Method Agent starting...');
  
  await progressCallback(10, 'Installer: Analyzing installation requirements...');
  
  // Build query from circuit parameters
  const circuits = jobInputs.circuits || [];
  const supply = jobInputs.supply || {};
  
  // Build rich context-aware query from job inputs
  const circuitContexts = circuits.map((circuit: any, index: number) => {
    const parts: string[] = [
      `Circuit ${index + 1}: ${circuit.loadType || 'Unknown load'}`
    ];
    
    // Add power rating
    if (circuit.loadPower) {
      parts.push(`${circuit.loadPower}W`);
    }
    
    // Add specific location if provided
    if (circuit.location && circuit.location !== 'Not specified') {
      parts.push(`Location: ${circuit.location}`);
    }
    
    // Add cable length
    if (circuit.cableLength) {
      parts.push(`Cable run: ${circuit.cableLength}m`);
    }
    
    // Add installation environment if specified
    if (circuit.installationEnvironment) {
      parts.push(`Environment: ${circuit.installationEnvironment}`);
    }
    
    // Add any specific notes or requirements
    if (circuit.notes || circuit.description) {
      parts.push(`Notes: ${circuit.notes || circuit.description}`);
    }
    
    return parts.join(' | ');
  }).join('\n');

  const query = `
Installation method for ${circuits.length} electrical circuit${circuits.length > 1 ? 's' : ''}

SUPPLY DETAILS:
- Voltage: ${supply.voltage || 230}V ${supply.phases || 'single'} phase
- Earthing System: ${supply.earthingSystem || 'TN-C-S'}
- Ze: ${supply.ze || 0.35}Ω
- PFC: ${supply.pfc || 16000}A

CIRCUIT DETAILS:
${circuitContexts}

SPECIAL REQUIREMENTS:
${jobInputs.specialRequirements?.join('\n') || 'None specified'}

ADDITIONAL CONTEXT:
${jobInputs.additionalPrompt || 'No additional requirements'}

PROJECT CONTEXT:
- Project: ${jobInputs.projectName || 'Circuit Installation'}
- Location: ${jobInputs.location || 'Not specified'}
`.trim();
  
  const projectDetails = {
    jobTitle: jobInputs.projectName || 'Circuit Installation',
    location: jobInputs.location || 'Not specified',
    circuits: circuits,
    supply: supply,
    specialRequirements: jobInputs.specialRequirements || [],
    additionalPrompt: jobInputs.additionalPrompt || ''
  };
  
  await progressCallback(30, 'Installer: Planning installation steps...');
  
  // Wrap progress callback for the inner function
  const updateProgress = async (progress: number, step: string) => {
    // Map 0-100 of inner function to 30-90 of outer function
    const mappedProgress = 30 + Math.floor(progress * 0.6);
    await progressCallback(mappedProgress, `Installer: ${step}`);
  };
  
  // Call existing generateInstallationMethod
  const result = await generateInstallationMethod(query, projectDetails, updateProgress, sharedRegulations, mode);
  
  await progressCallback(90, 'Installer: Finalizing method statement...');
  await progressCallback(100, 'Installer: Complete ✓');
  
  console.log('✅ Installation methods generated successfully');
  
  // Return proper structure based on mode
  if (mode === 'simplified') {
    return {
      installationGuidance: result.installationGuidance || {},
      testingRequirements: result.testingRequirements || {},
      ragCitations: result.ragCitations || [],
      metadata: {
        completedAt: new Date().toISOString(),
        regulationsUsed: sharedRegulations?.length || 0,
        mode: mode
      }
    };
  }
  
  // Full mode returns steps
  return {
    methods: result.steps || [],
    metadata: {
      completedAt: new Date().toISOString(),
      regulationsUsed: sharedRegulations?.length || 0,
      totalSteps: result.steps?.length || 0
    }
  };
}
