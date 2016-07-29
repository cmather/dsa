export default function compare(a, b) {
  if (a > b)
    return 1;
  else if (a == b)
    return 0;
  else if (a < b)
    return -1;
  else
    throw new Error(`${a} and ${b} are not comparable.`);
}
