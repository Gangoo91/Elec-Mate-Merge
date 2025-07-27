
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Zap, ToggleLeft, Shield, Lightbulb, Gauge, Settings } from "lucide-react";

const ElectricalSymbols = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const symbolCategories = {
    basic: [
      { symbol: "—", name: "Conductor/Wire", description: "Single wire or conductor" },
      { symbol: "⏚", name: "Earth/Ground", description: "Connection to earth" },
      { symbol: "⊥", name: "Chassis Ground", description: "Connection to equipment chassis" },
      { symbol: "◯", name: "Connection", description: "Electrical connection point" },
      { symbol: "×", name: "No Connection", description: "Wires crossing without connection" }
    ],
    power: [
      { symbol: "⚡", name: "AC Supply", description: "Alternating current power source" },
      { symbol: "⊖⊕", name: "DC Supply", description: "Direct current power source" },
      { symbol: "🔋", name: "Battery", description: "Battery or cell" },
      { symbol: "⟲", name: "Generator", description: "Electrical generator" },
      { symbol: "M", name: "Motor", description: "Electric motor" }
    ],
    switches: [
      { symbol: "━╱━", name: "Single Pole Switch", description: "Basic on/off switch" },
      { symbol: "━╱━╱━", name: "Double Pole Switch", description: "Two-pole switch" },
      { symbol: "○━╱━", name: "Push Button NO", description: "Normally open push button" },
      { symbol: "●━╱━", name: "Push Button NC", description: "Normally closed push button" },
      { symbol: "≋", name: "Limit Switch", description: "Position-operated switch" }
    ],
    protection: [
      { symbol: "━□━", name: "Fuse", description: "Overcurrent protection device" },
      { symbol: "━⌐¬━", name: "Circuit Breaker", description: "Automatic circuit protection" },
      { symbol: "━∩━", name: "RCD", description: "Residual current device" },
      { symbol: "━⟂━", name: "Isolator", description: "Isolation switch" },
      { symbol: "━〈〉━", name: "Surge Protector", description: "Surge protection device" }
    ],
    loads: [
      { symbol: "💡", name: "Lamp/Light", description: "Incandescent lamp" },
      { symbol: "⟇", name: "Fluorescent", description: "Fluorescent lighting" },
      { symbol: "🔌", name: "Socket Outlet", description: "Power outlet/receptacle" },
      { symbol: "🔥", name: "Heater", description: "Electric heating element" },
      { symbol: "📢", name: "Bell/Buzzer", description: "Audible alarm device" }
    ],
    measurement: [
      { symbol: "Ⓐ", name: "Ammeter", description: "Current measuring instrument" },
      { symbol: "Ⓥ", name: "Voltmeter", description: "Voltage measuring instrument" },
      { symbol: "Ⓦ", name: "Wattmeter", description: "Power measuring instrument" },
      { symbol: "⊙", name: "Meter", description: "General measuring instrument" },
      { symbol: "CT", name: "Current Transformer", description: "Current measurement transformer" }
    ]
  };

  const allSymbols = Object.values(symbolCategories).flat();
  
  const filteredSymbols = allSymbols.filter(symbol =>
    symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symbol.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const diagramExamples = [
    {
      title: "Simple Lighting Circuit",
      description: "Basic single-way lighting circuit with switch and lamp",
      components: ["L", "N", "Switch", "Lamp", "Earth"]
    },
    {
      title: "Socket Circuit with RCD",
      description: "Ring final circuit with RCD protection",
      components: ["MCB", "RCD", "Ring Main", "Sockets", "Earth"]
    },
    {
      title: "Motor Control Circuit",
      description: "Basic motor starter with overload protection",
      components: ["Contactor", "Overload", "Motor", "Start/Stop buttons"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Electrical Symbols Guide</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Learn and reference common electrical symbols used in circuit diagrams and schematics
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search symbols..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {searchTerm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSymbols.map((symbol, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="text-2xl bg-elec-yellow/10 p-2 rounded">
                    {symbol.symbol}
                  </div>
                  <CardTitle className="text-lg">{symbol.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{symbol.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DropdownTabs
          placeholder="Select symbol category"
          tabs={[
            {
              value: "basic",
              label: "Basic",
              icon: Settings,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symbolCategories.basic.map((symbol, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl bg-elec-yellow/10 p-2 rounded min-w-[3rem] text-center">
                            {symbol.symbol}
                          </div>
                          <CardTitle className="text-lg">{symbol.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{symbol.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            },
            {
              value: "power",
              label: "Power",
              icon: Zap,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symbolCategories.power.map((symbol, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl bg-elec-yellow/10 p-2 rounded min-w-[3rem] text-center">
                            {symbol.symbol}
                          </div>
                          <CardTitle className="text-lg">{symbol.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{symbol.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            },
            {
              value: "switches",
              label: "Switches",
              icon: ToggleLeft,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symbolCategories.switches.map((symbol, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl bg-elec-yellow/10 p-2 rounded min-w-[3rem] text-center">
                            {symbol.symbol}
                          </div>
                          <CardTitle className="text-lg">{symbol.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{symbol.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            },
            {
              value: "protection",
              label: "Protection",
              icon: Shield,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symbolCategories.protection.map((symbol, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl bg-elec-yellow/10 p-2 rounded min-w-[3rem] text-center">
                            {symbol.symbol}
                          </div>
                          <CardTitle className="text-lg">{symbol.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{symbol.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            },
            {
              value: "loads",
              label: "Loads",
              icon: Lightbulb,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symbolCategories.loads.map((symbol, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl bg-elec-yellow/10 p-2 rounded min-w-[3rem] text-center">
                            {symbol.symbol}
                          </div>
                          <CardTitle className="text-lg">{symbol.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{symbol.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            },
            {
              value: "measurement",
              label: "Measurement",
              icon: Gauge,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symbolCategories.measurement.map((symbol, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl bg-elec-yellow/10 p-2 rounded min-w-[3rem] text-center">
                            {symbol.symbol}
                          </div>
                          <CardTitle className="text-lg">{symbol.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{symbol.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            }
          ]}
        />
      )}

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Common Circuit Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {diagramExamples.map((example, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{example.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{example.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Components:</p>
                  <div className="flex flex-wrap gap-1">
                    {example.components.map((component, idx) => (
                      <span key={idx} className="text-xs bg-elec-yellow/10 px-2 py-1 rounded">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalSymbols;
