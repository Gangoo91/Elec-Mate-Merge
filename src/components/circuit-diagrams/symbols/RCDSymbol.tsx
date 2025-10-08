// BS 7671 RCD Symbol - Residual Current Device
// IEC 60617 Standard

export interface RCDSymbolProps {
  rating: number; // mA (30, 100, 300)
  currentRating: number; // A (main contact rating)
  rcdType?: 'AC' | 'A' | 'B' | 'F';
  timeDelayed?: boolean;
  x: number;
  y: number;
  label?: string;
  poles?: number;
}

export const RCDSymbol = ({
  rating,
  currentRating,
  rcdType = 'A',
  timeDelayed = false,
  x,
  y,
  label,
  poles = 2
}: RCDSymbolProps) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="rcd-symbol">
      {/* RCD body */}
      <rect
        x="0"
        y="0"
        width="60"
        height="70"
        fill="white"
        stroke="black"
        strokeWidth="2"
        rx="2"
      />
      
      {/* Incoming connections (multiple poles) */}
      {Array.from({ length: poles }).map((_, i) => {
        const xPos = 20 + (i * 20);
        return (
          <line
            key={`in-${i}`}
            x1={xPos}
            y1="-10"
            x2={xPos}
            y2="0"
            stroke="black"
            strokeWidth="2"
          />
        );
      })}
      
      {/* Outgoing connections */}
      {Array.from({ length: poles }).map((_, i) => {
        const xPos = 20 + (i * 20);
        return (
          <line
            key={`out-${i}`}
            x1={xPos}
            y1="70"
            x2={xPos}
            y2="80"
            stroke="black"
            strokeWidth="2"
          />
        );
      })}
      
      {/* Current rating */}
      <text
        x="30"
        y="20"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="black"
      >
        {currentRating}A
      </text>
      
      {/* RCD sensitivity */}
      <text
        x="30"
        y="40"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="black"
      >
        {rating}mA
      </text>
      
      {/* RCD type */}
      <text
        x="30"
        y="55"
        textAnchor="middle"
        fontSize="11"
        fill="black"
      >
        Type {rcdType}
      </text>
      
      {/* Time delayed indicator */}
      {timeDelayed && (
        <text
          x="30"
          y="65"
          textAnchor="middle"
          fontSize="9"
          fill="red"
          fontWeight="bold"
        >
          S (Delayed)
        </text>
      )}
      
      {/* Test button */}
      <circle cx="53" cy="12" r="4" fill="blue" stroke="black" strokeWidth="1" />
      <text x="53" y="14" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">T</text>
      
      {/* Label below */}
      {label && (
        <text
          x="30"
          y="95"
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
