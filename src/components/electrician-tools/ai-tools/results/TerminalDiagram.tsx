import { cn } from "@/lib/utils";

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
}

// UK standard wire colors
const wireColors: Record<string, string> = {
  'brown': '#8B4513',
  'blue': '#0066CC',
  'green/yellow': '#228B22',
  'green yellow': '#228B22',
  'grey': '#6B7280',
  'black': '#1F2937',
  'red': '#DC2626',
  'yellow': '#EAB308',
  'white': '#F3F4F6',
};

function getWireColor(wireColor: string): string {
  const normalized = wireColor.toLowerCase().trim();
  return wireColors[normalized] || wireColor;
}

/**
 * TerminalDiagram - SVG-based wire connection visualization
 *
 * Features:
 * - Visual terminal block with wire connections
 * - UK standard wire color coding
 * - Animated wire paths
 * - Legend with terminal assignments
 */
export function TerminalDiagram({
  connections,
  title = "Terminal Connections",
  className,
}: TerminalDiagramProps) {
  const height = Math.max(120, connections.length * 35 + 40);

  return (
    <div
      className={cn(
        "rounded-xl p-5",
        "bg-gradient-to-br from-elec-dark to-background",
        "border border-border/30",
        className
      )}
    >
      {title && (
        <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
      )}

      <div className="flex gap-6 items-start">
        {/* SVG Diagram */}
        <div className="flex-shrink-0">
          <svg
            viewBox={`0 0 200 ${height}`}
            className="w-full max-w-[200px] h-auto"
            style={{ minWidth: '160px' }}
          >
            {/* Terminal block */}
            <rect
              x="70"
              y="15"
              width="50"
              height={height - 30}
              rx="4"
              className="fill-muted/50 stroke-border"
              strokeWidth="2"
            />

            {/* Terminal block label */}
            <text
              x="95"
              y={height / 2}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px] font-mono"
              transform={`rotate(-90, 95, ${height / 2})`}
            >
              TERMINAL
            </text>

            {/* Wire connections */}
            {connections.map((conn, index) => {
              const y = 35 + index * 30;
              const color = getWireColor(conn.color || conn.wire);

              return (
                <g key={index}>
                  {/* Wire line */}
                  <line
                    x1="0"
                    y1={y}
                    x2="70"
                    y2={y}
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />

                  {/* Terminal dot */}
                  <circle
                    cx="70"
                    cy={y}
                    r="6"
                    fill={color}
                    className="stroke-background"
                    strokeWidth="2"
                  />

                  {/* Terminal label */}
                  <text
                    x="95"
                    y={y + 4}
                    textAnchor="middle"
                    className="fill-foreground text-xs font-bold"
                  >
                    {conn.terminal}
                  </text>

                  {/* Wire connector on right */}
                  <line
                    x1="120"
                    y1={y}
                    x2="200"
                    y2={y}
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="8 4"
                    className="opacity-60"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {connections.map((conn, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg bg-background/50"
            >
              {/* Wire color indicator */}
              <div
                className="w-8 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: getWireColor(conn.color || conn.wire) }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground text-sm">
                    {conn.terminal}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {conn.wire}
                  </span>
                </div>
                {conn.notes && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {conn.notes}
                  </p>
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
