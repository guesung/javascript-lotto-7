import { ERROR_MESSAGE, LOTTO, LOTTO_RANK_MAP } from '../lib/constants.js';
import {
  getIsAllItemsUnique,
  getIsArrayLengthMatch,
  intersection,
} from '../lib/utils.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;

    this.#validate();
    this.#sortByAscending();
  }

  get numbers() {
    return this.#numbers;
  }

  getRank(winningNumbers, bonusNumber) {
    const winningCount = this.#getWinningNumberCount(winningNumbers);
    const isBonusMatch = this.#getIsBonusMatch(bonusNumber);

    const rank = Lotto.#calculateRank(winningCount, isBonusMatch);
    return rank;
  }

  #validate() {
    if (!getIsArrayLengthMatch(this.#numbers, LOTTO.NUMBER_COUNT))
      throw new Error(ERROR_MESSAGE.NOT_SIX);
    if (!getIsAllItemsUnique(this.#numbers))
      throw new Error(ERROR_MESSAGE.NOT_UNIQUE);
  }

  #sortByAscending() {
    this.#numbers.sort((a, b) => a - b);
  }

  #getWinningNumberCount(winningNumbers) {
    return intersection(this.#numbers, winningNumbers).length;
  }

  #getIsBonusMatch(bonusNumber) {
    return intersection(this.#numbers, [bonusNumber]).length > 0;
  }

  static #calculateRank(winningCount, isBonusMatch) {
    const rankData = Object.entries(LOTTO_RANK_MAP).find(
      ([_, info]) =>
        info.winningCount === winningCount &&
        info.isBonusMatch === isBonusMatch,
    );

    if (rankData) return Number(rankData[0]);
    return null;
  }

  static getRankInfo(rank) {
    return LOTTO_RANK_MAP[rank];
  }

  static getPrizeMoney(rank) {
    return this.getRankInfo(rank)?.prizeMoney ?? 0;
  }
}

export default Lotto;
