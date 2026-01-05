import { Card } from "@/components/ui/card";

interface TerminalConnectionCardProps {
  terminal: string;
  wireColour: string;
  connectionPoint: string;
  notes?: string;
}

const getWireColor = (colour: string) => {
  const colorMap: Record<string, string> = {
    'brown': '#8B4513',
    'blue': '#0066CC',
    'green': '#22C55E',
    'yellow': '#EAB308',
    'grey': '#6B7280',
    'black': '#1a1a1a',
  };
  const lower = colour.toLowerCase();
  if (lower.includes('green') && lower.includes('yellow')) {
    return 'linear-gradient(135deg, #22C55E 50%, #EAB308 50%)';
  }
  return colorMap[lower] || colour;
};

export const TerminalConnectionCard = ({
  terminal,
  wireColour,
  connectionPoint,
  notes
}: TerminalConnectionCardProps) => {
  return (
    <Card className="p-4 bg-card border-border/50 hover:border-elec-yellow/30 transition-colors">
      <div className="space-y-3 text-left">
        {/* Terminal Label - Prominent */}
        <div className="flex items-center justify-between gap-3">
          <div className="font-mono text-lg font-bold text-elec-yellow">
            {terminal}
          </div>
          <div 
            className="h-10 w-10 rounded-full border-2 border-white/20 shadow-lg flex-shrink-0" 
            style={{ background: getWireColor(wireColour) }}
            aria-label={`Wire colour: ${wireColour}`}
          />
        </div>

        {/* Wire Colour Name */}
        <div className="text-base font-semibold text-foreground">
          {wireColour}
        </div>

        {/* Connection Description */}
        <div className="text-sm text-foreground/80 leading-relaxed">
          {connectionPoint}
        </div>

        {/* Technical Notes */}
        {notes && (
          <div className="pt-2 border-t border-border/30">
            <p className="text-sm text-foreground/70 italic leading-relaxed">
              ℹ️ {notes}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
