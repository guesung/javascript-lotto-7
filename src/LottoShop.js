import InputManager from './InputManager.js';
import { LOTTO_INFORMATION_ARRAY } from './lib/constants.js';
import { calculateRateOfReturn } from './lib/utils.js';
import Lotto from './Lotto.js';

class LottoShop {
  static #lottoPrice = 1_000;

  #winningNumberArray;
  #bonusNumber;

  async draw() {
    this.#winningNumberArray = await InputManager.getWinningNumbers();
    this.#bonusNumber = await InputManager.getBonusNumber();
  }

  static purchaseLottos(purchasePrice) {
    const lottoCount = purchasePrice / LottoShop.#lottoPrice;

    return this.#generateLottoArray(lottoCount);
  }

  static #generateLottoArray(lottoCount) {
    return new Array(lottoCount).fill().map(() => new Lotto());
  }

  checkWinning(lottoArray) {
    const rankCountMap = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);

    lottoArray.forEach((lotto) => {
      const lottoRank = lotto.draw(this.#winningNumberArray, this.#bonusNumber);
      rankCountMap.set(lottoRank, rankCountMap.get(lottoRank) + 1);
    });

    return rankCountMap;
  }

  static calculateLottoPrizeMoney(rankCountMap) {
    LOTTO_INFORMATION_ARRAY.reduce(
      (prev, lottoInformation) =>
        prev +
        rankCountMap.get(lottoInformation.rank) * lottoInformation.prizeMoney +
        prev,
      0,
    );
  }

  static getLottoInformation(rank) {
    LOTTO_INFORMATION_ARRAY.find((lotto) => lotto.rank === rank);
  }

  static calculateRateOfReturn(lottoPrizeMoney, purchasePrice) {
    return parseFloat(
      calculateRateOfReturn(lottoPrizeMoney, purchasePrice).toFixed(2),
    );
  }
}

export default LottoShop;
