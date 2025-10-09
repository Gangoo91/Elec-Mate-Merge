import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { CircuitData } from "@/lib/diagramGenerator/layoutEngine";

interface FloorPlanDisplayProps {
  circuits: CircuitData[];
  roomLayout?: string;
}

export const FloorPlanDisplay = ({ circuits, roomLayout }: FloorPlanDisplayProps) => {
  // Parse room information from circuit data
  const rooms = new Set<string>();
  circuits.forEach(circuit => {
    const name = circuit.name.toLowerCase();
    if (name.includes('kitchen')) rooms.add('Kitchen');
    if (name.includes('bathroom')) rooms.add('Bathroom');
    if (name.includes('bedroom')) rooms.add('Bedroom');
    if (name.includes('lounge') || name.includes('living')) rooms.add('Lounge');
    if (name.includes('hallway') || name.includes('hall')) rooms.add('Hallway');
    if (name.includes('outdoor') || name.includes('outside')) rooms.add('Outdoor');
  });

  // If no specific rooms identified, use generic layout
  if (rooms.size === 0) {
    rooms.add('Main Area');
  }

  const roomArray = Array.from(rooms);
  const gridCols = Math.ceil(Math.sqrt(roomArray.length));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Home className="w-4 h-4 md:w-5 md:h-5" />
          Floor Plan - Cable Routes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 p-4 rounded-lg border border-border">
          <svg width="100%" height="400" viewBox="0 0 800 400" className="bg-background/50 rounded">
            {/* Draw rooms in grid */}
            {roomArray.map((room, idx) => {
              const row = Math.floor(idx / gridCols);
              const col = idx % gridCols;
              const roomWidth = 800 / gridCols - 20;
              const roomHeight = 400 / Math.ceil(roomArray.length / gridCols) - 20;
              const x = col * (roomWidth + 20) + 10;
              const y = row * (roomHeight + 20) + 10;

              return (
                <g key={idx}>
                  {/* Room outline */}
                  <rect
                    x={x}
                    y={y}
                    width={roomWidth}
                    height={roomHeight}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/30"
                  />
                  
                  {/* Room label */}
                  <text
                    x={x + roomWidth / 2}
                    y={y + 20}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                    className="fill-foreground"
                  >
                    {room}
                  </text>

                  {/* Find circuits for this room */}
                  {circuits
                    .filter(c => c.name.toLowerCase().includes(room.toLowerCase()))
                    .map((circuit, circuitIdx) => {
                      const isSocket = circuit.loadType === 'socket';
                      const isLighting = circuit.loadType === 'lighting';
                      const iconY = y + 50 + circuitIdx * 40;

                      return (
                        <g key={`${idx}-${circuitIdx}`}>
                          {/* Circuit icon */}
                          {isSocket && (
                            <rect
                              x={x + 20}
                              y={iconY}
                              width="20"
                              height="20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="text-accent"
                            />
                          )}
                          {isLighting && (
                            <circle
                              cx={x + 30}
                              cy={iconY + 10}
                              r="10"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="text-warning"
                            />
                          )}
                          {!isSocket && !isLighting && (
                            <circle
                              cx={x + 30}
                              cy={iconY + 10}
                              r="8"
                              fill="currentColor"
                              className="text-primary"
                            />
                          )}

                          {/* Cable run line */}
                          <line
                            x1={x + 40}
                            y1={iconY + 10}
                            x2={x + roomWidth - 20}
                            y2={iconY + 10}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            className="text-primary/40"
                          />

                          {/* Circuit label */}
                          <text
                            x={x + 50}
                            y={iconY + 15}
                            fontSize="10"
                            className="fill-muted-foreground"
                          >
                            {circuit.cableSize}mm² · {circuit.protectionDevice.rating}A
                          </text>
                        </g>
                      );
                    })}
                </g>
              );
            })}

            {/* Legend */}
            <g transform="translate(20, 360)">
              <text fontSize="10" fontWeight="bold" className="fill-foreground">Legend:</text>
              <rect x="50" y="-8" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
              <text x="70" y="3" fontSize="9" className="fill-muted-foreground">Socket</text>
              <circle cx="127" cy="0" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warning" />
              <text x="140" y="3" fontSize="9" className="fill-muted-foreground">Lighting</text>
              <line x1="195" y1="0" x2="215" y2="0" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-primary/40" />
              <text x="220" y="3" fontSize="9" className="fill-muted-foreground">Cable Route</text>
            </g>
          </svg>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground">
          <p>Note: This is a simplified schematic showing approximate cable routes. Actual installation routes may vary based on building structure.</p>
        </div>
      </CardContent>
    </Card>
  );
};
