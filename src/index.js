/* @flow */

/*
    Using genetic algorithim
    Given an array of integers, say [-2, 9, 2, -5, 1, -3, -10, 6]
    Find a sum of elements that is closest to 0

    This solution finds the best solution on X rounds.
    The best solution is the Gene with it's defect closest to 0
*/

const startTime: Date = new Date();
import process from 'process';
import { runNormal, findHardArray } from './app';

if (!process.argv) {
  throw new Error('Missing arguments');
}

function taskCallBack(pop) {
  const { defect, totalIns, mutant, round } = pop.bestIndividual;
  const endTime: Date = new Date();
  const duration = endTime - startTime;
  /* eslint-disable no-console */
  console.log({ defect, totalIns, mutant, round });
  console.log(`Done! In ${duration}ms.`);
  /* eslint-enable no-console */
}

const task = process.argv[process.argv.length - 1];

switch (task) {
  case 'find-array':
    findHardArray(taskCallBack);
    break;
  default:
    runNormal(taskCallBack);
}
