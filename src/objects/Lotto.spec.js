import { ERROR_MESSAGE, LOTTO_RANK_MAP } from '../lib/constants.js';
import { Lotto } from './index.js';

describe('Lotto', () => {
  describe('예외 케이스', () => {
    test('로또 번호의 개수가 6개가 넘어가는 경우 예외가 발생한다.', () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 6, 7]);
      }).toThrow(ERROR_MESSAGE.NOT_SIX);
    });

    test('로또 번호에 중복된 숫자가 있는 경우 예외가 발생한다.', () => {
      expect(() => {
        new Lotto([1, 2, 3, 4, 5, 5]);
      }).toThrow(ERROR_MESSAGE.NOT_UNIQUE);
    });
  });

  describe('정상 케이스', () => {
    let lotto;

    beforeEach(() => {
      lotto = new Lotto([4, 2, 3, 6, 1, 5]);
    });

    describe('#sortByAscending', () => {
      test('로또 번호가 오름차순으로 정렬된다.', () => {
        expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
      });
    });

    describe('getRank', () => {
      test('로또 번호가 0개에서 2개 사이 당첨 될 경우 null을 반환한다.', () => {
        expect(lotto.getRank([11, 12, 13, 14, 15, 16], 20)).toBeNull();
        expect(lotto.getRank([1, 11, 12, 13, 14, 15], 20)).toBeNull();
        expect(lotto.getRank([1, 2, 11, 12, 13, 14], 20)).toBeNull();
      });
      test('로또 번호가 3개 당첨 될 경우 5를 반환한다.', () => {
        expect(lotto.getRank([1, 2, 3, 11, 12, 13], 20)).toBe(5);
      });
      test('로또 번호가 4개 당첨 될 경우 4를 반환한다.', () => {
        expect(lotto.getRank([1, 2, 3, 4, 11, 12], 20)).toBe(4);
      });
      test('로또 번호가 5개 당첨 될 경우 3를 반환한다.', () => {
        expect(lotto.getRank([1, 2, 3, 4, 5, 11], 20)).toBe(3);
      });
      test('로또 번호가 5개 당첨 되고 보너스 번호까지 당첨될 경우 2를 반환한다.', () => {
        expect(lotto.getRank([1, 2, 3, 4, 5, 11], 6)).toBe(2);
      });
      test('로또 번호가 6개 당첨 될 경우 1를 반환한다.', () => {
        expect(lotto.getRank([1, 2, 3, 4, 5, 6], 20)).toBe(1);
      });
    });

    describe('getRankInfo', () => {
      test('존재하는 rank를 입력하면 rank에 해당하는 정보를 반환한다.', () => {
        expect(Lotto.getRankInfo(1)).toStrictEqual(LOTTO_RANK_MAP[1]);
        expect(Lotto.getRankInfo(2)).toStrictEqual(LOTTO_RANK_MAP[2]);
        expect(Lotto.getRankInfo(3)).toStrictEqual(LOTTO_RANK_MAP[3]);
        expect(Lotto.getRankInfo(4)).toStrictEqual(LOTTO_RANK_MAP[4]);
        expect(Lotto.getRankInfo(5)).toStrictEqual(LOTTO_RANK_MAP[5]);
      });
      test('존재하지 않는 rank를 입력하면 undefined를 반환한다.', () => {
        expect(Lotto.getRankInfo(0)).toBeUndefined();
        expect(Lotto.getRankInfo(-1)).toBeUndefined();
        expect(Lotto.getRankInfo(100)).toBeUndefined();
      });
    });
    describe('getPrizeMoney', () => {
      test('존재하는 rank를 입력하면 rank에 해당하는 상금를 반환한다.', () => {
        expect(Lotto.getPrizeMoney(1)).toStrictEqual(
          LOTTO_RANK_MAP[1].prizeMoney,
        );
        expect(Lotto.getPrizeMoney(2)).toStrictEqual(
          LOTTO_RANK_MAP[2].prizeMoney,
        );
        expect(Lotto.getPrizeMoney(3)).toStrictEqual(
          LOTTO_RANK_MAP[3].prizeMoney,
        );
        expect(Lotto.getPrizeMoney(4)).toStrictEqual(
          LOTTO_RANK_MAP[4].prizeMoney,
        );
        expect(Lotto.getPrizeMoney(5)).toStrictEqual(
          LOTTO_RANK_MAP[5].prizeMoney,
        );
      });
      test('존재하지 않는 rank를 입력하면 0을 반환한다.', () => {
        expect(Lotto.getPrizeMoney(0)).toBe(0);
        expect(Lotto.getPrizeMoney(-1)).toBe(0);
        expect(Lotto.getPrizeMoney(100)).toBe(0);
      });
    });
  });
});
