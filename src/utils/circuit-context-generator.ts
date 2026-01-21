import { InstallationDesign } from '@/types/installation-design';

export interface CircuitContextSummary {
  projectOverview: string;
  circuitSummaries: {
    name: string;
    description: string;
    keySpecs: string;
    installationNotes: string;
  }[];
  systemDetails: string;
}

export const generateCircuitContext = (
  design: InstallationDesign,
  selectedCircuitIndices?: number[]
): CircuitContextSummary => {
  const circuits = selectedCircuitIndices
    ? design.circuits.filter((_, i) => selectedCircuitIndices.includes(i))
    : design.circuits;

  return {
    projectOverview: `${design.projectName} at ${design.location}. ${design.installationType || 'Domestic'} installation with ${design.circuits.length} circuits. ${design.consumerUnit?.incomingSupply?.voltage || 230}V ${design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-C-S'} supply.`,

    circuitSummaries: circuits.map(c => ({
      name: c.name,
      description: `${c.loadType} circuit - ${c.loadPower}W load`,
      keySpecs: `${c.cableSize}mm² ${c.cableType || 'T&E'}, ${c.protectionDevice?.rating}A ${c.protectionDevice?.type}, ${c.cableLength}m run`,
      installationNotes: c.installationMethod || 'Standard installation'
    })),

    systemDetails: `Main switch: ${design.consumerUnit?.mainSwitchRating || 100}A, Ze: ${design.consumerUnit?.incomingSupply?.Ze || 0.35}Ω, Total load: ${((design.totalLoad || 0) / 1000).toFixed(1)}kW`
  };
};

export type AgentType = 'installer' | 'rams' | 'cost-engineer' | 'commissioning';

export const formatContextForAgent = (
  context: CircuitContextSummary,
  agentType: AgentType
): string => {
  const baseContext = `
## Project: ${context.projectOverview}

## Circuits to Process:
${context.circuitSummaries.map((c, i) => `
### Circuit ${i + 1}: ${c.name}
- ${c.description}
- Specs: ${c.keySpecs}
- Installation: ${c.installationNotes}
`).join('\n')}

## System: ${context.systemDetails}
`;

  // Add agent-specific instructions
  const agentInstructions: Record<AgentType, string> = {
    installer: 'Please provide detailed installation guidance for these circuits.',
    rams: 'Please generate a RAMS document covering installation of these circuits.',
    'cost-engineer': 'Please estimate materials and labour costs for these circuits.',
    commissioning: 'Please provide commissioning and testing procedures for these circuits.'
  };

  return `${baseContext}\n\n${agentInstructions[agentType]}`;
};

export interface StoredCircuitContext {
  context: CircuitContextSummary;
  formattedPrompt: string;
  sourceDesign: string;
  timestamp: string;
  agentType: AgentType;
}

export const storeContextForAgent = (
  design: InstallationDesign,
  selectedCircuitIndices: number[],
  agentType: AgentType
): void => {
  const context = generateCircuitContext(design, selectedCircuitIndices);
  const formattedPrompt = formatContextForAgent(context, agentType);

  const storedContext: StoredCircuitContext = {
    context,
    formattedPrompt,
    sourceDesign: design.projectName,
    timestamp: new Date().toISOString(),
    agentType
  };

  sessionStorage.setItem('circuit-design-context', JSON.stringify(storedContext));
};

export const getStoredCircuitContext = (): StoredCircuitContext | null => {
  const stored = sessionStorage.getItem('circuit-design-context');
  if (!stored) return null;

  try {
    return JSON.parse(stored) as StoredCircuitContext;
  } catch {
    return null;
  }
};

export const clearStoredCircuitContext = (): void => {
  sessionStorage.removeItem('circuit-design-context');
};
