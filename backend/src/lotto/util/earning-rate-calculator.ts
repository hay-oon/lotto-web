import { LottoResult } from '../domain/lotto-result.domain';

export class EarningRateCalculator {
  public static readonly LOTTO_PRICE = 1000;

  static calculateEarningRate(
    lottoResult: LottoResult,
    purchaseNumber: number,
  ): number {
    const totalPrize = lottoResult.getTotalPrize();
    const totalPurchaseAmount = purchaseNumber * EarningRateCalculator.LOTTO_PRICE;

    return (totalPrize / totalPurchaseAmount) * 100;
  }
}

