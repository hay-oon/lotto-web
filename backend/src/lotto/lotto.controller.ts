import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { LottoService } from './lotto.service';
import { PurchaseLottoDto } from './dto/purchase-lotto.dto';
import { CheckWinningDto } from './dto/check-winning.dto';
import {
  PurchaseLottoResponseDto,
  CheckWinningResponseDto,
  RankCountDto,
} from './dto/lotto-response.dto';
import { Rank } from './domain/rank.enum';
import { LottoTicket } from './domain/lotto-ticket.domain';
import { Lotto } from './domain/lotto.domain';

@Controller('lotto')
export class LottoController {
  constructor(private readonly lottoService: LottoService) {}

  @Post('purchase')
  @HttpCode(HttpStatus.OK)
  purchaseLotto(
    @Body(ValidationPipe) purchaseLottoDto: PurchaseLottoDto,
  ): PurchaseLottoResponseDto {
    const lottoTicket = this.lottoService.purchaseLotto(
      purchaseLottoDto.purchaseAmount,
    );

    return {
      purchaseCount: lottoTicket.getPurchaseCount(),
      lottos: lottoTicket.getLottoList().map((lotto) => ({
        numbers: lotto.getNumbers(),
      })),
    };
  }

  @Post('check')
  @HttpCode(HttpStatus.OK)
  checkWinning(
    @Body(ValidationPipe) checkWinningDto: CheckWinningDto,
  ): CheckWinningResponseDto {
    const lottos = checkWinningDto.lottos.map(
      (lottoDto) => new Lotto(lottoDto.numbers),
    );
    const lottoTicket = new LottoTicket(lottos);

    const { result, earningRate } = this.lottoService.checkWinning(
      lottoTicket,
      checkWinningDto.winningNumbers,
      checkWinningDto.bonusNumber,
    );

    const rankCounts: RankCountDto[] = Object.values(Rank).map((rank) => ({
      rank,
      count: result.getRankCount(rank),
      prize: Rank.getPrize(rank),
    }));

    return {
      rankCounts,
      totalPrize: result.getTotalPrize(),
      earningRate,
    };
  }
}

