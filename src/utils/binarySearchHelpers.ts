export function findClosestDistanceIndex(arr: number[], target: number) {
  // Handle edge cases
  if (arr.length === 0) {
    return -1;
  }
  if (target <= arr[0]) {
    return 0;
  }
  if (target >= arr[arr.length - 1]) {
    return arr.length - 1;
  }

  // Perform binary search to find the closest value
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // The distance is zero if the target is found in the array
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Determine the closest distance between arr[left] and arr[right]
  const leftDiff = Math.abs(arr[left] - target);
  const rightDiff = Math.abs(arr[right] - target);
  if (leftDiff <= rightDiff) return left;
  return right;
}

export function findPreviousIndex(arr: number[], target: number) {
  // Handle edge cases
  if (arr.length === 0) {
    return -1;
  }
  if (target <= arr[0]) {
    return 0;
  }
  if (target >= arr[arr.length - 1]) {
    return arr.length - 1;
  }

  // Perform binary search to find the closest value
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // The distance is zero if the target is found in the array
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return Math.min(left, right);
}
