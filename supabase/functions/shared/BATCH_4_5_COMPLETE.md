# BS 7671 Knowledge Extraction - Batches 4 & 5 COMPLETE ✅

## Files Created:

### 1. `bs7671EarthingBonding.ts`
**Chapter 54: Earthing Arrangements and Protective Conductors**

- ✅ TN-S, TN-C-S (PME), TT, IT earthing systems (Reg 542.1.2)
- ✅ Main protective bonding sizing (Reg 544.1)
- ✅ Supplementary bonding requirements (Reg 544.2)
- ✅ CPC sizing methods: Adiabatic equation + Table 54.7 (Reg 543.1)
- ✅ Earth electrode types (rods, tapes, plates, foundation) (Reg 542.2)
- ✅ Buried earthing conductor sizing (Table 54.1)
- ✅ PME restrictions for caravans, petrol stations, EV charging, agricultural (CRITICAL SAFETY)
- ✅ Utility functions: `getCPCSizeFromTable`, `calculateAdiabaticCPC`, `getMainBondingSize`, `checkPMEAllowed`

### 2. `bs7671SpecialLocations_Extended.ts`
**Part 7: Additional Special Locations**

- ✅ **Section 702**: Swimming Pools (Zones 0, 1, 2 + MANDATORY supplementary bonding)
- ✅ **Section 704**: Construction Sites (RCD 30mA for sockets ≤32A, ACS requirement, 110V reduced voltage)
- ✅ **Section 708**: Caravan Parks (PME PROHIBITED, individual RCD per socket, BS EN 60309-2, burial depth 600mm)
- ✅ **Section 717**: Mobile/Transportable Units (RCD protection, vibration-resistant wiring)
- ✅ IP ratings for each location
- ✅ Equipment restrictions per zone
- ✅ Utility functions for quick lookups

## Knowledge Now Available to Agents:

### Designer Agent:
- Can specify correct earthing system for project
- Calculate main bonding conductor sizes
- Size CPCs using adiabatic or table method
- Check PME allowed for location type
- Apply special location requirements (pools, sites, caravan parks)

### Installer Agent:
- Knows main bonding service connection points
- Understands supplementary bonding procedures
- Can guide earth electrode installation
- Knows PME restrictions (critical for safety)

### Commissioning Agent:
- Can verify earthing system type
- Check bonding conductor sizes
- Verify RCD requirements for special locations
- Test earth electrode resistance values

## Critical Safety Knowledge Embedded:

🚨 **PME Restrictions** - Prevents lethal installations:
- Caravans: PME fatal if PEN breaks
- EV Charging: Exported voltage risk
- Petrol stations: Fire/explosion risk
- Agricultural (livestock): Animal safety

🚨 **Special Location RCD Requirements**:
- Bathrooms: 30mA Type A mandatory
- Swimming pools: SELV + supplementary bonding ALWAYS required
- Construction sites: 30mA for all sockets ≤32A
- Caravan parks: Individual RCD per socket (PME prohibited)

## Next Batches Ready:
- Batch 6: Chapter 53 (SPDs, Isolation & Switching) 
- Batch 7: Appendix 3 (Time/Current Characteristics)
- Batch 8: Appendix 6 (Certification Templates)
