/* eslint-disable no-mixed-operators */
function yearlyexpenses(expenses) {
  return expenses * 12;
}

function weeklyexpenses(expenses) {
  return expenses * 12 / 360 * 7;
}

module.exports = { yearlyexpenses, weeklyexpenses };
