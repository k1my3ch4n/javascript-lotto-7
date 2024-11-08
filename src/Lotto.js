import { LOTTO_NUMBERS, LOTTO_PRIZE_MONEY } from './constants/lotto.js';
import { ERROR_MESSAGE } from './constants/message.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(lottoSet) {
    const isNotSixNumbers = lottoSet.size != LOTTO_NUMBERS.COUNT_6;

    if (isNotSixNumbers) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_INPUT.NOT_SIX_NUMBERS);
    }

    const hasNaN = [...lottoSet].some(lottoNumber => !Number.isInteger(lottoNumber));

    if (hasNaN) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_INPUT.NOT_A_NUMBER);
    }

    const hasOutOfRange = [...lottoSet].some(lottoNumber => {
      const isOutOfRange = lottoNumber < LOTTO_NUMBERS.MIN_RANGE_1 || lottoNumber > LOTTO_NUMBERS.MAX_RANGE_45;

      return isOutOfRange;
    });

    if (hasOutOfRange) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_INPUT.OUT_OF_RANGE_1_to_45);
    }
  }

  getWinningNumbers() {
    return this.#numbers;
  }

  checkLottoNumbers(purchasedLotto, bonusNumber) {
    const lottoResult = {
      1: {
        prize: LOTTO_PRIZE_MONEY.FIRST,
        count: 0,
      },
      2: {
        prize: LOTTO_PRIZE_MONEY.SECOND,
        count: 0,
      },
      3: {
        prize: LOTTO_PRIZE_MONEY.THIRD,
        count: 0,
      },
      4: {
        prize: LOTTO_PRIZE_MONEY.FOURTH,
        count: 0,
      },
      5: {
        prize: LOTTO_PRIZE_MONEY.FIFTH,
        count: 0,
      },
    };

    purchasedLotto.forEach(lotto => {
      const { matchingNumberCount } = this.#getMatchingNumberCount(lotto, this.#numbers);

      const isFirst = matchingNumberCount === 6;
      if (isFirst) {
        lottoResult[1].count += 1;
      }

      const isSecond = matchingNumberCount === 5 && lotto.includes(bonusNumber);
      if (isSecond) {
        lottoResult[2].count += 1;
      }

      const isThird = matchingNumberCount === 5 && !lotto.includes(bonusNumber);
      if (isThird) {
        lottoResult[3].count += 1;
      }

      const isFourth = matchingNumberCount === 4;
      if (isFourth) {
        lottoResult[4].count += 1;
      }

      const isFifth = matchingNumberCount === 3;
      if (isFifth) {
        lottoResult[5].count += 1;
      }
    });

    return { lottoResult };
  }

  #getMatchingNumberCount(lotto, winningNumbers) {
    let matchingNumberCount = 0;

    lotto.forEach(number => {
      const isWinningNumber = winningNumbers.has(number);

      if (isWinningNumber) {
        matchingNumberCount += 1;
      }
    });

    return { matchingNumberCount };
  }

  static getProfitSum(lottoResult) {
    let lottoProfitSum = 0;

    Object.values(lottoResult).forEach(({ prize, count }) => {
      lottoProfitSum += prize * count;
    });

    return { lottoProfitSum };
  }

  static getProfitRate(lottoProfitSum, purchasedLottoCount) {
    const profitRate = (lottoProfitSum / (purchasedLottoCount * 1000)) * 100;

    return Math.round(profitRate * 100) / 100;
  }
}

export default Lotto;
