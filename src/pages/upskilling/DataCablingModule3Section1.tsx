import { useEffect, useMemo } from 'react';
import { ArrowLeft, Lightbulb, Eye, Layers, CheckCircle, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule3Section1 = () => {
  // SEO
  useEffect(() => {
    const title = 'Fibre Types: Singlemode vs Multimode | Data Cabling Module 3 Section 1';
    document.title = title;
    const desc = 'Practical guide to singlemode and multimode fibre optic cables, core sizes, applications, and selection criteria for data transmission systems.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = 'description';
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = desc;

    // Canonical
    const href = window.location.origin + '/data-cabling-module-3-section-1';
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;
  }, []);

  // Quiz Data
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'What is the core diameter of OS2 singlemode fibre?',
      options: ['8.3 µm', '9 µm', '50 µm', '62.5 µm'],
      correctAnswer: 1,
      explanation: 'OS2 singlemode fibre has a core diameter of 9 µm, optimised for long-distance, high-bandwidth applications.'
    },
    {
      id: 2,
      question: 'Which fibre type is best for campus backbone links up to 2km?',
      options: ['OM1 multimode', 'OM3 multimode', 'OM4 multimode', 'OS2 singlemode'],
      correctAnswer: 3,
      explanation: 'OS2 singlemode fibre is ideal for campus backbone links over 300m, providing unlimited bandwidth and distance capability.'
    },
    {
      id: 3,
      question: 'What is the maximum 10 Gigabit Ethernet distance on OM4 fibre?',
      options: ['82 metres', '150 metres', '300 metres', '400 metres'],
      correctAnswer: 3,
      explanation: 'OM4 fibre supports 10 Gigabit Ethernet up to 400 metres using 850nm VCSEL transceivers.'
    },
    {
      id: 4,
      question: 'Which characteristic distinguishes singlemode from multimode fibre?',
      options: ['Cladding diameter', 'Core diameter', 'Wavelength used', 'Connector type'],
      correctAnswer: 1,
      explanation: 'The core diameter is the key difference: singlemode has ~9µm core, multimode has 50µm or 62.5µm cores.'
    },
    {
      id: 5,
      question: 'What does the "OM" designation stand for in multimode fibre grades?',
      options: ['Optical Mode', 'Optical Multimode', 'Optimised Mode', 'Original Multimode'],
      correctAnswer: 1,
      explanation: 'OM stands for Optical Multimode, with grades OM1-OM5 indicating performance levels and bandwidth capabilities.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="min-h-screen bg-background">
      <div>
        <Link to="../data-cabling-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold">
              Section 1
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Fibre Types: Singlemode vs Multimode
          </h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Practical guide to selecting and identifying fibre optic cable types
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-yellow-400" />
                Understanding Fibre Optic Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Fibre optic cables use light to transmit data, offering superior bandwidth and distance capabilities compared to copper cables. 
                Understanding the differences between singlemode and multimode fibres is crucial for selecting the right solution for each application.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Light Transmission Principles:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="text-white">Total Internal Reflection:</span> Light bounces within the fibre core</li>
                  <li>• <span className="text-white">Core and Cladding:</span> Different refractive indices guide light transmission</li>
                  <li>• <span className="text-white">Wavelengths:</span> 850nm, 1310nm, and 1550nm are commonly used</li>
                  <li>• <span className="text-white">Modal Dispersion:</span> How light modes affect signal quality</li>
                  <li>• <span className="text-white">Attenuation:</span> Signal loss over distance measured in dB/km</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-3">After completing this section, you will be able to:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Identify and differentiate between singlemode and multimode fibres</li>
                  <li>• Understand core sizes and their impact on transmission characteristics</li>
                  <li>• Select appropriate fibre types for specific distance and bandwidth requirements</li>
                  <li>• Recognise OM and OS designation standards and their applications</li>
                  <li>• Calculate basic transmission parameters for fibre selection</li>
                  <li>• Apply practical knowledge to real-world installation scenarios</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Multimode Fibre */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-yellow-400" />
                Multimode Fibre: Practical Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Multimode fibre allows multiple light modes to propagate simultaneously, making it ideal for shorter distance, high-speed applications within buildings and campuses.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Multimode Fibre Grades (OM Standards)</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-card p-3 rounded">
                        <p className="text-white font-medium">OM1 - 62.5/125µm</p>
                        <p className="text-sm text-gray-300">• Core: 62.5µm, Cladding: 125µm</p>
                        <p className="text-sm text-gray-300">• 1 Gigabit: 275m @ 850nm</p>
                        <p className="text-sm text-gray-300">• Legacy installations, being phased out</p>
                        <p className="text-sm text-yellow-400">Practical tip: Often orange jacketed</p>
                      </div>
                      <div className="bg-card p-3 rounded">
                        <p className="text-white font-medium">OM2 - 50/125µm</p>
                        <p className="text-sm text-gray-300">• Core: 50µm, Cladding: 125µm</p>
                        <p className="text-sm text-gray-300">• 1 Gigabit: 550m @ 850nm</p>
                        <p className="text-sm text-gray-300">• Improved bandwidth over OM1</p>
                        <p className="text-sm text-yellow-400">Practical tip: Also orange jacketed typically</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-card p-3 rounded">
                        <p className="text-white font-medium">OM3 - 50/125µm Laser Optimised</p>
                        <p className="text-sm text-gray-300">• VCSEL optimised for 850nm</p>
                        <p className="text-sm text-gray-300">• 10 Gigabit: 300m @ 850nm</p>
                        <p className="text-sm text-gray-300">• Standard for modern installations</p>
                        <p className="text-sm text-yellow-400">Practical tip: Aqua (turquoise) jacket colour</p>
                      </div>
                      <div className="bg-card p-3 rounded">
                        <p className="text-white font-medium">OM4 - 50/125µm Enhanced</p>
                        <p className="text-sm text-gray-300">• Higher bandwidth than OM3</p>
                        <p className="text-sm text-gray-300">• 10 Gigabit: 400m @ 850nm</p>
                        <p className="text-sm text-gray-300">• 40/100 Gigabit capable</p>
                        <p className="text-sm text-yellow-400">Practical tip: Aqua jacket, same as OM3</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Practical Selection Guide for Multimode</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">When to Use Multimode:</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Building backbone connections (&lt;300m)</li>
                        <li>• Data centre interconnects</li>
                        <li>• Campus network distribution</li>
                        <li>• High-speed LAN applications</li>
                        <li>• Cost-sensitive installations</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Real-World Applications:</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Office building floor-to-floor links</li>
                        <li>• Server-to-switch connections</li>
                        <li>• Campus building interconnects</li>
                        <li>• High-density data centre racks</li>
                        <li>• Video surveillance backbone</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-green-300 font-semibold mb-2">Practical Installation Tips for Multimode:</p>
                <ul className="space-y-1 text-green-200 text-sm">
                  <li>• Use OM3 minimum for new installations to ensure 10G capability</li>
                  <li>• Consider OM4 for future-proofing and longer reach requirements</li>
                  <li>• Always verify transceiver compatibility before installation</li>
                  <li>• Plan for 20-30% spare capacity in cable counts</li>
                  <li>• Test with appropriate wavelength (850nm for VCSEL systems)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Singlemode Fibre */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Singlemode Fibre: Long-Distance Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Singlemode fibre allows only one light mode to propagate, eliminating modal dispersion and enabling virtually unlimited bandwidth over long distances.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Singlemode Fibre Standards (OS)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-medium mb-2">OS1 - Indoor Singlemode</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Core: 9µm, Cladding: 125µm</li>
                        <li>• Attenuation: ≤1.0 dB/km @ 1310nm</li>
                        <li>• Indoor/premises applications</li>
                        <li>• Tight-buffered construction</li>
                        <li>• Yellow jacket (typically)</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-medium mb-2">OS2 - Outdoor Singlemode</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Core: 9µm, Cladding: 125µm</li>
                        <li>• Attenuation: ≤0.4 dB/km @ 1310nm</li>
                        <li>• Indoor and outdoor applications</li>
                        <li>• Loose-tube or tight-buffered</li>
                        <li>• Yellow jacket (standard)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Practical Transmission Capabilities</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-2 text-white">Application</th>
                          <th className="text-left py-2 text-white">Wavelength</th>
                          <th className="text-left py-2 text-white">Distance (OS2)</th>
                          <th className="text-left py-2 text-white">Typical Use</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        <tr className="border-b border-gray-700">
                          <td className="py-2">1000BASE-LX</td>
                          <td className="py-2">1310nm</td>
                          <td className="py-2">10km+</td>
                          <td className="py-2">Campus backbone</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2">10GBASE-LR</td>
                          <td className="py-2">1310nm</td>
                          <td className="py-2">10km</td>
                          <td className="py-2">MAN connections</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2">10GBASE-ER</td>
                          <td className="py-2">1550nm</td>
                          <td className="py-2">40km</td>
                          <td className="py-2">WAN links</td>
                        </tr>
                        <tr>
                          <td className="py-2">100GBASE-LR4</td>
                          <td className="py-2">CWDM</td>
                          <td className="py-2">10km</td>
                          <td className="py-2">Data centre interconnect</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Practical Selection Guidelines</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Choose Singlemode When:</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Distance exceeds 300m</li>
                        <li>• Future bandwidth requirements uncertain</li>
                        <li>• Campus-to-campus connections needed</li>
                        <li>• Connecting to service provider networks</li>
                        <li>• Maximum performance required</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Typical Installations:</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Building-to-building campus links</li>
                        <li>• Internet service provider connections</li>
                        <li>• Long-distance CCTV transmission</li>
                        <li>• Data centre site interconnects</li>
                        <li>• Metropolitan area networks</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400/20 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-blue-300 font-semibold mb-2">Cost Considerations for Singlemode:</p>
                <ul className="space-y-1 text-blue-200 text-sm">
                  <li>• Cable cost similar to multimode, sometimes less expensive</li>
                  <li>• Transceivers more expensive than multimode equivalents</li>
                  <li>• Lower long-term costs due to unlimited upgrade potential</li>
                  <li>• Reduced infrastructure changes for speed upgrades</li>
                  <li>• Better investment protection for future requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Practical Comparison */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-400" />
                Practical Decision Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Use this practical guide to select the most appropriate fibre type for your specific installation requirements.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Quick Selection Guide</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-green-600/20 border border-green-500/30 p-3 rounded">
                      <p className="text-green-300 font-medium mb-2">Use OM3/OM4 Multimode</p>
                      <ul className="space-y-1 text-green-200">
                        <li>• Distance &lt; 300m</li>
                        <li>• Budget conscious</li>
                        <li>• Building backbone</li>
                        <li>• Data centre racks</li>
                        <li>• Known bandwidth needs</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-400/20 border border-yellow-400/30 p-3 rounded">
                      <p className="text-blue-300 font-medium mb-2">Use OS2 Singlemode</p>
                      <ul className="space-y-1 text-blue-200">
                        <li>• Distance &gt; 300m</li>
                        <li>• Future-proofing needed</li>
                        <li>• Campus backbone</li>
                        <li>• ISP connections</li>
                        <li>• Unlimited bandwidth</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/20 border border-purple-500/30 p-3 rounded">
                      <p className="text-purple-300 font-medium mb-2">Hybrid Approach</p>
                      <ul className="space-y-1 text-purple-200">
                        <li>• Singlemode backbone</li>
                        <li>• Multimode distribution</li>
                        <li>• Best of both worlds</li>
                        <li>• Optimised costs</li>
                        <li>• Scalable design</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/20 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Practical Installation Checklist:</p>
                <ul className="space-y-1 text-yellow-400 text-sm">
                  <li>✓ Calculate total distance including patch cords and slack</li>
                  <li>✓ Verify transceiver compatibility and wavelengths</li>
                  <li>✓ Check jacket ratings for installation environment</li>
                  <li>✓ Plan for future expansion (spare fibres)</li>
                  <li>✓ Consider maintenance access and identification systems</li>
                  <li>✓ Ensure proper test equipment for chosen fibre type</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Check</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={sequentialQuestions} title="Fibre Types Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../data-cabling-module-3">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link to="../data-cabling-module-3-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Next
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule3Section1;