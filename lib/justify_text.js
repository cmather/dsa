export class JustifyText {
  constructor(text, opts = {}) {
    this.words = this.split(text);
    this.pageWidth = opts.pageWidth || 15;
    this.parents = null;
  }

  get length() {
    return this.words.length;
  }

  split(text) {
    let words = text.split(/\s/);
    let result = [];

    for (let i in words) {
      result.push(words[i]);
      result.push(' ');
    }

    // remove trailing white space
    result.pop();

    return result;
  }

  badness(i, j) {
    let size = this.words.slice(i, j).join('').length;
    let delta = this.pageWidth - size;
    return delta >= 0 ? Math.pow(delta, 3) : Infinity;
  }

  /**
   * Time: O(n^2)
   * Space: O(n)
   */
  run(i = 0, memo = {}) {
    if (i == this.length)
      return 0;

    if (i == 0)
      this.parents = {};

    if (typeof memo[i] !== 'undefined')
      return memo[i];

    let result = Infinity;
    let current;

    for (let j = i + 1; j <= this.length; j++) {
      current = this.run(j, memo) + this.badness(i, j);
      if (current < result) {
        this.parents[i] = j;
        result = current;
      }
    }

    memo[i] = result;
    return result;
  }
}

export default function justifyText(text, opts = {}) {
  let computation = new JustifyText(text, opts);
  computation.run();
  return computation;
}
