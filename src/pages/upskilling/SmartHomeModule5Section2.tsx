import { ArrowLeft, ArrowRight, Camera, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "CCTV Types, Resolution, and Storage Options";
const DESCRIPTION = "Understanding different camera types, resolution standards, and storage methods for modern CCTV systems";

const quickCheckQuestions = [
  {
    question: "What type of camera integrates a speaker, microphone, and motion detection into a single doorbell unit?",
    options: [
      "Bullet camera",
      "PTZ camera",
      "Video doorbell",
      "Turret camera"
    ],
    correctAnswer: 2,
    explanation: "Video doorbells combine a camera, speaker, microphone, and motion sensor in a single unit that replaces the traditional doorbell, enabling two-way communication with visitors."
  },
  {
    question: "What resolution provides approximately 8 megapixels and is commonly referred to as 4K?",
    options: [
      "720p HD",
      "1080p Full HD",
      "2K QHD",
      "4K UHD (3840 x 2160)"
    ],
    correctAnswer: 3,
    explanation: "4K UHD resolution at 3840 x 2160 pixels provides approximately 8 megapixels, delivering four times the detail of 1080p Full HD."
  },
  {
    question: "What is a key advantage of cloud storage for CCTV footage?",
    options: [
      "No ongoing subscription costs",
      "Off-site backup protected from theft or damage",
      "Unlimited storage capacity",
      "Faster local playback"
    ],
    correctAnswer: 1,
    explanation: "Cloud storage keeps footage off-site, protecting recordings even if the physical camera or NVR is stolen or damaged during a break-in."
  }
];

const quizQuestions = [
  {
    question: "Which camera type is best suited for monitoring large areas with the ability to track movement?",
    options: [
      "Fixed bullet camera",
      "PTZ (Pan-Tilt-Zoom) camera",
      "Video doorbell",
      "Dome camera"
    ],
    correctAnswer: 1,
    explanation: "PTZ cameras can rotate horizontally and vertically whilst zooming, making them ideal for covering large areas and tracking movement."
  },
  {
    question: "What does HDR stand for in camera specifications?",
    options: [
      "High Definition Recording",
      "High Dynamic Range",
      "Hardware Data Rate",
      "Horizontal Display Resolution"
    ],
    correctAnswer: 1,
    explanation: "HDR (High Dynamic Range) helps cameras capture detail in both bright and dark areas of the same scene, improving image quality in challenging lighting."
  },
  {
    question: "What is the typical retention period for NVR local storage in residential systems?",
    options: [
      "24 hours",
      "3-7 days",
      "7-30 days depending on settings",
      "Unlimited"
    ],
    correctAnswer: 2,
    explanation: "Most residential NVR systems retain 7-30 days of footage depending on the number of cameras, resolution settings, and hard drive capacity."
  },
  {
    question: "What UK regulation must be considered when installing external CCTV that may capture public areas?",
    options: [
      "Building Regulations Part P",
      "Data Protection Act and GDPR",
      "Consumer Rights Act",
      "Health and Safety at Work Act"
    ],
    correctAnswer: 1,
    explanation: "CCTV systems that capture images of people (including neighbours or passers-by) are subject to data protection laws including GDPR requirements for signage and data handling."
  },
  {
    question: "What feature allows cameras to capture colour images in low light conditions?",
    options: [
      "Standard IR illumination",
      "Colour night vision with supplemental lighting",
      "Digital zoom",
      "Motion masking"
    ],
    correctAnswer: 1,
    explanation: "Colour night vision cameras use supplemental white LED lighting or advanced sensor technology to capture colour images in low light, rather than switching to black and white IR mode."
  }
];

const faqs = [
  {
    question: "How much storage do I need for a home CCTV system?",
    answer: "Storage requirements depend on camera count, resolution, and retention period. A typical 4-camera 1080p system recording motion only needs approximately 1TB for 7 days. Continuous 4K recording requires significantly more: plan for 2TB per camera for 7 days of footage."
  },
  {
    question: "Should I use cloud or local storage?",
    answer: "Most systems benefit from both. Local NVR storage provides fast access and no recurring costs, whilst cloud backup ensures footage survives theft or equipment damage. Many modern systems support hybrid storage automatically."
  },
  {
    question: "What internet speed is needed for remote CCTV viewing?",
    answer: "Remote viewing requires approximately 2-4 Mbps upload speed per camera for smooth 1080p streaming. 4K streaming needs 8-15 Mbps per camera. Most UK broadband packages support 1-2 camera remote viewing; more cameras may require upgraded internet or sub-streaming."
  }
];

const SmartHomeModule5Section2 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 5`,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 2 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Camera className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-medium text-elec-yellow">Smart Security and Access Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{TITLE}</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Camera Types</h3>
            <p className="text-sm text-white">Bullet, dome, PTZ, and doorbells</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Resolution</h3>
            <p className="text-sm text-white">720p to 4K standards</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Storage</h3>
            <p className="text-sm text-white">Local NVR vs cloud options</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="font-semibold text-white mb-1">Compliance</h3>
            <p className="text-sm text-white">GDPR and privacy considerations</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Identify different CCTV camera types and their suitable applications</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Understand resolution standards from 720p to 4K and their impact on storage</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Compare local NVR storage with cloud-based solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-white">Apply GDPR and privacy requirements for residential CCTV installations</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Camera Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            CCTV Camera Types
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Modern smart home CCTV systems use IP cameras that connect via Wi-Fi or Ethernet. Each form factor suits different installation requirements and monitoring needs.
            </p>

            <div className="grid gap-4">
              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Bullet Cameras</h4>
                <p className="text-white text-sm">
                  Cylindrical cameras typically mounted on walls or soffits. Provide a visible deterrent and are well-suited for outdoor perimeter monitoring. Usually include integrated IR illuminators for night vision. Fixed lens with field of view typically 80-110 degrees.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Dome Cameras</h4>
                <p className="text-white text-sm">
                  Ceiling-mounted with a discreet dome housing that obscures the lens direction. Harder to tamper with and more subtle than bullet cameras. Common for indoor areas, porches, and commercial spaces. Available with fixed or varifocal lenses.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">PTZ Cameras</h4>
                <p className="text-white text-sm">
                  Pan-Tilt-Zoom cameras can rotate horizontally (pan), vertically (tilt), and zoom optically. Controlled remotely via app or automatically following detected motion. Ideal for large areas like driveways or gardens where tracking capability is valuable.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Video Doorbells</h4>
                <p className="text-white text-sm">
                  All-in-one units replacing traditional doorbells. Include camera, motion sensor, speaker, and microphone for two-way communication. Battery or wired versions available. Popular for parcel theft prevention and visitor screening.
                </p>
              </div>

              <div className="bg-elec-gray/30 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Indoor Cameras</h4>
                <p className="text-white text-sm">
                  Compact cameras designed for tabletop or shelf placement. Often include privacy shutters, two-way audio, and some models offer pan/tilt functionality. Used for home monitoring, pet cameras, and baby monitors.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Resolution Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Resolution Standards
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Resolution determines image clarity and directly impacts storage requirements. Higher resolution provides more detail but requires more bandwidth and storage capacity.
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-semibold text-white">720p HD</h4>
                    <p className="text-sm text-white">1280 x 720 pixels (1MP)</p>
                  </div>
                  <span className="text-elec-yellow text-sm">Entry level</span>
                </div>

                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-semibold text-white">1080p Full HD</h4>
                    <p className="text-sm text-white">1920 x 1080 pixels (2MP)</p>
                  </div>
                  <span className="text-elec-yellow text-sm">Standard choice</span>
                </div>

                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-semibold text-white">2K QHD</h4>
                    <p className="text-sm text-white">2560 x 1440 pixels (4MP)</p>
                  </div>
                  <span className="text-elec-yellow text-sm">Enhanced detail</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">4K UHD</h4>
                    <p className="text-sm text-white">3840 x 2160 pixels (8MP)</p>
                  </div>
                  <span className="text-elec-yellow text-sm">Maximum clarity</span>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg">
              <p className="text-white">
                <strong>Practical guidance:</strong> 1080p remains the most cost-effective choice for residential systems, offering sufficient detail for identification whilst keeping storage costs manageable. 4K is beneficial for wide-angle views where digital zoom may be used.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Image Quality Features */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Image Quality Features
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Beyond resolution, several features affect image quality in different conditions:
            </p>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <ul className="space-y-4">
                <li>
                  <strong className="text-elec-yellow">HDR (High Dynamic Range):</strong>
                  <span className="text-white"> Balances exposure in scenes with both bright and dark areas, such as a doorway with strong backlighting.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">WDR (Wide Dynamic Range):</strong>
                  <span className="text-white"> Similar to HDR, compensates for high-contrast lighting conditions common in entrances and windows.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">IR Night Vision:</strong>
                  <span className="text-white"> Infrared illuminators enable black and white recording in complete darkness. Range typically 10-30 metres depending on model.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Colour Night Vision:</strong>
                  <span className="text-white"> Uses advanced sensors or supplemental white LED lighting to maintain colour images in low light.</span>
                </li>
                <li>
                  <strong className="text-elec-yellow">Starlight Sensors:</strong>
                  <span className="text-white"> Ultra-sensitive sensors capture usable colour images in near-darkness without supplemental lighting.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Storage Options */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Storage Options
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Local Storage (NVR/SD Card)</h3>
              <p className="text-white mb-3">
                Network Video Recorders (NVRs) store footage on internal hard drives, whilst smaller cameras may use microSD cards. Local storage provides immediate playback without internet dependency.
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>No recurring subscription costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Fast local playback and export</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Privacy - footage stays on-site</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Vulnerable to theft or damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Limited capacity requires overwriting old footage</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Cloud Storage</h3>
              <p className="text-white mb-3">
                Footage uploads to remote servers operated by the camera manufacturer or a third-party provider. Accessible from anywhere via the internet.
              </p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Protected from theft or local damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Accessible from any location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">+</span>
                  <span>Often includes AI detection features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Ongoing subscription costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Requires reliable internet with adequate upload speed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">-</span>
                  <span>Privacy concerns with third-party data storage</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* GDPR and Privacy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            GDPR and Privacy Compliance
          </h2>
          <div className="space-y-4 text-white">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-white">
                <strong>Important:</strong> CCTV systems that capture images of individuals are subject to UK GDPR and Data Protection Act 2018 requirements, even for residential installations.
              </p>
            </div>

            <div className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
              <h3 className="font-semibold text-white mb-3">Key Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">1.</span>
                  <span><strong>Signage:</strong> Clear signs indicating CCTV is in operation must be displayed where cameras may capture visitors or passers-by.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">2.</span>
                  <span><strong>Purpose limitation:</strong> Cameras should only monitor areas necessary for the stated purpose (typically security).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">3.</span>
                  <span><strong>Neighbour privacy:</strong> Cameras must not capture neighbouring properties' private areas. Use privacy masking where necessary.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">4.</span>
                  <span><strong>Data retention:</strong> Footage should not be kept longer than necessary. 30 days is typical for residential systems.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-elec-yellow font-semibold">5.</span>
                  <span><strong>Subject access:</strong> Individuals can request copies of footage featuring themselves.</span>
                </li>
              </ul>
            </div>

            <p className="text-white">
              Electricians should advise customers on these requirements during installation and help configure privacy zones to mask areas outside the property boundary.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-elec-gray/30 rounded-lg p-5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="CCTV Types and Storage Quiz"
            questions={quizQuestions}
            courseId="smart-home-module-5"
            sectionId="section-2"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Smart Locks and Keypads
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            asChild
          >
            <Link to="../section-3">
              Contact Sensors and PIR
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule5Section2;
