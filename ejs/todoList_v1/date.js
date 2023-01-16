// creating our own  module
// console.log(module);

// we can use module.exports or else only exports

exports.getDate = function () {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return today.toLocaleDateString("en-US", options);
};

module.exports.getDay = function () {
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
};

// console.log(module.exports);
