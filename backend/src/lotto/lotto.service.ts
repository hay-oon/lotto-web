import { Injectable } from '@nestjs/common';
import { LottoTicket } from './domain/lotto-ticket.domain';
import { WinningNumber } from './domain/winning-number.domain';
import { LottoResult } from './domain/lotto-result.domain';
import { EarningRateCalculator } from './util/earning-rate-calculator';

@Injectable()
export class LottoService {
  purchaseLotto(purchaseAmount: number): LottoTicket {
    const purchaseNumber = purchaseAmount / EarningRateCalculator.LOTTO_PRICE;
    return LottoTicket.fromPurchaseNumber(purchaseNumber);
  }

  checkWinning(
    lottoTicket: LottoTicket,
    winningNumbers: number[],
    bonusNumber: number,
  ): { result: LottoResult; earningRate: number; purchaseNumber: number } {
    const winningNumber = new WinningNumber(winningNumbers, bonusNumber);
    const result = LottoResult.matchNumber(lottoTicket, winningNumber);
    const purchaseNumber = lottoTicket.getPurchaseCount();
    const earningRate = EarningRateCalculator.calculateEarningRate(
      result,
      purchaseNumber,
    );

    return { result, earningRate, purchaseNumber };
  }
}
