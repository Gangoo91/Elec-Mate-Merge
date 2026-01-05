import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const rows = [
  { q: "Voltage", u: "Volt", s: "V", note: "Electrical pressure" },
  { q: "Current", u: "Ampere", s: "A", note: "Flow of charge" },
  { q: "Resistance", u: "Ohm", s: "Ω", note: "Opposition to current" },
  { q: "Power", u: "Watt", s: "W", note: "Rate of energy" },
  { q: "Energy", u: "Watt-hour", s: "Wh", note: "Consumption over time" },
  { q: "Frequency", u: "Hertz", s: "Hz", note: "AC cycles per second" },
];

const UnitsPocketCard: React.FC = () => {
  return (
    <Card className="p-6 bg-card border-border/20">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground">Units Pocket Card</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Keep this handy. Aligns with UK practice and BS 7671 terminology.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border/20 text-sm">
          <thead>
            <tr className="bg-muted/20">
              <th className="border border-border/20 p-2 text-left">Quantity</th>
              <th className="border border-border/20 p-2 text-left">Unit</th>
              <th className="border border-border/20 p-2 text-left">Symbol</th>
              <th className="border border-border/20 p-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.q}>
                <td className="border border-border/20 p-2 font-medium">{r.q}</td>
                <td className="border border-border/20 p-2">{r.u}</td>
                <td className="border border-border/20 p-2 font-mono">{r.s}</td>
                <td className="border border-border/20 p-2">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        Tip: Check prefixes (m, k, M) and instrument scales before recording values.
      </div>
    </Card>
  );
};

export default UnitsPocketCard;
