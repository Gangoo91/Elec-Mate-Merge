
import { SectionData } from '../healthAndSafety/types';

export const ringRadialCircuitsSection: SectionData = {
  sectionNumber: "6",
  title: "Ring and Radial Circuits",
  content: {
    sectionNumber: "6",
    title: "Ring and Radial Circuits",
    description: "Ring and radial final circuits are the two main configurations used for socket outlets in UK electrical installations.",
    icon: "cable",
    isMainSection: true,
    subsections: [
      {
        id: "6.1",
        title: "Ring Circuit Design and Principles",
        content: "Ring circuits, also called ring mains, are a distinctive feature of UK electrical installations. They start and end at the same point in the consumer unit, forming a complete loop through the socket outlets. Typically protected by a 30/32A device, ring circuits use 2.5mm² cable and can supply a floor area up to 100m². The ring configuration allows current to flow in both directions to each socket, effectively sharing the load between two paths. This permits more socket outlets compared to radial circuits of the same rating. Ring circuits must be properly tested to verify their integrity, including the continuity of the ring and correct connections at all points.",
        keyPoints: [
          "Supplies current through two paths to each socket outlet",
          "Typically protected by a 30/32A device using 2.5mm² cable",
          "Maximum floor area coverage of 100m² per circuit",
          "Requires specific testing procedures to verify integrity"
        ]
      },
      {
        id: "6.2",
        title: "Radial Circuit Design and Principles",
        content: "Radial circuits branch out from the consumer unit in a single line to supply socket outlets. They are simpler in design compared to ring circuits but generally allow fewer socket outlets per circuit. A 20A radial circuit using 2.5mm² cable can supply a floor area up to 50m², while a 32A radial circuit using 4.0mm² cable can supply up to 75m². Radial circuits are often used for specific applications or areas where a limited number of sockets are required, such as kitchens or outbuildings. The simpler design makes fault finding easier, as current can only flow through one path.",
        keyPoints: [
          "Supplies current through a single path to all socket outlets",
          "20A circuit (2.5mm² cable) covers up to 50m²",
          "32A circuit (4.0mm² cable) covers up to 75m²",
          "Simpler design but lower capacity than equivalent ring circuit"
        ]
      },
      {
        id: "6.3",
        title: "Socket Outlet Requirements",
        content: "Socket outlets in UK installations must comply with BS 1363 standards. The number and positioning of sockets should meet the anticipated needs of the occupants while preventing overloading of circuits. General guidance suggests sockets should be located for convenience while avoiding places where they might be damaged or where flexible cords might create hazards. In domestic premises, consideration should be given to the number of likely appliances, with modern homes typically requiring more sockets than older properties. Special requirements apply to kitchens, where high-demand appliances are common, and in locations near water sources, where additional protection is required.",
        keyPoints: [
          "Socket outlets must comply with BS 1363 standards",
          "Positioning should consider user convenience and safety",
          "Modern installations typically require more socket outlets than minimum standards",
          "Special considerations apply to kitchens and locations near water"
        ]
      }
    ]
  }
};
