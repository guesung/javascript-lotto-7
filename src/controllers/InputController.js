import { MissionUtils } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE, INPUT_MESSAGE, LOTTO } from '../lib/constants.js';
import {
  getIsAllItemsBetweenNumbers,
  getIsAllItemsNumeric,
  getIsAllItemsUnique,
  getIsArrayLengthMatch,
  getIsBetweenNumbers,
  getIsNumeric,
  getIsPositive,
  getIsThousandUnit,
  retryWhileCatchedError,
} from '../lib/utils.js';

class InputManager {
  static #SPLIT_SEPARATOR = ',';

  static async readLineAsync(message) {
    const response = await MissionUtils.Console.readLineAsync(message);

    return response;
  }

  static async getPurchasePrice() {
    return retryWhileCatchedError(async () => {
      const rawPurchasePrice = await this.readLineAsync(
        INPUT_MESSAGE.PURCHASE_PRICE,
      );
      const purchasePrice = this.#parsePurchasePrice(rawPurchasePrice);
      this.#validatePurchasePrice(purchasePrice);

      return purchasePrice;
    });
  }

  static async getWinningNumbers() {
    return retryWhileCatchedError(async () => {
      const rawWinningNumbers = await this.readLineAsync(
        INPUT_MESSAGE.WINNING_NUMBER,
      );
      const winningNumbers = this.#parseWinningNumbers(rawWinningNumbers);
      this.#validateWinningNumbers(winningNumbers);

      return winningNumbers;
    });
  }

  static async getBonusNumber(winningNumbers) {
    return retryWhileCatchedError(async () => {
      const rawBonusNumber = await this.readLineAsync(
        INPUT_MESSAGE.BONUS_NUMBER,
      );
      const bonusNumber = this.#parseBonusNumber(rawBonusNumber);
      this.#validateBonusNumber(winningNumbers, bonusNumber);

      return bonusNumber;
    });
  }

  static #validatePurchasePrice(purchasePrice) {
    if (!getIsNumeric(purchasePrice))
      throw new Error(ERROR_MESSAGE.NOT_NUMERIC);
    if (!getIsThousandUnit(purchasePrice))
      throw new Error(ERROR_MESSAGE.NOT_THOUSAND_UNIT);
    if (!getIsPositive(purchasePrice))
      throw new Error(ERROR_MESSAGE.NOT_POSITIVE);
  }

  static #validateWinningNumbers(winningNumbers) {
    if (!getIsArrayLengthMatch(winningNumbers, LOTTO.NUMBER_COUNT))
      throw new Error(ERROR_MESSAGE.NOT_SIX);
    if (!getIsAllItemsNumeric(winningNumbers))
      throw new Error(ERROR_MESSAGE.NOT_NUMERIC);
    if (
      !getIsAllItemsBetweenNumbers(
        winningNumbers,
        LOTTO.MIN_NUMBER,
        LOTTO.MAX_NUMBER,
      )
    )
      throw new Error(ERROR_MESSAGE.NOT_BETWEEN_1_AND_45);

    if (!getIsAllItemsUnique(winningNumbers))
      throw new Error(ERROR_MESSAGE.NOT_UNIQUE);
  }

  static #validateBonusNumber(winningNumbers, bonusNumber) {
    if (!getIsNumeric(bonusNumber)) throw new Error(ERROR_MESSAGE.NOT_NUMERIC);
    if (!getIsPositive(bonusNumber))
      throw new Error(ERROR_MESSAGE.NOT_POSITIVE);
    if (!getIsBetweenNumbers(bonusNumber, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER))
      throw new Error(ERROR_MESSAGE.NOT_BETWEEN_1_AND_45);
    if (!getIsAllItemsUnique([...winningNumbers, bonusNumber]))
      throw new Error(ERROR_MESSAGE.NOT_UNIQUE);
  }

  static #parsePurchasePrice(rawPurchasePrice) {
    return Number(rawPurchasePrice);
  }

  static #parseWinningNumbers(rawWinningNumbers) {
    return rawWinningNumbers.split(this.#SPLIT_SEPARATOR).map(Number);
  }

  static #parseBonusNumber(rawBonusNumber) {
    return Number(rawBonusNumber);
  }
}

export default InputManager;
