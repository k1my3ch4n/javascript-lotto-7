import { ERROR_MESSAGE } from "../constants/message.js";

const LOTTO_MIN_NUMBER_1 = 1;
const LOTTO_MAX_NUMBER_45 = 45;
const LOTTO_NUMBERS_COUNT_6 = 6;

class Validate {
  static checkPurchaseAmount(purchaseAmount) {
    const isNaN = !Number.isInteger(purchaseAmount);

    if (isNaN) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_INPUT.NOT_A_NUMBER);
    }

    const isNotDivisionByThousand = purchaseAmount % 1000 !== 0;

    if (isNotDivisionByThousand) {
      throw new Error(
        ERROR_MESSAGE.PURCHASE_AMOUNT_INPUT.NOT_DIVISION_BY_THOUSAND
      );
    }
  }

  static checkLottoNumbers(lottoArray) {
    const isNotSixNumbers = lottoArray.length != LOTTO_NUMBERS_COUNT_6;

    if (isNotSixNumbers) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_INPUT.NOT_SIX_NUMBERS);
    }

    const hasNaN = lottoArray.some(
      (lottoNumber) => !Number.isInteger(lottoNumber)
    );

    if (hasNaN) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_INPUT.NOT_A_NUMBER);
    }

    const hasOutOfRange = lottoArray.some((lottoNumber) =>
      Validate.checkOutOfRange(lottoNumber)
    );

    if (hasOutOfRange) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_INPUT.OUT_OF_RANGE_1_to_45);
    }
  }

  static checkBonusNumber(bonusNumber, lottoArray) {
    const isNaN = !Number.isInteger(bonusNumber);

    if (isNaN) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_INPUT.NOT_A_NUMBER);
    }

    const bonusNumberOutOfRange = Validate.checkOutOfRange(bonusNumber);

    if (bonusNumberOutOfRange) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_INPUT.OUT_OF_RANGE_1_to_45);
    }

    const isDuplicatedNumber = lottoArray.has(bonusNumber);

    if (isDuplicatedNumber) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_INPUT.DUPLICATED_NUMBER);
    }
  }

  static checkOutOfRange(number) {
    return number < LOTTO_MIN_NUMBER_1 || number > LOTTO_MAX_NUMBER_45;
  }
}

export default Validate;
