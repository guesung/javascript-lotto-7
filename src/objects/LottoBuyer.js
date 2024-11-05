import { InputController, OutputController } from '../controllers/index.js';
import { calculateRate } from '../lib/utils.js';
import LottoShop from './LottoShop.js';

class LottoBuyer {
  #purchasePrice;
  #lottos;

  #lottoResult;

  async purchaseLottos() {
    this.#purchasePrice = await InputController.getPurchasePrice();

    this.#lottos = LottoShop.orderLottos(this.#purchasePrice);
    OutputController.printPurchaseHistory(this.#lottos);
  }

  checkWinningLotto(lottoCompany) {
    this.#lottoResult = lottoCompany.getLottoResult(this.#lottos);

    OutputController.printLottoResult(this.#lottoResult);
  }

  calculateReturn() {
    const lottoPrizeMoney = this.#lottoResult.getTotalPrizeMoney();

    const rateOfReturn = parseFloat(
      calculateRate(lottoPrizeMoney, this.#purchasePrice).toFixed(1),
    );

    OutputController.printRateOfReturn(rateOfReturn);
  }
}

export default LottoBuyer;
