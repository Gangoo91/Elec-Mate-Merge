// Load Symbols - Various electrical loads
// Socket, Light, Cooker, Shower, etc.

export interface LoadSymbolProps {
  type: 'socket' | 'light' | 'cooker' | 'shower' | 'immersion' | 'heating' | 'ev-charger' | 'motor' | 'generic';
  x: number;
  y: number;
  label?: string;
  rating?: number;
}

export const LoadSymbol = ({ type, x, y, label, rating }: LoadSymbolProps) => {
  const renderLoadIcon = () => {
    switch (type) {
      case 'socket':
        return (
          <>
            {/* Socket outlet symbol */}
            <circle cx="20" cy="20" r="18" fill="white" stroke="black" strokeWidth="2" />
            <circle cx="15" cy="15" r="3" fill="black" />
            <circle cx="25" cy="15" r="3" fill="black" />
            <rect x="17" y="22" width="6" height="8" fill="black" rx="1" />
          </>
        );
      
      case 'light':
        return (
          <>
            {/* Light bulb symbol */}
            <circle cx="20" cy="15" r="12" fill="white" stroke="black" strokeWidth="2" />
            <rect x="15" y="25" width="10" height="6" fill="white" stroke="black" strokeWidth="2" />
            <line x1="13" y1="28" x2="27" y2="28" stroke="black" strokeWidth="1" />
            <line x1="14" y1="30" x2="26" y2="30" stroke="black" strokeWidth="1" />
            {/* Light rays */}
            <line x1="8" y1="8" x2="4" y2="4" stroke="black" strokeWidth="2" />
            <line x1="32" y1="8" x2="36" y2="4" stroke="black" strokeWidth="2" />
            <line x1="8" y1="22" x2="4" y2="26" stroke="black" strokeWidth="2" />
            <line x1="32" y1="22" x2="36" y2="26" stroke="black" strokeWidth="2" />
          </>
        );
      
      case 'cooker':
        return (
          <>
            {/* Cooker symbol */}
            <rect x="5" y="5" width="30" height="30" fill="white" stroke="black" strokeWidth="2" rx="2" />
            <circle cx="13" cy="13" r="4" fill="none" stroke="black" strokeWidth="1.5" />
            <circle cx="27" cy="13" r="4" fill="none" stroke="black" strokeWidth="1.5" />
            <circle cx="13" cy="27" r="4" fill="none" stroke="black" strokeWidth="1.5" />
            <circle cx="27" cy="27" r="4" fill="none" stroke="black" strokeWidth="1.5" />
          </>
        );
      
      case 'shower':
        return (
          <>
            {/* Shower symbol */}
            <rect x="8" y="5" width="24" height="10" fill="white" stroke="black" strokeWidth="2" rx="2" />
            {/* Water droplets */}
            <circle cx="12" cy="20" r="1.5" fill="black" />
            <circle cx="16" cy="24" r="1.5" fill="black" />
            <circle cx="20" cy="20" r="1.5" fill="black" />
            <circle cx="24" cy="24" r="1.5" fill="black" />
            <circle cx="28" cy="20" r="1.5" fill="black" />
            <circle cx="14" cy="28" r="1.5" fill="black" />
            <circle cx="22" cy="28" r="1.5" fill="black" />
            <circle cx="26" cy="28" r="1.5" fill="black" />
          </>
        );
      
      case 'immersion':
        return (
          <>
            {/* Immersion heater symbol */}
            <rect x="10" y="5" width="20" height="30" fill="white" stroke="black" strokeWidth="2" rx="2" />
            {/* Heating element */}
            <path
              d="M 15 12 Q 18 15, 15 18 Q 12 21, 15 24 Q 18 27, 15 30"
              fill="none"
              stroke="red"
              strokeWidth="2"
            />
            <path
              d="M 25 12 Q 22 15, 25 18 Q 28 21, 25 24 Q 22 27, 25 30"
              fill="none"
              stroke="red"
              strokeWidth="2"
            />
          </>
        );
      
      case 'motor':
        return (
          <>
            {/* Motor symbol */}
            <circle cx="20" cy="20" r="15" fill="white" stroke="black" strokeWidth="2" />
            <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="bold" fill="black">M</text>
          </>
        );
      
      case 'ev-charger':
        return (
          <>
            {/* EV Charger symbol */}
            <rect x="10" y="5" width="20" height="30" fill="white" stroke="black" strokeWidth="2" rx="3" />
            {/* Charging bolt */}
            <path
              d="M 20 12 L 16 20 L 20 20 L 16 28 L 24 20 L 20 20 Z"
              fill="#eab308"
              stroke="black"
              strokeWidth="1"
            />
          </>
        );
      
      default:
        return (
          <>
            {/* Generic load symbol */}
            <rect x="8" y="8" width="24" height="24" fill="white" stroke="black" strokeWidth="2" rx="2" />
            <text x="20" y="24" textAnchor="middle" fontSize="16" fontWeight="bold" fill="black">L</text>
          </>
        );
    }
  };

  return (
    <g transform={`translate(${x}, ${y})`} className="load-symbol">
      {/* Connection point */}
      <line x1="20" y1="-10" x2="20" y2="0" stroke="black" strokeWidth="2" />
      
      {/* Load icon */}
      <g>
        {renderLoadIcon()}
      </g>
      
      {/* Label and rating */}
      <text
        x="20"
        y="50"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="black"
      >
        {label}
      </text>
      
      {rating && (
        <text
          x="20"
          y="63"
          textAnchor="middle"
          fontSize="11"
          fill="black"
        >
          {rating}W
        </text>
      )}
    </g>
  );
};
