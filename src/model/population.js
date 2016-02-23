/* flow */
import { rand, choose } from '../util';
import { POPULATION_LENGTH, SELECT_LENGTH, MUTATION_LENGTH } from '../const';
import Individual from './individual';

export default class Population {
  constructor() {
    this.members = [];
    this.bestIndividual = null;
    this.generate();
    this.sort();
  }

  generate() {
    // random initial population
    for (let i = 0; i < POPULATION_LENGTH; i++) {
      const individual = new Individual(null);
      this.members.push(individual);
    }
  }

  sort() {
    this.members.sort((a, b) => a.compareTo(b));

    if (this.bestIndividual === null) {
      this.bestIndividual = this.members[0];
      return;
    }

    if (this.members[0].compareTo(this.bestIndividual) === -1) {
      this.bestIndividual = this.members[0];
    }
  }

  select() {
    // select best genes
    const selected = [];
    for (let i = 0; i < SELECT_LENGTH; i++) {
      selected.push(this.members[i]);
    }
    this.members = selected;
  }

  reproduce() {
    // get the best individual, reproduce it with the second best, third and so on
    // if it doesn't fill the initial population, do the same with the second, and so on
    const randomRange = this.members.length - 1;
    const newMembers = [];
    let firstParentIdx;
    let secondParentIdx;

    for (let i = 0; i < POPULATION_LENGTH; i++) {
      firstParentIdx = rand(randomRange);
      secondParentIdx = rand(randomRange);

      while (firstParentIdx === secondParentIdx) {
        secondParentIdx = rand(randomRange);
      }

      newMembers.push(this.members[firstParentIdx].reproduceWith(
        this.members[secondParentIdx])
        );
    }

    this.members = newMembers;
  }

  mutatePopulation() {
    const membersCopy = this.members.slice();
    let individual = choose(membersCopy);
    for (let i = 0; i < MUTATION_LENGTH; i++) {
      while (individual.mutant) {
        individual = choose(membersCopy);
      }
      individual.mutate();
    }
  }

  mutate() {
    this.select();
    this.reproduce();
    this.mutatePopulation();
    this.sort();
  }
}
