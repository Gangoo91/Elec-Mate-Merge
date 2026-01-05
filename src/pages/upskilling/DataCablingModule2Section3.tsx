import { useEffect, useMemo } from 'react';
import { ArrowLeft, BarChart, TrendingUp, Wifi, Zap, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { AccentPanel } from '@/components/upskilling/design/AccentPanel';
import type { QuizQuestion } from '@/types/quiz';

const DataCablingModule2Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Performance Ratings & Bandwidth Limits | Data Cabling Module 2 Sec 3';
    document.title = title;
    const desc = 'Comprehensive guide to cable performance specifications, bandwidth limitations, and testing requirements for data cabling installations per ISO/IEC standards.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = 'description';
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = desc;

    // Canonical
    const href = window.location.origin + '/data-cabling-module-2-section-3';
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
      question: 'What is the maximum bandwidth for Category 6A cable?',
      options: ['100 MHz', '250 MHz', '500 MHz', '600 MHz'],
      correctAnswer: 2,
      explanation: 'Category 6A cable supports frequencies up to 500 MHz, enabling 10GBASE-T over 100 metres.'
    },
    {
      id: 2,
      question: 'Which parameter is most critical for high-speed data transmission?',
      options: ['DC resistance', 'Return Loss', 'Alien Crosstalk (ANEXT)', 'Cable diameter'],
      correctAnswer: 2,
      explanation: 'Alien Crosstalk (ANEXT) between adjacent cables is the primary limiting factor for high-speed transmission, especially in bundled installations.'
    },
    {
      id: 3,
      question: 'What is the typical insertion loss limit for Cat6 at 250 MHz?',
      options: ['20.3 dB', '35.3 dB', '46.5 dB', '55.8 dB'],
      correctAnswer: 1,
      explanation: 'Cat6 insertion loss at 250 MHz should not exceed 35.3 dB per 100 metres according to ISO/IEC 11801.'
    },
    {
      id: 4,
      question: 'What does NEXT stand for in cable testing?',
      options: ['Network Extension Test', 'Near End Cross Talk', 'Nominal Extra Transmission', 'Network Error X-Talk'],
      correctAnswer: 1,
      explanation: 'NEXT (Near End Cross Talk) measures signal interference between adjacent pairs at the same end of the cable.'
    },
    {
      id: 5,
      question: 'Which Class rating corresponds to Category 6A cable?',
      options: ['Class D', 'Class E', 'Class EA', 'Class F'],
      correctAnswer: 2,
      explanation: 'Category 6A cable achieves Class EA performance rating, supporting frequencies up to 500 MHz.'
    }
  ], []);

  const sequentialQuestions = useMemo(
    () => questions.map(q => ({ id: q.id, question: q.question, options: q.options, correct: q.correctAnswer, explanation: q.explanation })),
    [questions]
  );

  return (
    <div className="min-h-screen bg-background">
      <div>
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
            <BarChart className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold">
              Section 3
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Performance Ratings and Bandwidth Limits
          </h1>
          <p className="text-base text-gray-400 max-w-3xl">
            Cable performance specifications and testing requirements
          </p>
        </div>

        <div className="space-y-8 mt-8">
          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Introduction to Performance Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Understanding cable performance ratings and bandwidth limitations is essential for designing reliable high-speed networks. 
                This section covers the technical specifications that govern cable performance and the testing methods used to verify compliance.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-2">Key Performance Parameters:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• <span className="text-white">Bandwidth:</span> Maximum frequency range supported</li>
                  <li>• <span className="text-white">Insertion Loss:</span> Signal attenuation through the cable</li>
                  <li>• <span className="text-white">Crosstalk:</span> Interference between cable pairs</li>
                  <li>• <span className="text-white">Return Loss:</span> Reflection of transmitted signals</li>
                  <li>• <span className="text-white">Delay Skew:</span> Timing differences between pairs</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-3">After completing this section, you will be able to:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Identify cable categories and their corresponding bandwidth ratings</li>
                  <li>• Understand Class and Category relationship standards</li>
                  <li>• Interpret cable performance test results and specifications</li>
                  <li>• Apply performance limitations to network design decisions</li>
                  <li>• Recognise factors affecting cable performance in installations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Category and Class Standards */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="h-5 w-5 text-yellow-400" />
                Category and Class Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Cable performance is defined by two parallel classification systems: Categories (TIA/EIA) and Classes (ISO/IEC). 
                Understanding both systems is crucial for international compliance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">TIA/EIA Categories</h4>
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <p className="text-white font-medium">Category 5e</p>
                      <p className="text-sm">• 100 MHz bandwidth</p>
                      <p className="text-sm">• Gigabit Ethernet capable</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">Category 6</p>
                      <p className="text-sm">• 250 MHz bandwidth</p>
                      <p className="text-sm">• Enhanced performance margins</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">Category 6A</p>
                      <p className="text-sm">• 500 MHz bandwidth</p>
                      <p className="text-sm">• 10 Gigabit capable</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">ISO/IEC Classes</h4>
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <p className="text-white font-medium">Class D</p>
                      <p className="text-sm">• Equivalent to Cat5e</p>
                      <p className="text-sm">• 100 MHz performance</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">Class E</p>
                      <p className="text-sm">• Equivalent to Cat6</p>
                      <p className="text-sm">• 250 MHz performance</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">Class EA</p>
                      <p className="text-sm">• Equivalent to Cat6A</p>
                      <p className="text-sm">• 500 MHz performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Parameters */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Critical Performance Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Each performance parameter affects data transmission differently. Understanding these measurements is essential for proper cable selection and installation verification.
              </p>

              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Insertion Loss</h4>
                  <p className="text-gray-300 mb-2">
                    Measures signal attenuation through the cable. Higher frequencies experience greater loss.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="bg-card p-2 rounded">
                      <p className="text-white font-medium">Cat5e @ 100MHz</p>
                      <p className="text-yellow-400">24.0 dB max</p>
                    </div>
                    <div className="bg-card p-2 rounded">
                      <p className="text-white font-medium">Cat6 @ 250MHz</p>
                      <p className="text-yellow-400">35.3 dB max</p>
                    </div>
                    <div className="bg-card p-2 rounded">
                      <p className="text-white font-medium">Cat6A @ 500MHz</p>
                      <p className="text-yellow-400">46.5 dB max</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Near End Crosstalk (NEXT)</h4>
                  <p className="text-gray-300 mb-2">
                    Interference between pairs measured at the transmitting end. Critical for maintaining signal integrity.
                  </p>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Higher NEXT values indicate better performance</li>
                    <li>• Measured in dB - more positive is better</li>
                    <li>• Frequency dependent - degrades at higher frequencies</li>
                    <li>• Power Sum NEXT (PSNEXT) considers all pair combinations</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Alien Crosstalk (ANEXT)</h4>
                  <p className="text-gray-300 mb-2">
                    Interference between cables in a bundle. Most critical for Cat6A and higher performance cables.
                  </p>
                  <div className="bg-yellow-600/20 border border-yellow-400/30 p-3 rounded">
                    <p className="text-yellow-400 text-sm">
                      <strong>Important:</strong> ANEXT is the primary limitation for 10GBASE-T transmission over Cat6A. 
                      Proper cable separation and installation practices are essential.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bandwidth and Applications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                Bandwidth Limitations and Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Bandwidth limitations directly impact the types of applications and transmission speeds possible on each cable category.
              </p>

              <div className="overflow-x-auto">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Application Support Matrix</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="text-white font-medium">Category 5e (100MHz)</p>
                      <ul className="space-y-1 text-gray-300">
                        <li>• 100BASE-TX (100m)</li>
                        <li>• 1000BASE-T (100m)</li>
                        <li>• PoE/PoE+ capable</li>
                        <li>• Basic IP telephony</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-medium">Category 6 (250MHz)</p>
                      <ul className="space-y-1 text-gray-300">
                        <li>• All Cat5e applications</li>
                        <li>• 10GBASE-T (55m max)</li>
                        <li>• Enhanced PoE support</li>
                        <li>• Better future-proofing</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-medium">Category 6A (500MHz)</p>
                      <ul className="space-y-1 text-gray-300">
                        <li>• All lower cat applications</li>
                        <li>• 10GBASE-T (100m)</li>
                        <li>• PoE++ (up to 100W)</li>
                        <li>• Future 25/40G potential</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/20 border border-red-500/30 p-4 rounded-lg">
                <p className="text-red-300 font-semibold mb-2">Performance Degradation Factors:</p>
                <ul className="space-y-1 text-red-200 text-sm">
                  <li>• Bundle size and cable density</li>
                  <li>• Temperature elevation in enclosed spaces</li>
                  <li>• Poor termination and connection quality</li>
                  <li>• Excessive untwisting during installation</li>
                  <li>• Sharp bends exceeding minimum radius</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Testing and Verification */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Testing and Performance Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Proper testing ensures installed cables meet their rated performance specifications. 
                Different test levels provide varying degrees of verification.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Level I Testing (Basic)</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Wire map verification</li>
                    <li>• Length measurement</li>
                    <li>• Basic continuity tests</li>
                    <li>• Suitable for voice applications</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Level II Testing (Full)</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• All Level I tests plus:</li>
                    <li>• Insertion loss across frequency</li>
                    <li>• NEXT and FEXT measurements</li>
                    <li>• Return loss verification</li>
                    <li>• Required for data applications</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-green-300 font-semibold mb-2">Best Practice Testing:</p>
                <ul className="space-y-1 text-green-200 text-sm">
                  <li>• Test to one category higher than installed cable</li>
                  <li>• Perform tests at both ends of permanent links</li>
                  <li>• Include alien crosstalk testing for Cat6A installations</li>
                  <li>• Document all results for warranty compliance</li>
                  <li>• Retest after any remedial work</li>
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
              <SingleQuestionQuiz questions={sequentialQuestions} title="Performance Ratings Quiz" />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../data-cabling-module-2-section-2">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Cable Shielding
              </Button>
            </Link>
            <Link to="../data-cabling-module-2-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Next: Connectors &amp; Patch Panels
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule2Section3;