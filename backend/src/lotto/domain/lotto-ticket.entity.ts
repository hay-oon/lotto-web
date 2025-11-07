import { Lotto } from './lotto.entity';

export class LottoTicket {
  private readonly lottoList: Lotto[];

  constructor(lottoList: Lotto[]) {
    this.lottoList = lottoList;
  }

  static fromPurchaseNumber(purchaseNumber: number): LottoTicket {
    const lottoList: Lotto[] = [];
    for (let i = 0; i < purchaseNumber; i++) {
      lottoList.push(Lotto.fromRandomNumbers());
    }
    return new LottoTicket(lottoList);
  }

  getLottoList(): Lotto[] {
    return [...this.lottoList];
  }

  getPurchaseCount(): number {
    return this.lottoList.length;
  }
}

