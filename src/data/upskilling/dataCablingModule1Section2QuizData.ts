export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const dataCablingModule1Section2Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'In a star topology, what happens if the central hub or switch fails?',
    options: [
      'Only the single device that detected the fault is affected',
      'The entire network goes down',
      'Traffic reroutes through a neighbouring node',
      'Only the segment beyond the hub is affected',
    ],
    correct: 1,
    explanation:
      'In a star topology every device connects back to one central hub or switch, so all communication depends on it. If that central node fails the whole network goes down, which is the main weakness of the star.',
  },
  {
    id: 2,
    question: 'Which topology provides the highest level of fault tolerance?',
    options: ['Bus topology', 'Star topology', 'Ring topology', 'Mesh topology'],
    correct: 3,
    explanation:
      'Mesh topology provides the highest fault tolerance because it has multiple redundant paths between devices. If one path fails, data can still reach its destination through alternative routes.',
  },
  {
    id: 3,
    question: 'What is the main advantage of a bus topology?',
    options: [
      'Cost-effective with minimal cabling',
      'Simple to isolate and troubleshoot faults',
      'Continues working if the backbone is cut',
      'Sustains high throughput with many devices',
    ],
    correct: 0,
    explanation:
      'A bus topology uses the least cable because every device taps into one shared backbone, making it cheap to install. Its trade-off is poor fault tolerance, since a single break in the backbone takes down the whole segment.',
  },
  {
    id: 4,
    question: 'In which scenario would you most likely choose a hybrid topology?',
    options: [
      'Small home office with five computers',
      'A single temporary network for an event',
      'A standalone point-of-sale till',
      'Large enterprise spanning multiple buildings with varying requirements',
    ],
    correct: 3,
    explanation:
      'Hybrid topologies suit large enterprises with complex, mixed requirements, letting each part of the network adopt the most appropriate topology whilst staying interconnected. Small or temporary installations rarely justify the added complexity.',
  },
  {
    id: 5,
    question: 'Which topology is most commonly used in modern structured cabling systems?',
    options: ['Bus topology', 'Ring topology', 'Star topology', 'Mesh topology'],
    correct: 2,
    explanation:
      'Star topology is the foundation of modern structured cabling systems because it provides excellent fault isolation, easy troubleshooting, scalability, and dedicated bandwidth per connection.',
  },
];
