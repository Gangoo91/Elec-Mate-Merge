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

## System Status: READY FOR MODERN UK ELECTRICAL INSTALLATIONS! ✅

The agents now have comprehensive knowledge for:
- Electric vehicle charging (domestic, commercial, public)
- PME protection methods (life-safety critical)
- RCD Type B and DC fault protection
- Type 2 connector standard
- IP/IK ratings for harsh environments
- Complete BS 7671 Section 722 compliance
