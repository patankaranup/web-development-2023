function fib(n) {
  arr = [0, 1];
  if (n === 1) {
    return arr[0];
  } else if (n === 2) {
    return arr;
  } else {
    for (let i = 2; i < n; i++) {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
  }
  return arr;
}
var fib_list = fib(50);
console.log(fib_list);
