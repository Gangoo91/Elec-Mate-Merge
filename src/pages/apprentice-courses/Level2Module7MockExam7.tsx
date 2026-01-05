import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Flag, CheckCircle, Clock, BookOpen, Target, TrendingUp, Filter, FileText, X, Eye, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

// Extended Question Bank for Level 2 Module 7: Electrical Fault Finding and Diagnosis (250 questions)
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "basic" | "intermediate" | "advanced";
}

const questionBank: Question[] = [
  // Section 1: Understanding Electrical Faults (42 questions)
  {
    id: 1,
    question: "What is the primary characteristic of an open circuit fault?",
    options: [
      "Current flow is interrupted",
      "Excessive current flow occurs",
      "Voltage is reduced to zero",
      "Resistance decreases dramatically"
    ],
    correctAnswer: 0,
    explanation: "An open circuit fault is characterised by the interruption of current flow, preventing electricity from completing its intended path.",
    difficulty: "basic"
  },
  {
    id: 2,
    question: "Which type of fault typically causes protective devices to operate immediately?",
    options: [
      "High resistance joint",
      "Short circuit",
      "Open circuit",
      "Earth fault with high impedance"
    ],
    correctAnswer: 1,
    explanation: "A short circuit causes very high current flow, which will cause protective devices like fuses or MCBs to operate immediately to protect the circuit.",
    difficulty: "basic"
  },
  {
    id: 3,
    question: "What is the most common cause of intermittent faults in electrical installations?",
    options: [
      "Overloaded circuits",
      "Loose connections",
      "Damaged cable insulation",
      "Incorrect protective device ratings"
    ],
    correctAnswer: 1,
    explanation: "Loose connections are the most common cause of intermittent faults, as they can make and break contact depending on temperature, vibration, or movement.",
    difficulty: "basic"
  },
  {
    id: 4,
    question: "An earth fault occurs when:",
    options: [
      "Current flows between live and neutral conductors",
      "Current flows from a live conductor to earth",
      "The neutral conductor becomes disconnected",
      "Protective devices fail to operate"
    ],
    correctAnswer: 1,
    explanation: "An earth fault occurs when current flows from a live conductor to earth, either through damaged insulation or accidental contact with earthed metalwork.",
    difficulty: "basic"
  },
  {
    id: 5,
    question: "What type of fault is characterised by increased resistance in the circuit?",
    options: [
      "Short circuit",
      "Open circuit",
      "High resistance joint",
      "Earth fault"
    ],
    correctAnswer: 2,
    explanation: "A high resistance joint creates additional resistance in the circuit, often causing voltage drop, heating, and reduced performance.",
    difficulty: "basic"
  },
  {
    id: 6,
    question: "Which fault condition poses the greatest risk of electric shock?",
    options: [
      "Open neutral conductor",
      "Exposed live conductor",
      "Blown fuse",
      "High resistance joint"
    ],
    correctAnswer: 1,
    explanation: "An exposed live conductor poses the greatest shock risk as it provides direct contact with live electrical parts at full voltage.",
    difficulty: "basic"
  },
  {
    id: 7,
    question: "What distinguishes a dead short circuit from a high resistance fault?",
    options: [
      "Time of occurrence",
      "Location in the circuit",
      "Magnitude of fault current",
      "Type of protective device"
    ],
    correctAnswer: 2,
    explanation: "A dead short circuit produces very high fault current, whilst a high resistance fault produces relatively low fault current.",
    difficulty: "intermediate"
  },
  {
    id: 8,
    question: "Insulation breakdown typically results in which type of fault?",
    options: [
      "Open circuit only",
      "Short circuit or earth fault",
      "High resistance joint",
      "Neutral displacement"
    ],
    correctAnswer: 1,
    explanation: "Insulation breakdown typically creates a path for current to flow where it shouldn't, resulting in short circuits or earth faults.",
    difficulty: "basic"
  },
  {
    id: 9,
    question: "What is a characteristic of transient electrical faults?",
    options: [
      "They are permanent and easily located",
      "They occur briefly and may clear themselves",
      "They only affect lighting circuits",
      "They always cause protective device operation"
    ],
    correctAnswer: 1,
    explanation: "Transient faults occur briefly and may clear themselves, making them difficult to diagnose as they may not be present during testing.",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "Which factor is most likely to cause cable insulation to deteriorate over time?",
    options: [
      "Constant voltage levels",
      "Normal operating current",
      "Heat, moisture, and UV exposure",
      "Proper installation techniques"
    ],
    correctAnswer: 2,
    explanation: "Environmental factors such as heat, moisture, and UV exposure are the primary causes of cable insulation deterioration over time.",
    difficulty: "basic"
  },
  {
    id: 11,
    question: "A fault that only occurs under specific load conditions is described as:",
    options: [
      "Permanent fault",
      "Load-dependent fault",
      "Installation fault",
      "Design fault"
    ],
    correctAnswer: 1,
    explanation: "Load-dependent faults only manifest when specific electrical loads are applied, making them challenging to diagnose under no-load conditions.",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "What type of fault is most likely to develop in underground cable installations?",
    options: [
      "Open circuit only",
      "Earth fault due to moisture ingress",
      "High resistance joints",
      "Neutral conductor faults"
    ],
    correctAnswer: 1,
    explanation: "Underground cables are particularly susceptible to earth faults due to moisture ingress through damaged cable sheaths or joints.",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "Which electrical parameter is most affected by a high resistance joint?",
    options: [
      "Frequency",
      "Voltage across the joint",
      "Power factor",
      "Earth loop impedance"
    ],
    correctAnswer: 1,
    explanation: "High resistance joints cause voltage drop across the connection point due to I²R losses, reducing available voltage downstream.",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "A symmetrical fault affects:",
    options: [
      "Only one phase",
      "All three phases equally",
      "Only the neutral conductor",
      "The earth connection only"
    ],
    correctAnswer: 1,
    explanation: "A symmetrical fault affects all three phases equally, maintaining system balance but with fault conditions present.",
    difficulty: "advanced"
  },
  {
    id: 15,
    question: "What is the primary danger of a 'creeping' earth fault?",
    options: [
      "Immediate protective device operation",
      "Gradual insulation breakdown over time",
      "Sudden voltage surge",
      "Immediate equipment damage"
    ],
    correctAnswer: 1,
    explanation: "Creeping earth faults gradually worsen over time as insulation continues to break down, potentially leading to complete failure.",
    difficulty: "advanced"
  },
  {
    id: 16,
    question: "Which type of fault is most difficult to detect using standard electrical testing?",
    options: [
      "Dead short circuit",
      "Complete open circuit",
      "Intermittent high resistance fault",
      "Solid earth fault"
    ],
    correctAnswer: 2,
    explanation: "Intermittent high resistance faults are difficult to detect as they may not be present during testing and require specialised monitoring.",
    difficulty: "advanced"
  },
  {
    id: 17,
    question: "Corona discharge in electrical installations indicates:",
    options: [
      "Normal operation",
      "Voltage stress in insulation",
      "Correct installation",
      "Proper earthing"
    ],
    correctAnswer: 1,
    explanation: "Corona discharge indicates high voltage stress in insulation systems, which can lead to insulation breakdown over time.",
    difficulty: "advanced"
  },
  {
    id: 18,
    question: "What characterises a bolted fault?",
    options: [
      "High impedance connection",
      "Low impedance metallic connection",
      "Intermittent connection",
      "High resistance connection"
    ],
    correctAnswer: 1,
    explanation: "A bolted fault is characterised by a low impedance metallic connection, allowing maximum fault current to flow.",
    difficulty: "intermediate"
  },
  {
    id: 19,
    question: "Which environmental factor most commonly causes tracking in electrical insulation?",
    options: [
      "Low temperature",
      "Dry conditions",
      "Moisture combined with contamination",
      "Low humidity"
    ],
    correctAnswer: 2,
    explanation: "Tracking occurs when moisture combines with contamination on insulation surfaces, creating a conductive path.",
    difficulty: "intermediate"
  },
  {
    id: 20,
    question: "An arcing fault is characterised by:",
    options: [
      "Stable current flow",
      "Intermittent current flow with plasma formation",
      "Continuous short circuit",
      "No current flow"
    ],
    correctAnswer: 1,
    explanation: "Arcing faults involve intermittent current flow through ionised air (plasma), creating dangerous high-temperature conditions.",
    difficulty: "advanced"
  },
  {
    id: 21,
    question: "What is the typical voltage level at which step potential becomes dangerous?",
    options: [
      "12V",
      "25V",
      "50V",
      "230V"
    ],
    correctAnswer: 2,
    explanation: "Step potential becomes dangerous at around 50V, which is considered the safe voltage limit for human contact in most conditions.",
    difficulty: "basic"
  },
  {
    id: 22,
    question: "Which fault type is most likely to cause electromagnetic interference?",
    options: [
      "Open circuit",
      "Arcing fault",
      "High resistance joint",
      "Solid short circuit"
    ],
    correctAnswer: 1,
    explanation: "Arcing faults generate electromagnetic interference due to the rapid current changes and plasma formation during arc strikes.",
    difficulty: "intermediate"
  },
  {
    id: 23,
    question: "A fault that affects power quality without tripping protective devices is typically:",
    options: [
      "High current short circuit",
      "Dead earth fault",
      "High resistance fault",
      "Open circuit fault"
    ],
    correctAnswer: 2,
    explanation: "High resistance faults can affect power quality through voltage drop and harmonics without drawing enough current to trip protective devices.",
    difficulty: "intermediate"
  },
  {
    id: 24,
    question: "What is the primary cause of neutral conductor faults in three-phase systems?",
    options: [
      "Overloading due to harmonics",
      "Correct load balancing",
      "Proper installation",
      "Low system voltage"
    ],
    correctAnswer: 0,
    explanation: "Harmonic currents, particularly third harmonics, add in the neutral conductor and can cause overloading and conductor failure.",
    difficulty: "advanced"
  },
  {
    id: 25,
    question: "Which type of insulation test can detect developing faults before complete failure?",
    options: [
      "Continuity testing only",
      "Voltage measurement",
      "Polarisation index testing",
      "Visual inspection only"
    ],
    correctAnswer: 2,
    explanation: "Polarisation index testing can detect developing insulation faults by measuring how insulation resistance changes over time.",
    difficulty: "advanced"
  },
  {
    id: 26,
    question: "What distinguishes a ground fault from an earth fault?",
    options: [
      "Nothing - they are the same",
      "Voltage level involved",
      "Location of occurrence",
      "Time of occurrence"
    ],
    correctAnswer: 0,
    explanation: "Ground fault and earth fault are different terms for the same phenomenon - current flowing from a live conductor to earth/ground.",
    difficulty: "basic"
  },
  {
    id: 27,
    question: "Series arcing faults typically occur:",
    options: [
      "Between different phases",
      "In the same conductor path",
      "At the main panel only",
      "In grounding systems only"
    ],
    correctAnswer: 1,
    explanation: "Series arcing faults occur within the same conductor path, often at loose connections or damaged conductors.",
    difficulty: "intermediate"
  },
  {
    id: 28,
    question: "What is the most dangerous aspect of parallel arcing faults?",
    options: [
      "Low current levels",
      "High current and fire risk",
      "No risk present",
      "Only affects earthing"
    ],
    correctAnswer: 1,
    explanation: "Parallel arcing faults can draw high currents and present significant fire risk due to the high temperatures generated.",
    difficulty: "intermediate"
  },
  {
    id: 29,
    question: "Which condition is most likely to cause insulation carbonisation?",
    options: [
      "Low voltage",
      "Normal operation",
      "Sustained partial discharge",
      "Correct installation"
    ],
    correctAnswer: 2,
    explanation: "Sustained partial discharge gradually carbonises insulation, creating conductive paths that lead to complete insulation failure.",
    difficulty: "advanced"
  },
  {
    id: 30,
    question: "What type of fault is indicated by a tripping RCD but no obvious damage?",
    options: [
      "Open circuit fault",
      "Short circuit fault",
      "Earth leakage fault",
      "Neutral fault"
    ],
    correctAnswer: 2,
    explanation: "An RCD trips due to earth leakage current, which may not be visible but indicates current flowing to earth through insulation faults.",
    difficulty: "basic"
  },
  {
    id: 31,
    question: "Which factor most influences the severity of an electrical fault?",
    options: [
      "Time of day",
      "Available fault current",
      "Installation age",
      "Ambient temperature only"
    ],
    correctAnswer: 1,
    explanation: "Available fault current determines the severity of electrical faults, affecting arc energy, equipment damage, and safety risks.",
    difficulty: "intermediate"
  },
  {
    id: 32,
    question: "What is the primary characteristic of a developing cable fault?",
    options: [
      "Immediate complete failure",
      "Gradual degradation of electrical properties",
      "No change in performance",
      "Improved insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "Developing cable faults show gradual degradation of electrical properties like insulation resistance and voltage withstand capability.",
    difficulty: "intermediate"
  },
  {
    id: 33,
    question: "Which type of electrical stress most commonly causes insulation aging?",
    options: [
      "Mechanical stress only",
      "Thermal and electrical stress combined",
      "Chemical stress only",
      "No stress affects insulation"
    ],
    correctAnswer: 1,
    explanation: "Combined thermal and electrical stress most commonly causes insulation aging, accelerating chemical breakdown processes.",
    difficulty: "intermediate"
  },
  {
    id: 34,
    question: "What is the difference between a fault and a failure?",
    options: [
      "No difference",
      "A fault is detectable, a failure stops function",
      "Location only",
      "Time of occurrence"
    ],
    correctAnswer: 1,
    explanation: "A fault is a detectable deviation from normal operation, whilst a failure is when equipment ceases to perform its intended function.",
    difficulty: "intermediate"
  },
  {
    id: 35,
    question: "Which electrical parameter best indicates developing cable faults?",
    options: [
      "Voltage only",
      "Current only",
      "Insulation resistance trends",
      "Frequency only"
    ],
    correctAnswer: 2,
    explanation: "Monitoring insulation resistance trends over time provides the best indication of developing cable faults before complete failure.",
    difficulty: "advanced"
  },
  {
    id: 36,
    question: "What characterises a touch potential hazard?",
    options: [
      "Voltage between simultaneously touchable parts",
      "Normal operating voltage",
      "Low voltage only",
      "No voltage present"
    ],
    correctAnswer: 0,
    explanation: "Touch potential is the dangerous voltage that exists between two parts that a person might touch simultaneously during a fault.",
    difficulty: "intermediate"
  },
  {
    id: 37,
    question: "Which fault condition requires immediate disconnection for safety?",
    options: [
      "Minor insulation degradation",
      "Exposed live parts at hazardous voltage",
      "Slight voltage drop",
      "Normal wear and tear"
    ],
    correctAnswer: 1,
    explanation: "Exposed live parts at hazardous voltage create immediate shock risk and require immediate disconnection for safety.",
    difficulty: "basic"
  },
  {
    id: 38,
    question: "What is the primary indicator of thermal runaway in electrical equipment?",
    options: [
      "Stable temperature",
      "Continuously rising temperature despite load reduction",
      "Normal operation",
      "Reduced power consumption"
    ],
    correctAnswer: 1,
    explanation: "Thermal runaway is indicated by continuously rising temperature that doesn't stabilise even when load is reduced.",
    difficulty: "advanced"
  },
  {
    id: 39,
    question: "Which type of fault is most common in flexible cables?",
    options: [
      "Insulation breakdown",
      "Conductor fracture due to flexing",
      "High resistance joints",
      "Earth faults only"
    ],
    correctAnswer: 1,
    explanation: "Flexible cables most commonly fail due to conductor fracture caused by repeated flexing and mechanical stress.",
    difficulty: "basic"
  },
  {
    id: 40,
    question: "What distinguishes a progressive fault from a sudden fault?",
    options: [
      "Location only",
      "Rate of development",
      "Voltage level",
      "Current magnitude"
    ],
    correctAnswer: 1,
    explanation: "Progressive faults develop gradually over time, whilst sudden faults occur instantaneously without warning.",
    difficulty: "basic"
  },
  {
    id: 41,
    question: "Which condition indicates imminent insulation failure?",
    options: [
      "Stable insulation resistance",
      "Rapidly decreasing insulation resistance",
      "High insulation resistance",
      "Constant voltage levels"
    ],
    correctAnswer: 1,
    explanation: "Rapidly decreasing insulation resistance indicates accelerating breakdown and imminent insulation failure.",
    difficulty: "intermediate"
  },
  {
    id: 42,
    question: "What is the primary safety concern with high impedance earth faults?",
    options: [
      "High fault current",
      "They may not trip protective devices",
      "Low voltage",
      "No safety concern"
    ],
    correctAnswer: 1,
    explanation: "High impedance earth faults may not draw enough current to trip protective devices, leaving dangerous voltages on metalwork.",
    difficulty: "intermediate"
  },

  // Section 2: Common Fault Types (42 questions)
  {
    id: 43,
    question: "Which fault condition is most likely to cause arcing and fire risk?",
    options: [
      "Open circuit in lighting",
      "Overloaded socket circuit",
      "Loose connection in a junction box",
      "Correctly rated protective device"
    ],
    correctAnswer: 2,
    explanation: "Loose connections create high resistance, leading to overheating, arcing, and significant fire risk due to localised heat generation.",
    difficulty: "intermediate"
  },
  {
    id: 44,
    question: "A short circuit between live and neutral conductors will typically result in:",
    options: [
      "Gradual voltage drop",
      "Immediate operation of protective devices",
      "Intermittent supply problems",
      "Slow heating of conductors"
    ],
    correctAnswer: 1,
    explanation: "A short circuit creates a very low resistance path, causing high fault current that will immediately operate protective devices like MCBs or fuses.",
    difficulty: "basic"
  },
  {
    id: 45,
    question: "What is a common sign of cable damage in buried installations?",
    options: [
      "Consistent power supply",
      "Regular protective device operation",
      "Normal insulation resistance readings",
      "Stable voltage levels"
    ],
    correctAnswer: 1,
    explanation: "Cable damage in buried installations often causes earth faults, leading to regular operation of RCDs or other protective devices.",
    difficulty: "intermediate"
  },
  {
    id: 46,
    question: "Which fault type is most difficult to locate and diagnose?",
    options: [
      "Complete open circuit",
      "Direct short circuit",
      "Intermittent high resistance fault",
      "Dead short to earth"
    ],
    correctAnswer: 2,
    explanation: "Intermittent high resistance faults are difficult to diagnose because they may not be present during testing and can vary with environmental conditions.",
    difficulty: "advanced"
  },
  {
    id: 47,
    question: "Insulation failure typically occurs due to:",
    options: [
      "Correct installation practices",
      "Age, moisture, heat, or mechanical damage",
      "Proper cable selection",
      "Regular maintenance schedules"
    ],
    correctAnswer: 1,
    explanation: "Insulation failure is commonly caused by age, moisture ingress, excessive heat, mechanical damage, or chemical contamination.",
    difficulty: "basic"
  },
  {
    id: 48,
    question: "What type of fault is most likely in outdoor overhead lines?",
    options: [
      "Neutral conductor failure",
      "Weather-related flashovers",
      "High resistance joints only",
      "Underground cable faults"
    ],
    correctAnswer: 1,
    explanation: "Outdoor overhead lines are particularly susceptible to weather-related flashovers caused by rain, snow, ice, or contamination.",
    difficulty: "intermediate"
  },
  {
    id: 49,
    question: "Which component is most susceptible to thermal cycling damage?",
    options: [
      "Solid copper conductors",
      "Cable joints and terminations",
      "Plastic conduit",
      "Steel cable trays"
    ],
    correctAnswer: 1,
    explanation: "Cable joints and terminations are most susceptible to thermal cycling damage due to different expansion rates of materials.",
    difficulty: "intermediate"
  },
  {
    id: 50,
    question: "What is the most common cause of motor winding faults?",
    options: [
      "Correct starting procedures",
      "Insulation breakdown due to overheating",
      "Normal operation",
      "Proper ventilation"
    ],
    correctAnswer: 1,
    explanation: "Motor winding faults most commonly result from insulation breakdown caused by overheating due to overloading or blocked ventilation.",
    difficulty: "basic"
  },
  {
    id: 51,
    question: "Which type of fault typically occurs at cable bends?",
    options: [
      "Neutral displacement",
      "Conductor fracture",
      "Insulation improvement",
      "Reduced resistance"
    ],
    correctAnswer: 1,
    explanation: "Cable bends, especially tight bends, commonly cause conductor fracture due to mechanical stress concentration.",
    difficulty: "basic"
  },
  {
    id: 52,
    question: "What is the primary cause of nuisance tripping in RCD-protected circuits?",
    options: [
      "Correct operation",
      "Earth leakage current accumulation",
      "Overvoltage conditions",
      "Undervoltage conditions"
    ],
    correctAnswer: 1,
    explanation: "Nuisance RCD tripping is typically caused by accumulation of normal earth leakage currents from multiple connected equipment.",
    difficulty: "intermediate"
  },
  {
    id: 53,
    question: "Which fault condition is indicated by blown fuses on only one phase?",
    options: [
      "Three-phase fault",
      "Single-phase to earth fault",
      "Neutral conductor fault",
      "Balanced load condition"
    ],
    correctAnswer: 1,
    explanation: "A single-phase to earth fault typically causes fuses to blow on only the affected phase, leaving other phases operational.",
    difficulty: "intermediate"
  },
  {
    id: 54,
    question: "What type of fault commonly occurs in old rubber-insulated cables?",
    options: [
      "Improved insulation",
      "Perished insulation breakdown",
      "Enhanced performance",
      "Better conductivity"
    ],
    correctAnswer: 1,
    explanation: "Old rubber-insulated cables commonly fail due to perished insulation that becomes brittle and cracks with age.",
    difficulty: "basic"
  },
  {
    id: 55,
    question: "Which component failure commonly causes loss of neutral?",
    options: [
      "Live conductor",
      "Loose neutral connections at distribution boards",
      "Earth conductor",
      "Cable tray"
    ],
    correctAnswer: 1,
    explanation: "Loss of neutral commonly results from loose neutral connections at distribution boards or consumer units.",
    difficulty: "basic"
  },
  {
    id: 56,
    question: "What is the most common cause of cable sheath damage?",
    options: [
      "Normal aging",
      "Mechanical damage during installation or excavation",
      "Electrical stress",
      "Thermal expansion"
    ],
    correctAnswer: 1,
    explanation: "Cable sheath damage most commonly occurs due to mechanical damage during installation or subsequent excavation work.",
    difficulty: "basic"
  },
  {
    id: 57,
    question: "Which fault type is associated with poor workmanship?",
    options: [
      "Natural aging",
      "Inadequate tightening of connections",
      "Environmental factors",
      "Design limitations"
    ],
    correctAnswer: 1,
    explanation: "Inadequate tightening of connections is a common fault associated with poor workmanship during installation.",
    difficulty: "basic"
  },
  {
    id: 58,
    question: "What commonly causes earth electrode resistance to increase?",
    options: [
      "Wet soil conditions",
      "Soil drying out or corrosion",
      "Deep electrode installation",
      "Multiple electrodes"
    ],
    correctAnswer: 1,
    explanation: "Earth electrode resistance commonly increases due to soil drying out around the electrode or corrosion of the electrode itself.",
    difficulty: "intermediate"
  },
  {
    id: 59,
    question: "Which type of fault is most common in fluorescent lighting circuits?",
    options: [
      "Ballast failure",
      "Lamp failure only",
      "Switch failure only",
      "Conductor failure only"
    ],
    correctAnswer: 0,
    explanation: "Ballast failure is the most common fault in fluorescent lighting circuits, often caused by overheating or component aging.",
    difficulty: "basic"
  },
  {
    id: 60,
    question: "What type of fault typically develops at cable pulling points?",
    options: [
      "Insulation enhancement",
      "Conductor stretching and fracture",
      "Improved connections",
      "Better earthing"
    ],
    correctAnswer: 1,
    explanation: "Cable pulling points commonly develop conductor stretching and eventual fracture due to excessive tension during installation.",
    difficulty: "intermediate"
  },
  {
    id: 61,
    question: "Which component commonly fails in consumer units?",
    options: [
      "Enclosure only",
      "Main switch and MCB contacts",
      "Wiring only",
      "Earth bar only"
    ],
    correctAnswer: 1,
    explanation: "Main switches and MCB contacts commonly fail in consumer units due to arcing, overheating, and contact wear.",
    difficulty: "basic"
  },
  {
    id: 62,
    question: "What is the most common fault in socket outlet circuits?",
    options: [
      "Overloading",
      "Loose connections at outlets",
      "Correct operation",
      "Improved performance"
    ],
    correctAnswer: 1,
    explanation: "Loose connections at socket outlets are the most common fault, often caused by poor installation or thermal cycling.",
    difficulty: "basic"
  },
  {
    id: 63,
    question: "Which fault commonly occurs in electric shower installations?",
    options: [
      "Underloading",
      "Overheating due to inadequate cable sizing",
      "Excessive insulation",
      "Low current draw"
    ],
    correctAnswer: 1,
    explanation: "Electric shower installations commonly suffer from overheating due to inadequate cable sizing for the high current demands.",
    difficulty: "intermediate"
  },
  {
    id: 64,
    question: "What type of fault is common in temporary electrical installations?",
    options: [
      "Permanent protection",
      "Mechanical damage to flexible cables",
      "Enhanced safety",
      "Improved earthing"
    ],
    correctAnswer: 1,
    explanation: "Temporary installations commonly suffer mechanical damage to flexible cables due to rough handling and environmental exposure.",
    difficulty: "basic"
  },
  {
    id: 65,
    question: "Which fault type is associated with aluminium conductors?",
    options: [
      "Improved conductivity",
      "Oxidation and high resistance joints",
      "Enhanced performance",
      "Better connections"
    ],
    correctAnswer: 1,
    explanation: "Aluminium conductors are susceptible to oxidation, which creates high resistance joints if not properly treated with joint compound.",
    difficulty: "intermediate"
  },
  {
    id: 66,
    question: "What commonly causes switchgear contact failure?",
    options: [
      "Low current switching",
      "Arcing and contact erosion",
      "Infrequent operation",
      "Cool operation"
    ],
    correctAnswer: 1,
    explanation: "Switchgear contact failure commonly results from arcing and contact erosion caused by switching electrical loads.",
    difficulty: "intermediate"
  },
  {
    id: 67,
    question: "Which fault is common in outdoor electrical equipment?",
    options: [
      "Indoor installation benefits",
      "Water ingress and corrosion",
      "Improved performance",
      "Enhanced protection"
    ],
    correctAnswer: 1,
    explanation: "Outdoor electrical equipment commonly suffers from water ingress and corrosion due to weather exposure.",
    difficulty: "basic"
  },
  {
    id: 68,
    question: "What type of fault commonly affects three-phase motor connections?",
    options: [
      "Perfect balance",
      "Phase loss or imbalance",
      "Improved efficiency",
      "Enhanced starting"
    ],
    correctAnswer: 1,
    explanation: "Three-phase motor connections commonly suffer from phase loss or imbalance, causing overheating and motor damage.",
    difficulty: "intermediate"
  },
  {
    id: 69,
    question: "Which component commonly fails in electric heating circuits?",
    options: [
      "Thermostats only",
      "Heating elements and contactors",
      "Wiring only",
      "Switches only"
    ],
    correctAnswer: 1,
    explanation: "Electric heating circuits commonly experience heating element burn-out and contactor failure due to high current switching.",
    difficulty: "basic"
  },
  {
    id: 70,
    question: "What fault commonly occurs at cable entry points?",
    options: [
      "Enhanced sealing",
      "Water ingress and insulation breakdown",
      "Improved protection",
      "Better earthing"
    ],
    correctAnswer: 1,
    explanation: "Cable entry points commonly suffer from water ingress leading to insulation breakdown if not properly sealed.",
    difficulty: "intermediate"
  },
  {
    id: 71,
    question: "Which fault type is common in industrial motor control circuits?",
    options: [
      "Perfect operation",
      "Contactor contact welding",
      "Enhanced control",
      "Improved reliability"
    ],
    correctAnswer: 1,
    explanation: "Industrial motor control circuits commonly experience contactor contact welding due to high inrush currents and frequent switching.",
    difficulty: "intermediate"
  },
  {
    id: 72,
    question: "What commonly causes failure in buried cable installations?",
    options: [
      "Enhanced protection",
      "Mechanical damage and water ingress",
      "Improved insulation",
      "Better earthing"
    ],
    correctAnswer: 1,
    explanation: "Buried cable installations commonly fail due to mechanical damage from excavation and water ingress through damaged sheaths.",
    difficulty: "basic"
  },
  {
    id: 73,
    question: "Which fault is typical in high-vibration environments?",
    options: [
      "Stable connections",
      "Connection loosening",
      "Improved tightness",
      "Enhanced stability"
    ],
    correctAnswer: 1,
    explanation: "High-vibration environments typically cause connection loosening, leading to high resistance joints and arcing faults.",
    difficulty: "intermediate"
  },
  {
    id: 74,
    question: "What type of fault commonly occurs in extension lead plugs?",
    options: [
      "Perfect connections",
      "Bent pins and poor contact",
      "Enhanced contact",
      "Improved safety"
    ],
    correctAnswer: 1,
    explanation: "Extension lead plugs commonly develop bent pins and poor contact due to frequent plugging and unplugging.",
    difficulty: "basic"
  },
  {
    id: 75,
    question: "Which fault commonly affects cable drum installations?",
    options: [
      "Cool operation",
      "Overheating when partially unwound",
      "Enhanced cooling",
      "Perfect heat dissipation"
    ],
    correctAnswer: 1,
    explanation: "Cable drums commonly overheat when partially unwound because coiled cable cannot dissipate heat effectively.",
    difficulty: "intermediate"
  },
  {
    id: 76,
    question: "What commonly causes protective device failure?",
    options: [
      "Light loading",
      "Repeated fault clearing and aging",
      "Infrequent operation",
      "Cool environments"
    ],
    correctAnswer: 1,
    explanation: "Protective devices commonly fail due to repeated fault clearing operations and component aging from thermal and mechanical stress.",
    difficulty: "intermediate"
  },
  {
    id: 77,
    question: "Which fault type is common in LED lighting installations?",
    options: [
      "Perfect operation",
      "Driver/power supply failure",
      "Enhanced reliability",
      "Improved efficiency"
    ],
    correctAnswer: 1,
    explanation: "LED lighting installations commonly experience driver/power supply failure due to component stress and heat generation.",
    difficulty: "basic"
  },
  {
    id: 78,
    question: "What commonly affects underground cable joints?",
    options: [
      "Enhanced sealing",
      "Water ingress and joint failure",
      "Improved insulation",
      "Better protection"
    ],
    correctAnswer: 1,
    explanation: "Underground cable joints commonly fail due to water ingress if the joint is not properly sealed and protected.",
    difficulty: "intermediate"
  },
  {
    id: 79,
    question: "Which component commonly fails in electrical panels?",
    options: [
      "Enclosure only",
      "Busbar connections",
      "Labels only",
      "Doors only"
    ],
    correctAnswer: 1,
    explanation: "Busbar connections commonly fail in electrical panels due to thermal cycling, corrosion, and inadequate contact pressure.",
    difficulty: "intermediate"
  },
  {
    id: 80,
    question: "What fault commonly occurs in cable tray installations?",
    options: [
      "Enhanced support",
      "Corrosion and support failure",
      "Improved strength",
      "Better protection"
    ],
    correctAnswer: 1,
    explanation: "Cable tray installations commonly suffer from corrosion and support failure, especially in corrosive environments.",
    difficulty: "basic"
  },
  {
    id: 81,
    question: "Which fault is typical in high-temperature environments?",
    options: [
      "Enhanced insulation",
      "Accelerated insulation aging",
      "Improved performance",
      "Better conductivity"
    ],
    correctAnswer: 1,
    explanation: "High-temperature environments cause accelerated insulation aging, leading to premature insulation breakdown.",
    difficulty: "intermediate"
  },
  {
    id: 82,
    question: "What commonly causes earth continuity faults?",
    options: [
      "Enhanced earthing",
      "Broken or disconnected earth conductors",
      "Improved connections",
      "Better earth electrodes"
    ],
    correctAnswer: 1,
    explanation: "Earth continuity faults commonly result from broken or disconnected earth conductors, often due to mechanical damage.",
    difficulty: "basic"
  },
  {
    id: 83,
    question: "Which fault type affects power factor correction equipment?",
    options: [
      "Perfect operation",
      "Capacitor failure",
      "Enhanced performance",
      "Improved power factor"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction equipment commonly experiences capacitor failure due to voltage stress and aging.",
    difficulty: "intermediate"
  },
  {
    id: 84,
    question: "What commonly affects electrical connections in marine environments?",
    options: [
      "Enhanced protection",
      "Salt corrosion",
      "Improved conductivity",
      "Better insulation"
    ],
    correctAnswer: 1,
    explanation: "Marine environments cause salt corrosion of electrical connections, leading to high resistance and eventual failure.",
    difficulty: "intermediate"
  },

  // Section 3: Signs and Symptoms (42 questions)
  {
    id: 85,
    question: "What is typically the first sign of a developing high resistance joint?",
    options: [
      "Complete loss of supply",
      "Protective device operation",
      "Flickering lights or voltage fluctuations",
      "Reduced earth loop impedance"
    ],
    correctAnswer: 2,
    explanation: "High resistance joints often first manifest as flickering lights or voltage fluctuations due to the increased resistance affecting voltage levels.",
    difficulty: "intermediate"
  },
  {
    id: 86,
    question: "A burning smell from electrical equipment typically indicates:",
    options: [
      "Normal operation",
      "Overheating due to a fault condition",
      "Proper ventilation",
      "Low ambient temperature"
    ],
    correctAnswer: 1,
    explanation: "A burning smell from electrical equipment is a clear indication of overheating, usually caused by loose connections, overloading, or insulation breakdown.",
    difficulty: "basic"
  },
  {
    id: 87,
    question: "Frequent operation of an RCD may indicate:",
    options: [
      "The RCD is faulty",
      "An earth leakage fault",
      "Normal protective operation",
      "Correct installation"
    ],
    correctAnswer: 1,
    explanation: "Frequent RCD operation typically indicates an earth leakage fault somewhere in the installation that needs investigation and rectification.",
    difficulty: "basic"
  },
  {
    id: 88,
    question: "What symptom would suggest a neutral conductor fault?",
    options: [
      "All lights working normally",
      "Voltage variations between different circuits",
      "Consistent supply voltage",
      "Normal earth loop impedance readings"
    ],
    correctAnswer: 1,
    explanation: "A neutral conductor fault can cause voltage variations between different circuits, as the return path is compromised affecting voltage distribution.",
    difficulty: "intermediate"
  },
  {
    id: 89,
    question: "Excessive heat at a connection point indicates:",
    options: [
      "Correct tightening torque applied",
      "High resistance at the connection",
      "Good electrical contact",
      "Proper cable selection"
    ],
    correctAnswer: 1,
    explanation: "Excessive heat at connections indicates high resistance, usually due to loose connections or corrosion, causing I²R losses and heating.",
    difficulty: "basic"
  },
  {
    id: 90,
    question: "What visual sign indicates potential arcing in electrical equipment?",
    options: [
      "Clean contact surfaces",
      "Black carbon deposits around contacts",
      "Bright metal surfaces",
      "No visible changes"
    ],
    correctAnswer: 1,
    explanation: "Black carbon deposits around electrical contacts are a clear visual sign of arcing activity and contact deterioration.",
    difficulty: "basic"
  },
  {
    id: 91,
    question: "A crackling or sizzling sound from electrical equipment suggests:",
    options: [
      "Normal operation",
      "Arcing or corona discharge",
      "Quiet operation",
      "Proper installation"
    ],
    correctAnswer: 1,
    explanation: "Crackling or sizzling sounds from electrical equipment typically indicate arcing or corona discharge, both serious fault conditions.",
    difficulty: "basic"
  },
  {
    id: 92,
    question: "What symptom indicates motor bearing failure?",
    options: [
      "Silent operation",
      "Unusual noise and vibration",
      "Normal rotation",
      "Cool operation"
    ],
    correctAnswer: 1,
    explanation: "Motor bearing failure is indicated by unusual noise and vibration, often accompanied by increased operating temperature.",
    difficulty: "basic"
  },
  {
    id: 93,
    question: "Dimming lights when motors start indicates:",
    options: [
      "Perfect power supply",
      "Voltage drop due to high starting current",
      "Improved illumination",
      "Energy saving operation"
    ],
    correctAnswer: 1,
    explanation: "Dimming lights during motor starting indicates voltage drop in the supply system due to the high starting current drawn by the motor.",
    difficulty: "intermediate"
  },
  {
    id: 94,
    question: "What indicates possible insulation breakdown in cables?",
    options: [
      "Perfect insulation readings",
      "Decreasing insulation resistance over time",
      "Increasing insulation resistance",
      "Constant high readings"
    ],
    correctAnswer: 1,
    explanation: "Decreasing insulation resistance readings over time indicate possible insulation breakdown and developing fault conditions.",
    difficulty: "intermediate"
  },
  {
    id: 95,
    question: "A metallic taste or ozone smell near electrical equipment indicates:",
    options: [
      "Normal operation",
      "Corona discharge or arcing",
      "Fresh air circulation",
      "Proper maintenance"
    ],
    correctAnswer: 1,
    explanation: "A metallic taste or ozone smell near electrical equipment indicates corona discharge or arcing, which produces ozone gas.",
    difficulty: "intermediate"
  },
  {
    id: 96,
    question: "What symptom suggests overloading in electrical circuits?",
    options: [
      "Cool cable temperatures",
      "Warm or hot cables and connections",
      "Normal temperature operation",
      "Cold equipment operation"
    ],
    correctAnswer: 1,
    explanation: "Overloaded circuits show symptoms of warm or hot cables and connections due to excessive current flow causing I²R heating.",
    difficulty: "basic"
  },
  {
    id: 97,
    question: "Erratic operation of electronic equipment may indicate:",
    options: [
      "Perfect power quality",
      "Power quality problems or electrical interference",
      "Normal operation",
      "Improved performance"
    ],
    correctAnswer: 1,
    explanation: "Erratic operation of electronic equipment often indicates power quality problems or electrical interference affecting sensitive components.",
    difficulty: "intermediate"
  },
  {
    id: 98,
    question: "What visual sign indicates water ingress in electrical equipment?",
    options: [
      "Dry conditions throughout",
      "Corrosion and water marks",
      "Perfect condition",
      "Enhanced protection"
    ],
    correctAnswer: 1,
    explanation: "Water ingress in electrical equipment is indicated by visible corrosion, water marks, and mineral deposits on internal components.",
    difficulty: "basic"
  },
  {
    id: 99,
    question: "Discoloration around electrical connections typically indicates:",
    options: [
      "Normal aging",
      "Overheating from high resistance",
      "Improved connections",
      "Enhanced conductivity"
    ],
    correctAnswer: 1,
    explanation: "Discoloration around electrical connections typically indicates overheating caused by high resistance due to loose connections.",
    difficulty: "basic"
  },
  {
    id: 100,
    question: "What symptom suggests earth electrode deterioration?",
    options: [
      "Stable earth resistance",
      "Increasing earth electrode resistance",
      "Decreasing resistance",
      "Perfect earthing"
    ],
    correctAnswer: 1,
    explanation: "Earth electrode deterioration is indicated by increasing earth electrode resistance due to corrosion or soil condition changes.",
    difficulty: "intermediate"
  },
  {
    id: 101,
    question: "Voltage imbalance in three-phase systems may cause:",
    options: [
      "Perfect motor operation",
      "Motor overheating and vibration",
      "Enhanced efficiency",
      "Improved performance"
    ],
    correctAnswer: 1,
    explanation: "Voltage imbalance in three-phase systems causes motor overheating and vibration due to unequal phase loading.",
    difficulty: "intermediate"
  },
  {
    id: 102,
    question: "What indicates possible cable sheath damage?",
    options: [
      "Perfect cable condition",
      "Moisture ingress and earth leakage",
      "Enhanced protection",
      "Improved insulation"
    ],
    correctAnswer: 1,
    explanation: "Cable sheath damage is indicated by moisture ingress leading to earth leakage current and possible RCD operation.",
    difficulty: "intermediate"
  },
  {
    id: 103,
    question: "Sparking at switch contacts indicates:",
    options: [
      "Normal operation",
      "Contact deterioration or overloading",
      "Perfect switching",
      "Enhanced contact"
    ],
    correctAnswer: 1,
    explanation: "Sparking at switch contacts indicates contact deterioration or overloading, often leading to contact welding or burning.",
    difficulty: "basic"
  },
  {
    id: 104,
    question: "What symptom suggests transformer overloading?",
    options: [
      "Cool operation",
      "Excessive temperature rise and noise",
      "Silent operation",
      "Normal temperature"
    ],
    correctAnswer: 1,
    explanation: "Transformer overloading is indicated by excessive temperature rise and increased noise due to magnetic saturation and thermal stress.",
    difficulty: "intermediate"
  },
  {
    id: 105,
    question: "Intermittent operation of electrical equipment suggests:",
    options: [
      "Perfect reliability",
      "Loose connections or failing components",
      "Enhanced operation",
      "Improved reliability"
    ],
    correctAnswer: 1,
    explanation: "Intermittent operation typically indicates loose connections or failing components that make and break contact randomly.",
    difficulty: "basic"
  },
  {
    id: 106,
    question: "What indicates possible harmonic distortion in electrical systems?",
    options: [
      "Perfect waveforms",
      "Overheating of neutral conductors",
      "Cool neutral operation",
      "Enhanced power quality"
    ],
    correctAnswer: 1,
    explanation: "Harmonic distortion is indicated by overheating of neutral conductors, as triplen harmonics add arithmetically in the neutral.",
    difficulty: "advanced"
  },
  {
    id: 107,
    question: "Buzzing sounds from fluorescent fittings may indicate:",
    options: [
      "Silent operation",
      "Ballast failure or lamp end-of-life",
      "Perfect operation",
      "Enhanced lighting"
    ],
    correctAnswer: 1,
    explanation: "Buzzing sounds from fluorescent fittings typically indicate ballast failure or lamp approaching end-of-life conditions.",
    difficulty: "basic"
  },
  {
    id: 108,
    question: "What symptom suggests cable joint failure?",
    options: [
      "Perfect joints",
      "Local heating and possible smoke",
      "Cool operation",
      "Enhanced connection"
    ],
    correctAnswer: 1,
    explanation: "Cable joint failure is indicated by local heating around the joint and possible smoke from burning insulation or joint compound.",
    difficulty: "intermediate"
  },
  {
    id: 109,
    question: "Reduced light output from lamps may indicate:",
    options: [
      "Enhanced efficiency",
      "Voltage drop or lamp deterioration",
      "Perfect illumination",
      "Improved performance"
    ],
    correctAnswer: 1,
    explanation: "Reduced light output from lamps typically indicates voltage drop in the supply circuit or lamp deterioration approaching end-of-life.",
    difficulty: "basic"
  },
  {
    id: 110,
    question: "What indicates possible motor winding failure?",
    options: [
      "Cool operation",
      "Excessive current draw and overheating",
      "Normal current",
      "Perfect operation"
    ],
    correctAnswer: 1,
    explanation: "Motor winding failure is indicated by excessive current draw and overheating due to insulation breakdown creating turn-to-turn faults.",
    difficulty: "intermediate"
  },
  {
    id: 111,
    question: "Visible corona around high voltage equipment indicates:",
    options: [
      "Normal operation",
      "Insulation stress and potential failure",
      "Enhanced insulation",
      "Perfect conditions"
    ],
    correctAnswer: 1,
    explanation: "Visible corona around high voltage equipment indicates insulation stress and potential insulation failure due to electric field concentration.",
    difficulty: "advanced"
  },
  {
    id: 112,
    question: "What symptom suggests contactor coil failure?",
    options: [
      "Perfect operation",
      "Chattering or failure to hold in",
      "Silent operation",
      "Enhanced switching"
    ],
    correctAnswer: 1,
    explanation: "Contactor coil failure is indicated by chattering contacts or failure to hold in due to insufficient magnetic force from the coil.",
    difficulty: "basic"
  },
  {
    id: 113,
    question: "Power factor deterioration in motors may indicate:",
    options: [
      "Perfect efficiency",
      "Winding deterioration or mechanical problems",
      "Enhanced performance",
      "Improved operation"
    ],
    correctAnswer: 1,
    explanation: "Power factor deterioration in motors typically indicates winding deterioration or mechanical problems affecting motor efficiency.",
    difficulty: "advanced"
  },
  {
    id: 114,
    question: "What indicates possible busbar overheating?",
    options: [
      "Cool temperatures",
      "Discoloration and expansion joint movement",
      "Perfect condition",
      "Enhanced cooling"
    ],
    correctAnswer: 1,
    explanation: "Busbar overheating is indicated by discoloration of connections and movement at expansion joints due to thermal expansion.",
    difficulty: "intermediate"
  },
  {
    id: 115,
    question: "Premature lamp failure may indicate:",
    options: [
      "Perfect supply quality",
      "Voltage fluctuations or poor power quality",
      "Enhanced lamp life",
      "Improved illumination"
    ],
    correctAnswer: 1,
    explanation: "Premature lamp failure often indicates voltage fluctuations or poor power quality that stress lamp filaments and reduce life.",
    difficulty: "intermediate"
  },
  {
    id: 116,
    question: "What symptom suggests cable pulling damage?",
    options: [
      "Perfect cable condition",
      "Conductor stretching or insulation damage",
      "Enhanced installation",
      "Improved cable properties"
    ],
    correctAnswer: 1,
    explanation: "Cable pulling damage is indicated by conductor stretching, insulation scoring, or compression damage from excessive pulling force.",
    difficulty: "intermediate"
  },
  {
    id: 117,
    question: "Unusual motor starting characteristics may indicate:",
    options: [
      "Perfect starting",
      "Supply voltage problems or motor faults",
      "Enhanced starting",
      "Improved performance"
    ],
    correctAnswer: 1,
    explanation: "Unusual motor starting characteristics often indicate supply voltage problems, motor winding faults, or mechanical issues.",
    difficulty: "intermediate"
  },
  {
    id: 118,
    question: "What indicates possible earth leakage in wet conditions?",
    options: [
      "Perfect insulation",
      "Tingling sensation from metalwork",
      "Enhanced safety",
      "Normal operation"
    ],
    correctAnswer: 1,
    explanation: "A tingling sensation from metalwork in wet conditions indicates dangerous earth leakage current and immediate safety risk.",
    difficulty: "basic"
  },
  {
    id: 119,
    question: "Protective device nuisance tripping may indicate:",
    options: [
      "Perfect protection",
      "Marginal fault conditions or device aging",
      "Enhanced protection",
      "Improved operation"
    ],
    correctAnswer: 1,
    explanation: "Protective device nuisance tripping often indicates marginal fault conditions, device aging, or sensitivity to transient conditions.",
    difficulty: "intermediate"
  },
  {
    id: 120,
    question: "What symptom suggests cable thermal damage?",
    options: [
      "Perfect cable condition",
      "Brittle or discolored insulation",
      "Enhanced insulation",
      "Improved flexibility"
    ],
    correctAnswer: 1,
    explanation: "Cable thermal damage is indicated by brittle or discolored insulation that has been degraded by excessive heat exposure.",
    difficulty: "basic"
  },
  {
    id: 121,
    question: "Electrical noise in audio equipment may indicate:",
    options: [
      "Perfect audio quality",
      "EMI from electrical faults or poor earthing",
      "Enhanced sound quality",
      "Improved performance"
    ],
    correctAnswer: 1,
    explanation: "Electrical noise in audio equipment often indicates electromagnetic interference from electrical faults or poor earthing arrangements.",
    difficulty: "intermediate"
  },
  {
    id: 122,
    question: "What indicates deteriorating cable support systems?",
    options: [
      "Perfect support",
      "Cable sagging or mechanical stress",
      "Enhanced support",
      "Improved installation"
    ],
    correctAnswer: 1,
    explanation: "Deteriorating cable support systems are indicated by cable sagging, mechanical stress points, or visible support structure corrosion.",
    difficulty: "basic"
  },
  {
    id: 123,
    question: "Irregular magnetic field patterns around equipment may indicate:",
    options: [
      "Normal operation",
      "Internal winding faults or core problems",
      "Perfect magnetic circuits",
      "Enhanced performance"
    ],
    correctAnswer: 1,
    explanation: "Irregular magnetic field patterns often indicate internal winding faults, core lamination problems, or magnetic circuit defects.",
    difficulty: "advanced"
  },
  {
    id: 124,
    question: "What symptom suggests semiconductor device failure?",
    options: [
      "Perfect switching",
      "Erratic operation or complete failure",
      "Enhanced performance",
      "Improved efficiency"
    ],
    correctAnswer: 1,
    explanation: "Semiconductor device failure is typically indicated by erratic operation, complete failure to switch, or thermal runaway conditions.",
    difficulty: "intermediate"
  },
  {
    id: 125,
    question: "Capacitor failure in power factor correction may show:",
    options: [
      "Perfect power factor",
      "Swollen case or reduced capacitance",
      "Enhanced correction",
      "Improved efficiency"
    ],
    correctAnswer: 1,
    explanation: "Capacitor failure is often indicated by a swollen case due to internal pressure buildup or measured reduction in capacitance value.",
    difficulty: "intermediate"
  },
  {
    id: 126,
    question: "What indicates possible magnetic contactor problems?",
    options: [
      "Silent operation",
      "Loud operation or contact chatter",
      "Perfect switching",
      "Enhanced operation"
    ],
    correctAnswer: 1,
    explanation: "Magnetic contactor problems are indicated by loud operation, contact chatter, or visible arcing at contact points during switching.",
    difficulty: "basic"
  },

  // Section 4: Fault-Finding Process (42 questions)
  {
    id: 127,
    question: "What is the first step in any fault-finding procedure?",
    options: [
      "Test with instruments",
      "Replace suspected components",
      "Gather information about the fault",
      "Isolate the supply"
    ],
    correctAnswer: 2,
    explanation: "The first step in fault-finding is always to gather information about the fault symptoms, when it occurred, and any recent changes to the installation.",
    difficulty: "basic"
  },
  {
    id: 128,
    question: "Which testing sequence should be followed when fault-finding?",
    options: [
      "Random testing until fault is found",
      "Logical progression from supply to load",
      "Test only the suspected component",
      "Start with the most expensive equipment"
    ],
    correctAnswer: 1,
    explanation: "Logical progression from supply to load ensures systematic fault-finding and prevents missing faults or creating additional problems.",
    difficulty: "basic"
  },
  {
    id: 129,
    question: "Before commencing electrical fault-finding, you must:",
    options: [
      "Test all equipment first",
      "Contact the electricity supplier",
      "Ensure safe isolation procedures are followed",
      "Replace all protective devices"
    ],
    correctAnswer: 2,
    explanation: "Safe isolation is essential before fault-finding to protect against electric shock and ensure safe working conditions during testing and repair.",
    difficulty: "basic"
  },
  {
    id: 130,
    question: "What information should be gathered before starting fault diagnosis?",
    options: [
      "Only the customer's description",
      "Fault symptoms, recent changes, and circuit details",
      "Just the protective device ratings",
      "Only the installation date"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive information gathering includes fault symptoms, recent changes, circuit details, and operational history to guide effective diagnosis.",
    difficulty: "intermediate"
  },
  {
    id: 131,
    question: "The 'half-split' method of fault-finding involves:",
    options: [
      "Testing every component individually",
      "Dividing the circuit in half and testing each section",
      "Using half the normal test voltage",
      "Testing for half the normal time"
    ],
    correctAnswer: 1,
    explanation: "The half-split method involves dividing the circuit roughly in half and testing each section to quickly isolate which half contains the fault.",
    difficulty: "intermediate"
  },
  {
    id: 132,
    question: "When should a detailed circuit diagram be consulted?",
    options: [
      "Never - work from memory",
      "Only after the fault is found",
      "Before starting any fault-finding work",
      "Only when simple faults cannot be found"
    ],
    correctAnswer: 2,
    explanation: "Circuit diagrams should be consulted before starting fault-finding to understand the circuit operation and identify critical test points.",
    difficulty: "basic"
  },
  {
    id: 133,
    question: "What is the purpose of functional testing during fault-finding?",
    options: [
      "To damage equipment",
      "To verify correct operation after repair",
      "To create more faults",
      "To waste time"
    ],
    correctAnswer: 1,
    explanation: "Functional testing verifies that equipment operates correctly after fault rectification and that no additional problems exist.",
    difficulty: "basic"
  },
  {
    id: 134,
    question: "Which approach is most effective for intermittent faults?",
    options: [
      "Wait for permanent failure",
      "Monitoring and recording fault patterns",
      "Random component replacement",
      "Ignore the problem"
    ],
    correctAnswer: 1,
    explanation: "Intermittent faults require monitoring and recording fault patterns to identify triggers and timing for effective diagnosis.",
    difficulty: "intermediate"
  },
  {
    id: 135,
    question: "What should be done if a fault cannot be readily identified?",
    options: [
      "Replace all components",
      "Abandon the investigation",
      "Reassess the symptoms and test methodology",
      "Energise the faulty circuit"
    ],
    correctAnswer: 2,
    explanation: "If a fault cannot be identified, reassess the symptoms, test methodology, and consider alternative fault possibilities or seek assistance.",
    difficulty: "intermediate"
  },
  {
    id: 136,
    question: "Which testing method is most appropriate for open circuit faults?",
    options: [
      "Insulation resistance testing",
      "Continuity testing",
      "Earth loop impedance testing",
      "RCD testing"
    ],
    correctAnswer: 1,
    explanation: "Continuity testing is most appropriate for open circuit faults as it verifies the presence of complete electrical paths.",
    difficulty: "basic"
  },
  {
    id: 137,
    question: "What is the advantage of voltage measurement during fault-finding?",
    options: [
      "It can damage circuits",
      "It provides live circuit information",
      "It's always dangerous",
      "It's unnecessary"
    ],
    correctAnswer: 1,
    explanation: "Voltage measurement provides valuable live circuit information about supply availability and circuit operation during fault conditions.",
    difficulty: "basic"
  },
  {
    id: 138,
    question: "When should replacement parts be fitted during fault-finding?",
    options: [
      "Immediately at start",
      "Only after fault location is confirmed",
      "Randomly throughout the process",
      "Never replace parts"
    ],
    correctAnswer: 1,
    explanation: "Replacement parts should only be fitted after fault location is confirmed to avoid unnecessary component replacement and costs.",
    difficulty: "basic"
  },
  {
    id: 139,
    question: "What is the purpose of isolation verification?",
    options: [
      "To create faults",
      "To confirm circuits are dead before working",
      "To energise circuits",
      "To damage test equipment"
    ],
    correctAnswer: 1,
    explanation: "Isolation verification confirms that circuits are dead and safe to work on before commencing fault-finding activities.",
    difficulty: "basic"
  },
  {
    id: 140,
    question: "Which documentation should be updated after fault rectification?",
    options: [
      "No documentation needed",
      "Installation records and maintenance logs",
      "Only customer invoices",
      "Only manufacturer warranties"
    ],
    correctAnswer: 1,
    explanation: "Installation records and maintenance logs should be updated to provide a history of faults and repairs for future reference.",
    difficulty: "basic"
  },
  {
    id: 141,
    question: "What is the benefit of systematic fault-finding approaches?",
    options: [
      "They take longer",
      "They ensure thorough and efficient diagnosis",
      "They create more problems",
      "They are unnecessary"
    ],
    correctAnswer: 1,
    explanation: "Systematic approaches ensure thorough and efficient diagnosis, reducing diagnostic time and preventing missed faults.",
    difficulty: "basic"
  },
  {
    id: 142,
    question: "When should fault-finding work be postponed?",
    options: [
      "Never postpone",
      "When safe working conditions cannot be achieved",
      "When equipment is expensive",
      "When customers are present"
    ],
    correctAnswer: 1,
    explanation: "Fault-finding should be postponed when safe working conditions cannot be achieved, prioritising safety over urgency.",
    difficulty: "basic"
  },
  {
    id: 143,
    question: "What information should be recorded during fault-finding?",
    options: [
      "Nothing needs recording",
      "Test results, observations, and actions taken",
      "Only final results",
      "Only customer comments"
    ],
    correctAnswer: 1,
    explanation: "Recording test results, observations, and actions taken provides valuable information for pattern analysis and future reference.",
    difficulty: "basic"
  },
  {
    id: 144,
    question: "Which factor most influences fault-finding strategy?",
    options: [
      "Time of day",
      "Type of installation and fault symptoms",
      "Weather conditions",
      "Technician preferences"
    ],
    correctAnswer: 1,
    explanation: "Fault-finding strategy should be influenced by the type of installation and specific fault symptoms to ensure appropriate methods are used.",
    difficulty: "intermediate"
  },
  {
    id: 145,
    question: "What should be verified before re-energising after repair?",
    options: [
      "Nothing - just switch on",
      "Repair quality and circuit safety",
      "Only customer satisfaction",
      "Only protective device ratings"
    ],
    correctAnswer: 1,
    explanation: "Before re-energising, verify repair quality, circuit safety, and that no additional hazards have been created during the repair process.",
    difficulty: "basic"
  },
  {
    id: 146,
    question: "Which testing principle should guide fault-finding activities?",
    options: [
      "Test everything simultaneously",
      "Test from known good points towards fault",
      "Start with most complex tests",
      "Avoid all testing"
    ],
    correctAnswer: 1,
    explanation: "Testing should progress from known good points towards the fault location to systematically narrow down the fault location.",
    difficulty: "intermediate"
  },
  {
    id: 147,
    question: "What is the purpose of comparative testing?",
    options: [
      "To create differences",
      "To identify differences between faulty and healthy circuits",
      "To waste time",
      "To damage equipment"
    ],
    correctAnswer: 1,
    explanation: "Comparative testing helps identify differences between faulty and healthy circuits, highlighting abnormal conditions.",
    difficulty: "intermediate"
  },
  {
    id: 148,
    question: "When should environmental factors be considered in fault-finding?",
    options: [
      "Never consider environment",
      "Always, as they may affect fault development",
      "Only in outdoor installations",
      "Only in winter"
    ],
    correctAnswer: 1,
    explanation: "Environmental factors should always be considered as they significantly affect fault development, especially moisture and temperature.",
    difficulty: "intermediate"
  },
  {
    id: 149,
    question: "What is the benefit of load testing during fault-finding?",
    options: [
      "It damages equipment",
      "It reveals faults that only occur under load",
      "It's unnecessary",
      "It wastes energy"
    ],
    correctAnswer: 1,
    explanation: "Load testing reveals faults that only manifest under operational conditions, such as thermal or stress-related problems.",
    difficulty: "intermediate"
  },
  {
    id: 150,
    question: "Which approach is best for multiple simultaneous faults?",
    options: [
      "Fix all faults together",
      "Prioritise by safety risk and isolate each fault",
      "Ignore minor faults",
      "Replace entire installation"
    ],
    correctAnswer: 1,
    explanation: "Multiple faults should be prioritised by safety risk and isolated individually to prevent masking effects and ensure complete resolution.",
    difficulty: "advanced"
  },
  {
    id: 151,
    question: "What should guide the selection of test equipment?",
    options: [
      "Equipment availability only",
      "Fault type and safety requirements",
      "Personal preference only",
      "Equipment cost only"
    ],
    correctAnswer: 1,
    explanation: "Test equipment selection should be guided by the fault type being investigated and safety requirements of the installation.",
    difficulty: "intermediate"
  },
  {
    id: 152,
    question: "When should expert assistance be sought?",
    options: [
      "Never seek help",
      "When fault complexity exceeds competence",
      "Only for expensive equipment",
      "Only for customer relations"
    ],
    correctAnswer: 1,
    explanation: "Expert assistance should be sought when fault complexity exceeds personal competence or specialist knowledge is required.",
    difficulty: "basic"
  },
  {
    id: 153,
    question: "What is the purpose of post-repair monitoring?",
    options: [
      "Unnecessary after repair",
      "To verify long-term repair effectiveness",
      "To create new faults",
      "To satisfy regulations only"
    ],
    correctAnswer: 1,
    explanation: "Post-repair monitoring verifies long-term repair effectiveness and helps identify any developing related problems.",
    difficulty: "intermediate"
  },
  {
    id: 154,
    question: "Which factor is most important in fault location accuracy?",
    options: [
      "Speed of diagnosis",
      "Systematic testing methodology",
      "Equipment cost",
      "Time of day"
    ],
    correctAnswer: 1,
    explanation: "Systematic testing methodology is most important for accurate fault location, ensuring thorough and logical investigation.",
    difficulty: "intermediate"
  },
  {
    id: 155,
    question: "What should be considered when planning fault rectification?",
    options: [
      "Cost only",
      "Safety, cost, and system impact",
      "Speed only",
      "Customer preference only"
    ],
    correctAnswer: 1,
    explanation: "Fault rectification planning should consider safety implications, cost factors, and impact on system operation.",
    difficulty: "intermediate"
  },
  {
    id: 156,
    question: "Which testing approach minimises system disruption?",
    options: [
      "Shut down everything",
      "Strategic isolation of minimum necessary circuits",
      "Work on live systems",
      "Random disconnection"
    ],
    correctAnswer: 1,
    explanation: "Strategic isolation of only the minimum necessary circuits minimises system disruption while maintaining safety.",
    difficulty: "intermediate"
  },
  {
    id: 157,
    question: "What is the value of historical fault data?",
    options: [
      "No value",
      "Helps identify patterns and prevent recurrence",
      "Only for documentation",
      "Creates confusion"
    ],
    correctAnswer: 1,
    explanation: "Historical fault data helps identify patterns, recurring problems, and guides preventive maintenance strategies.",
    difficulty: "intermediate"
  },
  {
    id: 158,
    question: "When should temporary repairs be implemented?",
    options: [
      "As permanent solutions",
      "Only for immediate safety pending proper repair",
      "Never use temporary repairs",
      "For cost saving only"
    ],
    correctAnswer: 1,
    explanation: "Temporary repairs should only be used for immediate safety measures while planning and implementing proper permanent repairs.",
    difficulty: "basic"
  },
  {
    id: 159,
    question: "What determines the urgency of fault rectification?",
    options: [
      "Customer pressure only",
      "Safety risk and system criticality",
      "Repair cost only",
      "Time of day only"
    ],
    correctAnswer: 1,
    explanation: "Fault rectification urgency should be determined by safety risk assessment and system criticality analysis.",
    difficulty: "basic"
  },
  {
    id: 160,
    question: "Which documentation supports effective fault analysis?",
    options: [
      "No documentation needed",
      "Circuit diagrams, test records, and maintenance history",
      "Only manufacturer manuals",
      "Only installation certificates"
    ],
    correctAnswer: 1,
    explanation: "Effective fault analysis requires circuit diagrams, test records, maintenance history, and operational documentation.",
    difficulty: "basic"
  },
  {
    id: 161,
    question: "What should be verified after completing fault repairs?",
    options: [
      "Nothing further needed",
      "System function, safety, and performance",
      "Only visual appearance",
      "Only customer satisfaction"
    ],
    correctAnswer: 1,
    explanation: "After fault repairs, verify system function, safety compliance, and performance meet required standards.",
    difficulty: "basic"
  },
  {
    id: 162,
    question: "Which principle guides safe fault investigation?",
    options: [
      "Work as quickly as possible",
      "Assume circuits are live until proven dead",
      "Trust previous isolation",
      "Work without testing"
    ],
    correctAnswer: 1,
    explanation: "Safe fault investigation requires assuming all circuits are live until proven dead through proper testing procedures.",
    difficulty: "basic"
  },
  {
    id: 163,
    question: "What is the benefit of photographic documentation during fault-finding?",
    options: [
      "Unnecessary paperwork",
      "Provides visual record of conditions and damage",
      "Wastes time",
      "Confuses the investigation"
    ],
    correctAnswer: 1,
    explanation: "Photographic documentation provides valuable visual records of fault conditions, damage extent, and repair procedures.",
    difficulty: "basic"
  },
  {
    id: 164,
    question: "When should fault-finding work be suspended?",
    options: [
      "Never suspend work",
      "When safety conditions deteriorate",
      "When equipment is expensive",
      "When work is difficult"
    ],
    correctAnswer: 1,
    explanation: "Fault-finding work should be suspended immediately when safety conditions deteriorate or become unacceptable.",
    difficulty: "basic"
  },
  {
    id: 165,
    question: "What is the primary goal of systematic fault diagnosis?",
    options: [
      "Speed of completion",
      "Accurate identification of root cause",
      "Minimum equipment use",
      "Customer satisfaction only"
    ],
    correctAnswer: 1,
    explanation: "The primary goal is accurate identification of the root cause to ensure effective repair and prevent recurrence.",
    difficulty: "basic"
  },
  {
    id: 166,
    question: "Which factor most affects fault-finding efficiency?",
    options: [
      "Working alone",
      "Systematic approach and proper preparation",
      "Using expensive equipment",
      "Working quickly"
    ],
    correctAnswer: 1,
    explanation: "Systematic approach and proper preparation most significantly affect fault-finding efficiency and success rates.",
    difficulty: "intermediate"
  },
  {
    id: 167,
    question: "What should be communicated to system users after repairs?",
    options: [
      "Nothing - just fix it",
      "Fault cause, repair actions, and prevention measures",
      "Only that it's fixed",
      "Only the cost"
    ],
    correctAnswer: 1,
    explanation: "Users should be informed about fault causes, repair actions taken, and any prevention measures to avoid recurrence.",
    difficulty: "basic"
  },
  {
    id: 168,
    question: "Which testing sequence provides most information efficiently?",
    options: [
      "Random testing order",
      "Simple to complex, safe to hazardous",
      "Most expensive tests first",
      "Complex tests only"
    ],
    correctAnswer: 1,
    explanation: "Testing should progress from simple to complex and safe to hazardous to maximise information gain while maintaining safety.",
    difficulty: "intermediate"
  },

  // Section 5: Safe Practices and Equipment (42 questions)
  {
    id: 169,
    question: "What is the most important safety consideration when using test instruments?",
    options: [
      "Using the cheapest available meter",
      "Ensuring instruments are appropriate for the voltage and environment",
      "Testing as quickly as possible",
      "Using any available test leads"
    ],
    correctAnswer: 1,
    explanation: "Test instruments must be rated for the voltage and environmental conditions they will be used in, with appropriate safety categories and CAT ratings.",
    difficulty: "basic"
  },
  {
    id: 170,
    question: "Before using a multimeter, you should:",
    options: [
      "Set it to the highest range immediately",
      "Check its calibration and prove it on a known source",
      "Use it without any checks",
      "Only check the battery level"
    ],
    correctAnswer: 1,
    explanation: "Multimeters should be checked for calibration and proved on a known source before use to ensure accurate and safe measurements.",
    difficulty: "basic"
  },
  {
    id: 171,
    question: "What CAT rating should test equipment have for testing at distribution boards?",
    options: [
      "CAT I",
      "CAT II",
      "CAT III",
      "CAT IV"
    ],
    correctAnswer: 2,
    explanation: "CAT III rated equipment is required for testing at distribution boards and fixed installation circuits in buildings.",
    difficulty: "intermediate"
  },
  {
    id: 172,
    question: "When testing for dead using a voltage indicator, you should:",
    options: [
      "Test once and proceed",
      "Prove-test-prove the instrument",
      "Only test the live conductor",
      "Use any available tester"
    ],
    correctAnswer: 1,
    explanation: "The prove-test-prove method ensures the voltage indicator is working before testing for dead, then confirms it still works afterwards.",
    difficulty: "basic"
  },
  {
    id: 173,
    question: "Test leads should be:",
    options: [
      "Visually inspected before each use",
      "Replaced annually regardless of condition",
      "Used until they fail completely",
      "Shared between different voltage ranges"
    ],
    correctAnswer: 0,
    explanation: "Test leads should be visually inspected before each use for damage, as damaged leads present serious safety risks during testing.",
    difficulty: "basic"
  },
  {
    id: 174,
    question: "What is the minimum voltage rating for test equipment used on 230V systems?",
    options: [
      "230V",
      "400V",
      "600V",
      "1000V"
    ],
    correctAnswer: 2,
    explanation: "Test equipment should be rated at least 600V for use on 230V systems to provide adequate safety margin for transient voltages.",
    difficulty: "intermediate"
  },
  {
    id: 175,
    question: "Which PPE is essential when fault-finding on live electrical systems?",
    options: [
      "Only safety glasses",
      "Insulated gloves and eye protection",
      "Just insulated tools",
      "No PPE required"
    ],
    correctAnswer: 1,
    explanation: "Insulated gloves and eye protection are essential PPE when working on or near live electrical systems to prevent shock and arc flash injuries.",
    difficulty: "basic"
  },
  {
    id: 176,
    question: "What is the purpose of a proving unit?",
    options: [
      "To energise circuits",
      "To test voltage indicator functionality",
      "To measure current",
      "To isolate supplies"
    ],
    correctAnswer: 1,
    explanation: "A proving unit tests voltage indicator functionality to ensure it detects voltage correctly and hasn't failed in a dangerous mode.",
    difficulty: "basic"
  },
  {
    id: 177,
    question: "When should insulated tools be used?",
    options: [
      "Never needed",
      "When working on or near live electrical equipment",
      "Only for high voltage work",
      "Only when convenient"
    ],
    correctAnswer: 1,
    explanation: "Insulated tools should be used when working on or near live electrical equipment to provide additional protection against accidental contact.",
    difficulty: "basic"
  },
  {
    id: 178,
    question: "What is the maximum safe working voltage for unskilled persons?",
    options: [
      "25V",
      "50V",
      "110V",
      "230V"
    ],
    correctAnswer: 1,
    explanation: "50V is generally considered the maximum safe working voltage for unskilled persons in normal dry conditions.",
    difficulty: "basic"
  },
  {
    id: 179,
    question: "Which isolation method provides the highest level of safety?",
    options: [
      "Switching off at local switch",
      "Physical disconnection and locking off",
      "Removing fuses only",
      "Opening circuit breakers only"
    ],
    correctAnswer: 1,
    explanation: "Physical disconnection and locking off provides the highest safety level by preventing accidental re-energisation.",
    difficulty: "basic"
  },
  {
    id: 180,
    question: "What should be done immediately after electrical isolation?",
    options: [
      "Start work immediately",
      "Test for dead and apply earth bonding",
      "Wait 10 minutes",
      "Check with customer"
    ],
    correctAnswer: 1,
    explanation: "After isolation, immediately test for dead using appropriate equipment, then apply temporary earth bonding if required.",
    difficulty: "basic"
  },
  {
    id: 181,
    question: "Which test instrument provides the safest method for initial voltage detection?",
    options: [
      "Digital multimeter",
      "Two-pole voltage indicator",
      "Oscilloscope",
      "Analogue meter"
    ],
    correctAnswer: 1,
    explanation: "Two-pole voltage indicators provide the safest initial voltage detection as they're specifically designed for this purpose with appropriate safety features.",
    difficulty: "basic"
  },
  {
    id: 182,
    question: "What is the purpose of temporary earth bonding?",
    options: [
      "To energise circuits",
      "To provide additional safety during work on isolated circuits",
      "To test insulation",
      "To measure resistance"
    ],
    correctAnswer: 1,
    explanation: "Temporary earth bonding provides additional safety by ensuring metalwork remains at earth potential during work on isolated circuits.",
    difficulty: "intermediate"
  },
  {
    id: 183,
    question: "When working in confined spaces with electrical equipment, what additional precaution is essential?",
    options: [
      "Work alone for concentration",
      "Ensure additional ventilation and rescue arrangements",
      "Use higher voltage equipment",
      "Work as quickly as possible"
    ],
    correctAnswer: 1,
    explanation: "Confined spaces require additional ventilation, rescue arrangements, and often permit-to-work systems due to increased risks.",
    difficulty: "intermediate"
  },
  {
    id: 184,
    question: "What is the safe approach distance for unqualified persons from overhead lines?",
    options: [
      "1 metre",
      "3 metres",
      "5 metres",
      "10 metres"
    ],
    correctAnswer: 1,
    explanation: "3 metres is the minimum safe approach distance for unqualified persons from overhead power lines to prevent flashover risk.",
    difficulty: "intermediate"
  },
  {
    id: 185,
    question: "Which condition requires immediate work stoppage for safety?",
    options: [
      "Slight equipment wear",
      "Detection of unexpected voltage",
      "Normal equipment aging",
      "Minor cosmetic damage"
    ],
    correctAnswer: 1,
    explanation: "Detection of unexpected voltage requires immediate work stoppage as it indicates isolation failure or backfeed conditions.",
    difficulty: "basic"
  },
  {
    id: 186,
    question: "What is the primary purpose of arc flash protection?",
    options: [
      "Comfort during work",
      "Protection from thermal energy and molten metal",
      "Weather protection",
      "Tool organization"
    ],
    correctAnswer: 1,
    explanation: "Arc flash protection protects against intense thermal energy and molten metal ejected during electrical arc faults.",
    difficulty: "intermediate"
  },
  {
    id: 187,
    question: "When should rubber insulating mats be used?",
    options: [
      "Never needed",
      "When working on energised electrical equipment",
      "Only outdoors",
      "Only for comfort"
    ],
    correctAnswer: 1,
    explanation: "Rubber insulating mats provide additional electrical insulation when working on energised electrical equipment in suitable conditions.",
    difficulty: "intermediate"
  },
  {
    id: 188,
    question: "What is the correct procedure for approaching suspected live equipment?",
    options: [
      "Touch it to check",
      "Use appropriate detection equipment first",
      "Assume it's dead",
      "Work quickly around it"
    ],
    correctAnswer: 1,
    explanation: "Always use appropriate voltage detection equipment before approaching suspected live equipment to confirm electrical status safely.",
    difficulty: "basic"
  },
  {
    id: 189,
    question: "Which factor most affects the selection of safety equipment?",
    options: [
      "Cost considerations",
      "Voltage level and fault energy available",
      "Personal preference",
      "Equipment colour"
    ],
    correctAnswer: 1,
    explanation: "Safety equipment selection must be based on voltage levels and available fault energy to ensure adequate protection.",
    difficulty: "intermediate"
  },
  {
    id: 190,
    question: "What should be done if test equipment gives inconsistent readings?",
    options: [
      "Continue using it",
      "Stop use and verify equipment condition",
      "Ignore the inconsistency",
      "Use it more carefully"
    ],
    correctAnswer: 1,
    explanation: "Inconsistent readings indicate possible equipment malfunction - stop use immediately and verify equipment condition before continuing.",
    difficulty: "basic"
  },
  {
    id: 191,
    question: "When is it acceptable to work alone on electrical fault-finding?",
    options: [
      "Always work alone",
      "Only on dead circuits with appropriate safety measures",
      "Never work alone",
      "Only during daylight hours"
    ],
    correctAnswer: 1,
    explanation: "Working alone may be acceptable on dead circuits with appropriate safety measures, risk assessment, and emergency arrangements.",
    difficulty: "intermediate"
  },
  {
    id: 192,
    question: "What is the purpose of electrical safety barriers?",
    options: [
      "Equipment storage",
      "Prevent accidental contact with live parts",
      "Weather protection",
      "Noise reduction"
    ],
    correctAnswer: 1,
    explanation: "Electrical safety barriers prevent accidental contact with live parts, providing physical protection for workers and the public.",
    difficulty: "basic"
  },
  {
    id: 193,
    question: "Which environmental condition most increases electrical safety risks?",
    options: [
      "Bright lighting",
      "Wet or damp conditions",
      "Warm temperatures",
      "Low noise levels"
    ],
    correctAnswer: 1,
    explanation: "Wet or damp conditions significantly increase electrical safety risks by reducing insulation effectiveness and human body resistance.",
    difficulty: "basic"
  },
  {
    id: 194,
    question: "What should be verified before removing temporary earth bonds?",
    options: [
      "Nothing required",
      "Work completion and circuit isolation status",
      "Time of day",
      "Weather conditions"
    ],
    correctAnswer: 1,
    explanation: "Before removing temporary earth bonds, verify work completion and that circuits remain properly isolated for safety.",
    difficulty: "intermediate"
  },
  {
    id: 195,
    question: "Which test method minimises exposure to electrical hazards?",
    options: [
      "Direct contact testing",
      "Remote measurement techniques",
      "Visual inspection only",
      "Trial and error methods"
    ],
    correctAnswer: 1,
    explanation: "Remote measurement techniques minimise exposure to electrical hazards by maintaining safe distances during testing procedures.",
    difficulty: "intermediate"
  },
  {
    id: 196,
    question: "What is the safe procedure for testing unknown electrical installations?",
    options: [
      "Assume standard voltages",
      "Treat as highest possible voltage until verified",
      "Use any available equipment",
      "Test at random points"
    ],
    correctAnswer: 1,
    explanation: "Unknown installations should be treated as highest possible voltage until verified through proper testing procedures.",
    difficulty: "basic"
  },
  {
    id: 197,
    question: "When should emergency procedures be reviewed?",
    options: [
      "Never needed",
      "Before starting electrical work",
      "Only after accidents",
      "Only annually"
    ],
    correctAnswer: 1,
    explanation: "Emergency procedures should be reviewed before starting electrical work to ensure all personnel know appropriate responses.",
    difficulty: "basic"
  },
  {
    id: 198,
    question: "What is the primary hazard when working near capacitors?",
    options: [
      "Low voltage",
      "Stored electrical energy",
      "Light weight",
      "Small size"
    ],
    correctAnswer: 1,
    explanation: "Capacitors store electrical energy and can remain dangerous even after power is removed - they must be safely discharged.",
    difficulty: "intermediate"
  },
  {
    id: 199,
    question: "Which tool feature is most important for electrical safety?",
    options: [
      "Attractive appearance",
      "Proper insulation rating",
      "Low cost",
      "Lightweight design"
    ],
    correctAnswer: 1,
    explanation: "Proper insulation rating is the most important tool feature for electrical safety, ensuring protection against the voltages encountered.",
    difficulty: "basic"
  },
  {
    id: 200,
    question: "What should be done if unsafe conditions are discovered during fault-finding?",
    options: [
      "Continue work carefully",
      "Stop work and secure the area",
      "Work faster to finish quickly",
      "Ignore the conditions"
    ],
    correctAnswer: 1,
    explanation: "Unsafe conditions require immediate work stoppage and area securing to prevent accidents until conditions can be made safe.",
    difficulty: "basic"
  },
  {
    id: 201,
    question: "Which factor determines the arc flash boundary?",
    options: [
      "Time of day",
      "Available fault current and clearing time",
      "Ambient temperature",
      "Equipment colour"
    ],
    correctAnswer: 1,
    explanation: "Arc flash boundary is determined by available fault current and protective device clearing time, which affect the energy released.",
    difficulty: "advanced"
  },
  {
    id: 202,
    question: "What is the purpose of lockout/tagout procedures?",
    options: [
      "Equipment identification",
      "Prevent unexpected energisation during work",
      "Inventory control",
      "Maintenance scheduling"
    ],
    correctAnswer: 1,
    explanation: "Lockout/tagout procedures prevent unexpected energisation of equipment during maintenance or repair work.",
    difficulty: "basic"
  },
  {
    id: 203,
    question: "When working on electrical panels, what area should be kept clear?",
    options: [
      "No clearance needed",
      "Electrical safety working space",
      "Only the immediate work area",
      "Equipment storage area"
    ],
    correctAnswer: 1,
    explanation: "Electrical safety working space must be maintained clear to provide safe access and egress during electrical work.",
    difficulty: "basic"
  },
  {
    id: 204,
    question: "What should be done before opening electrical enclosures?",
    options: [
      "Open immediately",
      "Check for warnings and assess hazards",
      "Only check for locks",
      "Ask customer permission only"
    ],
    correctAnswer: 1,
    explanation: "Before opening electrical enclosures, check for warnings, assess potential hazards, and ensure appropriate safety precautions.",
    difficulty: "basic"
  },
  {
    id: 205,
    question: "Which condition requires the highest level of electrical safety precautions?",
    options: [
      "Dry indoor conditions",
      "Wet outdoor high-voltage work",
      "Normal office environments",
      "Residential installations only"
    ],
    correctAnswer: 1,
    explanation: "Wet outdoor high-voltage work requires the highest safety precautions due to multiple compounding risk factors.",
    difficulty: "basic"
  },
  {
    id: 206,
    question: "What is the safe procedure for handling suspected damaged cables?",
    options: [
      "Touch them to check",
      "Treat as live and avoid contact",
      "Pull on them to test strength",
      "Ignore the damage"
    ],
    correctAnswer: 1,
    explanation: "Suspected damaged cables should be treated as live and contact avoided until proper testing confirms their electrical status.",
    difficulty: "basic"
  },
  {
    id: 207,
    question: "When should safety data sheets be consulted?",
    options: [
      "Never needed",
      "Before using any chemical products",
      "Only after accidents",
      "Only for new employees"
    ],
    correctAnswer: 1,
    explanation: "Safety data sheets should be consulted before using any chemical products to understand hazards and safe handling procedures.",
    difficulty: "basic"
  },
  {
    id: 208,
    question: "What is the primary purpose of electrical safety training?",
    options: [
      "Legal compliance only",
      "Develop hazard recognition and safe work practices",
      "Entertainment value",
      "Time filling activity"
    ],
    correctAnswer: 1,
    explanation: "Electrical safety training develops hazard recognition skills and safe work practices to prevent accidents and injuries.",
    difficulty: "basic"
  },
  {
    id: 209,
    question: "Which personal attribute is most important for electrical safety?",
    options: [
      "Physical strength",
      "Situational awareness and caution",
      "Speed of work",
      "Equipment ownership"
    ],
    correctAnswer: 1,
    explanation: "Situational awareness and caution are the most important personal attributes for electrical safety, enabling hazard recognition and appropriate response.",
    difficulty: "basic"
  },
  {
    id: 210,
    question: "What should be done if electrical equipment shows signs of damage?",
    options: [
      "Continue using it",
      "Remove from service and tag as defective",
      "Use it more carefully",
      "Clean it and continue"
    ],
    correctAnswer: 1,
    explanation: "Damaged electrical equipment should be immediately removed from service and tagged as defective to prevent unsafe use.",
    difficulty: "basic"
  },

  // Section 6: Recording and Reporting (40 questions)
  {
    id: 211,
    question: "Why is accurate fault recording important?",
    options: [
      "It's a legal requirement only",
      "Helps identify patterns and prevent recurrence",
      "It's not necessary for simple faults",
      "Only required for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "Accurate fault recording helps identify patterns, trends, and recurring issues, enabling preventive maintenance and system improvements.",
    difficulty: "basic"
  },
  {
    id: 212,
    question: "What information should be included in a fault report?",
    options: [
      "Only the repair cost",
      "Fault symptoms, location, cause, and remedial action taken",
      "Just the time taken to repair",
      "Only the customer's complaint"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive fault reports should include symptoms, exact location, root cause analysis, and details of remedial actions taken.",
    difficulty: "basic"
  },
  {
    id: 213,
    question: "Before energising a circuit after fault rectification, you should:",
    options: [
      "Immediately switch on and test",
      "Verify the repair and conduct appropriate tests",
      "Only check the protective device",
      "Leave it for the customer to test"
    ],
    correctAnswer: 1,
    explanation: "After rectification, appropriate testing should verify the repair is effective and the circuit is safe before re-energising.",
    difficulty: "basic"
  },
  {
    id: 214,
    question: "Who should be notified of significant electrical faults?",
    options: [
      "No one - keep it confidential",
      "Only the person who reported it",
      "Relevant personnel including safety representatives",
      "Only senior management"
    ],
    correctAnswer: 2,
    explanation: "Significant faults should be reported to relevant personnel including safety representatives to ensure proper follow-up and prevention measures.",
    difficulty: "intermediate"
  },
  {
    id: 215,
    question: "When should temporary repairs be used?",
    options: [
      "As permanent solutions",
      "Only as immediate safety measures until permanent repair",
      "Never under any circumstances",
      "Only on domestic installations"
    ],
    correctAnswer: 1,
    explanation: "Temporary repairs should only be used as immediate safety measures when permanent repair cannot be completed immediately, with proper planning for permanent rectification.",
    difficulty: "intermediate"
  },
  {
    id: 216,
    question: "What documentation should accompany completed electrical repairs?",
    options: [
      "No documentation needed",
      "Test results, materials used, and compliance certificates",
      "Only invoice details",
      "Only customer signature"
    ],
    correctAnswer: 1,
    explanation: "Completed repairs should be documented with test results, materials used, compliance verification, and appropriate certificates.",
    difficulty: "basic"
  },
  {
    id: 217,
    question: "Which information is essential for fault pattern analysis?",
    options: [
      "Only fault frequency",
      "Date, time, conditions, and environmental factors",
      "Only repair costs",
      "Only customer complaints"
    ],
    correctAnswer: 1,
    explanation: "Fault pattern analysis requires comprehensive data including date, time, environmental conditions, and operational factors.",
    difficulty: "intermediate"
  },
  {
    id: 218,
    question: "What is the purpose of maintaining fault logs?",
    options: [
      "Legal compliance only",
      "Track trends and improve maintenance strategies",
      "Customer billing only",
      "Equipment warranties only"
    ],
    correctAnswer: 1,
    explanation: "Fault logs help track trends, identify recurring problems, and develop improved maintenance strategies to reduce future faults.",
    difficulty: "basic"
  },
  {
    id: 219,
    question: "When should incident reports be completed?",
    options: [
      "Only for major incidents",
      "For all safety-related occurrences",
      "Only when damage occurs",
      "Only when requested"
    ],
    correctAnswer: 1,
    explanation: "Incident reports should be completed for all safety-related occurrences to maintain comprehensive safety records and improve procedures.",
    difficulty: "basic"
  },
  {
    id: 220,
    question: "What should be recorded when safety issues are identified during fault-finding?",
    options: [
      "Nothing additional needed",
      "Nature of hazard, risk level, and recommended actions",
      "Only the fault details",
      "Only if someone is injured"
    ],
    correctAnswer: 1,
    explanation: "Safety issues require recording the nature of hazard, risk assessment, and recommended corrective actions for proper follow-up.",
    difficulty: "basic"
  },
  {
    id: 221,
    question: "Which stakeholders should receive copies of significant fault reports?",
    options: [
      "No distribution needed",
      "Management, safety teams, and relevant maintenance personnel",
      "Only the person reporting the fault",
      "Only external contractors"
    ],
    correctAnswer: 1,
    explanation: "Significant fault reports should be distributed to management, safety teams, and relevant maintenance personnel for coordinated response.",
    difficulty: "intermediate"
  },
  {
    id: 222,
    question: "What is the recommended retention period for electrical fault records?",
    options: [
      "One week",
      "Minimum 10 years or equipment life",
      "One year only",
      "Until next inspection"
    ],
    correctAnswer: 1,
    explanation: "Electrical fault records should be retained for minimum 10 years or equipment life to support long-term trend analysis and legal requirements.",
    difficulty: "intermediate"
  },
  {
    id: 223,
    question: "When should warranty claims be initiated for faulty equipment?",
    options: [
      "Never pursue warranties",
      "Immediately upon identifying premature failure",
      "Only after multiple failures",
      "Only if expensive"
    ],
    correctAnswer: 1,
    explanation: "Warranty claims should be initiated immediately upon identifying premature failure to recover costs and improve equipment reliability data.",
    difficulty: "basic"
  },
  {
    id: 224,
    question: "What information supports effective root cause analysis?",
    options: [
      "Only failure symptoms",
      "Complete operational history and environmental data",
      "Only recent maintenance",
      "Only manufacturer data"
    ],
    correctAnswer: 1,
    explanation: "Effective root cause analysis requires complete operational history, environmental data, maintenance records, and failure sequence information.",
    difficulty: "intermediate"
  },
  {
    id: 225,
    question: "Which format provides the clearest fault documentation?",
    options: [
      "Verbal reports only",
      "Structured forms with photographic evidence",
      "Email summaries only",
      "Mental notes only"
    ],
    correctAnswer: 1,
    explanation: "Structured forms with photographic evidence provide clear, complete, and consistent fault documentation for analysis and reference.",
    difficulty: "basic"
  },
  {
    id: 226,
    question: "What should be documented about environmental conditions during faults?",
    options: [
      "Nothing about environment",
      "Temperature, humidity, weather, and operational conditions",
      "Only indoor temperature",
      "Only outdoor weather"
    ],
    correctAnswer: 1,
    explanation: "Environmental documentation should include temperature, humidity, weather conditions, and operational factors that may influence fault development.",
    difficulty: "intermediate"
  },
  {
    id: 227,
    question: "When should preliminary fault reports be issued?",
    options: [
      "Only after complete investigation",
      "Immediately for safety-critical faults",
      "Never issue preliminary reports",
      "Only on customer request"
    ],
    correctAnswer: 1,
    explanation: "Preliminary reports should be issued immediately for safety-critical faults to alert relevant personnel and initiate protective measures.",
    difficulty: "basic"
  },
  {
    id: 228,
    question: "What testing data should be included in fault reports?",
    options: [
      "No test data needed",
      "Before and after measurements with instrument details",
      "Only final readings",
      "Only pass/fail results"
    ],
    correctAnswer: 1,
    explanation: "Fault reports should include before and after measurements with instrument details to demonstrate fault condition and repair effectiveness.",
    difficulty: "basic"
  },
  {
    id: 229,
    question: "Which personnel should be trained in fault reporting procedures?",
    options: [
      "Only senior staff",
      "All personnel involved in electrical work",
      "Only management",
      "Only external contractors"
    ],
    correctAnswer: 1,
    explanation: "All personnel involved in electrical work should be trained in fault reporting procedures to ensure consistent and complete documentation.",
    difficulty: "basic"
  },
  {
    id: 230,
    question: "What is the benefit of digital fault reporting systems?",
    options: [
      "No significant benefits",
      "Improved data analysis and trend identification",
      "Only cost reduction",
      "Only storage savings"
    ],
    correctAnswer: 1,
    explanation: "Digital systems enable improved data analysis, trend identification, automated reporting, and better information sharing across organisations.",
    difficulty: "intermediate"
  },
  {
    id: 231,
    question: "When should customer notifications be provided about electrical faults?",
    options: [
      "Never notify customers",
      "When faults affect safety or operation",
      "Only after complete repairs",
      "Only if asked by customer"
    ],
    correctAnswer: 1,
    explanation: "Customers should be notified when faults affect safety, operation, or require access for repairs, with clear information about implications.",
    difficulty: "basic"
  },
  {
    id: 232,
    question: "What should be documented about repair materials used?",
    options: [
      "Nothing about materials",
      "Type, quantity, specifications, and batch numbers",
      "Only total cost",
      "Only material type"
    ],
    correctAnswer: 1,
    explanation: "Material documentation should include type, quantity, specifications, and batch numbers for quality tracking and future reference.",
    difficulty: "basic"
  },
  {
    id: 233,
    question: "Which quality assurance measures improve fault reporting accuracy?",
    options: [
      "No measures needed",
      "Supervisor review and verification processes",
      "Only spell checking",
      "Only timing control"
    ],
    correctAnswer: 1,
    explanation: "Supervisor review and verification processes ensure fault reports are accurate, complete, and follow established standards.",
    difficulty: "basic"
  },
  {
    id: 234,
    question: "What information supports insurance claims for electrical damage?",
    options: [
      "Only damage photos",
      "Complete fault investigation with supporting evidence",
      "Only repair estimates",
      "Only incident date"
    ],
    correctAnswer: 1,
    explanation: "Insurance claims require complete fault investigation documentation with supporting evidence to establish cause and validate claims.",
    difficulty: "intermediate"
  },
  {
    id: 235,
    question: "When should regulatory authorities be notified of electrical faults?",
    options: [
      "Never notify authorities",
      "For serious safety incidents or public hazards",
      "For all minor faults",
      "Only if equipment damaged"
    ],
    correctAnswer: 1,
    explanation: "Regulatory authorities should be notified for serious safety incidents, public hazards, or when required by specific regulations.",
    difficulty: "intermediate"
  },
  {
    id: 236,
    question: "What should be included in lessons learned documentation?",
    options: [
      "Only what went wrong",
      "Fault causes, contributing factors, and prevention measures",
      "Only repair procedures",
      "Only cost implications"
    ],
    correctAnswer: 1,
    explanation: "Lessons learned should document fault causes, contributing factors, prevention measures, and improved procedures for future reference.",
    difficulty: "intermediate"
  },
  {
    id: 237,
    question: "Which metrics are most valuable for electrical system reliability analysis?",
    options: [
      "Only repair costs",
      "Fault frequency, duration, and mean time between failures",
      "Only fault frequency",
      "Only repair time"
    ],
    correctAnswer: 1,
    explanation: "Reliability analysis requires fault frequency, duration, mean time between failures, and other statistical measures to assess system performance.",
    difficulty: "advanced"
  },
  {
    id: 238,
    question: "What should be documented about work permits for electrical fault repairs?",
    options: [
      "Nothing about permits",
      "Permit numbers, conditions, and compliance verification",
      "Only permit numbers",
      "Only permit dates"
    ],
    correctAnswer: 1,
    explanation: "Work permit documentation should include permit numbers, specified conditions, and verification of compliance with safety requirements.",
    difficulty: "intermediate"
  },
  {
    id: 239,
    question: "When should fault trend reports be generated?",
    options: [
      "Never generate trends",
      "Regularly to identify developing patterns",
      "Only annually",
      "Only after major failures"
    ],
    correctAnswer: 1,
    explanation: "Fault trend reports should be generated regularly to identify developing patterns and implement preventive measures before major failures.",
    difficulty: "intermediate"
  },
  {
    id: 240,
    question: "What follow-up actions should be documented after fault repairs?",
    options: [
      "No follow-up needed",
      "Monitoring schedules and verification testing",
      "Only next inspection date",
      "Only warranty information"
    ],
    correctAnswer: 1,
    explanation: "Follow-up documentation should include monitoring schedules, verification testing, and any special inspection requirements post-repair.",
    difficulty: "basic"
  },
  {
    id: 241,
    question: "Which information helps prioritise future maintenance activities?",
    options: [
      "Only equipment age",
      "Fault history, criticality, and consequence analysis",
      "Only fault frequency",
      "Only replacement costs"
    ],
    correctAnswer: 1,
    explanation: "Maintenance prioritisation requires fault history, equipment criticality assessment, and consequence analysis to optimise resource allocation.",
    difficulty: "intermediate"
  },
  {
    id: 242,
    question: "What should be documented about environmental impact of electrical faults?",
    options: [
      "No environmental concerns",
      "Emissions, waste, and remediation requirements",
      "Only energy consumption",
      "Only noise levels"
    ],
    correctAnswer: 1,
    explanation: "Environmental documentation should cover emissions, waste generation, contamination, and any remediation requirements from electrical faults.",
    difficulty: "intermediate"
  },
  {
    id: 243,
    question: "When should fault investigation reports be peer-reviewed?",
    options: [
      "Never review reports",
      "For complex or high-consequence faults",
      "Only if time permits",
      "Only for external audits"
    ],
    correctAnswer: 1,
    explanation: "Complex or high-consequence fault investigations should be peer-reviewed to ensure thoroughness and accuracy of analysis.",
    difficulty: "intermediate"
  },
  {
    id: 244,
    question: "What communication protocols should be established for electrical emergencies?",
    options: [
      "No protocols needed",
      "Clear escalation paths and contact procedures",
      "Only emergency services",
      "Only internal reporting"
    ],
    correctAnswer: 1,
    explanation: "Emergency communication protocols should establish clear escalation paths, contact procedures, and information sharing requirements.",
    difficulty: "basic"
  },
  {
    id: 245,
    question: "Which training records should be maintained for fault investigation personnel?",
    options: [
      "No training records needed",
      "Competency assessments and continuing education",
      "Only initial certification",
      "Only safety training"
    ],
    correctAnswer: 1,
    explanation: "Training records should document competency assessments, continuing education, and specific qualifications for fault investigation work.",
    difficulty: "basic"
  },
  {
    id: 246,
    question: "What should be documented about contractor involvement in fault repairs?",
    options: [
      "Nothing about contractors",
      "Qualifications, work performed, and compliance verification",
      "Only contractor names",
      "Only contract values"
    ],
    correctAnswer: 1,
    explanation: "Contractor documentation should include qualifications, specific work performed, compliance verification, and quality assessment.",
    difficulty: "basic"
  },
  {
    id: 247,
    question: "When should fault reports be updated with new information?",
    options: [
      "Never update reports",
      "Immediately when relevant new information becomes available",
      "Only annually",
      "Only if requested"
    ],
    correctAnswer: 1,
    explanation: "Fault reports should be updated immediately when relevant new information becomes available to maintain accuracy and completeness.",
    difficulty: "basic"
  },
  {
    id: 248,
    question: "What benchmarking data helps improve fault management processes?",
    options: [
      "No benchmarking needed",
      "Industry standards and best practice comparisons",
      "Only internal comparisons",
      "Only cost comparisons"
    ],
    correctAnswer: 1,
    explanation: "Benchmarking against industry standards and best practices helps identify improvement opportunities in fault management processes.",
    difficulty: "intermediate"
  },
  {
    id: 249,
    question: "Which stakeholder feedback should be incorporated into fault reporting systems?",
    options: [
      "No feedback needed",
      "Operations, maintenance, and management input",
      "Only management feedback",
      "Only external feedback"
    ],
    correctAnswer: 1,
    explanation: "Fault reporting systems should incorporate feedback from operations, maintenance, and management to ensure systems meet user needs.",
    difficulty: "intermediate"
  },
  {
    id: 250,
    question: "What is the ultimate goal of comprehensive fault recording and reporting?",
    options: [
      "Legal compliance only",
      "Continuous improvement in electrical system reliability",
      "Documentation for its own sake",
      "Cost justification only"
    ],
    correctAnswer: 1,
    explanation: "The ultimate goal is continuous improvement in electrical system reliability through data-driven decision making and preventive actions.",
    difficulty: "basic"
  }
];

// Utility functions for question management
const getRandomQuestions = (count: number, difficultyDistribution: { basic: number; intermediate: number; advanced: number }) => {
  const totalPercentage = difficultyDistribution.basic + difficultyDistribution.intermediate + difficultyDistribution.advanced;
  
  const basicCount = Math.round((count * difficultyDistribution.basic) / totalPercentage);
  const intermediateCount = Math.round((count * difficultyDistribution.intermediate) / totalPercentage);
  const advancedCount = count - basicCount - intermediateCount;
  
  const basicQuestions = questionBank.filter(q => q.difficulty === "basic");
  const intermediateQuestions = questionBank.filter(q => q.difficulty === "intermediate");
  const advancedQuestions = questionBank.filter(q => q.difficulty === "advanced");
  
  const selectedQuestions: Question[] = [];
  
  // Select basic questions
  const shuffledBasic = [...basicQuestions].sort(() => Math.random() - 0.5);
  selectedQuestions.push(...shuffledBasic.slice(0, basicCount));
  
  // Select intermediate questions
  const shuffledIntermediate = [...intermediateQuestions].sort(() => Math.random() - 0.5);
  selectedQuestions.push(...shuffledIntermediate.slice(0, intermediateCount));
  
  // Select advanced questions
  const shuffledAdvanced = [...advancedQuestions].sort(() => Math.random() - 0.5);
  selectedQuestions.push(...shuffledAdvanced.slice(0, advancedCount));
  
  // Shuffle final selection
  return selectedQuestions.sort(() => Math.random() - 0.5);
};

const validateQuestionBank = () => {
  const basicCount = questionBank.filter(q => q.difficulty === "basic").length;
  const intermediateCount = questionBank.filter(q => q.difficulty === "intermediate").length;
  const advancedCount = questionBank.filter(q => q.difficulty === "advanced").length;
  
  console.log(`Question bank validated: ${questionBank.length} total questions`);
  console.log(`Basic: ${basicCount}, Intermediate: ${intermediateCount}, Advanced: ${advancedCount}`);
  console.log(`Distribution: ${Math.round((basicCount/questionBank.length)*100)}% basic, ${Math.round((intermediateCount/questionBank.length)*100)}% intermediate, ${Math.round((advancedCount/questionBank.length)*100)}% advanced`);
};

const Level2Module7MockExam7 = () => {
  useSEO(
    "Mock Exam 7: Electrical Fault Finding and Diagnosis - Level 2 Module 7",
    "Test your knowledge of electrical fault finding, diagnosis procedures, fault types, symptoms identification, and safe practices for Level 2 electrical installation."
  );

  // Exam state management
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [showResults, setShowResults] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [reviewMode, setReviewMode] = useState<'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged' | boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged'>('all');

  // Initialize exam
  const startExam = () => {
    const questions = getRandomQuestions(30, { basic: 40, intermediate: 45, advanced: 15 });
    setExamQuestions(questions);
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setTimeRemaining(45 * 60);
    setShowResults(false);
    setFlaggedQuestions(new Set());
    setExamStarted(true);
    validateQuestionBank(); // Log validation info
  };

  // Timer effect
  useEffect(() => {
    if (examStarted && !showResults && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, showResults, timeRemaining]);

  // Helper functions
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setExamStarted(false);
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: examQuestions.length, percentage: Math.round((correct / examQuestions.length) * 100) };
  };

  const getQuestionStatus = (index: number) => {
    const answer = selectedAnswers[index];
    const isCorrect = answer === examQuestions[index]?.correctAnswer;
    const isAnswered = answer !== undefined;
    
    if (!isAnswered) return { type: "unanswered", color: "text-muted-foreground" };
    if (isCorrect) return { type: "correct", color: "text-green-500" };
    return { type: "incorrect", color: "text-emerald-400" };
  };

  const getFilteredQuestions = () => {
    return examQuestions.map((_, index) => index).filter(index => {
      const status = getQuestionStatus(index);
      const isFlagged = flaggedQuestions.has(index);
      
      switch (reviewFilter) {
        case "correct": return status.type === "correct";
        case "incorrect": return status.type === "incorrect";
        case "unanswered": return status.type === "unanswered";
        case "flagged": return isFlagged;
        default: return true;
      }
    });
  };

  const getSummaryStats = () => {
    const answered = Object.keys(selectedAnswers).length;
    const unanswered = examQuestions.length - answered;
    const flagged = flaggedQuestions.size;
    
    return { answered, unanswered, flagged };
  };

  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    const currentIndex = flaggedArray.indexOf(currentQuestion);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < flaggedArray.length) {
      setCurrentQuestion(flaggedArray[nextIndex]);
    } else if (flaggedArray.length > 0) {
      setCurrentQuestion(flaggedArray[0]); // Go to first flagged
    }
  };

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const progressPercentage = (answeredQuestions / examQuestions.length) * 100;

  // Exam start screen
  if (!examStarted && !showResults) {
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-emerald-500/30 bg-card">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                  <FileText className="h-6 w-6 text-emerald-400" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Mock Exam 7</h1>
                <h2 className="text-lg text-emerald-400 mb-6">Electrical Fault Finding and Diagnosis</h2>
                <p className="text-muted-foreground mb-6">
                  Test your knowledge of electrical fault finding procedures, fault types, symptom identification, safe practices, and recording requirements.
                </p>
              </div>

              <div className="bg-background p-4 rounded-xl border border-muted/40 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20">
                    <CheckCircle className="h-3 w-3 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Instructions</h3>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">30 questions randomly selected from Module 7 content</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">45 minutes time limit</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">Progress automatically saved</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={startExam}
                  className="w-full bg-emerald-500 hover:bg-emerald-500/90 text-black font-bold py-3 text-base touch-manipulation min-h-[48px] rounded-lg"
                  size="lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-4 w-4" />
                    Start Exam
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-muted/20">
                <Link 
                  to="../section1" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Mock Examinations
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results screen (same as Mock Exam 6)
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score.correct / examQuestions.length) * 100);
    const stats = getSummaryStats();
    
    if (reviewMode) {
      const filteredQuestions = getFilteredQuestions();
      
      return (
        <div className="min-h-screen bg-background p-2 sm:p-4">
          <div className="max-w-6xl mx-auto">
            {/* Review Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Review Answers</h1>
                  <p className="text-sm text-muted-foreground">Score: {percentage}% ({score.correct}/{examQuestions.length})</p>
                </div>
                <Button
                  onClick={() => setReviewMode(false)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-emerald-400"
                >
                  <X className="h-4 w-4 mr-2" />
                  Exit Review
                </Button>
              </div>
              
              {/* Summary Stats - Clickable Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
                <Card 
                  className={`bg-card border-green-500/20 cursor-pointer hover:bg-card transition-colors ${
                    reviewFilter === "correct" ? "ring-2 ring-green-500/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "correct" ? "all" : "correct")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-green-500">{score.correct}</div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-red-500/20 cursor-pointer hover:bg-card transition-colors ${
                    reviewFilter === "incorrect" ? "ring-2 ring-red-500/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "incorrect" ? "all" : "incorrect")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-emerald-400">{stats.answered - score.correct}</div>
                    <div className="text-xs text-muted-foreground">Incorrect</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-muted/20 cursor-pointer hover:bg-muted/10 transition-colors ${
                    reviewFilter === "unanswered" ? "ring-2 ring-muted/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "unanswered" ? "all" : "unanswered")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-muted-foreground">{stats.unanswered}</div>
                    <div className="text-xs text-muted-foreground">Unanswered</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-emerald-500/30 cursor-pointer hover:bg-emerald-500/5 transition-colors ${
                    reviewFilter === "flagged" ? "ring-2 ring-emerald-500/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "flagged" ? "all" : "flagged")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-emerald-400">{stats.flagged}</div>
                    <div className="text-xs text-muted-foreground">Flagged</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Question List */}
            <div className="space-y-4">
              {filteredQuestions.map(questionIndex => {
                const question = examQuestions[questionIndex];
                const userAnswer = selectedAnswers[questionIndex];
                const correctAnswer = question.correctAnswer;
                const status = getQuestionStatus(questionIndex);
                const isFlagged = flaggedQuestions.has(questionIndex);
                
                return (
                  <Card key={questionIndex} className="bg-card border-emerald-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-base text-foreground font-semibold">
                          Question {questionIndex + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          {isFlagged && (
                            <Badge variant="outline" className="text-emerald-400 border-emerald-500/40">
                              <Flag className="h-3 w-3 mr-1 fill-current" />
                              Flagged
                            </Badge>
                          )}
                          <Badge 
                            variant={status.type === "correct" ? "default" : "destructive"}
                            className={
                              status.type === "correct" 
                                ? "bg-green-500/20 text-green-500 border-green-500/40" 
                                : status.type === "incorrect"
                                ? "bg-red-500/20 text-emerald-400 border-red-500/40"
                                : "bg-muted/20 text-muted-foreground border-muted/40"
                            }
                          >
                            {status.type === "correct" ? "Correct" : status.type === "incorrect" ? "Incorrect" : "Unanswered"}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm leading-relaxed mb-4 font-medium">{question.question}</p>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer === optionIndex;
                          const isCorrectAnswer = correctAnswer === optionIndex;
                          
                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 text-sm ${
                                isCorrectAnswer
                                  ? "border-green-500 bg-card text-green-500"
                                  : isUserAnswer && !isCorrectAnswer
                                  ? "border-red-500 bg-card text-emerald-400"
                                  : "border-muted/40 bg-muted/5"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isCorrectAnswer
                                    ? "border-green-500 bg-green-500"
                                    : isUserAnswer && !isCorrectAnswer
                                    ? "border-red-500 bg-red-500"
                                    : "border-muted-foreground"
                                }`}>
                                  {(isUserAnswer || isCorrectAnswer) && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                  )}
                                </div>
                                <span className="flex-1 leading-relaxed">{option}</span>
                                {isCorrectAnswer && (
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <X className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-4 p-3 bg-card rounded-lg border border-emerald-500/30">
                          <div className="flex items-start gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20 flex-shrink-0 mt-0.5">
                              <Eye className="h-3 w-3 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-1">Explanation</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
              {filteredQuestions.length === 0 && (
                <Card className="bg-card border-emerald-500/30">
                  <CardContent className="p-8 text-center">
                    <div className="text-muted-foreground">
                      No questions match the selected filter.
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Main results screen
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-emerald-500/30 bg-card">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Exam Complete</h1>
                <h2 className="text-lg text-emerald-400 mb-6">Mock Exam 7: Electrical Fault Finding and Diagnosis</h2>
                
                {/* Score Display */}
                <div className="bg-card p-6 rounded-xl border border-emerald-500/30 mb-6">
                  <div className="text-4xl font-bold text-foreground mb-2">{percentage}%</div>
                  <div className="text-muted-foreground mb-4">
                    {score.correct} out of {examQuestions.length} questions correct
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    percentage >= 70 
                      ? 'bg-green-500/20 text-green-500 border border-green-500/40'
                      : percentage >= 60
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-red-500/20 text-emerald-400 border border-red-500/40'
                  }`}>
                    {percentage >= 70 ? '✓ Pass' : percentage >= 60 ? '⚠ Marginal' : '✗ Fail'}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  <Card className="bg-card border-green-500/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-500">{score.correct}</div>
                      <div className="text-sm text-muted-foreground">Correct</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-red-500/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{stats.answered - score.correct}</div>
                      <div className="text-sm text-muted-foreground">Incorrect</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-muted/20 sm:col-span-1 col-span-2">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{stats.flagged}</div>
                      <div className="text-sm text-muted-foreground">Flagged</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => setReviewMode(true)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-500/90 text-black font-medium"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Review Answers
                  </Button>
                  <Button 
                    onClick={startExam}
                    variant="outline"
                    className="flex-1 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Exam
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-muted/20">
                <Link 
                  to="../section1" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Mock Examinations
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Active exam interface
  const currentQ = examQuestions[currentQuestion];
  const stats = getSummaryStats();

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to="../section1" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Exam
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <Card className="lg:col-span-3 bg-card border border-emerald-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Question {currentQuestion + 1} of {examQuestions.length}
                  </h2>
                  <div className="text-sm text-muted-foreground mt-1">
                    Module 7 • {currentQ?.difficulty} • Fault Finding & Diagnosis
                  </div>
                </div>
                <Button
                  onClick={toggleFlag}
                  variant="outline"
                  size="sm"
                  className={`border-emerald-500/30 ${
                    flaggedQuestions.has(currentQuestion) 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'text-foreground hover:bg-emerald-500/10'
                  }`}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                </Button>
              </div>

              <div className="mb-8">
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  {currentQ?.question}
                </p>
                
                <div className="space-y-3">
                  {currentQ?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        selectedAnswers[currentQuestion] === index
                          ? 'bg-emerald-500/20 border-emerald-500 text-foreground'
                          : 'bg-background/30 border-emerald-500/30 text-muted-foreground hover:bg-emerald-500/10 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold min-w-[20px]">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-emerald-500/30">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="border-emerald-500/30 text-foreground hover:bg-emerald-500/10 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentQuestion === examQuestions.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={answeredQuestions === 0}
                      className="bg-emerald-500 hover:bg-emerald-500/90 text-black disabled:opacity-50 text-sm sm:text-sm px-6 py-3 sm:py-3 min-h-[52px] touch-manipulation font-semibold rounded-xl flex-shrink-0"
                      size="sm"
                    >
                      <span className="hidden xs:inline">Submit Exam</span>
                      <span className="xs:hidden">Submit</span>
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex-1 sm:flex-initial sm:px-8 bg-emerald-500 hover:bg-emerald-500/90 text-black font-bold py-3 sm:py-3 text-base sm:text-base touch-manipulation min-h-[48px] rounded-lg"
                      size="lg"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Sidebar */}
          <Card className="bg-card border border-emerald-500/30 shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-6">
                {/* Enhanced Timer */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 p-4 rounded-xl border border-emerald-500/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm font-medium text-foreground">Time Remaining</span>
                    </div>
                    <div className="font-mono text-2xl font-bold text-emerald-400">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {timeRemaining < 300 ? 'Final 5 minutes!' : 'Stay focused'}
                    </div>
                  </div>
                </div>

                {/* Enhanced Progress */}
                <div>
                  <div className="bg-background/50 p-4 rounded-lg border border-emerald-500/30">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-lg font-bold text-emerald-400">{answeredQuestions}/{examQuestions.length}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 mb-3" />
                    <div className="text-xs text-center text-muted-foreground">
                      {Math.round(progressPercentage)}% Complete
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-400" />
                    Statistics
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-400">Answered</span>
                      </div>
                      <span className="font-bold text-green-400">{stats.answered}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-red-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-emerald-400">Remaining</span>
                      </div>
                      <span className="font-bold text-emerald-400">{stats.unanswered}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-emerald-500/20">
                      <div className="flex items-center gap-2">
                        <Flag className="w-3 h-3 text-emerald-400" />
                        <span className="text-sm text-emerald-400">Flagged</span>
                      </div>
                      <span className="font-bold text-emerald-400">{stats.flagged}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Question Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    Questions
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {examQuestions.map((_, index) => {
                      const isAnswered = selectedAnswers.hasOwnProperty(index);
                      const isCurrent = index === currentQuestion;
                      const isFlagged = flaggedQuestions.has(index);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`
                            relative w-10 h-10 text-xs font-bold rounded-lg transition-all duration-200 border-2
                            ${isCurrent 
                              ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg scale-110' 
                              : isAnswered 
                                ? 'bg-green-500/30 text-green-400 border-green-500/50 hover:bg-green-500/40' 
                                : 'bg-background/30 text-muted-foreground border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/40'
                            }
                          `}
                        >
                          {index + 1}
                          {isFlagged && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Flag className="w-2 h-2 text-white fill-current" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Enhanced Quick Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={goToNextFlagged}
                    disabled={flaggedQuestions.size === 0}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-border/30 text-emerald-400 hover:bg-card disabled:opacity-50"
                  >
                    <Flag className="h-3 w-3 mr-2" />
                    Next Flagged ({flaggedQuestions.size})
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground pt-2 border-t border-emerald-500/30">
                    <div>Exam: Module 7</div>
                    <div>Fault Finding & Diagnosis</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Level2Module7MockExam7;