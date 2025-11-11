export enum Rank {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH',
  FIFTH = 'FIFTH',
  NONE = 'NONE',
}

export interface LottoNumbers {
  numbers: number[];
}

export interface PurchaseLottoRequest {
  purchaseAmount: number;
}

export interface PurchaseLottoResponse {
  purchaseCount: number;
  lottos: LottoNumbers[];
}

export interface RankCount {
  rank: Rank;
  count: number;
  prize: number;
}

export interface CheckWinningRequest {
  winningNumbers: number[];
  bonusNumber: number;
  lottos: LottoNumbers[];
}

export interface CheckWinningResponse {
  rankCounts: RankCount[];
  totalPrize: number;
  earningRate: number;
}

