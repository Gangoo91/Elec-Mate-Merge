
import React from 'react';
import { Zap, Target } from 'lucide-react';

const ZsTestCircuitDiagram = () => (
  <div className="bg-background p-6 rounded-lg border border-border">
    <h4 className="text-foreground font-medium mb-4 flex items-center gap-2">
      <Target className="h-4 w-4 text-red-400" />
      Earth Fault Loop Impedance (Zs) Test Circuit
    </h4>
    <div className="bg-card p-6 rounded border font-mono text-sm">
      <div className="text-center text-white mb-6">Complete Earth Fault Loop Path</div>
      
      {/* Supply transformer */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="col-span-1 text-center">
          <div className="border-2 border-yellow-400 p-3 rounded">
            <div className="text-yellow-400 text-xs font-bold">SUPPLY</div>
            <div className="text-yellow-400 text-xs">TRANSFORMER</div>
            <div className="text-xs text-white/80 mt-1">Ze</div>
          </div>
        </div>
        
        {/* Phase conductor */}
        <div className="col-span-1 text-center">
          <div className="border border-red-400 p-2 rounded">
            <div className="text-red-400 text-xs">PHASE</div>
            <div className="text-red-400 text-xs">CONDUCTOR</div>
            <div className="text-xs text-white/80 mt-1">R1</div>
          </div>
        </div>
        
        {/* Load */}
        <div className="col-span-1 text-center">
          <div className="border-2 border-green-400 p-3 rounded">
            <div className="text-green-400 text-xs font-bold">LOAD</div>
            <div className="text-green-400 text-xs">(FAULT)</div>
            <div className="text-xs text-white/80 mt-1">Test Point</div>
          </div>
        </div>
        
        {/* CPC */}
        <div className="col-span-1 text-center">
          <div className="border border-blue-400 p-2 rounded">
            <div className="text-blue-400 text-xs">CPC</div>
            <div className="text-blue-400 text-xs">CONDUCTOR</div>
            <div className="text-xs text-white/80 mt-1">R2</div>
          </div>
        </div>
        
        {/* Earth electrode */}
        <div className="col-span-1 text-center">
          <div className="border-2 border-orange-400 p-3 rounded">
            <div className="text-orange-400 text-xs font-bold">EARTH</div>
            <div className="text-orange-400 text-xs">ELECTRODE</div>
            <div className="text-xs text-white/80 mt-1">Return Path</div>
          </div>
        </div>
      </div>
      
      {/* Connection lines */}
      <div className="flex justify-center items-center mb-6">
        <div className="flex items-center gap-2 text-xs text-white/80">
          <span>→</span>
          <span className="text-red-400">Phase Current</span>
          <span>→</span>
          <span className="text-green-400">Earth Fault</span>
          <span>→</span>
          <span className="text-blue-400">Return Current</span>
          <span>→</span>
        </div>
      </div>
      
      {/* Test equipment */}
      <div className="text-center mb-4">
        <div className="inline-block border-2 border-purple-400 p-3 rounded">
          <div className="text-purple-400 font-bold text-sm flex items-center gap-2">
            <Zap className="h-4 w-4" />
            ZS TESTER
          </div>
          <div className="text-xs text-white/80 mt-1">Phase to Earth</div>
          <div className="text-xs text-white/80">15-25A Test Current</div>
        </div>
      </div>
      
      {/* Formula */}
      <div className="bg-red-500/10 border border-red-500/20 rounded p-3 text-center">
        <div className="text-red-400 font-bold text-sm mb-2">Complete Formula</div>
        <div className="text-foreground text-sm">Zs = Ze + (R1 + R2)</div>
        <div className="text-xs text-white/80 mt-2">
          Where: Ze = External impedance, R1 = Phase conductor, R2 = CPC conductor
        </div>
      </div>
    </div>
  </div>
);

export default ZsTestCircuitDiagram;
