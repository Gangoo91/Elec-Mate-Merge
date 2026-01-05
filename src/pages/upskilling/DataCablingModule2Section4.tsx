import { useEffect, useMemo } from 'react';
import { ArrowLeft, Plug, Network, Layers, CheckCircle, AlertTriangle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule2Section4 = () => {
  // SEO
  useEffect(() => {
    const title = 'Connectors & Patch Panels | Data Cabling Module 2 Section 4';
    document.title = title;
    const desc = 'Comprehensive guide to RJ45 connectors, patch panels, and termination techniques for data cabling installations per BS7671 standards.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = 'description';
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = desc;

    // Canonical
    const href = window.location.origin + '/data-cabling-module-2-section-4';
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
      question: 'What is the correct wire sequence for T568B termination?',
      options: [
        'White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown',
        'White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown',
        'Orange, White/Orange, Green, White/Green, Blue, White/Blue, Brown, White/Brown',
        'White/Orange, Orange, White/Green, Green, White/Blue, Blue, White/Brown, Brown'
      ],
      correctAnswer: 0,
      explanation: 'T568B standard uses: White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown sequence.'
    },
    {
      id: 2,
      question: 'What is the maximum untwisted cable length allowed when terminating Category 6 cable?',
      options: ['6mm', '13mm', '19mm', '25mm'],
      correctAnswer: 1,
      explanation: 'Category 6 cable should have no more than 13mm (0.5 inches) of untwisted pairs to maintain performance specifications.'
    },
    {
      id: 3,
      question: 'Which type of patch panel provides the best performance for Category 6A installations?',
      options: ['110 IDC patch panel', 'Krone IDC patch panel', 'Modular jack patch panel', 'BIX patch panel'],
      correctAnswer: 2,
      explanation: 'Modular jack patch panels provide the best performance for Cat6A as they maintain pair geometry and reduce crosstalk.'
    },
    {
      id: 4,
      question: 'What is the purpose of the load bar in RJ45 connectors?',
      options: [
        'To improve cable strain relief',
        'To maintain proper pair separation',
        'To reduce insertion loss',
        'To prevent electromagnetic interference'
      ],
      correctAnswer: 1,
      explanation: 'The load bar maintains proper pair separation and reduces crosstalk by keeping wire pairs in correct positions.'
    },
    {
      id: 5,
      question: 'According to BS7671, what is the minimum bend radius for Category 6 cable during installation?',
      options: ['2 times cable diameter', '4 times cable diameter', '6 times cable diameter', '8 times cable diameter'],
      correctAnswer: 1,
      explanation: 'BS7671 specifies minimum bend radius of 4 times the cable diameter to prevent performance degradation.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../data-cabling-module-2">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Plug className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold">
              Section 4
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Connectors and Patch Panels
          </h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Professional termination techniques and hardware selection
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="h-5 w-5 text-yellow-400" />
                Introduction to Connectivity Hardware
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Proper connector and patch panel selection is crucial for maintaining signal integrity throughout the network infrastructure. 
                This section covers the essential hardware components and professional termination techniques required for reliable data transmission.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Key Hardware Components:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="text-white">RJ45 Connectors:</span> 8P8C modular connectors for twisted pair cables</li>
                  <li>• <span className="text-white">Patch Panels:</span> Centralised termination points for horizontal cabling</li>
                  <li>• <span className="text-white">Keystone Jacks:</span> Modular outlets for work area connections</li>
                  <li>• <span className="text-white">Patch Leads:</span> Short cables connecting patch panels to switches</li>
                  <li>• <span className="text-white">Cable Management:</span> Organisers and supports for neat installations</li>
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
                  <li>• Identify different types of RJ45 connectors and their applications</li>
                  <li>• Understand T568A and T568B wiring standards and when to use each</li>
                  <li>• Select appropriate patch panel types for different cable categories</li>
                  <li>• Apply proper termination techniques to maintain performance specifications</li>
                  <li>• Implement effective cable management strategies</li>
                  <li>• Troubleshoot common connector and termination issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* RJ45 Connectors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plug className="h-5 w-5 text-yellow-400" />
                RJ45 Connector Types and Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                RJ45 connectors are the standard interface for Ethernet connections. Understanding the different types and proper termination methods is essential for reliable network performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Connector Categories</h4>
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <p className="text-white font-medium">Cat5e Connectors</p>
                      <p className="text-sm">• Standard 8P8C modular plugs</p>
                      <p className="text-sm">• Suitable up to 100MHz</p>
                      <p className="text-sm">• Most economical option</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">Cat6 Connectors</p>
                      <p className="text-sm">• Enhanced internal design</p>
                      <p className="text-sm">• Load bar for pair separation</p>
                      <p className="text-sm">• Improved crosstalk performance</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">Cat6A Connectors</p>
                      <p className="text-sm">• Shielded and unshielded versions</p>
                      <p className="text-sm">• Larger size to accommodate cable</p>
                      <p className="text-sm">• 500MHz performance capability</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Wiring Standards</h4>
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <p className="text-white font-medium">T568A Standard</p>
                      <p className="text-sm">• White/Green, Green, White/Orange, Blue</p>
                      <p className="text-sm">• White/Blue, Orange, White/Brown, Brown</p>
                      <p className="text-sm">• Preferred for new installations</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">T568B Standard</p>
                      <p className="text-sm">• White/Orange, Orange, White/Green, Blue</p>
                      <p className="text-sm">• White/Blue, Green, White/Brown, Brown</p>
                      <p className="text-sm">• More common in existing installations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/20 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Critical Termination Points:</p>
                <ul className="space-y-1 text-yellow-400 text-sm">
                  <li>• Maintain consistent wiring standard throughout installation</li>
                  <li>• Minimise untwisted cable length (13mm max for Cat6)</li>
                  <li>• Ensure proper insertion depth and contact engagement</li>
                  <li>• Use appropriate connector category for cable type</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Patch Panels */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-yellow-400" />
                Patch Panel Selection and Installation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Patch panels provide organised termination points for horizontal cabling and enable flexible reconfiguration of network connections without disturbing permanent links.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Patch Panel Types</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <p className="text-white font-medium mb-2">110 IDC Patch Panels</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Insulation displacement connection</li>
                        <li>• High density configurations</li>
                        <li>• Tool-dependent termination</li>
                        <li>• Good for Cat5e applications</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Modular Jack Panels</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Keystone jack compatibility</li>
                        <li>• Easy maintenance and replacement</li>
                        <li>• Better performance for high-speed</li>
                        <li>• Preferred for Cat6/6A installations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Installation Considerations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Physical Requirements</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• 19-inch rack mounting standard</li>
                        <li>• 1U, 2U height options available</li>
                        <li>• Cable management space required</li>
                        <li>• Ventilation considerations for cooling</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Performance Factors</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Maintain cable category performance</li>
                        <li>• Proper grounding for shielded systems</li>
                        <li>• Minimise cable stress and sharp bends</li>
                        <li>• Allow for future expansion needs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination Techniques */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Professional Termination Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Proper termination technique directly impacts network performance and reliability. Following established procedures ensures consistent, high-quality connections.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">RJ45 Termination Process</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 text-sm">
                      <div>
                        <p className="text-white font-medium mb-2">Preparation Steps</p>
                        <ol className="space-y-1 list-decimal list-inside">
                          <li>Strip outer jacket to correct length</li>
                          <li>Untwist pairs minimally (13mm max)</li>
                          <li>Arrange conductors per wiring standard</li>
                          <li>Trim conductors to equal length</li>
                        </ol>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-2">Termination Steps</p>
                        <ol className="space-y-1 list-decimal list-inside">
                          <li>Insert conductors fully into connector</li>
                          <li>Ensure jacket enters connector body</li>
                          <li>Crimp with quality termination tool</li>
                          <li>Test connection before installation</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Quality Control Measures</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white font-medium mb-2">Visual Inspection</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Verify correct wire sequence</li>
                        <li>• Check conductor insertion depth</li>
                        <li>• Confirm jacket strain relief</li>
                        <li>• Inspect for damaged conductors</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Electrical Testing</p>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Wire map verification</li>
                        <li>• Continuity testing</li>
                        <li>• Performance parameter validation</li>
                        <li>• Documentation of results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/20 border border-red-500/30 p-4 rounded-lg">
                <p className="text-red-300 font-semibold mb-2">Common Termination Errors:</p>
                <ul className="space-y-1 text-red-200 text-sm">
                  <li>• Excessive untwisting of cable pairs</li>
                  <li>• Inconsistent wiring standards within installation</li>
                  <li>• Poor crimp quality or inadequate contact pressure</li>
                  <li>• Insufficient jacket strain relief</li>
                  <li>• Damaged conductors during preparation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cable Management */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="h-5 w-5 text-yellow-400" />
                Cable Management Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Effective cable management ensures system reliability, facilitates maintenance, and maintains performance specifications throughout the installation lifecycle.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Rack Organisation</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Use horizontal and vertical cable managers</li>
                    <li>• Maintain minimum bend radius requirements</li>
                    <li>• Separate power and data cables appropriately</li>
                    <li>• Label all connections clearly and consistently</li>
                    <li>• Allow adequate space for airflow and cooling</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Documentation Requirements</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Create comprehensive cable schedules</li>
                    <li>• Document test results and certifications</li>
                    <li>• Maintain as-built drawings and records</li>
                    <li>• Implement consistent labelling scheme</li>
                    <li>• Record warranty and maintenance information</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-green-300 font-semibold mb-2">Professional Installation Standards:</p>
                <ul className="space-y-1 text-green-200 text-sm">
                  <li>• Follow manufacturer specifications for all components</li>
                  <li>• Maintain workmanship standards throughout installation</li>
                  <li>• Use appropriate tools and test equipment</li>
                  <li>• Implement proper safety procedures and PPE</li>
                  <li>• Provide comprehensive handover documentation</li>
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
              <SingleQuestionQuiz questions={sequentialQuestions} title="Connectors & Patch Panels Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../data-cabling-module-2-section-3">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link to="../data-cabling-module-2-section-5">
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

export default DataCablingModule2Section4;