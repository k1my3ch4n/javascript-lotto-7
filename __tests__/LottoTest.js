import { LOTTO_PRIZE_MONEY } from '../src/constants/lotto.js';
import { ERROR_MESSAGE } from '../src/constants/message.js';
import Lotto from '../src/Lotto.js';

describe('로또 클래스 테스트', () => {
  describe('constructor 테스트 - 정상', () => {
    test('1 - 45 사이의 숫자 6개가 들어오면 , 에러를 출력하지 않는다.', () => {
      expect(() => {
        new Lotto(new Set([1, 2, 3, 4, 5, 6]));
      }).not.toThrow();
    });
  });

  describe('constructor 테스트 - 예외', () => {
    test.each`
      #    | input                             | errorMessage
      ${1} | ${[1, 2, 3, 4, 5]}                | ${ERROR_MESSAGE.LOTTO_NUMBER_INPUT.NOT_SIX_NUMBERS}
      ${2} | ${[1, 2, 3, 4, 5, 5]}             | ${ERROR_MESSAGE.LOTTO_NUMBER_INPUT.NOT_SIX_NUMBERS}
      ${3} | ${['a', 'b', 'c', 'd', 'e', 'f']} | ${ERROR_MESSAGE.LOTTO_NUMBER_INPUT.NOT_A_NUMBER}
      ${4} | ${[1, 2, 3, 4, 5, 'a']}           | ${ERROR_MESSAGE.LOTTO_NUMBER_INPUT.NOT_A_NUMBER}
      ${5} | ${[1, 2, 3, 4, 5, 46]}            | ${ERROR_MESSAGE.LOTTO_NUMBER_INPUT.OUT_OF_RANGE_1_to_45}
      ${6} | ${[-1, 1, 2, 3, 4, 5]}            | ${ERROR_MESSAGE.LOTTO_NUMBER_INPUT.OUT_OF_RANGE_1_to_45}
    `(`case $#) input 이 $input 일 때 , "$errorMessage" 라는 에러 메세지가 등장합니다.`, ({ input, errorMessage }) => {
      expect(() => {
        new Lotto(new Set(input));
      }).toThrow(errorMessage);
    });
  });

  describe('getWinningNumbers 테스트', () => {
    test('getWinningNumbers를 사용하면 로또 당첨 번호를 출력한다.', () => {
      const lottoWinningNumber = new Set([1, 2, 3, 4, 5, 6]);

      const lotto = new Lotto(lottoWinningNumber);

      expect([...lotto.getWinningNumbers()]).toStrictEqual([...lottoWinningNumber]);
    });
  });

  describe('checkLottoNumbers 테스트', () => {
    test.each`
      #    | winningNumbers        | purchasedLotto        | bonusNumber | lottoRank
      ${1} | ${[1, 2, 3, 4, 5, 6]} | ${[1, 2, 3, 4, 5, 6]} | ${7}        | ${1}
      ${2} | ${[1, 2, 3, 4, 5, 6]} | ${[1, 2, 3, 4, 5, 7]} | ${7}        | ${2}
      ${3} | ${[1, 2, 3, 4, 5, 6]} | ${[1, 2, 3, 4, 5, 7]} | ${8}        | ${3}
      ${4} | ${[1, 2, 3, 4, 5, 6]} | ${[1, 2, 3, 4, 7, 8]} | ${9}        | ${4}
      ${5} | ${[1, 2, 3, 4, 5, 6]} | ${[1, 2, 3, 7, 8, 9]} | ${10}       | ${5}
    `(
      `case $#) 당첨 번호가 $winningNumbers 일 때, 구매한 번호가 $purchasedLotto 이고 보너스 번호가 $bonusNumber 라면 로또 $lottoRank등의 count 가 증가한다.`,
      ({ winningNumbers, purchasedLotto, bonusNumber, lottoRank }) => {
        const lotto = new Lotto(new Set(winningNumbers));

        const { lottoResult } = lotto.checkLottoNumbers([purchasedLotto], bonusNumber);

        expect(lottoResult[lottoRank].count).toStrictEqual(1);
      },
    );
  });

  describe('getProfitSum 테스트', () => {
    test.each`
      #    | lottoRank | profitSum
      ${1} | ${1}      | ${LOTTO_PRIZE_MONEY.FIRST}
      ${2} | ${2}      | ${LOTTO_PRIZE_MONEY.SECOND}
      ${3} | ${3}      | ${LOTTO_PRIZE_MONEY.THIRD}
      ${4} | ${4}      | ${LOTTO_PRIZE_MONEY.FOURTH}
      ${5} | ${5}      | ${LOTTO_PRIZE_MONEY.FIFTH}
    `(`case $#) $lottoRank 등 일 때 , 상금의 합은 $profitSum 원 입니다.`, ({ lottoRank, profitSum }) => {
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

      lottoResult[lottoRank].count += 1;

      const { lottoProfitSum } = Lotto.getProfitSum(lottoResult);

      expect(lottoProfitSum).toStrictEqual(profitSum);
    });
  });

  describe('getProfitRate 테스트', () => {
    test.each`
      #    | lottoProfitSum             | purchasedLottoCount | profitRate
      ${1} | ${LOTTO_PRIZE_MONEY.FIRST} | ${1}                | ${200000000}
      ${2} | ${LOTTO_PRIZE_MONEY.THIRD} | ${10}               | ${15000}
      ${3} | ${LOTTO_PRIZE_MONEY.FIFTH} | ${100}              | ${5}
      ${4} | ${LOTTO_PRIZE_MONEY.FIFTH} | ${800}              | ${0.63}
    `(
      `case $#) 당첨 금액 총합이 $lottoProfitSum 이고 , 구입한 로또의 갯수가 $purchasedLottoCount개 일 때 , 수익률은 $profitRate % 입니다.`,
      ({ lottoProfitSum, purchasedLottoCount, profitRate }) => {
        const lottoProfitRate = Lotto.getProfitRate(lottoProfitSum, purchasedLottoCount);

        expect(lottoProfitRate).toStrictEqual(profitRate);
      },
    );
  });
});
