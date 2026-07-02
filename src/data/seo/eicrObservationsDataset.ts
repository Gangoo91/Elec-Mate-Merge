/**
 * EICR observation dataset for the public EICR Code Checker SEO tool.
 *
 * Each entry is a real-world observation as it would be written on an
 * Electrical Installation Condition Report, with the classification code
 * most inspectors would apply and practical reasoning.
 *
 * IMPORTANT: classification is always the inspector's judgement on the day,
 * based on the actual condition found. These are typical codings, seeded
 * from Elec-Mate's in-app training content — not a substitute for a
 * competent person's assessment. Reasoning is deliberately practical
 * (what the danger is, who can touch what) rather than clause citations.
 */

export type EicrCode = 'C1' | 'C2' | 'C3' | 'FI';

export interface EicrObservation {
  id: string;
  /** The observation as it would be written on the certificate */
  observation: string;
  code: EicrCode;
  /** 2-3 sentences of practical reasoning for the typical coding */
  reasoning: string;
  category: string;
  /** Extra terms to match in search beyond the observation text */
  searchTerms: string[];
}

export const EICR_CODE_MEANINGS: Record<
  EicrCode,
  { label: string; meaning: string; action: string; unsatisfactory: boolean }
> = {
  C1: {
    label: 'Danger present',
    meaning: 'Risk of injury exists right now.',
    action: 'Immediate remedial action required',
    unsatisfactory: true,
  },
  C2: {
    label: 'Potentially dangerous',
    meaning: 'Could become dangerous under fault conditions or foreseeable use.',
    action: 'Urgent remedial action required',
    unsatisfactory: true,
  },
  C3: {
    label: 'Improvement recommended',
    meaning: 'Does not meet current standards but is not dangerous as found.',
    action: 'Improvement recommended',
    unsatisfactory: false,
  },
  FI: {
    label: 'Further investigation',
    meaning: 'Safety cannot be confirmed without more investigation.',
    action: 'Further investigation required without delay',
    unsatisfactory: true,
  },
};

export const eicrObservations: EicrObservation[] = [
  // ── Consumer unit ────────────────────────────────────────────────────
  {
    id: 'cu-01',
    observation:
      'Missing blanking plate on consumer unit leaving live busbar accessible to touch',
    code: 'C1',
    reasoning:
      'A gap in the consumer unit front leaves live parts accessible to a finger without using a tool. Anyone resetting a breaker could contact the live busbar, so most inspectors code this C1 — danger present, make safe before leaving site.',
    category: 'Consumer unit',
    searchTerms: ['blank', 'blanking', 'missing blank', 'busbar exposed', 'hole in fuse board', 'fuseboard gap'],
  },
  {
    id: 'cu-02',
    observation:
      'Plastic (thermoplastic) consumer unit installed under wooden staircase, enclosure in good condition',
    code: 'C3',
    reasoning:
      'Current standards call for consumer units in domestic premises to have a non-combustible (typically metal) enclosure, and a location under an escape route makes fire containment matter more. Where the plastic unit is undamaged with sound terminations, this is commonly coded C3 — an improvement recommendation, not an immediate danger.',
    category: 'Consumer unit',
    searchTerms: ['plastic consumer unit', 'plastic fuse board', 'under stairs', 'non-combustible', 'metal consumer unit', 'amendment 3'],
  },
  {
    id: 'cu-03',
    observation:
      'Signs of thermal damage and discolouration at main switch terminal within consumer unit',
    code: 'C2',
    reasoning:
      'Heat damage at a main switch terminal points to a loose or high-resistance connection carrying the whole installation load, which can develop into a fire. Most inspectors code visible overheating at terminations C2 — potentially dangerous, urgent remedial action to remake the connection and replace damaged parts.',
    category: 'Consumer unit',
    searchTerms: ['burn marks', 'scorching', 'overheating', 'discoloured', 'melted', 'thermal damage', 'main switch'],
  },
  {
    id: 'cu-04',
    observation:
      'Rewireable fuses (BS 3036) throughout, carriers and wiring in good condition',
    code: 'C3',
    reasoning:
      'Rewireable fuses are slower to operate than modern devices and can be re-wired with the wrong size wire, but in good condition they still provide overcurrent protection. Most inspectors code a well-maintained rewireable board C3 — an upgrade to MCBs or RCBOs is recommended, not urgent.',
    category: 'Consumer unit',
    searchTerms: ['rewireable fuse', 'BS 3036', 'fuse wire', 'old fuse box', 'wylex', 'fuse carriers'],
  },
  {
    id: 'cu-05',
    observation:
      'Oversized fuse wire fitted in rewireable fuse carrier — 30A wire protecting a lighting circuit',
    code: 'C2',
    reasoning:
      'A fuse re-wired with heavier wire than the circuit design will not disconnect at the intended current, so the cable can overheat under overload or fault without the fuse operating. This defeats the overcurrent protection and is commonly coded C2 — urgent remedial action required.',
    category: 'Consumer unit',
    searchTerms: ['wrong fuse wire', 'oversized fuse', 'fuse wire too big', '30 amp wire', 'overfused'],
  },
  {
    id: 'cu-06',
    observation:
      'Consumer unit insecurely fixed, hanging from wall with weight supported by meter tails',
    code: 'C2',
    reasoning:
      'When the enclosure weight is carried by the cables, terminations are under constant mechanical strain and can pull loose, leading to arcing or exposed live conductors. Most inspectors code this C2 — it is not dangerous at the moment of inspection but is likely to become so.',
    category: 'Consumer unit',
    searchTerms: ['loose consumer unit', 'not fixed', 'hanging', 'insecure fuse board', 'strain on tails'],
  },
  {
    id: 'cu-07',
    observation: 'No circuit identification or labelling at consumer unit',
    code: 'C3',
    reasoning:
      'Missing circuit charts make safe isolation slower and increase the chance of working on the wrong circuit, but they do not create danger by themselves. This is routinely coded C3 — labelling should be provided as an improvement.',
    category: 'Consumer unit',
    searchTerms: ['no labels', 'circuit chart', 'unlabelled', 'circuit identification', 'no schedule'],
  },
  {
    id: 'cu-08',
    observation:
      'Mixed-manufacturer circuit breakers installed in consumer unit contrary to manufacturer instructions',
    code: 'C3',
    reasoning:
      'Devices from another manufacturer may not align correctly on the busbar and the assembly is no longer covered by the unit’s type testing. Where connections are sound and there are no signs of overheating, most inspectors code this C3; evidence of poor busbar contact or heat damage would push it higher.',
    category: 'Consumer unit',
    searchTerms: ['mixed breakers', 'wrong breaker', 'non-approved mcb', 'different manufacturer', 'type tested'],
  },
  {
    id: 'cu-09',
    observation:
      'Two circuits sharing a neutral conductor (borrowed neutral) identified between lighting circuits',
    code: 'FI',
    reasoning:
      'A borrowed neutral means one circuit’s neutral can remain live from the other circuit even after isolation, catching out anyone working on the lighting. The full extent and routing usually cannot be confirmed during a standard inspection, so this is commonly recorded as FI — further investigation without delay, often alongside a C2 once confirmed.',
    category: 'Consumer unit',
    searchTerms: ['borrowed neutral', 'shared neutral', 'linked lighting neutral', 'neutral from another circuit'],
  },
  {
    id: 'cu-10',
    observation:
      'Consumer unit located in bathroom within reach of the bath, no supplementary protection',
    code: 'C2',
    reasoning:
      'Switchgear within reach of a bath or shower can be operated with wet hands in a location where body resistance is lowest. Most inspectors treat accessible switchgear inside bathroom zones as C2 — potentially dangerous, requiring relocation or effective protection.',
    category: 'Consumer unit',
    searchTerms: ['fuse board in bathroom', 'consumer unit bathroom', 'switchgear bathroom zones'],
  },

  // ── Earthing & bonding ───────────────────────────────────────────────
  {
    id: 'eb-01',
    observation: 'No main protective bonding conductor to incoming gas installation pipework',
    code: 'C2',
    reasoning:
      'Without main bonding, a fault elsewhere can leave the gas pipework at a dangerous voltage relative to other earthed metalwork in the property. Absence of main bonding to extraneous services is one of the most common C2s on domestic EICRs — urgent remedial action required.',
    category: 'Earthing & bonding',
    searchTerms: ['gas bonding', 'no bonding', 'main bonding missing', 'gas pipe not bonded', 'earth to gas'],
  },
  {
    id: 'eb-02',
    observation: 'No main protective bonding conductor to incoming water service pipework',
    code: 'C2',
    reasoning:
      'Metallic water pipework entering the building can import or export a potential under fault conditions if it is not bonded to the main earthing terminal. Most inspectors code missing main water bonding C2 — the installation relies on it to keep touch voltages down during a fault.',
    category: 'Earthing & bonding',
    searchTerms: ['water bonding', 'water pipe not bonded', 'main bonding water', 'stop tap bonding'],
  },
  {
    id: 'eb-03',
    observation:
      'Main protective bonding conductors present but undersized at 6mm² on a PME (TN-C-S) supply',
    code: 'C3',
    reasoning:
      'Bonding is in place and functional, but on a PME supply current standards call for a larger conductor because the bonding may carry diverted neutral current. With bonding present and connections sound, this is commonly coded C3 — upgrade recommended rather than urgent.',
    category: 'Earthing & bonding',
    searchTerms: ['undersized bonding', '6mm bonding', 'PME bonding', '10mm bonding', 'bonding too small'],
  },
  {
    id: 'eb-04',
    observation: 'No verified means of earthing for the installation — main earthing conductor absent',
    code: 'C2',
    reasoning:
      'Without an earth, automatic disconnection cannot operate for an earth fault, so exposed metalwork could remain live indefinitely. Nothing is dangerous during normal use, which is why this is commonly coded C2 rather than C1 — but it is one of the most serious C2s and needs urgent action.',
    category: 'Earthing & bonding',
    searchTerms: ['no earth', 'missing earth', 'no means of earthing', 'earthing conductor missing', 'unearthed installation'],
  },
  {
    id: 'eb-05',
    observation:
      'Main earthing conductor undersized — 6mm² installed where 16mm² is required for the supply size',
    code: 'C2',
    reasoning:
      'An undersized main earthing conductor may not carry the prospective earth fault current safely, compromising automatic disconnection when it is needed most. It is not dangerous in normal use but is potentially dangerous under fault conditions, so it is commonly coded C2.',
    category: 'Earthing & bonding',
    searchTerms: ['undersized earthing conductor', '6mm earth', '16mm earth', 'main earth too small'],
  },
  {
    id: 'eb-06',
    observation:
      'Main bonding clamp on water service corroded and no longer making effective contact',
    code: 'C2',
    reasoning:
      'A corroded or loose clamp means the bonding connection cannot be relied on, which is effectively the same as having no bonding at all under fault conditions. Most inspectors code an ineffective bonding connection C2 — remake or replace the clamp urgently.',
    category: 'Earthing & bonding',
    searchTerms: ['corroded clamp', 'loose bonding clamp', 'earth clamp', 'BS 951', 'bonding disconnected'],
  },
  {
    id: 'eb-07',
    observation:
      'TT installation — measured earth electrode resistance excessively high and unstable',
    code: 'C2',
    reasoning:
      'On a TT system the electrode is the only path back to earth, and a very high or unstable reading means the RCD may not see enough fault current to trip reliably. Most inspectors code an ineffective electrode C2 — the earth fault protection for the whole installation depends on it.',
    category: 'Earthing & bonding',
    searchTerms: ['earth rod', 'electrode resistance', 'TT system', 'high Ra', 'earth rod resistance', 'earth spike'],
  },
  {
    id: 'eb-08',
    observation:
      'Metallic gas and water pipework bonded, but connection made to painted surface without removing coating',
    code: 'C3',
    reasoning:
      'A clamp over paint or corrosion products may still make some contact, but the connection quality is compromised over time. Where continuity can still be demonstrated, most inspectors code this C3; a connection that fails a continuity test would warrant C2 instead.',
    category: 'Earthing & bonding',
    searchTerms: ['clamp on paint', 'painted pipe bonding', 'poor bonding connection'],
  },
  {
    id: 'eb-09',
    observation:
      'Safety electrical connection warning labels missing from bonding and earthing connections',
    code: 'C3',
    reasoning:
      'The connections themselves are sound — only the "Safety Electrical Connection — Do Not Remove" labels are missing. Labelling defects that do not affect how the installation performs are routinely coded C3.',
    category: 'Earthing & bonding',
    searchTerms: ['missing label', 'do not remove label', 'warning notice', 'bonding label'],
  },

  // ── Sockets & accessories ────────────────────────────────────────────
  {
    id: 'sa-01',
    observation: 'Socket outlet with cracked faceplate exposing live terminals accessible to touch',
    code: 'C1',
    reasoning:
      'Live parts are accessible to touch without tools, creating an immediate risk of electric shock — a child’s finger or a metal object can reach the terminals. This is a classic C1: danger present, and the accessory should be made safe or isolated before the inspector leaves site.',
    category: 'Sockets & accessories',
    searchTerms: ['broken socket', 'cracked socket', 'smashed faceplate', 'exposed terminals', 'damaged plug socket'],
  },
  {
    id: 'sa-02',
    observation:
      'Hairline crack to socket faceplate, no access to live parts and accessory mechanically sound',
    code: 'C3',
    reasoning:
      'The damage is cosmetic — the enclosure still prevents contact with live parts and the socket functions correctly. Most inspectors code minor damage without access to live parts C3, with replacement recommended before the crack worsens.',
    category: 'Sockets & accessories',
    searchTerms: ['hairline crack', 'minor damage socket', 'chipped faceplate', 'cosmetic damage'],
  },
  {
    id: 'sa-03',
    observation:
      'Socket outlet pulled away from wall with conductors under strain and back box detached',
    code: 'C2',
    reasoning:
      'Terminations under mechanical strain work loose over time, leading to overheating or conductors pulling free inside the accessory. Live parts are not accessible right now, so this is commonly coded C2 — potentially dangerous, refix urgently.',
    category: 'Sockets & accessories',
    searchTerms: ['loose socket', 'socket off wall', 'hanging socket', 'back box loose', 'socket pulled out'],
  },
  {
    id: 'sa-04',
    observation: 'Scorch marks and discolouration around socket outlet, cause not evident',
    code: 'FI',
    reasoning:
      'Scorching indicates overheating has occurred, but without opening up and testing, the inspector cannot tell whether the cause was a faulty appliance plug, a loose termination, or circuit overload. Where the cause and current condition cannot be confirmed, FI is the appropriate code — investigate without delay.',
    category: 'Sockets & accessories',
    searchTerms: ['scorched socket', 'burn marks socket', 'discoloured socket', 'melted socket', 'brown marks'],
  },
  {
    id: 'sa-05',
    observation: 'Reversed polarity at socket outlet — line and neutral conductors transposed',
    code: 'C2',
    reasoning:
      'With polarity reversed, single-pole switches and fuses in appliances end up in the neutral, so equipment can remain live when apparently switched off. The socket works normally so danger is not immediate, but most inspectors code reversed polarity C2 — urgent correction needed.',
    category: 'Sockets & accessories',
    searchTerms: ['reversed polarity', 'live neutral swapped', 'polarity fail', 'wired wrong way'],
  },
  {
    id: 'sa-06',
    observation: 'No circuit protective conductor present at socket outlet — earth terminal not connected',
    code: 'C2',
    reasoning:
      'A Class I appliance plugged in here would have no earth path, so a fault to its metal casework would leave the casework live without tripping anything. The absence only bites under fault conditions, which is why most inspectors code a missing CPC at a socket C2.',
    category: 'Sockets & accessories',
    searchTerms: ['no earth at socket', 'missing cpc', 'earth not connected', 'no earth continuity'],
  },
  {
    id: 'sa-07',
    observation: 'Socket outlet installed directly above kitchen sink draining board',
    code: 'C3',
    reasoning:
      'A socket immediately over a sink is exposed to splashing and encourages use of appliances with wet hands, though the accessory itself is undamaged and protected. Most inspectors code poor positioning of this kind C3 — relocation recommended.',
    category: 'Sockets & accessories',
    searchTerms: ['socket near sink', 'socket above sink', 'socket next to tap', 'kitchen socket position'],
  },
  {
    id: 'sa-08',
    observation:
      'Multiple adaptors and extension leads in permanent use due to insufficient socket provision',
    code: 'C3',
    reasoning:
      'Daisy-chained adaptors are an overload and trip risk, but they are user equipment rather than a defect in the fixed installation. Inspectors typically record insufficient socket provision as C3 — recommending additional outlets be installed.',
    category: 'Sockets & accessories',
    searchTerms: ['extension leads', 'adaptors', 'not enough sockets', 'daisy chain', 'overloaded socket'],
  },
  {
    id: 'sa-09',
    observation:
      'End-to-end continuity of ring final circuit conductors could not be confirmed — possible broken ring',
    code: 'FI',
    reasoning:
      'If the ring is broken, parts of the circuit are effectively a spur wired in cable that may be undersized for the 32A protective device. Until the break is located and confirmed, the safety of the circuit cannot be determined, so FI is commonly recorded — investigate without delay.',
    category: 'Sockets & accessories',
    searchTerms: ['broken ring', 'ring continuity', 'ring final circuit', 'open ring', 'r1 r2 fail'],
  },

  // ── Bathrooms ────────────────────────────────────────────────────────
  {
    id: 'ba-01',
    observation:
      'Standard 13A socket outlet installed within 3m of the boundary of bathroom zone 1',
    code: 'C2',
    reasoning:
      'A general-purpose socket this close to a bath or shower allows mains appliances to be used within reach of water, where the consequences of a fault are most severe. Most inspectors code a socket inside the restricted distance C2 — potentially dangerous, remove or relocate urgently.',
    category: 'Bathrooms',
    searchTerms: ['socket in bathroom', 'bathroom socket', '3m from bath', 'socket near shower', 'zone 1 socket'],
  },
  {
    id: 'ba-02',
    observation:
      'Light fitting in bathroom zone 1 without suitable IP rating for the location',
    code: 'C2',
    reasoning:
      'A fitting in zone 1 is directly exposed to water spray from the shower, and without adequate ingress protection water can reach live parts. Most inspectors code an unsuitable fitting inside a bathroom zone C2 — replace with a correctly rated fitting urgently.',
    category: 'Bathrooms',
    searchTerms: ['bathroom light', 'IP rating', 'IP44', 'IP65', 'zone 1 light', 'shower light fitting'],
  },
  {
    id: 'ba-03',
    observation:
      'No supplementary bonding in bathroom and circuits to the location not RCD protected',
    code: 'C2',
    reasoning:
      'Supplementary bonding can only be omitted where specific conditions are met, including 30mA RCD protection of the location’s circuits — here neither protection exists. With no bonding and no RCD, a fault could create dangerous touch voltages between pipework and fittings, so this is commonly coded C2.',
    category: 'Bathrooms',
    searchTerms: ['supplementary bonding', 'bathroom bonding', 'no bonding bathroom', 'pipes not bonded bathroom'],
  },
  {
    id: 'ba-04',
    observation:
      'No supplementary bonding in bathroom, but all circuits of the location have 30mA RCD protection and disconnection times confirmed',
    code: 'C3',
    reasoning:
      'Where RCD protection and the other conditions for omitting supplementary bonding are verified, the absence of visible bonding is not a safety deficiency under current standards. Many inspectors still record it as C3 for older installations where full verification of every condition was not possible — judgement varies with what can be confirmed on site.',
    category: 'Bathrooms',
    searchTerms: ['supplementary bonding omitted', 'bonding not required', 'rcd bathroom bonding'],
  },
  {
    id: 'ba-05',
    observation:
      'Electric shower isolator pull-cord switch damaged with live parts accessible through broken casing',
    code: 'C1',
    reasoning:
      'Accessible live parts in a bathroom — where occupants are wet and often barefoot — present about the highest shock risk an inspection can find. This is coded C1: danger present, isolate or make safe immediately and inform the duty holder.',
    category: 'Bathrooms',
    searchTerms: ['broken pull cord', 'shower switch broken', 'ceiling switch damaged', 'shower isolator'],
  },
  {
    id: 'ba-06',
    observation: 'Electric shower circuit without 30mA RCD additional protection',
    code: 'C2',
    reasoning:
      'A shower combines water, fixed current-using equipment and a person in the lowest-resistance situation in the house, which is exactly what additional RCD protection is for. Most inspectors code a shower circuit without a 30mA RCD C2 — urgent remedial action recommended.',
    category: 'Bathrooms',
    searchTerms: ['shower no rcd', 'shower circuit rcd', 'electric shower protection'],
  },
  {
    id: 'ba-07',
    observation:
      'Portable electric heater on extension lead in use within bathroom',
    code: 'C1',
    reasoning:
      'Portable mains equipment within reach of a bath or shower creates an immediate electrocution risk if it falls into water or is touched with wet hands. Inspectors typically treat this as C1 — the danger is present now and the equipment should be removed immediately, with the finding recorded and the duty holder informed.',
    category: 'Bathrooms',
    searchTerms: ['heater in bathroom', 'portable heater', 'extension lead bathroom', 'appliance near bath'],
  },

  // ── Wiring systems ───────────────────────────────────────────────────
  {
    id: 'ws-01',
    observation:
      'Cable insulation damaged exposing live conductor within reach in garage',
    code: 'C1',
    reasoning:
      'A bare live conductor at touch height is an immediate shock risk to anyone in the garage. This is C1 — danger present. The circuit should be isolated or the conductor made safe before the inspection concludes.',
    category: 'Wiring systems',
    searchTerms: ['damaged cable', 'exposed conductor', 'bare wire', 'nicked cable', 'live wire showing'],
  },
  {
    id: 'ws-02',
    observation:
      'Rubber-insulated (VIR) wiring with perished, crumbling insulation found at lighting points',
    code: 'C2',
    reasoning:
      'Perished rubber insulation breaks away when disturbed, leaving conductors effectively bare inside fittings and boxes. Even where nothing is touchable today, any maintenance or vibration can expose live parts, so degraded VIR wiring is commonly coded C2 — with rewiring the realistic remedy.',
    category: 'Wiring systems',
    searchTerms: ['rubber wiring', 'VIR', 'perished insulation', 'crumbling insulation', 'old wiring', 'lead sheathed'],
  },
  {
    id: 'ws-03',
    observation:
      'Unenclosed cable joints made with open connector blocks in loft space',
    code: 'C2',
    reasoning:
      'Screw-terminal joints without an enclosure leave connections exposed to disturbance, dust and rodents, and the terminals themselves can be touched by anyone in the loft. Most inspectors code unenclosed joints C2 — enclose in suitable junction boxes urgently.',
    category: 'Wiring systems',
    searchTerms: ['chocolate block', 'connector block', 'open joint', 'junction box missing', 'taped joint', 'loft joints'],
  },
  {
    id: 'ws-04',
    observation:
      'Cables in loft unsupported and resting on ceiling plasterboard across walkway areas',
    code: 'C3',
    reasoning:
      'Unsupported cables risk mechanical damage from being trodden on or snagged, but sound cables lying on a ceiling are not dangerous in themselves. Most inspectors code poor cable support C3 — clip or route the cables properly as an improvement.',
    category: 'Wiring systems',
    searchTerms: ['unsupported cables', 'unclipped', 'cables on ceiling', 'loft cables', 'cable support'],
  },
  {
    id: 'ws-05',
    observation:
      'Insulation resistance of 0.3 megohms measured on socket circuit, below the acceptable minimum',
    code: 'C2',
    reasoning:
      'A reading this low means the insulation between conductors is breaking down somewhere on the circuit — moisture, damage or degradation. It has not yet failed to earth badly enough to trip protection, but it is deteriorating, so a below-minimum insulation reading is commonly coded C2, sometimes with FI to locate the cause.',
    category: 'Wiring systems',
    searchTerms: ['insulation resistance', 'low IR', 'megger reading', '1 megohm', 'insulation test fail'],
  },
  {
    id: 'ws-06',
    observation:
      'Non-sheathed single-core cables run outside conduit or trunking above suspended ceiling',
    code: 'C2',
    reasoning:
      'Singles rely on the containment system for their mechanical protection — outside it, only the basic insulation stands between a live conductor and anything that rubs or presses against it. Most inspectors code unprotected singles C2.',
    category: 'Wiring systems',
    searchTerms: ['singles out of conduit', 'unsheathed cable', 'single insulated', 'cables out of trunking'],
  },
  {
    id: 'ws-07',
    observation:
      'Cables passing through metal stud partitions without grommets or bushes at penetrations',
    code: 'C3',
    reasoning:
      'Sharp metal edges can abrade the cable sheath over time, but where the insulation is currently undamaged there is no present or imminent danger. This is commonly coded C3 — fit grommets or protection as an improvement.',
    category: 'Wiring systems',
    searchTerms: ['no grommets', 'metal stud', 'sharp edge', 'cable through joist', 'abrasion'],
  },
  {
    id: 'ws-08',
    observation:
      'Junction box concealed beneath floorboards with screw terminals not accessible for inspection',
    code: 'C3',
    reasoning:
      'Screw-terminal joints need to remain accessible for inspection and maintenance unless they use maintenance-free connections. A concealed joint that tested satisfactorily is not dangerous as found, so most inspectors code inaccessible junction boxes C3.',
    category: 'Wiring systems',
    searchTerms: ['junction box under floor', 'inaccessible joint', 'hidden junction box', 'maintenance free'],
  },
  {
    id: 'ws-09',
    observation:
      'Flexible cord used as fixed wiring, stapled to skirting board to feed wall light',
    code: 'C3',
    reasoning:
      'Flex is not designed for fixed wiring and staples can crush or pierce it, but where the cord is undamaged and out of harm’s way the risk is low. Most inspectors code this C3 — replace with proper fixed wiring as an improvement; visible damage would raise it to C2.',
    category: 'Wiring systems',
    searchTerms: ['flex as fixed wiring', 'stapled cable', 'flexible cord', 'extension flex wired in'],
  },
  {
    id: 'ws-10',
    observation:
      'Circuit conductors undersized for the protective device — 2.5mm² radial protected by 32A breaker',
    code: 'C2',
    reasoning:
      'The breaker will allow more current than the cable can carry continuously, so a sustained load can overheat the cable inside walls and floors without anything tripping. Undersized cable for the protection is commonly coded C2 — reduce the device rating or rewire urgently.',
    category: 'Wiring systems',
    searchTerms: ['undersized cable', 'wrong breaker size', '2.5mm 32a', 'cable too small', 'overload'],
  },
  {
    id: 'ws-11',
    observation:
      'Evidence of significant DIY alterations with no certification — extent and routing of added wiring unknown',
    code: 'FI',
    reasoning:
      'Uncertified alterations mean the inspector cannot know what is buried in walls, how circuits are protected or whether joints are enclosed, and sampling during an EICR only sees so much. Where the extent of undocumented work cannot be established, FI is commonly recorded — further investigation without delay.',
    category: 'Wiring systems',
    searchTerms: ['diy wiring', 'no certificate', 'undocumented alterations', 'unknown wiring', 'homeowner wiring'],
  },

  // ── RCD protection ───────────────────────────────────────────────────
  {
    id: 'rcd-01',
    observation:
      '30mA RCD fails to operate within required time when tested at rated residual current',
    code: 'C2',
    reasoning:
      'An RCD that fails to trip at its rated residual current is not providing the intended disconnection, leaving no additional protection if an earth fault occurs. It is potentially dangerous and requires urgent remedial action — most inspectors code a failed RCD test C2.',
    category: 'RCD protection',
    searchTerms: ['rcd fail', 'rcd wont trip', 'rcd test fail', 'trip time', '300ms', 'rcd not working'],
  },
  {
    id: 'rcd-02',
    observation: 'RCD integral test button does not operate the device when pressed',
    code: 'C2',
    reasoning:
      'A test button that does nothing indicates the tripping mechanism has stuck or failed, so the RCD may not disconnect under a real earth fault. Most inspectors code a non-functional RCD C2 — replace the device urgently.',
    category: 'RCD protection',
    searchTerms: ['test button', 'rcd button stuck', 'rcd mechanism', 'rcd faulty'],
  },
  {
    id: 'rcd-03',
    observation:
      'Socket outlets on 1985 installation without RCD protection, installation otherwise in good condition',
    code: 'C3',
    reasoning:
      'The installation predates RCD requirements and was compliant when built; adding RCD protection would enhance safety but there is no defect in what exists. This is commonly coded C3 — an improvement recommendation rather than a compliance failure requiring urgent action.',
    category: 'RCD protection',
    searchTerms: ['no rcd old install', '1980s wiring', 'no rcd sockets', 'pre-rcd installation'],
  },
  {
    id: 'rcd-04',
    observation:
      'Kitchen socket outlets installed in 2010 without 30mA RCD protection',
    code: 'C2',
    reasoning:
      'By 2010 the standards in force required 30mA RCD protection for socket outlets of this kind, so the protection was omitted when it should have been designed in. Most inspectors code missing RCD protection on an installation of this age C2 — urgent remedial action.',
    category: 'RCD protection',
    searchTerms: ['2010 no rcd', 'kitchen sockets rcd', 'missing rcd new install', '17th edition rcd'],
  },
  {
    id: 'rcd-05',
    observation:
      'Cables concealed in walls at less than 50mm depth without RCD protection or earthed mechanical protection, pre-2008 installation',
    code: 'C3',
    reasoning:
      'Concealed cables in the prescribed zones without RCD protection are a drilling and fixing hazard, but on an installation that predates the requirement this is a departure from current standards rather than a defect. It is commonly coded C3 on older installations.',
    category: 'RCD protection',
    searchTerms: ['buried cables', 'cables in walls', '50mm', 'safe zones', 'concealed cables rcd'],
  },
  {
    id: 'rcd-06',
    observation:
      'Single RCD protecting all circuits in the installation with no division between them',
    code: 'C3',
    reasoning:
      'One fault anywhere takes out every circuit including lighting, which is an inconvenience and a trip hazard rather than a shock risk. Most inspectors code a lack of RCD discrimination or circuit division C3 — split the installation across RCBOs or a dual-RCD board as an improvement.',
    category: 'RCD protection',
    searchTerms: ['one rcd whole house', 'no discrimination', 'all circuits one rcd', 'nuisance tripping'],
  },
  {
    id: 'rcd-07',
    observation: 'RCD test notice ("this installation should be tested quarterly") missing at consumer unit',
    code: 'C3',
    reasoning:
      'The RCD itself works correctly — only the label prompting the user to press the test button periodically is missing. Missing notices and labels that do not affect protection are routinely coded C3.',
    category: 'RCD protection',
    searchTerms: ['rcd notice', 'quarterly test label', 'missing notice', 'test notice'],
  },

  // ── Lighting ─────────────────────────────────────────────────────────
  {
    id: 'li-01',
    observation:
      'Heat-damaged pendant lampholder, brittle and discoloured with cover cracked',
    code: 'C2',
    reasoning:
      'Heat-embrittled lampholders crack and shed pieces when a lamp is changed, exposing live contacts to the person handling the fitting. While live parts are not touchable right now, the danger arises in normal, foreseeable use — most inspectors code this C2.',
    category: 'Lighting',
    searchTerms: ['pendant', 'lampholder', 'brittle bakelite', 'heat damaged light', 'ceiling rose damaged'],
  },
  {
    id: 'li-02',
    observation:
      'No circuit protective conductor on lighting circuit, all fittings and switches Class II or plastic',
    code: 'C3',
    reasoning:
      'Older lighting circuits were often wired without an earth, and with all-insulated fittings and accessories there is nothing conductive to become live. Most inspectors code this C3 with a note that metal fittings or switches must not be installed until an earth is provided.',
    category: 'Lighting',
    searchTerms: ['no earth lighting', 'two core lighting', 'no cpc lighting', 'old lighting circuit'],
  },
  {
    id: 'li-03',
    observation:
      'Class I metal light fittings installed on lighting circuit with no circuit protective conductor',
    code: 'C2',
    reasoning:
      'Metal fittings that require an earth have been connected to a circuit that cannot provide one, so a fault inside a fitting would leave its metalwork live with no path to trip protection. This combination is commonly coded C2 — replace the fittings with Class II or provide a CPC urgently.',
    category: 'Lighting',
    searchTerms: ['metal light no earth', 'class 1 fitting', 'unearthed metal light', 'brass switch no earth'],
  },
  {
    id: 'li-04',
    observation:
      'Recessed downlights covered by thermal insulation in loft with signs of overheating to surrounding timber',
    code: 'C2',
    reasoning:
      'Downlights without appropriate ratings need clearance from insulation to shed heat, and scorched timber shows the fittings are already running dangerously hot. Evidence of overheating against combustible material is commonly coded C2 — a fire risk needing urgent attention.',
    category: 'Lighting',
    searchTerms: ['downlights insulation', 'scorched joist', 'downlight overheating', 'fire hoods', 'loft insulation lights'],
  },
  {
    id: 'li-05',
    observation:
      'External light fitting detached from wall and hanging by its supply cable',
    code: 'C2',
    reasoning:
      'The cable is carrying the fitting’s weight, straining terminations while the open back of the fitting is exposed to rain. Water ingress plus loosening connections make this potentially dangerous — commonly coded C2, refix and reseal urgently.',
    category: 'Lighting',
    searchTerms: ['light hanging off wall', 'outside light loose', 'fitting hanging by cable', 'detached light'],
  },
  {
    id: 'li-06',
    observation:
      'Bare circuit protective conductors not sleeved within light switch back boxes',
    code: 'C3',
    reasoning:
      'The unsleeved earth is still connected and functional; missing green/yellow sleeving is an identification and incidental-contact issue rather than a danger. This is one of the most common C3s recorded on domestic EICRs.',
    category: 'Lighting',
    searchTerms: ['unsleeved earth', 'bare cpc', 'no sleeving', 'earth sleeving switch'],
  },

  // ── Supply & metering ────────────────────────────────────────────────
  {
    id: 'sm-01',
    observation:
      'Service cut-out casing cracked with live terminals visible — DNO equipment damaged',
    code: 'C1',
    reasoning:
      'The cut-out sits ahead of all consumer protection, so exposed terminals here are live at full supply capacity with nothing to disconnect them. This is C1 — danger present. It is the distributor’s equipment, so the DNO must be notified immediately as well as the duty holder.',
    category: 'Supply & metering',
    searchTerms: ['cut out damaged', 'service head', 'dno fuse', 'cracked cutout', 'supplier equipment'],
  },
  {
    id: 'sm-02',
    observation:
      'Meter tails undersized at 16mm² for a 100A supply fuse',
    code: 'C2',
    reasoning:
      'Tails smaller than the supply fuse rating can carry sustained current beyond their capacity without the fuse operating, and they run unprotected between the meter and consumer unit. Undersized tails on a high-capacity supply are commonly coded C2.',
    category: 'Supply & metering',
    searchTerms: ['meter tails', '16mm tails', '25mm tails', 'tails too small', '100 amp supply'],
  },
  {
    id: 'sm-03',
    observation:
      'Meter tails run unprotected and unclipped across masonry with sheath abrasion beginning to show',
    code: 'C2',
    reasoning:
      'Tails have no upstream overcurrent protection the consumer controls, so mechanical damage to them can lead to a high-energy fault at the origin. Visible abrasion means deterioration is under way — most inspectors code this C2 rather than waiting for the sheath to wear through.',
    category: 'Supply & metering',
    searchTerms: ['tails unprotected', 'tails unclipped', 'abraded tails', 'damage to meter tails'],
  },
  {
    id: 'sm-04',
    observation:
      'Signs of overheating at supply cut-out with intermittent whole-installation flickering reported — suspected deteriorating supply neutral',
    code: 'FI',
    reasoning:
      'A failing service neutral or cut-out connection is potentially very serious, but its condition cannot be confirmed because the consumer’s inspector cannot open distributor equipment. FI is recorded and the DNO notified without delay to investigate their connection.',
    category: 'Supply & metering',
    searchTerms: ['flickering lights whole house', 'supply neutral', 'cutout hot', 'dno investigation', 'loose service connection'],
  },
  {
    id: 'sm-05',
    observation:
      'Evidence of interference with metering equipment — unmetered connection made ahead of meter with exposed conductors',
    code: 'C1',
    reasoning:
      'Tampered supplies are typically made with makeshift, unprotected connections at a point where fault energy is highest, and exposed conductors ahead of the meter have no consumer protection at all. This is coded C1, with the supplier and DNO informed — it is also a criminal matter for the duty holder to resolve.',
    category: 'Supply & metering',
    searchTerms: ['meter bypass', 'meter tamper', 'illegal connection', 'abstraction', 'bypassed meter'],
  },
  {
    id: 'sm-06',
    observation:
      'No durable label at origin identifying the supply characteristics and earthing arrangement',
    code: 'C3',
    reasoning:
      'Missing origin labelling makes future work slower but has no effect on how the installation performs or protects. Documentation and labelling shortfalls of this kind are routinely coded C3.',
    category: 'Supply & metering',
    searchTerms: ['no origin label', 'earthing arrangement label', 'supply label missing'],
  },

  // ── Outdoors ─────────────────────────────────────────────────────────
  {
    id: 'ou-01',
    observation: 'External socket outlet without 30mA RCD protection',
    code: 'C2',
    reasoning:
      'Equipment used outdoors combines damp conditions, direct ground contact and long flexible leads — the situations RCD additional protection exists for. Most inspectors code an outdoor socket without a 30mA RCD C2.',
    category: 'Outdoors',
    searchTerms: ['outside socket', 'garden socket', 'external socket rcd', 'outdoor socket no rcd'],
  },
  {
    id: 'ou-02',
    observation:
      'Standard twin-and-earth cable direct-buried in garden without mechanical protection to feed shed',
    code: 'C2',
    reasoning:
      'Ordinary sheathed cable buried without armour, ducting or marking can be struck by a spade with nothing to protect the person digging. A concealed, unprotected buried cable is commonly coded C2 — replace with a properly installed buried cable urgently.',
    category: 'Outdoors',
    searchTerms: ['buried cable garden', 'twin and earth buried', 'shed supply', 'no swa', 'cable under lawn'],
  },
  {
    id: 'ou-03',
    observation:
      'External socket enclosure with broken weatherproof cover, internals corroded and water staining evident',
    code: 'C2',
    reasoning:
      'With the cover gone, rain reaches terminals that were designed to stay dry, and the corrosion shows water has been getting in for some time. Most inspectors code a weather-damaged outdoor accessory C2 — replace before moisture tracking causes a fault.',
    category: 'Outdoors',
    searchTerms: ['broken outdoor socket', 'weatherproof cover', 'corroded socket', 'water in socket'],
  },
  {
    id: 'ou-04',
    observation:
      'Garden lighting supplied via taped flex joints lying on ground behind border planting',
    code: 'C2',
    reasoning:
      'Taped joints have no enclosure, no strain relief and no ingress protection, and here they sit in soil moisture where people garden. Unprotected joints in an outdoor location are commonly coded C2 — replace with proper weatherproof connectors urgently.',
    category: 'Outdoors',
    searchTerms: ['taped joint garden', 'garden lights flex', 'outdoor joint', 'festoon joints'],
  },
  {
    id: 'ou-05',
    observation:
      'EV charge point on PME (TN-C-S) supply without earth electrode or device providing protection against a broken supply neutral',
    code: 'C2',
    reasoning:
      'On a PME supply, a broken distributor neutral can raise the vehicle bodywork to a dangerous voltage while a person stands on the ground touching it. Charge points need specific measures to cover this, and their absence is commonly coded C2.',
    category: 'Outdoors',
    searchTerms: ['ev charger pme', 'open pen', 'ev charger earth rod', 'charge point earthing', 'pen fault'],
  },

  // ── Kitchens & heating ───────────────────────────────────────────────
  {
    id: 'kh-01',
    observation:
      'Cooker switch cracked with gap in faceplate, live parts not accessible',
    code: 'C3',
    reasoning:
      'The accessory is damaged but the enclosure still does its job — nothing live can be reached and the switch operates correctly. Most inspectors code minor accessory damage without access to live parts C3; if a test finger could reach live parts it becomes C1.',
    category: 'Sockets & accessories',
    searchTerms: ['cooker switch cracked', 'damaged cooker switch', 'cracked switch plate'],
  },
  {
    id: 'kh-02',
    observation:
      'Immersion heater wired in ordinary PVC flex showing heat discolouration at the cylinder',
    code: 'C2',
    reasoning:
      'Immersion heaters need heat-resistant flex, and the discolouration shows this cord is already degrading against a hot cylinder. Deteriorating insulation on a 3kW load is commonly coded C2 — replace with heat-resistant flex urgently.',
    category: 'Wiring systems',
    searchTerms: ['immersion heater flex', 'heat resistant flex', 'discoloured flex', 'hot water cylinder wiring'],
  },
  {
    id: 'kh-03',
    observation:
      'Discoloured and warm-to-touch dimmer switch, load and internal condition unknown',
    code: 'FI',
    reasoning:
      'A warm accessory may simply be an overloaded or ageing dimmer, or it may indicate a failing termination behind the plate. Without removing the accessory and checking load and connections the risk cannot be classified, so FI is commonly recorded — investigate without delay.',
    category: 'Lighting',
    searchTerms: ['warm switch', 'hot dimmer', 'discoloured switch', 'switch gets hot'],
  },
  {
    id: 'kh-04',
    observation:
      'Circuit could not be tested — supplies critical equipment that could not be isolated during inspection',
    code: 'FI',
    reasoning:
      'When a circuit cannot be inspected or tested, its safety status simply cannot be determined, and an untested circuit cannot be assumed satisfactory. FI is the appropriate code, with the investigation completed during planned downtime or by alternative test methods.',
    category: 'Wiring systems',
    searchTerms: ['could not test', 'limitation', 'circuit not tested', 'unable to isolate', 'critical equipment'],
  },
  {
    id: 'kh-05',
    observation:
      'Old and new wiring colours present in installation without notice at consumer unit warning of mixed colours',
    code: 'C3',
    reasoning:
      'Mixed red/black and brown/blue wiring is safe in itself — the risk is a future worker misidentifying conductors, which the warning notice exists to prevent. A missing mixed-colours notice is routinely coded C3.',
    category: 'Consumer unit',
    searchTerms: ['mixed wiring colours', 'old colours', 'harmonised colours', 'red black brown blue', 'caution notice'],
  },
  {
    id: 'kh-06',
    observation:
      'Storage heater with damaged terminal cover exposing supply terminations at floor level',
    code: 'C1',
    reasoning:
      'Supply terminals exposed at floor level are within easy reach of children and pets, and the heater may remain energised via its off-peak supply even when apparently off. Accessible live terminations are coded C1 — isolate and make safe immediately.',
    category: 'Sockets & accessories',
    searchTerms: ['storage heater cover', 'exposed terminals heater', 'broken terminal cover', 'panel heater damaged'],
  },
];

/** Distinct categories in display order */
export const eicrObservationCategories: string[] = [
  ...new Set(eicrObservations.map((o) => o.category)),
];
