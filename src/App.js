import Input from './Input.js';
import Lotto from './Lotto.js';
import Output from './Output.js';

class App {
  async run() {
    const input = new Input();

    const { purchasedLottoCount, purchasedLotto } = await input.getPurchasedLotto();

    Output.printLottoCount(purchasedLottoCount);

    const { lottoClass } = await input.getLottoWinningNumbers();

    const winningNumbers = lottoClass.getWinningNumbers();

    const { bonusNumber } = await input.getBonusNumber(winningNumbers);

    const { lottoResult } = lottoClass.checkLottoNumbers(purchasedLotto, bonusNumber);

    const { lottoProfitSum } = Lotto.getProfitSum(lottoResult);

    const profitRate = Lotto.getProfitRate(lottoProfitSum, purchasedLottoCount);

    Output.printLottoResult(lottoResult);
    Output.printProfitRate(profitRate);
  }
}

export default App;
