import assert from 'assert';

function swap(list, idxA, idxB) {
  if (idxA >= list.length || idxB >= list.length)
    throw new Error(`swap index out of range with list length: ${list.length}, idxA: ${idxA}, idxB: ${idxB}`);
  let tmp = list[idxB];
  list[idxB] = list[idxA];
  list[idxA] = tmp;
  return list;
}

/**
 * Time:    O(n^2)
 * Space:   O(1) 
 */

export function bubbleSort(list) {
  let n = list.length;

  while (n > 0) {

    let newn = 0

    for (let i = 1; i < n; i++) {
      if (list[i-1] > list[i]) {
        swap(list, i - 1, i);

        // once we've gone through the entire list the last index i will contain
        // the largest element in the unsorted list. So we can ignore it on the
        // next pass.
        newn = i;
      }
    }

    n = newn;
  }

  return list;
}

/**
 * Time:    O(n^2)
 * Space:   O(1)
 *
 * Note: Using a minheap data structure reduces the find min index to a logn
 * operation which reduces the time to O(nlogn). This is called heapsort.
 */
export function selectionSort(list) {
  for (let j = 0; j < list.length - 1; j++) {
    let iMin = j;

    for (let i = j+1; i < list.length; i++) {
      if (list[i] < list[iMin])
        iMin = i;
    }

    if (iMin != j)
      swap(list, j, iMin);
  }

  return list;
}

/**
 * Time:    O(nlgn)
 * Space:   O(n)
 */
export function mergeSort(list, start = 0, end = list.length - 1) {
  if (start < end) {
    let mid = (start + end) >> 1;
    mergeSort(list, start, mid);
    mergeSort(list, mid + 1, end);
    merge(list, start, mid, end);
  }

  return list;
}


/**
 * Time:    O(n)
 * Space:   O(n)
 */
function merge(list, start, mid, end) {
  let left = [];
  let right = [];

  for (let i = 0; i <= (mid - start); i++) {
    left[i] = list[start + i];
  }

  left.push(Infinity);

  for (let i = 0; i < (end - mid); i++) {
    right[i] = list[mid + 1 + i];
  }

  right.push(Infinity);

  let l = 0;
  let r = 0;

  for (let k = start; k <= end; k++) {
    if (left[l] <= right[r]) {
      list[k] = left[l];
      l++;
    }

    else {
      list[k] = right[r];
      r++;
    }
  }

  return list;
}
