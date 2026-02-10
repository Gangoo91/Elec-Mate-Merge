import { ArrowLeft, Activity, CheckCircle, AlertTriangle, Heart, Bone, Shield, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-vertebrae-count",
    question: "How many vertebrae make up the human spinal column?",
    options: [
      "24 vertebrae",
      "26 vertebrae",
      "30 vertebrae",
      "33 vertebrae"
    ],
    correctIndex: 3,
    explanation: "The human spinal column consists of 33 vertebrae arranged in five regions: 7 cervical (neck), 12 thoracic (mid-back), 5 lumbar (lower back), 5 sacral (fused into the sacrum), and 4 coccygeal (fused into the coccyx/tailbone). The lumbar region bears the greatest load during manual handling."
  },
  {
    id: "mh-disc-structure",
    question: "What are the two main components of an intervertebral disc?",
    options: [
      "The vertebral body and the spinous process",
      "The annulus fibrosus (tough outer ring) and the nucleus pulposus (gel-like centre)",
      "The ligamentum flavum and the posterior longitudinal ligament",
      "The facet joint and the neural arch"
    ],
    correctIndex: 1,
    explanation: "An intervertebral disc has two main components: the annulus fibrosus (a tough, multi-layered fibrous outer ring that contains and protects the centre) and the nucleus pulposus (a soft, gel-like centre that acts as a hydraulic shock absorber). Disc herniation occurs when the annulus fibrosus tears and the nucleus pulposus bulges or escapes through the tear."
  },
  {
    id: "mh-lumbar-vulnerable",
    question: "Why is the lumbar region (L4/L5 and L5/S1) the most vulnerable part of the spine during manual handling?",
    options: [
      "Because it has the smallest vertebrae and thinnest discs",
      "Because it has no intervertebral discs",
      "Because it bears the greatest compressive load and has the widest range of motion in the lower spine",
      "Because it is directly connected to the skull"
    ],
    correctIndex: 2,
    explanation: "The lumbar region, particularly L4/L5 and L5/S1, is the most vulnerable because it bears the greatest compressive and shear forces during lifting, bending, and twisting. The lumbar vertebrae and discs must support the entire weight of the upper body plus any load being carried. The transition from the mobile lumbar spine to the fixed sacrum at L5/S1 creates a concentration of mechanical stress."
  }
];

const faqs = [
  {
    question: "What is a 'slipped disc' and is the disc actually slipping?",
    answer: "A 'slipped disc' is a colloquial term for a disc herniation (also called a disc prolapse or disc protrusion). The disc does not actually slip out of position — the outer ring (annulus fibrosus) tears or weakens, and the gel-like centre (nucleus pulposus) bulges outward or extrudes through the tear. This bulging material can press on nearby spinal nerves, causing pain, numbness, tingling, or weakness in the back and legs. The term 'slipped disc' is misleading but widely used."
  },
  {
    question: "Can a herniated disc heal on its own?",
    answer: "In many cases, the symptoms of a disc herniation will improve significantly over 6-12 weeks with conservative treatment (rest, activity modification, physiotherapy, pain management). The herniated material may shrink over time as the body reabsorbs it, reducing pressure on the nerve. However, the annulus fibrosus (outer ring) does not fully repair itself because it has a very limited blood supply. This means that once a disc has herniated, it is permanently weakened and more susceptible to further injury. In severe cases where conservative treatment fails, or where there is significant nerve compression causing weakness or bowel/bladder dysfunction, surgical intervention may be required."
  },
  {
    question: "Why does twisting while lifting increase the risk of disc injury?",
    answer: "Twisting (axial rotation) while the spine is loaded is one of the most dangerous movements for the intervertebral discs. When the spine is both flexed (bent forward) and rotated simultaneously, the fibres of the annulus fibrosus are subjected to extremely high shear and torsional forces. The fibres of the annulus are arranged in alternating diagonal layers — when the spine twists, half of these fibres are placed under tension while the other half are slack. This halves the effective strength of the annulus at the point of maximum load. Combined with the high compressive forces of lifting, this creates the conditions for annular tears and disc herniation."
  },
  {
    question: "At what age do intervertebral discs start to degenerate?",
    answer: "Disc degeneration begins remarkably early — research shows that degenerative changes can be detected in the intervertebral discs from the late teens and early twenties. By the age of 30, most people show some degree of disc degeneration on MRI scanning, even if they are asymptomatic. The nucleus pulposus gradually loses water content and becomes less effective as a shock absorber, while the annulus fibrosus develops micro-tears and becomes less resilient. This is a natural ageing process, but it is significantly accelerated by occupational factors — heavy manual handling, vibration exposure, prolonged sitting, and poor posture all contribute to premature disc degeneration."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The human spinal column consists of:",
    options: [
      "24 vertebrae in 3 regions",
      "33 vertebrae in 5 regions",
      "26 vertebrae in 4 regions",
      "30 vertebrae in 5 regions"
    ],
    correctAnswer: 1,
    explanation: "The spinal column consists of 33 vertebrae in 5 regions: 7 cervical (C1-C7), 12 thoracic (T1-T12), 5 lumbar (L1-L5), 5 sacral (fused into the sacrum), and 4 coccygeal (fused into the coccyx)."
  },
  {
    id: 2,
    question: "The gel-like centre of an intervertebral disc is called the:",
    options: [
      "Annulus fibrosus",
      "Nucleus pulposus",
      "Vertebral endplate",
      "Ligamentum flavum"
    ],
    correctAnswer: 1,
    explanation: "The nucleus pulposus is the soft, gel-like centre of the intervertebral disc. It is approximately 80% water and acts as a hydraulic shock absorber, distributing compressive forces across the disc. The annulus fibrosus is the tough outer ring that contains and protects it."
  },
  {
    id: 3,
    question: "Disc herniation occurs when:",
    options: [
      "The vertebral body fractures under compression",
      "The annulus fibrosus tears and the nucleus pulposus bulges or extrudes through the tear",
      "The spinal cord is stretched beyond its elastic limit",
      "The facet joints lock in an abnormal position"
    ],
    correctAnswer: 1,
    explanation: "Disc herniation occurs when the tough outer ring (annulus fibrosus) tears or weakens, allowing the gel-like centre (nucleus pulposus) to bulge outward or extrude through the tear. This herniated material can compress adjacent spinal nerves, causing pain, numbness, and weakness."
  },
  {
    id: 4,
    question: "Which region of the spine bears the greatest compressive load during lifting?",
    options: [
      "Cervical (neck)",
      "Thoracic (mid-back)",
      "Lumbar (lower back)",
      "Sacral (pelvis)"
    ],
    correctAnswer: 2,
    explanation: "The lumbar region bears the greatest compressive load during lifting because it must support the entire weight of the upper body, head, and arms, plus any external load being held. When lifting a 25 kg load with the trunk bent forward, the compressive force on the L5/S1 disc can exceed 500 kg due to the lever-arm effect."
  },
  {
    id: 5,
    question: "Which vertebral segments are most commonly affected by disc herniation from manual handling?",
    options: [
      "C5/C6 and C6/C7 (cervical)",
      "T6/T7 and T7/T8 (thoracic)",
      "L4/L5 and L5/S1 (lumbar)",
      "S1/S2 and S2/S3 (sacral)"
    ],
    correctAnswer: 2,
    explanation: "The L4/L5 and L5/S1 segments are the most commonly affected by disc herniation from manual handling. These are the lowest mobile segments of the spine, bearing the greatest load. The transition from the flexible lumbar spine to the rigid sacrum at L5/S1 creates a concentration of stress that makes this segment particularly vulnerable."
  },
  {
    id: 6,
    question: "The natural shape of a healthy spine, when viewed from the side, is:",
    options: [
      "Completely straight from top to bottom",
      "A single C-shaped curve",
      "An S-shaped curve with alternating lordotic and kyphotic curves",
      "A U-shape that curves forward at the top and bottom"
    ],
    correctAnswer: 2,
    explanation: "A healthy spine, viewed from the side, has a natural S-shaped curve formed by alternating lordotic (inward) curves in the cervical and lumbar regions and kyphotic (outward) curves in the thoracic and sacral regions. This S-curve acts as a natural spring, distributing mechanical loads evenly. Maintaining this curve during manual handling is essential for reducing spinal stress."
  },
  {
    id: 7,
    question: "Sciatica is caused by:",
    options: [
      "A fracture of the femur (thigh bone)",
      "Compression or irritation of the sciatic nerve, often by a herniated lumbar disc",
      "A torn muscle in the calf",
      "Arthritis in the hip joint"
    ],
    correctAnswer: 1,
    explanation: "Sciatica is pain that radiates along the path of the sciatic nerve — from the lower back through the buttock and down the back of the leg. It is most commonly caused by a herniated disc in the lumbar spine (usually L4/L5 or L5/S1) pressing on the nerve roots that form the sciatic nerve. Symptoms include sharp, burning pain, numbness, tingling, and weakness in the affected leg."
  },
  {
    id: 8,
    question: "Why is maintaining the natural S-curve of the spine important during manual handling?",
    options: [
      "It makes the load feel lighter",
      "It distributes compressive forces evenly across the disc surfaces and reduces stress on the annulus fibrosus",
      "It prevents the muscles from being used during lifting",
      "It is only important for people over the age of 50"
    ],
    correctAnswer: 1,
    explanation: "Maintaining the natural S-curve distributes compressive forces evenly across the entire disc surface, reduces stress on the posterior annulus fibrosus, and allows the spinal muscles and ligaments to work at their most efficient length. When the spine is flexed (bent forward), compressive force concentrates on the anterior disc and tensile force on the posterior annulus — creating the conditions for disc herniation."
  }
];

export default function ManualHandlingModule1Section4() {
  useSEO({
    title: "Anatomy & Injury Mechanisms | Manual Handling Module 1.4",
    description: "Spinal anatomy, intervertebral disc structure, disc herniation mechanisms, the S-curve, lumbar vulnerability, and common manual handling injuries.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Activity className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Anatomy &amp; Injury Mechanisms
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the spine, how discs work, why the lumbar region is vulnerable, and the mechanisms that cause manual handling injuries
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Vertebrae:</strong> 33 total across 5 regions of the spine</li>
              <li><strong>Discs:</strong> Annulus fibrosus (outer ring) + nucleus pulposus (gel centre)</li>
              <li><strong>S-curve:</strong> Natural shape distributes load evenly</li>
              <li><strong>Most vulnerable:</strong> L4/L5 and L5/S1 (lowest lumbar segments)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">Common Injuries</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Disc prolapse:</strong> Nucleus pushes through torn annulus</li>
              <li><strong>Muscle strain:</strong> Overstretched or torn muscle fibres</li>
              <li><strong>Ligament sprain:</strong> Overstretched or torn spinal ligaments</li>
              <li><strong>Sciatica:</strong> Nerve compression causing leg pain/numbness</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Describe the basic structure of the spinal column and its five regions",
              "Explain the structure and function of intervertebral discs",
              "Describe the mechanism of disc herniation under manual handling loads",
              "Explain the importance of the natural S-curve for load distribution",
              "Identify the common injuries caused by manual handling (disc prolapse, strain, sprain, sciatica)",
              "Explain why the L4/L5 and L5/S1 segments are most vulnerable to injury"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Spinal Anatomy Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">&mdash;</span>
            Spinal Anatomy
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Bone className="h-5 w-5 text-emerald-400" />
              <p className="text-sm font-medium text-white">The Five Regions of the Spinal Column</p>
            </div>
            <p className="text-sm text-white/60 mb-6 text-center">33 vertebrae arranged in five regions, forming the natural S-curve</p>

            <div className="max-w-sm mx-auto space-y-2">
              {/* Cervical */}
              <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl p-3 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-blue-400">CERVICAL (C1&ndash;C7)</p>
                    <p className="text-[11px] text-white/60">7 vertebrae &middot; Neck region</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40">Lordotic curve (inward)</p>
                    <p className="text-[10px] text-blue-400/70">Supports head &middot; Greatest mobility</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-4 h-0.5 bg-white/10 rotate-90" />
              </div>

              {/* Thoracic */}
              <div className="bg-purple-500/15 border-2 border-purple-500/40 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-purple-400">THORACIC (T1&ndash;T12)</p>
                    <p className="text-[11px] text-white/60">12 vertebrae &middot; Mid-back region</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40">Kyphotic curve (outward)</p>
                    <p className="text-[10px] text-purple-400/70">Rib attachment &middot; Limited mobility</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-4 h-0.5 bg-white/10 rotate-90" />
              </div>

              {/* Lumbar */}
              <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-red-400">LUMBAR (L1&ndash;L5)</p>
                    <p className="text-[11px] text-white/60">5 vertebrae &middot; Lower back</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40">Lordotic curve (inward)</p>
                    <p className="text-[10px] text-red-400/70">Bears greatest load &middot; MOST VULNERABLE</p>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-red-500/10 rounded-lg">
                  <p className="text-[10px] text-red-400 font-semibold text-center">L4/L5 and L5/S1 &mdash; highest injury rate from manual handling</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-4 h-0.5 bg-white/10 rotate-90" />
              </div>

              {/* Sacral */}
              <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-amber-400">SACRAL (S1&ndash;S5)</p>
                    <p className="text-[11px] text-white/60">5 fused vertebrae &middot; Sacrum</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40">Kyphotic curve (outward)</p>
                    <p className="text-[10px] text-amber-400/70">Fused &middot; Connects to pelvis</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-4 h-0.5 bg-white/10 rotate-90" />
              </div>

              {/* Coccyx */}
              <div className="bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-emerald-400">COCCYGEAL (Co1&ndash;Co4)</p>
                    <p className="text-[11px] text-white/60">4 fused vertebrae &middot; Tailbone</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40">Vestigial</p>
                    <p className="text-[10px] text-emerald-400/70">Fused &middot; Muscle attachment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disc Detail */}
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <CircleDot className="h-4 w-4 text-emerald-400" />
                <p className="text-sm font-medium text-white">Intervertebral Disc Structure</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full border-4 border-emerald-400/60 bg-emerald-500/20 flex items-center justify-center mb-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-400/40 border-2 border-emerald-400/60" />
                  </div>
                  <p className="text-xs font-bold text-emerald-400">ANNULUS FIBROSUS</p>
                  <p className="text-[10px] text-white/60 mt-1">Tough, multi-layered fibrous outer ring. Concentric layers of collagen fibres arranged in alternating diagonal patterns. Contains and protects the nucleus.</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full border-2 border-blue-400/40 bg-blue-400/30 flex items-center justify-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-400/50" />
                  </div>
                  <p className="text-xs font-bold text-blue-400">NUCLEUS PULPOSUS</p>
                  <p className="text-[10px] text-white/60 mt-1">Soft, gel-like centre. ~80% water. Acts as a hydraulic shock absorber, distributing compressive forces evenly across the disc. Loses water content with age.</p>
                </div>
              </div>
            </div>

            <p className="text-center text-white/40 text-xs mt-4">
              Between each pair of vertebrae (except C1/C2 and the fused sacral/coccygeal segments) sits an intervertebral disc that absorbs shock and allows movement
            </p>
          </div>
        </section>

        {/* Section 01: Spinal Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            The Spinal Column
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>spinal column</strong> (vertebral column or backbone) is the central
                structural support of the human body. It consists of <strong>33 vertebrae</strong>
                arranged in five distinct regions, each with its own structural characteristics and
                functional role.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Five Spinal Regions</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[50px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">C1&ndash;C7</span>
                    <div>
                      <p className="text-white font-medium">Cervical (7 vertebrae)</p>
                      <p>The neck region. The smallest and most mobile vertebrae. Supports the weight
                        of the head (~5 kg) and allows the widest range of head movement. C1 (atlas) and
                        C2 (axis) have unique shapes that allow nodding and rotation.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[50px] h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">T1&ndash;T12</span>
                    <div>
                      <p className="text-white font-medium">Thoracic (12 vertebrae)</p>
                      <p>The mid-back region. Each thoracic vertebra articulates with a pair of ribs,
                        forming the ribcage. This rib attachment severely limits mobility but provides
                        excellent structural stability and protection for the heart and lungs.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[50px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">L1&ndash;L5</span>
                    <div>
                      <p className="text-white font-medium">Lumbar (5 vertebrae)</p>
                      <p>The lower back region. The largest and strongest vertebrae, because they must
                        bear the entire weight of the upper body. The lumbar region has significant
                        mobility (flexion, extension, lateral bending) but is the most vulnerable to
                        injury from manual handling because of the enormous forces it must absorb.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[50px] h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">S1&ndash;S5</span>
                    <div>
                      <p className="text-white font-medium">Sacral (5 fused vertebrae)</p>
                      <p>Five vertebrae fused into a single triangular bone called the sacrum. The sacrum
                        connects the spine to the pelvis via the sacroiliac joints. It transmits the
                        weight of the upper body to the legs.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[50px] h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">Co1&ndash;4</span>
                    <div>
                      <p className="text-white font-medium">Coccygeal (4 fused vertebrae)</p>
                      <p>Four small vertebrae fused into the coccyx (tailbone). A vestigial structure
                        that provides attachment points for pelvic floor muscles and ligaments.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The spine serves three critical functions: it <strong>supports the body&rsquo;s
                weight</strong>, it <strong>protects the spinal cord</strong> (the main nerve pathway
                between the brain and the body), and it <strong>allows movement</strong> (bending,
                twisting, and turning). These functions are in constant tension &mdash; the spine must
                be strong enough to bear heavy loads, flexible enough to allow a wide range of
                movement, and precise enough to protect the delicate nerve tissue within it.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Intervertebral Discs and the S-Curve */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Intervertebral Discs and the Natural S-Curve
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Between each pair of vertebrae (except between C1 and C2, and in the fused
                sacral and coccygeal regions) sits an <strong>intervertebral disc</strong>. There
                are 23 discs in total, and they perform a critical role: they act as <strong>shock
                absorbers</strong>, distribute compressive forces, and allow controlled movement
                between adjacent vertebrae.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-2">Disc Structure</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div>
                    <p className="text-white font-medium">Annulus Fibrosus (Outer Ring)</p>
                    <p>A tough, multi-layered ring of fibrous tissue that forms the outer wall of the
                      disc. It consists of 15&ndash;25 concentric layers (lamellae) of collagen fibres,
                      arranged in alternating diagonal orientations. This criss-cross pattern gives the
                      annulus its remarkable strength and resilience. The annulus contains the nucleus
                      pulposus and resists the tensile, shear, and torsional forces generated during
                      spinal movement.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Nucleus Pulposus (Gel Centre)</p>
                    <p>A soft, gelatinous mass located in the centre of the disc. It is composed of
                      approximately 80% water (in a young, healthy disc), along with collagen and
                      proteoglycans. The nucleus acts as a <strong className="text-white">hydraulic
                      shock absorber</strong> &mdash; when the spine is compressed (as during lifting),
                      the nucleus distributes the force evenly across the disc surface. With age and
                      degeneration, the nucleus loses water content and becomes less effective.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Natural S-Curve</p>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  When viewed from the side, a healthy spine has a distinctive <strong className="text-white">
                  S-shaped curve</strong> formed by alternating curves in each region:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Cervical lordosis</strong> &mdash; the neck curves inward (towards the front of the body)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Thoracic kyphosis</strong> &mdash; the mid-back curves outward (away from the front)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Lumbar lordosis</strong> &mdash; the lower back curves inward</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Sacral kyphosis</strong> &mdash; the sacrum curves outward</span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 leading-relaxed mt-3">
                  This S-curve is not a flaw &mdash; it is a <strong className="text-white">critical
                  engineering feature</strong>. The alternating curves act as a natural spring,
                  absorbing shock and distributing mechanical forces along the length of the spine.
                  A straight column would transmit forces directly and be far more prone to failure.
                  The S-curve gives the spine approximately <strong>10 times more resilience</strong>
                  to compressive forces than a straight column would have.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Why Posture Matters</p>
                </div>
                <p className="text-sm text-white/80">
                  When you maintain the natural S-curve during lifting (by keeping your back straight
                  and bending at the knees and hips), compressive forces are distributed
                  <strong className="text-white"> evenly across the entire disc surface</strong>. This
                  is the disc&rsquo;s strongest configuration. When you bend forward (losing the lumbar
                  lordosis and flexing the spine), the compressive force concentrates on the
                  <strong className="text-white"> front of the disc</strong>, and the
                  <strong className="text-white"> back of the annulus fibrosus</strong> is placed under
                  high tensile stress. This is exactly the condition that leads to posterior disc
                  herniation &mdash; the most common type of manual handling disc injury.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: How Discs Herniate Under Load */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            How Discs Herniate Under Load
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Disc herniation</strong> (commonly called a &ldquo;slipped disc&rdquo;)
                occurs when the annulus fibrosus tears and the nucleus pulposus bulges outward
                (protrusion) or extrudes through the tear (extrusion). Understanding the mechanism
                helps explain why certain postures and movements are so dangerous.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">The Herniation Mechanism</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-xs mb-1">Step 1: Spinal Flexion</p>
                    <p className="text-xs">When the spine bends forward (flexion), the front of the vertebral
                      bodies move closer together, compressing the anterior part of the disc. The
                      nucleus pulposus is squeezed backwards like toothpaste in a tube.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-xs mb-1">Step 2: Posterior Annular Stress</p>
                    <p className="text-xs">As the nucleus migrates posteriorly, the posterior (back) portion of the
                      annulus fibrosus is subjected to high tensile stress. The posterior annulus is
                      also the thinnest and weakest part of the ring, making it the most likely
                      point of failure.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-xs mb-1">Step 3: Annular Tear</p>
                    <p className="text-xs">Under sustained or repeated loading &mdash; especially with
                      simultaneous flexion and rotation (bending and twisting) &mdash; the fibres of
                      the posterior annulus begin to tear. Tears may occur suddenly from a single heavy
                      load, or progressively from repeated micro-tears over months or years.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-xs mb-1">Step 4: Nucleus Extrusion</p>
                    <p className="text-xs">Once the annulus is breached, the nucleus pulposus bulges or extrudes
                      through the tear into the spinal canal. This herniated material can compress
                      adjacent spinal nerve roots, causing pain, numbness, tingling, and weakness
                      in the back and legs (sciatica).</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Most Dangerous Movements for the Disc</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Flexion + compression</strong> &mdash; bending forward while lifting a heavy load. This is the classic mechanism for posterior disc herniation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Flexion + rotation + compression</strong> &mdash; bending forward AND twisting while lifting. This is the single most dangerous combination, halving the effective strength of the annulus and concentrating force on a small area of the posterior-lateral disc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Sustained flexion</strong> &mdash; holding the spine in a bent-forward position for prolonged periods causes the posterior annulus to &ldquo;creep&rdquo; (gradually stretch under constant load), increasing vulnerability to subsequent loading.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Repetitive flexion</strong> &mdash; repeatedly bending and straightening causes cumulative micro-damage to the annular fibres. Research shows that even moderate loads can cause disc failure after sufficient repetitions.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Compressive Forces During Lifting</p>
                <p className="text-sm text-white/80 mb-3">
                  The forces on the lumbar disc during lifting are far greater than the weight of the
                  load alone, because of the <strong className="text-white">lever-arm effect</strong>.
                  When a load is held away from the body, the back muscles must generate enormous
                  force to counterbalance it:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">Standing Upright (no load)</p>
                    <p className="text-white/70 text-xs">L5/S1 compression: ~70 kg (body weight above L5)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-amber-400 font-semibold text-xs mb-1">Bending Forward 20 deg (no load)</p>
                    <p className="text-white/70 text-xs">L5/S1 compression: ~150 kg (lever-arm effect of trunk weight)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-red-400 font-semibold text-xs mb-1">Lifting 25 kg Close to Body</p>
                    <p className="text-white/70 text-xs">L5/S1 compression: ~340 kg (load + trunk weight + muscle force)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-red-400 font-semibold text-xs mb-1">Lifting 25 kg at Arm&rsquo;s Length</p>
                    <p className="text-white/70 text-xs">L5/S1 compression: ~500+ kg (massively increased lever arm)</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Key Insight</p>
                </div>
                <p className="text-sm text-white/80">
                  Keeping the load <strong className="text-white">close to the body</strong> is not
                  just a training recommendation &mdash; it is a biomechanical necessity. Moving a
                  25 kg load from close to the body to arm&rsquo;s length increases the compressive
                  force on L5/S1 by approximately 50%. This is why the TILE assessment considers hand
                  distance from the lower back as a critical risk factor, and why correct technique
                  emphasises keeping the load as close to the centre of gravity as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Common Injuries and the Lumbar Vulnerability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Common Injuries &amp; Why the Lumbar Region Is Most Vulnerable
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Manual handling can cause a range of injuries to the musculoskeletal system. The type
                and severity of injury depends on the forces involved, the tissues affected, and whether
                the injury is acute (sudden) or cumulative (gradual).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Manual Handling Injuries</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-4 w-4 text-red-400 flex-shrink-0" />
                      <p className="text-white font-medium text-xs">Disc Prolapse (Herniated Disc)</p>
                    </div>
                    <p className="text-xs">The nucleus pulposus extrudes through a tear in the annulus fibrosus,
                      potentially compressing adjacent nerve roots. Causes severe back pain, often with
                      radiating leg pain (sciatica), numbness, tingling, and weakness. The most serious
                      common injury from manual handling. May require surgery in severe cases.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-amber-400 flex-shrink-0" />
                      <p className="text-white font-medium text-xs">Muscle Strain</p>
                    </div>
                    <p className="text-xs">Overstretching or tearing of muscle fibres, usually the erector spinae
                      (back muscles) or the muscles of the shoulders and arms. Causes localised pain,
                      stiffness, and reduced range of movement. Usually heals within days to weeks,
                      but severe strains can take months.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <p className="text-white font-medium text-xs">Ligament Sprain</p>
                    </div>
                    <p className="text-xs">Overstretching or tearing of the ligaments that stabilise the spinal
                      joints (supraspinous, interspinous, and posterior longitudinal ligaments). Causes
                      deep, aching pain that worsens with movement. Ligaments have a poor blood supply
                      and heal slowly &mdash; recovery can take weeks to months.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                      <p className="text-white font-medium text-xs">Nerve Compression &amp; Sciatica</p>
                    </div>
                    <p className="text-xs">Compression of spinal nerve roots (usually by a herniated disc or
                      bone spur) causes pain that radiates along the nerve pathway. Sciatica &mdash;
                      compression of the sciatic nerve roots at L4/L5 or L5/S1 &mdash; causes sharp,
                      burning pain, numbness, and weakness from the buttock down the back of the leg
                      to the foot. Can be severely disabling.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Bone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <p className="text-white font-medium text-xs">Facet Joint Dysfunction</p>
                    </div>
                    <p className="text-xs">Injury or degeneration of the small facet joints at the back of each
                      vertebra. These joints guide spinal movement and can be damaged by excessive
                      extension (arching back) or rotation under load. Causes localised back pain
                      that worsens with extension and twisting movements.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">Why L4/L5 and L5/S1 Are Most Vulnerable</p>
                <p className="text-sm text-white/80 mb-3">
                  The lumbar region, and specifically the <strong className="text-white">L4/L5 and
                  L5/S1</strong> segments, accounts for the vast majority of disc herniations from
                  manual handling. This is not a coincidence &mdash; it is a consequence of anatomy
                  and biomechanics:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Greatest compressive load:</strong> The lowest lumbar segments bear the cumulative weight of everything above them &mdash; head, arms, trunk, plus any external load. L5/S1 bears the greatest compressive force of any spinal segment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Transition zone:</strong> L5/S1 is the junction between the mobile lumbar spine and the fixed sacrum. This transition creates a concentration of mechanical stress &mdash; the mobile segment above must absorb forces that the rigid segment below cannot accommodate.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Wide range of motion:</strong> The L4/L5 and L5/S1 segments have the greatest range of flexion (forward bending) in the lower spine, which means the discs at these levels experience the greatest changes in loading during lifting and bending.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Shear forces:</strong> The lumbosacral angle (the angle at which L5 sits on the sacrum) creates a natural shear force that tends to slide L5 forward on the sacrum. This shear force is amplified during forward bending and lifting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span><strong className="text-white">Thinnest posterior annulus:</strong> The posterior part of the annulus fibrosus is naturally thinner at L4/L5 and L5/S1 than at higher levels, making it the weakest point of the disc and the most common location for herniation.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">The Practical Lesson</p>
                </div>
                <p className="text-sm text-white/80">
                  Understanding spinal anatomy explains <strong className="text-white">why</strong>
                  correct manual handling technique works. Every principle of safe lifting &mdash;
                  keeping the back straight, bending at the knees, keeping the load close, avoiding
                  twisting &mdash; is designed to maintain the natural S-curve, distribute forces
                  evenly, and protect the vulnerable L4/L5 and L5/S1 segments from excessive stress.
                  It is not arbitrary advice &mdash; it is applied biomechanics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has explained the anatomical and biomechanical basis for manual handling
                injuries. Understanding how the spine works &mdash; and how it fails &mdash; is
                essential for appreciating why correct technique and risk assessment are so important.
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">33 vertebrae:</strong> Arranged in 5 regions &mdash; cervical (7), thoracic (12), lumbar (5), sacral (5 fused), coccygeal (4 fused)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Disc structure:</strong> Annulus fibrosus (tough outer ring) + nucleus pulposus (gel centre) &mdash; acts as a hydraulic shock absorber</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">S-curve:</strong> The natural alternating curves distribute forces evenly and provide 10x more resilience than a straight column</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Herniation mechanism:</strong> Flexion + compression squeezes nucleus posteriorly; adding rotation halves annular strength &mdash; the most dangerous combination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">L4/L5 and L5/S1:</strong> Most vulnerable due to greatest load, transition zone, wide range of motion, shear forces, and thinnest posterior annulus</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Common injuries:</strong> Disc prolapse, muscle strain, ligament sprain, nerve compression/sciatica, facet joint dysfunction</span>
                </li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Module 1 Complete:</strong> You have now covered
                  the four foundation sections of Manual Handling Module 1 &mdash; what manual handling
                  is, the legal framework, risk assessment, and anatomy. In Module 2, we will build on
                  this knowledge with practical lifting techniques, mechanical aids, and workplace
                  control measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Risk Assessment
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1">
              Back to Module Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
