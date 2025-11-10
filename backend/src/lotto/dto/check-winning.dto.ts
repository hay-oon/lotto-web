import { IsArray, IsInt, ArrayMinSize, ArrayMaxSize, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LottoNumbersDto {
  @IsArray({ message: '[ERROR] 로또 번호는 배열이어야 합니다.' })
  @ArrayMinSize(6, { message: '[ERROR] 로또 번호는 6개여야 합니다.' })
  @ArrayMaxSize(6, { message: '[ERROR] 로또 번호는 6개여야 합니다.' })
  @IsInt({ each: true, message: '[ERROR] 로또 번호는 숫자여야 합니다.' })
  @Min(1, { each: true, message: '[ERROR] 로또 번호는 1 이상이어야 합니다.' })
  @Max(45, { each: true, message: '[ERROR] 로또 번호는 45 이하여야 합니다.' })
  numbers: number[];
}

export class CheckWinningDto {
  @IsArray({ message: '[ERROR] 당첨 번호는 배열이어야 합니다.' })
  @ArrayMinSize(6, { message: '[ERROR] 당첨 번호는 6개여야 합니다.' })
  @ArrayMaxSize(6, { message: '[ERROR] 당첨 번호는 6개여야 합니다.' })
  @IsInt({ each: true, message: '[ERROR] 당첨 번호는 숫자여야 합니다.' })
  @Min(1, { each: true, message: '[ERROR] 당첨 번호는 1 이상이어야 합니다.' })
  @Max(45, { each: true, message: '[ERROR] 당첨 번호는 45 이하여야 합니다.' })
  winningNumbers: number[];

  @IsInt({ message: '[ERROR] 보너스 번호는 숫자여야 합니다.' })
  @Min(1, { message: '[ERROR] 보너스 번호는 1 이상이어야 합니다.' })
  @Max(45, { message: '[ERROR] 보너스 번호는 45 이하여야 합니다.' })
  bonusNumber: number;

  @IsArray({ message: '[ERROR] 로또 목록은 배열이어야 합니다.' })
  @ValidateNested({ each: true })
  @Type(() => LottoNumbersDto)
  lottos: LottoNumbersDto[];
}

