var i = 1;
while (i < 101) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizBuz");
  } else if (i % 3 === 0) {
    console.log("Fiz");
  } else if (i % 5 === 0) {
    console.log("Buz");
  } else {
    console.log(i);
  }
  i += 1;
}
