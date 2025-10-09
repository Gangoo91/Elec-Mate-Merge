interface HeatPumpSymbolProps {
  x: number;
  y: number;
  capacity?: string;
  label?: string;
}

export const HeatPumpSymbol = ({ x, y, capacity = "8kW", label = "Heat Pump" }: HeatPumpSymbolProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Outdoor unit box */}
      <rect x="-35" y="-25" width="70" height="50" fill="none" stroke="currentColor" strokeWidth="2" rx="4" />
      
      {/* Fan representation */}
      <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="-7" y1="-7" x2="7" y2="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7" y1="-7" x2="-7" y2="7" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Heating/cooling indicator */}
      <path d="M -25,-15 L -20,-10 L -25,-5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M 25,-15 L 20,-10 L 25,-5" fill="none" stroke="currentColor" strokeWidth="1" />
      
      {/* Capacity rating */}
      <text x="0" y="-35" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor">
        {capacity}
      </text>
      
      {/* Label */}
      <text x="0" y="40" fontSize="9" textAnchor="middle" fill="currentColor">
        {label}
      </text>
    </g>
  );
};
