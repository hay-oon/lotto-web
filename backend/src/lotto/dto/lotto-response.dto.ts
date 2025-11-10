import { Rank } from '../domain/rank.enum';

export class LottoResponseDto {
  numbers: number[];
}

export class PurchaseLottoResponseDto {
  purchaseCount: number;
  lottos: LottoResponseDto[];
}

export class RankCountDto {
  rank: Rank;
  count: number;
  prize: number;
}

export class CheckWinningResponseDto {
  rankCounts: RankCountDto[];
  totalPrize: number;
  earningRate: number;
}

