/* @flow */
export function rand(num: number = 1): number {
  return Math.floor(Math.random() * num);
}

export function choose(arr: Array<any>): any {
  return arr[rand(arr.length)];
}

export function getBigArrayFromHell(size: number, range: number): Array<number> {
  // something like [4, -36, 12, ...]
  const arr: Array<number> = [];
  let num: number = 0;
  for (let i = 0; i < size; i++) {
    do {
      num = rand(range) * choose([1, -1]);
    } while (num === 0);
    arr.push(num);
  }

  return arr;
}

// magic stuff
const MAGIC_NUMBERS: Array<number> = [1, 4];
export function isGoodNumber(num: number): bool {
  const numAbs = Math.abs(num);
  return numAbs >= MAGIC_NUMBERS[0] && numAbs <= MAGIC_NUMBERS[1];
}
