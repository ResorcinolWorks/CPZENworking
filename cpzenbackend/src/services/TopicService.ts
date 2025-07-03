import { Topic } from '../types';

// Topics data - sync this with frontend src/lib/topics.ts
const TOPICS: Topic[] = [
  {
    id: "cpp-stl",
    name: "C++ & STL",
    link: "https://youtube.com/playlist?list=PLauivoElc3gh3RCiQA82MDI-gJfXQQVnn",
    difficulty: "Easy",
    rating: "800-1000"
  },
  {
    id: "arrays-hashing",
    name: "Arrays & Hashing",
    link: "https://youtube.com/playlist?list=PLauivoElc3gh3RCiQA82MDI-gJfXQQVnn",
    difficulty: "Easy",
    rating: "800-1000"
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    link: "https://youtube.com/playlist?list=PL_z_8CaSLPWeM8BDJmIYDaoQ5zuwyxnfj",
    difficulty: "Easy",
    rating: "1000-1200"
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    link: "https://youtube.com/playlist?list=PL_z_8CaSLPWeM8BDJmIYDaoQ5zuwyxnfj",
    difficulty: "Easy",
    rating: "1000-1200"
  },
  {
    id: "number-theory",
    name: "Number Theory",
    link: "https://youtube.com/playlist?list=PLauivoElc3giVROwL-6g9hO-LlSen_NaV",
    difficulty: "Medium",
    rating: "1200-1400"
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    link: "https://youtube.com/live/5rtVTYAk9KQ?feature=share",
    additional_links: [
      "https://youtube.com/live/ZwU6wSkepBI?feature=share",
      "https://hackerearth.com/practice/basic-programming/bit-manipulation/basics-of-bit-manipulation/tutorial/"
    ],
    difficulty: "Easy",
    rating: "1000-1200"
  },
  {
    id: "binary-search",
    name: "Binary Search",
    link: "https://youtube.com/playlist?list=PL_z_8CaSLPWeYfhtuKHj-9MpYb6XQJ_f2",
    additional_links: [
      "https://youtube.com/live/Kb3KOTQfjew?feature=share",
      "https://usaco.guide/silver/binary-search?lang=cpp"
    ],
    difficulty: "Easy",
    rating: "1200-1400"
  },
  {
    id: "recursion",
    name: "Recursion",
    link: "https://youtube.com/playlist?list=PL_z_8CaSLPWeT1ffjiImo0sYTcnLzo-wY",
    difficulty: "Medium",
    rating: "1200-1400"
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    link: "https://youtube.com/playlist?list=PLqf9emQRQrnKA_EeveiXQj_uP25w8_5qL",
    practice_sheet: "https://x.com/shivambhadani_/status/1665961548333060096",
    difficulty: "Medium",
    rating: "1400-1600"
  },
  {
    id: "graphs",
    name: "Graphs",
    link: "https://youtube.com/playlist?list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw",
    difficulty: "Medium",
    rating: "1600-1800"
  },
  {
    id: "trees",
    name: "Trees",
    link: "https://youtu.be/HL5ouhfxlgk",
    difficulty: "Medium",
    rating: "1400-1600"
  },
  {
    id: "dsu",
    name: "DSU (Disjoint Set Union)",
    link: "https://youtube.com/playlist?list=PLqf9emQRQrnIQ3DkkyBNGe1s4l3HqMqrz",
    difficulty: "Hard",
    rating: "1600-1800"
  },
  {
    id: "bitmask-dp",
    name: "Bitmask DP",
    link: "https://youtube.com/playlist?list=PLb3g_Z8nEv1icFNrtZqByO1CrWVHLlO5g",
    difficulty: "Hard",
    rating: "1800+"
  },
  {
    id: "digit-dp",
    name: "Digit DP",
    link: "https://youtube.com/playlist?list=PLb3g_Z8nEv1hB69JL9K7KfEyK8iQNj9nX",
    difficulty: "Hard",
    rating: "1800+"
  },
  {
    id: "segment-trees",
    name: "Segment Trees",
    link: "https://youtu.be/-dUiRtJ8ot0",
    difficulty: "Hard",
    rating: "1800+"
  },
  {
    id: "binary-lifting-lca",
    name: "Binary Lifting & LCA",
    link: "https://youtu.be/WXMnRa3NkTQ",
    difficulty: "Hard",
    rating: "1800+"
  }
];

export class TopicService {
  static getAllTopics(): Topic[] {
    return TOPICS;
  }

  static getTopicById(id: string): Topic | null {
    return TOPICS.find(topic => topic.id === id) || null;
  }

  static getTopicsByDifficulty(difficulty: 'Easy' | 'Medium' | 'Hard'): Topic[] {
    return TOPICS.filter(topic => topic.difficulty === difficulty);
  }

  static validateTopicId(id: string): boolean {
    return TOPICS.some(topic => topic.id === id);
  }

  static getTopicStats() {
    const difficultyCount = TOPICS.reduce((acc, topic) => {
      acc[topic.difficulty] = (acc[topic.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: TOPICS.length,
      byDifficulty: difficultyCount
    };
  }
} 