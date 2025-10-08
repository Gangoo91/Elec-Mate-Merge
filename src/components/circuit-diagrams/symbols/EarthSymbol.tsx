// Earth Symbol - IEC 60617 Standard
// Protective earth / grounding symbol

export interface EarthSymbolProps {
  x: number;
  y: number;
  size?: number;
  label?: string;
}

export const EarthSymbol = ({ x, y, size = 30, label }: EarthSymbolProps) => {
  const lineSpacing = size / 3;
  
  return (
    <g transform={`translate(${x}, ${y})`} className="earth-symbol">
      {/* Vertical connection line */}
      <line
        x1="0"
        y1={-size / 2}
        x2="0"
        y2="0"
        stroke="black"
        strokeWidth="2"
      />
      
      {/* Earth symbol - three horizontal lines (decreasing width) */}
      <line
        x1={-size / 2}
        y1="0"
        x2={size / 2}
        y2="0"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      <line
        x1={-size / 2.5}
        y1={lineSpacing}
        x2={size / 2.5}
        y2={lineSpacing}
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      <line
        x1={-size / 4}
        y1={lineSpacing * 2}
        x2={size / 4}
        y2={lineSpacing * 2}
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Label */}
      {label && (
        <text
          x="0"
          y={lineSpacing * 2 + 15}
          textAnchor="middle"
          fontSize="11"
          fill="black"
          fontWeight="bold"
        >
          {label}
        </text>
      )}
    </g>
  );
};
