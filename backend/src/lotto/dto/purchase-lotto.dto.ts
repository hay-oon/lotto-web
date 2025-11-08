import { IsInt, Min, IsPositive } from 'class-validator';

export class PurchaseLottoDto {
  @IsInt({ message: '[ERROR] 구입 금액은 숫자여야 합니다.' })
  @Min(1000, { message: '[ERROR] 구입 금액은 최소 1,000원 이상이어야 합니다.' })
  @IsPositive({ message: '[ERROR] 구입 금액은 0보다 커야 합니다.' })
  purchaseAmount: number;
}

