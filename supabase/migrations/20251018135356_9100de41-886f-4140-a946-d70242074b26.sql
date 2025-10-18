-- Add comprehensive distribution board installation knowledge to RAG database

INSERT INTO installation_knowledge (topic, content, source, metadata)
VALUES 
(
  'Distribution Board MCB Layout Strategy',
  'Best practice for MCB arrangement in UK consumer units and distribution boards:

**1. LEFT-TO-RIGHT WAY NUMBERING:**
- ALWAYS work left to right, matching way numbers 1-18 (or 1-12 for smaller boards)
- Way 1 starts on the LEFT side of the board when facing it
- This matches UK industry standard and makes future troubleshooting easier
- Label each way clearly on the board schedule

**2. CIRCUIT GROUPING STRATEGY:**
- Place all socket circuits together (typically ways 1-6)
- Group all lighting circuits together (typically ways 7-12)
- Dedicated circuits (shower, cooker, immersion) in remaining ways
- RCD Split Load: Sockets under RCD side, lights on non-RCD side (except bathrooms)

**3. HIGH CURRENT CIRCUIT PLACEMENT:**
- Position shower/cooker circuits closest to main switch (shorter cable runs in board)
- Reduces voltage drop within the consumer unit
- Easier access for larger MCB sizes (40A, 50A)

**4. SPARE WAYS FOR FUTURE:**
- Leave 2-3 spare ways minimum for future extensions
- Position spares at the end of each circuit group
- Install blanking modules to prevent accidental contact

**EARTH AND NEUTRAL BAR STRATEGY:**

**CRITICAL: Number positions to match MCB way numbers**
- Way 1 MCB → Position 1 on earth bar → Position 1 on neutral bar
- Way 2 MCB → Position 2 on earth bar → Position 2 on neutral bar
- Continue pattern for all ways 1-18

**TERMINATION SEQUENCE (CRITICAL FOR WORKSPACE):**

Step 1: TERMINATE ALL EARTH CONDUCTORS FIRST
- Start at position 1, work through to position 18
- Benefits:
  * Creates maximum working space for subsequent wiring
  * Earth conductors are bundled and out of the way
  * Easier to identify circuits later (earth = reference point)
  * Less risk of damaging neutrals when working on lives
  * Meets BS 7671 requirement for earths to be easily identifiable

Step 2: TERMINATE ALL NEUTRAL CONDUCTORS
- Follow same left-to-right pattern (position 1 to 18)
- Keep neutral tails neat and parallel to earth bundle
- Use cable markers matching way numbers

Step 3: WIRE MCB LIVE TERMINALS
- Now you have maximum workspace with earths and neutrals out of the way
- Wire MCB terminals left to right (Way 1 to 18)
- Verify each connection before proceeding

**CABLE MANAGEMENT:**
- Bundle all earth cores together with cable ties
- Route neutral cores neatly alongside earths
- Keep live cores separate per circuit to avoid confusion
- Use ferruled ends for multicore conductors (> 2.5mm²)
- Label each circuit with way number at both ends

**TORQUE VALUES:**
- Typical MCB terminals: 1.2Nm (check manufacturer specs)
- Earth/neutral bar terminals: 1.5-2.0Nm
- Over-tightening damages terminals and conductors
- Under-tightening causes high resistance and fire risk',
  
  'IET Wiring Regulations BS 7671:2018+A3:2024 & UK Installation Best Practices',
  
  '{"type": "installation_guide", "component": "distribution_board", "skill_level": "intermediate", "bs7671_chapters": ["Chapter 41", "Chapter 51", "Chapter 52"]}'
),
(
  'Pre-Installation Documentation for Distribution Board Work',
  'Essential pre-installation documentation steps for consumer unit/distribution board replacement or modification:

**LEGAL REQUIREMENTS:**
- Part P Building Regulations require competent person certification
- Electrical Installation Certificate (EIC) must be issued on completion
- Minor Electrical Installation Works Certificate for minor changes
- "Before" condition must be documented for EICR baseline

**PHOTOGRAPHY (ESSENTIAL):**

Take MULTIPLE photos BEFORE disconnecting anything:

1. **Wide angle shots:**
   - Full view of existing consumer unit (door open)
   - Full view with door closed showing labels
   - Incoming supply connection point
   - Meter tails and main switch

2. **Close-up detail shots:**
   - Each MCB label and rating (readable in photo)
   - Earth/neutral bar terminations (show positions)
   - Main switch rating and type
   - RCD ratings and test buttons
   - Any unusual wiring or modifications
   - Cable entries (top/bottom)
   - Bonding connections to board

3. **Circuit identification:**
   - Photo of each circuit with label visible
   - Cable colors and sizes visible
   - Terminal positions recorded

**CIRCUIT RECORDING SPREADSHEET:**

Create detailed schedule BEFORE disconnecting:

| Way | Circuit Description | MCB Rating | MCB Type | Cable Size | Cable Condition | Special Notes |
|-----|-------------------|-----------|----------|-----------|----------------|--------------|
| 1   | Downstairs sockets| 32A       | Type B   | 2.5mm²    | Good          | RCD protected|
| 2   | Upstairs sockets  | 32A       | Type B   | 2.5mm²    | Good          | RCD protected|

Continue for all circuits...

**CIRCUIT LABELING AT BOTH ENDS:**
- Use colored electrical tape matching circuit schedule
- Mark each cable at board end with way number
- Mark each cable at accessory end with way number
- Use permanent marker on tape (e.g., "Way 1 - Kitchen Sockets")

**ISOLATION AND TESTING BEFORE WORK:**

1. **Incoming supply voltage:**
   - Test L-N voltage (should be 230V ±10%)
   - Test L-E voltage (should match L-N)
   - Record readings on EIC

2. **Insulation resistance of existing circuits:**
   - Test each circuit at 500V DC
   - Record IR values for comparison post-installation
   - Minimum acceptable: 1MΩ (>2MΩ preferred)

3. **Earth loop impedance:**
   - Test Zs at origin (consumer unit)
   - Record for comparison after installation

**WHY THIS DOCUMENTATION MATTERS:**

✓ **Legal protection:**
  - Proves condition before you touched it
  - Protects against false defect claims
  - Required evidence for dispute resolution

✓ **Professional standard:**
  - Shows methodical approach
  - Demonstrates competence
  - Builds customer confidence

✓ **Fault-finding:**
  - Essential reference for future work
  - Helps identify circuit routes
  - Shows original installer intentions

✓ **Compliance:**
  - EICR requires "before" baseline
  - Part P documentation requirement
  - Insurance claim evidence

**TOOLS NEEDED FOR DOCUMENTATION:**
- Camera or smartphone (good quality)
- Notepad and pen
- Colored electrical tape (multiple colors)
- Permanent marker
- Insulation resistance tester
- Multifunction tester
- Voltage indicator',
  
  'BS 7671 Chapter 61, IET Guidance Note 3, Part P Building Regulations',
  
  '{"type": "installation_guide", "component": "distribution_board", "phase": "pre_installation", "legal_requirement": true}'
),
(
  'Distribution Board Cable Management and Dress',
  'Professional cable management inside consumer units and distribution boards:

**CABLE ENTRY:**
- Use rubber grommets at all cable entry points (top or bottom)
- Size grommets correctly to grip cables without crushing
- Maintain IP rating of enclosure
- Group cables by circuit type (power/lighting)

**CONDUCTOR BUNDLING:**

Earth Conductors (Green/Yellow):
- Bundle ALL earth cores together tightly
- Use cable ties every 100mm along bundle
- Route bundle along rear/side of enclosure
- Keep earths away from MCB terminals initially
- Benefits: Creates workspace, easy identification, professional appearance

Neutral Conductors (Blue):
- Bundle neutrals parallel to earth bundle
- Use separate cable ties (do NOT mix with earths in same tie)
- Route neatly to neutral bar
- Maintain consistent routing left to right

Live Conductors (Brown):
- Keep separate per circuit
- Avoid crossing over other circuits
- Route directly from MCB to cable entry point
- Use minimum bend radius (6x cable diameter)

**CONDUCTOR LENGTH:**

Earth Conductors:
- Leave 50mm LONGER than required
- Reason: Future modifications easier (earth extended without circuit rewire)
- Coil excess neatly and tie off

Neutral Conductors:
- Cut to exact length needed + 25mm
- Avoids excessive looping in board

Live Conductors:
- Cut to exact length needed + 10mm
- Minimize conductor in enclosure (heat dissipation)

**TERMINAL PREPARATION:**

Stripping Lengths:
- MCB terminals: 10-12mm (check manufacturer specs)
- Earth/neutral bars: 8-10mm
- NO bare copper visible outside terminal
- Use wire strippers (NOT pliers or knife)

Ferrules for Multicore:
- Use for all conductors > 2.5mm² (4mm², 6mm², 10mm²)
- Prevents strand breakage
- Improves connection integrity
- Crimp ferrules with correct tool (NOT pliers)

**ROUTING STRATEGY:**

From Cable Entry to Earth Bar:
- Route along rear of board
- Maintain neat parallel runs
- Avoid sharp bends (> 90°)

From Earth Bar to Neutral Bar:
- Continue parallel routing
- Keep separation from MCB compartment

From Neutral Bar to MCBs:
- Route along base/side of board
- Maintain separation from earth/neutral bundle
- One circuit at a time (avoid tangles)

**LABELING:**

At Board Entry:
- Wrap label around cable 50mm from entry
- Include: Way number, circuit description, cable size
- Use printed labels or permanent marker on tape

At Terminal Connection:
- Label visible near termination point
- Matches board schedule exactly

**TESTING DURING INSTALLATION:**

After Each 3-4 Circuits:
- Visually inspect for loose strands
- Check no bare copper exposed
- Verify correct terminal positions
- Tug-test connections

**COMMON MISTAKES TO AVOID:**

❌ Wiring live conductors first (cramped workspace)
❌ Cutting earth/neutral cables too short
❌ Mixing earth and neutral in same cable tie
❌ Over-stripping conductors
❌ Over-tightening terminals
❌ Not using ferrules on multicore cables
❌ Crossing circuits (creates confusion)
❌ Not labeling cables at both ends

✓ **Professional Result:**
- Neat, organized appearance
- Easy to trace circuits
- Future-proof for modifications
- Meets inspection standards
- Demonstrates competence',
  
  'IET Wiring Regulations BS 7671:2018+A3:2024 Chapter 52, IET On-Site Guide',
  
  '{"type": "installation_guide", "component": "distribution_board", "skill_level": "intermediate", "focus": "cable_management"}'
);