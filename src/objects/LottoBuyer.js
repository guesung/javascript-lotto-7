import { InputManager, OutputManager } from '../helpers';
import { calculateRate } from '../lib/utils.js';
import { LottoShop } from '.';

class LottoBuyer {
  #purchasePrice;
  #lottos;

  #lottoResult;

  async purchaseLottos() {
    this.#purchasePrice = await InputManager.getPurchasePrice();

    this.#lottos = LottoShop.orderLottos(this.#purchasePrice);
    OutputManager.printPurchaseHistory(this.#lottos);
  }

  checkWinningLotto(lottoCompany) {
    this.#lottoResult = lottoCompany.getLottoResult(this.#lottos);

    OutputManager.printLottoResult(this.#lottoResult);
  }

  calculateReturn() {
    const lottoPrizeMoney = this.#lottoResult.getTotalPrizeMoney();

    const rateOfReturn = parseFloat(
      calculateRate(lottoPrizeMoney, this.#purchasePrice).toFixed(2),
    );

    OutputManager.printRateOfReturn(rateOfReturn);
  }
}

export default LottoBuyer;
