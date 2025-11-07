export class WinningNumber {
  private static readonly WINNING_NUMBERS_SIZE = 6;
  private static readonly WINNING_NUMBER_MIN = 1;
  private static readonly WINNING_NUMBER_MAX = 45;

  private readonly winningNumbers: number[];
  private readonly bonusNumber: number;

  constructor(winningNumbers: number[], bonusNumber: number) {
    this.validateWinningNumbers(winningNumbers);
    this.validateBonusNumber(bonusNumber);
    this.validateDuplicateNumber(winningNumbers, bonusNumber);
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  private validateWinningNumbers(winningNumbers: number[]): void {
    if (winningNumbers.length !== WinningNumber.WINNING_NUMBERS_SIZE) {
      throw new Error(
        `[ERROR] 당첨 번호는 ${WinningNumber.WINNING_NUMBERS_SIZE}개여야 합니다.`,
      );
    }

    if (
      winningNumbers.some(
        (number) =>
          number < WinningNumber.WINNING_NUMBER_MIN ||
          number > WinningNumber.WINNING_NUMBER_MAX,
      )
    ) {
      throw new Error(
        `[ERROR] 당첨 번호는 ${WinningNumber.WINNING_NUMBER_MIN}~${WinningNumber.WINNING_NUMBER_MAX} 사이의 숫자여야 합니다.`,
      );
    }

    if (new Set(winningNumbers).size !== WinningNumber.WINNING_NUMBERS_SIZE) {
      throw new Error(
        `[ERROR] 당첨 번호는 ${WinningNumber.WINNING_NUMBERS_SIZE}개의 중복되지 않는 숫자여야 합니다.`,
      );
    }
  }

  private validateBonusNumber(bonusNumber: number): void {
    if (
      bonusNumber < WinningNumber.WINNING_NUMBER_MIN ||
      bonusNumber > WinningNumber.WINNING_NUMBER_MAX
    ) {
      throw new Error(
        `[ERROR] 보너스 번호는 ${WinningNumber.WINNING_NUMBER_MIN}~${WinningNumber.WINNING_NUMBER_MAX} 사이의 숫자여야 합니다.`,
      );
    }
  }

  private validateDuplicateNumber(
    winningNumbers: number[],
    bonusNumber: number,
  ): void {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(
        '[ERROR] 보너스 번호는 당첨번호와 중복될 수 없습니다.',
      );
    }
  }

  getWinningNumbers(): number[] {
    return [...this.winningNumbers];
  }

  getBonusNumber(): number {
    return this.bonusNumber;
  }
}

