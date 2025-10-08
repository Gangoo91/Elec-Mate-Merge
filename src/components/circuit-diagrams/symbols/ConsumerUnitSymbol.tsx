// Consumer Unit Symbol - Main enclosure representation

export interface ConsumerUnitSymbolProps {
  x: number;
  y: number;
  width: number;
  height: number;
  mainSwitchRating?: number;
  label?: string;
}

export const ConsumerUnitSymbol = ({
  x,
  y,
  width,
  height,
  mainSwitchRating = 100,
  label = 'Consumer Unit'
}: ConsumerUnitSymbolProps) => {
  return (
    <g transform={`translate(${x}, ${y})`} className="consumer-unit-symbol">
      {/* Main enclosure */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="white"
        stroke="black"
        strokeWidth="3"
        rx="4"
      />
      
      {/* Title bar */}
      <rect
        x="0"
        y="0"
        width={width}
        height="30"
        fill="#e5e7eb"
        stroke="black"
        strokeWidth="1"
      />
      
      {/* Consumer unit label */}
      <text
        x={width / 2}
        y="20"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="black"
      >
        {label}
      </text>
      
      {/* Main switch indicator */}
      <rect
        x={width / 2 - 30}
        y="40"
        width="60"
        height="40"
        fill="#3b82f6"
        stroke="black"
        strokeWidth="2"
        rx="2"
      />
      
      <text
        x={width / 2}
        y="55"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="white"
      >
        MAIN
      </text>
      
      <text
        x={width / 2}
        y="70"
        textAnchor="middle"
        fontSize="11"
        fontWeight="bold"
        fill="white"
      >
        {mainSwitchRating}A
      </text>
      
      {/* Busbar representation (horizontal lines) */}
      <line
        x1="10"
        y1="90"
        x2={width - 10}
        y2="90"
        stroke="#ef4444"
        strokeWidth="4"
      />
      
      <line
        x1="10"
        y1="100"
        x2={width - 10}
        y2="100"
        stroke="#3b82f6"
        strokeWidth="4"
      />
      
      <line
        x1="10"
        y1="110"
        x2={width - 10}
        y2="110"
        stroke="#22c55e"
        strokeWidth="4"
      />
      
      {/* Busbar labels */}
      <text x="15" y="88" fontSize="9" fill="white" fontWeight="bold">L</text>
      <text x="15" y="98" fontSize="9" fill="white" fontWeight="bold">N</text>
      <text x="15" y="108" fontSize="9" fill="white" fontWeight="bold">E</text>
    </g>
  );
};
