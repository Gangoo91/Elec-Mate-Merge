interface ShowerSymbolProps {
  x: number;
  y: number;
  rating?: string;
  label?: string;
}

export const ShowerSymbol = ({ x, y, rating = "9.5kW", label = "Electric Shower" }: ShowerSymbolProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Shower unit box */}
      <rect x="-30" y="-30" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" rx="3" />
      
      {/* Shower head */}
      <rect x="-15" y="-10" width="30" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" rx="2" />
      
      {/* Water drops */}
      <line x1="-10" y1="0" x2="-10" y2="15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="0" y1="0" x2="0" y2="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="10" y1="0" x2="10" y2="15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
      
      {/* Pull cord switch indicator */}
      <circle cx="20" cy="-20" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="-16" x2="20" y2="-8" stroke="currentColor" strokeWidth="1" />
      
      {/* Rating */}
      <text x="0" y="-40" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor">
        {rating}
      </text>
      
      {/* Label */}
      <text x="0" y="45" fontSize="9" textAnchor="middle" fill="currentColor">
        {label}
      </text>
    </g>
  );
};
