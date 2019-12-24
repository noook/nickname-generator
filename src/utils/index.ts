/* eslint-disable no-param-reassign */

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let temporaryValue: T;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const availableLetters: string[] = (() => {
  const available: string[] = [];

  for (let i = 97; i <= 122; i += 1) {
    available.push(String.fromCodePoint(i));
  }

  return available;
})();

export function random<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return shuffle(arr)[index];
}
