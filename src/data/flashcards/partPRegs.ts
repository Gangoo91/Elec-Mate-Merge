import { FlashcardData } from './types';

export const partPRegs: FlashcardData[] = [
  // === Part P Scope ===
  {
    id: 'pp1',
    question: 'What is Approved Document P and which edition is currently in force?',
    answer:
      'Approved Document P (Electrical Safety — Dwellings) is the statutory guidance document supporting Part P of the Building Regulations. The current edition is the 2013 edition with 2013 amendments, which took effect on 6 April 2013. It sets out the requirements for electrical installations in dwellings in England and Wales to ensure reasonable safety from fire and electric shock.',
    category: 'Part P Scope',
    difficulty: 'easy',
  },
  {
    id: 'pp2',
    question: 'What types of building does Part P of the Building Regulations apply to?',
    answer:
      'Part P applies to electrical installations in dwellings and their associated land, including gardens, outbuildings, garages, and sheds within or attached to a dwelling. A dwelling includes houses, flats, maisonettes, and parts of buildings used solely as living accommodation. It does not apply to commercial or industrial buildings, which are instead covered by other regulations such as the Electricity at Work Regulations 1989.',
    category: 'Part P Scope',
    difficulty: 'easy',
  },
  {
    id: 'pp3',
    question: 'Does Part P of the Building Regulations apply in Scotland and Northern Ireland?',
    answer:
      'No. Part P applies only in England and Wales. Scotland has its own building standards system under the Building (Scotland) Regulations, where Section 4 (Safety) covers electrical installations and is administered by local authority building standards departments. Northern Ireland has separate building regulations under the Building Regulations (Northern Ireland), which include their own electrical safety provisions. Electricians working across these jurisdictions must be aware of the differing requirements.',
    category: 'Part P Scope',
    difficulty: 'medium',
  },
  {
    id: 'pp4',
    question:
      'What is the fundamental safety requirement stated in Part P of the Building Regulations?',
    answer:
      'Part P requires that reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining, or altering the installations from fire or injury. The approved way of meeting this requirement is to ensure that the installation is designed, installed, inspected, and tested in accordance with BS 7671 (the IET Wiring Regulations). Compliance with BS 7671 is treated as evidence of compliance with Part P.',
    category: 'Part P Scope',
    difficulty: 'medium',
  },
  {
    id: 'pp5',
    question: "What are 'special locations' under BS 7671 and why are they significant for Part P?",
    answer:
      'Special locations are areas identified in Part 7 of BS 7671 that present increased risk of electric shock or fire. These include bathrooms and shower rooms (Section 701), swimming pools (Section 702), saunas (Section 703), and construction sites (Section 704). Under Part P, any new electrical work carried out in these special locations within a dwelling is classified as notifiable work and must be either carried out by a Competent Person Scheme member or notified to Building Control before work begins.',
    category: 'Part P Scope',
    difficulty: 'medium',
  },

  // === Notifiable Work ===
  {
    id: 'pp6',
    question: "What types of domestic electrical work are classified as 'notifiable' under Part P?",
    answer:
      'Notifiable work includes the installation of a new circuit, the replacement of a consumer unit, and any electrical work in special locations such as bathrooms, shower rooms, or swimming pool zones. Work in kitchens is also notifiable if it involves installing a new circuit. All notifiable work must either be carried out by an electrician registered with a Competent Person Scheme or be notified to the local authority Building Control body before work commences.',
    category: 'Notifiable Work',
    difficulty: 'easy',
  },
  {
    id: 'pp7',
    question: 'Why is replacing a consumer unit classified as notifiable work under Part P?',
    answer:
      'A consumer unit replacement is notifiable because it is the heart of the electrical installation and directly affects the safety of every circuit in the dwelling. Incorrect installation can lead to fire, electric shock, or failure of protective devices. The work involves selecting the correct type of enclosure (which must now be non-combustible to Amendment 3 of BS 7671), verifying earthing and bonding, and ensuring all circuits are adequately protected. Certification by EIC or through Building Control is required.',
    category: 'Notifiable Work',
    difficulty: 'medium',
  },
  {
    id: 'pp8',
    question: "What domestic electrical work is considered 'non-notifiable' under Part P?",
    answer:
      'Non-notifiable work includes like-for-like replacements of accessories such as socket outlets, light switches, and ceiling roses. Adding new socket outlets, light fittings, or fused spurs to an existing circuit in areas that are not special locations is also non-notifiable. Repairs to existing circuits and work that is not in a bathroom, kitchen (new circuit), or other special location generally does not need to be notified to Building Control, though it must still comply with BS 7671.',
    category: 'Notifiable Work',
    difficulty: 'easy',
  },
  {
    id: 'pp9',
    question: 'Is installing new lighting in a kitchen notifiable under Part P?',
    answer:
      'It depends on whether a new circuit is being installed. Adding lighting points to an existing circuit in a kitchen is non-notifiable work, but installing a completely new lighting circuit in a kitchen is notifiable because any new circuit installation is notifiable regardless of location. The key distinction is whether the work involves creating a new circuit or simply extending or modifying an existing one. Either way, all work must comply with BS 7671.',
    category: 'Notifiable Work',
    difficulty: 'hard',
  },
  {
    id: 'pp10',
    question:
      'When is electrical work in a garden building or outbuilding notifiable under Part P?',
    answer:
      "Electrical work in a garden building, shed, or detached outbuilding within the curtilage of a dwelling is covered by Part P because it falls within the dwelling's associated land. If the work involves installing a new circuit to supply the outbuilding from the main consumer unit or a separate supply, it is notifiable. Simply extending an existing circuit to add a socket or light in a non-special location within an already-wired outbuilding would be non-notifiable, but a new circuit run from the dwelling always requires notification or CPS registration.",
    category: 'Notifiable Work',
    difficulty: 'hard',
  },

  // === Competent Persons ===
  {
    id: 'pp11',
    question: 'What is a Competent Person Scheme (CPS) and how does it relate to Part P?',
    answer:
      'A Competent Person Scheme is a government-authorised scheme that allows registered electricians to self-certify that their domestic electrical work complies with the Building Regulations, without having to notify Building Control. Electricians on a CPS are assessed for competence and must carry appropriate insurance. Using a CPS-registered installer is the most common route for demonstrating Part P compliance and is generally quicker and less costly than the Building Control notification route.',
    category: 'Competent Persons',
    difficulty: 'easy',
  },
  {
    id: 'pp12',
    question:
      'Name the main Competent Person Schemes for domestic electrical work in England and Wales.',
    answer:
      'The principal Competent Person Schemes for Part P domestic electrical work are NICEIC (National Inspection Council for Electrical Installation Contracting), NAPIT (National Association of Professional Inspectors and Testers), ELECSA, and Stroma Certification. Each scheme is authorised by the Ministry of Housing, Communities and Local Government. Registered members are audited regularly to ensure their work meets BS 7671 and Part P requirements, and they can self-certify notifiable work without involving Building Control.',
    category: 'Competent Persons',
    difficulty: 'easy',
  },
  {
    id: 'pp13',
    question:
      'What obligations does a CPS-registered electrician have after completing notifiable work?',
    answer:
      'After completing notifiable domestic electrical work, a CPS-registered electrician must issue the appropriate certification (an Electrical Installation Certificate for new installations or new circuits, or a Minor Electrical Installation Works Certificate for minor works). They must also notify their scheme operator, who then informs the local authority Building Control body. A Building Regulations compliance certificate is issued to the homeowner within 30 days. The electrician must retain records of the work for audit purposes.',
    category: 'Competent Persons',
    difficulty: 'medium',
  },
  {
    id: 'pp14',
    question:
      'Can a non-CPS-registered person legally carry out notifiable domestic electrical work?',
    answer:
      'Yes, but they must notify the local authority Building Control body before the work begins. Building Control will then arrange for the work to be inspected at appropriate stages and tested upon completion. This route typically incurs a Building Control fee, which can be several hundred pounds. The person carrying out the work must still ensure it complies with BS 7671. DIY householders can use this route for their own homes, but the work is still subject to inspection and must meet the same standards.',
    category: 'Competent Persons',
    difficulty: 'medium',
  },

  // === Building Control ===
  {
    id: 'pp15',
    question: 'What is the Building Control notification route for Part P electrical work?',
    answer:
      'The Building Control notification route is used when the person carrying out notifiable electrical work is not registered with a Competent Person Scheme. Before work commences, a building notice or full plans application must be submitted to the local authority Building Control body, along with the required fee. Building Control will then inspect the work at key stages and may require testing. Once satisfied, they issue a completion certificate confirming compliance with the Building Regulations.',
    category: 'Building Control',
    difficulty: 'medium',
  },
  {
    id: 'pp16',
    question: 'What is an Electrical Installation Certificate (EIC) and when must one be issued?',
    answer:
      'An Electrical Installation Certificate is a formal document that confirms a new electrical installation or new circuit has been designed, constructed, inspected, and tested in accordance with BS 7671. It must be issued for all new installations and new circuits, including consumer unit replacements and any notifiable work. The EIC must be signed by the designer, installer, and the person responsible for inspection and testing, and a copy must be given to the person ordering the work.',
    category: 'Building Control',
    difficulty: 'easy',
  },
  {
    id: 'pp17',
    question:
      'What is a Minor Electrical Installation Works Certificate (MEIWC) and when is it used?',
    answer:
      'A Minor Electrical Installation Works Certificate is used for small-scale electrical work that does not involve the installation of a new circuit. Examples include adding a socket outlet or light fitting to an existing circuit, or installing a fused spur. The MEIWC confirms that the work has been designed, constructed, inspected, and tested in accordance with BS 7671. It does not require separate signatures for design, installation, and testing — a single signature from the person carrying out the work is sufficient.',
    category: 'Building Control',
    difficulty: 'medium',
  },
  {
    id: 'pp18',
    question: 'What is the role of third-party certification in Part P compliance?',
    answer:
      'Third-party certification is an alternative route for demonstrating Part P compliance. Where electrical work has been carried out by a person who is not registered with a CPS and Building Control was not notified beforehand, a third-party certification body (often a CPS scheme) can be engaged to inspect and test the completed installation. If it meets BS 7671 requirements, they can issue the necessary certificates. This is sometimes called the regularisation route and typically involves a higher fee.',
    category: 'Building Control',
    difficulty: 'hard',
  },
  {
    id: 'pp19',
    question: 'What happens if domestic electrical work is carried out without Part P compliance?',
    answer:
      "Non-compliance with Part P is a breach of the Building Regulations, which is a criminal offence. The local authority can issue an enforcement notice requiring the work to be altered, removed, or brought up to standard. Failure to comply with an enforcement notice can result in prosecution and a fine of up to an unlimited amount in the magistrates' court. Non-compliant work can also cause problems when selling a property, as conveyancing solicitors routinely check for Building Regulations compliance certificates.",
    category: 'Building Control',
    difficulty: 'hard',
  },

  // === Compliance ===
  {
    id: 'pp20',
    question: 'How does BS 7671 relate to Part P of the Building Regulations?',
    answer:
      'BS 7671 (Requirements for Electrical Installations, also known as the IET Wiring Regulations) is the technical standard that defines how electrical installations should be designed, erected, and verified. Approved Document P states that compliance with BS 7671 is regarded as likely to satisfy the electrical safety requirements of the Building Regulations. In practice, Part P provides the legal framework and BS 7671 provides the technical detail — together they ensure domestic installations are safe.',
    category: 'Compliance',
    difficulty: 'easy',
  },
  {
    id: 'pp21',
    question: 'How does Part P interact with Part B (Fire Safety) of the Building Regulations?',
    answer:
      'Part P and Part B overlap where electrical installations affect fire safety. For example, Part B requires fire detection and alarm systems in dwellings, and the electrical supply to these systems must comply with Part P and BS 7671. Cable selection must consider fire propagation properties (such as using low smoke zero halogen cables in escape routes), and consumer units must be housed in non-combustible enclosures as required by Amendment 3 of BS 7671. Electricians must be aware of both Parts when planning and installing fire alarm circuits and emergency lighting.',
    category: 'Compliance',
    difficulty: 'hard',
  },
  {
    id: 'pp22',
    question:
      'How does Part P interact with Part L (Conservation of Fuel and Power) of the Building Regulations?',
    answer:
      'Part L requires that fixed building services, including electrical installations, are energy efficient. When replacing or installing new lighting, Part L may require that a minimum proportion of light fittings are energy efficient (typically LED or equivalent). Electricians carrying out Part P notifiable work must also ensure compliance with Part L where applicable, for example by installing efficient lighting circuits. Both Parts apply simultaneously and the installation must satisfy the requirements of each.',
    category: 'Compliance',
    difficulty: 'hard',
  },
  {
    id: 'pp23',
    question: 'What records should a homeowner retain for Part P compliance and why?',
    answer:
      "Homeowners should retain all Electrical Installation Certificates, Minor Electrical Installation Works Certificates, and Building Regulations compliance certificates issued for work on their property. These documents are evidence that electrical work was carried out in compliance with the Building Regulations and BS 7671. They are commonly requested by conveyancing solicitors during property sales, by mortgage lenders, and by insurers. Missing certificates can delay property transactions and may require retrospective inspection and testing at the homeowner's expense.",
    category: 'Compliance',
    difficulty: 'medium',
  },
  {
    id: 'pp24',
    question: "What is 'regularisation' in the context of Part P, and when is it needed?",
    answer:
      'Regularisation is the process of retrospectively obtaining Building Regulations approval for electrical work that was carried out without proper notification or self-certification. The homeowner or occupier must apply to the local authority Building Control body, pay a regularisation fee (which is typically higher than the standard notification fee), and arrange for the installation to be inspected and tested. If the work meets the required standards, a regularisation certificate is issued. Regularisation cannot be refused solely because prior notice was not given.',
    category: 'Compliance',
    difficulty: 'hard',
  },
  {
    id: 'pp25',
    question:
      'Who is ultimately responsible for ensuring domestic electrical work complies with Part P?',
    answer:
      'The person carrying out the work holds the primary responsibility for ensuring it complies with the Building Regulations, including Part P. However, the building owner also has a legal responsibility under the Building Act 1984 to ensure that any building work carried out on their property complies with the regulations. If a homeowner engages an unregistered electrician and does not notify Building Control, both the electrician and the homeowner could face enforcement action. Engaging a CPS-registered electrician is the simplest way for homeowners to ensure compliance.',
    category: 'Compliance',
    difficulty: 'medium',
  },
];
