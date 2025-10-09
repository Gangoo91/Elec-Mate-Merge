interface EVChargerSymbolProps {
  x: number;
  y: number;
  rating?: string;
  label?: string;
}

export const EVChargerSymbol = ({ x, y, rating = "7kW", label = "EV Charger" }: EVChargerSymbolProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Charging unit box */}
      <rect x="-30" y="-25" width="60" height="50" fill="none" stroke="currentColor" strokeWidth="2" />
      
      {/* Type 2 socket representation */}
      <circle cx="0" cy="-5" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="-6" cy="-8" r="2" fill="currentColor" />
      <circle cx="6" cy="-8" r="2" fill="currentColor" />
      <circle cx="0" cy="0" r="2" fill="currentColor" />
      
      {/* Mode 3 indicator */}
      <text x="0" y="18" fontSize="8" textAnchor="middle" fill="currentColor">Mode 3</text>
      
      {/* Rating */}
      <text x="0" y="-35" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor">
        {rating}
      </text>
      
      {/* Label */}
      <text x="0" y="35" fontSize="9" textAnchor="middle" fill="currentColor">
        {label}
      </text>
    </g>
  );
};
