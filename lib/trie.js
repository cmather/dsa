/**
 * Trie Tree.
 *
 * XXX this should probably inherit from graph or a tree base class.
 */

export class TrieNode {
  constructor(value) {
    this.value = value;
    this.terminates = false;
    this._children = new Map;
  }

  add(word) {
    if (!word) return;
      
    let child = this.get(word.charAt(0));

    if (!child) {
      child = new TrieNode(word.charAt(0));
      this._children.set(word.charAt(0), child);
    }

    if (word.length > 1)
      return child.add(word.slice(1));
    else {
      child.terminates = true;
      return child;
    }
  }

  get(ch) {
    return this._children.get(ch);
  }

  isTerminal() {
    return !!this.terminates;
  }
}

export default class Trie {
  constructor(words = []) {
    this.root = new TrieNode;
    words.forEach((word) => this.add(word));
  }

  add(word) {
    return this.root.add(word);
  }

  contains(prefix, opts = {exact: false}) {
    let node = this.root;

    for (let i = 0; i < prefix.length; i++) {
      node = this.root.get(prefix.charAt(i));
      if (!node) return false;
    }

    return opts.exact ? node.isTerminal() : true;
  }
}
