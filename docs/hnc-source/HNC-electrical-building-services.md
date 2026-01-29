# HNC Electrical Engineering for Building Services

## Blended Curriculum Overview

This HNC programme combines **Pearson BTEC core electrical principles** with **Building Services Engineering applications**, providing students with both rigorous electrical theory and practical industry context.

### Qualification Structure (120 Credits)

| Module | Title | Credits | Source |
|--------|-------|---------|--------|
| 1 | Health, Safety and Risk Management | 15 | Pearson U4001 + Building Services |
| 2 | Building Services Science | 15 | Building Services Specialist |
| 3 | Electrical & Electronic Principles | 15 | Pearson U4019 Core |
| 4 | Design Principles for Building Services | 15 | Pearson U4001 + BS Context |
| 5 | Project Management | 15 | Pearson U4004 + BS Context |
| 6 | Sustainability & Environmental | 15 | Building Services Specialist |
| 7 | Power and Lighting Systems | 15 | Building Services Specialist |
| 8 | HVAC Systems | 15 | Building Services Specialist |

---

## Module 3: Electrical & Electronic Principles (U4019 Aligned)

### Learning Outcomes (Pearson BTEC)

**LO1:** Apply understanding of fundamental electrical quantities to evaluate circuits with constant voltages and currents
**LO2:** Evaluate circuits with sinusoidal voltages and currents
**LO3:** Describe semiconductor action and its application to electronic devices
**LO4:** Explain differences between digital and analogue electronics

### Building Services Integration

Each electrical principle is applied to building services contexts:
- Power distribution in commercial buildings
- Lighting control systems
- BMS (Building Management Systems) sensors
- HVAC motor control
- Emergency systems and UPS
- Energy monitoring and metering

---

## Section 1: DC Circuit Theory

### 1.1 Voltage, Current, Resistance and Power

**Learning Outcomes:**
- Define voltage, current, resistance and power in electrical circuits
- Apply SI units correctly (V, A, Ω, W)
- Calculate power using P = VI, P = I²R, P = V²/R
- Relate electrical quantities to building services applications

**Key Content:**
- **Voltage (V):** Electrical potential difference measured in Volts
  - Building context: 230V single-phase, 400V three-phase supplies
  - SELV (50V AC / 120V DC) for bathroom and wet areas
  - ELV systems for building controls (24V DC common)

- **Current (I):** Flow of electric charge measured in Amperes
  - Building context: Diversity calculations for distribution boards
  - Maximum demand assessment for commercial installations
  - Circuit current ratings and protective device selection

- **Resistance (R):** Opposition to current flow measured in Ohms
  - Building context: Cable resistance calculations for voltage drop
  - Earth fault loop impedance (Zs) for protective device operation
  - Insulation resistance testing (minimum 1MΩ for new installations)

- **Power (P):** Rate of energy transfer measured in Watts
  - Building context: Load calculations for lighting circuits
  - kVA ratings for transformers and generators
  - Power density (W/m²) for building energy assessment

**Formulas:**
```
V = I × R         (Ohm's Law)
P = V × I         (Power)
P = I² × R        (Power from current and resistance)
P = V² / R        (Power from voltage and resistance)
E = P × t         (Energy in Joules or kWh)
```

**Building Services Examples:**
1. Calculate current drawn by 20 × 58W LED panels on a lighting circuit
2. Determine voltage drop in 30m of 2.5mm² cable supplying a 3kW heater
3. Size distribution board for office floor with mixed loads

---

### 1.2 Ohm's Law

**Learning Outcomes:**
- State and apply Ohm's Law in DC circuits
- Rearrange V = IR to find any quantity
- Recognise linear and non-linear resistors
- Apply Ohm's Law to building services scenarios

**Key Content:**
- **Ohm's Law:** V = I × R (for linear resistive elements)
- **Rearrangements:** I = V/R, R = V/I
- **Linear resistors:** Resistance constant regardless of current
- **Non-linear devices:** LEDs, thermistors, VDRs used in building controls

**Building Services Applications:**
- Calculating cable sizes for specific loads
- Determining maximum cable lengths for voltage drop limits
- Sizing resistors in sensor circuits (e.g., temperature sensors)
- Understanding NTC thermistors in HVAC control systems

**Worked Examples:**
1. A fire alarm sounder rated 24V DC draws 150mA. Calculate resistance.
   - R = V/I = 24/0.15 = 160Ω

2. A BMS temperature sensor has 10kΩ resistance at 25°C with 5V supply. Calculate current.
   - I = V/R = 5/10000 = 0.5mA

---

### 1.3 Series Circuits

**Learning Outcomes:**
- Identify series circuit configurations
- Calculate total resistance in series circuits
- Apply voltage divider principle
- Analyse series circuits in building services

**Key Content:**
- **Series connection:** Single current path through all components
- **Total resistance:** RT = R1 + R2 + R3 + ...
- **Current:** Same through all components (IT = I1 = I2 = I3)
- **Voltage:** Divides proportionally (VT = V1 + V2 + V3)
- **Voltage divider:** V1 = VT × (R1/RT)

**Building Services Applications:**
- Cable resistance adding to load resistance
- Series-connected emergency lighting LEDs
- Voltage sensing circuits in power monitoring
- Understanding series connections in control circuits

**Worked Example:**
A 24V emergency lighting circuit has 3 LED modules in series (8Ω each) with 15m of cable (0.5Ω total).
- Total resistance: RT = 8 + 8 + 8 + 0.5 = 24.5Ω
- Circuit current: I = 24/24.5 = 0.98A
- Voltage across each LED: V = 0.98 × 8 = 7.84V
- Voltage drop in cable: V = 0.98 × 0.5 = 0.49V

---

### 1.4 Parallel Circuits

**Learning Outcomes:**
- Identify parallel circuit configurations
- Calculate total resistance using reciprocal formula
- Apply current divider principle
- Analyse parallel circuits in building services

**Key Content:**
- **Parallel connection:** Multiple current paths, same voltage across all
- **Total resistance:** 1/RT = 1/R1 + 1/R2 + 1/R3 + ...
- **Two resistors:** RT = (R1 × R2)/(R1 + R2)
- **Voltage:** Same across all branches (VT = V1 = V2 = V3)
- **Current:** Divides between branches (IT = I1 + I2 + I3)
- **Current divider:** I1 = IT × (RT/R1)

**Building Services Applications:**
- Lighting circuits (lamps in parallel)
- Multiple socket outlets on a ring or radial circuit
- Distribution board with multiple outgoing ways
- Parallel redundancy in critical systems

**Worked Example:**
An office lighting circuit has 10 LED luminaires (each drawing 0.5A at 230V) connected in parallel.
- Luminaire resistance: R = V/I = 230/0.5 = 460Ω
- Total resistance: Using 10 identical: RT = 460/10 = 46Ω
- Total current: IT = 230/46 = 5A
- Circuit protection: 6A or 10A MCB appropriate

---

### 1.5 Kirchhoff's Laws

**Learning Outcomes:**
- State Kirchhoff's Current Law (KCL)
- State Kirchhoff's Voltage Law (KVL)
- Apply both laws to analyse complex circuits
- Use Kirchhoff's laws in building services analysis

**Key Content:**

**Kirchhoff's Current Law (KCL):**
- The algebraic sum of currents at any node equals zero
- Current entering = Current leaving
- ΣI = 0 at any junction

**Kirchhoff's Voltage Law (KVL):**
- The algebraic sum of voltages around any closed loop equals zero
- Supply voltage = Sum of all voltage drops
- ΣV = 0 around any closed loop

**Building Services Applications:**
- Current distribution at distribution boards
- Fault current analysis for protective device coordination
- Voltage drop calculations through multiple cables
- Ring final circuit analysis

**Worked Examples:**

1. **KCL at Distribution Board:**
   Main incomer carries 63A. Three outgoing circuits draw 20A, 15A, and unknown current I3.
   - By KCL: 63 = 20 + 15 + I3
   - Therefore: I3 = 63 - 35 = 28A

2. **KVL in Lighting Circuit:**
   230V supply, cable voltage drop 5V, lamp voltage VL.
   - By KVL: 230 = 5 + VL
   - Therefore: VL = 225V

---

### 1.6 Network Theorems

**Learning Outcomes:**
- Apply superposition theorem to multi-source circuits
- Calculate Thevenin equivalent circuits
- Calculate Norton equivalent circuits
- Use network theorems for building services analysis

**Key Content:**

**Superposition Theorem:**
- In linear circuits with multiple sources, the response equals the sum of responses to each source acting alone
- Other sources replaced by their internal impedance (voltage sources: short, current sources: open)
- Used for circuits with multiple supply points

**Thevenin's Theorem:**
- Any linear circuit can be replaced by a voltage source (VTH) in series with a resistance (RTH)
- VTH = Open circuit voltage at terminals
- RTH = Resistance seen from terminals with sources replaced by internal impedance

**Norton's Theorem:**
- Any linear circuit can be replaced by a current source (IN) in parallel with a resistance (RN)
- IN = Short circuit current at terminals
- RN = RTH (same as Thevenin resistance)
- Conversion: IN = VTH/RTH

**Building Services Applications:**
- Analysing generator and UPS systems feeding common loads
- Understanding supply impedance for fault calculations
- Designing backup power systems with multiple sources
- Calculating available fault current at distribution points

**Worked Example - UPS System:**
A building has 230V mains supply (internal impedance 0.1Ω) and UPS (output 228V, internal impedance 0.5Ω) feeding a critical 46Ω load in parallel.

Using Superposition:
1. Mains alone (UPS replaced by 0.5Ω):
   - Total R = 0.1 + (0.5 × 46)/(0.5 + 46) = 0.1 + 0.495 = 0.595Ω
   - I from mains = 230/0.595 = 386.5A (short circuit, not realistic - example simplified)

In practice, transfer switching prevents parallel operation, but the principle applies to fault analysis.

---

## Section 2: AC Circuit Theory

### 2.1 AC Waveforms

**Learning Outcomes:**
- Describe characteristics of sinusoidal AC waveforms
- Define frequency, period, peak, RMS and average values
- Calculate relationships between AC quantities
- Understand UK power system AC characteristics

**Key Content:**
- **Sinusoidal waveform:** v = Vmax × sin(ωt)
- **Frequency (f):** Cycles per second in Hertz (UK: 50Hz)
- **Period (T):** Time for one cycle, T = 1/f (UK: 20ms)
- **Angular frequency:** ω = 2πf (UK: 314.16 rad/s)
- **Peak value (Vmax):** Maximum amplitude
- **RMS value:** Vrms = Vmax/√2 = 0.707 × Vmax
  - UK mains: 230V RMS → 325V peak
- **Average value:** Vavg = 0.637 × Vmax (full-wave rectified)
- **Form factor:** RMS/Average = 1.11 (sine wave)
- **Peak factor:** Peak/RMS = √2 = 1.414 (sine wave)

**Building Services Context:**
- UK single-phase: 230V ±10% RMS at 50Hz
- UK three-phase: 400V line, 230V phase at 50Hz
- Harmonics from LED drivers, VFDs affecting waveform purity
- Power quality monitoring in BMS systems

---

### 2.2 Phasors

**Learning Outcomes:**
- Represent AC quantities as phasors
- Add and subtract phasors graphically and mathematically
- Convert between time-domain and phasor representations
- Apply phasor analysis to building services circuits

**Key Content:**
- **Phasor:** Rotating vector representing magnitude and phase of AC quantity
- **Reference phasor:** Usually voltage (at 0°)
- **Leading:** Current ahead of voltage (capacitive)
- **Lagging:** Current behind voltage (inductive)
- **Phasor addition:** Add components or use complex numbers
  - V = V₁ + V₂ (vector addition)
  - Z∠θ = R + jX (rectangular form)

**Building Services Applications:**
- Understanding power factor in building supplies
- Analysing motor starting currents
- Capacitor bank sizing for PF correction
- Three-phase system analysis

---

### 2.3 Resistance in AC Circuits

**Learning Outcomes:**
- Analyse pure resistive AC circuits
- Understand in-phase relationship of V and I
- Calculate power in resistive AC circuits
- Apply to resistive building loads

**Key Content:**
- In pure resistance: V and I are in phase (φ = 0°)
- P = VI = I²R = V²/R (same as DC)
- Power is always positive (dissipated as heat)
- Power factor = 1 (unity)

**Building Services Examples:**
- Resistive heating elements (electric heaters, trace heating)
- Incandescent lamps (largely obsolete)
- Resistive loads for testing generators

---

### 2.4 Inductance

**Learning Outcomes:**
- Define inductance and inductive reactance
- Calculate XL = 2πfL
- Understand voltage leads current by 90° in pure inductance
- Analyse inductive loads in building services

**Key Content:**
- **Inductance (L):** Opposition to change in current, measured in Henries (H)
- **Inductive reactance:** XL = 2πfL = ωL (in Ohms)
- **Phase relationship:** Voltage leads current by 90° (CIVIL - C: I before V, L: V before I)
- **Stored energy:** E = ½LI²

**Building Services Applications:**
- Motor windings (induction motors dominate HVAC)
- Transformers (inductive component)
- Ballasts for discharge lighting (older HID systems)
- Chokes in harmonic filters

**Worked Example:**
An HVAC fan motor has inductance of 50mH. Calculate inductive reactance at 50Hz.
- XL = 2πfL = 2π × 50 × 0.05 = 15.7Ω

---

### 2.5 Capacitance

**Learning Outcomes:**
- Define capacitance and capacitive reactance
- Calculate XC = 1/(2πfC)
- Understand current leads voltage by 90° in pure capacitance
- Analyse capacitive circuits in building services

**Key Content:**
- **Capacitance (C):** Ability to store charge, measured in Farads (F)
- **Capacitive reactance:** XC = 1/(2πfC) = 1/(ωC) (in Ohms)
- **Phase relationship:** Current leads voltage by 90°
- **Stored energy:** E = ½CV²

**Building Services Applications:**
- Power factor correction capacitors
- Motor run capacitors
- Filter capacitors in LED drivers
- Surge suppression

**Worked Example:**
A PF correction capacitor is rated 25μF. Calculate reactance at 50Hz.
- XC = 1/(2πfC) = 1/(2π × 50 × 25×10⁻⁶) = 127.3Ω

---

### 2.6 Impedance

**Learning Outcomes:**
- Define impedance as combination of R, XL, XC
- Calculate impedance magnitude and phase angle
- Analyse R-L, R-C, and R-L-C circuits
- Apply impedance calculations to building services

**Key Content:**
- **Impedance (Z):** Total opposition to AC current, measured in Ohms
- **R-L circuit:** Z = √(R² + XL²), φ = tan⁻¹(XL/R)
- **R-C circuit:** Z = √(R² + XC²), φ = tan⁻¹(-XC/R)
- **R-L-C series:** Z = √(R² + (XL - XC)²)
- **Resonance:** When XL = XC, Z = R (minimum)

**Building Services Applications:**
- Motor circuit impedance calculations
- Cable impedance for fault calculations
- Harmonic filter tuning
- Understanding earth fault loop impedance (Zs)

**Worked Example:**
A motor has R = 10Ω and XL = 20Ω. Calculate impedance and phase angle.
- Z = √(10² + 20²) = √500 = 22.4Ω
- φ = tan⁻¹(20/10) = tan⁻¹(2) = 63.4° lagging

---

### 2.7 Power and Power Factor

**Learning Outcomes:**
- Distinguish real, reactive, and apparent power
- Calculate power factor and its correction
- Understand power factor penalties and benefits
- Apply power factor correction in building services

**Key Content:**
- **Real power (P):** Actual work done, measured in Watts (W)
  - P = VI cos φ = I²R
- **Reactive power (Q):** Energy stored/returned, measured in VAr
  - Q = VI sin φ
- **Apparent power (S):** Total power supplied, measured in VA
  - S = VI = √(P² + Q²)
- **Power factor:** cos φ = P/S (ratio of real to apparent power)
- **Power triangle:** P, Q, S form right triangle

**Power Factor Correction:**
- Required capacitive kVAr = P × (tan φ₁ - tan φ₂)
- Typical target: PF > 0.95 to avoid penalties
- Capacitor banks sized to compensate inductive loads

**Building Services Applications:**
- Main incoming supply power factor monitoring
- Motor PF correction at MCC level
- Avoiding utility power factor penalties
- Reducing distribution losses (I² losses with lower current)

**Worked Example:**
A building draws 100kW at 0.7 lagging PF. Calculate capacitor kVAr needed to correct to 0.95.
- φ₁ = cos⁻¹(0.7) = 45.6°, tan φ₁ = 1.02
- φ₂ = cos⁻¹(0.95) = 18.2°, tan φ₂ = 0.33
- Required kVAr = 100 × (1.02 - 0.33) = 69 kVAr

---

## Section 3: Three-Phase Systems

### 3.1 Star Connection

**Learning Outcomes:**
- Describe star (wye) connection configuration
- Calculate line and phase voltages/currents
- Understand neutral conductor function
- Apply to building services distribution

**Key Content:**
- **Configuration:** Three phases connected at common neutral point
- **Line voltage:** VL = √3 × VP = 1.732 × VP (UK: 400V)
- **Phase voltage:** VP = VL/√3 (UK: 230V)
- **Line current:** IL = IP (same in balanced system)
- **Neutral current:** Zero in balanced load, carries imbalance

**Building Services Applications:**
- Standard UK three-phase supply configuration
- Single-phase loads from phase to neutral (230V)
- Three-phase loads between phases (400V)
- Distribution board neutral sizing

---

### 3.2 Delta Connection

**Learning Outcomes:**
- Describe delta connection configuration
- Calculate line and phase voltages/currents
- Compare delta and star characteristics
- Apply to motor and transformer connections

**Key Content:**
- **Configuration:** Three phases connected in closed loop
- **Line voltage:** VL = VP (same)
- **Phase current:** IP = IL/√3
- **Line current:** IL = √3 × IP
- **No neutral:** Cannot supply single-phase loads directly

**Building Services Applications:**
- Large motor connections (often delta)
- Transformer secondary configurations
- Industrial distribution systems
- Motor starting (star-delta starters)

---

### 3.3 Power in Three-Phase Systems

**Learning Outcomes:**
- Calculate power in balanced three-phase systems
- Apply power formulas for star and delta
- Understand three-phase power metering
- Calculate building power demands

**Key Content:**
- **Three-phase power (balanced):**
  - P = √3 × VL × IL × cos φ (Watts)
  - Q = √3 × VL × IL × sin φ (VAr)
  - S = √3 × VL × IL (VA)
- **Per-phase power:** P = VP × IP × cos φ
- **Total power:** 3 × per-phase power = √3 formula result

**Building Services Applications:**
- Main incoming supply capacity assessment
- Transformer sizing (kVA rating)
- Generator sizing for standby power
- Maximum demand calculations per BS 7671

**Worked Example:**
A commercial building has balanced 400V three-phase supply drawing 200A at 0.85 PF.
- S = √3 × 400 × 200 = 138.6 kVA
- P = 138.6 × 0.85 = 117.8 kW
- Q = 138.6 × sin(cos⁻¹0.85) = 73.0 kVAr

---

### 3.4 Three-Phase Applications in Buildings

**Learning Outcomes:**
- Identify common three-phase building loads
- Understand load balancing principles
- Apply three-phase principles to HVAC systems
- Design balanced distribution systems

**Key Content:**
- **Balanced loading:** Distribute single-phase loads evenly across phases
- **Phase rotation:** Important for motor direction
- **Three-phase motors:** Dominant in HVAC (chillers, AHUs, pumps)
- **Three-phase heaters:** Large process/space heating loads

**Building Services Applications:**
- Chiller compressor motors (typically 3-phase)
- Large AHU fan motors
- Lift motor drives
- Commercial kitchen equipment
- Data centre power distribution

---

## Section 4: Semiconductor Devices

### 4.1 Atomic Structure and Doping

**Learning Outcomes:**
- Describe atomic structure relevant to semiconductors
- Explain intrinsic and extrinsic semiconductors
- Understand n-type and p-type doping
- Relate to electronic device operation

**Key Content:**
- **Semiconductors:** Silicon (Si), Germanium (Ge) - 4 valence electrons
- **Intrinsic:** Pure semiconductor, few charge carriers
- **N-type doping:** Adding pentavalent atoms (P, As) - excess electrons
- **P-type doping:** Adding trivalent atoms (B, Al) - excess holes
- **Majority/minority carriers:** Dominant charge type in doped material

**Building Services Context:**
- Foundation for all solid-state controls
- LED lighting technology
- Temperature sensors (thermistors)
- Power electronics in VFDs

---

### 4.2 P-N Junction

**Learning Outcomes:**
- Describe P-N junction formation
- Explain depletion region and barrier potential
- Understand forward and reverse bias behaviour
- Apply to diode operation

**Key Content:**
- **Depletion region:** Zone depleted of mobile charge carriers
- **Barrier potential:** Typically 0.6-0.7V for silicon
- **Forward bias:** P positive, N negative - current flows
- **Reverse bias:** P negative, N positive - minimal current (leakage)
- **Breakdown:** Excessive reverse voltage causes conduction

**Building Services Applications:**
- Foundation of rectifier circuits
- LED operation (light emission at junction)
- Protection diodes in relay circuits
- Solar cell operation (photovoltaic effect)

---

### 4.3 Diodes

**Learning Outcomes:**
- Describe diode characteristics and ratings
- Analyse rectifier circuits (half-wave, full-wave, bridge)
- Understand special-purpose diodes
- Apply diodes in building services applications

**Key Content:**
- **Standard diode:** Forward voltage drop ~0.7V, reverse blocking
- **Rectification:** Converting AC to DC
  - Half-wave: Single diode, 50% conduction
  - Full-wave centre-tap: Two diodes, transformer required
  - Bridge: Four diodes, full-wave without centre-tap
- **Zener diode:** Voltage regulation, conducts in reverse at Vz
- **LED:** Light emitting diode, forward voltage varies by colour

**Building Services Applications:**
- DC power supplies for controls (bridge rectifiers)
- LED lighting systems (current limiting required)
- Surge protection (TVS diodes)
- Voltage reference in sensor circuits

---

### 4.4 Transistors

**Learning Outcomes:**
- Describe bipolar junction transistor (BJT) operation
- Describe field effect transistor (FET) operation
- Understand transistor switching and amplification
- Apply transistors in building services control

**Key Content:**
- **BJT:** Current-controlled, three terminals (B, C, E)
  - NPN: Electron flow from E to C, controlled by B
  - Current gain (β or hFE): IC = β × IB
- **FET:** Voltage-controlled, three terminals (G, D, S)
  - MOSFET: Most common in power electronics
  - High input impedance, low drive power
- **Switching:** Transistor as electronic on/off switch
- **Amplification:** Small signal controls larger current

**Building Services Applications:**
- Relay drivers in control panels
- PWM outputs for LED dimming
- Power MOSFETs in motor drives
- Signal conditioning in BMS systems

---

### 4.5 Thyristors

**Learning Outcomes:**
- Describe thyristor (SCR) operation
- Understand gate triggering and latching
- Describe TRIAC operation for AC control
- Apply thyristors in building services

**Key Content:**
- **SCR (Silicon Controlled Rectifier):**
  - Three terminals: Anode, Cathode, Gate
  - Triggered ON by gate pulse, latches until current drops
  - Used for DC and half-wave AC control
- **TRIAC:**
  - Bidirectional thyristor for AC control
  - Conducts both directions when triggered
  - Used for phase-angle control

**Building Services Applications:**
- Lighting dimmers (phase-cut dimming)
- Soft starters for motors
- Heating element control
- UPS battery chargers

---

### 4.6 Integrated Circuits

**Learning Outcomes:**
- Describe integrated circuit fabrication and packaging
- Understand common IC types and functions
- Apply ICs in building services control
- Appreciate microcontroller role in BMS

**Key Content:**
- **IC types:**
  - Analogue: Op-amps, voltage regulators
  - Digital: Logic gates, flip-flops, counters
  - Mixed-signal: ADCs, DACs
  - Microcontrollers: Programmable control
- **Packaging:** DIP, SMD, QFP, BGA
- **Power management ICs:** Voltage regulation, battery management

**Building Services Applications:**
- Microcontrollers in BMS controllers
- Op-amps in sensor signal conditioning
- Voltage regulators in control panels
- Communication ICs (RS-485, Ethernet)

---

## Section 5: Analogue Electronics

### 5.1 Amplifier Basics

**Learning Outcomes:**
- Define voltage, current, and power gain
- Understand amplifier classes (A, B, AB, D)
- Calculate amplifier performance parameters
- Apply to building services signal processing

**Key Content:**
- **Voltage gain:** Av = Vout/Vin (often expressed in dB)
- **Current gain:** Ai = Iout/Iin
- **Power gain:** Ap = Pout/Pin = Av × Ai
- **Decibels:** dB = 20 log(Av) for voltage
- **Bandwidth:** Range of frequencies amplified

**Building Services Applications:**
- Sensor signal amplification
- Audio systems in commercial buildings
- Intercom and PA systems
- Instrumentation amplifiers for measurement

---

### 5.2 Operational Amplifiers

**Learning Outcomes:**
- Describe ideal op-amp characteristics
- Analyse inverting and non-inverting configurations
- Calculate gain for standard op-amp circuits
- Apply op-amps in building services

**Key Content:**
- **Ideal op-amp:** Infinite gain, infinite input impedance, zero output impedance
- **Inverting amplifier:** Av = -Rf/Rin
- **Non-inverting amplifier:** Av = 1 + Rf/Rin
- **Voltage follower:** Av = 1, buffer/isolation
- **Summing amplifier:** Adds multiple inputs
- **Differential amplifier:** Amplifies difference between inputs

**Building Services Applications:**
- Temperature sensor signal conditioning (4-20mA loops)
- Pressure transducer interfaces
- Current sensing for energy monitoring
- Active filters for noise rejection

---

### 5.3 Feedback

**Learning Outcomes:**
- Distinguish positive and negative feedback
- Understand feedback effects on gain and stability
- Calculate closed-loop gain with feedback
- Apply feedback principles to control systems

**Key Content:**
- **Negative feedback:** Output opposes input, stabilises gain
  - Reduces gain but improves linearity and bandwidth
  - Closed-loop gain: Acl = Aol/(1 + Aol×β)
- **Positive feedback:** Output reinforces input
  - Can cause oscillation or switching (comparators)
  - Used in oscillators and Schmitt triggers

**Building Services Applications:**
- PID control in HVAC systems
- Temperature regulation feedback loops
- Building pressure control
- Lighting level feedback control

---

### 5.4 Power Amplifiers

**Learning Outcomes:**
- Compare power amplifier classes
- Understand efficiency and heat dissipation
- Calculate power output and efficiency
- Apply to building services power electronics

**Key Content:**
- **Class A:** Always conducting, low efficiency (~25%), linear
- **Class B:** Each transistor conducts half cycle, ~78% efficiency
- **Class AB:** Compromise, ~50-60% efficiency, low distortion
- **Class D:** Switching operation, >90% efficiency, used for audio and motor drives

**Building Services Applications:**
- PA systems (Class AB typically)
- LED drivers (often Class D/switched)
- Variable frequency drives (Class D/PWM)
- Emergency voice alarm systems

---

## Section 6: Digital Electronics

### 6.1 Logic Gates

**Learning Outcomes:**
- Describe basic logic gates (AND, OR, NOT, NAND, NOR, XOR)
- Create truth tables for logic functions
- Implement simple logic functions with gates
- Apply logic to building services control

**Key Content:**
- **AND:** Output HIGH only when all inputs HIGH
- **OR:** Output HIGH when any input HIGH
- **NOT (Inverter):** Output opposite of input
- **NAND:** AND followed by NOT (universal gate)
- **NOR:** OR followed by NOT (universal gate)
- **XOR:** Output HIGH when inputs different

**Building Services Applications:**
- Interlock logic in HVAC systems
- Safety circuits (multiple conditions required)
- BMS alarm logic
- Access control systems

---

### 6.2 Boolean Algebra

**Learning Outcomes:**
- Apply Boolean algebra laws and theorems
- Simplify logic expressions
- Use De Morgan's theorems
- Design minimal logic circuits

**Key Content:**
- **Laws:** Commutative, Associative, Distributive
- **Identities:** A + 0 = A, A × 1 = A
- **Complement:** A + A' = 1, A × A' = 0
- **De Morgan's:** (A + B)' = A' × B', (A × B)' = A' + B'
- **Karnaugh maps:** Graphical simplification method

**Building Services Applications:**
- Optimising PLC logic
- Simplifying control sequences
- Designing efficient interlock systems

---

### 6.3 Combinational Logic

**Learning Outcomes:**
- Design combinational logic circuits
- Implement multiplexers and demultiplexers
- Implement encoders and decoders
- Apply to building automation systems

**Key Content:**
- **Combinational:** Output depends only on current inputs
- **Multiplexer:** Select one of many inputs
- **Demultiplexer:** Route input to one of many outputs
- **Encoder:** Convert input lines to binary code
- **Decoder:** Convert binary code to output lines
- **Comparators:** Compare two binary numbers

**Building Services Applications:**
- BMS input multiplexing
- Seven-segment display drivers
- Priority encoders for alarm systems
- Address decoding in control systems

---

### 6.4 Sequential Logic

**Learning Outcomes:**
- Distinguish combinational and sequential logic
- Describe flip-flops (SR, D, JK)
- Design counters and shift registers
- Apply sequential logic to building systems

**Key Content:**
- **Sequential:** Output depends on inputs AND previous state
- **Flip-flops:** Basic memory element, stores one bit
  - SR: Set-Reset, basic latch
  - D: Data, stores input on clock edge
  - JK: Universal, no invalid state
- **Counters:** Count clock pulses
- **Shift registers:** Move data through stages

**Building Services Applications:**
- Event counters (people counting)
- Timed sequences in control systems
- Serial communication interfaces
- State machines in PLCs

---

### 6.5 ADC and DAC

**Learning Outcomes:**
- Describe analogue-to-digital conversion
- Describe digital-to-analogue conversion
- Understand resolution, sampling rate, quantisation
- Apply ADC/DAC in building services

**Key Content:**
- **ADC:** Converts analogue signal to digital number
  - Resolution: Number of bits (e.g., 10-bit = 1024 levels)
  - Sampling rate: Conversions per second
  - Types: Successive approximation, flash, sigma-delta
- **DAC:** Converts digital number to analogue voltage
  - Resolution: Determines output precision
  - Types: R-2R ladder, PWM-based
- **Quantisation error:** Inherent in digital conversion

**Building Services Applications:**
- Temperature sensor input (ADC in BMS controller)
- Valve position control output (DAC for 0-10V)
- Energy meter pulse counting
- Variable speed drive analog interfaces

---

## Assessment Criteria Mapping

### Pass Criteria
- P1: Correctly calculate circuit parameters using Ohm's Law
- P2: Apply Kirchhoff's laws to analyse DC networks
- P3: Calculate power in single-phase AC circuits
- P4: Describe operation of semiconductor devices
- P5: Explain digital logic operations

### Merit Criteria
- M1: Analyse complex circuits using network theorems
- M2: Evaluate three-phase power systems
- M3: Compare analogue and digital electronic applications

### Distinction Criteria
- D1: Critically evaluate circuit analysis methods
- D2: Design practical building services control circuits
- D3: Justify selection of electronic components for specific applications

---

## Recommended Resources

### Textbooks
- Hughes Electrical and Electronic Technology (12th Edition)
- Bird's Electrical Circuit Theory and Technology
- Boylestad: Introductory Circuit Analysis
- Floyd: Electronic Devices

### Standards
- BS 7671:2018+A2:2022 (IET Wiring Regulations)
- BS EN 60617 (Graphical symbols for diagrams)
- BS EN 61131-3 (PLC programming languages)

### Online Resources
- IET Wiring Regulations guidance
- Pearson BTEC Unit specifications
- Engineering toolbox calculators
