// BS 7671 RCBO Symbol - Residual Current Circuit Breaker with Overload
// Combines MCB and RCD functionality

export interface RCBOSymbolProps {
  rating: number;
  curve: 'B' | 'C' | 'D';
  rcdRating: number; // mA (30, 100, 300)
  rcdType?: 'AC' | 'A' | 'B' | 'F';
  x: number;
  y: number;
  label?: string;
  kaRating?: number;
}

export const RCBOSymbol = ({
  rating,
  curve,
  rcdRating,
  rcdType = 'A',
  x,
  y,
  label,
  kaRating = 6
}: RCBOSymbolProps) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="rcbo-symbol">
      {/* RCBO body - slightly larger than MCB */}
      <rect
        x="0"
        y="0"
        width="50"
        height="80"
        fill="white"
        stroke="black"
        strokeWidth="2"
        rx="2"
      />
      
      {/* Incoming connection */}
      <line x1="25" y1="-10" x2="25" y2="0" stroke="black" strokeWidth="2" />
      
      {/* Outgoing connection */}
      <line x1="25" y1="80" x2="25" y2="90" stroke="black" strokeWidth="2" />
      
      {/* MCB section - top half */}
      <text
        x="25"
        y="25"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="bold"
        fill="black"
      >
        {curve}{rating}
      </text>
      
      {/* Divider line */}
      <line x1="5" y1="40" x2="45" y2="40" stroke="black" strokeWidth="1" strokeDasharray="3,3" />
      
      {/* RCD section - bottom half */}
      <text
        x="25"
        y="55"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="bold"
        fill="black"
      >
        {rcdRating}mA
      </text>
      
      {/* RCD type indicator */}
      <text
        x="25"
        y="70"
        textAnchor="middle"
        fontSize="10"
        fill="black"
      >
        Type {rcdType}
      </text>
      
      {/* Test button indicator (small circle) */}
      <circle cx="43" cy="10" r="3" fill="blue" stroke="black" strokeWidth="1" />
      <text x="43" y="12" textAnchor="middle" fontSize="8" fill="white">T</text>
      
      {/* Label below */}
      {label && (
        <text
          x="25"
          y="105"
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
