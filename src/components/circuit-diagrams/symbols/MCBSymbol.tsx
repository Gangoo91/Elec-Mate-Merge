// BS 7671 MCB Symbol - IEC 60617 Standard
// Miniature Circuit Breaker representation

export interface MCBSymbolProps {
  rating: number;
  curve: 'B' | 'C' | 'D';
  x: number;
  y: number;
  label?: string;
  kaRating?: number;
}

export const MCBSymbol = ({ rating, curve, x, y, label, kaRating = 6 }: MCBSymbolProps) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="mcb-symbol">
      {/* MCB body */}
      <rect
        x="0"
        y="0"
        width="40"
        height="60"
        fill="white"
        stroke="black"
        strokeWidth="2"
        rx="2"
      />
      
      {/* Incoming connection */}
      <line x1="20" y1="-10" x2="20" y2="0" stroke="black" strokeWidth="2" />
      
      {/* Outgoing connection */}
      <line x1="20" y1="60" x2="20" y2="70" stroke="black" strokeWidth="2" />
      
      {/* Rating text */}
      <text
        x="20"
        y="30"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="bold"
        fill="black"
      >
        {curve}{rating}
      </text>
      
      {/* kA rating */}
      <text
        x="20"
        y="50"
        textAnchor="middle"
        fontSize="10"
        fill="black"
      >
        {kaRating}kA
      </text>
      
      {/* Label below */}
      {label && (
        <text
          x="20"
          y="85"
          textAnchor="middle"
          fontSize="12"
          fill="black"
        >
          {label}
        </text>
      )}
    </g>
  );
};
