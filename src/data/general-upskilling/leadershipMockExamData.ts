/**
 * Leadership on Site Mock Exam Question Bank
 *
 * 200 questions covering all 5 modules with difficulty distribution.
 *
 * Categories (5):
 *   Leadership Foundations (40) | Leading Your Team (40) |
 *   Communication for Leaders (40) | Decision-Making & Problem-Solving (40) | Leading on Site (40)
 *
 * Difficulty per category: ~14 basic, ~18 intermediate, ~8 advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const leadershipCategories = [
  "Leadership Foundations",
  "Leading Your Team",
  "Communication for Leaders",
  "Decision-Making & Problem-Solving",
  "Leading on Site"
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const leadershipMockExamConfig: MockExamConfig = {
  examId: 'leadership-on-site',
  examTitle: 'Leadership on Site Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/leadership-on-site',
  categories: leadershipCategories
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomLeadershipExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(leadershipQuestionBank, numQuestions, leadershipCategories);
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const leadershipQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // LEADERSHIP FOUNDATIONS — 40 questions (id 1–40)
  // =======================================================================
{
  id: 1,
  question: "What is the primary difference between leadership and management according to Kotter's framework?",
  options: ["Leadership focuses on maintaining systems while management creates change", "Leadership establishes direction while management focuses on planning and budgeting", "Leadership controls people while management inspires them", "Leadership is about short-term goals while management is long-term"],
  correctAnswer: 1,
  explanation: "Kotter's framework clearly distinguishes that leadership is about establishing direction and aligning people, whilst management focuses on planning, budgeting, and controlling resources. Leadership creates the vision for change, whereas management maintains existing systems and processes.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 2,
  question: "On a construction site, which activity best demonstrates leadership rather than management?",
  options: ["Scheduling electricians for the week's installation work", "Tracking material deliveries and updating the inventory system", "Inspiring the team to adopt new safety practices after a near-miss incident", "Completing timesheets and submitting them to payroll"],
  correctAnswer: 2,
  explanation: "Inspiring the team to embrace new safety practices demonstrates leadership by creating vision and driving change. The other options are all management activities focused on planning, organising, and controlling day-to-day operations rather than inspiring transformation.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 3,
  question: "According to Warren Bennis, what is the key distinction between managers and leaders?",
  options: ["Managers do things right, leaders do the right things", "Managers work alone, leaders work in teams", "Managers focus on people, leaders focus on tasks", "Managers are born, leaders are made"],
  correctAnswer: 0,
  explanation: "Bennis famously stated that 'managers do things right, leaders do the right things', highlighting that management is about efficiency and execution whilst leadership is about effectiveness and direction. This distinction emphasises that leaders focus on making strategic choices about what should be done, not just how to do it well.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 4,
  question: "Which of Fayol's five functions of management focuses on ensuring activities align with plans?",
  options: ["Planning", "Organising", "Commanding", "Controlling"],
  correctAnswer: 3,
  explanation: "Controlling is the function that involves monitoring performance and ensuring activities align with plans, making corrections when necessary. Fayol identified this as essential for ensuring organisational objectives are met through oversight and adjustment.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 5,
  question: "Daniel Goleman's Coercive leadership style is characterised by which approach?",
  options: ["Building consensus through team input", "Demanding immediate compliance through clear direction", "Developing people through coaching and feedback", "Creating harmony and building emotional bonds"],
  correctAnswer: 1,
  explanation: "The Coercive style demands immediate compliance and is directive in nature, with leaders telling people what to do rather than asking for input. Goleman notes this style can be effective in crisis situations but can damage morale if overused.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 6,
  question: "When would the Authoritative leadership style be most appropriate on a construction site?",
  options: ["When the team is highly experienced and knows exactly what to do", "When morale is low and relationships need repairing", "When a new site manager needs to establish clear direction for an uncertain project", "When developing an apprentice who needs detailed coaching"],
  correctAnswer: 2,
  explanation: "The Authoritative style is most effective when clear direction is needed and people are uncertain about the path forward. This 'follow me' approach works well when establishing vision and direction, particularly in situations requiring decisive leadership to mobilise a team towards new goals.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 7,
  question: "Which leadership style focuses on creating harmony and building emotional bonds within the team?",
  options: ["Pacesetting", "Affiliative", "Democratic", "Coaching"],
  correctAnswer: 1,
  explanation: "The Affiliative style prioritises people and relationships, creating harmony through emotional connection and emphasising that 'people come first'. This style is particularly useful when building team cohesion, healing rifts, or motivating people during stressful periods.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 8,
  question: "In Hersey-Blanchard Situational Leadership, the S1 (Telling) style is most appropriate for which development level?",
  options: ["D1 - Low competence, high commitment", "D2 - Some competence, low commitment", "D3 - High competence, variable commitment", "D4 - High competence, high commitment"],
  correctAnswer: 0,
  explanation: "S1 (Telling) is designed for D1 individuals who are enthusiastic beginners with low competence but high commitment. These team members need clear, specific instructions and close supervision because they lack the skills to work independently, though they're motivated to learn.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Situational Leadership",
  category: "Leadership Foundations"
},
{
  id: 9,
  question: "What does the 'Open' quadrant in the Johari Window represent?",
  options: ["Information known to others but unknown to yourself", "Information known to both yourself and others", "Information unknown to both yourself and others", "Information known to yourself but hidden from others"],
  correctAnswer: 1,
  explanation: "The Open quadrant contains information that is known to both you and others, representing the area of shared understanding and transparency. Expanding this quadrant through self-disclosure and feedback improves communication and builds trust within teams.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Self-Awareness",
  category: "Leadership Foundations"
},
{
  id: 10,
  question: "Which Belbin Team Role is characterised by being disciplined, reliable, and turning ideas into practical actions?",
  options: ["Plant", "Implementer", "Completer Finisher", "Resource Investigator"],
  correctAnswer: 1,
  explanation: "The Implementer role is defined by being practical, reliable, and efficient at turning ideas and plans into concrete actions. Implementers are disciplined workers who get things done systematically and are essential for translating concepts into reality on site.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Self-Awareness",
  category: "Leadership Foundations"
},
{
  id: 11,
  question: "What is a common symptom of imposter syndrome during the mate-to-manager transition?",
  options: ["Overconfidence in decision-making abilities", "Feeling like you don't deserve your position despite evidence of competence", "Immediately establishing strong boundaries with former peers", "Complete comfort with the new leadership identity"],
  correctAnswer: 1,
  explanation: "Imposter syndrome manifests as persistent self-doubt and feeling like a fraud despite objective evidence of competence and success. This is particularly common during the mate-to-manager transition when individuals struggle to internalise their new role and may attribute their promotion to luck rather than capability.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Mate-to-Manager Transition",
  category: "Leadership Foundations"
},
{
  id: 12,
  question: "During the first 90 days as a new site supervisor, what should be your primary focus?",
  options: ["Immediately implementing major changes to prove your worth", "Learning the operation, building relationships, and understanding the culture", "Maintaining exactly the same approach you had as a tradesperson", "Avoiding all contact with senior management until you're fully settled"],
  correctAnswer: 1,
  explanation: "The first 90 days should focus on learning, listening, and building relationships before making significant changes. Understanding the existing culture, processes, and team dynamics allows you to make informed decisions later and builds the credibility needed to lead effectively.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Mate-to-Manager Transition",
  category: "Leadership Foundations"
},
{
  id: 13,
  question: "According to John Maxwell, what is the essence of leadership?",
  options: ["Having formal authority over others", "Being the most technically skilled person on the team", "Influence - nothing more, nothing less", "Managing resources efficiently"],
  correctAnswer: 2,
  explanation: "Maxwell defines leadership as influence, emphasising that true leadership isn't about position or technical expertise but about the ability to influence others towards a goal. This perspective highlights that anyone can lead regardless of their formal role if they can positively influence those around them.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 14,
  question: "Why is setting boundaries important during the mate-to-manager transition?",
  options: ["To prove you're better than your former peers", "To maintain professional relationships whilst establishing your new role and responsibilities", "To completely isolate yourself from the team", "To avoid having to make any difficult decisions"],
  correctAnswer: 1,
  explanation: "Setting appropriate boundaries allows you to maintain positive professional relationships with former peers whilst clearly establishing your new responsibilities and authority. Healthy boundaries prevent role confusion, ensure respect for your position, and allow you to fulfil your leadership duties without compromising relationships.",
  section: "Module 1",
  difficulty: "basic",
  topic: "Mate-to-Manager Transition",
  category: "Leadership Foundations"
},
{
  id: 15,
  question: "Your experienced team is resisting a new installation methodology. They're competent but lack motivation. Which Hersey-Blanchard style should you use?",
  options: ["S1 (Telling) - Give clear instructions and supervise closely", "S2 (Selling) - Explain decisions and provide opportunity for clarification", "S3 (Participating) - Share decision-making and facilitate their input", "S4 (Delegating) - Turn over responsibility and let them work independently"],
  correctAnswer: 2,
  explanation: "S3 (Participating) is appropriate for D3 individuals who have high competence but variable commitment. By sharing decision-making and facilitating their involvement, you can leverage their expertise whilst rebuilding their motivation through collaboration and shared ownership of the new approach.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Situational Leadership",
  category: "Leadership Foundations"
},
{
  id: 16,
  question: "A site emergency requires immediate evacuation. Which Goleman leadership style is most appropriate, and why?",
  options: ["Democratic - Build consensus about the evacuation route", "Coercive - Demand immediate compliance for everyone's safety", "Coaching - Use the moment to develop people's emergency response skills", "Affiliative - Focus on keeping everyone calm and harmonious"],
  correctAnswer: 1,
  explanation: "The Coercive style is most appropriate in crisis situations requiring immediate action without discussion. Whilst this style can damage morale if overused, it's essential when safety is at immediate risk and there's no time for consultation or consensus-building.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 17,
  question: "You've just been promoted from electrician to electrical supervisor. Three former peers are now on your team. What's the most effective approach to establishing authority?",
  options: ["Immediately assert dominance by assigning them the least desirable tasks", "Continue exactly as before to maintain friendships and avoid conflict", "Acknowledge the transition openly, set clear expectations, and maintain professional boundaries", "Avoid giving them any direction and focus only on new team members"],
  correctAnswer: 2,
  explanation: "Openly acknowledging the transition demonstrates maturity and self-awareness, whilst setting clear expectations and boundaries establishes your new role without damaging relationships. This approach respects the history you share whilst firmly establishing the changed dynamic required for effective leadership.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Mate-to-Manager Transition",
  category: "Leadership Foundations"
},
{
  id: 18,
  question: "According to Kotter, which combination represents leadership activities rather than management activities?",
  options: ["Planning budgets, organising staff, controlling progress", "Establishing direction, aligning people, motivating and inspiring", "Scheduling work, allocating resources, problem-solving", "Setting deadlines, monitoring compliance, reporting results"],
  correctAnswer: 1,
  explanation: "Kotter identifies establishing direction, aligning people, and motivating/inspiring as core leadership activities that create change and movement. Management activities focus on maintaining order through planning, organising, and controlling, whilst leadership activities focus on creating change through vision and inspiration.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 19,
  question: "A team member consistently delivers quality work but has become withdrawn and seems to lack confidence. Which leadership style would best address this situation?",
  options: ["Pacesetting - Set high standards to push them harder", "Coercive - Demand they improve their attitude immediately", "Coaching - Invest time in developing their confidence and skills", "Democratic - Ask the whole team to vote on how to handle it"],
  correctAnswer: 2,
  explanation: "The Coaching style is ideal for this situation as it focuses on long-term professional development and helping people identify their strengths. Through one-to-one dialogue and supportive feedback, you can help rebuild their confidence whilst maintaining their strong technical performance.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 20,
  question: "In the Johari Window, what is the benefit of reducing your 'Hidden' quadrant through self-disclosure?",
  options: ["It allows you to hide more effectively from the team", "It increases the 'Open' quadrant, improving trust and communication", "It eliminates the 'Blind' quadrant automatically", "It prevents others from giving you feedback"],
  correctAnswer: 1,
  explanation: "Appropriately reducing the Hidden quadrant through self-disclosure expands the Open quadrant, which improves mutual understanding and trust within the team. Sharing relevant information about yourself builds authenticity and encourages others to be more open, strengthening relationships and communication.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Self-Awareness",
  category: "Leadership Foundations"
},
{
  id: 21,
  question: "You've identified through self-assessment that you're a 'Plant' in Belbin's model (creative, unorthodox thinker). What allowable weakness should you be aware of?",
  options: ["Being too focused on practical implementation details", "Neglecting to communicate ideas effectively and becoming overly preoccupied with details", "Being excessively concerned with relationships and harmony", "Lacking creativity when solving problems"],
  correctAnswer: 1,
  explanation: "Plants are creative thinkers but their allowable weakness includes poor communication of ideas and becoming preoccupied with details at the expense of practical application. Understanding this weakness allows you to compensate by partnering with Implementers or Resource Investigators who can translate your ideas into actionable plans.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Self-Awareness",
  category: "Leadership Foundations"
},
{
  id: 22,
  question: "An apprentice electrician is keen but keeps making basic mistakes. Which Hersey-Blanchard style and why?",
  options: ["S4 (Delegating) - Let them learn from their mistakes independently", "S3 (Participating) - Share decision-making to build their confidence", "S1 (Telling) - Provide clear, specific instructions with close supervision", "S2 (Selling) - Explain your reasoning and let them ask questions"],
  correctAnswer: 2,
  explanation: "S1 (Telling) is appropriate for D1 individuals who are enthusiastic but lack competence. The apprentice needs clear, directive guidance and close supervision to develop fundamental skills safely. At this stage, participation or delegation would be inappropriate and potentially dangerous on site.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Situational Leadership",
  category: "Leadership Foundations"
},
{
  id: 23,
  question: "Which statement best describes the relationship between leadership and management according to Kotter?",
  options: ["Leadership and management are the same thing with different names", "Leadership is more important than management in all situations", "Both leadership and management are necessary; they're complementary systems", "Management should be eliminated in favour of pure leadership"],
  correctAnswer: 2,
  explanation: "Kotter emphasises that both leadership and management are necessary and complementary. Management provides stability, order, and consistency, whilst leadership produces change and movement. Effective organisations need both to maintain current operations whilst adapting to changing environments.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 24,
  question: "The Pacesetting leadership style is characterised by which approach, and what's its primary risk?",
  options: ["Leading by example with high standards; risk is overwhelming and demoralising the team", "Building harmony; risk is avoiding difficult conversations", "Demanding compliance; risk is damaging morale", "Coaching individuals; risk is taking too much time"],
  correctAnswer: 0,
  explanation: "Pacesetting leaders set high standards and lead by example, expecting the team to follow their lead. The primary risk is that this style can overwhelm team members who can't match the leader's pace, leading to burnout and decreased morale if overused, particularly with less experienced team members.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 25,
  question: "After requesting feedback, a colleague tells you that you often interrupt others during site meetings. This represents information from which Johari Window quadrant?",
  options: ["Open - because you were already aware of this habit", "Hidden - because you've been deliberately concealing it", "Blind - because you weren't aware but others could see it", "Unknown - because nobody knew about this behaviour"],
  correctAnswer: 2,
  explanation: "This is information from the Blind quadrant - things others can see about you that you cannot see yourself. Receiving this feedback moves the information into the Open quadrant, increasing self-awareness and allowing you to address the behaviour to improve your leadership effectiveness.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Self-Awareness",
  category: "Leadership Foundations"
},
{
  id: 26,
  question: "During your first month as site supervisor, you notice processes that could be improved. What's the best approach?",
  options: ["Implement changes immediately to demonstrate your leadership capability", "Wait until you fully understand why current processes exist before suggesting changes", "Ignore the issues and maintain the status quo indefinitely", "Criticise the previous supervisor's approach to establish your authority"],
  correctAnswer: 1,
  explanation: "Understanding existing processes and their rationale before implementing changes demonstrates wisdom and respect for organisational knowledge. Rushing to change things without understanding context can undermine credibility and damage relationships. The first 90 days should focus on learning before leading major change initiatives.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Mate-to-Manager Transition",
  category: "Leadership Foundations"
},
{
  id: 27,
  question: "A skilled tradesperson has become complacent and is cutting corners. Which leadership style combination would be most effective?",
  options: ["Coercive to demand immediate compliance, followed by Affiliative to repair the relationship", "Democratic to get team consensus, followed by Delegating to empower them", "Affiliative to maintain harmony, avoiding any confrontation about standards", "Pacesetting to show them how it's done, followed by Coaching to develop better habits"],
  correctAnswer: 3,
  explanation: "Pacesetting demonstrates the standard expected through your own example, whilst Coaching provides the developmental support to help them understand why standards matter and how to maintain them. This combination addresses both the immediate performance issue and the underlying attitude problem without being purely punitive.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 28,
  question: "You recognise you have imposter syndrome as a new supervisor. What's the most constructive response?",
  options: ["Fake confidence by never admitting uncertainty or asking for help", "Acknowledge the feelings whilst focusing on evidence of your competence and seeking mentorship", "Resign from the position as you're clearly not qualified", "Overcompensate by being overly authoritarian to prove yourself"],
  correctAnswer: 1,
  explanation: "Acknowledging imposter syndrome whilst rationally evaluating your actual competence and achievements helps combat the irrational self-doubt. Seeking mentorship and support demonstrates self-awareness and commitment to growth, turning a challenge into a development opportunity rather than letting it undermine your effectiveness.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Mate-to-Manager Transition",
  category: "Leadership Foundations"
},
{
  id: 29,
  question: "Which Belbin role would be most valuable when your electrical team faces a complex technical problem requiring innovative solutions?",
  options: ["Completer Finisher - to ensure all details are perfect", "Plant - to generate creative and unorthodox solutions", "Implementer - to create practical action plans", "Team Worker - to maintain group harmony"],
  correctAnswer: 1,
  explanation: "The Plant role excels at creative problem-solving and generating innovative ideas when faced with complex challenges. Whilst other roles are valuable for implementation and refinement, the Plant's strength in unorthodox thinking makes them particularly suited to breaking through difficult technical problems that require fresh approaches.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Self-Awareness",
  category: "Leadership Foundations"
},
{
  id: 30,
  question: "In Hersey-Blanchard's model, what characterises a D2 (Disillusioned Learner) team member?",
  options: ["High competence and high commitment", "Low competence and high commitment", "Some competence but low commitment", "High competence but variable commitment"],
  correctAnswer: 2,
  explanation: "D2 individuals have developed some competence but their initial enthusiasm has waned, resulting in low commitment. This often occurs after the 'honeymoon period' when they've encountered difficulties and their confidence has been shaken, requiring an S2 (Selling) approach with both direction and support.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Situational Leadership",
  category: "Leadership Foundations"
},
{
  id: 31,
  question: "What's the fundamental difference between doing 'things right' (management) and doing 'the right things' (leadership) on a construction site?",
  options: ["Management focuses on safety whilst leadership ignores it", "Management ensures efficient execution whilst leadership determines strategic direction and priorities", "Management is unnecessary if you have good leadership", "Leadership is about being liked whilst management is about being feared"],
  correctAnswer: 1,
  explanation: "Management ensures efficient and correct execution of established processes (doing things right), whilst leadership determines which activities and directions will best serve the project's goals (doing the right things). Both are essential - leadership sets the direction, management ensures efficient progress in that direction.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 32,
  question: "When would the Democratic leadership style be least appropriate on a construction site?",
  options: ["When planning next quarter's training programme with experienced supervisors", "During an emergency situation requiring immediate decisive action", "When seeking input on improving site welfare facilities", "When developing a new approach to material waste reduction"],
  correctAnswer: 1,
  explanation: "The Democratic style, whilst valuable for building buy-in and leveraging team expertise, is inappropriate in emergency situations where immediate action is required without time for consultation. In crises, the Coercive style's directive approach is more suitable to ensure rapid response and safety.",
  section: "Module 1",
  difficulty: "intermediate",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 33,
  question: "A highly competent team member who previously performed well is now showing variable commitment and questioning decisions. How should you diagnose and respond using Hersey-Blanchard?",
  options: ["They've regressed to D1; use S1 (Telling) with close supervision", "They're displaying D3 characteristics; use S3 (Participating) to re-engage through collaboration", "They've reached D4; use S4 (Delegating) to give them more autonomy", "They're at D2; use S2 (Selling) with directive support"],
  correctAnswer: 1,
  explanation: "This describes a D3 individual - high competence but variable commitment. The S3 (Participating) style is appropriate because it leverages their expertise through collaboration whilst addressing the commitment issue through involvement and shared decision-making. This re-engages them without insulting their competence through unnecessary direction.",
  section: "Module 1",
  difficulty: "advanced",
  topic: "Situational Leadership",
  category: "Leadership Foundations"
},
{
  id: 34,
  question: "You've been using self-assessment tools and feedback to expand your 'Open' quadrant in the Johari Window. How does this specifically improve your leadership effectiveness in practice?",
  options: ["It eliminates the need for further self-development", "It allows you to manipulate others more effectively by understanding their perceptions", "It increases mutual understanding, enables you to address blind spots, and builds authentic relationships based on transparency", "It means you should share all personal information regardless of relevance or appropriateness"],
  correctAnswer: 2,
  explanation: "Expanding the Open quadrant through balanced self-disclosure and feedback increases mutual understanding and trust, addresses blind spots that could undermine your effectiveness, and builds authentic relationships. This transparency allows for more honest communication, better collaboration, and reduced misunderstanding, whilst maintaining appropriate professional boundaries.",
  section: "Module 1",
  difficulty: "advanced",
  topic: "Self-Awareness",
  category: "Leadership Foundations"
},
{
  id: 35,
  question: "Your team comprises a Plant, two Implementers, and a Completer Finisher. A complex project requires both innovation and flawless execution. How should you leverage these Belbin roles effectively?",
  options: ["Have the Plant lead the entire project as they're most creative", "Isolate each role to work independently in their strength areas", "Engage the Plant early for innovative solutions, transition to Implementers for practical execution, and use the Completer Finisher for final quality assurance", "Focus only on the Implementers as they're most practical"],
  correctAnswer: 2,
  explanation: "Effective team leadership means sequencing and integrating diverse Belbin strengths. The Plant generates innovative solutions during planning, Implementers translate ideas into practical action during execution, and the Completer Finisher ensures nothing is overlooked during finalisation. Understanding these complementary strengths allows you to orchestrate contributions at the right project phases.",
  section: "Module 1",
  difficulty: "advanced",
  topic: "Self-Awareness",
  category: "Leadership Foundations"
},
{
  id: 36,
  question: "Analyse this scenario: You're a new electrical supervisor facing a quality crisis inherited from your predecessor. The team is skilled but demoralised, and senior management expects immediate improvement. Which leadership style sequence would be most effective?",
  options: ["Coercive throughout to demand compliance and restore standards immediately", "Democratic to build consensus, then Pacesetting to demonstrate standards", "Authoritative to establish clear vision and direction, then Affiliative to rebuild morale, followed by Coaching for sustained improvement", "Affiliative only to avoid further damaging morale"],
  correctAnswer: 2,
  explanation: "This complex situation requires multiple styles in sequence. Authoritative establishes the vision and direction needed to address the crisis and give the team confidence in the new direction. Affiliative then repairs damaged morale and relationships. Finally, Coaching ensures sustainable improvement through individual development. This sequence addresses immediate needs whilst building long-term capability.",
  section: "Module 1",
  difficulty: "advanced",
  topic: "Leadership Styles",
  category: "Leadership Foundations"
},
{
  id: 37,
  question: "During the mate-to-manager transition, you notice you're avoiding giving corrective feedback to former peers. What underlying issue does this suggest, and how should you address it?",
  options: ["This is appropriate - friends shouldn't criticise each other professionally", "This suggests incomplete role transition and unclear boundaries; address through explicit role clarification and developing coaching skills", "This indicates you should never have been promoted", "This is normal and will resolve itself without any intervention"],
  correctAnswer: 1,
  explanation: "Avoiding necessary corrective feedback indicates incomplete transition to the manager identity and unclear professional boundaries. Address this by explicitly acknowledging the role change, establishing clear expectations about professional standards, and developing your coaching skills to deliver feedback constructively. Failing to address this undermines your authority and the team's performance.",
  section: "Module 1",
  difficulty: "advanced",
  topic: "Mate-to-Manager Transition",
  category: "Leadership Foundations"
},
{
  id: 38,
  question: "How does understanding Kotter's distinction between leadership and management inform your approach during organisational change on a construction site?",
  options: ["You should focus exclusively on leadership activities and ignore management", "You should recognise that change requires leadership to establish vision and direction, whilst management maintains stability in unchanged areas - both are necessary simultaneously", "Management becomes irrelevant during change periods", "Leadership and management are interchangeable during change"],
  correctAnswer: 1,
  explanation: "Kotter's framework reveals that successful change requires both systems working in concert. Leadership creates the vision, aligns people, and drives change in targeted areas, whilst management maintains stability and efficiency in unchanged areas. Neglecting either leads to chaos (no management) or stagnation (no leadership). Effective site leaders understand when each system is required.",
  section: "Module 1",
  difficulty: "advanced",
  topic: "Leadership vs Management",
  category: "Leadership Foundations"
},
{
  id: 39,
  question: "A team member exhibits high competence and commitment (D4) but you notice their performance declining. Using Hersey-Blanchard, what might be happening and how should you respond?",
  options: ["Continue with S4 (Delegating) as they're still D4", "Immediately move to S1 (Telling) to correct the decline", "Diagnose whether they've regressed to D3 (competence maintained but commitment wavering) and adjust to S3 (Participating) to re-engage them", "Use S2 (Selling) as they must be at D2 now"],
  correctAnswer: 2,
  explanation: "Performance decline in a previously D4 individual often indicates regression to D3 - they maintain competence but commitment is wavering, possibly due to boredom, lack of challenge, or external factors. S3 (Participating) re-engages them through collaboration and shared decision-making, addressing the commitment issue without insulting their competence. Simply continuing to delegate ignores the problem.",
  section: "Module 1",
  difficulty: "advanced",
  topic: "Situational Leadership",
  category: "Leadership Foundations"
},
{
  id: 40,
  question: "Three months into your first supervisory role, you're still experiencing imposter syndrome despite objectively successful performance. How does this relate to self-awareness, and what's the most developmentally mature response?",
  options: ["Imposter syndrome indicates you lack the competence for the role and should step down", "This is a blind spot (Johari Window) requiring feedback from others to recognise your actual capability, combined with conscious reflection on evidence of success", "Imposter syndrome is permanent and cannot be addressed", "You should hide these feelings completely as they indicate weakness"],
  correctAnswer: 1,
  explanation: "Imposter syndrome often represents a blind spot where you cannot see your own competence that others observe. Using the Johari Window framework, seeking feedback moves this into the Open quadrant, increasing self-awareness. Combining others' perspectives with conscious evaluation of objective evidence helps reconcile the gap between your self-perception and reality, supporting more accurate self-assessment and confidence.",
  section: "Module 1",
  difficulty: "advanced",
  topic: "Mate-to-Manager Transition",
  category: "Leadership Foundations"
},

  // =======================================================================
  // LEADING YOUR TEAM — 40 questions (id 41–80)
  // =======================================================================
{
  id: 41,
  question: "What is the foundation of Lencioni's model of team dysfunction?",
  options: ["Lack of commitment", "Fear of conflict", "Absence of trust", "Avoidance of accountability"],
  correctAnswer: 2,
  explanation: "Absence of trust is the base of Lencioni's pyramid model. Without trust, teams cannot engage in healthy conflict, commit to decisions, or hold each other accountable. Trust forms the foundation upon which all other team behaviours are built.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 42,
  question: "In the trust equation (Credibility + Reliability + Intimacy) / Self-Orientation, what does 'self-orientation' represent?",
  options: ["How focused you are on your own interests rather than others'", "Your ability to understand yourself", "Your personal confidence level", "Your independence in decision-making"],
  correctAnswer: 0,
  explanation: "Self-orientation is the denominator in the trust equation because high self-orientation decreases trust. When team members perceive you're focused primarily on your own agenda rather than their needs or the team's success, trust erodes regardless of your other qualities.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 43,
  question: "What is 'vulnerability-based trust' in a team context?",
  options: ["Sharing personal problems with the team", "Admitting mistakes and asking for help without fear", "Being emotional during team meetings", "Avoiding difficult conversations"],
  correctAnswer: 1,
  explanation: "Vulnerability-based trust means team members can admit weaknesses, mistakes, and ask for help without fear of judgement or punishment. This creates psychological safety where people focus on solving problems rather than protecting their image.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 44,
  question: "On a construction site, which behaviour best demonstrates building trust through reliability?",
  options: ["Always arriving exactly on time every day", "Following through on commitments like ordering materials when promised", "Being friendly with all subcontractors", "Sharing your mobile number with the team"],
  correctAnswer: 1,
  explanation: "Reliability means consistently doing what you say you'll do. Following through on commitments, like ensuring materials arrive when promised, demonstrates that team members can depend on you. This predictability builds trust over time more than any single grand gesture.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 45,
  question: "Which scenario shows a supervisor creating psychological safety on site?",
  options: ["Punishing anyone who makes a mistake to prevent future errors", "Encouraging apprentices to ask questions about procedures they don't understand", "Only praising perfect work to maintain high standards", "Keeping all decisions private to avoid confusion"],
  correctAnswer: 1,
  explanation: "Psychological safety means team members feel safe taking interpersonal risks, including asking questions. When apprentices know they won't be ridiculed for not knowing something, they're more likely to ask rather than make dangerous assumptions. This prevents errors and builds competence.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 46,
  question: "In the Skill-Will Matrix, what is the appropriate leadership approach for someone with high skill but low will?",
  options: ["Direct - tell them exactly what to do", "Guide - explain and supervise closely", "Excite - motivate and explain the purpose", "Delegate - give autonomy and trust"],
  correctAnswer: 2,
  explanation: "High skill but low will means the person can do the task but lacks motivation. The 'excite' approach focuses on reigniting their motivation by connecting the work to purpose, recognising their contributions, or addressing demotivation factors. They don't need instruction, they need inspiration.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},
{
  id: 47,
  question: "Which task is most suitable for delegation to a competent team member?",
  options: ["Conducting a disciplinary meeting with a problematic worker", "Completing routine cable testing on a standard installation", "Making strategic decisions about project deadlines", "Handling a serious health and safety incident"],
  correctAnswer: 1,
  explanation: "Routine cable testing is a well-defined task with clear procedures that a competent electrician can complete independently. Tasks suitable for delegation are typically routine, have clear success criteria, and don't require authority that only supervisors hold, such as disciplinary matters or strategic decisions.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},
{
  id: 48,
  question: "What is the key difference between micromanagement and proper monitoring of delegated work?",
  options: ["Micromanagement involves daily check-ins, monitoring is weekly", "Micromanagement focuses on how work is done, monitoring focuses on outcomes and support needs", "Micromanagement is for junior staff, monitoring is for senior staff", "There is no real difference, both are necessary"],
  correctAnswer: 1,
  explanation: "Micromanagement dictates exactly how work should be done and constantly checks progress, stifling autonomy. Proper monitoring checks on outcomes, offers support when needed, and trusts the person to determine the method. This maintains accountability whilst respecting the team member's competence and building their confidence.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},
{
  id: 49,
  question: "According to Maslow's Hierarchy of Needs, which need must be satisfied before a worker focuses on social belonging?",
  options: ["Self-actualisation", "Esteem needs", "Safety needs", "Cognitive needs"],
  correctAnswer: 2,
  explanation: "Maslow's hierarchy is a pyramid where lower needs must be satisfied before higher ones become motivating. Safety needs (including job security, safe working conditions, predictable income) come before social belonging. A site worker worried about safety or job security won't be motivated by team social events.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 50,
  question: "In Herzberg's Two-Factor Theory, which is a 'hygiene factor'?",
  options: ["Recognition for good work", "Opportunities for advancement", "Fair pay and working conditions", "Challenging and interesting tasks"],
  correctAnswer: 2,
  explanation: "Hygiene factors (like pay, conditions, job security) don't motivate when present but cause dissatisfaction when absent. Motivators (recognition, advancement, interesting work) actually drive satisfaction and performance. Fair pay prevents dissatisfaction but doesn't actively motivate beyond a baseline.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 51,
  question: "According to Daniel Pink's Drive, which is NOT one of the three key intrinsic motivators?",
  options: ["Autonomy", "Mastery", "Financial reward", "Purpose"],
  correctAnswer: 2,
  explanation: "Pink identifies autonomy (control over your work), mastery (getting better at skills), and purpose (meaningful contribution) as the three intrinsic motivators. Financial reward is an extrinsic motivator that has limited long-term effectiveness compared to these internal drivers of motivation and performance.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 52,
  question: "What does the 'S' stand for in the SBI feedback model?",
  options: ["Standard", "Situation", "Specific", "Statement"],
  correctAnswer: 1,
  explanation: "SBI stands for Situation-Behaviour-Impact. The Situation provides context (when and where), Behaviour describes what was observed objectively, and Impact explains the effect. Starting with the specific situation grounds the feedback in concrete circumstances rather than vague generalisations.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 53,
  question: "When giving positive feedback, what is the most important timing principle?",
  options: ["Always wait until the end of the week to summarise all good work", "Give it immediately or as soon as practically possible after the behaviour", "Save it for annual appraisals to make them more positive", "Only give it when someone asks how they're doing"],
  correctAnswer: 1,
  explanation: "Immediate or near-immediate positive feedback is most effective because it clearly links the recognition to the specific behaviour. This reinforces what good performance looks like and increases the likelihood the behaviour will be repeated. Delayed feedback loses its connection and impact.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 54,
  question: "What is a 'growth mindset' approach to giving corrective feedback?",
  options: ["Focusing on innate ability: 'You're just not good at this'", "Focusing on effort and learning: 'Here's how you can develop this skill'", "Avoiding feedback to maintain confidence", "Only giving feedback to high performers"],
  correctAnswer: 1,
  explanation: "A growth mindset approach treats abilities as developable through effort and learning, not fixed traits. Corrective feedback framed as development opportunity ('Here's how to improve') maintains motivation and confidence, whereas fixed mindset language ('You're not good at this') suggests inability to change and undermines confidence.",
  section: "Module 2",
  difficulty: "basic",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 55,
  question: "Your electrician admits they made an error in a circuit design that will cost time to fix. According to trust-building principles, what is your best response?",
  options: ["Thank them for raising it immediately, work together on the fix, and discuss how to prevent it", "Document the error formally and issue a warning", "Fix it yourself without discussion to avoid embarrassment", "Praise them excessively to compensate for the mistake"],
  correctAnswer: 0,
  explanation: "Responding constructively to vulnerability (admitting mistakes) reinforces vulnerability-based trust and psychological safety. Acknowledging their honesty, collaborating on the solution, and focusing on learning prevents future similar errors. Punitive responses discourage future honesty, leading to hidden problems.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 56,
  question: "A new apprentice watches you carefully but seems reluctant to approach with questions. Which trust equation component are they likely perceiving as low?",
  options: ["Credibility", "Reliability", "Intimacy", "Self-orientation"],
  correctAnswer: 2,
  explanation: "Intimacy in the trust equation refers to how safe people feel being open with you. A reluctance to approach suggests low intimacy – they don't feel comfortable being vulnerable (asking questions, admitting confusion). Building intimacy requires approachability, demonstrating that questions are welcome, and showing empathy.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 57,
  question: "You've promised to resolve a materials delay by Wednesday, but discover it won't arrive until Friday. What trust-building action should you take?",
  options: ["Say nothing and hope the team doesn't notice", "Inform the team immediately, explain the situation, and adjust plans together", "Blame the supplier in front of the team", "Wait until Wednesday to tell them"],
  correctAnswer: 1,
  explanation: "Reliability is maintained not by never facing problems, but by transparent communication and follow-through. Informing the team immediately shows you're tracking commitments, respect their time for replanning, and are honest about setbacks. This maintains and even builds trust despite the delay.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 58,
  question: "Which behaviour by a site supervisor most increases their 'self-orientation' score (decreasing trust)?",
  options: ["Taking credit for team successes while blaming team members for failures", "Working alongside the team on difficult tasks", "Asking team members for their input on decisions", "Admitting when they don't know something"],
  correctAnswer: 0,
  explanation: "Taking credit whilst deflecting blame shows extreme self-orientation – prioritising your image over team recognition or learning. This dramatically decreases trust because the team perceives your agenda is self-protection, not collective success. Trust requires demonstrating you care about others' success and share both credit and responsibility.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 59,
  question: "An experienced electrician has become withdrawn and is doing minimum acceptable work. Using the Skill-Will Matrix, what has likely changed and what's your approach?",
  options: ["Skill decreased – use 'guide' approach with closer supervision", "Will decreased – use 'excite' approach to understand and address demotivation", "Both decreased – replace them immediately", "Nothing changed – they're just having a bad week, ignore it"],
  correctAnswer: 1,
  explanation: "An experienced worker doing minimum work suggests capability remains but motivation has dropped – high skill, low will. The 'excite' approach means investigating what's causing demotivation (lack of challenge, personal issues, feeling undervalued) and addressing it. Micromanaging someone competent will worsen motivation.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},
{
  id: 60,
  question: "You're delegating emergency lighting testing to a team member. What represents the 'Level 5' delegation level: 'Investigate and advise, then we'll decide together'?",
  options: ["They test, identify issues, recommend solutions, and you jointly decide the action plan", "They complete testing exactly as you specify with no decisions", "They handle everything including authorising repair costs", "They test but you inspect every light yourself"],
  correctAnswer: 0,
  explanation: "Level 5 delegation involves the team member doing the investigation and analysis (testing, identifying problems, researching solutions) then collaborating on the decision. This develops their judgement whilst you retain final authority on significant actions, striking balance between development and control.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},
{
  id: 61,
  question: "You've delegated PAT testing to a qualified electrician. What monitoring approach is appropriate?",
  options: ["Check every test result before they move to the next item", "Agree on completion deadline and check-in points, review final results and address any questions", "Don't check anything, delegation means complete hands-off", "Observe them continuously but don't interfere"],
  correctAnswer: 1,
  explanation: "Appropriate monitoring for a competent person involves setting clear expectations (deadlines, standards), establishing check-in points for support, and reviewing outcomes. This maintains accountability and provides assistance if needed whilst granting autonomy in execution. Constant checking is micromanagement; no checking is abdication.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},
{
  id: 62,
  question: "An apprentice eagerly volunteers for a complex installation task beyond their qualification level. What's the appropriate delegation decision?",
  options: ["Delegate it fully to reward their enthusiasm", "Decline and explain the legal/safety requirements, but identify a stretch task within their capability", "Let them try but watch constantly and take over when they struggle", "Assign it to someone else without explanation"],
  correctAnswer: 1,
  explanation: "Enthusiasm is valuable but doesn't override competence requirements, especially in regulated work. Declining whilst explaining the reasons respects their motivation, maintains safety/legal compliance, and offering an alternative stretch task channels their willingness to learn appropriately. This builds skill and will together.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},
{
  id: 63,
  question: "Your team complains about poor site facilities (cold welfare unit, broken kettle). According to Herzberg, what should you understand?",
  options: ["Fixing these will massively increase motivation and productivity", "These are hygiene factors – fixing them prevents dissatisfaction but won't motivate high performance", "These complaints mean your team lacks purpose and mastery", "Ignore them as they're trivial compared to the real work"],
  correctAnswer: 1,
  explanation: "Site facilities are classic hygiene factors in Herzberg's model. Poor conditions cause dissatisfaction and complaints; adequate conditions are expected baseline but don't motivate. Fixing them stops dissatisfaction but to actually motivate performance, you need to address motivators like recognition, development, and meaningful work.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 64,
  question: "According to Maslow's hierarchy, a site worker who has been subjected to bullying by a subcontractor is unlikely to be motivated by which of the following?",
  options: ["Ensuring safe working conditions", "Providing job security assurances", "Offering opportunities to learn new advanced skills", "Addressing the bullying situation"],
  correctAnswer: 2,
  explanation: "Learning new skills addresses self-actualisation needs at the top of Maslow's pyramid. Someone experiencing bullying has unmet belonging and safety needs (lower on the pyramid), which must be resolved first. Until the bullying is addressed and they feel safe and accepted, higher-level development opportunities won't motivate them.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 65,
  question: "You notice a skilled electrician is demotivated despite good pay. According to Pink's 'Mastery', what might help?",
  options: ["Increase their hourly rate further", "Assign repetitive tasks they can do perfectly every time", "Provide training in new technologies or complex installations that stretch their abilities", "Reduce their responsibilities to decrease stress"],
  correctAnswer: 2,
  explanation: "Mastery is the drive to get better at something meaningful. Skilled workers often become demotivated by repetitive work that doesn't challenge them. Providing opportunities to develop new skills and tackle complex problems satisfies the mastery drive, which financial incentives alone cannot address.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 66,
  question: "Your electricians are frustrated doing repetitive socket installations. According to Pink's 'Purpose', what might improve motivation?",
  options: ["Explain how their work fits into the hospital project that will serve the community for decades", "Offer bonus payments for faster completion", "Rotate them to different repetitive tasks", "Tell them it's just a job, not a calling"],
  correctAnswer: 0,
  explanation: "Purpose is about connecting work to meaningful contribution beyond self-interest. Even repetitive tasks become more meaningful when workers understand the larger impact – in this case, their precision enables quality healthcare facilities. This intrinsic motivator is more sustainable than extrinsic rewards like bonuses.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 67,
  question: "Using the SBI model, which is the correct structure for feedback about incomplete documentation?",
  options: ["'You never finish your paperwork properly, you need to be more professional'", "'Yesterday's installation paperwork (S) was missing test results (B), which delayed handover and cost us penalty fees (I)'", "'Your documentation has impact on the project, the behaviour shows lack of care in situations requiring accuracy'", "'The project was delayed because you don't care about paperwork'"],
  correctAnswer: 1,
  explanation: "Option B correctly follows SBI structure: Situation (when/where – yesterday's paperwork), Behaviour (observable fact – missing test results), Impact (consequence – delayed handover, penalty fees). This is specific, objective, and actionable. The other options lack structure, make assumptions about intent, or combine elements incorrectly.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 68,
  question: "An apprentice completed their first solo termination perfectly. When should you give feedback, and why?",
  options: ["At their next formal review in three months to maintain professional boundaries", "Immediately or within the hour, to strongly link recognition to the specific behaviour", "At the end of the week with all accumulated feedback", "Don't mention it as they're expected to do quality work"],
  correctAnswer: 1,
  explanation: "Immediate positive feedback creates the strongest link between behaviour and recognition, making it clear what 'good' looks like and increasing likelihood of repetition. For an apprentice's milestone achievement, timely recognition also builds confidence and motivation. Delayed feedback loses this psychological connection and impact.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 69,
  question: "You need to give corrective feedback about a safety procedure violation. The worker responds 'I'm just not good with all these rules'. What's a growth mindset response?",
  options: ["'You're right, some people just aren't suited to following procedures'", "'Safety rules aren't optional, you need to be better at this'", "'Following procedures is a skill we can develop. Let's work out what would help you remember and apply them consistently'", "'Maybe you should consider a different career where safety isn't as important'"],
  correctAnswer: 2,
  explanation: "Growth mindset reframes ability as developable, not fixed. Responding with practical development support ('a skill we can develop', 'work out what would help') maintains accountability whilst rejecting the fixed mindset belief ('just not good at'). This preserves motivation and confidence whilst addressing the serious safety concern.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 70,
  question: "What is the key difference between positive and corrective feedback frequency best practice?",
  options: ["Positive should be rare to maintain its value, corrective should be frequent", "Both should only occur during formal reviews", "Positive should be frequent to reinforce good behaviour, corrective should be timely but constructive", "Corrective should be constant, positive should be annual"],
  correctAnswer: 2,
  explanation: "Research shows positive feedback should be frequent (even daily for some behaviours) to reinforce what good looks like and maintain motivation. Corrective feedback should be timely when issues occur but delivered constructively focused on learning. The ideal ratio is significantly more positive than corrective feedback to maintain engagement and trust.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 71,
  question: "During a team meeting, you admit you made a poor scheduling decision that's caused problems. Some team members seem surprised. What trust dynamic is this influencing?",
  options: ["You're demonstrating vulnerability-based trust, which may initially surprise but ultimately strengthens team psychological safety", "You're damaging your credibility and should avoid admitting mistakes publicly", "You're showing weakness that will undermine your authority permanently", "This has no effect on trust as mistakes are irrelevant to leadership"],
  correctAnswer: 0,
  explanation: "Leader vulnerability (admitting mistakes) is powerful for building vulnerability-based trust because it demonstrates that acknowledging errors is safe and expected. Initial surprise is common in low-trust cultures, but this behaviour creates psychological safety where the team focuses on solving problems rather than hiding them. This strengthens, not weakens, leadership credibility.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 72,
  question: "You notice two team members aren't communicating effectively. Using trust-building principles, what's your best intervention?",
  options: ["Immediately separate them to different parts of the site", "Mandate they work together and sort it out themselves", "Facilitate a conversation where each shares their perspective and concerns in a structured, safe environment", "Ignore it as interpersonal issues aren't your concern"],
  correctAnswer: 2,
  explanation: "Facilitating structured dialogue builds trust by creating psychological safety for both parties to share perspectives without judgment, identify misunderstandings, and find common ground. This addresses the root cause (lack of trust/understanding) rather than symptoms. Avoidance or forcing resolution without addressing underlying issues typically worsens team dysfunction.",
  section: "Module 2",
  difficulty: "intermediate",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 73,
  question: "A highly capable electrician is consistently negative and undermines team morale, though their technical work is excellent. Using motivation theory, what's the most sophisticated analysis and response?",
  options: ["Their hygiene factors are satisfied but they lack purpose and belonging – investigate what's causing disconnection and address it, whilst setting clear behavioural expectations", "Pay them more to improve their attitude", "Ignore the behaviour as their technical skills outweigh the negativity", "Immediately remove them as one negative person ruins team culture"],
  correctAnswer: 0,
  explanation: "Technical competence suggests capability isn't the issue; negativity despite good conditions suggests unmet higher needs (belonging, purpose, esteem). Sophisticated leadership addresses both the root cause (investigating and addressing demotivation) and the behaviour (clear expectations about impact on others). Simply removing skilled people wastes talent; ignoring it damages culture; pay doesn't address intrinsic demotivation.",
  section: "Module 2",
  difficulty: "advanced",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 74,
  question: "You're implementing a new system where electricians choose their daily tasks from a board rather than being assigned work. Which motivation theories does this primarily leverage, and what's the risk?",
  options: ["Herzberg's hygiene factors – risk is this only prevents dissatisfaction, doesn't motivate", "Pink's autonomy and mastery – risk is without structure, critical tasks may be neglected or capability mismatched", "Maslow's self-actualisation – risk is lower needs must be met first", "None, this is just chaos with no theoretical basis"],
  correctAnswer: 1,
  explanation: "Task choice leverages Pink's autonomy (control over work) and mastery (choosing stretch opportunities). However, full autonomy risks critical tasks being avoided and people choosing beyond capability or always staying comfortable. Advanced implementation requires structure (ensuring critical work is covered, skill-matching) whilst maintaining autonomy's motivational benefits – a sophisticated balance.",
  section: "Module 2",
  difficulty: "advanced",
  topic: "Motivating Your Team",
  category: "Leading Your Team"
},
{
  id: 75,
  question: "An apprentice's work quality has declined recently. You've given corrective feedback twice using SBI, but no improvement. What's the most sophisticated next step integrating multiple feedback principles?",
  options: ["Repeat the same SBI feedback more firmly", "Move to formal disciplinary process immediately", "Have a deeper conversation exploring underlying causes (skill gaps, personal issues, unclear expectations), agree specific support and measurable improvement plan with clear timeline and consequences, whilst maintaining growth mindset framing", "Stop giving feedback as it's clearly not working"],
  correctAnswer: 2,
  explanation: "Advanced feedback recognises when standard approaches aren't working and adapts. This response integrates multiple principles: investigating root causes (maybe skill not will), growth mindset (improvable with support), clear accountability (measurable plan, timeline, consequences), and relationship maintenance (collaborative approach). It's more sophisticated than repeating failed approaches or jumping straight to punishment without understanding causes.",
  section: "Module 2",
  difficulty: "advanced",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 76,
  question: "You're delegating project coordination for a small refurbishment to a senior electrician who's never done it before. They have technical skill but no project management experience. What's the optimal Skill-Will Matrix approach?",
  options: ["Delegate fully (high skill) as they're senior and capable", "Direct approach (low skill/low will) as they've never done this role", "Guide approach (developing skill, high will) – provide framework, training, and close support initially, gradually increasing autonomy as competence develops", "Excite approach as they need motivation"],
  correctAnswer: 2,
  explanation: "This is a sophisticated delegation scenario: high will (trusted senior person willing to develop), moderate-low skill (technical skill doesn't equal project management skill). Guide approach provides structured support to build new competencies whilst respecting their existing capability and motivation. Advanced leaders recognise skill is domain-specific and adjust support accordingly, with a plan to evolve toward delegation as competence grows.",
  section: "Module 2",
  difficulty: "advanced",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},
{
  id: 77,
  question: "Your team has high trust internally but treats other trades poorly, creating site-wide conflict. Using trust theory, what's happening and what's required?",
  options: ["This is good – strong in-group trust is the goal", "Trust within the team is actually false if it doesn't extend to others", "Strong in-group trust has created an 'us vs them' mentality – leadership must expand the circle of trust and psychological safety to the broader site community through cross-trade collaboration and shared goals", "Other trades don't matter as long as your team performs"],
  correctAnswer: 2,
  explanation: "This represents advanced trust dynamics: in-group trust can create out-group hostility. Sophisticated leaders recognise that site success requires broader trust and psychological safety beyond single teams. This requires intentional interventions – joint problem-solving, shared recognition, emphasising collective goals – to extend trust's circle and break down tribal behaviours that harm overall project success.",
  section: "Module 2",
  difficulty: "advanced",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 78,
  question: "A team member comes to you distressed about a serious mistake they made but haven't reported yet. Using trust and feedback principles, what's the most sophisticated leadership response?",
  options: ["Thank them for coming forward, assess the situation together, report it appropriately, focus on learning and preventing recurrence, and explicitly acknowledge that coming forward demonstrates the trust relationship you want", "Report them for not disclosing immediately", "Fix the mistake quietly to protect them", "Praise them so much they don't feel bad about the mistake"],
  correctAnswer: 0,
  explanation: "This scenario tests multiple advanced concepts simultaneously: reinforcing vulnerability-based trust (thanking them for honesty), maintaining accountability (appropriate reporting), growth mindset feedback (learning focus), and meta-communication (explicitly naming that this is the trust dynamic you're building). This sophisticated response handles the immediate situation whilst strengthening the culture you want – where people report problems rather than hide them.",
  section: "Module 2",
  difficulty: "advanced",
  topic: "Building Trust",
  category: "Leading Your Team"
},
{
  id: 79,
  question: "You're giving an experienced electrician feedback about repeatedly interrupting others in meetings. They respond 'I'm just passionate and trying to help'. What's the most sophisticated response integrating SBI and growth mindset?",
  options: ["'Your passion is valuable, but let me be specific: in yesterday's meeting (S), you interrupted three people mid-sentence (B), which meant their ideas weren't heard and they stopped contributing (I). Your energy is an asset – how can we channel it so everyone's contributions are heard?'", "'You need to control your passion and let others speak'", "'That's good, passion is more important than meeting etiquette'", "'You're not actually passionate, you're being disrespectful'"],
  correctAnswer: 0,
  explanation: "This advanced response validates the positive intent ('passion is valuable'), uses SBI for specificity and objectivity, clearly describes the negative impact, reframes the trait as an asset, and makes it a collaborative problem ('how can we'). It maintains the relationship whilst addressing serious behaviour, demonstrates emotional intelligence, and uses growth mindset framing. This is more sophisticated than accepting, dismissing, or attacking.",
  section: "Module 2",
  difficulty: "advanced",
  topic: "Giving Feedback",
  category: "Leading Your Team"
},
{
  id: 80,
  question: "You're considering delegating budget management responsibilities to a senior team member. This involves significant financial authority. What factors determine if this crosses from effective delegation into abdication of leadership responsibility?",
  options: ["Any financial delegation is abdication as leaders must control budgets", "It's delegation if you establish clear spending limits, approval thresholds for major decisions, reporting mechanisms, and provide financial literacy support; it's abdication if you simply hand over access without framework, accountability, or maintaining strategic oversight", "If they're senior enough, complete handover is appropriate delegation", "Delegation means no oversight, so any checking makes it not true delegation"],
  correctAnswer: 1,
  explanation: "This tests sophisticated understanding of delegation boundaries. Effective delegation of significant responsibility requires structure: clear authority limits, decision frameworks, accountability mechanisms, support for skill development, and maintained strategic oversight. Abdication is handing over responsibility without these structures. Advanced leaders delegate substantive work whilst maintaining ultimate accountability through systems, not micromanagement.",
  section: "Module 2",
  difficulty: "advanced",
  topic: "Delegating Effectively",
  category: "Leading Your Team"
},

  // =======================================================================
  // COMMUNICATION FOR LEADERS — 40 questions (id 81–120)
  // =======================================================================
{
  id: 81,
  question: "What is the primary purpose of a toolbox talk on a construction site?",
  options: ["To fill time before work starts", "To communicate health, safety and work-related information to the team", "To meet with supervisors about project deadlines", "To discuss worker performance reviews"],
  correctAnswer: 1,
  explanation: "Toolbox talks are short, informal safety meetings designed to communicate important health, safety and work-related information to workers. They help maintain awareness of hazards and reinforce safe working practices on site.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},
{
  id: 82,
  question: "How long should a typical toolbox talk last?",
  options: ["5-15 minutes", "30-45 minutes", "1-2 hours", "2-3 minutes"],
  correctAnswer: 0,
  explanation: "Toolbox talks should be short and focused, typically lasting 5-15 minutes. This duration is long enough to cover important points effectively whilst keeping workers engaged, without significantly disrupting the work schedule.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},
{
  id: 83,
  question: "Why is it important to record attendance at toolbox talks?",
  options: ["To track which workers arrive on time", "To provide legal evidence that safety information was communicated", "To calculate worker pay rates", "To determine lunch break schedules"],
  correctAnswer: 1,
  explanation: "Recording attendance provides documentary evidence that workers received safety information and training. This is crucial for legal compliance and can protect both the company and individuals in the event of an incident or HSE investigation.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},
{
  id: 84,
  question: "Which of the following is an example of a closed question?",
  options: ["How do you feel about the new safety procedure?", "Did you complete the electrical isolation checklist?", "What challenges did you face today?", "Why do you think the incident occurred?"],
  correctAnswer: 1,
  explanation: "A closed question requires a simple yes/no or specific factual answer. 'Did you complete the checklist?' can only be answered with yes or no, whereas the other options require more detailed responses and are therefore open questions.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 85,
  question: "What does active listening require you to do?",
  options: ["Interrupt to show you understand", "Give full attention and demonstrate understanding", "Think about your response whilst the other person speaks", "Focus on your mobile phone messages"],
  correctAnswer: 1,
  explanation: "Active listening requires giving the speaker your full, undivided attention and demonstrating that you understand through verbal and non-verbal cues. This creates effective two-way communication and builds trust.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 86,
  question: "What does the 'D' in the DESC model for difficult conversations stand for?",
  options: ["Defend", "Describe", "Deny", "Demand"],
  correctAnswer: 1,
  explanation: "In the DESC model, 'D' stands for Describe. This means describing the specific behaviour or situation objectively without judgement, which forms the foundation for a constructive difficult conversation.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 87,
  question: "Which document provides guidance on handling disciplinary and grievance issues in the workplace?",
  options: ["The Health and Safety at Work Act", "The ACAS Code of Practice", "The Building Regulations", "The Employment Rights Act"],
  correctAnswer: 1,
  explanation: "The ACAS Code of Practice on Disciplinary and Grievance Procedures provides practical guidance on handling workplace issues fairly. Following this code is essential for legal compliance and can affect employment tribunal outcomes.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 88,
  question: "Which of the following is one of the 7 Cs of effective written communication?",
  options: ["Complicated", "Clear", "Casual", "Creative"],
  correctAnswer: 1,
  explanation: "Clear is one of the 7 Cs of Communication (Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous). Written communication must be clear to ensure the message is easily understood without ambiguity.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 89,
  question: "Why is maintaining a site diary important?",
  options: ["To track worker lunch breaks", "To provide a legal record of site activities, decisions and incidents", "To monitor the weather forecast", "To plan social events"],
  correctAnswer: 1,
  explanation: "A site diary provides a contemporaneous legal record of all site activities, decisions, incidents and communications. This documentation can be crucial evidence in disputes, claims or investigations.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 90,
  question: "What does RFI stand for in construction communication?",
  options: ["Request For Information", "Record For Inspection", "Ready For Installation", "Report For Improvement"],
  correctAnswer: 0,
  explanation: "RFI stands for Request For Information. It is a formal written process used to clarify design details, specifications or instructions before proceeding with work, ensuring all parties have the information needed.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 91,
  question: "How often should toolbox talks typically be held on a construction site?",
  options: ["Once per year", "Weekly or when specific hazards arise", "Only after an accident occurs", "Monthly"],
  correctAnswer: 1,
  explanation: "Toolbox talks should be held regularly, typically weekly, and also when specific new hazards arise or new tasks begin. Regular communication helps maintain safety awareness and addresses changing site conditions promptly.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},
{
  id: 92,
  question: "What is a barrier to effective listening?",
  options: ["Making eye contact", "Background noise and distractions", "Taking notes", "Asking questions"],
  correctAnswer: 1,
  explanation: "Background noise, site machinery, mobile phones and other distractions create barriers to effective listening. These prevent you from giving full attention and accurately receiving the message being communicated.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 93,
  question: "What is the principle behind 'if it isn't written down, it didn't happen' in construction?",
  options: ["Workers must sign in daily", "All site activities should be documented for legal protection", "Email must be used for all communication", "Drawings must be updated daily"],
  correctAnswer: 1,
  explanation: "This principle emphasises that without written documentation, there is no evidence that instructions were given, work was completed or incidents occurred. Proper documentation protects all parties in disputes or investigations.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 94,
  question: "What body language shows you are actively listening?",
  options: ["Crossed arms and looking away", "Facing the speaker and maintaining appropriate eye contact", "Checking your watch frequently", "Turning your back to the speaker"],
  correctAnswer: 1,
  explanation: "Positive body language including facing the speaker, maintaining appropriate eye contact, and having an open posture demonstrates active listening. This encourages the speaker and shows respect and genuine interest in what they are saying.",
  section: "Module 3",
  difficulty: "basic",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 95,
  question: "You need to deliver a toolbox talk about working at height. Which approach is most effective?",
  options: ["Read directly from a pre-written script without deviation", "Relate the content to specific tasks workers will perform that day and encourage questions", "Keep it general so it applies to all situations", "Focus only on legal requirements without practical examples"],
  correctAnswer: 1,
  explanation: "Effective toolbox talks relate safety information directly to the work being performed and encourage worker participation through questions. This makes the content relevant, engaging and more likely to change behaviour compared to generic or scripted presentations.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},
{
  id: 96,
  question: "During a toolbox talk, a worker challenges your information about PPE requirements. How should you respond?",
  options: ["Tell them to be quiet and follow instructions", "Acknowledge their input, verify the information if needed, and follow up", "Ignore the challenge and continue with the talk", "Remove them from the talk for being disruptive"],
  correctAnswer: 1,
  explanation: "Acknowledging input and being willing to verify information demonstrates good leadership and creates a culture where workers feel safe raising concerns. If you're uncertain, it's better to confirm the facts than provide incorrect safety information.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},
{
  id: 97,
  question: "What is the difference between hearing and active listening?",
  options: ["There is no difference, they are the same thing", "Hearing is passive reception of sound; active listening involves processing, understanding and responding", "Hearing is for supervisors, listening is for workers", "Hearing requires concentration whilst listening is automatic"],
  correctAnswer: 1,
  explanation: "Hearing is the passive physiological process of receiving sound, whilst active listening is the conscious effort to process, understand and respond appropriately to the message. Active listening is a skill that requires practice and intention.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 98,
  question: "A worker appears upset after a near-miss incident. Which question type is most appropriate initially?",
  options: ["Closed questions to get facts quickly", "Leading questions to guide their response", "Open questions to let them explain in their own words", "Hypothetical questions about what could have happened"],
  correctAnswer: 2,
  explanation: "Open questions allow the worker to describe the incident and their feelings in their own words without being directed. This provides better information, shows empathy and helps the worker process the experience whilst you demonstrate active listening.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 99,
  question: "What does paraphrasing demonstrate in active listening?",
  options: ["That you can repeat words exactly", "That you have understood the message by restating it in your own words", "That you disagree with the speaker", "That you are not paying attention"],
  correctAnswer: 1,
  explanation: "Paraphrasing involves restating the speaker's message in your own words to confirm understanding. This demonstrates active listening, allows the speaker to clarify any misunderstandings and shows respect for their communication.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 100,
  question: "You need to address a worker's repeated lateness. What does the 'E' in DESC require you to do?",
  options: ["End the conversation immediately", "Express how the behaviour affects you, the team or the project", "Escalate to senior management", "Excuse the behaviour"],
  correctAnswer: 1,
  explanation: "The 'E' in DESC stands for Express, where you explain the effect or impact of the behaviour on you, the team or project. This helps the person understand consequences without being accusatory.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 101,
  question: "Before having a difficult conversation about poor work quality, what preparation is most important?",
  options: ["Rehearse exactly what you will say word-for-word", "Gather specific examples and facts about the issue", "Decide on the disciplinary outcome in advance", "Discuss the issue with other workers first"],
  correctAnswer: 1,
  explanation: "Preparation requires gathering specific, factual examples of the poor work quality. This allows you to have an objective conversation based on evidence rather than opinions or generalisations, making it fairer and more constructive.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 102,
  question: "What does the 'S' in DESC stand for?",
  options: ["Shout", "Specify", "Sympathise", "Suspend"],
  correctAnswer: 1,
  explanation: "The 'S' in DESC stands for Specify, where you specify what you need or want to happen going forward. This focuses the conversation on solutions and future behaviour rather than dwelling on past problems.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 103,
  question: "After a difficult conversation about safety violations, what should you do immediately?",
  options: ["Nothing, move on to the next task", "Document what was discussed, agreed and any actions", "Tell other workers what happened", "Wait a week then follow up"],
  correctAnswer: 1,
  explanation: "Immediately documenting the conversation creates a contemporaneous record of what was discussed, agreed and any actions required. This protects all parties and ensures there is a clear reference point for follow-up and accountability.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 104,
  question: "Which of the 7 Cs means your message should include all necessary information?",
  options: ["Concise", "Complete", "Coherent", "Correct"],
  correctAnswer: 1,
  explanation: "Complete means including all necessary information so the reader can take appropriate action without needing to request clarification. Incomplete communication wastes time and can lead to errors or delays on site.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 105,
  question: "You are writing a progress report about electrical first fix completion. What information must be included?",
  options: ["Only the completion percentage", "Work completed, any issues encountered, materials used and next steps", "Just the date and your signature", "Worker names and hours worked only"],
  correctAnswer: 1,
  explanation: "A complete progress report must include what work was completed, any problems or delays encountered, materials or resources used and what happens next. This provides a full picture for all stakeholders and creates a proper record.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 106,
  question: "When should you send an RFI about unclear electrical panel specifications?",
  options: ["After you have installed it incorrectly", "As soon as you identify the lack of clarity, before proceeding", "When the client visits site", "At the end of the project"],
  correctAnswer: 1,
  explanation: "RFIs should be submitted immediately upon identifying unclear information, before proceeding with the work. This prevents costly mistakes, rework and disputes, and ensures work is completed correctly the first time.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 107,
  question: "What is the purpose of recording attendee questions and concerns during a toolbox talk?",
  options: ["To identify troublemakers", "To demonstrate engagement and address recurring issues in future talks", "To report workers to management", "To fill out the attendance form"],
  correctAnswer: 1,
  explanation: "Recording questions and concerns shows that workers are engaged and provides valuable feedback about areas needing clarification. Recurring questions indicate topics that need more attention in future communications or training.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},
{
  id: 108,
  question: "A worker is explaining a problem but keeps getting interrupted by site noise. What should you do?",
  options: ["Tell them to speak louder", "Move to a quieter location to ensure effective communication", "Ask them to email you instead", "Continue the conversation, it is good enough"],
  correctAnswer: 1,
  explanation: "Environmental barriers like noise prevent effective listening. Moving to a quieter location demonstrates that you value what the worker is saying and ensures the message is received accurately, which is especially important for safety matters.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 109,
  question: "What is the main risk of not documenting verbal instructions given on site?",
  options: ["Workers will forget to sign in", "There is no evidence the instruction was given if disputes arise", "The site diary will be incomplete", "Health and safety inspectors will be unhappy"],
  correctAnswer: 1,
  explanation: "Without documentation, there is no evidence that instructions were given, understood or followed. This creates significant legal and commercial risk in disputes about quality, safety or contractual obligations.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 110,
  question: "When writing a professional email to a client about a delay, which approach is most appropriate?",
  options: ["Blame suppliers and use informal language", "State facts clearly, explain the impact, propose solutions and maintain a professional tone", "Use technical jargon to sound knowledgeable", "Keep it very brief with no explanation"],
  correctAnswer: 1,
  explanation: "Professional emails must state facts objectively, explain impacts, offer solutions and maintain a courteous, professional tone. This demonstrates competence, builds trust and focuses on resolving the issue constructively.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 111,
  question: "During a difficult conversation, the worker becomes defensive and raises their voice. How should you respond?",
  options: ["Raise your voice to match theirs", "Remain calm, acknowledge their feelings and suggest taking a short break if needed", "End the conversation immediately", "Threaten disciplinary action for their behaviour"],
  correctAnswer: 1,
  explanation: "Remaining calm and acknowledging emotions de-escalates tension. Suggesting a break allows both parties to compose themselves, making the conversation more productive whilst demonstrating professional leadership and emotional intelligence.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 112,
  question: "What is 'Coherent' in the context of the 7 Cs of written communication?",
  options: ["Using complicated words", "All points are logically connected and flow in a sensible order", "Writing very long sentences", "Using bullet points"],
  correctAnswer: 1,
  explanation: "Coherent communication means all points are logically connected and flow in a sensible, structured order. This makes the message easier to understand and ensures the reader can follow your reasoning without confusion.",
  section: "Module 3",
  difficulty: "intermediate",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 113,
  question: "You are conducting a toolbox talk on LOTO (Lock Out Tag Out) procedures, but notice several workers checking their phones and talking amongst themselves. What is the most effective leadership response?",
  options: ["Stop the talk and reprimand workers publicly for their lack of attention", "Continue reading the script as planned, they should know to pay attention", "Pause, use a relevant recent site example or ask a direct question to re-engage them, then continue", "End the talk early and report the workers to management"],
  correctAnswer: 2,
  explanation: "Effective leaders recognise when engagement is lost and adapt their approach. Using real site examples or asking questions re-engages workers without being confrontational, making the content more relevant and demonstrating dynamic communication skills that maintain attention.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},
{
  id: 114,
  question: "In the 7 levels of listening model, what characterises 'Level 7' listening?",
  options: ["Listening to respond rather than understand", "Listening whilst distracted by other thoughts", "Deep empathetic listening where you fully understand the speaker's perspective and emotions", "Hearing words but not processing meaning"],
  correctAnswer: 2,
  explanation: "Level 7 represents the highest form of listening, characterised by deep empathy, full attention and genuine understanding of both the content and emotions behind the message. This level builds strong relationships and enables effective leadership through true connection.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 115,
  question: "You need to address a situation where a senior electrician is undermining your authority by contradicting your instructions to apprentices. Using the DESC model, what is the most appropriate 'Describe' statement?",
  options: ["You are always disrespectful and trying to undermine me", "On three occasions this week, I have observed you giving apprentices different instructions after I have briefed them", "You clearly do not respect my position as supervisor", "I feel like you do not support my leadership"],
  correctAnswer: 1,
  explanation: "The 'Describe' step requires specific, objective, factual statements about observable behaviour without judgement or emotion. Option B provides specific instances and observable actions, whilst the others include judgements, generalisations or assumptions about intent.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 116,
  question: "According to ACAS guidance, what must you do before moving to a formal disciplinary hearing for poor performance?",
  options: ["Issue a final written warning immediately", "Conduct a thorough investigation and hold an informal discussion to understand the issues", "Dismiss the employee", "Report them to senior management"],
  correctAnswer: 1,
  explanation: "ACAS requires a fair process including investigation and, where appropriate, informal discussions before formal disciplinary action. This ensures you have all facts, the employee has opportunity to explain and you have explored whether the issue can be resolved informally.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Difficult Conversations",
  category: "Communication for Leaders"
},
{
  id: 117,
  question: "You are writing a site diary entry about a safety incident where a worker received a minor electric shock. What level of detail is legally and professionally appropriate?",
  options: ["Just note 'electric shock incident occurred'", "Record date, time, location, individuals involved, detailed description of events, immediate actions taken, witness statements and follow-up actions", "Wait to see if it becomes serious before documenting", "Only record it if the HSE needs to be notified"],
  correctAnswer: 1,
  explanation: "Comprehensive contemporaneous documentation is essential for legal, insurance and safety management purposes. Detailed records including all relevant facts protect all parties, support investigations and demonstrate duty of care, regardless of whether external notification is required.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 118,
  question: "A worker discloses during a conversation that they are struggling with mental health issues affecting their work. How should you balance active listening with your responsibilities?",
  options: ["Tell them to keep personal issues at home", "Listen empathetically, maintain confidentiality where appropriate, signpost to support resources and document the conversation professionally", "Immediately inform all other supervisors", "Reduce their responsibilities without their consent"],
  correctAnswer: 1,
  explanation: "This situation requires balancing empathy and support with professional responsibilities. Active listening shows care, whilst signposting to appropriate support (EAP, GP, mental health first aiders) ensures the person gets proper help. Professional documentation protects both parties whilst respecting confidentiality within appropriate bounds.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Active Listening",
  category: "Communication for Leaders"
},
{
  id: 119,
  question: "You receive an email from a client disputing the quality of completed electrical works. The client's tone is aggressive and includes inaccurate claims. What is the most professionally effective written response strategy?",
  options: ["Respond immediately matching their tone to defend your work", "Ignore the email and discuss it verbally instead", "Wait 24 hours, then respond factually addressing each point with reference to specifications, test results and photographic evidence, maintaining a professional courteous tone throughout", "Forward it to your manager without responding"],
  correctAnswer: 2,
  explanation: "Taking time before responding to emotional communications allows you to craft a professional, factual response. Addressing each point with evidence (specs, tests, photos) demonstrates professionalism, creates a strong documented position and often de-escalates conflict by focusing on facts rather than emotions.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Written Communication",
  category: "Communication for Leaders"
},
{
  id: 120,
  question: "During a toolbox talk about confined space entry, a worker asks a complex technical question you cannot immediately answer. What response demonstrates the most effective leadership communication?",
  options: ["Make up an answer to maintain credibility", "Tell them it is not relevant to the talk", "Acknowledge you do not have that specific information, commit to finding out from a competent source, and follow up in writing with the answer to all attendees", "Deflect by asking if anyone else knows the answer"],
  correctAnswer: 2,
  explanation: "Admitting knowledge gaps whilst committing to find accurate information demonstrates integrity, prioritises safety over ego and models good practice. Following up in writing ensures all workers receive correct information, creates a record and reinforces a culture where accuracy matters more than appearing infallible.",
  section: "Module 3",
  difficulty: "advanced",
  topic: "Toolbox Talks",
  category: "Communication for Leaders"
},

  // =======================================================================
  // DECISION-MAKING & PROBLEM-SOLVING — 40 questions (id 121–160)
  // =======================================================================
{
  id: 121,
  question: "What is the first step in the OODA Loop decision-making model?",
  options: ["Observe the situation", "Orient yourself to the context", "Decide on a course of action", "Act on your decision"],
  correctAnswer: 0,
  explanation: "The OODA Loop begins with 'Observe' — gathering information about the current situation. This foundational step ensures decisions are based on actual conditions rather than assumptions. Only after observing can you properly orient, decide, and act.",
  section: "Module 4",
  difficulty: "basic",
  topic: "OODA Loop",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 122,
  question: "Which conflict mode involves finding a middle ground where both parties give up something?",
  options: ["Competing", "Collaborating", "Compromising", "Avoiding"],
  correctAnswer: 2,
  explanation: "Compromising is the conflict mode where both parties make concessions to reach a mutually acceptable solution. It's often used when time is limited or when both parties have equal power. Unlike collaboration, it involves give-and-take rather than finding a solution that fully satisfies everyone.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Conflict Management",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 123,
  question: "What does the '5 Whys' technique help you identify?",
  options: ["The five people responsible for a problem", "The root cause of a problem", "Five different solutions to try", "Five safety hazards on site"],
  correctAnswer: 1,
  explanation: "The 5 Whys technique involves asking 'why' repeatedly (typically five times) to drill down from symptoms to the underlying root cause. This prevents fixing surface-level issues while leaving the fundamental problem unresolved. It's a simple but powerful root cause analysis tool.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Problem-Solving Techniques",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 124,
  question: "In the DECIDE model, what does the 'D' stand for?",
  options: ["Delegate the problem", "Define the problem", "Deliver the solution", "Document the outcome"],
  correctAnswer: 1,
  explanation: "In the DECIDE model, 'D' stands for 'Define the problem'. Clearly defining what you're trying to solve is the critical first step that shapes all subsequent decision-making. Without proper definition, you risk solving the wrong problem or creating confusion about objectives.",
  section: "Module 4",
  difficulty: "basic",
  topic: "DECIDE Model",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 125,
  question: "What is a 'workaround' in problem-solving?",
  options: ["A permanent solution to a problem", "A temporary solution that bypasses the root cause", "A way to avoid taking responsibility", "A method for delegating problems to others"],
  correctAnswer: 1,
  explanation: "A workaround is a temporary solution that allows work to continue while the root cause remains unaddressed. Workarounds are useful for maintaining productivity in the short term but should not replace permanent fixes. They're common on construction sites when immediate action is needed.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Problem-Solving Approaches",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 126,
  question: "Which Thomas-Kilmann conflict mode involves assertively pursuing your own concerns without regard for others?",
  options: ["Accommodating", "Avoiding", "Competing", "Collaborating"],
  correctAnswer: 2,
  explanation: "The competing mode is high assertiveness and low cooperativeness — pursuing your own concerns at the expense of others. While sometimes necessary (e.g., safety emergencies), overuse damages relationships and team morale. It's about winning rather than finding mutual solutions.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Conflict Modes",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 127,
  question: "What is the primary benefit of a 'learning culture' over a 'blame culture'?",
  options: ["It eliminates all mistakes", "It encourages honest reporting and improvement", "It removes the need for accountability", "It makes everyone responsible for everything"],
  correctAnswer: 1,
  explanation: "A learning culture encourages people to report mistakes and near-misses honestly because the focus is on improvement rather than punishment. This leads to better identification of systemic issues and prevents future problems. Blame cultures cause people to hide mistakes, allowing dangerous situations to persist.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Accountability Culture",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 128,
  question: "In Plan-Do-Check-Act (PDCA), what happens in the 'Check' phase?",
  options: ["You create a detailed plan", "You implement the solution", "You evaluate whether the solution worked", "You standardise the new process"],
  correctAnswer: 2,
  explanation: "The 'Check' phase involves measuring and evaluating the results of your implementation. You compare actual outcomes against expected results to determine if the solution is effective. This evidence-based approach prevents assuming success without verification.",
  section: "Module 4",
  difficulty: "basic",
  topic: "PDCA Cycle",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 129,
  question: "What is 'confirmation bias' in decision-making?",
  options: ["Seeking information that supports existing beliefs", "Confirming decisions with your manager", "Getting written confirmation before acting", "Bias towards confirming rather than denying requests"],
  correctAnswer: 0,
  explanation: "Confirmation bias is the tendency to seek, interpret, and remember information that confirms your pre-existing beliefs while ignoring contradictory evidence. On site, this can lead to dangerous assumptions — for example, believing a circuit is safe because you expect it to be, rather than testing it properly.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Cognitive Biases",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 130,
  question: "Which conflict mode is most appropriate when the issue is trivial or when you have no chance of winning?",
  options: ["Competing", "Collaborating", "Avoiding", "Accommodating"],
  correctAnswer: 2,
  explanation: "Avoiding is appropriate when the issue is minor, when emotions are too high for productive discussion, or when you lack the power to change the outcome. However, overusing avoidance allows problems to fester and can make you appear disengaged or unhelpful.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Conflict Mode Selection",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 131,
  question: "What does 'accountability' mean in a construction site context?",
  options: ["Always following orders without question", "Taking responsibility for your actions and their outcomes", "Keeping detailed records of everything", "Reporting other people's mistakes"],
  correctAnswer: 1,
  explanation: "Accountability means taking ownership of your decisions, actions, and their consequences — both positive and negative. On site, this includes admitting mistakes, following through on commitments, and ensuring work meets required standards. It's about responsibility, not blame.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Personal Accountability",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 132,
  question: "What is a fishbone diagram primarily used for?",
  options: ["Scheduling fish deliveries to site canteens", "Identifying potential causes of a problem", "Showing the chain of command", "Planning project timelines"],
  correctAnswer: 1,
  explanation: "A fishbone diagram (Ishikawa diagram) is a visual tool for identifying and organising potential causes of a problem. The 'head' is the problem, and 'bones' branch out to show different categories of causes (methods, materials, equipment, people, environment). It helps teams systematically explore all possible factors.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Root Cause Analysis Tools",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 133,
  question: "In the Ladder of Inference, what is the first rung (bottom step)?",
  options: ["Observable data and experiences", "Selected data you pay attention to", "Meanings you add based on culture", "Conclusions you reach"],
  correctAnswer: 0,
  explanation: "The bottom rung of the Ladder of Inference is observable data — the raw facts and experiences available to everyone. From this foundation, we climb up through selecting data, adding meanings, making assumptions, drawing conclusions, and finally taking action. Understanding this helps prevent jumping to conclusions.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Ladder of Inference",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 134,
  question: "What is 'fast thinking' according to decision-making theory?",
  options: ["Making decisions in under 5 seconds", "Intuitive, automatic thinking based on experience", "Thinking quickly to impress others", "Using computer software to speed up analysis"],
  correctAnswer: 1,
  explanation: "Fast thinking (System 1) is automatic, intuitive, and effortless — it draws on patterns and experience to make quick judgments. While useful for routine decisions, it's prone to biases and errors. Slow thinking (System 2) is deliberate and analytical, better for complex or unfamiliar problems.",
  section: "Module 4",
  difficulty: "basic",
  topic: "Fast vs Slow Thinking",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 135,
  question: "You discover that a team member has made a significant error in cable sizing that could delay the project. Using the OODA Loop, what should you do immediately after observing this problem?",
  options: ["Act by confronting them publicly", "Orient by assessing the impact, urgency, and context", "Decide to assign blame and document it", "Observe other team members for similar mistakes"],
  correctAnswer: 1,
  explanation: "After observing the problem, the next OODA step is 'Orient' — understanding the context, assessing impact, considering constraints, and framing the situation before making decisions. This prevents reactive decisions and ensures you understand the full picture, including whether this is a one-off error or systemic issue.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "OODA Loop Application",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 136,
  question: "Two electricians are in conflict about the best method for running conduit through a complex area. When is 'collaborating' the most appropriate conflict mode?",
  options: ["When you need a quick decision to keep the programme on track", "When the relationship and outcome are both important, and time permits", "When one electrician is clearly more experienced than the other", "When the supervisor wants to avoid getting involved"],
  correctAnswer: 1,
  explanation: "Collaborating (high assertiveness, high cooperativeness) is ideal when both the relationship and the outcome matter, and you have time for discussion. It seeks solutions that fully satisfy both parties' concerns. This mode is valuable when technical expertise from both sides can lead to a better solution than either could achieve alone.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Conflict Mode Selection",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 137,
  question: "Using the 5 Whys, you identify that repeated tool failures trace back to 'no systematic maintenance schedule'. What should you do next?",
  options: ["Stop at this answer and blame the tool manager", "Ask why there is no maintenance schedule to go deeper", "Immediately purchase new tools", "Document the finding and move on to other problems"],
  correctAnswer: 1,
  explanation: "The 5 Whys should continue until you reach a root cause that's actionable — 'no maintenance schedule' is itself a symptom. Asking why there isn't a schedule might reveal budget constraints, lack of training, unclear responsibilities, or poor communication. Finding the deepest cause enables the most effective solution.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "5 Whys Technique",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 138,
  question: "You're using a fishbone diagram to analyse why RCD tests keep failing. Which category would 'inadequate tester calibration' fall under?",
  options: ["People", "Equipment", "Environment", "Methods"],
  correctAnswer: 1,
  explanation: "Inadequate tester calibration relates to the testing equipment itself — its condition, maintenance, and accuracy. While people use the equipment and methods define how it's used, the calibration issue is fundamentally about the tool's state. Proper categorisation in fishbone diagrams helps ensure thorough analysis of all potential causes.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Fishbone Diagram Application",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 139,
  question: "In the DECIDE model, after Establishing criteria and Considering alternatives, what comes next?",
  options: ["Define the problem again", "Identify the decision to be made", "Eliminate alternatives that don't meet criteria", "Communicate the decision immediately"],
  correctAnswer: 2,
  explanation: "DECIDE stands for: Define, Establish criteria, Consider alternatives, Identify the decision, Develop and implement, Evaluate. After considering alternatives, you systematically eliminate those that don't meet your established criteria. This structured approach prevents emotional or biased decision-making and ensures decisions align with objectives.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "DECIDE Model Process",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 140,
  question: "You implement a workaround for a recurring equipment failure. What is the critical follow-up action?",
  options: ["Train everyone to use the workaround permanently", "Document it and schedule time to fix the root cause", "Remove the equipment from site immediately", "Ignore the underlying problem since the workaround works"],
  correctAnswer: 1,
  explanation: "Workarounds should always be temporary. The critical follow-up is documenting the workaround (so it's not forgotten) and scheduling proper root cause resolution. Workarounds often add inefficiency, safety risks, or quality concerns — they're survival tactics, not sustainable solutions.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Workarounds vs Fixes",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 141,
  question: "A team member consistently misses deadlines. Using ACAS principles for conflict resolution, what should be your first step?",
  options: ["Issue a formal written warning", "Have an informal conversation to understand the situation", "Reassign their work to someone more reliable", "Document their failures for disciplinary action"],
  correctAnswer: 1,
  explanation: "ACAS (Advisory, Conciliation and Arbitration Service) principles emphasise early informal resolution. Having a private, non-confrontational conversation allows you to understand underlying issues (workload, skills, personal circumstances) before escalating. Many conflicts resolve at this stage, preserving relationships and trust.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "ACAS Approach to Conflict",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 142,
  question: "You're using Plan-Do-Check-Act to solve recurring cable damage during installation. In which phase should you pilot a new cable protection method with one team before rolling it out site-wide?",
  options: ["Plan", "Do", "Check", "Act"],
  correctAnswer: 1,
  explanation: "The 'Do' phase is where you implement your solution, ideally starting small (pilot/trial) to test effectiveness before full-scale rollout. This allows you to identify unexpected problems with minimal disruption. The 'Check' phase then evaluates the pilot results before 'Act' standardises successful changes across the site.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "PDCA Implementation",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 143,
  question: "Which cognitive bias is at play when a supervisor assumes a young apprentice caused a wiring error simply because of their age and experience level?",
  options: ["Confirmation bias", "Availability bias", "Anchoring bias", "Stereotyping (representativeness) bias"],
  correctAnswer: 3,
  explanation: "This is stereotyping or representativeness bias — making judgments based on how well someone fits a mental category ('inexperienced young people make mistakes') rather than examining actual evidence. On site, this bias can lead to unfair blame, overlooking systemic issues, and damaging morale among newer workers.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Cognitive Biases",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 144,
  question: "You're climbing the Ladder of Inference after seeing a team member leave the site 10 minutes early. At which rung do you risk making an error if you immediately assume they're lazy?",
  options: ["Observable data", "Selected data", "Meanings and assumptions", "Conclusions"],
  correctAnswer: 2,
  explanation: "Jumping from 'they left early' (selected observation) to 'they're lazy' (conclusion) skips the meanings/assumptions rung where cultural beliefs and personal interpretations shape understanding. They might have had permission, a valid reason, or be making up time. Recognising this rung helps prevent unfair judgments and encourages checking assumptions.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Ladder of Inference Application",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 145,
  question: "When is 'accommodating' the most appropriate conflict mode on a construction site?",
  options: ["When safety is at stake and you must enforce rules", "When the issue matters more to the other person and little to you", "When you want to demonstrate authority", "When both parties need to give up something"],
  correctAnswer: 1,
  explanation: "Accommodating (low assertiveness, high cooperativeness) works well when you care little about the issue but the relationship matters, or when you recognise the other person is right. For example, letting a tradesperson choose their preferred (safe) method when the outcome is the same. Overuse can lead to being taken advantage of.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Conflict Mode Selection",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 146,
  question: "How can you create accountability without micromanagement?",
  options: ["Check every detail of everyone's work constantly", "Set clear expectations, provide autonomy, and review outcomes", "Avoid giving feedback to prevent confrontation", "Make all decisions yourself to ensure quality"],
  correctAnswer: 1,
  explanation: "Effective accountability comes from clear expectations (what, when, quality standards), autonomy in how to achieve them, and regular outcome reviews. This empowers people to take ownership while ensuring standards are met. Micromanagement destroys morale and prevents people from developing problem-solving skills.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Creating Accountability",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 147,
  question: "A serious safety incident has occurred. Should you rely on fast thinking or slow thinking to decide immediate actions?",
  options: ["Fast thinking only — every second counts", "Slow thinking only — analyse everything thoroughly", "Fast thinking for immediate safety, then slow thinking for investigation", "Neither — just follow the emergency plan without thinking"],
  correctAnswer: 2,
  explanation: "Immediate safety requires fast thinking (System 1) — getting people to safety, calling emergency services, securing the area. Once the immediate danger is controlled, switch to slow thinking (System 2) for thorough investigation, root cause analysis, and preventive measures. Good leaders know when to use each mode.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Fast vs Slow Thinking",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 148,
  question: "You've used the 5 Whys and identified a root cause. According to problem-solving best practice, what should you do before implementing a solution?",
  options: ["Implement immediately while the issue is fresh", "Verify the root cause with data or testing", "Delegate the solution to someone else", "Wait to see if the problem recurs"],
  correctAnswer: 1,
  explanation: "Root cause analysis can lead to incorrect conclusions if based on assumptions rather than evidence. Verifying the identified root cause (through data review, testing, or consultation) prevents wasting resources on solutions that don't address the real problem. This is particularly important for complex or costly issues.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Root Cause Verification",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 149,
  question: "In a blame culture, what typically happens when something goes wrong?",
  options: ["People openly discuss mistakes to prevent recurrence", "Focus shifts to finding who is at fault rather than fixing the system", "Accountability is strengthened through honest reporting", "Problems are solved more quickly due to fear of consequences"],
  correctAnswer: 1,
  explanation: "Blame cultures focus on finding and punishing the individual responsible rather than understanding systemic causes. This leads to hiding mistakes, defensive behaviour, and failure to learn from incidents. While accountability matters, blame culture prevents the honest reporting and open discussion needed for continuous improvement.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Blame vs Learning Culture",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 150,
  question: "You notice that rushed decisions at the end of shifts often lead to errors. Which OODA Loop element needs strengthening?",
  options: ["Observe — gather more data before shifts end", "Orient — ensure context and constraints are understood before time pressure hits", "Decide — make faster decisions under pressure", "Act — implement decisions more quickly"],
  correctAnswer: 1,
  explanation: "The issue is likely poor orientation — not understanding constraints (fatigue, time pressure) or context (end-of-shift risks) before reaching the decision point. Strengthening the Orient phase through shift planning, pre-shift briefings, and time management reduces the need for rushed decisions. This prevents the observe-decide-act cycle from short-circuiting under pressure.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "OODA Loop Analysis",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 151,
  question: "When using the competing conflict mode, what is the main risk you need to manage?",
  options: ["The decision might take too long", "Relationships may be damaged and future cooperation harmed", "You might reach a compromise too easily", "Too many people will want to be involved"],
  correctAnswer: 1,
  explanation: "The competing mode prioritises your concerns over others', which can win the immediate issue but damage relationships and reduce future cooperation. People may become defensive, disengaged, or resentful. It's appropriate for safety emergencies or when quick decisive action is essential, but overuse creates a toxic culture.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Conflict Mode Risks",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 152,
  question: "You're holding a team member accountable for incomplete work. They become defensive and blame external factors. What's the most effective response?",
  options: ["Dismiss their excuses and enforce consequences", "Listen to understand genuine obstacles, then refocus on their responsibility", "Accept all excuses to maintain a positive relationship", "Escalate to senior management immediately"],
  correctAnswer: 1,
  explanation: "Effective accountability distinguishes between genuine obstacles (which need addressing) and excuses (which avoid ownership). Listen to understand real barriers, validate legitimate concerns, then redirect focus to what they controlled and their responsibility for raising issues early. This balances accountability with fairness and problem-solving.",
  section: "Module 4",
  difficulty: "intermediate",
  topic: "Holding Others Accountable",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 153,
  question: "A complex electrical fault has multiple potential causes (design, installation, materials, testing). You have limited time before the client meeting. How should you balance fast and slow thinking?",
  options: ["Use only fast thinking — trust your gut and make a quick call", "Use only slow thinking — analyse every possibility thoroughly despite time constraints", "Use fast thinking to prioritise likely causes, then slow thinking to verify the most probable", "Delegate to avoid thinking about it yourself"],
  correctAnswer: 2,
  explanation: "Expert decision-making under time pressure uses fast thinking (pattern recognition from experience) to narrow possibilities efficiently, then applies slow thinking (analytical verification) to the most likely candidates. This balances speed with accuracy. Purely fast thinking risks errors; purely slow thinking wastes time on unlikely scenarios. The key is knowing which mode to apply when.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Integrated Decision-Making",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 154,
  question: "You're mediating a conflict between two supervisors with different installation philosophies. Both are experienced and have valid technical points. The project needs consistency. Which conflict resolution strategy addresses both the technical and relationship dimensions?",
  options: ["Use competing — choose the method you think is best and mandate it", "Use compromising — alternate between both methods on different areas", "Use collaborating — facilitate a joint session to develop a hybrid approach everyone understands", "Use avoiding — let them continue using different methods in their own areas"],
  correctAnswer: 2,
  explanation: "Collaborating is the only mode that seeks to satisfy both parties' underlying concerns (technical excellence, autonomy, respect) while solving the consistency problem. It requires time and skill to facilitate, but produces buy-in, mutual understanding, and potentially a better solution than either proposed. Competing wins the battle but loses the war; compromising may produce an incoherent approach; avoiding perpetuates the problem.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Strategic Conflict Resolution",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 155,
  question: "Using the Ladder of Inference, you realise your team has developed a 'belief' that the client always rejects change requests, leading them not to propose improvements. How do you intervene at the right level?",
  options: ["At the action level — force them to submit proposals", "At the observable data level — show them recent approvals they've ignored", "At the conclusion level — tell them they're wrong about the client", "At the beliefs level — discuss where this belief came from and test it against current reality"],
  correctAnswer: 1,
  explanation: "The most effective intervention challenges the selective data that feeds the belief. By pointing out contrary evidence (recent approvals) that they've filtered out, you help them see their selection bias. This is more powerful than arguing at the belief level (which triggers defensiveness) or forcing action (which doesn't change the underlying mindset). It helps them descend the ladder and rebuild assumptions on complete data.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Ladder of Inference Intervention",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 156,
  question: "You've completed a PDCA cycle to reduce cable waste, achieving a 15% reduction. Senior management wants to implement it company-wide immediately. What's the critical consideration before scaling?",
  options: ["Whether the 15% reduction is good enough or if you should aim for 20%", "Whether the conditions on your site (team skills, material suppliers, project type) are representative of other sites", "Whether you'll get credit for the improvement across the company", "Whether the reduction saves enough money to justify the administrative effort"],
  correctAnswer: 1,
  explanation: "PDCA scaling requires verifying that your test conditions represent the broader context. If your site has unique characteristics (experienced team, specific suppliers, particular project types), the solution might fail elsewhere. Best practice is piloting across diverse conditions before full rollout. This prevents the common error of scaling solutions that worked in one context but fail in others due to hidden variables.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "PDCA Scaling Decisions",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 157,
  question: "You identify through root cause analysis that a recurring issue stems from poor communication between the design and installation teams. Both teams blame each other. What's the most effective way to create accountability for improvement?",
  options: ["Hold each team accountable separately for their communication", "Create a joint accountability measure that requires both teams to succeed together", "Assign blame based on who made the first mistake in the chain", "Remove accountability until the blame culture subsides"],
  correctAnswer: 1,
  explanation: "Joint accountability measures (e.g., shared KPIs, joint problem-solving sessions, cross-team reviews) break down 'us vs them' mentality by making success interdependent. This forces collaboration and shared ownership rather than blame-shifting. Individual accountability for cross-team issues often reinforces silos and defensiveness. The measure must be designed so neither team can succeed while the other fails.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Systemic Accountability",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 158,
  question: "During a high-pressure incident, you notice yourself anchoring on the first explanation you heard (a supplier fault) despite emerging evidence pointing elsewhere. What's the most effective intervention?",
  options: ["Stick with your first instinct — changing your mind shows weak leadership", "Pause the OODA Loop at Orient, explicitly acknowledge the anchoring bias, and reassess with fresh eyes", "Delegate the decision to someone less emotionally invested", "Continue investigating until you find evidence supporting the supplier fault"],
  correctAnswer: 1,
  explanation: "Recognising and naming your own cognitive bias is the first step to overcoming it. Explicitly pausing at the Orient phase to reassess breaks the automatic cycle from observation to decision. This is advanced self-awareness — weak leaders can't admit their initial thinking might be flawed. Seeking confirming evidence (option 4) compounds confirmation bias rather than countering anchoring bias.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Managing Cognitive Biases",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 159,
  question: "You're using fishbone analysis for a complex quality issue. The team quickly generates many potential causes but becomes overwhelmed. What's the best facilitation approach?",
  options: ["Abandon the fishbone and switch to 5 Whys for simplicity", "Prioritise the potential causes using data, voting, or impact/likelihood assessment before investigating all of them", "Investigate every potential cause thoroughly to avoid missing the root cause", "Choose the cause that seems most likely based on intuition"],
  correctAnswer: 1,
  explanation: "Fishbone diagrams can generate dozens of potential causes, leading to analysis paralysis. Effective facilitation adds a prioritisation step (using available data, team voting, or impact/likelihood matrices) to focus investigation effort on the most probable causes first. This balances thoroughness with efficiency. Investigating everything wastes time; relying only on intuition risks confirmation bias; abandoning a useful tool mid-process confuses the team.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Advanced Root Cause Analysis",
  category: "Decision-Making & Problem-Solving"
},
{
  id: 160,
  question: "You've created a learning culture where people report mistakes freely. However, one team member repeatedly makes the same preventable errors despite feedback and support. How do you maintain the learning culture while addressing this performance issue?",
  options: ["Continue the learning approach indefinitely — consequences would destroy the culture", "Privately address the performance issue with clear expectations and accountability, while publicly reinforcing the learning culture for genuine mistakes", "Make an example of them publicly to show that learning culture has limits", "Transfer them to another site to make them someone else's problem"],
  correctAnswer: 1,
  explanation: "Learning culture and accountability aren't mutually exclusive — the difference is between genuine mistakes (learn and improve) and repeated negligence (performance issue). Addressing poor performance privately maintains psychological safety for others while upholding standards. The key is consistency: treat one-off errors as learning opportunities, but hold people accountable when patterns show disregard or inability after reasonable support. This nuance separates mature leadership from simplistic approaches.",
  section: "Module 4",
  difficulty: "advanced",
  topic: "Balancing Culture and Accountability",
  category: "Decision-Making & Problem-Solving"
},

  // =======================================================================
  // LEADING ON SITE — 40 questions (id 161–200)
  // =======================================================================
{
  id: 161,
  question: "What is the primary purpose of a site programme?",
  options: ["To show the sequence and timing of all work activities", "To list all the tools needed on site", "To record daily weather conditions", "To track worker attendance"],
  correctAnswer: 0,
  explanation: "A site programme is a planning tool that shows the sequence and timing of all work activities on a project. It helps coordinate trades, manage resources, and ensure work is completed on schedule.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Planning Work",
  category: "Leading on Site"
},
{
  id: 162,
  question: "On a Gantt chart, what do the horizontal bars represent?",
  options: ["The names of workers assigned to tasks", "The cost of each activity", "The duration and timing of activities", "The tools required for each task"],
  correctAnswer: 2,
  explanation: "On a Gantt chart, horizontal bars visually represent the duration and timing of activities. The length of each bar shows how long the activity takes, and its position shows when it starts and finishes.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Planning Work",
  category: "Leading on Site"
},
{
  id: 163,
  question: "What does 'critical path' mean in construction planning?",
  options: ["The most dangerous route through the site", "The sequence of tasks that determines the project duration", "The path electrical cables must follow", "The main access route for deliveries"],
  correctAnswer: 1,
  explanation: "The critical path is the sequence of tasks that determines the overall project duration. Any delay on the critical path will delay the entire project, so these activities require close monitoring.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Planning Work",
  category: "Leading on Site"
},
{
  id: 164,
  question: "Why should you hold a pre-start meeting with a new subcontractor?",
  options: ["To check their insurance documents", "To set clear expectations about standards, timings, and site rules", "To negotiate a lower price", "To introduce them to all site workers"],
  correctAnswer: 1,
  explanation: "A pre-start meeting allows you to set clear expectations about quality standards, timings, safety requirements, and site-specific rules. This helps prevent misunderstandings and ensures the subcontractor knows what is expected from day one.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Managing Subcontractors",
  category: "Leading on Site"
},
{
  id: 165,
  question: "Under CDM 2015, who is responsible for planning, managing, and monitoring construction work?",
  options: ["The client only", "The principal designer only", "The principal contractor", "The HSE inspector"],
  correctAnswer: 2,
  explanation: "Under CDM 2015, the principal contractor is responsible for planning, managing, and monitoring construction work to ensure it is carried out safely. This includes coordinating all contractors and ensuring site rules are followed.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 166,
  question: "What is a near-miss in health and safety terms?",
  options: ["An incident that caused a minor injury", "An incident that could have caused harm but did not", "A safety inspection that found no issues", "A first aid treatment"],
  correctAnswer: 1,
  explanation: "A near-miss is an unplanned event that could have resulted in injury, damage, or loss but did not. Reporting near-misses is crucial because they provide opportunities to identify and fix hazards before someone gets hurt.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 167,
  question: "According to the JIB apprenticeship structure, how long does a typical electrical apprenticeship last?",
  options: ["1 year", "2 years", "3-4 years", "5-6 years"],
  correctAnswer: 2,
  explanation: "A typical JIB electrical apprenticeship lasts 3-4 years, combining college-based learning with on-the-job training. This structured approach ensures apprentices develop both theoretical knowledge and practical skills.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 168,
  question: "What are the three main learning styles in apprentice training?",
  options: ["Fast, medium, and slow", "Visual, auditory, and kinaesthetic", "Practical, theoretical, and mixed", "Individual, group, and online"],
  correctAnswer: 1,
  explanation: "The three main learning styles are visual (learning by seeing), auditory (learning by hearing), and kinaesthetic (learning by doing). Understanding an apprentice's preferred style helps you adapt your training approach for better results.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 169,
  question: "When giving feedback to an apprentice, what should you focus on?",
  options: ["Only pointing out mistakes", "Specific behaviours and actions, not personality", "Comparing them to other apprentices", "Waiting until their annual review"],
  correctAnswer: 1,
  explanation: "Effective feedback focuses on specific behaviours and actions rather than personality traits. This approach is constructive, helps the apprentice understand exactly what to improve, and maintains a positive working relationship.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 170,
  question: "What is the purpose of look-ahead planning on site?",
  options: ["To predict next year's projects", "To plan the next 1-4 weeks in detail", "To review last month's work", "To forecast the weather"],
  correctAnswer: 1,
  explanation: "Look-ahead planning involves detailed planning for the next 1-4 weeks of work. It helps identify resource needs, coordinate with other trades, and spot potential problems before they cause delays.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Planning Work",
  category: "Leading on Site"
},
{
  id: 171,
  question: "Why is it important to build good relationships with subcontractor teams?",
  options: ["So they will work for lower rates", "To improve cooperation, communication, and work quality", "To avoid having formal contracts", "So you can skip safety briefings"],
  correctAnswer: 1,
  explanation: "Good relationships with subcontractor teams improve cooperation, communication, and work quality. When people work well together, problems are resolved faster, safety improves, and the project runs more smoothly.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Managing Subcontractors",
  category: "Leading on Site"
},
{
  id: 172,
  question: "What is a 'lagging indicator' in health and safety?",
  options: ["A delayed safety inspection", "A measurement of past incidents like accident rates", "A worker who is slow to follow safety rules", "A safety sign that needs replacing"],
  correctAnswer: 1,
  explanation: "Lagging indicators measure past safety performance, such as accident rates, injury frequency, or days lost to incidents. They tell you what has already happened but do not prevent future incidents.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 173,
  question: "In the GROW coaching model, what does the 'G' stand for?",
  options: ["Goals", "Guidance", "Growth", "Guidelines"],
  correctAnswer: 0,
  explanation: "In the GROW model, 'G' stands for Goals. The model follows four stages: Goal (what you want to achieve), Reality (current situation), Options (possible actions), and Will (commitment to action).",
  section: "Module 5",
  difficulty: "basic",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 174,
  question: "What should you do if a subcontractor is not meeting the agreed quality standards?",
  options: ["Ignore it and hope they improve", "Speak to them immediately and agree corrective actions", "Wait until the end of the project to mention it", "Complete their work yourself"],
  correctAnswer: 1,
  explanation: "If quality standards are not being met, address the issue immediately by speaking to the subcontractor and agreeing corrective actions. Early intervention prevents problems from escalating and ensures work meets specifications.",
  section: "Module 5",
  difficulty: "basic",
  topic: "Managing Subcontractors",
  category: "Leading on Site"
},
{
  id: 175,
  question: "When coordinating electrical first fix with the plumbing contractor, what is the most important factor to consider?",
  options: ["Who has the newest tools", "The sequence of work to avoid trades blocking each other", "Which contractor has more workers", "The colour of their company uniforms"],
  correctAnswer: 1,
  explanation: "Coordinating the sequence of work is crucial to prevent trades from blocking each other or damaging completed work. Good coordination ensures efficient progress and reduces the risk of costly delays or rework.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Planning Work",
  category: "Leading on Site"
},
{
  id: 176,
  question: "You notice that a planned activity on the critical path is likely to overrun by 3 days. What should you do first?",
  options: ["Wait to see if it actually overruns", "Inform the project manager immediately and discuss mitigation options", "Tell the workers to work faster", "Remove the activity from the programme"],
  correctAnswer: 1,
  explanation: "Critical path delays affect the entire project completion date, so immediate communication with the project manager is essential. Together you can explore mitigation options such as re-sequencing work, adding resources, or adjusting the programme.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Planning Work",
  category: "Leading on Site"
},
{
  id: 177,
  question: "A subcontractor arrives on site without the materials they need. According to good contract management, whose responsibility is this?",
  options: ["Always the main contractor's responsibility", "Always the subcontractor's responsibility", "It depends on what the contract states", "The supplier's responsibility"],
  correctAnswer: 2,
  explanation: "Material supply responsibility depends on the contract terms agreed between parties. Some contracts specify contractor-supplied materials, others require the subcontractor to supply their own. Always check the contract to establish clear responsibilities.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Managing Subcontractors",
  category: "Leading on Site"
},
{
  id: 178,
  question: "What is the best way to monitor subcontractor performance during a long project?",
  options: ["Only check their work at the end", "Regular site inspections and progress meetings with documented records", "Trust them completely without checking", "Ask other subcontractors to report on them"],
  correctAnswer: 1,
  explanation: "Regular inspections and progress meetings with documented records allow you to identify issues early, provide feedback, and ensure standards are maintained throughout the project. Documentation also provides evidence of performance for future reference.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Managing Subcontractors",
  category: "Leading on Site"
},
{
  id: 179,
  question: "Heinrich's safety triangle suggests that for every major injury, there are approximately how many near-misses?",
  options: ["10", "30", "100", "300"],
  correctAnswer: 3,
  explanation: "Heinrich's triangle suggests that for every major injury, there are approximately 300 near-misses or unsafe acts. This highlights the importance of investigating and learning from near-misses to prevent more serious incidents.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 180,
  question: "What is the main advantage of 'leading indicators' over 'lagging indicators' in safety management?",
  options: ["They are easier to measure", "They are proactive and help prevent incidents before they occur", "They cost less to implement", "They require less paperwork"],
  correctAnswer: 1,
  explanation: "Leading indicators are proactive measures such as safety inspections, toolbox talks completed, or near-miss reports. They help prevent incidents before they occur, whereas lagging indicators only measure what has already happened.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 181,
  question: "During a safety observation, you notice a worker using a damaged extension lead. What should you do?",
  options: ["Report it at the next safety meeting", "Stop the work immediately, remove the lead, and arrange replacement", "Let them finish the task first", "Tell them to be more careful"],
  correctAnswer: 1,
  explanation: "Using damaged electrical equipment is an immediate danger that could cause electrocution. Work must be stopped immediately, the hazard removed, and safe equipment provided before work resumes.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 182,
  question: "What is 'behavioural safety' in construction?",
  options: ["Disciplining workers who break rules", "Observing and influencing the way people behave to improve safety culture", "Making workers sign behaviour contracts", "Removing unsafe workers from site"],
  correctAnswer: 1,
  explanation: "Behavioural safety focuses on observing and positively influencing how people act on site to build a strong safety culture. It emphasises encouragement and engagement rather than just enforcement and discipline.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 183,
  question: "An apprentice learns best by physically doing tasks rather than reading or listening. Which learning style does this describe?",
  options: ["Visual", "Auditory", "Kinaesthetic", "Theoretical"],
  correctAnswer: 2,
  explanation: "Kinaesthetic learners learn best through physical activity and hands-on experience. For these apprentices, practical demonstrations and allowing them to try tasks under supervision is more effective than lengthy explanations or reading materials.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 184,
  question: "When using the GROW model to coach an apprentice struggling with containment installation, what should you discuss in the 'R' (Reality) stage?",
  options: ["What they want to achieve in the future", "The current situation and what is actually happening now", "All the possible solutions to the problem", "Their commitment to improving"],
  correctAnswer: 1,
  explanation: "The 'R' in GROW stands for Reality. This stage involves exploring the current situation in detail—what is actually happening, what they have tried, and what obstacles they are facing. Understanding reality helps identify the gap between where they are and where they want to be.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 185,
  question: "What is the difference between mentoring and coaching an apprentice?",
  options: ["There is no difference", "Mentoring is long-term guidance and support; coaching is short-term and task-focused", "Mentoring is only for new apprentices", "Coaching is only done by managers"],
  correctAnswer: 1,
  explanation: "Mentoring typically involves long-term guidance, support, and knowledge sharing based on the mentor's experience. Coaching is usually more short-term and task-focused, helping someone develop specific skills or solve particular problems.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 186,
  question: "During an apprentice progress review, you identify that they are falling behind schedule. What should you do?",
  options: ["Tell them they might fail their apprenticeship", "Work with them to identify reasons and create an action plan to get back on track", "Reduce their workload permanently", "Report them to their college immediately"],
  correctAnswer: 1,
  explanation: "Progress reviews are opportunities to identify issues early and provide support. Working collaboratively to understand the reasons and creating an action plan helps the apprentice get back on track whilst maintaining their confidence and motivation.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 187,
  question: "When allocating resources to a task, what factors should you consider?",
  options: ["Only the number of workers needed", "Skills required, availability, timing, equipment, and materials needed", "Only the cost of labour", "Just who is available that day"],
  correctAnswer: 1,
  explanation: "Effective resource allocation requires considering multiple factors including the skills required, worker availability, timing constraints, necessary equipment, and materials needed. This ensures the right resources are available at the right time for efficient work completion.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Planning Work",
  category: "Leading on Site"
},
{
  id: 188,
  question: "A subcontractor disputes the quality standards you have set. What is the best way to resolve this?",
  options: ["Tell them to leave site", "Refer to the contract and specifications, and discuss with the project manager if needed", "Lower your standards to keep them happy", "Get other workers to persuade them"],
  correctAnswer: 1,
  explanation: "Contract and specification documents define agreed quality standards. Referring to these provides an objective basis for discussion, and involving the project manager ensures disputes are resolved professionally whilst maintaining required standards.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Managing Subcontractors",
  category: "Leading on Site"
},
{
  id: 189,
  question: "What is the purpose of a site-specific safety induction for subcontractors?",
  options: ["To test their general health and safety knowledge", "To inform them of site-specific hazards, rules, and emergency procedures", "To check they have the right qualifications", "To introduce them to all site workers"],
  correctAnswer: 1,
  explanation: "Site-specific inductions ensure everyone understands the particular hazards, rules, and emergency procedures for that site. Even experienced workers need this information because every site has unique risks and requirements.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 190,
  question: "You notice that near-miss reports have decreased significantly. What might this indicate?",
  options: ["Safety has improved dramatically", "Workers may have stopped reporting near-misses due to fear or lack of confidence", "There are genuinely fewer hazards on site", "The safety system is working perfectly"],
  correctAnswer: 1,
  explanation: "A sudden drop in near-miss reporting often indicates an under-reporting problem rather than improved safety. Workers may have lost confidence in the reporting system, fear blame, or believe nothing will be done. This requires investigation and culture improvement.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 191,
  question: "When planning on-the-job training for an apprentice, what is the most important principle?",
  options: ["Let them watch for several weeks before trying anything", "Break tasks into manageable steps and allow supervised practice with feedback", "Give them the hardest tasks first to test them", "Have them read the manual first"],
  correctAnswer: 1,
  explanation: "Effective on-the-job training breaks complex tasks into manageable steps, allows the apprentice to practice under supervision, and provides regular feedback. This structured approach builds competence and confidence whilst ensuring safety.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 192,
  question: "How should you give constructive feedback to an apprentice who has made a mistake?",
  options: ["Criticise them in front of others as a warning to everyone", "Speak to them privately, explain what went wrong, why it matters, and how to improve", "Ignore it and hope they learn from experience", "Report them to their college immediately"],
  correctAnswer: 1,
  explanation: "Constructive feedback should be given privately to maintain dignity, clearly explain the issue and its implications, and provide specific guidance on improvement. This approach supports learning whilst maintaining a positive working relationship.",
  section: "Module 5",
  difficulty: "intermediate",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 193,
  question: "You are managing a complex electrical installation where mechanical services, fire alarm contractors, and data cabling teams all need access to the same ceiling void over the next two weeks. How should you coordinate this?",
  options: ["Let each contractor work whenever they arrive on site", "Hold a coordination meeting to agree sequence, responsibilities, and handover points, then monitor progress daily", "Tell everyone to work at the same time", "Ask the client to decide the sequence"],
  correctAnswer: 1,
  explanation: "Complex multi-trade coordination requires a planning meeting to agree the logical sequence of work, define clear responsibilities and handover points, and establish communication protocols. Daily monitoring ensures the plan is followed and allows quick resolution of emerging issues, preventing costly delays and conflicts.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Planning Work",
  category: "Leading on Site"
},
{
  id: 194,
  question: "A subcontractor has consistently delivered good work but is now two days behind schedule due to material delays from their supplier. The delay will impact the critical path. What is the most appropriate course of action?",
  options: ["Terminate their contract immediately", "Work collaboratively to explore recovery options such as revised sequencing, weekend working, or alternative materials, whilst documenting the delay and cause", "Ignore it as they usually perform well", "Demand they absorb all delay costs"],
  correctAnswer: 1,
  explanation: "Professional contract management involves working collaboratively to solve problems whilst protecting project interests. Exploring recovery options maintains progress and relationships, but documenting the delay and cause protects against future disputes and establishes the facts if claims arise. Good past performance should be considered but does not eliminate the need to manage the current issue.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Managing Subcontractors",
  category: "Leading on Site"
},
{
  id: 195,
  question: "Following three near-miss incidents involving temporary lighting in one week, what would be the most effective response to prevent a serious incident?",
  options: ["Warn workers to be more careful", "Conduct a detailed investigation into root causes, implement immediate control measures, and review the lighting system design and procurement process", "Just report the near-misses to the HSE", "Ban temporary lighting on site"],
  correctAnswer: 1,
  explanation: "Multiple similar near-misses indicate a systemic problem requiring thorough investigation of root causes, not just symptoms. Immediate controls protect workers now, but reviewing system design and procurement prevents recurrence. This demonstrates genuine safety leadership by treating near-misses as learning opportunities to prevent serious harm.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 196,
  question: "As a site leader, you notice that workers are following rules when supervisors are present but taking shortcuts when unsupervised. How should you address this safety culture issue?",
  options: ["Install more CCTV cameras to watch workers", "Implement a programme of positive behavioural observations, engage workers in safety discussions, recognise good behaviour, and investigate why shortcuts are happening", "Increase disciplinary action for rule breakers", "Accept it as normal construction site behaviour"],
  correctAnswer: 1,
  explanation: "This behaviour indicates a compliance-based rather than values-based safety culture. Lasting improvement requires engaging workers in safety ownership through positive behavioural observations, understanding why shortcuts occur (time pressure, poor planning, inadequate resources), and building intrinsic motivation through recognition and involvement. Surveillance and punishment alone do not create genuine safety culture.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 197,
  question: "Under CDM 2015, the principal contractor must ensure a construction phase plan is prepared before work starts. What is the primary purpose of this document?",
  options: ["To satisfy HSE paperwork requirements", "To provide a framework for managing health and safety throughout the construction phase, identifying arrangements, site rules, and how risks will be controlled", "To set out the project budget and timescales", "To list all contractors working on site"],
  correctAnswer: 1,
  explanation: "The construction phase plan is a live management document that sets out the framework for managing health and safety risks throughout construction. It identifies site-specific arrangements, rules, and control measures, and must be developed and updated as work progresses. It is a practical tool for managing safety, not just a compliance exercise.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Health & Safety Leadership",
  category: "Leading on Site"
},
{
  id: 198,
  question: "An apprentice is technically competent but lacks confidence in decision-making and frequently seeks approval for routine tasks. Using the GROW model, which approach would be most effective?",
  options: ["Tell them exactly what to do each time to build their confidence", "In the 'Options' stage, ask them to identify solutions themselves before offering input, then in 'Will' stage, agree actions that build their independence", "Assign them only simple tasks until they gain confidence", "Have them shadow other workers instead of working independently"],
  correctAnswer: 1,
  explanation: "The GROW model's 'Options' stage is perfect for building decision-making confidence by asking the apprentice to identify possible solutions themselves before you offer input. This develops critical thinking. The 'Will' stage then commits them to actions that progressively build independence. Telling them what to do maintains dependency rather than developing autonomy.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 199,
  question: "You are managing a project where programme delays mean an apprentice cannot complete planned work experience in data cabling installation, which is required for their qualification. What should you do?",
  options: ["Hope they can catch up later", "Proactively contact their training provider and employer to discuss alternatives such as arranging experience on another project or adjusting the training schedule", "Tell the apprentice it is not your problem", "Wait until the programme recovers"],
  correctAnswer: 1,
  explanation: "Apprentices rely on structured training programmes to achieve their qualifications. Professional responsibility requires proactively managing their development even when circumstances change. Early communication with training providers and employers allows alternative arrangements to be made, ensuring the apprentice's progression is not unfairly impacted by project delays beyond their control.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Supporting Apprentices",
  category: "Leading on Site"
},
{
  id: 200,
  question: "During programme planning, you identify that two critical activities—final electrical containment installation and plastering—both need to occur in the same areas during the same week. How should you resolve this conflict?",
  options: ["Schedule them at the same time and manage the chaos", "Re-sequence the work so containment is complete and inspected before plastering begins, adding a buffer for any remedial work, even if this extends the programme slightly", "Ask the plasterers to work around the electricians", "Remove the containment work from the critical path"],
  correctAnswer: 1,
  explanation: "Quality and safety must not be compromised by poor planning. Electrical containment must be complete and inspected before plastering covers it, otherwise defects cannot be corrected without costly rework. Re-sequencing with a buffer demonstrates professional planning that prioritises doing the job right, even if it requires programme adjustment. Attempting to work simultaneously risks both trades' work quality and safety.",
  section: "Module 5",
  difficulty: "advanced",
  topic: "Planning Work",
  category: "Leading on Site"
},
];
