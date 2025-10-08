// SVG Diagram Renderer Component
// Renders BS 7671 compliant circuit diagrams from layout data

import { MCBSymbol } from '@/components/circuit-diagrams/symbols/MCBSymbol';
import { RCBOSymbol } from '@/components/circuit-diagrams/symbols/RCBOSymbol';
import { RCDSymbol } from '@/components/circuit-diagrams/symbols/RCDSymbol';
import { CableSymbol } from '@/components/circuit-diagrams/symbols/CableSymbol';
import { EarthSymbol } from '@/components/circuit-diagrams/symbols/EarthSymbol';
import { ConsumerUnitSymbol } from '@/components/circuit-diagrams/symbols/ConsumerUnitSymbol';
import { LoadSymbol } from '@/components/circuit-diagrams/symbols/LoadSymbol';
import { DiagramLayout, DiagramElement } from '@/lib/diagramGenerator/layoutEngine';

export interface SVGDiagramRendererProps {
  layout: DiagramLayout;
  editable?: boolean;
  onElementUpdate?: (elementId: string, x: number, y: number) => void;
}

export const SVGDiagramRenderer = ({
  layout,
  editable = false,
  onElementUpdate
}: SVGDiagramRendererProps) => {
  const renderElement = (element: DiagramElement) => {
    switch (element.type) {
      case 'mcb':
        return (
          <MCBSymbol
            key={element.id}
            rating={element.props.rating}
            curve={element.props.curve}
            x={element.x}
            y={element.y}
            label={element.props.label}
            kaRating={element.props.kaRating}
          />
        );
      
      case 'rcbo':
        return (
          <RCBOSymbol
            key={element.id}
            rating={element.props.rating}
            curve={element.props.curve}
            rcdRating={element.props.rcdRating}
            rcdType={element.props.rcdType}
            x={element.x}
            y={element.y}
            label={element.props.label}
            kaRating={element.props.kaRating}
          />
        );
      
      case 'rcd':
        return (
          <RCDSymbol
            key={element.id}
            rating={element.props.rating}
            currentRating={element.props.currentRating}
            rcdType={element.props.rcdType}
            timeDelayed={element.props.timeDelayed}
            x={element.x}
            y={element.y}
            label={element.props.label}
            poles={element.props.poles}
          />
        );
      
      case 'cable':
        return (
          <CableSymbol
            key={element.id}
            liveSize={element.props.liveSize}
            cpcSize={element.props.cpcSize}
            length={element.props.length}
            x1={element.props.x1}
            y1={element.props.y1}
            x2={element.props.x2}
            y2={element.props.y2}
            cableType={element.props.cableType}
            showAnnotation={element.props.showAnnotation}
          />
        );
      
      case 'earth':
        return (
          <EarthSymbol
            key={element.id}
            x={element.x}
            y={element.y}
            size={element.props.size}
            label={element.props.label}
          />
        );
      
      case 'consumer-unit':
        return (
          <ConsumerUnitSymbol
            key={element.id}
            x={element.x}
            y={element.y}
            width={element.props.width}
            height={element.props.height}
            mainSwitchRating={element.props.mainSwitchRating}
            label={element.props.label}
          />
        );
      
      case 'load':
        return (
          <LoadSymbol
            key={element.id}
            type={element.props.type}
            x={element.x}
            y={element.y}
            label={element.props.label}
            rating={element.props.rating}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-2 border-border rounded-lg overflow-hidden">
      <svg
        width={layout.width}
        height={layout.height}
        className="w-full h-auto"
        style={{ maxHeight: '800px' }}
      >
        {/* Title Block */}
        <g className="title-block">
          <rect
            x="0"
            y="0"
            width={layout.width}
            height="40"
            fill="#f3f4f6"
            stroke="#d1d5db"
            strokeWidth="1"
          />
          <text
            x="20"
            y="25"
            fontSize="16"
            fontWeight="bold"
            fill="#1f2937"
          >
            {layout.title}
          </text>
          {layout.metadata.date && (
            <text
              x={layout.width - 20}
              y="25"
              textAnchor="end"
              fontSize="12"
              fill="#6b7280"
            >
              {layout.metadata.date}
            </text>
          )}
        </g>

        {/* Main diagram content */}
        <g transform="translate(0, 40)">
          {/* Render connections first (so they appear behind elements) */}
          {layout.connections.map(conn => (
            <line
              key={conn.id}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke={conn.type === 'earth' ? '#22c55e' : conn.type === 'neutral' ? '#3b82f6' : '#000'}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}

          {/* Render all diagram elements */}
          {layout.elements.map(element => renderElement(element))}
        </g>

        {/* Footer / Legend */}
        <g className="legend" transform={`translate(20, ${layout.height - 60})`}>
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill="#374151">
            BS 7671:2018+A3:2024 Compliant
          </text>
          {layout.metadata.circuitNumber && (
            <text x="0" y="15" fontSize="10" fill="#6b7280">
              Circuit {layout.metadata.circuitNumber}
            </text>
          )}
          {layout.metadata.designedBy && (
            <text x="0" y="28" fontSize="10" fill="#6b7280">
              Designed by: {layout.metadata.designedBy}
            </text>
          )}
        </g>
      </svg>
    </div>
  );
};
