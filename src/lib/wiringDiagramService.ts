import { supabase } from "@/integrations/supabase/client";

export interface WiringSchematicRequest {
  component_type: string;
  circuit_params: {
    cableSize: number;
    cableType: string;
    protectionDevice: string;
    rcdRequired: boolean;
    loadPower: number;
    voltage: number;
  };
  installation_context: string;
}

export interface CircuitSpec {
  cableSize: number;
  cableType: string;
  protectionDevice: string;
  rcdRequired: boolean;
  rcdRating?: number;
}

export interface WiringStep {
  step: number;
  title: string;
  instruction: string;
  safety_critical: boolean;
  bs7671_reference: string;
  ppe_required?: string[];
}

export interface TerminalConnection {
  terminal: string;
  wire_colour: string;
  connection_point: string;
  torque_setting?: string;
}

export interface WiringSchematicResponse {
  schematic_svg: string;
  circuit_spec: CircuitSpec;
  wiring_procedure: WiringStep[];
  terminal_connections: TerminalConnection[];
  testing_requirements: string[];
  installation_method_guidance: string;
  safety_warnings: string[];
  rag_sources: {
    installation_docs_count: number;
    regulations_count: number;
    safety_docs_count: number;
  };
}

export async function generateWiringSchematic(
  request: WiringSchematicRequest
): Promise<WiringSchematicResponse> {
  const { data, error } = await supabase.functions.invoke(
    'wiring-diagram-generator-rag',
    {
      body: request,
    }
  );

  if (error) {
    console.error('❌ Wiring schematic generation failed:', error);
    throw new Error(error.message || 'Failed to generate wiring schematic');
  }

  if (!data) {
    throw new Error('No data returned from wiring schematic generator');
  }

  return data as WiringSchematicResponse;
}
