import { useState, useMemo, useCallback } from "react";
import { ArrowLeft, Award, BookOpen, CheckCircle, Clock, Target, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fibre Optics Technology - Mock Exam";
const DESCRIPTION = "Comprehensive 30-question mock examination randomly selected from 250 questions covering all modules of the Fibre Optics Technology course.";

const QUESTIONS_PER_EXAM = 30;
const PASS_PERCENTAGE = 80;

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const mockExamQuestions = [
  // Module 1: Fundamentals of Light and Fibre
  {
    question: "What is the phenomenon that allows light to travel through an optical fibre?",
    options: [
      { text: "Refraction only", isCorrect: false },
      { text: "Total internal reflection", isCorrect: true },
      { text: "Diffraction", isCorrect: false },
      { text: "Polarisation", isCorrect: false }
    ],
    explanation: "Total internal reflection occurs when light hits the core/cladding boundary at an angle greater than the critical angle, causing it to reflect back into the core rather than escaping."
  },
  {
    question: "What is the typical core diameter of singlemode fibre?",
    options: [
      { text: "50 micrometres", isCorrect: false },
      { text: "62.5 micrometres", isCorrect: false },
      { text: "8-9 micrometres", isCorrect: true },
      { text: "125 micrometres", isCorrect: false }
    ],
    explanation: "Singlemode fibre has a small core diameter of 8-9 micrometres (typically 9µm for OS2), which allows only one mode of light to propagate. The 125µm dimension refers to the cladding diameter."
  },
  {
    question: "Which fibre type is best suited for long-distance telecommunications applications?",
    options: [
      { text: "OM1 multimode", isCorrect: false },
      { text: "OM4 multimode", isCorrect: false },
      { text: "OS2 singlemode", isCorrect: true },
      { text: "OM3 multimode", isCorrect: false }
    ],
    explanation: "OS2 singlemode fibre has the lowest attenuation (0.35 dB/km at 1310nm, 0.22 dB/km at 1550nm) and no modal dispersion, making it ideal for long-distance transmission."
  },
  {
    question: "What does the 'numerical aperture' (NA) of an optical fibre describe?",
    options: [
      { text: "The fibre's resistance to bending", isCorrect: false },
      { text: "The light-gathering ability and acceptance angle", isCorrect: true },
      { text: "The maximum data rate supported", isCorrect: false },
      { text: "The fibre's tensile strength", isCorrect: false }
    ],
    explanation: "Numerical aperture describes the range of angles over which the fibre can accept light. A higher NA means the fibre can gather light over a wider acceptance cone."
  },
  {
    question: "What is the primary cause of attenuation in optical fibre at 1550nm?",
    options: [
      { text: "Modal dispersion", isCorrect: false },
      { text: "Rayleigh scattering and absorption", isCorrect: true },
      { text: "Connector reflections", isCorrect: false },
      { text: "Temperature variations", isCorrect: false }
    ],
    explanation: "Intrinsic attenuation is caused by Rayleigh scattering (microscopic density variations in the glass) and material absorption. At 1550nm, attenuation is minimised, making it ideal for long-haul transmission."
  },

  // Module 2: Fibre Types and Specifications
  {
    question: "What is the modal bandwidth rating of OM4 multimode fibre at 850nm?",
    options: [
      { text: "500 MHz·km", isCorrect: false },
      { text: "2000 MHz·km", isCorrect: false },
      { text: "4700 MHz·km", isCorrect: true },
      { text: "200 MHz·km", isCorrect: false }
    ],
    explanation: "OM4 fibre has an effective modal bandwidth of 4700 MHz·km at 850nm with laser sources, enabling longer reach for high-speed applications compared to OM3 (2000 MHz·km)."
  },
  {
    question: "What does 'G.657' refer to in singlemode fibre specifications?",
    options: [
      { text: "Maximum attenuation coefficient", isCorrect: false },
      { text: "Bend-insensitive fibre standards", isCorrect: true },
      { text: "Connector specifications", isCorrect: false },
      { text: "Testing requirements", isCorrect: false }
    ],
    explanation: "ITU-T G.657 defines bend-insensitive singlemode fibre specifications, with variants A1, A2, B2, and B3 specifying increasingly tight bend radius tolerance."
  },
  {
    question: "What distinguishes OM5 fibre from OM4?",
    options: [
      { text: "Larger core diameter", isCorrect: false },
      { text: "Optimised for SWDM (multiple wavelengths 850-953nm)", isCorrect: true },
      { text: "Higher tensile strength", isCorrect: false },
      { text: "Better performance at 1550nm", isCorrect: false }
    ],
    explanation: "OM5 (wideband multimode) is optimised for shortwave wavelength division multiplexing (SWDM) across 850-953nm, enabling higher capacity over duplex connections."
  },
  {
    question: "What is the cladding diameter for both singlemode and standard multimode fibres?",
    options: [
      { text: "50 micrometres", isCorrect: false },
      { text: "62.5 micrometres", isCorrect: false },
      { text: "125 micrometres", isCorrect: true },
      { text: "250 micrometres", isCorrect: false }
    ],
    explanation: "The cladding diameter is standardised at 125 micrometres for both singlemode (9/125) and multimode (50/125 or 62.5/125) fibres to ensure mechanical compatibility."
  },
  {
    question: "What is the maximum attenuation for OS2 singlemode fibre at 1550nm?",
    options: [
      { text: "0.5 dB/km", isCorrect: false },
      { text: "0.35 dB/km", isCorrect: false },
      { text: "0.22 dB/km", isCorrect: true },
      { text: "1.0 dB/km", isCorrect: false }
    ],
    explanation: "OS2 singlemode fibre specifies maximum attenuation of 0.22 dB/km at 1550nm and 0.35 dB/km at 1310nm, making it excellent for long-distance transmission."
  },

  // Module 3: Cable Constructions
  {
    question: "What is the primary function of water-blocking gel or tape in loose-tube cables?",
    options: [
      { text: "To increase fibre count capacity", isCorrect: false },
      { text: "To prevent water migration along the cable", isCorrect: true },
      { text: "To reduce attenuation", isCorrect: false },
      { text: "To improve bend radius", isCorrect: false }
    ],
    explanation: "Water-blocking compounds (gel or dry-block tape) prevent water from entering and migrating along the cable, protecting fibres from moisture damage and freezing."
  },
  {
    question: "What does 'LSZH' stand for in cable jacket specifications?",
    options: [
      { text: "Low Signal Zero Harmonic", isCorrect: false },
      { text: "Low Smoke Zero Halogen", isCorrect: true },
      { text: "Light Signal Zero Hum", isCorrect: false },
      { text: "Long Span Zero Hang", isCorrect: false }
    ],
    explanation: "LSZH (Low Smoke Zero Halogen) jackets emit minimal smoke and no toxic halogen gases when burned, making them required for indoor installations in occupied spaces."
  },
  {
    question: "What type of cable construction is best suited for direct burial without conduit?",
    options: [
      { text: "Tight-buffered indoor cable", isCorrect: false },
      { text: "Armoured loose-tube with PE jacket", isCorrect: true },
      { text: "LSZH distribution cable", isCorrect: false },
      { text: "Ribbon cable", isCorrect: false }
    ],
    explanation: "Armoured loose-tube cables with polyethylene (PE) outer jackets provide mechanical protection (rodents, crushing) and moisture resistance needed for direct burial applications."
  },
  {
    question: "What is an advantage of ribbon fibre cable construction?",
    options: [
      { text: "Better flexibility around corners", isCorrect: false },
      { text: "High fibre density and mass-fusion splice capability", isCorrect: true },
      { text: "Easier individual fibre access", isCorrect: false },
      { text: "Lower cost per fibre", isCorrect: false }
    ],
    explanation: "Ribbon cables enable high fibre counts in compact packages and allow mass-fusion splicing of 12 fibres simultaneously, significantly reducing splicing time for high-count cables."
  },
  {
    question: "What is the purpose of aramid yarn (Kevlar) in fibre optic cables?",
    options: [
      { text: "Provides electrical grounding", isCorrect: false },
      { text: "Provides tensile strength and strain relief", isCorrect: true },
      { text: "Reduces signal attenuation", isCorrect: false },
      { text: "Prevents water ingress", isCorrect: false }
    ],
    explanation: "Aramid (Kevlar) strength members provide tensile strength to handle pulling forces during installation without transferring stress to the fibres."
  },

  // Module 4: Connectors and Splicing
  {
    question: "What is the ferrule diameter for standard fibre optic connectors (LC, SC, ST)?",
    options: [
      { text: "1.25mm for LC, 2.5mm for SC/ST", isCorrect: true },
      { text: "2.5mm for all types", isCorrect: false },
      { text: "1.25mm for all types", isCorrect: false },
      { text: "3.0mm for SC, 2.5mm for LC/ST", isCorrect: false }
    ],
    explanation: "LC connectors use a 1.25mm ferrule (small form factor), while SC and ST connectors use 2.5mm ferrules. The smaller LC size enables higher port density."
  },
  {
    question: "What is the typical return loss specification for a UPC (Ultra Physical Contact) connector?",
    options: [
      { text: ">30 dB", isCorrect: false },
      { text: ">50 dB", isCorrect: true },
      { text: ">70 dB", isCorrect: false },
      { text: ">20 dB", isCorrect: false }
    ],
    explanation: "UPC connectors typically achieve >50 dB return loss (some specify >55 dB). The slightly domed end-face creates good physical contact, minimising reflections."
  },
  {
    question: "Why cannot APC (Angled Physical Contact) connectors be mated with UPC connectors?",
    options: [
      { text: "Different ferrule diameters", isCorrect: false },
      { text: "The 8° angle prevents proper end-face contact, causing high loss", isCorrect: true },
      { text: "Different wavelength requirements", isCorrect: false },
      { text: "Incompatible housing sizes", isCorrect: false }
    ],
    explanation: "APC connectors have an 8° angled end-face. When mated with flat UPC connectors, they make contact at only one point (or no contact), causing extremely high loss and potential damage."
  },
  {
    question: "What is the typical loss achieved by a properly executed fusion splice?",
    options: [
      { text: "0.3-0.5 dB", isCorrect: false },
      { text: "0.5-0.75 dB", isCorrect: false },
      { text: "0.02-0.05 dB", isCorrect: true },
      { text: "0.1-0.2 dB", isCorrect: false }
    ],
    explanation: "Modern fusion splicers achieve very low losses, typically 0.02-0.05 dB for singlemode and slightly higher for multimode. This is much lower than connector losses."
  },
  {
    question: "What is the purpose of a splice protector sleeve (heat shrink)?",
    options: [
      { text: "To improve optical performance", isCorrect: false },
      { text: "To provide mechanical protection and rigidity to the splice point", isCorrect: true },
      { text: "To reduce splice loss", isCorrect: false },
      { text: "To enable re-splicing if needed", isCorrect: false }
    ],
    explanation: "The splice protector (heat-shrink sleeve with strength rod) provides mechanical protection and maintains the alignment of the fused fibres to prevent breakage at this vulnerable point."
  },

  // Module 5: Installation Practices
  {
    question: "What is the maximum recommended pulling tension for standard fibre optic cables?",
    options: [
      { text: "50N", isCorrect: false },
      { text: "600N (varies by cable type)", isCorrect: true },
      { text: "2000N", isCorrect: false },
      { text: "100N", isCorrect: false }
    ],
    explanation: "Maximum pulling tension varies by cable type—typically 600N for standard indoor cables, up to 2700N for outdoor cables with appropriate strength members. Always check manufacturer specifications."
  },
  {
    question: "Why should fibre optic cables not be routed in the same pathway as high-voltage electrical cables?",
    options: [
      { text: "Electromagnetic interference affects optical signals", isCorrect: false },
      { text: "To comply with separation requirements and prevent physical damage", isCorrect: true },
      { text: "The fibre will absorb electrical energy", isCorrect: false },
      { text: "Optical fibres are conductors at high voltage", isCorrect: false }
    ],
    explanation: "While fibre is immune to EMI, codes require separation for safety (avoiding contact with high voltage), maintenance access, and preventing physical damage during electrical work."
  },
  {
    question: "What is the purpose of using cable lubricant during fibre cable installation?",
    options: [
      { text: "To improve optical transmission", isCorrect: false },
      { text: "To reduce friction and pulling tension during installation", isCorrect: true },
      { text: "To seal the conduit against water", isCorrect: false },
      { text: "To prevent static buildup", isCorrect: false }
    ],
    explanation: "Cable lubricant reduces friction between the cable jacket and conduit, significantly reducing required pulling tension and preventing cable damage during long pulls."
  },
  {
    question: "What percentage of conduit cross-sectional area should be filled when installing fibre cables?",
    options: [
      { text: "75%", isCorrect: false },
      { text: "50%", isCorrect: false },
      { text: "40% maximum", isCorrect: true },
      { text: "25%", isCorrect: false }
    ],
    explanation: "The 40% fill ratio allows for cable movement during pulling and temperature expansion/contraction, and leaves space for future cable additions."
  },
  {
    question: "What tool should be used to verify fibre continuity and identify break locations during installation?",
    options: [
      { text: "Optical power meter", isCorrect: false },
      { text: "Visual Fault Locator (VFL)", isCorrect: true },
      { text: "OTDR only", isCorrect: false },
      { text: "Multimeter", isCorrect: false }
    ],
    explanation: "A VFL (Visual Fault Locator) injects visible red light (650nm) that escapes at breaks, tight bends, and faulty connections, allowing visual identification of fault locations."
  },

  // Module 6: Standards and Design
  {
    question: "According to TIA-568, what is the maximum allowable loss for a mated connector pair in loss budget calculations?",
    options: [
      { text: "0.2 dB", isCorrect: false },
      { text: "0.5 dB", isCorrect: true },
      { text: "0.75 dB", isCorrect: false },
      { text: "1.0 dB", isCorrect: false }
    ],
    explanation: "TIA-568 specifies 0.5 dB maximum loss per mated connector pair for loss budget calculations. Actual field measurements should be better than this value."
  },
  {
    question: "What safety margin is typically included in optical loss budget calculations?",
    options: [
      { text: "1 dB", isCorrect: false },
      { text: "3 dB", isCorrect: true },
      { text: "6 dB", isCorrect: false },
      { text: "0.5 dB", isCorrect: false }
    ],
    explanation: "A 3 dB safety margin is standard to account for future repairs (additional splices), connector degradation, temperature effects, and cable aging over the system's lifetime."
  },
  {
    question: "In structured cabling design, what is the maximum horizontal cable length from telecommunications room to work area outlet?",
    options: [
      { text: "50 metres", isCorrect: false },
      { text: "90 metres", isCorrect: true },
      { text: "100 metres", isCorrect: false },
      { text: "300 metres", isCorrect: false }
    ],
    explanation: "TIA-568 specifies 90 metres maximum for the horizontal permanent link, with an additional 10 metres allowed for equipment cords and patch leads (100m total channel)."
  },
  {
    question: "What is the formula for calculating optical power budget?",
    options: [
      { text: "Transmitter power × Receiver sensitivity", isCorrect: false },
      { text: "Transmitter output power (dBm) - Receiver sensitivity (dBm)", isCorrect: true },
      { text: "Total link loss ÷ Safety margin", isCorrect: false },
      { text: "Cable length × Attenuation coefficient", isCorrect: false }
    ],
    explanation: "Power budget equals transmitter output power minus receiver sensitivity (both in dBm). This gives the maximum allowable link loss in dB for reliable communication."
  },
  {
    question: "What is the primary purpose of the TIA-942 standard?",
    options: [
      { text: "Residential fibre installation", isCorrect: false },
      { text: "Data centre infrastructure and telecommunications standards", isCorrect: true },
      { text: "Outdoor cable installation", isCorrect: false },
      { text: "Connector testing procedures", isCorrect: false }
    ],
    explanation: "TIA-942 provides comprehensive standards for data centre telecommunications infrastructure, including structured cabling topology, redundancy, and environmental requirements."
  },

  // More Module 6 questions
  {
    question: "What maximum distance can OM4 multimode fibre support at 10 Gigabit Ethernet (850nm)?",
    options: [
      { text: "100 metres", isCorrect: false },
      { text: "300 metres", isCorrect: false },
      { text: "400 metres", isCorrect: true },
      { text: "550 metres", isCorrect: false }
    ],
    explanation: "OM4 supports 10GbE (10GBASE-SR) up to 400 metres at 850nm, compared to 300 metres for OM3. The limitation is modal bandwidth, not attenuation."
  },
  {
    question: "What distinguishes 'channel' testing from 'permanent link' testing?",
    options: [
      { text: "Channel testing is less accurate", isCorrect: false },
      { text: "Channel includes equipment cords; permanent link tests only installed cabling", isCorrect: true },
      { text: "They use different test equipment", isCorrect: false },
      { text: "Permanent link testing is obsolete", isCorrect: false }
    ],
    explanation: "Channel testing measures end-to-end including equipment patch cords. Permanent link testing excludes these, measuring only the installed infrastructure. Both have different loss limits."
  },

  // Module 7: Fault Finding and Maintenance
  {
    question: "What is the most common cause of fibre optic connection failures?",
    options: [
      { text: "Fibre breaks", isCorrect: false },
      { text: "Connector contamination", isCorrect: true },
      { text: "Wrong fibre type", isCorrect: false },
      { text: "Temperature damage", isCorrect: false }
    ],
    explanation: "Studies consistently show that connector contamination causes the majority (up to 80%) of fibre connection problems. Proper cleaning and inspection prevents most failures."
  },
  {
    question: "What magnification is typically required for proper fibre end-face inspection?",
    options: [
      { text: "10× to 50×", isCorrect: false },
      { text: "200× to 400×", isCorrect: true },
      { text: "1000× or higher", isCorrect: false },
      { text: "Any magnification works", isCorrect: false }
    ],
    explanation: "200-400× magnification is standard for fibre inspection scopes, providing sufficient detail to see contamination in the core and cladding zones while maintaining adequate field of view."
  },
  {
    question: "What does a 'gainer' event on an OTDR trace indicate?",
    options: [
      { text: "Signal amplification", isCorrect: false },
      { text: "A splice between fibres with different backscatter coefficients", isCorrect: true },
      { text: "OTDR malfunction", isCorrect: false },
      { text: "A connector with gain", isCorrect: false }
    ],
    explanation: "A gainer (apparent gain) occurs when testing from lower-backscatter fibre into higher-backscatter fibre. It's not real gain—bi-directional testing and averaging reveals true loss."
  },
  {
    question: "What is the OTDR 'dead zone'?",
    options: [
      { text: "A faulty section of fibre", isCorrect: false },
      { text: "The distance after a reflective event where events cannot be detected", isCorrect: true },
      { text: "The maximum testing range", isCorrect: false },
      { text: "An area of zero signal", isCorrect: false }
    ],
    explanation: "Dead zones occur after reflective events (connectors) where the OTDR receiver is saturated. The attenuation dead zone determines how close together non-reflective events can be measured."
  },
  {
    question: "What cleaning method should be used first when cleaning fibre connectors?",
    options: [
      { text: "Wet cleaning with IPA", isCorrect: false },
      { text: "Dry cleaning", isCorrect: true },
      { text: "Ultrasonic cleaning", isCorrect: false },
      { text: "Compressed air only", isCorrect: false }
    ],
    explanation: "Dry cleaning should be attempted first as it effectively removes most contamination without risk of solvent residue. Wet cleaning with IPA is used only if dry cleaning fails."
  },
  {
    question: "Which wavelength is most affected by macrobend losses in singlemode fibre?",
    options: [
      { text: "850nm", isCorrect: false },
      { text: "1310nm", isCorrect: false },
      { text: "1550nm (and higher)", isCorrect: true },
      { text: "All wavelengths equally", isCorrect: false }
    ],
    explanation: "Longer wavelengths are more sensitive to bend losses because they have a larger mode field diameter. Testing at 1550nm or 1625nm helps detect bend-related problems."
  },
  {
    question: "What IEC standard defines cleanliness grades for fibre connector end-faces?",
    options: [
      { text: "IEC 61300-3-35", isCorrect: true },
      { text: "IEC 60793", isCorrect: false },
      { text: "IEC 61280", isCorrect: false },
      { text: "IEC 60794", isCorrect: false }
    ],
    explanation: "IEC 61300-3-35 defines inspection zones (core, cladding, contact) and cleanliness requirements for each zone, providing pass/fail criteria for connector end-face quality."
  },
  {
    question: "Why is bi-directional OTDR testing recommended?",
    options: [
      { text: "It tests twice as fast", isCorrect: false },
      { text: "It eliminates gainer effects and gives true splice loss", isCorrect: true },
      { text: "Standards require it", isCorrect: false },
      { text: "It uses less battery power", isCorrect: false }
    ],
    explanation: "Bi-directional testing and averaging eliminates the gainer effect caused by different backscatter coefficients between fibre types, revealing the true splice loss value."
  },
  {
    question: "What is the purpose of a launch fibre when using an OTDR?",
    options: [
      { text: "To protect the OTDR port", isCorrect: false },
      { text: "To move the first connector outside the OTDR's dead zone", isCorrect: true },
      { text: "To extend testing range", isCorrect: false },
      { text: "To convert connector types", isCorrect: false }
    ],
    explanation: "A launch fibre (100-500m) moves the first connection of the link under test beyond the OTDR's dead zone, allowing proper characterisation of that connector."
  },
  {
    question: "What labelling standard is referenced for structured cabling administration?",
    options: [
      { text: "TIA-568", isCorrect: false },
      { text: "TIA-606", isCorrect: true },
      { text: "TIA-942", isCorrect: false },
      { text: "ISO 11801", isCorrect: false }
    ],
    explanation: "ANSI/TIA-606 (currently 606-C) provides comprehensive administration standards for telecommunications infrastructure labelling, including cables, pathways, and spaces."
  },

  // Additional comprehensive questions
  {
    question: "What causes 'modal dispersion' in multimode fibre?",
    options: [
      { text: "Different wavelengths travelling at different speeds", isCorrect: false },
      { text: "Different light modes (paths) arriving at different times", isCorrect: true },
      { text: "Temperature variations along the fibre", isCorrect: false },
      { text: "Connector reflections", isCorrect: false }
    ],
    explanation: "In multimode fibre, different modes (light ray paths) travel slightly different distances through the core, arriving at different times. This spreads the signal and limits bandwidth over distance."
  },
  {
    question: "What is the typical splice loss allowance used in loss budget calculations for fusion splices?",
    options: [
      { text: "0.3 dB", isCorrect: false },
      { text: "0.5 dB", isCorrect: false },
      { text: "0.1 dB", isCorrect: true },
      { text: "0.75 dB", isCorrect: false }
    ],
    explanation: "Loss budget calculations typically use 0.1 dB per fusion splice as a worst-case allowance. Actual fusion splice losses are often much lower (0.02-0.05 dB)."
  },
  {
    question: "What does the green colour of an APC connector end-face indicate?",
    options: [
      { text: "The fibre is multimode", isCorrect: false },
      { text: "It has an angled (8°) physical contact end-face", isCorrect: true },
      { text: "It's a high-power laser rated connector", isCorrect: false },
      { text: "The connector is pre-polished", isCorrect: false }
    ],
    explanation: "Green colour coding indicates APC (Angled Physical Contact) connectors with an 8° angled end-face. Blue indicates UPC connectors. This prevents accidental mismating."
  },
  {
    question: "What is the primary advantage of MPO/MTP connectors in data centres?",
    options: [
      { text: "Lower cost than LC connectors", isCorrect: false },
      { text: "High-density parallel connections for 40G/100G+", isCorrect: true },
      { text: "Better signal quality", isCorrect: false },
      { text: "Easier to clean", isCorrect: false }
    ],
    explanation: "MPO/MTP connectors accommodate 12, 24, or more fibres in one connector, enabling high-density parallel optics for 40G, 100G, and 400G applications."
  },
  {
    question: "How should fibre optic cables be stored before installation?",
    options: [
      { text: "In direct sunlight to prevent moisture", isCorrect: false },
      { text: "In original packaging, clean dry location, ends capped", isCorrect: true },
      { text: "Uncoiled and stretched out", isCorrect: false },
      { text: "In refrigerated storage", isCorrect: false }
    ],
    explanation: "Cables should be stored in original packaging (maintains bend radius), in clean dry conditions, with ends capped or sealed to prevent contamination and moisture ingress."
  },
  {
    question: "What is the consequence of exceeding the minimum bend radius during installation?",
    options: [
      { text: "Immediate fibre breakage always occurs", isCorrect: false },
      { text: "Increased attenuation, potential crack initiation, and long-term failure risk", isCorrect: true },
      { text: "No effect if temporary", isCorrect: false },
      { text: "Only affects multimode fibre", isCorrect: false }
    ],
    explanation: "Exceeding bend radius causes increased loss and can initiate micro-cracks in the glass. Even if no immediate failure occurs, the stressed fibre may fail later through static fatigue."
  },
  {
    question: "What test equipment is used to measure absolute optical power levels?",
    options: [
      { text: "OTDR", isCorrect: false },
      { text: "Optical power meter", isCorrect: true },
      { text: "Visual fault locator", isCorrect: false },
      { text: "Fibre identifier", isCorrect: false }
    ],
    explanation: "An optical power meter measures absolute optical power in dBm. When used with a calibrated light source, it measures insertion loss (the difference between reference and measured power)."
  },
  {
    question: "What upgrade option typically provides the lowest cost for increasing backbone capacity?",
    options: [
      { text: "Installing new cable pathways", isCorrect: false },
      { text: "Upgrading transceivers on existing fibres", isCorrect: true },
      { text: "Adding more fibre cables", isCorrect: false },
      { text: "Replacing all infrastructure", isCorrect: false }
    ],
    explanation: "When existing fibre can support higher speeds (within distance limits), upgrading transceivers is far less expensive and disruptive than adding new cables or infrastructure."
  },
  {
    question: "What documentation should be retained for the lifetime of a fibre installation?",
    options: [
      { text: "Only the as-built drawings", isCorrect: false },
      { text: "Test results, as-built drawings, labelling schedules, and material certificates", isCorrect: true },
      { text: "Only the test results", isCorrect: false },
      { text: "Just the purchase records", isCorrect: false }
    ],
    explanation: "Comprehensive documentation (drawings, test results, labelling schedules, material certificates) provides baseline data for troubleshooting, proof of compliance, and planning for future upgrades."
  },
  {
    question: "At what concentration should isopropyl alcohol (IPA) be used for fibre cleaning?",
    options: [
      { text: "70%", isCorrect: false },
      { text: "85%", isCorrect: false },
      { text: "99% or higher", isCorrect: true },
      { text: "50%", isCorrect: false }
    ],
    explanation: "99%+ IPA is recommended because it evaporates quickly without leaving residue. Lower concentrations (70%) contain more water which evaporates slowly and can leave water marks."
  },
  // Additional Module 1 Questions
  {
    question: "What is the critical angle in optical fibre transmission?",
    options: [
      { text: "The angle at which light exits the fibre", isCorrect: false },
      { text: "The minimum angle for total internal reflection to occur", isCorrect: true },
      { text: "The maximum acceptance angle", isCorrect: false },
      { text: "The angle of the fibre end-face polish", isCorrect: false }
    ],
    explanation: "The critical angle is the minimum angle of incidence (measured from normal) at which light is totally internally reflected. Below this angle, light refracts out of the core."
  },
  {
    question: "What is chromatic dispersion in optical fibre?",
    options: [
      { text: "Light changing colour as it travels", isCorrect: false },
      { text: "Different wavelengths travelling at different speeds", isCorrect: true },
      { text: "Multiple modes interfering with each other", isCorrect: false },
      { text: "Light being absorbed by the core material", isCorrect: false }
    ],
    explanation: "Chromatic dispersion occurs because different wavelengths travel at slightly different speeds in glass. This spreads the signal pulse over distance, limiting bandwidth."
  },
  {
    question: "What is the refractive index of pure glass fibre core typically?",
    options: [
      { text: "1.0", isCorrect: false },
      { text: "1.33", isCorrect: false },
      { text: "1.46-1.48", isCorrect: true },
      { text: "2.0", isCorrect: false }
    ],
    explanation: "The refractive index of silica glass fibre core is typically 1.46-1.48. The cladding has a slightly lower index (by about 1%) to enable total internal reflection."
  },
  {
    question: "What wavelength window is commonly called the 'S-band' in fibre optics?",
    options: [
      { text: "850nm", isCorrect: false },
      { text: "1260-1360nm", isCorrect: false },
      { text: "1460-1530nm", isCorrect: true },
      { text: "1565-1625nm", isCorrect: false }
    ],
    explanation: "The S-band (Short wavelength band) covers 1460-1530nm. The O-band is 1260-1360nm, C-band is 1530-1565nm, and L-band is 1565-1625nm."
  },
  {
    question: "What phenomenon limits the maximum power that can be transmitted through singlemode fibre?",
    options: [
      { text: "Modal dispersion", isCorrect: false },
      { text: "Non-linear effects (Brillouin/Raman scattering)", isCorrect: true },
      { text: "Chromatic dispersion only", isCorrect: false },
      { text: "Connector reflection", isCorrect: false }
    ],
    explanation: "At high optical powers, non-linear effects like Stimulated Brillouin Scattering (SBS) and Stimulated Raman Scattering (SRS) cause signal degradation and power limitations."
  },
  {
    question: "What is the 'mode field diameter' in singlemode fibre?",
    options: [
      { text: "The physical core diameter", isCorrect: false },
      { text: "The effective diameter of the light-carrying region", isCorrect: true },
      { text: "The cladding diameter", isCorrect: false },
      { text: "The buffer coating diameter", isCorrect: false }
    ],
    explanation: "Mode field diameter (MFD) is larger than the physical core, as light extends slightly into the cladding. For OS2 fibre at 1310nm, MFD is typically 9.2µm."
  },
  {
    question: "Why is the 1310nm wavelength historically important for singlemode fibre?",
    options: [
      { text: "Lowest attenuation of all wavelengths", isCorrect: false },
      { text: "Zero chromatic dispersion in conventional fibre", isCorrect: true },
      { text: "Cheapest laser sources available", isCorrect: false },
      { text: "Maximum power handling capability", isCorrect: false }
    ],
    explanation: "Conventional singlemode fibre (G.652) has zero chromatic dispersion around 1310nm, eliminating dispersion-related signal spreading at this wavelength."
  },
  {
    question: "What is the 'water peak' in optical fibre attenuation?",
    options: [
      { text: "Increased loss around 1383nm due to hydroxyl ions", isCorrect: true },
      { text: "Damage caused by water entering the cable", isCorrect: false },
      { text: "Maximum water pressure the cable can withstand", isCorrect: false },
      { text: "Humidity limit for installation", isCorrect: false }
    ],
    explanation: "The water peak is increased attenuation around 1383nm caused by hydroxyl (OH) ions in the glass. Low water peak (LWP) fibres like G.652.D eliminate this for CWDM use."
  },
  // Additional Module 2 Questions
  {
    question: "What does 'OM' stand for in multimode fibre designations?",
    options: [
      { text: "Optical Mode", isCorrect: false },
      { text: "Optical Multimode", isCorrect: true },
      { text: "Optimised Multimode", isCorrect: false },
      { text: "Outer Measurement", isCorrect: false }
    ],
    explanation: "OM stands for Optical Multimode, as defined in ISO/IEC 11801. OM1 through OM5 designate different performance grades of multimode fibre."
  },
  {
    question: "What is the core diameter of OM1 multimode fibre?",
    options: [
      { text: "50µm", isCorrect: false },
      { text: "62.5µm", isCorrect: true },
      { text: "9µm", isCorrect: false },
      { text: "100µm", isCorrect: false }
    ],
    explanation: "OM1 fibre has a 62.5µm core (62.5/125). OM2 through OM5 all use 50µm cores but with improved modal bandwidth characteristics."
  },
  {
    question: "What colour jacket typically identifies OM3/OM4 multimode fibre?",
    options: [
      { text: "Orange", isCorrect: false },
      { text: "Yellow", isCorrect: false },
      { text: "Aqua", isCorrect: true },
      { text: "Blue", isCorrect: false }
    ],
    explanation: "Aqua (light blue) jackets identify laser-optimised 50µm multimode (OM3/OM4). Orange is OM1/OM2, yellow is singlemode, and lime green is OM5."
  },
  {
    question: "What is 'effective modal bandwidth' (EMB)?",
    options: [
      { text: "The bandwidth measured with LED sources", isCorrect: false },
      { text: "The bandwidth when using laser sources accounting for launch conditions", isCorrect: true },
      { text: "The theoretical maximum bandwidth", isCorrect: false },
      { text: "The bandwidth per kilometre of fibre", isCorrect: false }
    ],
    explanation: "EMB measures bandwidth with laser sources, accounting for real-world launch conditions. It's more relevant for modern high-speed applications than overfilled launch bandwidth."
  },
  {
    question: "What is the typical attenuation of OM3 multimode fibre at 850nm?",
    options: [
      { text: "0.22 dB/km", isCorrect: false },
      { text: "1.5 dB/km", isCorrect: false },
      { text: "3.5 dB/km", isCorrect: true },
      { text: "5.0 dB/km", isCorrect: false }
    ],
    explanation: "Multimode fibre has higher attenuation than singlemode. OM3 specifies maximum 3.5 dB/km at 850nm, compared to 0.35 dB/km for OS2 at 1310nm."
  },
  {
    question: "What does ITU-T G.652.D specify?",
    options: [
      { text: "Bend-insensitive singlemode fibre", isCorrect: false },
      { text: "Standard singlemode fibre with low water peak", isCorrect: true },
      { text: "Dispersion-shifted fibre", isCorrect: false },
      { text: "Multimode fibre specifications", isCorrect: false }
    ],
    explanation: "G.652.D specifies conventional singlemode fibre with low water peak, enabling full spectrum (O through L band) CWDM transmission without the 1383nm absorption peak."
  },
  {
    question: "What is the minimum bend radius specification for G.657.A1 fibre?",
    options: [
      { text: "30mm", isCorrect: false },
      { text: "15mm", isCorrect: false },
      { text: "10mm", isCorrect: true },
      { text: "5mm", isCorrect: false }
    ],
    explanation: "G.657.A1 bend-insensitive fibre specifies 10mm minimum bend radius with negligible added loss. G.657.B3 allows even tighter 5mm bends for extreme applications."
  },
  {
    question: "What is the maximum distance for 100GBASE-SR4 over OM4 fibre?",
    options: [
      { text: "70 metres", isCorrect: false },
      { text: "100 metres", isCorrect: false },
      { text: "150 metres", isCorrect: true },
      { text: "300 metres", isCorrect: false }
    ],
    explanation: "100GBASE-SR4 using parallel optics over OM4 reaches 150 metres maximum. OM3 supports 100 metres for the same application."
  },
  {
    question: "What differentiates G.654 fibre from standard G.652?",
    options: [
      { text: "Smaller core diameter", isCorrect: false },
      { text: "Optimised for 1550nm with larger effective area for submarine/long-haul", isCorrect: true },
      { text: "Multimode capability", isCorrect: false },
      { text: "Improved bend performance", isCorrect: false }
    ],
    explanation: "G.654 fibre has ultra-low loss at 1550nm and larger effective area to reduce non-linear effects, making it ideal for submarine and ultra-long-haul terrestrial links."
  },
  // Additional Module 3 Questions
  {
    question: "What is the typical diameter of tight-buffered fibre including the buffer?",
    options: [
      { text: "125µm", isCorrect: false },
      { text: "250µm", isCorrect: false },
      { text: "900µm", isCorrect: true },
      { text: "2.0mm", isCorrect: false }
    ],
    explanation: "Tight-buffered fibre has a 900µm (0.9mm) outer diameter. The buffer is applied directly over the 250µm coated fibre, making it more robust for indoor handling."
  },
  {
    question: "What is the purpose of the central strength member in loose-tube cables?",
    options: [
      { text: "To carry optical signals", isCorrect: false },
      { text: "To provide rigidity and resist crushing/bending forces", isCorrect: true },
      { text: "To enable electrical grounding", isCorrect: false },
      { text: "To identify the cable manufacturer", isCorrect: false }
    ],
    explanation: "The central strength member (steel, glass-reinforced plastic, or aramid) provides structural support, prevents excessive bending, and resists crushing forces."
  },
  {
    question: "What does 'SWA' mean in cable specifications?",
    options: [
      { text: "Single Wire Armour", isCorrect: false },
      { text: "Steel Wire Armoured", isCorrect: true },
      { text: "Standard Waterproof Assembly", isCorrect: false },
      { text: "Stranded Wire Application", isCorrect: false }
    ],
    explanation: "SWA (Steel Wire Armoured) cables have steel wire armour providing mechanical protection against impact, crushing, and rodent attack for direct burial."
  },
  {
    question: "Why are loose-tube cables preferred for outdoor installations?",
    options: [
      { text: "They are cheaper to manufacture", isCorrect: false },
      { text: "Fibres are isolated from external mechanical and thermal stresses", isCorrect: true },
      { text: "They have better optical performance", isCorrect: false },
      { text: "They are easier to terminate", isCorrect: false }
    ],
    explanation: "In loose-tube construction, fibres float freely in gel-filled tubes, isolating them from cable expansion/contraction with temperature changes and external mechanical forces."
  },
  {
    question: "What is a 'breakout' style cable construction?",
    options: [
      { text: "Cable designed to be split at failure points", isCorrect: false },
      { text: "Individual sub-cables that can be separated for direct termination", isCorrect: true },
      { text: "Emergency access cable design", isCorrect: false },
      { text: "Pre-terminated cable assemblies", isCorrect: false }
    ],
    explanation: "Breakout cables contain individual tight-buffered fibres with their own jackets inside the main cable, allowing separation for direct connector termination without fan-out kits."
  },
  {
    question: "What is the purpose of ripcords in fibre optic cables?",
    options: [
      { text: "To provide additional strength", isCorrect: false },
      { text: "To enable safe jacket removal without cutting tools", isCorrect: true },
      { text: "To identify fibre colours", isCorrect: false },
      { text: "To block water migration", isCorrect: false }
    ],
    explanation: "Ripcords are embedded strings that can be pulled to slit the cable jacket lengthwise, enabling safe jacket removal without risk of damaging the fibres inside."
  },
  {
    question: "What type of outer jacket material is required for plenum-rated cables?",
    options: [
      { text: "Standard PVC", isCorrect: false },
      { text: "Polyethylene (PE)", isCorrect: false },
      { text: "Low-smoke materials meeting fire safety standards (e.g., FEP, PVDF)", isCorrect: true },
      { text: "Rubber", isCorrect: false }
    ],
    explanation: "Plenum-rated cables use special jacket materials (FEP, PVDF) that meet strict fire safety codes for air-handling spaces, limiting smoke and flame spread."
  },
  {
    question: "What is a 'micro-cable' in fibre optics?",
    options: [
      { text: "Cable with micro-sized connectors", isCorrect: false },
      { text: "High-density cable with very small outer diameter for microduct installation", isCorrect: true },
      { text: "Cable for microscope fibre illumination", isCorrect: false },
      { text: "Pre-terminated patch cord", isCorrect: false }
    ],
    explanation: "Micro-cables have very small outer diameters (typically 2-6mm) for installation in microducts, maximising duct utilisation in congested pathways."
  },
  {
    question: "What is 'blown fibre' technology?",
    options: [
      { text: "Fibre manufactured using blown glass techniques", isCorrect: false },
      { text: "Installing fibre units into pre-installed tubes using air pressure", isCorrect: true },
      { text: "Air-cooled laser transmission", isCorrect: false },
      { text: "Pneumatic testing of fibre connections", isCorrect: false }
    ],
    explanation: "Blown fibre uses compressed air to install fibre units into pre-laid microduct tubes, allowing network expansion without pulling new cables through full routes."
  },
  // Additional Module 4 Questions - Connectors and Splicing
  {
    question: "What does 'PC' stand for in connector polishing terminology?",
    options: [
      { text: "Perfect Connection", isCorrect: false },
      { text: "Physical Contact", isCorrect: true },
      { text: "Polished Core", isCorrect: false },
      { text: "Precision Cut", isCorrect: false }
    ],
    explanation: "PC (Physical Contact) refers to the slightly curved (domed) end-face polish that ensures the fibre cores make direct physical contact, reducing air gaps and reflections."
  },
  {
    question: "What return loss is typically achieved by APC connectors?",
    options: [
      { text: ">30 dB", isCorrect: false },
      { text: ">50 dB", isCorrect: false },
      { text: ">60-70 dB", isCorrect: true },
      { text: ">20 dB", isCorrect: false }
    ],
    explanation: "APC connectors achieve excellent return loss (>60-70 dB) because the 8° angle directs any reflected light away from the fibre core, preventing it from travelling back to the source."
  },
  {
    question: "What is the standard colour coding for an SC/UPC connector?",
    options: [
      { text: "Green", isCorrect: false },
      { text: "Blue", isCorrect: true },
      { text: "Orange", isCorrect: false },
      { text: "White", isCorrect: false }
    ],
    explanation: "Blue housing identifies UPC (flat/domed) polished connectors. Green identifies APC (angled) connectors. This colour coding prevents accidental mismating of different polish types."
  },
  {
    question: "What is a 'mechanical splice'?",
    options: [
      { text: "A splice made by heat fusion", isCorrect: false },
      { text: "A splice using alignment fixtures and index-matching gel", isCorrect: true },
      { text: "A temporary test connection", isCorrect: false },
      { text: "A splice requiring special mechanical tools", isCorrect: false }
    ],
    explanation: "Mechanical splices align fibres in a precision fixture and use index-matching gel to reduce reflections. They're faster than fusion splicing but have higher loss (typically 0.1-0.5 dB)."
  },
  {
    question: "What is the purpose of index-matching gel in fibre connections?",
    options: [
      { text: "To improve mechanical strength", isCorrect: false },
      { text: "To reduce reflections by eliminating air gaps", isCorrect: true },
      { text: "To clean the fibre end-face", isCorrect: false },
      { text: "To provide electrical insulation", isCorrect: false }
    ],
    explanation: "Index-matching gel has a refractive index similar to glass, filling air gaps between fibre ends to reduce Fresnel reflections and improve signal transmission."
  },
  {
    question: "What is a 'pigtail' in fibre optic terminations?",
    options: [
      { text: "A loose fibre end in a splice closure", isCorrect: false },
      { text: "A short fibre length with a connector on one end for fusion splicing", isCorrect: true },
      { text: "A damaged fibre that has curled", isCorrect: false },
      { text: "A type of cable strain relief", isCorrect: false }
    ],
    explanation: "A pigtail is a short (typically 1-3m) fibre with a factory-terminated connector on one end. The bare end is fusion spliced to the cable fibre for high-quality terminations."
  },
  {
    question: "What is the typical cleave angle tolerance for quality fusion splices?",
    options: [
      { text: "Less than 5°", isCorrect: false },
      { text: "Less than 2°", isCorrect: false },
      { text: "Less than 1° (ideally <0.5°)", isCorrect: true },
      { text: "Less than 10°", isCorrect: false }
    ],
    explanation: "High-quality fusion splices require cleave angles less than 1°, with <0.5° ideal. Poor cleave angles cause fibre misalignment and increased splice loss."
  },
  {
    question: "What is the function of the 'arc' in fusion splicing?",
    options: [
      { text: "To clean the fibre ends", isCorrect: false },
      { text: "To melt and fuse the glass fibre ends together", isCorrect: true },
      { text: "To test the splice quality", isCorrect: false },
      { text: "To align the fibres precisely", isCorrect: false }
    ],
    explanation: "The electric arc creates intense localised heat that melts the glass fibre ends, allowing them to fuse together into a continuous optical path when cooled."
  },
  {
    question: "What does 'MTP' stand for in high-density connectors?",
    options: [
      { text: "Multi-Terminal Port", isCorrect: false },
      { text: "Multi-fibre Termination Push-on (trademarked MPO variant)", isCorrect: true },
      { text: "Mechanical Transfer Point", isCorrect: false },
      { text: "Maximum Transmission Protocol", isCorrect: false }
    ],
    explanation: "MTP is US Conec's trademarked, enhanced version of the MPO connector with improved performance features. MPO is the generic TIA standard for multi-fibre connectors."
  },
  {
    question: "What causes 'Fresnel reflection' at fibre connections?",
    options: [
      { text: "Contamination on the end-face", isCorrect: false },
      { text: "Refractive index difference at glass-air interface", isCorrect: true },
      { text: "Core misalignment", isCorrect: false },
      { text: "Damaged cladding", isCorrect: false }
    ],
    explanation: "Fresnel reflection occurs at any interface between materials of different refractive indices (glass-air). Approximately 4% of light is reflected at each glass-air interface."
  },
  {
    question: "What polarity configuration uses Key-up to Key-up patch cords?",
    options: [
      { text: "Type A (straight)", isCorrect: false },
      { text: "Type B (reversed)", isCorrect: true },
      { text: "Type C (pairs reversed)", isCorrect: false },
      { text: "Universal polarity", isCorrect: false }
    ],
    explanation: "Type B polarity uses Key-up to Key-up patch cords, with the array reversed at each end of the trunk cable. Different polarity methods exist to maintain proper Tx-Rx connections."
  },
  {
    question: "What is 'core eccentricity' in fibre splicing?",
    options: [
      { text: "The fibre core being off-centre from the cladding", isCorrect: true },
      { text: "An elliptical core shape", isCorrect: false },
      { text: "Core diameter variation", isCorrect: false },
      { text: "Refractive index irregularities", isCorrect: false }
    ],
    explanation: "Core eccentricity is when the fibre core is not perfectly centred within the cladding. This causes splice loss when joining fibres, as the cores may not align even with cladding alignment."
  },
  // Additional Module 5 Questions - Installation Practices
  {
    question: "What is the typical minimum bend radius for loose-tube cable during installation (under tension)?",
    options: [
      { text: "5× cable diameter", isCorrect: false },
      { text: "10× cable diameter", isCorrect: false },
      { text: "20× cable diameter", isCorrect: true },
      { text: "30× cable diameter", isCorrect: false }
    ],
    explanation: "Under tension during installation, minimum bend radius is typically 20× cable diameter. After installation (no tension), this relaxes to 10× diameter."
  },
  {
    question: "Why should figure-8 cable loops be avoided when coiling fibre?",
    options: [
      { text: "They waste cable length", isCorrect: false },
      { text: "They introduce twists that can stress the fibre", isCorrect: true },
      { text: "They make the cable harder to uncoil", isCorrect: false },
      { text: "They increase attenuation temporarily", isCorrect: false }
    ],
    explanation: "Figure-8 loops introduce 180° twists with each loop. When the cable is uncoiled and pulled, these twists accumulate and can overstress and damage the fibres."
  },
  {
    question: "What is the recommended practice when pulling fibre cable through multiple bends?",
    options: [
      { text: "Use maximum pulling speed to reduce time", isCorrect: false },
      { text: "Use intermediate pull points to reduce total tension", isCorrect: true },
      { text: "Apply heat to soften the cable", isCorrect: false },
      { text: "Remove all bends from the route first", isCorrect: false }
    ],
    explanation: "Intermediate pulling (pull-in from multiple access points) reduces cumulative friction and tension, preventing cable damage when routes have many bends."
  },
  {
    question: "What should be done if the maximum pulling tension is reached during installation?",
    options: [
      { text: "Continue pulling slowly", isCorrect: false },
      { text: "Stop immediately and investigate the cause", isCorrect: true },
      { text: "Increase lubrication and continue", isCorrect: false },
      { text: "Switch to a stronger pulling grip", isCorrect: false }
    ],
    explanation: "Exceeding rated tension can damage fibres. Stop immediately, identify the obstruction or friction source, and resolve before continuing."
  },
  {
    question: "What is a 'cable pull box' used for?",
    options: [
      { text: "Storing spare cable", isCorrect: false },
      { text: "Providing access for intermediate pulls and cable management at changes of direction", isCorrect: true },
      { text: "Testing cable during installation", isCorrect: false },
      { text: "Distributing cables to multiple destinations", isCorrect: false }
    ],
    explanation: "Pull boxes provide access points for intermediate pulls on long runs, allow cable to be re-gripped, and provide space for managing cable at direction changes."
  },
  {
    question: "What is the purpose of a 'cable sock' or 'pulling grip'?",
    options: [
      { text: "To protect the cable end during storage", isCorrect: false },
      { text: "To distribute pulling force evenly over the cable strength members", isCorrect: true },
      { text: "To identify the cable type", isCorrect: false },
      { text: "To seal the cable end against moisture", isCorrect: false }
    ],
    explanation: "Cable socks grip the cable securely and transfer pulling tension to the strength members, not the fibres. Different designs suit different cable constructions."
  },
  {
    question: "What environmental factor must be monitored when installing fibre cable in cold conditions?",
    options: [
      { text: "Humidity only", isCorrect: false },
      { text: "Cable temperature - cables become brittle below rated temperature", isCorrect: true },
      { text: "Wind speed", isCorrect: false },
      { text: "Atmospheric pressure", isCorrect: false }
    ],
    explanation: "Most cables have minimum installation temperature ratings (typically 0°C to -30°C depending on type). Below this, jackets become brittle and fibres can be damaged."
  },
  {
    question: "How should fibre slack loops be stored in a splice enclosure?",
    options: [
      { text: "Coiled as tightly as possible to save space", isCorrect: false },
      { text: "In figure-8 patterns for easy access", isCorrect: false },
      { text: "Following the enclosure's fibre management guides, respecting bend radius", isCorrect: true },
      { text: "Randomly placed to prevent pattern stress", isCorrect: false }
    ],
    explanation: "Splice enclosures have specific fibre management trays and routing guides. Following these ensures minimum bend radius is maintained and fibres are organised for future access."
  },
  {
    question: "What must be done before entering a confined space for fibre installation?",
    options: [
      { text: "Check optical power levels", isCorrect: false },
      { text: "Follow confined space entry procedures including atmosphere testing", isCorrect: true },
      { text: "Pre-terminate all connectors", isCorrect: false },
      { text: "Complete all documentation", isCorrect: false }
    ],
    explanation: "Confined spaces (manholes, vaults) require proper safety procedures including atmosphere testing for oxygen levels and hazardous gases, ventilation, and rescue provisions."
  },
  {
    question: "What is 'innerduct' used for in fibre cable installation?",
    options: [
      { text: "Indoor cable protection only", isCorrect: false },
      { text: "A smaller tube installed inside larger conduit to subdivide space", isCorrect: true },
      { text: "Grounding pathway", isCorrect: false },
      { text: "Cable identification", isCorrect: false }
    ],
    explanation: "Innerduct divides larger conduits into smaller pathways, allowing multiple cables to share a conduit while remaining separated and enabling easier future upgrades."
  },
  {
    question: "What is the recommended service loop length at termination points?",
    options: [
      { text: "0.5 metres", isCorrect: false },
      { text: "1-2 metres", isCorrect: false },
      { text: "3-5 metres or as specified for the application", isCorrect: true },
      { text: "10 metres minimum", isCorrect: false }
    ],
    explanation: "Service loops (typically 3-5m at splice points, 10-15m at building entries) provide slack for re-termination, moves, or repairs without pulling new cable."
  },
  // Additional Module 6 Questions - Standards and Design
  {
    question: "What does ISO/IEC 11801 specify?",
    options: [
      { text: "Connector cleaning procedures", isCorrect: false },
      { text: "Generic cabling for customer premises", isCorrect: true },
      { text: "Fibre manufacturing standards", isCorrect: false },
      { text: "OTDR testing procedures", isCorrect: false }
    ],
    explanation: "ISO/IEC 11801 is the international standard for structured cabling in commercial buildings, defining topology, distances, and performance categories."
  },
  {
    question: "What is the maximum backbone distance for singlemode fibre in TIA-568?",
    options: [
      { text: "300 metres", isCorrect: false },
      { text: "500 metres", isCorrect: false },
      { text: "2000 metres (campus) / 3000 metres (building)", isCorrect: true },
      { text: "5000 metres", isCorrect: false }
    ],
    explanation: "TIA-568 specifies 3000m maximum for intra-building backbone and 2000m for inter-building (campus) backbone using singlemode fibre."
  },
  {
    question: "What loss budget allowance does TIA-568 specify per splice?",
    options: [
      { text: "0.3 dB", isCorrect: true },
      { text: "0.5 dB", isCorrect: false },
      { text: "0.1 dB", isCorrect: false },
      { text: "0.75 dB", isCorrect: false }
    ],
    explanation: "TIA-568 allows 0.3 dB per splice in loss budget calculations, though actual fusion splice losses should be much lower (0.02-0.05 dB)."
  },
  {
    question: "What does 'star topology' mean in structured cabling?",
    options: [
      { text: "All cables radiate from a central point", isCorrect: true },
      { text: "Cables connect in a ring pattern", isCorrect: false },
      { text: "Cables run in parallel lines", isCorrect: false },
      { text: "Random interconnection pattern", isCorrect: false }
    ],
    explanation: "Star topology has all horizontal cables radiating from a central telecommunications room, providing dedicated home-runs for each outlet with no daisy-chaining."
  },
  {
    question: "What is the purpose of an equipment room (ER) in structured cabling?",
    options: [
      { text: "Storage for spare cables only", isCorrect: false },
      { text: "To house major network equipment and backbone terminations", isCorrect: true },
      { text: "Temporary workspace for technicians", isCorrect: false },
      { text: "Emergency power systems only", isCorrect: false }
    ],
    explanation: "The equipment room houses core network equipment (switches, servers), backbone terminations, and provides the main connection point for external services."
  },
  {
    question: "What does 'entrance facility' refer to in building cabling design?",
    options: [
      { text: "The main building lobby", isCorrect: false },
      { text: "Where external cables enter the building and transition to internal cabling", isCorrect: true },
      { text: "Security checkpoint for cable installers", isCorrect: false },
      { text: "The first telecommunications room", isCorrect: false }
    ],
    explanation: "The entrance facility is where external (carrier/campus) cables enter and connect to building cabling. It includes demarcation points, protection, and transition equipment."
  },
  {
    question: "What cable management ratio is recommended between fibre count in backbone and horizontal outlets?",
    options: [
      { text: "1:1", isCorrect: false },
      { text: "2:1 (two fibres per outlet)", isCorrect: true },
      { text: "4:1", isCorrect: false },
      { text: "10:1", isCorrect: false }
    ],
    explanation: "Typically 2 fibres per work area outlet (one pair Tx/Rx) is planned, though centralised architectures may use different ratios based on splitter designs."
  },
  {
    question: "What is a 'consolidation point' in horizontal cabling?",
    options: [
      { text: "Where backbone cables terminate", isCorrect: false },
      { text: "An interconnection point in the horizontal pathway for flexibility", isCorrect: true },
      { text: "The main cross-connect location", isCorrect: false },
      { text: "Where cables consolidate for external routing", isCorrect: false }
    ],
    explanation: "Consolidation points provide an intermediate connection in horizontal cabling, allowing reconfiguration of work area connections without re-running cables to the TR."
  },
  {
    question: "What tier rating indicates the highest data centre reliability in TIA-942?",
    options: [
      { text: "Tier 1", isCorrect: false },
      { text: "Tier 2", isCorrect: false },
      { text: "Tier 3", isCorrect: false },
      { text: "Tier 4 (fault tolerant)", isCorrect: true }
    ],
    explanation: "Tier 4 data centres provide fault tolerance with 2N redundancy for all systems, 99.995% availability, and concurrent maintainability without service interruption."
  },
  {
    question: "What is the purpose of pathway diversity in network design?",
    options: [
      { text: "To allow different cable types", isCorrect: false },
      { text: "To provide redundant physical routes for resilience", isCorrect: true },
      { text: "To separate voice and data", isCorrect: false },
      { text: "To meet accessibility requirements", isCorrect: false }
    ],
    explanation: "Pathway diversity means routing redundant cables through physically separate paths so a single event (fire, construction damage) cannot disable all connections."
  },
  // Additional Module 7 Questions - Fault Finding and Maintenance
  {
    question: "What is a 'microbend' in fibre optics?",
    options: [
      { text: "A very small radius macrobend", isCorrect: false },
      { text: "Small-scale deformations in the fibre axis causing localised loss", isCorrect: true },
      { text: "A microscopic crack in the fibre", isCorrect: false },
      { text: "Bending at the microscopic core level", isCorrect: false }
    ],
    explanation: "Microbends are tiny axial deformations caused by pressure points or cable manufacturing defects. They cause loss by allowing light to escape the core at deviation points."
  },
  {
    question: "What OTDR parameter determines how far it can measure?",
    options: [
      { text: "Pulse width only", isCorrect: false },
      { text: "Dynamic range", isCorrect: true },
      { text: "Resolution only", isCorrect: false },
      { text: "Display size", isCorrect: false }
    ],
    explanation: "Dynamic range (measured in dB) determines how much total loss the OTDR can measure. Higher dynamic range allows testing longer fibres or fibres with more splices/connectors."
  },
  {
    question: "What does a 'reflective event' look like on an OTDR trace?",
    options: [
      { text: "A gradual slope downward", isCorrect: false },
      { text: "A spike upward followed by the normal trace", isCorrect: true },
      { text: "A flat horizontal line", isCorrect: false },
      { text: "A sudden drop to zero", isCorrect: false }
    ],
    explanation: "Reflective events (connectors, mechanical splices, breaks) appear as upward spikes due to light reflecting back to the OTDR. Fusion splices are non-reflective (no spike)."
  },
  {
    question: "What is the recommended first step when troubleshooting a failed fibre link?",
    options: [
      { text: "Replace all connectors", isCorrect: false },
      { text: "Inspect and clean connector end-faces", isCorrect: true },
      { text: "Re-splice all joints", isCorrect: false },
      { text: "Replace the entire cable", isCorrect: false }
    ],
    explanation: "Contamination causes most fibre failures. Always inspect and clean connectors first - this simple step resolves the majority of problems without further intervention."
  },
  {
    question: "What does 'attenuation dead zone' mean in OTDR specifications?",
    options: [
      { text: "Distance where the OTDR cannot detect any events", isCorrect: false },
      { text: "Minimum distance after a reflective event where loss can be measured", isCorrect: true },
      { text: "The maximum testing range", isCorrect: false },
      { text: "Distance where signal is completely absorbed", isCorrect: false }
    ],
    explanation: "Attenuation dead zone is the minimum distance after a reflective event before the OTDR can accurately measure the loss of a non-reflective event (splice)."
  },
  {
    question: "What is a 'receive reference' in fibre testing?",
    options: [
      { text: "The receiver sensitivity specification", isCorrect: false },
      { text: "A reference cable at the far end for loss measurement", isCorrect: true },
      { text: "The OTDR's internal reference", isCorrect: false },
      { text: "Documentation of received power levels", isCorrect: false }
    ],
    explanation: "A receive reference cable ensures consistent connection conditions at the far end during insertion loss testing, similar to the launch reference at the source end."
  },
  {
    question: "Why might an OTDR show a 'gainer' at a splice between identical fibres?",
    options: [
      { text: "Equipment malfunction", isCorrect: false },
      { text: "Slight differences in fibre backscatter characteristics", isCorrect: true },
      { text: "The splice is actually amplifying the signal", isCorrect: false },
      { text: "Contamination at the splice", isCorrect: false }
    ],
    explanation: "Even fibres of the same type can have slightly different backscatter coefficients. This causes apparent gains when testing from one direction; bi-directional averaging resolves this."
  },
  {
    question: "What does 'event dead zone' specify in an OTDR?",
    options: [
      { text: "Minimum separation to detect two adjacent reflective events", isCorrect: true },
      { text: "Distance where no events can occur", isCorrect: false },
      { text: "Maximum testing range", isCorrect: false },
      { text: "Time between measurements", isCorrect: false }
    ],
    explanation: "Event dead zone is the minimum distance between two reflective events for the OTDR to recognise them as separate events rather than one combined event."
  },
  {
    question: "What is the correct sequence for using one-click cleaners on connectors?",
    options: [
      { text: "Push, rotate, and pull", isCorrect: false },
      { text: "Insert connector and push forward with one motion", isCorrect: true },
      { text: "Rotate while pressing", isCorrect: false },
      { text: "Push repeatedly until clean", isCorrect: false }
    ],
    explanation: "One-click cleaners use a lint-free tape advanced by a push motion. Insert the connector and push forward once - the mechanism advances fresh tape across the end-face."
  },
  {
    question: "What is 'static fatigue' in optical fibre?",
    options: [
      { text: "Fatigue from repeated movement", isCorrect: false },
      { text: "Slow crack growth under constant stress eventually causing failure", isCorrect: true },
      { text: "Loss of optical performance over time", isCorrect: false },
      { text: "Static electricity damage", isCorrect: false }
    ],
    explanation: "Static fatigue is the slow growth of microscopic cracks in glass under constant stress (from bends, tension). Over time, cracks grow until the fibre breaks, even without change in load."
  },
  {
    question: "Why should protective caps be replaced on unused fibre connectors?",
    options: [
      { text: "To identify unused ports", isCorrect: false },
      { text: "To prevent contamination and protect the polished end-face", isCorrect: true },
      { text: "To prevent unauthorised connections", isCorrect: false },
      { text: "For aesthetic purposes", isCorrect: false }
    ],
    explanation: "Dust caps prevent airborne contamination from settling on the polished end-face. Even brief exposure can contaminate connectors, causing connection problems later."
  },
  {
    question: "What is the IEC 61300-3-35 'core zone' for singlemode fibre inspection?",
    options: [
      { text: "0-9µm diameter", isCorrect: false },
      { text: "0-25µm diameter", isCorrect: true },
      { text: "0-65µm diameter", isCorrect: false },
      { text: "0-125µm diameter", isCorrect: false }
    ],
    explanation: "The core zone extends to 25µm diameter (well beyond the 9µm core) because mode field diameter extends into the cladding. No defects or contamination are allowed in this zone."
  },
  // More comprehensive questions covering all modules
  {
    question: "What advantage does CWDM offer over traditional point-to-point fibre?",
    options: [
      { text: "Lower latency", isCorrect: false },
      { text: "Multiple channels over a single fibre pair", isCorrect: true },
      { text: "Simpler equipment", isCorrect: false },
      { text: "Better bend performance", isCorrect: false }
    ],
    explanation: "CWDM (Coarse Wavelength Division Multiplexing) transmits multiple wavelengths (typically 8-18 channels) over a single fibre, multiplying capacity without adding fibres."
  },
  {
    question: "What is the typical channel spacing in CWDM systems?",
    options: [
      { text: "0.8nm", isCorrect: false },
      { text: "2nm", isCorrect: false },
      { text: "20nm", isCorrect: true },
      { text: "100nm", isCorrect: false }
    ],
    explanation: "CWDM uses 20nm channel spacing, allowing use of lower-cost uncooled lasers. DWDM uses much tighter spacing (0.8nm or less) for more channels but requires temperature-controlled lasers."
  },
  {
    question: "What is 'encircled flux' in multimode fibre testing?",
    options: [
      { text: "Total optical power measurement", isCorrect: false },
      { text: "Standardised launch conditions for repeatable measurements", isCorrect: true },
      { text: "Power confined to the core", isCorrect: false },
      { text: "Reflected power measurement", isCorrect: false }
    ],
    explanation: "Encircled flux defines launch conditions (power distribution across the core) for multimode testing. Standardised launch ensures consistent, repeatable measurements between different test equipment."
  },
  {
    question: "What is the typical proof test tension for telecommunication-grade fibre?",
    options: [
      { text: "10 kpsi (0.7 GPa)", isCorrect: false },
      { text: "50 kpsi (0.35 GPa)", isCorrect: false },
      { text: "100 kpsi (0.7 GPa)", isCorrect: true },
      { text: "200 kpsi (1.4 GPa)", isCorrect: false }
    ],
    explanation: "Standard telecom fibre is proof-tested at 100 kpsi (approximately 0.7 GPa or 1% strain). This ensures fibres can withstand normal installation and service stresses."
  },
  {
    question: "What causes 'polarisation mode dispersion' (PMD)?",
    options: [
      { text: "Different wavelengths travelling at different speeds", isCorrect: false },
      { text: "Slight asymmetry causing different propagation speeds for light polarisation states", isCorrect: true },
      { text: "Multiple modes in multimode fibre", isCorrect: false },
      { text: "Temperature variations", isCorrect: false }
    ],
    explanation: "PMD occurs in singlemode fibre due to slight core asymmetries causing the two polarisation states to travel at different speeds. It's a concern for very high-speed long-distance links."
  },
  {
    question: "What does 'dispersion-shifted fibre' (G.653) optimise?",
    options: [
      { text: "Bend performance", isCorrect: false },
      { text: "Zero dispersion point moved to 1550nm for single-channel systems", isCorrect: true },
      { text: "Modal bandwidth", isCorrect: false },
      { text: "Connector compatibility", isCorrect: false }
    ],
    explanation: "G.653 shifts zero dispersion to 1550nm where attenuation is lowest. However, this causes problems with DWDM due to four-wave mixing, so G.655 (non-zero dispersion-shifted) is now preferred."
  },
  {
    question: "What is the purpose of a 'mandrel wrap' in multimode testing?",
    options: [
      { text: "To protect the fibre during testing", isCorrect: false },
      { text: "To filter out higher-order modes for consistent launch conditions", isCorrect: true },
      { text: "To increase test cable length", isCorrect: false },
      { text: "To mark the test direction", isCorrect: false }
    ],
    explanation: "Wrapping multimode fibre around a mandrel causes higher-order modes to leak out, creating a more consistent modal distribution similar to what occurs in longer installed fibres."
  },
  {
    question: "What fire rating indicates a cable can be installed in air-handling spaces?",
    options: [
      { text: "Riser rated (CMR)", isCorrect: false },
      { text: "Plenum rated (CMP)", isCorrect: true },
      { text: "General purpose (CM)", isCorrect: false },
      { text: "Outdoor rated (OSP)", isCorrect: false }
    ],
    explanation: "Plenum-rated (CMP) cables meet stringent smoke and flame requirements for installation in air-handling spaces (plenums) where air circulates for HVAC systems."
  },
  {
    question: "What is 'span loss' in a fibre optic link?",
    options: [
      { text: "Loss at a single connector", isCorrect: false },
      { text: "Total loss from transmitter to receiver including all components", isCorrect: true },
      { text: "Loss per kilometre of fibre", isCorrect: false },
      { text: "Splice-only loss", isCorrect: false }
    ],
    explanation: "Span loss is the total optical loss of the complete link including fibre attenuation, connectors, splices, and any other components between transmitter and receiver."
  },
  {
    question: "What is the function of a 'fibre identifier'?",
    options: [
      { text: "To label fibres with barcodes", isCorrect: false },
      { text: "To detect and identify live traffic on a fibre without breaking the circuit", isCorrect: true },
      { text: "To measure fibre type", isCorrect: false },
      { text: "To clean fibre end-faces", isCorrect: false }
    ],
    explanation: "Fibre identifiers clamp onto a fibre and detect signal presence and direction by sensing light leaking from induced macrobends, without disconnecting the live circuit."
  },
  {
    question: "What wavelength do most visual fault locators (VFLs) use?",
    options: [
      { text: "850nm (infrared)", isCorrect: false },
      { text: "1310nm (infrared)", isCorrect: false },
      { text: "650nm (visible red)", isCorrect: true },
      { text: "1550nm (infrared)", isCorrect: false }
    ],
    explanation: "VFLs use visible red light (typically 635-650nm) so faults can be visually located. The red light is visible escaping at breaks, tight bends, or bad connectors."
  },
  {
    question: "What is an 'OTDR event table'?",
    options: [
      { text: "A schedule of testing dates", isCorrect: false },
      { text: "A list of all detected events with distance and loss values", isCorrect: true },
      { text: "Equipment inventory list", isCorrect: false },
      { text: "Calibration records", isCorrect: false }
    ],
    explanation: "The event table summarises all events (connectors, splices, bends, end of fibre) detected on the OTDR trace, listing distance, loss, and reflectance for each event."
  },
  {
    question: "Why is 1625nm wavelength used for fibre monitoring in live systems?",
    options: [
      { text: "It has the lowest attenuation", isCorrect: false },
      { text: "It can be monitored without interfering with traffic wavelengths", isCorrect: true },
      { text: "It provides the best resolution", isCorrect: false },
      { text: "Standard test equipment only works at 1625nm", isCorrect: false }
    ],
    explanation: "1625nm (L-band) is outside the typical traffic wavelength bands. OTDR testing or monitoring at 1625nm can occur while the fibre carries live traffic at other wavelengths."
  },
  {
    question: "What is the primary purpose of ANSI/TIA-758 standard?",
    options: [
      { text: "Indoor cabling design", isCorrect: false },
      { text: "Customer-owned outside plant telecommunications infrastructure", isCorrect: true },
      { text: "Data centre cabling", isCorrect: false },
      { text: "Connector specifications", isCorrect: false }
    ],
    explanation: "TIA-758 covers outside plant (OSP) cabling on customer premises - campus backbones, inter-building links, and connections to service provider demarcation points."
  },
  {
    question: "What does 'centralised cabling' architecture mean?",
    options: [
      { text: "All equipment in one room", isCorrect: false },
      { text: "Horizontal fibres home-run to a central location, bypassing floor TRs", isCorrect: true },
      { text: "Star topology only", isCorrect: false },
      { text: "Single fibre serving all outlets", isCorrect: false }
    ],
    explanation: "Centralised cabling runs fibres directly from work areas to a central equipment room, using splices or interconnects instead of active equipment in each floor TR."
  },
  {
    question: "What is a 'work area' in structured cabling terminology?",
    options: [
      { text: "The telecommunications room", isCorrect: false },
      { text: "The space where occupants use telecommunications services", isCorrect: true },
      { text: "The cable installation zone", isCorrect: false },
      { text: "The equipment room", isCorrect: false }
    ],
    explanation: "The work area is where end users interact with the telecommunications system - offices, workstations, etc. It includes the outlet to equipment cord connection."
  },
  // Final batch of questions to reach 250
  {
    question: "What does 'dB' measure in fibre optics?",
    options: [
      { text: "Absolute power level", isCorrect: false },
      { text: "Ratio of two power levels (logarithmic)", isCorrect: true },
      { text: "Distance", isCorrect: false },
      { text: "Wavelength", isCorrect: false }
    ],
    explanation: "Decibels (dB) measure the ratio between two power levels logarithmically. 3 dB represents a factor of 2 (doubling or halving), 10 dB represents a factor of 10."
  },
  {
    question: "What does 'dBm' represent?",
    options: [
      { text: "Decibels relative to milliwatt (absolute power)", isCorrect: true },
      { text: "Decibels per metre", isCorrect: false },
      { text: "Maximum decibels", isCorrect: false },
      { text: "Minimum decibels", isCorrect: false }
    ],
    explanation: "dBm is absolute power referenced to 1 milliwatt. 0 dBm = 1mW. Positive values are more than 1mW, negative values are less (e.g., -10 dBm = 0.1mW)."
  },
  {
    question: "What is the advantage of using LC connectors over SC connectors?",
    options: [
      { text: "Better optical performance", isCorrect: false },
      { text: "Smaller size enabling higher port density", isCorrect: true },
      { text: "Lower cost", isCorrect: false },
      { text: "Easier to clean", isCorrect: false }
    ],
    explanation: "LC connectors use a 1.25mm ferrule versus SC's 2.5mm, enabling approximately double the port density in the same panel space - critical in high-density environments."
  },
  {
    question: "What is 'insertion loss' in a fibre connection?",
    options: [
      { text: "Loss caused by inserting the wrong fibre type", isCorrect: false },
      { text: "The total loss through a connection point", isCorrect: true },
      { text: "Loss when first installing a connector", isCorrect: false },
      { text: "Temporary loss during connection", isCorrect: false }
    ],
    explanation: "Insertion loss is the optical power lost when a component (connector, splice, coupler) is inserted into a link. It's measured in dB and should be minimised."
  },
  {
    question: "What is 'return loss'?",
    options: [
      { text: "Power lost in the return cable", isCorrect: false },
      { text: "The ratio of reflected power to incident power at a connection", isCorrect: true },
      { text: "Loss when returning equipment", isCorrect: false },
      { text: "Backward transmission loss", isCorrect: false }
    ],
    explanation: "Return loss measures how much light is reflected back toward the source. Higher return loss values (e.g., 50 dB) mean less reflection, which is better for system performance."
  },
  {
    question: "What is 'optical time domain reflectometry' (OTDR)?",
    options: [
      { text: "A method for cleaning connectors", isCorrect: false },
      { text: "Measuring fibre characteristics by analysing backscattered light over distance", isCorrect: true },
      { text: "Timing data transmission", isCorrect: false },
      { text: "Testing connector reflections only", isCorrect: false }
    ],
    explanation: "OTDR sends light pulses into fibre and analyses the tiny amount of light backscattered (Rayleigh scattering) and reflected from events, building a distance-vs-loss trace."
  },
  {
    question: "What is the 'backscatter coefficient' of optical fibre?",
    options: [
      { text: "Connector reflection level", isCorrect: false },
      { text: "The amount of light naturally scattered back toward the source", isCorrect: true },
      { text: "Splice loss", isCorrect: false },
      { text: "Cladding mode power", isCorrect: false }
    ],
    explanation: "The backscatter coefficient describes how much light is naturally scattered backward (Rayleigh scattering). It varies slightly between fibres and affects OTDR measurements."
  },
  {
    question: "Why should fibre patch cords be tested before use?",
    options: [
      { text: "To verify the colour code", isCorrect: false },
      { text: "To ensure they meet specifications and haven't been damaged", isCorrect: true },
      { text: "To break in the connectors", isCorrect: false },
      { text: "To remove factory packaging residue", isCorrect: false }
    ],
    explanation: "Factory patches can be damaged in transit or storage. Testing verifies loss and return loss meet requirements before installation, preventing hard-to-diagnose problems later."
  },
  {
    question: "What is 'mode conditioning' in multimode fibre?",
    options: [
      { text: "Adjusting connector angle", isCorrect: false },
      { text: "Controlling which modes are excited for better performance", isCorrect: true },
      { text: "Temperature stabilisation", isCorrect: false },
      { text: "Cleaning the fibre core", isCorrect: false }
    ],
    explanation: "Mode conditioning uses an offset launch or mode-conditioning patch cord to excite specific modes in multimode fibre, improving performance with laser sources."
  },
  {
    question: "What does 'VCSEL' stand for?",
    options: [
      { text: "Variable Capacity Single Emitting Laser", isCorrect: false },
      { text: "Vertical-Cavity Surface-Emitting Laser", isCorrect: true },
      { text: "Visual Connector System Equipment Level", isCorrect: false },
      { text: "Very Compact Singlemode Emission Laser", isCorrect: false }
    ],
    explanation: "VCSELs are low-cost lasers that emit light vertically from the chip surface. They're commonly used for short-reach multimode applications at 850nm."
  },
  {
    question: "What is 'dispersion compensation'?",
    options: [
      { text: "Removing contamination from connectors", isCorrect: false },
      { text: "Adding elements to counteract chromatic dispersion effects", isCorrect: true },
      { text: "Equalising power levels", isCorrect: false },
      { text: "Balancing fibre counts", isCorrect: false }
    ],
    explanation: "Dispersion compensation uses special fibre (DCF) or electronic processing to counteract chromatic dispersion accumulated over long distances, enabling higher speeds."
  },
  {
    question: "What is the typical operating temperature range for indoor fibre cables?",
    options: [
      { text: "-40°C to +85°C", isCorrect: false },
      { text: "0°C to +50°C", isCorrect: true },
      { text: "-60°C to +70°C", isCorrect: false },
      { text: "10°C to 30°C", isCorrect: false }
    ],
    explanation: "Indoor cables typically specify 0°C to +50°C operating range. Outdoor cables have wider ranges, often -40°C to +70°C, to handle environmental extremes."
  },
  {
    question: "What is 'fibre darkening'?",
    options: [
      { text: "Fibre covered in dirt", isCorrect: false },
      { text: "Increased attenuation from radiation or hydrogen exposure over time", isCorrect: true },
      { text: "Fibre with no light signal", isCorrect: false },
      { text: "Dark-coloured fibre jacket", isCorrect: false }
    ],
    explanation: "Fibre darkening is increased attenuation caused by long-term exposure to radiation or hydrogen (in harsh environments). Special 'rad-hard' fibres resist this effect."
  },
  {
    question: "What is 'optical amplification'?",
    options: [
      { text: "Using larger fibre cores", isCorrect: false },
      { text: "Boosting optical signal strength without converting to electrical", isCorrect: true },
      { text: "Magnifying the fibre end-face", isCorrect: false },
      { text: "Increasing connector size", isCorrect: false }
    ],
    explanation: "Optical amplifiers (typically EDFA - Erbium-Doped Fibre Amplifiers) boost signal strength directly in the optical domain, extending reach without OEO conversion."
  },
  {
    question: "What is the typical insertion loss for a mated LC connector pair?",
    options: [
      { text: "1.0-1.5 dB", isCorrect: false },
      { text: "0.1-0.3 dB", isCorrect: true },
      { text: "0.5-1.0 dB", isCorrect: false },
      { text: "0.01-0.05 dB", isCorrect: false }
    ],
    explanation: "High-quality LC connector pairs typically achieve 0.1-0.3 dB insertion loss. TIA-568 allows 0.5 dB maximum for loss budget calculations."
  },
  {
    question: "What causes 'differential mode delay' (DMD)?",
    options: [
      { text: "Temperature variations", isCorrect: false },
      { text: "Different modes travelling at different speeds in multimode fibre", isCorrect: true },
      { text: "Connector misalignment", isCorrect: false },
      { text: "Splice reflections", isCorrect: false }
    ],
    explanation: "DMD occurs because different modes in multimode fibre travel slightly different distances and speeds. It's a significant limitation for high-speed multimode systems."
  },
  {
    question: "What is 'WDM' in fibre optics?",
    options: [
      { text: "Wire Distribution Method", isCorrect: false },
      { text: "Wavelength Division Multiplexing", isCorrect: true },
      { text: "Wide Data Mode", isCorrect: false },
      { text: "Wideband Digital Modulation", isCorrect: false }
    ],
    explanation: "WDM transmits multiple wavelengths (colours) of light simultaneously through a single fibre, multiplying capacity. CWDM and DWDM are specific implementations."
  },
  {
    question: "What is the function of an 'optical isolator'?",
    options: [
      { text: "To separate different fibre types", isCorrect: false },
      { text: "To allow light in one direction only, blocking reflections", isCorrect: true },
      { text: "To isolate damaged sections", isCorrect: false },
      { text: "To provide electrical isolation", isCorrect: false }
    ],
    explanation: "Optical isolators allow light to pass in one direction while blocking backward-travelling light, protecting sensitive lasers from destabilising back-reflections."
  },
  {
    question: "What is 'PON' technology?",
    options: [
      { text: "Power Over Network", isCorrect: false },
      { text: "Passive Optical Network", isCorrect: true },
      { text: "Point-to-point Optical Node", isCorrect: false },
      { text: "Protected Optical Network", isCorrect: false }
    ],
    explanation: "PON uses passive optical splitters to share a single fibre among multiple users, commonly deployed for FTTH (Fibre To The Home) services. GPON and EPON are common variants."
  },
  {
    question: "What splits the optical signal in a PON network?",
    options: [
      { text: "Active switches", isCorrect: false },
      { text: "Passive optical splitters", isCorrect: true },
      { text: "Wavelength filters", isCorrect: false },
      { text: "Electronic routers", isCorrect: false }
    ],
    explanation: "PON uses unpowered (passive) optical splitters that divide the light signal among multiple outputs. Typical split ratios are 1:32 or 1:64."
  },
  {
    question: "What is 'coherent detection' in fibre optics?",
    options: [
      { text: "Using matched equipment", isCorrect: false },
      { text: "Advanced detection using phase, amplitude, and polarisation of light", isCorrect: true },
      { text: "Detecting consistent signal strength", isCorrect: false },
      { text: "Coordinated testing methods", isCorrect: false }
    ],
    explanation: "Coherent detection uses advanced modulation and detection techniques to extract more data from light by using phase, amplitude, and polarisation states, enabling 100G+ per wavelength."
  },
  {
    question: "What is 'connector keying'?",
    options: [
      { text: "Locking connectors in place", isCorrect: false },
      { text: "Mechanical alignment features ensuring correct orientation", isCorrect: true },
      { text: "Security encoding", isCorrect: false },
      { text: "Serial number identification", isCorrect: false }
    ],
    explanation: "Keying features (pins, slots) on connectors ensure they mate in the correct orientation. For MPO connectors, key position (up/down) is critical for polarity."
  },
  {
    question: "What happens if you look into a live fibre carrying infrared light?",
    options: [
      { text: "Nothing - it's invisible so it's safe", isCorrect: false },
      { text: "Potential eye damage - never view without confirmed safe conditions", isCorrect: true },
      { text: "You'll see a red light", isCorrect: false },
      { text: "The light is too weak to cause harm", isCorrect: false }
    ],
    explanation: "Infrared light is invisible but can damage eyes. Never look into fibres or connectors until confirmed safe with a power meter. Class 1M lasers can cause injury."
  },
  {
    question: "What is the standard fibre colour code sequence for the first 12 fibres?",
    options: [
      { text: "Red, orange, yellow, green, blue, violet...", isCorrect: false },
      { text: "Blue, orange, green, brown, slate, white, red, black, yellow, violet, rose, aqua", isCorrect: true },
      { text: "White, red, black, yellow, violet, blue, orange, green, brown, slate, rose, aqua", isCorrect: false },
      { text: "There is no standard sequence", isCorrect: false }
    ],
    explanation: "TIA-598 defines the standard colour sequence: blue, orange, green, brown, slate, white, red, black, yellow, violet, rose (pink), aqua for fibres 1-12."
  },
  {
    question: "What does 'fusion splice estimated loss' indicate on a splicer display?",
    options: [
      { text: "Guaranteed actual loss", isCorrect: false },
      { text: "Calculated loss based on core alignment - verify with OTDR", isCorrect: true },
      { text: "Maximum possible loss", isCorrect: false },
      { text: "Loss after aging", isCorrect: false }
    ],
    explanation: "Fusion splicers estimate loss from observed core alignment but this is calculated, not measured. Actual loss should be verified with OTDR testing."
  },
  {
    question: "What is 'fan-out' in fibre optic terminations?",
    options: [
      { text: "Spreading heat from equipment", isCorrect: false },
      { text: "Separating loose-tube fibres for individual termination", isCorrect: true },
      { text: "Distributing signal to multiple outputs", isCorrect: false },
      { text: "Cooling splice protectors", isCorrect: false }
    ],
    explanation: "Fan-out kits transition loose-tube fibres (250µm) to tight-buffer (900µm) for direct connector termination, providing mechanical protection and easier handling."
  },
  {
    question: "What is 'mode stripper' used for?",
    options: [
      { text: "Removing cladding modes that cause measurement errors", isCorrect: true },
      { text: "Removing jacket material", isCorrect: false },
      { text: "Converting multimode to singlemode", isCorrect: false },
      { text: "Stripping buffer coating", isCorrect: false }
    ],
    explanation: "Mode strippers remove unwanted cladding modes (light travelling in the cladding) that can cause measurement errors, ensuring only core-guided light is measured."
  },
  {
    question: "What is the typical lifetime expectancy of properly installed fibre infrastructure?",
    options: [
      { text: "5-10 years", isCorrect: false },
      { text: "10-15 years", isCorrect: false },
      { text: "25+ years", isCorrect: true },
      { text: "50+ years guaranteed", isCorrect: false }
    ],
    explanation: "Properly installed fibre infrastructure typically has a 25+ year physical lifetime. The passive components can outlast multiple generations of active equipment."
  },
  {
    question: "What does 'dark fibre' mean?",
    options: [
      { text: "Fibre with no light passing through", isCorrect: false },
      { text: "Unlit fibre capacity available for future use or lease", isCorrect: true },
      { text: "Faulty fibre with high attenuation", isCorrect: false },
      { text: "Fibre in an unlit conduit", isCorrect: false }
    ],
    explanation: "Dark fibre refers to installed but unused fibre capacity - fibres without active equipment. It can be 'lit' when needed or leased to other operators."
  },
  {
    question: "What causes 'spectral attenuation' variation in fibre?",
    options: [
      { text: "Contaminated connectors", isCorrect: false },
      { text: "Different absorption and scattering at different wavelengths", isCorrect: true },
      { text: "Poor splice quality", isCorrect: false },
      { text: "Incorrect installation", isCorrect: false }
    ],
    explanation: "Attenuation varies with wavelength due to material absorption peaks and Rayleigh scattering (which decreases with wavelength). This defines optimal transmission windows."
  },
  {
    question: "What is 'launch cable' also known as?",
    options: [
      { text: "Test lead", isCorrect: false },
      { text: "Reference cable or pulse suppressor cable", isCorrect: true },
      { text: "Start fibre", isCorrect: false },
      { text: "Initial connector", isCorrect: false }
    ],
    explanation: "Launch cables (also reference or pulse suppressor cables) move the first connector beyond the OTDR dead zone. They should match the fibre type being tested."
  },
  {
    question: "What is the recommended length for an OTDR launch cable?",
    options: [
      { text: "10-20 metres", isCorrect: false },
      { text: "100-500 metres", isCorrect: true },
      { text: "1-5 kilometres", isCorrect: false },
      { text: "5 metres maximum", isCorrect: false }
    ],
    explanation: "Launch cables should be 100-500m long, sufficient to clear the OTDR dead zone (which varies with pulse width setting). Longer cables for wider pulse widths."
  },
  {
    question: "What is 'optical budget' also called?",
    options: [
      { text: "Equipment cost", isCorrect: false },
      { text: "Link budget or power budget", isCorrect: true },
      { text: "Testing allowance", isCorrect: false },
      { text: "Installation estimate", isCorrect: false }
    ],
    explanation: "Optical/link/power budget is the available margin between transmitter output and receiver sensitivity. The link must have less loss than this budget to work reliably."
  },
  {
    question: "What is 'overfilled launch' in multimode testing?",
    options: [
      { text: "Using too much power", isCorrect: false },
      { text: "Launch condition exciting all modes uniformly", isCorrect: true },
      { text: "Overfilling the connector with gel", isCorrect: false },
      { text: "Testing at maximum capacity", isCorrect: false }
    ],
    explanation: "Overfilled launch excites all modes equally, historically used for LED-based systems. Modern laser testing uses encircled flux conditions for better repeatability."
  },
  {
    question: "What safety class are most fibre communication systems?",
    options: [
      { text: "Class 1 (eye-safe)", isCorrect: false },
      { text: "Class 1M (eye-safe with magnification restrictions)", isCorrect: true },
      { text: "Class 3B (hazardous)", isCorrect: false },
      { text: "Class 4 (highly hazardous)", isCorrect: false }
    ],
    explanation: "Most telecom systems are Class 1M - safe for naked eye viewing but potentially hazardous with magnifying optics (microscopes, telescopes) that concentrate the beam."
  },
  {
    question: "What is 'cross-connect' in a telecommunications room?",
    options: [
      { text: "Interconnecting cables across different rooms", isCorrect: false },
      { text: "Patch panel arrangement allowing flexible connections between systems", isCorrect: true },
      { text: "Crossing cables over each other", isCorrect: false },
      { text: "Emergency backup connections", isCorrect: false }
    ],
    explanation: "A cross-connect allows any backbone or horizontal cable to be connected to any equipment port via patch cords, providing flexible, reconfigurable connectivity."
  },
  {
    question: "What is 'inter-connect' versus 'cross-connect'?",
    options: [
      { text: "They are the same thing", isCorrect: false },
      { text: "Inter-connect directly connects equipment without patch panels between", isCorrect: true },
      { text: "Inter-connect uses longer cables", isCorrect: false },
      { text: "Cross-connect is for data, inter-connect for voice", isCorrect: false }
    ],
    explanation: "Inter-connect connects equipment directly to cable terminations (one patch cord). Cross-connect uses two patch panels with jumpers between (two patch cords)."
  },
  {
    question: "What does 'FOTP' stand for?",
    options: [
      { text: "Fibre Optic Testing Protocol", isCorrect: false },
      { text: "Fibre Optic Test Procedure (standardised test methods)", isCorrect: true },
      { text: "First Order Transmission Parameter", isCorrect: false },
      { text: "Fibre Output Terminal Point", isCorrect: false }
    ],
    explanation: "FOTP (Fibre Optic Test Procedure) are standardised test methods published by TIA for measuring fibre and component parameters, ensuring consistent testing approaches."
  },
  {
    question: "What is 'strain relief' at connector terminations?",
    options: [
      { text: "Relaxing fibre tension during installation", isCorrect: false },
      { text: "Mechanical support preventing cable pull from reaching the fibre", isCorrect: true },
      { text: "Relieving stress in the glass", isCorrect: false },
      { text: "Testing under load", isCorrect: false }
    ],
    explanation: "Strain relief (boot, crimp, or adhesive) secures the cable at the connector so pulling or bending forces don't transfer to the delicate fibre/ferrule junction."
  },
  {
    question: "What is 'FTTx'?",
    options: [
      { text: "Fibre Testing Technology Extended", isCorrect: false },
      { text: "Fibre To The x (various deployment architectures)", isCorrect: true },
      { text: "Fast Transmission Technology", isCorrect: false },
      { text: "Fibre Termination Type X", isCorrect: false }
    ],
    explanation: "FTTx is a general term for fibre deployment architectures where x represents the endpoint: H (home), P (premises), B (building), C (curb/cabinet), etc."
  },
  {
    question: "What is 'FTTB'?",
    options: [
      { text: "Fibre To The Box", isCorrect: false },
      { text: "Fibre To The Building", isCorrect: true },
      { text: "Fibre Termination Test Board", isCorrect: false },
      { text: "Fibre To The Basement", isCorrect: false }
    ],
    explanation: "FTTB (Fibre To The Building) brings fibre to a building's telecommunications room, with copper or other technology distributing to individual units/floors."
  },
  {
    question: "What is 'splice closure' also called?",
    options: [
      { text: "Fusion splicer", isCorrect: false },
      { text: "Splice enclosure or joint closure", isCorrect: true },
      { text: "Splice protector", isCorrect: false },
      { text: "Splice terminator", isCorrect: false }
    ],
    explanation: "Splice closures (enclosures, joint closures) house and protect spliced fibres. They're environmentally sealed for outdoor/underground use and provide fibre management."
  },
  {
    question: "What is 'wavelength-selective' component?",
    options: [
      { text: "A coloured cable jacket", isCorrect: false },
      { text: "A device that passes some wavelengths while blocking others", isCorrect: true },
      { text: "A multimode-singlemode converter", isCorrect: false },
      { text: "Variable power attenuator", isCorrect: false }
    ],
    explanation: "Wavelength-selective devices (filters, WDM multiplexers) separate or combine specific wavelengths. They're essential for WDM systems and bi-directional transmission."
  },
  {
    question: "What is 'bend-insensitive' fibre optimised for?",
    options: [
      { text: "Higher bandwidth", isCorrect: false },
      { text: "Maintaining performance with tight bends in restricted spaces", isCorrect: true },
      { text: "Lower cost manufacturing", isCorrect: false },
      { text: "Longer transmission distances", isCorrect: false }
    ],
    explanation: "Bend-insensitive fibre (G.657) is designed for FTTH and indoor applications where tight bends around corners and in small enclosures are unavoidable."
  },
  {
    question: "What is 'drop cable' in FTTH deployments?",
    options: [
      { text: "Cable that has been dropped and damaged", isCorrect: false },
      { text: "The cable from distribution point to individual customer premises", isCorrect: true },
      { text: "Spare cable for emergencies", isCorrect: false },
      { text: "Low-priority installation cable", isCorrect: false }
    ],
    explanation: "Drop cable is the final cable segment connecting from a distribution point (pole, pedestal, or building entry) to an individual customer's premises."
  },
  {
    question: "What is 'cable tray' fill ratio recommendation?",
    options: [
      { text: "100% fill is acceptable", isCorrect: false },
      { text: "Maximum 50% fill for cable management and future additions", isCorrect: true },
      { text: "25% maximum", isCorrect: false },
      { text: "75% minimum required", isCorrect: false }
    ],
    explanation: "Cable trays should be filled to maximum 50% to allow proper cable management, prevent cable damage from overfilling, and provide space for future additions."
  },
  {
    question: "What does 'cleave' mean in fibre preparation?",
    options: [
      { text: "Cleaning the fibre", isCorrect: false },
      { text: "Controlled breaking to create a flat, perpendicular end-face", isCorrect: true },
      { text: "Stripping the coating", isCorrect: false },
      { text: "Polishing the end", isCorrect: false }
    ],
    explanation: "Cleaving uses a precision tool to score and break the fibre, creating a flat end-face perpendicular to the fibre axis - essential for quality fusion splices."
  },
  {
    question: "What is 'epoxy polish' connector termination?",
    options: [
      { text: "A type of connector cleaning", isCorrect: false },
      { text: "Traditional termination using adhesive and mechanical polishing", isCorrect: true },
      { text: "Coating connectors for protection", isCorrect: false },
      { text: "Factory-only termination method", isCorrect: false }
    ],
    explanation: "Epoxy polish termination uses heat-cured or anaerobic epoxy to secure the fibre, followed by multi-step polishing. It produces excellent results but is time-consuming."
  },
  {
    question: "What is a 'no-epoxy' or 'crimp' connector?",
    options: [
      { text: "A connector without any adhesive", isCorrect: false },
      { text: "Quick-install connector using mechanical clamping without epoxy", isCorrect: true },
      { text: "Reusable connector", isCorrect: false },
      { text: "A connector for temporary use only", isCorrect: false }
    ],
    explanation: "No-epoxy connectors use mechanical clamping and pre-polished ferrules for faster field termination. They may have slightly higher loss than epoxy-polish but offer speed advantages."
  },
  {
    question: "What is 'pre-polished' or 'splice-on' connector technology?",
    options: [
      { text: "Connectors polished before shipping", isCorrect: false },
      { text: "Factory-polished stub fibre in connector, field-spliced to cable fibre", isCorrect: true },
      { text: "Connectors requiring no field work", isCorrect: false },
      { text: "Pre-terminated cable assemblies", isCorrect: false }
    ],
    explanation: "Pre-polished/splice-on connectors contain a factory-polished fibre stub. Field installation splices (fusion or mechanical) the cable fibre to this stub, achieving factory-quality end-faces."
  },
  {
    question: "What is 'cable pulling lubricant' made of?",
    options: [
      { text: "Water-based or gel polymer compounds safe for cables", isCorrect: true },
      { text: "Petroleum-based oils", isCorrect: false },
      { text: "Silicone grease", isCorrect: false },
      { text: "Any household lubricant works", isCorrect: false }
    ],
    explanation: "Cable pulling lubricants are specially formulated (usually water-based polymer) to reduce friction without damaging cable jackets. Never use petroleum products that can degrade plastics."
  },
  {
    question: "What is the function of 'subscriber connector' (SC)?",
    options: [
      { text: "Connects subscribers to the network", isCorrect: false },
      { text: "Push-pull connector design for reliable mating", isCorrect: true },
      { text: "Used only for subscription services", isCorrect: false },
      { text: "Secure connection requiring a key", isCorrect: false }
    ],
    explanation: "SC (Subscriber/Square Connector) features a push-pull engagement mechanism. The name comes from its original use, but it's now used throughout networks, not just at subscriber points."
  },
  {
    question: "What is 'ST' connector?",
    options: [
      { text: "Standard Termination connector", isCorrect: false },
      { text: "Straight Tip bayonet-style connector", isCorrect: true },
      { text: "Secure Terminal connector", isCorrect: false },
      { text: "Single Thread connector", isCorrect: false }
    ],
    explanation: "ST (Straight Tip) is a bayonet-style connector with twist-lock engagement. It was popular in early LANs but is now largely superseded by SC and LC connectors."
  },
  {
    question: "What does 'duplex' connector mean?",
    options: [
      { text: "Double-strength connector", isCorrect: false },
      { text: "Two fibre connectors joined for paired Tx/Rx connections", isCorrect: true },
      { text: "Connector for duplex cables only", isCorrect: false },
      { text: "Two-way communication connector", isCorrect: false }
    ],
    explanation: "Duplex connectors (like LC-duplex, SC-duplex) join two fibres in a fixed housing, maintaining polarity for transmit/receive pairs in typical point-to-point links."
  },
  {
    question: "What is 'fibre channel' in networking?",
    options: [
      { text: "The physical path of the fibre", isCorrect: false },
      { text: "High-speed storage networking protocol commonly using fibre", isCorrect: true },
      { text: "A TV channel transmitted over fibre", isCorrect: false },
      { text: "Communication channel within a fibre", isCorrect: false }
    ],
    explanation: "Fibre Channel is a high-speed network protocol primarily used for storage area networks (SANs). Despite the name, it can run over copper, though fibre is common for performance."
  },
  {
    question: "What is 'SFP' in fibre networking?",
    options: [
      { text: "Single Fibre Protocol", isCorrect: false },
      { text: "Small Form-factor Pluggable (transceiver module)", isCorrect: true },
      { text: "Standard Fibre Port", isCorrect: false },
      { text: "Secure Fibre Pathway", isCorrect: false }
    ],
    explanation: "SFP is a hot-pluggable transceiver form factor used in network switches. SFP+ (enhanced) supports 10G, QSFP supports 40G/100G using multiple channels."
  },
  {
    question: "What is 'bi-directional' (BiDi) transmission?",
    options: [
      { text: "Transmission in both directions alternately", isCorrect: false },
      { text: "Simultaneous two-way transmission over a single fibre using different wavelengths", isCorrect: true },
      { text: "Transmission requiring two fibres", isCorrect: false },
      { text: "Bidding for transmission rights", isCorrect: false }
    ],
    explanation: "BiDi transmission uses different wavelengths for each direction (e.g., 1310nm upstream, 1490nm downstream) over a single fibre, halving fibre count requirements."
  },
  {
    question: "What is 'simplex' fibre cable?",
    options: [
      { text: "Simple, low-cost cable", isCorrect: false },
      { text: "Single fibre cable for one-way or BiDi links", isCorrect: true },
      { text: "Cable for simple installations only", isCorrect: false },
      { text: "Outdoor-only cable type", isCorrect: false }
    ],
    explanation: "Simplex cable contains a single fibre. It's used for one-way transmission links or bi-directional (BiDi) systems where a single fibre carries traffic in both directions."
  },
  {
    question: "What is 'fibre count' in cable specifications?",
    options: [
      { text: "The quality rating of the fibre", isCorrect: false },
      { text: "The number of individual optical fibres in the cable", isCorrect: true },
      { text: "How many times the cable can be bent", isCorrect: false },
      { text: "The number of strands in the strength member", isCorrect: false }
    ],
    explanation: "Fibre count indicates how many individual optical fibres are contained in the cable. Counts range from 1 (simplex) to thousands in high-capacity cables."
  },
  {
    question: "What is 'micro-duct'?",
    options: [
      { text: "Very small diameter tubing for blown fibre installation", isCorrect: true },
      { text: "Duct for microwave cables", isCorrect: false },
      { text: "Indoor-only duct", isCorrect: false },
      { text: "Temporary installation duct", isCorrect: false }
    ],
    explanation: "Micro-ducts are small diameter tubes (typically 5-14mm) into which micro-cables or fibre units can be blown using compressed air, maximising pathway utilisation."
  },
  {
    question: "What is 'optical distribution frame' (ODF)?",
    options: [
      { text: "Equipment for splitting optical signals", isCorrect: false },
      { text: "Structured housing for fibre termination and patching", isCorrect: true },
      { text: "Framework for outdoor cables only", isCorrect: false },
      { text: "Display showing optical power distribution", isCorrect: false }
    ],
    explanation: "An ODF provides organised housing for fibre cable terminations, splice trays, and patch panel connectors. It enables structured cable management and easy patching."
  },
  {
    question: "What is 'optical network terminal' (ONT)?",
    options: [
      { text: "End-of-fibre test point", isCorrect: false },
      { text: "Customer premises equipment converting optical to electrical signals in PON", isCorrect: true },
      { text: "Network termination documentation", isCorrect: false },
      { text: "Central office equipment", isCorrect: false }
    ],
    explanation: "The ONT (or ONU - Optical Network Unit) is located at the customer premises in PON networks, converting optical signals to electrical for customer devices."
  },
  {
    question: "What is 'optical line terminal' (OLT)?",
    options: [
      { text: "Equipment at customer premises", isCorrect: false },
      { text: "Central office equipment managing multiple PON connections", isCorrect: true },
      { text: "Line testing equipment", isCorrect: false },
      { text: "Terminal for optical line workers", isCorrect: false }
    ],
    explanation: "The OLT is located at the service provider's central office in PON networks, managing communication with multiple ONTs over shared fibre infrastructure."
  },
  {
    question: "What is 'time division multiplexing' (TDM) in PON?",
    options: [
      { text: "Sharing fibre by dividing wavelengths", isCorrect: false },
      { text: "Allocating different time slots to different users for upstream transmission", isCorrect: true },
      { text: "Scheduling maintenance windows", isCorrect: false },
      { text: "Dividing installation time among crews", isCorrect: false }
    ],
    explanation: "PON uses TDM for upstream transmission - each ONT transmits in assigned time slots to prevent collisions at the shared splitter point."
  },
  {
    question: "What is 'dynamic bandwidth allocation' (DBA) in PON?",
    options: [
      { text: "Automatically adjusting laser power", isCorrect: false },
      { text: "Dynamically assigning upstream time slots based on demand", isCorrect: true },
      { text: "Changing fibre paths automatically", isCorrect: false },
      { text: "Balancing traffic between fibres", isCorrect: false }
    ],
    explanation: "DBA efficiently allocates upstream bandwidth by dynamically adjusting time slot assignments based on each ONT's traffic demand, rather than fixed allocation."
  },
  {
    question: "What does 'APC' connector provide better performance for?",
    options: [
      { text: "High-speed data transmission", isCorrect: false },
      { text: "Applications sensitive to back-reflections (CATV, PON, analogue)", isCorrect: true },
      { text: "Outdoor installations only", isCorrect: false },
      { text: "Multimode fibre systems", isCorrect: false }
    ],
    explanation: "APC connectors excel in applications where back-reflections degrade performance - analogue video (CATV), PON systems, and high-power applications where reflections can damage lasers."
  },
  {
    question: "What is the recommended cleaning direction for fibre end-faces?",
    options: [
      { text: "Circular motions", isCorrect: false },
      { text: "One direction only, not back and forth", isCorrect: true },
      { text: "Any direction works", isCorrect: false },
      { text: "Always from centre outward", isCorrect: false }
    ],
    explanation: "Clean in one direction only to avoid redistributing contamination. Back-and-forth or circular motions can spread particles rather than remove them."
  },
  {
    question: "What is 'refractive index profile' in fibre?",
    options: [
      { text: "External surface finish", isCorrect: false },
      { text: "How refractive index varies across the fibre cross-section", isCorrect: true },
      { text: "Light reflection pattern", isCorrect: false },
      { text: "Manufacturer's test profile", isCorrect: false }
    ],
    explanation: "The refractive index profile shows how index varies from core centre to cladding. Step-index has an abrupt change; graded-index has a gradual variation to reduce modal dispersion."
  },
  {
    question: "What is 'graded-index' multimode fibre?",
    options: [
      { text: "Fibre with quality grades", isCorrect: false },
      { text: "Fibre with gradually changing refractive index across the core", isCorrect: true },
      { text: "Fibre sorted by performance", isCorrect: false },
      { text: "Premium-grade fibre", isCorrect: false }
    ],
    explanation: "Graded-index fibre has refractive index highest at centre, decreasing toward the cladding. This equalises mode velocities, reducing modal dispersion versus step-index multimode."
  }
];

const FiberOpticsMockExam = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const [examKey, setExamKey] = useState(0);

  const selectedQuestions = useMemo(() => {
    return shuffleArray(mockExamQuestions).slice(0, QUESTIONS_PER_EXAM);
  }, [examKey]);

  const handleNewExam = useCallback(() => {
    setExamKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const passRequired = Math.ceil(QUESTIONS_PER_EXAM * PASS_PERCENTAGE / 100);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/electrical-upskilling/fiber-optics" className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Fibre Optics Course</span>
          </Link>
          <span className="text-white/50 text-sm">Mock Exam</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#1a1a1a] to-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            MODULE 8 · ASSESSMENT
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Fibre Optics Technology Mock Exam
          </h1>
          <p className="text-white/70 text-lg">
            30 questions randomly selected from a bank of {mockExamQuestions.length} questions
          </p>
        </div>
      </div>

      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Exam Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10 text-center">
              <BookOpen className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{QUESTIONS_PER_EXAM}</div>
              <div className="text-white/60 text-xs">Questions</div>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10 text-center">
              <Target className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{PASS_PERCENTAGE}%</div>
              <div className="text-white/60 text-xs">Pass Mark ({passRequired}/{QUESTIONS_PER_EXAM})</div>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10 text-center">
              <Clock className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">45</div>
              <div className="text-white/60 text-xs">Minutes (Suggested)</div>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10 text-center">
              <Award className="w-6 h-6 text-elec-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{mockExamQuestions.length}</div>
              <div className="text-white/60 text-xs">Question Bank</div>
            </div>
          </div>

          {/* New Exam Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={handleNewExam}
              variant="outline"
              className="flex items-center gap-2 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10 min-h-[44px] touch-manipulation"
            >
              <RefreshCw className="w-4 h-4" />
              Generate New Exam
            </Button>
          </div>

          {/* Exam Instructions */}
          <div className="bg-[#252525] rounded-xl p-6 border border-white/10 mb-10">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <CheckCircle className="w-5 h-5 text-elec-yellow" />
              Exam Instructions
            </h2>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow font-bold">1.</span>
                This mock exam covers all seven modules of the Fibre Optics Technology course
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow font-bold">2.</span>
                {QUESTIONS_PER_EXAM} questions are randomly selected from a bank of {mockExamQuestions.length} questions
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow font-bold">3.</span>
                You need {PASS_PERCENTAGE}% ({passRequired} correct answers) to pass
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow font-bold">4.</span>
                After submitting, you'll receive feedback on each question
              </li>
              <li className="flex items-start gap-3">
                <span className="text-elec-yellow font-bold">5.</span>
                Click "Generate New Exam" to get a different set of questions
              </li>
            </ul>
          </div>

          {/* Topics Covered */}
          <div className="bg-[#252525] rounded-xl p-6 border border-white/10 mb-10">
            <h2 className="text-lg font-bold text-white mb-4">Topics Covered</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Module 1: Fundamentals of Light and Fibre
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Module 2: Fibre Types and Specifications
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Module 3: Cable Constructions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Module 4: Connectors and Splicing
                </li>
              </ul>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Module 5: Installation Practices
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Module 6: Standards and Network Design
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Module 7: Fault Finding and Maintenance
                </li>
              </ul>
            </div>
          </div>

          {/* Quiz Component */}
          <section className="mb-12">
            <Quiz
              key={examKey}
              title="Fibre Optics Technology - Mock Examination"
              questions={selectedQuestions}
              passingScore={PASS_PERCENTAGE}
            />
          </section>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
            <Link
              to="/electrical-upskilling/fiber-optics-module-7-section-5"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg hover:bg-[#303030] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Review Module 7
            </Link>
            <Link
              to="/electrical-upskilling/fiber-optics"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-elec-yellow text-[#1a1a1a] font-semibold rounded-lg hover:bg-elec-yellow/90 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              Back to Course Overview
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsMockExam;
