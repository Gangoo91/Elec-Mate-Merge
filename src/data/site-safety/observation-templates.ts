/**
 * Regulation-referenced safety observation templates for UK electrical work.
 *
 * References:
 *  - GS38       HSE Guidance — Electrical test equipment for use on LV installations
 *  - BS 7671    Requirements for Electrical Installations (18th Edition)
 *  - PPER 2022  Personal Protective Equipment at Work Regulations
 *  - CDM 2015   Construction (Design and Management) Regulations
 *  - WAH Regs   Work at Height Regulations 2005
 *  - MHOR 1992  Manual Handling Operations Regulations
 *  - HASAWA     Health and Safety at Work etc. Act 1974
 *  - SHWR 1996  Safety, Health and Welfare at Work Regulations
 *  - BS EN ISO 7010  Graphical symbols — Safety signs
 */

import type { StandardTemplate } from './near-miss-templates';

export const OBSERVATION_STANDARD_TEMPLATES: StandardTemplate[] = [
  {
    id: 'obs-safe-isolation',
    name: 'Safe Isolation Practice',
    description:
      'Observe and assess safe isolation procedure compliance per GS38',
    regulation_refs: ['GS38', 'BS 7671 Reg 537', 'EAWR 1989 Reg 12-13'],
    template_data: {
      observationType: 'improvement_needed',
      category: 'Electrical Safety',
      severity: 'high',
      description:
        'Observation of safe isolation procedure.\n\nCheck:\n1. Approved voltage indicator used meeting GS38 \u2014 fused probes with finger guards, CAT III/IV rated\n2. Three-point test procedure followed \u2014 prove instrument on known live, test circuit, re-prove on known live\n3. Lock-off applied with personal padlock\n4. Danger tags fitted\n5. All sources of supply identified including back-feeds\n6. Isolation verified at the point of work, not just at the isolator',
    },
  },
  {
    id: 'obs-ppe-compliance',
    name: 'PPE Compliance Audit',
    description:
      'Assess PPE usage against task risk assessment and PPER 2022',
    regulation_refs: ['PPER 2022', 'BS EN 166', 'BS EN 388', 'BS EN ISO 20345'],
    template_data: {
      observationType: 'improvement_needed',
      category: 'PPE Usage',
      severity: 'medium',
      description:
        'PPE compliance observation.\n\nCheck:\n1. Correct PPE worn for the task as identified in risk assessment\n2. PPE in good condition \u2014 no damage, within service life\n3. PPE fits correctly and is worn properly\n4. Safety footwear to BS EN ISO 20345 (S3 minimum for site work)\n5. Eye protection to BS EN 166 where required\n6. Gloves appropriate to hazard \u2014 insulating gloves for live work, chemical-resistant for COSHH substances\n7. RPE face-fit tested within last 2 years if required',
    },
  },
  {
    id: 'obs-housekeeping',
    name: 'Housekeeping & Cable Management',
    description:
      'Assess site tidiness, cable routes, and material storage per CDM 2015',
    regulation_refs: ['CDM 2015', 'BS 7671 Reg 134', 'WHSR 1992 Reg 12'],
    template_data: {
      observationType: 'improvement_needed',
      category: 'Housekeeping',
      severity: 'low',
      description:
        'Housekeeping and cable management observation.\n\nCheck:\n1. Work area clean and free from trip hazards \u2014 cable offcuts, packaging, tools\n2. Temporary cables properly routed and protected per BS 7671 Reg 522.8\n3. Materials stored safely \u2014 not blocking access/egress routes\n4. Waste segregated correctly (WEEE, general, hazardous)\n5. Fire escape routes clear at all times per RRO 2005\n6. Cable containment installed neatly per BS 7671 Reg 134 workmanship requirements\n7. Distribution boards kept locked when unattended',
    },
  },
  {
    id: 'obs-working-height',
    name: 'Working at Height Setup',
    description:
      'Observe working at height equipment and practices per WAH Regs 2005',
    regulation_refs: ['WAH Regs 2005', 'INDG401', 'INDG455'],
    template_data: {
      observationType: 'improvement_needed',
      category: 'Working at Height',
      severity: 'high',
      description:
        'Working at height observation.\n\nCheck:\n1. WAH hierarchy followed \u2014 can the task be done from ground level?\n2. Ladder in good condition \u2014 stiles straight, rungs secure, feet intact\n3. Ladder at correct angle (1:4 ratio / 75\u00B0) and secured\n4. Three points of contact maintained when climbing\n5. Platform/scaffold has guard rails, mid-rails, and toe boards\n6. Scaffold tag shows current inspection (every 7 days per WAH Regs)\n7. MEWP operators hold valid IPAF licence\n8. Tools secured with lanyards to prevent drops',
    },
  },
  {
    id: 'obs-installation-quality',
    name: 'Electrical Installation Quality',
    description:
      'Observe electrical workmanship and installation standards per BS 7671',
    regulation_refs: ['BS 7671 Reg 134', 'BS 7671 Reg 526', 'BS 7671 Ch 52'],
    template_data: {
      observationType: 'positive',
      category: 'Safe Working Practice',
      severity: 'low',
      description:
        'Electrical installation quality observation.\n\nCheck:\n1. Cables selected and installed per BS 7671 Chapter 52 \u2014 correct current-carrying capacity, appropriate grouping factors applied\n2. Connections made per BS 7671 Reg 526 \u2014 correct termination methods, torque settings applied\n3. Cable containment neat and properly supported at required intervals\n4. Circuits correctly identified and labelled per BS 7671 Reg 514\n5. Appropriate IP rating maintained for enclosures\n6. Fire barriers and seals reinstated where cables penetrate fire compartments per BS 7671 Reg 527\n7. Workmanship to a good standard per Reg 134',
    },
  },
  {
    id: 'obs-manual-handling',
    name: 'Manual Handling Practice',
    description:
      'Observe manual handling techniques per MHOR 1992',
    regulation_refs: ['MHOR 1992', 'INDG143', 'L23'],
    template_data: {
      observationType: 'improvement_needed',
      category: 'Manual Handling',
      severity: 'medium',
      description:
        'Manual handling observation.\n\nCheck:\n1. Task risk assessment completed for heavy items \u2014 cable drums, distribution boards, containment\n2. Correct lifting technique used \u2014 bend knees, straight back, load close to body\n3. Team lifts used for loads over 25kg\n4. Mechanical aids used where available \u2014 trolleys, cable drum stands, block and tackle\n5. Route clear before moving loads\n6. Load weight known \u2014 check drum/packaging labels\n7. Operative has received manual handling training',
    },
  },
  {
    id: 'obs-tags-signage',
    name: 'Danger Tags & Signage',
    description:
      'Observe safety signage, danger tags, and warning labels compliance',
    regulation_refs: ['HASAWA 1974 Sec 9', 'SHWR 1996', 'BS EN ISO 7010'],
    template_data: {
      observationType: 'improvement_needed',
      category: 'Communication',
      severity: 'medium',
      description:
        'Danger tags and signage observation.\n\nCheck:\n1. Danger tags applied to all isolated circuits \u2014 clearly show who applied, date, reason\n2. "Danger \u2014 Do Not Switch On" labels on all locked-off isolators\n3. Safety signs comply with BS EN ISO 7010 \u2014 correct shape, colour, and pictogram\n4. Fire exit signs illuminated and visible per BS 5266\n5. Hazard warning signs displayed at DB boards and switch rooms\n6. Temporary construction signage in place per CDM 2015\n7. Permit-to-work displayed at point of work where applicable',
    },
  },
  {
    id: 'obs-test-equipment',
    name: 'Test Equipment Condition',
    description:
      'Observe electrical test instrument condition and compliance per GS38',
    regulation_refs: ['GS38', 'BS EN 61010', 'BS EN 61557'],
    template_data: {
      observationType: 'improvement_needed',
      category: 'Tool Handling',
      severity: 'high',
      description:
        'Test equipment condition observation.\n\nCheck:\n1. Voltage indicator meets GS38 \u2014 fused probes (<20mm exposed tip), finger guards, CAT III/IV rated, GS38-compliant leads\n2. Test leads undamaged \u2014 no cracked insulation, no exposed conductors, spring-loaded shrouded tips\n3. Calibration in date \u2014 check label/certificate (annual recommended per BS EN 61557)\n4. Proving unit available (or known live source identified for proving)\n5. Instruments appropriate for the task \u2014 correct measurement range and category\n6. MFT (multi-function tester) has valid calibration certificate\n7. Instruments stored properly \u2014 protective case, leads not coiled tightly',
    },
  },
];
