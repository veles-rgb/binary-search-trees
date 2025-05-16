function mergeSort(arr) {
    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    let i = 0;
    let j = 0;
    let newArr = [];

    while (i < left.length && j < right.length) {
        newArr.push(left[i] < right[j] ? left[i++] : right[j++]);
    }

    return newArr.concat(left.slice(i), right.slice(j));
}

export { mergeSort };