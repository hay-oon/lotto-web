export class Lotto {
  private static readonly LOTTO_NUMBER_SIZE = 6;
  private static readonly LOTTO_NUMBER_MIN = 1;
  private static readonly LOTTO_NUMBER_MAX = 45;

  private readonly numbers: number[];

  constructor(numbers: number[]) {
    this.validate(numbers);
    this.numbers = this.sortNumbersAscending(numbers);
  }

  static fromRandomNumbers(): Lotto {
    const randomNumbers: number[] = [];
    const availableNumbers = Array.from(
      { length: Lotto.LOTTO_NUMBER_MAX },
      (_, i) => i + 1,
    );

    for (let i = 0; i < Lotto.LOTTO_NUMBER_SIZE; i++) {
      const randomIndex = Math.floor(
        Math.random() * availableNumbers.length,
      );
      randomNumbers.push(availableNumbers[randomIndex]);
      availableNumbers.splice(randomIndex, 1);
    }

    return new Lotto(randomNumbers);
  }

  private validate(numbers: number[]): void {
    if (numbers.length !== Lotto.LOTTO_NUMBER_SIZE) {
      throw new Error(
        `[ERROR] 로또 번호는 ${Lotto.LOTTO_NUMBER_SIZE}개여야 합니다.`,
      );
    }

    if (
      numbers.some(
        (number) =>
          number < Lotto.LOTTO_NUMBER_MIN ||
          number > Lotto.LOTTO_NUMBER_MAX,
      )
    ) {
      throw new Error(
        `[ERROR] 로또 번호는 ${Lotto.LOTTO_NUMBER_MIN}~${Lotto.LOTTO_NUMBER_MAX} 사이의 숫자여야 합니다.`,
      );
    }

    if (new Set(numbers).size !== Lotto.LOTTO_NUMBER_SIZE) {
      throw new Error(
        `[ERROR] 로또 번호는 ${Lotto.LOTTO_NUMBER_SIZE}개의 중복되지 않는 숫자여야 합니다.`,
      );
    }
  }

  private sortNumbersAscending(numbers: number[]): number[] {
    return [...numbers].sort((a, b) => a - b);
  }

  getNumbers(): number[] {
    return [...this.numbers];
  }

  toString(): string {
    return `[${this.numbers.join(', ')}]`;
  }
}

