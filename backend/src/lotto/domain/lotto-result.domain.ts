import { LottoTicket } from './lotto-ticket.domain';
import { WinningNumber } from './winning-number.domain';
import { Rank, RankHelper } from './rank.enum';
import { Lotto } from './lotto.domain';

export class LottoResult {
  private readonly rankCountMap: Map<Rank, number>;

  constructor(rankCountMap: Map<Rank, number>) {
    this.rankCountMap = rankCountMap;
  }

  static matchNumber(
    lottoTicket: LottoTicket,
    winningNumber: WinningNumber,
  ): LottoResult {
    const rankCountMap = LottoResult.initializeRankCountMap();

    for (const lotto of lottoTicket.getLottoList()) {
      const matchCount = LottoResult.calculateMatchCount(
        lotto,
        winningNumber,
      );
      const hasBonus = LottoResult.hasBonusNumber(lotto, winningNumber);

      const rank = RankHelper.from(matchCount, hasBonus);
      rankCountMap.set(rank, (rankCountMap.get(rank) || 0) + 1);
    }

    return new LottoResult(rankCountMap);
  }

  private static initializeRankCountMap(): Map<Rank, number> {
    const rankCountMap = new Map<Rank, number>();
    Object.values(Rank).forEach((rank) => {
      rankCountMap.set(rank, 0);
    });
    return rankCountMap;
  }

  private static calculateMatchCount(
    lotto: Lotto,
    winningNumber: WinningNumber,
  ): number {
    let matchCount = 0;
    const winningNumbers = winningNumber.getWinningNumbers();

    for (const number of lotto.getNumbers()) {
      if (winningNumbers.includes(number)) {
        matchCount++;
      }
    }

    return matchCount;
  }

  private static hasBonusNumber(
    lotto: Lotto,
    winningNumber: WinningNumber,
  ): boolean {
    return lotto.getNumbers().includes(winningNumber.getBonusNumber());
  }

  getTotalPrize(): number {
    let totalPrize = 0;
    this.rankCountMap.forEach((count, rank) => {
      totalPrize += RankHelper.getPrize(rank) * count;
    });
    return totalPrize;
  }

  getRankCount(rank: Rank): number {
    return this.rankCountMap.get(rank) || 0;
  }

  getRankCountMap(): Map<Rank, number> {
    return new Map(this.rankCountMap);
  }
}

