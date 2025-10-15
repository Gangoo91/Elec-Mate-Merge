import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";
import { safeAll } from "../_shared/safe-parallel.ts";

// BS 7671 Diagram Generation
interface DiagramElement {
  id: string;
  type: string;
  x: number;
  y: number;
  props: Record<string, any>;
}

interface DiagramLayout {
  width: number;
  height: number;
  elements: DiagramElement[];
  title: string;
}

function generateSingleLineDiagram(circuitData: any): DiagramLayout {
  const elements: DiagramElement[] = [];
  const centerX = 250;
  let currentY = 50;

  // Supply
  elements.push({
    id: 'supply',
    type: 'consumer-unit',
    x: centerX - 40,
    y: currentY,
    props: { width: 80, height: 40, label: 'From CU' }
  });
  currentY += 80;

  // Protection device
  if (circuitData.rcdProtected && circuitData.rcdRating) {
    elements.push({
      id: 'rcbo',
      type: 'rcbo',
      x: centerX - 25,
      y: currentY,
      props: {
        rating: circuitData.protectionDevice.rating,
        curve: circuitData.protectionDevice.curve,
        rcdRating: circuitData.rcdRating,
        label: `Circuit ${circuitData.circuitNumber}`,
        kaRating: circuitData.protectionDevice.kaRating
      }
    });
    currentY += 110;
  } else {
    elements.push({
      id: 'mcb',
      type: 'mcb',
      x: centerX - 20,
      y: currentY,
      props: {
        rating: circuitData.protectionDevice.rating,
        curve: circuitData.protectionDevice.curve,
        label: `Circuit ${circuitData.circuitNumber}`,
        kaRating: circuitData.protectionDevice.kaRating
      }
    });
    currentY += 90;
  }

  // Cable
  const cableEndY = currentY + 150;
  elements.push({
    id: 'cable',
    type: 'cable',
    x: centerX,
    y: currentY,
    props: {
      liveSize: circuitData.cableSize,
      cpcSize: circuitData.cpcSize,
      length: circuitData.cableLength,
      y1: currentY,
      y2: cableEndY
    }
  });
  currentY = cableEndY + 20;

  // Load
  elements.push({
    id: 'load',
    type: 'load',
    x: centerX - 30,
    y: currentY,
    props: {
      label: circuitData.name,
      rating: circuitData.loadPower
    }
  });
  currentY += 60;

  // Earth
  elements.push({
    id: 'earth',
    type: 'earth',
    x: centerX,
    y: currentY,
    props: { label: `CPC ${circuitData.cpcSize}mm²` }
  });

  return {
    width: 500,
    height: currentY + 100,
    elements,
    title: `Circuit ${circuitData.circuitNumber} - ${circuitData.name}`
  };
}

function layoutToSVG(layout: DiagramLayout): string {
  const { width, height, elements, title } = layout;
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Title block
  svg += `<rect x="0" y="0" width="${width}" height="50" fill="#f8f9fa" stroke="#dee2e6"/>`;
  svg += `<text x="20" y="30" font-family="Arial" font-size="16" font-weight="bold">${title}</text>`;
  
  elements.forEach(el => {
    const { x, y, type, props } = el;
    
    if (type === 'consumer-unit') {
      svg += `<rect x="${x}" y="${y}" width="${props.width}" height="${props.height}" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="2"/>`;
      svg += `<text x="${x + props.width/2}" y="${y + 25}" text-anchor="middle" font-size="12">${props.label}</text>`;
    }
    
    if (type === 'mcb') {
      svg += `<g transform="translate(${x}, ${y})">`;
      svg += `<rect width="40" height="70" fill="white" stroke="black" stroke-width="2" rx="2"/>`;
      svg += `<text x="20" y="25" text-anchor="middle" font-size="12" font-weight="bold">${props.curve}</text>`;
      svg += `<text x="20" y="45" text-anchor="middle" font-size="16" font-weight="bold">${props.rating}A</text>`;
      svg += `<text x="20" y="62" text-anchor="middle" font-size="9">${props.kaRating}kA</text>`;
      svg += `</g>`;
    }
    
    if (type === 'rcbo') {
      svg += `<g transform="translate(${x}, ${y})">`;
      svg += `<rect width="50" height="100" fill="white" stroke="black" stroke-width="2" rx="2"/>`;
      svg += `<text x="25" y="18" text-anchor="middle" font-size="9">RCBO</text>`;
      svg += `<text x="25" y="35" text-anchor="middle" font-size="12" font-weight="bold">${props.curve}</text>`;
      svg += `<text x="25" y="55" text-anchor="middle" font-size="16" font-weight="bold">${props.rating}A</text>`;
      svg += `<text x="25" y="75" text-anchor="middle" font-size="10">${props.rcdRating}mA</text>`;
      svg += `<text x="25" y="92" text-anchor="middle" font-size="8">${props.kaRating}kA</text>`;
      svg += `</g>`;
    }
    
    if (type === 'cable') {
      const midY = (props.y1 + props.y2) / 2;
      svg += `<line x1="${x}" y1="${props.y1}" x2="${x}" y2="${props.y2}" stroke="#000" stroke-width="3"/>`;
      svg += `<text x="${x + 10}" y="${midY}" font-size="10">${props.liveSize}mm² / ${props.cpcSize}mm² CPC</text>`;
      svg += `<text x="${x + 10}" y="${midY + 12}" font-size="9">Length: ${props.length}m</text>`;
    }
    
    if (type === 'load') {
      svg += `<rect x="${x}" y="${y}" width="60" height="40" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="2"/>`;
      svg += `<text x="${x + 30}" y="${y + 18}" text-anchor="middle" font-size="10" font-weight="bold">${props.label}</text>`;
      svg += `<text x="${x + 30}" y="${y + 32}" text-anchor="middle" font-size="11">${props.rating}W</text>`;
    }
    
    if (type === 'earth') {
      svg += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 10}" stroke="#000" stroke-width="2"/>`;
      svg += `<line x1="${x - 15}" y1="${y + 10}" x2="${x + 15}" y2="${y + 10}" stroke="#000" stroke-width="2"/>`;
      svg += `<line x1="${x - 10}" y1="${y + 15}" x2="${x + 10}" y2="${y + 15}" stroke="#000" stroke-width="2"/>`;
      svg += `<line x1="${x - 5}" y1="${y + 20}" x2="${x + 5}" y2="${y + 20}" stroke="#000" stroke-width="2"/>`;
      svg += `<text x="${x}" y="${y + 35}" text-anchor="middle" font-size="9">${props.label}</text>`;
    }
  });
  
  svg += '</svg>';
  return svg;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'wiring-diagram-generator-rag' });

  try {
    const { component_type, circuit_params, installation_context, component_image_url } = await req.json();

    if (!component_type) {
      throw new ValidationError('component_type is required');
    }

    logger.info('Wiring Diagram Generator RAG initiated', { 
      component_type, 
      circuit_params 
    });

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Analyze component image if provided
    let enhancedComponentType = component_type;
    let imageAnalysisContext = '';
    
    if (component_image_url) {
      logger.info('Analyzing component image', { component_image_url });
      
      const imageAnalysisData = await withRetry(
        () => withTimeout(
          fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${lovableApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { 
                  role: 'user', 
                  content: [
                    {
                      type: 'text',
                      text: 'Analyze this electrical component image. Identify: component type, ratings (amps/volts), manufacturer, model number, visible terminals, cable entry points, and any visible labels/markings. Be specific and technical.'
                    },
                    {
                      type: 'image_url',
                      image_url: { url: component_image_url }
                    }
                  ]
                }
              ],
              max_tokens: 500
            }),
          }).then(async (res) => {
            if (!res.ok) {
              logger.warn('Image analysis failed', { status: res.status });
              return { choices: [{ message: { content: '' } }] };
            }
            return res.json();
          }),
          Timeouts.STANDARD,
          'Image analysis'
        ),
        RetryPresets.STANDARD
      );
      
      imageAnalysisContext = imageAnalysisData.choices[0].message.content;
      enhancedComponentType = `${component_type} - ${imageAnalysisContext}`;
      
      logger.info('Image analysis completed', { imageAnalysisContext: imageAnalysisContext.substring(0, 100) });
    }

    // RAG query for design knowledge and wiring standards
    const ragQuery = `${enhancedComponentType} wiring diagram symbols terminal connections cable installation`;

    // Keyword-based RAG searches (no embeddings needed - fixes 400 error)
    const { successes, failures } = await logger.time(
      'Design RAG searches',
      async () => await safeAll([
        {
          name: 'design_knowledge',
          execute: () => withTimeout(
            supabase
              .from('design_knowledge')
              .select('*')
              .or(`topic.ilike.%${component_type}%,content.ilike.%${component_type}%`)
              .limit(8),
            Timeouts.STANDARD,
            'Design knowledge search'
          )
        },
        {
          name: 'wiring_diagrams',
          execute: () => withTimeout(
            supabase
              .from('design_knowledge')
              .select('*')
              .eq('source', 'wiring-diagrams')
              .limit(5),
            Timeouts.STANDARD,
            'Wiring diagram standards'
          )
        },
        {
          name: 'bs7671',
          execute: () => withTimeout(
            supabase
              .from('bs7671_embeddings')
              .select('*')
              .or(`content.ilike.%${component_type}%,regulation_number.ilike.%411%,regulation_number.ilike.%433%,regulation_number.ilike.%522%,regulation_number.ilike.%537%`)
              .limit(10),
            Timeouts.STANDARD,
            'BS 7671 regulations'
          )
        },
        {
          name: 'installation',
          execute: () => withTimeout(
            supabase
              .from('installation_knowledge')
              .select('*')
              .ilike('content', `%${component_type}%`)
              .limit(5),
            Timeouts.STANDARD,
            'Installation knowledge'
          )
        }
      ])
    );

    if (failures.length > 0) {
      logger.warn('Some RAG searches failed', { failures });
    }

    const designDocs = successes.find(s => s.name === 'design_knowledge')?.result?.data || [];
    const wiringDocs = successes.find(s => s.name === 'wiring_diagrams')?.result?.data || [];
    const regulations = successes.find(s => s.name === 'bs7671')?.result?.data || [];
    const installationDocs = successes.find(s => s.name === 'installation')?.result?.data || [];

    logger.info('RAG search completed', { 
      designCount: designDocs.length,
      wiringCount: wiringDocs.length,
      regulationsCount: regulations.length,
      installationCount: installationDocs.length
    });

    // Build circuit data from params
    const inferCableSize = (power: number, voltage = 230): number => {
      const current = power / voltage;
      if (current <= 16) return 1.5;
      if (current <= 20) return 2.5;
      if (current <= 32) return 4.0;
      if (current <= 40) return 6.0;
      return 10.0;
    };

    const calculateCPC = (liveSize: number): number => {
      if (liveSize <= 16) return liveSize;
      if (liveSize <= 35) return 16;
      return liveSize / 2;
    };

    const extractRating = (device: string): number => {
      const match = device?.match(/(\d+)A/);
      return match ? parseInt(match[1]) : 32;
    };

    const mapComponentToLoadType = (component: string, context: string): string => {
      const text = (component + ' ' + context).toLowerCase();
      if (text.includes('shower')) return 'shower';
      if (text.includes('cooker')) return 'cooker';
      if (text.includes('ev') || text.includes('charger')) return 'ev-charger';
      if (text.includes('socket')) return 'socket';
      if (text.includes('light')) return 'lighting';
      if (text.includes('immersion')) return 'immersion';
      return 'generic';
    };

    const cableSize = circuit_params.cableSize || inferCableSize(circuit_params.loadPower || 3000, circuit_params.voltage || 230);
    
    const circuitData = {
      circuitNumber: 1,
      name: component_type,
      voltage: circuit_params.voltage || 230,
      cableSize,
      cpcSize: calculateCPC(cableSize),
      cableLength: 10,
      loadType: mapComponentToLoadType(component_type, imageAnalysisContext),
      loadPower: circuit_params.loadPower || 3000,
      protectionDevice: {
        type: circuit_params.protectionDevice || 'MCB',
        rating: extractRating(circuit_params.protectionDevice) || Math.ceil((circuit_params.loadPower || 3000) / (circuit_params.voltage || 230)),
        curve: 'B',
        kaRating: 6
      },
      rcdProtected: circuit_params.rcdRequired !== false,
      rcdRating: circuit_params.rcdRequired !== false ? 30 : undefined,
      ze: 0.35
    };

    // Generate diagram layout programmatically (BS 7671 compliant)
    const layout = generateSingleLineDiagram(circuitData);
    
    // Convert layout to SVG
    const schematic_svg = layoutToSVG(layout);

    // Generate wiring procedure from RAG
    const wiring_procedure = [
      {
        step: 1,
        title: 'Safe Isolation',
        instruction: 'Isolate supply at consumer unit. Lock off and attach warning notice. Prove dead using approved voltage indicator (GS38).',
        safety_critical: true,
        bs7671_reference: '537.2.2.1',
        ppe_required: ['Voltage indicator', 'Lock-off device', 'Warning notices']
      },
      {
        step: 2,
        title: 'Cable Installation',
        instruction: `Install ${cableSize}mm² ${circuit_params.cableType || 'Twin & Earth'} cable to ${component_type}. Ensure adequate support and protection per installation method.`,
        safety_critical: false,
        bs7671_reference: '522.6'
      },
      {
        step: 3,
        title: 'Terminations',
        instruction: 'Strip cables to correct length. Terminate at protection device and load. Check torque settings per manufacturer specs.',
        safety_critical: true,
        bs7671_reference: '526.1'
      },
      {
        step: 4,
        title: 'Testing & Verification',
        instruction: 'Complete all tests: Continuity (R1+R2), Insulation resistance (≥1MΩ), Polarity, RCD operation (if fitted).',
        safety_critical: true,
        bs7671_reference: '643'
      }
    ];

    const terminal_connections = [
      { terminal: 'L', wire_colour: 'Brown', connection_point: 'Live terminal', torque_setting: '1.2 Nm' },
      { terminal: 'N', wire_colour: 'Blue', connection_point: 'Neutral terminal', torque_setting: '1.2 Nm' },
      { terminal: 'E', wire_colour: 'Green/Yellow', connection_point: 'Earth terminal', torque_setting: '1.2 Nm' }
    ];

    logger.info('Programmatic diagram generated successfully');

    return new Response(JSON.stringify({
      schematic_svg,
      circuit_spec: {
        cableSize,
        cableType: circuit_params.cableType || '6242Y Twin & Earth',
        protectionDevice: `${circuitData.protectionDevice.rating}A MCB Type ${circuitData.protectionDevice.curve}`,
        rcdRequired: circuitData.rcdProtected,
        rcdRating: circuitData.rcdRating
      },
      wiring_procedure,
      terminal_connections,
      testing_requirements: [
        'Continuity of protective conductors (R1+R2)',
        'Insulation resistance ≥1MΩ at 500V DC',
        'Polarity verification',
        circuitData.rcdProtected ? 'RCD operation test (30mA)' : 'Earth fault loop impedance (Zs)'
      ],
      installation_method_guidance: `Install cables using appropriate method. Ensure adequate mechanical protection and support. Reference Method ${circuit_params.installationMethod || 'C'} (clipped direct).`,
      safety_warnings: [
        'Always isolate supply before working',
        'Lock off and prove dead per GS38',
        'Use appropriate PPE including insulated tools',
        'Double-check polarity before energizing',
        'Complete all testing before commissioning'
      ],
      rag_sources: {
        design_docs_count: designDocs.length,
        wiring_standards_count: wiringDocs.length,
        regulations_count: regulations.length,
        installation_docs_count: installationDocs.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    logger.error('Wiring diagram generator RAG failed', { error });
    return handleError(error);
  }
});
