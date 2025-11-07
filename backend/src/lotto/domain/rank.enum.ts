export enum Rank {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH',
  FIFTH = 'FIFTH',
  NONE = 'NONE',
}

export interface RankConfig {
  matchCount: number;
  prize: number;
  hasBonus: boolean;
}

export const RANK_CONFIG: Record<Rank, RankConfig> = {
  [Rank.FIRST]: { matchCount: 6, prize: 2_000_000_000, hasBonus: false },
  [Rank.SECOND]: { matchCount: 5, prize: 30_000_000, hasBonus: true },
  [Rank.THIRD]: { matchCount: 5, prize: 1_500_000, hasBonus: false },
  [Rank.FOURTH]: { matchCount: 4, prize: 50_000, hasBonus: false },
  [Rank.FIFTH]: { matchCount: 3, prize: 5_000, hasBonus: false },
  [Rank.NONE]: { matchCount: 0, prize: 0, hasBonus: false },
};

export class RankHelper {
  static from(matchCount: number, hasBonus: boolean): Rank {
    if (matchCount === 6) {
      return Rank.FIRST;
    }
    if (matchCount === 5 && hasBonus) {
      return Rank.SECOND;
    }
    if (matchCount === 5) {
      return Rank.THIRD;
    }
    if (matchCount === 4) {
      return Rank.FOURTH;
    }
    if (matchCount === 3) {
      return Rank.FIFTH;
    }
    return Rank.NONE;
  }

  static getMatchCount(rank: Rank): number {
    return RANK_CONFIG[rank].matchCount;
  }

  static getPrize(rank: Rank): number {
    return RANK_CONFIG[rank].prize;
  }

  static hasBonus(rank: Rank): boolean {
    return RANK_CONFIG[rank].hasBonus;
  }
}

