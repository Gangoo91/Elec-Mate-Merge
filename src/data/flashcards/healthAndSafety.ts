import { FlashcardData } from './types';

export const healthAndSafety: FlashcardData[] = [
  // === HASAWA — Health and Safety at Work Act 1974 ===
  {
    id: 'hs1',
    question: 'What is the Health and Safety at Work Act 1974 (HASAWA) and why is it important?',
    answer:
      'HASAWA is the primary piece of UK legislation covering occupational health and safety. It places general duties on employers, employees, contractors, and self-employed persons to ensure the health, safety, and welfare of all persons at work and those affected by work activities. It is an enabling Act, meaning more specific regulations (such as COSHH and RIDDOR) are made under it.',
    category: 'HASAWA',
    difficulty: 'easy',
  },
  {
    id: 'hs2',
    question: 'Under Section 2 of HASAWA, what are the main duties of an employer?',
    answer:
      'Section 2 requires employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of all their employees. This includes providing and maintaining safe plant and systems of work, safe handling and storage of substances, adequate information, instruction, training and supervision, a safe place of work with safe access and egress, and a safe working environment.',
    category: 'HASAWA',
    difficulty: 'medium',
  },
  {
    id: 'hs3',
    question: 'What duties do employees have under Section 7 of HASAWA?',
    answer:
      'Section 7 requires every employee to take reasonable care for the health and safety of themselves and other persons who may be affected by their acts or omissions at work. Employees must also co-operate with their employer so far as is necessary to enable the employer to comply with any health and safety duty or requirement imposed by law.',
    category: 'HASAWA',
    difficulty: 'easy',
  },
  {
    id: 'hs4',
    question: 'What does Section 8 of HASAWA prohibit?',
    answer:
      'Section 8 states that no person shall intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare. For example, an employee who removes a guard from a machine or tampers with fire extinguishers would be committing an offence under this section. The offence applies to everyone, not just employees.',
    category: 'HASAWA',
    difficulty: 'medium',
  },
  {
    id: 'hs5',
    question: 'Under Section 3 of HASAWA, what duty does an employer owe to non-employees?',
    answer:
      'Section 3 requires every employer to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment (such as visitors, members of the public, or other contractors on site) are not exposed to risks to their health or safety. This is particularly relevant on construction sites where multiple trades work alongside each other.',
    category: 'HASAWA',
    difficulty: 'medium',
  },
  {
    id: 'hs6',
    question: 'What does Section 9 of HASAWA say about charging employees for safety provisions?',
    answer:
      "Section 9 prohibits employers from charging employees for anything provided or done in pursuance of any specific health and safety requirement. For example, an employer cannot deduct the cost of PPE from an employee's wages if that PPE is required by law. Any safety equipment, training, or measures mandated by legislation must be provided at no cost to the worker.",
    category: 'HASAWA',
    difficulty: 'hard',
  },

  // === CDM — Construction (Design and Management) Regulations 2015 ===
  {
    id: 'hs7',
    question: 'What are the CDM Regulations 2015 and when do they apply?',
    answer:
      'The Construction (Design and Management) Regulations 2015 apply to all construction work in the UK, regardless of size or duration. They aim to improve health and safety in construction by requiring all duty holders — including clients, designers, principal designers, principal contractors, and contractors — to plan, manage, and co-ordinate work to reduce risks throughout the project lifecycle.',
    category: 'CDM',
    difficulty: 'easy',
  },
  {
    id: 'hs8',
    question: 'What is the role of the Principal Designer under CDM 2015?',
    answer:
      'The Principal Designer is appointed by the client on projects involving more than one contractor. They must plan, manage, and co-ordinate the pre-construction phase, including identifying and eliminating or controlling foreseeable risks. They are responsible for ensuring designers comply with their duties and for preparing and updating the health and safety file, which is handed to the client on completion.',
    category: 'CDM',
    difficulty: 'hard',
  },
  {
    id: 'hs9',
    question: 'What is the role of the Principal Contractor under CDM 2015?',
    answer:
      'The Principal Contractor is appointed by the client for projects with more than one contractor. They must plan, manage, and co-ordinate the construction phase to ensure work is carried out safely. Their duties include preparing the construction phase plan, organising co-operation between contractors, ensuring suitable site inductions are provided, and preventing unauthorised access to the site.',
    category: 'CDM',
    difficulty: 'hard',
  },
  {
    id: 'hs10',
    question: 'What is the construction phase plan required by CDM 2015?',
    answer:
      'The construction phase plan is a document that sets out the arrangements for managing health and safety during the construction phase. It must be prepared by the principal contractor (or the sole contractor on single-contractor projects) before the construction phase begins. It covers site rules, specific risk management measures, welfare arrangements, and emergency procedures relevant to the project.',
    category: 'CDM',
    difficulty: 'medium',
  },

  // === PPE — Personal Protective Equipment ===
  {
    id: 'hs11',
    question: 'What is the hierarchy of controls and where does PPE sit within it?',
    answer:
      'The hierarchy of controls ranks risk reduction measures from most effective to least effective: elimination, substitution, engineering controls, administrative controls (including signage, training, and safe systems of work), and finally PPE. PPE is the last resort because it only protects the individual wearing it and depends on correct selection, fitting, and use. Employers must always try higher-level controls first.',
    category: 'PPE',
    difficulty: 'medium',
  },
  {
    id: 'hs12',
    question:
      'What changed with the Personal Protective Equipment at Work (Amendment) Regulations 2022?',
    answer:
      'The 2022 amendment extended PPE duties to workers as well as employees, covering agency workers, casual workers, and some self-employed persons. Previously, the regulations only applied to employees. The amendment ensures that all workers, regardless of their employment status, are provided with suitable PPE by the person for whom they are working, at no charge to the worker.',
    category: 'PPE',
    difficulty: 'medium',
  },
  {
    id: 'hs13',
    question: "What are an employer's duties regarding PPE under the PPE at Work Regulations?",
    answer:
      'Employers must assess the risks that cannot be controlled by other means, select PPE that is suitable for those risks and the working conditions, provide it free of charge, ensure it fits properly and is compatible with other PPE worn, provide training and information on its use, maintain and replace it as necessary, and provide suitable storage facilities for it.',
    category: 'PPE',
    difficulty: 'easy',
  },

  // === COSHH — Control of Substances Hazardous to Health ===
  {
    id: 'hs14',
    question: 'What are the COSHH Regulations 2002 and what do they require?',
    answer:
      'The Control of Substances Hazardous to Health Regulations 2002 require employers to assess the risks from hazardous substances in the workplace and take appropriate measures to prevent or adequately control exposure. Hazardous substances include chemicals, fumes, dusts, vapours, mists, gases, and biological agents. Employers must carry out COSHH assessments, implement control measures, and monitor exposure where necessary.',
    category: 'COSHH',
    difficulty: 'easy',
  },
  {
    id: 'hs15',
    question: 'What is a Safety Data Sheet (SDS) and when must it be consulted?',
    answer:
      "A Safety Data Sheet is a document provided by the manufacturer or supplier of a hazardous substance. It contains detailed information about the substance's properties, hazards, safe handling and storage requirements, exposure controls, first aid measures, and disposal procedures. An SDS must be consulted as part of any COSHH assessment before the substance is used on site, and it must be readily accessible to all workers who may come into contact with the substance.",
    category: 'COSHH',
    difficulty: 'medium',
  },
  {
    id: 'hs16',
    question:
      'Give two examples of hazardous substances an electrician might encounter on site and the controls required.',
    answer:
      'PVC cable dust created when cutting or chasing can irritate the respiratory system — controls include using dust extraction or RPE (respiratory protective equipment) and ensuring adequate ventilation. Solvent-based adhesives or cleaning agents used for conduit joining or degreasing components can cause skin irritation and produce harmful vapours — controls include wearing chemical-resistant gloves, using in well-ventilated areas, and following the SDS guidance for exposure limits.',
    category: 'COSHH',
    difficulty: 'hard',
  },

  // === RIDDOR — Reporting of Injuries, Diseases and Dangerous Occurrences ===
  {
    id: 'hs17',
    question: "What does RIDDOR 2013 require and who is the 'responsible person' for reporting?",
    answer:
      'The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 require certain workplace accidents, occupational diseases, and dangerous occurrences to be reported to the HSE. The responsible person is the employer, the self-employed person, or the person in control of the premises where the event occurred. Reports must be made online via the HSE website or by telephone for fatalities and major incidents.',
    category: 'Reporting',
    difficulty: 'medium',
  },
  {
    id: 'hs18',
    question: 'What types of injuries are reportable under RIDDOR 2013?',
    answer:
      'Reportable injuries include fatalities, specified injuries (such as fractures other than to fingers, thumbs, and toes; amputations; crush injuries to the head or torso; loss of sight; and burns causing hypothermia, unconsciousness, or requiring resuscitation), over-7-day incapacitation injuries (where a worker is unable to perform their normal duties for more than seven consecutive days), and injuries to non-workers that require them to be taken to hospital for treatment.',
    category: 'Reporting',
    difficulty: 'hard',
  },
  {
    id: 'hs19',
    question:
      "What is a 'dangerous occurrence' under RIDDOR, and give an example relevant to electrical work?",
    answer:
      'A dangerous occurrence is a specific near-miss event listed in Schedule 2 of RIDDOR that had the potential to cause death or serious injury, even if no one was actually hurt. An example relevant to electrical work is an uncontrolled electrical short circuit or explosion causing a fire or which required the supply to be isolated, or any incident involving accidental contact with overhead power lines during construction work. These must be reported to the HSE immediately.',
    category: 'Reporting',
    difficulty: 'hard',
  },

  // === Electricity at Work Regulations 1989 ===
  {
    id: 'hs20',
    question:
      'What are the Electricity at Work Regulations 1989 and which regulation is most relevant to electricians carrying out work?',
    answer:
      'The Electricity at Work Regulations 1989 (EAWR) impose duties on employers, employees, and the self-employed to prevent danger from electricity in the workplace. Regulation 14 is particularly important — it states that no person shall work on or near any live conductor unless it is dead and disconnected, or where it is unreasonable for it to be dead, suitable precautions are taken. This underpins all safe isolation procedures.',
    category: 'HASAWA',
    difficulty: 'medium',
  },
  {
    id: 'hs21',
    question:
      'Under the Electricity at Work Regulations 1989, what does Regulation 4 require regarding electrical systems?',
    answer:
      'Regulation 4 requires that all electrical systems shall at all times be of such construction as to prevent danger, so far as is reasonably practicable. Additionally, all systems must be maintained so as to prevent danger. This means electrical installations must be designed, installed, and kept in a condition that does not give rise to a risk of death or injury from electric shock, burns, fire, or explosion.',
    category: 'HASAWA',
    difficulty: 'hard',
  },

  // === Risk Assessment and Method Statements (RAMS) ===
  {
    id: 'hs22',
    question: 'What are the five steps to risk assessment as recommended by the HSE?',
    answer:
      'The five steps are: (1) identify the hazards, (2) decide who might be harmed and how, (3) evaluate the risks and decide on control measures, (4) record your findings and implement them, and (5) review the assessment and update if necessary. The Management of Health and Safety at Work Regulations 1999 require employers to carry out suitable and sufficient risk assessments for all work activities.',
    category: 'Risk Assessment',
    difficulty: 'easy',
  },
  {
    id: 'hs23',
    question: 'What is a RAMS document and when is it required on a construction site?',
    answer:
      'RAMS stands for Risk Assessment and Method Statement. A risk assessment identifies hazards and evaluates the level of risk, whilst the method statement describes the safe system of work — the step-by-step procedure for carrying out the task safely. RAMS are typically required before any significant work activity begins on a construction site. They must be specific to the task and site, communicated to all workers involved, and reviewed if conditions change.',
    category: 'Risk Assessment',
    difficulty: 'easy',
  },

  // === Fire Safety ===
  {
    id: 'hs24',
    question:
      'What fire safety precautions are required on a construction site under the Regulatory Reform (Fire Safety) Order 2005?',
    answer:
      'The responsible person must carry out a fire risk assessment, ensure adequate means of escape are provided and maintained, provide appropriate fire detection and alarm systems, ensure suitable firefighting equipment is available and maintained, provide emergency lighting where necessary, deliver fire safety training to all workers, and display clear fire action notices. On construction sites, particular attention must be paid to hot works permits, storage of flammable materials, and maintaining clear escape routes as the building changes.',
    category: 'Risk Assessment',
    difficulty: 'hard',
  },

  // === Manual Handling ===
  {
    id: 'hs25',
    question: 'What do the Manual Handling Operations Regulations 1992 require?',
    answer:
      'These regulations require employers to avoid the need for hazardous manual handling so far as is reasonably practicable, assess the risk of injury from any manual handling that cannot be avoided, and reduce the risk to the lowest level reasonably practicable. Assessments should consider the task, the individual, the load, and the environment (remembered by the acronym TILE). For electricians, this is relevant when handling cable drums, distribution boards, and heavy conduit runs.',
    category: 'Risk Assessment',
    difficulty: 'medium',
  },

  // === First Aid ===
  {
    id: 'hs26',
    question:
      'What first aid provision is required under the Health and Safety (First-Aid) Regulations 1981?',
    answer:
      'Employers must provide adequate and appropriate first aid equipment, facilities, and personnel to ensure their employees receive immediate attention if they are injured or taken ill at work. The level of provision depends on the risk assessment — low-risk workplaces may only need a first aid kit and an appointed person, whereas higher-risk environments such as construction sites typically require trained first aiders, a stocked first aid room, and an AED (automated external defibrillator).',
    category: 'Risk Assessment',
    difficulty: 'easy',
  },

  // === COSHH (additional) ===
  {
    id: 'hs27',
    question: 'What are Workplace Exposure Limits (WELs) and how do they relate to COSHH?',
    answer:
      'Workplace Exposure Limits are the maximum concentrations of hazardous substances in the air that workers may be exposed to over a specified reference period, published in HSE document EH40. Under COSHH, employers must ensure that exposure to hazardous substances does not exceed the relevant WEL. If a substance has a WEL, the employer must monitor exposure levels where the assessment indicates it is necessary, and provide health surveillance for workers where appropriate.',
    category: 'COSHH',
    difficulty: 'hard',
  },

  // === CDM (additional) ===
  {
    id: 'hs28',
    question:
      'What duties does a contractor (including an electrical contractor) have under CDM 2015?',
    answer:
      'Every contractor must plan, manage, and monitor their own work to ensure it is carried out without risks to health and safety. They must comply with the directions of the principal contractor, co-operate with other contractors on site, ensure their workers have appropriate skills, knowledge, training, and supervision, report anything likely to endanger health or safety, provide suitable welfare facilities for their workers, and not begin work unless satisfied that adequate welfare facilities are in place.',
    category: 'CDM',
    difficulty: 'medium',
  },
];
