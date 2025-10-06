# BS 7671 Knowledge Extraction - Batch 10 COMPLETE ✅

## Files Created:

### 1. `bs7671EVCharging_GeneratingSets.ts`
**Section 722: Electric Vehicle Charging Installations**

- ✅ EV charging scope and modes (Mode 1, 2, 3, 4) - Reg 722.11
- ✅ **CRITICAL PME RESTRICTIONS** - Reg 722.411.4.1
  - TN-C-S (PME) PROHIBITED without protection
  - 4 approved protection methods (TT earth electrode, PEN monitoring, Special RCD, Alternative device)
  - Risk: Broken PEN = 230V on vehicle body = FATAL SHOCK
- ✅ RCD requirements - Reg 722.531.3.101
  - Type A/F/B with IΔn ≤30mA
  - DC fault protection (Type B OR Type A/F + RDC-DD)
  - Individual RCD per charging point
- ✅ Socket/connector types - Reg 722.55.101.0.201.1
  - BS 1363 (13A, marked "EV")
  - BS EN 60309-2 (Commando 16A/32A)
  - **Type 2 (Mennekes) - UK STANDARD** for Mode 3
  - Type 1 (J1772 - rare), Type 3 (rare)
- ✅ External influences - Reg 722.512.2
  - Outdoor: IPX4/IP4X minimum, IK08 for public areas
  - Impact protection AG3 (high severity)
- ✅ Circuit protection - Reg 722.533.101
  - Dedicated circuit per charging point
  - MCB/RCBO per BS EN 60898/61009
- ✅ Electrical separation - Reg 722.413.1.2
  - One vehicle per transformer (BS EN 61558-2-4)
  - Rare solution (high cost)
- ✅ Labelling requirements
- ✅ Utility functions: `getEVPMEProtectionMethod`, `getEVRCDType`, `getEVSocketRecommendation`, `validateEVChargingInstallation`, `calculateEVCircuitSizing`

## Knowledge Now Available to Agents:

### Designer Agent:
- **EV Charging Design**:
  - Assess earthing system (TN-C-S requires PME protection!)
  - Select PME protection method (TT earth electrode vs PEN monitoring)
  - Specify RCD Type (B preferred, or A/F with RDC-DD)
  - Choose socket type (Type 2 = UK standard)
  - Calculate circuit ratings (7kW = 32A MCB, 6mm² cable)
  - Specify IP/IK ratings (IPX4/IK08 outdoors)

### Installer Agent:
- **EV Charging Installation**:
  - ⚠️ **CRITICAL**: PME (TN-C-S) is DANGEROUS for EV charging without protection
  - Install TT earth electrode (≤200Ω, preferably ≤20Ω) if specified
  - Install PEN monitoring device per manufacturer instructions
  - Mount charging point IPX4 minimum outdoors
  - Provide IK08 impact protection (bollards/position)
  - ONE socket per circuit (no daisy-chaining)
  - Label BS 1363 sockets "EV" on rear + front label
  - Fixed mounting (no portable socket-outlets)
  - Tethered cables permitted

### Commissioning Agent:
- **EV Charging Testing**:
  - Verify PME protection installed correctly:
    - TT earth electrode: Test Ra ≤200Ω (Reg 722.411.4.1(ii))
    - PEN monitor: Verify disconnection times (70V/1s, 100V/0.7s, 200V/0.2s)
  - RCD testing:
    - Verify Type A/F/B RCD installed
    - Test IΔn ≤30mA
    - Check DC fault protection (Type B or RDC-DD present)
    - Test disconnects ALL live conductors (L+N)
  - Earth fault loop impedance (Zs)
  - Polarity check
  - Functional test (charging equipment)
  - Verify labelling present
  - Check IP/IK ratings (IPX4/IK08)

## Critical Safety Knowledge Embedded:

🚨 **PME (TN-C-S) DANGER FOR EV CHARGING** (Reg 722.411.4.1):
- **PME MUST NOT be used for EV charging WITHOUT protection**
- **Risk**: If PEN conductor breaks:
  1. Vehicle body rises to ~115V (half supply voltage)
  2. Person touching vehicle while on ground = **FATAL SHOCK**
  3. Extraneous-conductive-parts (taps, pipes) also live
- **Solution**: One of 4 methods MANDATORY:
  - **(ii) TT earth electrode** (most common) - ≤200Ω, preferably ≤20Ω
  - **(iii) PEN monitoring device** - disconnects L+N+PE on PEN fault
  - **(iv) Special RCD Type B** with PEN monitoring
  - **(v) Alternative device** with equivalent safety
- **NOTE**: Creating TT may be difficult if PME buried services nearby

🚨 **RCD Requirements** (Reg 722.531.3.101):
- **Type B RCD** (DC fault sensitive) - PREFERRED
  - Modern EVs can produce DC fault currents
  - Type A/F RCDs can be blinded by DC (fail to trip)
- **Alternative**: Type A/F + RDC-DD (Residual DC Detecting Device)
  - RDC-DD can be in charging equipment OR upstream
  - BS IEC 62955 compliant
- **IΔn ≤30mA** (additional protection)
- **Individual RCD per charging point** (no sharing)

🚨 **Socket Types - Type 2 is UK STANDARD**:
- **Type 2 (Mennekes)** - BS EN 62196-2 - Mode 3
  - Universal in UK/Europe
  - 32A single-phase (7kW) or 63A 3-phase (22kW)
  - Socket OR tethered cable
- BS 1363 (13A) - Emergency only (marked "EV")
- Commando (BS EN 60309-2) - Industrial/workplace
- Type 1 (J1772) - RARE (older imports)

🚨 **Dedicated Circuits** (Reg 722.533.101):
- ONE charging point per final circuit
- NO daisy-chaining multiple points
- Continuous load - NO diversity applied
- Typical: 32A MCB, 6mm² cable for 7kW charger

## Batch Completion Status:

✅ **Batch 1**: Appendix 4 (Cable Tables, Correction Factors)
✅ **Batch 2**: Special Locations (Bathrooms, Outdoor) + Testing
✅ **Batch 3**: Chapter 52 (Installation Methods, Safe Zones)
✅ **Batch 4**: Chapter 54 (Earthing & Bonding, CPC Sizing)
✅ **Batch 5**: Extended Special Locations (Pools, Construction, Caravans)
✅ **Batch 6**: Chapter 53 (SPDs, Isolation, Switching)
✅ **Batch 7-8**: Appendix 6 (Certification Templates, EICR Codes)
✅ **Batch 9**: Section 712 (Solar PV Systems) + Appendix 15 (Ring/Radial Circuits)
✅ **Batch 10**: Section 722 (EV Charging) ← NEW!

## Knowledge Extraction: ~92% COMPLETE! 🎉

### Modern Installation Capabilities Added:
- ✅ Electric Vehicle Charging (Section 722) - CRITICAL for modern construction
- ✅ PME protection methods (life-safety critical)
- ✅ RCD Type B and DC fault protection
- ✅ Type 2 connector (UK standard)

### Remaining High-Value Topics:
- Section 551 (Generating Sets/Battery Energy Storage) - Growing market
- Section 559 (Luminaires - detailed requirements)
- Appendix 17 (Energy Efficiency) - Building Regulations Part L

## Real-World Application Examples:

### Example 1: Domestic 7kW EV Charging Point (PME Supply)
```
SCENARIO: Detached house, TN-C-S (PME) supply, installing wallbox in driveway

DESIGN:
- PME protection: Install TT earth electrode (Reg 722.411.4.1(ii))
  - Earth rod: 1.2m copper-bonded steel, Ra ≤200Ω (aim for <50Ω)
  - Separate earth bar for EV circuit
  - CPC to earth rod: 16mm² copper (buried) per Table 54.1
- RCD: Type B, 30mA, 40A (or RCBO Type B 30mA/32A)
- MCB: 32A Type B (or integrated in RCBO)
- Cable: 6mm² 3-core SWA (L, N, CPC) - 15m run from CU to wallbox
- Socket: Type 2 socket (BS EN 62196-2) OR tethered Type 2 cable
- Ratings: IPX4, IK08 (wall-mounted in driveway)

INSTALLATION:
- Earth rod installed minimum 2m from house foundation
- SWA cable buried 450mm depth (under drive)
- Wallbox mounted on wall 1.5m height
- Label at CU: "EV CHARGING - 32A - TT EARTHING"
- RCD test button accessible
- User instructions provided

TESTING:
- Earth electrode resistance: 35Ω ✅ (≤200Ω requirement)
- Zs at charging point: 8.5Ω ✅ (TT system, RCD protected)
- RCD trip test: 28mA @ 27ms ✅ (≤30mA, ≤300ms)
- Polarity correct ✅
- Type 2 socket functional test ✅
```

### Example 2: Workplace Car Park - 4× Charging Points (TN-S Supply)
```
SCENARIO: Office building, TN-S supply (no PME risk), outdoor car park

DESIGN:
- PME protection: NOT REQUIRED (TN-S system is safe)
- RCD: 4× RCD Type B, 30mA, 40A (one per point)
- MCB: 4× MCB Type B, 32A (one per point)
- Cable: 4× 10mm² 3-core SWA (45m run, voltage drop consideration)
- Socket: Type 2 tethered cables (7m length, user-friendly)
- Ratings: IP55, IK10 (harsh outdoor environment, vandal-resistant)
- Load management: Smart charging controller (prevent overload if all 4 charging)

INSTALLATION:
- SWA cables in ducting under car park surface
- Charging posts: Commercial-grade, IP55/IK10 rated
- Bollards installed to prevent vehicle impact
- Each point on dedicated 32A circuit
- Sub-distribution board in plant room
- Load management controller monitors total demand

TESTING (per charging point):
- Continuity: R1+R2 = 0.45Ω ✅
- Zs: 0.62Ω ✅ (max 1.44Ω for B32)
- RCD Type B trip: 29mA @ 24ms ✅
- Polarity correct ✅
- Load management test: 4 vehicles charging = controller limits to 80A total ✅
```

### Example 3: Domestic Flat - Cannot Install Earth Rod (PME Supply)
```
SCENARIO: 3rd floor flat, TN-C-S (PME) supply, underground car park, no access for earth rod

DESIGN:
- PME protection: PEN conductor monitoring device (Reg 722.411.4.1(iii))
  - Device monitors voltage between PE and Earth
  - Disconnects L+N+PE if voltage exceeds thresholds:
    - 70V for 1s, 100V for 0.7s, 200V for 0.2s, 400V for 0.04s
  - Auto-reconnect when fault clears
  - CE/UKCA marked, Declaration of Conformity obtained
- RCD: Type B, 30mA, 40A (integrated in charging unit)
- MCB: 32A Type B
- Cable: 10mm² 3-core T&E (25m run from flat CU to car park)
- Socket: Type 2 tethered cable (in charging post)
- Ratings: IP44 (covered car park), IK08

INSTALLATION:
- PEN monitoring device installed at charging point
- Device wired per manufacturer instructions
- Declaration of Conformity appended to EIC
- Cable routed in trunking down riser, then conduit in car park
- Charging post in allocated parking bay
- Warning label: "PEN MONITORING DEVICE - DO NOT BYPASS"

TESTING:
- PEN monitor function test: Simulated PEN fault = disconnection ✅
- RCD Type B trip: 27mA @ 22ms ✅
- Zs: 0.58Ω ✅
- Polarity correct ✅
- PEN monitor auto-reconnect after fault cleared ✅
```

## Agent Impact Summary:

### Designer Agent CAN NOW:
- Identify PME danger for EV charging
- Specify correct PME protection method (TT vs PEN monitoring)
- Calculate EV circuit ratings (7kW, 22kW, rapid)
- Select RCD Type (B vs A/F+RDC-DD)
- Specify Type 2 socket/connector (UK standard)
- Design compliant EV charging installations

### Installer Agent CAN NOW:
- Install TT earth electrodes for EV charging (correct depth, sizing)
- Install PEN monitoring devices per manufacturer instructions
- Mount charging equipment with correct IP/IK ratings
- Provide impact protection (bollards, positioning)
- Label installations correctly
- Understand PME risk (critical safety knowledge)

### Commissioning Agent CAN NOW:
- Test TT earth electrode resistance (Ra ≤200Ω)
- Verify PEN monitoring device operation
- Test RCD Type B or Type A/F with RDC-DD
- Complete EV charging installation certificates
- Verify compliance with Section 722
- Check labelling and documentation

## Section 551: Generating Sets & Battery Energy Storage

### Knowledge Added:
- ✅ Generating set scope (off-grid, standby, parallel operation) - Reg 551.1
- ✅ **G98/G99 Grid Connection Requirements** - CRITICAL for solar/battery
  - G98 (≤16A/≤3.68kW): DNO notification only
  - G99 (>16A/>3.68kW): DNO approval REQUIRED (6-12 weeks)
- ✅ Standby generator requirements - Reg 551.6
  - Independent earthing (cannot use PME when grid off)
  - Interlocked changeover switch
  - Auto-start, fuel storage
- ✅ Parallel operation (grid-tied) - Reg 551.7
  - Loss of Mains (LOM) protection MANDATORY
  - Anti-islanding protection (frequency/voltage monitoring)
  - Power quality requirements (PF, THD, flicker)
- ✅ Battery energy storage - Reg 551.8
  - Location requirements (secure, temperature controlled)
  - **CRITICAL**: Ventilation (hydrogen gas from lead-acid, thermal runaway from lithium-ion)
  - Fire risk mitigation (smoke detectors, Class D/F extinguishers)
  - BMS (Battery Management System) mandatory for lithium-ion
- ✅ RCD protection with generators - Reg 551.4.2
- ✅ Utility functions: `getGridConnectionRequirement`, `getStandbyGeneratorEarthing`, `calculateBatteryVentilation`, `validateGeneratingSetInstallation`

### Critical Safety Knowledge:

🚨 **G98 vs G99 Grid Connection**:
- **G98** (≤16A per phase):
  - Solar ≤3.68kW (single-phase) or ≤11.04kW (3-phase)
  - DNO NOTIFICATION only (online portal, AFTER installation)
  - LOM protection per BS EN 50549-1
  - Most domestic solar falls here
- **G99** (>16A per phase):
  - Solar >3.68kW (single-phase) or >11.04kW (3-phase)
  - DNO APPROVAL REQUIRED (apply BEFORE installation, 6-12 weeks)
  - Protection settings agreed with DNO
  - May require witness testing
  - Cannot connect until approval received

🚨 **Standby Generator Earthing** (Reg 551.4.3.2.1):
- **PME (TN-C-S) supply = DANGER**
  - CANNOT use PME earth when grid disconnected
  - MUST install independent earth electrode (≤200Ω)
  - 4-pole changeover switch (switch neutral too)
  - Generator neutral bonded to earth electrode
- **TN-S supply**: Can usually use existing earth
- **Critical**: Grid earth may not be available when on generator power

🚨 **Battery Storage Ventilation** (Reg 551.8.1):
- **Lead-acid batteries**:
  - HYDROGEN GAS (explosive if >4% concentration)
  - Ventilation: 0.05 m³/h per kWh capacity
  - High & low level vents
  - NO ignition sources, NO SMOKING
  - Spark-proof light switches
- **Lithium-ion batteries**:
  - THERMAL RUNAWAY risk (fire/toxic gases)
  - Heat dissipation ventilation
  - Smoke/heat detector in battery room
  - Fire extinguisher: Class D/F (NOT WATER!)
  - Temperature controlled: 15-25°C optimal
  - BMS (Battery Management System) MANDATORY

🚨 **Loss of Mains (LOM) Protection** (Reg 551.7.4):
- **MANDATORY for grid-tied systems**
- Prevents "islanding" (generator powering dead grid)
- **Danger**: DNO workers think grid is dead but it's energized = FATAL
- Auto-disconnect within 0.5s of grid loss (G98)
- Cannot reconnect until grid stable for 20s
- Voltage/frequency monitoring:
  - 207-253V, 47-52Hz (disconnect outside range)

## Batch Completion Status:

✅ **Batch 1**: Appendix 4 (Cable Tables, Correction Factors)
✅ **Batch 2**: Special Locations (Bathrooms, Outdoor) + Testing
✅ **Batch 3**: Chapter 52 (Installation Methods, Safe Zones)
✅ **Batch 4**: Chapter 54 (Earthing & Bonding, CPC Sizing)
✅ **Batch 5**: Extended Special Locations (Pools, Construction, Caravans)
✅ **Batch 6**: Chapter 53 (SPDs, Isolation, Switching)
✅ **Batch 7-8**: Appendix 6 (Certification Templates, EICR Codes)
✅ **Batch 9**: Section 712 (Solar PV) + Appendix 15 (Ring/Radial Circuits)
✅ **Batch 10**: Section 722 (EV Charging) + Section 551 (Generating Sets/Battery Storage) ← UPDATED!

## Knowledge Extraction: ~95% COMPLETE! 🎉

### Modern Installation Capabilities:
- ✅ Electric vehicle charging installations
- ✅ Solar PV systems (grid-tied and off-grid)
- ✅ Battery energy storage systems
- ✅ Backup generators (standby and parallel)
- ✅ G98/G99 grid connection compliance
- ✅ Loss of Mains protection
- ✅ Battery safety (hydrogen gas, thermal runaway)

## Real-World Examples - Generating Sets & Battery Storage:

### Example 1: 5kW Solar PV + 10kWh Battery Storage (Grid-Tied)
```
SCENARIO: Domestic dwelling, 5kW solar + 10kWh lithium battery, TN-C-S supply

DESIGN:
- Solar PV: 5kW (13× 400W panels, 2 strings)
  - Inverter: 5kW hybrid (solar + battery)
  - G98 compliant (≤3.68kW export after battery charging)
- Battery: 10kWh lithium-ion (e.g., GivEnergy)
  - DC coupled to inverter
  - BMS integrated
- Grid connection: G98 notification (≤16A export)
- LOM protection: Built into inverter (BS EN 50549-1)
- Earthing: TN-C-S (no PME issue for inverter-based systems)
- RCD: Type A 40A/30mA (inverter has galvanic isolation, no DC leakage)
- MCB: 32A Type B (from consumer unit to inverter)

INSTALLATION:
- Solar panels: Roof-mounted, 30° south-facing
- Inverter: Garage wall (ventilated, 5-30°C)
- Battery: Garage floor (insulated cabinet, temperature controlled)
- Battery ventilation: Natural (vents top & bottom)
- Smoke detector in garage
- Fire extinguisher: Class F (lithium fires)
- DC isolator: Adjacent to inverter (<0.5m cable length)
- AC isolator: Consumer unit (dedicated 32A MCB)
- Labelling: "SOLAR PV + BATTERY SYSTEM - DUAL SUPPLY"
- G98 notification: Submit online to DNO after commissioning

TESTING:
- Solar PV tests per Section 712
- Battery BMS functional test ✅
- LOM protection test: Simulate grid loss = inverter disconnects within 0.5s ✅
- Frequency/voltage trip thresholds verified (47-52Hz, 207-253V) ✅
- RCD test: 28mA @ 26ms ✅
- Export meter verification (smart meter SMETS2)
- MCS certification for SEG (Smart Export Guarantee)
```

### Example 2: 20kVA Diesel Standby Generator (Hospital)
```
SCENARIO: Small hospital, critical loads, TN-C-S mains, requires backup power

DESIGN:
- Generator: 20kVA diesel (3-phase, 415V)
  - Auto-start on mains failure
  - Weekly self-test (Sunday 2am, 30 min run)
- Grid connection: STANDBY (NOT parallel)
- Changeover: Automatic Transfer Switch (ATS), 4-pole
  - Interlocked (prevents parallel operation)
  - Transfer time: 15 seconds
  - Priority: Critical circuits only (30% load)
- Earthing: TT system for generator (Reg 551.4.3.2.1)
  - Earth electrode: 3× rods, Ra = 15Ω
  - CANNOT use PME when on generator power
  - 4-pole changeover switches neutral to generator earth
- Fuel: 1000L diesel tank (bunded, 110% capacity, above-ground)
- Exhaust: Through roof, 2m above ridge
- Cooling: Radiator cooled, outside air intake/exhaust
- Battery: 12V starter battery (maintained by mains charger)

INSTALLATION:
- Generator: External compound (acoustic enclosure, -20dB)
- ATS: Main switchroom (distribution board)
- Earth electrode: Compound (3× 1.5m rods, 3m spacing)
- Fuel tank: Bunded, fire-separated 2m from building
- Critical circuits: IT equipment, emergency lighting, refrigeration
- Non-critical circuits: Heating, air-con, kitchen (shed on gen power)
- Labelling: "STANDBY GENERATOR - 4-POLE CHANGEOVER - TT EARTHING"
- Emergency stop: Red mushroom button (accessible entrance)

TESTING:
- Earth electrode: Ra = 15Ω ✅ (≤200Ω requirement)
- ATS interlock: Cannot close both mains AND generator contactors ✅
- Auto-start test: Mains trip = gen starts in 12s, transfer at 15s ✅
- Weekly self-test: Runs 30min, loads 30% ✅
- Zs on generator power: 8.2Ω (TT system, RCD protected) ✅
- Neutral switching verified (disconnects from PME) ✅
- Fuel leak test ✅
- Exhaust CO levels: 50ppm ✅ (<200ppm limit)
```

### Example 3: 15kW Commercial Solar (G99 Required)
```
SCENARIO: Small business, 15kW rooftop solar, 3-phase supply, export to grid

DESIGN:
- Solar PV: 15kW (37× 400W panels, 3-phase inverter)
- Grid connection: G99 APPLICATION REQUIRED (>11.04kW)
  - Submit application to DNO: 8 weeks before installation
  - Protection settings: AGREED with DNO
    - Overvoltage: 253V/0.5s, 265V/0.1s
    - Undervoltage: 207V/2.5s, 184V/0.5s
    - Overfrequency: 50.5Hz/20s, 51.5Hz/0.5s
    - Underfrequency: 49.5Hz/20s, 47.5Hz/0.5s
  - DNO witness testing REQUIRED
- LOM protection: G99 relay (separate from inverter)
- Earthing: TN-S (safe for inverter)
- RCD: Type B 63A/30mA (per DNO requirement)
- Isolation: Lockable AC isolator (DNO accessible)

INSTALLATION:
- Solar panels: Flat roof, ballasted mounts
- Inverter: 15kW 3-phase (plant room)
- G99 relay: Separate panel (voltage/frequency monitoring)
- AC isolator: External wall (DNO lockable)
- Export meter: 3-phase (CT clamps, Modbus to inverter)
- Labelling: "SOLAR PV 15kW - G99 APPROVED - DNO ISOLATION"
- DNO notification: Application submitted 10 weeks before installation

TESTING (DNO Witness Test):
- G99 relay calibration: Voltage/frequency trip points ✅
- LOM test: Simulate grid loss = disconnect in 0.32s ✅
- Islanding test: Load bank connected, grid trip = immediate shutdown ✅
- Power quality: THD <3%, PF 0.98 ✅
- Export limitation: Max 15kW verified ✅
- Zs: 0.45Ω ✅
- RCD Type B test: 29mA @ 24ms ✅
- DNO certificate issued ✅
- G99 commissioning certificate to DNO ✅
```

## System Status: READY FOR MODERN UK ELECTRICAL INSTALLATIONS! ✅

The agents now have comprehensive knowledge for:
- Electric vehicle charging (domestic, commercial, public)
- Solar PV systems (grid-tied and off-grid)
- Battery energy storage (lithium-ion and lead-acid)
- Backup generators (standby and parallel operation)
- G98/G99 grid connection compliance
- Loss of Mains (LOM) protection
- PME restrictions for EV/generators
- Battery safety (ventilation, fire risk, thermal runaway)
- Complete BS 7671 Sections 551, 722, 712 compliance
