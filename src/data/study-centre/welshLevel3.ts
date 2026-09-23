/**
 * Welsh Level 3 — Building Services Engineering: Electrotechnical Installation.
 *
 * The course tree, parsed from the awarding body's qualification handbook
 * (23 September 2026) and cross-checked against its RPL mapping document:
 * 16 units, 916 taught GLH, 63 knowledge outcomes, 204 assessment criteria and
 * 81 performance outcomes. Adding the 131 assessment hours gives the published
 * 1,047 GLH for the qualification.
 *
 * Structure follows the qualification rather than our own course conventions,
 * because the whole point of this course is that a Welsh learner sees their own
 * unit codes on every page:
 *
 *   module     = unit            /study-centre/apprentice/welsh-level3/319e
 *   section    = learning outcome  …/319e/lo2
 *   subsection = assessment criterion  …/319e/lo2/2-3
 *
 * The handbook's performance outcomes are deliberately NOT pages. They are
 * signed off at work through the employer-set practical project, so a unit that
 * carries them says so on its landing page and stops there — reproducing the
 * assessment is not what a study centre is for. `evidencedAtWork` carries that.
 *
 * 🔴 This is an EAL qualification and we hold no EAL mapping, endorsement or
 * approval. Describe what the content covers, never whose badge is on it.
 *
 * ⚠️ Generated scaffold. Unit, outcome and criteria text is parsed from the
 * handbook and is provisional — confirm a unit against the handbook before
 * writing its content.
 */

/** Where a unit's content has to come from. */
export type UnitStatus =
  /** Existing Level 2 or Level 3 lessons cover this. */
  | 'reuse'
  /** Existing lessons probably cover it, but coverage has not been proven. */
  | 'verify'
  /** Nothing in the Study Centre covers this — it has to be written. */
  | 'write'
  /** Evidenced on site; no taught content required. */
  | 'practical';

export type UnitKind = 'wales' | 'electrical' | 'safety';

export interface WelshSubsection {
  /** Criterion code as the handbook numbers it, e.g. "2.3". */
  code: string;
  /** URL segment — the criterion code with the dot as a hyphen. */
  slug: string;
  title: string;
}

export interface WelshSection {
  /** "lo1", "lo2" — the learning outcome this section teaches. */
  slug: string;
  /** Outcome number as the handbook numbers it. */
  outcome: string;
  title: string;
  subsections: WelshSubsection[];
}

export interface WelshUnit {
  /** Unit code as the handbook numbers it, e.g. "319E". */
  code: string;
  /** URL segment — the unit code, lower case. */
  slug: string;
  title: string;
  /** Guided learning hours for the unit. */
  glh: number;
  kind: UnitKind;
  status: UnitStatus;
  /** Where the material for this unit comes from, in plain words. */
  sourceNote: string;
  /**
   * Part of this unit is signed off at work through the employer-set practical
   * project. We say that it happens; we do not reproduce the project brief —
   * this is a study centre, not the assessment.
   */
  evidencedAtWork: boolean;
  sections: WelshSection[];
}

export const WELSH_L3_BASE = '/study-centre/apprentice/welsh-level3';

/** Assessment hours that sit outside the taught units. */
export const WELSH_L3_ASSESSMENT_GLH = 131;

export const WELSH_L3_UNITS: WelshUnit[] = [
  {
    code: '301',
    slug: '301',
    title: 'Understanding Building Services Engineering Practice in Wales',
    glh: 40,
    kind: 'wales',
    status: 'write',
    evidencedAtWork: false,
    sourceNote:
      'L3 Module 7 \u2014 Career awareness carries trade bodies, competence cards and EngTech registration. The Welsh built environment is new writing.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title:
          'Know the relevant trade bodies and organisations within the building services engineering sector',
        subsections: [
          {
            code: '1.1',
            slug: '1-1',
            title: 'The trade bodies and organisations relevant to the trade',
          },
          {
            code: '1.2',
            slug: '1-2',
            title: 'The role of the relevant trade bodies and organisations',
          },
          {
            code: '1.3',
            slug: '1-3',
            title:
              'The competence card schemes within the building services engineering sector and the types of cards available',
          },
          {
            code: '1.4',
            slug: '1-4',
            title: 'Professional registration as an Engineering Technician',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title: 'Understand connected practice in construction and building services engineering',
        subsections: [{ code: '2.1', slug: '2-1', title: 'Interdependencies between trades' }],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title: 'Know the changing construction and built environment sector',
        subsections: [
          { code: '3.1', slug: '3-1', title: 'The factors influencing pre-1919 construction' },
          {
            code: '3.2',
            slug: '3-2',
            title: 'The factors influencing post 1919 to modern construction',
          },
          { code: '3.3', slug: '3-3', title: 'The factors influencing 21st century construction' },
        ],
      },
      {
        slug: 'lo4',
        outcome: '4',
        title:
          'Know the changes in building services engineering materials, tools, and techniques over time',
        subsections: [
          {
            code: '4.1',
            slug: '4-1',
            title:
              'The considerations required when performing building services engineering work on pre1919 buildings and structures',
          },
          {
            code: '4.2',
            slug: '4-2',
            title: 'Post-1919 and modern construction techniques and building services',
          },
          {
            code: '4.3',
            slug: '4-3',
            title:
              'The new and emerging technologies in the building services engineering trade and the impact they are having/may have on existing practice',
          },
        ],
      },
      {
        slug: 'lo5',
        outcome: '5',
        title: 'Understand the relationship between trades and the environment',
        subsections: [
          {
            code: '5.1',
            slug: '5-1',
            title: 'Industry regulation and sustainability and the natural environment',
          },
          { code: '5.2', slug: '5-2', title: 'Ecological considerations and principles' },
          { code: '5.3', slug: '5-3', title: 'Sustainable approaches' },
          { code: '5.4', slug: '5-4', title: 'Waste disposal in building services' },
        ],
      },
    ],
  },
  {
    code: '302',
    slug: '302',
    title: 'Working in The Building Services Engineering Sector in Wales',
    glh: 40,
    kind: 'wales',
    status: 'write',
    evidencedAtWork: false,
    sourceNote:
      'L2 Module 5 \u2014 Communication covers working effectively with others. The built environment in Wales is new writing.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title: 'Understand the built environment in Wales',
        subsections: [
          { code: '1.1', slug: '1-1', title: 'Building stock in Wales' },
          {
            code: '1.2',
            slug: '1-2',
            title: 'Factors influencing change in the built environment in Wales',
          },
          { code: '1.3', slug: '1-3', title: 'Safety of the built environment' },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title: 'Understand how to work effectively with others',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title: 'How to develop and maintain productive working relationships',
          },
          {
            code: '2.2',
            slug: '2-2',
            title:
              'How to communicate effectively with clients, employers, colleagues and with other stakeholders throughout built environment projects',
          },
        ],
      },
    ],
  },
  {
    code: '304',
    slug: '304',
    title: 'Planning and Evaluating Work in the Building Services Engineering Sector in Wales',
    glh: 35,
    kind: 'wales',
    status: 'write',
    evidencedAtWork: false,
    sourceNote: 'No City & Guilds unit corresponds to this. Written from scratch.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title: 'Plan the work required to complete the task(s)',
        subsections: [
          { code: '1.1', slug: '1-1', title: 'Organise the resources required' },
          { code: '1.2', slug: '1-2', title: 'Set success criteria for the task(s)' },
          { code: '1.3', slug: '1-3', title: 'Carry out effective planning' },
          {
            code: '1.4',
            slug: '1-4',
            title: 'Rationalise why the proposed approach is the most appropriate',
          },
          { code: '1.5', slug: '1-5', title: 'Recognise cost and waste implications of the work' },
          {
            code: '1.6',
            slug: '1-6',
            title:
              'Manage risks associated with completing the task and recognise the steps to be taken to stop risks becoming problems',
          },
          { code: '1.7', slug: '1-7', title: 'Identify the handover requirements of work' },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title: 'Evaluate the work completed against the task brief and success criteria',
        subsections: [
          { code: '2.1', slug: '2-1', title: 'Review the appropriateness of success criteria set' },
          { code: '2.2', slug: '2-2', title: 'Evaluate the resource selection and usage' },
          { code: '2.3', slug: '2-3', title: 'Evaluate the finished output' },
          { code: '2.4', slug: '2-4', title: 'Evaluate own performance' },
          { code: '2.5', slug: '2-5', title: 'Review the achievement of timescales' },
          { code: '2.6', slug: '2-6', title: 'Evaluate the handover' },
        ],
      },
    ],
  },
  {
    code: '303',
    slug: '303',
    title:
      'Understand Health and Safety and Environmental Legislation in The Building Services Engineering Sector',
    glh: 21,
    kind: 'safety',
    status: 'reuse',
    evidencedAtWork: false,
    sourceNote: 'L3 Module 1 \u2014 Health and safety, 36 lessons, plus L2 Module 1.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title: 'Understand appropriate industry standards and regulations',
        subsections: [
          { code: '1.1', slug: '1-1', title: 'Sources of information' },
          { code: '1.2', slug: '1-2', title: 'Health and safety/environmental legislation' },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title: 'Know your responsibilities in accordance with organisational procedures',
        subsections: [
          { code: '2.1', slug: '2-1', title: 'Members of the construction team' },
          { code: '2.2', slug: '2-2', title: 'Enforcing authorities' },
          { code: '2.3', slug: '2-3', title: 'Control measures of inspectors' },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title:
          'Understand the application, advantages, and limitations of different working practices',
        subsections: [{ code: '3.1', slug: '3-1', title: 'Working practices' }],
      },
      {
        slug: 'lo4',
        outcome: '4',
        title: 'Know how to recognise materials and substances that can potentially be harmful',
        subsections: [
          {
            code: '4.1',
            slug: '4-1',
            title: 'Common building materials and services components that may contain asbestos',
          },
          { code: '4.2', slug: '4-2', title: 'The types of asbestos' },
          { code: '4.3', slug: '4-3', title: 'Commonly encountered substances' },
        ],
      },
      {
        slug: 'lo5',
        outcome: '5',
        title:
          "Understand the documentation associated with the organisational procedures' requirements",
        subsections: [
          {
            code: '5.1',
            slug: '5-1',
            title: 'The strategies used to prevent accidents during work activities',
          },
        ],
      },
      {
        slug: 'lo6',
        outcome: '6',
        title:
          'Understand the organisational procedures for dealing with the presence of harmful materials and substances',
        subsections: [
          {
            code: '6.1',
            slug: '6-1',
            title:
              'The procedures that must be used to safely work with asbestos cement-based materials',
          },
        ],
      },
      {
        slug: 'lo7',
        outcome: '7',
        title:
          'Know where and how to locate relevant health and safety information needed to complete the installation and/or maintenance activi\u2026',
        subsections: [],
      },
      {
        slug: 'lo8',
        outcome: '8',
        title: 'Know what constitutes a hazard or risk',
        subsections: [
          { code: '8.1', slug: '8-1', title: 'Site hazards' },
          { code: '8.2', slug: '8-2', title: 'Common electrical dangers encountered' },
          { code: '8.3', slug: '8-3', title: 'General hazards' },
        ],
      },
      {
        slug: 'lo9',
        outcome: '9',
        title:
          'Understand the methods for handling of hazardous materials and substances in accordance with organisational procedures',
        subsections: [{ code: '9.1', slug: '9-1', title: 'Commonly encountered substances' }],
      },
      {
        slug: 'lo10',
        outcome: '10',
        title:
          "Understand the organisational procedures, suppliers' and manufacturers' instructions for safe use, maintenance, handling, transpo\u2026",
        subsections: [
          {
            code: '10.1',
            slug: '10-1',
            title:
              'Access equipment to permit work at heights Range; step ladders, ladders, harnesses, roof ladders and crawling boards, mobile tower scaffolds, fixed s\u2026',
          },
          { code: '10.2', slug: '10-2', title: 'Personal protective equipment (PPE)' },
          { code: '10.3', slug: '10-3', title: 'Excavations and confined spaces' },
        ],
      },
      {
        slug: 'lo11',
        outcome: '11',
        title: 'Understand the warning signs for hazardous materials and substances',
        subsections: [
          {
            code: '11.1',
            slug: '11-1',
            title:
              'How the hazards of some substances and mixtures can be identified from the labels on packaging',
          },
        ],
      },
      {
        slug: 'lo12',
        outcome: '12',
        title:
          'Understand the methods for the safe transport and/or disposal of waste material, substances, and liquids in accordance with: \u2022 or\u2026',
        subsections: [
          { code: '12.1', slug: '12-1', title: 'How to deal with commonly encountered substances' },
        ],
      },
      {
        slug: 'lo13',
        outcome: '13',
        title: 'Understand the organisational procedures relevant to reporting issues',
        subsections: [
          { code: '13.1', slug: '13-1', title: 'The procedures for reporting issues relating to' },
        ],
      },
    ],
  },
  {
    code: '304E',
    slug: '304e',
    title:
      'Understand How to Install Enclosures for Electrical Cables, Conductors and Wiring Systems',
    glh: 70,
    kind: 'electrical',
    status: 'reuse',
    evidencedAtWork: false,
    sourceNote:
      'L2 Module 3 \u2014 Installation technology and L2 Module 4 \u2014 Wiring systems and enclosures.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title:
          'Understand the operation, applications, advantages, and limitations of different electrical systems',
        subsections: [
          { code: '1.1', slug: '1-1', title: 'The types and requirements of typical circuits' },
          {
            code: '1.2',
            slug: '1-2',
            title: 'Earthing systems and earthing and protective conductors',
          },
          {
            code: '1.3',
            slug: '1-3',
            title: 'Devices used for safety and protection in electrical systems',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title:
          'Understand the appropriate industry standards, regulations, and requirements relevant to installing enclosures',
        subsections: [
          { code: '2.1', slug: '2-1', title: 'Industry standards and regulations' },
          {
            code: '2.2',
            slug: '2-2',
            title:
              'How to produce a risk assessment and method statement for the work to be carried out',
          },
          {
            code: '2.3',
            slug: '2-3',
            title:
              'How to verify that job information and documentation is current and relevant and that the plant, instruments, access equipment and tools are fit for\u2026',
          },
          {
            code: '2.4',
            slug: '2-4',
            title:
              'The applications, advantages, and limitations of types of personal protective equipment',
          },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title: 'Understand the applications, advantages, and limitations of types of enclosures',
        subsections: [
          {
            code: '3.1',
            slug: '3-1',
            title: 'The applications, advantages, and limitations of types of enclosures',
          },
          {
            code: '3.2',
            slug: '3-2',
            title:
              'The industry recognised methods for determining the type and size of enclosures',
          },
          {
            code: '3.3',
            slug: '3-3',
            title:
              'How to interpret diagrams and drawings to locate site services and identify the planned location of the enclosures and equipment',
          },
          {
            code: '3.4',
            slug: '3-4',
            title:
              'The methods and techniques for fitting, fixing, and connecting the selected enclosures and their components and accessories in accordance with',
          },
        ],
      },
    ],
  },
  {
    code: '305E',
    slug: '305e',
    title:
      'Understand How to Install and Connect Electrical Cables, Conductors, Wiring Systems and Equipment',
    glh: 67,
    kind: 'electrical',
    status: 'reuse',
    evidencedAtWork: false,
    sourceNote: 'L2 Module 3 and L2 Module 4.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title:
          'Understand the applications, advantages, and limitations of types of electrical cables, conductors, wiring systems, associated eq\u2026',
        subsections: [
          {
            code: '1.1',
            slug: '1-1',
            title: 'The applications, advantages, and limitations of electrical cables Range',
          },
          {
            code: '1.2',
            slug: '1-2',
            title: 'The requirements of industrial plugs, sockets, and couplers',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title:
          'Understand the industry recognised methods for determining the type, size and rating of electrical cables, conductors, wiring sys\u2026',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title:
              'How to determine the size and rating of electrical cables (basic single-phase circuits to non-reactive loads)',
          },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title:
          'Understand how to install and connect types of electrical cables, conductors, wiring systems, associated equipment, accessories,\u2026',
        subsections: [
          {
            code: '3.1',
            slug: '3-1',
            title:
              'The methods and techniques for installing and fixing electrical cables, conductors, wiring systems, associated equipment, accessories and components\u2026',
          },
          {
            code: '3.2',
            slug: '3-2',
            title:
              'The different types and methods of terminating and connecting electrical cables and conductors',
          },
        ],
      },
    ],
  },
  {
    code: '306E',
    slug: '306e',
    title: 'Understand How to Inspect and Test De-Energised Electrical Circuits',
    glh: 25,
    kind: 'electrical',
    status: 'reuse',
    evidencedAtWork: false,
    sourceNote: 'L2 Module 6 \u2014 Inspection and testing, plus L2 Module 4 sections 5 and 6.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title:
          'Understand how to select the instruments to be used for carrying out relevant tests',
        subsections: [
          {
            code: '1.1',
            slug: '1-1',
            title:
              'The test instruments required for de-energised tests on standard single-phase circuits',
          },
          {
            code: '1.2',
            slug: '1-2',
            title:
              'How to confirm that the test instruments are fit for purpose and have a current calibration certificate',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title:
          'Understand the methods and procedures for conducting a visual inspection on the enclosures cables, conductors and wiring systems',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title:
              'How to confirm the installed electrical equipment is located and secured correctly and electrically and mechanically sound',
          },
          {
            code: '2.2',
            slug: '2-2',
            title:
              'How to carry out a visual inspection of the main/key aspects of standard single-phase circuits',
          },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title: 'Understand the correct procedure for safe isolation',
        subsections: [{ code: '3.1', slug: '3-1', title: 'The safe isolation procedure' }],
      },
      {
        slug: 'lo4',
        outcome: '4',
        title:
          'Understand the methods and processes to carry out correctly the tests that ensure safe and efficient operation of the electrical\u2026',
        subsections: [
          {
            code: '4.1',
            slug: '4-1',
            title: 'How to carry out de-energised tests on standard single-phase circuits',
          },
        ],
      },
      {
        slug: 'lo5',
        outcome: '5',
        title: 'Understand methods for providing clear and accurate information to relevant people',
        subsections: [
          {
            code: '5.1',
            slug: '5-1',
            title:
              'How to record outcomes from basic inspections and dead tests clearly and accurately',
          },
        ],
      },
    ],
  },
  {
    code: '307E',
    slug: '307e',
    title: 'Understand Intermediate Electrical Science and Principles',
    glh: 80,
    kind: 'electrical',
    status: 'verify',
    evidencedAtWork: false,
    sourceNote:
      'L2 Module 2 \u2014 Principles of electrical science. Only 5 Level 2 lessons carry a criteria mapping, so coverage needs checking before it is claimed.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title:
          'Understand fundamental mathematical principles which are appropriate to electrical installation work',
        subsections: [
          {
            code: '1.1',
            slug: '1-1',
            title:
              'The appropriate mathematical principles which are relevant to electrical work tasks',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title:
          'Understand standard units of measurement used in electrical installation and design work',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title:
              'The internationally recognised base and derived (SI) units of measurement for general quantities',
          },
          {
            code: '2.2',
            slug: '2-2',
            title:
              'The values of base and derived SI units which apply specifically to electrical quantities',
          },
          {
            code: '2.3',
            slug: '2-3',
            title:
              'The appropriate electrical instruments for the measurement of different electrical quantities',
          },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title:
          'Understand basic mechanics and the relationship between force, work, energy and power',
        subsections: [
          { code: '3.1', slug: '3-1', title: 'What is meant by mass and weight' },
          {
            code: '3.2',
            slug: '3-2',
            title: 'The principles of basic mechanics as they apply to levers, gears, and pulleys',
          },
          {
            code: '3.3',
            slug: '3-3',
            title: 'The main principles of mechanical principles and their inter-relationships',
          },
          {
            code: '3.4',
            slug: '3-4',
            title: 'Calculation of mechanical energy, power, and efficiency',
          },
        ],
      },
      {
        slug: 'lo4',
        outcome: '4',
        title:
          'Understand the fundamental relationship between resistance, resistivity, voltage, current and power',
        subsections: [
          { code: '4.1', slug: '4-1', title: 'The basic principles of electron theory' },
          { code: '4.2', slug: '4-2', title: 'Materials which are good conductors and insulators' },
          {
            code: '4.3',
            slug: '4-3',
            title: 'What is meant by resistance and resistivity in relation to electrical circuits',
          },
          {
            code: '4.4',
            slug: '4-4',
            title:
              'The relationship between current, voltage and resistance in parallel and series D.C circuits',
          },
          {
            code: '4.5',
            slug: '4-5',
            title:
              'The values of current, voltage and resistance in parallel and series D.C circuits',
          },
          {
            code: '4.6',
            slug: '4-6',
            title: 'The values of power in parallel and series D.C circuits',
          },
          {
            code: '4.7',
            slug: '4-7',
            title: 'What is meant by the term voltage drop in relation to electrical circuits',
          },
          {
            code: '4.8',
            slug: '4-8',
            title: 'The chemical and thermal effects of electric currents',
          },
        ],
      },
      {
        slug: 'lo5',
        outcome: '5',
        title:
          'Understand fundamental principles which underpin the relationship between magnetism, electricity, generation, and supply systems',
        subsections: [
          {
            code: '5.1',
            slug: '5-1',
            title: 'The effects of magnetism in terms of attraction and repulsion',
          },
          {
            code: '5.2',
            slug: '5-2',
            title: 'The difference between magnetic flux and flux density',
          },
          {
            code: '5.3',
            slug: '5-3',
            title: 'The magnetic effects of electrical currents in terms of',
          },
          { code: '5.4', slug: '5-4', title: 'The basic principles of A.C generation in terms of' },
          { code: '5.5', slug: '5-5', title: 'The characteristics of sinewaves' },
          {
            code: '5.6',
            slug: '5-6',
            title:
              'The features and characteristics of a generation, transmission, and distribution system',
          },
        ],
      },
    ],
  },
  {
    code: '312',
    slug: '312',
    title:
      'Apply Health and Safety and Environmental Legislation in the Building Services Engineering Sector',
    glh: 15,
    kind: 'safety',
    status: 'practical',
    evidencedAtWork: true,
    sourceNote:
      'Assessed by practical project and employer confirmation. No knowledge content required.',
    sections: [],
  },
  {
    code: '313',
    slug: '313',
    title: 'Establish and Maintain Relationships in the Building Services Engineering Sector',
    glh: 26,
    kind: 'wales',
    status: 'write',
    evidencedAtWork: true,
    sourceNote:
      'L2 Module 5 \u2014 Communication touches this at Level 2 depth. Level 3 depth is new writing.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title:
          'Understand the types of technical and functional information that is available for the installation and/or maintenance activity',
        subsections: [
          {
            code: '1.1',
            slug: '1-1',
            title: 'The sources of technical and functional information',
          },
          {
            code: '1.2',
            slug: '1-2',
            title: 'Interpret technical and functional information and data',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title:
          'Understand the procedures for supplying technical and functional information to relevant people',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title: 'The stakeholders that require technical and functional information',
          },
          {
            code: '2.2',
            slug: '2-2',
            title:
              'The limits of responsibility of own job role with respect to supplying technical and functional information',
          },
          {
            code: '2.3',
            slug: '2-3',
            title: 'The methods of providing technical and functional information',
          },
          { code: '2.4', slug: '2-4', title: 'The importance of ensuring that' },
          {
            code: '2.5',
            slug: '2-5',
            title:
              'The methods for checking that relevant persons have an adequate understanding of the technical and non-technical information provided',
          },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title:
          'Understand the importance of customer service in relation to installation and/or maintenance activity',
        subsections: [
          {
            code: '3.1',
            slug: '3-1',
            title:
              'The methods and organisational procedures for establishing positive relations with clients and customers',
          },
          {
            code: '3.2',
            slug: '3-2',
            title:
              'The working requirements and practices of the clients and customers in the working environment where the installation and/or maintenance activity is\u2026',
          },
          {
            code: '3.3',
            slug: '3-3',
            title:
              'The opportunities and regulations that affect the way that technical and functional information is delivered to clients and customers',
          },
          {
            code: '3.4',
            slug: '3-4',
            title: "The clients' and customers' rights including any contractual agreements",
          },
        ],
      },
    ],
  },
  {
    code: '314',
    slug: '314',
    title: 'Coordinate a Work Site in the Building Services Engineering Sector',
    glh: 28,
    kind: 'wales',
    status: 'write',
    evidencedAtWork: true,
    sourceNote: 'No City & Guilds equivalent. Written from scratch.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title: 'Understand the requirements for organising and overseeing work activities',
        subsections: [
          { code: '1.1', slug: '1-1', title: 'How to plan and implement' },
          {
            code: '1.2',
            slug: '1-2',
            title:
              'The procedures for re-scheduling work to coordinate with changing conditions in the workplace and to coincide with other trades',
          },
          {
            code: '1.3',
            slug: '1-3',
            title: 'How to coordinate operatives you are responsible for in relation to',
          },
          {
            code: '1.4',
            slug: '1-4',
            title: 'How to communicate effectively with relevant people',
          },
          {
            code: '1.5',
            slug: '1-5',
            title:
              'The current versions of appropriate industry standards and regulations relevant to the identified building services engineering system',
          },
          { code: '1.6', slug: '1-6', title: 'The organisational procedures for' },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title:
          'Understand the requirements for organising the provision and storage of resources that are required for work activities',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title:
              'The methods that will verify that the equipment, accessories, and components are',
          },
          {
            code: '2.2',
            slug: '2-2',
            title: 'How to manage the available storage facility at the work site',
          },
        ],
      },
    ],
  },
  {
    code: '315E',
    slug: '315e',
    title: 'Installation of Wiring Systems',
    glh: 170,
    kind: 'electrical',
    status: 'reuse',
    evidencedAtWork: true,
    sourceNote: 'L2 Modules 3 and 4 plus L3 Module 6 \u2014 Electrical systems design.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title:
          'Understand the operation, applications, advantages, and limitations of different electrical systems',
        subsections: [
          { code: '1.1', slug: '1-1', title: 'Types of earthing systems Range' },
          { code: '1.2', slug: '1-2', title: 'Types of supply systems' },
          { code: '1.3', slug: '1-3', title: 'Electrical circuits' },
          {
            code: '1.4',
            slug: '1-4',
            title:
              'The arrangements for electrical installations and systems with regards to provision for: isolation and switching, overcurrent protection, earth fault\u2026',
          },
          {
            code: '1.5',
            slug: '1-5',
            title: 'The devices for protection against the risk of fire: AFDDs, RCDs',
          },
          { code: '1.6', slug: '1-6', title: 'The maximum disconnection times for circuits' },
          {
            code: '1.7',
            slug: '1-7',
            title:
              'Requirements for the protection against overvoltage and the types and applications of SPDs',
          },
          {
            code: '1.8',
            slug: '1-8',
            title: 'Requirements for the protection against undervoltage',
          },
          {
            code: '1.9',
            slug: '1-9',
            title: 'The requirements for protection against electric shock',
          },
          {
            code: '1.10',
            slug: '1-10',
            title: 'The requirements and applications of functional earthing',
          },
          {
            code: '1.11',
            slug: '1-11',
            title: 'How to select suitably sized protective conductors in accordance with BS 7671',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title:
          'Understand the appropriate industry standards and regulations relevant to installing enclosures',
        subsections: [{ code: '2.1', slug: '2-1', title: 'Industry standards and regulations' }],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title: 'Understand the applications, advantages and limitations of types of enclosures',
        subsections: [
          {
            code: '3.1',
            slug: '3-1',
            title:
              'The selection of wiring systems and equipment appropriate to the situation and use utilising BS 7671',
          },
          {
            code: '3.2',
            slug: '3-2',
            title: 'The application of the Degrees of Protection Provided by Enclosures (IP Code)',
          },
        ],
      },
      {
        slug: 'lo4',
        outcome: '4',
        title:
          'Understand the appropriate industry standards, regulations, and procedures relevant to installing and connecting electrical cable\u2026',
        subsections: [
          { code: '4.1', slug: '4-1', title: 'Industry standards and regulations' },
          {
            code: '4.2',
            slug: '4-2',
            title:
              'The organisational procedures for confirming with the relevant people the appropriate actions to be taken to ensure that any variations to the planne\u2026',
          },
        ],
      },
      {
        slug: 'lo5',
        outcome: '5',
        title:
          'Understand the industry recognised methods for determining the type, size and rating of electrical cables, conductors, wiring sys\u2026',
        subsections: [
          {
            code: '5.1',
            slug: '5-1',
            title:
              'The interpretation of manufacturer\u2019s data for the selection and application of connected loads and equipment',
          },
          {
            code: '5.2',
            slug: '5-2',
            title: 'The selection of current using equipment considering energy efficiency',
          },
          {
            code: '5.3',
            slug: '5-3',
            title:
              'The application of smart technology when used for convenience, comfort, safety, and security',
          },
          { code: '5.4', slug: '5-4', title: 'The cable selection (circuit design) procedure' },
        ],
      },
    ],
  },
  {
    code: '316E',
    slug: '316e',
    title: 'Install and Connect Electrical Cables, Conductors, Wiring Systems and Equipment',
    glh: 80,
    kind: 'electrical',
    status: 'practical',
    evidencedAtWork: true,
    sourceNote:
      'Practical project only \u2014 the handbook sets no written criteria for this unit.',
    sections: [],
  },
  {
    code: '317E',
    slug: '317e',
    title: 'Inspect, Test and Commission Electrical Systems and Equipment',
    glh: 72,
    kind: 'electrical',
    status: 'reuse',
    evidencedAtWork: true,
    sourceNote: 'L3 Module 5 \u2014 Inspection, testing and commissioning, 31 lessons.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title: 'Understand the requirements for inspection and testing',
        subsections: [
          {
            code: '1.1',
            slug: '1-1',
            title:
              'The requirements of the Electricity at Work Regulations for the safe inspection of electrical systems and equipment',
          },
          {
            code: '1.2',
            slug: '1-2',
            title:
              'The health and safety requirements which apply when inspecting, testing and commissioning electrical installations and circuits',
          },
          { code: '1.3', slug: '1-3', title: 'The safe isolation procedure' },
          {
            code: '1.4',
            slug: '1-4',
            title:
              'The industry practices and organisational procedures to ensure the coordination of site services and the activities of others who may be affected by\u2026',
          },
          {
            code: '1.5',
            slug: '1-5',
            title:
              'The purpose and requirements of the initial verification of electrical installations',
          },
          {
            code: '1.6',
            slug: '1-6',
            title:
              'The relevant documents associated with the inspection, testing and commissioning of an electrical installation',
          },
          {
            code: '1.7',
            slug: '1-7',
            title:
              'The information that is required by the inspector to conduct the initial verification of an electrical installation',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title:
          'Understand the methods and procedures for conducting an inspection of electrical installations prior to their being placed into s\u2026',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title: 'The appropriate items to be checked during the inspection process',
          },
          {
            code: '2.2',
            slug: '2-2',
            title: 'The application of the human senses for initial verification',
          },
          {
            code: '2.3',
            slug: '2-3',
            title: 'The requirements for the inspection of electrical installations',
          },
          { code: '2.4', slug: '2-4', title: 'The requirements for the inspection to include' },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title:
          'Understand the methods and processes to carry out correctly the tests that ensure safe and efficient operation of the electrical\u2026',
        subsections: [
          {
            code: '3.1',
            slug: '3-1',
            title:
              'The tests to be carried out on an electrical installation in accordance with the BS 7671 and IET Guidance Note 3',
          },
          {
            code: '3.2',
            slug: '3-2',
            title:
              'The appropriate instrument for each test to be carried out in terms of the instrument is fit for purpose and identifying the correct scale or setting',
          },
          {
            code: '3.3',
            slug: '3-3',
            title:
              'The requirements for the safe use of instruments to be used for testing and commissioning',
          },
          {
            code: '3.4',
            slug: '3-4',
            title:
              'The necessity for test results to comply with standard values and the actions to be taken in the event of unsatisfactory results being obtained',
          },
          {
            code: '3.5',
            slug: '3-5',
            title:
              'The reason why testing is carried out in the sequence specified in BS 7671 and IET Guidance Note 3',
          },
          {
            code: '3.6',
            slug: '3-6',
            title: 'The requirements for testing before circuits are energised',
          },
          {
            code: '3.7',
            slug: '3-7',
            title: 'The requirements for testing energised installations',
          },
        ],
      },
      {
        slug: 'lo4',
        outcome: '4',
        title:
          'Understand the requirements for the completion of electrical installation certificates, associated documentation and handover',
        subsections: [
          { code: '4.1', slug: '4-1', title: 'The procedures for' },
          {
            code: '4.2',
            slug: '4-2',
            title:
              'How to ensure that the electrical system and equipment is ready for hand over to the customer/client',
          },
          { code: '4.3', slug: '4-3', title: 'The organisational procedures for' },
        ],
      },
    ],
  },
  {
    code: '318E',
    slug: '318e',
    title: 'Identify and Rectify Faults in Electrical Systems and Equipment',
    glh: 47,
    kind: 'electrical',
    status: 'reuse',
    evidencedAtWork: true,
    sourceNote: 'L3 Module 4 \u2014 Fault diagnosis, 29 lessons.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title: 'Understand the health and safety requirements relevant to fault diagnosis',
        subsections: [
          {
            code: '1.1',
            slug: '1-1',
            title: 'The dangers of electricity in relation to fault diagnosis work',
          },
          {
            code: '1.2',
            slug: '1-2',
            title:
              'The health and safety requirements relevant to diagnosing and correcting electrical faults in electrical systems and equipment',
          },
          {
            code: '1.3',
            slug: '1-3',
            title:
              'The safe working procedures that should be adopted for completion of fault diagnosis and correction work',
          },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title: 'Understand the importance of reporting and communication in fault diagnosis',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title:
              'How to obtain clear and detailed information about the reported fault(s) and any components which need to be replaced from',
          },
          {
            code: '2.2',
            slug: '2-2',
            title:
              'The organisational procedures and industry practices when carrying out the processes for the identification and rectification of faults for',
          },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title: 'Understand the nature and characteristics of electrical faults',
        subsections: [
          {
            code: '3.1',
            slug: '3-1',
            title: 'The different types and causes and consequences of electrical faults',
          },
          {
            code: '3.2',
            slug: '3-2',
            title:
              'Typical types of faults and their likely locations in wiring systems and equipment',
          },
        ],
      },
      {
        slug: 'lo4',
        outcome: '4',
        title: 'Understand the fault diagnosis procedure',
        subsections: [
          {
            code: '4.1',
            slug: '4-1',
            title:
              'The precautions that must be taken when carrying out fault diagnosis regarding particular locations, equipment and circumstances',
          },
          { code: '4.2', slug: '4-2', title: 'The logical stages of fault diagnosis' },
          {
            code: '4.3',
            slug: '4-3',
            title:
              'How to select the instruments to be used and confirming that the instruments are fit for purpose and have a current calibration certificate',
          },
          {
            code: '4.4',
            slug: '4-4',
            title: 'The techniques to identify, locate, diagnose and rectify faults',
          },
        ],
      },
      {
        slug: 'lo5',
        outcome: '5',
        title: 'Understand the procedures and techniques for correcting electrical faults',
        subsections: [
          {
            code: '5.1',
            slug: '5-1',
            title: 'Typical factors which can affect repair or replacement of equipment',
          },
          {
            code: '5.2',
            slug: '5-2',
            title: 'How to repair, remove and replace in accordance with industry practices',
          },
          {
            code: '5.3',
            slug: '5-3',
            title:
              'The methods and processes to inspect and test, as appropriate and in accordance with industry practices, repaired and/or replaced',
          },
          {
            code: '5.4',
            slug: '5-4',
            title:
              'How to ensure, if the fault(s) cannot be corrected immediately, the safety of the relevant',
          },
          {
            code: '5.5',
            slug: '5-5',
            title:
              'The methods to ensure the safe disposal of any waste and that the work area is left in a safe and clean condition',
          },
          {
            code: '5.6',
            slug: '5-6',
            title:
              'How to provide clear and accurate information to relevant people about the electrical system and equipment in terms of',
          },
        ],
      },
    ],
  },
  {
    code: '319E',
    slug: '319e',
    title: 'Understand Advanced Electrical Science and Principles',
    glh: 100,
    kind: 'electrical',
    status: 'verify',
    evidencedAtWork: false,
    sourceNote:
      'L3 Module 3 \u2014 Electrical science, plus L3 Module 2 for the renewables outcome. The electronic devices outcome is thinner than this unit requires.',
    sections: [
      {
        slug: 'lo1',
        outcome: '1',
        title: 'Understand renewable and other sources of electricity',
        subsections: [
          {
            code: '1.1',
            slug: '1-1',
            title: 'The basic operating principles of renewable sources of electricity',
          },
          {
            code: '1.2',
            slug: '1-2',
            title:
              'The basic operating principles of combined heat and power (CHP) including micro-CHP',
          },
          {
            code: '1.3',
            slug: '1-3',
            title: 'The basic operating principles of other sources of electricity',
          },
          { code: '1.4', slug: '1-4', title: 'Smart metering' },
        ],
      },
      {
        slug: 'lo2',
        outcome: '2',
        title: 'Understand the properties of electrical circuits and components',
        subsections: [
          {
            code: '2.1',
            slug: '2-1',
            title:
              'The appropriate mathematical principles which are relevant to electrical work tasks',
          },
          { code: '2.2', slug: '2-2', title: 'Quantities relevant to electrical work' },
          {
            code: '2.3',
            slug: '2-3',
            title: 'The relationship between resistance, inductance, capacitance, and impedance',
          },
          {
            code: '2.4',
            slug: '2-4',
            title: 'Calculation of electrical quantities in alternating current circuits',
          },
          {
            code: '2.5',
            slug: '2-5',
            title: 'Operating principles of electro-mechanical components',
          },
          { code: '2.6', slug: '2-6', title: 'Types of transformers' },
          {
            code: '2.7',
            slug: '2-7',
            title: 'The operating principles, applications and limitations of transformers',
          },
          {
            code: '2.8',
            slug: '2-8',
            title: 'The relationship between kW, kVAr, kVA and power factor',
          },
          { code: '2.9', slug: '2-9', title: 'Power factor improvement' },
          {
            code: '2.10',
            slug: '2-10',
            title: 'Voltage and current in star and delta connected systems',
          },
          { code: '2.11', slug: '2-11', title: 'Advantages of balanced star connected systems' },
          {
            code: '2.12',
            slug: '2-12',
            title: 'The neutral current in a three-phase star connected system',
          },
        ],
      },
      {
        slug: 'lo3',
        outcome: '3',
        title:
          'Understand the operating principles and applications of D.C. machines and A.C. motors',
        subsections: [
          {
            code: '3.1',
            slug: '3-1',
            title:
              'The basic types, applications and describe the operating principles of D.C machines',
          },
          { code: '3.2', slug: '3-2', title: 'The operating principles of A.C motors' },
          {
            code: '3.3',
            slug: '3-3',
            title: 'State the basic types, applications, and limitations of A.C motors',
          },
          {
            code: '3.4',
            slug: '3-4',
            title: 'The basic operating principles, limitations, and applications of motor control',
          },
        ],
      },
      {
        slug: 'lo4',
        outcome: '4',
        title: 'Understand the principles and applications of electrical lighting systems',
        subsections: [
          {
            code: '4.1',
            slug: '4-1',
            title: 'The basic principles and applications of illumination',
          },
          {
            code: '4.2',
            slug: '4-2',
            title: 'The operating principles, types, limitations, and applications of luminaires',
          },
        ],
      },
      {
        slug: 'lo5',
        outcome: '5',
        title: 'Understand the principles and applications of electrical heating',
        subsections: [
          {
            code: '5.1',
            slug: '5-1',
            title: 'The basic principles of electrical space heating and electrical water heating',
          },
          {
            code: '5.2',
            slug: '5-2',
            title:
              'The operating principles, types, limitations and applications of electrical space and water heating appliances and components',
          },
        ],
      },
      {
        slug: 'lo6',
        outcome: '6',
        title:
          'Know the types, applications, and limitations of electronic components in electrical systems and equipment',
        subsections: [
          {
            code: '6.1',
            slug: '6-1',
            title: 'The basic operating principles of electronic components and devices',
          },
          {
            code: '6.2',
            slug: '6-2',
            title:
              'The function and application of electronic components that are used in electrical systems',
          },
        ],
      },
    ],
  },
];

/** Total taught hours across the units (the handbook's 916). */
export const WELSH_L3_TAUGHT_GLH = WELSH_L3_UNITS.reduce((n, u) => n + u.glh, 0);

/** Every taught page in the course — one per assessment criterion. */
export const WELSH_L3_PAGE_COUNT = WELSH_L3_UNITS.reduce(
  (n, u) => n + u.sections.reduce((m, s) => m + s.subsections.length, 0),
  0
);

export const WELSH_L3_SECTION_COUNT = WELSH_L3_UNITS.reduce((n, u) => n + u.sections.length, 0);

export function findUnit(slug: string | undefined): WelshUnit | undefined {
  return WELSH_L3_UNITS.find((u) => u.slug === slug);
}

export function findSection(
  unit: WelshUnit | undefined,
  slug: string | undefined
): WelshSection | undefined {
  return unit?.sections.find((s) => s.slug === slug);
}

export function findSubsection(
  section: WelshSection | undefined,
  slug: string | undefined
): WelshSubsection | undefined {
  return section?.subsections.find((s) => s.slug === slug);
}

/** The page before and after this one, for the prev/next footer. */
export function neighbours(unitSlug: string, sectionSlug: string, subSlug: string) {
  const flat: { unit: WelshUnit; section: WelshSection; sub: WelshSubsection }[] = [];
  for (const unit of WELSH_L3_UNITS) {
    for (const section of unit.sections) {
      for (const sub of section.subsections) flat.push({ unit, section, sub });
    }
  }
  const i = flat.findIndex(
    (f) => f.unit.slug === unitSlug && f.section.slug === sectionSlug && f.sub.slug === subSlug
  );
  if (i === -1) return { prev: undefined, next: undefined };
  const href = (f: (typeof flat)[number]) =>
    `${WELSH_L3_BASE}/${f.unit.slug}/${f.section.slug}/${f.sub.slug}`;
  return {
    prev: i > 0 ? { href: href(flat[i - 1]), title: flat[i - 1].sub.title } : undefined,
    next:
      i < flat.length - 1 ? { href: href(flat[i + 1]), title: flat[i + 1].sub.title } : undefined,
  };
}
