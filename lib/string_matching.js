const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Search for a pattern in a text using a finite state automata.
 *
 * Requires polynomial space (to store the state table) and compilation time (to
 * build the table) but linear time to search for the pattern in a given text
 * (linear in the size of the input text).
 */
export class FSM {
  constructor(pattern, opts = {}) {
    this.pattern = pattern;
    this.states = [];
    this.alphabet = opts.alphabet || ALPHABET.join('');
    this.alphabetIndex = {};
    this.compile();
  }

  /**  
   * T(n) = O(this.pattern.length^3 * this.alphabet.length)
   * S(n) = O(this.pattern.length * this.alphabet.length)
   */
  compile() {
    this.states = [];
    this.alphabetIndex = {};

    for (let state = 0; state <= this.pattern.length; state++) {
      this.states[state] = [];

      for (let a = 0; a < this.alphabet.length; a++) {
        this.alphabetIndex[this.alphabet[a]] = a;

        let next = Math.min(this.pattern.length, state + 1);

        while (next > 0) {
          let prefix = this.pattern.slice(0, next);
          let suffix = this.pattern.slice(state - (next - 1), state) + this.alphabet[a];
          if (prefix === suffix) break;
          next--;
        }

        this.states[state][a] = next;
      }
    }
  }

  next(state, input) {
    let idx = this.alphabetIndex[input];

    if (typeof idx === 'undefined')
      return 0;

    return this.states[state][idx];
  }


  /**
   * T(n) = O(text.length)
   * S(n) = O(1)
   */
  indexOf(text) {
    let state = 0;
    let acceptingState = this.pattern.length;

    for (let i = 0; i < text.length; i++) {
      state = this.next(state, text.charAt(i));
      if (state == acceptingState)
        return i - this.pattern.length + 1; // + 1 because we're 0 indexed and we want an index from a length
    }

    return -1;
  }
}
