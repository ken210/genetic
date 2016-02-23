/* @flow */
import { isGoodNumber } from './util';
import { ROUNDS, ROUNDS_HARD_ARRAY, NUMBERS } from './const';
import Population from './model/population';

export function runNormal(callback) {
  const pop = new Population();
  let i = 0;

  while (pop.bestIndividual.defect !== 0 && i < ROUNDS) {
    pop.mutate();
    i++;
  }

  callback.call(null, pop);
}

let hardArrayTries: number = 0;

export function findHardArray(callback) {
  const pop = new Population();
  let i = 0;
  hardArrayTries++;

  while (pop.bestIndividual.defect !== 0 && i < ROUNDS) {
    pop.mutate();
    i++;
  }

  if (isGoodNumber(pop.bestIndividual.defect)) {
    /* eslint-disable no-console */
    console.log('Hard array found bitches!');
    console.log(NUMBERS);
    console.log(pop.bestIndividual);
    /* eslint-enable no-console */
    return;
  }

  if (hardArrayTries < ROUNDS_HARD_ARRAY) {
    findHardArray(callback);
    return;
  }

  callback.call(null, pop);
}
