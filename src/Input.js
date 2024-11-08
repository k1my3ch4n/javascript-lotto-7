import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import Output from "./Output.js";
import { LOTTO_NUMBERS } from "./constants/lotto.js";
import { ERROR_MESSAGE, INPUT_MESSAGE } from "./constants/message.js";

class Input {
  async getPurchasedLotto() {
    while (true) {
      try {
        const purchaseAmountInput = await Console.readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
        const purchaseAmount = Number(purchaseAmountInput);

        this.#validatePurchaseAmount(purchaseAmount);

        const purchasedLottoCount = this.#getPurchasedLottoCount(purchaseAmount);
        const purchasedLotto = this.#getPurchasedLotto(purchasedLottoCount);

        return { purchasedLottoCount, purchasedLotto };
      } catch (error) {
        Output.printErrorMessage(error);
      }
    }
  }

  #validatePurchaseAmount(purchaseAmount) {
    const isNaN = !Number.isInteger(purchaseAmount);
    if (isNaN) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_INPUT.NOT_A_NUMBER);
    }

    const isNotDivisionByThousand = purchaseAmount % 1000 !== 0;
    if (isNotDivisionByThousand) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_INPUT.NOT_DIVISION_BY_THOUSAND);
    }

    const isZero = !purchaseAmount;
    if (isZero) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_INPUT.ZERO_NUMBER);
    }
  }

  #getPurchasedLottoCount(purchaseAmount) {
    return purchaseAmount / 1000;
  }

  #getPurchasedLotto(purchasedLottoCount) {
    const purchasedLottoList = Array.from({ length: purchasedLottoCount }, () => {
      const randomLottoNumber = this.#getRandomLottoNumber();

      Output.printPurchasedLottoNumber(randomLottoNumber);

      return randomLottoNumber;
    });

    return purchasedLottoList;
  }

  #getRandomLottoNumber() {
    return Random.pickUniqueNumbersInRange(
      LOTTO_NUMBERS.MIN_RANGE_1,
      LOTTO_NUMBERS.MAX_RANGE_45,
      LOTTO_NUMBERS.COUNT_6,
    ).sort((a, b) => a - b);
  }

  async getLottoWinningNumbers() {
    while (true) {
      try {
        const lottoWinningNumberInput = await Console.readLineAsync(INPUT_MESSAGE.LOTTO_NUMBER);
        const lottoWinningNumbers = new Set(lottoWinningNumberInput.split(",").map(Number));

        const lottoClass = new Lotto(lottoWinningNumbers);

        return { lottoClass };
      } catch (error) {
        Output.printErrorMessage(error);
      }
    }
  }

  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const bonusNumberInput = await Console.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
        const bonusNumber = Number(bonusNumberInput);

        this.#checkBonusNumber(bonusNumber, winningNumbers);

        return { bonusNumber };
      } catch (error) {
        Output.printErrorMessage(error);
      }
    }
  }

  #checkBonusNumber(bonusNumber, winningNumbers) {
    const isNaN = !Number.isInteger(bonusNumber);
    if (isNaN) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_INPUT.NOT_A_NUMBER);
    }

    const bonusNumberOutOfRange =
      bonusNumber < LOTTO_NUMBERS.MIN_RANGE_1 || bonusNumber > LOTTO_NUMBERS.MAX_RANGE_45;
    if (bonusNumberOutOfRange) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_INPUT.OUT_OF_RANGE_1_to_45);
    }

    const isDuplicatedNumber = winningNumbers.has(bonusNumber);
    if (isDuplicatedNumber) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_INPUT.DUPLICATED_NUMBER);
    }
  }
}

export default Input;
