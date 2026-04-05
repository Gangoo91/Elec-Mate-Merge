import { cn } from '@/lib/utils';

interface TerminalConnection {
  terminal: string;
  wire: string;
  color: string;
  notes?: string;
}

interface TerminalDiagramProps {
  connections: TerminalConnection[];
  title?: string;
  className?: string;
  componentName?: string;
}

// UK standard wire colours — unified for both SVG and legend
const wireColors: Record<string, string> = {
  brown: '#A0522D',
  blue: '#0066CC',
  'green/yellow': '#228B22',
  'green yellow': '#228B22',
  grey: '#6B7280',
  black: '#1F2937',
  red: '#DC2626',
  yellow: '#EAB308',
  white: '#F3F4F6',
};

function getWireColor(wireColor: string): string {
  const normalized = wireColor.toLowerCase().trim();
  return wireColors[normalized] || wireColor;
}

/**
 * Returns a small coloured circle representing a wire colour.
 * Uses UK standard wiring colours for visual identification.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function getWireColourDot(colourName: string): JSX.Element | null {
  const name = colourName.toLowerCase().trim();

  if (name.includes('green') && name.includes('yellow')) {
    return (
      <span
        className="w-3 h-3 rounded-full inline-block flex-shrink-0 bg-green-500 ring-2 ring-yellow-400"
        aria-label="Green and yellow wire"
      />
    );
  }
  if (name.includes('brown')) {
    return (
      <span
        className="w-3 h-3 rounded-full inline-block flex-shrink-0 bg-[#A0522D]"
        aria-label="Brown wire"
      />
    );
  }
  if (name.includes('blue')) {
    return (
      <span
        className="w-3 h-3 rounded-full inline-block flex-shrink-0 bg-blue-500"
        aria-label="Blue wire"
      />
    );
  }
  if (name.includes('grey') || name.includes('gray')) {
    return (
      <span
        className="w-3 h-3 rounded-full inline-block flex-shrink-0 bg-gray-400"
        aria-label="Grey wire"
      />
    );
  }
  if (name.includes('black')) {
    return (
      <span
        className="w-3 h-3 rounded-full inline-block flex-shrink-0 bg-black border border-white/30"
        aria-label="Black wire"
      />
    );
  }
  if (name.includes('red')) {
    return (
      <span
        className="w-3 h-3 rounded-full inline-block flex-shrink-0 bg-red-500"
        aria-label="Red wire"
      />
    );
  }
  if (name.includes('yellow')) {
    return (
      <span
        className="w-3 h-3 rounded-full inline-block flex-shrink-0 bg-yellow-400"
        aria-label="Yellow wire"
      />
    );
  }

  return null;
}

/**
 * TerminalDiagram - SVG-based wire connection visualization
 *
 * Features:
 * - Visual terminal block with wire connections and circuit context (SUPPLY → BLOCK → LOAD)
 * - UK standard wire color coding (unified SVG + legend)
 * - Legend with terminal assignments
 * - Responsive: stacks on mobile, side-by-side on sm+
 */
export function TerminalDiagram({
  connections,
  title = 'Terminal Connections',
  className,
  componentName,
}: TerminalDiagramProps) {
  const height = Math.max(120, connections.length * 35 + 40);

  return (
    <div
      className={cn(
        'rounded-xl p-5',
        'bg-gradient-to-br from-elec-dark to-background',
        'border border-border/30',
        className
      )}
    >
      {title && <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>}

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* SVG Diagram */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <svg
            viewBox={`0 0 280 ${height}`}
            className="w-full max-w-[280px] mx-auto sm:mx-0 h-auto"
            style={{ minWidth: '140px' }}
          >
            {/* Supply label + icon (left) */}
            <rect
              x="2"
              y={height / 2 - 18}
              width="36"
              height="36"
              rx="4"
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <text
              x="20"
              y={height / 2 - 2}
              textAnchor="middle"
              fontSize="6"
              fill="rgba(255,255,255,0.6)"
              fontFamily="monospace"
            >
              CU
            </text>
            <text
              x="20"
              y={height / 2 + 8}
              textAnchor="middle"
              fontSize="5"
              fill="rgba(255,255,255,0.4)"
              fontFamily="monospace"
            >
              SUPPLY
            </text>

            {/* Terminal block */}
            <rect
              x="90"
              y="15"
              width="50"
              height={height - 30}
              rx="4"
              className="fill-muted/50 stroke-border"
              strokeWidth="2"
            />

            {/* Block header label */}
            <text
              x="115"
              y="12"
              textAnchor="middle"
              fontSize="7"
              fill="rgba(255,255,255,0.4)"
              fontFamily="monospace"
            >
              BLOCK
            </text>

            {/* Load label (right) */}
            <rect
              x="242"
              y={height / 2 - 18}
              width="36"
              height="36"
              rx="4"
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <text
              x="260"
              y={height / 2 - 2}
              textAnchor="middle"
              fontSize="6"
              fill="rgba(255,255,255,0.6)"
              fontFamily="monospace"
            >
              {componentName && componentName.length > 6
                ? componentName.slice(0, 6)
                : componentName || 'LOAD'}
            </text>
            <text
              x="260"
              y={height / 2 + 8}
              textAnchor="middle"
              fontSize="5"
              fill="rgba(255,255,255,0.4)"
              fontFamily="monospace"
            >
              LOAD
            </text>

            {/* Wire connections */}
            {connections.map((conn, index) => {
              const y = 35 + index * 30;
              const color = getWireColor(conn.color || conn.wire);
              const label = conn.terminal.length > 6 ? conn.terminal.slice(0, 6) : conn.terminal;

              return (
                <g key={index}>
                  {/* Wire line from supply */}
                  <line
                    x1="38"
                    y1={y}
                    x2="90"
                    y2={y}
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Arrow head into terminal */}
                  <polygon points={`${86},${y - 3} ${90},${y} ${86},${y + 3}`} fill={color} />

                  {/* Terminal dot */}
                  <circle cx="90" cy={y} r="5" fill={color} stroke="#0a0a0a" strokeWidth="2" />

                  {/* Terminal label */}
                  <text
                    x="115"
                    y={y + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="white"
                  >
                    {label}
                  </text>

                  {/* Wire connector to load */}
                  <line
                    x1="140"
                    y1={y}
                    x2="242"
                    y2={y}
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="8 4"
                    opacity="0.6"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-3">
          {connections.map((conn, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
              {/* Wire color indicator */}
              <div
                className="w-8 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: getWireColor(conn.color || conn.wire) }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{conn.terminal}</span>
                  {getWireColourDot(conn.wire)}
                  <span className="text-white text-sm">{conn.wire}</span>
                </div>
                {conn.notes && (
                  <p className="text-xs text-white mt-0.5 line-clamp-2">{conn.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TerminalDiagram;
