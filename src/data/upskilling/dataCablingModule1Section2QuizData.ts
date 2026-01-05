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
    question: "In a star topology, what happens if the central hub fails?",
    options: [
      "Only the devices directly connected to the hub are affected",
      "The entire network goes down",
      "The network automatically switches to bus topology",
      "Only half of the network is affected"
    ],
    correct: 1,
    explanation: "In a star topology, all devices depend on the central hub for communication. If the hub fails, the entire network becomes non-functional, which is the main disadvantage of this topology."
  },
  {
    id: 2,
    question: "Which topology provides the highest level of fault tolerance?",
    options: [
      "Bus topology",
      "Star topology", 
      "Ring topology",
      "Mesh topology"
    ],
    correct: 3,
    explanation: "Mesh topology provides the highest fault tolerance because it has multiple redundant paths between devices. If one path fails, data can still reach its destination through alternative routes."
  },
  {
    id: 3,
    question: "What is the main advantage of bus topology?",
    options: [
      "Excellent fault tolerance",
      "Easy to troubleshoot",
      "Cost-effective with minimal cable requirements",
      "High performance with many devices"
    ],
    correct: 2,
    explanation: "Bus topology's main advantage is its cost-effectiveness, requiring the least amount of cable since all devices share a single backbone connection."
  },
  {
    id: 4,
    question: "In which scenario would you most likely choose a hybrid topology?",
    options: [
      "Small home office with 5 computers",
      "Large enterprise with multiple buildings and varying requirements",
      "Simple point-of-sale system",
      "Temporary network for an event"
    ],
    correct: 1,
    explanation: "Hybrid topologies are ideal for large enterprises with complex requirements, allowing different parts of the network to use the most appropriate topology for their specific needs whilst maintaining overall connectivity."
  },
  {
    id: 5,
    question: "Which topology is most commonly used in modern structured cabling systems?",
    options: [
      "Bus topology",
      "Ring topology",
      "Star topology", 
      "Mesh topology"
    ],
    correct: 2,
    explanation: "Star topology is the foundation of modern structured cabling systems because it provides excellent fault isolation, easy troubleshooting, scalability, and dedicated bandwidth per connection."
  }
];