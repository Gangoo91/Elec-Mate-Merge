/**
 * Regulation-referenced near-miss templates for UK electrical work.
 *
 * References:
 *  - EAWR 1989  Electricity at Work Regulations
 *  - GS38       HSE Guidance — Electrical test equipment for use on LV installations
 *  - BS 7671    Requirements for Electrical Installations (18th Edition)
 *  - HSG47      Avoiding danger from underground services
 *  - WAH Regs   Work at Height Regulations 2005
 *  - CAR 2012   Control of Asbestos Regulations
 *  - HSG264     Asbestos: The Survey Guide
 *  - RRO 2005   Regulatory Reform (Fire Safety) Order
 *  - BS EN 50110-1  Operation of electrical installations
 */

export interface StandardTemplate {
  id: string;
  name: string;
  description: string;
  regulation_refs: string[];
  template_data: Record<string, unknown>;
}

export const NEAR_MISS_STANDARD_TEMPLATES: StandardTemplate[] = [
  {
    id: 'nm-electrical-contact',
    name: 'Electrical Contact / Near Shock',
    description:
      'Near miss involving contact or potential contact with live conductors',
    regulation_refs: ['EAWR 1989 Reg 4', 'GS38', 'BS 7671 Reg 537'],
    template_data: {
      category: 'electrical_hazard',
      severity: 'critical',
      description:
        'Near miss — potential or actual contact with live electrical conductors. Includes situations where a person came close to receiving an electric shock due to inadequate isolation, exposed live parts, or failure of protective measures.',
      potential_consequences:
        'Electric shock (potentially fatal at >50V AC / 120V DC), cardiac arrest, electrical burns, arc flash injuries. Secondary injuries from involuntary muscle contraction (falls, impact). Ref: EAWR 1989 Regulation 4 — all systems shall be constructed and maintained to prevent danger.',
      immediate_actions:
        'Isolate the circuit immediately. Secure the area and prevent access. Check all persons for injury. Verify isolation with approved voltage indicator per GS38. Apply lock-off and danger tags.',
      preventive_measures:
        'Review safe isolation procedure per GS38. Verify test instruments meet GS38 requirements (fused probes, finger guards, CAT III/IV rated). Ensure BS 7671 Reg 537 compliance for isolation and switching. Brief all operatives on findings.',
      likelihood: 4,
    },
  },
  {
    id: 'nm-arc-flash',
    name: 'Arc Flash Exposure',
    description:
      'Near miss involving potential arc flash or electrical explosion',
    regulation_refs: ['BS EN 50110-1', 'IEEE 1584', 'EAWR 1989 Reg 14'],
    template_data: {
      category: 'electrical_hazard',
      severity: 'critical',
      description:
        'Near miss — potential arc flash event during electrical work. Includes situations where an arc flash could have occurred due to inadvertent contact, tool slip, or working on or near energised conductors without adequate protection.',
      potential_consequences:
        'Severe burns (arc temperatures exceed 20,000\u00B0C), blast pressure injuries, hearing damage, vision loss, ignition of clothing. Arc flash incidents have a high fatality rate. Ref: BS EN 50110-1 Operation of electrical installations.',
      immediate_actions:
        'Cease all work immediately. De-energise the installation if safe to do so. Evacuate personnel from the arc flash boundary zone. Inspect all PPE for damage. Report to responsible person.',
      preventive_measures:
        'Conduct arc flash risk assessment per IEEE 1584. Ensure arc-rated PPE is worn (minimum ATPV 8 cal/cm\u00B2 for LV work). Apply EAWR 1989 Reg 14 — no live working unless unreasonable to work dead. Install arc fault detection devices where appropriate. Review BS 7671 Chapter 42 protection requirements.',
      likelihood: 3,
    },
  },
  {
    id: 'nm-inadequate-isolation',
    name: 'Inadequate Isolation Discovered',
    description:
      'Safe isolation procedure was incomplete or circuit found energised after isolation attempt',
    regulation_refs: ['GS38', 'BS 7671 Reg 537', 'EAWR 1989 Reg 12-13'],
    template_data: {
      category: 'electrical_hazard',
      severity: 'critical',
      description:
        'Near miss — a circuit or installation was found to be live after an isolation attempt, or the safe isolation procedure was not correctly followed. Includes wrong circuit isolated, parallel supplies not identified, or lock-off/tag-out not applied.',
      potential_consequences:
        'Electric shock or electrocution. Arc flash. Burns. If isolation was relied upon for work to proceed, multiple persons may have been at risk. Ref: EAWR 1989 Regs 12\u201313 — means of cutting off supply and isolation.',
      immediate_actions:
        'Stop all work on the affected circuit immediately. Re-verify isolation using GS38-compliant test instruments \u2014 test instrument on known live source, test the circuit, re-test on known live source. Apply lock-off with personal padlock and danger tags. Identify all supply sources including back-feeds.',
      preventive_measures:
        'Reinforce the 3-point safe isolation procedure per GS38. Verify single-line diagrams are accurate and up to date. Check for alternative/standby supplies, UPS systems, and generators. Ensure all operatives carry personal lock-off kits. Review BS 7671 Reg 537.2 isolation requirements.',
      likelihood: 4,
    },
  },
  {
    id: 'nm-cable-strike',
    name: 'Cable Strike (Buried Services)',
    description:
      'Near miss involving a strike or near-strike on underground cables or services',
    regulation_refs: ['HSG47', 'PAS 128', 'BS 7671 Reg 522.6'],
    template_data: {
      category: 'worksite_hazard',
      severity: 'critical',
      description:
        'Near miss — a buried cable, pipe, or service was struck or nearly struck during excavation or ground disturbance work. Includes situations where a CAT/Genny scan was not performed, service drawings were not consulted, or hand-digging was not used within the required zone.',
      potential_consequences:
        'Electric shock or electrocution from severed power cables. Gas explosion from ruptured gas main. Flooding from water main strike. Loss of communications from fibre/telecom damage. Ref: HSG47 Avoiding danger from underground services.',
      immediate_actions:
        'Stop excavation immediately. Evacuate the area if gas smell detected. Do not touch damaged cables. Contact utility emergency numbers. Cordon off the area. Report to principal contractor and site manager.',
      preventive_measures:
        'Mandatory CAT & Genny scan before any ground disturbance per HSG47. Obtain up-to-date service drawings from all utility providers. Use PAS 128 survey for high-risk areas. Hand-dig within 500mm of identified services. Mark service routes with paint/markers. Brief all operatives on buried service locations.',
      likelihood: 3,
    },
  },
  {
    id: 'nm-fall-height',
    name: 'Fall from Height',
    description:
      'Near miss involving a potential fall from height during electrical work',
    regulation_refs: ['WAH Regs 2005', 'INDG401', 'CDM 2015 Reg 10'],
    template_data: {
      category: 'fall_hazard',
      severity: 'high',
      description:
        'Near miss — a person nearly fell from height during electrical work. Includes ladder slips, scaffold platform issues, fragile roof surfaces, unprotected edges, or inadequate access equipment for the task.',
      potential_consequences:
        'Serious injury or fatality from fall. Falls from height remain the single largest cause of workplace fatalities in the UK. Even falls from below 2m can result in serious injury. Ref: Work at Height Regulations 2005.',
      immediate_actions:
        'Cease work at height. Inspect access equipment for defects. Secure the area. Review risk assessment and method statement. Report to site supervisor.',
      preventive_measures:
        'Apply the WAH Regs 2005 hierarchy: avoid work at height where possible; use work platforms with guard rails; use fall prevention (harness with short lanyard); use fall mitigation (safety nets, airbags). Inspect all access equipment before each use per INDG401. Consider MEWP or tower scaffold instead of ladders. Ensure CDM 2015 Reg 10 compliance for working at height planning.',
      likelihood: 3,
    },
  },
  {
    id: 'nm-asbestos',
    name: 'Asbestos Encounter',
    description:
      'Suspected or confirmed asbestos-containing materials encountered during electrical work',
    regulation_refs: ['CAR 2012', 'HSG264', 'HSG248'],
    template_data: {
      category: 'chemical_exposure',
      severity: 'critical',
      description:
        'Near miss — suspected or confirmed asbestos-containing materials (ACMs) were encountered during electrical installation or maintenance work. Common locations: behind distribution boards, in ceiling tiles, cable routes through asbestos insulation board (AIB), textured coatings (Artex pre-2000), flash guards.',
      potential_consequences:
        'Asbestosis, mesothelioma, lung cancer \u2014 all with long latency periods (15\u201360 years). Any disturbance of ACMs releases respirable fibres. There is no safe exposure level. Ref: Control of Asbestos Regulations 2012.',
      immediate_actions:
        'STOP all work immediately. Do not disturb the material further. Evacuate the area and prevent access. Do not attempt to clean up. Report to dutyholder/client. Arrange for asbestos survey by UKAS-accredited surveyor. If exposure suspected, record names of all persons present.',
      preventive_measures:
        'Check asbestos register/management survey before starting ANY work in pre-2000 buildings per CAR 2012 Reg 4. Follow HSG264 asbestos survey guidance. If no survey exists, presume materials contain asbestos. Include asbestos check in pre-work risk assessment. Ensure all operatives hold valid asbestos awareness training (mandatory for anyone liable to disturb ACMs).',
      likelihood: 3,
    },
  },
  {
    id: 'nm-fire-electrical',
    name: 'Fire Risk from Electrical Fault',
    description:
      'Near miss involving an electrical fault that could have caused a fire',
    regulation_refs: ['BS 7671 Chapter 42', 'RRO 2005', 'EAWR 1989 Reg 5'],
    template_data: {
      category: 'fire_risk',
      severity: 'high',
      description:
        'Near miss — an electrical fault was discovered that could have resulted in fire. Includes loose connections causing overheating, overloaded circuits, damaged cable insulation, incorrect protective device ratings, or evidence of thermal damage (discolouration, melting).',
      potential_consequences:
        'Fire, explosion, property damage, injury or death. Electrical faults are a leading cause of fires in commercial and domestic premises. Ref: BS 7671 Chapter 42 \u2014 protection against thermal effects.',
      immediate_actions:
        'Isolate the affected circuit. Allow any overheated components to cool. Inspect for fire damage or scorching. Check protective devices operated correctly. Thermal survey of affected area if available. Report to responsible person.',
      preventive_measures:
        'Verify protective device ratings per BS 7671 Reg 432. Check all connections are tight (torque settings per manufacturer). Ensure cable ratings match protective device settings per BS 7671 Appendix 4. Consider AFDDs (Arc Fault Detection Devices) per BS 7671 Reg 421.1.7. Review fire detection and alarm systems per BS 5839. Ensure compliance with RRO 2005 for non-domestic premises.',
      likelihood: 3,
    },
  },
  {
    id: 'nm-test-equipment',
    name: 'Test Equipment Failure',
    description:
      'Near miss involving failure or inadequacy of electrical test instruments',
    regulation_refs: ['GS38', 'BS EN 61010', 'EAWR 1989 Reg 4'],
    template_data: {
      category: 'tool_equipment',
      severity: 'high',
      description:
        'Near miss — electrical test equipment failed, was found to be defective, or did not meet GS38 requirements. Includes blown fuses in voltage indicators, damaged probe insulation, incorrect CAT rating for the application, out-of-calibration instruments, or non-approved test leads.',
      potential_consequences:
        'False "dead" reading leading to contact with live conductors. Electric shock from inadequate probe insulation. Arc flash from non-fused test leads. Incorrect test results leading to unsafe installation. Ref: GS38 \u2014 Electrical test equipment for use on low voltage electrical installations.',
      immediate_actions:
        'Withdraw defective equipment from service immediately. Tag as "DO NOT USE". Re-test using known-good instruments. Review all test results taken with the suspect equipment. Inform all team members.',
      preventive_measures:
        'Pre-use check of all test instruments before each use per GS38: inspect leads for damage, check fuses, verify on known live source. Use only test leads with fused probes, finger guards, and spring-loaded shrouded tips. Ensure instruments are rated to at least CAT III for LV distribution work. Maintain calibration records (annual recommended). Replace test leads at first sign of damage \u2014 do not repair.',
      likelihood: 3,
    },
  },
];
