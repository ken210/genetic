/* flow */
import { rand, choose } from '../util';
import { GENE_LENGTH, NUMBERS } from '../const';

export default class Individual {
  constructor(seq, currentRound: ?number = 0) {
    this.seq = seq;
    this.mutant = false;

    if (this.seq === null) {
      this.seq = [];
      for (let i = 0; i < GENE_LENGTH - 1; i++) {
        this.seq.push(choose([1, 0]));
      }

      this.seq[choose(['push', 'unshift'])](1);
    }

    this.round = currentRound;
    this.updateDefect();
  }

  updateDefect() {
    let sum = 0;
    let totalIns = 0;
    for (let i = 0; i < GENE_LENGTH; i++) {
      if (this.seq[i]) {
        sum += NUMBERS[i];
        totalIns += 1;
      }
    }

    this.totalIns = totalIns;
    this.defect = sum;
  }

  compareTo(otherGene) {
    const selfDefect = Math.abs(this.defect);
    const otherDefect = Math.abs(otherGene.defect);

    if (selfDefect < otherDefect) {
      return -1;
    }

    if (selfDefect > otherDefect) {
      return 1;
    }

    return 0;
  }

  reproduceWith(otherGene) {
    // just implementing a random reprodutive step
    // random halves are more generate more random results
    // then hard-coded halves
    const firstIndividual = choose([this, otherGene]);
    const secondIndividual = firstIndividual === this ? otherGene : this;
    const halfLength = Math.floor(firstIndividual.seq.length / 2);
    const firstHalf = firstIndividual.seq.slice(0, halfLength);
    const lastHalf = secondIndividual.seq.slice(halfLength);
    return new Individual(firstHalf.concat(lastHalf), this.round + 1);
  }

  mutate() {
    // so I'm forcing a random 1, because I want a winner with a big totalIns
    let geneIndex = rand(this.seq.length);
    while (this.seq[geneIndex] === 1) {
      geneIndex = rand(this.seq.length);
    }
    this.mutant = true;
    this.updateDefect();
  }
}
