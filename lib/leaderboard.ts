import leaderboardData from "@/data/leaderboard.json";

export const CATEGORY_WEIGHTS = {
  overall: {
    reasoning: 0.25,
    reliability: 0.2,
    cost: 0.15,
    speed: 0.15,
    coding: 0.15,
    UX: 0.1
  },
  business: {
    reliability: 0.3,
    safety: 0.2,
    integrations: 0.2,
    cost: 0.15,
    support: 0.15
  },
  developer: {
    code: 0.3,
    debug: 0.2,
    docs: 0.15,
    speed: 0.1,
    reasoning: 0.15,
    api: 0.1
  },
  consumer: {
    UX: 0.25,
    creativity: 0.2,
    speed: 0.2,
    value: 0.2,
    reliability: 0.15
  }
} as const;

export type CategoryKey = keyof typeof CATEGORY_WEIGHTS;

type ModelScores = {
  name: string;
  slug: string;
  scores: Record<string, number>;
};

export type LeaderboardResult = {
  name: string;
  slug: string;
  rubricScores: Record<string, number>;
  finalScore: number;
};

const models = leaderboardData as ModelScores[];

export function getLeaderboard(category: CategoryKey): LeaderboardResult[] {
  const weights = CATEGORY_WEIGHTS[category];

  return models
    .map((model) => {
      const finalScore = Object.entries(weights).reduce((sum, [key, weight]) => {
        const value = model.scores[key] ?? 0;
        return sum + value * weight;
      }, 0);

      return {
        name: model.name,
        slug: model.slug,
        rubricScores: Object.fromEntries(Object.keys(weights).map((key) => [key, model.scores[key] ?? 0])),
        finalScore
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
}
