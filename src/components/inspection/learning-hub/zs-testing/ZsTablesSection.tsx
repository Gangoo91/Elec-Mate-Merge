
import React from 'react';
import { Table, FileText, Calculator, AlertTriangle, BookOpen, Shield } from 'lucide-react';

const ZsTablesSection = () => (
  <div className="space-y-4 sm:space-y-6">
    {/* Educational Header - Understanding 80% Rule */}
    <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
        <h4 className="font-semibold text-sm sm:text-base text-elec-yellow">Understanding BS 7671 Zs Values: The 80% Rule Explained</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
          <p className="font-medium text-blue-400 mb-2">🔵 BS 7671 Maximum (100%)</p>
          <p className="text-gray-300">These are the values from Appendix 3, Table 41.3. They represent the maximum Zs at <strong>fault temperature (~70°C for PVC cables)</strong> when conductors are carrying high fault current.</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">🎯 80% Rule (Testing Limit)</p>
          <p className="text-gray-300">Your measured Zs must not exceed this value. Measured at <strong>ambient temperature (~20°C)</strong>. The 80% accounts for resistance increase when conductors heat up during a fault.</p>
        </div>
      </div>
      <div className="mt-3 bg-card rounded p-3 text-sm text-gray-300">
        <p className="font-medium text-foreground mb-2">Why 80%?</p>
        <p>When a fault occurs, conductors heat up rapidly and their resistance increases. The 80% rule provides a safety margin so that even when resistance increases to the BS 7671 maximum at fault temperature, the protective device still trips within the required time. <strong className="text-elec-yellow">Testing Rule: Measured Zs ≤ 80% value = PASS ✓</strong></p>
      </div>
      <div className="mt-3 flex items-start gap-2 text-xs text-gray-400 bg-card/50 rounded p-2">
        <span>💡</span>
        <p><strong>Colour Key:</strong> Blue columns = Reference values (BS 7671) | Green columns = Testing values (what you compare against)</p>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-3">
        <Table className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
        <h4 className="font-medium text-sm sm:text-base text-blue-400">BS 7671 Appendix 3 - Maximum Zs Values (Type B MCBs)</h4>
      </div>
      <div className="space-y-4 text-xs sm:text-sm text-gray-300">
        <div className="bg-card rounded p-3 sm:p-4">
          <p className="font-medium text-foreground mb-3 text-sm sm:text-base">Table 3A - Maximum Zs for Socket Outlets (0.4s disconnection)</p>
          <div className="overflow-x-auto touch-manipulation">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-muted-foreground">MCB Type & Rating</th>
                  <th className="text-left p-2 text-blue-400">BS 7671 Max (Ω)<br/><span className="text-xs font-normal">(at ~70°C)</span></th>
                  <th className="text-left p-2 text-green-400">🎯 80% Rule (Ω)<br/><span className="text-xs font-normal">(measured ~20°C)</span></th>
                  <th className="text-left p-2 text-muted-foreground">Min Fault (A)</th>
                  <th className="text-left p-2 text-muted-foreground">Typical Applications</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 6A</td>
                  <td className="p-2 text-blue-400 font-mono">9.58</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">7.67</td>
                  <td className="p-2">30</td>
                  <td className="p-2">Lighting circuits, small appliances</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 10A</td>
                  <td className="p-2 text-blue-400 font-mono">5.75</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">4.60</td>
                  <td className="p-2">50</td>
                  <td className="p-2">Small socket outlets, dedicated circuits</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 16A</td>
                  <td className="p-2 text-blue-400 font-mono">3.59</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">2.87</td>
                  <td className="p-2">80</td>
                  <td className="p-2">Radial socket circuits</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 20A</td>
                  <td className="p-2 text-blue-400 font-mono">2.88</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">2.30</td>
                  <td className="p-2">100</td>
                  <td className="p-2">Radial socket circuits, small ring finals</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 25A</td>
                  <td className="p-2 text-blue-400 font-mono">2.30</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">1.84</td>
                  <td className="p-2">125</td>
                  <td className="p-2">Immersion heaters, small cookers</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 32A</td>
                  <td className="p-2 text-blue-400 font-mono">1.80</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">1.44</td>
                  <td className="p-2">160</td>
                  <td className="p-2">Ring final circuits, large radials</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 40A</td>
                  <td className="p-2 text-blue-400 font-mono">1.44</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">1.15</td>
                  <td className="p-2">200</td>
                  <td className="p-2">Electric cookers, large appliances</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 50A</td>
                  <td className="p-2 text-blue-400 font-mono">1.15</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">0.92</td>
                  <td className="p-2">250</td>
                  <td className="p-2">Electric showers, large cookers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-foreground mb-3">Table 3B - Maximum Zs for Fixed Equipment (5s disconnection)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-muted-foreground">MCB Type & Rating</th>
                  <th className="text-left p-2 text-blue-400">BS 7671 Max (Ω)<br/><span className="text-xs font-normal">(at ~70°C)</span></th>
                  <th className="text-left p-2 text-green-400">🎯 80% Rule (Ω)<br/><span className="text-xs font-normal">(measured ~20°C)</span></th>
                  <th className="text-left p-2 text-muted-foreground">Min Fault (A)</th>
                  <th className="text-left p-2 text-muted-foreground">Typical Applications</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 6A</td>
                  <td className="p-2 text-blue-400 font-mono">11.46</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">9.17</td>
                  <td className="p-2">25</td>
                  <td className="p-2">Fixed lighting, small motors</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 10A</td>
                  <td className="p-2 text-blue-400 font-mono">6.88</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">5.50</td>
                  <td className="p-2">42</td>
                  <td className="p-2">Fixed appliances, fans</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 16A</td>
                  <td className="p-2 text-blue-400 font-mono">4.30</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">3.44</td>
                  <td className="p-2">67</td>
                  <td className="p-2">Fixed heaters, ventilation</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 20A</td>
                  <td className="p-2 text-blue-400 font-mono">3.44</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">2.75</td>
                  <td className="p-2">84</td>
                  <td className="p-2">Storage heaters, pumps</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type B 32A</td>
                  <td className="p-2 text-blue-400 font-mono">2.15</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">1.72</td>
                  <td className="p-2">134</td>
                  <td className="p-2">Large fixed appliances</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Type C MCB Maximum Zs Values</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-foreground mb-3">Type C MCBs (Industrial/Commercial Applications)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-muted-foreground" rowSpan={2}>MCB Rating</th>
                  <th className="text-center p-2 text-blue-400 border-r border-border" colSpan={2}>0.4s Disconnection</th>
                  <th className="text-center p-2 text-blue-400" colSpan={2}>5s Disconnection</th>
                  <th className="text-left p-2 text-muted-foreground" rowSpan={2}>Min Fault (A)</th>
                </tr>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-blue-400 text-xs">BS 7671</th>
                  <th className="text-left p-2 text-green-400 text-xs border-r border-border">🎯 80%</th>
                  <th className="text-left p-2 text-blue-400 text-xs">BS 7671</th>
                  <th className="text-left p-2 text-green-400 text-xs">🎯 80%</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type C 6A</td>
                  <td className="p-2 text-blue-400 font-mono">4.79</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">3.83</td>
                  <td className="p-2 text-blue-400 font-mono">5.73</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">4.58</td>
                  <td className="p-2">60</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type C 10A</td>
                  <td className="p-2 text-blue-400 font-mono">2.88</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">2.30</td>
                  <td className="p-2 text-blue-400 font-mono">3.44</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">2.75</td>
                  <td className="p-2">100</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type C 16A</td>
                  <td className="p-2 text-blue-400 font-mono">1.80</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">1.44</td>
                  <td className="p-2 text-blue-400 font-mono">2.15</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">1.72</td>
                  <td className="p-2">160</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type C 20A</td>
                  <td className="p-2 text-blue-400 font-mono">1.44</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">1.15</td>
                  <td className="p-2 text-blue-400 font-mono">1.72</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">1.38</td>
                  <td className="p-2">200</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">Type C 32A</td>
                  <td className="p-2 text-blue-400 font-mono">0.90</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">0.72</td>
                  <td className="p-2 text-blue-400 font-mono">1.08</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">0.86</td>
                  <td className="p-2">320</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
          <p className="font-medium text-purple-400 mb-2">Type C MCB Applications:</p>
          <p className="text-sm text-gray-300">
            Type C MCBs are used for circuits with inductive loads such as motors, transformers, and fluorescent lighting 
            where higher inrush currents are expected. They require higher fault currents for magnetic operation (10 × In).
          </p>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">BS 88 Fuse Maximum Zs Values</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-foreground mb-3">Common BS 88 Fuse Ratings</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-muted-foreground" rowSpan={2}>Fuse Rating</th>
                  <th className="text-center p-2 text-blue-400 border-r border-border" colSpan={2}>0.4s Disconnection</th>
                  <th className="text-center p-2 text-blue-400" colSpan={2}>5s Disconnection</th>
                  <th className="text-left p-2 text-muted-foreground" rowSpan={2}>Typical Use</th>
                </tr>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-blue-400 text-xs">BS 7671</th>
                  <th className="text-left p-2 text-green-400 text-xs border-r border-border">🎯 80%</th>
                  <th className="text-left p-2 text-blue-400 text-xs">BS 7671</th>
                  <th className="text-left p-2 text-green-400 text-xs">🎯 80%</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">20A</td>
                  <td className="p-2 text-blue-400 font-mono">1.44</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">1.15</td>
                  <td className="p-2 text-blue-400 font-mono">3.03</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">2.42</td>
                  <td className="p-2">Radial circuits</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">30A</td>
                  <td className="p-2 text-blue-400 font-mono">0.96</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">0.77</td>
                  <td className="p-2 text-blue-400 font-mono">2.01</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">1.61</td>
                  <td className="p-2">Ring finals, cookers</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">45A</td>
                  <td className="p-2 text-blue-400 font-mono">0.64</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">0.51</td>
                  <td className="p-2 text-blue-400 font-mono">1.34</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">1.07</td>
                  <td className="p-2">Large appliances</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">60A</td>
                  <td className="p-2 text-blue-400 font-mono">0.48</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">0.38</td>
                  <td className="p-2 text-blue-400 font-mono">1.01</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">0.81</td>
                  <td className="p-2">Submains, large loads</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium">80A</td>
                  <td className="p-2 text-blue-400 font-mono">0.36</td>
                  <td className="p-2 text-green-400 font-mono font-semibold border-r border-border">0.29</td>
                  <td className="p-2 text-blue-400 font-mono">0.75</td>
                  <td className="p-2 text-green-400 font-mono font-semibold">0.60</td>
                  <td className="p-2">Main switches, distribution</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
          <p className="font-medium text-orange-400 mb-2">BS 88 Fuse Characteristics:</p>
          <p className="text-sm text-gray-300">
            BS 88 fuses have different time/current characteristics compared to MCBs. 
            They provide excellent discrimination and fault current limitation but require lower Zs values for reliable operation.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Using the Tables in Practice</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Step-by-step table usage:</p>
          <p className="ml-4">• <strong>Step 1:</strong> Identify the protective device type and rating</p>
          <p className="ml-4">• <strong>Step 2:</strong> Determine required disconnection time (0.4s or 5s)</p>
          <p className="ml-4">• <strong>Step 3:</strong> Find maximum permitted Zs from appropriate table</p>
          <p className="ml-4">• <strong>Step 4:</strong> Compare with temperature-corrected test result</p>
          <p className="ml-4">• <strong>Step 5:</strong> Determine compliance (pass if measured ≤ maximum)</p>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Practical Example:</p>
          <p className="mb-1"><strong>Circuit:</strong> 32A Type B MCB protecting ring final circuit</p>
          <p className="mb-1"><strong>Measured Zs:</strong> 1.38Ω (at ambient ~20°C)</p>
          <p className="mb-1"><strong>From Table 3A:</strong></p>
          <p className="ml-4 text-blue-400">• BS 7671 Maximum: 1.80Ω (at fault temperature ~70°C)</p>
          <p className="ml-4 text-green-400">• 80% Rule Limit: 1.44Ω (for testing at ~20°C)</p>
          <p className="mt-2"><strong>Comparison:</strong> 1.38Ω ≤ 1.44Ω ✅</p>
          <p className="text-green-400 font-medium mt-2">Result: PASS - Safety margin: 0.06Ω (4.2%)</p>
          <p className="text-xs text-gray-400 mt-2">Under fault conditions: 1.38Ω × 1.25 = 1.73Ω, which is still below 1.80Ω</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Important considerations:</p>
          <p className="ml-4">• <strong>Temperature correction:</strong> Always use corrected values for comparison</p>
          <p className="ml-4">• <strong>Safety margins:</strong> Consider additional margin for reliability</p>
          <p className="ml-4">• <strong>Circuit type:</strong> Ensure correct disconnection time requirement</p>
          <p className="ml-4">• <strong>Special locations:</strong> May require more stringent limits</p>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">Common Mistakes and Misconceptions</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Frequent errors in table usage:</p>
          <p className="ml-4">• <strong>Wrong disconnection time:</strong> Using 5s limits for socket outlet circuits</p>
          <p className="ml-4">• <strong className="text-red-400">Comparing to 100% values:</strong> Must compare measured Zs to 80% column, NOT BS 7671 column</p>
          <p className="ml-4">• <strong>Not understanding 80% rule:</strong> The 80% accounts for conductor heating during faults</p>
          <p className="ml-4">• <strong>Wrong MCB type:</strong> Confusing Type B and Type C characteristics</p>
          <p className="ml-4">• <strong>Fuse vs MCB:</strong> Using MCB values for fuse-protected circuits</p>
          <p className="ml-4">• <strong>Circuit identification:</strong> Testing wrong circuit or protective device</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Professional tips:</p>
          <p className="ml-4">• Keep BS 7671 Appendix 3 readily available during testing</p>
          <p className="ml-4">• Create quick reference cards for common protective devices</p>
          <p className="ml-4">• Double-check protective device ratings before testing</p>
          <p className="ml-4">• Consider future load increases when assessing compliance</p>
          <p className="ml-4">• Document any marginal readings for future reference</p>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Special Applications and Exceptions</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Reduced disconnection times:</p>
          <p className="ml-4">• <strong>Medical locations:</strong> Group 1 areas may require 0.1s disconnection</p>
          <p className="ml-4">• <strong>Construction sites:</strong> Reduced voltage systems with modified limits</p>
          <p className="ml-4">• <strong>Agricultural installations:</strong> Enhanced protection requirements</p>
          <p className="ml-4">• <strong>Caravans and boats:</strong> Special earthing arrangements affect limits</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Alternative calculation methods:</p>
          <p className="ml-4">• <strong>Adiabatic equation:</strong> For cables not covered by standard tables</p>
          <p className="ml-4">• <strong>Manufacturer data:</strong> For non-standard protective devices</p>
          <p className="ml-4">• <strong>Computer analysis:</strong> For complex distribution systems</p>
          <p className="ml-4">• <strong>Time graded systems:</strong> Discrimination requirements may override ADS</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Always Remember:</p>
          <p className="text-sm text-gray-300">
            These tables represent maximum values under ideal conditions. 
            Real installations should aim for values well below these limits to ensure reliable operation under all conditions.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ZsTablesSection;
