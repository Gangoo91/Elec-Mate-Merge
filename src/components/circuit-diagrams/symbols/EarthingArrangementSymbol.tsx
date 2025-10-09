interface EarthingArrangementSymbolProps {
  x: number;
  y: number;
  type: 'TT' | 'TN-S' | 'TN-C-S';
  label?: string;
}

export const EarthingArrangementSymbol = ({ x, y, type, label }: EarthingArrangementSymbolProps) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {type === 'TT' && (
        <>
          {/* TT System - Two separate earth electrodes */}
          <g transform="translate(-25, 0)">
            <line x1="0" y1="-20" x2="0" y2="0" stroke="currentColor" strokeWidth="2" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="currentColor" strokeWidth="2" />
            <line x1="-7" y1="5" x2="7" y2="5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="-4" y1="10" x2="4" y2="10" stroke="currentColor" strokeWidth="1" />
            <text x="0" y="-25" fontSize="8" textAnchor="middle" fill="currentColor">E</text>
          </g>
          <g transform="translate(25, 0)">
            <line x1="0" y1="-20" x2="0" y2="0" stroke="currentColor" strokeWidth="2" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="currentColor" strokeWidth="2" />
            <line x1="-7" y1="5" x2="7" y2="5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="-4" y1="10" x2="4" y2="10" stroke="currentColor" strokeWidth="1" />
            <text x="0" y="-25" fontSize="8" textAnchor="middle" fill="currentColor">N</text>
          </g>
        </>
      )}
      
      {type === 'TN-S' && (
        <>
          {/* TN-S System - Separate neutral and earth from transformer */}
          <line x1="-20" y1="-30" x2="-20" y2="0" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="-30" x2="20" y2="0" stroke="currentColor" strokeWidth="2" />
          <line x1="-30" y1="0" x2="30" y2="0" stroke="currentColor" strokeWidth="2" />
          <line x1="-25" y1="5" x2="25" y2="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="-20" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
          <text x="-20" y="-35" fontSize="8" textAnchor="middle" fill="currentColor">N</text>
          <text x="20" y="-35" fontSize="8" textAnchor="middle" fill="currentColor">PE</text>
        </>
      )}
      
      {type === 'TN-C-S' && (
        <>
          {/* TN-C-S (PME) - Combined neutral-earth */}
          <line x1="0" y1="-30" x2="0" y2="0" stroke="currentColor" strokeWidth="3" />
          <line x1="-20" y1="0" x2="20" y2="0" stroke="currentColor" strokeWidth="2" />
          <line x1="-15" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="-10" y1="10" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
          <text x="0" y="-35" fontSize="8" textAnchor="middle" fill="currentColor">PEN</text>
          <text x="25" y="-20" fontSize="7" textAnchor="start" fill="currentColor">PME</text>
        </>
      )}
      
      {/* Type label */}
      <text x="0" y="25" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor">
        {type}
      </text>
      
      {label && (
        <text x="0" y="35" fontSize="8" textAnchor="middle" fill="currentColor">
          {label}
        </text>
      )}
    </g>
  );
};
