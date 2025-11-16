/**
 * Embedding Builder
 * Converts normalized form inputs into semantic text for embedding generation
 */

import type { NormalizedInputs } from './types.ts';

export class EmbeddingBuilder {
  /**
   * Build semantic query text from form fields (no user text)
   */
  buildEmbeddingText(inputs: NormalizedInputs): string {
    const parts: string[] = [];

    // Supply context
    parts.push(
      `${inputs.supply.voltage}V ${inputs.supply.phases} phase ${inputs.supply.earthing} system installation`
    );

    // Circuit descriptions
    inputs.circuits.forEach((c, idx) => {
      const circuitParts: string[] = [];
      
      // Basic circuit info
      circuitParts.push(`${c.loadPower}W ${c.loadType} circuit`);
      circuitParts.push(`${c.cableLength}m cable run`);
      
      // Special location
      if (c.specialLocation !== 'none') {
        circuitParts.push(`${c.specialLocation} location`);
        
        if (c.specialLocation === 'bathroom' && c.bathroomZone) {
          const zone = c.bathroomZone.replace('zone_', '');
          circuitParts.push(`bathroom zone ${zone}`);
        }
        
        if (c.specialLocation === 'outdoor' && c.outdoorInstall) {
          circuitParts.push(`${c.outdoorInstall} outdoor installation`);
        }
      }
      
      // Installation method
      if (c.installMethod && c.installMethod !== 'auto') {
        const method = c.installMethod.replace('method_', '');
        circuitParts.push(`reference method ${method} installation`);
      }
      
      // Protection type
      if (c.protectionType && c.protectionType !== 'auto') {
        circuitParts.push(`${c.protectionType} protection`);
      }
      
      // Phase
      if (c.phases === 'three') {
        circuitParts.push('three phase');
      }

      parts.push(`Circuit ${idx + 1}: ${circuitParts.join(', ')}`);
    });

    // Add design intent context
    parts.push('BS 7671 compliant electrical installation design');
    parts.push('cable sizing, protection device selection, voltage drop calculation');

    return parts.join('. ');
  }

  /**
   * Generate embedding vector using OpenAI text-embedding-3-small
   */
  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: text.slice(0, 8000), // Max 8k chars
        model: 'text-embedding-3-small'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Embedding generation failed: ${error}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  }
}
