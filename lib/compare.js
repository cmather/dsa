// handle cases where a or b is null undefined
export default function compare(a, b) {
  if (!a && b)
    return -1;

  if (a && !b)
    return 1;

  if (a == null && b == null)
    return 0;

  if (a == undefined && b == undefined)
    return 0;

  if (a > b)
    return 1;

  if (a === b)
    return 0;

  if (a < b)
    return -1;
}
