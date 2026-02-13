import { FlashcardData } from './types';

export const lightingDesign: FlashcardData[] = [
  // === Light Sources (ld1–ld5) ===
  {
    id: 'ld1',
    question:
      'What is colour temperature measured in, and what is the typical range for warm white and cool white LEDs?',
    answer:
      'Colour temperature is measured in Kelvin (K). Warm white LEDs are typically 2700-3000 K and produce a yellowish tone similar to incandescent lamps. Cool white LEDs are typically 4000-6500 K and produce a blueish-white light suited to task areas such as offices and workshops.',
    category: 'Light Sources',
    difficulty: 'easy',
  },
  {
    id: 'ld2',
    question:
      'What is the Colour Rendering Index (CRI) and why does it matter when selecting lamps?',
    answer:
      'CRI is a scale from 0 to 100 that measures how accurately a light source renders colours compared to natural daylight (CRI 100). A CRI of 80 or above is generally acceptable for most interior applications. Spaces where colour accuracy is critical, such as retail displays, art galleries, and healthcare settings, require a CRI of 90 or above to avoid colours appearing washed out or distorted.',
    category: 'Light Sources',
    difficulty: 'easy',
  },
  {
    id: 'ld3',
    question: 'What is the role of an LED driver, and what are the two main types?',
    answer:
      'An LED driver converts mains AC voltage to the low-voltage DC supply required by LEDs, regulating the current to prevent damage. The two main types are constant current drivers (which maintain a fixed current, typically in milliamps, and are used for high-power LED modules) and constant voltage drivers (which provide a fixed DC voltage, typically 12 V or 24 V, and are used for LED strip lighting). Selecting the wrong driver type will cause flickering, reduced lifespan, or immediate failure.',
    category: 'Light Sources',
    difficulty: 'medium',
  },
  {
    id: 'ld4',
    question:
      'Compare the luminous efficacy of LED, T5 fluorescent, high-pressure sodium (SON), and halogen lamps.',
    answer:
      'LED lamps achieve approximately 100-200 lm/W, making them the most efficacious source widely available. T5 fluorescent tubes achieve around 80-104 lm/W. High-pressure sodium (SON) discharge lamps achieve approximately 80-150 lm/W but have very poor colour rendering (CRI around 25). Halogen lamps are the least efficient at approximately 15-25 lm/W. These figures explain why LED replacements offer the greatest energy savings in most retrofit projects.',
    category: 'Light Sources',
    difficulty: 'medium',
  },
  {
    id: 'ld5',
    question:
      'What are the key differences between T5 and T8 fluorescent tubes, and why are they being phased out?',
    answer:
      'T5 tubes have a 16 mm diameter and use electronic ballasts, achieving higher efficacy (up to 104 lm/W) than T8 tubes which have a 26 mm diameter and may use less efficient magnetic ballasts (around 80 lm/W). Both types contain mercury, making disposal an environmental concern under the WEEE Regulations. The EU and UK have been phasing out fluorescent lamps under RoHS restrictions, with T8 tubes banned from sale since September 2023 and T5 following in 2024, accelerating the transition to LED replacements.',
    category: 'Light Sources',
    difficulty: 'medium',
  },

  // === Design Principles (ld6–ld10) ===
  {
    id: 'ld6',
    question:
      'State the inverse square law for illuminance and explain its practical significance in lighting design.',
    answer:
      'The inverse square law states that illuminance E = I/d², where E is illuminance in lux, I is luminous intensity in candelas, and d is the distance from the source in metres. In practice, this means that doubling the mounting height of a luminaire reduces the illuminance on the working plane to one quarter of its original value. This is why high-bay luminaires in warehouses need significantly higher lumen outputs than low-ceiling fittings to achieve the same lux level on the floor.',
    category: 'Design Principles',
    difficulty: 'hard',
  },
  {
    id: 'ld7',
    question:
      'What are the recommended maintained illuminance levels for offices, corridors, and workshops according to BS EN 12464-1?',
    answer:
      'BS EN 12464-1 specifies minimum maintained illuminance levels for interior workplaces. General offices require 500 lux on the working plane, corridors and circulation areas require 100 lux, and workshops for medium-precision tasks require 300 lux. These are maintained values, meaning they account for lamp depreciation and luminaire dirt accumulation over time, so initial design lux levels must be higher to ensure the maintained level is not breached throughout the maintenance cycle.',
    category: 'Design Principles',
    difficulty: 'easy',
  },
  {
    id: 'ld8',
    question: 'What is the difference between lumens, lux, and luminous efficacy?',
    answer:
      'Lumens (lm) measure the total quantity of visible light emitted by a source in all directions. Lux (lx) measures the illuminance, which is the amount of light falling on a surface, defined as one lumen per square metre. Luminous efficacy (lm/W) measures how efficiently a lamp converts electrical power into visible light. A lamp may have a high lumen output but poor efficacy if it consumes excessive wattage, making efficacy the key metric for energy-efficient lighting selection.',
    category: 'Design Principles',
    difficulty: 'easy',
  },
  {
    id: 'ld9',
    question:
      'What is the uniformity ratio in lighting design, and what minimum value does BS EN 12464-1 generally recommend?',
    answer:
      'The uniformity ratio is the ratio of minimum illuminance to average illuminance across the task area (Emin/Eav). BS EN 12464-1 generally recommends a minimum uniformity ratio of 0.6 for the task area and 0.4 for the immediate surrounding area. Poor uniformity creates dark spots and excessive contrast that cause eye strain and can be a safety hazard, particularly in industrial environments where obstacles may be hidden in shadow.',
    category: 'Design Principles',
    difficulty: 'medium',
  },
  {
    id: 'ld10',
    question:
      'What is the spacing-to-height ratio (SHR) and how is it used when positioning luminaires?',
    answer:
      'The spacing-to-height ratio (SHR) is the maximum permitted distance between luminaires divided by their mounting height above the working plane. Each luminaire has a nominal SHR value provided by the manufacturer, typically between 1.0 and 1.5. If the actual spacing exceeds the SHR multiplied by the mounting height, dark patches will appear between fittings, resulting in poor uniformity. For example, a luminaire with an SHR of 1.5 mounted 2.5 m above the working plane should be spaced no more than 3.75 m apart.',
    category: 'Design Principles',
    difficulty: 'hard',
  },

  // === Emergency Lighting (ld11–ld16) ===
  {
    id: 'ld11',
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Maintained emergency luminaires are lit at all times during normal operation and continue to operate from their battery when the mains supply fails. Non-maintained emergency luminaires remain off during normal conditions and only illuminate when the mains supply fails, switching automatically to battery power. Maintained fittings are required where the public may be unfamiliar with the building, such as cinemas, theatres, and shopping centres, while non-maintained fittings are typically used in workplaces where occupants know the escape routes.',
    category: 'Emergency Lighting',
    difficulty: 'easy',
  },
  {
    id: 'ld12',
    question:
      'What is the minimum battery duration required for emergency lighting under BS 5266-1:2016?',
    answer:
      'BS 5266-1:2016 requires a minimum battery duration of 3 hours for most premises. A reduced duration of 1 hour is permitted only where the premises will not be reoccupied until the mains supply is restored and the batteries are fully recharged (which typically takes 24 hours). In practice, 3-hour duration is specified for the vast majority of installations because it provides sufficient time for safe evacuation and for emergency services to operate.',
    category: 'Emergency Lighting',
    difficulty: 'medium',
  },
  {
    id: 'ld13',
    question: 'What are the main emergency lighting categories defined in BS 5266-1:2016?',
    answer:
      'BS 5266-1:2016 defines the following categories: escape route lighting (illuminates defined escape routes to allow safe movement to exits), open area or anti-panic lighting (provides illumination in large open areas to reduce panic and allow occupants to reach escape routes), and high-risk task area lighting (provides illumination in areas where a potentially dangerous process needs to be safely shut down). Each category can be either maintained (M) or non-maintained (NM), giving designations such as M or NM for escape route luminaires.',
    category: 'Emergency Lighting',
    difficulty: 'medium',
  },
  {
    id: 'ld14',
    question:
      'What are the testing requirements for emergency lighting systems under BS 5266-1:2016?',
    answer:
      'Monthly functional tests require a brief simulated mains failure to verify that each luminaire illuminates correctly and that any fault indicators are checked. Annual full-duration tests require a complete discharge test for the full rated duration (typically 3 hours) to confirm the batteries can sustain the luminaires for the required period. All test results must be recorded in a log book, including the date, duration, and outcome of each test, along with details of any remedial work carried out.',
    category: 'Emergency Lighting',
    difficulty: 'medium',
  },
  {
    id: 'ld15',
    question: 'What information must be recorded in an emergency lighting log book?',
    answer:
      'The emergency lighting log book must contain: a description of the system including luminaire types and locations; a record of each monthly functional test showing date, duration, and pass/fail results for each luminaire; a record of each annual full-duration test; details of any faults found and remedial actions taken; dates of any alterations or additions to the system; and the name and signature of the person carrying out each test. The log book must be kept on-site and made available for inspection by the enforcing authority.',
    category: 'Emergency Lighting',
    difficulty: 'hard',
  },
  {
    id: 'ld16',
    question:
      'What minimum illuminance levels does BS 5266-1:2016 require for escape routes and open areas?',
    answer:
      'For escape routes, the minimum illuminance on the centre line must be at least 1 lux at floor level, with the centre band (at least half the route width) achieving a uniformity ratio of at least 40:1 (maximum to minimum). For open area anti-panic lighting, a minimum of 0.5 lux must be provided at floor level across the entire area, excluding a 0.5 m border around the perimeter. High-risk task areas require a minimum of 10% of the normal maintained illuminance or 15 lux, whichever is greater.',
    category: 'Emergency Lighting',
    difficulty: 'hard',
  },

  // === Controls (ld17–ld21) ===
  {
    id: 'ld17',
    question: 'What is the DALI protocol and what advantages does it offer for lighting control?',
    answer:
      'DALI (Digital Addressable Lighting Interface) is a standardised digital communication protocol for lighting control defined by IEC 62386. It allows individual addressing of up to 64 luminaires on a single DALI bus using a simple two-wire control cable with no polarity requirement. Advantages include individual luminaire control, scene setting, daylight linking, monitoring of lamp and driver status for maintenance, and integration with building management systems. Unlike 1-10 V analogue dimming, DALI supports bidirectional communication so the system can report faults.',
    category: 'Controls',
    difficulty: 'hard',
  },
  {
    id: 'ld18',
    question:
      'How does a PIR (passive infrared) occupancy sensor work, and where is it typically used in lighting control?',
    answer:
      'A PIR sensor detects changes in infrared radiation caused by the movement of people within its detection zone. When movement is detected, the sensor triggers the lighting circuit on and holds it on for an adjustable time-out period, after which the lights switch off if no further movement is detected. PIR sensors are commonly used in corridors, stairwells, toilets, and storage areas to reduce energy consumption by ensuring lights are only on when the space is occupied.',
    category: 'Controls',
    difficulty: 'easy',
  },
  {
    id: 'ld19',
    question:
      'What is daylight harvesting and how does a daylight sensor contribute to energy savings?',
    answer:
      'Daylight harvesting uses photocell (daylight) sensors to measure the amount of natural light entering a space and automatically dim or switch off the artificial lighting to maintain the required lux level. A ceiling-mounted sensor continuously monitors the combined light level from daylight and artificial sources, sending a signal to the lighting controller to reduce output when sufficient natural light is available. This approach can reduce lighting energy consumption by 30-60% in spaces with good access to natural daylight, such as offices with large windows or rooflights.',
    category: 'Controls',
    difficulty: 'medium',
  },
  {
    id: 'ld20',
    question: 'Describe how a two-way switching circuit works and give a typical application.',
    answer:
      'A two-way switching circuit uses two single-pole changeover switches (two-way switches), each with a common terminal (C) and two strapper terminals (L1 and L2). The common of one switch is connected to the line supply, the common of the other is connected to the lamp, and the two L1 and L2 terminals are cross-connected via two strappers. Toggling either switch changes the path of current flow, allowing the lamp to be switched on or off from either location. The typical application is controlling a hallway or staircase light from both the top and bottom of the stairs.',
    category: 'Controls',
    difficulty: 'easy',
  },
  {
    id: 'ld21',
    question:
      'How does an intermediate switching circuit differ from a two-way circuit, and when is it used?',
    answer:
      'An intermediate switching circuit adds one or more intermediate switches between two two-way switches to provide control from three or more positions. The intermediate switch is a double-pole changeover device with four terminals that either connects the strappers straight through or cross-connects them. It is wired into the two strapper conductors between the two-way switches. Typical applications include long corridors with multiple entry points, open-plan offices with several doors, and large rooms where a single switching position would be inconvenient.',
    category: 'Controls',
    difficulty: 'medium',
  },

  // === Energy Efficiency (ld22–ld25) ===
  {
    id: 'ld22',
    question:
      'What does Part L of the Building Regulations require in relation to lighting in new non-domestic buildings?',
    answer:
      'Part L (Conservation of Fuel and Power) requires that fixed lighting in new non-domestic buildings achieves a minimum average luminaire efficacy of 60 luminaire-lumens per circuit-watt. It also requires automatic lighting controls in appropriate areas, including daylight dimming and occupancy sensing. Metering of lighting circuits must be provided so energy consumption can be monitored. These requirements aim to reduce the energy used by lighting, which can account for 30-40% of total electrical consumption in commercial buildings.',
    category: 'Energy Efficiency',
    difficulty: 'hard',
  },
  {
    id: 'ld23',
    question: 'What is luminaire efficiency and how does it differ from lamp efficacy?',
    answer:
      "Lamp efficacy (lm/W) is the ratio of lumens produced by the lamp to the electrical power it consumes, measuring the efficiency of the light source alone. Luminaire efficiency (or Light Output Ratio, LOR) is the ratio of total lumens emitted by the complete luminaire to the total lumens produced by the lamp(s) inside it, expressed as a percentage. A luminaire with a poor reflector or diffuser may have an LOR of only 50-60%, meaning up to half the lamp's light output is lost within the fitting. Both metrics must be considered when designing an energy-efficient lighting installation.",
    category: 'Energy Efficiency',
    difficulty: 'medium',
  },
  {
    id: 'ld24',
    question:
      'What is the maximum number of points recommended on a domestic lighting circuit, and what is the assumed current per point?',
    answer:
      'BS 7671 Guidance Note 1 and the IET On-Site Guide recommend a maximum of 12 lighting points per circuit, although this is guidance rather than a regulation. The assumed current per lighting point for design purposes is typically 100 W (just under 0.5 A at 230 V) unless the actual load is known. Domestic lighting circuits are typically wired in 1.0 mm² or 1.5 mm² twin and earth cable, protected by a 6 A MCB, giving a maximum circuit capacity of approximately 1380 W.',
    category: 'Energy Efficiency',
    difficulty: 'easy',
  },
  {
    id: 'ld25',
    question:
      'What factors must be considered when designing outdoor lighting, and which standards apply?',
    answer:
      'Outdoor lighting design must consider: IP rating of luminaires (minimum IP65 for exposed locations); resistance to UV degradation and corrosion; photocell control for automatic dusk-to-dawn operation; light pollution and upward light ratio to comply with environmental guidance. BS 5489 covers road and public amenity lighting, specifying lighting classes based on road type and traffic speed. Luminaires must withstand wind loading, and cable entries must maintain the IP rating. Part L Building Regulations also apply to external lighting, requiring efficacy targets and automatic switching controls to prevent lights operating during daylight hours.',
    category: 'Energy Efficiency',
    difficulty: 'hard',
  },
];
