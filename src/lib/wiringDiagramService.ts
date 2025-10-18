import { supabase } from "@/integrations/supabase/client";

export interface WiringGuidanceRequest {
  component_image_url: string;
}

export interface WiringStep {
  step: number;
  title: string;
  instruction: string;
  safety_critical: boolean;
  bs7671_reference: string;
}

export interface TerminalConnection {
  terminal: string;
  wire_colour: string;
  connection_point: string;
  notes?: string;
}

export interface PreInstallationTask {
  task: string;
  description: string;
  why?: string;
  tools_needed?: string[];
}

export interface BoardLayoutGuide {
  mcb_arrangement: string;
  earth_bar_numbering: string;
  neutral_bar_numbering: string;
  visual_diagram?: string;
}

export interface WiringSequenceStrategy {
  order: string[];
  rationale: string;
}

export interface WiringGuidanceResponse {
  component_name: string;
  component_details: string;
  pre_installation_tasks?: PreInstallationTask[];
  board_layout_guide?: BoardLayoutGuide;
  wiring_sequence_strategy?: WiringSequenceStrategy;
  practical_tips?: string[];
  common_mistakes?: string[];
  wiring_steps: WiringStep[];
  terminal_connections: TerminalConnection[];
  safety_warnings: string[];
  required_tests: string[];
  rag_sources: {
    installation_docs_count: number;
    regulations_count: number;
  };
}

export async function generateWiringGuidance(
  request: WiringGuidanceRequest
): Promise<WiringGuidanceResponse> {
  const { data, error } = await supabase.functions.invoke(
    'wiring-diagram-generator-rag',
    {
      body: request,
    }
  );

  if (error) {
    console.error('❌ Wiring guidance generation failed:', error);
    throw new Error(error.message || 'Failed to generate wiring guidance');
  }

  if (!data) {
    throw new Error('No data returned from wiring guidance generator');
  }

  return data as WiringGuidanceResponse;
}
