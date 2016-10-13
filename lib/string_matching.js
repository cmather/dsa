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

/**
 * Search for a pattern in a text in linear time and space.
 *
 * The space is an array of size this.pattern.length which takes
 * O(this.pattern.length) time to build. Then a search after compiling the "pie"
 * prefixes table costs O(text.length) where text.length is the length of the
 * entire search text.
 */
export class KMP {
  constructor(pattern, opts = {}) {
    this.pattern = pattern;
    this.prefixes = [];
    this.compile();
  }

  /**
   * Compile the prefix table ("pie" in CLR).
   *
   * T(n) = O(this.pattern.length)
   * S(n) = O(this.pattern.length)
   */
  compile() {
    this.prefixes = [];

    let k = 0;
    this.prefixes[k] = 0;

    for (let q = 1; q < this.pattern.length; q++) {
      while (k > 0 && this.pattern[q] != this.pattern[k]) {
        k = this.prefixes[k - 1];
      }

      if (this.pattern[q] == this.pattern[k]) 
        k = k + 1;

      this.prefixes[q] = k;
    }
  }

  /**
   * Find the index of the pattern in the given text or -1 if the pattern isn't
   * found.
   *
   * T(n) = O(text.length)
   * S(n) = O(1) Reuses the precompiled prefix table.
   */
  indexOf(text) {
    let n = text.length;
    let m = this.pattern.length;
    let prefixes = this.prefixes;
    let q = 0;

    for (let i = 0; i < n; i++) {
      while (q > 0 && this.pattern[q] !== text[i])
        q = prefixes[q];

      if (this.pattern[q] == text[i])
        q++;

      if (q == m)
        return i - m + 1;
    }

    return -1;
  }
}
