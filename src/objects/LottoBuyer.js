import { InputManager, OutputManager } from '../helpers';
import { calculateRateOfReturn } from '../lib/utils.js';
import { LottoShop } from '.';

class LottoBuyer {
  #purchasePrice;
  #lottos;

  #LottoResult;

  async purchaseLottos() {
    this.#purchasePrice = await InputManager.getPurchasePrice();

    this.#lottos = LottoShop.orderLottos(this.#purchasePrice);
    OutputManager.printPurchaseHistory(this.#lottos);
  }

  checkWinningLotto(lottoCompany) {
    this.#LottoResult = lottoCompany.checkWinningLotto(this.#lottos);

    OutputManager.printLottoResult(this.#LottoResult);
  }

  calculateReturn() {
    const lottoPrizeMoney = this.#LottoResult.getTotalPrizeMoney();

    const rateOfReturn = parseFloat(
      calculateRateOfReturn(lottoPrizeMoney, this.#purchasePrice).toFixed(2),
    );

    OutputManager.printRateOfReturn(rateOfReturn);
  }
}

export default LottoBuyer;
