String.prototype.toHashCode = function toHashCode() {
  let hash = 0;

  for (let i = 0; i < this.length; i++) {
    // (hash << 5) - hash == hash * 31
    hash = ((hash << 5) - hash) + this.charCodeAt(i);
    hash |= 0; // convert to 32 bit integer
  }

  return hash;
}
