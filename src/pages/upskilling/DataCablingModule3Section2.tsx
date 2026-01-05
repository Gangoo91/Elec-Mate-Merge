import { useEffect, useMemo } from 'react';
import { ArrowLeft, Shield, Plug2, Target, Settings, CheckCircle, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule3Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Connector Types & Polish Grades | Data Cabling Module 3 Section 2';
    document.title = title;
    const desc = 'Practical guide to fibre optic connectors (LC, SC, ST), polish grades (PC, UPC, APC), and professional termination techniques.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = 'description';
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = desc;

    // Canonical
    const href = window.location.origin + '/data-cabling-module-3-section-2';
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
      question: 'What is the typical return loss specification for APC connectors?',
      options: ['14 dB', '26 dB', '40 dB', '60 dB'],
      correctAnswer: 3,
      explanation: 'APC (Angled Physical Contact) connectors typically achieve return loss of 60 dB or better due to the 8-degree angled polish.'
    },
    {
      id: 2,
      question: 'Which connector type is standard for singlemode applications in modern installations?',
      options: ['ST', 'SC', 'LC', 'FC'],
      correctAnswer: 2,
      explanation: 'LC connectors are the current standard for singlemode applications due to their small form factor and excellent performance.'
    },
    {
      id: 3,
      question: 'What does UPC stand for in connector polish terminology?',
      options: ['Ultra Physical Contact', 'Ultra Polished Connector', 'Universal Physical Contact', 'Uniform Polish Contact'],
      correctAnswer: 0,
      explanation: 'UPC stands for Ultra Physical Contact, indicating a curved polish that reduces air gaps and back reflections.'
    },
    {
      id: 4,
      question: 'Which polish type should never be mated with PC or UPC connectors?',
      options: ['PC', 'UPC', 'APC', 'SPC'],
      correctAnswer: 2,
      explanation: 'APC (Angled Physical Contact) connectors should never be mated with PC or UPC connectors due to the angled polish causing damage.'
    },
    {
      id: 5,
      question: 'What is the insertion loss specification for a high-quality LC connector?',
      options: ['0.75 dB', '0.5 dB', '0.3 dB', '0.1 dB'],
      correctAnswer: 2,
      explanation: 'High-quality LC connectors typically achieve insertion loss of 0.3 dB or better when properly installed and polished.'
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
            <Shield className="h-6 w-6 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold">
              Section 2
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Connector Types and Polish Grades
          </h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Professional guide to fibre optic connectors and termination quality
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plug2 className="h-5 w-5 text-yellow-400" />
                Fibre Optic Connector Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Fibre optic connectors provide removable connections between fibres while maintaining optical performance. 
                The quality of the connector installation directly impacts signal loss, reflections, and overall network performance.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Key Performance Parameters:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="text-white">Insertion Loss:</span> Signal attenuation through the connector (typically &lt;0.5 dB)</li>
                  <li>• <span className="text-white">Return Loss:</span> Back reflection measurement (higher is better)</li>
                  <li>• <span className="text-white">Repeatability:</span> Consistent performance over multiple connections</li>
                  <li>• <span className="text-white">Durability:</span> Number of mating cycles (typically 500-1000)</li>
                  <li>• <span className="text-white">Environmental Rating:</span> Temperature and humidity specifications</li>
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
                  <li>• Identify and select appropriate connector types for different applications</li>
                  <li>• Understand the differences between PC, UPC, and APC polish grades</li>
                  <li>• Apply proper connector installation and inspection techniques</li>
                  <li>• Troubleshoot common connector performance issues</li>
                  <li>• Implement quality control procedures for connector terminations</li>
                  <li>• Calculate link loss budgets including connector contributions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Common Connector Types */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Common Fibre Optic Connector Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Different connector types have evolved for specific applications, environments, and performance requirements. 
                Understanding when to use each type is crucial for professional installations.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">LC (Lucent Connector)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Technical Specifications</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• 1.25mm ferrule diameter</li>
                        <li>• Push-pull latching mechanism</li>
                        <li>• Duplex and simplex versions</li>
                        <li>• Ceramic or plastic ferrule options</li>
                        <li>• High-density applications</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Practical Applications</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Modern singlemode installations</li>
                        <li>• High-density patch panels</li>
                        <li>• Data centre interconnects</li>
                        <li>• SFP/SFP+ transceiver connections</li>
                        <li>• Campus backbone terminations</li>
                      </ul>
                      <p className="text-yellow-400 text-xs mt-2">💡 Most popular choice for new installations</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">SC (Subscriber Connector)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Technical Specifications</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• 2.5mm ferrule diameter</li>
                        <li>• Push-pull latching mechanism</li>
                        <li>• Square connector body</li>
                        <li>• Excellent repeatability</li>
                        <li>• Available in all polish types</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Practical Applications</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Legacy singlemode installations</li>
                        <li>• ISP demarcation points</li>
                        <li>• Outdoor fibre terminations</li>
                        <li>• Equipment with SC interfaces</li>
                        <li>• Laboratory test equipment</li>
                      </ul>
                      <p className="text-yellow-400 text-xs mt-2">💡 Robust and reliable for harsh environments</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">ST (Straight Tip)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Technical Specifications</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• 2.5mm ferrule diameter</li>
                        <li>• Bayonet coupling mechanism</li>
                        <li>• Spring-loaded design</li>
                        <li>• Keyed to prevent rotation</li>
                        <li>• Metal or plastic construction</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Practical Applications</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Legacy multimode installations</li>
                        <li>• Industrial network equipment</li>
                        <li>• Building management systems</li>
                        <li>• Security camera connections</li>
                        <li>• Short-distance links</li>
                      </ul>
                      <p className="text-yellow-400 text-xs mt-2">💡 Being phased out in favour of LC connectors</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Specialty Connectors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-medium">FC (Ferrule Connector)</p>
                      <p className="text-gray-300">• Threaded coupling</p>
                      <p className="text-gray-300">• High-vibration environments</p>
                      <p className="text-gray-300">• Test equipment</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-medium">MTP/MPO</p>
                      <p className="text-gray-300">• Multi-fibre connectors</p>
                      <p className="text-gray-300">• High-density applications</p>
                      <p className="text-gray-300">• 12/24 fibre configurations</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-medium">E2000</p>
                      <p className="text-gray-300">• Built-in shutter</p>
                      <p className="text-gray-300">• Eye safety features</p>
                      <p className="text-gray-300">• European preference</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Polish Grades */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Microscope className="h-5 w-5 text-yellow-400" />
                Connector Polish Grades and Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                The quality of the connector end-face polish directly affects optical performance. 
                Different polish types are optimised for specific applications and performance requirements.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Polish Types and Performance</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="bg-card p-4 rounded">
                        <p className="text-white font-medium mb-2">PC (Physical Contact)</p>
                        <ul className="space-y-1 text-gray-300 text-sm">
                          <li>• Flat polish with slight curve</li>
                          <li>• Return loss: ~14 dB</li>
                          <li>• Insertion loss: ~0.3-0.5 dB</li>
                          <li>• Basic multimode applications</li>
                          <li>• Legacy installations</li>
                        </ul>
                        <p className="text-blue-300 text-xs mt-2">💡 Blue connector boots typically</p>
                      </div>
                      <div className="bg-card p-4 rounded">
                        <p className="text-white font-medium mb-2">UPC (Ultra Physical Contact)</p>
                        <ul className="space-y-1 text-gray-300 text-sm">
                          <li>• Enhanced curved polish</li>
                          <li>• Return loss: ~50-55 dB</li>
                          <li>• Insertion loss: ~0.2-0.3 dB</li>
                          <li>• Standard singlemode applications</li>
                          <li>• Most common in installations</li>
                        </ul>
                        <p className="text-blue-300 text-xs mt-2">💡 Blue connector boots standard</p>
                      </div>
                      <div className="bg-card p-4 rounded">
                        <p className="text-white font-medium mb-2">APC (Angled Physical Contact)</p>
                        <ul className="space-y-1 text-gray-300 text-sm">
                          <li>• 8-degree angled polish</li>
                          <li>• Return loss: ~60+ dB</li>
                          <li>• Insertion loss: ~0.2-0.3 dB</li>
                          <li>• High-performance singlemode</li>
                          <li>• CATV and analytical applications</li>
                        </ul>
                        <p className="text-green-300 text-xs mt-2">💡 Green connector boots always</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Practical Polish Selection Guide</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">When to Use UPC:</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Standard data network applications</li>
                        <li>• Most singlemode installations</li>
                        <li>• Cost-sensitive projects</li>
                        <li>• General enterprise networking</li>
                        <li>• Transceiver compatibility required</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">When to Use APC:</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Long-haul transmission systems</li>
                        <li>• CATV and broadcast applications</li>
                        <li>• Analytical and test equipment</li>
                        <li>• High-dynamic-range systems</li>
                        <li>• When minimising reflections is critical</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-600/20 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-red-300 font-semibold mb-2">Critical Compatibility Warning:</p>
                  <ul className="space-y-1 text-red-200 text-sm">
                    <li>• NEVER mate APC connectors with PC or UPC connectors</li>
                    <li>• Different polish angles will cause permanent damage</li>
                    <li>• Always verify connector polish type before connection</li>
                    <li>• Use colour coding (green = APC, blue = UPC) for identification</li>
                    <li>• Maintain separate inventory and labelling systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation and Quality Control */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Professional Installation Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Proper connector installation requires precision, appropriate tools, and rigorous quality control procedures to achieve optimal performance.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Field Termination Process</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Preparation Steps</p>
                      <ol className="space-y-1 text-gray-300 text-sm list-decimal list-inside">
                        <li>Strip cable jacket to specified length</li>
                        <li>Clean fibre with appropriate solvents</li>
                        <li>Cleave fibre to precise length</li>
                        <li>Insert fibre into connector ferrule</li>
                        <li>Secure with epoxy or mechanical crimp</li>
                        <li>Polish end-face to specification</li>
                      </ol>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Quality Control</p>
                      <ol className="space-y-1 text-gray-300 text-sm list-decimal list-inside">
                        <li>Inspect end-face with microscope</li>
                        <li>Measure insertion loss with power meter</li>
                        <li>Test return loss if required</li>
                        <li>Document test results</li>
                        <li>Apply protective caps</li>
                        <li>Label connector properly</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Common Installation Issues</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">End-Face Defects</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Scratches from improper polishing</li>
                        <li>• Pits and voids in surface finish</li>
                        <li>• Contamination from dirty polish films</li>
                        <li>• Chipped or cracked ferrule</li>
                        <li>• Fibre protrusion or undercut</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Prevention Methods</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Use proper polishing technique and pressure</li>
                        <li>• Replace polish films regularly</li>
                        <li>• Maintain clean work environment</li>
                        <li>• Inspect microscope before each use</li>
                        <li>• Follow manufacturer procedures exactly</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Testing and Certification</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-2 text-white">Parameter</th>
                          <th className="text-left py-2 text-white">Specification</th>
                          <th className="text-left py-2 text-white">Test Method</th>
                          <th className="text-left py-2 text-white">Equipment Required</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        <tr className="border-b border-gray-700">
                          <td className="py-2">Insertion Loss</td>
                          <td className="py-2">&lt;0.3 dB (Grade A)</td>
                          <td className="py-2">Optical power meter</td>
                          <td className="py-2">Light source + power meter</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2">Return Loss</td>
                          <td className="py-2">&gt;50 dB (UPC)</td>
                          <td className="py-2">OTDR or return loss meter</td>
                          <td className="py-2">Specialised test equipment</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2">End-face Quality</td>
                          <td className="py-2">IEC 61300-3-35</td>
                          <td className="py-2">Fibre microscope</td>
                          <td className="py-2">200x+ magnification scope</td>
                        </tr>
                        <tr>
                          <td className="py-2">Cleanliness</td>
                          <td className="py-2">Zone A/B limits</td>
                          <td className="py-2">Visual inspection</td>
                          <td className="py-2">Inspection microscope</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-green-300 font-semibold mb-2">Professional Best Practices:</p>
                <ul className="space-y-1 text-green-200 text-sm">
                  <li>• Always clean connectors before and after mating</li>
                  <li>• Use protective caps when connectors are not in use</li>
                  <li>• Maintain calibrated test equipment and clean polish stations</li>
                  <li>• Document all test results and maintain traceability</li>
                  <li>• Train personnel in proper handling and inspection techniques</li>
                  <li>• Implement quality control procedures for all installations</li>
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
              <SingleQuestionQuiz questions={sequentialQuestions} title="Connector Types & Polish Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../data-cabling-module-3-section-1">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link to="../data-cabling-module-3-section-3">
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

export default DataCablingModule3Section2;