// Cable Symbol with Size and Length Annotation
// BS 7671 compliant representation

export interface CableSymbolProps {
  liveSize: number;
  cpcSize: number;
  length: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  cableType?: string;
  showAnnotation?: boolean;
}

export const CableSymbol = ({
  liveSize,
  cpcSize,
  length,
  x1,
  y1,
  x2,
  y2,
  cableType = 'Twin & Earth',
  showAnnotation = true
}: CableSymbolProps) => {
  // Calculate midpoint for annotation
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  
  // Calculate angle for vertical text if cable is vertical
  const isVertical = Math.abs(x2 - x1) < 10;
  const angle = isVertical ? -90 : 0;

  return (
    <g className="cable-symbol">
      {/* Main cable line (thicker for larger cables) */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth={liveSize >= 10 ? 3 : 2}
        strokeLinecap="round"
      />
      
      {/* Annotation */}
      {showAnnotation && (
        <g transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
          {/* Background rectangle for text */}
          <rect
            x="-45"
            y="-12"
            width="90"
            height="24"
            fill="white"
            stroke="black"
            strokeWidth="1"
            rx="2"
          />
          
          {/* Cable size text */}
          <text
            x="0"
            y="-2"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="black"
          >
            {liveSize}mm² / {cpcSize}mm²
          </text>
          
          {/* Length text */}
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fontSize="10"
            fill="black"
          >
            {length}m
          </text>
        </g>
      )}
    </g>
  );
};
