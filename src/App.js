import { MissionUtils } from '@woowacourse/mission-utils';
import Input from './Input.js';
import { OUTPUT_MESSAGE } from './lib/constants.js';
import Lotto from './Lotto.js';

class App {
  #input;
  #lottoArray;

  constructor() {
    this.#input = new Input();
    this.#lottoArray = [];
  }

  async run() {
    await this.#input.getPurchasePrice();

    for (let round = 0; round < this.#input.lottoCount; round += 1) {
      const randomNumberArray = MissionUtils.Random.pickUniqueNumbersInRange(
        1,
        45,
        6,
      );
      randomNumberArray.sort((a, b) => a - b);
      const lotto = new Lotto(randomNumberArray);
      this.#lottoArray.push(lotto);
    }

    MissionUtils.Console.print(
      `${this.#input.lottoCount}${OUTPUT_MESSAGE.PURCHASE_COUNT}`,
    );
    this.#lottoArray.forEach((randomNumber) =>
      MissionUtils.Console.print(randomNumber),
    );

    await this.#input.getWinningNumbers();
    await this.#input.getBonusNumber();

    const rankMap = new Map(
      new Array(5).fill().map((_, index) => [index + 1, 0]),
    );

    let totalWinningPrice = 0;
    this.#lottoArray.forEach((lotto) => {
      const rankObject = lotto.getRankObject(
        this.#input.winningNumberArray,
        this.#input.bonusNumber,
      );

      if (rankObject) {
        rankMap.set(rankMap.get(rankObject.rank) + 1);
        totalWinningPrice += rankObject.winningPrice;
      }
    });

    const rateOfReturn = (totalWinningPrice / this.#input.purchasePrice) * 100;

    MissionUtils.Console.print(OUTPUT_MESSAGE.WINNING_STATICS);
    rankMap.forEach((value, rank) => {
      MissionUtils.Console.print(
        `${rank}개 일치 (${WINNING_PRICE_OBJECT[rank]}원) - ${value}개`,
      );
    });

    MissionUtils.Console.print(`총 수익률은 ${rateOfReturn}%입니다.`);
  }
}

export default App;
