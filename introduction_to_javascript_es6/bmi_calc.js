function calc(w, h) {
  var bmi = w / (h * h);
  return Math.round(bmi);
}

bmi = calc(57, 1.66);
console.log(bmi);
