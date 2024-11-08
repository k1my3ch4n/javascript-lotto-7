import { Console } from "@woowacourse/mission-utils";
import { LOTTO_RANK, OUTPUT_MESSAGE } from "./constants/message.js";

class Output {
  static printLottoCount(lottoCount) {
    Console.print(`${lottoCount}${OUTPUT_MESSAGE.PURCHASED_COUNT}`);
  }

  static printPurchasedLottoNumber(lottoNumber) {
    Console.print(`[${lottoNumber.join(", ")}]`);
  }

  static printLottoResult(lottoResult) {
    Console.print(OUTPUT_MESSAGE.PRIZE_STATISTICS);

    Object.entries(lottoResult).forEach(([key, { prize, count }]) => {
      Console.print(`${LOTTO_RANK[key]} (${prize.toLocaleString()}원) - ${count}개`);
    });
  }

  static printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate.toLocaleString()}%입니다.`);
  }

  static printErrorMessage(error) {
    Console.print(`[ERROR] ${error.message}`);
  }
}

export default Output;
